# Casino Night availability recovery

Availability records are stored on Render's persistent disk at the path set by `AVAILABILITY_DB` (production: `/var/data/casino-night-availability.json`). The public results API intentionally omits email addresses.

Each successful update uses an atomic file replacement and keeps the immediately preceding version at the same path with a `.bak` suffix. Writes are serialized within the application process to prevent two concurrent submissions from overwriting one another. On startup, the app deduplicates the existing private records by email (retaining the newest record) and creates an initial `.bak` snapshot when one is missing; rerunning this startup step does not add respondents.

## Recovery

1. Do not redeploy or write new availability responses until the current database file and its `.bak` companion have been copied from the mounted disk.
2. Compare the two JSON files and retain the one with the most complete valid response set. Email addresses are present in these private files and must not be shared or copied into the public results view.
3. With the service stopped, restore the chosen file to the `AVAILABILITY_DB` path, set file permissions to owner-only, then restart the service.
4. Confirm the public `/api/casino-night-availability/results` endpoint reports the expected response count and does not contain an `@` character.

For higher availability or multi-instance scaling, migrate this data to a managed transactional database before adding a second application instance. That requires database credentials and an approved billing/account decision.
