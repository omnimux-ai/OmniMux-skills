# 故事驱动 profile（N）

> 观众主要通过画面顺序、动作或事件推进理解和感受内容：既包括氛围片、展示片、视觉实验，也包括故事短片、微电影、预告式叙事和混剪叙事。

## Route

- `driver`: `narrative`
- `required_stage_ids`: `intent-brief`, `visual-gen`
- `conditional_stage_ids`: `assets`（角色、场景或状态跨片段复用时）；`storyboard-images`（用户选择生成分镜图、关键帧或 N-grid 时）；`audio`（视频生成后用户选择添加配乐时）；`post`（多片段、配乐或其它确定性合成时）
- `stage_order`（默认）：`intent-brief → assets? → storyboard-images? → visual-gen → audio? → post?`

Research、故事结构、片段组织和风格参考都并入 `intent-brief` 的制作简案；不要为这些内容再创建额外 Stage。有角色、事件和因果链时用故事骨架；只有氛围、动作、展示或视觉变化时用五字段简案，不虚构角色和起承转合。Planner 在 author `visual-gen` 时结合已接受的制作简案、Assets 和实际分镜图逐 clip 编译最终 prompts；需要用户选择或修改时通过结构化 `question` 收集。对白默认跟随 video work item 原生生成；无对白叙事仍生成事件匹配的 SFX/ambience。视频片段确认后询问是否添加配乐，选择添加时依次 author `audio` 和 `post`。

## Stage routing

下表是 narrative 的 Stage 输出和 driver-specific checks；没有检查的单元格必须写成“无”。author `intent-brief` 前仍执行通用 workflow 的确定性门槛。

| Stage | 这一阶段要解决什么 | 当前阶段读取的知识卡 | 执行前检查 | 产出后检查 |
|---|---|---|---|---|
| `intent-brief` | 有故事因果时写主题/主线、角色、场景、起承转合和关键 beats，逐 beat 锁定可见行动、必要的逐字对白及事件结果；没有故事因果时写主体、情绪基调、视觉母题、关键画面和可选台词；两者都锁定参考/输入范围、视觉方向和原生声音/静音设计 | `<workflowsDir>/_shared/stage-execution-plan.md`；按需读 `<workflowsDir>/general-video/reference/visual-aesthetics/video-reference-analysis.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/color.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/composition-depth.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md` 和 `<workflowsDir>/general-video/reference/directing/scene-description-layers.md`；存在故事、剧情或角色对白时读 `<workflowsDir>/general-video/reference/screenwriting/script-writing.md` | 无 | 简案形状与内容相符，交付、画面推进、参考作用、视觉方向和声音设计可追溯；有故事时再检查因果、人物状态和对白原文 |
| `assets` | 固化跨片段复用的主体、角色、场景或状态 | `<workflowsDir>/_shared/asset-pipeline.md`；`<workflowsDir>/general-video/reference/assets/asset-extraction.md`；有人物时共同读取 `<workflowsDir>/general-video/reference/assets/character-sheet.md` 与 `<workflowsDir>/general-video/reference/assets/character-guard.md`；同时按需读 `<workflowsDir>/general-video/reference/assets/character-consistency.md`、`<workflowsDir>/general-video/reference/assets/character-features.md`；生成真人写实人物 anchor 时必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；按需读 `<workflowsDir>/general-video/reference/assets/scene-sheet.md`、`<workflowsDir>/general-video/reference/assets/era-identity-guard.md`、`<workflowsDir>/general-video/reference/assets/style-consistency.md` | 无 | 检查画布上实际生成的主体/角色/场景资产，确认身份、状态、连续性和下游复用能力 |
| `storyboard-images` | 先问“生成推荐分镜图 / 直接进入视频生成”；用户选“生成推荐分镜图”时，先为关键 beat 标注建立、推进、落点或细节的镜头目的，再生成分镜图、关键帧或 N-grid；选“直接进入视频生成”时 omit 该 stage | `<workflowsDir>/general-video/reference/directing/storyboard-discipline.md`、`<workflowsDir>/general-video/reference/directing/keyframe-strategy.md`；需要连续宫格时读 `<workflowsDir>/general-video/reference/directing/n-grid.md`；有人物时读 `<workflowsDir>/general-video/reference/assets/character-consistency.md`，真人写实人物必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；成像质感、光线或材质需要在当前画面展开时读 `<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md` | 无 | 检查实际分镜图的内容覆盖、镜头目的与景别、阅读顺序、主体身份、动作、构图、光线、材质和跨组连续性；复合 grid/contact sheet 需先选定或派生真实单帧 |
| `visual-gen` | 从制作简案、可选 Assets 和已接受的实际分镜图编译 continuity-first clip groups 与最终 prompts，再一对一生成连续音画；无对白时生成事件匹配的原生 SFX/ambience，有已批准对白时同时原生生成对白，原生轨不生成音乐；继承关键 beat 的镜头目的与景别分配，以建立、推进、情绪落点和细节形成可读节奏，同主体相邻镜头保持景别跃迁 | `<workflowsDir>/general-video/reference/directing/storyboard-discipline.md`、`<workflowsDir>/general-video/reference/directing/scene-description-layers.md`、`<workflowsDir>/general-video/reference/directing/video-generation-spec.md`、`<workflowsDir>/general-video/reference/directing/video-generation-strategy.md`、`<workflowsDir>/general-video/reference/sound/audio-strategy.md`；按需读 `<workflowsDir>/general-video/reference/directing/film-language-handbook.md`、`<workflowsDir>/general-video/reference/directing/montage-theory.md`、`<workflowsDir>/general-video/reference/editing/editing-principles.md`；有人物时按需读 `<workflowsDir>/general-video/reference/assets/character-consistency.md`，真人写实人物必读 `<workflowsDir>/general-video/reference/directing/photoreal-skin.md`；有关键帧时读 `<workflowsDir>/general-video/reference/directing/keyframe-strategy.md`；当前 prompt 新增、展开或修复成像质感、光线或材质时读 `<workflowsDir>/general-video/reference/visual-aesthetics/visual-style-presets.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/lighting.md`、`<workflowsDir>/general-video/reference/visual-aesthetics/materials.md`；有对白时按需读 `<workflowsDir>/general-video/reference/sound/voice-control.md`、`<workflowsDir>/general-video/reference/sound/pronunciation.md` | 在 Production Board 确认全部视频提示词、refs、时长、比例和声音方案 | 在 Production Board 查看实际视频片段，确认内容、镜头、连续性和声音 |
| `audio` | 按已确认视频的叙事、节奏和总时长生成一条完整配乐 | `<workflowsDir>/_shared/audio-pipeline.md`；`<workflowsDir>/general-video/reference/sound/audio-strategy.md`、`<workflowsDir>/general-video/reference/sound/audio-mix-hierarchy.md` | 无 | 试听实际配乐，确认情绪、节奏、时长和剧情推进匹配 |
| `post` | 按确认顺序合并片段，保留原生对白/SFX/ambience，并按用户选择混入配乐；仅用户明确要求时处理字幕/文字；review-only 请求交给已打开的视频编辑器插件 | `<workflowsDir>/_shared/video-merge.md`；用户明确要求字幕时读 `<workflowsDir>/_shared/subtitle-pipeline.md`；按需读 `<workflowsDir>/general-video/reference/editing/transition-decision-tree.md`、`<workflowsDir>/general-video/reference/editing/trim-strategy.md`、`<workflowsDir>/general-video/reference/sound/audio-engineering.md` | 无 | review-only 读取并检查视频编辑器项目状态；final render 无 |

