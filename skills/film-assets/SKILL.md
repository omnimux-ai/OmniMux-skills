---
name: film-assets
description: |
  Film and TV production asset toolkit. Triggered when the user mentions character card, character three-view, four-view, eight-view, character expression sheet,
  character reference image, turnaround view, full-body image, multi-pose composite, character poses, prop view, prop three-view,
  weapon view, object reference image, scene concept art,
  environment design, scene mood board, scene reference, scene design.
  Automatically asks about output method (single composite/separate images), desired expressions/poses/quantity, background style,
  then batch-generates corresponding character views, expression sheets, pose sheets, prop views, or scene concept art.
  Prop/object multi-views support automatic aspect ratio and layout based on prop shape.
  Scene concept art supports multi-angle framing (four-view/eight-view), time-of-day lighting variants,
  weather/season variants, and character-scene integration references.
  Not for: video generation, voiceover, final cut editing, logo design.
  Trigger words include: character card, character sheet, three-view, four-view, eight-view, turnaround, character expression,
  character reference, character sheet, character card, expression sheet,
  character reference, full-body character, multi-pose, pose sheet, pose sheet,
  prop view, prop three-view, prop four-view, weapon view, object reference, prop sheet,
  scene concept art, scene design, environment design, scene mood, scene concept, concept art,
  environment design, scene reference, location design, scene lighting.
trigger-words:
  - character card
  - character sheet
  - three-view
  - four-view
  - eight-view
  - turnaround
  - character expression
  - character reference
  - expression sheet
  - full-body character
  - multi-pose
  - pose sheet
  - prop view
  - prop three-view
  - prop four-view
  - weapon view
  - object reference
  - prop sheet
  - scene concept
  - scene design
  - environment design
  - scene mood
  - concept art
  - location design
  - scene lighting
---

# Film Assets Skill — Character References, Prop Multi-Views & Scene Concept Art

This Skill contains three modules:
- **Module A**: Character references (views / expressions / poses / character cards) → STEP A1–A5
- **Module B**: Scene concept art (multi-angle / lighting variants / weather-season / character integration) → STEP B1–B5
- **Module C**: Prop/object multi-views (adaptive aspect ratio / camera orbit) → STEP C1–C5

After identifying user intent, enter the corresponding module.

---

## Boundary Guard

This Skill's capability scope is limited to **static image asset generation**, specifically:
- ✅ Character multi-views / expression sheets / pose sheets / character cards
- ✅ Prop/object multi-views (three-view / four-view)
- ✅ Scene concept art (multi-angle / lighting variants / weather-season / character integration)

The following tasks are **outside this Skill's scope**:
- ❌ Video generation / animation / video editing
- ❌ Voiceover / music / sound effects
- ❌ Logo / UI / graphic design
- ❌ Further processing generated images into video or other non-image outputs

**Trigger conditions**: When any of the following conditions are met, issue a notice to the user and wait for confirmation before proceeding:
1. All STEPs in the current module have been completed, and the user's next instruction doesn't belong to any of this Skill's three modules
2. The user's instruction explicitly involves tasks from the ❌ list above
3. The user's instruction is unrelated to this Skill (e.g., writing code, looking up information, casual chat)

**Notice template**:
> The "Film Assets" Skill task is complete. This Skill only covers character reference image, prop multi-view, and scene concept art generation steps — it does not include [the capability the user requested, e.g., video generation/voiceover/editing] steps. Subsequent operations will not be governed by this Skill. Continue?

⏸ Wait for user confirmation before executing subsequent instructions.

---

# Module A: Character References

Covers three-view, four-view, eight-view (turnaround), character cards, expression sheets, and multi-pose sheets.

---

## STEP A1: Determine Sub-type and Collect Configuration

Determine sub-type based on user description, and collect necessary configuration via Q&A in one pass:

| User mentions | Sub-type | Need to ask |
|---------------|----------|-------------|
| Three-view | Views | Output method |
| Four-view | Views | Output method |
| Eight-view / Turnaround | Views | Output method |
| Character card | Character card | (Fixed layout, no additional config needed) |
| Expression / Expression sheet | Expression | Output method + desired expressions |
| Multi-pose / Pose sheet / pose sheet | Pose | Output method + pose count + pose style |

**Output method (shared across views/expressions/poses):**
- **Single image mode**: All angles/expressions/poses composited into one image (recommended, ideal for reference use)
- **Multi-image mode**: Each angle/expression/pose generated as a separate image (ideal for per-image adjustments)

