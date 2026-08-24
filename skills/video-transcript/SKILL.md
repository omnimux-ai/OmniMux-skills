---
name: video-transcript
description: |
  Transcribe uploaded videos or audio files into readable timestamped Markdown transcripts, subtitle files, key-point summaries, and reusable quotes. Use for video-to-transcript, audio transcription, podcast transcription, interview extraction, meeting recordings, searchable archives, subtitle generation, or turning media into structured notes. Default workflow: quickly extract/normalize audio with ffmpeg, run the built-in ASR subtitle generator, then format the transcript; local Whisper is a fallback only when the built-in ASR fails or the user explicitly requests offline/local transcription.
trigger-words: [video-transcript, transcribe, transcript, video transcript, audio transcript, speech-to-text, subtitles, captions, 转录, 视频转录, 逐字稿, 字幕, 视频转文字, 音频转文字, 提取字幕]
---

# Video Transcript Workflow

This skill turns uploaded video or audio files into accurate, readable transcripts. It is not a Whisper-first workflow. The default production path is:

```text
media file
→ ffmpeg probe
→ fast audio extraction / normalization
→ built-in ASR subtitle generation
→ SRT review
→ readable Markdown transcript
→ optional Whisper fallback
```

Use this whenever the user uploads a media file and asks for transcription, subtitles, a readable Markdown transcript, quote extraction, podcast repurposing, interview notes, meeting notes, or a searchable audio archive.

## Core Principle

ASR engines only need audio. For video files, always prepare a clean audio file first. This makes transcription faster, avoids container/codec compatibility issues, creates a reusable intermediate file, and makes failures easier to diagnose.

Whisper is useful, but it is optional and dependency-heavy. Treat it as a local/offline fallback, not the default path.

---

## STEP 1: Confirm the Input

Accept common video and audio files, including:

- Video: `.mp4`, `.mov`, `.m4v`, `.webm`, `.mkv`, `.avi`
- Audio: `.mp3`, `.wav`, `.m4a`, `.aac`, `.flac`, `.ogg`, `.opus`

If the media analysis tool does not recognize a valid media extension, do not stop immediately. Use ffmpeg probing instead, because formats like `.m4v` may still be perfectly valid.

Check:

1. File exists and is accessible.
2. Duration is reasonable.
3. At least one audio stream exists.
4. Language is known from user context if specified; otherwise auto-detect or choose the likely language from the content.

If there is no audio stream, stop and tell the user the file cannot be transcribed because it contains no audio.

---

## STEP 2: Extract and Normalize Audio First

For every video transcription task, extract audio before ASR.

Preferred normalized ASR audio format:

```text
WAV
mono
16 kHz
PCM signed 16-bit
```

Equivalent ffmpeg logic:

```bash
ffmpeg -i input_video.mp4 -vn -ac 1 -ar 16000 -c:a pcm_s16le asr-input.wav
```

Meaning:

- `-vn`: ignore video stream
- `-ac 1`: convert to mono
- `-ar 16000`: normalize sample rate to 16 kHz
- `-c:a pcm_s16le`: produce standard WAV PCM audio

For audio inputs, still normalize when needed so downstream ASR receives the same predictable format.

Keep the extracted audio path. It may be reused for:

- re-transcription
- fallback Whisper transcription
- vocal/background separation
- audio cleanup
- voice clone reference preparation
- manual review

---

## STEP 3: Primary ASR Engine — Built-In Subtitle Generation

Default engine: use the built-in media subtitle/ASR capability after audio extraction.

Expected output:

- SRT subtitle file as the source of truth
- optional ASS subtitle file for burn-in workflows, if the tool returns one
- cue count and recognized duration

Use the SRT for transcript formatting. Do not burn subtitles into video unless the user explicitly asks, and if the current host workflow forbids subtitles, explain that subtitle burn-in is not supported in that chain.

Primary ASR succeeds when:

1. An SRT file is produced.
2. The cue count is greater than zero.
3. Recognized duration roughly matches the media duration.
4. The language is plausible.
5. The text is not mostly empty or repeated hallucination.

If primary ASR succeeds, do not run Whisper. Avoid duplicate work.

---

## STEP 4: Whisper Fallback Policy

Use local Whisper only as a fallback.

Trigger Whisper when one of these is true:

- the built-in ASR tool fails
- the built-in ASR returns an empty or invalid transcript
- the built-in ASR language is clearly wrong
- the user explicitly says “use Whisper”
- the user requires local/offline transcription
- the user wants Whisper-specific JSON/TSV output and dependencies are already available

Before using Whisper, check dependencies quickly:

```bash
python3 -c "import whisper, torch; print('whisper ok')"
```

If dependencies are missing, do not silently spend a long time installing large packages. Explain that Whisper is unavailable locally and ask whether to install it, unless the user has already authorized installation.

