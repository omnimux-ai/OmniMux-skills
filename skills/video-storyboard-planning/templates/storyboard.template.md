# Storyboard Template Specification

> Version: 1.0.0
> File: `templates/storyboard.template.md`
> Purpose: Define the canonical output template for a “视频分镜图 / storyboard” skill.
> This file is a reusable specification template, not a user-facing final deliverable by itself.

---

## 1. Objective

This template defines the standard structure for generating a storyboard handoff with exactly two deliverable layers:

1. **Shot Table** — the authoritative written shot-by-shot breakdown.
2. **Storyboard Image Prompt** *(optional)* — a visual derivative of the shot table for image rendering workflows.

The **Shot Table is always the single source of truth**.
If a generated storyboard image conflicts with the table, the table wins.

---

## 2. Language Rules

Two languages may exist in the workflow:

### 2.1 User Conversation Language
Used for:
- section titles
- table headers
- explanatory notes
- recommendation text
- follow-up text

### 2.2 Video Language
Used for:
- spoken dialogue
- on-screen captions
- CTA text
- product signage visible in-frame
- panel labels and rendered text inside storyboard images

### 2.3 Rule
If the user does not explicitly provide a video language, it must be requested or inferred according to the skill workflow.

---

## 3. Canonical Deliverable Structure

A completed storyboard output should follow this order:

```text
# Storyboard
## Setup Summary
## Shot Table
## Template Recommendation (optional for text-only flow)
## Storyboard Image Prompt (only when image generation is requested)
## Follow-up Offer
```

---

## 4. Setup Summary Template

Use a concise summary before the shot table.

### Template
```md
## Setup Summary

- **Product**: {product_name_or_descriptor}
- **Goal**: {ad_goal}
- **Target Audience**: {target_audience}
- **Duration**: {duration}
- **Video Language**: {video_language}
- **CTA**: {cta}
- **Visual Direction**: {visual_direction}
- **Template**: {selected_template_name_or_auto}
```

### Rules
- Omit fields that are truly unknown.
- Do not invent product claims.
- Keep it compact.
- If no storyboard image is requested, `Template` may be omitted.

---

## 5. Shot Table Template

This is the required core output.

### Header Format
Headers should be localized into the **user conversation language**, but the canonical column order must remain fixed:

`# | Duration | Shot size / angle | Camera move | Transition | On-screen content | Audio`

### Markdown Table Skeleton
```md
## Shot Table

| # | Duration | Shot size / angle | Camera move | Transition | On-screen content | Audio |
|---|---|---|---|---|---|---|
| 1 | {duration} | {shot_size_angle} | {camera_move} | {transition} | {on_screen_content} | {audio} |
| 2 | {duration} | {shot_size_angle} | {camera_move} | {transition} | {on_screen_content} | {audio} |
| 3 | {duration} | {shot_size_angle} | {camera_move} | {transition} | {on_screen_content} | {audio} |
```

### Field Rules

#### `#`
- Sequential shot number starting from 1.
- One row = one distinct camera shot.

#### `Duration`
- Use concise time spans or lengths.
- Example:
  - `0.0–1.5s`
  - `1.5s`
  - `2.0–3.8s`

#### `Shot size / angle`
Describe visual framing clearly.
Examples:
- `Extreme close-up, top-down`
- `Medium shot, eye level`
- `Close-up, 45° side angle`
- `Wide shot, low angle`

#### `Camera move`
Use only purposeful movement.
Examples:
- `Static`
- `Slow push-in`
- `Handheld follow`
- `Pan left`
- `Tilt down`
- `Arc right`

Default to `Static` if motion adds nothing.

#### `Transition`
Use concise editorial transitions.
Examples:
- `Cut`
- `Match cut`
- `Whip pan`
- `Dissolve`
- `Smash cut`

Default to `Cut` when no special transition is required.

#### `On-screen content`
Must include:
- subject
- action
- product position
- scene/context
- visible proof/detail
- any visible text

This is the densest and most important descriptive field.

#### `Audio`
May include:
- VO
- dialogue
- subtitle cue
- SFX
- music cue

All spoken or visible copy must follow the **video language**.

---

## 6. Shot Writing Rules

### 6.1 One Row = One Shot
Split rows whenever there is a change in:
- camera setup
- location
- action phase
- product state
- visual purpose

### 6.2 No Multi-Scene Rows
Do not combine multiple distinct visual beats into one row just to shorten the table.

### 6.3 Compact but Complete
Rows should be concise, but descriptive enough to support image generation or production planning.

