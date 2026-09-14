# Wan 3.0 Parameter Limits

Source: Wanxiang 3.0 official creator handbook. These are hard limits — an input outside them is rejected or silently degraded. Audit before writing the prompt, not after.

## Input limits

| Input | Limit | Notes |
| --- | --- | --- |
| Prompt | ≤ 20,000 characters | Raised from the previous generation; long, detailed descriptions are supported and generally improve fidelity |
| First / last frame images | Mutually exclusive with reference mode | Once boundary frames are supplied, reference inputs are no longer accepted |
| Reference images | ≤ 10 | |
| Reference videos | ≤ 5, total duration ≤ 15 s | Count and total duration are both capped |
| Reference audio | ≤ 5, total duration ≤ 15 s | |
| Documents / web pages | Choose one kind, ≤ 1 item | Document formats: docx, doc, xlsx, xls, pptx, ppt, pdf, txt, md. API calls additionally accept key, pages, numbers |

The headline "up to 20 reference assets" is the sum of the three media caps: 10 images + 5 videos + 5 audio.

## Configuration limits

| Setting | Allowed values |
| --- | --- |
| Resolution | 480p / 720p / 1080p |
| Aspect ratio | 16:9 / 9:16 / 4:3 / 3:4 / 1:1 / 智能比例 (model-decided) |
| Duration | See the duration rule below, or 智能时长 (model-decided) |
| Audio | May be switched off; with audio off the output carries no audio track |

Anything outside these enumerations — 21:9, 2K, 4K, 1-second output, 45-second output — is not a Wan 3.0 request. Map to the nearest supported value or change the plan.

## Duration rule

| Condition | Rule |
| --- | --- |
| No video input | Any duration from 2 s to 30 s |
| Video input present | input duration + output duration ≤ 30 s |
| User has no preference | 智能时长 lets the model plan the length |

The 30-second native output is the model's headline capability, but it is a **total timeline** budget once video input enters the request. A 15-second input video leaves 15 seconds of output, not 30.

## Why the limits matter more than wording

Reference fidelity on Wan 3.0 is the reason the model is chosen for production work — it preserves subject, style, and detail from the supplied assets at near pixel level. That fidelity is bought by the asset set. An over-limit or mis-routed asset set does not produce a slightly worse video; it produces a different one, or a rejected job.

Therefore the audit order is:

1. **Mode** — all-purpose reference, or first-last-frame.
2. **Asset inventory** — counts and total durations per kind, and each asset's role.
3. **Mutual exclusions** — boundary frames vs. references; document vs. web page.
4. **Output settings** — ratio, resolution, duration, audio.
5. **Prompt** — formula and content.

Reversing that order is the most common way a Wan 3.0 request fails: a carefully written prompt attached to an illegal input set.
