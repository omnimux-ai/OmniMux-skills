# Video Script Creation Publication Governance

## Status

- Publication status: public.
- Catalog status: registered in the Gxgen built-in skill catalog.
- Shared mapping status: registered in `SKILL_CATALOG_MAPPINGS`.
- Runtime role: public business skill package.
- Code-execution role: none.

## Decision

Keep `video/video-script-creation` public as a text-first short-video scriptwriting skill. It owns the stage before storyboard, prompt conversion, and video generation: creative angles, spoken scripts, dialogue, subtitles, pacing notes, and handoff notes.

It is distinct from adjacent public skills:

- `ugc-commerce-video-skill`: commerce conversion expert for UGC persuasion mechanics, objections, proof, CTA, and ecommerce-specific script strategy.
- `video-storyboard-planning`: shot-by-shot storyboard and production blueprint after a script or concept is ready.
- `video-prompt-generation`: prompt-only conversion candidate, not currently public.
- `video-creation`: downstream video generation director when the user wants final video execution.

## Public Contract

The public skill may:

- Draft creative angle options and recommend one with clear reasoning.
- Write or rewrite short-video scripts, voiceover, dialogue, subtitles, and scene beats.
- Produce a lightweight shot-action handoff only when it helps the script remain shootable.
- Call out missing product claims, proof needs, compliance risks, and production assumptions.
- Hand off to storyboard, prompt, or generation skills without forcing that next step.

The public contract forbids:

- Claiming that a video, storyboard, prompt pack, or generated asset already exists without tool evidence.
- Turning scriptwriting into a fixed workflow, required-next tool, provider route, or completion gate.
- Replacing `ugc-commerce-video-skill` for deep ecommerce conversion diagnosis when the user explicitly asks for UGC commerce mechanics.
- Treating examples as guaranteed performance evidence.
- Executing scripts, adapters, tests, or shell snippets as part of the public skill contract.

## Directory Governance

The root directory is the migrated skill package entry. There is no nested source package.

Allowed runtime-support folders:

- `docs/`: usage and customization guidance.
- `prompts/`: scriptwriting and rewrite prompt guidance.
- `schemas/`: output shape references.
- `templates/`: reusable script structures.
- `examples/`: calibration fixtures.

Disallowed for public skill runtime:

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- source-site audit records

If a skill package requires any disallowed folder to produce its core result, it is not eligible for Gxgen's current public business skill surface.

## Publication Proof

This publication PR must include:

- Public frontmatter in `SKILL.md`.
- A catalog entry in `server/src/config/skillCatalog.config.ts`.
- Shared mapping in `packages/shared/src/skillCatalog.ts`.
- Removal from `server/skills/system-skill-exposure.json`.
- Catalog/readability tests updated for the new public skill.
- `npm run skill:validate -- <skill-dir>`, workspace skill check, relevant skill registry tests, and diff hygiene evidence.
