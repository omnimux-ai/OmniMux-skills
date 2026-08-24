---
name: suspense-title-sequence-generator
description: |
  Create a 15-second suspense-aesthetic title sequence from a film type, title, logline, cast, optional credits, and reference images. Confirm reference roles, design six keyframes, lock readable English credits and beat-driven transitions, then generate a 16:9 retro suspense-jazz opening. Preserve pop-art collage, hard-edge silhouettes, limited stylized face reveals, and dense source-prompt continuity. Use for film openings, not full trailers, long narratives, or celebrity replication.
trigger-words: [suspense aesthetic title sequence, film title sequence, suspense crime intro, jazz noir trailer, 电影片头, 悬疑美学片头, 悬疑犯罪片头, 复古动画片头]
---

# Suspense Aesthetic Film Title Sequence

Use this Skill when the user wants a short cinematic trailer title sequence / opening title sequence. The Skill should not send raw character references directly into video as the only visual guide. It first locks six shot keyframes, then uses those keyframes as anchors for video generation.

Default output: a 15-second 16:9 landscape video with retro Japanese animated opening-title language, hard-edge silhouettes, manga collage, asymmetric split screens, bold geometric color blocks, readable English credits, subtle katakana decoration, and a 60% suspense / 40% jazz atmosphere.

## Core Principle

The user provides:

1. Film type
2. Film title
3. One-line plot
4. Cast list
5. Optional reference images

Everything else uses defaults. The one-line plot is an internal interpretation aid only. Do not paste or restate it in the final video prompt; use it to infer motifs, character relationships, clue props, evidence-wall subjects, confrontation sides, and background locations.

Mandatory execution order:

```text
confirm film data and reference-role interpretation → write 6 Chinese keyframe image prompts → generate 6 keyframe images → compile final video prompt from those keyframes → generate final video
```

Do not generate the video immediately after confirming film data.

## STEP 1: Collect Minimal Variables

Collect only missing required variables:

- `film_type`: e.g. light suspense crime, noir romance, retro spy thriller, psychological suspense, female revenge crime.
- `title`: English is preferred because the sequence defaults to English on-screen title/credits only.
- `logline`: one-line plot. It guides motif selection but is not inserted verbatim into the final video prompt.
- `cast`: actor list for the single `STARRING ...` credit.
- `references`: optional images: protagonists, supporting characters, props, scenes, style references, film screenshots, title-sequence screenshots, costume references, or composition references.

If information is missing, ask one concise intake question. If complete, continue.

### Credit parsing rules

- User-provided roles and names have highest priority and must never be overwritten by defaults.
- If the user provides a director, `DIRECTED BY` must use that director's name.
- Cast names are used only for `STARRING {cast_names}`.
- Do not convert a user-provided director into `CREATED BY`; do not replace a user director with a default director.
- Do not automatically generate names for missing roles. Do not automatically use old template defaults such as `EDITED BY JUNE PARK`, `CREATED BY MIRA HOLT`, `DIRECTED BY NOAH VOSS`, or `PRODUCTION DESIGN BY VERA LIN`.
- If a shot template expects a credit role but the user did not provide that role, the keyframe prompt must not mention credit, credit area, blank label, role, name, or English placeholder at all; describe only composition, characters, props, color blocks, line frames, and layout design.
- In the video stage, missing roles remain omitted; do not describe blank credit-label animation or placeholder credit areas unless the user explicitly asks.
- If the user provides only director and cast, default to title + `STARRING ...` + `DIRECTED BY ...` only.

## STEP 2: Classify Reference Images

User labels override automatic recognition. Otherwise classify each uploaded image as one or more of:

- `protagonist`
- `supporting_character`
- `prop`
- `scene`
- `style`
- `shot_reference`

Reference rules:

- Character images are face-identity and character-cue references first. Preserve recognizable face identity, hairstyle, facial structure, distinctive accessories, and broad costume identity, then cinematically restage. Do not copy the original pose, selfie perspective, casual framing, lighting, background, body direction, or seated/standing action unless explicitly requested.
- Supporting characters can become cinematically restaged ensemble silhouettes, confrontation figures, file photos, or split-screen tiles.
- Prop images become clue inserts, collage tiles, evidence-wall elements, close-ups, transition masks, or designed collage panels.
- Scene images donate environment structure and story-world cues.
- Style images donate silhouette language, color blocks, split screens, line frames, typography layout, motion-collage rhythm, and title-package design.
- Film screenshots are only abstract visual-language, composition, atmosphere, and rhythm references; do not replicate existing IP frames or real actors exactly.

Ask only if an ambiguous role materially changes the output.

## STEP 3: Confirm Film Data and Reference Understanding

Before keyframe prompt generation, confirm film data and reference roles. Mention that the next step is keyframe image prompts, not video.

If the user explicitly asks to continue without confirmation, proceed.

## STEP 4: Write 6 Chinese Keyframe Image Prompts

After confirmation, write one Chinese image prompt for each shot. Each prompt creates one 16:9 landscape keyframe image for later image-to-video guidance. Show the six prompts to the user. If the user requests changes, patch only the affected shot prompt.

Prompt requirements:

- Chinese prompt text, except on-image English title/credits.
- One prompt per shot; never combine all shots into one image.
- Explicitly state 16:9 landscape, film-title keyframe, for later image-to-video.
- Lock composition, character placement, prop count, text placement, split-screen/frame/color-block structure.
- Character refs are identity cues only; the image must be cinematically restaged.
- English title/credits must be clear, readable, not misspelled, and not garbled.
- Do not insert the one-line plot as on-screen text.

### Unified keyframe image style lock

All keyframes must follow a high-saturation pop-art collage title-sequence style. Use saturated red, yellow, and blue as the main color system, with black and white for visual weight and layout support. The look must be high contrast, high saturation, and pure color-block based. Do not use low-saturation gray palettes, soft gradients, or complex textures.

Backgrounds use large flat geometric color blocks separated by clean straight lines. Large red fields often serve as the base; yellow and blue become high-contrast support blocks; black is used for silhouettes, vinyl, and heavy typography; white is used for fine lines, borders, highlights, and layout guides.

The visual language combines Pop Art, Swiss graphic design, Constructivist geometry, 1960s vinyl-record covers, retro suspense title sequences, and Japanese magazine layout. It should feel like a saturated retro title-design board, vinyl cover, and movie title keyframe, not a realistic film still.

Character treatment: silhouettes remain the default, but when the user uploads protagonist face references, the protagonist face must appear only in Shot 01 and Shot 06. The face must not be a raw realistic photo face or casual-photo face; translate it into the same high-saturation pop-art / graphic manga title-sequence style, preserving recognizable face shape, facial proportions, hairstyle, eyes/brows, and distinctive accessories through hard-edge color blocks, limited facial shadow shapes, restrained skin-tone or monochrome face blocks, and poster-like linework. Shot 02, Shot 03, Shot 04, and Shot 05 keep full-body silhouettes, backs, profile silhouettes, or archival graphic figures without clear protagonist face reveal.

Prop treatment: props may be realistic still-life cut-outs with clean edges, subtle unified shadows, and commercial product highlights. They must look cut and pasted onto flat geometric backgrounds, not placed in real space.

Typography: text is structural, not a simple label. Use modern sans-serif type, thin English, large titles, small layout text, vertical and horizontal text, edge typography, and color-block intersection typography. Optional English, katakana, or abstract type may appear as graphic design elements, but main title/credits must remain readable; no Chinese on-screen text.

Add ultra-thin white guide lines, crop marks, crosshair marks, grid lines, layout reference lines, and fine frames. These lines must be subtle and professional.

