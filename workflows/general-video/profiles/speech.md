# 语音驱动 profile（S）

> 语音/讲解是主要交付：画外知识讲解、教程、科普、企业讲解、故事解说或必须逐字同步的旁白视频。虚拟或 AI 数字讲者持续面对镜头按稿口播由 media-agent 的 `koc-video` skill 承接，不进入本 profile。

## Route

- `driver`: `speech`
- `required_stage_ids`: `intent-brief`, `audio`, `visual-gen`, `post`
- `conditional_stage_ids`: `assets`（`segmented_audio` 需要统一音色锚点，或需要复用讲述人身份、定制音色、跨段角色/场景视觉身份时使用）；`storyboard-images`（用户选择生成分镜图、关键帧或 N-grid 时）
- `stage_order`（语音驱动）：`intent-brief → assets? → audio → storyboard-images? → visual-gen → post`

语音驱动先确定 VO 生成方式。Audio 完成后必须把完整 VO 或分段 VO 合成为唯一 `vo_timeline`：包含 `vo_ref`、实测总时长、每个语义段/句子的原文、顺序、start/end 时间和对应音频 ref。`vo_timeline` 是后续 Storyboard Images、Visual Gen 和 Post 的唯一时间基准；Stage 1 的计划时长只保留为目标，不再覆盖实测 VO timing。

Audio 完成后、进入 Visual Gen 前必须发一次结构化 `question`，让用户选择“生成推荐分镜图”或“直接进入视频生成”；只有用户此前已明确要求生成或跳过分镜时才不再询问。Planner 不得自行替用户选择。

语音驱动只确定 timing 与信息证据的主来源，不降低视觉创作等级。纪录片、人文社科、历史讲解和长篇 explainer 仍要建立完整 visual progression；旁白证据映射不能退化成逐句字面配图，也不能用同一桌面、物件、构图和慢推反复替换名词。

固定人物形象、音色描述或逐字文案不能单独证明这是语音驱动。无法判断文案是画外讲解还是数字人面对镜头口播时，回到通用 workflow 的数字人口播边界先 `question`，不能继续 author 本 profile。

## Stage routing

下表是 speech 的 Stage 输出和 driver-specific checks；没有检查的单元格必须写成“无”。author `intent-brief` 前仍执行通用 workflow 的确定性门槛。

