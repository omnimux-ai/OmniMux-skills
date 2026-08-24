---
name: chinese-style-short-drama-generator
description: |
  End-to-end Chinese-style short-drama production workflow. Applies when the user says "turn a script into a video", "short-drama script to video", "write the script first, then storyboard and video", "Chinese-style short drama end-to-end", "short drama from script to storyboard to video", etc. The entry point asks step by step about script status, aspect ratio, character references, and visual direction; when there is no script, the single-episode writing flow starts first; when there is a character reference, multi-angle character reference sheets are generated. Built-in Chinese-style short-drama aesthetics and full AI expression-prompt logic.
trigger-words: [Chinese-style short drama, Chinese-style short-drama film, short-drama script to video, script to video, single-episode short-drama video, short-drama storyboard video, script to video, drama script to video, script to short drama video]
---

# End-to-End Chinese-Style Short Drama

This Skill turns a Chinese-style short-drama idea, single-episode script, or full script into a complete video-ready pipeline: script confirmation → storyboard brief → multi-angle character reference sheets → multi-angle empty-scene reference sheets → 2x4 monochrome storyboard sheets → panel-level video prompts → video generation → final assembly.

Fits Chinese-style / xianxia / gufeng short dramas, extensible to other short-drama types. Emphasizes live-action short-drama aesthetics popular on short-video platforms: cosplay makeup, compact plot, expressive acting, shootable shots.

---

## STEP 0: Entry Check & Split Selection Cards

After the Skill is triggered, do not start generating. First complete two rounds of entry confirmation on input state and creative direction, unless the user has already given the corresponding information.

**Card discipline: do not merge cards on your own.** They must be presented in the order defined in this document; STEP 0.1 and STEP 0.2 are two entry-confirmation phases, but STEP 0.1 must be split into two consecutive mini cards. In particular, "script status" and "aspect ratio" must not appear on the same card; they belong to the same entry group but must be asked in two turns. The later "style theme + episode positioning" and "core scene + male/female-lead persona" must also be split into their own steps — do not merge all dimensions for brevity.

**No combined options:** each option must answer exactly one dimension of the current mini card. Do not offer cross-dimension options like "has script + 9:16", "no script + Chinese-style", or "has character ref + xianxia". If multiple dimensions need confirmation, split into multiple mini cards in sequence.

### STEP 0.1: First Entry Group — Ask Script Status and Aspect Ratio Separately

The first entry group has two consecutive mini cards, in order, no merging.

#### STEP 0.1A: First Card — Script Status Only

This card asks exactly one dimension:

1. **Script status**
   - I have a script; I'll upload it or it's on the canvas
   - No script; help me write a single-episode short drama first
   - Only an idea; expand it into a script first

After the user picks, immediately show STEP 0.1B. Do not ask aspect ratio here, and do not generate content.

#### STEP 0.1B: Second Card — Aspect Ratio Only

This card asks exactly one dimension:

1. **Aspect ratio**
   - 9:16 portrait
   - 16:9 landscape

After the user picks, the first entry group is complete — immediately go to STEP 0.2. Do not ask character references or visual direction here, and do not generate content.

### STEP 0.2: Second Entry Group — Ask Character Reference and Visual Direction Separately

The second entry group has two consecutive mini cards, in order, no merging.

#### STEP 0.2A: Third Card — Character Reference Only

This card asks exactly one dimension:

1. **Do you have a character reference?**
   - Yes, I'll upload the reference image
   - No, auto-design characters from the script
   - Only some characters; auto-design the rest

After the user picks, immediately show STEP 0.2B. Do not ask visual direction here, and do not generate content.

#### STEP 0.2B: Fourth Card — Visual Direction Only

This card asks exactly one dimension:

1. **Chinese-style short-drama look?**
   - Chinese-style / xianxia / gufeng short-drama look
   - Other short-drama look

After the user picks, the second entry group is complete — apply the entry rules below. Do not add other dimensions here, and do not generate content.

### Entry Rules

- User has a script: ask them to upload it or select the script doc on the canvas, then read it.
- User has no script: start the single-episode writing flow first, then move on to the storyboard.
- User only has an idea: expand it into a complete single-episode short drama first, then move on to the storyboard.
- User has character references: subsequent character sheets must be generated from those references.
- User has no character references: extract characters from the script and auto-generate multi-angle character sheets.
- Before generating the storyboard, aspect ratio (16:9 or 9:16) must already be confirmed — do not skip it by default.

