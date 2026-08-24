---
project_type: drama-series
stages: [script, production-plan, asset-anchors, storyboard, scene-keyframes, visual-gen, post]
---

# 短剧流程

> **进入信号**：剧、短剧、微短剧、连续剧集、剧本、短剧剧本、爆剧、剧情、第一集、企划案、需要角色/场景跨镜头延续等与剧集有关的信号，或从用户给出信息中检测到类似信号。

## Principle

按剧本（条件生成）→ 制作计划 → 资产锚点 → 分镜列表 → 宫格构图参考 → 视频片段 → 精剪推进。制作计划不复述剧本创作内容；分镜列表只写镜级拆解和逐字台词；beat 拆解只用于 planner 推理，不落画布。

用户上传或画布里的剧本只登记在顶层 Stage Execution Plan 的 `sources`，不要作为阶段（stage）。Media-agent 只通过 router 获取路由胶囊。Planner 只从 `source_documents[]` 读取已确认的目标集数/范围；多集来源在规划前必须先确认 `target_episode_scope`。默认建议先做第 1 集。

## Rules

### 来源接收

- 将输入规范化为：已确认剧本、故事前提、分镜备注、风格参考、已有角色/场景资产，或用户指定的集数范围。只记录缺失事实和已接受的物料建议。
- 现有剧本是事实源。提取目标集数、场次、角色、地点、关键道具、状态变化、对白、冲突转折、hook/payoff 和时长依据；除非用户要求，不要自行加戏。对白必须逐字保留；多集来源只提取已确认的 `target_episode_scope`。
- 已有资产必须按下游连续性需求检查：角色图支撑脸/体型/服装一致，场景图支撑多角度空间，并且场景时代/地域线索不与剧本冲突。被拒绝的建议写成按原样使用的备注；检查结果落到制作计划的物料质检部分。
- 一次性锁定制作模式（A 真人实拍或 B 漫画/动画）、时代/年代与地域、媒介/风格、画幅、语言和 BGM 策略。时长默认按完整剧本在分镜阶段逐句实算；用户主动给出的目标时长在用户选择执行前只作为分镜确认时的偏好对比，不能参与默认分镜的镜头、镜头组或秒数分配。用户选择更短目标后，先改写短版剧本，再按短版重新计算。字幕策略与视频模型在 Visual Gen 派单前单独问询并锁定；下游阶段保持全部已确认决策。生成用 prompt 只包含当前产物相关的风格、时代和光照约束。制作模式同时决定视觉媒介和片段默认音频方案，详见 `production-plan.md` 中的“按模式选择音频策略”。
- **基础信息入口门**：剧本完成后、资产生成前，必须按 `production-plan.md` 的 Questions 确认画幅；时长不在此处问询，主 workflow 不重复定义选项或默认值。

## Stages

| 阶段 | 输出 | 执行前检查 | 产出后检查 |
|---|---|---|---|
| Script | 条件生成：先确认「创作大纲」，再 materialize 一份 canvas 剧本文档。仅在用户没有可用剧本时生成；用户已提供成稿时跳过。 | 必须完成 `script-craft.md` 的创作大纲确认；未确认时不得 author 或 materialize Script。 | 检查剧本文档是否遵循已确认的创作大纲，并检查分集、场景内容、对白和动作。 |
| Production Plan | 一份 canvas 文档「制作计划 — <scope>」，按 `production-plan.md` 编写基础锁项（含时代/年代与地域）、物料质检、视觉风格锚点和资产清单。 | 无；文档由 planner 直接产出。 | 检查基础锁项、物料质检、视觉风格锚点和资产清单。 |
| Asset Anchors | 按 `assets.md` 和 `assets-blocking.md`，在同一阶段内依次生成 Character、Prop、Scene Anchors；道具主卡先于依赖它的角色状态图。 | 无。 | 三组全部完成后，一次检查角色身份与状态、道具 Prop Lock、场景空间和引用完整性。 |
| Storyboard | 按 `storyboard.md` 条件生成「站位记忆 — <scope>」，再生成「分镜列表 — <scope>」。 | 无；文档由 planner 直接产出。 | 检查站位、分组、逐组时长求和（每组 ≤15 秒）、逐字台词和节奏。 |
| Scene Keyframes | 按 `scene-keyframes.md` 和已选 `storyboard_style` / `keyframe_scope` 生成宫格；选择 `skip` 时省略本阶段。 | 无。 | 检查构图、景别、走位顺序和组间承接。 |
| Visual Gen | 按 `video-prompt.md` 将已确认镜头组一对一生成 clips。 | 确认 clips 范围、最终 prompts、有序锚点、宫格引用、时长和音频锁项。 | 检查身份、台词、站位、音效和干净画面。 |
| Post | 按制作计划的 BGM、字幕和音频锁项完成确定性拼接与收尾；`off` 不生成或混入 BGM，`provided` 只使用用户音轨，`generate` 才生成分段 BGM。 | 无。 | 检查节奏、转场、台词完整、字幕策略，以及 BGM 是否服从锁项。 |

用户要求修改时，resume 对应 planner `task_id`，同时更新 Stage contract 和相关文档节点。修改站位记忆时，在同一个 planner patch 中重新推导受影响分镜列表的空间列。

Asset Anchors 和 Storyboard 各只使用一次结果确认；修改意见写在该确认的自定义回答中，不另开“修改反馈”问题。只有用户确实提出修改、受影响内容完成修订或重生成后，才对修订后的结果发起一次新的确认。

