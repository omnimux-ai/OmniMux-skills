---
name: coordinate-camera-control-designer
description: |
  Coordinate camera control & visual storyboarding assistant. Converts video, image-to-video, action storyboards, parkour chases, fight impacts, camera follows, and push/pull/pan/tilt requests into executable `[L,T,W,H]` coordinate prompts, and plans scene motion-path overview images, 3x3 master storyboards, and video-generation prompts. Trigger words: coordinate camera, coordinate shot control, coordinate prompt, L T W H, bbox camera, Bounding Box prompt, shot-path coordinates, character from A to B, impact-point coordinates, coordinate video control, image-to-video camera control, high-speed fight prompt, 3x3 storyboard, motion-path map. Boundary: this Skill handles coordinate direction and planning-map / storyboard generation — it does not replace long-form scripts, subtitle production, or plain single-shot generation.
trigger-words: [coordinate camera, coordinate shot control, coordinate prompt, bbox camera, Bounding Box prompt, shot-path coordinates, impact-point coordinates, image-to-video camera control, high-speed fight prompt, 3x3 storyboard, motion-path map]
---

# Coordinate Camera Control & Visual Storyboarding

Converts camera motion, character displacement, action impact points, and picture composition into executable `[L,T,W,H]` coordinate prompts, using visual assets to help the user check spatial logic. Suits action sequences, parkour chases, fight impacts, image-to-video camera control, complex camera paths, 3x3 storyboards, and motion planning ahead of video generation.

The core of this Skill is not "write a pretty action description" — it is to decompose action intent into: subject box, camera focus box, target box, event box, speed curve, scene path, camera relationship, and final video prompt. When image or video generation is needed, delegate to Hub's image / video sub-agents; do not call external models directly or hard-code third-party tools inside the Skill.

## On-Demand Reference Docs

When executing this Skill, load references from `references/` as needed:

- When the user needs "coordinate prompts / `[L,T,W,H]` / bbox camera / high-speed fight / chase / sprint / impact point / subject box / target box / camera-follow coordinates", first read `references/tutorial-analysis.md`. This doc distills coordinate format, subject box, target box, event box, camera follow, and high-speed-action legibility principles.
- When the user needs "scene motion-path overview / 3x3 master storyboard / 3x3 grid storyboard / visual storyboard / per-cut sub-frames / clean scene reference / pre-video planning map", first read `references/visual-storyboard-spec.md`. This doc constrains the separation between path map, storyboard sheet, planning layer, and final video visual reference.
- If the user only wants short coordinate prompts and no visual maps, `references/tutorial-analysis.md` alone is enough.
- If the user requires a complete Skill run, or needs coordinate prompts + motion-path map + 3x3 storyboard + video prompts, read both reference docs.

## Scope

Use this Skill when the user needs to:

- Turn "character from A to B", "high-speed sprint", "flash attack", "impact and knockback", "parkour path", etc. into coordinate-controlled prompts.
- Prepare controllable camera-motion prompts for image-to-video or text-to-video.
- Produce a scene motion-path overview marking route, coordinates, event points, and camera path.
- Produce a single 3x3 master storyboard where 9 panels map to 9 cuts.
- Verify action space, camera follow, speed curve, and physical continuity.

Do NOT use this Skill when the user only wants:

- Plain single-shot video generation without coordinate control.
- Long-form scripts, short-drama structure, or ad strategy.
- Adding, editing, or making subtitle title cards for an existing video.

## Core Principles

