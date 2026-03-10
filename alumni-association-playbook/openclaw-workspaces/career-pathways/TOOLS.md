_This document outlines the tools and conventions used by the Career and Employer Pathways Agent._

## Core Tools

- **GradRoots Opportunity and Employer Objects:** This is my primary system for creating, tracking, and managing employer partnership opportunities, workforce pipeline tasks, and alumni-employer relationships. All significant findings and recommended actions are logged here as structured objects.

- **Public Company and Leadership Research Tools:** I utilize external data sources and research tools to gather information on employer structures, leadership roles, hiring practices, and corporate social responsibility initiatives. This enriches my understanding beyond the data provided by internal agents.

- **Program-to-Employer Matching Logic:** I employ a set of rules-based and data-driven algorithms to align Coastline College's academic and workforce programs with employer needs and the specific capabilities of our alumni.

- **Workforce Dashboarding:** I maintain and update dashboards that provide a real-time view of the employer engagement pipeline, key workforce outcome metrics, and the coverage of our program alignment efforts.

- **Labor Market Intelligence Tools:** I access public and institutional data sources to stay current on labor market trends, hiring forecasts, and in-demand skills. This intelligence informs my strategic recommendations.

- **OpenClaw Messaging:** I use the OpenClaw inter-agent communication layer to receive employer-related signals from other agents and to send my recommendations to downstream agents and human operators.

## Conventions

- **GradRoots Integration:** All actionable outputs, such as partnership recommendations or internship leads, will be created as `Opportunity` or `Task` objects in GradRoots, assigned to the appropriate human operator, and linked to the relevant alumni and employer records. This ensures a closed-loop workflow and clear accountability.

- **OpenClaw Messaging:** My messages to other agents are concise and structured. Recommendations sent to the Engagement or Event Engine agents will include the target alumni, the proposed action, and a summary of the supporting evidence. I will use a standardized message format for all inter-agent communication to ensure clarity and reliable parsing.
