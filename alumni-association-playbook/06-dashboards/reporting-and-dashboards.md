# Reporting and Dashboards

This document outlines the key performance indicators (KPIs) and dashboard designs for monitoring the Coastline College Alumni Association's performance. The dashboards are designed for two primary audiences: the Executive team, for a high-level strategic overview, and the Operations team, for actionable, day-to-day insights.

## Executive Dashboards

The Executive Dashboard provides a strategic overview of the alumni engagement and its impact on the college's goals. It focuses on key outcomes and trends.

### Key Performance Indicators (KPIs)

| KPI | Definition | Data Sources | Refresh Cadence | Suggested Visualization |
|---|---|---|---|---|
| **Total Active Alumni Profiles** | Total number of alumni records in GradRoots marked as "Active," indicating a high degree of data completeness and recent engagement. | GradRoots CRM (Alumni Record Status field) | Daily | Big number display with a historical trend line (month-over-month). |
| **Percent Enriched** | Percentage of active alumni profiles with key data points populated, such as current employer, job title, location, and contact information. | GradRoots CRM (profile completeness score or specific field completion) | Weekly | Gauge chart or percentage bar. |
| **Alumni Engagement by Segment** | A composite score or index measuring engagement levels across different alumni segments (e.g., by program, graduation year, military-connected). Engagement includes email opens, event attendance, mentorship participation, etc. | GradRoots CRM, Email Marketing Platform, Event Management System | Monthly | Heatmap or stacked bar chart comparing engagement scores across segments. |
| **Mentorship Participation** | Number of alumni actively participating as mentors and the number of mentorships initiated. | GradRoots CRM (Mentorship module/fields) | Monthly | Dual-axis chart showing the number of mentors and mentorships over time. |
| **Volunteer Activation** | Number of alumni who have signed up for and participated in volunteer activities. | GradRoots CRM (Volunteer module/fields), Volunteer Management System | Monthly | Funnel chart showing the volunteer pipeline from sign-up to participation. |
| **Employer Introductions** | Number of introductions made between alumni and employers for networking and job opportunities. | GradRoots CRM (Interaction logs) | Monthly | Bar chart showing introductions by industry or company. |
| **Internships/Apprenticeships/Jobs Influenced** | Number of internships, apprenticeships, or jobs secured by students or alumni that were influenced by the alumni network. | GradRoots CRM, Student Career Services data, self-reported data from surveys | Quarterly | Bar chart broken down by opportunity type. |
| **Event Attendance and Conversion** | Total event attendance and the rate at which attendees take a desired next action (e.g., sign up for mentorship, make a donation). | Event Management System, GradRoots CRM | Per event and aggregated monthly | Bar chart for attendance and a conversion rate percentage. |
| **Alumni-to-Donor Pipeline** | The number and percentage of engaged alumni who make their first gift to the college. | GradRoots CRM, Donation Platform | Monthly | Funnel chart showing the progression from engaged alumnus to donor. |
| **Giving Influenced** | Total dollar amount of donations that can be attributed to alumni engagement activities. | GradRoots CRM, Donation Platform | Monthly | Bar chart showing giving influenced by different engagement channels. |

## Operator Dashboards

The Operator Dashboard provides the Alumni Relations team with actionable insights to manage daily operations, prioritize tasks, and engage with alumni effectively.

### Key Performance Indicators (KPIs)

| KPI | Definition | Data Sources | Refresh Cadence | Suggested Visualization |
|---|---|---|---|---|
| **Stale Records Queue** | A list of alumni records that have not been updated or engaged with in a specified period (e.g., 12 months). | GradRoots CRM (Last Modified Date, Last Engagement Date) | Daily | A sortable and filterable table with key alumni data. |
| **New High-Priority Opportunities** | A feed of newly identified opportunities for engagement, such as alumni with high propensity scores or those who have recently changed jobs. | GradRoots CRM (Propensity Scores, Job Change Alerts) | Real-time or Daily | A notification feed or a prioritized list. |
| **Milestone Alerts** | Notifications for significant alumni milestones, such as work anniversaries, birthdays, or graduation anniversaries. | GradRoots CRM (Alumni Data) | Daily | A calendar view or a list of upcoming milestones. |
| **Event Invitation Performance** | Open rates, click-through rates, and conversion rates for event invitations, segmented by alumni demographics. | Email Marketing Platform, GradRoots CRM | Per campaign | A series of bar charts or a table comparing performance across segments. |
| **Segment-Level Outreach Performance** | Engagement metrics for specific outreach campaigns targeted at different alumni segments. | GradRoots CRM, Email Marketing Platform | Per campaign | A dashboard with filters for each campaign and segment. |
| **Volunteer Pipeline Movement** | The number of alumni moving through each stage of the volunteer pipeline, from application to placement. | GradRoots CRM (Volunteer module/fields) | Weekly | A funnel chart or a Sankey diagram. |
| **Mentorship Activation Funnel** | The conversion rate of alumni from expressing interest in mentorship to becoming active mentors. | GradRoots CRM (Mentorship module/fields) | Weekly | A funnel chart with conversion rates at each stage. |
| **Employer Engagement Funnel** | The progression of employer partners from initial contact to active partnership (e.g., hiring students, sponsoring events). | GradRoots CRM (Employer/Partner records) | Monthly | A funnel chart or a Kanban board view. |
| **Philanthropy Readiness Watchlist** | A list of alumni who are showing signs of philanthropic readiness based on their engagement and wealth screening data. | GradRoots CRM (Engagement Scores, Wealth Screening Data) | Weekly | A prioritized and annotated list of prospects. |
