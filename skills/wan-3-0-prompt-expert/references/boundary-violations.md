# Boundary Violations and Repairs

Read this when a request looks unsubmittable, when the user pushes back on a limit, or when a submission has already failed.

Two rules govern every repair:

1. **Fix with the user, do not truncate silently.** Dropping the eleventh reference image changes the output without telling anyone.
2. **Say which constraint is being traded.** Every repair trades something — usually fidelity, duration, or frame exactness.

## Repair table

| Violation | Why it fails | Repair |
| --- | --- | --- |
| 11+ reference images | Cap is 10 | Keep the 10 that carry distinct roles; describe anything lost in words, or split into two generations |
| 6+ reference videos | Cap is 5 | Merge or drop; keep the ones carrying non-redundant motion or camera work |
| Reference video total > 15 s | Cap is 15 s | Trim to the segment whose motion actually matters |
| Reference audio total > 15 s | Cap is 15 s | Trim to the beat or line being referenced |
| Boundary frames supplied **and** reference assets supplied | Mutually exclusive by input kind | Ask which constraint matters more, then rebuild in the winning mode — see `mode-first-last-frame.md` |
| Document **and** web page in one request | Choose one kind | Keep the denser source; summarize the other into the prompt text |
| 2+ documents | Cap is 1 item | Merge into one file, or fold the second into the prompt |
| Document format outside docx/doc/xlsx/xls/pptx/ppt/pdf/txt/md | Unsupported format | Convert the file, or paste the essential content into the prompt |
| Output 30 s while a 15 s video is attached | input + output ≤ 30 s | Shorten the output to 15 s, or shorten the input |
| Output below 2 s with no video input | Minimum is 2 s | Extend to 2 s or more |
| Output above 30 s | Native maximum is 30 s | Use multi-shot composition, or generate in segments and join downstream |
| Prompt over 20,000 characters | Cap is 20,000 | Cut repetition first; move per-shot detail into shorter structured lines |
| Resolution 2K / 4K | Only 480p / 720p / 1080p | Choose 1080p, then upscale downstream if needed |
| Ratio 21:9 or other unlisted ratio | Six supported ratios only | Pick the nearest ratio and plan a crop, or use 智能比例 |
| User expects an extended segment to match the original exactly | Extension regenerates content; slight differences are expected | State this **before** generation, not after |
| User wants no music but did not say so | Model adds BGM by mood | Add 无背景音乐 |
| User wants no dialogue but did not say so | Model invents lines | Add 全片无台词 |
| User wants a locked camera but did not say so | Model improvises movement | Add 固定镜头 |
| User wants one continuous take | Model may cut | Add 生成单镜头 or 一镜到底 |

## When the limit cannot be met at all

Sometimes the honest answer is that the request does not fit Wan 3.0. Say so plainly and name the reason, then offer the nearest workable plan:

- **Needs more than 20 reference assets** — reduce roles, or stage the work across several generations and assemble downstream.
- **Needs outputs far beyond 30 seconds** — Wan 3.0 is not the right tool for a single continuous pass; plan segments.
- **Needs both strict boundary frames and strict reference identity** — resolve by staging, or confirm that another model is required.
- **Needs prompt-level control this model does not expose** — state what is unavailable rather than inventing parameters.

Do not invent a parameter that does not exist, and do not describe a workaround as if the model supported it.

## After a failed submission

1. Re-run the audit in `parameter-limits.md`; most failures are an out-of-range input, not prompt wording.
2. Check the mutual exclusions first — they are the least visible failure mode.
3. Repair the input, change one thing at a time, and say what changed.
4. Confirm before re-running a costly generation. A repeated identical attempt is wasted quota, not persistence.
