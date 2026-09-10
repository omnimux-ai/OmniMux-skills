# Style Bible Template

> Version: 1.0.0
> File: `templates/style-bible.template.md`
> Purpose: Define the canonical style-control template for a storyboard skill so shot tables, shot manifests, and storyboard image prompts stay visually consistent.

---

## 1. Purpose

This template defines a **Style Bible** for storyboard generation workflows.

A Style Bible is the compact, reusable visual-control layer that keeps the following aligned across all shots:

- product identity
- character identity
- environment consistency
- lighting continuity
- lens language
- motion feel
- commercial polish
- graphic restraint
- realism level
- color behavior

It is used to support:
- shot-table writing
- shot-manifest generation
- template recommendation
- storyboard image prompt construction
- continuity validation

It must **support** the shot table, never replace it.

---

## 2. Core Rule

The Style Bible is a **continuity anchor**, not a script.

It should define:
- what must remain stable
- what may vary
- what must never drift

It should not:
- invent new story beats
- replace shot-level action description
- add unconfirmed product claims
- force aesthetic flourishes that weaken product readability

---

## 3. Canonical Structure

A complete Style Bible should follow this structure:

```text
# Style Bible
## Project Snapshot
## Product Identity
## Character Identity
## Environment & Scene World
## Lighting
## Lens & Framing Language
## Motion Language
## Texture & Material Rendering
## Color System
## Brand / Commercial Tone
## Graphic & Text Rules
## Continuity Anchors
## Allowed Variation
## Avoid / Negative Constraints
## Prompt Compression Summary
```

Sections may be omitted only if genuinely irrelevant.

---

## 4. Master Template

```md
# Style Bible

## Project Snapshot
- **Project / Sequence**: {project_name}
- **Format**: {format}
- **Duration**: {duration}
- **Platform Intent**: {platform_intent}
- **Video Language**: {video_language}
- **Board Template**: {board_template}
- **Visual Direction**: {visual_direction}

## Product Identity
- **Product Name**: {product_name}
- **Category**: {product_category}
- **Hero Form**: {hero_form}
- **Key Visible Features**:
  - {feature_1}
  - {feature_2}
  - {feature_3}
- **Non-Negotiable Product Truths**:
  - {product_truth_1}
  - {product_truth_2}
  - {product_truth_3}
- **Product Readability Priority**: {product_readability_priority}

## Character Identity
- **Primary Role**: {primary_role}
- **Age Impression**: {age_impression}
- **Presentation**: {presentation_style}
- **Wardrobe Direction**: {wardrobe_direction}
- **Behavioral Tone**: {behavioral_tone}
- **Identity Stability Rules**:
  - {identity_rule_1}
  - {identity_rule_2}

## Environment & Scene World
- **Primary Setting**: {primary_setting}
- **Scene Type**: {scene_type}
- **Surface / Material Context**: {surface_context}
- **Background Density**: {background_density}
- **Props Policy**: {props_policy}
- **Environment Notes**:
  - {environment_note_1}
  - {environment_note_2}

## Lighting
- **Lighting Style**: {lighting_style}
- **Source Logic**: {source_logic}
- **Contrast Level**: {contrast_level}
- **Shadow Behavior**: {shadow_behavior}
- **Highlight Behavior**: {highlight_behavior}
- **Lighting Continuity Rules**:
  - {lighting_rule_1}
  - {lighting_rule_2}

## Lens & Framing Language
- **Lens Feel**: {lens_feel}
- **Perspective Bias**: {perspective_bias}
- **Framing Preference**: {framing_preference}
- **Focus Behavior**: {focus_behavior}
- **Shot Readability Principle**: {shot_readability_principle}

## Motion Language
- **Overall Motion Feel**: {overall_motion_feel}
- **Camera Energy**: {camera_energy}
- **Movement Restraint**: {movement_restraint}
- **Transition Bias**: {transition_bias}
- **Motion Rules**:
  - {motion_rule_1}
  - {motion_rule_2}

## Texture & Material Rendering
- **Material Priority**: {material_priority}
- **Surface Realism**: {surface_realism}
- **Detail Emphasis**: {detail_emphasis}
- **Rendering Bias**: {rendering_bias}
- **Texture Rules**:
  - {texture_rule_1}
  - {texture_rule_2}

## Color System
- **Primary Color Mood**: {primary_color_mood}
- **Palette Bias**: {palette_bias}
- **Color Temperature**: {color_temperature}
- **Saturation Level**: {saturation_level}
- **Color Restraint Rules**:
  - {color_rule_1}
  - {color_rule_2}

## Brand / Commercial Tone
- **Commercial Positioning**: {commercial_positioning}
- **Ad Tone**: {ad_tone}
- **Credibility Level**: {credibility_level}
- **Polish Level**: {polish_level}
- **Conversion Bias**: {conversion_bias}

## Graphic & Text Rules
- **On-Screen Text Density**: {text_density}
- **Caption Style**: {caption_style}
- **Panel Label Style**: {panel_label_style}
- **Text Placement Bias**: {text_placement_bias}
- **Logo Handling**: {logo_handling}
- **Graphic Rules**:
  - {graphic_rule_1}
  - {graphic_rule_2}

## Continuity Anchors
- **Must Stay Identical**:
  - {anchor_1}
  - {anchor_2}
  - {anchor_3}
- **Must Stay Compatible**:
  - {anchor_4}
  - {anchor_5}
- **Continuity Failure Examples**:
  - {failure_example_1}
  - {failure_example_2}

## Allowed Variation
- **Can Change Shot to Shot**:
  - {variation_1}
  - {variation_2}
  - {variation_3}
- **Can Flex Within Range**:
  - {variation_range_1}
  - {variation_range_2}

## Avoid / Negative Constraints
- Avoid:
  - {avoid_1}
  - {avoid_2}
  - {avoid_3}
- Never:
  - {never_1}
  - {never_2}
  - {never_3}

## Prompt Compression Summary
{prompt_compression_summary}
```

