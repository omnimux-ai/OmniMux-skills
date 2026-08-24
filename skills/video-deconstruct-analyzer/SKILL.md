---
name: video-deconstruct-analyzer
description: |
  Deep AI-video deconstruction and replica-prompt assistant. Applies when the user uploads an AI-generated video, keyframe screenshots, or a text description and asks to "deconstruct the video", "analyze the video", "reverse-engineer the video", "replicate the video / camera / style / plot", or says "video deconstruct". Optimized for the Hub toolchain: read video metadata first, build a canvas evidence chain from dense keyframes, output a structured Markdown deconstruction report, and generate Seedance 2.0 Chinese-language timestamp-storyboard prompts under the rule of "prefer ≤15 seconds per prompt, use as few prompts as possible". Primarily serves AI-video reference analysis — not general editing, subtitle translation, or long-form film criticism.
trigger-words: [deconstruct video, analyze video, reverse-engineer video, video replica, replicate camera, replicate style, replicate plot, dense keyframes, video-deconstruct, video deconstruct]
allowed-tools: [hub_analyse_media, hub_ffmpeg, hub_canvas_write_media_node, hub_canvas_write_text_node]
---

# Video Deconstruct Skill CC

A Hub-optimized AI-video deep-deconstruction Skill. The goal is not a summary but truly understanding the video via metadata, dense keyframes, and a structured report — then converting the findings into reusable Seedance 2.0 Chinese-language replica prompts.

## Scope

Use this Skill when the user:

- Uploads an AI video and asks to deconstruct, analyze, reverse-engineer, or replicate.
- Wants to reference a video's camera work, style, plot, lighting, rhythm, or action chain.
- Uploads keyframe screenshots and wants to reverse-engineer style and generation prompts from static frames.
- Provides only a text description but wants an analysis report and prompt set usable for video generation.

Do NOT use this Skill when the user only needs:

- Subtitle extraction, translation, or a plain summary.
- Regular editing, compression, transcoding, or subtitling.
- Pure subtitle recognition, verbatim transcript, or audio engineering; only if the user specifically asks for a deep audio/subtitle dive, branch into Hub audio/subtitle tools as an optional path.
- Long-form live-action film criticism or plot commentary.
- Pure text screenplay writing.
- Directly generating video without deconstruction analysis.

## Overall Principles

1. **Evidence first, conclusions later**: read metadata and keyframes before writing the report and prompts.
2. **Dense keyframes**: if semantic reading fails, times out, or is insufficient, extract dense keyframes — do not settle for a coarse 5-6 frame analysis.
3. **Canvas traceability**: the keyframe montage must be placed on the canvas; the Markdown report must link the keyframe nodes as `sourceNodeIds`.
4. **Report saved to canvas first**: once triggered, the default is to create a Markdown report node; the chat only carries a summary.
5. **Prompts prefer ~15 seconds each**: videos under 15 seconds get 1 prompt; longer videos use the theoretical minimum number of prompts.
6. **Chinese output**: when the user writes in Chinese, the report, analysis, and prompts are entirely in Chinese.

## STEP 1: Read Metadata and Decide the Path

### Video Input

First, use `hub_analyse_media` in `metadata` or `both` mode to gather deterministic info:

- Duration
- Width × height and ratio
- Portrait or landscape orientation
- Media type

If `semantic` succeeds and is detailed enough, proceed to STEP 3. If semantic reading times out, fails, is too broad, or lacks action detail, branch into STEP 2 (dense keyframes).

Semantic prompts should target the deconstruction goal, e.g.:

> Prepare for AI-video deconstruction: extract the video's main subject, scene/environment, main action/plot, camera motion, lighting and color, visual style, rhythm, music/SFX cues. Judge — in the Seedance 2.0 replica-prompt approach — the theoretical minimum number of prompts (≤15 seconds each) that cover the entire video.

### Screenshot Input

If the user uploads only screenshots, do a static deconstruction and state that screenshots lack motion continuity and audio. With 3+ screenshots, infer a timeline from user order or visual logic.

### URL or Text Input

