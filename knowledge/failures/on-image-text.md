---
topic: on-image-text
activation_hints: ["text", "文字", "标语", "headline", "tagline", "中文", "字幕", "片名", "标题", "文案"]
modality: image
---

# on-image-text -- semantic typography rendering risk

## Activate When
Text must appear inside an image because the user supplied exact wording, asked for typography/layout text, or provided a text-bearing asset that should remain readable.

## Decision Test
If text legibility is part of success, route and prompt for typography as a layout object. If text is not a requested or contributing signal, keep it unspecified; absence is not an exclusion.

## Action
- Text-heavy posters, long Chinese taglines, mixed CJK/Latin, UI/slides, and infographic layouts prefer `<knowledgeDir>/vendors/gpt-image.md`.
- Put exact text in quotes and specify position, hierarchy, alignment, whitespace, and font character.
- Critical text needs long edge ≥2048 where vendor allows.
- Short brand names may work in `<knowledgeDir>/vendors/banana.md` / `<knowledgeDir>/vendors/seedream.md`; video text should be post overlay.
