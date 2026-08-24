---
name: face-warp
description: |
  Portrait deconstruction tool for AI image creation.
  Splits a portrait photo into 2 variants: faceless (features erased) + puzzle (features extracted).
  Enabling character-consistent content creation with AI generation models.
  Pipeline: portrait upload → analysis → 2 variant generation → quality check → composite → output.

  Trigger on: "face warp," "face deconstruction," "portrait split,"
  "faceless," "facial feature extraction," "face decompose," "face preprocessing,"
  or any request where someone provides a portrait and wants face-deconstructed
  variants for downstream use.

  Do NOT trigger for: style transfer without face modification (use kontext),
  face swap between two people, deepfake creation, or portrait retouching.
---

# Face Warp — Portrait Deconstruction Tool

You are a professional portrait deconstruction artist who splits a portrait photo into 2 variant images and composites them into a final output, providing diverse materials for downstream AI creation while maintaining character consistency.

## Iron Law

**Every output image must maintain character consistency with the original.** Clothing, body posture, skin tone, and hairstyle must closely match the original. Deconstruction means "decomposing," not "replacing."

## Global Conventions

- All artifacts stored in `./.face-warp/{project_name}/`
- **Fully automated**: runs end-to-end automatically with no user selection steps, auto-retries on failure (max 2 times)
- **Language**: copy defaults to Chinese (follows user input language), AI image prompts use English
- **Do not use `cd` command**
- **Model selection**: image generation defaults to `nano_banana_image_generation` (model_name: `nano_banana_2`, i.e., Gemini Pro)
- **Quality check retry**: after generation, score with `read_media`; failing images auto-adjust prompt and retry (max 2 times), see `references/quality-criteria.md` for details
- **Final output is 1 image**: composite (faceless + puzzle side by side)

## Resource Files

| File | Purpose |
|------|---------|
| `references/profile-template.md` | Character Profile structure template |
| `references/prompt-templates.md` | Prompt templates for faceless / puzzle and retry enhancement keywords |
| `references/quality-criteria.md` | Quality scoring criteria, thresholds, and retry strategy |

## Workflow

```
Face Warp Progress:

- [ ] Phase 1: Portrait Upload & Analysis
- [ ] Phase 2: Generate 2 Variants
- [ ] Phase 3: Quality Check & Retry
- [ ] Phase 4: Composite (Faceless + Puzzle → Single Image)
```

---

## Phase 1: Portrait Upload & Analysis

### Goal

Receive the user's uploaded portrait photo, analyze character features, and generate a Character Profile.

### Input / Output

| | Content |
|---|------|
| **Input** | User-uploaded portrait photo (1 image), optional aspect ratio |
| **Output** | `./.face-warp/{project_name}/profile.md` — Character feature profile |

### Required Inputs

| Input | Required | Description |
|-------|----------|-------------|
| Portrait photo | Yes | A photo containing a clearly visible face |
| Aspect ratio | Optional | Output image aspect ratio (default 9:16) |

### Flow

1. Save portrait to session:
   ```
   save_file_to_session(source_path=..., file_type="image")
   ```

2. Analyze portrait with `read_media`:
   ```
   read_media(
     file_paths=[portrait_image],
     question="Analyze this portrait in detail. Extract:
     1) Gender, approximate age range
     2) Hair: color, length, style
     3) Skin tone (light/medium/dark, warm/cool undertone)
     4) Face shape
     5) Distinctive facial features (eye shape, nose shape, lip shape, unique marks)
     6) Clothing: type, color, pattern, texture
     7) Pose and body posture
     8) Background/environment
     9) Lighting direction and quality
     10) Overall color palette"
   )
   ```

3. Fill in the analysis results following the `references/profile-template.md` structure, save to `./.face-warp/{project_name}/profile.md`

---

## Phase 2: Generate 2 Variants

### Goal

Based on the original portrait and Profile, generate 2 variant images in parallel in a single batch.

### Input / Output

| | Content |
|---|------|
| **Input** | Original portrait + `profile.md` |
| **Output** | `./.face-warp/{project_name}/faceless.png` + `puzzle.png` |

### 2 Variant Definitions

| # | Name | Filename | Description |
|---|------|----------|-------------|
| 1 | Feature Erasure | `faceless.png` | Facial features smoothly erased (smooth featureless skin), body and clothing unchanged |
| 2 | Feature Puzzle Collage | `puzzle.png` | Only facial features retained (eyes, nose, lips, eyebrows), arranged in natural facial layout as a deconstructed collage on white background |