**Expression options** (only ask for expression sub-type, multi-select):
Indifferent / Smile / Contempt / Anger / Surprise / Laughing / Pensive / Sad / Shy

**Pose configuration** (only ask for pose sub-type):
- Count: 4 (2×2) / 6 (2×3) / 9 (3×3, recommended)
- Style: Smart recommendations based on character appearance (see STEP A3)

**Background style:**
- Solid color background (white/light gray) — recommended
- Minimal line decoration
- Professional studio gray background

⏸ Wait for user response before continuing.

---

## STEP A2: View Angle Definitions

> **Global viewing angle constraint**:
> Eye-level straight-on shot, camera height aligned with the character's waist to chest level. No overhead or low-angle shots.
> Normal human proportions, head-to-body ratio consistent with real human anatomy. No exaggerated stretching or shrinking.

### Three-View (1×3 horizontal row)

Front full-body → Side full-body → Back full-body

### Four-View (1×4 horizontal row)

Front full-body → Side full-body (90°) → Camera orbits to another different side (90°) → Back full-body

> **Side view prompt specification (critical):**
> - Second panel described as "Side Profile View" — do not specify left or right direction
> - Third panel described as "The lens orbits to another different side of the character, showing a completely different side profile" — use camera movement language to describe spatial displacement
> - **Prohibited**: left / right / mirror / mirrored or any symmetrical direction words
> - **Rationale**: AI models have weak understanding of "left/right" symmetrical semantics, often generating mirrored copies of the same view. Using camera physical movement in dynamic descriptions produces genuinely different side angles

### Eight-View (2×4 grid, simulating 360° turnaround)

| # | Angle | Description |
|---|-------|-------------|
| 1 | Front | Fully facing the viewer |
| 2 | Right 45° | Slightly turned right from front |
| 3 | Right 90° | Character's right side profile |
| 4 | Right 135° | Near back, visible right posterior |
| 5 | Back | Fully facing away from viewer |
| 6 | Left 135° | Near back, visible left posterior |
| 7 | Left 90° | Character's left side profile |
| 8 | Left 45° | Slightly turned left from front |

> Eight-view requires character identity (face, outfit, hairstyle, hair color) to be highly consistent across all 8 images.

### Character Card (Fixed layout)

Landscape 16:9 single image, dark gray solid background, no ground line, no decorative elements:
- **Left side (~1/3)**: Full-body front standing pose
- **Vertical black divider line**
- **Right side (~2/3)**: 3 head close-ups arranged horizontally (front face / one side / the other side)

> Prompts do not use "left/right" to describe facial orientation — use "one side" / "the other side" instead.
> Do not add any text labels.

---

## STEP A3: Sub-type Specific Standards

### Expression Sheet

- Single image mode: ≤7 expressions use 4+3 grid, ≥8 use 4+4 or three-row layout
- Each panel is a bust shot (head + shoulders), solid color background
- Describe each expression's muscle state in the prompt (eyebrow shape, eye type, mouth corner direction)
- Character base appearance must remain consistent across all expressions

### Pose Sheet

**First analyze the character's appearance, then provide smart pose style recommendations** (place the best match first, marked "Recommended"):

| Character Traits | Recommended Style | Typical Actions |
|-----------------|-------------------|-----------------|
| Business suit / Formal wear | Professional formal | Standing pose, hands on hips, holding documents, hands behind back |
| Sportswear | Athletic dynamic | Sprint start, jumping, stretching, dribbling |
| Casual wear | Casual candid | Hands in pockets, leaning on wall, sitting on steps, looking back |
| Hanfu / Period costume | Classical elegance | Fist-palm salute, holding fan, looking back, lifting skirt |
| Uniform | Professional scene | Saluting, executing tasks, operating tools |
| Formal gown | Elegant poise | Dress display, side turn looking back, holding flowers |
| School uniform | Youthful energy | Carrying backpack, running, between-class interactions |

Pose prompts should describe: starting state of the action, hand positions, head direction, center of gravity lean, demeanor keywords (powerful/elegant/candid/dynamic).

---

## STEP A4: Generation Parameter Standards

