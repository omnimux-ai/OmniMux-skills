---
name: short-drama-multilingual-dubbing
description: |
  Localize uploaded short dramas into another language. Prefer a clean voice track and subtitle file; otherwise extract audio, separate voice and background, transcribe dialogue, and confirm the target. Build a dubbing table, approve the wording, then replicate source-line timbre, emotion, rhythm, pauses, and duration, using official voices as fallback. Rebuild subtitles from the table and mux the new mix onto a silent copy. Use for dialogue localization, not story rewriting or visual redesign.
trigger-words: [short drama multilingual dubbing, localized dubbing, video dubbing localization, dialogue localization sheet, voice/background separation, audio replication dubbing, subtitle file dubbing, 短剧多语言出海配音, 本土化配音, 多语言配音, 人声分离, 音频复刻, 对话翻译配音]
---

# Short Drama Multilingual Dubbing

Use this Skill when the user uploads a video and wants to convert Chinese dialogue into an editable English dubbing workflow, with optional English subtitle localization. The expected outputs are: extracted audio, separated voice and background stems, an editable bilingual dialogue table without speaker columns, user-confirmed Chinese and English text, a replication/voice-mode choice, duration-matched line-level English replacement clips, a final English audio track aligned to the original timeline, and when subtitles are requested, a subtitle timing table plus burned-in English subtitles aligned to the source Chinese subtitle windows.

Do not use this Skill for general subtitles, generic video editing, or music-only stem separation unless the user also asks for dialogue localization or dubbing.

## STEP 1: Intake and source preparation

1. Confirm that the input is a video file. If the user provides only audio, continue with the audio workflow and state that no video extraction step is needed.
2. Preserve the original timeline as the master clock. All later segments, silence gaps, dubbing clips, and final audio must align to the original source duration.
3. If the user says they already have a clean voice track or subtitle file, first recommend uploading those files for higher accuracy. Treat the subtitle file as the preferred source for dialogue text and subtitle timing when it exists.
4. If the user does not provide a clean voice track or subtitle file, ask the user via a popup / confirmation card whether to extract subtitles and audio from the video and continue with in-video extraction.
5. In the same popup, ask whether the target language should be English. If the user wants another language, ask them to specify it before proceeding.
6. Extract or identify the source audio track from the uploaded video only after the user confirms extraction.
7. Separate the source audio into two stems:
   - `voice_audio_path`: dialogue / vocals / foreground speech
   - `background_audio_path`: background music, ambience, and non-dialogue audio
8. Return both stems to the canvas/session so the user can inspect them.
9. If the user uploads both a subtitle file and a clean voice track, use the subtitle file as the main source for dialogue text and English subtitle timestamps, and use the voice track for timing checks and dubbing reference.

## STEP 2: Transcribe and segment Chinese dialogue

1. If a subtitle file is available, read its Chinese subtitles first and use them as the source text for the dubbing table. If no subtitle file exists, transcribe the cleaned voice stem in Chinese with timestamps.
2. Create the **dubbing table** by complete spoken sentence or coherent spoken beat. Do **not** split one continuous sentence into multiple dubbing rows just to match subtitle display windows.
3. When the same person speaks several short consecutive lines that form one continuous rhetorical beat, threat, rebuttal, or emotional passage, the rows may be merged for cleaner review and generation.
4. Use `start_time` and `duration_sec` in the editable dubbing table. Do not include an `end_time` column.
5. Do not include a `speaker_role`, speaker name, voice ID, recommended voice, or clone status column in the dubbing table.
6. For each dubbing row, record at least:
   - `segment_id`
   - `start_time`
   - `duration_sec`
   - `dialogue_zh`
   - `dialogue_en`
   - `notes`
7. Use `notes` only for content issues such as name mapping, ASR uncertainty, merged-line rationale, continuity groups, or subtitle-source mapping. Do not require speaker identification.
8. When a subtitle file exists, derive the Chinese dialogue wording from that subtitle file first, then translate it into English for `dialogue_en`.

## STEP 3: Localize dialogue into English

1. Translate Chinese dialogue into natural, locally fluent English rather than literal word-for-word translation.
2. Preserve plot meaning, emotional intent, politeness level, humor, threat, insult, rebuttal, and relationship dynamics.
3. Keep the English line concise enough to fit the original time span. When the literal translation is too long, adapt it naturally while preserving meaning.
4. Localize Chinese proper names in dialogue into a natural English-name form, not a pinyin form. Do not leave raw Chinese characters in `dialogue_en`.
5. When adjacent subtitles form one continuous sentence or rhetorical beat, translate and adapt the group as a whole first, then place the confirmed wording back into the relevant dubbing row and subtitle rows.
6. Do not add subtitles unless the user explicitly asks for subtitles; this Skill focuses on audio dubbing.

