# Coastline Alumni Scoring Models

This document outlines the scoring frameworks used by the Alumni Intelligence Agent to prioritize and segment Coastline College alumni. Each model provides a quantitative measure for a specific dimension of potential engagement, enabling targeted and effective outreach.

## 1. Engagement Propensity Score

**Definition:** Measures the likelihood of an alumnus to engage with the college through any channel, including digital interactions, event attendance, and responding to communications.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Email Open Rate (last 12 months)            | 20             |
| Email Click-Through Rate (last 12 months)   | 25             |
| Website Visits (last 6 months)              | 15             |
| Social Media Mentions/Engagement            | 10             |
| Profile Update on Alumni Portal             | 15             |
| Survey Responses                            | 10             |
| Time Since Last Engagement (decay factor)   | -5 per quarter |

**Scoring Logic:**

`Engagement Propensity = (Email Open Rate * 0.20) + (Email CTR * 0.25) + (Website Visits * 0.15) + (Social Media Engagement * 0.10) + (Profile Update * 0.15) + (Survey Responses * 0.10) - (Quarters Since Last Engagement * 5)`

**Score Bands:**

- **0-25:** Low Propensity
- **26-50:** Moderate Propensity
- **51-75:** High Propensity
- **76-100:** Very High Propensity

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | Score enters this band.                        | Prioritize for personalized outreach, invitations to exclusive events, and targeted volunteer/mentorship asks.      |
| **51-75 (High)**    | Score remains in this band for 2+ months.      | Include in regular, high-value communication streams. Nurture with stories of impact and opportunities.         |
| **26-50 (Moderate)**  | Score drops into this band from a higher one.  | Initiate a re-engagement campaign with compelling content or a survey to understand their interests better.     |
| **0-25 (Low)**      | New alumni or inactive for 6+ months.          | Place in a low-frequency, "best of" newsletter. Attempt a data refresh and reactivation campaign after 12 months. |

---

## 2. Event Attendance Likelihood Score

**Definition:** Predicts the probability of an alumnus attending a specific event, either virtual or in-person, based on their profile and past behavior.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Past Event Attendance (same category)       | 30             |
| Geographic Proximity (for in-person events) | 25             |
| Stated Interests Match Event Topic          | 20             |
| Career Field Alignment with Event           | 15             |
| Engagement Propensity Score                 | 10             |

**Scoring Logic:**

`Event Likelihood = (Past Attendance * 0.30) + (Proximity * 0.25) + (Interest Match * 0.20) + (Career Alignment * 0.15) + (Engagement Propensity * 0.10)`

**Score Bands:**

- **0-25:** Low Likelihood
- **26-50:** Moderate Likelihood
- **51-75:** High Likelihood
- **76-100:** Very High Likelihood

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | Score calculated for a new event.              | Send a personalized invitation with a direct call to action. Consider a follow-up call from a staff member.       |
| **51-75 (High)**    | Score calculated for a new event.              | Include in the primary targeted invitation list. Use segmented messaging highlighting the benefits for them.      |
| **26-50 (Moderate)**  | Score calculated for a new event.              | Include in broader, secondary marketing pushes for the event.                                                   |
| **0-25 (Low)**      | Score calculated for a new event.              | Send a general awareness email, but do not invest significant resources in direct outreach for this specific event. |

---

## 3. Mentorship Potential Score

**Definition:** Assesses an alumnus\'s suitability and potential willingness to serve as a mentor to current students or other alumni.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Job Title / Seniority                       | 25             |
| Years of Experience in Field                | 20             |
| Expressed Interest in Mentoring (survey)    | 30             |
| Past Volunteerism (any capacity)            | 15             |
| Industry (high-demand fields for students)  | 10             |

**Scoring Logic:**

`Mentorship Potential = (Seniority * 0.25) + (Experience * 0.20) + (Expressed Interest * 0.30) + (Past Volunteerism * 0.15) + (Industry * 0.10)`

**Score Bands:**

- **0-25:** Low Potential
- **26-50:** Moderate Potential
- **51-75:** High Potential
- **76-100:** Very High Potential

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | Score enters this band.                        | Initiate a direct, personalized recruitment campaign for the mentorship program. Highlight the impact they can make. |
| **51-75 (High)**    | Score remains in this band.                    | Include in informational content about the mentorship program. Share testimonials from current mentors.           |
| **26-50 (Moderate)**  | Alumnus enters a high-demand career field.     | Send general information about ways to get involved, with mentorship as one of several options.                  |
| **0-25 (Low)**      | N/A                                            | No direct action. Focus on general engagement.                                                                  |

