---
name: vinyl-print-graphics
description: |
  Generate flat, vector-compatible artwork that can be executed on physical cutting machines (HTV, Cricut, Silhouette, CNC laser) or manual silkscreen presses. Input is a subject description; output is a solid-ink, high-contrast graphic (with model routing, prompt scaffolding, and constraint blocks) that survives plotter cutting and weeding without breaking apart.
  Use whenever the user wants to design apparel graphics for vinyl or HTV, create stencils or silkscreen artwork, cut plotter-ready shapes, or produce single-color print designs that are guaranteed to be weedable.
trigger-words: [vinyl, HTV, Heat Transfer Vinyl, Cricut, Silhouette, plotter, cutter, silkscreen, screen printing, stencil, linocut, woodblock print, 丝网印刷, 刻绘, 刻字, T恤图案]
allowed-tools: [question, hub_generate_image, hub_save_file_to_session]
---

# Vinyl, Silhouette/Cricut Plotter & Silkscreen Design Guide

Workflow for producing flat, vector-compatible artwork engineered to survive physical cutting (vinyl plotters, HTV, Cricut, Silhouette, CNC laser) or manual silkscreen printing.

Trigger the skill whenever the user's request mentions **HTV / Heat Transfer Vinyl / vinyl / plotter / cutter / Cricut / Silhouette**, **silkscreen / screen printing / sérigraphie / manual print / ink press**, or **stencil / stamp / linocut / woodblock print** for a standalone apparel/print graphic.

## Core Operational Directives

### The Hard Vector-Compatible Rule

Physical vinyl cutting and silkscreening require **flat, connected areas of solid ink**.
- **Backgrounds**: ALWAYS specify a `flat, solid, plain white background` or `solid black background`. The background must never contain any textured paper grain, drop shadows, fabric mockups, or model figures.
- **Ink / Graphic Representation**: Specify `solid pure black artwork`, `high contrast monochrome vector graphic style`, or `flat 2D silhouette design`.
- **Zero Thresholding Room**: Tell the model: `no grays, no colors, no gradients, no shading, no drop shadows, no t-shirt mockup, no fabric texture, no photorealism`.

### Weeding & Line-Weight Safeguards

When vinyl designs are cut, a human must "weed" the waste vinyl. Lines that are too thin, detached, or consist of tiny floating dust particles will tear, shift, or fail to adhere.
- **Stroke Weight**: Command `thick clean lines, bold geometric solid paths, high contrast silhouettes`.
- **Structural Integration**: If a design is intricate (like radiating spoked lines, op-art meshes, or high-contrast grids), instruct the model to: `make paths continuous, avoid floating dust particles, widen fine lines for clean cuts, ensure lines are thick enough to cut and weed`.

---

## Workflow

### Step 1: Collect the design brief

Call `question` to gather any missing pieces before spending credits:

- question: "What is the core subject of the graphic?" (free-form, single line)
- question: "Does the design require crisp typography, numeric coordinates, or geometric axes/grids?", options: ["Yes — typography or geometry critical", "No — organic / illustrative", "Modifying an existing uploaded reference"]
- question: "Target aspect ratio?", options: ["1:1 square", "2:3 vertical (chest print)", "3:4", "16:9 landscape"]

Skip a question if the user already answered it inline.

### Step 2: Route to the right model

Choose vendor + model from the answer in Step 1:

| User answer | vendor | model | quality | resolution |
|---|---|---|---|---|
| Typography / geometry critical | `openai-image` | Imagen-class (highest available) | `high` | `2k` |
| Organic / illustrative | `nano-banana` | edit-class | — | `2k` |
| Modifying uploaded reference | `nano-banana` | edit-class | — | `2k` |

**Never** downgrade resolution — low-res raster destroys downstream vectorization and makes weeding impossible.

### Step 3: Construct the prompt using the four-pillar scaffold

Assemble the prompt from these four blocks in order:

1. **Subject**: The core element (e.g. optical sphere, anatomical hands holding a rose, a minimalist botanical outline).
2. **Style**: Monochrome vector, flat 2D screenprint motif, high-contrast silhouette, op-art bold line art.
3. **Instructions**: Grid placement, border containment, typography rendering. Specify line strength: `Ensure all black lines are thick, bold, and continuous so they are vector-plotter ready.`
4. **Constraints (always paste verbatim)**: `Absolutely no colors, no shades of gray, no gradients, no shadows. Background must be a solid, featureless pure white sheet. No mockup. No stippling, no screentones, no halftones. All elements connect to a main central structure. No garment mockup, no t-shirt mockup, no human model, flat scan design only.`

Example scaffold:

```text
[Subject]: A minimalist 2D industrial graphic. Centered is [insert core subject].
[Style]: High-contrast monochrome vector style, clean flat black ink and pure white space.
[Instructions]: Bold and distinct geometric linework. A thin vertical structural axis runs alongside the element. Include precise, clean monospaced text reading: "[exact text]" underneath.
[Constraints]: Absolutely flat scan. Plain solid white screen background. No color, no gray, no halftones, no t-shirt mockup, no model, no shadows. All lines must be thick, continuous, and robust for plotter cutting and vinyl weeding.
```

### Step 4: Generate the graphic

Call `hub_generate_image` with:
- vendor: from Step 2
- model: from Step 2
- prompt: the four-pillar scaffold from Step 3
- aspect_ratio: from Step 1
- resolution: `2k`
- (if user provided a reference image) medias: `[{ role: "image", data: { id: "<upload_id>", type: "media_input" } }]`

### Step 5: QA against the pitfalls table

Inspect the result against this table before delivering:

| Pitfall | Cause | Fix (regenerate) |
|---|---|---|
| Fuzzy / pixelated typography | Model settings blur small letters | Re-run Step 4 with Imagen-class model + `quality: high` |
| Gradients or halftones | Stylized model uses stippling | Re-run Step 4 with `absolutely no stippling, no screentones, no halftones, no tiny dots, solid black shapes only` reinforced in prompt |
| Separated floating specks | Disconnected elements fall off during vinyl transfer | Re-run Step 4 with `ensure all elements connect to a main central structure / axis / line` |
| Fabric / T-shirt mockup | Model places graphic onto garment | Re-run Step 4 with `no garment mockup, no t-shirt mockup, no human model, flat scan design only` |

If any pitfall shows up, loop back to Step 4 with the corrected prompt.

### Step 6: Register the deliverable

For each accepted image, call `hub_save_file_to_session` with:
- file: the returned image path/URL
- file_type: `image`

So the user can pull it into their plotter workflow (Cricut Design Space, Silhouette Studio, etc.).

## Notes for Hub adaptation

- All image generation goes through `hub_generate_image` — route to an Imagen-class model for typography / geometry, and a Nano-Banana-class edit model for organic / hand-drawn linework or when the user has an uploaded reference to redirect.
- Request `resolution: 2k` (or the highest supported) so the output survives downstream vectorization; low-res raster kills weeding.
- Register the finished PNG via `hub_save_file_to_session` (`file_type: image`) so the user can pull it into their plotter workflow (Cricut Design Space, Silhouette Studio, etc.).
- The skill never touches the physical cutter — plotter cutting, weeding, and HTV pressing are downstream manual steps for the user.
- Reinforce the constraint block (`no gradients, no halftones, no mockup, no fabric texture`) in every prompt; models will drift back to photorealistic mockups without it.