完成站位记忆与分镜列表的联合审阅后，按 `scene-keyframes.md` 的 Questions 依次确定宫格范围和样式；选择 `skip` 时省略 Scene Keyframes Stage。站位记忆继续作为下游空间事实；它不另开独立 Gate，但必须出现在 Storyboard 联合确认中。

## 阶段计划契约

- 每次只 author 当前 Stage。首次写计划头、包含 `id`、`order`、短 `name` 的完整 `stage_outline` 和第一个 required Stage；当前 Stage 的产出后检查通过后恢复同一个 planner `task_id`，每次用 `hub_plan_patch_stage` 追加下一个 required Stage，不重写已完成 Stage。
- 中文会话中的 `stage_outline`、`stages` 和 `pending_stages` 固定使用以下用户可见名称：Script=`剧本`、Production Plan=`制作计划`、Asset Anchors=`资产锚点`、Storyboard=`分镜`、Scene Keyframes=`宫格关键帧`、Visual Gen=`视频生成`、Post=`后期`；不得暴露内部英文阶段名。

| 顺序 | 编写阶段 | 落地文档 | 读取范围（当前 Stage 只能读这些） |
|---|---|---|---|
| 0（条件触发，仅用户没有剧本时） | script | 剧本 | `<workflowsDir>/drama-series/reference/script-craft.md` |
| 1 | production-plan | 制作计划 | 本文件 + `<workflowsDir>/_shared/stage-execution-plan.md` + 来源剧本 + `<workflowsDir>/drama-series/reference/production-plan.md` |
| 2 | asset-anchors | 无 | `<workflowsDir>/drama-series/reference/assets.md`、`<workflowsDir>/drama-series/reference/assets-blocking.md` |
| 3 | storyboard | 站位记忆（条件，联合确认）、分镜列表 | `<workflowsDir>/drama-series/reference/storyboard.md`、`<workflowsDir>/drama-series/reference/assets-blocking.md`（站位记忆规范） |
| 4（`storyboard_style` 非 `skip` 时） | scene-keyframes | 无 | `<workflowsDir>/drama-series/reference/scene-keyframes.md` + Storyboard 站位记忆节点（触发时）+ 分镜列表节点 |
| 5 | visual-gen | 无 | `<workflowsDir>/drama-series/reference/production-plan.md` 的“Visual Gen 前的视频模型与字幕问询” + MiniMax H3 时 `<workflowsDir>/drama-series/reference/h3-video-prompt.md`，其他模型时 `<workflowsDir>/drama-series/reference/video-prompt.md` + Storyboard 站位记忆节点（触发时）+ 分镜列表节点 |
| 6 | post | 无 | `<workflowsDir>/drama-series/reference/post.md`、`<workflowsDir>/_shared/video-merge.md`、Visual Gen 的 `execution_locks.subtitle_policy`；需要字幕或文字烧录时读 `<workflowsDir>/_shared/subtitle-pipeline.md` |

- 只读取当前 Stage 列出的 references；不要提前读取或 author 后续 Stage。
- Document work item 写入真实 `document_node_id`。生成型 work item 写入最终 `prompt`、有序 `refs`、稳定 `id` 和 reference 要求的执行字段；executor 不补写创作内容。
- Storyboard 先物化站位记忆（触发时），再从完整时长账本物化分镜列表；时长核算必须在最终确认前完成。站位记忆不另开独立 Gate，但必须与分镜列表和预计时长进入同一次用户确认。用户提出站位调整时，在同一个 planner patch 中更新受影响文档并重新核算；用户在该卡选择更短目标时长时，先改写出对应短版剧本，再把短版作为新事实源重新编译分镜，不能按目标秒数反推现有镜头或平均分配片段时长。
- Scene Keyframes / Visual Gen 恢复同一个 planner `task_id`，读取 Storyboard 的真实文档节点；按 `clip_group_id` 读取对应分镜和空间快照，不使用会话摘要代替。Visual Gen 把实际读取的分镜节点、条件性站位记忆节点和分镜行数写入每个 work item 的 `source`。
- Visual Gen 的每个 work item 必须显式携带 `storyboard_document_node_id`；存在站位记忆文档时还必须携带 `blocking_memory_document_node_id`，并写正整数 `shot_count`。指针或来源缺失时按模型锁选择的唯一骨架补齐；无法补齐时返回 `stage_blocked`，不得用 `execution_excerpt`、阶段 goal、上一条 prompt 或模型默认构图代填。
- Asset Anchors 内按 Character Anchors、Prop Anchors、Scene Anchors 三组 author；角色、道具的 base-first 依赖按 `assets-blocking.md` 写入同一 Stage，三组全部完成后只进入一次产出审阅。
- 用户修改任何文档、prompt、refs 或锁项时，恢复对应 planner `task_id`，patch 当前 Stage 和关联文档；只重执行受影响的稳定 work item id。

## Anti-patterns

- 把用户上传的剧本建成 Stage，或在制作计划中复述整篇剧本。
- 改写源剧本对白、自行加戏，或处理未确认的集数范围。
- 未锁定制作模式、画幅、音频或 BGM 策略就 author 下游生成 Stage。
- 修改站位记忆后只改阶段描述，不同步重算受影响分镜的空间列。
- 提前读取、author 或执行当前 Stage 之后的 Stage。
