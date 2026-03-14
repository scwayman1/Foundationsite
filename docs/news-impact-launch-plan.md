# News & Impact Launch Plan

## Purpose

The News & Impact section is the publishing surface for Coastline College Foundation's content flywheel.

It exists to:
- improve donor trust and institutional credibility
- support Google Ad Grant landing-page quality and supporting content
- create organic search entry points for donor and partner intent
- give the Coastline content team a real place to publish and iterate

## Launch Scope

Implemented in the site:
- `/news` index page
- `/news/:slug` article pages
- homepage feature block
- nav integration
- starter local content data model

## Recommended First 5 Real Pieces

### 1. Why Community College Giving Matters in Orange County
- Type: Giving Insights
- Purpose: donor education + geographic search relevance
- CTA: Support Students / Get Involved

### 2. What the Coastline College Foundation Funds
- Type: Foundation News / Giving Insights
- Purpose: answer donor intent clearly and reduce ambiguity
- CTA: Explore Programs / Donate

### 3. How Scholarship Support Expands Access at Coastline
- Type: Scholarships
- Purpose: scholarship giving relevance + student-centered impact proof
- CTA: Support Scholarships

### 4. Supporting Workforce Readiness Through Coastline Programs
- Type: Community Impact
- Purpose: connect giving to workforce and regional outcomes
- CTA: Explore Programs / Partner With Us

### 5. Student Success Stories: How Timely Support Changes Trajectories
- Type: Student Stories
- Purpose: trust, credibility, emotional resonance, campaign support
- CTA: Get Involved / Support Students

## Content Operating Notes

- Avoid generic blog content
- Every post should support trust, search, or conversion
- Prefer category naming that feels institutional and donor-safe
- Internal links should point into Get Involved, Programs, and high-intent giving pages

## Next Technical Steps

1. Add first 5 real articles to `client/src/data/news.ts`
2. Add richer metadata / SEO support for article pages
3. Consider moving content from inline TypeScript data to Markdown or CMS-backed content when volume grows
4. Connect analytics and conversion tracking to `/news` and article pages

## Agent Team Connection

- Beacon: owns editorial priorities
- Signal: defines search opportunity and optimization
- Forge: drafts and revises content
- Helm: evaluates CTA and conversion logic
