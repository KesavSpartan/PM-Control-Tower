# CHANGELOG

## 2.0.0 — ENTERPRISE IDENTITY & ACCESS (2026-09-13)

- **OIDC SSO flow**: /api/auth/sso/start (authorize redirect) + callback with code exchange, IdP group→role mapping, JIT user/role provisioning, PMCT session token. IdP registry in Admin (admin/sso) with honest CONFIGURED status.
- **SCIM 2.0 provisioning** (RFC 7644 subset): /api/scim/v2/Users with bearer token auth (SHA-256 hashed tokens, shown once), JIT create, filter, activate/deactivate via PATCH — all audited.
- **MFA (TOTP RFC 6238)**: setup → authenticator app → enable → MFA login challenge; failed challenges audited.
- **User model**: mfaEnabled/mfaSecret/externalId/authSource fields; IdentityProvider + ScimToken models.
- Live verified: IdP registration (CONFIGURED), SCIM JIT create + filter, MFA setup with otpauth URL.

## 1.9.2 — IMPORTANT DOCUMENTS PACKAGE + DOC SWEEP (2026-09-13)

- New **Important Documents** folder: platform overview, test plan, test report (Word), platform audit, integrity guide, deployment guide, sales deck — the executive document set in one place.
- CHANGELOG backfilled (v1.7.2 report viewer); README capability map updated through v1.9.1 (Admin Control Center).

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)

- Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.9.1 — CUSTOM FIELDS LIVE IN THE PROJECT LIFECYCLE (2026-09-13)

- POST /api/projects now accepts customFields and **enforces published FieldDefinitions server-side**: required validation (tested live — missing Business Criticality BLOCKS creation with the exact message), type coercion (number/date/boolean/select), option whitelisting.
- Persisted as customFieldsJson on the Project record and returned through the project detail API.
- Dynamic form rendering of custom fields in the project UI + PATCH support next.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.9.1 — CUSTOM FIELDS LIVE IN THE PROJECT LIFECYCLE (2026-09-13)

- POST /api/projects now accepts customFields and **enforces published FieldDefinitions server-side**: required validation (tested live — missing Business Criticality BLOCKS creation with the exact message), type coercion (number/date/boolean/select), option whitelisting.
- Persisted as customFieldsJson on the Project record and returned through the project detail API.
- Dynamic form rendering of custom fields in the project UI + PATCH support next.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.9.2 — IMPORTANT DOCUMENTS PACKAGE + DOC SWEEP (2026-09-13)

- New **Important Documents** folder: platform overview, test plan, test report (Word), platform audit, integrity guide, deployment guide, sales deck — the executive document set in one place.
- CHANGELOG backfilled (v1.7.2 report viewer); README capability map updated through v1.9.1 (Admin Control Center).

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)

- Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.9.1 — CUSTOM FIELDS LIVE IN THE PROJECT LIFECYCLE (2026-09-13)

- POST /api/projects now accepts customFields and **enforces published FieldDefinitions server-side**: required validation (tested live — missing Business Criticality BLOCKS creation with the exact message), type coercion (number/date/boolean/select), option whitelisting.
- Persisted as customFieldsJson on the Project record and returned through the project detail API.
- Dynamic form rendering of custom fields in the project UI + PATCH support next.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.9.1 — CUSTOM FIELDS LIVE IN THE PROJECT LIFECYCLE (2026-09-13)

- POST /api/projects now accepts customFields and **enforces published FieldDefinitions server-side**: required validation (tested live — missing Business Criticality BLOCKS creation with the exact message), type coercion (number/date/boolean/select), option whitelisting.
- Persisted as customFieldsJson on the Project record and returned through the project detail API.
- Dynamic form rendering of custom fields in the project UI + PATCH support next.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.9.0 — ADMIN CONTROL CENTER, PHASE A (2026-09-13)

- **Metadata-driven configuration layer**: EntityDefinition, FieldDefinition (with optionsJson, sensitive, DRAFT/PUBLISHED/ARCHIVED), CustomFieldType (14 base types incl. RAG/SCORE/FORMULA), NamingConvention (snake/camel/Pascal/UPPER + prefix/suffix + code patterns with YEAR/SEQ tokens), Terminology dictionary, FeatureFlags, AdminSettings — all audited, admin.config-gated.
- **Field Builder**: publish fields per entity; internal API names auto-generated from the naming convention (stable forever); SELECT/RAG option enforcement + required validation executed server-side.
- **Terminology**: rename application terms organization-wide (Project -> Engagement) with stable internal identifiers.
- **Live verified**: field type + field creation with convention-derived name (business_criticality), required-field enforcement, terminology rename.
- Phase B roadmap: dynamic form rendering of custom fields in project forms, workflow builder, dashboard builder, configuration versioning/rollback, multi-tenant isolation.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.

## 1.8.1 — FINAL SYSTEM-WIDE VERIFICATION (2026-09-13)
46/46 automated end-to-end checks pass across all modules (auth ×5 personas, 16 core APIs, 8 Integrity APIs, technology/reporting/prioritization/investment, permission denials, learning memory, async simulation, report generation + HTML download, project controls, page serving). Reusable script: scripts/final-verify.ts.

## 1.8.0 — PROJECT CONTROLS: S-CURVE + FORECAST (2026-09-13)
Controls tab in every project workspace: interactive S-Curve (Cost / Progress / Earned Value), planned-vs-actual cumulative curves from schedule + approved timesheets, EVM cards with plain-language interpretation, forecast completion date (SPI-extrapolated, labeled calculated). Honest "Insufficient data" state.

## 1.7.2 — REPORT VIEWER + DOWNLOAD (2026-09-13)
Generated reports open on screen immediately (KPI cards + executive commentary) with branded Print/Save-PDF HTML view; History rows gained Open + Print buttons.

