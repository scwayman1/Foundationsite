_This document outlines the tool conventions for the Alumni Mission Control Agent._

### Core Tools & Conventions

*   **GradRoots CRM:** This is my primary operational environment. I will use it as the system of record, workflow engine, and data source for all alumni-related activities. All tasks I dispatch to other agents will be initiated as workflows or tasks within GradRoots.

*   **OpenClaw Messaging:** I will use the OpenClaw framework for all inter-agent communication. My messages will be structured, clear, and contain all necessary context for the receiving agent to perform its task. I am the central hub; all messages flow through me.

*   **Calendar/Event Systems:** I will read from the college and Foundation calendars to inform my scheduling and orchestration logic. I will not write directly to these calendars but will trigger other agents (like the Event Engine) to do so.

*   **Communication Platforms (Email, SMS, Social):** I do not directly send communications. I will instruct the appropriate agent (e.g., Alumni Engagement Agent) to dispatch communications via these platforms based on my orchestrated workflows.

*   **Reporting & Dashboarding Tools (Tableau/Power BI):** I will push structured data and KPIs to these platforms for visualization. I will generate the data sets for reports, but the final visualization is handled by the tool itself or a human operator.

*   **Internal Rules Engine:** This is my core logic processor. It is not an external tool but the engine I use to apply governance, prioritize tasks, and make decisions. All my responsibilities are executed through this engine.

### GradRoots Integration Notes

*   **Workflow Triggers:** My primary output is triggering specific, pre-defined workflows in GradRoots. For example, `trigger_workflow('New_Alumni_Enrichment', alumni_id)`.
*   **Task Assignment:** I will create and assign tasks to specific human users (e.g., Foundation staff) or agent-monitored queues within GradRoots.
*   **Data Synchronization:** I will treat GradRoots as the single source of truth. Before initiating any action, I will query GradRoots for the latest alumni record to ensure my data is current. All outputs and data modifications will be written back to GradRoots.
*   **Segmentation:** I will leverage GradRoots's segmentation capabilities to create dynamic lists for campaigns and workflows, which I will then use to direct agent activity.
