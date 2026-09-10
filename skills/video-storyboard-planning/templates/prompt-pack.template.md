# Prompt Pack Template

> Version: 1.0.0
> File: `templates/prompt-pack.template.md`
> Purpose: Canonical prompt-pack template for turning a locked storyboard shot table into a storyboard image generation prompt.

---

## 1. Purpose

This file defines the **standard prompt-pack structure** used to convert a finalized shot table into a storyboard image prompt.

It is intended for:
- storyboard image generation
- prompt assembly
- template-specific board rendering
- validation of prompt completeness

It is **not** the shot table itself, and it must never override the shot table.

The prompt pack is a **visual derivative** of the locked storyboard rows.

---

## 2. Core Rule

The prompt pack must always be built **after** the shot table is locked.

### Never do this:
- generate a board first, then rewrite the shot table to match it
- invent new shots in the prompt pack
- merge shots without explicit template rules
- change product facts, continuity anchors, or visible claims

### Always do this:
- derive prompt content from the shot table / shot manifest
- preserve product identity
- preserve role/scene continuity
- preserve timing intent
- preserve shot order

---

## 3. Required Prompt Order

Every generated storyboard image prompt using this template must follow this exact section order:

```text
Board template:
[selected_template_slug]

Template intent:
[one sentence on why this template fits]

Global style:
[global style and continuity instructions]

Layout contract:
[layout and readability constraints]

Shot list:
[numbered image-facing shot lines]

Panel labels:
[numbered short labels]

Template-specific annotations:
[template-dependent metadata only]
```

No extra section may appear before `Board template:`.

---

## 4. Prompt Pack Master Template

```text
Board template:
{selected_template_slug}

Template intent:
{template_intent}

Global style:
{global_style}

Layout contract:
{layout_contract}

Shot list:
1. Shot ID: {shot_id_1}; Duration: {duration_1}; Beat: {beat_role_1}; Energy: {rhythm_energy_1}; Framing/angle: {framing_angle_1}; Camera: {camera_motion_1}; Visual: {visual_content_1}; Priority: {visual_priority_1}; Action path: {action_path_1}; Screen text: {screen_text_1}
2. Shot ID: {shot_id_2}; Duration: {duration_2}; Beat: {beat_role_2}; Energy: {rhythm_energy_2}; Framing/angle: {framing_angle_2}; Camera: {camera_motion_2}; Visual: {visual_content_2}; Priority: {visual_priority_2}; Action path: {action_path_2}; Screen text: {screen_text_2}
3. Shot ID: {shot_id_3}; Duration: {duration_3}; Beat: {beat_role_3}; Energy: {rhythm_energy_3}; Framing/angle: {framing_angle_3}; Camera: {camera_motion_3}; Visual: {visual_content_3}; Priority: {visual_priority_3}; Action path: {action_path_3}; Screen text: {screen_text_3}
{...continue until all shots in current batch are included}

Panel labels:
1. {panel_label_1}
2. {panel_label_2}
3. {panel_label_3}
{...continue until all panel labels are included}

Template-specific annotations:
{template_specific_annotations}
```

---

## 5. Section Definitions

### 5.1 `Board template:`
This must contain the internal template slug only.

### Valid examples
```text
Board template:
ugc_ad_act_board
```

```text
Board template:
brand_campaign_board
```

### Invalid examples
```text
Board template:
Creator ad board
```

```text
Board template:
I recommend the UGC template
```

### Rule
- Use only the internal slug.
- No commentary on this line.
- This must be the first section.

---

### 5.2 `Template intent:`
A single sentence that explains why this board style fits the brief.

### Good examples
```text
Template intent:
Use a creator-ad board to present a fast hook-proof-CTA structure clearly for a short TikTok conversion ad.
```

```text
Template intent:
Use a premium campaign board to make the storyboard presentation client-facing and easy to review with references and timecoded shots.
```

### Rules
- One sentence preferred.
- Practical, not poetic.
- Must refer to workflow fit, not aesthetic taste only.

---

### 5.3 `Global style:`
Defines the continuity and visual system shared across all panels.

