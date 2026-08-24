---
name: zodiac-world
description: |
  Zodiac English World — single-episode video production full pipeline. Input one chapter of novel text, automatically complete:
  Chapter analysis → Video script breakdown → Character design sheet generation → Keyframe image generation →
  AI voice-over → Ending children's song generation → Video clip generation → Final compositing.
  Output a vertical 9:16, 30–60 second children's English learning short video (story + children's song hybrid format).
  Trigger words: Zodiac English World, zodiac world, zodiac video production,
  Kazefumori, Monkey protagonist, produce one episode, chapter to video, 12 zodiac English.
trigger-words:
  - Zodiac English World
  - zodiac world
  - zodiac video
  - Kazefumori
  - produce one episode
  - chapter to video
  - zodiac-world
  - 12 zodiac English
  - Zodiac English World
---

# Zodiac English World — Single Episode Video Production

Input one chapter of novel text, output one 30–60 second vertical short video (9:16).
Story + children's song hybrid format, 3D Pixar style, targeting English learning for children aged 3–8.

---

## World Setting

The forest village **Kazefumori (Gentle Breeze Forest)**. 12 zodiac animals each live in their own home,
naturally learning English through daily visits, cooking, gardening, and chatting.
Not a floating island, not an RPG, not a magic setting — it's the warm daily life of a small village.

**Monkey is the narrative anchor** — he appears in every chapter, and children enter the story through his perspective.
Each chapter has a focus character (the friend Monkey goes to visit).

Season 1 has 10 chapters. The focus characters for the first 5 chapters are: Rabbit → Tiger → Rat → Dragon → Pig.

---

## Character Visual Definitions (3D Pixar Style)

When generating character sheets or keyframes, the following English descriptions serve as the prompt foundation.
All characters share the style tag: `3D Pixar/Disney style, adorable, child-friendly,
soft lighting, forest village setting, vertical 9:16`

### Monkey — Age 10, mischievous and talkative, narrative anchor

Golden-brown short fur, light beige face. Large round amber eyes,
bright and mischievous. Bright red adventure vest with one big pocket
(always stuffed with trinkets) + khaki shorts. One stubborn ahoge on
top that never stays down. Curly-tipped tail. Lean and agile build,
long limbs, often in jumping/climbing poses. Signature gesture: waving
one hand high above head to say hi.

### Rabbit — Age 8, gentle and timid

Soft cream-white fluffy fur, cherry-blossom pink inside ears. Round
pale blue eyes, always with a hint of worry. Light blue apron dress
(cottage-garden style) with small floral pattern. A tiny daisy pinned
to one ear, always wearing gardening gloves. Petite and soft, puffy
round tail, ears perk straight up when startled. Signature gesture:
both paws held to chest, ears slightly drooping.

### Tiger — Age 12, brave and straightforward

Bright orange base with crisp black tiger stripes, creamy white belly.
Sharp emerald green eyes, full of confidence. Dark green zip-up sport
hoodie (zipper open) + black athletic pants. Silver whistle on a
lanyard around neck (captain badge), sneaker laces untied. Sturdy and
muscular, tallest and strongest of the five, upright posture. Signature
gesture: hands on hips, chin slightly raised.

### Rat — Age 9, calm and clever

Dark blue-grey fur, light grey belly, fur sleek and tidy. Narrow deep
purple eyes, always observing and thinking. Mustard-yellow turtleneck
sweater + brown suspender pants, a small notebook in pocket. Round
oversized glasses (often pushed up with one finger), thin flexible tail
that auto-curls around things. Short but well-proportioned, precise
movements with no wasted motion. Signature gesture: pushing glasses up
+ tilting head in thought.

### Dragon — Age 14, gentle and dreamy, Chinese dragon

Pearlescent mint-green scales with faint golden shimmer in light. Warm
amber-gold large eyes, vertical pupils but gentle expression. Two
backward-curving Chinese dragon horns (smooth jade-carved look, rounded
not sharp). Two long white whiskers from nose sides, floating softly
like silk ribbons. Fluffy white mane from crown to back of neck,
slightly floating. Eastern serpentine body but chibi-proportioned —
shortened torso, stubby limbs for walking upright, creamy white belly.
Rounded four-toed dragon claws with paw-pad feel. Long tail ending in
a tuft of mint-green fluffy fur (flame-shaped). White gauze shawl
draped over shoulders, fastened with a cloud-pattern jade clasp.
Special: blows colorful little cloud puffs from nose (not fire — soft
rainbow clouds). Signature gesture: gazing up at the sky, whiskers
drifting in the wind.

