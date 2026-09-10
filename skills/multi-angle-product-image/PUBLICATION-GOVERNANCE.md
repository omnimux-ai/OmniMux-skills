# Multi-Angle Product Image Publication Governance

## Status

- Publication status: public.
- Catalog status: registered in `BUILTIN_SKILL_CATALOG`.
- Shared mapping status: registered in `SKILL_CATALOG_MAPPINGS`.
- Runtime role: public business-methodology skill package for product multi-angle planning and consistency guidance.
- Code-execution role: none.

## Public Product Role

`multi-angle-product-image` is the public planning surface for single-product multi-view image work:

- planning front, side, back, top, bottom, detail, packaging, and scale views
- defining cross-image consistency rules
- preparing prompt packs and review-ready angle matrices
- identifying reference gaps before downstream image generation or photography

It answers: what views are worth producing, what each view must prove, what cannot be asserted from weak evidence, and how to keep one product identity stable across the full set.

## Directory Governance

The root directory is the governed skill package entry. There is no nested template package.

Allowed runtime-support folders:

- `assets/`: checklists, naming rules, and sample view notes
- `docs/`: usage guidance
- `examples/`: calibration fixtures
- `prompts/`: planning and prompt-writing guidance
- `schemas/`: output shape references
- `templates/`: text and JSON delivery templates

Disallowed for the current public skill runtime:

- code execution files
- `tests/`
- `workflows/`
- `adapters/`
- source capture records and package-source metadata

If a skill package needs any disallowed folder to produce its core result, it is not eligible for the current public business skill surface and should be classified as a code-execution candidate instead.

## Why It Is Publishable

- It owns a clear user-facing business job: product multi-angle planning and consistency control.
- It does not depend on CLI, model adapter, hidden workflow step, or external provider call as part of the public contract.
- The runtime entrypoint is `SKILL.md`; support files are static context and output-shape guidance.
- It explicitly separates observed evidence, safe inference, and missing-reference risk.
- It does not create hidden routing, required-next tools, fixed phases, sticky skill state, or completion gates.

## Evidence Rules

- Treat unseen product surfaces as unknown unless the user provides enough evidence.
- When only one or two views exist, reduce detail certainty for hidden surfaces and state the limitation explicitly.
- Do not promise final image generation, upload, or marketplace delivery without visible tool results and artifact evidence.
- Do not turn packaging, labels, badges, certifications, or claims into facts unless they are present in user-provided evidence.

## Overlap Boundaries

- `image/product-image-set`: use when the user wants the full listing image order, conversion sequence, and selling-point coverage.
- `image/image-recreation`: use when the user wants safe adaptation from a specific reference image.
- `image/image-creation`: use when the user wants broad visual direction or direct image generation, not only multi-angle planning.

## Migration Review Checklist

Use this checklist for adjacent image skill packages:

1. Remove old wrapper layers and source-package residue before deciding the final root structure.
2. Keep only static folders that directly support the public runtime contract.
3. Rewrite root governance files so they describe the governed package, not the source package.
4. Remove source metadata, brand residue, audit captures, and package-manager style extras.
5. If the package cannot deliver its core value without executable code or workflow ownership, classify it as a code-execution candidate instead of a public business skill.

## Verification Notes

Recommended local checks for this package:

- run the workspace skill quick validator
- run a residue scan for source-brand and package-source leftovers
- run a stale-phrase scan for outdated runtime wording
- run `git diff --check HEAD`
