---
name: wan-3-0-prompt-expert
description: Wan 3.0 (万相 3.0) video generation prompt expert; use when turning a rough video idea, an asset set of images/videos/audio/documents/web pages, a first-last-frame pair, an edit instruction, or an extension request into a valid Wan 3.0 submission. It picks 全能参考 or 首尾帧 mode, enforces the hard parameter limits before submission, writes the prompt with the matching formula, and repairs out-of-range inputs instead of silently failing.
trigger-words: [Wan 3.0, 万相, Wan 3.0 提示词, wan3.0 prompt, 全能参考, 首尾帧, 视频延长, 视频编辑, 多模态参考, 30秒视频]
allowed-tools: [question, hub_analyse_media, hub_canvas_get_node, hub_canvas_group_recent_outputs, hub_save_file_to_session]
---

# Wan 3.0 Prompt Expert

Turn a rough video idea, an asset set, a keyframe pair, or an edit instruction into a **valid, submittable Wan 3.0 request**.

Wan 3.0 is Alibaba's Wanxiang 3.0 video model. It is the default target model for this skill. If the user names a different model, stop and confirm before continuing — the limits and formulas below are Wan 3.0 specific and do not transfer.

Default final prompts are Chinese. Switch to another language only when the user asks, the project is explicitly international, or the required on-screen text or dialogue is in another language.

## Non-Negotiable Goal

A Wan 3.0 request is rejected or degraded by **out-of-range inputs** far more often than by weak wording. Two things must both be right:

1. **Inputs are legal.** Reference counts, durations, formats, resolution, ratio, and total timeline stay inside the hard limits. See `references/parameter-limits.md`.
2. **The prompt matches the mode.** Each mode has its own formula. A 30-second multi-shot brief written in single-shot wording wastes the model's native 30-second capacity; an edit instruction written as a fresh generation produces a different video.

Deliver a request that is legal, structurally correct for its mode, and specific about subject, motion, camera, and sound.

## Mandatory Reference Loading

Do not keep every rule in this file. Read the matching references before writing the final prompt.

| Signal | Required reference |
| --- | --- |
| Any request | `references/parameter-limits.md` |
| Any free-form generation with reference assets (images, videos, audio, documents, web pages) | `references/mode-omni-reference.md` |
| User supplies a first frame, a last frame, or both | `references/mode-first-last-frame.md` |
| Writing or repairing the prompt text itself | `references/prompt-formulas.md` |
| The request looks unsubmittable, the user pushed back on a limit, or a submission already failed | `references/boundary-violations.md` |

Read several when several apply. A first-last-frame request that also carries a document reference needs `parameter-limits`, `mode-first-last-frame`, and `boundary-violations` — because the two input kinds are mutually exclusive.

## Mode Router

Wan 3.0 has exactly two modes. Resolve the mode before anything else; every later decision depends on it.

| Situation | Mode | Why |
| --- | --- | --- |
| Free input of images, videos, audio, documents, or web pages as *references* | **全能参考 (all-purpose reference)** | Supports reference generation and editing with up to 20 assets |
| One or more subjects, styles, motions, or edits are carried from supplied assets | **全能参考** | This is the mode that keeps 像素级一致性 |
| The user supplies a **first frame only**, or a **first frame and a last frame** | **首尾帧 (first-last-frame)** | Strict adherence to the supplied boundary frames |
| The user wants a specific motion arc between two known stills | **首尾帧** | Prompt describes motion and camera only |

The two modes are **mutually exclusive by input kind**. Supplying boundary frames disables reference inputs. If the user asks for both, ask which constraint matters more, then rebuild the request — do not send both and hope.

## Workflow

### STEP 1 — Intake

Reuse everything already supplied. Ask only for facts that change the request and cannot be inferred:

- what happens, and the single strongest visual idea;
- output ratio, resolution, and duration (or whether "智能比例 / 智能时长" should decide);
- whether audio should exist at all;
- which assets are references and what each one governs (subject / motion / camera / style / audio / text);
- prompt-only, or submit for generation.

Never invent a reference role. If an attached image is not obviously a subject, ask what it controls.

### STEP 2 — Audit the inputs against the hard limits

Read `references/parameter-limits.md` and check every input. Report the audit as a short table before writing anything:

- counts and total durations of each asset kind;
- mutual-exclusion conflicts;
- resolution and ratio mapped to a supported value;
- duration rule that applies (no video input vs. video input present).

When something is out of range, fix it with the user rather than truncating silently. `references/boundary-violations.md` gives the repair for each case.

### STEP 3 — Write the prompt in the mode's formula

Read `references/prompt-formulas.md` and select the formula that matches the request:

- base / advanced — plain text-to-video;
- image-to-video or first-last-frame — motion plus camera only;
- **sound** — voice, sound effect, and BGM as a structured layer, not as an afterthought;
- **reference-to-video** — `@`-referenced assets plus action and dialogue;
- **multi-shot** — overall description plus shot number plus timestamp plus per-shot content;
- **video editing** — edit target plus edit behavior.

For anything longer than one shot, state per-shot timestamps. Multi-shot control is the reason Wan 3.0's native 30-second output is worth using.

### STEP 4 — Close the control gaps

The model improvises whatever the prompt leaves unspecified. Decide each of these explicitly instead of accepting the default:

| Dimension | Unspecified behavior | Prompt to force control |
| --- | --- | --- |
| Shot count | Model chooses single or multi-shot | Write shot list, or write 生成单镜头 / 一镜到底 |
| Dialogue | Model invents lines | Write the exact line, or write 全片无台词 |
| BGM | Model adds music by mood | Write 无背景音乐 to suppress it |
| Camera | Model improvises movement | Write 固定镜头 to lock it |

### STEP 5 — Deliver

Output the final prompt inside a fenced block, followed by a compact request summary: mode, ratio, resolution, duration, audio on/off, and the asset list with each asset's role.

Only submit generation when the user asks for it. For edits and extensions, keep the edit target and the preserved content explicit — say what must **not** change.

## Guardrails

- **Never submit an out-of-range request.** The failure surfaces as a rejected job or an unexpected result, and burns the user's quota.
- **Never raise a limit by reinterpreting it.** Ten reference images means ten; do not drop the eleventh silently.
- **Extensions carry an expectation gap.** The manual states that an extended segment differs slightly from the original footage. Say this before generation, not after.
- **Costly steps need confirmation.** Confirm before video generation, before a multi-shot long generation, and before re-running a failed generation.
- **Pass through what the platform already ensures.** Do not restate model defaults, file paths, or vendor parameters in the user-visible copy.
- **Registration is not optional.** Register every generated asset to the session so downstream steps can find it.

## Boundaries

This skill covers Wan 3.0 request construction: mode selection, parameter legality, prompt formula, editing and extension prompts, and sound description.

It does not cover: full screenplay or dramatic structure, multi-scene storyboarding for other models, image generation, video post-production, or prompts for models other than Wan 3.0. For multi-shot narrative structure across a whole episode, pair this skill with a directing skill and use this one only for the Wan 3.0 prompt layer.
