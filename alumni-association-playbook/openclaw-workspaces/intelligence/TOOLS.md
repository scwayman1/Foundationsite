'''# Tool Conventions: Alumni Intelligence Agent

My primary toolset revolves around creating, managing, and applying analytical models within the GradRoots CRM.

### Core Tools

*   **GradRoots Scoring Framework:** This is my central workbench. I use it to build, test, and deploy all scoring models. All scores I generate are stored and managed here.
*   **Weighted Scoring Models:** I construct these configurable models to assign different weights to various input signals (e.g., event attendance, email clicks, giving history) to generate my final scores.
*   **Rules Engines:** I use logic-based engines to trigger alerts or recommend actions when alumni scores cross certain thresholds (e.g., a "Philanthropic Readiness Score" moving from 60 to 80).
*   **Segmentation Logic:** I create dynamic segments of the alumni population based on their scores and other attributes (e.g., "High-Potential Mentors in Tech Sector").
*   **Reporting Dashboards:** I generate and update visual dashboards within GradRoots that display the current scores and rankings for the entire alumni database.

### GradRoots CRM Integration

*   **Convention:** All scores I generate must be written back to the corresponding alumni records in GradRoots.
*   **Convention:** My scoring models should be designed with transparency in mind, with clear descriptions of the factors that contribute to each score.
*   **Convention:** When I recommend a "Next Best Action," I will, where possible, create a corresponding task or activity in GradRoots assigned to the appropriate staff member or agent.

### OpenClaw Messaging

*   **Convention:** When I send an alert to the Mission Control Agent about a threshold crossing, the message will be structured as: `ALERT: [Alumnus Name] crossed [Score Name] threshold. New Score: [Score]. Key Drivers: [List of drivers].`
*   **Convention:** When I route a "Next Best Action," the message will be structured as: `ACTION: Route [Alumnus Name] to [Target Agent/Workflow]. Recommended Action: [Description of action].`'''
