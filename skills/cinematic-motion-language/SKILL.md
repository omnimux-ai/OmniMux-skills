---
name: cinematic-motion-language
description: |
  Structured prompt vocabulary system for high-precision cinematic video generation. Replaces vague adjectives with camera contracts, motion physics anchors, spatial zoning, lens/focus behavior sequences, and negative space as compositional tool. Input is a cinematic brief; output is a rigorous prompt block with hard-rule camera behavior, time-anchored motion speed, region-by-region spatial rules, and reinforced negative prompt.
  Use before writing any video prompt that requires precise control over movement, atmosphere, depth of field, or frame composition — atmosphere shots, product reveals, character scenes, abstract motion, sacred visuals, or any brief where imprecise language produces unpredictable results.
trigger-words: [cinematic motion language, motion language, camera contract, motion physics, spatial zoning, negative space, precision video prompt, 电影运动语言, 相机契约, cinematic prompt vocabulary]
allowed-tools: [question, hub_read_media, hub_generate_video, hub_save_file_to_session]
---

# Cinematic Motion Language

Five-pillar prompt vocabulary system for constructing video prompts with cinematic precision.

**Core principle:** the model understands physics, geometry, sequence, and constraint — not adjectives. Replace every vague descriptor with a physical analogy, spatial coordinate, temporal sequence, or hard rule.

## Workflow

### Step 1: Collect the brief inputs
Call `question` up front (batch if possible) to gather:
- Aspect ratio: 21:9 / 16:9 / 9:16
- Duration: X seconds
- Narrative one-liner: "what happens in one sentence"
- Style & mood one-liner: visual register + atmosphere
- Which model will generate this (Seedance 2.0 / Kling 3.0 / Wan / etc.)

These are load-bearing — empty fields become model-improvised chaos.

### Step 2: Read attached references
If the user attached a reference frame, storyboard, or mood board, call `hub_read_media` on each. This lets Spatial Zoning name **real regions** of the actual composition (e.g. "the dark upper-left third of this reference") instead of abstractions.

### Step 3: Apply the Five Pillars to fill the template
For each pillar, apply the rules below to convert vague ideas into hard rules:

**Pillar 1 — Camera Contract:** state camera behavior as a hard rule before anything else. Examples: `"Static locked-off camera. Zero movement."` / `"Slow push-in only — 10% scale change over the full duration."` / `"Single handheld drift, slight organic sway, no cuts."`

**Pillar 2 — Motion Physics Anchor:** give every moving element a physical analogy + time-anchored measurement. Never "slow" or "fast" alone. Examples: `"like dust suspended in honey"` + `"one full revolution across the entire 10-second clip"`.

**Pillar 3 — Spatial Zoning:** divide the frame into named regions with explicit rules per region. Cross-reference in negative prompt. Example: `"Left third: pure black, no light, no particles."`

**Pillar 4 — Lens Behavior Sequence:** describe focus as trigger → shift → state → return → repeat cause-and-effect. Never mention DOF as static.

**Pillar 5 — Negative Space:** name empty regions as intentional composition. Then reinforce in negative prompt: `"no particles on the left side, no light on the left side, no movement on the left side."`

### Step 4: Fill the Prompt Template (every field mandatory)

```
CAMERA: [static / push / drift / handheld — state as a hard rule]
ASPECT RATIO: [21:9 / 16:9 / 9:16]
DURATION: [X seconds]

Style & Mood: [visual register + atmosphere in one line]

Narrative: [one sentence — what happens]

Action:
- Subject: [who/what, position in frame, emotional state]
- Motion: [speed anchor — physical analogy + time measurement]
- Secondary motion: [particles / fabric / smoke — own speed anchor]

Lens:
- Focal feel: [wide / normal / telephoto character]
- Focus event: [cause → shift → state → return → repeat count]
- DoF: [shallow / deep / breathing]

Lighting: [source count, direction, quality, color temperature]

Spatial Zones:
- [region]: [rule]
- [region]: [rule]
- [region]: [rule]

Audio: [sound texture description — not music genre]

Quality suffixes: [photoreal, film grain, anamorphic, 8K detail, etc.]

Negative Prompt: [camera moves, spatial violations, style rejections, motion violations]
```

Every field must have a value. Put the filled template inside a fenced markdown code block.

### Step 5: Confirm before generation
Call `question`:
- question: "Ready to generate this on <Step 1 model>? Reinforced negative prompt is separated out — model will receive it as its own field, not inline."
- options: ["Generate now", "Refine prompt first", "Prompt-only, cancel generation"]

Default behavior is prompt-only. Never spend generation credits without explicit approval.

### Step 6: Generate (only if Step 5 approved)
Call `hub_generate_video` with:
- vendor / model: `<Step 1 model choice>`
- prompt: `<Step 4 filled template, WITHOUT the Negative Prompt line>`
- negative_prompt: `<the Negative Prompt line as its own field>` (never inline it as a positive-prompt comment)
- duration_sec: `<Step 1 duration>`
- aspect_ratio: `<Step 1 aspect ratio>`
- medias: `[]` unless the user provided reference frames

### Step 7: Register the deliverable
Call `hub_save_file_to_session` with:
- file: `<returned .mp4 path>`
- file_type: `video`

---

## The Five Pillars — detailed reference

