---
name: voice-design
trigger-words: [声音设计, 设计声音, 自定义声音, voice design, custom voice, design voice]
guide-prompt: 帮我设计一个温暖沉稳的女性旁白声音
guide-prompt-en: Help me design a warm and calm female narrator voice
description: |
  Design custom AI voices by describing voice characteristics in natural language.
  Provide a text description of the desired voice and a preview text to hear a sample.
  Returns a reusable voice_id for speech synthesis.
  IMPORTANT: Designed voices are experimental and generally lower quality than the built-in voice library (get_voice_id). Always recommend users try the official voice library first — only use this skill when the user explicitly asks to design/create a custom voice, or when no suitable voice exists in the library.
  Trigger: design a voice, create custom voice, 设计声音, 自定义音色, 设计一个XX声音, 帮我设计一个声音。
allowed-tools: [hub_design_voice]
allowed-tools-speech: hub_design_voice
---

# Voice Design

Design and preview custom AI voices from text descriptions.

**Language rule**: Always interact with the user in the same language they use.

## Supported languages

hub_design_voice works best with: **Chinese, English, and Japanese**. Results for other languages may be unstable. If the user wants to design a voice in another language, warn them that the quality may not be ideal and ask for confirmation before proceeding.

## Prompt writing guidelines

Basic prompt structure: **Profession + Character traits + Voice characteristics + Speaking pace**

Good prompt examples:
- "A passionate and energetic sports commentator, fast-paced, loud, able to ignite the atmosphere"
- "An ancient chivalrous swordsman, loud and righteous voice, full of heroic spirit, decisive pace"
- "A gentle and intellectual late-night radio hostess, deep magnetic voice, slow pace, with a healing quality"
- "A cheerful young kindergarten teacher, bright and clear voice, moderate pace, warm and encouraging"
- "Mysterious storyteller with a deep raspy voice, slow deliberate pacing, creates suspense"

Bad prompts (too vague):
- "A nice voice" -- lacks specific characteristics
- "male voice" -- no personality or style description

## Workflow

### STEP 1: Rewrite prompt

Extract the user's intent from their description and rewrite it into a high-quality prompt following the "Profession + Character traits + Voice characteristics + Speaking pace" structure.

- If the user's description is already specific enough, use it as-is
- If it's too vague (e.g. "a nice voice"), ask follow-up questions about the desired profession/scenario, voice style, and pace preference
- After rewriting, show the prompt to the user for confirmation

### STEP 2: Confirm language

Ask the user which language they want the voice to speak (Chinese/English/Japanese are recommended for best results).

### STEP 3: Preview text

Ask the user to choose how they'd like to provide the preview text:

1. **User-specified text** -- provide the preview text directly (up to 200 characters)
2. **Auto-generate** -- the agent generates a natural, conversational preview text based on the voice style and language (15-30 characters)

Auto-generation rules:
- The text should match the voice style (a sports commentator gets an exciting play-by-play, a gentle host gets soothing lines)
- Use conversational, spoken-style language rather than formal written style
- Chinese: 15-30 characters, English: 10-20 words, Japanese: 20-40 characters

### STEP 4: Call hub_design_voice

Call the `hub_design_voice` tool:

```
prompt: <rewritten prompt from STEP 1>
preview_text: <finalized text from STEP 3>
```

### STEP 5: Present results

On success, display:

1. Trial audio: `![Trial audio](<trial_audio_url>)`
2. voice_id
3. The prompt and preview_text used

Format:

```
## Voice Design Result

<trial audio>

- **Voice ID**: `<voice_id>`
- **Prompt**: <prompt used>
- **Preview Text**: <preview text used>

This voice_id can be used directly in subsequent audio generation.
```

On failure, inform the user of the error and suggest adjusting the description before retrying.

### STEP 6: Iterate or Save

**Must use the `question` tool** (do not use plain text options) to ask the user two questions:

**Question 1 — Satisfaction:**
1. **Satisfied, save it** -- save to memory for future reuse
2. **Not satisfied, need adjustments** -- collect feedback, adjust the prompt, and regenerate (do not call again with the exact same prompt+text)

**Question 2 — Memory scope (presented together with Question 1):**
- **Current project (recommended)** -- save to the current project's memory. Only available in this project; suitable for project-specific voices (e.g. "narrator for this short drama", "host for this podcast")
- **User-level (global)** -- save to user-level memory. Available across all projects; suitable for general personal voice assets (e.g. "my brand voice", "frequently used male announcer")

Both questions should be included in a single `question` call so the user can answer them at once.

Save format:

```
voice_id: <id>
name: <nickname given by the user or a short name the agent creates based on the voice characteristics>
prompt: <prompt used during design>
language: <language>
usage: <description of suitable use cases>
```

Inform the user: "This voice has been saved. You can refer to it by name (e.g. 'use the XX voice') in future sessions."
