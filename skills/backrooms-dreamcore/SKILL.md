---
name: backrooms-dreamcore
description: |
  Personalized Backrooms / dreamcore space generation skill. After the user uploads a character, pet, object,
  or scene image, extract spatial tendencies through 4 immersive multiple-choice questions, then combine
  the reference image subject with Backrooms Level 0 visual grammar to produce a shareable personalized
  Backrooms slice: a space dossier card, an AI image-generation brief, an optional BGM direction,
  and optionally continue into photoreal Backrooms image or image-to-video generation.
  Trigger words include: backrooms test, my backrooms, dreamcore test, my liminal space, inherent space,
  turn me into backrooms, backrooms-ify this scene, character backrooms-ification, scene backrooms-ification,
  liminal space. Not for pure Backrooms lore Q&A, generic horror monster imagery, or generic Backrooms
  images without personalized input.
trigger-words: [backrooms test, my backrooms, dreamcore test, my liminal space, inherent space, turn me into backrooms, backrooms-ify this scene, character backrooms-ification, scene backrooms-ification, liminal space]
allowed-tools: [question, hub_analyse_media, hub_canvas_write_text_node, task]
---

# Backrooms Dreamcore

Use this skill when the user wants to run a "my backrooms / dreamcore test / turn this character or scene into backrooms / generate my inherent liminal space" flow. The core deliverable is a personalized Backrooms creation package: **reference image + 4 immersive answers + Backrooms Level 0 grammar**, which yields a space dossier card, AI image-generation brief, optional BGM direction, and optionally continues into image or video generation on user request.

The goal is not psychological diagnosis and not generic horror imagery. It is to generate a real, cheap, empty, repetitive, faded, filter-worn, and restrained-absurd personalized space slice.

## Scope

Trigger when:
- The user uploads a portrait, character, pet, or object image and wants "the backrooms / inherent space / dreamcore space of this subject".
- The user uploads a room, street, shop, campus, or office scene image and wants it backrooms-ified or dreamcore-ified.
- The user says "test my backrooms / my liminal space / inherent space / dreamcore test".
- The user asks for the dossier card, AI image brief, BGM direction, or direct image / video generation.

Do NOT trigger for:
- Pure Backrooms lore Q&A, e.g. "what is Level 0".
- Generic horror monster imagery or gore.
- Generic Backrooms images without a test, reference image, or personalized input.

## Step 0: Confirm image input

This skill requires **one uploaded image**: portrait / character / pet / object / scene.

If the user has not uploaded an image, ask for one in natural language before starting the test:

> Please upload an image first: a person, character, pet, room, street, shop, or any scene. I will use it and 4 questions to generate your personalized Backrooms space.

Once uploaded, classify the image:
- **Character image**: contains a person, animal, virtual character, pet, or a clear portrait subject. The goal is "the Backrooms space this subject enters or corresponds to".
- **Scene image**: room, street, shop, campus, office, public space. The goal is "the original scene turned into Level 0".
- **Mixed image**: contains both people and scene. If the user hasn't specified the emphasis, use the `question` tool to ask "prioritize character or scene?". If the user has already specified, proceed directly.

Image reading rules:
- For media already on the canvas, first use `hub_canvas_get_node` to fetch existing metadata. If it lacks semantics, then use `hub_analyse_media`.
- For newly uploaded or unknown images, use `hub_analyse_media` with questions focused on this task only: for character images extract identity outline, pose, clothing silhouette, and transferable mood; for scene images extract spatial structure, key objects, materials, doors / windows / corridors / light sources, and Level 0-adaptable elements.
- Do not read color details unrelated to the task; color is already carried by the reference image itself.

## Step 1: 4 immersive questions

Ask exactly 4 questions. Use the `question` tool to emit all 4 multiple-choice questions in a single batch instead of interrupting turn-by-turn. Every question provides A/B/C/D options.

Maintain 5 internal dimensions:
- `boundary`: negative = open, positive = enclosed
- `time`: negative = frozen, positive = flowing
- `presence`: negative = solitary, positive = traces
- `light`: negative = natural, positive = artificial
- `order`: negative = ordered, positive = chaotic

If the user says "skip the questions / just generate / you decide", switch to fast mode without asking.

### Q1: Entrance

Prompt: The image you uploaded starts feeling off. In some corner of the background, a corridor that should not exist appears. The lights are on, but there is no sound inside. You will —
- A. Walk in and see where it leads: `boundary -2, time +1`
- B. Stand at the doorway and observe for a long time: `boundary +2, order -1`
- C. Leave something at the entrance as a marker: `presence +2, order -1`
- D. Turn off the nearby lights before entering: `light +2, order +1`

