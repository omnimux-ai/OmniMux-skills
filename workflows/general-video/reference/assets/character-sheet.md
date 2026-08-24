# Character Sheet — general-video 角色锚点

## Activate When

- 多个下游镜头需要同一 character / subject，且没有足够的现有参考。
- 用户明确要求角色卡、turnaround 或多视图人物参考。
- 一次性人物或已有 ref capsule 足以稳定身份时不生成新 sheet。

## Decision Test

先区分两种请求：

1. workflow-owned reusable anchor：服从共享 Asset Pipeline 的六视图标准。
2. 用户直接要求普通“三视图”：按用户语义输出 front / side / back；不得用 workflow 内部标准改写用户交付物。若它还要服务近景或说话视频，记录脸部身份信息不足的风险。

一个 sheet 默认只承载一个持续人物身份。关系 / 群像图可指导站位，但不应让不同身份在一个网格里相互污染。

## Action

### Reusable anchor default

在一张 16:9 横图中使用清晰分隔的 3x2 六视图：

- 上排：全身 front / side / back，头脚完整；
- 下排：front face / side profile / three-quarter face 近景；
- 六格保持同一身份、同一持续状态、同一服装和同一媒介；
- 全身格保留头顶、双手、双脚和鞋，并在头顶与脚底留出呼吸空间；
- 使用干净的中性灰摄影棚背景、柔和均匀的工作室光，不把剧情场景、地面、家具或一次性表演固定进身份卡；
- 基础卡使用中性表情和自然站姿；性格化表情、哭喊、战斗动作、临时汗水和镜头光效留给后续 work item；
- 只保留角色真正携带的核心装备，普通道具留给镜头 prompt 或 ref capsule。

Planner 在 anchor work item 的最终 prompt 中明确记录 six-view standard character sheet、3x2、六个命名视图、clearly separated grid cells、same identity、neutral studio background 和 no text/watermark，不只写“做角色卡”。

### Prompt contract

生成型 work item 必须把以下信息写进最终 prompt 和执行字段：

- 这是单张 16:9 横向复合画布，不是六张独立图片；
- 上排是 front / side / back 全身，下排是 front face / side profile / three-quarter face 近景；
- 每格只承载一个清晰视图，格子之间有明显留白，人物不跨格、不重影；
- 全部视图保持同一脸部结构、发型、体型、服装、装备和媒介；
- 背景保持统一的中性灰工作室背景，不出现文字、标签、水印、场景元素或无关道具；
- 角色描述、时代、职业和产品事实必须来自已确认的 source / ref，不凭空补审美设定。

如果用户明确要求普通三视图，按用户要求只做 front / side / back，并在涉及近景、口播或脸部连续性时记录脸部信息不足的风险；不能把普通三视图静默改成六视图。

### Content

- 身份事实来自用户、source、参考图或已批准人物文档。
- 写清脸部结构、发型、体型、核心服装、标志特征以及当前持续状态。
- 真人写实人物补充自然肤色、轻微肤色差异、真实毛孔/绒毛层次和不过度磨皮的材质要求；非真人媒介不套用真人皮肤词。
- 历史 / 地域 / 职业信息只转成会影响可见设计的事实。
- 基础卡完成后再派生持续状态；派生项引用基础 / 前一状态并只写变化。
- 同一资产 batch 是否锁同一 vendor/model，由 Stage Execution Plan 记录，具体选择交给运行时能力路由。

## Review

检查六格身份、服装、装备和媒介一致；全身格头顶、双手、双脚无关键裁切；脸部格足够辨识；网格清楚；背景统一且无场景污染；没有文字、水印、额外人物、随机配饰、临时情绪或无关道具。只返修失败项，并保留已批准身份事实。

## Boundary

本卡是 reusable character anchor 的唯一主输出；`character-guard.md` 只约束同一 Assets work item，不创建额外人物输出。

共享 Asset Pipeline 是 workflow 角色锚点结构的唯一真相源；Semantic Judgment 决定普通三视图和参考贡献。本文件不维护布局 CDN、静态模型优先级、选角候选流程或 vendor fallback。