---

## 5. Section Guidance

### 5.1 Project Snapshot
A short top-level summary that captures the production context.

### Should include
- duration
- platform intent
- video language
- board type
- visual direction

### Example
```md
## Project Snapshot
- **Project / Sequence**: Portable Blender 15s UGC
- **Format**: Vertical 9:16 TikTok ad
- **Duration**: 15s
- **Platform Intent**: Short-form conversion ad
- **Video Language**: Chinese
- **Board Template**: Creator ad board
- **Visual Direction**: Clean, energetic, lifestyle UGC realism
```

---

### 5.2 Product Identity
Defines what the product must look like and what details may not drift.

### Include
- silhouette
- proportions
- main components
- texture
- branding placement
- usage state rules
- color truth

### Example
```md
## Product Identity
- **Product Name**: Portable Blender
- **Category**: Personal kitchen appliance
- **Hero Form**: Compact cup-style blender with lid, transparent blending chamber, and one-button base
- **Key Visible Features**:
  - clear blending cup
  - compact travel size
  - single power button
- **Non-Negotiable Product Truths**:
  - keep cup-to-base proportion consistent
  - keep button placement stable
  - do not change lid geometry
- **Product Readability Priority**: Very high
```

---

### 5.3 Character Identity
Defines how the human subject should remain consistent.

### Include
- age impression
- styling
- clothing logic
- grooming
- emotional baseline
- role continuity

### Example
```md
## Character Identity
- **Primary Role**: Busy young office worker
- **Age Impression**: Mid-20s to early-30s
- **Presentation**: Approachable, neat, healthy lifestyle
- **Wardrobe Direction**: Simple office-casual neutral top
- **Behavioral Tone**: Efficient, upbeat, natural
- **Identity Stability Rules**:
  - keep the same person identity across all in-use shots
  - avoid changing hairstyle, face shape, or wardrobe category between shots
```

---

### 5.4 Environment & Scene World
Defines the visual world around the product.

### Include
- room type
- surface type
- background clutter level
- prop logic
- whether backgrounds should remain constant or just compatible