| Parameter | Standard |
|-----------|----------|
| **Model restriction** | **Only Banana and image2 are allowed, fallback to other models is prohibited** |
| Style | Maintain consistency with character source image (realistic/anime/3D); default to realistic if unspecified |
| Lighting | Soft studio lighting |
| Quality modifiers | 8K, sharp focus, high detail |
| Text labels | Do not add any text labels |
| Character consistency | Repeat full appearance description in every call (sub-agents are stateless) |
| Reference image | When user has provided reference/original images, must pass file paths to image agent |
| Batch strategy | Batch-generate same-type assets in one pass |
| Aspect ratio | Single image mode: unified 16:9; Multi-image mode: each image 2:3 or 1:1 |
| Background | Character card defaults to dark gray solid; other sub-types default to pure white; follow user specification when given |

**Art style lock** (determined by source image):
- Realistic: `Medium: hyper-realistic photography. NOT anime, NOT cartoon, NOT 3D render.`
- Anime: `Medium: 2D anime illustration style. NOT photoreal, NOT 3D render.`
- 3D: `Medium: stylized 3D render. NOT photoreal, NOT anime.`

---

## STEP A5: Display and Extensions

Display all generated images, explain what each image corresponds to (angle/expression/pose), prompt user that they can request regeneration or adjustments.

Optional extensions: add expression variants / change outfit / export individual high-res images.

---

# Module B: Scene Concept Art

Used during the pre-production art direction phase of film and TV, generating visual reference images for scenes/environments.

---

## STEP B1: Obtain Scene Source

Ask the user whether they have an existing scene reference image:
- **Has reference image** → Subsequent generation based on reference image variants
- **No reference image** → User provides text description (location type, spatial style, period feel, key objects, mood), generate from scratch

⏸ Wait for user to provide reference image or text description.

---

## STEP B2: Collect Functional Requirements and Output Method

**Functional requirements (multi-select):**
- **Multi-angle framing** — Same scene shown from different orthogonal angles (four-view / eight-view)
- **Time-of-day lighting variants** — Same scene under different times of day
- **Weather/season variants** — Same scene under different weather or seasonal conditions
- **Character-scene integration** — Place specified characters into the scene

**Output method:** Single composite image (recommended) / Separate images
**Art style:** Inherited directly when reference image exists; ask when there's no reference.

⏸ Wait for user confirmation.

---

## STEP B3: Generation Standards Per Function

### Multi-Angle Framing

The model doesn't understand 3D spatial rotation — use **ON SCREEN** description instead of angle numbers.

**Four core rules:**

1. **Name walls by objects, not directions** — Find a unique landmark object for each wall as its name (e.g., `Wall A (the vent-grate wall)`). Do not use left wall / right wall.
2. **ON SCREEN description** — For each panel, explicitly state where each key object appears on screen (which side, foreground or background, complete or cropped).
3. **"Other side" is not a mirror** — When camera moves to the opposite wall, object near/far relationships flip — must be explicitly stated. MIRROR / mirrored is prohibited.
4. **LAYOUT LOCK** — Prompt must include a layout lock statement: all objects' positions are frozen across all panels; only camera position changes. Write detailed version before panel descriptions, briefly restate at the end.

**Eight-view panel template (2×4 grid):** Front → One side → Other side → Back → Diagonal A → Diagonal B → Bird's eye → Worm's eye. Four-view takes the first 4.

### Time-of-Day Lighting Variants

| Time Period | Lighting Description |
|-------------|---------------------|
| Dawn | Warm orange light, long shadows, thin mist, 3000K |
| Noon | Strong overhead light, short hard shadows, high contrast, 5500K |
| Dusk | Golden side light, long warm shadows, orange-purple sky gradient, 2500K |
| Night | Cool blue moonlight, warm artificial light accents, high light ratio, 7000K+ |

### Weather/Season Variants

| Weather | Keywords |
|---------|----------|
| Clear | clear sky, sharp shadows, vivid colors |
| Rain | wet surfaces, reflections, rain streaks, puddles |
| Snow | snow-covered, muted palette, cold breath vapor |
| Fog | thick fog, low visibility, silhouettes, desaturated |

### Character-Scene Integration

Pass character reference image + full appearance description, clearly specify position/pose/action, environment occupies 60–70%, character occupies 30–40%.

---

## STEP B4: Generation Parameter Standards