1. **Coordinates first**: every key action needs a subject start point, target point, event point, and camera-focus region.
2. **Character vs. camera coordinates**: `subject_box` is NOT `camera_focus`. The camera may follow, lead, trail, orbit, look down, or pull back.
3. **Speed must be explainable**: don't just say "fast" — write a speed function like `ease-in`, `ease-out`, `burst-stop`, `impact-freeze`.
4. **Planning layer vs. final picture**: path maps, storyboards, arrows, coordinate boxes, speed curves, and cut numbers belong to the planning layer; the video generator only translates them into text coordinate parameters.
5. **Planning references never appear on screen**: the final video prompt must explicitly forbid visible arrows, route lines, coordinate boxes, speed curves, cut numbers, 3x3 grid borders, sketch aids, and annotation text.
6. **Default 16:9**: unless otherwise specified, path map, storyboard, clean scene reference, and video prompts are organized as landscape 16:9.
7. **Model chosen by Hub**: when image or video generation is needed, state in the task description "need a high-quality path-planning map / black-and-white line-art storyboard / clean scene reference / coordinate-controlled video". Hub picks a currently-available model. Only pass through a specific model when the user explicitly names one.
8. **Do not promise fixed 4K availability**: state high resolution as a quality target, but if the current model or platform doesn't support it, return Hub's max available quality and explain the limitation.

## Coordinate Format

Use a normalized picture bounding box for the subject or target region:

```text
[L=left offset, T=top offset, W=width, H=height]
```

- `L`: ratio of the box's left edge to picture width, 0-1.
- `T`: ratio of the box's top edge to picture height, 0-1.
- `W`: box width as a ratio of picture width.
- `H`: box height as a ratio of picture height.
- Coordinates are 2D picture regions — NOT 3D world coordinates.
- Within one shot, coordinates must serve clear action logic: start, direction, appearance point, impact point, outcome.

## STEP 1: Draft the Basic Action-Director Prompt

First, distill the user's raw request into a clear action-director prompt covering:

- Who the subject is; whether there's a reference image or character name.
- Where the scene is; the main spatial objects.
- Where the subject starts and which direction it moves.
- What action shifts happen in the middle.
- What the final outcome is.
- Action mood: burst, oppressive, light, heavy, chase, impact, flash, etc.

Precise coordinates are NOT required at this stage — the focus is action causality.

## STEP 2: Break Down Action, Space, and Camera

From the basic action prompt, extract:

1. **Subject references**: character A, character B, enemy, prop, uploaded reference, or canvas node.
2. **Scene space**: ground, wall, obstacles, sky, distant target, entry, exit.
3. **Subject start box**: `[L,T,W,H]` at the moment of departure.
4. **Motion target box**: the `[L,T,W,H]` the subject charges toward, looks at, attacks, or lands on.
5. **Key event boxes**: impact point, explosion point, smoke center, wall-jump point, landing point.
6. **Camera relationship**: fixed, follow, push-in, pull-back, pan-left, pan-right, top-down follow, orbit.
7. **Rhythm timing**: charge, vanish, appear, hit, pause, launch.
8. **Speed curve**: fast-in-slow-out, slow-in-fast-out, linear, slow-then-fast, fast-then-slow, burst variable, ramp slow-motion, freeze-before-impact.
9. **Legibility goal**: audience must see start, direction, appearance point, and attack outcome clearly.

## STEP 3: Build the Four-Layer Coordinate System

For complex actions, establish the four-layer coordinate system before writing the video prompt:

```text
subject_box: [start] -> [mid, optional] -> [end]
camera_focus: [start] -> [end]
camera_mode: follow / lead-follow / orbit / top-down-follow / low-angle-tilt-up / pull-back / push-in / dutch-shift
target_box / event_box: [...]
speed_curve: type + time distribution + speed change
```

### Speed-Function Vocabulary

- `linear`: uniform speed, uniform picture displacement.
- `ease-in`: slow start, sudden late acceleration.
- `ease-out`: fast start, decelerate to hold.
- `ease-in-out`: slow at ends, fastest in the middle.
- `burst-stop`: burst, then abrupt stop.
- `stop-burst`: abrupt stop, then burst.
- `peak-mid`: fastest in the middle, decays at both ends.
- `impact-freeze`: brief freeze before hit or evasion.