### Q2: Repetition

Prompt: After walking a while, you notice the walls, carpet, and ceiling start repeating. Not identical, but similar enough to make you suspect you're back where you started. Your reaction is —
- A. Speed up to break the loop: `time +2, boundary -1`
- B. Stop and look for a pattern: `order -2, boundary +1`
- C. Accept it and keep walking slowly: `time -2, presence -1`
- D. Leave a mark on the wall only you can recognize: `presence +2, order +1`

### Q3: Light

Prompt: Ahead there are two kinds of light. One like old fluorescent tubes — flat, dull, humming. The other like light leaking through a distant doorway — an exit, or maybe a trap. You move closer to —
- A. The fluorescent light — at least it's real: `light +3, order -1`
- B. The doorway light — maybe something changes there: `light -1, boundary -2`
- C. Neither; stay in the shadow: `presence -2, boundary +1`
- D. Find the light switch first: `order -2, light +1`

### Q4: What to keep

Prompt: You realize this Backrooms is being generated from the image you uploaded. It won't copy the original exactly — it will keep only the single most important thing. You want it to keep —
- A. The subject itself: person, character, pet, or object: `presence -1, boundary +1`
- B. The scene structure: rooms, corridors, doors, spatial relations: `order -2, boundary +1`
- C. The mood: the feeling the image gives: `time -2, light -1`
- D. A detail: one object, pose, trace, or corner: `presence +2, order +1`

## Step 2: Synthesize the backrooms-ification plan

After the 4 questions, sum the dimension scores and combine with the image type to produce the backrooms-ification plan.

### Character-image plan

Preserve:
- Subject identity, outline, pose, clothing, or key body language.
- Default mode: the subject may appear inside the Backrooms space, looking like it was really photographed there. Not an anime poster or a commercial character poster.
- If the user asks for "Backrooms monster / Entity / chase / horror-ification", the subject may be transmuted into a Backrooms entity, but retain the original outline, pose, clothing feel, or recognizable source.
- If the user does not want the subject on-screen, generate "the inherent Backrooms space corresponding to this subject" without the subject.

Generation direction:
- The subject or transmuted entity sits inside a Level 0-style space, like it was captured by surveillance, an old digital camera, or an accidental snapshot.
- Fine-tune the space along the 5 dimensions: enclosed / open, frozen / flowing, solitary / traces, natural / artificial, ordered / chaotic.
- Even in monster mode, the space remains the picture's main subject; avoid overblown creature-poster energy.

### Scene-image plan

Preserve:
- The original scene's spatial structure, key objects, or primary mood.
- Turn the original elements into Level 0: patterned wallpaper, low-pile carpet, ceiling-grid tiles, fluorescent light panels, repeating partition walls, empty maze layouts.

Generation direction:
- The original scene looks like it was swallowed into Backrooms Level 0.
- Prioritize photographic realism; do not become a concept illustration.
- 1-2 of the most recognizable elements from the original may be retained as out-of-place anomalies.

## Step 3: Backrooms Level 0 visual grammar

Every generated image must first establish Level 0, then graft on the user image elements.

Core grammar:
- Vintage patterned wallpaper, low-pile commercial carpet, mineral-fiber ceiling grid tiles.
- Recessed rectangular fluorescent light panels, single-source fluorescent color cast.
- Heavy rectangular columns or partition walls repeating throughout.
- Empty and unpopulated, or a single isolated subject.
- Walls meeting floor and ceiling directly, without normal doors, windows, outlets, or furniture.
- Deep perspective, distant corners or low doorways implying infinite extension.
- Feels like a real photo, old digital camera, or surveillance still.

Backrooms filter:
- Yellow / green fluorescent bias, low dynamic range, old-camera white-balance drift.
- Compression artifacts, surveillance / VHS grain, slight overexposure, humid mildew air.
- Cheap interior decoration — mundane but uncomfortable.

Restrained absurdity:
- Exit logic disappears.
- Doors or corridors placed illogically.
- Slight proportional errors in rooms.
- Walls, columns, or partitions repeat for too long.
- Everyday objects appear in isolation — a folding chair, a blank book, a small item from the uploaded image.

Avoid:
- Concept illustration, fantasy architecture, magic energy, over-cinematic feel.
- Letting themes like "library / pool / mall / classroom" overpower Level 0.
- On-image text, titles, subtitles, logos.

