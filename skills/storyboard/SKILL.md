---
name: storyboard
description: |
  N-grid storyboard generator. Based on a user-provided story document or description,
  first breaks it down into a shot-by-shot storyboard table, then calls AI to generate N-grid storyboard images.
  Supports reading script documents (docx/txt) for automatic shot breakdown, as well as direct story description input.
  Supports 2x2, 3x3, 4x4, 5x5 and other grid layouts; per-cell aspect ratio is customizable (default 16:9).
  Trigger words include: storyboard, story board, storyboard, N-grid, nine-grid, four-grid, grid storyboard,
  shot breakdown, shot breakdown, shot breakdown, draw a storyboard, help me break down shots,
  make a storyboard, visual script.
  Not for: complete documentary/educational video generation (use documentary skill),
  character turnaround/expression sheets (use film-tv skill), video editing compositing.
---

# N-Grid Storyboard

Break down a story or screenplay into a shot-by-shot storyboard table and generate N-grid storyboard images.

## STEP 1: Collect Story Source

Determine the story input method from the user's message:

1. **Document input** — The user provided a docx/txt or similar script document → Read the document content
2. **Direct input** — The user described the story directly in conversation → Use as-is

If the user provided a document, after reading it offer 3 choices:

| Option | Description |
|--------|-------------|
| First 9 shots · 3x3 | Select the first ~9 key shots from the beginning of the story; generate a 3x3 nine-grid |
| First 16 shots · 4x4 | Select the first ~16 key shots from the beginning of the story; generate a 4x4 sixteen-grid |
| User picks an episode · auto-select shots | User specifies a particular episode/chapter; AI selects core shots |

If the user input the story directly (not a document), ask:
- **Grid size**: 2x2 / 3x3 / 4x4 / 5x5 (default 3x3)
- **Aspect ratio**: Per-cell width-to-height ratio (default 16:9)

## STEP 2: Shot Breakdown (Shot List)

Based on the selected story content, break it down into a shot-by-shot storyboard table, presented as a Markdown table.

**Shot Table Format**:

| Shot | Shot Scale | Visual Description | Corresponding Script Dialogue |
|:---:|:---:|---|---|
| 1 | Wide / Close-up / Medium / Close, etc. | Character position (including cardinal direction N/S/E/W), pose, costume, action, lighting | Character (emotion): "Dialogue" or None |

**Breakdown Rules**:

1. **Shot scale labels** — Label each shot with its scale (wide / medium / medium close / close / extreme close-up), with optional camera movement notes (low angle / high angle / static / push in / pull out)
2. **Spatial orientation** — Use cardinal directions (E/W/S/N) for character positions, describing facing direction and relative positions
3. **Establishing shot rule** — When transitioning scenes or establishing environments, start with an establishing shot (dialogue = "None") to set up spatial context, since a single image cannot simultaneously convey environmental information and character interaction; separating them gives each shot a clear purpose
4. **Costume and state** — Fully describe costume and appearance for a character's first appearance; for subsequent shots, note only changes in state
5. **Lighting description** — Each shot includes a lighting/environment atmosphere description
6. **Dialogue format** — `Character (emotion tag): "Dialogue content"` or `None` (establishing shot / pure action shot)

After breakdown, write the shot table as a Markdown table into a canvas text node and display it for user confirmation.

**⏸ Wait for user to confirm the shot table before continuing.**

## STEP 3: Ask About Reference Materials

Before generating storyboard images, ask the user if they have reference materials (multiple selections allowed):

| Material Type | Description | Purpose |
|--------------|-------------|---------|
| Reference images | Style reference, mood reference, art style reference | Control overall visual style, color palette, art style |
| Character reference | Character illustrations, character photos, character turnarounds | Maintain character appearance consistency |
| Scene reference | Scene concept art, location photographs | Maintain scene environment consistency |
| No reference materials | Let AI freely determine the style | — |

If the user provides reference materials:
- Obtain from canvas or from user-uploaded file paths
- Use `read_media` to analyze the visual features of the reference materials and extract style keywords
- Pass all reference material file paths to subsequent generation steps

## STEP 4: Generate Storyboard Prompts

Call the `text_generation` tool, inputting STEP 2's shot table + STEP 3's reference material analysis results to generate structured storyboard JSON.

System Prompt template → `references/panel-prompt-system.md`

**Call parameters**:
- `model`: `gemini-2.5-pro`
- `prompt`: Fill the shot table into the template's `{{prompt}}`, grid settings JSON into `{{grid_setting}}`
- `images`: If reference materials exist, pass the reference image path list
- `response_format`: `json_object`

The returned JSON contains `panels` (per-cell descriptions) and `overall_prompt` (overall composite prompt).

## STEP 5: Generate N-Grid Storyboard Image

Extract the `overall_prompt` field from the STEP 4 JSON and call `nano_banana_image_generation` to generate the storyboard image.

**Specified model**: `nano_banana_2` (Gemini 3 Pro, best quality for grid images, currently the only reliable model for generating multi-panel storyboards).

**Prompt construction**: Prepend grid layout instructions before `overall_prompt`:

```
Generate a {rows}x{cols} grid storyboard image. The grid has {rows} rows and {cols} columns. Each cell represents a sequential scene panel with {cell_ratio} aspect ratio. Arrange the panels left-to-right, top-to-bottom. Add thin white borders between panels for clear separation.

{overall_prompt}
```

**Parameters**:
- `model`: `nano_banana_2`
- `reference_images`: Pass user's reference images (if any)
- `aspect_ratio`: Calculate based on grid and cell_ratio (same row/column count grid's overall ratio = single cell ratio)
- `resolution`: `high` (high resolution to ensure per-cell detail clarity)

**Ratio calculation reference**:

| Grid | Cell Ratio | Overall Ratio |
|------|-----------|---------------|
| NxN (2x2/3x3/4x4/5x5) | 16:9 | 16:9 |
| NxN | 9:16 | 9:16 |
| NxN | 1:1 | 1:1 |

> For same-ratio grids, overall ratio = cell ratio. When row and column counts differ (e.g., 2x3), calculate separately.

## STEP 6: Output Results

Present three parts to the user:

1. **Shot Breakdown Table** — The shot table generated in STEP 2 (already on canvas)
2. **Storyboard Prompts** — The JSON from STEP 4, formatted to display style_profile and each panel's description
3. **N-Grid Storyboard Image** — The image generated in STEP 5

Display format:

```
## Storyboard

### Style Analysis
{reference_analysis}

### Unified Style
{style_profile}

### Shot Descriptions
| Position | Description |
|----------|-------------|
| (0,0) | {panel_description} |
| (0,1) | {panel_description} |
| ... | ... |

### Storyboard Image
[Generated N-grid image]
```

## Notes

- All AI-generated prompts are in English; user interaction is in Chinese
- Reference images are the supreme authority for style — shot content must adapt to the reference image's style, as maintaining visual consistency is the core value of storyboards
- Character reference images are the supreme authority for character appearance — all panels containing that character must be consistent with the reference, ensuring viewers can recognize the same character across shots
- Each panel description is self-contained and can independently serve as an image generation prompt
- Establishing shots should emphasize environment and atmosphere description in the panel description
