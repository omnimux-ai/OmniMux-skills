---
name: voiceover-direction
description: |
  Direct voice talent to deliver performances that match brand vision — from writing the VO brief and speakable script, through casting the right voice, to running the session live and giving actionable pickup feedback. Input is a project (SaaS explainer, commercial, e-learning, audiobook, ad) plus brand and audience context; output is a VO brief, a speakability-checked script, audition criteria, live-session direction notes with intention-based cues, and structured pickup notes.
  Use whenever the user wants to hire and brief voice talent, prep a live session, redirect a bad take without insulting the artist, cast the right voice for a brand, rewrite a script that isn't easy to speak, or give clear pickup notes on a delivered read.
trigger-words: [配音, 配音导演, VO brief, 配音脚本, 补录反馈, 选角, voiceover, voice direction, VO brief, speakable script, casting voice, pickup notes, voice talent]
allowed-tools: [question, hub_read, hub_write, hub_save_file_to_session, hub_audio_generation]
---

# Voiceover Direction

> Master the art of directing voice talent to deliver performances that match your brand vision — storytelling first, intention over inflection.

**Core principle:** voice actors aren't just readers — they're actors. Your job is to give them emotional context, not line readings. Tell them WHY, not HOW.

## Workflow

### Step 1: Pull existing brand & script context

Before asking anything, try to `hub_read` these workspace paths (silently skip if absent):

- `.agents/brand-voice.md` / `.claude/brand-voice.md` — brand personality references
- Any script path the user mentioned (e.g. `scripts/explainer-v3.md`)
- Any prior VO brief the user is iterating on

Use whatever loads to pre-fill Step 2.

### Step 2: Collect the brief inputs (single batched `question`)

Fire ONE `question` call covering:

1. **Deliverable** — full VO brief / speakability rewrite / session direction notes / pickup notes for a delivered take
2. **Project format** — explainer / commercial / e-learning / audiobook / ad / other
3. **Duration & word count target** (~150 WPM)
4. **Brand personality** — 3-5 adjectives
5. **Target audience** — who + emotional state when they'll hear it
6. **Voice specs** — gender preference / vocal age range / accent / tone / pace / energy 1-10
7. **Sound-alike references** — 2-3 links
8. **Anti-references** — what NOT to sound like
9. **Do they want a TTS scratch reference?** — yes/no (drives Step 5)

Do NOT proceed until answered.

### Step 3: Draft the deliverable(s) using domain rules

Apply these rules rigorously.

#### VO brief template (Deliverable = full brief)

```
## Voiceover Brief

### Project Overview
Project name: ...
Format: [Explainer / Commercial / E-learning / Audiobook / ...]
Duration: [runtime]
Usage: [Where used, rights needed]

### Brand Context
Company: ...
Brand personality: [3-5 adjectives]
Sound-alike references: [links]
Avoid sounding like: [anti-references]

### Target Audience
Who: [demographics + psychographics]
Emotional state: [busy / relaxed / stressed / skeptical]

### Voice Specifications
Gender preference: ...
Vocal age range: ...
Accent: ...
Tone: [warm / authoritative / playful / urgent / ...]
Pace: [conversational / quick / measured]
Energy level: [1-10]

### Practical Details
Script word count: ...
Estimated read time: [÷ 150 WPM]
Deadline / Budget / Revisions included
```

#### Speakable-script rules (Deliverable = script rewrite)