## STEP 4: Output the Coordinate Storyboard Table

Split complex action into cuts. Each cut must include at least:

| Field | Content |
|---|---|
| Cut ID | C1, C2, C3, ... |
| Shot type | Framing, camera position, camera relationship |
| Subject / event | Who moves and what happens |
| Coordinate control | Start, target, event points |
| Camera motion | Follow, push-in, pull-back, whip, orbit, etc. |
| Rhythm | Charge, burst, freeze, launch, etc. |
| Speed curve | fast-in-slow-out, slow-in-fast-out, linear, variable, ramp, skip-frame, etc. |
| Visual requirement | What this cut must show clearly in its master-storyboard panel |

If the user doesn't specify cut count, default to 9 cuts for a single 3x3 master storyboard. Shorter actions may drop to 3-6 cuts; only when the user explicitly asks for per-cut sub-frames should you split a 3x3 sub-storyboard for each cut.

## STEP 5: Generate the Scene Motion-Path Overview

When the user asks to "generate a map", "draw it out", "make a storyboard", or triggers a full Skill run, first generate a standalone scene motion-path overview.

**Task description highlights:**

```text
Task type: image generation
Purpose: action-scene and motion-path overview
Aspect ratio: 16:9
Quality target: high resolution, clear information
Content: full scene space, character start position, target position, impact point, motion arrows, camera-motion arrows, cut numbers, coordinate-box annotations, speed-curve annotations
Style: director's storyboard-preview / action-route planning map; layered color blocks and colored arrows are allowed for legibility; do NOT turn it into a final movie poster
Reference: if the user uploaded character, scene, or style references, pass them in as visual references
```

The path map is a planning layer — short labels, arrows, coordinate boxes, routes, speed curves, and cut numbers are allowed.

## STEP 6: Generate the Black-and-White Line-Art 3x3 Master Storyboard

Default: generate a **single 3x3 master storyboard**. The 9 panels map to the 9 cuts of the whole route — do NOT sub-split each cut into another 3x3. Only when the user explicitly requests "per-cut action sub-frames" should you also generate independent 3x3 sub-storyboards.

**Task description highlights:**

```text
Task type: image generation
Purpose: black-and-white line-art 3x3 master storyboard
Aspect ratio: 16:9
Layout: 3x3, top-left to bottom-right = C1-C9
Style: black-and-white line-art sketch, pencil storyboard, rough animation storyboard; no color, no complex shading
Content: each panel matches a route node in the path map — scene objects, framing, camera position, speed curve; top-left of each panel carries only a short cut number and a very short action label
Reference: must follow the prior path-planning logic, but do NOT use the path map itself as the final video visual reference
```

## STEP 7: Generate a Clean Scene Reference If Needed

If downstream generation of video is planned and scene style / object layout must stay consistent, generate a "clean scene reference":

- Same scene, same art style, same main object layout.
- No arrows, routes, coordinates, speed lines, numbers, speed charts, storyboard cells, or annotation text.
- This can serve as the video's visual reference; path map and storyboard sheet should NOT be passed as the video's visual reference.

## STEP 8: Emit Coordinate-Control Video Prompts

Every cut's video prompt must contain the coordinate-control layer — never degrade into a plain action description.

Template:

```text
Shot type: <framing + camera position>
Subject: <character / object / reference-image note>
subject_box: start [L=...,T=...,W=...,H=...] -> mid [L=...,T=...,W=...,H=...] -> end [L=...,T=...,W=...,H=...]
camera_focus: [L=...,T=...,W=...,H=...] -> [L=...,T=...,W=...,H=...]
camera_mode: <follow / lead-follow / orbit / top-down-follow / low-angle-tilt-up / pull-back / push-in / dutch-shift>
target_box: [L=...,T=...,W=...,H=...]
event_box: [L=...,T=...,W=...,H=...]
Spatial constraint: how the ground / wall / sky / obstacle regions are distributed
Rhythm: <charge X s -> burst X s -> appear/hit X s -> pause X s>
speed_curve: <type + time distribution + speed change>
Legibility: emphasize that start, direction, appearance point, and outcome remain clearly visible; avoid whole-frame blur
Hidden-reference rule: the path map and storyboard are used only to understand route, framing, camera position, scene objects, and rhythm — the final picture must NOT contain visible arrows, route lines, coordinate boxes, speed curves, cut numbers, 3x3 borders, sketch aids, storyboard paper, or annotation text
Final picture: only real scene objects, character action, natural motion blur, wind slice, smoke/dust, or a sense of speed
```

