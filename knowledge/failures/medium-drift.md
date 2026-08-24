---
topic: medium-drift
activation_hints: ["illustration", "插画", "anime", "3D", "photo", "写实", "风格", "style"]
modality: image
---

# medium-drift -- semantic medium locking risk

## Activate When
The user names a visual medium, supplies style refs, or the project needs cross-asset consistency.

## Decision Test
If the requested output would look wrong in a different medium, lock it. If two media conflict, ask which one dominates instead of blending.

## Action
- End every image/video prompt with `Medium: <one primary medium>.`
- Use one primary medium per asset; style refs may shape line, color, lighting, and texture but must not override the medium lock.
- Put medium lock into direct generation params or the Stage Execution Plan stage record so the executor repeats it verbatim. Add a contrast only when the user explicitly rejected or mixed incompatible media.
- Style-ref and aesthetic-transfer image tasks prefer `<knowledgeDir>/vendors/gpt-image.md`.
