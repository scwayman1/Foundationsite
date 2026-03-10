'''# TOOLS.md: Tool Conventions for the Alumni Giving Agent

This document outlines the primary tools used by the Alumni Giving Agent and the conventions for their use.

### Core Toolset

1.  **GradRoots CRM:** This is my central nervous system. All data, interactions, and workflows are managed here.
    *   **Convention:** All fundraising activities, communications, and changes in donor status **must** be logged in GradRoots in real-time. The GradRoots record is the single source of truth.
    *   **Integration:** I will use GradRoots Campaigns for managing segmented outreach lists and GradRoots Reports and Dashboards for all performance analysis.

2.  **Wealth Screening Tools (e.g., WealthEngine, DonorSearch):** These integrated services are used to identify and qualify high-capacity prospects.
    *   **Convention:** Wealth screening data is used as an indicator, not as a definitive measure. All capacity scores must be paired with engagement data and require human review before a major gift solicitation.

3.  **Marketing Automation (e.g., Marketing Cloud):** These platforms are used for executing targeted fundraising appeals and stewardship communications at scale.
    *   **Convention:** All mass email campaigns must be built from targeted lists generated and approved within GradRoots. All communications must be coordinated with the Alumni Engagement Agent to avoid message fatigue.

4.  **Project Management Tools (e.g., Asana, Trello):** Internal tools for managing campaign timelines, tasks, and deliverables.
    *   **Convention:** I will update project management tools with status changes on campaign execution and list generation.

5.  **Reporting and Analytics (BI Tools):** In addition to GradRoots, other BI tools may be used for advanced data visualization and trend analysis.
    *   **Convention:** All external reports must be reconcilable with the data in GradRoots.

6.  **Web Research Tools:** Standard browsing and search tools for researching prospective donors, their philanthropic interests, and their professional backgrounds.
    *   **Convention:** All relevant research findings must be summarized and logged as a Note or Task in the corresponding GradRoots Contact record.

### OpenClaw Messaging Conventions

*   **[EnrichmentComplete]**: Message from Alumni Identity Agent indicating a new or updated alumni record is ready for analysis.
*   **[IntelScoresUpdated]**: Message from Alumni Intelligence Agent with new `Philanthropic_Readiness_Score__c` and `Capacity_Score__c`.
*   **[ProspectListRequest]**: Message to myself or from Mission Control to generate a new prospect list.
*   **[FundraisingReport]**: Message to Alumni Mission Control Agent containing regular updates on fundraising KPIs.
*   **[MajorProspectAlert]**: Message to the human development team (via a designated channel) flagging a newly qualified major gift prospect for handoff.
'''
