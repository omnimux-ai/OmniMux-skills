# Product Image Set Publication Governance

## Status

- Publication status: public.
- Runtime role: user-facing business skill for ecommerce product image-set planning, prompt-pack preparation, and set review.
- Code execution core: false.

## Public Product Role

`product-image-set` owns the planning layer for a multi-image product listing system:

- image order and role definition
- product-consistency rules
- commerce-facing evidence and claim boundaries
- prompt-pack handoff
- full-set QA and revision priorities

It does not replace adjacent skills that own single-image recreation, generic image direction, or infographic-specific structuring.

## Directory Governance

The root directory is the only skill package entry. Allowed support folders are:

- `config/`: static size and safety guidance
- `docs/`: usage, compliance, export, and naming guidance
- `examples/`: calibration fixtures
- `prompts/`: planning and QA prompt guidance
- `schemas/`: output-shape references
- `templates/`: reusable single-image templates

These directories are sufficient for the public package because the core value is business method, not execution code.

## Publication Boundary

- `SKILL.md` is the only runtime entrypoint.
- Public output may include planning, prompt-pack handoff, set review, and structured QA.
- The package must not encode account bypass, hidden prompts, private-system extraction, fixed tool sequences, sticky skill state, hidden workflow ownership, or completion gates.
- Final image generation, upload, and marketplace delivery still require visible tool results and artifact proof outside this package.

## Why It Is Publishable

- It owns a clear user-facing business job: product image-set planning.
- Its public value survives without scripts, adapters, tests, or workflow execution.
- The runtime contract is carried by documentation, prompts, schemas, templates, examples, and static config.
- The package explicitly separates planning from downstream execution.
- Compliance and evidence limits are built into the skill contract instead of being deferred to hidden runtime behavior.

## Migration Review Checklist

Use this checklist for similar package governance work:

1. Remove wrapper and source-residue directories from the skill root.
2. Promote the useful static package contents to the root package structure.
3. Keep only docs, prompts, schemas, templates, examples, config, and similar static support assets.
4. Remove scripts, tests, workflows, adapters, and source-capture records from the public package.
5. Rewrite skill-facing documents so they describe the current root package, not a nested template origin.
6. If the package still depends on code execution to deliver its core value, reclassify it instead of publishing it as a public business skill.
