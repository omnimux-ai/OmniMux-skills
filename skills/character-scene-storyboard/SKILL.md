---
name: character-scene-storyboard
description: |
  Character scene storyboard generation assistant. Input character reference images (1–4 characters) and a script/scene description,
  automatically generates a professional pre-production comprehensive design sheet, including:
  ① Main character designs (three-view lineup + bust portrait + expression variants + prop details)
  ② Main scene concept art (atmosphere + color reference + lighting notes)
  ③ Storyboard panels (default 12 panels, adaptive to shot count)
  Layout flexibly adjusts based on character count and panel count — content determines structure, not a fixed quadrant grid.
  Supports 6 visual style options (vintage color pencil sketch / cinematic realism / black & white sketch / ink wash traditional Chinese /
  Western comic / 2D anime). User confirms in Phase 1; default is "cinematic realism" (photo-grade cinematic frames).
  Entire sheet has unified style, generated in a single pass using g-image-2, output as a single professional design document image.
  Trigger words: character scene storyboard, character scene storyboard, character storyboard, design sheet, storyboard design, storyboard design sheet, character storyboard,
  character scene storyboard, character sheet storyboard, design sheet, concept sheet,
  character design plus storyboard, character design storyboard image, comprehensive design sheet.
  Not for: pure storyboard video (use director-storyboard), pure poster (use poster-design),
  pure character illustration (use film-shot).
allowed-tools: hub_read, hub_save_file_to_session
---

# Character Scene Storyboard Generation Assistant

Receives character reference images and a script, generates a single professional pre-production comprehensive design sheet containing character designs, scene concepts, and storyboard panels.

## Core Conventions

- **Image generation model**: g-image-2 (mandatory, not replaceable)
- **Output format**: Single comprehensive design sheet (single image document) — outputting multiple separate images is prohibited
- **Prompt language**: Always send prompts to g-image-2 in English
- **Style baseline**: User selects from 6 preset styles in Phase 1 (details in `references/style-dictionary.md`); if not selected, ask; if still undecided, default to "S2 Cinematic Realism" (photo-grade cinematic frames)
- **Layout principle**: No fixed quadrant grid — flexibly arrange based on character count, panel count, and scene complexity; let g-image-2 decide the overall document proportions and section shapes; just ensure all content modules are included
- **Panel count**: Default 3 rows × 4 columns = 12 panels; adaptive to actual shot count (≤6 panels use 2×3; ≥16 panels split into two sheets)

## Global Conventions

- All intermediate files stored in `./.character-storyboard-sheet/{project_name}/`
- Display results in conversation after each phase, continue after user confirmation
- User can request modifications at any phase
- Prompts always use English

## Workflow

```
Input Parsing & Confirmation → Information Extraction (Characters/Scene/Storyboard) → Comprehensive Design Sheet Generation (g-image-2) → Quality Self-Check → Delivery
```

## Reference Materials

Read on demand (avoid loading everything into context at once):

| File | Purpose | When to read |
|------|---------|--------------|
| `references/style-dictionary.md` | Complete visual rules and keywords for 6 preset styles | After user confirms style in Phase 1 |
| `references/brief-template.md` | brief.md output template | When writing brief in Phase 1 |
| `references/prompt-template.md` | g-image-2 prompt template + shot type table + 12-panel rhythm suggestions | When building prompt in Phase 2 |

---

## Phase 1: Input Parsing & Confirmation

### Required Inputs

| Input | Required | Description |
|-------|----------|-------------|
| Character reference images | Yes | 1–4 images, each corresponding to a main character; full-body or bust shots accepted |
| Script / Scene description | Yes | Can be natural language, shot list, or dialogue + action descriptions |
| Style preference | Optional | E.g., "cinematic feel," "traditional Chinese," "color pencil sketch"; if not provided, auto-inferred from reference images |
| Target panel aspect ratio | Optional | Aspect ratio inside storyboard panels (16:9 / 9:16 / 1:1), default 16:9 |

