# Sample GradRoots Objects, Fields, and Triggers

This document provides a configuration-level specification for GradRoots modules, objects, fields, relationship types, workflow triggers, automation rules, scoring configurations, and report definitions. It is intended to serve as a reference for product teams configuring GradRoots to support the Coastline College Alumni Association agent fleet.

---

## 1. GradRoots Modules

GradRoots is organized into six core modules, each containing the objects and fields required to support the multi-agent system.

| Module | Description | Primary Agents |
| :--- | :--- | :--- |
| Alumni Profiles | Core identity, career, and life context data for every alumnus | Identity, Intelligence |
| Engagement | Communication, event, volunteer, mentorship, and advisory tracking | Engagement, Event Engine, Feedback |
| Events | Event creation, invitation management, attendance tracking, and post-event analysis | Event Engine, Engagement |
| Giving | Donor records, gift history, campaign tracking, stewardship, and pipeline management | Giving, Intelligence |
| Workforce | Employer partnerships, internship pipelines, workforce outcomes, and advisory participation | Career Pathways, Opportunity |
| Relationships | Network graph data, relationship edges, affinity groups, and cluster memberships | Network Graph, Intelligence |

---

## 2. Sample Objects and Fields

### 2.1 Alumni Profile Object

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `alumni_id` | UUID | Yes | Unique GradRoots identifier |
| `full_name` | String | Yes | Current legal or preferred name |
| `prior_names` | Array[String] | No | Previous names and aliases |
| `student_id` | String | No | Coastline student ID |
| `graduation_year` | Integer | No | Year of most recent credential |
| `program_department` | Array[String] | No | Academic programs attended |
| `credentials_earned` | Array[Object] | No | Degrees and certificates with dates |
| `transfer_status` | Enum | No | None, Transferred-In, Transferred-Out, Both |
| `military_connected` | Boolean | No | Military service connection |
| `adult_learner` | Boolean | No | Age 25+ at enrollment |
| `distance_learning` | Boolean | No | Primarily online coursework |
| `current_employer` | String | No | Current employer name |
| `current_title` | String | No | Current job title |
| `geographic_region` | String | No | Regional cluster tag |
| `primary_email` | String | Yes | Primary email address |
| `communication_opt_in` | Boolean | Yes | Opted in to communications |
| `record_health_score` | Float | No | Overall data completeness (0-100) |

### 2.2 Engagement Record Object

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `engagement_id` | UUID | Yes | Unique engagement record ID |
| `alumni_id` | UUID | Yes | Reference to alumni profile |
| `engagement_type` | Enum | Yes | Email, Event, Volunteer, Mentorship, Advisory, Meeting, Referral |
| `engagement_date` | DateTime | Yes | Date and time of engagement |
| `engagement_channel` | Enum | No | Email, Phone, In-Person, Virtual, Social |
| `engagement_outcome` | Enum | No | Positive, Neutral, Negative, No Response |
| `engagement_notes` | Text | No | Free-text notes from operator or agent |
| `created_by` | String | Yes | Agent or user who created the record |
| `campaign_id` | UUID | No | Reference to associated campaign |

### 2.3 Event Object

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `event_id` | UUID | Yes | Unique event ID |
| `event_name` | String | Yes | Event title |
| `event_type` | Enum | Yes | Networking, Career Panel, Workshop, Social, Fundraiser, Reunion, Site Visit |
| `event_format` | Enum | Yes | In-Person, Virtual, Hybrid |
| `event_date` | DateTime | Yes | Event date and time |
| `event_location` | String | No | Venue or virtual platform |
| `target_segment` | Array[String] | No | Target alumni segments |
| `target_region` | String | No | Target geographic region |
| `invite_count` | Integer | No | Number of invitations sent |
| `rsvp_count` | Integer | No | Number of RSVPs received |
| `attendance_count` | Integer | No | Actual attendance |
| `event_status` | Enum | Yes | Planned, Approved, Active, Completed, Cancelled |
| `post_event_survey_sent` | Boolean | No | Whether post-event survey was sent |

### 2.4 Gift Object

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `gift_id` | UUID | Yes | Unique gift record ID |
| `alumni_id` | UUID | Yes | Reference to alumni profile |
| `gift_date` | Date | Yes | Date of gift |
| `gift_amount` | Decimal | Yes | Gift amount |
| `gift_type` | Enum | Yes | Cash, Check, Online, Stock, In-Kind, Planned |
| `campaign_id` | UUID | No | Associated campaign |
| `fund_designation` | String | No | Designated fund or scholarship |
| `employer_match` | Boolean | No | Whether employer match was applied |
| `tribute_type` | Enum | No | None, In Honor Of, In Memory Of |
| `tribute_name` | String | No | Name of honoree |
| `stewardship_status` | Enum | Yes | Pending, Acknowledged, Reported |

