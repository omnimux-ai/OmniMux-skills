---
name: dodge-game-video-generator
description: |
  Turn an uploaded character photo into a cute 2D hand-drawn arrow-key dodge game. Extract a chibi subject brief, create four consistent 4:3 keyframes for up, down, left, and right dodges, then produce a 10-second H3 video. Keep one protagonist, a fixed camera, crayon texture, sparse HUD, and exact synchronization among the highlighted arrow, the single attacking arm, and the dodge motion. Use for reaction-game shorts, not playable game development or multi-character scenes.
trigger-words:
  - reaction dodge
  - dodge game
  - crayon game
  - arrow key dodge
  - palm dodge game
  - 反应游戏
  - 躲手掌游戏
  - 按键游戏
  - Q版躲避
allowed-tools:
  - hub_analyse_media
  - hub_generate_image
  - hub_generate_video
  - hub_canvas_group_recent_outputs
---

# Reaction Dodge Game

## When to use

Use this Skill when the user uploads one photo of a person, animal, cartoon character, object, or mascot and wants a 10-second 4:3 horizontal reaction-game video where a cute 2D chibi protagonist dodges incoming palm-and-arm attacks by moving up, down, left, and right. It is also suitable when the user wants four matching keyframes as storyboard stills or social posts.

## Not suitable

- Videos longer than 10 seconds.
- 3D, realistic, live-action, or photographic styles.
- 16:9 widescreen delivery.
- Multiple protagonists or changing character identity.
- Readable text, subtitles, or modern electronic game UI.

## Inputs and outputs

### Input

- One protagonist photo is required. Extract the subject’s core traits, then redraw it as a 2D crayon/colored-pencil chibi character.
- Optional style adjustment. Default style is warm cream paper, crayon strokes, colored pencil, and colors derived from the subject.

### Outputs

1. Keyframe 1: UP dodge, 4:3 image.
2. Keyframe 2: DOWN dodge, 4:3 image.
3. Keyframe 3: LEFT dodge, 4:3 image.
4. Keyframe 4: RIGHT dodge, 4:3 image.
5. Final 10-second 4:3 video.

Keyframe 1 is the visual anchor. Generate keyframes 2, 3, and 4 using both the user photo and keyframe 1 as references so style, UI icons, paper background, decorative elements, arrows, character identity, and palm-and-arm linework stay consistent. The final video must reference all four keyframes; keyframe 1 may be used as the first frame.

## Workflow

### Step 1: Extract subject features

Use `hub_analyse_media` on the uploaded photo and write a `subject_brief` for `references/prompt-template.md`. Capture:

- subject type, such as human, cat, dog, character, object, or anthropomorphic object;
- base and accent colors;
- 3-5 recognizable silhouette or identity features;
- which body part can stretch, squash, arch, or side-step in a chibi way.

The brief must describe a 2D crayon/pencil chibi version, not a realistic subject.

### Step 2: Generate four keyframe prompts

Use `references/prompt-template.md`. Replace only the variables for direction, palm source, protagonist pose, and highlighted arrow.

| Keyframe | Direction | Palm-and-arm source | Dodge pose |
|---|---|---|---|
| 1 | up | from below | body arches upward into an exaggerated bridge |
| 2 | down | from above | body squashes flat against the floor |
| 3 | left | from right | body stretches and slides left |
| 4 | right | from left | body twists or slides right |

Generate keyframe 1 first with `hub_generate_image`, `vendor_params.aspect_ratio = "4:3"`, and the user photo as reference. Generate keyframes 2-4 with the user photo plus keyframe 1 as references.

### Step 3: Build the H3 video prompt

Use `references/video-prompt-template.md`. The prompt must include:

1. style and fixed-camera constraints;
2. the full `subject_brief`;
3. HUD and bottom arrow layout;
4. a 10-second timeline with fixed sequence, rapid combo, and final settlement.

Timeline lock:

```text
0.0-0.5s: neutral opening, no interaction palm, bottom arrows are outline only.
0.5-5.0s: fixed sequence, UP → DOWN → UP → LEFT → RIGHT.
6.1-9.5s: clear four-beat rapid combo, slightly faster but not chaotic; leave a brief rebound gap between beats.
9.5-10.0s: all hands disappear, arrows return to outline, protagonist centers with a cheeky clear-state smirk.
```

### Step 4: Generate the video

Use `hub_generate_video` with:

- `vendor = "MiniMax"`
- `model_id = "MiniMax-H3"`
- `duration = 10`
- `mode = "i2v"` or `mode = "multimodal"` depending on the chosen reference routing
- `first_frame_image = keyframe 1` when using keyframe 1 as the opening frame
- `reference_image_paths = [keyframe 1, keyframe 2, keyframe 3, keyframe 4]` for multimodal reference guidance
- `vendor_params = {"ratio":"4:3", "resolution":"2K"}`

### Step 5: Deliver

Deliver the four keyframes, then the 10-second video. Mention which keyframe was used as the first frame. Group same-round outputs on canvas when multiple assets are produced.

## Hard constraints

- 2D crayon/colored-pencil hand-drawn style only. No 3D, no realism, no live action.
- 4:3 horizontal composition.
- Fixed camera. No zoom, pan, dolly, or camera movement.
- Top hand-drawn HUD and bottom four arrows must remain visible.
- Bottom arrows are always ordered UP, DOWN, LEFT, RIGHT.
- No readable text and no modern electronic UI. Hand-drawn HUD and arrows are allowed.
- Paper grain and hand-drawn jitter must remain visible.
- One protagonist only, with consistent identity throughout the 10 seconds.
- Each dodge beat uses exactly one visible palm with an attached simple arm segment.
- Palm source and dodge direction must strictly correspond: UP dodges a palm from below, DOWN dodges a palm from above, LEFT dodges a palm from the right, RIGHT dodges a palm from the left.
- The palm-and-arm must come close enough to create pressure but never touch, overlap, cover, collide with, or pass through the protagonist.
- Each beat must complete this synchronized feedback chain: highlight the matching arrow, add a brief hand-drawn ripple/star/paw-print accent, extend the corresponding arm, dodge in that direction, then rebound. Never highlight an arrow without the matching movement.
- When reusing keyframe 1 for keyframes 2-4, inherit style, character, background, HUD, decorations, arrow design, and arm linework only. Do not retain the previous attack arm; each frame contains only the one arm for its current direction.
- Keep decorations sparse so the protagonist, arm, palm, and arrows remain unobstructed.

## Failure handling

- If character identity drifts, strengthen the `subject_brief` and regenerate.
- If arrow and action timing drift, rewrite the timeline with absolute timestamps.
- If keyframes are inconsistent, regenerate the failed image using the user photo, keyframe 1, and the same `subject_brief`.

## References

- `references/prompt-template.md` — shared keyframe prompt template.
- `references/video-prompt-template.md` — full H3 video prompt template.
- `references/feature-extraction.md` — subject feature extraction guide.