### Include
- product fidelity
- character continuity
- environment continuity
- lighting style
- lens feel
- realism/polish level
- commercial tone
- texture handling
- board-wide consistency

### Example
```text
Global style:
Maintain exact product shape, color blocking, label placement, and functional proportions across all panels; vertical TikTok commercial energy; bright natural kitchen daylight; clean lifestyle realism; smartphone-adjacent lens feel with readable product scale; fast but controlled UGC polish; consistent wardrobe, countertop materials, and package appearance.
```

### Rules
- This section is global only.
- Do not list per-shot action here.
- Do not repeat the entire shot list here.

---

### 5.4 `Layout contract:`
Defines hard board construction requirements.

### Must include
- selected board type behavior
- exact panel count
- row plan
- sequence number placement
- caption strip rule
- readability rule
- no empty cell rule
- no collage rule for per-shot templates
- split rule when needed

### Example
```text
Layout contract:
Horizontal 16:9 storyboard presentation board using ugc_ad_act_board; exactly 10 panels, one panel per shot, balanced row plan 3+3+2+2; three act-group visual bands where possible; small high-contrast sequence number at top-left of every panel; one short caption strip near the bottom edge of each panel; no empty or placeholder cells; no watermarks; no long paragraphs; do not merge multiple shots into one panel; keep captions readable, and split into multiple boards if labels would become too small.
```

### Rules
- Must be rigid and implementation-friendly.
- Should not drift into style prose.
- Can include board metadata where helpful.

---

### 5.5 `Shot list:`
This is the image-facing representation of the shot manifest.

Each line must remain tied to one `shot_id`.

### Structure
```text
1. Shot ID: 1; Duration: 0.0–1.5s; Beat: hook; Energy: 4; Framing/angle: close-up, eye level; Camera: fast push-in; Visual: woman places compact blender on office desk, product centered, berries beside it, clean corporate desk background, immediate visual hook; Priority: product reveal and portability; Action path: hand enters from left and places blender toward center; Screen text: 3秒开打
```

### Rules
- Use image-facing wording.
- Preserve the original shot facts.
- Do not inject strategy commentary.
- Do not rewrite shot order.
- Do not add extra shots.

---

### 5.6 `Panel labels:`
A numbered list of short labels for each panel.

### Good examples
```text
Panel labels:
1. 开场亮相
2. 放入食材
3. 一键启动
4. 细腻打匀
```

```text
Panel labels:
1. Hook reveal
2. Add ingredients
3. Button press
4. Smooth blend
```

### Rules
- Keep short.
- Prefer action/structure labels.
- Avoid full ad copy.
- Avoid long sentences.
- Keep language aligned with the **video language** for rendered panel text.

---

### 5.7 `Template-specific annotations:`
This section only carries data required by the selected template.

It should **not** introduce new story facts.

---

## 6. Template-Specific Annotation Patterns

### 6.1 `ugc_ad_act_board`
Recommended fields:
```text
Template-specific annotations:
Act bands:
- ACT 1 Hook: shots {hook_shot_ids}
- ACT 2 Proof: shots {proof_shot_ids}
- ACT 3 CTA: shots {cta_shot_ids}

Optional micro callouts:
- shot {id}: {screen_text_or_dialogue_if_short}
```

Use when:
- hook / proof / result / CTA structure matters
- UGC ad readability matters
- TikTok selling flow matters

---

### 6.2 `brand_campaign_board`
Recommended fields:
```text
Template-specific annotations:
Board title: {board_title}
Board subtitle: {board_subtitle}
Metadata sidebar:
- product: {brand_or_product}
- duration: {duration_total}
- mood: {mood}
- style: {style}
- location: {location}
- lighting: {lighting}
- lens: {lens}
```

Use when:
- polished client-facing board presentation is required
- premium campaign review is the goal

---

### 6.3 `reference_production_board`
Recommended fields:
```text
Template-specific annotations:
Reference categories:
- Product hero consistency: shots {ids}
- In-use hand interaction: shots {ids}
- Lifestyle environment: shots {ids}
- Packaging / detail fidelity: shots {ids}

Technical notes:
- preserve product silhouette
- preserve logo placement
- preserve material texture
```

