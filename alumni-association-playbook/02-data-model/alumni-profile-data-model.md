# Alumni Profile Data Model

This document defines the comprehensive data model for Coastline College alumni profiles within GradRoots. Every field is designed to support the multi-agent system's engagement, workforce, and philanthropy workflows. Fields are organized into six domains, each with defined data types, sources, and confidence levels.

## 1. Core Identity

These fields establish the foundational identity of each alumnus and are the primary inputs for deduplication, contact management, and segment assignment.

| Field Name | Type | Description | Primary Source | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `alumni_id` | UUID | Unique GradRoots identifier | System-generated | Confirmed |
| `full_name` | String | Current legal or preferred full name | SIS / Self-reported | Confirmed |
| `prior_names` | Array[String] | Previous names, maiden names, aliases | SIS / Self-reported | Confirmed |
| `student_id` | String | Coastline student ID if available | SIS | Confirmed |
| `graduation_year` | Integer | Year of most recent credential or last attendance | SIS | Confirmed |
| `attendance_period` | DateRange | Start and end dates of enrollment | SIS | Confirmed |
| `program_department` | Array[String] | Academic programs and departments attended | SIS | Confirmed |
| `credentials_earned` | Array[Object] | Degrees, certificates, and credentials earned with dates | SIS | Confirmed |
| `transfer_status` | Enum | None, Transferred-In, Transferred-Out, Both | SIS / Self-reported | Confirmed |
| `transfer_destination` | String | Institution transferred to, if applicable | SIS / Self-reported / Enrichment | High |
| `transfer_outcome` | String | Degree or credential earned at transfer institution | Self-reported / Enrichment | Inferred |
| `military_connected` | Boolean | Whether alumnus has military service connection | SIS / Self-reported | Confirmed |
| `military_branch` | String | Branch of military service | Self-reported / Enrichment | High |
| `military_status` | Enum | Active Duty, Veteran, Reservist, Dependent, None | Self-reported / Enrichment | High |
| `adult_learner` | Boolean | Whether alumnus was 25+ at enrollment | SIS (calculated) | Confirmed |
| `distance_learning` | Boolean | Whether alumnus completed coursework primarily online | SIS | Confirmed |
| `geographic_city` | String | Current city of residence | Enrichment / Self-reported | High |
| `geographic_state` | String | Current state or province | Enrichment / Self-reported | High |
| `geographic_country` | String | Current country | Enrichment / Self-reported | High |
| `geographic_region` | String | Regional cluster tag (e.g., Orange County, San Diego, Bay Area) | Derived | High |
| `primary_email` | String | Primary email address | SIS / Self-reported / Enrichment | Varies |
| `secondary_email` | String | Secondary email address | Self-reported / Enrichment | Varies |
| `phone` | String | Primary phone number | Self-reported / Enrichment | Varies |
| `mailing_address` | Object | Current mailing address | Self-reported / Enrichment | Varies |
| `preferred_channel` | Enum | Email, Phone, SMS, Mail, Social | Self-reported | Confirmed |
| `communication_opt_in` | Boolean | Whether alumnus has opted in to communications | Self-reported | Confirmed |
| `do_not_contact` | Boolean | Whether alumnus has requested no contact | Self-reported | Confirmed |
| `language_preference` | String | Preferred language for communications | Self-reported | Confirmed |

## 2. Career and Life Context

These fields capture the professional trajectory and community involvement of each alumnus, powering workforce, employer partnership, and engagement workflows.

| Field Name | Type | Description | Primary Source | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `current_employer` | String | Current employer name | Enrichment / Self-reported | High |
| `current_title` | String | Current job title | Enrichment / Self-reported | High |
| `current_industry` | String | Industry classification | Enrichment / Derived | High |
| `employer_size` | Enum | Small (<50), Medium (50-500), Large (500-5000), Enterprise (5000+) | Enrichment | Inferred |
| `leadership_level` | Enum | Individual Contributor, Manager, Director, VP, C-Suite, Founder | Enrichment / Derived | Inferred |
| `hiring_authority` | Boolean | Whether alumnus has hiring or talent acquisition authority | Enrichment / Derived | Inferred |
| `entrepreneurial_status` | Boolean | Whether alumnus is a business owner or founder | Enrichment / Self-reported | High |
| `board_service` | Array[Object] | Current and past board memberships with organization names | Enrichment / Self-reported | High |
| `community_leadership` | Array[String] | Community leadership roles and affiliations | Enrichment / Self-reported | High |
| `public_recognition` | Array[String] | Awards, honors, media mentions, and public recognition | Enrichment | High |
| `career_milestones` | Array[Object] | Notable career events with dates (promotions, exits, launches) | Enrichment | High |
| `employer_history` | Array[Object] | Prior employers with titles and date ranges | Enrichment | High |
| `professional_associations` | Array[String] | Professional association memberships | Enrichment / Self-reported | High |

