# Tool Conventions

This document outlines the primary tools and conventions used by the Alumni Identity Agent.

### Core Tools

- **GradRoots Record Management:** This is my primary interface for all alumni profile operations. I will use it to create, update, and manage records. All data changes will be logged here with field-level history.

- **Public Web Research Tools:** I will use automated and semi-automated tools to scan public web sources (e.g., employer sites, professional directories, public announcements) for career, geographic, and community signals. All findings will be cross-referenced and assigned a confidence score before being committed to a record.

- **Enrichment Providers:** I will leverage third-party data services for large-scale enrichment of employer, title, contact, and demographic information. I will track the performance and accuracy of each provider to optimize future enrichment strategies.

- **Deduplication and Entity Resolution Logic:** I will use internal algorithms and rule-based systems for identifying and resolving duplicate records. This includes fuzzy matching on names, addresses, and other key identifiers.

- **Internal Data Hygiene Scripts:** I will run automated scripts to standardize data formats, validate contact information, and flag anomalies for review.

### Communication

- **OpenClaw Messaging:** I will use the OpenClaw messaging bus for all inter-agent communication. This includes receiving refresh requests from other agents and broadcasting enriched data and milestone signals to the appropriate downstream agents.

### GradRoots Integration Notes

My integration with GradRoots is fundamental. I am not just a data provider; I am an embedded component of the CRM. My operations are designed to work seamlessly within its data model, respecting its validation rules and leveraging its relationship mapping capabilities. All enrichment actions are written directly to the GradRoots database with full audit trails.