Use when:
- consistency is more important than strict frame-by-frame readability
- the board acts as a production reference sheet

---

### 6.4 `action_rhythm_track_board`
Recommended fields:
```text
Template-specific annotations:
Beat line:
- 1:{beat_role_1}
- 2:{beat_role_2}
- 3:{beat_role_3}

Camera path track:
- 1:{camera_motion_1}
- 2:{camera_motion_2}
- 3:{camera_motion_3}

Action path track:
- 1:{action_path_1}
- 2:{action_path_2}
- 3:{action_path_3}

Rhythm track:
- 1:{rhythm_energy_1}
- 2:{rhythm_energy_2}
- 3:{rhythm_energy_3}
```

Use when:
- action escalation and cut rhythm matter
- physical movement needs tracking

---

### 6.5 `hand_drawn_action_annotation_board`
Recommended fields:
```text
Template-specific annotations:
Camera labels:
- shot 1: {camera_motion_1}
- shot 2: {camera_motion_2}

Motion arrows:
- shot 1: {action_path_1}
- shot 2: {action_path_2}

Environment notes:
- shot 1: {environment_note_1}
- shot 2: {environment_note_2}

Duration tags:
- shot 1: {duration_1}
- shot 2: {duration_2}
```

Use when:
- planning and blocking are more important than polished commercial presentation
- directional arrows and rough intent matter most

---

## 7. Prompt Assembly Rules

### 7.1 Build Order
Prompt assembly must follow this order:
1. resolve selected template
2. resolve board metadata
3. map shot table into shot manifest
4. render global style
5. render layout contract
6. render shot list
7. render panel labels
8. render template-specific annotations
9. validate final pack

---

### 7.2 Source-of-Truth Rule
Everything in the prompt pack must derive from:
- shot table
- shot manifest
- board metadata
- continuity anchors
- confirmed brief

Never derive from:
- aesthetic guesswork that changes product facts
- generated image artifacts
- assumptions not grounded in the brief

---

### 7.3 Per-Shot Mapping Rule
For all templates with `one_panel_per_shot`:
- one panel maps to one shot
- one shot maps to one panel
- no missing panels
- no extra panels
- no merged multi-shot collages

Exception:
- `reference_production_board` may compress shots into categories, but those categories must explicitly cite source shot IDs.

---

## 8. Readability Rules

### Hard constraints
- sequence numbers must remain readable
- panel labels must remain short and readable
- avoid long paragraphs inside the board
- avoid decorative subtitle systems
- avoid speech bubbles unless explicitly required
- avoid dense overlays that obscure product visibility
- if labels become too small, split the board into multiple images

### Label guidance
- Latin languages: usually 2–8 words
- CJK languages: usually 4–10 characters
- keep labels structural, not promotional

---

## 9. Multi-Board Split Template

When shot count exceeds one readable board, use contiguous ranges.

### Example
```text
Board template:
ugc_ad_act_board

Template intent:
Use a creator-ad board split into contiguous ranges to preserve readability while keeping the original shot order intact.

Global style:
{global_style}

Layout contract:
Horizontal 16:9 storyboard presentation board using ugc_ad_act_board; this is board 1 of 2; exactly 8 panels covering shots 1-8; one panel per shot; row plan 4+4; maintain original sequence numbers; no empty cells; keep labels readable.

Shot list:
1. Shot ID: 1; ...
2. Shot ID: 2; ...
...
8. Shot ID: 8; ...

Panel labels:
1. ...
2. ...
...
8. ...

Template-specific annotations:
Act bands:
- ACT 1 Hook: shots 1-3
- ACT 2 Proof: shots 4-8
```

### Rules
- Preserve original shot numbering.
- Do not renumber as 1–8 if original shots are 9–16 in a later board.
- Mention board index when split.

---

## 10. Validation Checklist

Before using this prompt pack, validate:

