---
topic: constraint-negation
activation_hints: ["no ", "without", "禁止", "不要", "negative", "exclude", "remove"]
modality: image
---

# constraint-negation -- semantic absence risk

## Activate When
The task excludes objects, asks removal, or contains long negative lists / uniqueness constraints.

## Decision Test
If a negative phrase would make the forbidden object salient, rewrite to the desired visible state. Use native negative parameters only when the selected vendor supports them.

## Action
- Prefer positive absence: `empty desert with no man-made structures`, `clean canvas without typography or signage`.
- For explicit medium exclusions, keep them short: `not anime, not 3D render`.
- Do not paste SD-style long negative lists into non-SD vendors.
- Say uniqueness once in normal language: `Render the tagline once, integrated into the layout`.
- `<knowledgeDir>/vendors/midjourney.md` supports `--no text, watermark`; other vendors follow their card.