### 6.4 Continuity Preservation
Keep continuity stable across rows for:
- product appearance
- character identity
- costume
- environment
- lighting
- lens feel
- brand tone

### 6.5 Product Accuracy First
If product visuals are purchase-critical, the product appearance must not drift.

---

## 7. Internal Shot Manifest Template

This section is typically **not shown to end users**, but defines the canonical intermediate structure derived from the shot table.

```yaml
shot_manifest:
  - shot_id: 1
    duration: "0.0–1.5s"
    framing_angle: "Close-up, top-down"
    camera_motion: "Slow push-in"
    transition: "Cut"
    visual_content: "A hand opens the pouch on a clean kitchen counter; product centered; texture visible; soft natural morning light; small package logo visible."
    sound: "轻快鼓点起；字幕：'早餐别将就'；轻微包装摩擦声"
    panel_label: "打开包装"
    beat_role: "hook"
    mood_tone: "grounded"
    rhythm_energy: 3
    visual_priority: "product texture and opening action"
    action_path: "hand enters frame from right, pulls seal open toward camera"
    screen_text: "早餐别将就"
    scene: "home kitchen counter"
    act: "ACT 1 Hook"
    environment_note: "bright neutral countertop, minimal props"
    reference_category: null
```

### Rules
- `panel_label` should be short.
- `beat_role` should come from a controlled set where possible:
  - `hook`
  - `setup`
  - `reveal`
  - `proof`
  - `detail`
  - `contrast`
  - `escalation`
  - `result`
  - `CTA`
  - `pause`
  - `transition`
- `rhythm_energy` should be 1–5.
- `visual_priority` is the single most important thing to preserve.

---

## 8. Board Metadata Template

Also typically internal unless explicitly requested.

```yaml
board_metadata:
  selected_template: "ugc_ad_act_board"
  board_title: "Protein Snack Storyboard"
  board_subtitle: "15s TikTok UGC Ad"
  sequence_id: "protein-snack-15s-v1"
  duration_total: "15s"
  aspect_ratio: "9:16"
  brand_or_product: "Protein Snack Bites"
  campaign_meta:
    style: "UGC commercial"
    mood: "fresh, energetic"
    location: "home kitchen"
    lighting: "soft natural daylight"
    lens: "smartphone realism"
    motion: "quick but readable"
  panel_count_rule: "one_panel_per_shot"
```

### Rules
- `selected_template` must map to a valid template slug.
- `aspect_ratio` usually refers to target video aspect ratio, not board canvas ratio.
- `panel_count_rule` defaults to `one_panel_per_shot`.

---

## 9. Template Recommendation Block

Only include when relevant to the workflow.

### Markdown Template
```md
## Template Recommendation

- **Recommended Template**: {template_name}
- **Why**: {reason}
- **Best For**: {use_case}
```

### Rules
- Use a user-facing template name, not just a slug.
- Keep explanation brief and practical.
- If the workflow is text-only, this section may be omitted or kept very short.

---

## 10. Storyboard Image Prompt Template

Only include when image rendering is requested.

The prompt must begin exactly in this structure:

```text
Board template:
{selected_template_slug}

Template intent:
{one sentence explaining why this board fits the brief}

Global style:
{global visual continuity, lens, lighting, polish, product fidelity, brand tone}

Layout contract:
{panel count, row plan, numbering, caption strips, readability constraints, no empty cells, template-specific layout rules}

Shot list:
1. Shot ID: {id}; Duration: {duration}; Beat: {beat_role}; Energy: {rhythm_energy}; Framing/angle: {framing_angle}; Camera: {camera_motion}; Visual: {visual_content}; Priority: {visual_priority}; Action path: {action_path}; Screen text: {screen_text}
2. Shot ID: {id}; Duration: {duration}; Beat: {beat_role}; Energy: {rhythm_energy}; Framing/angle: {framing_angle}; Camera: {camera_motion}; Visual: {visual_content}; Priority: {visual_priority}; Action path: {action_path}; Screen text: {screen_text}

Panel labels:
1. {panel_label}
2. {panel_label}

Template-specific annotations:
{only template-relevant annotation fields; no new story facts}
```

### Hard Rules
- `Board template:` must be the first heading line.
- `Template intent:` must be second.
- Do not put extra explanation before them.
- Do not add story facts not present in the shot table or manifest.
- All rendered panel text must follow the **video language**.
- Product-native text/logos may remain unchanged.

---

## 11. Row Plan Guidance

When rendering storyboard images, panel layout should remain readable.