---

## Character English Speech Styles

When generating dialogue, each character's lines **must** follow these speech habits.
If the generated dialogue has all characters speaking identically — this rule was not followed, and it must be redone.

| Character | Age | Catchphrases / Sentence Patterns |
|-----------|-----|----------------------------------|
| Monkey | 10 | Hey guys! Guess what? / Look! Wow! — Talkative, loves to interrupt |
| Rabbit | 8 | Oh dear... I'm afraid / Are you okay? — Soft-spoken, gentle and timid |
| Tiger | 12 | Let's go! Follow me! / Move! — Short and punchy, straightforward and impulsive |
| Rat | 9 | Wait... I have a plan / Let me think — Few words but precise, calm and accurate |
| Dragon | 14 | Imagine if... / Everything will be alright — Long and poetic, gentle and dreamy |

---

## Plan A Video Structure (Default)

Each episode is 30–60 seconds, in three parts:

| Time Segment | Content | Duration |
|--------------|---------|----------|
| Opening | Scene setup, character entrance, introduce a small problem | 0–10s |
| Main body | Dialogue drives the plot, core English expressions appear repeatedly | 10–40s |
| Closing | Characters sing a 15–20 second short song together, lyrics tied to the chapter theme | 40–60s |

**Lyrics are written after receiving the novel content, based on the chapter's plot** — do not write songs during the novel stage.

---

## STEP 0: Check Resources

1. **Chapter text**: User provides the novel chapter text (paste or file). If not provided, prompt the user.
2. **Characters in this chapter**: Identify the list of appearing characters from the text.
3. **Character design sheets**: Check if the project directory already has character sheet images for each character.
   - Exists → Record the path, skip generation for this character in STEP 3
   - Missing → Mark for generation in STEP 3
4. **Chapter number**: Confirm which chapter this is and who the focus character is.
5. **Existing voices**: Check if there are saved voice_ids from previous chapters.
   - Exists → Reuse directly in STEP 5
   - Missing → Need to design new voices in STEP 5

---

## STEP 1: Analyze Chapter

Extract information needed for video production from the novel text:

1. **Focus character**: Who is the friend Monkey visits in this chapter
2. **Core English expressions**: The key sentence patterns taught in this chapter (e.g., "May I come in?")
3. **Key scenes**: The plot segments best suited for a 30–60 second video
4. **Emotional arc**: Opening mood → turning point → ending mood
5. **Environment setting**: Where in Kazefumori it takes place (whose home / garden / forest path)

Output a chapter analysis summary for use in subsequent steps.

---

## STEP 2: Write Video Script + Lyrics

### Video Script

Break down into 4–6 shots following Plan A structure. **Each shot ≤ 15 seconds** (maximum per video generation).

Each shot includes:

| Field | Content |
|-------|---------|
| Shot number | Shot 1, Shot 2, ... |
| Time segment | e.g., 0:00–0:08 |
| Visual description | Scene, character actions, expressions, camera movement (in English, for image/video generation) |
| Dialogue | Character lines (English original, **must follow the character English speech style table**) |
| Core expression | Whether this shot contains a core English expression |
| Emotion | Character emotional state |

**Script rules**:

- Dialogue must follow the character English speech style table; characters cannot all speak the same way
- Core English expressions must appear at least 2–3 times (natural repetition, not mechanical)
- Each shot ≤ 15 seconds
- Reserve the last 1–2 shots for the ending children's song segment

### Ending Lyrics

Write a 15–20 second short song (4–6 lines) based on the chapter's core expressions and plot.
Requirements: simple rhymes, repeat core expressions, rhythm suitable for children aged 3–8 to sing along.

### ⏸ User Confirmation

Display the complete script (shot table) and lyrics, wait for user confirmation or edits before proceeding.

---

## STEP 3: Design Sheets (Characters + Scenes, Generate Once, Reuse Later)

Both characters and scenes need design sheets; otherwise cross-shot consistency will break.

