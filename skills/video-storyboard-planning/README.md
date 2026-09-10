# Video Storyboard Planning Skill

This package contains the source assets for the built-in `video-storyboard-planning` skill.

Runtime-readable support files live under `references/`:
- `references/runtime-guide.md`
- `references/output-template.md`

The other folders are package assets for authoring, validation, examples, and regression coverage. Do not rely on the Agent runtime automatically reading sibling folders such as `templates/`, `prompts/`, `schemas/`, `workflows/`, or `rubrics`; expose essential operating guidance through `SKILL.md` and `references/`.

Publication governance is documented in `PUBLICATION-GOVERNANCE.md`. The bundled JavaScript tools are static package support files, not Agent runtime tools.
