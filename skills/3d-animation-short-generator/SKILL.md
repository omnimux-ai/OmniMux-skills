---
name: 3d-animation-short-generator
description: |
  Create story-first 3D animated shorts on the Design platform (Pixar / Disney / Q-version / motion-graphics style), from a one-line idea to final composited video. It covers project brief, story outline, character and scene cards, a seven-column shot table (with per-shot audio mode and mouth-state), text storyboards, single-shot clips, BGM, and final review with choice-card checkpoints. **This skill supports two audio modes only: silent and dialogue-led. Narration-led workflows are outside this Skill boundary.** The lip-sync safety mechanics (mouth-state, speaker-binding, single-speaker, reaction-cut) are audio-mode-agnostic and protect every shot regardless of mode. Trigger words: 3D animation short, animated short, Pixar-style short, story-to-video, cartoon short, lip-sync safe. Not for single images, simple edits, photoreal live action, or one-off clips.
trigger-words: [3d animation short, animated short, pixar-style short, story-to-video, cartoon short, lip-sync safe]
allowed-tools: [question, hub_generate_image, hub_generate_video, hub_generate_music, hub_video_edit, hub_analyse_media, hub_canvas_get_node, hub_canvas_group_recent_outputs, hub_save_file_to_session]
---

# 3D Animation Short Generator

Use this Skill when the user wants a complete story-driven 3D animated short workflow on the Design platform, from a rough idea to a finished film. Keep all durable outputs on canvas in production order, and pause at creative or high-cost decisions with choice cards. Never ask users to confirm by free-form chat when a fixed decision is needed; always use the question / choice-card tool for approvals, revisions, model choices, resolution choices, and proceed-or-revise gates.

Core rule: story first, then assets; confirm aspect ratio, total duration, and **audio mode** with choice cards right after intake; keep the workflow ordered; and use choice cards for every required confirmation. After character and scene cards are locked, the fixed order is: seven-column shot table (with per-second directives, audio cues, final dialogue, audio mode, mouth-state, prop state, position handoff, voice lock, bridge beat, and continuity metadata) -> shot-table self-check -> one text storyboard document with one section per shot and final dialogue rewrite -> optional pencil storyboard images only when the user opts in -> video-model choice card and resolution choice card -> single-shot clip generation with lip-sync safe prompt shaping -> full assembly with BGM -> final review with speaker-identity check.


## Mandatory Choice-Card Interaction Rule

For every workflow gate where the user must approve, revise, select a model, select resolution, lock assets, continue, regenerate, or choose a production branch, use the question / choice-card tool. Do not replace these gates with plain chat questions like "reply continue". If the user answers in ordinary chat before a required choice card was shown, show the missing choice card and ask them to select there.

## Why audio mode is a first-class choice

The most common 3D animated short failure on current video models is **character-confusion lip-sync** — the model receives a shot with two or more on-screen characters plus a dialogue line, and assigns the wrong character's mouth to the wrong line. This skill now prevents that failure at four layers:

1. **Intake layer** — user picks an audio mode (silent / dialogue-led) up front, so the whole pipeline is calibrated to that mode.
2. **Shot-table layer** — every row carries an `Audio Mode` tag (`silent` / `dialogue` / `narration` / `mixed`) and a `Mouth State` field, so the model never has to guess.
3. **Prompt layer** — the video-model prompt prefix is rewritten per audio mode with explicit speaker-binding and non-speaker mouth-closed language.
4. **QC layer** — speaker-identity correctness and mouth-state consistency are hard-gate checks before the film is approved.

**Boundary**: this Skill does not offer narration-led as a user-selectable mode. Narration-led workflows are outside this Skill boundary.

## Global Visual Style Lock

Unless the user explicitly asks for another style, use a warm stylized 3D animation look across character cards, scene cards, shot tables, storyboards, clips, and final assembly.

