# Recreate Viral Video Publication Governance

## Status

- Publication status: public.
- Catalog status: registered in `BUILTIN_SKILL_CATALOG`.
- Shared mapping status: registered in `SKILL_CATALOG_MAPPINGS`.
- Runtime role: public business-methodology skill package.
- Code-execution role: none.

## Public Product Role

`recreate-viral-video` is the public business skill for turning a reference video's hook, pacing, proof pattern, and conversion logic into an original plan for the user's own product, brand, or topic.

It answers:

- what makes the reference video effective;
- which parts are transferable and which must be replaced;
- how strongly the structure fits the user's product;
- what original script, storyboard, prompt pack, or handoff should follow.

## Directory Governance

The root directory is the only skill package entry. There is no nested template package.

Allowed runtime-support folders:

- `docs/`: usage, input/output, and compliance guidance.
- `examples/`: calibration fixtures.
- `prompts/`: guidance for analysis, fit grading, prompt composition, and report structure.
- `schemas/`: structured input and output references.
- `templates/`: Markdown delivery templates.

Disallowed for this public skill package:

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- source-site capture records
- package-source metadata such as license, changelog, export manifest, or marketplace manifest files

If a package requires any disallowed directory to produce its core result, it is not eligible for Gxgen's public business skill surface.

## Why It Is Publishable

- It owns a clear user-facing business job: safe adaptation of a reference video into an original plan.
- It stays separate from `video-analysis`: that skill explains the reference evidence, while this skill decides how to reuse the structure safely.
- It stays separate from `video-prompt-generation`: this skill owns the mapping from reference structure to new creative direction before prompt conversion.
- Its public value is methodology-first: evidence review, fit grading, originality protection, and delivery guidance.
- The runtime entrypoint is `SKILL.md`; support files are static context and output-shape guidance.
- It does not create hidden routing, fixed phases, sticky skill state, or completion gates.

## Evidence Rules

- `raw-video`: analyze visible or audible content only; do not invent missing shots or lines.
- `transcript-plus-frames`: analyze spoken structure and partial visual strategy; do not claim full pacing certainty.
- `transcript-only`: analyze text structure and persuasion logic; do not claim camera, editing, actor, or visual details.
- `summary-only`: label conclusions as assumptions and provide a validation checklist.
- `url-only`: do not claim the video has been watched, transcribed, downloaded, or fully analyzed.

## Overlap Boundaries

- `video-analysis`: use when the user only wants analysis or extraction from a video.
- `recreate-viral-video`: use when the user wants to turn a reference structure into an original version for their own product or topic.
- `video-script-creation`: use when the user wants scriptwriting without a reference-video adaptation job.
- `video-storyboard-planning`: use when the user wants a shot plan after the adaptation direction is already decided.
- `video-prompt-generation`: use when the user already has script, storyboard, or shot list and only needs prompt conversion.
- `video-creation`: use when the user explicitly wants a generation-ready execution path or final video output.

## Migration Review Checklist

Use this checklist for the next skill packages:

1. Move the real package contents to the skill root after removing wrapper and source residue.
2. Remove brand or source identifiers and source-capture records.
3. Classify each root file or folder as public support material or code-execution dependency.
4. Remove code-execution dependencies from public skill packages, or classify the package as a code-execution candidate instead.
5. Keep strong package structure when it supports method guidance: docs, prompts, schemas, templates, and examples.
6. Update catalog read plans so the loaded files match the governed package layout.