### Example
```md
## Environment & Scene World
- **Primary Setting**: Office breakroom / desk area
- **Scene Type**: Realistic everyday lifestyle environment
- **Surface / Material Context**: Clean desk or countertop with subtle texture
- **Background Density**: Minimal to light
- **Props Policy**: Only supportive props related to fruit, cup, work desk, or healthy snack routine
- **Environment Notes**:
  - keep backgrounds clean enough for product readability
  - do not introduce unrelated kitchen or gym clutter unless the shot specifically requires it
```

---

### 5.5 Lighting
Controls overall illumination logic.

### Include
- source direction
- warmth/coolness
- contrast
- softness
- consistency over sequence

### Example
```md
## Lighting
- **Lighting Style**: Bright natural daylight realism
- **Source Logic**: Window-side side/front light
- **Contrast Level**: Medium-low
- **Shadow Behavior**: Soft and controlled
- **Highlight Behavior**: Clean highlights without harsh clipping
- **Lighting Continuity Rules**:
  - keep lighting believable across all panels
  - avoid sudden jumps from warm sunset tones to cool studio lighting
```

---

### 5.6 Lens & Framing Language
Defines the feel of the camera.

### Include
- smartphone realism vs cinema polish
- close-up bias
- depth-of-field behavior
- how aggressive angle changes may be

### Example
```md
## Lens & Framing Language
- **Lens Feel**: Smartphone-commercial realism
- **Perspective Bias**: Natural perspective with mild wide-angle energy
- **Framing Preference**: Product-forward close and medium-close compositions
- **Focus Behavior**: Subject/product readable first, background secondary
- **Shot Readability Principle**: Every frame should make the product action instantly understandable
```

---

### 5.7 Motion Language
Controls how movement should feel.

### Include
- static vs dynamic bias
- cut intensity
- handheld tolerance
- transition logic

### Example
```md
## Motion Language
- **Overall Motion Feel**: Quick, readable, conversion-focused
- **Camera Energy**: Medium
- **Movement Restraint**: Motion should support clarity, not distract
- **Transition Bias**: Mostly clean cuts with occasional motivated match cuts
- **Motion Rules**:
  - avoid unnecessary dramatic camera moves
  - keep product legibility stable during motion
```

---

### 5.8 Texture & Material Rendering
Protects product realism and tactile cues.

### Include
- food gloss
- plastic transparency
- fabric grain
- metallic reflection restraint
- skin realism restraint

### Example
```md
## Texture & Material Rendering
- **Material Priority**: Product surfaces and visible result texture
- **Surface Realism**: High
- **Detail Emphasis**: Texture should be readable but not hyper-stylized
- **Rendering Bias**: Commercial realism over fantasy stylization
- **Texture Rules**:
  - keep transparent materials optically believable
  - avoid waxy skin, fake liquid behavior, or over-sharpened plastic
```

---

### 5.9 Color System
Keeps the palette coherent.

### Include
- warm/cool direction
- saturation level
- color restraint
- accent color logic

### Example
```md
## Color System
- **Primary Color Mood**: Fresh, bright, clean
- **Palette Bias**: Natural neutrals with fruit accents
- **Color Temperature**: Slightly warm daylight
- **Saturation Level**: Medium
- **Color Restraint Rules**:
  - preserve real product color
  - avoid oversaturated backgrounds that compete with the product
```

---

### 5.10 Brand / Commercial Tone
Defines the ad’s level of polish and conversion intent.

### Include
- premium vs approachable
- UGC vs campaign
- aspirational vs practical
- trust level

### Example
```md
## Brand / Commercial Tone
- **Commercial Positioning**: Accessible lifestyle utility product
- **Ad Tone**: Friendly, efficient, trustworthy
- **Credibility Level**: High
- **Polish Level**: UGC-polished, not glossy luxury campaign
- **Conversion Bias**: Strong
```

---

### 5.11 Graphic & Text Rules
Important for storyboard boards and rendered captions.

### Include
- text density
- text placement
- logo handling
- label behavior
- subtitle restraint

