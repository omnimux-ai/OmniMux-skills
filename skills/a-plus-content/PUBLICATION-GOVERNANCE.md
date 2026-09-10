# A+ Content Publication Governance

## Status

- Publication status: public.
- Catalog status: registered in `BUILTIN_SKILL_CATALOG`.
- Shared mapping status: registered in `SKILL_CATALOG_MAPPINGS`.
- Runtime role: public business-methodology skill package.
- Code-execution role: none.

## Public Product Role

`a-plus-content` is the public planning surface for ecommerce detail-page content. It turns product facts, audience intent, platform constraints, and brand tone into module architecture, copy hierarchy, visual prompting, and review checklists.

It answers: what modules the page needs, what each module must prove, how the copy should be layered, what visuals should support the claim, and what must be checked before design handoff or image generation.

## Directory Governance

The root directory is the migrated skill package entry. There is no nested template package and no source-capture residue.

Allowed runtime-support folders:

- `config/`: static defaults, layouts, style presets, and claim constraints.
- `docs/`: usage, input/output, and compliance guidance.
- `examples/`: calibration fixtures and sample delivery shapes.
- `prompts/`: analysis, planning, writing, and visual prompting guidance.
- `schemas/`: structured input/output references.
- `templates/`: Markdown delivery templates.

Disallowed for current public skill runtime:

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- source-site audit records

If a future detail-page skill requires any disallowed folder to produce its core result, it is not eligible for Gxgen's current public business skill surface.

## Business Boundary

Use this skill for:

- Amazon A+ content and product-detail page planning.
- Brand story modules, feature modules, comparison modules, parameter modules, FAQ modules, and closing trust modules.
- Copy packs and image prompt packs for detail-page sections.
- Review of existing A+ / detail-page content for repetition, unsupported claims, weak proof, or unclear visual hierarchy.

Do not use this skill for:

- Single image generation, generic posters, or social cards.
- Listing image sets, main/sub image matrices, or multi-angle product coverage.
- Infographics, video scripts, video storyboards, or direct video generation.
- Running scripts or treating static support files as runtime gates.

## Runtime Boundary

- `SKILL.md` is the only runtime entrypoint.
- Support files are static context only. They can inform output shapes, prompt patterns, and review criteria, but they must not create hidden workflow, tool-choice, provider-routing, sticky state, or completion gates.
- The public contract does not promise automatic page scraping, image generation, or publishing.

## Duplicate-Skill Review

- `product-image-set` owns Listing image-set planning and multi-image commercial coverage.
- `multi-angle-product-image` owns standardized product-view coverage.
- `image-creation` owns direct image generation direction.
- `infographic` owns knowledge/data/process visualization.
- `a-plus-content` owns long-form ecommerce detail-page modules, copy hierarchy, and A+ content handoff.

These boundaries keep the public catalog useful without duplicate definitions.

## Migration Review Checklist

Use this checklist for the next skill packages:

1. Move the real package contents to the skill root after removing wrapper and source-capture residue.
2. Remove source-brand identifiers and template-export markers from public-facing files.
3. Keep only static support assets that still help a text-first Agent: prompts, schemas, templates, configs, docs, and examples.
4. Remove code-execution dependencies from public skill packages, or classify the package as a code-execution candidate instead.
5. Ensure the runtime entrypoint and support files do not create hidden routing, fixed phases, or required-next tools.