Forbidden: low-saturation gray mood, soft gradients, complex textures, realistic backgrounds, photo piles, casual-photo collage, film-still realism, 3D environment staging, heavy shadows, dirty horror style, gore, ghosts, cheerful music-video tone, Chinese on-screen text.

### Shot-specific keyframe rules

### Shot 01 image-prompt rules: title / vinyl opening

- Use a saturated red field with yellow, blue, black, and white geometric divisions. Keep the vinyl record and its center visible as the visual core for a later circular-mask transition.
- If a protagonist face reference exists, reveal one recognizable but fully stylized pop-art / graphic-manga face; otherwise use a hard-edge silhouette. Never paste a realistic face.
- Use no more than five cut-out props. Show `{title}` once and clearly; do not show crew credits.

### Shot 02 image-prompt rules: starring / diagonal cast split

- Divide the frame into equal diagonal panels according to cast count. Show one complete full-body black or dark silhouette in each panel against a continuous geometric interior.
- Use no props. Show the single clear credit `STARRING {cast_names}`.

### Shot 03 image-prompt rules: rooftop pursuit

- Build an orderly collage with complete white borders, a running silhouette inside the central parallelogram, and four bordered prop panels in the corners.
- Show `EDITED BY {editor_name}` only when the user supplied an editor. Otherwise omit the role, credit area, blank label, and placeholder entirely.

### Shot 04 image-prompt rules: evidence wall

- Build a flat high-saturation evidence-wall layout rather than a realistic wall. Select at most three photos from plot analysis and place an investigator silhouette in the foreground.
- Show `CREATED BY {creator_name}` only when supplied. Otherwise omit the role, credit area, blank label, and placeholder entirely.

### Shot 05 image-prompt rules: confrontation / conflicting color blocks

- Use a symmetrical confrontation with strongly conflicting red/blue or warm/cool sides. Place no more than four props inside designed collage panels rather than loose stickers.
- Show `DIRECTED BY {director_name}` only when supplied. Otherwise omit the role, credit area, blank label, and placeholder entirely.

### Shot 06 image-prompt rules: ensemble climax / title mask

- Center the ensemble. If protagonist face references exist, make stylized graphic portraits a main focus; otherwise use silhouettes. Place the giant readable `{title}` mask behind the characters and keep surrounding props from covering faces.
- Show `PRODUCTION DESIGN BY {production_design_name}` only when supplied. Otherwise omit the role, credit area, blank label, and placeholder entirely.

## STEP 5: Generate Keyframe Images

After the user confirms the six image prompts, generate six keyframe images. Default to an image model suitable for complex layout, text, and graphic design unless the user specifies model/quality/resolution.

Defaults:

- 6 images, one per shot.
- 16:9 landscape.
- These are video anchors, not final posters.
- Suggested filenames: `shot01-title-vinyl`, `shot02-starring-split`, `shot03-rooftop-run`, `shot04-evidence-wall`, `shot05-confrontation`, `shot06-ensemble-title-mask`.

After generation, ask the user to confirm keyframes. If one image fails, rewrite only that shot prompt and regenerate only that keyframe.

## STEP 6: Compile Final Video Prompt from Keyframes

After keyframe approval, compile the final video prompt. The final prompt must return to the user's source-prompt style: dense cinematic title-sequence prose, not a technical tool instruction. Keyframes are mentioned once near the beginning as visual anchors; do not repeat `from @image X` in every shot and do not write the shot sections as field lists.

Video prompt compilation rules:

- Start directly with: `Generate a 15-second 16:9 landscape {film_type} film title sequence. The film title is {title}.`
- Then state in natural prose that the six keyframes anchor Shot 01–Shot 06, and that each shot inherits its corresponding keyframe's composition, character placement, prop count, split-screen structure, color-block layout, English credits, title layout, and main visual relationships.
- Keyframe reference should be mostly invisible: mention the six anchors once at the beginning, then write each shot as an actual finished-video description.
- Restore the source prompt's dense structure: overall style paragraph, atmosphere paragraph, motion-graphics paragraph, English-credit rules, Shot 01–06 paragraphs, transition paragraph, and BGM paragraph.
- Use source-style shot headings: `Shot 01, title / vinyl opening:` rather than `Camera 1` or tabular fields.
- Every shot should read like a finished title sequence, not technical execution metadata. The keyframes decide layout; the prompt describes motion.
- Do not paste the one-line plot verbatim. Use only analysis results.
- English title and credits must be clear, readable, not misspelled, not garbled; no Chinese on-screen text.
- The video prompt may only include credit roles provided by the user. Missing roles must not be auto-filled with default fictional names; those shots describe only picture elements, layout motion, and transitions — no blank credit labels or placeholder credit areas.
- Every shot paragraph must include a concrete transition sentence. Do not rely only on one generic `Transition grammar` sentence at the end. Shot 01 uses an expanding vinyl-circle mask; Shot 02 uses diagonal panel collapse or a vertical mirror-cut black mask; Shot 03 uses the running figure's long shadow wipe; Shot 04 uses red-string cutting wipe; Shot 05 uses a giant title-letter mask, conflicting color-block recomposition, or prop-panel hard cut; Shot 06 freezes completely in the final 0.5 seconds.
- The final video prompt must end with a full transition paragraph, not a weakened one-line summary.

### Source-prompt style hard rules

The final video prompt must read like the user's original dense finished-title-sequence prompt, not like a model-card shot plan. Unless the user explicitly asks for a technical storyboard format, never use these structures in the final video prompt:

```text
Global baseline: ...
【Shot 1】...
【Shot 2】...
Start from @image1...
Cut to @image2...
Enter @image3...
```

Mention keyframes only once near the beginning as overall visual anchors. After that, every shot must use the source-prompt style headings, preferably in Chinese punctuation form:

```text
Shot 01，片名/黑胶开场：
Shot 02，主演登场/斜线主角团分屏：
Shot 03，屋顶追踪：
Shot 04，档案线索/主创：
Shot 05，对峙/冲突色块构图：
Shot 06，群像高潮：
```

The fixed final video prompt order is:

```text
1. Generate a 15-second 16:9 landscape {film_type} film title sequence. The film title is {title}.
2. The whole sequence uses six keyframes as visual anchors...
3. Overall style...
4. Atmosphere...
5. Motion-graphics collage behavior...
6. English title and credit rules...
7. Shot 01...
8. Shot 02...
9. Shot 03...
10. Shot 04...
11. Shot 05...
12. Shot 06...
13. Transition grammar...
14. BGM...
```

### Final video prompt template

Use this fixed source-style structure and replace only variables and plot-derived visual details:

```text
Generate a 15-second 16:9 landscape {film_type} film title sequence. The film title is {title}.

Use the six approved keyframes as visual anchors for Shot 01 through Shot 06. Preserve each anchor's composition, character positions, prop count, split-screen geometry, color blocks, supplied English credits, title layout, and key visual relationships. Animate them as motion-graphics collage rather than static pans: draw line frames, split panels, paste color blocks, slide silhouettes, pop props, reveal type through masks, and assemble panels on the beat.

Overall style: retro Japanese animated titles, hard-edge silhouettes, manga collage, asymmetric split screens, saturated geometric color blocks, readable English title credits, sparse katakana decoration, thin white guide lines, and a jazz-crime graphic-design sensibility. Atmosphere: 60% suspense and 40% jazz—mysterious, cool, agile, and elegantly dangerous, never horror-heavy or cheerful like a music video. Use plot-derived objects and relationships only as visual clues; never show the logline as text.

English title and supplied credits must be readable, correctly spelled, and held briefly after reveal. Each supplied role and name appears once. Do not invent missing roles or names, repeat a role, add Chinese text, or create blank credit placeholders.

Shot 01, title / vinyl opening: Assemble black ground, pure geometric blocks, and a rotating vinyl outline. Paste in only the props inherited from keyframe 01. Use a stylized graphic protagonist portrait only when a face reference exists; otherwise use a silhouette. Show {title} as the only main text. Show no crew credit. Transition by expanding the vinyl circle as a mask.

Shot 02, starring / diagonal cast split: Slide complete cast silhouettes into equal diagonal panels over one continuous geometric space. Use no props. Show the single credit STARRING {cast_names}. Transition through diagonal panel collapse or a mirrored vertical black mask.

Shot 03, rooftop pursuit: Animate the running silhouette inside the central parallelogram and offset the four bordered prop panels on beats. Preserve complete white borders. If supplied, show EDITED BY {editor_name}; otherwise show no editing credit or placeholder. Transition with the runner's long shadow wiping across the frame.

Shot 04, evidence wall: Paste in at most three clue photos, files, labels, and red lines while an investigator silhouette turns or reaches for a file. If supplied, show CREATED BY {creator_name}; otherwise show no creator credit or placeholder. Transition by pulling one red string straight into a sharp cutting wipe.

Shot 05, confrontation / conflicting color blocks: Hold the plot-derived sides in a symmetrical face-off. Pop no more than four clue props inside designed panels between them. If supplied, show DIRECTED BY {director_name}; otherwise show no director credit or placeholder. Transition through a giant title-letter mask, conflicting color-block recomposition, or a hard prop-panel cut.

Shot 06, ensemble climax: Preserve keyframe 06's portrait-centered ensemble, surrounding props, and giant {title} mask. Use recognizable stylized graphic faces only when references exist; otherwise use silhouettes. If supplied, show PRODUCTION DESIGN BY {production_design_name}; otherwise show no production-design credit or placeholder. Freeze every panel, character, title element, and existing English credit for the final 0.5 seconds.

Transition grammar: use vinyl-circle masks, mirrored vertical cuts, diagonal-panel collapse, long-shadow wipes, red-string cuts, giant-letter masks, panel recomposition, hard red/yellow/blue cuts, white-border erasure, prop-panel flashes, and beat-driven pasted tiles. Keep transitions crisp, suspenseful, and graphic; no soft dissolves, fluid morphs, or ordinary fades. Hold titles and credits briefly for readability.

BGM: an original 15-second cue with 60% suspense and 40% jazz—low drone, tense plucked strings, cold synth pulses, low drums, sparse brushes, fragments of walking bass, brief low sax or brass accents, and subtle mechanical or vinyl noise. Build from mysterious low frequencies, add a restrained beat, introduce bass motion, then end on a tense chord and final beat. Do not imitate an existing melody.
```

## STEP 7: Generate Video

Default to MiniMax H3 unless the user specifies another model or capability requires a different one. Use the six approved keyframes as video references. Do not use raw character references as the only video visual guide.

Defaults:

- Duration: 15 seconds
- Aspect ratio: 16:9
- Orientation: landscape
- Audio/BGM: enabled when supported
- On-screen text: English title and credits only

## STEP 8: Targeted Repair

If output fails, preserve user variables and locate the failure.

### Keyframe composition fails

Patch only that shot's image prompt and regenerate only that keyframe.

### English credits are garbled or misspelled

Strengthen exact-text, single-credit, and post-reveal hold rules.

### Output is too realistic or resembles narrative animation

Strengthen motion-graphics title packaging, split screens, hard color blocks, silhouettes, masks, and panels.

### Output is too cheerful or too jazz-heavy

Strengthen the 60% suspense / 40% jazz balance and cold, tense, low-frequency mood.

### Output is too horror-heavy or oppressive

Reduce horror while preserving mystery, elegance, danger, and urban-crime cool; forbid gore, jump scares, ghosts, and monsters.