### Process

1. Use `hub_read` (media mode) to read each character reference image, extracting:
   - Name (if not provided by user, name as "Character A/B/C")
   - Gender, age group, hairstyle and hair color
   - Facial features (glasses/beard/makeup etc.)
   - Outfit style and colors
   - Body type and posture
   - Base expression and demeanor

2. Parse the script, extracting:
   - Scene environment (indoor/outdoor, period setting, lighting atmosphere)
   - Shot count and shot types (ECU / CU / MS / WS etc.)
   - Core action and emotion for each shot
   - Character relationships and core psychological conflict

3. Write parsed results to `./.character-storyboard-sheet/{project_name}/brief.md` (see format template)

4. Confirm the following with the user in conversation (**do not assume, must confirm**):
   - **Overall visual style**: List the 6 presets from `references/style-dictionary.md` for selection; if user hasn't specified, present the options
   - **Panel aspect ratio** (16:9 landscape / 9:16 portrait / 1:1 square), default 16:9
   - **Additional style keyword overlay** (optional, personal preference descriptions layered on top of the preset style)
   - **Whether to expand the scene concept art separately** (default included within the scene module)

### Style Selection

Complete visual rules, keywords, and overlay usage for the 6 preset styles (S1 Vintage Color Pencil Sketch / S2 Cinematic Realism (default) / S3 Black & White Sketch / S4 Ink Wash Traditional Chinese / S5 Western Comic / S6 2D Anime) are in **`references/style-dictionary.md`**.

After confirming the style, copy the corresponding row's `Document base color / Character illustration / Scene concept / Storyboard panel / Keywords` fields from that file, and fill them into `references/prompt-template.md` placeholders.

### Brief File Format

Full template in **`references/brief-template.md`**. Write Phase 1 extracted project info, character profiles, scene profiles, and storyboard list into `./.character-storyboard-sheet/{project_name}/brief.md` following that template.

---

## Phase 2: Comprehensive Design Sheet Generation (g-image-2)

### Document Layout Strategy (Adaptive, no fixed quadrant grid)

