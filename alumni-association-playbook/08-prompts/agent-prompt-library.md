# Agent Prompt Library

This document contains a library of operational prompts for the Coastline College Alumni Association's multi-agent system. These prompts are designed to be used within an OpenClaw or Mission Control architecture to direct and coordinate the activities of the specialized agents.

_""

## 1. Alumni Mission Control Agent

**Routine Operations:**

*   "Initiate daily system health check. Report on agent status, API latencies, and any processing backlogs in the GradRoots queue."
*   "Execute the weekly alumni data enrichment cycle. Trigger the Alumni Identity Agent for all records with a `data_staleness_score` > 0.75."
*   "Review all pending human review flags across the agent fleet. Consolidate and assign to the Foundation staff queue in GradRoots."
*   "Generate the weekly operational dashboard summary. Pull KPIs from all agents and format for the Monday morning leadership brief."
*   "Cross-reference all active campaigns with the master communications calendar. Flag any potential audience overlap or message fatigue risks."

**Campaign-Specific Scenarios:**

*   "Activate 'Operation Dolphin Drive,' our annual giving campaign. Deploy the Alumni Giving Agent with the campaign parameters stored in GradRoots object `Campaign:AnnualGiving2026`."
*   "Launch the 'Military-Connected Mentors' initiative. Instruct the Alumni Opportunity Agent to identify 100 alumni veterans in STEM fields for a targeted mentorship recruitment push."

**Cross-Agent Coordination:**

*   "Coordinate a multi-agent response to the new 'Coastline Workforce Partnership' with Northrop Grumman. Task the Career and Employer Pathways Agent to identify relevant alumni at the company, the Alumni Storytelling Agent to draft an announcement, and the Alumni Opportunity Agent to define internship roles."

""_
_""

## 2. Alumni Identity Agent

**Routine Operations:**

*   "Perform a delta scan of the student information system for newly graduated students. Create provisional alumni records in GradRoots for all matching entries."
*   "Query the National Change of Address (NCOA) database for all alumni with mailing addresses older than 12 months. Update records in GradRoots accordingly."
*   "For all alumni with a `missing_employment_data` flag, execute a web search to identify current employer and job title. Create an enrichment task in GradRoots for verification."
*   "Review all alumni records with conflicting information (e.g., two different mailing addresses). Flag for manual review by the data governance team."
*   "Identify all alumni records that have not been updated in the last 24 months. Add them to the queue for the next enrichment cycle."

**Edge Cases:**

*   "An alumnus has requested to be made anonymous. Redact all personally identifiable information from their record in GradRoots and replace it with a unique, non-identifiable ID."
*   "Two records have been identified as duplicates for the same individual. Merge the two records, preserving the most recent and accurate information, and archive the duplicate record."

**Cross-Agent Coordination:**

*   "The Alumni Engagement Agent has flagged a high-potential volunteer. Prioritize the enrichment of this individual's record to ensure all contact and employment information is up-to-date."

""_
_""

## 3. Alumni Intelligence Agent

**Routine Operations:**

*   "Recalculate the `engagement_propensity_score` for all alumni who have interacted with a communication in the last 30 days."
*   "Scan all newly enriched alumni profiles and generate initial scores for mentorship, volunteerism, and giving potential."
*   "Identify the top 50 alumni with the highest `employer_partnership_potential` score who have not been contacted in the last 6 months. Create a task for the Career and Employer Pathways Agent."
*   "Review all alumni who have recently changed jobs into leadership roles (Director level or above). Update their `advocacy_potential_score` and flag for review."
*   "Generate a list of all alumni with a high `philanthropy_readiness_score` but low `engagement_propensity_score`. Recommend a personalized outreach sequence for the Alumni Engagement Agent."

**Campaign-Specific Scenarios:**

*   "For the upcoming scholarship fundraising campaign, identify all past scholarship recipients and score their likelihood of giving back."
*   "Score all alumni in the greater San Diego area for their likelihood of attending a regional networking event."

**Cross-Agent Coordination:**

*   "The Alumni Opportunity Agent has identified a need for 10 new advisory board members. Score all alumni on their suitability and readiness for this type of commitment."

""_
_""

## 4. Alumni Network Graph Agent

**Routine Operations:**

*   "Update the network graph with all new employment data from the latest enrichment cycle. Identify new clusters of alumni at key local employers."
*   "Analyze the connections of all newly registered mentorship volunteers. Surface any shared connections with students seeking mentors."
*   "Map the professional network of all current Foundation board members. Identify potential high-value introductions to corporate or community leaders."
*   "For all high-propensity donors, identify their closest connections within the Coastline network who could serve as peer solicitors."
*   "Identify any alumni who have connections to local government or community organizations that align with Coastline’s strategic priorities."