### Example
```md
## Graphic & Text Rules
- **On-Screen Text Density**: Low to medium
- **Caption Style**: Short, clean, readable
- **Panel Label Style**: Structural, not promotional
- **Text Placement Bias**: Lower third or safe negative space
- **Logo Handling**: Preserve existing visible logo; do not invent new brand marks
- **Graphic Rules**:
  - keep labels short and production-oriented
  - avoid decorative overlays that obscure the product
```

---

### 5.12 Continuity Anchors
This is one of the most important sections.

### Include
- what must remain identical
- what must remain compatible
- examples of continuity breakage

### Example
```md
## Continuity Anchors
- **Must Stay Identical**:
  - blender cup shape
  - button placement
  - wardrobe category of the primary character
- **Must Stay Compatible**:
  - desk environment
  - fruit prop family
- **Continuity Failure Examples**:
  - product changes from compact blender to full-size countertop blender
  - the same character appears with completely different hairstyle and outfit without narrative reason
```

---

### 5.13 Allowed Variation
Defines safe flexibility.

### Include
- angle variation
- hand position variation
- crop variation
- prop placement variation
- background blur variation

### Example
```md
## Allowed Variation
- **Can Change Shot to Shot**:
  - camera angle
  - crop tightness
  - hand position
- **Can Flex Within Range**:
  - amount of background blur
  - fruit placement around the product
```

---

### 5.14 Avoid / Negative Constraints
This makes the style more robust.

### Include
- generic AI failure modes
- aesthetic drift
- continuity drift
- over-design
- commercial unreadability

### Example
```md
## Avoid / Negative Constraints
- Avoid:
  - random prop clutter
  - overdramatic cinematic lighting
  - stylized fantasy product distortion
- Never:
  - change the product’s core shape
  - obscure the key selling feature
  - turn a practical UGC ad into a luxury perfume-style fantasy visual
```

---

### 5.15 Prompt Compression Summary
A short compressed version for downstream prompt insertion.

### Example
```md
## Prompt Compression Summary
Compact portable blender ad; preserve exact product shape, button, lid, and cup proportions; bright natural office-breakroom daylight; clean desk environment; approachable office-casual female lead; smartphone-commercial realism; quick readable motion; natural fruit accent colors; strong product legibility; minimal overlays; no luxury fantasy stylization; no continuity drift.
```

### Rules
- 1 short paragraph preferred
- should be directly reusable in prompt construction
- should compress the most critical continuity rules only

---

## 6. Recommended Value Sets

These are suggested controlled vocabularies for more stable authoring.

### 6.1 Mood / Tone
- grounded
- premium
- playful
- energetic
- intimate
- urgent
- clean
- technical
- cozy
- fresh

### 6.2 Lens Feel
- smartphone realism
- clean commercial realism
- premium campaign polish
- documentary-natural
- handheld social-native

### 6.3 Lighting Style
- bright natural daylight
- soft window light
- controlled studio soft light
- premium contrast lighting
- warm lifestyle ambient

### 6.4 Camera Energy
- low
- medium-low
- medium
- medium-high
- high

### 6.5 Product Readability Priority
- low
- medium
- high
- very high
- absolute

---

## 7. Minimal Filled Example