---

## STEP 1: Script Ingestion or Single-Episode Writing

### 1.1 User Has a Script

Read the script the user uploaded or selected on the canvas, and extract:

- Title
- Genre and style
- Story synopsis
- Character list
- Scene list
- Scene breakdown and dialogue
- Key conflicts, twists, ending hooks

If the script is incomplete, fill it in as a shootable single-episode script first, then move on to the storyboard.

### 1.2 User Has No Script

Enter the single-episode writing flow first:

1. Present six mini selection cards in sequence, one dimension each.
2. After six choices, generate the full single-episode script.
3. The script must be tight — open with direct conflict, no long background exposition.
4. Once done, place the script into a canvas document and wait for user confirmation or continuation.

Recommended six consecutive mini cards:

- Card 1: style theme only
- Card 2: episode positioning only — that is, where this episode sits in the series and whether it must stand alone as a self-contained piece
- Card 3: duration only
- Card 4: core scene only
- Card 5: female lead persona only
- Card 6: male lead persona only

Do not merge "style theme + episode positioning", "core scene + female lead + male lead", or "female lead + male lead" on one card.

---

## STEP 2: Generate the Storyboard Brief Document

Before generating the storyboard, confirm and stay with the aspect ratio picked in STEP 0: 16:9 or 9:16.

Based on the script, produce a canvas Markdown master document containing:

- Project info: genre, style, video runtime, target shot count, ratio, source script
- Story synopsis: 2-3 sentences
- Character list: for each character — identity, appearance, wardrobe, signature features, core emotion
- Scene list: visual description and mood palette for each scene
- Shot list: shot number, shot scale, scene, picture description, character dialogue, sound design
- Visual spec: Medium Lock, Style Brief

### Suggested Shot Count

- 15 s: 8 shots
- 30 s: 15 shots
- 45 s: 22 shots
- 60 s: 29 shots

By default, a single-episode short-drama preview uses 45 s / 22 shots. The user may adjust the runtime.

### Document Rules

- The storyboard brief is the master doc for every downstream generation step.
- Before user confirmation, do not generate character sheets, storyboard sheets, or video.
- After the user modifies the canvas doc, re-read the latest version before any downstream generation.

---

## STEP 3: Embed the Reference Short-Drama Visual Style

If the user chooses Chinese-style / xianxia / gufeng short-drama look, all downstream character sheets, scene sheets, storyboard sheets, and video prompts must embed the following reference short-drama visual rules. This style comes from the local reference folder `D:\AAA澄浅\做skill\短剧` of gufeng AI short-drama samples. The core: "portrait gufeng short drama + BJD porcelain-skin texture + shallow-DoF close-ups + strong rim light + ornate makeup and wardrobe + fast emotional reverse-cut editing."

### Character Look

- The overall character look approaches trending gufeng AI short dramas and gufeng sweet-drama style — not documentary realism, not pure anime illustration.
- Faces use refined BJD / porcelain-skin / high-end 3D texture: clean, blemish-free skin with soft facial highlights, keeping a small amount of realistic texture but overall skewing polished, dream-like, short-drama-styled.
- Facial features emphasize short-drama legibility: bright, expressive eyes; fine eyelashes and eye makeup; sculpted nose bridge; soft-highlight lips. Women may skew peach-blossom makeup, gufeng cos makeup, "eyes full of feeling"; men may skew sharp brows and starry eyes, tall-nose deep-set eyes, gufeng-male-lead texture.
- Wardrobe and makeup must be ornate and detailed: complex hair buns, hair crowns, hairpins, tassels, beadwork, embroidered hanfu, silk and brocade textures; hair strands, tassels, sleeves may have subtle wind-drift motion.
- Avoid coarsely realistic skin, waxy stiffness, plastic feel, low-fidelity outfits, cheap MMO CG, flat anime face.

### Fixed Lighting

- Use cinematic soft light + side-back / back / rim-light combinations. Hair strands, shoulder line, sleeves, and headpiece edges must have visible but soft halos.
- Interiors may use candlelight, lantern light, patterned-window projection, gap light from folding screens, Tyndall beams; exteriors may use hair-rim light, air particulates, and out-of-focus bokeh.
- Slight bloom and soft focus on highlights are allowed; keep the background at shallow DoF so the character emerges from it.
- Keep tonal layering and cinematic feel — no flat even light, no hard flash, no muddy grey mush.

