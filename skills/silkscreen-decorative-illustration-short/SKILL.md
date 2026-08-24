---
name: silkscreen-decorative-illustration-short
description: |
  Create luxury scarf-illustration style short videos with refined TVC pacing: fine Ligne Claire linework, dense decorative narrative compositions, ivory or lime-white grounds, balanced warm and cool jewel accents, fixed wide establishing shots plus close follow-up shots, and synchronized natural sound effects only. Use for luxury scarf-illustration mood, decorative narrative TVC, Chinese courtyard tea, palace banquet, Paris apartment daily scene, animal-and-character luxury illustration video. Treat premium silkscreen-decorative references as non-branded visual shorthand only. Not for copying protected brand logos, existing scarf designs, dialogue-driven drama, BGM music videos, or ordinary realistic ads.
trigger-words: [silkscreen-decorative-illustration-short, silkscreen decorative short, luxury scarf illustration, scarf-style TVC, Ligne Claire, decorative narrative short]
allowed-tools: [question, hub_generate_image, hub_generate_video, hub_generate_music, hub_video_edit, hub_analyse_media, hub_save_file_to_session]
---

# Silkscreen Decorative Illustration Short

Use this Skill when the user wants a refined luxury creative-ad short video in a scarf-illustration language: fine uniform linework, decorative narrative density, restrained TVC pacing, and visual sound effects that are synchronized with the picture. Follow the user's language for dialogue, prompts, descriptions, confirmations, and deliverable text, while keeping field names, model IDs, file paths, and signal codes literal. The Skill produces a structured production flow from theme confirmation to `Final_Video_Spec.md`, storyboard, key-element images, shot videos, precise sound effects, and final assembly.

Do not reproduce protected brand logos, existing scarf patterns, or a current commercial product design. Treat premium silkscreen-decorative references as a broad visual shorthand for luxury scarf-like illustration qualities only: line discipline, decorative density, elegant composition, restrained color balance, and print-on-silk flatness.

## STEP 1: Confirm Theme and Final Video Spec

Ask the user to confirm the overall theme and story scene before production if it is not already specified. Examples include Chinese courtyard tea ceremony, European court banquet, Paris apartment daily life, garden animal fable, desert caravan, or botanical salon.

Create or update `Final_Video_Spec.md` with:

- Video theme and one-sentence story premise
- Aspect ratio
- Estimated final duration
- Visual style definition
- Language policy
- Audio policy: synchronized sound effects only; no BGM, no narration, no dialogue, no subtitles
- Scene count and expected shot count when known

Pause after completing `Final_Video_Spec.md` and ask the user to confirm before moving to storyboard design.

## STEP 2: Analyze Reference Images When Provided

When the user provides reference images, analyze them before storyboard or prompt writing. Extract only style and design evidence that can be generalized safely:

- Line style: line density, contour weight, uniformity, closed outlines, architectural hard lines, organic curves
- Coloring method: flat fill, limited pointillism or grain, no strong gradient or dramatic shadow
- Decorative density: textile, carpet, tapestry, architecture, plants, vessels, geometric or botanical ornaments
- Color system: ivory / lime-white / sand ground; balanced warm jewel accents and cool jewel accents; saturation and contrast range
- Narrative structure: foreground detail, midground subject, background architecture or landscape
- Character and animal design: clothing era or cultural background, hairstyle, animal species, posture language

Return a compact structured style description for storyboard and media prompts. Do not turn reference colors into text if the generation tool will directly receive the reference image; let the reference image carry exact color visually.

## STEP 3: Design Storyboard and Key Elements

Design a storyboard table that identifies every `key_element` and every final shot.

### Global Visual Style

Every scene follows:

- Luxury scarf illustration style
- Ligne Claire uniform fine black outline; buildings use hard straight lines, people / animals / plants use organic curves
- Clear closed contours, no hairy edges, no ink wash bleeding
- Ivory, lime-white, or sand-colored base
- Balanced cool-and-warm jewel palette: royal blue, Prussian blue, emerald green, deep purple together with ochre gold, vermilion, wine red, and orange red
- Flat color blocks with high-density decorative pattern filling on textiles, carpets, tapestries, painted architecture, and complex surfaces
- Slight fine stipple or grain only when needed for subtle volume; no gradients, no strong highlights, no strong shadows
- Dense narrative decorative composition: foreground objects / plants, midground human or animal subject, background architecture or landscape
- Soft even light, matte silk or premium print texture
- Refined, controlled luxury TVC feeling; each frame could be screen-printed on silk

