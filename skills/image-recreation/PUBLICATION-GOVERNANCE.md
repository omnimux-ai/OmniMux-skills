# Image Recreation Publication Governance

## Status

- Publication status: public.
- Catalog status: registered as a user-visible built-in skill.
- Shared mapping status: registered in `SKILL_CATALOG_MAPPINGS`.
- Runtime role: public business-methodology skill package.
- Code-execution role: none.

## Public Product Role

`image-recreation` is the public skill for turning reference-image intent into an original, commercially usable image plan for the user's own product or brand.

It answers:

- what in the reference image is commercially effective,
- what can be reused safely,
- what must be replaced,
- how the user's product should take over the frame,
- and what prompt pack, batch plan, or production brief should be handed off next.

## Directory Governance

The root directory is the governed skill package entry. There is no nested source-template package.

Allowed runtime-support folders:

- `config/`: static defaults, role hints, and platform notes.
- `docs/`: usage, input/output, output-format, compliance, and review guidance.
- `examples/`: calibration briefs.
- `prompts/`: analysis, prompting, consistency, and negative-guidance material.
- `schemas/`: structured planning references.
- `templates/`: text delivery templates.

Disallowed for the current public skill runtime:

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- source capture or audit ledgers
- exported deliverables as runtime truth

If the package ever needs any disallowed folder to deliver its core value, it should be reclassified as a code-execution candidate instead of remaining a public business skill.

## Why It Is Publishable

- It owns a clear user-facing job: safe adaptation from a reference image to the user's own product visual.
- It does not require CLI, adapter, workflow step, or external side effect as part of the public contract.
- The runtime entrypoint is `SKILL.md`; support files are static context, output-shape guidance, and templates.
- It separates observation, adaptation, and risk review instead of hiding them inside tool order or workflow state.
- It explicitly rejects brand-copying, packaging mimicry, recognizable-person copying, and unsupported visual claims.
- It does not create hidden routing, required-next tools, fixed phases, sticky skill state, or completion gates.

## Public Safety Boundary

The skill is public only under a safe-adaptation contract:

- Migrate reusable methods: composition, product hierarchy, lighting mood, attention path, selling-point visualization, and text-safe layout.
- Replace protected or confusing expression: competitor logos, packaging systems, slogans, typography systems, unique props, campaign motifs, recognizable people, and brand-exclusive visual devices.
- Do not invent product claims, certifications, ingredients, platform badges, before/after results, or performance guarantees.
- When source evidence is weak, label assumptions and avoid claiming pixel-level certainty.

## Relationship To Existing Public Skills

- `image/image-creation`: broad image creation and prompt planning; use this skill only when the user is adapting from a reference image, competitor image, or defined visual source.
- `replicate/replicate-inspiration`: template/inspiration-library strategy; use this skill when the source is an image reference and the deliverable is an image adaptation plan or prompt pack.
- `image/infographic`: structured information graphics; do not use this skill for data, process, or knowledge-visualization layouts.

## Migration Review Outcome

- Old wrapper and source-residue directories were removed from the public package root.
- Useful static content was promoted into first-class root folders: `config/`, `docs/`, `examples/`, `prompts/`, `schemas/`, and `templates/`.
- The package no longer exposes a second nested skill entry or source-template identity.
- Publication text now describes stable business capability instead of source provenance.

## Verification

Publication changes must keep these checks green:

```bash
npm run skill:validate -- server/skills/image/image-recreation
# run brand-residue scan
# run outdated-phrasing scan
git diff --check HEAD
```