- URL only: do not promise to download external-platform videos; ask the user to upload the video file, keyframes, or a text description.
- Text description only: analyze directly, but state in the report "based on user text description, without direct video reading".

## STEP 2: Dense Keyframe Extraction & Canvas Evidence Chain

When semantic reading fails, times out, is too broad, or the user asks for finer detail, use `hub_ffmpeg` to extract a keyframe montage.

### Density Standards

- 0-15 s videos: at least 10-12 keyframes; recommend 12 evenly-sampled frames or `fps=0.75` composed as `4x3` or `3x4`. Avoid `fps=1` on a 15-second video, which produces 15-16 frames but gets truncated by a 12-slot tile.
- 16-30 s videos: at least 16-20 keyframes; recommend one `4x3` montage per 15-second segment. If action is dense, switch to `fps=1,tile=5x3` per segment or split into two montages.
- 31-60 s videos: extract at least 1 frame per 1.5-2 seconds, and split into multiple montages by 15-second segments.
- Fast-action / heavy-transition / VFX-dense videos: raise to 1 frame per second, enlarge tile or split into multiple montages — never let tile capacity drop below actual frame count.
- Static long takes or minimally-changing videos: density may be reduced, but the reason must be stated in the report.

### Hub ffmpeg Parameter Templates

For videos ≤15 s, default 12-frame montage to avoid tile truncation:

```text
args: ["-i", "<video_path>", "-vf", "fps=0.75,scale=480:-1,tile=4x3", "-frames:v", "1"]
output_type: "image"
filename: "video_keyframes"
```

Action-dense 15 s video may use a 15-frame montage:

```text
args: ["-i", "<video_path>", "-vf", "fps=1,scale=420:-1,tile=5x3", "-frames:v", "1"]
output_type: "image"
filename: "video_keyframes"
```

For ~30 s videos, run two segmented montages; for accurate cutting, prefer `-ss` after `-i`:

```text
Segment 1 args: ["-i", "<video_path>", "-ss", "0",  "-t", "15", "-vf", "fps=0.75,scale=480:-1,tile=4x3", "-frames:v", "1"]
Segment 2 args: ["-i", "<video_path>", "-ss", "15", "-t", "15", "-vf", "fps=0.75,scale=480:-1,tile=4x3", "-frames:v", "1"]
```

If the real frame count exceeds tile capacity, always enlarge tile or split montages. Do not fall back to 5-6 frames for convenience.

### Canvas Evidence Chain

1. The extracted montage must be placed on the canvas via `hub_canvas_write_media_node`.
2. Downstream Markdown reports use `hub_canvas_write_text_node`, referencing the keyframe node as `sourceNodeIds`.
3. In the report's metadata, state the basis: direct video reading / dense keyframes / user screenshots / text description.

## STEP 3: Align the Analysis Direction

If the user has already said "replicate the video / analyze the style / look at the plot / all dimensions / save to canvas", do not repeat the question — continue with the stated or known preference.

If the user only says "deconstruct this video" without stating purpose, ask once:

1. Which dimensions to focus on? Suggest 3-5 out of: subject/character, scene/environment, plot/action, camera/motion, lighting/color, style/aesthetic, rhythm/editing, music/SFX.
2. Analysis purpose: replicate video / reference style / reference plot / pure analysis.
3. Save to canvas? Default: yes.

If the user's reply is incomplete, fill defaults and continue — do not re-ask:

- Only "replicate": dimensions — character, plot, camera, lighting, style; purpose — replicate video.
- Only "analyze style": dimensions — camera, lighting, style, rhythm; purpose — reference style.
- Only "look at the plot": dimensions — character, scene, plot, SFX; purpose — reference plot.
- "All dimensions / everything": expand all 8; purpose — pure analysis.
- "You decide / just start": defaults to character, plot, camera, lighting, style.

## STEP 4: Deep Deconstruction Report

The report body must occupy most of the final output. Deeply dive on user-selected dimensions; unselected dimensions get one line.

Fixed report structure:

1. Metadata: duration, aspect ratio, resolution, inferred FPS, inferred source model, style category, analysis basis.
2. One-line take: ≤30 characters summarizing content, style, and mood.
3. Keyframe evidence: state frame count, montage count, time coverage.
4. 8-dimension analysis: character, scene, plot, camera, lighting, style, rhythm, sound.
5. Plot timeline: multiple time nodes allowed, but nodes are NOT equal to prompt count.
6. Seedance 2.0 Chinese prompts: use the theoretical minimum count.
7. A single unified negative-prompt string.
8. Why this split: rationale for segmentation, style DNA, replica risks.
9. Self-check: whether prompt count, keyframe density, and canvas evidence chain meet requirements.

For dimension write-up, see `references/core-analysis.md`. For the report template, see `references/report-template.md`.

## STEP 5: Minimum-Count Seedance 2.0 Chinese Prompts

Judge the total video duration first, then cover the video with as few Seedance 2.0 prompts as possible.

### Segment Rules

- 0-15 s: output 1 prompt; prefer a 13-15 s timestamp-storyboard style.
- 16-30 s: output 2 prompts, each near 15 s.
- 31-45 s: 3 prompts.
- 46-60 s: 4 prompts.
- And so on. Theoretical count = `ceil(duration / 15)`.

Only when the subject, scene, era, or visual style hard-cuts to something unmergeable may you output one more than the theoretical minimum — and you must state why in the report.

### Writing Rules

Prefer a timestamp-storyboard style per prompt:

```text
15 seconds, 16:9 landscape, {style/tone brief}, {subject visual anchor}.
0-3 s: {picture + action + camera + sound};
3-6 s: {picture + action + camera + sound};
6-9 s: {picture + action + camera + sound};
9-12 s: {picture + action + camera + sound};
12-15 s: {picture + action + camera + sound}.
{unified lighting / material / style constraints}.
```

Writing requirements:

- Subject descriptions come from "character/subject" visual anchors; keep wording consistent across prompts.
- Use Chinese camera-language terms — close-up, medium, low-angle looking-up, slow push, follow, orbit, shallow DoF.
- Prefer folding plot turns, rhythm changes, cuts, and SFX entry points into the same 15-second prompt, rather than splitting into multiple prompts.
- Do not generate subtitles, on-screen text, or logos in the model prompt; if text is needed, suggest post-production.
- Each prompt states duration and aspect ratio.
- Between prompts, add a "handoff" — tail-frame character position, action, lighting, camera state.

For detailed grammar, see `references/seedance-prompt-grammar.md`.

## STEP 6: Save, Group, and Final Validation

### Save to Canvas

By default, save the full report as a Markdown canvas node. Use `hub_canvas_write_text_node` once to write the full report — do not append in multiple calls.

If this round produces 2+ assets (keyframe montage + report), the execution agent handles grouping per Hub canvas rules before the final reply; the Skill itself only requires the keyframe node and the report to have a sourceNodeIds evidence chain.

### Final Validation

Before replying:

- Metadata clearly lists duration, ratio, resolution, and analysis basis.
- If semantic reading failed or info was insufficient, dense keyframes must have been used; fewer than 10 frames on a 15-second video is a failure.
- The keyframe montage is on the canvas.
- The Markdown report is on the canvas with `sourceNodeIds` linking to the keyframes.
- Prompt count equals the theoretical minimum; if higher, the reason is stated.
- Videos ≤15 s output exactly 1 prompt unless the user explicitly asks for shot-by-shot breakdown.
- Prompts are translated from report conclusions, not written from scratch again.
- For Chinese-input users, the report and prompts are entirely in Chinese.

## Trigger Tests

Should trigger:

- "Help me deconstruct this AI video and reverse-engineer Seedance prompts."
- "Analyze the camera and lighting of this video — I want to replicate it."
- "How was this Keling video made? Reverse-engineer with dense keyframes."
- "/video-deconstruct-skill-cc" with an attached video.

Should NOT trigger:

- "Add subtitles to this video."
- "Cut this video to 10 seconds."
- "Write an original short-film script."