### 1. Camera Contract

State the camera's behavior as a hard rule before describing anything else. The model treats the camera as a character — define it or it will improvise.

Examples:
- "Static locked-off camera. Zero movement. No pan, no zoom, no dolly, no shake."
- "Slow push-in only — 10% scale change over the full duration."
- "Single handheld drift, slight organic sway, no cuts."

Always reinforce camera rules in the negative prompt as well.

### 2. Motion Physics Anchor

Give every moving element a speed reference from the physical world, not an adjective. Pair physical analogies with time-anchored measurements for maximum precision.

Speed analogy examples:
- "like dust suspended in honey"
- "like embers floating in still air"
- "like smoke through a cathedral at dawn"
- "like the surface of a lake disturbed by a single drop"

Time-anchored measurements:
- "one full revolution across the entire 10-second clip"
- "roughly 6 degrees per second"
- "the pace of a clock's hour hand — imperceptibly slow"
- "travels the full arc in 8 seconds with no pause"

Never use "slow", "fast", "gentle", "subtle" alone.

### 3. Spatial Zoning

Divide the frame into named regions and assign explicit rules to each.

Region naming conventions:
- "Left third / center third / right third"
- "Foreground plane / midground / background"
- "Upper half / lower half"
- "Right two-thirds / left void"

Example zone rules:
- "Left third: pure black, no light, no particles, no movement."
- "Right two-thirds: all action contained here."
- "Foreground plane: particle layer only — no subject."

Always cross-reference spatial zones in the negative prompt.

### 4. Lens Behavior Sequence

Describe focus and depth of field as a narrative event with a beginning, middle, and end.

Structure: **trigger → shift → state → return → repeat**

Example:
"Focus opens on the subject. As the foreground element crosses the lens plane, focus shifts onto it — the subject softens into warm bokeh. The element drifts past. Focus breathes back to the subject. This cycle repeats organically 2–3 times."

Key vocabulary: shallow depth of field, focus-breathing, rack focus, bokeh silhouette, lens plane crossing, anamorphic lens rendering.

### 5. Negative Space as Compositional Tool

Name empty areas of the frame as intentional design decisions.

Examples:
- "Sacred emptiness — the left third is a deliberate compositional weight."
- "The darkness is active, not background."
- "Void occupies the left two-thirds — no fill, no ambient spill, no movement."

Negative prompt reinforcement: `"particles on the left side, light on the left side, movement on the left side"`

---

## Key Vocabulary Reference

### Camera
static locked-off / handheld drift / slow push-in / crane reveal / whip pan / zero movement / no reframe / locked composition

### Motion Speed
suspended in honey / floating in still air / cathedral smoke / hour-hand pace / imperceptibly slow / continuous fluid arc / no acceleration / no stillness

### Particle Behavior
three-dimensional spiral / orbiting / foreground crossing / contained within zone / rising and descending in soft arcs / catching directional light

### Lens / Focus
shallow depth of field / focus-breathing / rack focus / bokeh silhouette / lens plane crossing / anamorphic rendering / focus returns organically

### Lighting
single key light / directional warm / chiaroscuro / golden-amber / deep shadow / no fill / no ambient spill / upper right source / rim light / backlight halo

### Negative Space
sacred emptiness / pure black void / no light bleed / no particles / no movement / deliberate compositional weight / active darkness

---

## Worked Example — Dervish Shot

**Brief:** Whirling dervish, close-up of raised hand and forearm, golden dust particles, pure black left third, sacred Sufi atmosphere.

**Camera:** Static locked-off. Zero movement. No pan, no zoom, no dolly.

**Motion anchor:** Hand traces the arc of one full Sama rotation over 10 seconds — the pace of a clock's hour hand. Particles move like embers in still air.

**Lens event:** Foreground particles cross lens plane → focus shifts to particles (sharp, glowing) → hand softens to warm bokeh → particles drift past → focus returns to hand. Cycle repeats 2–3 times organically.

**Spatial zones:**
- Left third: pure black, no particles, no light, no movement.
- Right two-thirds: all motion contained here.
- Foreground plane: particle layer, passes in front of hand.

**Lighting:** Single warm key from upper right. Deep chiaroscuro. Golden-amber on black.

**Negative prompt:** camera movement, pan, zoom, dolly, shake, fast motion, fast particles, particles on the left side, light on the left side, acceleration, abrupt cuts, cartoon, anime, strobing.

## Notes for Hub adaptation

- Use `question` to gather aspect ratio, duration, and the single-line "what happens" narrative before drafting — never guess these silently.
- If the user attaches a reference frame or storyboard, read it with `hub_read_media` first so the Spatial Zoning rules can name real regions of the actual composition.
- Primary output is the filled-in Prompt Template inside a fenced markdown code block; every field must be present (empty fields become model-improvised chaos, which defeats the whole skill).
- This skill is prompt-only by default. Only fire `hub_generate_video` when the user explicitly approves generation, and always pass the reinforced negative prompt as its own field — never as a comment inside the positive prompt.
- When generation runs, register the resulting `.mp4` to the session via `hub_save_file_to_session` (`file_type: video`).
- Pair well with `seedance-director` (multi-shot narrative structure) and `pulp-cinema-director` (genre framing) — this skill supplies the vocabulary layer, not the shot-list layer.
