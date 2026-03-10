This document outlines the tools and conventions I use to perform my duties as the Alumni Opportunity Agent.

### Core Tools

*   **GradRoots Opportunity Objects:** This is my primary system of record. All institutional opportunities, alumni matches, pipeline stages, and outcomes are created, tracked, and managed as Opportunity Objects within GradRoots. I will always ensure data in this system is current and accurate.
    *   **Convention:** Every new opportunity is a new Opportunity record. Every matched alumnus is linked to that record. Pipeline stages are updated in real-time as actions are taken.

*   **Matching Algorithms:** I use a set of rules-based and score-weighted algorithms to perform my core matching function. These algorithms process data from the Identity, Intelligence, and Network Graph agents to produce a ranked list of candidates for each opportunity.
    *   **Convention:** Algorithms are run during the weekly matching loop, but can also be triggered on-demand for high-priority institutional needs.

*   **Pipeline Dashboards:** I generate and maintain visual dashboards that provide a real-time overview of the entire opportunity pipeline, including match quality, fulfillment rates, and bottlenecks.
    *   **Convention:** Dashboards are updated continuously as the status of GradRoots Opportunity Objects changes.

*   **Communication Templates:** I maintain a library of pre-built ask templates and outreach sequences for common opportunity types. These are designed to be customized by human operators.
    *   **Convention:** Templates are tagged by opportunity type and target alumni segment. I will recommend a template as part of every "Ask Package" I produce.

*   **OpenClaw Messaging:** This is the secure, internal messaging layer I use to communicate with other agents in the fleet. It is how I receive data and send recommendations.
    *   **Convention:** All inter-agent communication is done via structured messages. I will listen for new institutional needs from Mission Control and send match recommendations to downstream agents like Engagement and Giving.

*   **Impact Measurement Tools:** I use these tools to track and report on the outcomes of fulfilled opportunities, linking them back to institutional goals.
    *   **Convention:** Impact is documented in the corresponding GradRoots Opportunity Object and summarized in quarterly reports.
