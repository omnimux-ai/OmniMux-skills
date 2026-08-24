---
name: vox-style-video-generator
description: |
  Turn a topic, article, or report into a Vox-style explainer through an approval-first workflow. Confirm requirements, write a production document with the plan, script, storyboard, shot details, and voiceover transcript, then approve the main visual and keyframes before animation. Finish with consistent narration, optional subtitles, background music, assembly, and review. Use for science explainers, documentary shorts, and educational video essays, not fictional long-form stories.
trigger-words: [解释视频, Vox风格视频, 科普视频, 纪录短片, 教育视频论文, 自动化视频论文, one prompt to video, explainer video, Vox-style video, keyframe-to-animation]
---

# Vox-Style Explainer Video Pipeline

Produce a complete Vox-style explainer video from a single topic, article, or report. The optimized workflow is a **short confirmation-first pipeline**: confirm the user's needs, write a detailed production plan document, wait for approval, generate a main visual plus keyframes, wait for style approval, then generate animation and match the final voiceover and BGM.

Core rule: do not jump directly into costly image/video/audio generation after the initial request. The first deliverable after confirming requirements is always a user-reviewable production document.

```
User need → Production plan document → User approval → Main visual + keyframes → Style approval → Animation → Voiceover + BGM → Assembly + QC
```

## STEP 1: Confirm User Requirements

Before planning or generation, confirm any delivery information that materially changes the output:

- Topic or source material: topic, article, report, transcript, or reference file.
- Target language for in-video speech and visible text.
- Duration: required for time-based media. Typical options: 45–60 seconds, 90 seconds, 3 minutes.
- Aspect ratio and platform: 16:9 horizontal, 9:16 vertical, or 1:1 square.
- Audience and depth: general public, students, professional viewers, children, etc.
- Required subtitles: subtitles are opt-in; do not add them unless requested or approved.
- Visual preference: Vox-style editorial collage by default, optimized toward the reference-style 2.5D mixed-media collage motion language unless the user asks for another style.
- Voice preference and music mood if the user has a strong preference.

If the user has not specified duration or aspect ratio, ask a concise blocking question before creating the plan. If the user has already provided enough information, proceed directly to the production document.

## STEP 2: Create the Production Plan Document

After requirements are confirmed, create a single detailed document and place it on the canvas. This document is the review gate before any costly media generation.

The document must include:

1. **Production brief**
   - Working title
   - Topic angle and core question
   - Target audience
   - Duration, aspect ratio, language, subtitle choice
   - Visual style direction, accent color, and reference-style motion language
   - Audio direction: voiceover tone and BGM mood

2. **Narrative structure**
   - Cold-open hook
   - Context turn
   - Explanation beats
   - Complication or tension
   - Final reframe

3. **Full script / voiceover transcript**
   - Write the complete narration in the requested in-video language.
   - Use present tense for historical narrative when suitable.
   - Prefer concrete facts, short declarative sentences, and one idea per beat.
   - Avoid throat-clearing such as "In this video we will...".
   - Keep total word count aligned with the target duration.

4. **Storyboard and shot plan**
   - One beat per row or section.
   - For every beat include: beat id, estimated duration, narration excerpt, visual description, on-screen text if any, motion idea, and transition note.
   - Keep on-screen kinetic text short and purposeful, ideally under five words; use a moderate amount of text that orients the viewer without replacing the narration.

5. **Keyframe plan**
   - Main visual / style anchor description.
   - Reference-style design rules: 2.5D layered collage, paper edges, framed labels, geometric editorial accents, and subtle stop-motion motion language.
   - Keyframe list with visual composition, subject, background, and typography requirements.
   - Consistency rules for palette, collage texture, borders, typography, and framing.

6. **Animation plan**
   - Subtle motion only: 2D push-in/pull-out, paper-layer parallax, route lines drawing, icons sliding, halftone shimmer, clouds/smoke/water drifting.
   - Explicitly avoid 3D rotation, camera shake, face morphing, text warping, style drift, and overactive footage-like motion.

