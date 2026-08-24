---
utility: stage-execution-plan
applies_to: [general-video, ad-tvc, drama-series, mv]
---

# Stage Execution Plan — complete execution workflow

> **何时 Read**：planner 命中 workflow 后必须写入或修订；media-agent/executor 在执行 stage 时只依赖它决定和完成当前阶段。

## Principle

Planner 把当前 Stage 写成可直接执行的结构化 contract。Executor 只读取 selected stage detail，不读取 chat、canvas 文档或 workflow reference 补充执行内容。

## Core Contract

Pass a structured object to `hub_plan_write` / `hub_plan_patch_stage` / `hub_plan_replan`; do not hand-write Plan Markdown. On first authoring, bind the plan to immutable `workflow.path` plus optional workflow-owned `workflow.variant`; a different path or variant requires routing to a new plan. Put external scripts, briefs, uploads, and user refs in top-level `sources`. Put execution detail in `depends_on`, `ref_capsules`, `work_items`, `constraints`, `execution_locks`, `stage_fields`, and framework-owned runtime fields such as `runtime_refs`.

Every executable stage must have enough `work_items` for executor to choose tools and produce outputs without browsing chat or canvas. `work_items[].id` is the canonical logical output id for single-output items. Workflow-specific utilities define the exact item fields for anchors, audio, video, postprocess, and document-producing stages.

Copy only the selected workflow's required user checks into `review.before_execution` and `review.after_execution`. Write short user-verifiable checks, not framework state names or transition instructions. Use `before_execution` for scope, inputs, prompts, refs, locks, or dependencies that the user must confirm before executor work. Use `after_execution` for document or media qualities that the user must verify after production. Omit a field or write `[]` when that side needs no user review; do not invent checks to keep the field non-empty. Omit `before_execution` for planner-materialized document stages.

## Writing Rules