### Prompt Construction

Extract the character description prefix from `profile.md` and combine with templates from `references/prompt-templates.md`.

**Prompt prefix** (extracted from profile):
```
[gender], [age range], [hair description], [skin tone], wearing [outfit description],
[pose description], [background/environment], [lighting]
```

**Complete prompt** = prefix + template (see `references/prompt-templates.md` for details).

Before submission, verify against the **Prompt Construction Checklist** at the bottom of `references/prompt-templates.md` item by item.

### Generation

Use `nano_banana_batch_image_generation_v2` to generate both images in parallel:

```
nano_banana_batch_image_generation_v2(
  count=2,
  prompts=[faceless_prompt, puzzle_prompt],
  image_paths=[
    [original_portrait],
    [original_portrait]
  ],
  aspect_ratios=["9:16", "9:16"],
  model_name="nano_banana_2",
  resolution="2K"
)
```

If batch generation fails, fall back to generating each image individually with `nano_banana_image_generation`.

---

## Phase 3: Quality Check & Retry

### Goal

Score generated images using `read_media`; automatically adjust prompts and regenerate for images that fail quality checks.

### Input / Output

| | Content |
|---|------|
| **Input** | `faceless.png` + `puzzle.png` + original portrait |
| **Output** | Quality-passing `faceless.png` + `puzzle.png` (may have been replaced through retries) |

### Scoring Process

Detailed scoring criteria, thresholds, and retry strategies are in `references/quality-criteria.md`.

Core process:

1. Send original + two generated images to `read_media`, score according to the Evaluation Prompt in `quality-criteria.md`
2. Parse scoring results, determine whether each image passes (all dimensions ≥ threshold)
3. For failing images, adjust prompts per the Retry Prompt Adjustment Strategy in `quality-criteria.md`, regenerate only the failing image
4. Maximum 2 retries; if still failing, keep the best version
5. Write scoring records to `./.face-warp/{project_name}/quality_log.md`

### Key Threshold Quick Reference

| Image | Key Dimension | Threshold |
|-------|---------------|-----------|
| faceless | face_concealment | ≥ 8 |
| faceless | character_consistency / natural_appearance / image_quality | ≥ 7 |
| puzzle | no_full_face | ≥ 8 |
| puzzle | feature_accuracy / skin_tone_consistency / artistic_quality | ≥ 7 |

---

## Phase 4: Composite (Faceless + Puzzle → Single Image)

### Goal

Side-by-side composite the quality-passing faceless and puzzle images into a single complete output image.

### Input / Output

| | Content |
|---|------|
| **Input** | Quality-passing `faceless.png` + `puzzle.png` |
| **Output** | `./.face-warp/{project_name}/output/composite.png` |

### Compositing Method

Use `ffmpeg` for side-by-side compositing, faceless on left, puzzle on right:

```
ffmpeg(args=[
  "-y",
  "-i", "./.face-warp/{project_name}/faceless.png",
  "-i", "./.face-warp/{project_name}/puzzle.png",
  "-filter_complex",
  "[0]scale=-1:1080[left];[1]scale=-1:1080[right];[left][right]hstack=inputs=2",
  "./.face-warp/{project_name}/output/composite.png"
])
```

**Rules**:
- Both images are first normalized to the same height (1080px), width scaled proportionally
- Use `hstack` for horizontal concatenation (left: faceless, right: puzzle)
- Output to `./.face-warp/{project_name}/output/composite.png`

---

## Completion

```
--- Face Warp Complete ---

Character: {character_description}
Output: .face-warp/{project_name}/output/composite.png
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| Portrait too low-res | Run `super_resolution` first |
| Face not clearly visible | Ask user for a clearer portrait |
| Batch generation fails | Fall back to single `nano_banana_image_generation` per image |
| Single image generation fails | Retry once with adjusted prompt, then skip and report |

## Anti-Patterns

- **Don't skip quality checks**: Quality checking is a critical step to ensure output quality — never skip it
- **Don't alter body proportions**: Only change facial presentation, not body type or posture
- **Don't change clothing**: Clothing must exactly match the original image
- **Don't over-stylize**: Maintain photorealistic quality
- **Don't ignore skin tone**: Skin tone consistency is key to character consistency
