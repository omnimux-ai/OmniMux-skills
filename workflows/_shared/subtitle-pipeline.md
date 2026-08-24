---
utility: subtitle-pipeline
applies_to: [general-video, drama-series, ad-tvc, mv]
---

# Subtitle Pipeline — ASS timed-text postprocess

> **何时 Read**：用户、平台默认策略或已确认 shot plan 明确要求字幕 / 歌词 / readable text burn-in，或请求导出字幕文件。

## Boundary

字幕是独立的 deterministic postprocess artifact，不属于 asset anchor，也不写进视频生成 prompt 让模型渲染。视觉模型里的对白、歌词、slogan、画面文字只有在“需要被看清”时，才转成这里的 timed text / ASS / text-card 后期链路。

## Source

- Subtitles/text overlays are explicit opt-in. A workflow default counts only after intake or plan has confirmed it.
- Trusted timed text wins: user-provided `.srt` / `.ass`, tool-returned `subtitle_path`, approved per-clip dialogue excerpts with clip durations, or hand-authored timed text.
- `hub_media_transcribe mode="subtitle"` is ASR only. Use it only when no trusted timed text exists; its output is plain SRT source, not styled final subtitles.
- Per-clip dialogue excerpts may be aligned at clip level from clip durations. Word-level alignment is out of scope unless the input already supplies trusted word timing.

## ASS Format

- Burn-in subtitles default to ASS. Do not burn raw SRT directly when styled subtitles are required.
- Use `hub_subtitle_format` to convert SRT / `subtitle_path` / timed text into ASS for burn-in. Set `output_format: "ass"` unless the user explicitly asks for a subtitle file in another format.
- Always pass the final video `output_size` / resolution to `hub_subtitle_format`, derived from the post stage `execution_locks`, so safe area and font scale match the render.
- If the user gives no style, use `style_preset: "social_safe"`.
- If the user specifies style, pass only explicit overrides. Do not disable safe area, outline, background readability, or platform-safe margins unless the user explicitly asks.
- SRT / VTT / ASS export is a deliverable only when the user requests subtitle-file export. Otherwise generated SRT/ASS/VTT files are workspace intermediates.

## ASS Style Rules

- `hub_subtitle_format` classifies frame shape from `output_size` and applies these per-line limits:

| 画幅 | CJK 每行 | 英文每行 |
| --- | --- | --- |
| 竖屏 `9:16` / `3:4` | `<= 10` 字 | `<= 7` 词 |
| 横屏 `16:9` / `21:9` | `<= 16` 字 | `<= 14` 词 |
| 方屏 `1:1` | `<= 13` 字 | `<= 10` 词 |

- Overflow handling is explicit, not delegated to ffmpeg auto wrapping:
  - If one cue exceeds its per-line budget, insert an explicit line break at a semantic boundary.
  - If it still exceeds two lines, split the overflow into the next cue with timecodes continuing from the source cue.
  - Do not cut through a character, CJK word, or English word.
- Subtitle / key text / subject safe area: keep them out of top `1/8`, bottom `1/4`, and left/right `7%` of the frame unless the user explicitly requests unsafe placement.
- `MarginV` defaults by subtitle position:
  - `position: "bottom"`: portrait `H * 25%`; landscape `H * 8%`; square `H * 5%`.
  - `position: "top"`: all frame shapes `H * 12.5%` from the top.
- ASS render anchoring uses the subtitle block center (`\an5` + `\pos`) so one-line and two-line cues share the same visual center instead of the whole block jumping upward/downward when line count changes.

## Burn / Render

- Burn the formatted ASS in the final render step after trim/concat timing is settled.
- When using `hub_ffmpeg`, pass the `hub_subtitle_format.absolute_path` value to the `subtitles=` filter. Keep the formatter's relative `path` only for runtime refs and provenance.
- A burned-video postprocess path is not finished until the final video is written to canvas with `hub_canvas_write_node(kind:"media")`; requested subtitle-file export is the only reason to surface the ASS/SRT/VTT file itself.
- Do not write intermediate SRT/ASS/VTT files to canvas unless the subtitle file itself is the requested output.

## Anti-patterns

- Adding subtitles because a video has speech but the user/workflow did not request burn-in.
- Treating ASS style, safe area, or font choices as video prompt text.
- Passing relative subtitle paths into ffmpeg subtitle filters.
- Burning raw ASR SRT without a formatting step.
- Promising word-level karaoke timing from clip-level dialogue excerpts.
