---
name: pov-short-film-generator
description: |
  Validate and produce strict immersive first-person POV short-film workflows from concepts, scripts, reference images, or existing clips. Use for protagonist-eye short dramas, subjective-camera suspense, survival, romance, horror, workplace pressure, realistic daily-life POV, storyboard planning, clip prompts, and QC. Boundary: every shot must be visible through the protagonist’s eyes; no protagonist face, third-person protagonist shot, product-only showcase, or long-series planning.
trigger-words: [first-person POV, POV short film, subjective camera, immersive short film, POV drama, protagonist-eye view, first-person short, POV video, 第一人称POV, POV短片, 主观视角视频, 沉浸式短片, 第一视角短剧, POV短剧, 眼睛视角, 第一视角]
---

# Immersive First-Person Short Film

This Skill converts a user idea, short-drama premise, script fragment, reference image, or existing clip into a strict first-person POV immersive short-film workflow. The goal is to make the entire video feel like what the protagonist personally sees, while preventing third-person continuity breaks and keeping the visual style physically grounded and consistent.

## Use Cases and Boundaries

Use this Skill for:
- First-person POV short dramas, immersive suspense, survival, escape, romance, revenge, adventure, horror, workplace pressure, and realistic daily-life fragments.
- Requests that explicitly mention first-person view, POV, subjective camera, protagonist-eye view, handheld immersion, or “what I see”.
- Workflows that need a Final_Video_Spec, storyboard, image prompts, video prompts, and QC checklist before generation.

Do not use this Skill for:
- Ordinary third-person drama, multi-camera acting scenes, ensemble scenes, or standard shot-reverse-shot dialogue.
- Product-showcase videos without a subjective protagonist experience.
- Long-series planning. This Skill is for a short film, opening sequence, or compact POV segment.

## Global Hard Locks

1. The entire film must stay in strict first-person POV: `first-person POV from protagonist; camera is his/her eyes; no external shot of protagonist.`
2. The protagonist’s face must never be exposed. Do not create a frontal-face protagonist asset, half-body external shot, back-view tracking shot, or third-person performance shot.
3. The protagonist may only appear through local body evidence: hands, shoes, sleeves, edge of chest-worn objects, partial reflections, screen glare, breathing fog, or held objects.
4. Every shot must pass this question: “Could this image be seen by the protagonist’s own eyes?” If not, rewrite it.
5. Do not generate subtitles, title cards, on-screen text overlays, sales cards, or caption layers. Dialogue and narration, if needed, are audio-only.

## STEP 1: Extract the POV Core

From the user input, identify:
- Protagonist identity: whose eyes the camera represents.
- Immediate situation: danger, desire, secret, pressure, or conflict.
- Key external objects: opponent, lover, monster, object, door, phone, car window, mirror, desk, hallway, etc.
- Visible protagonist fragments: hands, sleeves, shoes, breath, held object, phone edge, wound, badge, tools.
- Third-person elements to forbid: protagonist face, protagonist long shot, protagonist back view, external tracking shot.

If the user gives only a one-line concept, build a compact hook:
- A strong conflict or abnormal detail appears within the first 3 seconds.
- Within 10 seconds, something forces the protagonist to react.
- The ending keeps a continuation hook or emotional aftertaste.

## STEP 2: Visual Style Engine

Before writing the Final_Video_Spec, determine the visual style. If the user already gave a style, physicalize it directly. If no style is provided, choose or offer one of these:

### A. Real-Life Documentary Realism (Default)
- Visual tone: real county-town, urban village, workplace, rural, or everyday texture; natural or practical light; low saturation.
- Physical mapping: natural realism, practical light, low saturation, handheld phone-camera compression, worn fabric, real-life clutter.
- Best for realistic stories, workplace pressure, urban suspense, and daily-life POV.

### B. Cyber Rainy Neon Night
- Visual tone: cold/warm contrast, high contrast, wet reflections, damp air.
- Physical mapping: wet asphalt, neon reflections, high-contrast chromatic aberration, cold cyan shadows, warm amber highlights.

### C. Y2K / Old Home-Video Retro
- Visual tone: low resolution, CCD noise, color shift, warm nostalgic haze.
- Physical mapping: vintage handycam footage, slight color shift, CCD sensor noise, warm hazy light, low-resolution edge softness.

