---
name: micro-expression-video-generator
description: |
  Create video-ready micro-expression prompts from a character image, script segment, or emotion phrase. Preserve identity, scene, dialogue, and camera intent; shape gaze, brows, mouth, breath, hands, and timing around the confirmed duration and intensity. After approval, generate the performance clip. Use for restrained breakdowns, longing, hesitation, tearful composure, anger, and quiet resolve; not full scriptwriting, facial rigging, lip-sync editing, or final compositing.
trigger-words: [micro-expression, character acting prompt, nuanced emotion performance, character performance, acting prompt, emotional acting, tearful composure]
allowed-tools: [question, hub_analyse_media, hub_generate_video, hub_save_file_to_session]
---

# Micro-expression Performance

Use this Skill when the user wants a character's emotional acting to feel more natural, layered, and cinematic.

## Input Modes

- **Image mode**  a character image to continue from.
- **Script mode**  a script, shot prompt, or storyboard to enhance only the acting layer.
- **Emotion phrase mode**  a short feeling or scene cue.

## References

Use the bundled references for the detailed writing system:

- `references/source-notes.md`
- `references/performance-prototype-library.md`
- `references/emotion-route-library.md`
- `references/muscle-dispatch-library.md`
- `references/video-prompt-guardrails.md`
- `references/tempo-density-guide.md`
- `references/climax-reset-patterns.md`

## Workflow

1. Read the user input and preserve existing character, scene, dialogue, and camera intent.
2. Ask for shot time if missing, then ask for performance intensity if missing.
3. Draft a concise prompt pack, write it to canvas, and only continue to video after user confirmation. MiniMax-H3 is the default model. If the user explicitly specifies another model, follow that choice after a capability check. If the user-specified model fails, allow one targeted retry, then switch to MiniMax-H3 or another available model.

## Boundaries

This Skill focuses on acting prompts and performance direction. It does not replace full scriptwriting, facial rigging, lip-sync editing, or final compositing.
