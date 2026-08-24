---
topic: cultural-stereotypes
activation_hints: ["中式", "中国风", "日式", "和风", "韩式", "Chinese", "Japanese", "Korean", "cultural", "传统"]
modality: image
---

# cultural-stereotypes -- semantic culture specificity risk

## Activate When
The task uses a broad culture label without region, era, class, medium, or use-case anchors.

## Decision Test
If a culture label can plausibly mean three or more visual traditions, ask. If refs or user wording already anchor the subculture, use that anchor and suppress unrelated cliches.

## Action
- Ask along dimensions, not a fixed menu: era, region, class, medium source, scene use.
- Add explicit exclusions only for stereotypes not requested by the user.
- If the user explicitly asks for a cliche element, keep it and make the surrounding design more specific.

## Calibration
`Chinese` may mean Song literati, Republican commercial print, contemporary guochao, or new-Chinese minimalism; examples are seeds, not bounds.
