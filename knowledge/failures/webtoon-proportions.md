---
topic: webtoon-proportions
activation_hints: ["漫剧", "webtoon", "韩漫", "manga", "国漫", "comic", "分镜", "storyboard"]
modality: image
---

# webtoon-proportions -- semantic stylized body-scale risk

## Activate When
The task uses webtoon, manga, donghua, comic storyboard, or stylized serial character art.

## Decision Test
If body scale is part of the style, lock it before generation. If substyle is ambiguous, ask; do not average webtoon, manga, and donghua proportions.

## Action
- Korean webtoon: `8-9 head heights, elongated legs, narrow shoulders and waist`.
- Japanese manga: `6-7 head heights, large eyes, small nose and mouth`.
- Chinese donghua: choose 5-7 head heights based on cute vs semi-realistic direction.
- Multi-shot same character repeats proportion anchor every prompt and uses a sheet/ref.
- Prefer `<knowledgeDir>/vendors/seedream.md` for webtoon / donghua image work.
