# EDS React Coleman Homepage Migration Plan

**Mode:** Single Page
**Source:** https://main--eds-react-coleman--ensemble-software.aem.live/
**Generated:** 2026-03-26

## Current Status

Step 0 (Initialize Migration Plan) is complete. Steps 1-6 are pending. No previous migration artifacts exist for this page — this is a fresh migration.

## Checklist

- [x] Step 0: Initialize Migration Plan — migration-plan.md created, todo list set up
- [ ] Step 1: Project Setup — Detect project type (da/doc/xwalk), create `.migration/project.json` with library URL
- [ ] Step 2: Site Analysis — Scrape the page, take screenshot, create page template skeleton in `tools/importer/page-templates.json`
- [ ] Step 3: Page Analysis — Analyze sections, blocks, content structure; produce `authoring-analysis.json` and `cleaned.html`
- [ ] Step 4: Block Mapping — Add DOM selectors for each block variant to `page-templates.json`
- [ ] Step 5: Import Infrastructure — Generate block parsers (`tools/importer/parsers/*.js`) and page transformers (`tools/importer/transformers/*.js`)
- [ ] Step 6: Content Import — Generate import script, bundle it, execute import, verify `content/index.plain.html`

## Existing Project Context

| Item | Status |
|------|--------|
| `fstab.yaml` | Not found (project type TBD) |
| `.migration/project.json` | Not created yet |
| `page-templates.json` | Not created yet |
| `parsers/` | Not created yet |
| `transformers/` | Not created yet |
| Existing blocks | `cards`, `columns`, `footer`, `fragment`, `header`, `hero` |

## Approach

1. **Project Setup** — Detect project type from repo config and set the block library endpoint
2. **Site Analysis** — Scrape the Coleman homepage, capture screenshot and metadata, create a template skeleton
3. **Page Analysis** — Identify sections, blocks, and content structure; determine which existing blocks (`hero`, `cards`, `columns`) can be reused vs new blocks needed
4. **Block Mapping** — Map each identified block to its source DOM selector
5. **Import Infrastructure** — Generate parsers for each block and transformers for site-wide cleanup
6. **Content Import** — Generate and bundle the import script, run the import, and verify the output HTML

## Expected Artifacts

- `.migration/project.json` — Project type and library URL
- `migration-work/authoring-analysis.json` — Page structure analysis
- `migration-work/cleaned.html` — Cleaned source HTML
- `tools/importer/page-templates.json` — Template with block mappings
- `tools/importer/parsers/*.js` — One parser per block
- `tools/importer/transformers/*.js` — Site-wide DOM transformers
- `tools/importer/import-*.js` — Import orchestration script
- `content/index.plain.html` — Migrated page content

## Notes

- The source is an existing EDS site, so content is already structured with EDS blocks — this may simplify analysis
- Existing local blocks (`hero`, `cards`, `columns`) should be reused where possible
- **Execution requires switching to Execute mode** to run the `excat-site-migration` skill