| Stage | 这一阶段要解决什么 | 当前阶段读取的知识卡 | 执行前检查 | 产出后检查 |
|---|---|---|---|---|
| `intent-brief` | 按五字段简案写主体、情绪基调、视觉母题、关键画面和逐字台词/旁白，再补充参考/输入范围、信息结构、画面证据、语速和可懂度要求；锁定 VO 进入 Post、Visual Gen 只生成 SFX/ambience，以及 medium、visual grammar、构图/空间、色彩/光线/材质、镜头运动和跨段变化 | `<workflowsDir>/_shared/stage-execution-plan.md`；讲解/科普/教程读 `<workflowsDir>/general-video/reference/screenwriting/explainer-narrative.md`；自写旁白读 `<workflowsDir>/general-video/reference/screenwriting/vo-natural-writing.md`；逐字稿需要适配目标时长时读 `<workflowsDir>/general-video/reference/sound/audio-strategy.md`；包含故事、剧情或角色对白时读 `<workflowsDir>/general-video/reference/screenwriting/script-writing.md`；按需读 `<workflowsDir>/general-video/reference/directing/scene-description-layers.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/video-reference-analysis.md`；视觉方向未被参考充分锁定时读 `<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/color.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/composition-depth.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md`、`<workflowsDir>/general-video/reference/assets/style-consistency.md` | 无 | 检查逐字旁白、计划发声时长、VO/Post 与原生 SFX/ambience 的分工、信息/画面证据、参考作用和 visual progression 是否可执行 |
| `assets` | 为 `segmented_audio` 写一个 `modality: audio.tts` work item，使用 `seed-audio-1.0` 生成一段短试听，完整结果作为音色锚点；该规则优先于共享 voice-prep 默认；按需准备其它讲述人、角色或场景身份 | `<workflowsDir>/_shared/asset-pipeline.md`；需要声音时读 `<workflowsDir>/general-video/reference/assets/casting-spec.md`、`<workflowsDir>/general-video/reference/sound/voice-control.md`；需要角色身份时读 `<workflowsDir>/general-video/reference/assets/asset-extraction.md`，并共同读取 `<workflowsDir>/general-video/reference/assets/character-sheet.md` 与 `<workflowsDir>/general-video/reference/assets/character-guard.md`；同时按需读 `<workflowsDir>/general-video/reference/assets/character-consistency.md`、`<workflowsDir>/general-video/reference/assets/character-features.md`；生成真人写实人物 anchor 时必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；有场景锚点时读 `<workflowsDir>/general-video/reference/assets/scene-sheet.md` | 无 | 试听实际音色锚点，确认说话人、语言、音色和表演方向；检查其它身份资产的复用关系 |
| `audio` | 按 `speech_generation_mode` 生成一条完整逐字 VO，或按句/信息段生成多条 VO；仅在明确要求时同时准备 BGM、stems 或替换轨道 | `<workflowsDir>/_shared/audio-pipeline.md`；`<workflowsDir>/general-video/reference/sound/audio-strategy.md`；发音/专名时读 `<workflowsDir>/general-video/reference/sound/pronunciation.md`；音色控制时读 `<workflowsDir>/general-video/reference/sound/voice-control.md`；混音时读 `<workflowsDir>/general-video/reference/sound/audio-mix-hierarchy.md` | 无 | 试听画布上实际生成的 VO/其它音频，确认逐字文本/歌词、说话人/音色、发音、语速；写回 `vo_timeline`，包含实测总时长、每段原文、顺序、start/end、音频 ref 和下游对齐方式 |
| `storyboard-images` | 用户选择后，按已确认 VO 的逐字内容和实测时间窗口生成分镜图；每组生成一张无面板标注、可直接作为视频 ref 的 video-ready 单帧关键画面，只有已批准 N-grid work item 才生成复合分镜板 | `<workflowsDir>/general-video/reference/directing/keyframe-strategy.md`、`<workflowsDir>/general-video/reference/assets/style-consistency.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/composition-depth.md`；需要连续宫格时读 `<workflowsDir>/general-video/reference/directing/n-grid.md`；有人物时读 `<workflowsDir>/general-video/reference/assets/character-consistency.md`，真人写实人物必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；成像质感、色彩、光线或材质需要在当前画面展开时读 `<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/color.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md` | 无 | 检查实际分镜序列的旁白证据、主体/空间、构图、色彩、光线、材质、视觉重心变化和母题回归；风格连续性不能退化为重复同一场景/物件/构图/运动；复合分镜板需选定或派生真实单帧 |
| `visual-gen` | 从制作简案、`vo_timeline`、可选 Assets 和可选分镜图编译 continuity-first clip groups 与最终 prompts；每个 video item 必须绑定一个或多个 VO 时间窗口，目标时长覆盖对应 start/end；原生轨生成事件 SFX/ambience | `<workflowsDir>/general-video/reference/directing/storyboard-format.md`、`<workflowsDir>/general-video/reference/directing/scene-description-layers.md`、`<workflowsDir>/general-video/reference/directing/video-generation-spec.md`、`<workflowsDir>/general-video/reference/directing/video-generation-strategy.md`、`<workflowsDir>/general-video/reference/sound/audio-strategy.md`、`<workflowsDir>/general-video/reference/assets/style-consistency.md`；按需读 `<workflowsDir>/general-video/reference/directing/storyboard-discipline.md`、`<workflowsDir>/general-video/reference/directing/film-language-handbook.md`、`<workflowsDir>/general-video/reference/directing/montage-theory.md`、`<workflowsDir>/general-video/reference/editing/editing-principles.md`、`<workflowsDir>/general-video/reference/editing/duration-reconciliation.md`；有人物时按需读取 `<workflowsDir>/general-video/reference/assets/character-consistency.md`；需要首尾帧时读 `<workflowsDir>/general-video/reference/directing/keyframe-strategy.md`；真人写实人物必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；当前 prompt 新增、展开或修复成像质感、光线或材质时读 `<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md` | 在 Production Board 确认全部视频提示词、refs、时长、比例、声音方案和 VO 时间窗口 | 在 Production Board 查看实际视频片段，确认内容、镜头、音画窗口、连续性和原生声音 |
| `post` | 以 `vo_timeline` 为主时间线，保留/整理片段的事件 SFX/ambience，铺入完整 VO，或将分段 VO 按 start/end 对齐并合成为完整配音；按明确需求混入 BGM；仅用户明确要求时处理字幕/画面文字；review-only 请求交给已打开的视频编辑器插件 | `<workflowsDir>/_shared/video-merge.md`；用户明确要求字幕时读 `<workflowsDir>/_shared/subtitle-pipeline.md`；按需读取 `<workflowsDir>/general-video/reference/sound/audio-engineering.md`、`<workflowsDir>/general-video/reference/sound/audio-mix-hierarchy.md` | 无 | review-only 读取并检查视频编辑器项目状态；final render 无 |

