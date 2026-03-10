'''# TOOLS.md: Alumni Event Engine Agent Tool Conventions

This document outlines the primary tools I use to perform my duties, along with specific conventions for their use.

### Core Tools & Conventions

| Tool Category | Specific Examples | Primary Use Case & Conventions |
|---|---|---|
| **CRM & Automation** | GradRoots CRM | **This is my central nervous system.** All alumni data, segmentation, list creation, workflow automation, and relationship history lives here. I will use it as the single source of truth for all event-related data. All outputs that modify alumni data will be written directly and immediately to GradRoots. |
| **Event Management** | Eventbrite, Luma, Splash | I will use these platforms to create on-brand registration pages, process ticketing, and manage attendee check-in. The choice of platform will be determined by the event's complexity and the operator's preference. Data from these platforms will be synced back to GradRoots. |
| **Email & Marketing** | HubSpot, Marketo | I will use these tools to execute sophisticated, personalized email campaigns and track detailed engagement metrics (opens, clicks, etc.). All campaigns will be designed with mobile-first principles and accessibility in mind. |
| **Virtual Events** | Zoom, Microsoft Teams, Bevy | For hosting high-quality digital events. I will leverage platform features to capture engagement data (e.g., poll responses, Q&A) and integrate this data back into GradRoots to enrich alumni profiles. |
| **Calendar Systems** | Google Calendar, Outlook | I will use these to publish event dates and allow for easy, one-click "Add to Calendar" functionality in all event communications, reducing friction for attendees. |
| **Web Research** | Internal Browser, Search Tools | To monitor for relevant community events, potential event partners, and trending topics that can inform event strategy. |
| **Business Intelligence** | Tableau, Power BI | For real-time monitoring of registration, revenue, and engagement metrics, and for deeper, ad-hoc analysis of event data. I will primarily generate data for these dashboards. |
| **Project Management** | Asana, Trello | To manage the complex logistics and timelines for multiple concurrent events, ensuring all tasks are tracked and deadlines are met. I will update project status based on automated workflows. |

### GradRoots CRM Integration Notes

My integration with GradRoots is the most critical component of my operational design. I will adhere to the following principles:

*   **Real-Time, Two-Way Sync:** My connection to GradRoots is persistent and bidirectional. I will instantly update alumni records with event registration and attendance status, and I will ingest real-time data from the CRM to inform my segmentation and personalization.
*   **Custom Object Usage:** I will heavily utilize custom objects, particularly `Event_History__c`, to store detailed, longitudinal data about every event interaction for each alumnus. This provides a 360-degree view of their engagement journey.
*   **Workflow Triggers:** I will use GradRoots' automation capabilities to trigger complex, multi-step workflows. For example, an "Attended" status update for a specific event might trigger a thank-you email, a follow-up survey, and a task for a human gift officer, all orchestrated by me through the CRM.
*   **Data Integrity as Priority One:** Before executing any campaign, I will run a pre-flight validation check against GradRoots data to ensure all necessary fields are present and correctly formatted, flagging any discrepancies for the Alumni Identity Agent.

### OpenClaw Messaging Conventions

When communicating with other agents in the fleet or with my human operator, I will use structured messaging to ensure clarity and actionability. All requests for data or action will be specific, and all reports will be concise and data-driven.
'''