## Driver rules

- `intent-brief` 先判断内容是否存在角色、事件和因果链：存在时写故事骨架，并把主线拆成能改变目标、关系、信息或结果的关键 beats；不存在时写五字段画面简案，不能为了套“故事驱动”虚构剧情。
- 纯画面任务锁定主体、空间、材质、光线、运动、节奏和参考作用；故事任务为每个关键 beat 写明角色目标或压力、可见行动、必要的逐字对白、事件结果和下一步因果。用户未主动提出对白不是省略对白的依据；仅当动作和反应足以传达关键含义时采用无对白。
- 所有已批准对白逐字复制到 Visual Gen prompt；不得在 Executor 侧改写、补写或压缩对白。
- 主体、角色或场景只有在后续片段复用时才建 core anchor；一次性道具、灯光和临时状态留在 brief、ref capsule 或 prompt 中。
- 按画面连续性和有意切点分组，不按每句台词或镜头注机械拆分。场景/时间/主体状态硬切、蒙太奇和时长超限才拆组。
- `visual-gen` 直接从已接受的制作简案、角色/场景 anchors、已有 refs 和可选的实际分镜结果编译最终 work items。只有实际执行通过检查的 `storyboard-images` Stage，才能把其真实单帧结果加入对应 item。复合 grid/contact sheet 只能承担显式 style/layout 角色，不得冒充视频首帧、尾帧或起始构图。
- `visual-gen` 进入 `plan_review` 时，Media-agent 将风格、时长、refs、`audio_approach` 和 prompt 的待决选择整理为结构化 `question`；用户回答后直接回填 Stage contract。已无待决选择时不再发送“确认/继续/修改”式对话。
- 每个 video work item 都写正向 `audio_approach`：有已批准对白时按文本语义生成原生对白 + 事件 SFX/ambience；否则为事件匹配的原生 SFX/ambience；原生轨不生成音乐。
- 显式静音只按共享 Stage contract 的证据门槛处理；不得把可听 ambience/SFX 与 `silent` 写进同一 `audio_approach`。
- Visual Gen 生成事件匹配的原生对白（如有已批准对白）和 SFX/ambience；用户选择添加配乐后，Audio 生成独立 BGM，Post 将其与原生声音混合。

## Questions

参考登记、输入分流和“不猜测”确定性门槛按通用 workflow 的入口规则执行；本 profile 只追加以下故事专属问题。

- 触发条件：已有剧本/大纲的范围、版本或对白原文不明确，且会改变故事交付 → 询问要使用的具体来源或范围。
- 触发条件：用户没有给出结局/叙事视角，而不同选择会改变整条故事链 → 询问结局或视角，不询问可由常规结构推断的镜头细节。
- 触发条件：Planner 询问“生成推荐分镜图 / 直接进入视频生成”；用户选“生成推荐分镜图”才 author `storyboard-images`。
- 触发条件：`visual-gen` 结果已确认且用户尚未决定配乐 → Planner 询问“添加配乐 / 不加配乐”，收到选择后 author `audio` 或后续 `post`。

question 只补信息或选择，不代表制作简案或 Stage 已审批。
