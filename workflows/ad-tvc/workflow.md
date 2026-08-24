---
project_type: ad-tvc
stages: [intake-brief, visual-research, anchors, storyboard, visual-gen, audio, post]
---

# Ad TVC — 视觉广告工作流

> **进入信号**：目标成片超过 15 秒，且任务需要完整叙事、参考研究、可复用产品 / 人物、多段视频生成或最终合成。
>
> **覆盖范围**：品牌广告、产品广告与故事广告共用主干，差异通过 Direction、Category 和来源保持模式处理。
>
> **使用顺序**：Intake → Visual Research → Anchors → Storyboard → Visual Gen → 可选 Audio → Post。轻量单条广告优先走 direct / brand-ad。

## Principle

先把广告要说什么、给谁看、产品怎么出现想清楚，再独立完成产品真实参考与风格参考调研；Anchors 只按下游一致性缺口生成产品、人物、场景或路线锚点卡，然后分段生成并合成成片。能直接使用用户已有素材就直接使用，不为了走流程重复搜索、重复写文档或重复生成。

只问真正会改变创意、成本或交付结果的问题。Visual Research 的画布选图使用普通文本等待，不调用 `question`；Anchors 只有本轮真的生成了锚点图才给用户看；Visual Gen 只在花钱生成前授权一次；Post 只在最终成片完成后审核一次。

只要还要做 Storyboard 或 Visual Gen，就必须先有稳定产品身份、创意路线、风格与适用人物 / 场景依据。Visual Research 已验证且可解析的 source 可以直接承担锚定角色；只有文字约束或现有 source 无法稳定支撑下游一致性时才生成对应锚点卡。

除用户提供且必须逐字保留的直达 Prompt 外，所有保留 Storyboard / Visual Gen 的 TVC 默认编译一套 `tvc_typography_package`：它从品牌 / 产品事实、Style Master 和品类调性推导 Display A、Display B、Utility、Marks、尺度、颜色、载体、空间绑定和动效生命周期，并随每个视频 unit 传递。T06 只在字体成为主要构图或叙事事件时额外命中；Post 不补写任何字体或图形层。

## 路由判断

- 广告路由先确认是否存在至少一项复杂执行依赖，再同时校验目标时长；两项必须同时满足。
- 只有任务存在完整叙事、参考研究、可复用锚点、多个视频单元或最终合成依赖，且目标成片超过 15 秒时，才进入本 workflow。
- 任一条件不满足时优先走 direct / brand-ad。
- 用户未提供目标成片时长时，router 必须先询问，再决定执行路径。

## 全链路

高信息量 Brief → Visual Research 按证据缺口搜索、画布选择并单次分析产品 / 风格参考 → Anchors 从零创作时提供三条路线选择并按缺口生成锚点卡 → Generation Strategy 文档 → Visual Gen（画面 + 原生旁白 / 对白 / 环境声）→ 可选单条 BGM → Post。已有脚本、分镜、最终 Prompt 或已验证资产足够时复用来源，只生成下游仍缺的锚点卡。TVC 旁白不得独立生成。

## Rules

以下是所有 Stage 共用的执行铁律。

- `workflow.md` 只管骨架，不替代 Stage 细则。
- 已确认的方向、来源、产品事实、时长、声音和执行锁只向下传递，不允许下游重新发散。
- 文档由 Planner 物化，媒体由 Executor 执行；Planner 已物化且无媒体工作项的 Stage 不得进入 `doing`。
- TVC intake 发问前必须读取 `reference/intake-and-brief.md`；同轮可回答的问题一次提交为多张独立选择卡，只有依赖上一题答案的项目才进入下一轮。

### 用户审核唯一真相

只有下表三处可以写入 Stage `review.*`；其它 `question` 只是业务选择，Executor 内部 QC 只是完成条件，都不得触发 `waiting_user(result_review)`。

| 环节 | `review.before_execution` | `review.after_execution` |
|---|---|---|
| Intake | 无 | 无；Planner 物化 `brief_doc` 且合同完整后直接 `done` |
| Visual Research | 无 | 无；用户在画布选择参考并用普通文本回复，不建立 Stage review |
| Anchors | 无 | 仅当前 Stage 真实生成了至少一张锚点图时，一次审核本轮实际锚点图；纯复用 / 纯文档时无 |
| Storyboard | 无 | 无；Planner 物化 `generation_strategy_doc` 且合同完整后直接 `done` |
| Visual Gen | 唯一一次生成前授权：最终 Prompts、权威费用依据与执行锁变化 delta | 无；实际成片只做内部 QC |
| Audio | 无 | 无；BGM 只做内部 QC |
| Post | 无 | 唯一一次最终成片审核 |

## Stages

本表只负责路由。依赖、author 条件、执行锁、work items、QC 与返修规则以对应 reference 为准。

| Stage | 产物 | 必读 reference | 完成 / 审核 |
|---|---|---|---|
| `intake-brief` | `brief_doc`、`tvc_intake_brief` | `reference/intake-and-brief.md` | 文档物化后 `done`；无审核 |
| `visual-research` | 已验证产品 / 风格 refs、Style Master、`tvc_visual_research` | `reference/creative-research.md` | 调研合同完整后 `done`；无审核 |
| `anchors` | 按需产品 / 路线 / 人物 / 环境卡、`tvc_anchor_set` | `reference/creative-brainstorm.md` | 内部 QC 通过；仅审核本轮真实生成的锚点图 |
| `storyboard` | `generation_strategy_doc`、`tvc_storyboard_plan` | `reference/video-generation-strategy.md` | 文档物化后 `done`；无审核 |
| `visual-gen` | 单条不超过 7000 字符的最终 Prompt、视频单元、`tvc_video_set` | `reference/video-generation-execution.md` | 生成前授权一次；结果内部 QC 后 `done` |
| `audio` | 可选 `bgm_final`、`tvc_bgm` | `reference/audio-strategy.md` | reference 决定 author / omit；无审核 |
| `post` | `tvc_final`、`tvc_final_delivery` | `reference/post-production.md` | 导出 QC 后审核最终成片 |

