---
name: poster-motion-generator
description: |
  Poster Motion Generator turns an uploaded poster into an H3 single-take motion poster. It analyzes aspect ratio, subject, poster type, layout, visual hierarchy, typography, and motion potential, then offers 8 motion directions with Direction 1 Progressive Activation and Direction 2 Paper-Roll Reveal prioritized. The uploaded poster is the final lock-frame reference, not a required opening frame. Built in: motion-effect terms, direction-aware SFX wording, and timestamp storyboard prompt format. Trigger words: poster animation, poster-to-video, dynamic poster, animated poster, motion poster, poster awakening.
trigger-words: [Poster Motion Generator, poster animation, poster-to-video, dynamic poster, animated poster, motion poster, poster awakening, poster video, MiniMax H3]
allowed-tools: [question, hub_analyse_media, hub_generate_video, hub_save_file_to_session]
---

# Poster Motion Generator

## When to use

Use this Skill when the user uploads at least one poster image and wants an 8–15s single continuous animated poster video that fills the whole frame, preserves the final poster composition, and keeps poster text readable. Do not use it for original poster design, multi-shot narrative films, or simple slideshows.

## Language consistency

- Detect the user's language from the latest user message that contains the actual task request, not from the language of this Skill file, file names, metadata, or reference material.
- All assistant replies, choice cards, `Final_Video_Spec.md`, storyboard text, generation prompts, error messages, and delivery summaries must follow that detected user-input language.
- If the user writes in Chinese, respond and author runtime content in Chinese even when only `SKILL.md` is loaded. If the user writes in English, respond and author runtime content in English even when Chinese metadata or `SKILL.cn.md` exists. For mixed-language input, use the dominant language; if dominance is unclear, use the language of the direct instruction phrase.
- Preserve on-poster text by default. Do not translate or localize on-poster text unless the user explicitly asks.

## Step 1: Required precheck

- The user must upload at least one poster image before this Skill starts.
- If no poster is uploaded, reply only in the detected user-input language: English `Please upload a poster image first`; Chinese `请先上传一张海报图片`; otherwise use the same meaning in the user's language.
- Do not continue to analysis, direction selection, spec writing, storyboard, or generation before a poster exists.

## Step 2: Poster analysis and ratio mapping

Analyze the uploaded poster before presenting choices:

- Orientation: landscape, portrait, or square.
- Numeric width/height estimate as a decimal, such as 1.78, 0.80, or 1.00.
- Map to the nearest MiniMax H3 ratio by absolute difference: 21:9=2.3333, 16:9=1.7778, 4:3=1.3333, 1:1=1.0000, 3:4=0.7500, 9:16=0.5625.
- Output conclusion: `Orientation: [landscape/portrait/square], width-height estimate: approx [X.XX], mapped supported ratio: [final ratio]`.
- Mark ratio deviation and whether background extension is required.
- Mark whether the poster fills the image frame or has borders / blank space.

Accept any poster ratio. Do not reject or ask the user to confirm ratio. If deviation exists, extend background color/texture to fill the output frame while keeping core content uncropped, unstretched, and free of black bars.

### Orientation cross-check

Immediately verify: value >1 = landscape, <1 = portrait, approximately 1 = square. If orientation and numeric estimate conflict, re-analyze once with: `Directly compare this image width and height. Which is larger? Approximately how many times is width compared with height? Provide a width divided by height numeric estimate.` Use the second result and do not loop.

## Step 3: Content analysis

Record:

- Poster type: person / product / food / architecture / typography-only / abstract graphic / no clear subject.
- Visual subject: position, scale, direction, and final pose.
- Main motion carrier if no person exists: title, product, logo, graphic, texture, light, or color relationship.
- Composition and depth: subject placement, foreground/midground/background, blank areas, and depth path.
- Style and palette.
- Text layout: title, logo, slogan, secondary text positions and hierarchy; text must remain readable.
- Five layers: background/base shapes, core recognition element, main title/logo, supporting information, decorative/atmosphere layer.
- Visual anchor and motion potential for the supported directions.
- For paper-roll direction: poster contour, roll axis, and unfolding direction. Landscape prefers horizontal unfolding; portrait prefers vertical unfolding.

## Step 4: Offer motion directions

Show motion-direction choice cards and pause. Recommendation order must list Direction 1 first and Direction 2 second; other directions are supplementary. If the user asks for full options, show all 8.

1. **Progressive Visual-Element Activation** — start from a clean or abstract opening; establish layers one by one; active visual anchor enters; title/logo strengthen; supporting text and decorations finish the final poster.
2. **Paper-Roll Reveal** — a physical paper roll drops, snaps open, becomes blank paper, then poster elements break out / activate / return to the final layout.
3. **Naked-eye 3D Breakout** — core subject or title bursts toward camera and returns to the original layout.
4. **Layered Parallax Awakening** — foreground, subject, typography, and background move at different depths to create a living poster.
5. **Particle / Wireframe / Point-Line-Plane Reconstruction** — elements decompose into particles or geometry and reassemble.
6. **Light and Material Micro-Sculpting** — light sweeps, reflections, texture and material changes awaken the poster while layout stays restrained.
7. **Kinetic Typography Layout Build** — title, logo, slogan, and text build through writing, sliding, typing, bouncing, or grid motion.
8. **Physical Atmosphere Loop** — rain, snow, smoke, wind, dust, sparks, lens flare, film grain, or paper grain adds subtle motion while composition stays stable.