### 2.5 Employer Partnership Object

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `partnership_id` | UUID | Yes | Unique partnership record ID |
| `employer_name` | String | Yes | Employer name |
| `employer_industry` | String | No | Industry classification |
| `employer_size` | Enum | No | Small, Medium, Large, Enterprise |
| `primary_alumni_contact_id` | UUID | No | Primary alumni contact at employer |
| `partnership_type` | Enum | Yes | Internship, Hiring Pipeline, Advisory, Sponsorship, Site Visit, Guest Speaker |
| `partnership_status` | Enum | Yes | Lead, Outreach, Active, Dormant, Closed |
| `programs_aligned` | Array[String] | No | Coastline programs aligned with partnership |
| `internships_created` | Integer | No | Number of internships created |
| `students_hired` | Integer | No | Number of students hired |
| `last_contact_date` | Date | No | Date of most recent contact |

### 2.6 Relationship Edge Object

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `edge_id` | UUID | Yes | Unique relationship edge ID |
| `source_entity_id` | UUID | Yes | Source node (alumni, faculty, employer, etc.) |
| `target_entity_id` | UUID | Yes | Target node |
| `relationship_type` | Enum | Yes | Classmate, Colleague, Mentor-Mentee, Faculty-Student, Board-Member, Employer-Employee, Referral |
| `relationship_strength` | Float | No | Strength score (0-100) |
| `evidence_source` | String | No | How the relationship was discovered |
| `last_confirmed` | Date | No | Date relationship was last confirmed |

---

## 3. Sample Relationship Types

| Relationship Type | Source Entity | Target Entity | Description |
| :--- | :--- | :--- | :--- |
| Classmate | Alumni | Alumni | Shared enrollment period and program |
| Colleague | Alumni | Alumni | Shared employer (current or historical) |
| Mentor-Mentee | Alumni | Student/Alumni | Active or completed mentorship pairing |
| Faculty-Student | Faculty | Alumni | Faculty member taught the alumnus |
| Board-Member | Alumni | Foundation | Alumni serves on Foundation board |
| Employer-Employee | Employer | Alumni | Alumni is employed at the organization |
| Referral | Alumni | Alumni | One alumnus referred the other to an opportunity |
| Co-Volunteer | Alumni | Alumni | Shared volunteer service on the same project |
| Co-Donor | Alumni | Alumni | Both contributed to the same campaign or fund |
| Community-Board | Alumni | Organization | Alumni serves on a community board |

---

## 4. Sample Workflow Triggers

| Trigger Name | Condition | Action | Target Agent |
| :--- | :--- | :--- | :--- |
| `stale_record_alert` | `record_health_score < 40` | Queue record for enrichment | Identity Agent |
| `email_bounce_detected` | `primary_email.status = bounced` | Attempt alternate contact recovery | Identity Agent |
| `milestone_detected` | `career_milestones.new_entry = true` | Route milestone to Mission Control | Mission Control |
| `high_engagement_score` | `engagement_propensity_score > 75` | Add to priority outreach queue | Engagement Agent |
| `mentorship_candidate` | `mentorship_potential_score > 70` | Add to mentorship recruitment pipeline | Opportunity Agent |
| `employer_leverage_signal` | `employer_leverage_score > 65` | Create employer partnership lead | Career Pathways Agent |
| `first_gift_received` | `gift_count transitions from 0 to 1` | Trigger first-gift stewardship sequence | Giving Agent |
| `lapsed_donor_alert` | `giving_recency_days > 540 AND total_lifetime_giving > 0` | Queue for lapsed donor reactivation | Giving Agent |
| `event_rsvp_received` | `event_rsvp.status = confirmed` | Update attendance forecast and logistics | Event Engine Agent |
| `reactivation_candidate` | `reactivation_potential_score > 50 AND last_engagement_date < 12 months ago` | Queue for reactivation outreach | Engagement Agent |
| `volunteer_term_expiring` | `volunteer_assignment.end_date within 30 days` | Trigger renewal outreach | Opportunity Agent |
| `philanthropy_ready` | `philanthropic_readiness_score > 60` | Add to cultivation pipeline | Giving Agent |

---

## 5. Sample Automation Rules

