---
topic: spoken-video
activation_hints: ["dialogue", "对话", "说话", "旁白", "演唱", "rap", "voice", "audio"]
modality: video
---

# spoken-video -- native audio video routing

## Activate When
The video itself needs speech, singing, narration, SFX, or music as part of the generated clip.

## Decision Test
If the user wants a generated video with audible performance, prefer a video vendor with native audio. If the user wants post dubbing, subtitles, music replacement, or final mixing, use deterministic postprocess after video generation.

## Action
- Prefer `<knowledgeDir>/vendors/minimax.md` for default native-audio video. Use `<knowledgeDir>/vendors/seedance.md` or `<knowledgeDir>/vendors/kling-omni.md` only when an explicit lock or hard capability requirement excludes MiniMax H3.
- Write natural performance and audio intent: who speaks/sings, exact quoted dialogue when needed, tone, ambience, and timing.
- Do not add technical synchronization/control wording to prompts; it reduces creative quality and is not a reliable control surface.
- Use TTS + `hub_ffmpeg` only for external dubbing, replacing/mixing audio, or final timeline assembly.
- Keep quoted dialogue in the user's language unless they ask to translate.
