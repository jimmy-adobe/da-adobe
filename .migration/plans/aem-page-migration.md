# Page Migration Plan

## Overview

| Property | Value |
|----------|-------|
| **Source URL** | *(Awaiting URL from user)* |
| **Target** | AEM Edge Delivery Services |
| **Project Type** | DA (Document Authoring via da.live) |
| **Mode** | Single Page Migration |

## Approach

This migration will use the full EDS migration workflow, which includes:

1. **Site & Page Analysis** — Scrape the page, identify sections, blocks, and content structure
2. **Block Mapping** — Match source page elements to EDS block variants (reusing existing variants where possible)
3. **Import Infrastructure** — Generate parsers and transformers for content extraction
4. **Content Import** — Execute the import to produce EDS-compatible HTML
5. **Preview & Validation** — Verify rendered output in the local dev server

### Existing Infrastructure

This project already has migration infrastructure from a previous Blue Assured plan page migration:
- 4 validated parsers: `hero`, `tabs`, `columns`, `cards`
- 2 transformers: `bluecross-cleanup`, `bluecross-sections`
- Block code: `tabs` block from Block Collection

If the new page is structurally similar (same site), existing parsers/transformers may be reusable.

## Checklist

- [ ] Obtain source page URL from user
- [ ] Invoke `excat-site-migration` skill with the provided URL
- [ ] Complete site analysis (scrape, screenshot, metadata extraction)
- [ ] Complete page analysis (sections, blocks, content structure)
- [ ] Map blocks to EDS block variants (reuse existing where possible)
- [ ] Generate or reuse import infrastructure (parsers, transformers)
- [ ] Generate import script for the page template
- [ ] Execute content import
- [ ] Verify imported content file
- [ ] Preview rendered page in local dev server

## Prerequisites

- Local AEM dev server running at `localhost:3000`
- Existing project structure in `/workspace/`

## Notes

- **Execution requires exiting Plan mode.** Once the URL is confirmed and the plan is approved, switch to Execute mode to run the `excat-site-migration` skill.
- If the page is from the same Alberta Blue Cross site, we can likely reuse existing transformers and some parsers, significantly speeding up the migration.
