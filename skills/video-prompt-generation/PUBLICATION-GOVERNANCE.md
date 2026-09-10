# Video Prompt Generation Publication Governance

## Status

- Publication status: public.
- Catalog status: registered.
- Shared mapping status: registered.
- Runtime role: public business-methodology skill package.
- Code-execution role: none.

## Public Product Role

`video-prompt-generation` is the public prompt-conversion surface for users who already have script-level or shot-level material and need a cleaner prompt pack for video models.

It answers: what should the final prompt say, how should the scene order be expressed, what continuity or negative constraints matter, and what assumptions still need to be declared before generation.

## Directory Governance

The root directory is the package entry. There is no nested template package.

Allowed runtime-support folders:

- `config/`: assumptions, model notes, and safety guidance.
- `docs/`: usage, prompt design, input/output, and compliance guidance.
- `examples/`: input and output calibration fixtures.
- `prompts/`: writing guidance for model adaptation and output structure.
- `references/`: light entry guidance for selective reading.
- `schemas/`: structured input/output references.

Disallowed for the current public skill runtime:

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- source-capture ledgers
- package-source metadata such as template manifests or migration leftovers

If a package needs any disallowed folder to deliver its core value, it is not eligible for this public business-skill surface.

## Why It Is Publishable

- It owns a clear user-facing business job: convert existing creative material into stronger video-model prompts.
- Its core value lives in method guidance, prompt structure, schemas, examples, and review criteria rather than executable code.
- It does not claim hidden provider access, automatic generation, or invisible internal routing.
- It keeps prompt conversion separate from script ideation, video analysis, storyboard planning, and finished-video delivery.
- It does not create hidden workflow ownership, fixed phases, required-next actions, or sticky skill state.

## Business Boundary

Use this skill for:

- Script, storyboard, shot-list, or rough-prompt to prompt-pack conversion.
- Model adaptation guidance for `generic`, `Sora`, `Veo`, and `Seedance`.
- Per-shot prompt organization, continuity notes, and negative constraints.
- Prompt diagnostics for ambiguity, conflict, missing action, weak structure, or overloaded scenes.

Do not use this skill for:

- Writing a script or creative angle from zero.
- Analyzing existing video evidence or competitor content.
- Producing a full storyboard or production plan before prompt writing.
- Claiming finished-video delivery or model execution.

## Overlap Boundaries

- `video-script-creation` owns script writing and creative direction when the user does not yet have source material.
- `video-analysis` owns video breakdown, evidence-led review, and reuse extraction from existing content.
- `video-storyboard` and `video-storyboard-planning` own storyboard tables and production-style shot planning.
- `video-creation` owns direction for actual video generation and downstream visible generation handoff.
- `recreate-viral-video` owns strategy transfer from a reference video into a new original direction before prompt conversion.

## Migration Review Checklist

Use this checklist for similar packages:

1. Move valuable static assets to the skill root and remove outer wrappers.
2. Delete package-source residue and any nested runtime entry.
3. Keep only static support assets that strengthen a pure business skill contract.
4. Rebuild `SKILL.md`, `README.md`, and publication governance around the current root layout.
5. Keep default read paths accurate, selective, and rooted in existing files.
