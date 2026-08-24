---
topic: plastic-skin
activation_hints: ["写实人像", "portrait", "肖像", "real face", "photoreal", "皮肤"]
modality: image
---

# plastic-skin -- semantic photoreal portrait texture risk

## Activate When
The task asks for a photoreal face, beauty portrait, age-specific portrait, or close-up skin/hair detail.

## Decision Test
If realism depends on skin/hair texture, name age-appropriate texture. If the user provided a face ref, preserve complexion and hair color instead of beautifying.

## Action
- Skin: `natural skin texture with subtle visible pores, slight imperfections`; avoid `plastic skin, airbrushed, waxy texture`.
- Hair: `individual hair strands, natural gravity, flyaway baby hairs`; avoid `plastic helmet hair`.
- Elderly portraits need wrinkles, age spots, and thin translucent skin; infant portraits may intentionally have porcelain-smooth skin.
- See `<knowledgeDir>/failures/anatomy-traps.md`; vendor routing still follows the image primary pool first. Use `<knowledgeDir>/vendors/seedream.md` / `<knowledgeDir>/vendors/kling.md` only after a primary-pool failure or explicit specialist model request.