| Parameter | Standard |
|-----------|----------|
| **Model restriction** | **Only Banana and image2 are allowed, fallback to other models is prohibited** |
| Style | Inherited directly from reference image; selected based on user choice when no reference |
| Aspect ratio | Single composite: 1:1; Separate images: 16:9 |
| Text labels | Do not add |
| Scene consistency | Spatial structure and object positions must remain consistent across all variants |
| Quality modifiers | 8K, sharp focus, high detail |

**Art style lock**:
- Cinematic realism (default): `Medium: cinematic realistic concept art, photorealistic lighting. NOT anime, NOT cartoon, NOT 3D render.`
- Hand-painted concept: `Medium: digital matte painting, concept art illustration. NOT photoreal, NOT anime.`
- Anime scene: `Medium: 2D anime background illustration. NOT photoreal, NOT 3D render.`

---

## STEP B5: Display and Extensions

Display generated images, prompt user they can add lighting/weather variants, add characters, export individual high-res images, or generate companion scenes.

---

# Module C: Prop/Object Multi-Views

When the generation subject is **props, weapons, vehicles, objects** or other non-character subjects, enter this module.
Unlike character views (orthographic eye-level), prop views use a **camera orbit shooting** effect — each panel is a shot with perspective from a specific camera position.

---

## STEP C1: Obtain Prop Source and Collect Configuration

Ask the user whether they have a prop reference image:
- **Has reference image** → Use `read_media` to analyze the reference, extract precise per-component features
- **No reference image** → User provides text description of the prop's appearance

Collect configuration:
- **View type**: Three-view / Four-view
- **Output method**: Single image mode (recommended) / Multi-image mode
- **Background**: Pure white (recommended) / Light gray / Studio gray

⏸ Wait for user response before continuing.

---

## STEP C2: Analyze Prop Shape and Adapt Aspect Ratio

Use `read_media` to analyze the reference image, extract the subject's length-width-depth proportions and primary orientation. Select layout per the following table:

| Prop Shape | Recommended Layout | Overall Aspect Ratio |
|-----------|-------------------|---------------------|
| **Horizontally flat** (width >> height, e.g., cases, long guns, vehicles) | N rows × 1 col vertical stack | **1:1** or **3:4** |
| **Vertically elongated** (height >> width, e.g., swords, staffs, pillars) | 1 row × N cols horizontal row | **16:9** |
| **Near-equal proportions** (width ≈ height, e.g., helmets, spheres, boxes) | Three-view 1×3 horizontal, Four-view 2×2 grid | **16:9** / **1:1** |
| **Complex irregular** (multi-directional extensions, e.g., cables/wings/supports) | Three-view 1×3 horizontal, Four-view 2×2 grid | **16:9** / **1:1** |

> Core principle: Prop consistency takes priority over layout aesthetics. Ensure each angle has enough space to accurately reproduce all components.

---

## STEP C3: Prop View Angle Definitions

> **Global viewing angle constraint**:
> Uses a **camera orbit shooting** effect, not engineering-drawing orthographic projection.
> Each panel looks like an actual photograph taken by a photographer at that position: with natural perspective (near objects larger, far objects smaller), realistic lighting and shadows, and soft ground shadows.
> The prop always remains in its normal resting position — absolutely no flipping, standing on end, or rotating.
> Prop proportions are accurate (accurate real-world proportions). No exaggerated stretching or shrinking.

### Prop Three-View

Camera shoots from three positions around the prop:

| Panel | Camera Position | Description |
|-------|----------------|-------------|
| 1 | Front 3/4 angle | Camera positioned in front and to the side of the prop, slight downward angle (~30°), showing the top, front, and one side simultaneously |
| 2 | Direct side angle | Camera at the prop's direct side, eye-level or slight downward angle, showing the complete side profile |
| 3 | Rear 3/4 angle | Camera orbits to the rear side of the prop, slight downward angle, showing the top, back, and the other side simultaneously |

### Prop Four-View

Camera shoots from four positions around the prop, forming a 360° orbit:

| Panel | Camera Position | Description |
|-------|----------------|-------------|
| 1 | Front 3/4 angle | Camera positioned in front and to the side of the prop, slight downward angle (~30°), showing the top, front, and one side simultaneously |
| 2 | Side angle | Camera at one side of the prop, eye-level or slight downward angle, showing complete side profile |
| 3 | Rear 3/4 angle | Camera orbits to the rear side of the prop, slight downward angle, showing the top, back, and the other side simultaneously |
| 4 | Opposite side angle | Camera orbits to the opposite side from panel 2, showing the other side of the prop |

