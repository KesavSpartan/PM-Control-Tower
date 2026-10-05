"use client";
// PM CONTROL TOWER — Socket.IO realtime connector (client side)
// Default: io("/?XTransformPort=3003") — the reverse-proxy convention (nginx/Caddy
// forwards /socket.io/ to the gateway port). In environments without a proxy (bare
// dev sandbox), set NEXT_PUBLIC_REALTIME_URL (e.g. http://127.0.0.1:3003) to
// connect straight to the gateway.

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { connectRealtime, registerSocketConnector, dispatchRealtime, setSocketState } from "@/lib/client";
import { toast } from "sonner";

const RT_URL = process.env.NEXT_PUBLIC_REALTIME_URL || "/?XTransformPort=3003";

let socket: Socket | null = null;

export function RealtimeConnector({ token, userId, roles }: { token: string; userId: string; roles: string[] }) {
  useEffect(() => {
    registerSocketConnector((t: string) => {
      if (socket) { socket.disconnect(); socket = null; }
      socket = io(RT_URL, {
        path: "/socket.io/",
        auth: { token: t },
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
        transports: ["websocket", "polling"],
      });
      socket.on("connect", () => {
        setSocketState(true);
        const rooms = ["global", `user:${userId}`, ...roles.map((r) => `role:${r}`)];
        socket?.emit("subscribe", rooms);
      });
      socket.on("disconnect", () => setSocketState(false));
      socket.on("connect_error", () => setSocketState(false));
      // Fan out all PMCT business events to the internal bus
      const EVENTS = [
        "project:created", "project:updated", "project:health",
        "wbs:changed", "task:changed", "schedule:changed", "dependency:changed",
        "baseline:changed", "resource:assigned", "timesheet:submitted", "timesheet:approved",
        "actuals:changed", "evm:changed", "raid:changed", "change:changed",
        "governance:changed", "alert:created", "inbox:changed", "planner:changed",
        "integration:changed", "automation:executed", "notification:created", "audit:created",
        "data:imported", "report:generated",
      ];
      for (const ev of EVENTS) {
        socket.on(ev, (payload: unknown) => {
          dispatchRealtime(ev, payload);
          if (ev === "alert:created") {
            const p = payload as { severity?: string; title?: string };
            if (p?.severity === "CRITICAL") toast.error(p.title || "Critical governance alert", { description: "Open Governance for details." });
          }
          if (ev === "notification:created") {
            const p = payload as { title?: string };
            if (p?.title) toast.info(p.title);
          }
        });
      }
    });
    connectRealtime(token);
    return () => { socket?.disconnect(); socket = null; setSocketState(false); };
  }, [token, userId, roles.join(",")]);
  return null;
}