### Camera Language & Composition

- Portrait-format projects prefer mobile short-drama compositions: medium close-ups, close-ups, face close-ups, eye close-ups, hand / prop / jewelry macro shots. Minimize information-free wide shots.
- Dialogue and emotional conflict use fast reverse cuts: female-lead close-up, male-lead reaction close-up, and local-action close-ups alternate to amplify micro-expressions and relational tension.
- Composition uses shallow DoF, center composition, framed composition, foreground occlusion, and 3-layer space: foreground gauze / branches / candle / lattice, middle-ground character, background architecture or blurred screen.
- Key entrances may use slow pushes, slow motion, mild arcs, or "frozen-emotion" beats. Action amplitude does not have to be big, but there must be micro-motion — gaze, hair strands, sleeves, tassels, moving light and shadow.

### Scene Look

- Scenes must have a shootable spatial feel: courtyards, moon gates, wedding rooms, palaces, mountain gates, lantern fairs, bamboo groves, Silk Road festivals, gufeng interiors, folding screens, lattice windows, gauze, candles, lanterns, branches, porcelain — every element must serve the relationship and staging.
- Scene reference sheets default to no characters, unless the user explicitly asks.
- Scene images serve as spatial reference for downstream storyboards and video — do not add off-plot characters.
- Scenes must preserve foreground / middle / background layers and provide clear spatial anchors for the coming close-ups, reverse cuts, and hand-prop macro shots.

### Short-Drama Visual Rhythm

- Emotional efficiency first: every shot must serve relationship progression, misunderstanding, twist, tension, conflict, or comic reaction — no stack of empty B-roll.
- Use micro-expressions, "eye waves", eye lifts, gaze drops, pauses, finger motion, jewelry sway, sleeve drift, and light passing across the frame to build short-drama tension.
- Comedy / sweet passages may use faster cuts and exaggerated reaction close-ups; angst / emotional passages may use slower gazes, pauses, tearful highlights, and side-back light to stretch emotion.
- Generated prompts must explicitly name: shallow DoF, close-up, BJD porcelain-skin texture, ornate gufeng makeup and wardrobe, rim light, out-of-focus blur, micro-motion, short-drama reverse-cut rhythm.

---

## STEP 4: Multi-Angle Character Sheets & Multi-Angle Scene Sheets

### 4.1 Character Sheets

Generate one multi-angle character sheet per main character. Do not combine multiple characters into a single sheet.

Each character sheet must contain:

- Same character, front view
- Same character, side view
- Same character, back view
- 1-2 small-size half-body expression or action variants
- Key props or signature actions

### With Character References

- Use the user's uploaded reference as the identity anchor.
- Multi-angle sheets must preserve the character's core face shape, aura, hairstyle, and wardrobe features.
- If only some characters have references, anchor them to those references and auto-design the rest from the script.

### Without Character References

- Generate multi-angle sheets from the character list in the storyboard brief.
- Character appearance, wardrobe, and key props must stay consistent with the script.

### 4.2 Multi-Angle Scene Sheets

Generate at least one multi-angle empty-scene sheet from the storyboard brief. Each core scene defaults to a multi-angle sheet, not a single-view scene image.

Scene-sheet requirements:

- Generate per the core scenes in the storyboard brief.
- No characters, extras, crowds, silhouettes, hands, faces, or figures.
- One sheet holds multiple angles — e.g., main view, reverse, side, local prop or spatial detail.
- Preserve spatial layers: foreground, middle, background.
- Clearly show entrances, main activity areas, depth relationships, and shootable camera positions.
- Used downstream as scene reference for monochrome storyboards and video.

---

## STEP 5: Generate 2x4 Monochrome Storyboard Sheets

Based on the storyboard brief, generate black-and-white 2x4 storyboard sheets.

### Layout

- Each sheet is fixed to 2 rows × 4 columns, 8 equal-sized panels.
- 16:9 landscape project: storyboard sheet is 16:9.
- 9:16 portrait project: you may still use a landscape 2x4 as the working board, or switch to a vertical storyboard board on user request; the default is the 2x4 working board.
- Inside the image: no titles, numbers, labels, dialogue, subtitles, watermarks, or UI.