| Rule Name | Trigger | Condition | Automated Action |
| :--- | :--- | :--- | :--- |
| Auto-Enrich New Records | New alumni record created | Record has fewer than 5 populated career fields | Queue for Identity Agent enrichment within 24 hours |
| Auto-Score After Enrichment | Identity Agent completes enrichment | Any career or engagement field updated | Trigger Intelligence Agent rescore within 1 hour |
| Auto-Acknowledge First Gift | Gift record created | `gift_count = 1` | Send automated first-gift thank-you email within 24 hours |
| Auto-Invite Regional Cluster | Event created with regional target | Alumni in target region with `event_attendance_score > 50` | Add to event invite list |
| Auto-Flag Duplicate Risk | New record created or batch import | Fuzzy match score > 80% with existing record | Flag for Identity Agent duplicate review |
| Auto-Expire Stale Inferences | Monthly sweep | Inferred field not confirmed in 18+ months | Downgrade confidence to `low` and flag for refresh |
| Auto-Route Milestone | Milestone event detected | Milestone type = promotion, employer change, or public recognition | Route to Mission Control for downstream assignment |
| Auto-Suppress Bounced Email | Email bounce detected | Bounce count > 2 for same address | Suppress email address and flag for alternate recovery |

---

## 6. Sample Scoring Field Configurations

| Score Field | Update Cadence | Input Signals | Weight Distribution | Score Range |
| :--- | :--- | :--- | :--- | :--- |
| `engagement_propensity_score` | Weekly | Email opens (15%), event attendance (25%), volunteer history (20%), mentorship (15%), recency (25%) | Weighted sum, normalized | 0-100 |
| `mentorship_potential_score` | Weekly | Years of experience (20%), leadership level (20%), program alignment (20%), prior mentorship (25%), engagement recency (15%) | Weighted sum, normalized | 0-100 |
| `employer_leverage_score` | Weekly | Hiring authority (30%), employer size (15%), alumni concentration (15%), program alignment (20%), engagement history (20%) | Weighted sum, normalized | 0-100 |
| `philanthropic_readiness_score` | Weekly | Giving history (25%), engagement depth (20%), employer match eligibility (10%), leadership level (15%), event attendance (10%), recency (20%) | Weighted sum, normalized | 0-100 |
| `event_attendance_score` | Weekly | Prior attendance rate (30%), geographic proximity (20%), segment match (15%), engagement recency (20%), RSVP history (15%) | Weighted sum, normalized | 0-100 |
| `reactivation_potential_score` | Monthly | Prior engagement depth (30%), recency of last enrichment (20%), record health (15%), segment value (20%), contact channel validity (15%) | Weighted sum, normalized | 0-100 |
| `record_health_score` | Daily | Field completeness (30%), contact channel validity (25%), enrichment recency (25%), confidence level distribution (20%) | Weighted sum, normalized | 0-100 |

---

## 7. Sample Report Definitions

### 7.1 Executive Reports

| Report Name | Frequency | Key Metrics | Data Source |
| :--- | :--- | :--- | :--- |
| Alumni Engagement Summary | Monthly | Total active alumni, engagement rate by segment, new engagements, lapsed alumni | Engagement Records, Alumni Profiles |
| Giving Dashboard | Monthly | Total giving, donor count, average gift, first-time donors, lapsed donors, campaign progress | Gift Objects, Donor Pipeline |
| Workforce Impact Report | Quarterly | Internships created, students hired, employer partnerships active, advisory seats filled | Employer Partnership Objects |
| Event Performance Report | Quarterly | Events held, total attendance, invite-to-attendance rate, post-event engagement lift | Event Objects, Engagement Records |
| Network Growth Report | Quarterly | New relationships mapped, cluster growth, connector health, introduction outcomes | Relationship Edge Objects |

### 7.2 Operator Reports

| Report Name | Frequency | Key Metrics | Data Source |
| :--- | :--- | :--- | :--- |
| Stale Records Queue | Daily | Records below health threshold, contact channels needing recovery, enrichment queue depth | Alumni Profiles, Identity Agent logs |
| Milestone Alert Feed | Daily | New milestones detected, routing status, outreach status | Milestone Events, Mission Control logs |
| Outreach Performance | Weekly | Emails sent, open rate, click rate, response rate by segment and campaign | Engagement Records, Email Platform |
| Volunteer Pipeline Status | Weekly | Candidates identified, recruited, onboarded, active, expiring | Volunteer Assignment Objects |
| Mentorship Funnel | Weekly | Candidates, recruited, matched, active, completed | Mentorship Objects |
| Employer Engagement Funnel | Weekly | Leads, outreach, active partnerships, dormant, closed | Employer Partnership Objects |
| Philanthropy Readiness Watchlist | Weekly | Alumni above readiness threshold, cultivation stage, next recommended action | Donor Pipeline, Intelligence scores |
| Record Enrichment Activity | Weekly | Records enriched, fields updated, confidence improvements, sources consulted | Identity Agent logs |
