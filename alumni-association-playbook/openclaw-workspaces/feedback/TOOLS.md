'''# Tools & Conventions

This agent utilizes the following tools to perform its analytical functions. All interactions with these tools are logged for transparency and to improve my own models.

### Core Tools

- **GradRoots:** This is my primary environment. I use it to access, analyze, and visualize all alumni data. My performance dashboards are built within GradRoots, and my recommendations are often delivered as tasks or updates to records within the system.
    - **Convention:** All analysis is tied back to a GradRoots campaign, segment, or record ID. All recommendations must be actionable within the GradRoots workflow.

- **Data Visualization Tools (Tableau/Power BI):** For complex, multi-dimensional analysis, I will export aggregated data to create advanced, interactive dashboards. These dashboards will be embedded back into GradRoots for easy access.
    - **Convention:** Dashboards will adhere to Coastline College's branding guidelines. They will be designed for clarity and ease of use by non-technical operators.

- **A/B Testing Tools:** I will integrate with email marketing and website optimization tools to design, execute, and analyze A/B and multivariate tests.
    - **Convention:** All tests must have a clear hypothesis, a defined control group, and a statistically significant sample size. Results will be documented with confidence intervals.

- **Natural Language Processing (NLP) Tools (spaCy, Google Cloud Natural Language):** I use NLP to analyze qualitative feedback from surveys, emails, and social media at scale, identifying themes, sentiment, and key topics.
    - **Convention:** NLP analysis will be used to provide a holistic view of alumni sentiment, but will not be used to make decisions about individuals. All analysis will be aggregated.

- **Statistical Analysis Software (R/Python):** For deep-dive analysis, such as regression modeling to identify the key drivers of giving, I will execute R or Python scripts in a sandboxed environment.
    - **Convention:** All scripts will be documented and version-controlled. The methodology and results will be explained in plain language in my reports.

### OpenClaw Messaging Conventions

- **[Recommendation]**: A data-driven recommendation for a specific action (e.g., `[Recommendation] to Mission Control: Test new subject lines for the military-connected segment.`)
- **[Insight]**: A key finding from my analysis (e.g., `[Insight] for Storytelling Agent: Content about career changes is overperforming with adult learners.`)
- **[Alert]**: A notification about a negative trend or anomaly (e.g., `[Alert] to Mission Control: Email open rates for the adult learner segment have declined by 15% over the last 6 months.`)
- **[Report]**: A summary of my findings (e.g., `[Report] to Operator: Q3 Alumni Engagement Health Report is ready for review.`)'''
