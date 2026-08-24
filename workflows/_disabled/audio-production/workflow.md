---
project_type: audio-production
stages: [intent, source-grounding, script-lyrics-voice, audio-gen, post]
---

# Audio Production — standalone speech / music / audio post workflow

> **进入信号**：独立旁白/配音、多角色台词、BGM/歌曲、翻唱、提取人声/伴奏、音频清理、音频混音；简单一条 TTS 或纯 BGM 可 direct。

## Principle

Audio is a first-class deliverable. Do not hide voice, lyrics, stems, subtitles, or mix decisions inside a video plan when the user asked for standalone audio.

## Stages

| Stage | Output | Required action |
|---|---|---|
| Intent | deliverable type, language, duration target, speaker/music roles, input sources, final format | Ask only when a role or output choice changes the asset. |
| Source Grounding | text/script, lyrics, reference audio roles, voice sample, target timing, copyright/similarity limits | Block when a required source is missing. |
| Script / Lyrics / Voice | confirmed TTS text, role voice choices, lyrics, cover lyrics, or stem plan | Check every new voice and every generated or edited lyric before Audio Gen. |
| Audio Gen | one work item per TTS scene, music bed, song, cover, stem, or processed source | selected audio vendor/tool card |
| Post | trim, normalize, stitch, requested subtitle export, stem/mix/mux, final canvas node | `<workflowsDir>/_shared/audio-pipeline.md` |

## Rules

- Planner must also read `<workflowsDir>/_shared/stage-execution-plan.md` and `<workflowsDir>/_shared/audio-pipeline.md`.
- TTS needs text, language, speaker role, and either an official `voice_id` / `hub_voice_prepare` `items[]` catalog choice gate, or a SeedAudio reference/custom voice condition for `seed-audio-1.0`. Do not silently use a default voice when the voice affects the result; missing `voice_id` alone does not force SeedAudio.
- Different speaking roles use different voices; the same role keeps the same voice across scenes and revisions.
- Multi-scene speech should produce per-scene audio, not one monolithic track, unless the user asks for a single continuous read. Subtitle files are produced only when requested.
- Song generation requires user-confirmed lyrics. If the agent generates or edits lyrics, stop after writing them and wait for user review before music generation.
- Cover or stem work preserves the user's source role: main song, vocal, instrumental, style reference, voice reference, or cleanup source.
- Instrumental BGM is one reusable music bed unless the user asks for variants; default BGM / score generation to `elevenlabs-music-v2` and pass concrete duration params when the user gives an explicit generated duration parameter. Vocal or lyrics-first songs default to `music-3.0` after lyrics are confirmed. If exact reviewed lyrics conflicts with explicit duration/arrangement, ask the tradeoff before generation.
- Write stable output `id`, input/voice `refs`, source range or timing evidence in `source`, target duration/output format/post-mix policy in `render`, and an explicit operation. TTS items carry text, language, and speaker role. Music items carry a final `prompt`. Put vendor/model locks in stage `execution_locks`.
- Document stages are planner-owned canvas nodes: planner writes or patches script, lyrics, or mix notes, returns refs in the Stage Execution Plan, and the orchestrator routes revisions back through planner.
- Final audio/postprocess outputs need a canvas node. Path-only postprocess is not complete until `hub_canvas_write_node(kind:"media")` returns `nodeId`.

## Anti-patterns

- Generating song music before lyrics are confirmed.
- Re-picking a role voice during a later scene because the stage omitted the earlier voice ref.
- Treating a music reference as permission to copy melody or copyrighted vocal identity.
- Creating per-clip BGM for a later video mix.
- Delivering a processed local path without adding it to canvas.