## Step 4: Output the space dossier card

First output a brief result card, then ask the user whether to continue into image generation. If the user has already said "just generate / make the image / make the video", skip confirmation and proceed directly to generation.

Suggested card structure:

```text
═══════════════════════════════
       Y O U R   B A C K R O O M S   S L I C E
═══════════════════════════════

RM-XXXX ▸ Space name
English codename

Source image type: character / scene
Kept core: subject / structure / mood / detail

Space description: 3-5 sentences
Backrooms filter: 1 line
Anomalies: 1-2 lines

"Short tagline"
═══════════════════════════════
```

Also output:
- AI image-generation brief: described in natural language; do not treat it as a fixed model prompt.
- Optional BGM direction: e.g. low-frequency fluorescent hum, HVAC ducting noise, distant footsteps, dreamcore ambient bed.
- Summary of the 5 dimension tendencies.

Use `hub_canvas_write_text_node` to save the card as a text node, suggested name "Backrooms Slice Dossier".

## Step 5: Image generation

When the user asks for an image, dispatch to the `image` sub-agent. Generation tools auto-register their output on the canvas — do not add media nodes again.

Before dispatch, follow Hub Stage 4 model routing and write `model: X`. If the user did not specify a model, the system picks; do not hard-code the model inside the skill.

`task_description` must include:
- Task type: generation or editing
- aspect_ratio: default to the uploaded image's actual ratio; use the user's platform or aspect ratio if specified
- model: the single model chosen by Hub model routing
- reference image paths: the uploaded image paths, marked as character / scene / mixed
- The 4 question answers and 5-dimension tendencies
- Level 0 visual grammar, Backrooms filter, restrained-absurdity rules
- Character image: preserve subject identity / outline but space first; if monster-ified, retain source features
- Scene image: preserve scene structure or key objects and Level 0-ify them
- The final image must look like a real photo, not an illustration
- Original request: the user's raw wording or a resolved self-contained version

## Step 6: Video generation

When the user asks for a video, dispatch to the `video` sub-agent. Video generation tools auto-register their output on the canvas — do not add media nodes again.

Before dispatch, follow Hub Stage 4 model routing and write `model: X`. If the user explicitly specifies model, resolution, duration, or aspect ratio, treat them as hard constraints — do not swap the model on your own; only run capability checks or ask the user.

Backrooms chase video template — usable for "character backrooms-monster-ification / Entity chase" requests:
- POV: first-person, handheld, running, or surveillance-like — not a third-person movie trailer.
- Scene: Backrooms Level 0 cheap interior maze — vintage wallpaper, low-pile carpet, ceiling grid, fluorescent light array, repeating partition walls and columns.
- Monster: transmuted from the uploaded character image, retaining the original outline, pose feel, or clothing cues, but turned into a Backrooms Entity.
- Motion: the camera backs down a corridor quickly or spins and runs, with the entity closing in from far away or around a corner, forming a clear chase beat within the short clip.
- Image quality: old digital camera, VHS, surveillance grain, low dynamic range, fluorescent color cast, compression feel, slight motion blur.
- Sound: if the chosen video model supports native audio, the audio is owned by the video model — only describe ambient sound, fluorescent hum, footstep echoes, and spatial pressure. Do not re-dispatch a separate speech or music generation for the same track.
- Forbid subtitles, on-image text, logos, movie-poster feel, or overblown creature-flick energy.

## Fast mode

When the user says "skip the questions / just generate / you decide":
- An uploaded image is still required.
- Default answers to a mixed state: Q1=B, Q2=C, Q3=A, Q4=auto by image type; default A for character images, B for scene images, C if mood is particularly strong.
- Generate the "Level 0-ified Backrooms slice" directly from the image.
- If the user explicitly asks for direct image or video generation, skip intermediate confirmations.

## Output and canvas

- All user-facing content uses the user's language.
- The space dossier card can be saved as a text node via `hub_canvas_write_text_node`.
- Image and video generation outputs are auto-registered on the canvas by the generation tools — do not call `hub_canvas_write_media_node` to re-add them.
- If multiple assets are produced in one turn, group them per Hub canvas rules before the final reply.

## Quality bar

- Level 0 grammar first; user image elements are grafted lightly.
- Real, cheap, empty, repetitive, faded.
- No medical, personality, or fate judgments.
- Results should be social-media shareable, but must not look like a commercial poster.
- No generated output may contain subtitles or on-image text.
