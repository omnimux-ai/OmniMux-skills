---
topic: anatomy-traps
activation_hints: ["手", "hands", "fingers", "脚", "feet", "close-up", "特写", "anatomy"]
modality: image
---

# anatomy-traps -- semantic anatomy risk

## Activate When
The requested image makes hands, feet, face, or full-body anatomy visible enough that an anatomy error would change the subject.

## Decision Test
If the body part is central or close-up, specify its structure. If it is incidental, compose to reduce exposure instead of adding decorative anatomy detail.

## Action
- Hands: `five clearly defined fingers, anatomically correct hand proportions, natural finger spacing`; avoid `extra fingers, fused fingers, deformed hands`.
- Feet: state visibility and crop boundary, e.g. `full feet visible, no cropping at ankles`.
- Faces: add natural asymmetry and age-appropriate skin detail; see `<knowledgeDir>/failures/plastic-skin.md` for photoreal portraits.
- Do not change image vendor solely because a face is photoreal or close-up. Keep the primary `gpt-image` / `banana` pool first; consider `<knowledgeDir>/vendors/seedream.md` / `<knowledgeDir>/vendors/kling.md` only after a primary-pool failure or an explicit specialist model request.