### Continuity

- Sheet 1 covers Shot 01-08.
- Sheet 2 covers Shot 08-15, first panel reuses Sheet 1's last panel.
- Sheet 3 covers Shot 15-22, first panel reuses Sheet 2's last panel.
- Sheet 4 covers Shot 22-29, first panel reuses Sheet 3's last panel.

### Characters in Monochrome Storyboards

- Characters on monochrome storyboards must be simple stick-figures / wireframe action mannequins.
- Character reference sheets are used only to extract minimal outline cues — do not copy full wardrobe, face, makeup, materials.
- Scene reference sheets are used only for spatial relationships, atmosphere, and composition reference.

---

## STEP 6: Embed AI Expression Prompt Logic

When generating panel-level video prompts, embed the full expression-performance layer. This step does not generate images or video by itself; it converts abstract emotions from the script — "cry, sneer, shock, glare, aggrieved, fake smile, restrained" — into facial-muscle, gaze, micro-expression, body-cooperation, and physical-reality detail that video models can execute.

### 6.1 Recognize Expression Intent

For every shot and line inside a panel, extract the character's expression state:

- **Emotion name**: aggrieved, suppressed crying, sneer, glare, shock, suspicious, silent tears, fake smile, fear, restrained, etc.
- **Emotion intensity**: subtle, mild, evident, strong, extreme.
- **Performance function**: genuine leak, disguise, suppression, offense, feigned weakness, provocation, counter-attack, breakdown, remorse.
- **Camera distance**: wide shots only carry posture and body orientation; medium close-ups and close-ups must carry brow / eyelid / lip / chin / breath / tear details.
- **Time change**: the video prompt must describe the emotion's onset, hold, turn, and fade from A to B — not just a static emotion word.

### 6.2 Five-Layer Expression Structure

Organize every key expression along five layers when writing panel-level prompts:

1. **Facial-muscle action**: inner-brow lift or press-down, eyelid narrowing or lift, mouth corner up or down, jaw quiver, masseter tightening, lips pressed pale.
2. **Gaze system**: locked, avoiding, defocused, downward examining, rapid blinks, long unblinking, tear-glistening.
3. **Micro-expression dimension**: where the emotion first leaks, its duration, whether symmetric, whether snapped back.
4. **Body cooperation**: head tilt back or sideways, shoulders drawn in or pressed forward, fingers clenched, half-step back, torso leaning in, body blocking someone.
5. **Physical reality**: tears pooling on the lower lid, tear-drop path down the cheek, lips pressed pale, breathing waves, sleeve crumpled from clenching, skin flush under the eyes.

### 6.3 Natural-Blink Performance Rules

When writing panel-level video prompts, treat blinking as part of the actor's overall performance, not a mechanical timer. Follow:

- **Base cadence**: blinking must exist as a continuous physiological layer. In close-ups, medium close-ups, dialogue shots, and emotional shots, characters must not go more than 3 seconds without a blink; if a shot lasts over 3 seconds, place at least one blink at a natural pause, gaze shift, breathing change, or action beat.
- **Action-node blink rule**: at head turns, hand raises, half-steps back, mid-speech pauses, "looking at someone", head-down, head-up, gaze re-landing, and emotional stalls, place a blink or half-blink to avoid a "freeze-frame digital human". Blinks should bind to action rhythm — never float on their own.
- **Avoid mechanical feel**: even though blinking is required, do not write it as a fixed timer. Vary the timing, amplitude, and duration — light blink, half blink, slow blink, quick blink — never make all blinks identical.
- **Emotion coupling**: while lying, avoiding, nervous, or anxious — place quick blinks before speaking, after a gaze dodge, or at emotional stalls; while intimate or flirtatious — use slow blinks and extended eye contact; authoritative / severe / examining / oppressive characters may reduce amplitude but still cannot go long without blinking.
- **Motion coupling**: at head turns, gaze shifts, looking up from a screen, hearing a sudden sound, laughing, or thinking pauses, blinks must couple with head motion, gaze, breath, and micro-expression. Especially at the completion of a gaze shift, add a natural blink as a visual reset.
- **Anti-patterns**: no long stiff no-blink; no close-ups over 3 seconds without a blink; do not decouple blinks from head motion, gaze, and breath; do not make all blinks identical in amplitude and duration.
- **Example**: "She looks away then back at the other person; the instant her gaze lands on his face she blinks once lightly. Half a second of pause, then she raises her hand to suppress her emotion — her lids do another quick half-blink, and she keeps a breathing gaze on him."

