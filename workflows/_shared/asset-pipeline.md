---
utility: asset-pipeline
applies_to: [general-video, ad-tvc, mv]
---

# Asset Pipeline — reusable core anchors

> **何时 Read**：多资产项目需要角色、音色、场景或品牌/产品来源在多个最终产物中保持一致。

## Principle

Core anchors are downstream inputs, not process trophies. Create one only when it will be reused, consistency matters, the user asked for it or the dependency requires it, and no sufficient existing ref/capsule exists.

Core anchor kinds are closed: character/subject, voice, reusable scene identity, and reusable brand/product source. Style, prop, lighting, camera, composition, motion, mood, and layout stay as ref/capsule/brief signals unless they are attached to one of the core anchors.

## Asset Decisions

| Anchor | Create when | Not needed when |
|---|---|---|
| Character / subject sheet | same subject appears across shots, states, variants, or final assets and lacks a sufficient existing ref/capsule | one-off subject or existing anchor is enough |
| Voice anchor | speaking role needs recognizable voice across clips/VO | incidental sound, single disposable line, or user accepts model-native voice |
| Scene base | the same place must remain recognizable across multiple assets, user asked to keep it consistent, or the scene itself is a project asset | one-off background, generic location, or loose mood/world only |
| Brand / product source | brand system/specs, logo/packaging/product source, or future assets depend on exact reuse and no sufficient ref/capsule exists | one final asset such as a poster/logo/mockup can be generated directly |

## Character / Subject

- Workflow-owned reusable character/subject anchors default to one six-view standard character sheet in a single 16:9 landscape image: top row full-body front / side / back; bottom row face or head-and-shoulder close-ups front face / side profile / three-quarter face.
- A selected project workflow may explicitly override the required anchor form for its domain. The selected workflow's anchor rule wins over this default.
- The full-body row preserves body shape, outfit, and silhouette; the close-up row preserves facial identity for downstream talking, close-up, and character-consistency video shots.
- Do not call this output "三视图". Plain user 三视图 means front / side / back in direct requests; the six-view form is a workflow asset requirement for downstream generation.
- If a workflow user explicitly restricts the asset layout to only front / side / back, planner records the constraint and flags the facial-identity risk when talking or close-up video shots are planned.
- Default subject anchor sheet ratio is 16:9 landscape when the user gives no ratio, so the 3x2 sheet has room for body shape, outfit, silhouette, and facial detail.
- Keep clearly visible spacing between the six grid cells: each view sits in its own cell with an obvious gap and clean background separation, so downstream generation can crop or read any single view without neighboring views bleeding in.
- Planner must put `six-view standard character sheet`, `3x2`, `front / side / back full-body`, `front face / side profile / three-quarter face close-up`, `clearly separated grid cells`, and `same identity` in the reusable character/subject anchor entry of the Stage Execution Plan; do not leave only generic character-anchor wording.
- One anchor should represent one persistent subject. Relationship/group images can guide blocking, but do not replace per-subject anchors when identity matters.
- Same asset batch should use one vendor/model lock via `execution_locks: [{ vendor_model_policy: same_vendor_model }]`; media-agent resolves and injects the model lock.
- State changes are dependency chains: base identity first, then changed states reference the prior/base anchor.

## Voice

- A selected project workflow may forbid default voice-prep for its dialogue. The selected workflow's audio rule wins over this section's defaults.
- For speaking roles, planner must write executable voice-prep work items, not only voice output assets: role, language, role profile, sample_text, operation `prepare_catalog_voice`, `selection_policy: executor_pick_catalog_match`, `output_role: voice_reference`, `trim_to_s: 3` when the voice feeds video, and output asset id. Executor then calls `hub_voice_prepare` with `items[]` for all ready roles in one call, picks fitting catalog `voice_id`s, and uses `hub_generate_audio_speech` for short representative lines.
- Catalog voice prep is an executor decision, not a user questionnaire. Ask only when the user requested audition/custom/clone voice, several choices materially change identity, or the stage marks voice choice pending.
- Voice anchors used as video reference audio must be short samples, not full dialogue tracks: use the `duration` returned by `hub_generate_audio_speech`; when longer than 3s, trim with deterministic postprocess to `<=3s`, write the trimmed audio node, and pass only that trimmed node into video reference slots. The final `runtime_refs` entry for the voice asset must point to the trimmed/final path, not the raw overlong sample.
- Role voice anchors are not final dialogue/VO deliverables. Audio+video generation consumes them as voice references for clip speech; create standalone dialogue, VO, BGM, or replacement mix assets only when the workflow or user explicitly asks for them.
- A role voice is a role attribute. Do not reuse one voice for distinct speaking roles unless the user asks.

## Scene / Brand

- Scene anchors capture reusable scene identity, not generic places or every possible camera angle.
- Brand/product anchors preserve reusable brand/product identity, logo/text ownership, and usage-relevant details. Target asset wins when no downstream reuse or brand system is requested. Brand risks follow `<knowledgeDir>/failures/brand-injection.md`.
- Match project ratio unless the user/workflow needs a sheet/layout; do not default to square without evidence.

## Canvas

All required anchors must be visible canvas assets before dependent generation starts. A successful generation returns a canvas node id; path-only postprocess outputs need `hub_canvas_write_node(kind:"media")`.

## Anti-patterns

- Creating anchors for every noun, prop, camera idea, lighting plan, or style adjective in the brief.
- Using text descriptions as the only identity mechanism across multiple outputs.
- Using a single front portrait, half-body portrait, or beauty shot as a reusable character/subject anchor, unless the selected project workflow explicitly requires a single-image anchor form.
- Using only a front / side / back sheet for a speaking or close-up character when the workflow needs facial identity anchors.
- Mixing vendor/model across a same-batch identity sheet set.
- Passing raw, unverified, or overlong voice anchor audio into video generation.
- Listing required voice refs in downstream video while the upstream plan has no executable voice-prep work item.
