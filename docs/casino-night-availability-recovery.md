# Casino Night availability durability and recovery

Availability submissions are stored in an append-only SQLite database on Render's persistent disk. Production configuration:

- `AVAILABILITY_DB=/var/data/casino-night-availability.sqlite`
- `AVAILABILITY_LEGACY_JSON=/var/data/casino-night-availability.json`
- `AVAILABILITY_VERIFICATION_TOKEN` is a secret used only for protected history reads and durability probes.

Every accepted submission is a new row containing the respondent, normalized email, selected slots, recorded timestamp, source, and a unique submission ID. A later submission using the same email does not replace the earlier row. The public results endpoint projects only the newest participant row for each normalized email and never returns email addresses. Verification probes use the same persistence path but are excluded from participant counts and public results.

Writes are serialized in-process, committed to SQLite, exported to a temporary file, flushed, and atomically renamed. The API reports success only after the database file is durably replaced. Failed persistence closes the in-memory database so the next operation reloads the last durable file.

## Legacy migration

On startup, the service reads the legacy JSON file when present. Each valid legacy response is imported exactly once with its original timestamp and `legacy_json` source. Its deterministic migration ID prevents duplicate history rows on later restarts or deploys. Never create legacy rows from aggregate availability evidence; only migrate exact source payloads.

## Verification

1. `GET /api/casino-night-availability/results` should return `Cache-Control: no-store`, a `generatedAt` timestamp, and participant-only latest state.
2. `GET /api/casino-night-availability/health` reports aggregate participant submissions, verification submissions, and participant respondent count without personal data.
3. A request carrying the correct `x-availability-verification` secret may:
   - submit a verification row through `POST /api/casino-night-availability/responses`;
   - read complete audit history through `GET /api/casino-night-availability/history`.
4. A durability test should create one verification submission, restart the service, submit a second update for the same verification email, deploy the same reviewed commit again, and confirm both rows and timestamps remain in protected history while public participant results remain unchanged.

## Recovery

1. Stop participant submissions before any manual recovery.
2. Record the current service, deploy commit, persistent-disk mount, database size, and SHA-256 of `/var/data/casino-night-availability.sqlite`.
3. Copy the SQLite file from the mounted disk without modifying the source. Treat it as confidential because it contains names, emails, selections, and timestamps.
4. Validate the copy read-only and compare protected history, health totals, and public latest-state results.
5. Restore only from a verified SQLite file or an exact legacy JSON payload. Do not reconstruct individual rows from aggregate counts, email summaries, or remembered availability.
6. After an approved restore, restart the service and repeat the verification sequence above before reopening the form.

Render persistent disks support only one attached service instance. Migrate to a managed transactional database before scaling this endpoint to multiple application instances.
