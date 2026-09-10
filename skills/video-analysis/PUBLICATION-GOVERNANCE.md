# Video Analysis Publication Governance

## Status

- Publication status: public.
- Catalog status: registered in `BUILTIN_SKILL_CATALOG`.
- Shared mapping status: registered in `SKILL_CATALOG_MAPPINGS`.
- Runtime role: public business-methodology skill package.
- Code-execution role: none.

## Public Product Role

`video-analysis` is the public analysis surface for short videos, competitor videos, UGC videos, product videos, transcripts, screenshots, frame notes, and user-provided scene descriptions.

It answers: what is happening in the provided evidence, why each part matters, what can be reused safely, and what downstream script/storyboard/prompt work needs next.

## Directory Governance

The root directory is the migrated skill package entry. There is no nested template package.

Allowed runtime-support folders:

- `config/`: static labels, platform hints, and report preferences.
- `docs/`: usage, input/output, and compliance guidance.
- `examples/`: calibration fixtures.
- `prompts/`: Agent prompt guidance.
- `schemas/`: output shape references.
- `templates/`: Markdown text templates.

Disallowed for current public skill runtime:

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- source-site audit records

If a skill package requires any disallowed folder to produce its core result, it is not eligible for Gxgen's current public business skill surface.

## Why It Is Publishable

- It owns a clear user-facing business job: video structure analysis.
- It does not depend on CLI, model adapter, internal workflow step, or external provider call as part of the public skill contract.
- The runtime entrypoint is `SKILL.md`; support files are static context and output-shape guidance.
- The public contract separates observation from inference and requires an input evidence level.
- It explicitly does not promise automatic download, transcription, OCR, provider access, or hidden video inspection.
- It does not create hidden routing, required-next tools, fixed phases, sticky skill state, or completion gates.

## Evidence Rules

- `raw-video`: analyze visible/heard content only; do not invent missing shots or lines.
- `transcript-plus-frames`: analyze script and partial visual strategy; do not claim full pacing certainty.
- `transcript-only`: analyze spoken/text structure; do not claim camera, editing, actor, or visual details.
- `summary-only`: label conclusions as assumptions and provide a validation checklist.
- `url-only`: do not claim the video has been watched, transcribed, downloaded, or fully analyzed.

## Overlap Boundaries

- `video-creation`: use when the user wants a video generation plan or final video output.
- `video-storyboard` / `video-storyboard-planning`: use when the user wants shot lists, storyboard tables, or production planning.
- `ugc-commerce-video-skill`: use when the user wants commerce video strategy or a sellable UGC script, not only analysis.
- `replicate-inspiration`: use when the user references a saved inspiration template and wants original adaptation.

## Migration Review Checklist

Use this checklist for the next skill packages:

1. Move the package contents to the skill root after removing old wrapper and source-capture residue.
2. Remove brand/source identifiers and source-site audit records.
3. Classify each root file or folder as text-driving support, static fixture, or code-execution dependency.
4. Remove code-execution dependencies from public skill packages, or classify the package as a code-execution candidate instead.
5. Keep strong package structure when it supports pure text Agent behavior: prompts, schemas, templates, configs, docs, examples.
6. Update catalog read plans so the loaded files exist and teach the current package layout.

## Verification Notes

Publishing this skill requires the catalog entry, shared mapping, registry consistency expected set, and system-skill exposure classification to agree.

Recommended checks:

```bash
npx vitest run server/src/tests/skillRegistryConsistency.test.ts server/src/config/__tests__/skillCatalog.config.test.ts
npm run test:system-skill-exposure-guard
npm --prefix server run check-workspace-skills
git diff --check HEAD
```