## 1.7.1 — DOCS & SALES DECK SWEEP (2026-09-13)
README/audit/deck updated for the Investment & Business Case module.

## 1.7.0 — INVESTMENT & BUSINESS CASE MODULE (2026-09-13)
Finance-engine-backed business cases: CAPEX/OPEX/benefit inputs, yearly cash-flow model, ROI, NPV, IRR (honest null), simple + discounted payback, best/base/worst scenarios, NPV sensitivity, governance workflow (SUBMITTED → CFO → APPROVED/FUNDED) with audit, portfolio roll-up. Live-verified: ROI 51.88%, NPV $1.26M, IRR 27.36%, workflow APPROVED.

### 1.7.0-alpha — Finance engine
Pure engine + 8 unit tests: cash-flow model, ROI, NPV, IRR (bisection, honest null), payback, recommendation indicator, scenarios, sensitivity.

## 1.6.2 — WORD TEST REPORT (2026-09-13)
PM-Control-Tower-Test-Report.docx generated (strategy, 7 test-case tables, outcomes, defects found & fixed, open items).

## 1.6.1 — MASTER TEST PLAN (2026-09-13)
docs/TEST-PLAN.md: strategy, personas, ~60 E2E test cases across all modules, smoke suite, known watch-items.

## 1.6.0 — ENTERPRISE REPORTING CENTER, PHASE A (2026-09-13)
Reporting Center view: 177-template library (7 categories) with search/filters/favorites, report generation from live data with deterministic executive narrative, My Reports/History, subscriptions model + API. Builder/Board Packs = Phase B/C.

## 1.5.5 — INTEGRITY GUARD HARDENING (2026-09-13)
All 8 Data Integrity tab guards made total (loading state whenever data absent) — fixes transient null-data tab-switch crash.

## 1.5.4 — TYPE CLEANUP (2026-09-13)
Benefits strategic-overlay + rebase test typing.

## 1.5.3 — BENEFITS TAB CRASH FIX (2026-09-13)
Strategic overlay included in portfolio roll-up response (was undefined → tab crash).

## 1.5.2 — DASHBOARD CRASH FIX (2026-09-13)
FreshnessRail error boundary — rail failure no longer takes down the dashboard.

## 1.5.1 — PRIORITIZATION PAGE CRASH FIX (2026-09-13)
Kit import restored (PageHeader/SectionCard/StatCard) + Label import.

## 1.5.0 — PRIORITIZATION ENGINE + BUDGET-CONSTRAINED SELECTION (2026-09-13)
Configurable weighted scoring (7 criteria), classification bands, ranking with system-vs-override transparency, budget-constrained optimizer with explained inclusions/exclusions and dependency guard, priority matrix (value vs investment). Note: spec example's true weighted score is 86.7 (not 88.4).

## 1.4.1 — FULL CONNECTOR CATALOG (2026-09-13)
Added GitLab, Microsoft 365, Power BI, Email/Outlook, Google Workspace, REST API, SSO/Identity (SAML/OIDC), SCIM provisioning — 27 integrations total, all honestly CONFIGURED.

## 1.4.0 — ECOSYSTEM CONNECTOR CATALOG (2026-09-13)
Jira, ServiceNow SPM, SAP S/4HANA, Teams, SharePoint, Excel, Broadcom Clarity, Azure DevOps, GitHub, Slack, Salesforce — full metadata, CONFIGURED until live-verified.

## 1.3.3 — DOCUMENTATION SWEEP (2026-09-13)
README footprint recomputed (74 models · 120 routes · 16 engines · 64 views); capability map + docs/11 addendum.

## 1.3.2 — LEARNING AI ASSISTANT (2026-09-13)
Interaction memory, feedback loop (negative → weighted CORRECTION knowledge), day-by-day Learning Profile. AI never auto-executes.

## 1.3.1 — GOVERNED DELIVERY AUTOMATION PACK (2026-09-13)
SPI < 0.90 drafts THREE quantified recovery scenarios; calibration bias injection on task creation; seeded engine rules (SPI breach, period digest, freshness escalation).

## 1.3.0 — TECHNOLOGY & ARCHITECTURE DOMAIN (2026-09-13)
CTO Technology Control Tower: application portfolio, lifecycle exposure, technical-debt register, releases + DevOps metrics, computed architecture health.

## 1.2.2 — DATA QUALITY ENGINE (2026-09-13)
Computed DQ score per project (owner/sponsor/dates/budget/staleness/RAID hygiene/unassigned tasks/skills) + master platform audit doc.

## 1.2.1 — EVM FULL-FIELD PERIOD FORM (2026-09-13)
Three EVM tabs: Cockpit / Full form (all fields, MANUAL_PERIOD audited) / What is EVM explainer.

## 1.2.0 — INTEGRITY LAYER HARDENING (2026-09-13)
SystemConfig thresholds + grace window, hatched stale tiles, evidence ZIP export, async Monte Carlo worker + fan chart + calendar dates, scenario rebase-on-merge, signed expiring approval links, benefits waterfall.

## 1.1.0 — THE INTEGRITY LAYER (2026-09-13)
Data Freshness engine, Evidence bundles (SHA-256 chains), P80 Monte Carlo forecasting, Say/Do calibration, Scenario sandbox (branch & merge), AI steering packs (draft-first), Benefits realization, 4 new permissions, 5 realtime events.

## 1.0.1 — WINDOWS RUNTIME FIXES (2026-09-12)
Standalone build asset copy, .env DB path, LAN binding; resource add/delete UI; seed improvements (inbox + current-week planner for every role); sales deck.