### D. Industrial Coldness
- Visual tone: steel-gray, heavy industry, metal, low saturation, cold mist.
- Physical mapping: steely gray cast, industrial metal texture, low-contrast mist, cold fluorescent lighting, gritty concrete atmosphere.

### E. Cinematic ARRI Texture
- Visual tone: high dynamic range, soft diffusion, refined shadows, organic warmth.
- Physical mapping: soft diffused natural light, cinematic dynamic range, rich shadow details, premium organic texture.

### F. Custom Input

If the user provides an abstract style, translate it into executable physical anchors:
- Light source direction
- Color temperature
- Exposure behavior
- Shutter or motion behavior
- Saturation and contrast
- Medium texture or sensor noise
- Air quality
- Scene evidence

Do not simply stack abstract style words in prompts. Translate them into visible evidence. For example:
- “melancholy” → empty composition, cold scattered light, hesitant hand movement, rain hitting glass.
- “old memory” → CCD noise, slight color shift, soft edge blur, faded household objects.
- “oppressive workplace” → cold fluorescent light, muted glass partitions, keyboard hum, lowered gaze, hand gripping a badge.

## STEP 3: Write Final_Video_Spec

Before storyboard or image generation, produce a specification document:

```markdown
# Final_Video_Spec

Title:
Type: First-person POV realistic short film
Aspect Ratio: 16:9 / 9:16 / user-specified
Target Duration:
Visual Style Definition:
Style Mapping Parameters:
  - Lighting / Color Temperature:
  - Medium Texture:
  - Saturation and Contrast:
  - Air / Environment Texture:
Core Rule: Strict first-person POV; no third-person shot; no protagonist face exposure
Visible Protagonist Fragments:
Key External Objects:
Image Model: user-specified or agent-selected Hub-compatible image generation
Video Model: user-specified or agent-selected Hub-compatible video generation
Sound Strategy: environment sounds, action sounds, breathing, dialogue/narration ownership
```

If the user has authorized the agent to decide, choose reasonable defaults without asking again.

## Confirmation / Modification Card Gates

To reduce repetitive user operations, do not end each milestone with an open-ended “continue?” question. At major milestones, present a compact confirmation card with clear options:

- **Confirm and continue (recommended)** — proceed immediately to the next production step.
- **Modify current result** — ask which part to revise, then update only that part before continuing.
- **Pause / export current result** — stop the workflow and leave the current document or assets ready for later use.

Use this card after these major milestones:
1. After `Final_Video_Spec` and storyboard are delivered.
2. After key first-frame images are generated.
3. After video Clips are generated.
4. Before final assembly, if the next step will merge or export the final film.

When the user selects **Confirm and continue**, treat the gate as confirmed and immediately execute the next step. Do not ask for another confirmation. When the user selects **Modify current result**, focus the follow-up question on concrete editable parts such as style, duration, shot order, dialogue, first-frame composition, or Clip regeneration. If the user has already said “continue”, “next step”, “go on”, or equivalent, skip the card and proceed directly.

## STEP 4: Assign Reference Image Roles

If the user provides reference images, assign clear roles before using them:
- R image: style and composition anchor. Inherit visual style, composition, light mood; do not inherit a specific face.
- C image: character entry anchor. Inherit clothing, body type, local identity markers only; isolate original color, light, and environment style.
- P image: prop anchor. Inherit shape, material, wear, scale relationship; isolate original color mood and scene atmosphere.
- E image: environment anchor. Inherit spatial layout only; final color and lighting come from the unified style container.

If multiple references are ambiguous, ask the user to label them. If the roles can be inferred from context, label them and proceed.

## STEP 5: Design POV Assets

Do not create a protagonist face asset. Instead design:
- Protagonist local assets: hands, sleeves, shoes, held object, badge edge, wound, ring, bag strap, flashlight, phone edge.
- External character assets: only people or creatures visible in the protagonist’s view.
- Prop assets: phone, key, door handle, landline, ID badge, water bottle, medicine, notebook, crowbar, etc.
- Scene assets: hallway, rental room, office, car interior, stairwell, rural room, abandoned store, factory, street corner.

Prompt pattern for protagonist local assets:

```text
[style container] close-up photo of [hand/shoes/sleeve/local POV asset], [physical style parameters], real-life texture, no studio lighting, no posters, no professional commercial look, no full face of protagonist, no third-person camera.
```

## STEP 6: Storyboard Design

Each Clip must treat the protagonist’s eyes as the camera. Recommended table fields:

| Clip | Duration | POV Viewpoint | Visible Protagonist Fragment | External Object | Action Phase | Camera Movement | Style Anchor | Sound Evidence | Forbidden Elements |
|---|---:|---|---|---|---|---|---|---|---|

Storyboard rules:
- Use subjective actions: “I lower my gaze”, “I push the door”, “my hand reaches toward”, “my view is pulled toward”.
- Camera movement must come from head, body, footstep, hand, breathing, or gaze movement.
- Do not write “the camera shows the protagonist entering the room”. Rewrite as “the view moves through the door crack; my hand holds the frame”.
- Do not write “the protagonist’s frightened face”. Rewrite as “breathing becomes shallow; fingers tighten; the view trembles”.

## STEP 7: Anti-Lottery Gate

Run this check before every Clip prompt.

### POV Check
- Does the shot contain any third-person image of the protagonist? If yes, rewrite.
- Is the protagonist’s face visible? If yes, replace with hand, sleeve, shoes, partial reflection, breathing, or held-object evidence.
- Is the camera truly the protagonist’s eyes? If not, rewrite.
- Can the protagonist’s action physically happen from this viewpoint? If not, rewrite.

### Style Consistency Check
- Have all style words been translated into light direction, color temperature, texture, grain/noise, material, or air quality?
- Are C and P references isolated from their original environmental style?
- Are custom emotional words translated into visible evidence?
- Does the current Clip contain scene-color words that conflict with the unified style container? If so, rewrite the object as being illuminated by the unified light source rather than piling on more adjectives.

## STEP 8: Image and Video Prompt Structure

Video prompts must include the following modules:

```text
【Reference Inputs】
- Reference 1 (R / style and composition anchor): inherit [visual style type]; do not inherit [specific face]
- Reference 2 (C / character entry): inherit only [clothing/body/local traits]; isolate [original color/light/environment]
- Reference 3 (E / environment): inherit [spatial layout]; unified color grading comes from [style container]

【Image Container】
[physicalized style container]

【Frame】
first-person POV from [protagonist]; camera is his/her eyes; no external shot of [protagonist]. [scene, external object, visible protagonist fragment, action]

【Light / Texture / Style Lock】
[lighting, color temperature, saturation, contrast, medium texture, air quality]

【Action Phases】
0-2s:
2-5s:
5-8s:

【Camera Movement】
Movement comes from protagonist head, breathing, footstep, hand movement, hesitation, or gaze shift. No external tracking shot.

【Sound Evidence】
Environment sounds, footsteps, fabric friction, breathing, prop sounds, distant voices. No subtitles.

【Negative Hard Locks】
third-person shot, external shot of protagonist, protagonist face, over-the-shoulder shot showing protagonist, selfie angle, drone shot, title card, subtitles, on-screen text.
```

## STEP 9: Clip Generation QC

After each Clip, check:
- POV continuity: no protagonist face, back view, external tracking, or omniscient camera.
- Style continuity: saturation, color tendency, grain/noise, air quality remain consistent.
- Motion realism: movement feels driven by eyes, head, breath, steps, and hands.
- Sound immersion: action sounds, spatial sound, breathing, environment, and sparse dialogue support the POV.

If the style drifts:
- Do not pile on style adjectives.
- Strengthen the R image or style anchor.
- Remove conflicting color words.
- Rewrite conflicting objects as illuminated by the unified light source.

If POV breaks:
- Rewrite the shot as a result visible through the protagonist’s eyes.
- Replace facial expression with hands, sleeves, shoes, partial reflection, gaze tremble, and breathing.

## STEP 10: Assembly Guidance

Final assembly should preserve:
- The order of the protagonist’s attention and emotional pressure.
- Spatial sound continuity.
- A single owner for each voice line, narration, environment sound, or BGM layer.
- No subtitles, no title cards, and no on-screen text.

If the user explicitly requests subtitles, explain that subtitles are currently unsupported and recommend adding them later in professional editing software.

## Trigger Examples

Should trigger:
1. “Create a first-person POV short film where I come home at midnight and see someone standing behind my door crack.”
2. “Turn this drama opening into an immersive subjective-camera video.”
3. “Generate an eye-level rainy-night pursuit scene in first-person POV.”

Should not trigger:
1. “Create a normal dialogue scene between two characters in a cafe.”
2. “Make a product unboxing showcase video.”
3. “Generate a character turnaround sheet.”