## 3. Engagement History

These fields track every touchpoint between the alumnus and Coastline, forming the behavioral foundation for scoring, segmentation, and next-best-action recommendations.

| Field Name | Type | Description | Primary Source | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `events_attended` | Array[Object] | Events attended with dates, types, and formats | GradRoots Events | Confirmed |
| `events_invited_not_attended` | Array[Object] | Events invited to but not attended | GradRoots Events | Confirmed |
| `volunteer_history` | Array[Object] | Volunteer activities with dates, roles, and hours | GradRoots Engagement | Confirmed |
| `mentorship_history` | Array[Object] | Mentorship participation with dates, mentees, and outcomes | GradRoots Engagement | Confirmed |
| `advisory_service` | Array[Object] | Advisory committee or panel participation | GradRoots Engagement | Confirmed |
| `guest_speaking` | Array[Object] | Guest speaking or career panel appearances | GradRoots Engagement | Confirmed |
| `emails_sent` | Integer | Total emails sent to alumnus | Email Platform | Confirmed |
| `emails_opened` | Integer | Total emails opened | Email Platform | Confirmed |
| `emails_clicked` | Integer | Total email link clicks | Email Platform | Confirmed |
| `last_email_open` | Date | Date of most recent email open | Email Platform | Confirmed |
| `meetings_held` | Array[Object] | One-on-one or group meetings with staff | GradRoots | Confirmed |
| `referrals_made` | Array[Object] | Referrals to other alumni, employers, or opportunities | GradRoots | Confirmed |
| `employer_support_history` | Array[Object] | Employer-related support (internships, hires, partnerships) | GradRoots Workforce | Confirmed |
| `last_engagement_date` | Date | Date of most recent engagement of any type | Derived | Confirmed |
| `engagement_streak` | Integer | Number of consecutive months with at least one engagement | Derived | Confirmed |
| `total_engagement_count` | Integer | Lifetime count of all engagement touchpoints | Derived | Confirmed |

## 4. Philanthropy

These fields track giving behavior and philanthropic readiness, supporting the Giving Agent's cultivation and stewardship workflows.

| Field Name | Type | Description | Primary Source | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `total_lifetime_giving` | Decimal | Total lifetime giving amount | GradRoots Giving | Confirmed |
| `last_gift_date` | Date | Date of most recent gift | GradRoots Giving | Confirmed |
| `last_gift_amount` | Decimal | Amount of most recent gift | GradRoots Giving | Confirmed |
| `giving_frequency` | Enum | One-time, Occasional, Annual, Regular | Derived | Confirmed |
| `giving_recency_days` | Integer | Days since last gift | Derived | Confirmed |
| `amount_band` | Enum | Under $100, $100-$499, $500-$999, $1K-$4,999, $5K-$24,999, $25K+ | Derived | Confirmed |
| `campaigns_participated` | Array[String] | Campaigns contributed to | GradRoots Giving | Confirmed |
| `scholarship_support` | Boolean | Whether alumnus has given to scholarships | GradRoots Giving | Confirmed |
| `tribute_gifts` | Array[Object] | Gifts made in honor or memory of someone | GradRoots Giving | Confirmed |
| `employer_match_eligible` | Boolean | Whether alumnus's employer offers gift matching | Enrichment | Inferred |
| `employer_match_company` | String | Name of employer match program | Enrichment | Inferred |
| `planned_giving_interest` | Boolean | Whether alumnus has expressed planned giving interest | Self-reported | Confirmed |
| `donor_stewardship_level` | Enum | New, Renewed, Lapsed, Major, Legacy | Derived | Confirmed |
| `philanthropic_readiness_score` | Float | Composite score for giving readiness (0-100) | Intelligence Agent | Inferred |