- Rendering style: Pixar-inspired 3D cartoon look with high-end animated feature polish.
- Character design: readable silhouettes, strong shape language, and expressive but not photoreal anatomy.
- Proportions: friendly stylized proportions, including Q-version proportions when appropriate.
- Hair / fur / materials: sculpted shapes with tactile detail and soft subsurface feel.
- Performance: lively squash-and-stretch, strong anticipation, overshoot, and clear emotional beats.
- Motion: readable camera movement, elastic body mechanics, and vivid micro-expressions.

Negative style constraints: no photoreal live action, no flat 2D anime, no plastic toy skin, no stiff mannequin posing, and no lifeless expressions.

## STEP 0: Intake and Production Plan

Capture:

- One-line idea or rough premise
- Desired output: blueprint only, assets only, shot table, storyboard document, optional pencil storyboards, single-shot clips, assembled film, or final BGM-composited video
- Approximate length if already provided
- Aspect ratio if already provided
- Visual tone
- Dialogue requirement and language only if explicitly requested, but default to the project language when the user has already established one in the brief (Chinese briefs default to Chinese dialogue unless the user explicitly asks for another language)

Immediately after intake, show choice cards for:

- Screen size / aspect ratio
- Total duration
- **Audio mode (v1.1, corrected in v1.1.1)** — pick one. Pick one:
  - **Silent (recommended default for visual 3D animation)** — pure visual storytelling driven by music and SFX. Naturally zero lip-sync risk. Covers Pixar-style visual shorts, music-video animation, action/chase, visual-joke pieces, motion-graphics. This is what most "Pixar-style short" prompts actually want.
  - **Dialogue-led (recommended default when the project needs spoken conversation)** — on-screen characters talk throughout. Requires strict single-speaker-per-shot discipline and the reaction-cut pattern. Use for character-driven stories, TV-pilot-style shorts, dialogue comedy.

Only proceed after all three are confirmed or custom values are supplied. Store the approved settings in the project brief and reuse them in all later steps. **The audio mode decision cascades into the story outline (Step 2), the shot table (Step 5), the storyboards (Step 6), the video prompts (Step 7), and the final QC (Step 9). It is the most important single choice in the whole pipeline.**

Create or update canvas artifacts in this order:

1. Project Brief text node (now also stores the audio mode)
2. Story Outline text node (now also stores the audio-spine map)
3. Character Card image nodes
4. Environment-only Scene Card image nodes
5. Seven-column Shot Table node (now includes Audio Mode + Mouth State)
6. Single Text Storyboards document
7. Optional pencil storyboard image nodes
8. Single-shot Video Clip nodes
9. Assembled Main Video node
10. Matched BGM audio node and final composited video node

## STEP 1: Project Brief

Write a concise project brief to a canvas text node named with the project title or `project-brief`.

Include:

- Working title
- One-line premise
- Emotional premise
- Target audience feeling
- Planned deliverables
- Approved aspect ratio
- Approved duration
- **Approved audio mode** (NEW in v1.1: `dialogue-led` / `silent`)
- Dialogue mode and language only when explicitly requested (and never when audio mode is `silent`)
- Audio-spine summary (NEW in v1.1): one sentence per act describing which audio mode dominates
- Initial risks (now also flag lip-sync risk by audio mode)

Then show a choice card using the question tool:

- Continue with this direction
- Regenerate premise options
- Revise emotional premise
- Refine dialogue direction
- Change audio mode (rerouted to Step 0)

Only continue after the user selects an option on the choice card. Do not accept free-form chat such as 'continue' as the approval for this gate unless it is routed through a choice-card option.

## STEP 2: Story Outline and Gates

Create a story outline and write it to `story-outline` or `story-outline`.

Include:

- Protagonist want / need / flaw
- Core world rule
- 8-beat causal spine
- Emotional anchor and payoff
- **Audio-spine map** — for each of the 8 beats, mark which audio mode carries the beat (`dialogue` / `silent` / `mixed`).
- Dialogue beats (if `dialogue-led` was chosen). Each beat should carry story progression, not just exchange information, and the actual spoken lines should be finalized here before video generation. If two different characters speak in the same shot, split the row into sub-shots before video generation. The shot table must also lock prop possession, character placement, speaking voice, and the bridge beat for each transition so later clips cannot drift.
- Red-line checks

