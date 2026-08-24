---
name: line-doodle-explainer-generator
description: |
  Turn science, humanities, history, or social-science material into a line-doodle explainer video. Clarify the request, plan the lesson, write narration, design diagrams and storyboards, batch media production, assemble, and review with approval cards at major gates. Keep simplified line characters, dark-gray outlines, low-saturation flat color, geometric backgrounds, symbolic props, and limited animation. Use for knowledge explainers, not classroom exercises or colorful rounded cartoons.
trigger-words: [line doodle explainer, stick figure education video, minimalist line animation, infographic teaching video, science explainer video, knowledge explainer video, production plan, 简约线条小人动画, 线条小人科普, 图解教学视频, 信息图科普动画, 板书感科普, 科普视频, 制作方案]
allowed-tools: [question, hub_generate_image, hub_generate_video, hub_generate_music, hub_synthesize_speech, hub_video_edit, hub_analyse_media, hub_canvas_get_node, hub_save_file_to_session]
---

# Education Explainer — Minimalist Line-Doodle Video

Use this Skill when the user wants to turn a knowledge point, textbook excerpt, lesson material, or educational topic into a **finished educational explainer video** with a fixed **minimalist line-doodle stick-figure + infographic** visual style.

The default assumption is: **the user's final goal is to obtain a complete explainer video**. The first deliverable should be a **production-plan text file** that can guide later media generation, but the first two sections — Request Understanding and Video Generation Plan — may also be shown directly in chat for quick alignment. Unless the user explicitly asks for the planning file in another language, the planning text should follow the conversation language. The final video language is a separate production setting and must follow the user's explicit request. A plan is a pre-production milestone, not the final destination, unless the user explicitly asks for planning only.

This Skill should feel like a moving teaching diagram: line characters, arrows, timelines, maps, split-screen comparisons, labeled icons, and cause-effect structures that help viewers understand the idea. It must not sound like a classroom worksheet, and it must not add interactive quiz questions unless the user explicitly requests teaching exercises.

## STEP 0: Decide Whether to Ask or Proceed

This Skill is intentionally **step-confirmation driven**. Do not silently run through the entire pipeline once the first plan is written. After every major step, actively ask the user to confirm, revise, or continue through a **card-style popup choice**.

Use sensible defaults to draft each step first, but pause at the end of that step with card options. Ask only before drafting a step when a missing decision would change the whole result, for example:

- The source text is long and no section or focus is selected.
- The audience level changes the explanation radically, such as children vs. experts.
- The user asks for final production but does not provide a required source file or reference that they explicitly mention.
- The user requests a specific duration, platform, voice, or language but the information is contradictory.

### Mandatory card-popup interaction rule

Whenever the runtime supports an interactive choice tool, use it for step confirmations instead of a plain-text open question. The card popup must:

1. Put the recommended option first and mark it as recommended.
2. Offer 3-5 adjacent actions only.
3. Include a revise option for the current step.
4. Include a continue option for the next step.
5. Include a custom direction option when supported by the interface.

Do not replace the popup with a classroom-style question. Do not ask “What did you learn?” or quiz the viewer unless the user explicitly requested teaching exercises.

### Step-gate rule

At the end of **each** major step — Request Understanding, Video Generation Plan, Video Core, Explanation Structure, Narration Script, Diagram System, Storyboard, Main Visual Direction, Asset Plan, Media Generation, Assembly, and Review — stop and present a card popup. Continue only after the user chooses a card option or gives an equivalent instruction.

If the user explicitly says “you decide,” “continue automatically,” “no need to ask every time,” or similar, then keep using reasonable defaults and reduce confirmations to high-cost gates only: main visual approval, storyboard approval, video generation, narration/audio generation, and final assembly.

## STEP 1: Request Understanding

Start every production-plan text file with **Request Understanding**. This section should translate the user's short request into a clear creative brief foundation.

Include these four fields:

1. **Topic**
   - Name the exact knowledge topic, person, event, concept, process, or question.
   - If the topic is broad, choose a focused angle that fits the default duration.