Mandatory check: if the video prompt lacks `[L=...,T=...,W=...,H=...]`, it is NOT a coordinate-camera prompt and cannot be submitted for generation.

## Coordinate Estimation Rules

Without a precise selection tool, estimate with a 3x3 grid:

- Top-left: `[L=0.05,T=0.05,W=0.20,H=0.25]`
- Top-center: `[L=0.40,T=0.05,W=0.20,H=0.25]`
- Top-right: `[L=0.75,T=0.05,W=0.20,H=0.25]`
- Mid-left: `[L=0.05,T=0.35,W=0.20,H=0.30]`
- Center: `[L=0.40,T=0.35,W=0.20,H=0.30]`
- Mid-right: `[L=0.75,T=0.35,W=0.20,H=0.30]`
- Bottom-left: `[L=0.05,T=0.70,W=0.20,H=0.25]`
- Bottom-center: `[L=0.40,T=0.70,W=0.20,H=0.25]`
- Bottom-right: `[L=0.75,T=0.70,W=0.20,H=0.25]`

Close-up subjects usually have larger `W/H`; distant subjects usually have smaller `W/H`. Target points can use small boxes; subjects can use larger boxes.

## Common Sentences

### High-speed sprint

```text
Character charges from [L=0.72,T=0.58,W=0.12,H=0.30], body lowered; brief pause, then instant acceleration toward [L=0.12,T=0.28,W=0.08,H=0.22]. Side-wide angle, camera follows at high speed; path carries smoke/dust and natural motion blur but keeps a clear start, direction, and end. speed_curve: ease-in -> burst-stop.
```

### Flash attack

```text
Character A pauses briefly at [L=0.18,T=0.40,W=0.10,H=0.28] then vanishes; next instant appears on the enemy's side at [L=0.66,T=0.32,W=0.12,H=0.34], with the strike-impact point at [L=0.58,T=0.38,W=0.08,H=0.16]. The camera first pulls back slightly, then instantly whip-pans left along the hit direction, with a brief freeze before impact. speed_curve: impact-freeze -> burst-stop.
```

### Subjective chase

```text
Low-angle subjective follow shot. The ground region stays at [L=0,T=0.55,W=1,H=0.45]; the distant target sits at [L=0.46,T=0.20,W=0.08,H=0.16]. Camera fast-pushes along the center line; road gravel, dust, and speed streaks fly past the sides, emphasizing closure with the target. speed_curve: linear -> ease-in.
```

### Impact and knockback

```text
Character A charges from [L=0.20,T=0.36,W=0.08,H=0.22] toward character B's chest at [L=0.62,T=0.30,W=0.10,H=0.24]; the impact locks at [L=0.66,T=0.38,W=0.07,H=0.12]. Brief freeze at the moment of collision; then character B is knocked toward the upper-right to [L=0.86,T=0.08,W=0.08,H=0.16], while the camera instantly pulls back to a wide shot. speed_curve: ease-in -> impact-freeze -> ease-out.
```

## Quality Check

Silent checks before delivery:

1. At least one subject box and one target box.
2. All coordinate values are in 0-1.
3. `W/H` matches framing: bigger for close-ups, smaller for wide shots.
4. Start, direction, appearance point, and attack outcome are clear.
5. Camera motion is bound to `camera_focus`, not just "follow".
6. High-speed actions avoid whole-frame blur — key readable frames are preserved.
7. Multi-subject scenes explicitly name character A, character B, or the corresponding reference identity.
8. The path map is an independent planning asset — not mixed onto the storyboard sheet.
9. The 3x3 master storyboard covers C1-C9's route nodes, scene objects, framing, camera position, and speed curves.
10. The video prompt declares that planning elements must not appear on screen.
11. The video prompt avoids passing an annotated path map / storyboard sheet as the visual reference.
12. Every cut contains `subject_box`, `camera_focus`, `target_box`, or `event_box`.
13. Character coordinates and camera coordinates are separated.
14. Every cut annotates `camera_mode`.
15. Every cut annotates a speed function.
16. Scene space is continuous — no random scene jumps.
17. Action physics is credible: hard stops have center-of-mass buffer, wall-runs are brief momentum plays, landings have knee absorption and CoM shifts.
18. If claiming "one-take", the camera path is physically continuous — no cuts, blackouts, transitions, or teleporting camera positions.

## Common Mistakes

- Writing only "high-speed movement" without start and end.
- Emitting only text coordinates, no path map or storyboard sheet.
- Writing only "camera follows" without stating which subject or which `camera_focus`.
- Coordinate boxes too large — target becomes ambiguous.
- Coordinate boxes too small — model ignores the subject's full pose.
- Using the same coordinate for every action — no motion trajectory.
- High-speed fights blurred throughout — audience can't read the hit relationship.
- 3x3 storyboard panels repeat composition — no action progression.
- Motion-path map made into a poster — missing arrows, numbers, and coordinate boxes.
- Video generation stage lacks a declaration that planning references are invisible.
- Video prompt degrades into plain action description, losing the `[L,T,W,H]` coordinate layer.
- Only character coordinates, no camera coordinates.
- Only speed numbers, no speed-function type.
- Scene-object order does not match the true route.
- Physical action exaggerated into superpowers, breaking credibility.

## Final Delivery Format

A complete delivery contains:

1. **Coordinate storyboard table**: each cut's subject, coordinates, camera, rhythm, speed curve.
2. **Scene motion-path overview**: standalone planning map showing the global scene, route, coordinates, event points, and camera path.
3. **Black-and-white line-art 3x3 master storyboard**: default single sheet, 9 panels for 9 cuts; only when the user asks for per-cut sub-frames should you also deliver a 3x3 sub-storyboard per cut.
4. **Video-generation prompts**: one coordinate-controlled prompt per cut, usable in image-to-video or text-to-video.
5. **Clean scene reference**: only when preparing for video generation and scene consistency is required.

Example table:

| Cut | Subject / event | Coordinates | Camera motion | Speed curve | Panel focus |
|---|---|---|---|---|---|
| C1 | Charge | start box | slight push-in | impact-freeze | body low, charge, ground feedback |
| C2 | Sprint | start → target | high-speed follow | ease-in | afterimage, dust, target approach |
| C3 | Hit | impact point | instant pull-back / whip | burst-stop | freeze, impact, knockback |

## Hub-Compatible Execution Notes

- Text planning can be done directly in the conversation.
- When image assets are needed, Hub's image sub-agent generates them: path map, black-and-white line-art storyboard, clean scene reference should be run as standalone image tasks, in batch or sequentially.
- When video is needed, Hub's video sub-agent generates it: pass in the clean character reference, clean scene reference, or annotation-free first frame, and write the coordinate-control layer into the task description. Do NOT pass a path map with arrows, coordinates, and cut numbers as the video visual reference.
- When assembly, splicing, or audio is needed, Hub's editing / speech / music sub-agents handle it; this Skill does not run post-production commands directly.
- If the user only wants "coordinate prompts", do NOT force image or video generation — deliver the coordinate storyboard table and copy-ready video prompts.