## Driver rules

- `intent-brief` 中的讲解稿必须是逐字可执行文本，不把关键内容只写成提纲；用户提供的文案保持原文。
- 用户或项目提供硬性时长时，Audio 按该约束规划文案；已有完整逐字稿且无硬性时长时，实际 VO 时长作为视频时长依据。
- `single_audio` 创建一个完整 VO work item，整轨实测时长作为 Visual Gen 的节奏依据。
- `segmented_audio` 在 Assets 使用 `seed-audio-1.0` 生成一段短试听，完整结果作为音色锚点；接受后，分段 VO 统一引用该锚点，并保留原文、顺序和实测时长，Post 按顺序合成为完整配音。
- `segmented_audio` 派发 VO 时按批次执行：同一批最多 5 条 `audio.tts` work items，等待本批全部成功或返回明确失败后，再继续下一批；不得一次性派发超过 5 条 SeedAudio 任务。
- 批次失败时只重试失败的 logical output id，成功项保留当前 `runtime_refs`；不得因为后续批次失败而重生成已成功的前序音频。
- 每批完成后立刻记录每条音频的实测 duration、原文、顺序和 ref，用于累计生成 `vo_timeline`；不要等所有批次结束后再凭文本估算时长。
- `vo_timeline` 的优先级高于 `intent-brief` 的计划时长；用户接受过短或过长 VO 后，后续 Stage 必须按实测 VO 总时长重新排视觉节奏。
- `visual-gen` 的 prompt 只写 `vo_timeline` 的时间窗、段落 id、视觉功能和镜头动作，不要写完整逐字旁白正文、引号内台词或把旁白直接当作模型输出文本；旁白正文只保留在 `audio` / `post`。
- Visual Gen 必须把 `vo_timeline.segments[]` 映射到 video item 的 `source` 或 `render`：每个 item 写清覆盖的 VO segment ids、start/end、逐字原文摘要和视觉功能；不得只按平均时长、固定镜头数或 Stage 1 预计秒数拆分。
- Post 必须按 `vo_timeline` 放置 VO 和画面；画面不足时先在 Visual Gen / shot plan 修正，或明确使用 hold、B-roll、trim、轻微变速等确定性操作；不得截断 VO、改写原文或让画面脱离对应 VO 窗口。
- 导出前校验 VO 总时长、视频覆盖时长、每段 VO 窗口覆盖、空白/重叠和提前结束；不通过时回到 Visual Gen 或 Post plan 修正，不直接 final render。
- Visual Gen 把 VO timing 映射为内容窗口，窗口可包含动作尾韵、反应、环境观察或自然静默。
- 每个 clip group 同时写清当前信息功能和视觉功能；跨组保持 medium/style baseline，但人物/行动、环境/空间、文献/物件、解释图形与过渡节奏按内容形成 visual progression，不能把 evidence synchronization 做成逐句字面插图。
- 每个 `visual-gen` item 必须携带对应的 video-ready 单帧 ref（如已执行 storyboard-images），并使用已确认的时间窗口、audio approach 和执行锁项；复合 grid/contact sheet 只能承担显式 style/layout 角色，不能冒充首帧、尾帧或起始构图。
- 复用声音身份时，在 `assets` 产生可解析的 voice reference；不要把未生成的音色名称直接写成 Visual Gen 的 refs。
- 每个 video work item 默认写 `audio_approach: native event SFX/ambience, no spoken words or music; VO added in Post`，并在 prompt 正向写出与事件匹配的可听环境/动作声。
- 每个 video item 用对应的逐字旁白片段和时间窗口编排画面；VO id 进入 Post 编辑计划，Visual Gen `refs` 保留生成画面所需的资产。
- 显式静音只按共享 Stage contract 的证据门槛处理；不得把可听 ambience/SFX 与 `silent` 写进同一 `audio_approach`。
- Post 默认把完整 VO 或已合成的分段 VO 铺在原生 SFX/ambience 上；BGM 只在用户明确要求或已确认方向明确需要时生成和混入。
- 旁白、对白或“完整成片”都不自动推出字幕；只有用户明确要求字幕时才在 Post 生成或烧录。