Gate checks (audio-mode-aware, NEW in v1.1 adds check 7):

1. The protagonist drives the story
2. Conflict grows from the protagonist's flaw
3. Coincidence does not solve the problem
4. The ending reuses an earlier emotional anchor
5. Antagonistic pressure is active rather than flat
6. Dialogue reveals relationship change instead of explaining the theme (skip when audio mode is `silent`)
7. **Audio spine is consistent with the chosen audio mode** (e.g. a `dialogue-led` project must reserve reaction shots for every dialogue beat; a `silent` project must not contain dialogue beats)

Then show a choice card using the question tool:

- Approve story and continue
- Revise beats
- Revise emotion curve
- Revise dialogue beats
- Return to premise
- **Revise audio-spine map (NEW in v1.1)**

## STEP 3: Character Cards

Generate character reference cards and place each image on canvas. Recommended order:

1. Protagonist card
2. Transformation-form card if the story includes a transformation or reveal
3. Pressure / contrast character card
4. Optional supporting character card

Each card should be a 16:9 production reference when possible and include readable labels. If the story has a transformation, reveal, disguise removal, or before/after identity shift, the transformation-form card is mandatory and must be treated as a separate identity anchor:

- Character name
- Role label
- Main 3/4 view
- Front / side / back views
- Expressions (v1.1: also include a "neutral mouth closed" reference and a "speaking" reference for any character that will deliver on-screen dialogue)
- Costume / prop details
- Important prop labels
- Identity lock repeated in the prompt
- A short visual-ID note for later consistency
- **v1.1: speaker flag** — for each character, mark `speaks_on_screen: true|false`. Any character in a `dialogue-led` project who speaks on screen gets `true`. If the project language is Chinese, write the speaking reference lines in Chinese by default unless the user explicitly requests another language. For transformation stories, mark both the pre-transformation and post-transformation forms as speaking-capable if the form appears on screen.

After the main character cards are generated, show a choice card:

- Lock character designs and continue
- Regenerate protagonist card
- Adjust specific visual details
- Add another character card

Warn the user that changing locked character designs later may require regenerating the shot table, storyboards, clips, assembly, and final composite. For transformation stories, changing either the before-form or after-form card may require regenerating every shot that contains the transition or the reveal.

## STEP 4: Scene Cards

Generate scene reference cards after the character cards. Scene cards must show environments only: no people, silhouettes, hands, faces, or character cameos.

Include:

- Main environment overview
- Key light states
- Emotional sub-spaces
- Continuity landmarks
- Important environment props

Then show a choice card using the question tool:

- Lock scene design and continue
- Regenerate scene card
- Add another scene angle
- Adjust lighting or layout


## Continuity Master Checklist

For every shot, the shot table and storyboard must explicitly carry these continuity fields:

- C1 Space anchor: a fixed reference object that stays visible or mentally locates the scene
- C2 Exit state: how any departing character or object leaves the shot
- C3 Light inheritance: how the next shot inherits the previous shot's light direction and strength
- C4 Timeline: day period, season/weather, and whether story time advanced
- C5 Color tone: a tone label for every shot so the overall palette does not drift
- C6 Protagonist-vs-supporting intensity: keep the main character visually and emotionally stronger than background characters
- C7 Weak-frame vs strong-frame choice: choose weak-frame alignment for multi-shot story continuity, strong-frame lock for transitions, reversals, and physical action continuity

Decision guide:

- Story continuity with multiple shots: prefer weak-frame alignment
- Transition or emotional breakpoint: prefer strong-frame lock
- Action continuity like chase or fight: prefer strong-frame lock
- Same scene, multiple camera angles: prefer weak-frame alignment

Every shot must include the nine required fields below before it can move into video generation.


## Dialogue Speaker-Split Rule

For dialogue-led projects, never put two different characters' spoken lines into one rendered clip when the video model is expected to generate audio. If a shot contains lines from more than one speaker, split it into sub-shots before video generation:

- A-shot: speaker A delivers the line; all other visible characters keep mouths closed
- Reaction beat: non-speaker reaction with mouth closed
- B-shot: speaker B delivers the line; all other visible characters keep mouths closed

