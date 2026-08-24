---
name: co-op-game-intro-generator
description: |
  Create a two-player co-op game menu or opening animation from two player names, a title, a visual style, and optional character references. Lock identity cues, generate one menu approval image, then use it to rebuild character, interface copy, timing, and motion instructions before producing the final H3 video. Use for game concepts, character-led menus, and social intros, not playable game development, exact logo replication, complex multi-page interfaces, or character-free title sequences.
trigger-words: [co-op intro, game menu, two-player game intro, H3 game intro, two-player game opening, game main menu, player names, game title]
allowed-tools: [question, hub_generate_image, hub_generate_video, hub_analyse_media, hub_canvas_get_node, hub_save_file_to_session]
---

# Co-op Game Intro Generator

Use this Skill when the user wants a reusable two-player co-op game menu or opening-animation workflow. The workflow collects player data, game title, visual style, and optional character references; generates one confirmation image; waits for approval; then creates a final H3-ready video prompt and video plan.

## Platform Compatibility Rules

This Skill is platform-ready and must keep the publishable Skill layout:

- `SKILL.md` is the default English runtime file.
- `SKILL.cn.md` is the Chinese mirror and must stay semantically aligned.
- `meta.yaml` carries display metadata, tags, version, author, source, and optional covers.
- Runtime prompt templates live in `references/` and must be loaded by path instead of being rewritten from memory.
- Do not hardcode project-specific output paths. Use files returned by the generation or editing tools.
- Do not skip user confirmation before final video generation.

## Required References

These two templates are mandatory runtime inputs, not optional background notes:

- Use `references/h3-confirmation-image-template.md` when building the confirmation-image prompt in STEP 3 and generating the first confirmation image in STEP 4.
- Use `references/h3-video-prompt-template.md` when refilling the final video prompt in STEP 6.

If either template is unavailable, stop and report that the Skill package is incomplete instead of improvising a different prompt structure.

## STEP 1: Collect visual style

Ask the user to choose a preset style or enter a custom style. The selected style has top priority and controls palette, background texture, character rendering, outfit direction, UI colors, button/icon style, typography texture, and atmosphere.

If the user is unsure, offer a concise set of style examples rather than generating immediately.

## STEP 2: Collect player and game information

Collect:

- PLAYER 1 name
- PLAYER 2 name
- Game title
- Optional PLAYER 1 character reference image
- Optional PLAYER 2 character reference image

When character images are provided, use them only for identity mapping: recognizable face silhouette, hairstyle, glasses, relative facial proportions, and distinctive traits. Do not inherit photographic realism, skin texture, real-world lighting, camera quality, or the source image style unless the selected style explicitly requires it.

## STEP 3: Build the confirmation-image prompt

Load and follow `references/h3-confirmation-image-template.md` as the required prompt skeleton. Fill every placeholder in order and keep the fixed menu framework intact.

The filled prompt must preserve:

1. 16:9 landscape game main menu composition.
2. Two centered playable characters.
3. Upper-left player cards.
4. Right-side vertical menu.
5. Continue as the primary visual focus.
6. Game title as a readable original title treatment.
7. Palette-linked UI, icons, buttons, typography, and decorative elements.
8. Identity anchors from uploaded character references.

The selected style may change rendering, materials, textures, visual motifs, lighting mood, UI material language, and typography appearance, but must not change layout hierarchy or menu logic.

## STEP 4: Generate one confirmation image

Generate only one confirmation image from the filled template. The image is a high-cost decision checkpoint and must be used to confirm style, layout, identity mapping, readable text, and UI direction.

Do not generate the final video in the same step.

## STEP 5: Wait for approval or revision

Wait for the user to approve the image. If the user changes style, names, game title, identity, layout readability, or image direction, return to STEP 3 and regenerate a confirmation image.

Only continue when the user clearly approves the image.

## STEP 6: Refill the H3 video prompt

After approval, load `references/h3-video-prompt-template.md` and refill it using:

- Confirmed image as UI/layout reference.
- PLAYER 1 and PLAYER 2 names.
- Game title.
- Uploaded identity references, if available.
- Confirmed visual style and palette language.
- Final UI copy.
- Timeline events and motion directions.
- Negative constraints.

The video prompt must preserve the fixed event framework while adapting all visual treatment to the selected style.

## STEP 7: Generate final video

Generate the final co-op game intro video only after approval. Keep the output connected to the approved confirmation image and identity references.

## STEP 8: Repair common failures

If text is unreadable, reduce on-screen text and strengthen typography constraints. If identities swap, reinforce player position, name mapping, outfit anchors, and color mapping. If faces drift, reuse uploaded references and explicitly preserve identity anchors while rendering the face in the selected style. If style becomes weak, rewrite the style-dependent fields in Overall Style, Color Palette, Character Style, Background, Game UI, Buttons, Icons, and Typography without changing the fixed framework.

## Trigger Test Examples

Should trigger:

- “Make a co-op game intro with two player names and a menu screen.”
- “Create a two-player game main-menu opening video.”
- “Use H3 to create a two-player game menu animation.”

Should not trigger:

- “Build a playable co-op game prototype.”
- “Create a generic logo-only title sequence.”
- “Design a complex multi-page game settings UI.”