## STEP 3B: Subtitle localization when subtitles are requested

1. If the source video already contains on-screen Chinese hard subtitles, use their actual appearance and disappearance times as the subtitle timing source.
2. If the user uploaded a subtitle file, prefer that file's timestamps as the subtitle timing source and also as the source for the dubbing table's Chinese wording.
3. Build the **subtitle timeline table** from the source subtitle timing, not from the dubbing rows. The subtitle wording itself must come from the confirmed dubbing table, not from a fresh rewrite.
4. In the subtitle table, it is allowed to split one confirmed dubbing line into two or more display parts if that is necessary to match the on-screen subtitle rhythm, but the content must stay the same.
5. Create a subtitle table with at least `start_time`, `end_time`, `subtitle_zh`, `subtitle_en`, and `notes`.
6. Keep subtitle timing aligned to the source Chinese subtitle windows or the user-provided subtitle file, not to the English dubbing copy.
7. English subtitle lines must never end with a period and must never use three-dot ellipses.

## STEP 4: Create the editable confirmation tables

1. Create **two separate editable tables** when subtitles are part of the workflow:
   - **Dubbing table**: used for voice generation, segmented by complete spoken sentence or coherent spoken beat.
   - **Subtitle timeline table**: used for subtitle display timing, segmented by the source video's on-screen subtitle appearance and disappearance times or the user-provided subtitle file timestamps.
2. The dubbing table must include at least these columns:
   - `segment_id`
   - `start_time`
   - `duration_sec`
   - `dialogue_zh`
   - `dialogue_en`
   - `notes`
3. The dubbing table must not include `speaker_role`, `speaker_name`, `voice_characteristics`, `recommended_voice_ids`, `selected_voice_id`, clone status, or `end_time`.
4. The subtitle timeline table must include at least these columns:
   - `subtitle_id`
   - `start_time`
   - `end_time`
   - `subtitle_zh`
   - `subtitle_en`
   - `notes`
5. When presenting the dubbing table, include this user-facing note: "By default, I translate into English. If you need another target language, please tell me."
6. Ask the user to review and edit the table(s) directly.
7. Stop before replication / voice selection until the user confirms:
   - Chinese dubbing dialogue content is correct
   - English dubbing localization is correct
   - subtitle timing rows match the source video's subtitle windows or the uploaded subtitle file when subtitles are part of the workflow
8. This is a hard confirmation point because downstream audio replication, official-voice fallback, subtitles, and final assembly depend on the confirmed table content.

## STEP 5: Choose dubbing generation mode after table confirmation

After the user confirms the table, ask which dubbing generation mode to use, in this order:

1. `音频复刻` / Source-line audio replication — **recommended**. Cut each original Chinese line, use it as SeedAudio reference, preserve the source line's timbre, emotion, pacing, rhythm, pauses, acting intensity, and duration, then replace the spoken content with confirmed English.
2. `官方音色` / Official voices — fallback when source-line replication is unavailable or the user prefers catalog voices.
3. `混合方案` / Hybrid — use source-line replication for important acted lines and official voices for lines where replication quality is poor or source audio is unusable.

Do not collect per-speaker voice choices. Do not start official voice generation or hybrid fallback before this mode choice.

## STEP 6: Source-line audio replication preparation

Use this branch when the user chooses `音频复刻` or the recommended path is accepted.

1. Use the confirmed dubbing table as the only source of English wording.
2. For each dubbing row, cut its original Chinese source-line audio from `voice_audio_path` using `start_time` and `duration_sec`.
3. If a row was created by merging consecutive lines, cut the full merged source-line range.
4. Keep every source-line reference clean and aligned. Remove long leading/trailing silence only when it does not shift the intended performance timing.
5. If a line's source audio is too noisy, missing, or too short to guide replication reliably, mark the row and offer official voice fallback or hybrid handling for that row.
6. Do not clone persistent voice IDs for this preferred path; the source-line audio itself is the performance reference.

## STEP 7: Official voice fallback

Use this branch only if the user chooses official voices or if selected rows cannot use source-line replication.

1. Choose a small set of official voices suitable for the overall video tone or for specific rows when necessary.
2. Do not require speaker-role labeling. If different voices are needed, label them by simple usage groups such as `main dialogue voice`, `female emotional line`, `male threat line`, or row IDs.
3. Present voice previews when available and ask the user to confirm the official voice choice before generation.
4. Do not generate official-voice dubbing until the relevant voice choice is confirmed.

## STEP 8: Hybrid fallback

Use this branch when the user chooses a hybrid plan.

1. Keep source-line audio replication as the default for acted or emotionally important lines.
2. Use official voices only for rows where the source-line reference is unusable, too noisy, too short, or rejected by the user.
3. Record the selected method per row in `notes` or a slot manifest before generation.
4. The subtitle text and dubbing text must remain unchanged regardless of generation method.

