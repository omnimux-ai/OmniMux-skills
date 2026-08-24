---
name: cinematic-scenes
description: |
  Generates premium cinematic alternative shot coverage — additional angles and insert shots — from a single uploaded reference scene using Nano Banana Pro under an expert cinematographer / master gaffer system role. Input is one reference image (fresh upload or prior generation) plus count / aspect ratio / style-variance settings; output is a parallel batch of 2N images (N angles + N insert shots) rendered with 35mm/70mm film aesthetics, motivated lighting, and Kodak Vision3-style color science.
  Use whenever the user wants to generate alternative camera angles, produce insert shots, add cinematographer coverage to an existing scene, expand a single frame into a full shot list, or apply extreme stylistic variations (Dutch angles, chiaroscuro, macro probe) to a reference image.
trigger-words: [电影场景, 电影感机位, 替代机位, 插入镜头, 分镜覆盖, 摄影师覆盖, 荷兰角, 明暗对比, cinematic scenes, cinematic coverage, alternative angles, insert shots, cinematographer coverage, shot coverage, cinematic variants]
allowed-tools: [hub_generate_image, hub_read_media, hub_save_file_to_session, question]
---

# Cinematic Scene Generation

Produce premium cinematic image variations (angles and insert shots) from a reference scene under an expert Cinematographer + Master Gaffer system role.

## Required inputs

1. **Reference image** — an uploaded image or the result of a prior generation job.
2. **Configuration** — count, aspect ratio, and style variance (all confirmed in Step 1).

## Workflow

### Step 1 — Pre-generation survey via `question` (mandatory)

Before touching credits, run three sequential `question` calls to lock structural preferences:

Call 1:
- question: "How many alternative angles and insert shots would you like to generate?"
- options: ["3 of each (6 total)", "5 of each (10 total)", "8 of each (16 total)", "Custom"]

Call 2:
- question: "What aspect ratio do you want for these shots?"
- options: [
    "16:9 — Cinematic Landscape",
    "2.39:1 — Ultra-Cinematic Wide",
    "9:16 — Vertical Story",
    "1:1 — Square"
  ]

Call 3:
- question: "Do you want standard cinematic coverage or extreme stylistic variations?"
- options: [
    "Standard Coverage (wide master / medium / OTS / high angle / side profile — realistic continuity)",
    "Extreme Coverage — Bold & Surreal (Dutch angles, chiaroscuro, negative fill, neon accents, macro probe, expressionistic framing)"
  ]

Do NOT default silently — always wait for user reply on all three.

### Step 2 — Load the reference image via `hub_read_media`

Call `hub_read_media` with:
- file_path: the reference image path in the current session

Confirm the image is accessible and grab its asset ID. If the user just generated it in the same session, reuse the existing asset — do NOT re-upload. Deduplicate by sha256 against prior uploads to reuse identical assets when applicable.

### Step 3 — Craft prompts with the mandatory system role block

Every prompt string must embed the following system directive block **exactly verbatim** (do not summarize, do not attempt to hoist into a hub-level system message):

```
You are a world-class Cinematographer and Master Gaffer. Your goal is to generate images that are indistinguishable from 35mm or 70mm motion picture film. Avoid AI gloss, plastic skin, waxy faces, overprocessed HDR, oversharpened edges, uniform global sharpness, impossible depth of field, perfect symmetry, sterile CGI surfaces, game-engine lighting, inconsistent shadows, floating objects, temporal flicker, morphing geometry, warped hands, smeared hair, unreadable distorted text, fake bokeh, excessive lens flare, neon clipping to white, and hard digital highlight clipping.
Optics: Always default to Arri Alexa 65 or Panavision Millennium DXL2 sensors. Use specific focal lengths (e.g., 35mm for environmental shots, 85mm for portraits). Captured on ARRI Alexa 35 in ARRIRAW LogC4, ARRI REVEAL color science, K445-style subtle organic texture, gentle highlight rolloff, natural skin tones, expert colorist grade. Natural micro-texture, imperfect skin and surfaces, no beauty smoothing, no waxy faces, no global oversharpening, subtle sensor noise and filmic grain embedded in luminance. 24 fps, 180-degree shutter, natural motion blur, physically plausible movement, stable geometry, consistent wardrobe and background details.
Lighting: Implement "Rembrandt lighting," "Negative Fill," or "Motivated Lighting." Ensure high dynamic range with soft highlight roll-off and deep, textured shadows. Motivated cinematography lighting, clear key direction, practical sources, realistic shadow falloff, bounce light, negative fill, atmospheric depth. Layered foreground, midground, and background, atmospheric haze, real parallax, focus plane with natural falloff, no impossible infinite sharpness.
Color Science: Apply a custom Kodak Vision3 5219 film emulation. Prioritize perfect skin tones (natural texture, no "plastic" look) and a professional color grade with rich micro-contrast. Soft ARRI-style highlight rolloff, preserved highlight color, no hard clipping, practical light bloom, subtle halation only around intense sources.
Integration: Every character must be perfectly composited into the environment with matching light direction, bounce light, and atmospheric depth (haze/halation).
```

Append per-shot direction after the block. Apply the stylistic modification rule from Step 1:

- **Standard coverage** — logical continuity + professional coverage (wide master, medium shot, over-the-shoulder, high-angle coverage, side profiles).
- **Extreme coverage** — bold, radical, surreal (extreme low Dutch angles, intense chiaroscuro, high-contrast negative fill, stark neon accents, abstract lens distortions, macro probe lenses, dramatic expressionistic framing).

For N angles + N insert shots, you build 2N distinct prompt strings, each ending with a specific shot description.

### Step 4 — Confirm before spending credits

Present to the user:
- Count (2N) and split (N angles / N inserts)
- Aspect ratio + style variance from Step 1
- Reference image asset ID (from Step 2)
- Vendor `nano-banana`, model `nano_banana_pro` (locked for this workflow)
- A representative example prompt showing the system block + one shot direction so the user can gut-check

Wait for explicit approval. Do NOT poll for execution completion unless downstream dependencies are immediately required in the same turn.

### Step 5 — Parallel batch submission via `hub_generate_image`

Submit ALL 2N requests in ONE parallel `hub_generate_image` batch:

```
hub_generate_image with:
  vendor: nano-banana
  model: nano_banana_pro
  prompt: <system-role block + per-shot direction, 2N variants>
  aspect_ratio: <from Step 1>
  resolution: 2k
  medias:
    - role: image
      data: { id: "<reference_image_asset_id>", type: "media_input" }
```

Respect workspace-wide concurrency limits. If 2N exceeds limits, split into concurrent loops (e.g. two rounds of N each), NOT serial one-by-one.

### Step 6 — Register outputs to session

For each of the 2N returned images, call `hub_save_file_to_session` with:
- file: <returned image path>
- file_type: image

Report back to the user grouped by category (angles first, inserts second), each with a plain-language description of the framing/setup chosen.

## Notes for Hub adaptation

- All coverage generation goes through `hub_generate_image` with the Nano Banana Pro backend — submit the 2N prompts as a single parallel batch, honouring workspace concurrency limits.
- The reference image is already in the session; access it via `hub_read_media` (or pass its asset ID directly). Do not re-upload if the user just generated it in the same session.
- Register every angle / insert shot with `hub_save_file_to_session` (`file_type: image`) so the coverage set lands in the workspace files panel as a batch.
- Use `question` to run STEP 1 pre-generation survey (count, aspect ratio, style variance) — do not silently pick defaults before user confirmation.
- The base system role block must be embedded verbatim in every prompt; do not summarise it, and do not attempt to hoist it into a hub-level system message.