- Planner writes every workflow plan one Stage at a time. Author each Stage as a **structured object** — pass `plan` to `hub_plan_write` for first authoring or `stage` to `hub_plan_patch_stage` for a local current-Stage upsert or revision. First authoring writes the immutable workflow binding, the header, the complete `stage_outline` with `id`, `order`, and short user-facing `name`, and only the first required Stage. After that Stage's output is accepted, resume the same planner session and append exactly the next required Stage. Use one `hub_plan_replan` when an explicit user change affects the current or later Stage skeleton while the stored workflow binding remains unchanged; a different `workflow.path` or `workflow.variant` requires a new plan. Never write this node with `hub_canvas_write_node`.
- Treat `work_items` as the stable output contract, not a remaining-work queue. A topology change may add or remove logical outputs, but every retained logical output keeps its existing `work_items[].id`. Re-emit the full stage contract in each planner revision and patch only affected prompts, refs, constraints, or waiver notes. Do not delete an item because it already produced output, failed, was skipped, or is excluded from the next retry.
- Do not author, read references for, or materialize documents for a later Stage before the current Stage's output is accepted. Never emit placeholder entries in `stages`; keep every unauthored Stage only in `stage_outline`.
- For user-choice conditional Stages that the selected workflow marks as ask-first branches (for example `storyboard-images`), keep them out of the authored executable set until the structured `question` resolves. Before the choice is made, the planner may retain the branch as a pending outline decision, but must not materialize its document, work items, or execution locks as if it were already confirmed.
- Write interaction and instruction content in `working_language`, including document bodies, work-item names, prompt instructions, and scene/action descriptions. Preserve audience-facing dialogue, narration, lyrics, captions, subtitles, CTA, and on-screen copy according to the selected Skill/workflow's confirmed language rule; the shared plan contract does not infer or rename that rule. Preserve exact user-provided text verbatim; keep schema keys, model IDs, vendor params, file paths, tool names, and signal codes literal.
- Full uploaded scripts, briefs, lyrics, treatments, and storyboards stay as top-level `sources` or planner-owned document nodes. This plan stores source provenance plus compact execution excerpts only, never the full source body. Do not model an uploaded script as a fake stage named `source`.
- Write a stable `stage_id`, `order`, and `goal` in every Stage contract.
- Read the current Stage's workflow references before authoring it. Compile every binding layout, template, ref-slot, crop/split, model, size, continuity, dialogue, and sound rule into the document or final `prompt`. Do not pass workflow reference paths to Executor.
- Materialize documents in Planner. Never create a `planner_text` work item for Executor. Record each materialized document as a `modality: document` work item with its real `document_node_id`. Put every generated media instruction needed downstream into the final prompt; Executor does not read the document. Do not create future or placeholder document work items.
- Materialize a document node only when its full real content can be written now. Materialize the current Stage's document and any **source-derived planning document** whose content comes entirely from existing sources/documents and is required to author downstream prompts. Write the canvas node first, then copy its real `document_node_id` / `node_id` into the document work item; framework Plan tools own `runtime_refs`. Do not pre-create future documents that depend on execution results, write placeholder document ids, or create empty "待 X stage 执行后填充" / "to be filled later" nodes.
- Write each work item as structured fields. Store a multi-line `prompt` as one string value with real newlines. Use `refs`, `source`, `render`, and `timeline` for their named responsibilities; do not add generic fact containers.
- When the workflow starts from an uploaded/canvas script, preserve its pointer in top-level `sources` and copy only approved dialogue/beat excerpts required by the selected stage's work items.
- Each stage must be executable from its own Stage Execution Plan entry plus listed upstream media refs. If a stage entry only points to another long text document without the needed excerpt, it is incomplete.
- A generated or postprocess stage with only a broad goal such as "generate clips", "generate dialogue", or "assemble final video" is incomplete. It must contain `work_items` detailed enough for executor to choose tools and produce each requested output without reading human-facing documents.
- Write a final, ready-to-generate `prompt` on every image, video, and music work item. Keep it content-level, model-agnostic, positive, and item-specific. Executor dispatches it as-is. Use structured `text`, `language`, and speaker fields for TTS work items. Do not copy `work_items[].id`, `work_items[].name`, stage ids, file names, or other plan metadata into the prompt body; those are executor/planner metadata only.
- When an item carries an authored `prompt` and supplies reference images, audio, or video, the `prompt` must name each one by its input position — "image 1", "image 2", "audio 1", "video 1" — and say what it locks (a face and wardrobe, a location's space, a speaking voice's timbre). Do not put internal ids or file names into the prompt; a reference that is undescribed or named only by id gets ignored or drifts.
- Keep the prompt slots and `refs` as one ordered mapping: planner lists all media reference ids in the same order the prompt names them ("图1", "图2", "audio 1", "video 1"). Executor resolves each id from its producing asset/ref capsule and fills the tool's reference arrays in that order; it does not reorder, dedupe, or drop refs.
- A grounding stage for external facts or reusable source-dependent refs is incomplete if it only records a policy such as "use the real thing" or "follow the source logic". It must contain executable work items to register provided refs, search/gather refs, or generate approved placeholder/grounding assets, plus stable logical output ids by role.
- Expected outputs use `work_items[].id` as the stable logical output slot. Keep that item in `work_items` for the life of the stage, even after it succeeds, fails, is skipped by retry scope, or receives a user-approved waiver/fallback. Use `work_items[].name` for the human-visible asset name and filename seed; it is required for user-facing generated outputs and follows `working_language`. Runtime refs for produced outputs contain only the same `id` plus the executable tool-returned `path`, `node_id`, and an optional http(s) `url`. When a retry regenerates the same logical output, the new result replaces that output's current `runtime_refs` entry and the old result moves to `superseded_runtime_refs`; downstream stages consume only current `runtime_refs`.
- Executable media stages consume dependency `runtime_refs` and `ref_capsules` from their `depends_on` stages. List every stage that owns required media refs directly in `depends_on`; do not rely on transitive dependency discovery or ad hoc top-level fields such as `runtime_asset_refs`.
- Downstream visual/post stages that depend on external or source-grounded assets consume dependency `runtime_refs` and `ref_capsules` from the owning grounding stage. Each item must list the relevant source refs or an explicit approved placeholder decision. Do not let generic category prose replace required refs.
- Do not write placeholder `runtime_refs`. Record actual refs only after the corresponding output exists.
- Video stages must contain one `work_items` entry per continuity-first clip group, not one per dialogue line, camera note, or micro action. Each item carries the approved source range, target duration, required refs, audio approach, stable `id`, and final `prompt`. Output geometry (aspect ratio, resolution) lives in the stage's `execution_locks`, not per item, unless the workflow explicitly allows an item override.
- A generated video work item uses refs for the active shot world only. Hard location/time jumps become adjacent work items unless the source explicitly asks for montage/transition; a single clip should not list two scene refs that represent different locations.
- If downstream video work items require voice refs, the upstream asset or voice-prep stage must contain executable voice-prep work items. Do not list voice refs only as planned output ids with no executable voice-prep work item. Default catalog voice prep uses `selection_policy: executor_pick_catalog_match`; user confirmation is needed only for audition/custom/clone or explicit voice identity choices.
- Voice-prep work items that produce video reference audio must include `output_role: voice_reference`, `trim_to_s: 3`, and a postcondition that executor checks the `hub_generate_audio_speech` returned duration, trims overlong raw samples with `hub_ffmpeg`, and writes `runtime_refs` to the trimmed/final path only.
- Each visual stage must declare `max_generated_clip_duration_s`. Use `15` as the default generated-video cap. No video work item may have a target duration range whose upper bound exceeds that cap.
- Visual stages with multiple independent video `work_items` default to `execution_policy: parallel_independent_work_items` unless a real dependency requires serial execution. Let executor derive the active window from the selected model's live `task_concurrency`; a Stage `concurrency_limit` is optional and may only narrow that window. `MiniMax H3` additionally stays at no more than 10 active calls with immediate sliding-window refill, while `Seedance 2.0`, `Seedance 2.0 Fast`, and `Seedance 2.0 Mini` use their own runtime model limits and do not inherit H3's cap. The selected model and subtitle policy are stage-wide `execution_locks`; do not leave them only in review text or item prompts. Independent means all required upstream refs are already available and no video item consumes another same-stage output. Planner records the serial reason when it does not use parallel independent execution.
- Prefer the longest smooth single-generation clip group that fits model duration, dialogue density, and source continuity. Split only for hard location/time jumps, changed character/state/wardrobe dependencies, explicit montage/cut intent, incompatible refs, or duration/dialogue overflow.
- When a dramatic beat exceeds `max_generated_clip_duration_s`, split it into adjacent continuation work items such as `sg_04a` / `sg_04b`, each `<= max_generated_clip_duration_s`, with compact continuity notes and the source reason for the split. Do not write a single 16s, 20s, or 28s generated video item.
- Treat an independent Audio Stage and a generated video's native audio track as separate layers. Omitting Audio means no standalone audio asset; it never means the video work items are silent.
- Every video work item must state the intended audible result positively in `render.audio_approach` and its final prompt. Unless the selected workflow/profile declares another default, no user audio direction means event-matched native SFX/ambience with no independent BGM. Speech placement remains workflow/profile-owned: in-scene or on-camera speech may be native, while a standalone-VO profile may suppress native speech but retain SFX/ambience for Post.
- Write `silent` only when the user explicitly requested silence or a user-confirmed source/plan contains a deliberate silence decision for that item. Missing voice/music assets, omitting Audio, requesting no BGM, or having no dialogue are not silence evidence. Never combine `silent` with `ambient`, `SFX`, dialogue, or any other audible output in one `audio_approach`; capability limitations require a compatible route or a concrete conflict, not a silent fallback.
- Add a separate audio stage only for standalone VO/dubbing, music, stems, cover/remix, replacement dialogue, or another independent track required by the selected workflow/profile. A requested or approved independent BGM also requires a downstream Post mix; do not infer BGM from mood words or missing music assets.
- Standalone audio stages must contain one `work_items` entry per scene/role/song/stem/mix target. Each item carries text or lyrics excerpt, language, voice or music role, refs, target duration or measured timing evidence, operation, and stable `id`. Stop before generation when its voice or lyrics still require user choice.
- Post stages must contain one `work_items` entry for the deterministic timeline operation, including ordered clip/audio logical refs, executable absolute paths derived from current `runtime_refs` / `upstream_runtime_refs`, trim/concat/transcode/mix actions, subtitle/text overlay instructions only when requested, and whether generated clip audio is preserved or explicitly replaced. For requested subtitles, model the chain explicitly: timed-text source (`source_srt_path` / `subtitle_path` / user text, or `hub_media_transcribe mode="subtitle"` if ASR is needed), format step (`hub_subtitle_format` with final `output_size` and default `style_preset="social_safe"`), then burn/render step consuming the formatted subtitle file. For ffmpeg subtitle burn-in, consume the formatter's `absolute_path` in `subtitles=...`; keep `path` for runtime refs. Do not create canvas nodes for SRT/ASS/VTT intermediates unless the subtitle file itself is the requested output.
- For simple video concatenation, prefer the dedicated `merge_videos` postprocess tool with absolute paths from current `runtime_refs`. Use `hub_ffmpeg` only when the edit needs filters not covered by a dedicated tool; then pass absolute paths, not display names copied from summaries or timeline text.
- Subtitles/text overlays are explicit opt-in. When the user or approved workflow plan did not request them, post work items must state no subtitle burn-in and only preserve audio plus assemble/finalize the timeline. `hub_media_transcribe mode="subtitle"` is ASR only and returns SRT; all style, safe-area, ASS/VTT conversion, and user style overrides belong to `hub_subtitle_format`.
- Record tool-returned output refs, failure signals, and retry notes through the framework-owned Plan tools. Do not rewrite creative/script facts or patch this text node directly.
- When a user corrects a planner-owned document, resume the same planner session through its prior `task_id` and use `hub_plan_patch_stage` to update both the Stage contract and document node before continuing. Skip the planner round-trip only when the user accepts the document verbatim.
- Executor reads one stage through `hub_plan_get_stage_detail` with `plan_id` plus stage id/order, expands internal work items, and executes only that stage.