- Short sentences (≤ 15 words)
- One idea per sentence
- Natural contractions (don't, won't, it's)
- Phonetic spellings in parentheses for hard words
- Numbers written as words (three million, NOT 3,000,000)
- Acronyms spelled with pronunciation guide
- Bracketed tone shifts and `[PAUSE]` markers inline
- Add ~10-15% duration buffer for natural delivery
- Read aloud 3× before finalizing

#### Session direction notes (Deliverable = direction cheat sheet)

Framework: **intention, not inflection.**

DO:
- "This person just solved a problem that's been bugging them for months"
- "You're sharing a secret with your best friend"
- "This is the moment they've been waiting to hear"

DON'T:
- "Make it go UP at the end"
- "Emphasize THIS word"
- "Slower on that part"

Common adjustments:
- Too announcer-y → "Throw it away more. Like you're just telling me."
- Too flat → "What's exciting about this for you?"
- Too much → "Let the words do the work."
- Wrong pace → "Take your time. The viewer isn't going anywhere."

#### Pickup notes (Deliverable = feedback for delivered take)

Per note: **Timestamp / Current issue / Desired change / Why (story reason)**.

Bad: "Line 3 doesn't sound right"
Good: "Line 3 ('We're different') — currently sounds defensive. Try more confident, like stating a fact they already know."

### Step 4: Confirm before writing

Present:
- File name (e.g. `vo-brief-projectflow.md`, `script-speakable-v2.md`)
- Word / line count
- What was pulled from context vs newly written

Wait for user yes.

### Step 5: Save and register

For each deliverable:

1. Call `hub_write` with:
   - `file_path`: workspace-relative slug (e.g. `voiceover/2026-07-03/vo-brief.md`)
   - `content`: the full Markdown body
2. Call `hub_save_file_to_session` with:
   - `file`: same path
   - `file_type`: `text`

### Step 6: (Optional) TTS scratch reference

Only if Step 2 answered yes to "scratch reference":

1. Pick a representative 20-40s excerpt from the speakable script
2. Call `hub_audio_generation`:
   - `vendor`: choose per voice specs (default `moss-audio` for warm neutral English; user may specify)
   - `voice_id`: pick a voice_id that matches gender / age / tone from Step 2 (e.g. warm mid-30s female English → matching voice_id from the vendor's catalog)
   - `text`: the excerpt (must be already speakability-cleaned per Step 3 rules)
3. Call `hub_save_file_to_session`:
   - `file`: the returned `.wav` / `.mp3` path
   - `file_type`: `audio`
4. Tell the user the scratch is a *reference for tone / pace* — the human artist (or a paid TTS voice) still delivers the final read.

## Casting a real voice artist

If the user is auditioning humans (Deliverable = brief + audition instructions):

Add to the brief:

```
## Audition Instructions
Record the following in TWO different reads:

Read 1: [Primary direction — e.g. "warm and conversational, like explaining to a friend"]
Read 2: [Alternate direction — e.g. "slightly more authoritative, like a trusted advisor"]

Selected excerpt:
[30-60 seconds of representative copy]

Technical:
- WAV or AIFF, 44.1kHz, 16-bit minimum
- Dry recording (no effects)
- Include 3s of clean room tone at the end
```

Casting evaluation criteria (write these into the brief so the user has a scoring rubric):
- **Acoustic**: pitch / resonance / texture / presence
- **Performance**: warmth / authority / energy / authenticity scales
- **Brand alignment**: does this voice sound like the brand? Would the audience trust it? Distinct from competitors?

## Session direction cheat sheet

Reduce energy: "Throw it away" / "Just say it" / "Less is more here"
Add warmth: "Like you're sharing a secret" / "Smile as you say it" / "Talk to one person"
Build authority: "State it as fact" / "You know this to be true"
Fix pacing: "Land on that word" / "Take a breath there" / "Let that sink in"
Get natural: "Tell me in your own words" / "Forget the script" / "What's exciting about this to you?"

## Skill boundaries

Does well: structuring VO production workflows, technical guidance, quality checklists, direction language.
Cannot: replace audio engineering, mix/master audio, make subjective creative decisions, guarantee commercial success.

## Notes for Hub adaptation

- All text deliverables (VO brief, speakable script, direction notes, pickup notes) are Markdown — saved via `hub_write` and registered via `hub_save_file_to_session` (`file_type: text`).
- `hub_read` runs first to pull brand-voice files and existing scripts so `question` skips already-answered fields.
- `question` is fired ONCE with all fields batched — no iterative back-and-forth.
- TTS scratch is optional and gated by the Step 2 answer — when triggered, `hub_audio_generation` renders a short reference clip and `hub_save_file_to_session` (`file_type: audio`) registers the `.wav`/`.mp3`.
- This skill directs human or TTS talent — it does not do audio engineering, mastering, or mixing.