2. **Type**
   - Classify the explainer type, such as biography explainer, historical context explainer, science mechanism explainer, concept explainer, literature / culture explainer, process explainer, or comparison explainer.
   - The type should guide structure, diagrams, and pacing.

3. **Output Form**
   - Default: 60-second horizontal 16:9 explainer video production plan.
   - Mention whether the current deliverable is a production-plan text file, storyboard keyframes, narration audio, video clips, or final assembled video.
   - If the user says “make a video” but gives no production confirmation, first create the production-plan text file and then offer card-style next steps for media generation.

4. **Audience**
   - Default: general learners / adult beginners.
   - Adjust language depth when the user specifies children, students, experts, workplace viewers, or short-video audiences.

Keep this section direct and creator-facing. Do not use classroom phrases like “students will be able to”. Prefer “The viewer will quickly understand…”.

### End-of-step card popup

After drafting Request Understanding, present a card popup before continuing:

1. Continue with this understanding and write the Video Generation Plan. (Recommended)
2. Revise the topic / angle.
3. Revise the audience level.
4. Change the output form, duration, or platform.
5. Custom direction.

## STEP 2: Video Generation Plan

After Request Understanding, write **Video Generation Plan**. This section sets the creative direction for the explainer before script and storyboard work.

Include these five fields:

1. **Video Title**
   - Short, clear, searchable, and suitable for a cover frame.
   - Avoid academic titles; write like a video title.

2. **Video Summary**
   - 1-2 sentences explaining what the video will show and why viewers should care.
   - This is not a lesson objective; it is a creator-facing content promise.

3. **Style Tone**
   - Describe the emotional and visual tone: clear, witty, calm, historical, suspenseful, warm, sharp, playful, serious, etc.
   - Keep it compatible with minimalist line-doodle + infographic visuals.

4. **Color Plan**
   - Keep line art dominant.
   - Choose a simple color system: black / dark gray linework, clean light background, and 1-2 accent colors tied to meaning.
   - Explain what each accent color is used for, such as danger, history, focus, contrast, or emotional emphasis.

5. **Pacing Level**
   - Choose one: slow, steady, medium-fast, fast.
   - For most 60-second short explainers, default to **medium-fast**: quick hook, clean middle, calm closing.
   - Explain how the pacing affects shot count, label density, and transitions.

### End-of-step card popup

After drafting the Video Generation Plan, present a card popup before continuing:

1. Continue and extract the Video Core. (Recommended)
2. Revise the title / summary.
3. Revise the style tone or color plan.
4. Revise pacing, duration, or label density.
5. Custom direction.

## STEP 3: Extract the Video Core

Build one teachable through-line. Do not cover everything.

Extract:

1. **Core idea**: what the video is really about.
2. **Viewer promise**: what the viewer will understand by the end.
3. **3-5 key points**: only the points needed to fulfill the promise.
4. **Confusion point**: what viewers usually misunderstand or find abstract.
5. **Hook**: an everyday comparison, question, tension, surprising fact, or visual metaphor.
6. **Takeaway**: one final sentence that makes the concept memorable.

For source material, compress the source into a video argument:

- Keep the central explanation.
- Remove side notes, footnotes, and overly technical detours unless essential.
- If facts are uncertain, mark them as fact-check notes instead of asserting them.

### End-of-step card popup

After drafting the Video Core, present a card popup before continuing:

1. Continue and choose the Explanation Structure. (Recommended)
2. Revise the core idea or viewer promise.
3. Add / remove key points.
4. Revise the hook or takeaway.
5. Custom direction.

## STEP 4: Choose the Explanation Structure

Choose one primary structure. Do not mix several structures unless the topic requires it.

Available structures:

1. **Question-first**: open with a question, then answer it step by step.
2. **Everyday analogy**: map an abstract idea onto a familiar object or scene.
3. **Timeline**: explain change over time, historical context, or stages.
4. **Cause-effect chain**: show how one factor leads to another.
5. **Problem-solution**: start from a pain point or puzzle, then reveal the mechanism.
6. **Misconception correction**: show the common belief, then revise it.
7. **Part-to-whole**: introduce components first, then connect them into a system.
8. **Compare-and-contrast**: explain by splitting two cases, sides, eras, or ideas.

Prefer structures that can be shown through visual logic: timelines, arrows, maps, before/after panels, simple character situations, concept maps, flow diagrams, and icon transformations.

### End-of-step card popup

After choosing the Explanation Structure, present a card popup before continuing:

1. Continue and write the Narration Script. (Recommended)
2. Choose a different structure.
3. Combine structure with a secondary visual logic.
4. Simplify the explanation path.
5. Custom direction.

## STEP 5: Write the Narration Script

The narration should be written for spoken video, not for an essay.

Script rules:

- Use short sentences.
- Define necessary terms before using them heavily.
- Build a clear beginning, middle, and ending.
- Use concrete examples before abstract labels when possible.
- Avoid textbook-style phrasing such as “students should understand”.
- Avoid teacherly prompts such as “now think about this question” unless the user asks for classroom interaction.
- End with a memorable takeaway.

For a 60-second video, aim for roughly:

1. **0-6s Hook**: why this topic matters.
2. **6-15s Context**: where / when / what we are talking about.
3. **15-35s Core mechanism**: the main explanation in 2-3 linked ideas.
4. **35-50s Significance**: why the idea matters beyond the example.
5. **50-60s Takeaway**: one clear closing sentence.

### End-of-step card popup

After writing the Narration Script, present a card popup before continuing:

1. Continue and design the Diagram System. (Recommended)
2. Make the script shorter / longer.
3. Change the tone or audience level.
4. Revise the hook, examples, or closing takeaway.
5. Custom direction.

## STEP 6: Design the Diagram System

Before making storyboard shots, design the reusable visual vocabulary.

Include:

1. **Main diagram type**: timeline, cause-effect chain, map, flow chart, split-screen, concept map, scale comparison, or transformation diagram.
2. **Core icons**: 5-8 simple icons that repeat across the video.
3. **Line characters**: their role as learners, historical figures, observers, or scale markers.
4. **On-screen labels**: short keywords only; no dense paragraphs.
5. **Accent color logic**: one or two accent colors for emphasis, while line art remains dominant.
6. **Transition logic**: how one idea visually becomes the next.

The diagram system should make the video feel coherent even when there are multiple shots.

### End-of-step card popup

After designing the Diagram System, present a card popup before continuing:

1. Continue and build the Storyboard. (Recommended)
2. Revise the main diagram type.
3. Revise icons, labels, or line-character roles.
4. Revise accent colors or transition logic.
5. Custom direction.

## STEP 7: Build the Storyboard

Plan the storyboard shot count dynamically from **video duration + content rhythm**, not as a fixed number. As a guideline: 20-30 seconds usually needs 2-4 shots; around 60 seconds usually needs 5-8 shots; longer explainers need more shots according to topic sections and visual beats. Explain the chosen shot count briefly in the production plan, such as: “7 shots are used because the 60-second script has seven visual beats: hook, context, theatre, human themes, works, influence, closing.”

Each storyboard row should include:

- **Time range**
- **Narration segment**
- **Purpose of the shot**
- **Visual action**
- **On-screen labels**
- **Diagram / animation instruction**
- **Style note**
- **Generation note**: what a media generation agent needs to preserve

Storyboard discipline:

- Each shot communicates one micro-idea.
- The first shot must hook; the last shot must resolve.
- Do not make visuals chase every word of narration.
- Use line characters sparingly to clarify scale, contrast, or human stakes.
- Keep labels readable and sparse.

### End-of-step card popup

After building the Storyboard, present a card popup before continuing:

1. Continue and plan assets / production route. (Recommended)
2. Revise shot count or timing.
3. Revise specific storyboard rows.
4. Generate storyboard keyframes next instead of asset planning.
5. Custom direction.