## Stage Shape

Author the plan/stage as a structured object. Keep external provenance in top-level `sources`, stage dependencies in `depends_on`, media slots in `refs`, provenance/range evidence in `source`, generation controls in `render`, deterministic edit operations in `timeline`, output bindings in runtime `runtime_refs`, and shared controls in `ref_capsules`, `constraints`, `execution_locks`, and `stage_fields`.

Compact stage object:

```
plan:
  sources:
    - id: <logical source id, e.g. doc_1>
      kind: <uploaded_script | canvas_brief | user_ref | external_file>
      node_id: <canvas text node id when readable>
      path: <file path when readable>
      execution_excerpt: <compact source summary planner uses while authoring>
stage:
  stage_id: <stable id>
  order: <n>
  goal: <one line>
  depends_on: [<upstream stage ids>]
  review:
    before_execution: [<scope, inputs, prompts, refs, locks, and dependencies to confirm>]
    after_execution: [<produced document or media qualities to verify>]
  stage_fields:
    max_generated_clip_duration_s: <n>
    execution_policy: <parallel/serial policy when relevant>
  execution_locks:
    - production_mode: <when applicable>
      aspect_ratio: <e.g. 9:16>
      resolution: <e.g. 2K>
      vendor_model_policy: <same_vendor_model or explicit model lock when applicable>
  ref_capsules:
    - { id: <ref id>, name: <human-visible reference name>, role: <character|product|scene|style|layout>, contributes: <what it anchors>,
        take: <preserve|adapt>, path: <workspace-relative or absolute local path when the ref is a file> }
  work_items:
    - id: <logical output id>
      name: <human-visible asset name / filename seed, when user-facing>
      modality: <image | video | audio.tts | audio.music | postprocess | document>
      refs: [<ordered media ref ids in prompt slot order>]
      source:
        scene_id: <scene id when applicable>
        source_scene_range: <approved scene/beat/range evidence>
        clip_group_id: <continuity-first clip group id>
        sequence_index: <ordered clip index>
      render:
        duration_target_s: <n; within stage duration cap>
        audio_approach: <native dialogue + SFX/ambience | native SFX/ambience, VO in Post | preserve clip audio | silent (explicit evidence only)>
      timeline:
        operation: <postprocess/action when applicable>
        ordered_input_refs: [<logical timeline refs when applicable>]
      prompt: <finished prompt executor dispatches as-is>
    - id: <document item id — required for a document this stage just materialized>
      modality: document
      source:
        document_node_id: <real canvas node id — write the node first, then copy the returned id in>
  constraints:
    - { rule: <one binding execution constraint per entry, as a key-value object — a bare string is rejected by the schema> }
```