### Key Element Rules

- `element character`: define clothing era or culture, hairstyle, visible costume silhouette, posture, and color arrangement.
- `element animal`: define species, fur / feather pattern, body posture, movement language, and relationship to the scene.
- `element scene`: define foreground signature decoration, midground activity area, background building or nature, time atmosphere, and light direction.

### Two-Shot Structure per Narrative Scene

Every narrative scene must have exactly two shots in this fixed order:

1. `Shot A — wide establishing shot`
   - Wide composition showing foreground, midground, and background.
   - Main character or animal stays in the midground at a readable but modest scale.
   - Camera performs one restrained move only: slow lateral slide or subtle push-in.
   - Target final duration is about 3 seconds. Extend to 4–5 seconds only when spatial reading or a key action would otherwise feel rushed.

2. `Shot B — close follow-up shot`
   - Focus on upper body, animal, hands, object interaction, or action detail.
   - Camera follows the subject’s action direction with a slow move, slight handheld feel, or gentle arc.
   - One precise action only, expressed with exact verbs and physical detail.
   - Include micro-expression, hand detail, feather / fabric movement, or object contact when relevant.
   - Target final duration is about 3 seconds. Extend to 4–5 seconds only when the action needs clear beginning, process, and completion.

### Audio Layer Rules

The whole video uses only picture-synchronized sound effects. Do not plan BGM, narration, dialogue, or subtitles.

For shots that need sound, write an independent `audio_layer` with:

- Trigger action
- Sound material
- Distance layer: close, medium, far, ambient
- Duration or time range
- Luxury-ad restraint: delicate, sparse, tactile, not overfilled

Good sound types include silk rubbing, leather creak, porcelain tap, tea pouring, bird feather flutter, page turn, jewelry touch, curtain movement, garden breeze, distant water, or light footstep on stone.

Pause after storyboard completion and ask the user to confirm before generating element images.

## STEP 4: Generate Key Element Images

Generate all key-element images before video generation.

Preferred image generation profile:

- Text-to-image
- GPT Image 2 when available
- 2K resolution by default; use 4K only when the user explicitly requests higher-resolution still assets

Element image formats:

- Character or animal reference image: horizontal side-by-side reference card; left side is face / upper-body close-up with facial features, hairstyle, costume neckline or animal head detail; right side is full body with costume / body silhouette, color arrangement, and posture.
- Scene reference image: full wide scene showing foreground, midground, and background with representative decorative details.

Prompt structure:

1. Visible subject description
2. Environment or scene structure
3. Global luxury scarf illustration style anchor
4. Composition instruction, e.g. horizontal side-by-side reference card or complete wide scene

Only describe visible content. Do not add off-screen narrative explanation.

Pause after element images are generated and ask the user to confirm visual identity and scene design before shot videos.

## STEP 5: Generate Shot Videos

Generate shot videos in scene order, two videos per scene: `Shot A` then `Shot B`.

Preferred video generation profile:

- Multimodal-to-video
- MiniMax H3 by default
- If the user explicitly selects another video model, check its capabilities for the requested duration, ratio, resolution, references, audio, and motion before following that choice
- If generation fails, retry once for the diagnosed cause, then switch to another available compatible model; do not repeatedly retry the same failing model

Generation duration policy:

- If target final duration is about 3 seconds, generate a 4-second source clip to leave room for editing.
- If a shot needs 4–5 seconds for full action clarity, generate and keep the required 4–5 seconds.
- Do not add idle time that has no narrative value.

Reference inputs:

- Shot A must reference the matching `element scene` image and every visible character / animal element image.
- Shot B must reference the matching subject element image and scene image.
- When continuity is important, Shot B may also reference the same scene’s Shot A source or final shot as a continuity reference.

### Shot A Prompt Requirements

Each wide-shot prompt must include:

- Reference binding: `<<<image_1>>>` as scene image; `<<<image_2>>>` and later images as character / animal elements.
- One restrained camera move: slow right slide, slow left slide, or subtle push-in.
- One simple visual beat readable in about 3 seconds.
- Minimal subject motion: fabric drift, bird feather fan, hand rests on a vessel, posture turn, or other small controlled action.
- Fixed negative phrase: `no subtitles, no text overlay, no dialogue, no voice-over, no music`.

### Shot B Prompt Requirements

Each close-follow prompt must include:

- Reference binding: `<<<image_1>>>` as subject image; `<<<image_2>>>` as scene image.
- Follow-camera direction: left, right, forward, or gentle arc.
- One exact action with physical details and rhythm.
- Micro-expression or tactile detail when relevant.
- Optional sound-effect hint in angle brackets, e.g. `<light porcelain pour>`.
- Fixed negative phrase: `no subtitles, no text overlay, no dialogue, no voice-over, no music`.

## STEP 6: Generate Final Audio Only When Marked

Only generate final audio for shots whose storyboard explicitly marks an `audio_layer`.

Audio generation goal:

- Delicate, synchronized natural sound effects
- Matching the exact material and motion on screen
- Enough spatial sense and dynamic range for a luxury creative ad
- No BGM, no narration, no dialogue, no vocal, no subtitle track

When a video model has created native sound, avoid duplicate sound in final assembly. Either remove the native track or ensure generated `final_audio` replaces it cleanly.

## STEP 7: Assemble Final Video

Assemble strictly in this rhythm:

`Scene 1 Shot A → Scene 1 Shot B → Scene 2 Shot A → Scene 2 Shot B → ...`

Editing rules:

- Use direct hard cuts only.
- Do not use dissolve, fade to black, fade in, wipe, or decorative transition.
- From each 4-second source clip, select the most complete continuous movement section and trim regular shots to about 3 seconds.
- Keep 4–5 seconds only when shortening would break action completeness.
- Align each `final_audio` precisely to its triggering action.
- Leave shots without marked audio sparse and quiet rather than filling them with music in the clean version.
- Export in the aspect ratio and resolution defined in `Final_Video_Spec.md`.

The default clean final output must contain no BGM, no narration, no dialogue, no subtitles, and no text overlay unless the user explicitly requested visible title text as part of a graphic design.

## STEP 7.5: Optional BGM Recommendation and BGM Version

After the clean final video is assembled, recommend whether a BGM version would improve the piece. This is a post-production option, not part of the shot-generation prompts. Do not add BGM automatically. Ask the user whether they want an additional BGM version while keeping the clean SFX-only version.

Recommendation content:

- Summarize the final video mood, visual rhythm, and story arc.
- Offer 2–3 suitable BGM directions based on the actual video content, for example intimate chamber strings, soft Parisian morning piano, minimal harp and celesta, or restrained luxury ambient.
- Keep the recommendation aligned with the existing visual style: elegant, sparse, tactile, no vocals, no lyrics, no dramatic trailer percussion, no overpowering mix.

If the user wants BGM:

1. Measure or use the assembled final video's exact duration.
2. Generate one instrumental BGM track with the same duration as the final video, matching the story content, pacing, and emotional curve. Do not generate lyrics or vocals.
3. Mix the BGM under the existing SFX bed. The SFX must remain audible at action moments; duck or lower the BGM around material-contact sounds such as paper, porcelain, footsteps, curtain, wind, or liquid.
4. Export a second deliverable named as a BGM version, while preserving the clean SFX-only final as a separate deliverable.
5. If BGM changes the luxury restraint or masks SFX, lower the BGM level rather than increasing SFX density.

BGM version output rules:

- Clean version remains the primary master.
- BGM version is optional and clearly labeled.
- BGM duration must match the final video duration exactly, including the final hold.
- BGM is instrumental only: no vocals, no lyrics, no dialogue, no narration.
- Never write BGM into individual shot prompts; BGM is generated and mixed only after final assembly.

## STEP 8: Quality Check and Failure Recovery

Before final delivery, audit:

- Does every scene contain one wide establishing shot followed by one close follow-up shot?
- Are all shots visually consistent with the same luxury scarf illustration language?
- Are linework, flat fills, decorative density, jewel palette balance, and matte silk texture preserved?
- Does every close shot contain only one clear action rather than multiple competing actions?
- Are all sounds synchronized with visible actions and free of BGM / voice / dialogue?
- Are transitions hard cuts only?
- Are any brand logos, exact protected scarf designs, or unwanted text visible? If yes, revise or regenerate before delivery.

Failure guidance:

- If a shot becomes too realistic, strengthen the flat decorative art language, closed fine outline, matte print texture, and no strong shadows.
- If the output becomes too sparse, increase foreground / midground / background decorative motifs and textile / architecture pattern density.
- If color drifts into only warm gold, restore the balanced cool-and-warm jewel palette.
- If Shot B loses action clarity, simplify to one verb and one tactile object interaction.
- If audio feels like music or ambience filler, remove it and keep only action-triggered material sound.
