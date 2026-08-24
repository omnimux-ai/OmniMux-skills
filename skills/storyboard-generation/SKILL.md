---
name: storyboard-generation
description: |
  Rules and prompts for generating structured presentation slides and multi-panel film storyboards. Input is a slide brief or a shot list; output is a fully rendered slide/storyboard image where photo cards, text blocks, timeline bars, and camera-movement overlays are contained inside the frame with legible typography and consistent lighting.
  Use whenever the user wants to generate a presentation slide, build a multi-panel storyboard, produce director-style shot cards, or create empty placeholder frames for structural layout work.
trigger-words: [分镜板, 分镜生成, 幻灯片生成, 演示幻灯片, 镜头卡, 空面板, 时间线条, storyboard, storyboards, presentation slide, film storyboard, shot card, director storyboard]
allowed-tools: [hub_generate_image, hub_save_file_to_session, question]
---

# Storyboard & Presentation Slide Generation

Generate full storyboard slides or presentation decks (photo cards, text blocks, timeline bars, camera-movement overlays) with strict containment inside the frame and legible typography.

## Workflow

### Step 1 — Establish deliverable intent via `question`

Call `question` with:
- question: "What kind of slide/storyboard do you need?"
- options: [
    "Single presentation slide (e.g. section header, comparison, before/after)",
    "Multi-panel film storyboard (director-style with camera arrows)",
    "Empty placeholder panel (structural re-use, no character or content)"
  ]

Follow up with a second `question` to lock structural params:
- question: "Which layout structure and aspect ratio?"
- options: [
    "16:9 slide with 2 rows / N columns (grid)",
    "2.39:1 ultra-wide cinematic storyboard row",
    "1:1 square social card",
    "Custom — user describes layout"
  ]

For multi-panel decks, also ask:
- Row/column count
- Timeline bar at the bottom? (yes/no + slow→fast labels)
- Standard vs Extreme style variance

Never silently pick defaults for layout, aspect ratio, or style — always confirm via `question` before spending credits.

### Step 2 — Select vendor per slide type

Route via `hub_generate_image` `vendor` param based on slide type:

| Slide type | Preferred vendor / model | Why |
|---|---|---|
| Text-heavy slide (headline, labels, callouts) | `vendor: gpt-image` (`model: gpt-image-2`) | Best text legibility |
| Photo-card grid, lifestyle collage | `vendor: nano-banana` (`model: nano_banana_pro`) | Photorealistic literal layout |
| Director storyboard with camera overlays | `vendor: nano-banana` (`model: nano_banana_pro`) | Handles structured JSON prompts well |
| Illustration-style pitch deck | `vendor: seedream` (`model: seedream_4_5`) | Strong color/hierarchy |

### Step 3 — Construct the prompt using these rules

Apply these nine rules to build the prompt string:

1. **Strict containment.** Prompt must explicitly state: `"All photo cards fully inside slide boundaries, nothing cropped."` Nothing should be cropped or cut off at the edges.
2. **Resolution & aspect ratio.** Use `aspect_ratio: "16:9"` (or the ratio confirmed in Step 1) and `resolution: "1k"` or `"2k"` in the `hub_generate_image` params. `1080p` is INVALID for slide-oriented image models — never use it.
3. **Layout definition.** Write row/column structure in the prompt body: `LAYOUT: 2 rows. Row 1: two equal columns (E1 left, E2 right). Row 2: three equal columns (E3, E4, E5)...`
4. **Reference adherence.** When replicating an existing layout, name typography, icon set, card style, and background color explicitly.
5. **Timeline bars.** For continuous shots or multi-scene sequences, add: `Timeline bar at very bottom: gradient line from left (slow) to right (fast), labeled [labels].`
6. **Consistency.** State lighting, time of day, and environment as fixed across panels — unless explicitly contrasting states (Before/After).
7. **Complex storyboards (film/video).** Use structured JSON prompt: dark charcoal background `#1a1a1a`, white 2px borders around panels, specific typography for labels. Cyan for camera-movement overlays, yellow italic for audio, green for transitions. Structured data block below each panel (Shot Type, Lens, Camera Path, Audio, Transition).
8. **Camera-movement overlays.** Instruct arrows/diagrams drawn directly on panels: `"curved cyan arc arrow showing orbit"`, `"bold downward arrow labeled VERTICAL PLUNGE"`.
9. **Empty panels.** For structural placeholder: `"COMPLETELY EMPTY dark panel — solid dark charcoal background, NO photo, NO person, NO image. Just the dark background with a subtle dark grey rectangle placeholder outline."`

### Step 4 — Confirm before spending credits

Present to the user:
- Final prompt string (Step 3)
- Chosen vendor + model (Step 2)
- Aspect ratio + resolution (`1k` or `2k`, never `1080p`)
- Row/column structure and whether it's a single slide or batch

Wait for explicit approval before invoking generation.

### Step 5 — Generate via `hub_generate_image`

Single-slide call:

```
hub_generate_image with:
  vendor: <from Step 2>
  model: <specific model id from Step 2>
  prompt: <constructed prompt from Step 3>
  aspect_ratio: <from Step 1>
  resolution: 1k  # or 2k — never 1080p
```

Multi-panel decks with **consistent lighting across panels** — submit them in **one** `hub_generate_image` batch call so the model treats them as a set (prevents per-panel style drift):

```
hub_generate_image with:
  vendor: <same across batch>
  model: <same across batch>
  prompt: <same wrapper + per-panel variation>
  aspect_ratio: <same across batch>
  resolution: 1k
  # N variants in one call so model treats them as one deck
```

### Step 6 — Register outputs to session

For each returned image, call `hub_save_file_to_session` with:
- file: <returned image path>
- file_type: image

For a deck, list all N file paths to the user in order (Slide 1 / Slide 2 / ...).

## Notes for Hub adaptation

- Image generation goes through `hub_generate_image` — pick the vendor (Nano Banana Pro / GPT Image / Seedream) per slide type; the dispatcher handles routing.
- Never pass `1080p` as a resolution — pass `1k` or `2k` explicitly. Aspect ratio goes in the request params, not the prompt text.
- Register every rendered slide/storyboard frame with `hub_save_file_to_session` (`file_type: image`) so the deck shows up in the workspace files panel.
- For multi-panel decks, ask the user via `question` for row/column count, aspect ratio, and whether they want Standard or Extreme style variance before batching.
- When the user asks for consistent lighting across a batch of panels, submit them in one `hub_generate_image` batch call so the model treats them as a set.