## STEP 9: Generate duration-matched English dubbing

After the user confirms the dubbing table and the voice mode:

### 9A. Preferred mode: source-line reference English replacement

Use this mode whenever the source-line voice stem is available and the user wants the English dub to preserve the original performance. This is preferred for short-drama / acted dialogue because it preserves line-level emotion better than role-level cloned TTS.

1. For each confirmed dubbing row, cut the original Chinese source-line audio from `voice_audio_path` using that row's `start_time` and `duration_sec`.
2. Use that source-line audio as the primary SeedAudio reference for the same row. Optional: add the role-level reference audio as a secondary reference only when it helps stabilize speaker identity.
3. Generate exactly one English replacement clip per dubbing row using the confirmed `dialogue_en`. Do not change the wording to fit duration unless the user first edits the dubbing table.
4. The SeedAudio prompt must preserve the source line's speaker timbre, emotional arc, pacing, pauses, rhythm, breath pressure, acting intensity, and total duration.
5. Build a line-level **emotional lock** before generation. It should describe the opening, middle, and ending performance beats, for example restrained taunt / disgust rising / hard clipped ending. Use this lock in the prompt.
6. Before writing the prompt, inspect the current source-line reference audio and identify the time span of each spoken clause or sentence. The prompt must include timestamped script lines, and each clause or sentence should be written on its own line with a concrete relative time range.
7. When a dubbing row contains one continuous beat, do not write it as a single undivided line if the source performance naturally breaks into smaller spoken clauses. Split the prompt's timestamped script by the actual spoken timing inside that row, while keeping the row itself as one output clip. Example for a row whose original video timing is 23.320s–34.500s:

```text
Use the reference audio as the source performance.
Preserve the same speaker timbre, emotional arc, pacing, pauses, rhythm, breath pressure, and acting intensity from the reference audio.
Do not brighten the tone, flatten the anger, or over-perform.

Emotional lock:
- opening: restrained and taunting
- middle: disgust rising steadily
- ending: hard, cold, short and clipped

Keep the duration at 11.18 seconds.
Only speak the English dialogue specified in the timestamped script below. Do not read any instruction text.

Timestamped script:
[0.000s:2.140s | restrained taunt] Do you know why I won’t sleep with you?
[2.960s:9.680s | disgust rising] Because whenever something filthy and stinking gets close to me,
[9.680s:11.180s | hard ending, short and clipped] it makes me sick.
```

8. Do not include explanatory wording in the generation prompt about timestamp coordinate systems. Calculate the relative timestamps correctly before writing the prompt, and do not compress multiple spoken clauses into one timestamp line when the source performance clearly splits them.
9. Measure each generated clip duration. The generated clip should be within ±0.5 seconds of the row's `duration_sec` whenever technically possible.
10. If the duration or emotion does not match, keep `dialogue_en` unchanged and retry by adjusting the emotional lock and timing instructions first. If mismatch remains, regenerate or revise the table instead.
11. Create a slot manifest mapping every dubbing row to exactly one unique English replacement clip.

### 9B. Fallback mode: official voices or hybrid rows

Use this mode only when the user explicitly chooses official voices, source-line reference replacement is unavailable, or specific rows are assigned to official voice fallback.

1. Generate one English speech clip per row using the confirmed `dialogue_en` and the confirmed official voice or row-level fallback voice.
2. Do not require speaker-role mapping. If different voices are used, track them by row ID or usage group in the slot manifest.
3. Control emotion through punctuation, pauses, speed, intensity, and delivery notes.
4. For rows marked as the same `continuity_group`, generate or direct them with a shared prosody plan: same emotion direction, same intensity arc, and explicit "continues the previous phrase" / "finishes the same sentence" instructions.
5. Every speech-generation prompt must include the exact duration instruction adapted with the row value: `Keep the duration at X seconds.` Replace `X` with that row's `duration_sec` value.
6. Do not phrase the instruction as `say the whole line within X seconds` or any equivalent wording, because that encourages the model to rush and produce a too-short line.
7. If the wording is correct but the duration still misses the slot, regenerate with stricter timing guidance or revise the table. Do not hard-cut spoken content, and do not use time-stretching to force-match the timeline.

### 9C. Timeline placement rules for all modes

1. Each finished clip must start at the original `start_time` and occupy the original `duration_sec` slot after regeneration.
2. Preserve silence gaps between dialogue segments exactly according to the original timeline.
3. Never reuse the same generated `audio_path` for two different rows unless the rows were intentionally merged and this is explicitly documented in `notes`.
4. A later slot must never contain residual tail audio from an earlier row.

## STEP 10: Assemble the English timeline audio and final video