**Edge Cases:**

*   "Two alumni have the same name and work at the same company. Use additional data points (e.g., graduation year, field of study) to disambiguate their network connections."
*   "An alumnus has a confidential relationship with a major donor. Mark this connection as private and exclude it from all general network visualizations."

**Cross-Agent Coordination:**

*   "The Alumni Event Engine Agent is planning a regional event in Orange County. Provide a list of the most influential alumni in that area to serve as event hosts or ambassadors."

""_
_""

## 5. Alumni Storytelling and Content Agent

**Routine Operations:**

*   "Draft a personalized email to all alumni who recently celebrated a 5-year graduation anniversary. Include a brief mention of a significant college milestone from their graduation year."
*   "Generate three variations of a social media post spotlighting an alumnus who has transitioned from the military to a successful civilian career in cybersecurity."
*   "Write a newsletter article on the impact of the Coastline Promise scholarship program, featuring a testimonial from a recent recipient."
*   "Create a targeted email for alumni in the healthcare sector, inviting them to a virtual panel discussion on the future of nursing."
*   "Draft a thank-you email to all recent donors, personalizing the message based on their giving level and designated fund."

**Campaign-Specific Scenarios:**

*   "For the 'Dolphin Drive' annual giving campaign, create a series of emails and social media posts that build a sense of urgency and highlight the impact of every donation."
*   "Develop a content series for the 'Military-Connected Mentors' initiative, including blog posts, videos, and social media content that tells the stories of successful veteran alumni."

**Cross-Agent Coordination:**

*   "The Alumni Opportunity Agent has identified a need for more mentors in the arts and humanities. Draft a targeted recruitment message for alumni in those fields, emphasizing the value of their experience for current students."

""_
_""

## 6. Alumni Engagement Agent

**Routine Operations:**

*   "Identify all alumni who have recently connected with the college on LinkedIn. Send them a personalized welcome message and invite them to join the official Coastline College Alumni group."
*   "For all alumni celebrating a birthday this month, send a personalized greeting and a link to a free professional development resource."
*   "Review all recent mentorship pairings. Send a check-in email to both the mentor and mentee to see how the relationship is progressing."
*   "Identify all alumni who have attended an event in the last 6 months but have not yet volunteered. Send them a targeted message about upcoming volunteer opportunities."
*   "For all alumni who have recently been featured in the news, send a congratulatory note and ask if they would be willing to be featured in an alumni spotlight."

**Campaign-Specific Scenarios:**

*   "As part of the 'Coastline Cares' initiative, identify all alumni who work in the non-profit sector and invite them to a special networking event."
*   "For the 'Transfer Success' campaign, create a series of automated emails that guide community college students through the transfer process, with tips and advice from successful transfer alumni."

**Cross-Agent Coordination:**

*   "The Alumni Giving Agent has identified a group of high-potential donors. Develop a personalized stewardship plan for each of them, including invitations to exclusive events and meetings with college leadership."

""_
_""

## 7. Alumni Opportunity Agent

**Routine Operations:**

*   "Scan all departmental websites for new advisory board openings. Match qualified alumni to these opportunities and flag for outreach."
*   "Review the strategic plans of local non-profit organizations. Identify potential board seats or volunteer leadership roles for Coastline alumni."
*   "Monitor local and regional business journals for news of company expansions or relocations. Identify potential partnership opportunities for the Career and Employer Pathways Agent."
*   "Cross-reference the list of high-potential donors with the college's capital campaign priorities. Identify potential naming opportunities and major gift solicitations."
*   "Identify all alumni who have expressed an interest in guest speaking. Match them with relevant courses and faculty members."

**Campaign-Specific Scenarios:**

*   "For the 'Student Success' campaign, identify 25 alumni who can provide paid micro-internships for current students."
*   "As part of the 'Coastline Innovates' initiative, identify alumni who are entrepreneurs or venture capitalists to serve as judges for a student pitch competition."

**Cross-Agent Coordination:**

*   "The Alumni Engagement Agent has identified a group of highly engaged alumni. Review their profiles and recommend a personalized slate of opportunities for each of them, ranging from mentorship to philanthropy."

""_
_""

## 8. Alumni Event Engine Agent

**Routine Operations:**

