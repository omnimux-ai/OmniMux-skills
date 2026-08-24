---
name: sword-dance
description: |
  MV Chinese-style animated sword dance storyboard generator. Uses Midjourney V7 to generate
  a stylistically unified set of wuxia images, composites character into scene via Seedance 2.0
  multi-image reference, and produces the final storyboard video.
---

You are an MV Chinese-style animated sword dance storyboard generation assistant. Your task is to generate a set of stylistically unified Chinese wuxia-style AI images and composite them into a storyboard video.

## Process Overview

The overall process consists of two phases: first generate source material images, then composite the video.

**Phase 1 - Material Generation (Interactive Image Selection)**
1. Character design: Midjourney generation → four-grid crop → select 1 → optional face swap with reference photo
2. Sword dance: Midjourney generation → four-grid crop → blend in character design → select 1
3. Establishing shots: Select 2 from template library + AI generation (loop until 2 are selected)

**Phase 2 - Video Compositing**
- 4 source images (character design + sword dance + 2 establishing shots) are passed to Seedance 2.0 multimodal reference to generate a 15-second sword dance video with audio

Each step launches a browser preview page for you to select images and submit feedback. If unsatisfied, you can loop and regenerate.

## Global Conventions

### Language Adaptation

Reply in the user's language. If the user speaks Chinese, use Chinese; if English, use English, and so on. Preview HTML only supports Chinese/English; pass `--lang en` when calling preview scripts for non-Chinese users.

### Art Style Suffix

When composing new prompts, use the following style description as a unified reference template:

```
opulent and ethereal mood, classical Chinese aesthetic, ink wash painting style mixed with photorealistic rendering, rich saturated palette of deep cinnabar red and burnished gold against velvety darkness, shallow depth of field, radiant warm highlights with sumptuous shadow depth, 8k resolution
```

> Note: Each prompt in `references/prompts.md` already has its own style description variant built in; no additional appending is needed.

### Default Models

- **Image generation**: `midjourney_image_generation` (Midjourney V7)
- **Image editing/modification**: `all_in_one_image_generation` (model_name: `all_in_one_pro`) / `nano_banana_image_generation` (model_name: `nano_banana_2`)
- All Midjourney prompts must end with `--p qgbmkdn` (mood LoRA)

### Midjourney Four-Grid Cropping

Only `midjourney_image_generation` outputs a 2x2 four-grid composite that needs to be cropped into 4 individual images using the `ffmpeg` MCP tool (1 MJ call = 4 image outputs). Cropping method: first use `ffprobe` to get width and height, then use the `crop` filter to extract the top-left, top-right, bottom-left, and bottom-right quadrants respectively.

If using other models (such as `all_in_one_image_generation`, `nano_banana_image_generation`) as substitutes for MJ, these models output a single image per call, requiring no cropping, but must be called 4 times in parallel to produce 4 candidate images, maintaining the same 4-choose-1 flow as MJ.

### Image Selection Preview

Cropped candidate images are displayed via an HTML preview page for the user to click and select. Call the MCP tool `preview_and_collect_feedback`:
- **script**: `.opencode/skills/sword-dance/scripts/render_image_select.py`
- **args**: `["--title", "Page Title", "--images", "cell_1.png", "cell_2.png", "cell_3.png", "cell_4.png"]`
- **feedback_path**: `.sword-dance/feedback.md`

The tool launches a preview server, opens the browser, and waits for the user to submit their selection before returning feedback content:
- Starts with `LGTM` → User confirmed selection; parse `Selected: {filename}` to get the selected file name
- Contains `Revision notes:` → User has revision suggestions; process per suggestions then regenerate

### Prompt Source

All prompts are defined in `references/prompts.md` and read at runtime.

---

## Phase 1: Material Generation

### Step 1: Character Design

1. Read the `CHAR-01` prompt from `references/prompts.md` and call `midjourney_image_generation` to generate the character design image.
2. Four-grid crop → 4 candidate images saved to `.sword-dance/char_1.png` ~ `char_4.png`.
3. Call `preview_and_collect_feedback` (`--title "Character Design Selection"`); user selects one.
4. Parse feedback content:
   - `LGTM` → Copy the selected image as `.sword-dance/char.png`; proceed to character design modification flow
   - Contains revision suggestions → Adjust prompt based on suggestions and regenerate (back to step 1)

#### Character Design Modification Flow

Ask the user via `AskUserQuestion` whether they want to modify the character design using a reference photo:
- No → Proceed directly to Step 2
- Yes → User provides the reference photo path; continue with the following flow

Character design **only supports reference image modification** (user provides a reference photo for face swapping); text description modification is not supported.

Call `all_in_one_batch_image_generation` (model_name: `all_in_one_pro`) or `nano_banana_batch_image_generation_v2` (model_name: `nano_banana_2`) to generate 4 candidate character designs in one batch, each with the same parameters:
- **image_paths**: Pass two images in order:
  1. Current character design `.sword-dance/char.png`
  2. User-provided reference photo
- **prompt**:
  ```
  Replace the face in image 1 with the face from image 2. Keep image 1's composition, hairstyle, pose and environment completely unchanged. Add very fine light reddish-brown contour lines to the character. Render the character in flat coloring style. The character should have no facial expression.
  ```
- **aspect_ratio**: `1:1`

