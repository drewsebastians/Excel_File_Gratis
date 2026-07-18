# Rewrite Manifest Schema

Gunakan satu record per file.

```yaml
path: src/content/templates/example.md
collection: templates
status: pass
change_type:
  - body_rewrite
  - metadata_refresh
primary_keyword: example keyword
search_intent: download
facts_preserved:
  - Number of sheets
  - Macro status
facts_changed:
  - field: meta_description
    reason: clearer CTR proposition
claims_removed:
  - Unsupported compatibility claim
owner_verification:
  - Confirm chart behavior in Google Sheets
seo_changes:
  - Shortened title
  - Added specific H2
links_added:
  - /panduan/example/
quality_score:
  accuracy: 25
  search_intent: 18
  clarity: 14
  specificity: 14
  seo: 14
  trust: 10
  total: 95
tests:
  check: pass
  build: pass
  validate: pass
```

## Required summary

- Files changed
- Files skipped
- Draft status changes
- Slug changes
- Claims removed
- Claims added
- Owner verification remaining
- Validation commands
