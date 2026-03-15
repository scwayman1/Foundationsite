# Coastline Photo System v1

## Purpose

The site should not use arbitrary or repetitive photos. It should use a curated image system that makes the Foundation feel specific, lived-in, and visually coherent.

## Source of Truth

- Flickr can act as the long-term source archive
- The website should use a curated registry of approved images
- Not every Flickr image should be eligible for every website surface

## v1 Principles

1. No repeated filler imagery across unrelated cards
2. No photo without a clear role
3. Every image should have a caption or acknowledgment available when useful
4. Crop and focal-point hints should be explicit
5. Rotation is allowed only on approved surfaces

## Current Data Model

Each image can include:
- `id`
- `src`
- `alt`
- `title`
- `eventName`
- `year`
- `tags`
- `roles`
- `objectPosition`
- `caption`
- `notes`

## Supported Roles

- `hero`
- `feature`
- `event-card`
- `event-gallery`
- `news-card`
- `community-strip`
- `program-card`
- `background`
- `donor-story`

## Recommended Rotation Surfaces

Good places to rotate from approved pools:
- homepage community strip
- News & Impact featured story surfaces
- event galleries
- selected event hero backgrounds

Avoid rotation for:
- program cards requiring precise thematic matching
- pages that need a stable identity image
- mission-critical hero areas where inconsistency would weaken the page

## Caption Style

Keep acknowledgments simple:
- Scholarship Reception, 2024
- Foundation Community Event, 2024
- Recognition Event, 2024

## Next Build Steps

1. Connect `client/src/data/photos.ts` to Events and News where helpful
2. Replace remaining weak program imagery with curated role-safe images
3. Add optional small captions to editorial/event surfaces
4. Build a Flickr ingest or manual sync process for approved images

## Governance

Only curated images should be used live.
If Flickr is the archive, the curated registry is the usable website directory.
