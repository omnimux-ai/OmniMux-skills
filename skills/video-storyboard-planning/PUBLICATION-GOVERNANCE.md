# Video Storyboard Planning Publication Governance

## Decision

`video/video-storyboard-planning` remains a public business skill because its primary value is storyboard planning methodology, output contracts, and quality checks.

It is not treated as a code-execution skill.

## Runtime Boundary

Runtime-readable files:

- `SKILL.md`
- `references/runtime-guide.md`
- `references/output-template.md`

Static support files:

- `tools/`
- `workflows/`
- `schemas/`
- `templates/`
- `examples/`
- `tests/`
- `rubrics/`
- `docs/`
- `prompts/`

Static support files may be read during governance or authoring review. They must not be executed or treated as required runtime steps unless a separate sandbox/tool contract review approves that path.

## Public Use Conditions

- Use for storyboard, shot list, prompt-pack planning, and production handoff.
- Do not use for final video generation, image generation, video editing, or Canvas persistence unless the user explicitly asks for that downstream artifact and the corresponding tool contract is visible.
- Do not treat Markdown workflows as hidden phase machines.
- Do not treat bundled JavaScript tools as Agent runtime tools.
- Do not claim generated frames, videos, exported files, or persisted canvas artifacts unless an actual tool result proves them.

## Catalog Relationship

This skill is more specialized than `canvas/video-storyboard`:

- `video/video-storyboard-planning`: commerce, UGC, product-led short video, AI prompt-pack planning.
- `canvas/video-storyboard`: lightweight general storyboard table guidance.

Both can stay public only while their catalog descriptions and runtime boundaries remain distinct.