---

## 4. Volunteer Likelihood Score

**Definition:** Measures the likelihood of an alumnus to volunteer their time for the college in non-mentorship capacities (e.g., event support, committee participation, guest speaking).

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Past Volunteerism (any capacity)            | 35             |
| Expressed Interest in Volunteering (survey) | 25             |
| High Engagement Propensity Score            | 20             |
| Attended "behind-the-scenes" or info events | 10             |
| Alumni Association Membership (if applicable) | 10             |

**Scoring Logic:**

`Volunteer Likelihood = (Past Volunteerism * 0.35) + (Expressed Interest * 0.25) + (Engagement Propensity * 0.20) + (Info Session Attendance * 0.10) + (Membership * 0.10)`

**Score Bands:**

- **0-25:** Low Likelihood
- **26-50:** Moderate Likelihood
- **51-75:** High Likelihood
- **76-100:** Very High Likelihood

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | New volunteer opportunity arises.              | Send a targeted recruitment message for the specific opportunity.                                                 |
| **51-75 (High)**    | Score enters this band.                        | Add to a "Volunteer Interest" segment for regular updates on new opportunities.                                 |
| **26-50 (Moderate)**  | Engages with content about volunteering.       | Nurture with stories about the impact of volunteers at Coastline.                                               |
| **0-25 (Low)**      | N/A                                            | No direct action. Focus on general engagement.                                                                  |

---

## 5. Employer Partnership Potential Score

**Definition:** Identifies alumni who are well-positioned within their organizations to facilitate employer partnerships, such as internships, hiring pipelines, or corporate sponsorships.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Job Title (e.g., HR, Talent, Executive)     | 30             |
| Company Size / Growth Trajectory            | 20             |
| Industry Alignment with Coastline Programs  | 20             |
| Past Engagement with Career Services        | 15             |
| Alumnus is a hiring manager or business owner | 15             |

**Scoring Logic:**

`Employer Partnership Potential = (Job Title * 0.30) + (Company Size * 0.20) + (Industry Alignment * 0.20) + (Past Engagement * 0.15) + (Hiring Manager/Owner * 0.15)`

**Score Bands:**

- **0-25:** Low Potential
- **26-50:** Moderate Potential
- **51-75:** High Potential
- **76-100:** Very High Potential

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | Score enters this band.                        | Route to Career Services / Foundation for direct, high-touch outreach to explore partnership opportunities.      |
| **51-75 (High)**    | Company posts relevant jobs.                   | Send information about partnership benefits and how to post jobs directly to the Coastline community.             |
| **26-50 (Moderate)**  | Alumnus works at a company of interest.        | Include in general communications about the value of hiring Coastline graduates.                                |
| **0-25 (Low)**      | N/A                                            | No direct action.                                                                                               |

---

## 6. Advocacy Potential Score

**Definition:** Measures an alumnus\'s potential to act as a public advocate for the college, such as sharing positive stories on social media, testifying in support of funding, or representing the college in the community.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Positive Social Media Mentions of Coastline | 30             |
| High Engagement Propensity Score            | 20             |
| Community Leadership Role                   | 20             |
| Expressed Pride in Coastline (e.g., survey) | 15             |
| Strong connection to a specific program/faculty | 15             |

**Scoring Logic:**

`Advocacy Potential = (Social Media Mentions * 0.30) + (Engagement Propensity * 0.20) + (Community Leadership * 0.20) + (Expressed Pride * 0.15) + (Program Connection * 0.15)`

**Score Bands:**

- **0-25:** Low Potential
- **26-50:** Moderate Potential
- **51-75:** High Potential
- **76-100:** Very High Potential

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | Legislative issue or PR opportunity arises.    | Activate as part of a targeted advocacy campaign. Provide them with tools and messaging.                         |
| **51-75 (High)**    | Score enters this band.                        | Add to an "Ambassador" segment. Keep them informed about college news and successes.                            |
| **26-50 (Moderate)**  | Shares a positive news story about Coastline.  | Acknowledge and thank them. Encourage them to continue sharing.                                                 |
| **0-25 (Low)**      | N/A                                            | No direct action.                                                                                               |

---

## 7. Philanthropic Readiness Score