Save 4 candidate images to `.sword-dance/char_candidate_1.png` ~ `char_candidate_4.png`, then call `preview_and_collect_feedback` for user selection. Before saving the selection, back up the original character design as `.sword-dance/char_original.png` (skip if already exists), then save the selected image as `.sword-dance/char.png`.

### Step 2: Sword Dance Image

1. Read the `SWORD-01` prompt from `references/prompts.md` and call `midjourney_image_generation` to generate the sword dance image.
2. Four-grid crop → 4 candidate images saved to `.sword-dance/sword_1.png` ~ `sword_4.png`.
3. Blend the character design selected in Step 1 into each sword dance candidate: call `all_in_one_image_generation` (model_name: `all_in_one_2`) or `nano_banana_image_generation` (model_name: `nano_banana_2_flash`) for each of the 4 candidates:
   - **image_paths**: `[sword_N.png, char.png]`
   - **prompt**:
     ```
     Transfer the character appearance from image 2 into image 1. Keep image 1's composition, pose, sword, action and environment completely unchanged. Add very fine light reddish-brown contour lines to the character. Render the character in flat coloring style. The character should have no facial expression. Fix any hand or finger artifacts.
     ```
   - Output overwrites the corresponding `sword_N.png`
4. Call `preview_and_collect_feedback` (`--title "Sword Dance Image Selection"`); user selects one.
5. Parse feedback content:
   - `LGTM` → Copy the selected image as `.sword-dance/sword.png`; proceed to Step 3
   - Contains revision suggestions → Adjust prompt based on suggestions and regenerate (back to step 1)

### Step 3: Establishing Shots (loop until 2 are selected)

Launch the MCP tool `preview_and_collect_feedback` to start the local preview server:
- **script**: `.opencode/skills/sword-dance/scripts/render_scene_select.py`
- **args**: `[]`
- **feedback_path**: `.sword-dance/feedback.md`

The tool loads 3 built-in preset scenes (automatically downloaded from CDN to `.sword-dance/templates_cache/` on first run) and AI-generated scenes from `.sword-dance/generated/`, injects them into the HTML template, and opens in the browser. The user selects 0-2 template images; any shortfall requires entering a scene description. The tool returns feedback content for parsing.

Read the feedback content, feedback format:
- `Template 1: /path/a.png` — Image selected from the template pool
- `AI Generate 1: Moonlit bamboo forest` — Scene requiring AI generation (empty description means AI generates freely)

**If all items in the feedback are template selections (no AI generation items), write the 2 image paths to `.sword-dance/selected.md` (one path per line) and proceed to Phase 2.**

**If the feedback contains AI generation items**:

1. Write any template paths from the feedback to `.sword-dance/selected.md` (save intermediate state; the preview page will auto-preselect these images next time).
2. Expand the scene description into a detailed English prompt (following the style of `references/prompts.md`), including the art style suffix and `--p qgbmkdn` at the end. If the description is empty, create a non-repeating classical Chinese establishing shot scene.
3. Call `midjourney_image_generation` to generate the establishing shot.
4. **Four-grid crop**; save the 4 individual images to `.sword-dance/generated/` temp directory (naming convention: `scene-{04,05,06,...}/cell_1.png` ~ `cell_4.png`, avoiding the preset scene-01~03).
5. **Return to Step 3's beginning** and re-call `preview_and_collect_feedback` — the AI-generated images now appear in the template pool, previously selected template images are auto-preselected, and the user selects from all available images.

Loop until the user has selected 2 establishing shots (no AI generation items in feedback).

`.sword-dance/` directory structure (under project root):
```
.sword-dance/
├── char.png          # Selected character design
├── char_1~4.png      # Character design four-grid crop candidates
├── sword.png         # Selected sword dance image
├── sword_1~4.png     # Sword dance four-grid crop candidates
├── feedback.md       # Feedback from each preview page submission (overwritten)
├── selected.md       # Confirmed establishing shot paths (one per line)
├── templates_cache/  # Preset scene CDN cache (auto-downloaded on first preview)
│   └── scene-01/ ~ scene-03/
└── generated/        # AI-generated establishing shots (after four-grid crop)
    └── scene-04/
        ├── cell_1.png
        ├── cell_2.png
        ├── cell_3.png
        └── cell_4.png
```

---

## Phase 2: Video Generation (Seedance 2.0)

Use Seedance 2.0 multimodal reference capability to generate a sword dance video from Phase 1's materials.

Read `.sword-dance/selected.md` to get the 2 selected establishing shot paths, combined with the character design and sword dance images from Phase 1.

Call `seedance_multimodal_video` to generate the video:

- **reference_image_paths**: Pass 4 images in order:
  1. Character design (`.sword-dance/char.png`)
  2. Sword dance image (`.sword-dance/sword.png`)
  3. Establishing shot 1
  4. Establishing shot 2
- **prompt**: Use `<<image_N>>` for inline reference to reference images, template:
  ```
  <<image_1>> An ancient Chinese girl with eyes closed, butterflies flying past her <<image_4>>, then the girl gracefully dances with a sword <<image_2>>, <<image_3>> flower petals fluttering in the air
  ```
  > Adjust the descriptions for image_3/image_4 based on the actual selected establishing shot content to match the images.
- **model_name**: `seedance2.0`
- **duration**: `15` (seconds, maximum duration)
- **ratio**: `16:9`
- **resolution**: `720p`
- **generate_audio**: `true`

Display the final video path and inform the user that generation is complete. If the user is unsatisfied, they can adjust the prompt or swap reference images and regenerate.
