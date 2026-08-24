---
utility: audio-pipeline
applies_to: [general-video, ad-tvc, mv]
---

# Audio Pipeline — voice, music, stems, and mix decisions

> **何时 Read**：workflow stage 需要独立 TTS、歌曲/BGM、翻唱、stem 分离、配音替换、最终混音，或 video workflow 点名音频 utility。

## Boundary

This card decides audio asset shape. It does not write dialogue, lyrics, or video prompts; those come from approved user text, script, lyrics, or Stage Execution Plan excerpts.

## Decision Tests

| Need | Use | Required evidence |
|---|---|---|
| In-clip dialogue or ambient SFX | native audio video work item | approved dialogue excerpt, subtitle excerpt only when requested, and selected video vendor support |
| External narration / dubbing | `audio.tts` work item | text, language, speaker role, catalog voice decision or SeedAudio reference/custom voice condition |
| Persistent video voice ref | voice anchor + trim to `<=3s` | role, sample line, trimmed node/path |
| BGM / score | `audio.music` instrumental work item | mood/use case, reuse scope, post mix policy |
| Song with vocals | lyrics gate + `audio.music` song work item | confirmed lyrics and style prompt |
| Cover/remix | cover work item | source audio role, lyrics edit policy, style target |
| Stems / cleanup | separation or postprocess work item | source path and requested stem/output role |
| Final mix | postprocess work item | ordered refs, fixed-gain replace/preserve policy, target output |

## Rules

- Prefer native video audio when speech must be synchronized with generated faces and the selected video vendor supports it.
- When the selected workflow requires native in-clip dialogue/VO, create standalone TTS, dubbing, or voice-prep items only when its audio rules or the user explicitly require them, or when the selected vendor lacks acceptable native speech.
- Use standalone TTS for off-screen VO, replacement dubbing, precise narration pacing, or vendors without acceptable native speech. A subtitle request alone adds timed text / ASR handling in Post and does not create standalone TTS.
- Plain TTS, informational narration, ordinary dialogue dubbing, and ordinary gender/age/tone preferences use official speech with catalog voice prep. Missing `voice_id` alone is not a SeedAudio trigger.
- Use `seed-audio-1.0` for film/cinematic dubbing, short-drama/radio-drama/trailer performance, reference audio/image voice replication, clearly custom natural-language voice descriptions, or speech generated together with ambience/BGM/SFX. A SeedAudio work item carries reference paths and an explicit `voice_profile` instead of an official `voice_id`.
- A voice anchor is not a final dialogue track. Use it only as a short reusable reference; final lines stay in video work items or standalone TTS work items.
- Do not stack BGM onto generated video that already intentionally contains BGM unless the user asks to replace or remix the music.
- Generate one BGM bed for the project/segment, then trim/loop/mix in post; do not generate separate BGM per shot.
- All BGM, score, instrumental music, and lyrics-first / vocal songs use `music-3.0` (songs wait for confirmed lyrics); never route music to ElevenLabs. When `render.duration_target_s` is set, generate first, then use deterministic postprocess to trim at that target and fade audio out at the ending; final runtime refs and mixing consume only the trimmed/faded output.
- Song generation must not fabricate lyrics silently. User-supplied polished lyrics can proceed; agent-drafted or edited lyrics wait for confirmation.
- Exact reviewed lyrics and a target duration both remain on `music-3.0`; postprocess enforces the target by trimming and fading out, rather than switching vendors.
- Audio duration from generation is evidence, not a promise. Record measured or tool-returned duration and let postprocess reconcile timing.
- Final mix with VO + BGM uses the plan's fixed BGM gain. Do not add ducking, volume automation, segment gain changes, or automatic music lifts unless the user explicitly requests them.
- Work items must keep source roles explicit: main song, BGM, VO, dialogue, vocal stem, instrumental stem, voice reference, SFX, or verification-only.
- Audio work items put input/voice refs in `refs`, source range or timing evidence in `source`, target duration/output format/post-mix policy in `render`, and operation in an explicit field. TTS items carry text, language, and speaker role. Music items carry a final `prompt`; vendor/model locks live in stage `execution_locks`.

## Anti-patterns

- Treating all audio as generic "soundtrack".
- Replacing user-provided music bed because the workflow also mentions BGM.
- Using full dialogue audio as a video voice reference.
- Dropping explicitly requested subtitle deliverables from standalone TTS or downstream review.
