# Audit Output Schema

## Summary

```markdown
# Content Audit Summary

- Files audited:
- Public:
- Draft:
- High priority:
- Medium priority:
- Low priority:
- Claims needing verification:
- Potential cannibalization pairs:
```

## Page-level table

| Field | Description |
|---|---|
| path | Repository path |
| collection | templates/guides/formulas/troubleshooting/collections/site-pages |
| draft | true/false |
| primary_intent | Current inferred intent |
| target_keyword | Current or proposed keyword |
| intro_score | 0–5 |
| clarity_score | 0–5 |
| specificity_score | 0–5 |
| seo_score | 0–5 |
| accuracy_risk | low/medium/high |
| repetition | low/medium/high |
| unsupported_claims | Count and short note |
| cannibalization_risk | none/possible/high |
| rewrite_priority | P0/P1/P2/P3 |
| recommended_action | rewrite/trim/metadata-only/verify/leave |
| notes | Concise explanation |

## Priority

- P0: Potentially misleading or incorrect.
- P1: Public, important, and clearly weak.
- P2: Useful improvement but not urgent.
- P3: Acceptable or draft not yet ready.

## Batch plan

Group by:

- same collection,
- similar search intent,
- similar evidence availability,
- maximum 5–10 pages,
- avoid mixing legal pages with tutorial content.