Rules for the shape:
- `refs` is the ordered slot map for media inputs. Put character, scene, keyframe, voice, product, brand, and reference-video ids in the exact order the prompt names them. The referenced assets' own metadata/runtime refs determine their modality; do not split refs into type-specific buckets.
- `source` holds provenance and ordering evidence only: scene id, source range, clip/segment id, and sequence index. Use the exact field names required by that workflow's validator.
- `render` holds item-level generation knobs that vary per item: `duration_target_s` (within the stage `max_generated_clip_duration_s` cap) and `audio_approach`.
- `execution_locks` holds stage-wide structured locks that every work item in the stage shares: production mode, output geometry (`aspect_ratio` + `resolution` together), and vendor/model/tool policy. A stage is one output geometry; do not repeat aspect ratio or resolution per item. When two stages need different geometry (a 16:9 character-sheet stage vs a 9:16 clip stage), each stage carries its own lock.
- `stage_fields` contains only planner-owned scalar execution facts such as `execution_policy` and `max_generated_clip_duration_s`. Keep all runtime-owned fields out of it: `status`, `waiting_reason`, `approval`, `blocked_reason`, `failed_item_ids`, `runtime_refs`, `superseded_runtime_refs`, `failures`, `retry_count`, `overrides`, and `note`.
- `timeline` holds deterministic postprocess execution facts such as operation and ordered logical input refs. It drives edit/merge tools, not prompt writing.
- Every `work_items[].id` is the output id for that work item. `name` is user-facing execution metadata for filenames and display labels; it never replaces `id` in refs, retries, or runtime bindings.
- Give every `ref_capsules[]` entry a concise, user-facing `name`. Keep `refs` as stable ids; Production Board resolves those ids to names for display.
- `work_items` is append/revision-safe state, not a consumable queue. A stage patch preserves the existing item list and stable ids unless the user explicitly removes or replaces a deliverable; retrying a subset is expressed by the dispatcher's retry scope, not by shrinking this list.
- Every ref an item consumes must resolve from top-level `sources`, this stage's `ref_capsules`, prior same-stage work item outputs under a serial/sequential execution policy, or a direct dependency's `runtime_refs`. `ref_capsules` is where a stage registers refs it introduces itself — user-supplied uploads, grounding-stage assets, style plates — that are not produced by any upstream stage; the validator builds the stage's usable-ref set from `sources` / `ref_capsules` plus inherited upstream `runtime_refs`, so a ref an item names but never registers here (or inherits) fails ref-coverage validation.
- Document materialization is planner-owned: materialized document stages carry the real `document_node_id`; future document outputs are declared when their stage is authored, not as placeholder nodes.
- `hub_plan_write` / `hub_plan_patch_stage` still enforce each workflow/modality's required fields; the grouped shape is a compact authoring form, not a relaxation of validation.

