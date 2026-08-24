---
topic: brand-injection
activation_hints: ["品牌色", "brand color", "logo", "标识", "hex", "#[0-9A-F]{6}", "VI", "brand guideline"]
modality: image
---

# brand-injection -- semantic brand asset risk

## Activate When
The task contains brand colors, logo, VI, packaging, signage, named products, or a reference that may contain owned brand assets. A medium/format label is not a brand signal by itself.

## Decision Test
A brand token is a controlled asset, not ambient style. Preserve owned assets the user provided; strip third-party assets; never infer placement from color alone.

## Action
- Translate hex into perceptual color words and state placement: `warm cream brand color on package label`, not background by default.
- Lock brand color with both ref and prompt body; single-source color declarations drift.
- Logo must come from a ref. Do not invent logo geometry from text; use `<knowledgeDir>/vendors/gpt-image.md` / `<knowledgeDir>/vendors/seedream.md` edit modes.
- For brand guideline or palette input, extract color meaning then write `where used / where not used`.