### 6.4 Common Short-Drama Expression Transcriptions

- **Aggrieved / suppressed crying**: inner brows lift slightly and pinch together, lids moist, mouth corners pull down while lips press hard, small "trying-not-to-cry" quiver in the chin; hands clench sleeves, shoulders draw in, body assumes a self-protective posture.
- **Silent tears**: the upper face leaks sadness first — brows lift then lightly pinch; lips clamped, throat swallow, uneven breathing without loud crying; tear drops slide irregularly down the cheek.
- **Sneer / contempt**: single-side mouth corner lifts briefly, lids narrow, gaze tilts down to examine the other; head tilts back or sideways slightly, expression asymmetric and quickly retracted.
- **Anger / glare**: brows press down and pinch, upper lid pressed by the brow forming a sharp narrow slit; lips clamped, masseter tightens, jaw pushes forward; body leans in, shoulders forward, fingers or fists clenching.
- **Shock**: brows rise as a whole, upper lids snap up, palpebral fissure widens; jaw drops, mouth slightly open; gaze locks the source, body shrinks back slightly, then freezes or transitions to the next emotion.
- **Suspicion / examining**: lids narrow, brows lightly pinch, one brow may be slightly higher; gaze locks long on the target, head tilts slightly, mouth corners pull in or press to one side.
- **Fake smile / feigned tenderness**: mouth corners lift but the eye area does not follow, cheeks do not lift; gaze is fixed or frequently drifts, expression held too long or dropped suddenly.

### 6.5 Format Written Into Video Prompts

Every panel's "expression prompt" must use natural, shootable language — do not just list abstract emotions, and do not just write a technical code. Suggested format:

```text
Within this segment, the character's expression shifts from A to B: first ... then ... finally ...; the gaze ...; the body ...; physical details ...
```

Example:

```text
Shen Qingci first avoids Xie Wujiu with a cold gaze; her inner brows lift extremely lightly and immediately press back down. On hearing him cough blood, she blinks quickly once. Her shoulder and fingers move first, as if by instinct she wants to step forward; then her jaw tightens and her step abruptly stops. When she delivers her counter-line, one side of her mouth lifts briefly into a restrained sneer, then instantly returns to a blank face.
```

### 6.6 Short-Drama Performance Principles

- Live-action short drama first: restrained, real, shootable — no anime-style exaggeration.
- Wide shots do not carry pupil or skin detail — only posture, stance, body orientation.
- Medium close-ups and close-ups must write out expression onset, hold, turn, or fade.
- Wronged characters mostly show restraint, sneer, and suppressed grievance — do not break down and cry too early.
- Misunderstanding characters mostly show examining, wavering, defocused eyes, remorse, and breathing change.
- Disguisers mostly show fake smiles, no smile at the eyes, gaze dodging, stiffened mouth corners.
- In crisis passages, drive expressions by action: startle → prevent → break → resolve → brief tenderness → final shock.

### 6.7 Combining with Short-Drama Prompts

- Inside a short-drama video, the expression layer must serve the relationship:
  - Wronged: restraint, calm, counter-question, sneer — avoid excessive crying / shouting.
  - Fake-victim: tears, step back, gaze dodge, verbal denial while the body postures as the victim.
  - Protector: knitted brows, glare, forward push, body blocking someone.
  - Interrogator: narrowed eyes, sweep, pauses, cold naming.

When output goes to a video model, do not use AU codes as the only prompt; convert to natural, visualizable performance descriptions. When technical precision is needed, add AU codes in parentheses.

### 6.8 Boundaries & Cautions

- Do not write pupil or skin details for wide shots.
- Do not give every character the same "knitted brows + tears" template; differentiate performance function by relationship.
- Do not write expressions as abstract emotion words — write visible motion.
- Do not over-exaggerate unless the user explicitly requests comic / exaggerated style.
- Live-action short drama prefers restrained, performable, shootable details.

---

## STEP 7: Generate the Panel-Level Video-Prompt Master Document