## Step 5: Global spec lock

After direction selection, write `Final_Video_Spec.md` locking:

- aspect_ratio from Step 2, model MiniMax H3, resolution 2K, duration 8–15s.
- single continuous shot, no internal cuts.
- selected dynamic direction.
- uploaded poster as final lock-frame reference, not a required opening frame.
- full-frame policy: no black bars, no blank space, no letterbox/pillarbox.
- ratio adaptation: extend background when needed, without cropping or stretching core content.
- lock-state policy: after restoration, settle for 1–2s, then keep very subtle micro-motion; text fully still; subject must not keep scaling or drifting.
- motion terms and SFX tone selected for the direction.

## Step 6: Storyboard rules

Design only the selected direction as one continuous shot.

Shared rules:

- 8–15s, one continuous take, no cuts and no transitions.
- Opening may be blank, partial, abstract, or a material setup; it does not need to show the complete poster.
- Final lock frame must match the uploaded poster composition, color, hierarchy, and readable text.
- Animate only the main layers by default: background/base, core recognition element, main title/logo. Supporting information and decoration should usually fade/slide into place.
- Sequence strictly: background/structure -> visual anchor -> title/logo -> supporting information/decorations -> settle -> micro-motion.
- Only one element or layer group may perform an active entrance at any time.
- Core visual anchor must actively enter; do not use passive fading or slow emergence.
- Every trajectory must match the final position and depth layer.
- Text must stay readable and become completely still after placement.

Motion terms to use explicitly in storyboard and prompts: `Jelly Pop`, `Scale & Bounce`, `Kinetic Typography`, `Typewriter`, `Scroll Unroll`, `Card Slide-in`, `Paper Breakout`, `Light Sweep`, `Brush Stroke`, `Slice Reassembly`, `Parallax Push-in`, `Orbital Display`, `Particle Reconstruction`, `Breathing Pulse`, `Lens Flare Blink`, `Material Shift`.

## Step 7: Direction timestamp templates

Use timestamp script format: `timestamp + visual action + motion term + SFX`. Compress to 8s or extend to 15s as needed.

### Direction 1 template

- 0:00–0:01: clean / abstract base fills frame; ambience starts.
- 0:01–0:02: background and base structure establish.
- 0:02–0:04: visual anchor actively enters from depth and lands in final poster pose.
- 0:04–0:04.5: anchor stabilizes.
- 0:04.5–0:06: main title and logo enter with `Jelly Pop`, `Kinetic Typography`, or `Scale & Bounce`.
- 0:06–0:06.5: title stabilizes.
- 0:06.5–0:08: supporting text and decorations enter one by one with `Card Slide-in`, `Typewriter`, or `Scroll Unroll`.
- 0:08–0:09: settling transition.
- 0:09–0:10: post-lock micro-motion with `Breathing Pulse`, `Lens Flare Blink`, or `Material Shift`.

### Direction 2 template

- 0:00–0:02: roll drops, holds tension, snaps open; use paper-drop / impact / unfurl / flutter SFX.
- 0:02–0:02.5: blank paper is fully flat and fills the frame.
- 0:02.5–0:05: background and core elements appear; core elements use `Paper Breakout` + `Material Shift`, one by one.
- 0:05–0:07: title and logo land with `Jelly Pop` / `Kinetic Typography`.
- 0:07–0:08: supporting text and decoration land with `Card Slide-in` / `Scroll Unroll`.
- 0:08–0:09: full poster settles.
- 0:09–0:10: lock-frame micro-motion.

For Directions 3–8, adapt the same timestamp format using the direction name and relevant terms. Detailed legacy templates are preserved in `references/v08-motion-reference.md` and `references/v08-motion-reference.cn.md` if needed.

## Step 8: Audio design

MiniMax H3 synchronized audio is on by default. Use restrained ambience throughout; strengthen slightly during climax; fade to low ambience after lock. Align SFX with element timing: person uses `<footsteps>` / `<fabric rustling>`, product uses `<mechanical rotation>` / `<parts clicking>`, text uses `<pen scratching>` / `<paper sliding>`, graphic/texture uses `<subtle texture sound>`, paper roll uses `<paper roll drop>` / `<impact>` / `<paper unfurling>` / `<paper flutter>` / `<paper settling>`. Do not trigger SFX for elements that have not appeared.

## Step 9: MiniMax H3 generation

- Use MiniMax H3 multimodal reference mode.
- Pass the uploaded poster as the primary image reference; treat it as final lock-frame reference.
- If extra references are uploaded, pass useful image/video/audio refs into the matching multimodal slots.
- Generate the whole video in one call; do not split into multiple generations.
- Use 2K resolution, mapped aspect ratio, 8–15s duration, and synchronized audio.

## Step 10: Prompt writing

Prompt order:

1. Baseline: `<<<image_1>>>` is final lock-frame reference; opening may be blank / partial / abstract; final frame restores composition, color, hierarchy and text; full-frame, no black bars.
2. Ratio adaptation if needed.
3. Direction and timestamp storyboard.
4. Per-element motion with action, trajectory, depth layer, motion term, SFX.
5. Text protection and lock-frame constraints.
6. Audio paragraph and SFX timing discipline.

Must include: `single continuous shot, no cuts, no transitions`.

## Step 11: Delivery

Deliver the generated single-take video. Preserve native MiniMax H3 audio and full duration. Ask whether the user wants adjustment, another direction, or export.