> **Side view prompt specification:**
> - Panel 2 described as "Side view, the camera is positioned at one side of the prop"
> - Panel 4 described as "The camera orbits to the opposite side from panel 2, showing the other side of the prop"
> - **Prohibited**: left / right / mirror / mirrored or any symmetrical direction words

---

## STEP C4: Prop Consistency and Generation Parameters

### Strict Consistency Constraints

- **Reference image is the sole visual truth**: Prompt emphasizes the reference image as the absolute anchor — all components' shapes, positions, materials, colors must exactly match
- **Per-component precise description**: List every component's features one by one (shape, material, color, position, quantity). No vague generalizations
- **Consistency enhancement words must be written into prompt**: `same product shape as reference image, identical silhouette, exact color reproduction, same material texture, identical surface finish, no design modifications, identical product details across all views`
- **Negative prompt must precisely negate**: Based on read_media analysis results, write the prop's key features in negated form into the negative prompt to prevent the model from improvising
- **Panel count hard constraint**: The model tends to add extra panels for large or structurally complex props (e.g., generating 6 panels for a three-view). Must lock panel count in the prompt using multiple methods:
  1. Positive statement: `exactly N panels, each panel contains exactly ONE instance of the prop`
  2. Negative prohibition: `NOT more than N, NOT N+1, NOT N+2, NOT N+3`
  3. Fallback warning: `If you generate more than N instances the entire image is WRONG`
  4. Append to negative prompt: `more than N items, extra panels, duplicate views, extra rows`

### Generation Parameters

| Parameter | Standard |
|-----------|----------|
| **Model restriction** | **Only Banana and image2 are allowed, fallback to other models is prohibited** |
| Style | Maintain consistency with prop source image; default to realistic if unspecified |
| Lighting | Soft studio lighting, each panel has soft ground shadows |
| Quality modifiers | 8K, sharp focus, high detail |
| Text labels | Do not add any text labels |
| Reference image | Must pass file paths to image agent |
| Batch strategy | Batch-generate same-type assets in one pass |
| Aspect ratio | Per STEP C2 adaptive aspect ratio |
| Background | Default pure white; follow user specification when given |

**Art style lock**:
- Realistic (default): `Medium: hyper-realistic product photography, studio lighting with natural perspective. NOT anime, NOT cartoon, NOT illustration, NOT orthographic engineering drawing.`
- Anime: `Medium: 2D anime illustration style. NOT photoreal, NOT 3D render.`

---

## STEP C5: Display and Extensions

Display generated images, explain each image's corresponding camera angle position, prompt user that they can request regeneration or adjustments.

Optional extensions: add more angles / change material or color scheme / export individual high-res images / generate the prop placed within a scene.

---

# Quick Reference

```
Module A — Characters:
  Three-view: Front → Side → Back (1×3, 16:9)
  Four-view: Front → Side → Orbit to other side → Back (1×4, 16:9)
  Eight-view: 8 angles 360° turnaround (2×4)
  Poses: 4→2×2 | 6→2×3 | 9→3×3
  Global constraint: Eye-level, normal human proportions
  Model: Banana / image2 only

Module B — Scenes:
  Core: Model can't understand 3D rotation → ON SCREEN description + LAYOUT LOCK
  Naming: Name walls by objects, not left/right/angle numbers
  Four-view: Front → One side → Other side (near/far flipped) → Reverse shot from back
  Functions: Multi-angle framing | Lighting variants | Weather/season | Character integration
  Model: Banana / image2 only

Module C — Props:
  Core: Analyze shape first → Adaptive aspect ratio layout
  Angles: Camera orbit shooting (not orthographic engineering drawing), each panel has perspective and ground shadow
  Three-view: Front 3/4 → Direct side → Rear 3/4
    Horizontally flat: 3×1 vertical stack (1:1 / 3:4)
    Vertically elongated: 1×3 horizontal row (16:9)
    Equal/irregular: 1×3 horizontal row (16:9)
  Four-view: Front 3/4 → Side → Rear 3/4 → Opposite side (opposite of panel 2)
    Horizontally flat: 4×1 vertical stack (3:4)
    Vertically elongated: 1×4 horizontal row (16:9)
    Equal/irregular: 2×2 grid (1:1)
  Consistency: Reference image as sole truth + per-component description + precise negative negation + panel count hard constraint
  Model: Banana / image2 only
```