## STEP 8: Plan Assets and Production Route

If the user wants an actual video, convert the storyboard into a production plan.

### Asset list

List the needed assets:

- production-plan text file,
- 1-3 main visual direction images,
- key visual / cover frame,
- storyboard keyframes,
- video clips,
- narration audio,
- optional BGM,
- optional sound effects,
- optional subtitles if explicitly requested,
- final assembled video.

### Production route

Choose a practical route based on the user's request:

1. **Plan-first route**: create the production-plan text file, then offer a next-step card whose recommended action is to generate 1-3 main visual direction images.
2. **Main-visual route**: generate 1-3 main visual images to establish the overall visual direction, cover-frame feeling, line weight, icon vocabulary, color accents, and composition style.
3. **Keyframe route**: after the main visual direction is accepted, generate storyboard keyframes based on the chosen main visual; alternatively, generate storyboard frames directly from the script if the user chooses to skip main visuals.
4. **Narration-first route**: generate voiceover, then time shots to the narration.
5. **Clip-first route**: generate short line-doodle clips shot by shot, then assemble.
6. **Full-production route**: produce narration, clips, optional BGM, and final assembly.

### Audio ownership

Avoid duplicate sound:

- If video generation uses native audio for narration, do not also generate the same narration through TTS.
- If narration is generated separately, video clips should not contain competing narration.
- BGM should be generated once per project, not per shot.
- For keyframe-to-video clip batches, do not generate BGM during individual clip generation by default. Wait until the full clip batch is complete, then ask the user whether BGM is needed before final assembly.
- Subtitles are added only when the user explicitly requests subtitles.

### End-of-step card popup

After planning assets and production route, present a card popup before continuing:

1. Create / update the production-plan text file. (Recommended)
2. Revise asset list or production route.
3. Generate 1-3 main visual direction images first.
4. Generate narration audio first.
5. Custom direction.

## STEP 9: Write the Production-Plan Text File

The default planning deliverable is a single text file placed on the canvas. It should be complete enough for immediate production. The document is not optional at this stage: after Request Understanding and Video Generation Plan are shown in chat, the remaining production details must be organized into the canvas text document. The final chat reply should explicitly mention that the document has been created or updated, then end with a card-style Next Step Card.

Use this structure:

1. **Request Understanding**
   - Topic
   - Type
   - Output Form
   - Audience

2. **Video Generation Plan**
   - Video Title
   - Video Summary
   - Style Tone
   - Color Plan
   - Pacing Level

3. **Video Core**
   - Core idea
   - Viewer promise
   - Key points
   - Confusion point
   - Hook
   - Takeaway

4. **Narration Script**

5. **Diagram System**

6. **Storyboard**

7. **Main Visual Direction Plan**
   - 1-3 main visual image concepts
   - preferred composition direction
   - what should be preserved when generating keyframes

8. **Asset and Production Plan**

9. **Fact-check Notes** when needed

Do not include interactive questions by default. Do not put the Next Step Card inside the production-plan text file. Next-step choices belong in the chat reply only, after the document has been created or updated.

After the production-plan text file, the default recommended next step in chat should be: generate 1-3 main visual direction images. Only after the user chooses or approves a main visual should the workflow move to storyboard keyframes or shot-by-shot video generation. Do not jump directly from the production plan to storyboard keyframes unless the user explicitly asks to skip the main visual step.

### End-of-step card popup

After creating or updating the production-plan text file, present a card popup before any media generation:

1. Generate 1-3 main visual direction images. (Recommended)
2. Revise the production plan document.
3. Generate narration audio first.
4. Skip main visuals and generate storyboard keyframes.
5. Custom direction.

## STEP 10: Fixed Visual Style — Minimalist Line-Doodle Stick Figures

Always use this style unless the user explicitly asks to switch.

Visual identity is now fixed to the reference-like **minimal line-character explainer animation** style:

- **Characters**: use simplified 4-head to 4.5-head line characters, not tiny stick sticks and not realistic 7-head bodies. Faces are extremely simple: dot or short-line eyes, one-line brows, and a small arc / simple shape for the mouth. Hands are rounded or simplified; do not draw detailed fingers.
- **Linework**: use medium-weight dark gray / softened black outlines with slight hand-drawn irregularity. Keep outline weight consistent across characters, props, icons, and backgrounds. Use slightly thinner interior detail lines only when necessary.
- **Color tone**: use low-saturation, high-lightness flat colors. Backgrounds may use soft muted gray-green, gray-blue, pale wheat, parchment, or warm off-white. Characters and props may use restrained red, blue, yellow, brown, and green accents. Avoid pure high-saturation primary colors.
- **Shading**: use flat fills and hard-edge darker color patches for simple volume. Avoid realistic gradients, glossy highlights, metallic reflections, and luminous glow effects.
- **Backgrounds**: avoid empty pure white unless the shot is a diagram. Backgrounds should be simple, flat, geometric, and lightly filled: hills as soft waves, fields as simple angled strokes, clouds as flat rounded shapes, interiors as simplified rectangles and props.
- **Icons and props**: make every object symbolic, readable, and outlined in the same dark line style as characters. Props should be simplified to their most recognizable shape.
- **Composition**: prefer clear 2D front or side views, simple center compositions, balanced comparison layouts, maps, timelines, and diagram boards. Use split-screen only when the explanation truly needs comparison; do not add dividers by default.
- **Motion feel**: use gentle hand-drawn / limited-animation timing, like 12–15 fps. Lines grow on, icons pop or slide in with a small elastic settle, characters use 3–4 frame loop-like actions, and camera moves are subtle. Motion must reveal story logic, not decorate randomly.
- The result should feel like a charming educational line-character animation with infographic clarity: simple, warm, readable, and story-aware.

Avoid:

- Pure black-and-white empty doodles with no flat color support.
- 2-head chibi characters, realistic 7-head anatomy, painterly faces, or detailed hands.
- Colorful rounded 2D cartoon scenes that look like a children’s TV cartoon.
- Heavy character acting, lip-sync, presenter scenes, or dramatic facial performance.
- Dense slide text or classroom worksheet segments unless explicitly requested.
- Realistic 3D, glossy corporate templates, cinematic realism, complex perspective, metal reflections, soft feathered shadows, or glow / shine / sparkle effects.
- Overcrowded diagrams: keep labels short, icons spaced, and layouts easy to read.

Split-screen layout rule:

- Default project ratio is horizontal 16:9 unless the user explicitly asks for vertical / short-video portrait format.
- Use split-screen only when comparison is the actual teaching logic. For horizontal videos, use left/right split-screen only when necessary; for vertical videos, use top/bottom split-screen only when necessary.
- Do not create decorative central divider lines or page-spine lines. Every divider must communicate a real comparison.
- Keep each panel large enough for line characters, icons, arrows, and labels to stay readable.

## STEP 11: Generate and Assemble Media

When producing media:

1. Keep all clips in the same aspect ratio.
2. Keep line weight, icon style, label style, and motion rhythm consistent.
3. Generate keyframes first when consistency matters.
4. Generate video clips according to storyboard shots.
5. Default video clip generation to **MiniMax H3** for this Skill, unless the user explicitly specifies another video model or the current runtime capability check says MiniMax H3 is unavailable / incompatible.
6. Generate narration once if narration is needed.
7. Do not generate BGM during individual keyframe-to-video clip generations by default; wait until all clips are finished, then ask the user whether BGM is needed before generating it once.
8. Assemble the final video with clean pacing and no duplicate audio.
9. After the final video is assembled, generate matching subtitles by default from the complete narration / final audio timing, unless the user explicitly asks for a no-subtitle export.
10. Check that the final asset is a usable video, not just a plan.

When generating clips, describe the diagrams and teaching structure clearly: arrows, transformations, timelines, maps, split-screen comparisons, icon changes, and line-character roles.