The core layout principle: **Content determines structure, not structure constraining content.** Dynamically choose the most suitable section arrangement based on actual input (character count N, shot count S, whether there's a complex scene), and explicitly tell g-image-2 in the prompt.

#### Layout Decision Flow

**Step 1: Count content modules**

| Module | Condition | Space estimate |
|--------|-----------|---------------|
| Character design section × N | One section per character | Each takes 1 share |
| Scene concept section | When scene description exists | Takes 1–1.5 shares (more for complex scenes) |
| Storyboard panel section | Always present | Takes 1.5–2 shares when panel count is high |

**Step 2: Choose framework based on total module count**

| Total Modules | Recommended Framework | Typical Example |
|---------------|----------------------|-----------------|
| 3 (1 character + scene + storyboard) | Horizontal three-column or L-shape | Character wide column on left, scene + storyboard stacked on right |
| 4 (2 characters + scene + storyboard) | 2×2 grid | Most classic, each occupying one cell |
| 5 (3 characters + scene + storyboard) | Top three-column + bottom two-column | Three characters in a row at top, scene + storyboard at bottom |
| 6 (4 characters + scene + storyboard) | Top four-column + bottom two-column | Four characters in a row at top, scene + storyboard at bottom |
| Storyboard ≥ 16 panels | Characters + scene in upper half, storyboard alone in lower half | Storyboard area needs more vertical space |
| Extremely complex scene (multi-scene/multi-timeline) | Scene section spans full width | Scene section stretches across full width, characters and storyboard above and below |

**Step 3: How to write layout instructions for g-image-2**

- **Do not** hardcode grid positions in the prompt (❌ "put A in top-left, B in top-right")
- **Do** describe each module's relative weight and content priority, letting the model arrange itself (✅ "Character sheets for A, B, C should each have roughly equal space; the storyboard grid needs the most vertical space since it has 15 panels; the scene concept gets a medium-sized area")
- Explicitly state **which module has the most content**, giving it more area

#### Layout Reference Examples by Scenario

**1 character + simple scene + ≤8 shots:**
```
Suggest telling the model: Character design section needs ample space for three-view lineup + portrait + expressions;
Scene section medium size; Storyboard section medium size. Three sections can be arranged horizontally or in L-shape.
```

**2 characters + scene + 12 shots (this interrogation room case):**
```
Suggest telling the model: Two character design sections each occupy upper left and right;
Scene concept and storyboard each occupy lower left and right; classic grid layout.
```

**3 characters + scene + 15 shots:**
```
Suggest telling the model: Three character design sections in a row across the top 1/3;
Scene concept in bottom left; Storyboard in bottom right and needs more vertical space (15 panels).
Top three-column + bottom two-column five-section layout.
```

**4 characters + multi-scene + 20 shots (requires splitting into two sheets):**
```
Sheet 1: Four character design sections + Scene concept (4+1 = five sections total)
Sheet 2: Standalone high-resolution storyboard (20 panels, 4×5 grid)
Generate separately, inform the user.
```

### Content Specifications for Each Section

#### Character Design Section (Per Character)

Each character design section must include:

1. **Section title bar** (black background, white text): `{Character Name} {ROLE NAME} · CHARACTER SHEET`

2. **Three-view lineup** (top row, small full-body images):
   - Front (FRONT)
   - Side (SIDE)
   - Back (BACK)
   - Label each view with orientation text below

3. **Main portrait** (center large image, chest-up 3/4 angle bust shot):
   - Facial features clearly visible
   - Outfit details readable
   - Expression shows the character's base demeanor

4. **Expression variants** (4 circular icons, vertical or horizontal):
   - Designed based on script emotions (e.g., calm/alert/shocked/angry)
   - Each icon has a Chinese emotion label below

5. **Detail section** (prop/feature close-ups):
   - Labeled "Detail Breakdown / DETAILS"
   - Character-specific prop or outfit close-ups (e.g., weapon/accessory/signature details)

6. **Character relationship note** (optional, small text at bottom):
   - One-sentence description of relationship with other characters

#### Scene Concept Section (Bottom Left)

1. **Section title bar** (black background, white text): `SCENE CONCEPT · {Scene Name}`

2. **Atmospheric concept illustration** (occupies main area):
   - Rendered according to the script's environmental settings
   - Lighting treatment consistent with overall style
   - May include approximate silhouette positions of script characters
   - Aim to show depth and spatial tension

3. **Color palette strip** (bottom, 5 color blocks):
   - 5 color blocks, each labeled with hex color value
   - Arranged from dark to light, left to right

4. **Lighting scheme text note** (small text at bottom):
   - One line describing light source direction, contrast, and atmosphere

#### Storyboard Panel Section (Bottom Right)

1. **Section title bar** (black background, white text): `STORYBOARD · {Scene Title}`

2. **Storyboard panel grid**:
   - Each panel from top to bottom: **Shot number label** + **Illustration** + **Caption text**
   - Shot number label: small white text tag in top-left corner, format `Shot 01 | Shot Type | Time Period`
   - Illustration: composed at {panel_ratio} aspect ratio, **rendering style matches the style confirmed in Phase 1** (see `references/style-dictionary.md` corresponding row's "Storyboard panel" field: S2 uses photo-grade cinematic frames, S5 uses halftone dots, S6 uses anime bold borders, S1 uses color pencil sketches, S3 uses gesture lines, S4 uses light ink wash)
   - Caption text: small text description at bottom, font style follows the selected style's title bar color scheme

3. **Storyboard art style requirements** (specific art details determined by selected style; here only **universal composition principles**):
   - High contrast, clear shadow/highlight relationships
   - Rich shot type variation (wide shot/medium shot/close-up alternating)
   - Key frames emphasize psychological tension (close-up on eyes, hand movements, light reflections)
   - **Do not arbitrarily switch to black & white sketch** — if S2 Cinematic Realism is selected, use photo-grade color cinematic frames; if S6 2D Anime, use cel-shading + vivid flat colors; if S5 Western Comic, use halftone dots + bold borders; if S4 Ink Wash, use light ink wash; if S1 Vintage Color Pencil, use colored pencil strokes; only S3 uses pure black & white sketch

### Prompt Construction Template

Complete g-image-2 prompt template, placeholder filling rules, and notes on adjusting the NEGATIVE section per selected style are in **`references/prompt-template.md`**.

Must read before constructing:
- Style-related fields (`{STYLE_*}`) are copied from the selected row in `references/style-dictionary.md` — all five items must be used as a set, no cross-style mixing
- Layout instruction `{LAYOUT_INSTRUCTION}` describes each module's **relative weight**, no fixed coordinates
- NEGATIVE section must be adjusted per style (when S6 2D Anime is selected, don't prohibit `color anime style`; when S5 Western Comic, don't prohibit `halftone`; when S2 Cinematic Realism, don't prohibit `photorealistic`)
- `{panel_ratio}` is the aspect ratio inside storyboard panels, unrelated to the overall document ratio — document ratio is left for g-image-2 to decide

### Storyboard Panel Description Construction Rules

Each panel description must include: Shot number (PANEL 01), shot type (WS/MS/CU/ECU etc.), visual content (subject + action + direction + position), emotion annotation, Caption text (Chinese, ≤ 15 characters).

Complete shot type quick reference (EWS/WS/MWS/MS/MCS/CU/ECU with Chinese-English labels) and 12-panel rhythm suggestions are in **`references/prompt-template.md`** under the "Storyboard Panel Description Construction Rules" section.

### Generation Call

- Use image agent (g-image-2)
- Pass all character reference image paths via `image_paths`
- Single generation pass, no splitting

### Quality Self-Check

After generation, use `hub_read` to self-check the design sheet with this question:

```
Check this comprehensive design sheet for:
1. LAYOUT: Are all expected content modules present and clearly divided with title bars? Is there a document header? Does the layout make efficient use of space (no huge blank areas, no cramped sections)?
2. CHARACTER SHEETS: Does each character module have — three-view lineup, a large portrait bust, 4 expression badges, and a details/props section?
3. CHARACTER CONSISTENCY: Do all character illustrations across the document match the appearance described (hair, glasses, outfit, facial features)?
4. SCENE CONCEPT: Is there an atmospheric scene illustration with a color palette strip and lighting notes?
5. STORYBOARD: Are ALL expected panels present (count them) with shot number labels, illustrations, and caption text? Are panels composed for the specified aspect ratio?
6. STYLE CONSISTENCY: Is the selected visual style ({STYLE_NAME}) applied consistently across ALL modules — character drawings, scene concept, storyboard panels, document background, title bars? Are there any areas where the style feels inconsistent or defaults to a different aesthetic?
7. DOCUMENT STYLE: Does the overall look match a professional pre-production design sheet with the correct background color, title bar colors, and divider style for the chosen style?
8. SPACE EFFICIENCY: Does the storyboard region have enough space for all its panels? Do character regions feel appropriately sized — not too cramped, not wastefully large?
Report any missing elements, style inconsistencies, cramped areas, or quality issues.
```

If any criterion is not met → Adjust the prompt targeting the issue and regenerate (up to 2 times).

### File Storage

```
./.character-storyboard-sheet/{project_name}/
├── brief.md          # Parsed summary
└── design-sheet.png  # Comprehensive design sheet (main output)
```

---

## Phase 3: Delivery & Iteration

### User Confirmation

After displaying the design sheet, ask:
- Which section needs adjustment? (Character resemblance / Storyboard panel content / Scene atmosphere / Overall style)
- Whether to expand any section independently (e.g., generate standalone high-res character illustrations or scene concept art)

### Common Iteration Directions

| User Feedback | Handling Approach |
|---------------|-------------------|
| Character face doesn't match reference | Strengthen facial feature descriptions in prompt, add phrasing like `strictly match face from reference image(8).png` |
| Storyboard panels too small to see | Suggest to user: can generate high-res versions of specific panels separately using g-image-2 + that panel's description |
| Scene atmosphere is off | Refine light source direction, color tone, and architectural element descriptions in the scene prompt |
| Expression variants are inaccurate | Describe each expression individually in the prompt (e.g., "eyebrows furrowed, eyes wide, mouth slightly open in shock") |
| Text too small / garbled | Reduce caption text per panel to ≤ 10 characters, use bolder font descriptions |
| Want to change the 4th section to something else | Flexibly adjust: e.g., replace with character relationship diagram, weapon/prop gallery, color reference page, etc. |

### Extended Capabilities (When requested by user)

- **Generate video**: Hand the design sheet to `director-storyboard` skill for video production
- **High-res single panel export**: Separately enlarge a specific storyboard panel using g-image-2
- **Character illustration expansion**: Generate the character design section as a standalone high-precision illustration (hand off to `film-shot` skill)

---

## Final Output

```
--- Character Scene Comprehensive Design Sheet Complete ---

Project: {project_name}
Character count: {N}
Storyboard panels: {shot_count} panels
Panel aspect ratio: {panel_ratio}

Main output: ./.character-storyboard-sheet/{project_name}/design-sheet.png
```

---

## Error Handling

| Error | Handling Approach |
|-------|-------------------|
| g-image-2 unavailable | Inform user, wait for recovery, do not downgrade to other image models |
| Character reference image read failure | Check path, use `hub_save_file_to_session` to copy to session directory and retry |
| A content module is missing | Bold-emphasize each module in the prompt, annotate "DO NOT omit this section" |
| Chinese text garbled / unreadable | Simplify caption to pure English or very short Chinese (≤ 6 characters); use larger labels for titles |
| Character face differs significantly from reference | List key facial features one by one in the prompt, add `must strictly resemble reference` constraint |
| Insufficient storyboard panels | Explicitly annotate in the prompt: `{N} panels total, numbered 01 to {N}, none can be missing` |
| A module's space is too small / compressed | Explicitly state that module's priority and relative weight in the layout instruction, e.g., `the storyboard region must be the largest area` |
| Too many characters to fit in one sheet | Split into two sheets: first sheet has all character designs + scene, second sheet has the complete storyboard |

## Anti-Pattern Warnings

- ❌ Do not output multiple separate images — must be a single comprehensive document image (exception when content is truly too much, inform the user)
- ❌ Do not fabricate character appearances without character reference images
- ❌ Do not skip `hub_read` character extraction and jump straight to prompt assembly — critical details will be lost
- ❌ Do not assume panel aspect ratio without user confirmation
- ❌ Do not generate directly without user specifying a style — must present the 6 style options for user selection (or auto-match the closest preset when user has clearly described a style)
- ❌ Do not mix two different visual styles in the same design sheet — character sections, scene sections, and storyboard sections must all use the same set of style keywords
- ❌ Do not downgrade to other image models when g-image-2 fails
- ❌ Do not confuse "storyboard panel aspect ratio" with "overall design sheet document ratio" — the former is explicitly specified in the prompt, the latter is left for g-image-2 to decide
- ❌ Do not skip the quality self-check step — missing modules, missing panels, character distortion, style drift, and similar issues must be caught and corrected through self-checking
- ❌ Do not use "put X in top-left / bottom-right" fixed coordinate descriptions for layout in the prompt — describe each module's relative weight and content needs, let the model arrange itself
- ❌ Do not severely compress any module to unreadable levels just to fit everything into one image — better to split into two sheets than sacrifice readability