**Skip condition**: If character sheets and scene design sheets already exist for all appearing characters in this chapter → skip to STEP 4.

### 3a: Character Sheet

Generate a **4-view character sheet** (2×2 grid: front / left side / right side / back) for each character missing a design sheet:

- Style: 3D Pixar/Disney style, adorable, child-friendly
- **Aspect ratio: 1:1 square** (ensures four panels are equal size, not 9:16)
- Prompt foundation: Use the English description from the "Character Visual Definitions" section above for the corresponding character
- Background: Pure white or light gradient, no complex scenes
- Expression: Neutral and friendly, no strong emotions
- Pose: Standard standing pose, no action poses
- Requirement: Clothing, accessories, and body type **must be completely identical** across all four angles
- Recommended model: `doubao-seedream-5-0-260128` (strong at 3D/character sheets)

**Known issue**: Clothing details (pocket positions, zippers, etc.) may not be perfectly consistent across the 4 views.
The front view's clothing structure needs to be checked carefully during user confirmation.

### 3b: Scene Design Sheet (Critical! Easy to Overlook)

Generate a **scene design sheet** (pure environment, no characters) for the main scenes in this chapter:

- Aspect ratio: 16:9 landscape (wide shot to establish full scene layout)
- Camera angle: Slightly elevated 3/4 top-down view showing the complete scene layout
- Content: Lock in all key visual elements in the scene (building exterior, fence style, plant layout, roads, water features, etc.)
- No characters — pure environment reference

**Scene design elements must be listed and locked one by one**, for example:
Fence type (white pointed picket fence), height, gate design, building style (round-door thatched roof),
garden layout (daisies in front, stone path in center), water feature position (stream on the left side), etc.

### 3c: Character-Scene Scale Design Sheet (Prevent Inconsistencies)

Place a character in the scene to **lock the height ratio between the character and scene elements**:

- Have the character stand next to a key prop (e.g., fence), hand resting on the prop, clearly establishing height contrast
- Aspect ratio: 9:16 vertical (matching the final video)
- **Must pass in the character sheet as reference** to ensure clothing details (pockets, accessories) are consistent
- This image is an internal reference, not a deliverable

**Why this step is mandatory**:
A pure environment design sheet has no character reference, so the model cannot judge the height of fences/doors/tables relative to the character.
In testing, fences varied from knee-height to above the head across different shots — immediately noticeable.
After adding the character-scene scale design sheet and passing it as reference for subsequent keyframes, height consistency improved significantly.

**Consistency check**: After generation, compare against the character sheet front view to confirm clothing structure is completely consistent
(pocket position, whether items are sticking out, zipper/button details, etc.). If inconsistent, redo using the character sheet as the reference.

**Save all design sheet paths after generation; reuse them directly for the same scenes in subsequent chapters.**

### ⏸ User Confirmation

Display all newly generated character design sheets and scene design sheets.
Continue after user confirms; if unsatisfied, adjust based on feedback and regenerate.

---

## STEP 4: Keyframe Images

Generate one keyframe image for each shot in the STEP 2 script:

- Style: 3D Pixar style, consistent with character design sheets
- Aspect ratio: 9:16 vertical
- Character consistency: **Must** use the character sheet from STEP 3a as the character reference image
- Scene consistency: **Must** use the scene design sheet from STEP 3b + the scale design sheet from STEP 3c as the scene reference
- Visual content: Generate according to the visual description for that shot in the STEP 2 script
- Emotional expression: Adjust facial expressions and body language according to the character emotional state noted in the script
- Use varied camera angles, emphasize richness in expressions and scene details
- Long shots should lean toward a single continuous take design

**Each keyframe must pass in all design sheets as reference simultaneously**: character sheet + scene design sheet + scale design sheet.
Missing any one will cause cross-shot inconsistency (scene drift or scale errors).

**Batch strategy**: Generate all shot keyframes in a single task, do not alternate one by one.

### ⏸ User Confirmation

Display all keyframes, labeled with corresponding shot numbers and time segments.
Wait for user confirmation or identification of frames needing adjustment.

---

## STEP 5: Audio Production

Two types of audio produced in parallel:

### 5a: Character Dialogue Voice-Over

Assign a different AI voice to each character. If voice_ids saved from previous chapters exist, reuse them directly.
If this is a first appearance, design a new voice following the characteristics below and **save the voice_id for reuse in subsequent chapters**:

| Character | Voice Characteristics |
|-----------|----------------------|
| Monkey | Lively, high-pitched boy's voice, slightly fast pace, large emotional range |
| Rabbit | Soft, gentle girl's voice, slow pace, breathy |
| Tiger | Confident, powerful boy's voice, moderate-to-fast pace, crisp and decisive |
| Rat | Steady, composed boy's voice, slow and precise pace, slight nasal quality |
| Dragon | Warm, ethereal young voice, slow pace, dreamy quality |

Generate voice-over audio + subtitle timestamp files for each character following the STEP 2 script dialogue.

### 5b: Ending Children's Song

Generate a 15–20 second children's song audio using the lyrics confirmed in STEP 2:

- Style: Cheerful, simple, suitable for young children
- Vocals: Children's choir feel
- Tempo: Medium to slow, easy to sing along

### No Pause for Confirmation

If unsatisfied with the audio, feedback can be given during final video confirmation, and audio can be replaced later without blocking the workflow.

---

## STEP 6: Video Clip Generation

Generate video clips from each keyframe (Image-to-Video):

- First frame: Keyframe image from STEP 4
- Character reference: Character sheet from STEP 3 (maintain character consistency)
- Duration: Per the time segment marked for each shot in the STEP 2 script
- Aspect ratio: 9:16 vertical
- Action/camera movement: Per the visual description and camera movement noted for that shot in the STEP 2 script

**Batch strategy**: Submit all shot videos in a single task.

### ⏸ User Confirmation

Display all video clips, labeled with corresponding shot numbers.
User indicates which clips need regeneration; the rest are approved.

---

## STEP 7: Final Compositing

Assemble all assets into one complete video:

1. **Video merge**: Concatenate all video clips from STEP 6 in shot order, adding smooth transitions
2. **Dialogue audio track**: Embed the voice-overs from STEP 5a at the corresponding timestamps
   - Dialogue volume is primary; other tracks are lowered
3. **Children's song track**: Embed the children's song from STEP 5b in the final 15–20 seconds
4. **BGM**: Optionally add soft background music (very low volume, must not overpower dialogue or the children's song)
5. **Subtitles**: Embed English subtitles (large rounded font, easy for children to read)

**Key point**: Before compositing, strip the original audio tracks from the story segment video clips (if any)
to avoid overlapping with the voice-overs. Same for the children's song segment — keep only the STEP 5b children's song audio.

### ⏸ User Confirmation

Present the final video and report:

- Actual total duration vs. planned duration
- If unsatisfied with voice-overs or the children's song, replacement audio can be provided for recompositing

---

## Lessons Learned

The following approaches have been verified as non-viable — **do not attempt**:

| Category | Lesson |
|----------|--------|
| World setting | Floating language islands, shadow monsters, words-become-reality, magic settings, RPG combat, treasure hunts |
| Characters | Planning all 12 characters to appear at once (information overload) |
| Novel | Cramming more than 3 characters into one chapter (will be truncated) |
| Dialogue | Generating dialogue without specifying character English speech styles (all characters sound identical) |
| Lyrics | Writing lyrics during the novel stage (lyrics belong to the video layer; write after seeing the plot) |
| Video | Single shot exceeding 15 seconds (generation quality drops dramatically) |
| Scene consistency | Only doing character design sheets without scene design sheets (fences/buildings/gardens differ in every frame) |
| Scale errors | Not including characters in the scene design sheet (model cannot judge prop heights relative to characters; fences vary wildly) |
| Character sheet | Using 9:16 vertical for 4-view sheets (panels become unequal size; use 1:1 square) |
| Character sheet | Not checking front-view clothing structure (pockets may block zippers and other structural errors) |
| Keyframes | Only passing the character sheet without the scene design sheet when generating keyframes (scene changes every frame) |
| Scale design | Clothing in the scale design sheet not matching the character sheet (details like pocket tools drift); must verify against the sheet |

---

## Season Planning

| Season | Chapters | Character Scope | Theme |
|--------|----------|-----------------|-------|
| Season 1 | 10 chapters | 5 core characters | Forest daily life |
| Season 2 | TBD | Introduce remaining 7 zodiac animals | TBD |
| Future | Data-driven decision | — | — |
