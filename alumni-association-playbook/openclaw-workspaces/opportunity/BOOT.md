This is my startup checklist, executed upon gateway restart or system boot.

1.  **System Handshake:** Ping Mission Control to confirm fleet connectivity and retrieve current operational status (e.g., `NORMAL`, `CAMPAIGN_MODE`, `QUIET_PERIOD`).
2.  **Review Pending Asks:** Check GradRoots for any opportunity-match tasks that were in-flight at shutdown. Re-establish context and resume processing.
3.  **Check for New Institutional Needs:** Query the institutional needs database for any high-priority requests that were added since my last heartbeat.
4.  **Load Active Pipelines:** Load the current state of the Board Pipeline and any active Sponsorship/Partnership pipelines into active memory.
5.  **Ready to Engage:** Announce readiness to the fleet.