Only keep multiple speakers in one clip when the model is not generating audio and final dubbing will be handled separately. This rule prevents the common failure where character A's line is spoken by character B.

## STEP 5: Seven-Column Shot Table (v1.1)

After character and scene cards are locked, create the standardized shot table. This step is mandatory and cannot be swapped with storyboard or video generation.

**v1.1 changes**: the table now has seven columns (was six) and the per-second directives now require mouth-state tracking. The seventh column is **`Audio Mode`**, and the existing `Audio & Dialogue Track` column is upgraded with a mandatory `Mouth State` field per second.

Required reference: follow `references/shot-table-spec.md` for the exact seven-column schema, per-second directive rules, table-wide rules, the approval card, and the self-check gate. Each shot row must also carry the continuity master checklist fields from the section above.

Minimum runtime contract:

- Create a canvas table node named `standard-shot-table` or `standard-shot-table`
- Use exactly seven columns: `Shot ID & Duration`, `Continuity Handoff`, `Reference Anchors (Spatial + Identity)`, `Hook Type`, `Shot Description (Per-Second Directives)`, `Audio & Dialogue Track` (now with `Mouth State` field per second and the final approved dialogue line), **`Audio Mode` (NEW in v1.1)**. `Continuity Handoff` must explicitly state what each character is holding, where each character ends the prior shot, where each character starts the current shot, whether the speaker voice profile changes or stays locked, and how the current shot bridges from the previous shot instead of skipping over intermediate motion.
- Every row must include complete per-second directives, continuity handoff, reference anchors, hook type, audio/dialogue timing, mouth-state per second, the audio-mode tag for the row, and the final approved dialogue line for that shot; if the line is weak, revise it here before proceeding. For audio-generating video clips, one row may contain at most one speaking character unless it is explicitly split into A/B reaction sub-shots. `Continuity Handoff` is mandatory and must preserve object state, spatial position, voice continuity, and a bridge beat that covers the actual movement or emotional change between the previous shot and the current shot.
- Every row must also fill the continuity master checklist fields: C1 space anchor, C2 exit state, C3 light inheritance, C4 timeline, C5 color tone, C6 protagonist-vs-supporting intensity, and C7 weak-frame vs strong-frame choice.
- Run the shot-table self-check (now seven checks instead of six) before moving on to storyboards

Then show the approval and self-check cards defined in `references/shot-table-spec.md` using the question tool; do not proceed from ordinary chat replies.

### Per-audio-mode shot-table rules (v1.1, default priorities corrected in v1.1.1)

The audio mode chosen in Step 0 enforces different shot-table rules. Pick one:

- **Silent mode (primary, recommended default for visual 3D animation)**:
  - All rows are `Audio Mode = silent` (or `SFX` if SFX-heavy).
  - No on-screen mouth movement; no narration.
  - The per-second `Mouth State` field is always `closed` for all on-screen characters.
  - Lip-sync risk is zero by construction.
- **Dialogue-led mode (primary, recommended when spoken conversation is needed)**:
  - At least 70% of rows should be `Audio Mode = dialogue` or `mixed`.
  - Every dialogue row must follow the single-speaker rule and the reaction-cut pattern.
  - Reaction shots are mandatory, not optional.
  - This is the mode where the speaker-binding and mouth-state defenses are most actively used.

## STEP 6: Text Storyboards Document + Optional Pencil Storyboards

After the shot-table self-check passes, show a storyboard-mode choice card before producing any storyboard artifact.

Required reference: follow `references/storyboard-guidelines.md` for the default text storyboard document, optional pencil storyboards, shot-level extraction, approval cards, and fallback rules.

**v1.1 changes**: every panel now includes a `Mouth State` field, and the four-quadrant content is upgraded with an `Audio Mode` micro-tag per panel. Narration panels must describe the expression path of the on-screen character during the voiceover (even though the mouth is closed).

Minimum runtime contract:

- Default mode is one authoritative text storyboard document with one section per shot
- Each storyboard section must contain the final approved dialogue for that shot, rewritten for story clarity if needed before video generation
- Each storyboard section must also include the bridge beat: the smallest visible action, gesture, or expression change that connects the prior shot to this shot, so the sequence never jumps over missing motion
- Each storyboard section must restate prop possession, where the characters end the prior shot, where they begin this shot, C1 space anchor, C2 exit state, C3 light inheritance, C4 timeline, C5 color tone, C6 protagonist-vs-supporting intensity, and whether the shot should use weak-frame alignment or strong-frame lock
- Pencil storyboard images are opt-in visualization artifacts only
- Extract a shot into a standalone text node only when the user flags it for heavy iteration
- Step 7 must read the matching text storyboard section or extracted node, not the pencil image

After all storyboards are approved, proceed to the video-model choice card.

## STEP 7: Video-Model Choice Card + Single-Shot Clips

Before any clip is rendered, default to MiniMax H3 as the recommended video model, then show the video-model choice card only if the user wants to change the model. Always show the resolution/parameter choice card when needed, and respect model capability limits.

Required references:

- `references/model-selection.md` for model selection, resolution choices, and model-specific prompt shaping (v1.1: prompt shaping is now audio-mode-aware)
- `references/fallback-policy.md` for retry ladders, drift handling, and escalation choices (v1.1: includes a new ladder for character-confusion / mouth-drift)

Minimum runtime contract:

- Use MiniMax H3 for each clip by default unless the user explicitly chooses another model
- Bind each clip to the approved storyboard section, exact character cards, and exact scene card
- **v1.1: bind each clip's video prompt to the row's Audio Mode and the per-second Mouth State** — the prompt prefix is rewritten to enforce speaker-binding and non-speaker mouth closure. The clip dialogue must reuse the approved storyboard lines verbatim; do not paraphrase or translate them in the video prompt unless the storyboard itself was approved in that language. The clip generation stage never invents new dialogue; if the story needs improvement, fix it in Step 5 or Step 6 before rendering. Every dialogue line must advance the scene: it must either reveal a goal, create friction, change a relationship, or pay off an earlier beat; avoid idle greeting-style back-and-forth. Keep the same speaker voice profile across shots unless a deliberate transformation is part of the story, and carry the prop and position handoff forward exactly as written in the storyboard. Do not skip intermediate motion: if the previous shot ends with a reach, turn, step, look, or pause, the next shot must show the bridge beat that completes that motion before the new story beat starts.
- Strip all storyboard-only labels before rendering
- If a clip drifts from the approved reference anchors, follow `references/fallback-policy.md`

After all clips render, place them on canvas in shot order, group them, and show the clip approval card defined in `references/model-selection.md` (now also includes a "Speaker identity verified" check, a "Dialogue matches storyboard verbatim" check, a "Dialogue advances story beat" check, a "Prop and position continuity" check, a "Voice continuity" check, a "Bridge beat continuity" check, a "Transformation-form continuity" check, and a "Single-speaker-per-clip" check).

## STEP 8: Full Film Assembly, BGM Match, and Final Output

After all clips are approved, assemble the complete film, match or generate one continuous BGM track, and produce the final composited video.

Required reference: follow `references/qc-checklist.md` for assembly rules, BGM rules, final review checks (v1.1: now includes speaker-identity and mouth-state hard gates), grouping discipline, and regeneration discipline.

Minimum runtime contract:

- Preserve the approved shot order
- Use only approved latest assets
- Duck BGM under dialogue, reactions, and important SFX
- Do not add subtitles or text unless explicitly requested
- Final video must contain no storyboard traces, labels, arrows, timing marks, or panel borders

Then run the final review checks (v1.1: with speaker-identity and mouth-state hard gates) and deliver the final approved asset.

## Boundaries

Do not use this Skill for a single image, a simple edit, a single clip, logo design, or pure prompt consultation. If the user only wants a prompt, use a video prompt workflow instead. If the user only wants a character card, use a character breakdown workflow instead.

**Audio mode routing**: this Skill only supports `silent` and `dialogue-led`. Narration-driven short dramas and first-person voiceover projects are outside this Skill boundary.
