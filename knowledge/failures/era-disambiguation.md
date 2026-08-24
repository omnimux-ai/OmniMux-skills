---
topic: era-disambiguation
activation_hints: ["Y2K", "vintage", "复古", "retro", "80年代", "90年代", "千禧", "old school"]
modality: image
---

# era-disambiguation -- semantic era anchoring risk

## Activate When
The task uses era words without geography, decade range, media source, or social context.

## Decision Test
If the same era word points to different visual worlds across regions, ask for region/sub-era. If refs supply region and medium, infer from them and name the anchor.

## Action
- Prompt must bind era + region + medium/context, not era alone.
- Ask with dimensions such as country/region, decade slice, media source, and use case.
- Skip asking when the user gives a clear regional ref or named movement.

## Calibration
`Y2K`, `vintage`, and `80s` are not styles by themselves; they become styles only after region and media source are named.
