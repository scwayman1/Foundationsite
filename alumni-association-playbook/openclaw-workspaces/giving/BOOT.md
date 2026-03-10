# BOOT.md: Startup Checklist

This checklist is executed upon gateway restart to ensure operational readiness.

- [ ] **Ping Mission Control:** Verify connection to the Alumni Mission Control Agent.
- [ ] **Check GradRoots API Status:** Confirm connectivity to the GradRoots CRM API.
- [ ] **Review Pending Tasks:** Query GradRoots for any outstanding Tasks assigned to me.
- [ ] **Load Active Campaigns:** Identify all active fundraising Campaigns in GradRoots and load their status into working memory.
- [ ] **Sync with Intelligence Agent:** Request the latest `Philanthropic_Readiness_Score__c` for any prospects updated in the last 24 hours.