## 5. Relationship Intelligence

These fields capture the alumnus's position within the broader Coastline network, powering the Network Graph Agent and enabling relationship-aware engagement strategies.

| Field Name | Type | Description | Primary Source | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `affinity_clusters` | Array[String] | Affinity group memberships (e.g., Military Veterans, Healthcare Professionals) | Derived / Self-reported | High |
| `shared_program_tags` | Array[String] | Programs or departments shared with other alumni | Derived | Confirmed |
| `relationship_graph_nodes` | Array[Object] | Connected entities (alumni, faculty, staff, employers, donors) with relationship type and strength | Network Graph Agent | High |
| `faculty_ties` | Array[Object] | Known connections to current or former faculty | GradRoots / Self-reported | High |
| `staff_ties` | Array[Object] | Known connections to current or former staff | GradRoots | High |
| `donor_ties` | Array[Object] | Connections to other donors or giving circles | GradRoots Giving | Confirmed |
| `board_ties` | Array[Object] | Connections to current or former board members | GradRoots | High |
| `employer_ecosystem_ties` | Array[Object] | Connections to other alumni at the same employer | Derived | High |
| `regional_cluster_tag` | String | Primary regional alumni cluster membership | Derived | High |
| `network_connector_score` | Float | Measure of centrality and introduction capacity (0-100) | Network Graph Agent | Inferred |
| `introduction_willingness` | Enum | Unknown, Willing, Selective, Declined | Self-reported / Inferred | Varies |

## 6. Scoring and Inference

These fields are computed by the Intelligence Agent and updated on a regular cadence. They drive prioritization, routing, and next-best-action recommendations across all agents.

| Field Name | Type | Description | Update Cadence | Range |
| :--- | :--- | :--- | :--- | :--- |
| `engagement_propensity_score` | Float | Likelihood of engaging with outreach | Weekly | 0-100 |
| `mentorship_potential_score` | Float | Suitability and likelihood for mentorship | Weekly | 0-100 |
| `volunteer_likelihood_score` | Float | Likelihood of volunteering | Weekly | 0-100 |
| `employer_leverage_score` | Float | Capacity to create workforce opportunities | Weekly | 0-100 |
| `event_attendance_score` | Float | Likelihood of attending events | Weekly | 0-100 |
| `advocacy_score` | Float | Potential for public advocacy or ambassadorship | Monthly | 0-100 |
| `philanthropic_readiness_score` | Float | Readiness for giving-related outreach | Weekly | 0-100 |
| `reactivation_potential_score` | Float | Likelihood of re-engaging after dormancy | Monthly | 0-100 |
| `record_health_score` | Float | Overall data completeness and freshness | Daily | 0-100 |
| `stale_record_risk` | Float | Risk that record data is outdated | Daily | 0-100 |
| `next_best_action` | String | Recommended next engagement action | Weekly | N/A |
| `next_best_action_confidence` | Float | Confidence in the recommended action | Weekly | 0-100 |
| `score_last_updated` | DateTime | Timestamp of most recent score recalculation | Per update | N/A |

## 7. Record Metadata

These fields support data governance, audit trails, and system operations.

| Field Name | Type | Description | Primary Source | Confidence |
| :--- | :--- | :--- | :--- | :--- |
| `record_created_date` | DateTime | When the GradRoots record was created | System | Confirmed |
| `record_last_modified` | DateTime | When the record was last modified | System | Confirmed |
| `record_modified_by` | String | Agent or user who last modified the record | System | Confirmed |
| `enrichment_last_run` | DateTime | When the Identity Agent last enriched this record | Identity Agent | Confirmed |
| `enrichment_source_log` | Array[Object] | Log of all enrichment sources consulted with timestamps | Identity Agent | Confirmed |
| `merge_history` | Array[Object] | Log of any record merges involving this profile | Identity Agent | Confirmed |
| `data_confidence_overall` | Float | Aggregate confidence score across all fields | Derived | Inferred |
| `consent_status` | Enum | Opted-In, Opted-Out, Unknown | Self-reported | Confirmed |
| `consent_date` | DateTime | Date of most recent consent action | Self-reported | Confirmed |
| `suppression_flags` | Array[String] | Any active suppression flags (e.g., Do Not Call, Do Not Mail) | Self-reported / Compliance | Confirmed |
