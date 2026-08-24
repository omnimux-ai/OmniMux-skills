# 出镜驱动 profile（C）

> 真人出镜主体的身份、表现和自然节奏是主要交付：Vlog、真人出镜口播、采访对话、第一人称记录或真人短视频快剪。虚拟或 AI 数字讲者持续面对镜头按稿口播由 media-agent 的 `koc-video` skill 承接，不进入本 profile。

## Route

- `driver`: `on-camera`
- `required_stage_ids`: `intent-brief`, `visual-gen`
- `conditional_stage_ids`: `assets`（需要跨片段复用出镜身份、服装/状态或场景时）；`storyboard-images`（用户选择生成分镜图、关键帧或 N-grid 时）；`post`（多片段、用户明确要求字幕/画面文字或最终合成时）
- `stage_order`（默认）：`intent-brief → assets? → storyboard-images? → visual-gen → post?`

出镜驱动先在 `intent-brief` 锁定人物和表演目标；只有需要跨片段复用时才创建 Assets，需要分镜图时通过结构化 `question` 提供推荐选项。Visual Gen 直接读取已确认的简案、资产和可选分镜图编译视频任务。

人物参考图、固定角色、音色描述或逐字文案都不能单独触发本 profile。无法判断是真人 Vlog/采访/记录，还是数字人按稿口播时，回到通用 workflow 的数字人口播边界先 `question`，不能继续 author 本 profile。

## Stage routing

下表是 on-camera 的 Stage 输出和 driver-specific checks；没有检查的单元格必须写成“无”。author `intent-brief` 前仍执行通用 workflow 的确定性门槛。

| Stage | 这一阶段要解决什么 | 当前阶段读取的知识卡 | 执行前检查 | 产出后检查 |
|---|---|---|---|---|
| `intent-brief` | 按五字段简案写主体、情绪基调、视觉母题、关键画面和关键台词，再补充参考/输入范围、真人出镜身份、表现目标、说话方式、镜头距离、插入画面方向和原生人声/现场声设计 | `<workflowsDir>/_shared/stage-execution-plan.md`；`<workflowsDir>/general-video/reference/assets/casting-spec.md`；`<workflowsDir>/general-video/reference/directing/live-action-shooting.md`；包含故事、剧情或角色对白时读 `<workflowsDir>/general-video/reference/screenwriting/script-writing.md`；真人参考视频时按需读 `<workflowsDir>/general-video/reference/visual-aesthetics/video-reference-analysis.md`；视觉方向未被参考充分锁定时按需读 `<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md` | 无 | 检查五字段简案、出镜身份、表演目标、说话内容、镜头语言、声音设计、主成像方式和参考作用是否可执行 |
| `assets` | 生成或登记出镜主体的身份锚点、状态/服装变体和场景参考 | `<workflowsDir>/_shared/asset-pipeline.md`；`<workflowsDir>/general-video/reference/assets/asset-extraction.md`、`<workflowsDir>/general-video/reference/assets/casting-spec.md`；有人物时共同读取 `<workflowsDir>/general-video/reference/assets/character-sheet.md` 与 `<workflowsDir>/general-video/reference/assets/character-guard.md`；同时按需读 `<workflowsDir>/general-video/reference/assets/character-consistency.md`、`<workflowsDir>/general-video/reference/assets/character-features.md`；生成真人写实人物 anchor 时必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；有场景锚点时读 `<workflowsDir>/general-video/reference/assets/scene-sheet.md` | 无 | 检查画布上实际生成的出镜主体、服装/状态和场景资产，确认身份、表现、连续性和复用关系 |
| `storyboard-images` | 用户选择后，按已确认简案和可选 Assets 生成 video-ready 单帧或已批准的 N-grid | `<workflowsDir>/general-video/reference/directing/storyboard-discipline.md`、`<workflowsDir>/general-video/reference/directing/keyframe-strategy.md`；需要连续宫格时读 `<workflowsDir>/general-video/reference/directing/n-grid.md` | 无 | 检查动作、构图、主体身份、空间连续性和真实单帧可用性 |
| `visual-gen` | 生成保持主体身份和自然表演的出镜片段；按已批准台词语义生成原生人声、动作声和现场 ambience，不生成音乐 | `<workflowsDir>/general-video/reference/directing/video-generation-spec.md`、`<workflowsDir>/general-video/reference/directing/video-generation-strategy.md`、`<workflowsDir>/general-video/reference/directing/live-action-shooting.md`、`<workflowsDir>/general-video/reference/sound/audio-strategy.md`；真人写实必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；当前 prompt 新增、展开或修复成像质感、光线或材质时读 `<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md`；口播发音/声音表现按需读 `<workflowsDir>/general-video/reference/sound/voice-control.md`、`<workflowsDir>/general-video/reference/sound/pronunciation.md` | 在 Production Board 确认全部视频提示词、refs、时长、比例和声音方案 | 在 Production Board 查看实际视频片段，确认内容、表演、连续性和声音 |
| `post` | 按出镜节奏剪辑片段并处理音频；仅用户明确要求时处理字幕/画面文字；review-only 请求交给已打开的视频编辑器插件 | `<workflowsDir>/_shared/video-merge.md`；用户明确要求字幕时读 `<workflowsDir>/_shared/subtitle-pipeline.md`；按需读取 `<workflowsDir>/general-video/reference/editing/trim-strategy.md`、`<workflowsDir>/general-video/reference/sound/audio-engineering.md` | 无 | review-only 读取并检查视频编辑器项目状态；final render 无 |

## Driver rules

- 出镜主体是 core anchor：先锁身份、状态、服装和场景，再写镜头动作；不要用风格卡替代人物身份卡。
- 表演写可观察动作、视线、反应、停顿和自然节奏，不给情绪贴抽象标签，也不要在 prompt 中要求“像广告一样表演”。
- 采访、Vlog 和第一人称记录按连续表现分组；只有硬切场景、插入画面、人物状态变化或时长超限才拆开。
- 每个 video work item 默认写原生人声 + 动作声 + 现场 ambience、无音乐的 `audio_approach`，并在 prompt 保留已批准台词和可观察声音；不创建独立音频。
- 需要作为后续视频模型 `reference audio` 使用的出镜语音参考，生成后必须用实测时长校验为大于 2 秒；不足或等于 2 秒时先重生成或补足参考音频，不能四舍五入登记，也不能进入 `visual-gen`。
- 显式静音只按共享 Stage contract 的证据门槛处理；“不要 BGM”仍保留原生人声和现场声。
- 每个 Visual Gen item 都要说明参考图锁定的是哪一个主体身份，禁止让 Executor 自行选择出镜人或声音。

## Questions

参考登记、输入分流和“不猜测”确定性门槛按通用 workflow 的入口规则执行；本 profile 只追加以下出镜专属问题。

- 触发条件：用户没有提供台词，且“照稿口播”和“自然即兴”会改变生成方式 → 询问采用逐字稿还是即兴表达。
- 触发条件：进入 `storyboard-images` / `visual-gen` 节点且用户尚未选择分镜 → Planner 询问“生成推荐分镜图 / 直接进入视频生成”。

question 只补信息或选择，不代表出镜资产、Stage 或成片已审批。
