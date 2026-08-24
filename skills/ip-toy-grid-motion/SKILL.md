---
name: ip-toy-grid-motion
description: |
  Converts a user-uploaded IP character image into a 9:16 designer-toy six-panel motion poster. Use when the user wants an IP character, mascot, anime figure, brand character, or original character transformed into a hyper-realistic 3D vinyl blind-box toy collage, then animated into a short vertical grid video. This Skill preserves the original Chinese prompt templates stored in references and only performs minimal replacements for character identity, props, or conflicting colors. Trigger words: IP toy, toy six-panel poster, designer-toy motion poster, IP-to-3D toy, toy figure grid video, designer toy motion poster.
trigger-words: [IP toy, toy six-panel poster, designer-toy motion poster, IP-to-3D toy, designer toy, toy figure grid, motion poster]
allowed-tools: [hub_analyse_media, hub_read, hub_generate_image, hub_generate_video, hub_canvas_group_recent_outputs]
---

# IP Toy Grid Motion

Use this Skill to turn a user-uploaded IP character into a vertical designer-toy six-panel motion poster. The standard flow has two steps:

1. Use the preserved original Chinese static-image prompt template to generate one 9:16 asymmetric rounded six-panel poster.
2. Use the preserved original Chinese motion prompt template to generate a 6-second vertical motion poster from that static poster.

The key rule is prompt fidelity. Do not freely rewrite, summarize, translate, or restructure the original prompt templates. Only perform the minimal substitutions defined in `references/prompt-fidelity-rules.cn.md`.

## Text Template Resources

This Skill does not use built-in reference images. Use only these text references:

- `references/static-six-grid-prompt-template.cn.md` — main STEP 1 static poster prompt template.
- `references/motion-six-grid-prompt-template.cn.md` — main STEP 2 video prompt template.
- `references/prompt-fidelity-rules.cn.md` — prompt fidelity and minimal replacement rules.

At runtime, read the matching template file before generation. The Skill body is workflow guidance; the referenced template is the prompt authority.

## Required Input

The user must provide one IP character / mascot / original character image.

Optional inputs:

- Character or brand name.
- Text overlay request. Default: no text.
- Music/audio reference. Default: no real audio; motion follows implied rhythm.
- Duration. Default: 6 seconds.
- Ratio. Default: 9:16.

If no IP image is provided, ask the user to upload one before generation.

## STEP 1: Static Six-Panel Toy Poster

1. Analyze the user-uploaded IP image and extract only necessary identity evidence: silhouette, species/body structure, body coverage state, body surface material, face/head structure, existing outfit or accessories, signature props, markings, and personality.
2. Read `references/prompt-fidelity-rules.cn.md`.
3. Read `references/static-six-grid-prompt-template.cn.md`.
4. Use that file as the primary generation prompt. Only minimally replace:
   - Bind the template phrase for “the character in the reference image” to the uploaded IP character.
   - Insert necessary identity observations after the template's character-unity section, including body coverage state.
   - If the reference character is not wearing clothes, keep the natural unclothed state and explicitly forbid adding human clothing, sleeves, shoes, hats, or outfits.
   - Determine the uploaded reference image background color before compiling the prompt, and replace the reference-background-solid-color placeholder with a concrete Chinese color phrase, such as pure white or light blue written in Chinese.
   - The final image prompt must contain the concrete result, e.g. “under a pure white background” written in Chinese, and must not keep decision text such as “decide according to the uploaded reference image”.
   - Replace props or other color words only when they conflict with the uploaded IP or explicit user request.
   - Preserve layout, panel numbering, panel proportions, rounded-corner rules, black gaps, panel functions, and negative requirements as close to the template as possible.
5. Generate the 9:16 static six-panel poster.

Before moving to video, retry or ask for confirmation if the poster has the wrong panel count, an even grid, inconsistent rounded corners, identity drift, buttons on Panel 2, or head/face exposure in Panel 6.

If direct six-panel generation repeatedly fails, use the fallback: generate six separate panel images from the same IP anchor, compose them into the fixed six-panel layout, then proceed to video.

## STEP 2: Six-Panel Motion Poster Video

1. Use the STEP 1 static poster as the reference image.
2. Read `references/prompt-fidelity-rules.cn.md`.
3. Read `references/motion-six-grid-prompt-template.cn.md`.
4. Use that file as the primary video prompt. Only minimally replace:
   - Bind the template phrase for “reference image” to the STEP 1 static poster.
   - Keep the 0–2 second Panel 4 full-screen opening.
   - Keep the 2–3 second Panel 4 snap-back and other-panel fly-in transition.
   - Keep the 3–6 second stable six-panel motion poster section.
   - Keep all six panel motion descriptions and the unified negative requirements.
5. Generate a 9:16 vertical video, default 6 seconds.

If the model cannot complete the full three-part timeline, simplify only as a fallback: generate the stable six-panel dynamic poster without the opening/fly-in transition. If panel motions still bleed across panels, generate six short panel videos separately and composite them into the fixed layout.

## Delivery

Deliver the static poster and final motion poster video. If multiple assets are produced in one turn, group them with a concise label such as `IP toy grid`.