## Mid-plan Replan

Use Replan for an explicit user change that affects the current or later Stage skeleton while `workflow.path` and `workflow.variant` remain unchanged. Use `hub_plan_patch_stage` for a local current-Stage correction and route a different workflow binding to a new plan.

- Set `preserve_through_stage_id` to the last accepted Stage whose contract, decisions, and runtime outputs remain valid. Never rewrite the preserved prefix or copy its refs into the suffix.
- Submit one operation batch: `revise_stage` updates an authored Stage; `insert_stage` inserts and authors only the immediate Stage; `insert_stage_outline` adds a future pending entry; `omit_stage` omits an unauthored conditional entry; `remove_unexecuted_stage` removes an authored Stage that has not started.
- Pass the latest `expected_revision` and a fresh `request_id`. The same id and payload are idempotent; on revision conflict, re-read the plan and rebuild the request.
- Do not author future suffix contracts, work items, refs, prompts, or documents in the batch. Runtime-owned status, refs, failures, retry state, overrides, and notes remain framework-owned.
- Treat `resume_stage_id` as an attention pointer, then continue from the earliest unresolved `stage_outline` entry. Normal Stage review still applies after Replan.

## Anti-patterns

- Returning the full plan, document refs, ref capsules, dependency graph, model locks, or asset list in planner chat output.
- Letting executor read the full Stage Execution Plan through `hub_canvas_get_node` instead of querying one selected stage through `hub_plan_get_stage_detail`.
- Asking executor to call `hub_canvas_list_nodes` to discover stage work.
- Splitting execution facts across creative brief, script, shot plan, and chat context.
- Making the authored `prompt` vendor-specific or model-specific; keep it content-level so any suitable model can render it.