7. **Audio and assembly plan**
   - Generate one continuous voiceover track after animation approval, not separate beat-level master narration.
   - Generate one instrumental BGM bed after the visual rhythm is known.
   - Match final edit to real VO timing; do not time-stretch narration as the first fix.
   - If subtitles are approved, derive them from the final VO timing and burn them in during assembly.

End the document with a clear confirmation request: ask the user to approve the production plan or request changes. Do not generate the main visual, keyframes, animation, voiceover, or music until the user approves this document.

## STEP 3: Plan Approval Gate

Wait for explicit user approval of the production plan. Treat ordinary chat approval and canvas/board approval the same.

If the user requests changes:

- Patch the production document first.
- Keep all downstream assets pending.
- Ask for confirmation again only when the changes affect script, storyboard, visual direction, duration, aspect ratio, language, or audio plan.

Proceed only after the plan is approved.

## STEP 4: Generate Main Visual and Keyframes

After plan approval, generate the **main visual / style anchor** first, then the remaining keyframes.

Main visual requirements:

- It should represent the film's hook and define the whole visual system.
- Use Vox-style mixed-media editorial collage unless the approved plan says otherwise.
- Lock a limited palette, paper texture, white sticker borders, halftone accents, editorial typography, generous margins, and one accent color.
- Make the Vox collage craft explicit: important subjects and props should appear as individual contour-cut paper pieces with torn-paper rims, irregular hand-cut edges, sticker borders, paper fibers, tape, folded corners, and layered shadows; avoid props that look merely printed on flat rectangular sheets.
- Use the approved aspect ratio.

Reference-inspired visual rules to prefer by default:

- Build frames as **2.5D layered mixed-media collages**: foreground hero subject, midground landmarks / props / supporting characters, and abstract paper-texture background.
- Combine historical or archival-looking cutouts with modern editorial geometry, stamps, torn-paper scraps, map fragments, diagrams, dots, arrows, and label cards.
- Give important subjects clear paper edges, sticker borders, torn-paper rims, contour-cut silhouettes, or folded-card carriers so the frame feels handmade rather than like footage.
- Preserve readable subject detail inside the collage style: avoid turning people into featureless black silhouettes unless the plan explicitly calls for silhouettes.
- Present key terms in **framed labels** such as placards, scroll cards, sticker tags, map pins, or title panels. Avoid floating text without a carrier.
- Keep visual hierarchy educational: when narration introduces a concept, the matching visual element should pop, scale, slide, highlight, or receive an arrow/label.

Keyframe requirements:

- Generate one keyframe per storyboard beat unless the approved plan defines another topology.
- Preserve the approved style anchor across all frames.
- Keep typography short, stable, and moderate in quantity: enough labels for orientation, but no dense explanatory paragraphs. Put explanation-heavy content in narration rather than in the frame.
- Batch-generate keyframes when possible, but preserve beat order.

After the main visual and keyframes are generated, group them on the canvas and ask the user to confirm the visual style before video generation. Do not animate yet.

## STEP 5: Visual Style Approval Gate

Wait for explicit approval of the main visual and keyframes.

If the user dislikes the style:

- Regenerate the main visual / style anchor first.
- Then regenerate affected keyframes to match the new anchor.
- Do not proceed to animation until the user confirms the style and keyframes.

If the user only requests one frame change, regenerate only that frame while preserving the approved anchor style.

## STEP 6: Generate Silent Animation

After visual approval, animate the approved keyframes into silent clips.

Default video model policy:

- For Vox-style keyframe-to-animation clips, default to **MiniMax-H3** for video generation unless the user explicitly selects another vendor/model, MiniMax-H3 is unavailable, or a hard capability requirement excludes it.
- Keep animation clips silent by default at this stage; voiceover and BGM are added later during final assembly.

Animation guidance:

- Keep motion graphic and editorial, not cinematic footage: richer than a static image, but not chaotic.
- Good motion: visible background paper-layer parallax, drifting fog or paper strips when relevant, route line drawing, evidence cards or icons sliding into place and settling, halftone shimmer, and one to three controlled living details per frame.
- For paper-collage keyframe animation, prefer a **natural assembly logic**: the background substrate appears first, then paper scraps, maps, newspapers, evidence cards, props, pins, red strings, and finally framed labels slide or are placed into the scene as if a handmade evidence board is being built. Ask how each visible element arrives, gets pinned, connected, and settles into the final keyframe.
- Use **staggered layered reveals** rather than arbitrary activity: background appears first, then decorative geometry, midground landmarks, main subject, and finally framed text labels. Elements may slide in, be lightly pressed down, get pinned, or settle; avoid sudden flipping, lamp-like flashing, magical pop-ins, exaggerated bounce, or unrelated motion that does not come from the visible collage elements.
- Keep character and prop cutouts physically coherent: hands, limbs, tools, and carried objects should move with the same paper body unless the storyboard explicitly asks for separate puppet parts; avoid detached hands, floating props, sudden vertical jumps, and unmotivated end-of-clip rises.
- Use **cutout puppetry** sparingly for people, animals, and vehicles: low-frame-rate rotation or position shifts, single-axis arm movement, tiny nods, mechanical camel/horse leg shifts, not full character animation.
- Add small ambient particles or editorial ornaments when useful: drifting paper flecks, rotating geometric pieces, small map pins, stamp marks, dots, or diagram arrows.
- Use reference-style transitions between scenes when assembling: paper wipe, torn-edge wipe, card slide, stamp-cover reveal, or parallax zoom into a detail that becomes the next scene.
- Every animation prompt should preserve the approved keyframe's flat paper-collage design and 2.5D layer structure.
- Forbid: camera shake, 3D rotation, morphing faces, text warping, style drift, uncontrolled zooms, realistic footage motion, and new unplanned subjects.

Generate all animation clips before moving to audio. Review for style drift or warped text; retry only failed or unacceptable clips.

## STEP 7: Match Voiceover and BGM

Only after the silent animation exists, generate final audio.

Voiceover:

- Generate one continuous narration track using the approved full transcript whenever possible.
- Use one consistent voice for the whole film. If segment-level narration must be regenerated, preserve the approved voice by using the prior accepted full narration or voice reference as the voice anchor; never mix unrelated timbres across segments.
- Vox register: measured, warm, clear, curious, and lightly documentary; avoid trailer-style delivery.
- Check real duration. If it is far from the target runtime, tighten or expand the transcript and regenerate the full VO once. Prefer rewriting over extreme video slowdowns or long frozen holds.

BGM:

- Generate one instrumental bed for the whole film.
- Keep it under narration: documentary, restrained, and subject-appropriate.
- Avoid vocals and sudden drops that fight the explanation.

Timing:

- Transcribe or align the final VO to obtain sentence or clause timing.
- Build a beat-to-clip timing map before final assembly: each animation segment must receive the matching narration sentence(s) and subtitle cue(s). Subtitles should appear only during the segment whose visual idea they explain.
- Use VO timing as the master clock, but also respect approved clip boundaries. If a segment's narration is too long for its animation, rewrite that segment's narration first; only then use mild speed changes, trimming, extension, or brief final-frame holds.
- Before delivery, check the last subtitle cue explicitly so the final sentence is visible before the video ends.

## STEP 8: Final Assembly and QC

Assemble the final video:

1. Concatenate conformed animation clips.
2. Add the continuous VO track.
3. Mix BGM under narration.
4. Add approved subtitles if requested.
5. Encode the final video in the approved aspect ratio.

QC checklist before delivery:

- VO and subtitles stay in sync.
- Each subtitle cue and narration sentence correspond to the correct animation segment; shot changes do not cut through important words or phrases.
- BGM does not overpower narration.
- No animation clip has obvious text warping, morphing, or style drift.
- Motion follows the approved reference-style grammar: natural paper-collage assembly, visible background parallax, paper wipes, framed labels, red-line/icon drawing, pinned/placed evidence-card motion, and restrained coherent cutout puppetry.
- The final video matches the approved production plan and keyframes.

Deliver the final video on canvas and reference the exact output filename in the final reply.

## References

- `references/vox-style-guide.md` — writing voice, visual grammar, keyframe prompt structure, motion style, subtitles.
- `references/ffmpeg-assembly.md` — assembly, subtitle burn-in, audio mixing, and encoding recipes.