### Keyframe-to-motion explanation step

After generating storyboard keyframes and before asking the user to generate video clips, provide a brief **motion plan for every keyframe**. This is a required intermediate explanation step, not optional.

For each keyframe, summarize in 1-3 concise bullets:

- **Animation effect**: what line, icon, label, arrow, map route, or character element should move or reveal.
- **Camera / framing**: whether the shot should stay static, slowly push in, pan along a route, slide between panels, or zoom out to reveal the diagram.
- **Transition out**: how this keyframe should connect to the next one, such as route-line continuation, icon morph, panel wipe, scroll unfold, map zoom, or label dissolve.

Keep this explanation simple and creator-facing. It should help the user understand how still keyframes will become moving line-doodle clips, without writing a technical animation spec or dense production table. After this motion plan, present the card popup that asks whether to approve the motion plan, revise specific shots, or generate video clips.


### Subtitle generation after assembly

After a final video has been assembled, create corresponding subtitles by default. Follow the synchronization logic used in the Vox-style workflow: subtitles should be derived from the complete narration or final mixed audio timing, not from estimated storyboard timings.

Subtitle rules:

1. Treat the final narration / final mixed audio as the master clock. If a continuous narration file exists, use it directly; otherwise transcribe the final assembled video audio.
2. Generate timed subtitle text from the full audio track, then format it for the final aspect ratio.
3. Keep subtitles viewer-friendly for educational explainers: bottom-centered, readable, high-contrast, max 2 lines, split at natural phrase or clause boundaries.
4. Do not create one subtitle file per shot unless the user explicitly asks for editable per-shot subtitle stems. The default subtitle file should cover the full final video.
5. If the video language is Chinese, keep subtitles in Chinese unless the user requests bilingual or translated subtitles. If the video language is English or another language, match that language by default.
6. For final delivery, prefer a subtitle-burned video plus, when practical, a separate subtitle file for later editing.
7. If subtitle timing drifts, fix subtitle timing or conform video cuts to the narration timing. Do not time-stretch the narration as the first resort.

Before final delivery, quickly check that the subtitles are synchronized with the spoken narration, do not cover important diagram labels, and remain readable on the target platform.

### End-of-step card popup

After each media-generation batch, present a card popup before moving to the next batch or final assembly:

1. Approve these assets and continue to the next production step. (Recommended)
2. Regenerate selected assets with revisions.
3. Add / revise the keyframe motion plan before video generation.
4. Change style consistency rules before continuing.
5. Custom direction.

Before final assembly, present a card popup:

1. Assemble the final video with the approved assets. (Recommended)
2. Revise clips / narration / BGM first.
3. Add subtitles if explicitly wanted.
4. Export only the current assets without assembly.
5. Custom direction.

## STEP 12: Quality Review

Before presenting the result, check:

- The request understanding matches the user's topic, type, output form, and audience.
- The video generation plan has a clear title, summary, style tone, color plan, and pacing level.
- The script is accurate, concise, and speakable.
- Each shot teaches a new micro-idea.
- The style remains line-doodle + infographic, not rounded cartoon or generic MG.
- Line labels and keywords are short and readable.
- Motion reveals the logic of the idea.
- Audio ownership is clean: no duplicate narration or conflicting music.
- When a final video is assembled, matching subtitles have been generated by default unless the user explicitly requested no subtitles.
- Subtitle timing follows the final narration / final audio, does not drift, and does not cover key diagram labels.
- The output includes a production-plan text file when planning is the current step.
- BGM is not generated during clip-by-clip keyframe conversion unless the user has already confirmed that they want it.
- The final answer points the user toward production, not classroom exercises.

If facts are uncertain, mark them as fact-check notes.

## Interaction and Output References

- Read [references/interaction-cards.md](references/interaction-cards.md) at each step boundary for the complete next-step card rules.
- Read [references/output-format.md](references/output-format.md) before returning planning or media-production deliverables.
