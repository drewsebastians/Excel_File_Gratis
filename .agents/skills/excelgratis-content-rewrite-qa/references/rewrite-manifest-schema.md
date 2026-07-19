# Rewrite Manifest Schema

Gunakan satu record per file dan satu implementation-scope summary per PR/branch.

## Per-file record

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
approved_hash:
  type: git_blob_sha
  value: abc123
implemented_hash:
  type: git_blob_sha
  value: abc123
exact_implementation_match: true
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

## Implementation scope

```yaml
implementation_scope:
  repository: owner/repository
  pull_request: 123
  base_branch: main
  base_sha: abc123
  head_branch: content/example
  head_sha: def456
  commits_ahead: 1
  expected_files:
    - src/content/templates/example.md
  actual_pr_files:
    - src/content/templates/example.md
  unexpected_files: []
  missing_files: []
  cumulative_diff_command: git diff origin/main...HEAD --name-only
  cumulative_scope_status: pass
  validation_run_after_final_branch_state: true
  merge_decision: allow
```

## Scope rules

- `actual_pr_files` harus berasal dari cumulative PR diff, bukan working tree atau latest commit.
- `unexpected_files` tidak boleh kosong secara asumsi; hitung dari actual minus expected.
- `missing_files` dihitung dari expected minus actual.
- Setiap unexpected file adalah blocker sampai disetujui.
- `merge_decision: allow` hanya bila cumulative scope, exact implementation match, accuracy, schema, dan tests lulus.
- Validation harus diulang setelah rebase, cherry-pick, conflict resolution, atau cleanup.

## Required summary

- Files expected
- Files actually changed in cumulative PR diff
- Unexpected files
- Missing files
- Commit count ahead
- Draft status changes
- Slug changes
- Relationship field changes
- Claims removed
- Claims added
- Owner verification remaining
- Approved vs implemented hashes
- Validation commands
- Validation branch/head SHA
- Merge decision
