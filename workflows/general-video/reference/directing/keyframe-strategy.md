# Keyframe Strategy — 稳定态与关键状态参考

## Activate When

- clip 的起始 / 结束构图、动作状态或产品细节需要静态视觉锚点。
- shot plan 明确要求首帧、尾帧、状态板或关键姿态，且这些 refs 会被下游 work item 消费。
- 产品特写、角色状态变化或跨组连续性仅靠文字不足以稳定。

不因为存在多镜头就为每个镜头自动生成 keyframe；已有 source、anchor 或 runtime ref 足够时直接复用。

## Decision Test

关键帧捕捉稳定态，不捕捉转换瞬间：

- 选择动作完成后的可读姿态、运镜落点或转场前后的清晰状态。
- 避免硬切 / 匹配剪辑发生瞬间、运动模糊、剧烈变形和无法复用的过渡帧。
- 只有首尾状态都会影响生成路径时才同时提供 first / last frame；不要把普通角色卡冒充真实起始画面。

## Routing by Subject

| 类型 | 关键判断 |
|---|---|
| 场景 / 氛围 | 记录空间、光线、色温和主体位置；参考应服务 world 或 style，不自动变成 subject ref |
| 产品 / 品牌 | 远景使用能覆盖整体比例的真实 ref；近景和特写优先匹配部件级来源；prompt 少写外观猜测 |
| 人物 / 出镜 | 记录可辨识身份、当前服装 / 状态、视线和动作落点；跨镜复用同一 identity ref |
| 混合镜头 | 按角色、产品、场景和状态拆分 ref 贡献，保持输入顺序与 prompt slot 一致 |

## Action

- A video-ready keyframe is one single clean frame with no panel grid, contact-sheet labels, captions, or storyboard chrome. Composite boards remain review evidence rather than start / end / state refs.
- 用稳定逻辑 id 表示 keyframe，但它只在 Stage Execution Plan / runtime refs 里当元数据，不进入创作 prompt；也不要把文件名或固定扩展名写进 prompt。显示名称可按 shot / state 命名。
- 记录 `role`（start / end / state / style / product detail）、source range、contributes、take / adapt 和使用它的 work items。
- 关键帧生成与独立的 image / asset stage 对齐；互不依赖的状态可以并行，后续依赖前一状态的链路保持串行。
- 关键帧只承载稳定构图与可见事实。运镜、变速、内部切换和声音事件写入 Shot Plan / Visual Gen prompt。

## Review

- 画面稳定、主体和关键细节可读，且与 source range 对应。
- keyframe 的 role 清楚，没有把 style、subject、world 和 layout 混成一个 ref。
- 产品特写使用了与景别匹配的来源；人物状态与相邻 work item 可承接。
- 没有因为缺少关键帧而凭空补出用户未提供的产品、logo 或人物背面。
- 计划要求单帧但实际输出复合分镜板时，本轮检查不通过；先选择、裁取或重新生成真实单帧，再允许下游视频消费。

## Boundaries

本卡不规定一镜一图、固定命名、固定模型、固定 15 秒、品牌尾帧或 negative prompt；具体首尾帧能力以 runtime manifest 和当前 Stage execution locks 为准。