- [ ] `Board template:` is first
- [ ] template slug is valid
- [ ] `Template intent:` exists
- [ ] `Global style:` exists
- [ ] `Layout contract:` exists
- [ ] `Shot list:` exists
- [ ] every shot is represented
- [ ] every shot has a `panel_label`
- [ ] `Panel labels:` count matches shot count
- [ ] template-specific annotations do not add new facts
- [ ] all rendered text is aligned with video language
- [ ] product continuity is preserved
- [ ] no extra explanatory sections appear before or between required sections

---

## 11. Minimal Filled Example

```text
Board template:
ugc_ad_act_board

Template intent:
Use a creator-ad board to clearly show a short TikTok hook-demo-CTA structure for a portable blender conversion video.

Global style:
Maintain exact product shape, lid design, cup proportions, and button placement across all panels; bright office-breakroom daylight; clean lifestyle UGC realism; smartphone-style lens feel; fast but readable ad pacing; consistent desk texture, fruit colors, and wardrobe continuity.

Layout contract:
Horizontal 16:9 storyboard presentation board using ugc_ad_act_board; exactly 6 panels, one panel per shot, balanced row plan 3+3; three act-group visual sections where possible; small high-contrast sequence number at top-left of each panel; one short caption strip near the bottom edge of each panel; no empty cells; no watermarks; no long paragraphs; keep product fully readable.

Shot list:
1. Shot ID: 1; Duration: 0.0–1.2s; Beat: hook; Energy: 4; Framing/angle: close-up, eye level; Camera: fast push-in; Visual: woman places compact portable blender on office desk, product centered, berries and banana beside it, immediate product reveal; Priority: instant product recognition; Action path: hand enters from left and places blender to center; Screen text: 3秒开打
2. Shot ID: 2; Duration: 1.2–2.8s; Beat: setup; Energy: 3; Framing/angle: top-down medium close-up; Camera: static; Visual: hand drops fruit pieces into the blender cup, ingredients clearly visible against a clean desk surface; Priority: ingredient clarity and ease of use; Action path: ingredients fall vertically into cup; Screen text: 新鲜现打
3. Shot ID: 3; Duration: 2.8–4.5s; Beat: reveal; Energy: 3; Framing/angle: close-up, 45-degree angle; Camera: slight handheld follow; Visual: thumb presses the power button, blending vortex forms instantly, smooth rotation visible through clear cup; Priority: one-touch blending proof; Action path: thumb presses down, liquid spins clockwise; Screen text: 一键启动
4. Shot ID: 4; Duration: 4.5–6.5s; Beat: proof; Energy: 4; Framing/angle: medium close-up, eye level; Camera: handheld follow; Visual: woman lifts blender and smiles, smoothie texture looks fine and lump-free, office background softly blurred; Priority: smooth texture result; Action path: cup lifts upward from desk to chest level; Screen text: 细腻不结块
5. Shot ID: 5; Duration: 6.5–8.5s; Beat: result; Energy: 2; Framing/angle: close-up, front angle; Camera: static; Visual: smoothie pours into glass cleanly, texture remains glossy and even, product sits beside glass for brand linkage; Priority: appetizing result; Action path: smoothie stream flows down into glass; Screen text: 随时补充能量
6. Shot ID: 6; Duration: 8.5–10.0s; Beat: CTA; Energy: 2; Framing/angle: packshot, straight-on; Camera: static; Visual: blender hero shot on clean desk, fruit around base, product centered, CTA text visible, strong purchase framing; Priority: purchase clarity; Action path: none; Screen text: 立即下单

Panel labels:
1. 开场亮相
2. 放入食材
3. 一键启动
4. 打得细腻
5. 成果展示
6. 立即下单

Template-specific annotations:
Act bands:
- ACT 1 Hook: shots 1-2
- ACT 2 Proof: shots 3-5
- ACT 3 CTA: shots 6
```

---

## 12. Usage Notes

Use this file as:
- a template source for prompt builders
- a validation reference for output formatting
- a documentation artifact for downstream implementation

Do not use this file as:
- the template catalog
- a runtime schema
- a replacement for template-specific definition files
- a substitute for the actual storyboard shot table

---
