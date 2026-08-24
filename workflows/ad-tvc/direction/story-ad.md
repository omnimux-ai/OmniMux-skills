# Direction：剧情广告

> 由 `direction/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

- 剧情广告用叙事沉浸和人物 / 主体变化承载品牌命题；产品可以是触发器、行动工具、伙伴、舞台或结果证据，但不能在结尾突然贴片或代替人物作出选择。
- 补充 `direction_profile`：`narrative_promise`、`protagonist_or_subject`、`want`、`initial_state`、`inciting_incident`、`obstacle`、`choice`、`consequence`、`final_state`、`brand_role`、`emotion_arc`、`dialogue_policy`。`brand_role` 只选一个主要角色。
- 用户脚本存在时保持事件顺序、人物关系、逐字对白、揭示顺序和结局；缺少可见因果时只记录缺口，不静默改写。
- 从零创作只保留一条主线、一个主要冲突、一个关键选择和一个品牌命题。人物极少或无人时，由主体状态承担同等 A→B 变化。
- 叙事功能链为 `常态 / 目标 → 触发 → 阻碍 / 压力 → 行动 / 选择 → 后果 / 品牌兑现`。短时长可合并相邻功能，但不得删除触发、选择或可见结果。
- 开场直接给出正在发生的动作、关系张力或视觉问题，不用背景介绍占据前段；结尾必须兑现开场承诺，或留下与品牌命题一致的明确余韵。

## `anchors`

- 路线约束锁定主要人物 / 主体、主要冲突、品牌角色、核心场景、转折母题和转折前后的视觉状态；实际生成路线 KV 时只把这些已确认关系视觉化，不增加支线人物、第二冲突或额外结局。
- 固定人物需要跨镜身份连续性且现有人物 source 无法稳定承担时才生成模特卡；人物的 Want、行为气质、关系和转折状态写入路线约束，不把整段剧情塞进人物卡。
- 环境锚点卡只锁定可复用的地点身份和持续环境状态；临时冲突、人物选择、产品动作与结果仍由分镜和对应 refs 决定。

## `storyboard`

- Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs、执行约束、结果 QC 和返修边界，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
- 按 `建立 → 触发 → 加压 → 选择 → 后果 / 兑现` 编排 `narrative_stage`。每段至少改变目标、关系、风险、信息或结果中的一项；没有变化的支线、重复反应和纯气氛镜头删除。
- 每个关键 beat 都写清起始状态、可见动作、阻力、动作结果及如何导致下一 beat。旁白和对白不能替代缺失的可见动作或后果。
- 人物通过动作、视线、停顿、物件交换、空间距离和环境反馈表达情绪；台词只承载画面无法表达且会改变信息、关系、决定或风险的内容。
- 产品 / 品牌必须在因果链中承担已确认角色：改变行动条件、帮助完成选择、见证结果或把情绪命题物化；情感高潮不插入推销句，卖点以行动证据或结果状态兑现。
- 镜头边界跟随动作完成、信息揭示、关系变化或自然遮挡；冲突可逐步靠近，解决后重新打开空间。用户要求长镜头或固定 POV 时，用动作阶段和构图变化保持内部推进。
- Storyboard 在文档完成前执行一次下列 deterministic 结构校验；不把 pass / fail verdict 另写为 `constraints` 或平行 QC。任一项失败时先修订 Storyboard，全部通过后才允许后续 Visual Gen author。

### Flat capsule 执行增量

- `execution_delta` 条目 `story_ad.execution` 锁定 Executor 逐 unit execution reference 对照已确认 beat、起止状态、逐字台词和品牌角色生成；不得为了画面炫技改写选择、后果或结局。
- `execution_delta` 条目 `story_ad.result_qc_boundary` 锁定 Visual Gen 唯一结果 QC 检查：`silent_story_legible`、`beat_results_visible`、`performance_continuity`、`brand_payoff_visible`、`emotional_payoff_complete`。`silent_story_legible` 检查关闭声音后仍能看懂主体、触发、行动和结果；其余字段分别检查动作结果、身份 / 状态 / 情绪连续性、品牌因果作用和转折兑现。它只定义检查边界，不保存 verdict 或结果 metadata。
- `execution_delta` 条目 `story_ad.repair_policy` 锁定计划完整但实际画面偏离时只返修对应 `unit_id` 或必要的相邻衔接单元；发现结构缺口时返回 Planner 修订，不在结果 QC 中临时补剧情。

## Planner 剧情结构 QC

- `causal_chain_complete`：触发、阻碍、行动 / 选择和后果均存在，且相邻 beat 有明确因果。
- `character_arc_visible`：初始状态与最终状态可由动作、关系或结果区分，不只靠旁白宣告。
- `brand_role_causal`：品牌 / 产品参与已确认的行动或结果，不是可删除的尾部露出。
- `single_story_focus`：只有一条主线、一个主要冲突和一个关键转折，所有 beat 服务同一命题。
- `dialogue_non_expository`：台词不复述可见画面，并实际改变信息、关系、决定或风险。
- `duration_feasible`：对白、动作、反应与品牌落点均进入时长账本，没有依赖超速表演或不可见跳步。
- 任一项失败时只修订路线或 Storyboard，不生成视频，也不让 Executor 在执行时补写剧情。

## QC 所有权

- Planner 把上述结构校验合并进 Storyboard 文档完成门禁，Visual Gen 对实际成片执行唯一内部结果 QC；Media-agent 只根据通过 / 失败结果推进、返修或恢复 Planner，不重新判断剧情。
- `execution_delta` 只携带结果检查边界，不携带 QC verdict；QC 不新增 Stage、画布文档、metadata 容器或用户确认卡。路线业务选择只使用 `question`，Storyboard 和实际视频结果都不建立用户审核。
