---
name: dot-matrix-brand-wordmark-motion
description: |
  Turn a supplied logo, brand-name image, or slogan visual into dot-matrix wordmark motion. Create a horizontal brand plate, rewrite the fixed prompt from visible or user-provided text, pause for approval, then generate an 8-second 16:9 video. Load references/chinese-prompts.md and preserve exact text, slogan, character anchors, and a clean tail frame. Use for brand openers and identity reels, not trademark design, slogan invention, or unsupported claims.
trigger-words: [logo slogan video, brand logo motion, logo to H3 video, brand logo animation, slogan brand video]
allowed-tools: [question, hub_generate_image, hub_analyse_media, hub_generate_video, hub_save_file_to_session]
---

# Dot Matrix Brand Wordmark Motion

Use this Skill when the user provides a logo, brand-name image, or slogan-containing brand visual and wants a repeatable workflow that creates a horizontal brand plate and a 8-second MiniMax H3 brand motion video.

Important: the execution prompts are intentionally kept in Chinese for better generation quality. Load and use `references/chinese-prompts.md` verbatim whenever generating `image_1` or rewriting `prompt1`. Do not translate that reference content during execution.

## Inputs

Required:
- One logo or brand visual image, referred to as `{{Logo}}`.

Optional:
- User-provided brand name or slogan. Explicit user slogan text may be used in `image_1`, `prompt1`, and the final video.
- If neither the image nor the user input contains a slogan, do not invent one.

## STEP 1: Generate the Brand Name Plate

Generate `image_1` with GPT Image.

Required parameters:
- Vendor/model: `gpt-image-2`
- Resolution: `2k`
- Aspect ratio: `16:9`
- Quality: `low`
- Reference image: `{{Logo}}`
- Text context: user-provided brand name and slogan, if any

Use the `Image Plate Prompt` from `references/chinese-prompts.md` verbatim.

Rules:
- Readable text may come only from the reference image or explicit user-provided brand/slogan text.
- Do not invent slogans, product claims, product specifications, registered marks, category text, or packaging copy.
- Preserve the source image's theme color and recognizable design background where possible.
- `image_1` is the only visual reference for the later video stage.
- If an approved slogan exists, place it below the brand name in `image_1`; if no slogan exists, do not render slogan text or a slogan placeholder.

## STEP 2: Create `prompt1` as a Separate Text Deliverable

Use the current model to read `image_1`, also consider explicit user-provided slogan text, and create `prompt1` as a standalone text result before video generation. `image_1`, not the original uploaded image, is the authoritative source for the final brand text used by `prompt1`.

Use these two sections from `references/chinese-prompts.md` verbatim:
- `Motion Prompt Rewrite Instruction`
- `Source Motion Prompt`

Execution rules:
- First read `image_1` and extract `brand_name_from_image_1`, `slogan_from_image_1`, exact case, punctuation, spaces, and the visible wordmark order. If the original upload showed only a symbol such as `G` but `image_1` renders `Google`, then `prompt1` must use `Google`.
- Compute all motion text anchors from the extracted `brand_name_from_image_1`: `first_character_exact`, `last_character_exact`, and `prefix_before_last_character`. Do not reuse anchors from the uploaded image, previous turns, common brand knowledge, or earlier generations.
- Output `prompt1` as an independent text step/result.
- Stop after outputting `prompt1` and wait for user confirmation before video generation.
- Preserve the Chinese rewrite constraints exactly, including the white-dot first second, final-character wordmark anchoring, dynamic first-to-last-character morph, and clean static tail-frame requirement.
- Do not translate `prompt1` into English unless the user explicitly asks.

## STEP 3: Generate the Brand Motion Video

Generate `video_1` with MiniMax-H3 by default. If the user explicitly specifies another model, first check that it supports a reference image, 8-second duration, 2K, 16:9, and audio generation, then follow the user's choice. The required parameters below apply to MiniMax-H3:

Required parameters:
- Tool/model intent: `minimax_h3_video_generation`
- Mode: `omni_reference`
- Reference image: `image_1`
- Tail frame / last frame / end frame: do NOT pass any tail-frame / last-frame / end-frame parameter; use `omni_reference` / all-purpose reference mode only
- Duration: `8`
- Resolution: `2K`
- Ratio: `16:9`
- Generate audio: `true`
- Prompt: `prompt1`

Rules:
- Use `image_1` as the visual reference and final tail-frame target in the prompt text only; do not use first-last-frame mode or any tool-level tail-frame parameter.
- Preserve the extracted brand name and approved slogan exactly.
- The approved slogan may come from the reference image or explicit user input.
- Do not add product specifications, category text, registered marks, packaging copy, or any extra readable text beyond the extracted brand name and approved slogan.
- All temporary rings, orbit lines, black circles, and transition dots must be removed before the final lockup.
- The final 0.5-1s must directly match `image_1` as a clean static tail frame; this must be written inside `prompt1`, not enforced through tail-frame parameters.
- If the user-specified model fails, allow one targeted retry, then switch to MiniMax-H3 or another available model instead of repeatedly retrying the same model.

## Quality Guardrails

Before video generation, check:
- `prompt1` is a separate confirmed text result.
- The brand name in `prompt1` matches the visible text in `image_1`; `image_1` overrides the original upload for prompt text anchoring.
- The slogan exists only if visible in `image_1` or explicitly provided by the user.
- The source "M" maps to `first_character_exact` from `image_1`; source "H" maps to `last_character_exact` from `image_1`; any sliding prefix text equals `prefix_before_last_character`.
- The final character keeps the exact wordmark typeface, color, style, position, and size from the reference.
- The first second remains an abstract white circle/dot, never a water drop or brand-specific object.