Whisper dependencies are heavy, especially `torch`. Runtime installation may fail or take a long time on unstable networks. Prefer preinstalled Whisper for fallback use.

When Whisper is available, transcribe the normalized WAV, not the original video. Suggested defaults:

- Short clips under 5 minutes: `small` or `medium`
- Long recordings: `small` first for speed
- High-accuracy deliverables: `medium` or `large` if resources allow
- If language is known, pass it explicitly; for Chinese use `zh`

Whisper can output:

- `txt`
- `srt`
- `vtt`
- `json`
- `tsv`

Prefer `json` plus `srt` when a readable Markdown transcript will be produced, because JSON preserves segment data and SRT is easy to review.

---

## STEP 5: Read and Clean the Transcript Source

Read the generated SRT or JSON before writing the final document.

Cleaning rules:

1. Preserve timestamps.
2. Merge overly short subtitle fragments into readable paragraphs.
3. Add punctuation and paragraph breaks lightly.
4. Correct obvious ASR spacing and casing issues.
5. Do not rewrite the speaker’s meaning.
6. Do not invent missing content.
7. Mark uncertain phrases when they may be ASR errors.
8. For brand names, people names, product names, and technical terms, prefer the user-provided spelling if available.

Speaker labels:

- If there is clearly one speaker, label the transcript with that speaker if known, otherwise use a neutral label such as “Speaker”.
- If multiple speakers are obvious from the audio/text, label as “Speaker 1”, “Speaker 2”, or inferred names when reliable.
- Do not invent specific speaker names without evidence.
- Whisper alone does not reliably identify speakers; speaker diarization is a separate task.

---

## STEP 6: Produce the User-Facing Markdown

When the user asks for a readable transcript, create a Markdown document rather than only returning raw SRT.

Recommended structure:

```markdown
# <file name or video title> 完整字幕逐字稿

## 视频/音频信息

- 文件名：...
- 时长：...
- 语言：...
- 说话人：...

## 简短摘要

...

## 章节目录

1. ...
2. ...

## 完整逐字稿

### 章节标题

[00:00:01 → 00:00:08]
**说话人：** ...

## 关键观点总结

- ...

## 可复用金句/引用

- “...”

## 转录备注

本稿基于自动语音识别生成，并已进行轻度标点、断句和阅读性整理。专有名词和个别短句建议结合原始音视频人工校对。
```

If the user asks for SRT/VTT only, provide the subtitle file and do not over-format.

If the user asks for content repurposing, add the relevant sections, such as:

- blog outline
- social posts
- quote bank
- episode notes
- search keywords

---

## STEP 7: Save Outputs

For a transcript deliverable, save the Markdown as a canvas text node so the user can review and edit it.

Keep intermediate files available when useful:

- normalized WAV audio
- SRT subtitle file
- JSON transcript if generated

Do not duplicate generated media nodes unnecessarily. If a file is already registered by the tool, use the returned path as-is.

---

## Failure Handling

### No audio stream

Stop and say the media file has no audio track, so it cannot be transcribed.

### Built-in ASR fails

Fallback sequence:

```text
built-in ASR failed
→ check local Whisper availability
→ if available, transcribe normalized WAV with Whisper
→ if unavailable, ask whether to install Whisper dependencies or provide another media file
```

### Whisper dependencies missing

Say clearly:

```text
本地 Whisper 当前不可用，因为缺少 openai-whisper / torch。主 ASR 已失败；是否允许我安装依赖后再试？
```

Do not repeatedly retry the same failed installation command. If `pip` or `brew` fails because of network/DNS issues, report that exact failure and ask for permission before another install route.

### Poor transcript quality

If the transcript is noisy, suggest one or more of:

- upload a cleaner audio track
- separate voice from background music
- reduce background noise
- provide known speaker names / glossary
- rerun with Whisper medium/large if available

### Language mismatch

If output language is wrong, rerun ASR with explicit language when possible.

---

## Practical Defaults

Use these defaults unless the user specifies otherwise:

- Audio extraction: mono, 16 kHz, WAV PCM s16le
- Primary ASR: built-in subtitle generator
- Fallback ASR: local Whisper only if installed or authorized
- Transcript source of truth: SRT or JSON segments
- Final readable deliverable: Markdown text node
- Speaker labels: conservative, evidence-based
- Edits: light punctuation and paragraphing only

---

## Boundary Notes

- This skill performs transcription and transcript formatting.
- It does not create music or generate new voice audio.
- It does not guarantee perfect speaker diarization.
- It should not burn subtitles into video unless the user explicitly requests it and the active workflow permits subtitle work.
- It should not treat Whisper as mandatory; Whisper is a fallback/local option.
