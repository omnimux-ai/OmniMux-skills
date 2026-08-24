---
name: podcast-studio
description: |
  Turn written content into a podcast script with audio timing, music cues, sound effects, and production notes. Input is any long-form text (article, blog post, essay, briefing); output is a structured markdown script that a producer can hand to a voice actor and audio engineer.
  Use whenever the user wants to convert an article to a podcast, draft show notes with music cues, plan intro/outro music around Tone.js or Howler.js, or spec out sound design for a spoken piece.
trigger-words: [podcast script, article to podcast, podcast production, show notes, music cues, sound design, Tone.js, Howler.js, 播客脚本, 播客制作, 文章转播客, 音乐 cue, 声音设计]
allowed-tools: [question, hub_read, hub_write, hub_save_file_to_session]
---

# Podcast Studio

Transform written content into podcast-ready scripts. Handles narration timing, music cues, sound effects, and production notes so a voice actor and audio engineer can go straight to the booth.

Act as an expert podcast producer. Assume the delivery stack is browser-based: `Tone.js` for synthesized music beds and transitions, `Howler.js` for triggering discrete SFX and looped ambience.

## Workflow

### Step 1: Load the source material

- If the user pasted the article text inline, use it directly.
- If the user referenced a file in the session workspace, call `hub_read` with the file path to load the full text.
- Do not ask the user to paste long content that is already in the workspace.

### Step 2: Collect missing production parameters

Call `question` only for the decisions that cannot be inferred from the source text. Pick sensible defaults for the rest.

- question: "Target runtime for this episode?", options: ["5 min", "10 min", "15 min", "20-30 min"]
- question: "How many sponsor / ad breaks?", options: ["0", "1", "2"]
- question: "Register / tone?", options: ["Casual conversational", "Documentary narrative", "News briefing", "Interview-driven"]

Skip any question if the user already stated the answer in the initial request.

### Step 3: Segment the text and apply the script structure

Break the article into segments in this order and estimate spoken duration per segment (assume ~150 words per minute):

1. Cold open (0:00 - 0:30) — hook line, no music
2. Intro (0:30 - 1:00) — theme music bed in on Tone.js
3. Chapters (main body, 60-80% of total runtime) — split article into 2-5 chapters, each with music bed direction + SFX cues at scene changes
4. Sponsor breaks (if any) — insert between chapters, tag as "AD BREAK 1", "AD BREAK 2"
5. Outro (last 0:45) — payoff line, music bed fade out on Tone.js

Attach per segment: music-bed direction (Tone.js synth voicing, key, tempo), SFX cues (Howler.js triggers with timecode), and voice-actor delivery notes.

### Step 4: Compose the markdown script

Write the finished podcast script in this format:

```markdown
# Podcast Episode Script

**Title**: {derived from source}
**Runtime**: {total minutes}
**Generated**: {timestamp}

---

## Cold Open (0:00 - 0:30)

**VO**: "..."
**Music**: none
**SFX**: none

## Intro (0:30 - 1:00)

**VO**: "..."
**Music**: [Tone.js — bed voicing, key, tempo, fade timing]
**SFX**: [Howler.js — trigger name @ timecode]

## Chapter 1: {name} (1:00 - X:XX)
...

## AD BREAK 1 (X:XX)
[30s slot — hand-off point]

## Chapter 2: {name} (X:XX - X:XX)
...

## Outro (X:XX - end)

**VO**: "..."
**Music**: [Tone.js — fade out over final 15s]

---

## Cue Sheet Summary

| Timecode | Cue | Type | Notes |
|---|---|---|---|
| 0:30 | Intro bed in | Tone.js music | ... |
| ... | ... | ... | ... |
```

Then call `hub_write` with the file path (e.g. `podcast-{slug}.md`) and the full markdown content above.

### Step 5: Register the deliverable

Call `hub_save_file_to_session` with:
- file: the markdown script path from Step 4
- file_type: `text`

So the producer can pull it from the workspace files panel and hand it to the voice actor and audio engineer.

## Notes for Hub adaptation

- The output is a text-only production document; no audio is synthesized here. If the user wants a rendered voiceover, hand the finished script off to a separate TTS step.
- If the source article is long, use `hub_read` to load it from the session workspace rather than asking the user to paste the whole thing.
- Write the finished markdown script with `hub_write` and register it via `hub_save_file_to_session` (`file_type: text`) so the producer can pull it from the workspace files panel.
- Music-cue direction assumes the browser-side player (Tone.js / Howler.js) is provided by the consumer; the skill only specs the cue sheet, it does not run the audio engine.
- Use `question` sparingly — pick sensible defaults (segments, runtime, ad break count) and let the user override.