```md
# Style Bible

## Project Snapshot
- **Project / Sequence**: Portable Blender 15s UGC
- **Format**: Vertical 9:16 TikTok ad
- **Duration**: 15s
- **Platform Intent**: Short-form conversion ad
- **Video Language**: Chinese
- **Board Template**: Creator ad board
- **Visual Direction**: Clean, energetic, lifestyle UGC realism

## Product Identity
- **Product Name**: Portable Blender
- **Category**: Personal kitchen appliance
- **Hero Form**: Compact travel-size blender with transparent cup and one-button base
- **Key Visible Features**:
  - transparent blending cup
  - compact portable body
  - single-button activation
- **Non-Negotiable Product Truths**:
  - keep lid shape stable
  - keep button position stable
  - preserve true product proportions
- **Product Readability Priority**: Very high

## Character Identity
- **Primary Role**: Young office worker
- **Age Impression**: Mid-20s to early-30s
- **Presentation**: Healthy, efficient, approachable
- **Wardrobe Direction**: Neutral office-casual top
- **Behavioral Tone**: Upbeat and natural
- **Identity Stability Rules**:
  - keep the same lead identity across all in-use shots
  - avoid sudden hairstyle or wardrobe-category changes

## Environment & Scene World
- **Primary Setting**: Office desk / break area
- **Scene Type**: Everyday lifestyle realism
- **Surface / Material Context**: Clean desk or countertop
- **Background Density**: Minimal
- **Props Policy**: Fruit, cup, desk items only when supportive
- **Environment Notes**:
  - preserve a tidy and believable workspace
  - keep the product area uncluttered

## Lighting
- **Lighting Style**: Bright natural daylight realism
- **Source Logic**: Soft side/front window light
- **Contrast Level**: Medium-low
- **Shadow Behavior**: Soft and controlled
- **Highlight Behavior**: Clean but not glossy
- **Lighting Continuity Rules**:
  - maintain believable daylight across all shots
  - avoid sudden temperature shifts

## Lens & Framing Language
- **Lens Feel**: Smartphone-commercial realism
- **Perspective Bias**: Natural with slight energy
- **Framing Preference**: Product-forward close and medium-close shots
- **Focus Behavior**: Product first, background second
- **Shot Readability Principle**: Product use must be instantly understandable

## Motion Language
- **Overall Motion Feel**: Quick and readable
- **Camera Energy**: Medium
- **Movement Restraint**: Motion should support selling clarity
- **Transition Bias**: Mostly clean cuts
- **Motion Rules**:
  - avoid dramatic cinematic movement
  - protect product legibility during motion

## Texture & Material Rendering
- **Material Priority**: Product body and smoothie texture
- **Surface Realism**: High
- **Detail Emphasis**: Clear but natural detail
- **Rendering Bias**: Commercial realism
- **Texture Rules**:
  - keep transparent cup optics believable
  - avoid fake-looking liquid texture

## Color System
- **Primary Color Mood**: Fresh and clean
- **Palette Bias**: Neutral base with fruit accents
- **Color Temperature**: Slightly warm daylight
- **Saturation Level**: Medium
- **Color Restraint Rules**:
  - preserve real product color
  - prevent oversaturated backgrounds

## Brand / Commercial Tone
- **Commercial Positioning**: Practical lifestyle utility
- **Ad Tone**: Friendly and trustworthy
- **Credibility Level**: High
- **Polish Level**: UGC-polished
- **Conversion Bias**: Strong

## Graphic & Text Rules
- **On-Screen Text Density**: Low to medium
- **Caption Style**: Short and readable
- **Panel Label Style**: Structural, not promotional
- **Text Placement Bias**: Lower safe area
- **Logo Handling**: Preserve only existing visible branding
- **Graphic Rules**:
  - keep labels short
  - avoid overlays that block the product

## Continuity Anchors
- **Must Stay Identical**:
  - cup shape
  - lid geometry
  - button placement
- **Must Stay Compatible**:
  - desk environment
  - fruit prop family
- **Continuity Failure Examples**:
  - blender changes size or category
  - lead character changes identity without reason

## Allowed Variation
- **Can Change Shot to Shot**:
  - angle
  - crop tightness
  - hand position
- **Can Flex Within Range**:
  - background blur
  - fruit placement

## Avoid / Negative Constraints
- Avoid:
  - prop clutter
  - dramatic luxury lighting
  - fantasy distortion
- Never:
  - change product form
  - hide key functional details
  - over-style the sequence beyond practical TikTok ad readability

## Prompt Compression Summary
Portable blender TikTok ad; preserve exact product form, lid, cup, and button placement; bright natural office daylight; tidy desk environment; same approachable office-casual female lead; smartphone-commercial realism; quick readable motion; natural fruit accents; minimal overlays; strong product clarity; no fantasy drift or continuity break.
```

---

## 8. Usage Notes

Use this file:
- as a planning template before writing the shot table
- as a continuity layer when generating shot manifests
- as a compression source for global style prompts
- as a validation checklist for scene consistency

Do not use this file:
- as a replacement for the shot table
- as a substitute for the prompt pack
- as the board template catalog
- as a narrative script

---
