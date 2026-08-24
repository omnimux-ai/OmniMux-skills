# Workflows — runtime routing index

Workflow 只描述对话运行时的路由与执行边界：哪些 project workflow 是 active，router 如何把 inline intent / source pointers / constraints 压缩成路由结果，planner 如何只接收被选中的 workflow。写 workflow 规则时去 `README.md` / `AUTHORING.md`，不要把写作规范混进运行时索引。

## Routing

- media-agent 先判断任务是否可直接执行，或是否需要 route classification。
- Image-only generation/editing is not a workflow route. Batches, shared visual identity, generated subject/product refs, layout/text briefs, and style variants stay in the direct image path when they do not require non-image stages or final assembly.
- Product-led KOC / UGC / 种草 / 带货视频由 media-agent 的 `koc-video` skill 在 workflow routing 前承接，不是 `workflow_match` target。
- More than one requested video with the same subject identity is a route-required workflow unit, even when each clip looks individually generatable.
- Route-required tasks go to `router` with inline `user_intent`, optional explicit `source_documents[]`, known constraints, and this workflow index. Router returns a minimal `routing_capsule` with the route decision and, when relevant, `workflow_match`.
- `workflow_match` for project workflow units comes from `routing_capsule.workflow_match`. media-agent follows `route_kind: direct` back to direct execution, stops on `route_kind: ask`, and passes `route_kind: workflow` to planner.
- planner 读取 source pointers、`routing_capsule`、`workflow_match`、`stage-execution-plan.md` 和该 project workflow 点名的 shared utilities，物化 task/script document nodes 和完整 Stage Execution Plan。外部 source pointers 写入 plan 顶层 `sources`，不是虚拟 stage；planner 只返回 `plan_id`、`stage_count`、最小 `stages[]`。
- 长文档是 source artifact，不是 media-agent prompt context。pass pointers to router; router compresses them into routing evidence.

## Layout

```text
workflows/
  workflow.md            runtime routing index (this file)
  README.md              directory + authoring guide
  AUTHORING.md           workflow writing rules
  <project_type>/workflow.md each active project workflow
  general-video/reference/  通用视频按任务形态条件加载的私有创作 toolkit
  drama-series/reference/    仅 drama-series 需要的细化模板（production-plan / storyboard / assets-blocking 等）
  _shared/                   跨品类复用的 utility（非 workflow_match target）
  _disabled/                 暂停接入分流的 workflow 归档（不是 workflow_match target）
```

## Project Workflows

| 文件 | 用途 |
|---|---|
| `general-video/workflow.md` | 艺术短片 / 自媒体 / 教程 / 氛围 / 展示类依赖型视频兜底（带按需加载的 `reference/` 创作 toolkit） |
| `ad-tvc/workflow.md` | TVC / 影视广告 / 品牌大片 / 产品 / 商业广告视频 |
| `drama-series/workflow.md` | 短剧 / 微短剧 / 连续剧集 / 短剧剧本 / 第一集 / 企划案（带 `reference/production-plan.md`、`reference/storyboard.md`、`reference/assets-blocking.md` 等） |
| `mv/workflow.md` | MV / 音乐视频 / 给歌配画面 / 卡点视频 / 歌词视频 / 音乐可视化 / Music Video / AI Music Video / Lyric Video / Music Visualizer / Audio Visualizer / Beat-sync Video / Beat-synced Video / Performance Video / Rap Video / Visual Album / make a video for my song / turn this song into a video / visuals for a song / video synced to music or beat（以已确认音乐为主时间轴） |

These files are valid `workflow_match` targets.

## Shared Utilities

| 文件 | 用途 |
|---|---|
| `_shared/stage-execution-plan.md` | 执行专用完整 workflow：每个 stage 的 work_items、输入输出、依赖、状态 |
| `_shared/asset-pipeline.md` | 可复用角色 / 音色 / 场景 / 品牌产品来源锚点 |
| `_shared/audio-pipeline.md` | 独立 TTS / BGM / 歌曲 / stem / final mix 的资产形态和 gate |
| `_shared/video-merge.md` | 确定性终剪合成 + canvas proof |

Shared utilities are not `workflow_match` targets. Read them only when the selected project workflow or agent SP names them.
