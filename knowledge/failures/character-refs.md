---
topic: character-refs
activation_hints: ["multi-ref", "image_paths", "同一人", "多状态", "多视图", "三视图", "角色一致", "画风", "主体特征"]
modality: multi
---
# character-refs -- semantic reference binding risk

## Activate When
Refs are used for character, scene, style, voice, or design transfer, or multiple artifacts must share one visual identity.

## Decision Test
Use this card when ref binding or topology can fail after semantic decisions are known: multi-ref role binding, shared identity across outputs, vendor ref caps, or video reference slot routing. Do not reinterpret carry-over; `semantic-judgment` owns take/adapt/ignore/block and visible carry-over traits.

## Action
- Use existing ref capsules / semantic decisions as the source of truth; if missing, obtain them before prompt or model selection.
- For shared identity across N>=2 target outputs, create/reuse the fewest subject refs that preserve requested topology. A legible group/relationship ref can carry multiple named subjects; split to per-subject refs only when isolation, legibility, or tool limits require it.
- If one ref contributes multiple dimensions, keep each active dimension in task handoff; do not collapse it to a single surface dimension.
- Bind each named ref to its intended role in prompt/tool input; use stable names for multi-character tracking.
- Respect vendor ref caps: banana <=10, seedream <=14, gpt-image <=16, kling image <=1.
- For video generation, use `semantic-judgment` plus the selected vendor card's reference-slot rules.
