# Workflows — authoring and directory guide

`workflow.md` is the runtime routing index used by router. media-agent passes its path to router, and planner only consumes the selected `workflow_match`. This README only documents the directory layout and points to the writing rules.

## Layout

```text
workflows/
  workflow.md            runtime routing index
  README.md              directory + authoring guide (this file)
  AUTHORING.md           workflow writing rules
  <project_type>/workflow.md each active project workflow
  general-video/reference/  通用视频按任务形态条件加载的私有创作 toolkit
  drama-series/reference/    仅 drama-series 需要的细化模板（production-plan / storyboard / assets-blocking 等）
  mv/reference/              仅 mv 需要的意图、音乐、视觉概念、分镜与视频 prompt 参考
  _shared/                   跨品类复用的 utility（非 workflow_match target）
  _disabled/                 暂停接入分流的 workflow 归档（不是 workflow_match target）
```

## Authoring Entry

- To change runtime routing or active workflow targets, edit `workflow.md`.
- To change workflow file shape or reference-writing rules, read `AUTHORING.md` first.
- Keep this file short; do not duplicate runtime routing tables here.