*   "Generate a list of potential event themes for the upcoming academic year, based on alumni demographics, industry trends, and past event performance."
*   "For the upcoming homecoming celebration, create a targeted invitation list of all alumni who live within a 50-mile radius and have attended an event in the past."
*   "Predict the attendance for the upcoming virtual career fair, based on historical data and the number of RSVPs to date."
*   "Send a reminder email to all registered attendees for the upcoming webinar, including the event link and a copy of the agenda."
*   "After each event, send a follow-up email to all attendees with a link to a satisfaction survey and a call to action for future engagement."

**Campaign-Specific Scenarios:**

*   "For the launch of the new culinary arts program, plan a grand opening event featuring a celebrity chef and a tasting menu prepared by current students."
*   "To celebrate the 50th anniversary of the college, organize a gala dinner and awards ceremony to honor distinguished alumni."

**Cross-Agent Coordination:**

*   "The Alumni Giving Agent is planning a donor appreciation event. Provide a list of all major donors and their spouses, along with their preferred event types and dietary restrictions."

""_
"""

## 9. Alumni Giving Agent

**Routine Operations:**

*   "Analyze the giving history of all alumni who have made a gift in the last 12 months. Identify those with the potential to upgrade to a higher giving level."
*   "For all alumni who have made a gift to a specific scholarship fund, send them a personalized update on the impact of their donation, including a story from a recent scholarship recipient."
*   "Identify all alumni who work for companies with a matching gift program. Send them a targeted message with instructions on how to double their donation."
*   "For all alumni who have made a pledge, send them a reminder email a few weeks before their payment is due."
*   "Review all recent online donations. Send a personalized thank-you email within 24 hours."

**Campaign-Specific Scenarios:**

*   "For the annual Day of Giving, create a real-time dashboard that tracks progress towards the fundraising goal and encourages friendly competition between different graduating classes."
*   "As part of a capital campaign for a new STEM building, identify all alumni who work in the technology and engineering sectors and have a high giving capacity. Develop a personalized solicitation strategy for each of them."

**Cross-Agent Coordination:**

*   "The Alumni Engagement Agent has identified a group of highly engaged alumni who have not yet made a donation. Develop a personalized appeal for each of them, highlighting the programs and initiatives that they are most passionate about."

"""
"""

## 10. Alumni Feedback and Learning Agent

**Routine Operations:**

*   "Analyze the results of the most recent alumni satisfaction survey. Identify the top three areas for improvement and create a report for the Foundation leadership."
*   "Review all open-ended feedback from event surveys. Identify any recurring themes or suggestions and flag for review."
*   "Monitor social media for mentions of the Coastline College Alumni Association. Analyze the sentiment of these mentions and report on any significant trends."
*   "For all alumni who have opted out of communications, send a brief, one-question survey to understand their reasons for unsubscribing."
*   "Compare the performance of different email subject lines and calls to action. Recommend best practices for future communications."

**Edge Cases:**

*   "An alumnus has posted a negative comment on the Alumni Association's Facebook page. Draft a respectful and helpful response that addresses their concerns."
*   "A bug has been reported in the online alumni directory. Create a ticket for the IT department and monitor its resolution."

**Cross-Agent Coordination:**

*   "The Alumni Engagement Agent has reported a low open rate for their most recent newsletter. Analyze the content and targeting of the newsletter and recommend improvements."

"""
"""

## 11. Career and Employer Pathways Agent

**Routine Operations:**

*   "Scan major job boards (e.g., LinkedIn, Indeed) for new openings at our top 20 partner employers. Cross-reference with the alumni database to identify qualified candidates."
*   "Identify all alumni who have recently earned a new certification or degree. Send them a congratulatory message and a link to relevant job openings."
*   "Review the career goals of all current students who have signed up for mentorship. Match them with alumni mentors in their desired field."
*   "Monitor the websites of our corporate partners for news of new initiatives or programs. Identify potential opportunities for student internships or projects."
*   "For all alumni who have been unemployed for more than 6 months, send them a targeted message with a link to our career resources and a special invitation to a networking event."

**Campaign-Specific Scenarios:**

*   "For the upcoming virtual career fair, create a targeted list of employers in high-demand fields (e.g., healthcare, cybersecurity) and invite them to participate."
*   "As part of a new partnership with a local hospital, identify all alumni who are registered nurses and invite them to an exclusive recruitment event."

**Cross-Agent Coordination:**

*   "The Alumni Storytelling and Content Agent is creating a series of articles on successful career changers. Provide them with a list of alumni who have made a significant career pivot."

"""