### Preferred Distribution
```text
5  = 3+2
6  = 3+3
7  = 4+3
8  = 4+4
9  = 3+3+3
10 = 3+3+2+2
11 = 3+3+3+2
12 = 4+4+4 or 3+3+3+3
13 = 3+3+3+2+2
14 = 3+3+3+3+2
15 = 3+3+3+3+3
16 = 4+4+4+4
```

### Rules
- No empty placeholder cells.
- Prefer balanced rows.
- If readability suffers, split across multiple storyboard images.
- Preserve original shot numbering across splits.

---

## 12. Template-Specific Layout Slots

This section defines placeholders expected by different board styles.

### 12.1 `ugc_ad_act_board`
Suggested slots:
- board title
- product badge
- duration
- mood
- 3 act bands
- shot cards
- CTA tile

### 12.2 `brand_campaign_board`
Suggested slots:
- large title block
- subtitle
- reference cards
- metadata sidebar
- lower timecoded shot grid

### 12.3 `reference_production_board`
Suggested slots:
- reference strip
- hero panels
- technical footer notes
- grouped reference categories

### 12.4 `action_rhythm_track_board`
Suggested slots:
- title/meta
- shot panel grid
- beat line
- camera path track
- action path track
- rhythm track
- escalation map
- style/state track

### 12.5 `hand_drawn_action_annotation_board`
Suggested slots:
- sketch-style panels
- red camera labels
- blue motion arrows
- orange action arcs
- green environment notes
- yellow duration tags

---

## 13. Validation Checklist

Before finalizing output, validate:

### Shot Table
- [ ] Table exists
- [ ] Column order is correct
- [ ] One row = one shot
- [ ] No row contains multiple scene changes
- [ ] On-screen content is sufficiently descriptive
- [ ] Audio is present for every row
- [ ] Product continuity is preserved

### Manifest
- [ ] Every shot row maps to a manifest item
- [ ] `panel_label` exists for every shot
- [ ] `beat_role` is assigned
- [ ] `visual_priority` exists
- [ ] `screen_text` is explicit or `none`

### Image Prompt
- [ ] Starts with `Board template:`
- [ ] Includes `Template intent:`
- [ ] Includes `Global style:`
- [ ] Includes `Layout contract:`
- [ ] Includes `Shot list:`
- [ ] Includes `Panel labels:`
- [ ] No extra invented narrative facts

---

## 14. Follow-up Offer Template

After the shot table is delivered, the workflow should naturally offer the next step.

### Template
```md
## Follow-up

If you want, I can continue and turn this shot table into a storyboard image in a suitable layout template.
```

### Optional Expanded Version
```md
## Follow-up

If you want, I can continue with either of these next steps:

1. **Render a storyboard image** based on this shot table
2. **Refine the shot table first** for a different tone, pace, or target audience
```

---

## 15. Minimal Final Output Example

```md
# Storyboard

## Setup Summary
- **Product**: Portable blender
- **Goal**: TikTok product ad
- **Target Audience**: Busy office workers
- **Duration**: 15s
- **Video Language**: Chinese
- **CTA**: 立即下单
- **Visual Direction**: Clean, energetic, lifestyle UGC

## Shot Table

| # | Duration | Shot size / angle | Camera move | Transition | On-screen content | Audio |
|---|---|---|---|---|---|---|
| 1 | 0.0–1.5s | Close-up, eye level | Fast push-in | Cut | Girl places a portable blender on office desk; fruit cup beside it; product centered; text visible: “3秒开打” | 音乐起；字幕：“3秒开打” |
| 2 | 1.5–3.5s | Top-down medium close-up | Static | Cut | Hand drops banana slices and berries into the cup; ingredients clearly visible; clean desk background | 轻快切点音效；水果落入杯中的声音 |
| 3 | 3.5–6.0s | Close-up, 45° angle | Slight handheld follow | Match cut | User presses the button; vortex forms inside cup; texture and blending power visible | 字幕：“细腻不结块”；电机声轻微可闻 |

## Template Recommendation
- **Recommended Template**: Creator ad board
- **Why**: Best fit for a short UGC-style TikTok conversion video.
- **Best For**: Hook → demo → result → CTA product storytelling.

## Follow-up
If you want, I can continue and turn this shot table into a storyboard image in a suitable layout template.
```

---

## 16. Authoring Notes

Use this template file when:
- defining the canonical storyboard output contract
- aligning prompt modules
- implementing formatter logic
- validating skill outputs

Do **not** use this file as a substitute for:
- template catalog metadata
- image prompt generation logic
- schema files
- runtime workflow instructions

Those should live in their own dedicated files.

---
