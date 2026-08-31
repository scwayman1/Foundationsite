# Casino Night Planning Studio

## Purpose

An unlisted, standalone committee workspace at `/internal/casino-night-planning-studio` for Coastline College Foundation's October 17, 2026 Casino Night. It replaces the Manus-hosted planning workspace while preserving its current records and activity history.

Hidden is not private: the route is omitted from public navigation and carries `noindex,nofollow,noarchive,nosnippet`, but it is not authenticated. Do not store confidential donor, payment, student, accommodation, or personnel information.

## Migration source

- Source page: `https://casinonight-g5w3tsno.manus.space/`
- Source snapshot API: `https://casinonight-g5w3tsno.manus.space/api/trpc/planning.snapshot`
- Frozen import: `data/casino-night-planning-manus-snapshot.json`
- Imported exactly once when the planning database is empty.
- Imported state: 66 current records and 50 historical activity events.
- Original record IDs and record/activity timestamps are preserved.

## Persistence

Production uses a SQLite database on the existing Render persistent disk:

- `CASINO_PLANNING_DB=/var/data/casino-night-planning.sqlite`

Writes are serialized in-process, committed transactionally, exported to a temporary file, flushed, atomically renamed, and directory-synced. Every create, update, and archive writes an append-only activity event with actor, timestamp, record identifiers, and before/after state. Deletes are implemented as archives; current records are never hard-deleted through the API.

Render persistent disks permit a single attached service instance. Move this workspace to a managed transactional database before scaling the service horizontally.

## API

- `GET /api/casino-night-planning/snapshot` — active records plus the latest 250 activity events.
- `GET /api/casino-night-planning/health` — aggregate storage and record counts.
- `POST /api/casino-night-planning/records` — creates an allowed planning record.
- `PATCH /api/casino-night-planning/records/:id` — updates a record using optimistic revision checks.
- `DELETE /api/casino-night-planning/records/:id` — archives a record and records the event.

The UI currently exposes create/update flows and retains archive support at the API layer for a future controlled archive interaction.

## UX direction

Taste contract: institutional, calm, operational, legible, and committee-ready; never cramped, ornamental, or dashboard-theater.

Improvements over the former table-heavy workspace:

- Command-center summary for event date, readiness, active work, blockers, and accomplishments.
- Separate tabs for actions, completed work, workstreams, and activity.
- Search plus status, owner, and workstream filters.
- A Kanban/list switcher that groups actions into Needs direction, In motion, Blocked, and Done lanes.
- Action-oriented Kanban cards that foreground the owner, due date, blocker, and next concrete move without enabling accidental drag-and-drop status changes.
- Expandable action cards for progressive disclosure.
- Large, vertically resizable text areas for detailed fields.
- Explicit Save controls instead of silent or ambiguous autosave.
- Optimistic revision conflicts protect against stale overwrites.
- Mobile-first stacking and horizontally scrollable section tabs.
- JSON snapshot export for committee handoffs and recovery evidence.

## Verification and recovery

1. `pnpm test` must pass planning-store migration, restart, concurrency, audit, and archive coverage.
2. `pnpm build` must succeed.
3. `GET /api/casino-night-planning/health` should report 66 active records and 50 activity events immediately after a clean seed import.
4. The live route must return `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` and `Cache-Control: no-store`.
5. The route must not appear in public header, mobile, footer, homepage, or sitemap navigation.
6. A production durability probe should create a synthetic action, archive it, confirm two audit events, deploy the same reviewed code again, and confirm both events remain while the active record count is unchanged.
7. Recovery requires a byte-for-byte copy of `/var/data/casino-night-planning.sqlite`; never reconstruct records from screenshots, aggregate counts, or memory.

### Production verification — August 30, 2026

The first production deployment imported 66 active records and 50 historical events. A controlled synthetic action was created and archived, leaving the active count at 66 while recording one archived record and two new append-only events. A follow-up deployment is used to confirm those counts survive a fresh application release from the same persistent disk.