Create a single master document `video_prompt_list.md` — do not create multiple duplicate confirmation docs.

Each monochrome storyboard sheet corresponds to a Panel. Every Panel contains:

- Monochrome storyboard reference path
- Covered shot range
- Suggested duration
- Story-plot natural paragraph
- Key dialogue
- Expression prompt
- Natural-blink performance prompt
- Sound design

Every Panel's "natural-blink performance prompt" must be written per STEP 6.3 — never omitted. Combine current-shot emotion, gaze shift, head motion, speaking state, and pause rhythm into a natural, shootable actor-performance description. In close-ups, medium close-ups, dialogue shots, and emotional shots, no more than 3 seconds without a blink; place a blink or half-blink at every visible action node — but vary amplitude, timing, and rhythm to avoid the mechanical feel.

### Sound Principle

Default: no BGM. Write:

> NO background music; use only ambience, action sound, spatial FX, necessary silence, and audio-visual rhythm.

If the user requests BGM, enter the music or post-mix flow separately.

### Confirmation Gate

Before video generation, the user must confirm `video_prompt_list.md`.

The user may modify:

- Panel plot
- Expression prompt
- Dialogue
- Sound design
- Model
- Resolution
- Aspect ratio
- Per-panel duration
- Whether to generate audio

---

## STEP 8: Video Generation

After the user confirms `video_prompt_list.md`, generate video per Panel.

### Video Generation Rules

- Every monochrome storyboard = 1 Panel = 1 video clip.
- Every clip references all character sheets, scene sheets, and the corresponding monochrome storyboard.
- Every clip uses the confirmed Panel paragraph prompt.
- Every clip's video prompt must include that Panel's "natural-blink performance prompt", clearly stating the coupling of blinks with emotion, gaze shifts, head motion, speaking or pausing. In close-ups, medium close-ups, dialogue shots, and emotional shots, no more than 3 seconds without a blink; place a blink or half-blink at every visible action node. Never generate a Panel prompt without the blink-performance layer.
- **Hard rule: the final video picture must never contain subtitles, titles, on-screen text, dialogue captions, narration captions, corner text, watermarks, or UI.** Dialogue and narration are conveyed only through sound; do not render text into the picture — unless the user explicitly overrides this rule.
- Every clip prompt must include: "no subtitles, no on-screen text, no readable text — dialogue is delivered only through audio."
- Preserve or generate ambient sound, action sound, dialogue, and spatial FX by default; no BGM.
- If the user picks 9:16, video generation must use 9:16.

### Default Params

- Model: choose via runtime model routing; without special needs, use a video model with multi-reference and native audio support.
- Resolution: prefer 1080P.
- Duration: estimated from total runtime / Panel count; per-clip duration must match model limits.

---

## STEP 9: Final Assembly

After all Panel videos are generated, ask or, per user confirmation, assemble them in order into a complete final piece.

Assembly rules:

- Strict order: Panel 1 → Panel 2 → Panel 3 → subsequent Panels.
- Keep the original audio track.
- **Hard rule: no subtitles, titles, on-screen text, dialogue captions, narration captions, corner text, watermarks, or UI at the assembly stage either.** If a clip accidentally produced text, prefer to regenerate that clip rather than keep it in the final piece.
- No BGM unless the user explicitly requests it.
- Do not change the aspect ratio.
- If resolution or codec varies, do safe merge and scale adaptation.
- After assembly, report output path, duration, ratio, sound handling, and sync status.

---

## Asset Management Rules

- Generated character sheets, scene sheets, monochrome storyboards, video clips, and the final piece must all appear on the canvas or in project assets.
- Multiple character sheets or storyboards should be auto-grouped for easy review.
- Do not manually re-add to the canvas assets that the generation tool already placed on the canvas.
- File paths follow the tool's return values — do not rename or move generated files.

---

## Trigger Examples

Will trigger this Skill:

- "Turn this short-drama script into a video"
- "Short-drama script to storyboard, then generate video"
- "I have a Chinese-style short-drama script — build the character sheets, storyboards, and final piece for me"
- "Write a single episode first, then turn it into a video"
- "Script to video, with the Chinese-style short-drama look"

Should NOT trigger this Skill:

- "Just write a short-drama script"
- "Just make one gufeng character image"
- "Just cut these videos together"
- "Just recognize the font in this image"
