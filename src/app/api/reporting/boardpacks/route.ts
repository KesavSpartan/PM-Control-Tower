// PM CONTROL TOWER — Board Packs + Report Schedules API
import { z } from 'zod';
import { db } from '@/lib/db';
import { withApi, ok, ApiError, parseBody } from '@/lib/api';
import { writeAudit } from '@/lib/audit';

export const GET = withApi(async (ctx) => {
  const packs = await db.boardPack.findMany({ orderBy: { createdAt: 'desc' }, include: { pages: { orderBy: { order: 'asc' } } } });
  const schedules = await db.reportSchedule.findMany({ orderBy: { createdAt: 'desc' } });
  return ok({ packs, schedules });
}, { permission: 'reports.view', rateLimit: { limit: 240, windowMs: 60_000 } });

export const POST = withApi(async (ctx) => {
  const session = ctx.session!;
  const body = await parseBody(ctx.req, z.object({
    action: z.enum(['createPack', 'createSchedule']),
    name: z.string().min(2),
    reportIds: z.array(z.string()).optional(),
    executiveSummary: z.string().optional(),
    confidentiality: z.string().optional(),
    templateId: z.string().optional(),
    frequency: z.string().optional(),
    dayOfWeek: z.number().int().optional(),
  }));
  if (body.action === 'createPack') {
    if (!body.reportIds?.length) throw new ApiError(400, 'At least one report required');
    const reports = await db.generatedReport.findMany({ where: { id: { in: body.reportIds } } });
    if (reports.length === 0) throw new ApiError(400, 'No valid reports found');
    const pack = await db.boardPack.create({
      data: {
        name: body.name, createdBy: session.id, executiveSummary: body.executiveSummary ?? null,
        confidentiality: body.confidentiality ?? 'CONFIDENTIAL',
        pages: { create: reports.map((r, i) => ({ order: i, reportId: r.id, title: r.templateName })) },
      },
      include: { pages: true },
    });
    await writeAudit({ userId: session.id, userName: session.name, action: 'CREATE', entityType: 'BoardPack', entityId: pack.id, entityName: pack.name, after: { pages: reports.length } });
    return ok({ pack }, 201);
  }
  if (!body.name) throw new ApiError(400, 'name required for scheduling');
  const sched = await db.reportSchedule.create({
    data: { reportId: body.templateId, frequency: body.frequency ?? 'WEEKLY', dayOfWeek: body.dayOfWeek ?? 1, recipients: '[]', active: true },
  });
  await writeAudit({ userId: session.id, userName: session.name, action: 'CREATE', entityType: 'ReportSchedule', entityId: sched.id, entityName: 'Report schedule', after: { frequency: body.frequency } });
  return ok({ schedule: sched }, 201);
}, { permission: 'reports.view', rateLimit: { limit: 60, windowMs: 60_000 } });