## Questions

参考登记、输入分流和“不猜测”确定性门槛按通用 workflow 的入口规则执行；本 profile 只追加以下语音专属问题。

- 触发条件：讲解稿缺少逐字文本，且 Agent 无法在不改变事实的情况下补写 → 询问用户提供脚本或允许创作脚本。
- 触发条件：`intent-brief` 完成后仍缺少 `speech_generation_mode` → 在 author Assets / Audio 前询问“你希望如何生成配音？分句生成更容易按画面内容对齐；整段生成只产生一条音频，但音画节奏可能需要后期调整。”：
  - `分句生成并自动合成`（推荐）→ `segmented_audio`：逐段生成并按内容窗口对齐，过程中会产生多条音频。
  - `生成一条完整配音` → `single_audio`：一次生成整段音频，画面可保留自然留白，必要时由用户后期调整音画节奏。
- 触发条件：同一句话可对应多种互斥画面证据，且来源无法裁决 → 询问画面证据选择，不询问镜头装饰。
- 触发条件：Audio 已完成且用户尚未明确选择是否生成分镜 → Planner 询问“生成推荐分镜图 / 直接进入视频生成”，收到用户选择后 author 对应 Stage。

## Mid-plan Replan

- 用户在 Audio、Storyboard Images、Visual Gen 或 Post 期间改变逐字稿含义、旁白身份、音频生成方式、分镜选择、画面证据范围或交付拓扑，但任务仍属于 `general-video` + `speech` 时，沿用现有 binding 和 `plan_id`，通过一次 Replan 更新受影响的后缀。若变化改选 narrative/on-camera 或其它 workflow，返回 Router 并创建新 Plan。
- 只保留最后一个仍然有效且已接受的 Stage 及其结论/runtime refs。逐字稿、旁白身份或音频生成方式变化触及 Audio 时，旧 VO、音色 anchor 和依赖它们的后续产物属于失效后缀，由框架移入 `superseded_runtime_refs`，不得继续作为当前 refs。
- 未来 suffix 保持 pending，并严格按 speech 的 `stage_outline` 逐 Stage author、review 和执行，包括 Audio 后待用户选择的 `storyboard-images?` 节点。只改当前 prompt 或拒绝单个产出时走局部 Stage patch/retry。

question 只补信息或选择，不代表 VO、画面或 Stage 已审批。