## 阶段计划契约

- 每次只 author 当前 Stage。首次写计划头、包含 `id`、`order`、短 `name` 的完整 `stage_outline` 和 `intake-brief`；当前 Stage 完成后恢复同一个 planner `task_id`，用 `hub_plan_patch_stage` 追加下一个 required Stage，不重写已完成 Stage。
- 中文会话中的 `stage_outline`、`stages` 和 `pending_stages` 使用以下用户可见名称：Intake Brief=`需求简报`、Visual Research=`视觉调研`、Anchors=`锚点`、Storyboard=`分镜`、Visual Gen=`视频生成`、Audio=`音乐`、Post=`后期`；不得暴露内部英文阶段名。

| 顺序 | 编写阶段 | 落地文档 | 读取范围（当前 Stage 只能读这些） |
|---|---|---|---|
| 1 | intake-brief | 需求简报 | 本文件 + `<workflowsDir>/_shared/stage-execution-plan.md` + `<workflowsDir>/ad-tvc/reference/intake-and-brief.md` |
| 2 | visual-research | 无 | `<workflowsDir>/ad-tvc/reference/creative-research.md` + `product-research.md` + `visual-style-spec.md` + 一个命中 Category 根卡的 `creative-research` section + 一个命中 Direction 卡的 `creative-research` section |
| 3 | anchors | 无 | `<workflowsDir>/ad-tvc/reference/creative-brainstorm.md` + `<workflowsDir>/ad-tvc/reference/product-spec.md` + `<workflowsDir>/ad-tvc/reference/visual-techniques/T06-typography-composition.md` 的“基础字体包” + 一个命中 Category 根卡的 `anchors` section + 一个命中 Direction 卡的 `anchors` section + `<workflowsDir>/ad-tvc/reference/visual-techniques-library.md` 索引；按真实卡片缺口读取 `prompt-templates.md`、`<workflowsDir>/_shared/asset-pipeline.md` 及其明确指向的 Anchors references |
| 4 | storyboard | 分镜与视频生成规划 | `<workflowsDir>/ad-tvc/reference/video-generation-strategy.md` + `<workflowsDir>/ad-tvc/reference/visual-techniques/T06-typography-composition.md` 的“基础字体包” + 一个命中 Category 根卡的 `storyboard` section + 一个命中 Direction 卡的 `storyboard` section + `technique_plan` 命中技法卡的 `## Generation Strategy`；命中技法规则必须编译进分镜脚本和对应 `tvc_storyboard_plan_unit` |
| 5 | visual-gen | 无 | `<workflowsDir>/ad-tvc/reference/video-generation-execution.md` |
| 6（`independent_bgm=on` 且 `bgm_source_id=generate` 时） | audio | 无 | `<workflowsDir>/ad-tvc/reference/audio-strategy.md` + `<workflowsDir>/_shared/audio-pipeline.md` |
| 7 | post | 无 | `<workflowsDir>/ad-tvc/reference/post-production.md` + `<workflowsDir>/_shared/video-merge.md` |

- 只读取当前 Stage 列出的 references，不提前读取、author 或执行后续 Stage。Category / Direction 各只读取一个命中根卡且只应用当前 Stage section：Visual Research 应用 `creative-research`，Anchors 与 Storyboard 应用各自同名 section。只有根卡明确给出条件指针时才读取大型可选卡。
- Document work item 写入真实 `document_node_id`；生成型 work item 写入最终 `prompt`、有序 `refs`、稳定 `id` 和 reference 要求的执行字段，Executor 不补写创作内容。纯文档 Stage 物化完成后直接 `done`，不得进入 `doing`。
- 每个 Stage 的 `depends_on`、compact capsule、author / omit、执行锁、QC 与返修规则以当前 Stage reference 为准；除 Audio 外，只消费直接依赖的稳定 capsule 和可解析媒体，不回读搜索过程、传递依赖或其它 Stage 长文档。Audio 只消费同一 Planner task 已冻结的 `tvc_audio_intent` compact handoff，不读取任何 Stage 动态对象。
- 只要保留 Storyboard 或 Visual Gen，就必须先有可解析的产品身份路由、创意路线、Style Master 与适用人物 / 环境依据；卡片只在 Anchors 判定存在稳定性缺口时生成。
- 用户修改文档、Prompt、refs 或锁项时，恢复对应 planner `task_id`，只 patch 当前 Stage、关联文档和受影响的稳定 work item id；审核仍严格按上方 SSOT 执行。

## Anti-patterns
- 让下游 Stage 回读搜索过程、其它 Stage 长文档或未命中的品类可选卡；用固定产品角度、镜头数量、节奏或技法数量代替对用户方向与当前素材的判断。
- 让 Post 读取 `<workflowsDir>/_shared/subtitle-pipeline.md`；TVC 字幕、Logo、CTA、End Card 与图形包装必须由视频单元原生生成，不在 Post 补写或烧录。