1. Place every duration-matched English clip on a silent master track using the original timestamps, then keep the background stem in the final mix unless the user explicitly asks to remove it.
2. Export `english_voice_timeline_audio`: English dialogue only, aligned to the original source duration.
3. Before mixing, normalize the generated dialogue clips so that role dialogue loudness is consistent across speakers and lines; no role or sentence should sound noticeably louder or quieter than the others.
4. Create a new mix from `background_audio_path` plus `english_voice_timeline_audio`. Compare the dialogue track loudness against the background track loudness and adjust the relative levels so the English dialogue sits slightly above the background: dialogue must be clear and foregrounded while the background remains audible and natural.
5. If subtitles are requested, first create the subtitle timing table from the source Chinese subtitle windows / `voice_lyrics`-style transcript. The subtitle text must be derived from the confirmed dubbing table, and it may split one dubbing line into multiple display rows. If a user subtitle file exists, use that file's timestamps instead. Export a separate English subtitle file from this table before any optional burn-in. Do not burn subtitles into the video unless the user explicitly requests burn-in.
6. If the separated background stem contains residual Chinese dialogue, reduce or mute the background stem in the confirmed dialogue time ranges before mixing, so the Chinese voice does not remain under the English dub.
7. Export `english_full_mix_audio`: the cleaned background plus English dialogue, aligned to the original source duration, with balanced dialogue loudness and dialogue slightly louder than the background.
8. Export a no-audio version of the original video: `silent_video`. This step is mandatory.
9. Mux `english_full_mix_audio` onto `silent_video` to create `final_english_dubbed_video`.
10. Never mux the new audio directly onto the original video while keeping the original video's audio stream. The original Chinese audio must be removed first.
11. Ensure the final audio and final video durations match the original source duration. If there is drift, fix the timeline before final delivery.

## STEP 10B: Export the English subtitle file

Use this step whenever a subtitle timeline table exists, even if the user has not requested subtitle burn-in.

1. Create a standalone English subtitle file from the confirmed subtitle timeline table.
2. Use the subtitle table's `start_time` and `end_time` values exactly; do not derive subtitle timing from generated English speech duration. If the user uploaded a subtitle file, use that file's timestamps.
3. Use `subtitle_en` as the displayed text. The subtitle text must already come from the confirmed dubbing table and may only be split for display.
4. Default to an editable subtitle format such as `.srt` unless the user asks for another format such as `.ass` or `.vtt`.
5. Put the generated subtitle file on the canvas/session for user review.
6. Do not burn the subtitle file into the video at this step. Burn-in is a separate explicit user request or a later optional post-production step.
7. If the user later asks for burned-in subtitles, use this confirmed subtitle file as the source and keep its timing unchanged.


## STEP 11: Final delivery

Deliver, as requested by the user:

1. `voice_audio_path` — separated original dialogue / voice stem
2. `background_audio_path` — separated background stem
3. confirmed dubbing table without speaker columns
4. selected generation mode: source-line audio replication / official voices / hybrid
5. source-line reference clips and generated English replacement clips when useful for review
6. `english_voice_timeline_audio` — English dialogue only, aligned to the original source duration
7. `english_full_mix_audio` — cleaned background plus English dialogue, if mixing is requested
8. subtitle timing table and standalone English subtitle file when subtitles were requested
9. `silent_video` when final video assembly is requested
10. `final_english_dubbed_video` when final video assembly is requested

In the final response, state whether the English audio duration matches the original timeline and mention any rows that required regeneration, timing repair, source-line fallback, official-voice fallback, or gentle speed adjustment.

## Failure handling

- If transcription confidence is low, mark the row in `notes` and ask the user to correct that row in the editable table.
- If adjacent lines should be merged or separated differently, update only the row segmentation, timestamps, and notes needed for generation; do not invent speaker labels.
- If source-line reference audio is missing, too noisy, or too short, mark the row and offer official voice fallback or hybrid handling for that row.
- If source-line replicated English does not preserve the emotion well enough, retry with a stronger emotional lock, clearer internal timestamp beats, and stricter performance-preservation wording.
- If English speech cannot fit the original duration naturally, keep the confirmed `dialogue_en` unchanged and retry with timing / rhythm instructions first; use gentle speed adjustment only for residual mismatch, and never hard-cut spoken content.
- If official-voice fallback sounds unsuitable, choose a closer catalog voice or move that row back to source-line replication when possible.
- If background separation leaves dialogue residue, reduce or mute the background stem during confirmed dialogue ranges so Chinese voice does not remain under the English dub.
- If final video assembly is requested or expected, always create `silent_video` first and mux the new mix onto that silent video. Never retain or map the original video's audio stream into the final dubbed video.
- Never choose the generation mode before table confirmation; never generate final dubbing before the user confirms source-line replication, official voice fallback, or hybrid handling.
