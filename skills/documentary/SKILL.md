---
name: documentary
description: |
  Documentary / explainer video generation workflow. Suitable for when users request
  generating a longer narrative video, such as "help me create a 1-minute video about XX"
  or "make an explainer video about XX."
  Covers the complete pipeline: analysis & planning, storyboarding, image generation,
  narration voiceover, video clip generation, and post-production compositing.
  Trigger words: documentary, explainer video, science video,
  generate an X-minute video, long video, narrative video.
---

# Documentary & Explainer Video Generation Workflow

This workflow is designed for generating long-form narrative videos with voiceover and multiple scenes (e.g., documentaries, explainer videos, brand introduction films).

## Applicable Scenarios

- "Help me create a 1-minute / 3-minute video about XX"
- Science explainer videos, educational videos
- Documentary-style narrative videos
- Multi-scene videos with voiceover and subtitles

## Complete Workflow

### Step 1: Analysis & Planning

- Identify key information: creative requirements, language, style (realistic/cartoon/anime), target audience, theme, tone.
- Maintain consistent style throughout the entire video -- do not mix styles. Emphasize the chosen style in all prompts.
- Determine whether the video has a protagonist (a main character/subject that needs to remain consistent across multiple scenes):
  - **Has protagonist** (e.g., product review, character story): requires reference images for consistency
  - **No protagonist** (e.g., landscape tour, abstract topic): no reference images needed
- **Protagonist Handling Pipeline (CRITICAL)**:
  1. If the user provides a reference image -> use `read_media` to analyze its visual features (appearance, clothing, hairstyle, body type, distinctive features), save the description.
  2. If no reference image but a protagonist is needed -> first generate one via the image agent, then analyze with `read_media`.
  3. **Every task_description sent to the image agent must include BOTH the protagonist description AND the reference image path.** The image agent is stateless -- without telling it what the protagonist looks like, it will generate random characters.
  4. task_description example: "Generate 5 scene images. The protagonist is a young woman with long black hair, wearing a red dress, slim build (reference image: /path/to/ref.png). Use this as image_paths reference for all images. ..."

### Step 2: Create Storyboard Script

- Generate the main storyline based on requirements, adjusting length as needed.
- **Calculate scene count from target duration**:
  1. Total target duration (e.g., "3 minutes" = 180s)
  2. Subtract intro (6s) + outro (6s) = available seconds for main scenes
  3. Assume each main scene averages ~8s (mix of 6s and 10s), calculate: `main_scene_count = ceil(remaining / 8)`
  4. 3-minute video: at least **21 main scenes** (168s / 8 = 21)
  5. 1-minute video: at least **6 main scenes** (48s / 8 = 6)
- Create a coherent, logical storyboard script:
  - **Intro scene**: Theme text centered on screen, no voiceover. 6 seconds.
  - **Main scenes**: First-frame description + video motion description. Includes voiceover or dialogue. Each scene 6s or 10s (maximum 10s per scene). Keep voiceover text length controlled -- ensure it can be spoken within 10 seconds.
  - **Outro scene**: Theme text centered on screen, no voiceover. 6 seconds.
  - The exact duration of each main scene (6s or 10s) is determined in Step 4 after audio generation based on actual audio length. Do not preset all scenes to 6s during the storyboard phase.
- **Important**: Total storyboard duration (sum of all scene durations) must approximate the user's requested duration. If the user wants 3 minutes, the storyboard must have enough scenes to fill approximately 180 seconds. Do not create only 8-10 scenes for a 3-minute video.

### Step 3: Generate Scene Images (image agent)

- Generate first-frame images for all scenes.
- For scene transitions: generate N+1 images for N scenes (the last scene needs an additional end-frame image).
- Prohibited: no real celebrities, copyrighted characters, branded works, gore or violent content.
- **task_description must include (CRITICAL)**:
  - Exact number of images to generate
  - Detailed English prompt for each image (scene content, composition, lighting, style)
  - Intro/outro scenes: describe text content and its position in the frame
  - **If there is a protagonist**: include BOTH the reference image path AND the protagonist appearance description (from Step 1's `read_media` analysis). The image agent is stateless -- missing this information will result in random characters.
  - Aspect ratio -- all images in the same batch must use the same aspect ratio (portrait video defaults to 9:16, landscape video 16:9). Do not mix orientations.
  - Style requirements (e.g., "photorealistic cinematic travel photography")

### Step 4: Generate Voiceover Audio (audio agent)

- Generate a separate audio file for each scene (not one audio for the entire video).
- Intro and outro scenes have no voiceover.
- **task_description must include (CRITICAL)**:
  - Exact voiceover text for each scene (in the target language)
  - Language and voice style requirements
  - Reminder to return each scene's audio_path

### Step 5: Generate Video Clips (video agent)

- Scenes without voiceover (intro/outro): 6-second video.
- Scenes with voiceover: must check the audio duration returned from Step 4, then set video duration accordingly:
  - Audio >= 5.1s -> use 10s video duration
  - Audio < 5.1s -> use 6s video duration
- **Do not default all videos to 6s.** Most voiceover scenes require 10s videos.
- **task_description must include (CRITICAL)**:
  - Image file paths to use as first_frame_images (from Step 3)
  - **last_frame_images rules**: Only the first and last videos use last_frame_images for scene transitions. All middle videos have last_frame_images set to null. Specifically:
    - First video: last_frame_image = image[1] (first frame of the second scene)
    - Last video: last_frame_image = image[N] (extra transition image)
    - All other videos: last_frame_image = null (do not set)
  - Motion/action prompt for each video clip (what should happen in the video)
  - Duration for each clip

### Step 6: Post-Production Compositing (editing agent)

- **task_description must include all file paths (CRITICAL)**:
  - List of video files to process
  - Which audio file embeds into which video
  - Concatenation order
  - Whether to generate and add background music

### Step 7: Present Results

- Present the final video file path to the user.