**Definition:** Assesses an alumnus\'s potential capacity and inclination for financial giving to the college. This is distinct from wealth screening and focuses on behavioral and engagement-based indicators relevant to a community college context.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Past Giving to Coastline (any amount)       | 35             |
| High Engagement Propensity Score            | 20             |
| Consistent, long-term engagement            | 15             |
| Attendance at stewardship/impact events     | 10             |
| Expressed philanthropic intent (survey)     | 10             |
| Career success / seniority                  | 10             |

**Scoring Logic:**

`Philanthropic Readiness = (Past Giving * 0.35) + (Engagement Propensity * 0.20) + (Consistent Engagement * 0.15) + (Stewardship Attendance * 0.10) + (Expressed Intent * 0.10) + (Career Success * 0.10)`

**Score Bands:**

- **0-25:** Low Readiness
- **26-50:** Moderate Readiness
- **51-75:** High Readiness
- **76-100:** Very High Readiness

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | Score enters this band.                        | Route to Foundation for personal outreach and qualification.                                                    |
| **51-75 (High)**    | Giving Tuesday or campaign launch.             | Include in targeted annual fund solicitations and campaign appeals.                                             |
| **26-50 (Moderate)**  | Engages with content about giving/impact.      | Nurture with stories of philanthropic impact. Send broad-based, low-ask appeals.                                |
| **0-25 (Low)**      | N/A                                            | Focus on value-first engagement. Do not solicit.                                                                |

---

## 8. Record Freshness / Stale Risk Score

**Definition:** Assesses the currency and accuracy of an alumnus\'s contact and employment information. A lower score indicates a higher risk of the record being stale.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Time Since Last Profile Update              | -10 per year   |
| Time Since Last Engagement (any channel)    | -5 per quarter |
| Email Hard Bounce                           | -50            |
| Returned Mail                               | -40            |
| Successful Data Enrichment (positive score) | +30            |
| User-verified information                   | +50            |

**Scoring Logic:**

`Record Freshness = 100 - (Years Since Update * 10) - (Quarters Since Engagement * 5) - (Bounce * 50) - (Returned Mail * 40) + (Enrichment * 30) + (Verification * 50)`

**Score Bands:**

- **0-25:** Very Stale / High Risk
- **26-50:** Stale / Moderate Risk
- **51-75:** Current
- **76-100:** Very Current / Verified

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very Current)** | N/A                                            | No action needed.                                                                                               |
| **51-75 (Current)**   | N/A                                            | No action needed.                                                                                               |
| **26-50 (Stale)**     | Score drops into this band.                    | Trigger the Alumni Identity Agent to perform a data enrichment cycle.                                           |
| **0-25 (Very Stale)** | Score drops into this band or hard bounce.     | Flag for manual review. Initiate a "Lost Alumni" workflow to try and find new contact information.              |

---

## 9. Reactivation Opportunity Score

**Definition:** Identifies disengaged or "lost" alumni who show signs of being good candidates for a targeted reactivation campaign.

**Input Signals & Weights:**

| Signal                                      | Example Weight |
| ------------------------------------------- | -------------- |
| Past High Engagement Propensity             | 30             |
| Time Since Last Engagement (sweet spot: 2-5 yrs) | 20             |
| Strong Program/Faculty Connection in past   | 20             |
| Found new contact/employment info           | 15             |
| Milestone Year (e.g., 10th anniversary of grad) | 15             |

**Scoring Logic:**

`Reactivation Opportunity = (Past High Engagement * 0.30) + (Time Since Engagement * 0.20) + (Past Connection * 0.20) + (New Info * 0.15) + (Milestone Year * 0.15)`

**Score Bands:**

- **0-25:** Low Opportunity
- **26-50:** Moderate Opportunity
- **51-75:** High Opportunity
- **76-100:** Very High Opportunity

**Triggers & Actions:**

| Score Band          | Triggers                                       | Recommended Actions                                                                                             |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **76-100 (Very High)** | Score enters this band.                        | Launch a personalized reactivation campaign. "We miss you! Here\'s what\'s new in your old program..."             |
| **51-75 (High)**    | New contact info found.                        | Add to a multi-touch reactivation nurture stream.                                                               |
| **26-50 (Moderate)**  | Milestone year approaches.                     | Include in a general "class notes" or milestone-focused communication.                                          |
| **0-25 (Low)**      | N/A                                            | No direct action. Keep in the "lost alumni" pool for future data enrichment attempts.                            |

