---
project_type: general-video
stages: [intent-brief, assets, storyboard-images, audio, visual-gen, post]
---

# General Video — open-ended dependency workflow

> **进入信号**：艺术短片、自媒体、教程/科普、Vlog、氛围片、展示片、临时多素材视频；未命中 ad-tvc / drama-series。产品主导的 KOC / UGC / 种草 / 带货和虚拟或 AI 数字讲者持续面对镜头按稿口播，由 media-agent 在 workflow routing 前加载 `koc-video` skill，不进入本 workflow。

## Principle

Use this workflow only when a video request has a real dependency chain: a brief/script, reusable anchor, reviewable visual plan, dependent clips, independent audio, or final assembly. A single actionable clip stays on the direct path.

Resolve exactly one `task_driver` workflow variant before authoring: `narrative`, `speech`, or `on-camera`. Then read exactly its profile asset. The selected variant's profile is the single source of truth for required/conditional dependency types, effective `stage_outline` order, current-Stage references, and driver-specific checks; the frontmatter only lists the Stage types this workflow can use.

Digital-presenter oral video is outside this workflow. A story character, off-screen narrator, real-person Vlog/interview, or real-person on-camera monologue does not by itself trigger that route.

### Plan Integrity

The selected profile's `stage_order` is the single source of truth for the authored plan. Preserve that order in `stage_outline.order`; a `depends_on` edge may only point to an earlier stage. A plan is invalid when its order differs from the profile, a stage depends on a later stage, or `visual-gen` lacks the confirmed timing/source artifact required by the selected profile. Storyboard images are visual references, not a substitute for a shot plan: when selected, `visual-gen` must consume both the confirmed storyboard decision and the profile's timing source.

## Stages

| 阶段 | 输出 | 执行前检查 | 产出后检查 |
|---|---|---|---|
| 制作简案（`intent-brief`） | 对应 driver 的简案；锁定交付、比例、时长、sources/refs、逐字内容（如有）、视觉方向和声音设计 | 无 | 检查交付范围、输入用途、创作方向、逐字内容和声音设计是否完整可执行 |
| Assets | 只生成或登记需要跨片段复用的人物、场景或声音身份资产；同一场景在多个视频片段中重复出现时，先生成场景资产图，后续视频片段统一引用 | 无 | 检查实际资产的身份、连续性和复用能力 |
| 分镜图（`storyboard-images`） | Planner 必须用结构化 `question` 询问“生成推荐分镜图 / 直接进入视频生成”；用户选“生成推荐分镜图”时才生成 video-ready 单帧或已批准的 N-grid，选“直接进入视频生成”时 omit | 无 | 检查内容覆盖、主体/空间、构图、视觉推进和真实单帧可用性 |
| Audio | 按用户选择生成一条完整 VO，或按句/信息段生成多条 VO；也可包含 BGM/歌曲/stems、替换对白或其它 standalone track | 无 | 试听实际音频，检查文本/歌词、说话人、发音、各段实测时长和下游用途 |
| Visual Gen | 每个 continuity-first clip group 一个最终 video work item，含明确可听结果；写 H3 prompt 时必须显式编译景别/机位/角度变化，同主体相邻镜头至少跨一个景别，且视角变化需落在 30° 到 90° 之间；需要贴脸或强化情绪/信息时优先写近景/特写；`storyboard-images` 是本 workflow 唯一的 workflow-owned 默认模型锁例外 | 按 selected variant profile | 按 selected variant profile |
| Post | 确定性 concat/trim、独立音轨混合、用户明确要求的字幕/画面文字；review-only 请求交给已打开的视频编辑器插件 | 无 | review-only 读取并检查视频编辑器项目状态；final render 无 |

## Driver Routing

| Driver | 高置信度信号 | Profile |
|---|---|---|
| `narrative` | 观众主要通过故事、画面、动作、氛围或展示理解内容，不依赖完整讲解或特定真人持续表达 | `<workflowsDir>/general-video/profiles/narrative.md` |
| `speech` | 完整旁白、教程、科普、解说或论证是信息主线，画面负责解释、举证和同步 | `<workflowsDir>/general-video/profiles/speech.md` |
| `on-camera` | 真人 Vlog、采访、第一人称记录或持续出镜表达，人物身份、表演或互动是交付核心 | `<workflowsDir>/general-video/profiles/on-camera.md` |

- 先登记用户上传的 sources/refs，再根据 query 和已确认来源判断。孤立的“人物”“文案”“旁白”“口播”或 voice/music asset 状态都不能决定 driver。
- 只有一个 driver 明显胜出，且另一个合理选择会改变交付拓扑时才自动选择；并列、来源冲突或无法判断“画外讲解 / 数字人按稿口播”时，先用大白话 `question` 询问差异，不展示内部名称。
- 比例无法从用户输入、sources 或项目锁项确定时，在首个 Plan 前询问。时长会改变文案或交付边界时再询问；`speech` 已有完整逐字稿时，由实际 VO 时长确定。分辨率由当前 Stage 按所选模型的合法规格确定。
- 用户回答只解决缺失信息，不构成 Stage 审批；不得再要求用户在普通聊天里回复“确认”或“继续”。
- 分镜选择由 selected variant profile 在对应节点触发；Planner 必须先用结构化 `question` 询问“生成推荐分镜图 / 直接进入视频生成”，再根据用户选择 author 或 omit `storyboard-images`。在选择未发生前，不得把它当成已确认的执行阶段。

## Audio Contract

- 独立 Audio、Visual Gen 原生音轨和显式静音的语义及证据门槛只服从 `<workflowsDir>/_shared/stage-execution-plan.md`；selected variant profile 只负责把 driver 的可听结果实例化到 Stage 拓扑和 work items。
- 在本 workflow 内，所有独立语音类音频（VO、旁白、对白、配音、替换对白、定制音色和 voice reference）优先使用 `seed-audio-1.0`（`vendor="seedaudio"`）；只有用户明确锁定其它语音模型，或 SeedAudio 能力检查确认不满足需求时，才改用其它 TTS。该优先级覆盖共享 `audio-pipeline` 对普通 TTS 的默认路由。BGM、score、歌曲和 stems 仍按其专用音频能力路由，不将音乐任务伪装成 TTS。
- 用户未提音频时，general-video 默认让 Visual Gen 生成事件匹配的原生 SFX/ambience，不生成独立 BGM。`narrative` 可包含已批准的原生对白；`on-camera` 保留原生人声和现场声；`speech` 不重复生成旁白，只生成原生 SFX/ambience，完整 VO 在 Post 铺入。每个 `render.audio_approach` 和最终 prompt 都正向写出该可听结果。
- 独立 BGM 只在用户明确要求或已确认创作方向明确需要时进入 `audio` + `post`；不得从情绪词、缺少音乐资产或“完整成片”自动推出 BGM。

## Plan Authoring

- Variant profile 的 `required_stage_ids` 表示本次交付必须满足的依赖类型，不表示必须重新生产。先移除已由用户确认的 top-level sources / artifacts 满足的类型，再加入命中的 conditional Stages，按 selected variant profile 顺序生成完整 `stage_outline`；不要按 frontmatter 顺序机械复制，也不要创建 skipped/placeholder Stage。需要在前序 Stage 完成后由用户决定的 conditional Stage，先保留为 unauthored outline entry；到达该节点时按 selected variant profile 发出 `question`，再根据选择 author 或 omit，并继续下一 Stage。`speech` 的 `storyboard-images` 是当前 workflow 的待决条件节点：用户尚未选择时保留为 Audio 后、Visual Gen 前的 unauthored outline entry，不能让 Visual Gen 越过该节点。
- 每次只 author 当前 Stage。首次 `hub_plan_write` 必须记录本次选定的 `workflow.path` 和 `variant`；后续 Stage 只保留在 `stage_outline`，当前 Stage 的输出接受后再恢复同一 planner `task_id`，用 `hub_plan_patch_stage` 追加下一 Stage。
- 被已有输入满足的依赖不进入 outline；后续 Stage 直接消费对应 sources/ref capsules 或真实 `runtime_refs`，并保留来源证据。
- 每个 Stage 写 `stage_fields.task_driver`。Document work item 使用真实 `document_node_id`；媒体 work item 使用稳定 `id`、最终 prompt、有序 refs 和 selected variant profile 要求的执行字段，Executor 不补写创作内容。
- `assets` 在 `stage_outline` 中命名为“资产”；author 时从已接受简案重新提取每个跨片段复用的人物、场景和声音身份，并为需要生成的角色或场景锚点分别写 `modality: image` work item。Stage 进入 `doing` 后由 Executor 生成实际资产。
- `storyboard-images` 先问“生成推荐分镜图 / 直接进入视频生成”；选前者才 author，选后者则 omit。该条件 Stage 只有在被选择且用户或 approved project state 未提供 canonical image model lock 时，Planner 才在该 Stage 的 `execution_locks` 写入 concrete `{ vendor: gpt-image, model_id: gpt-image-2 }`；该锁覆盖本 Stage 的全部 work items，包括使用多张有序 identity / scene refs 的条目，不能仅因 ref 数量改选 Banana。已有 canonical lock 必须原样保留。
- Review 完全服从 selected variant profile 的 Stage 表：“无”必须落为省略字段或 `[]`，不能附带授权说明；final-render Post 不设置执行前或产出后 review，review-only Post 只使用视频编辑器项目的产出后检查。所有 `visual-gen` Stage 执行前进入 `plan_review`，生成后进入 `result_review`，均在 Production Board 展示并由用户确认。

## Mid-plan Changes

- 用户在计划执行中改变讲解稿解释、声音身份、分镜选择、交付拓扑或后续依赖，但 selected variant 仍然适用时，沿用当前 binding 和 `plan_id`，按共享 Stage Execution Plan contract 原子更新受影响后缀。若用户改选 narrative、speech、on-camera 中的另一 driver，返回 Router 并创建带新 variant 的 Plan。
- 保留最后一个仍然有效且已接受的 Stage；只有该边界内的结论和 runtime refs 继续有效。未来 Stage 只保留在 `stage_outline`，当前或立即需要的 Stage 才写完整 contract。
- Replan 后从最早未解决的 `stage_outline` entry 继续，严格服从 selected variant profile 的实际顺序和 conditional nodes。`resume_stage_id` 只是 attention pointer；若指向 unauthored entry，只 author 这一 Stage，不能越过它或预写整个 suffix。

## Rules

- Planner 首次 author 时读 `<workflowsDir>/_shared/stage-execution-plan.md`；之后只在 selected variant profile 当前 Stage 点名时读 `<workflowsDir>/_shared/asset-pipeline.md`、`<workflowsDir>/_shared/audio-pipeline.md`、`<workflowsDir>/_shared/video-merge.md` 或 `<workflowsDir>/_shared/subtitle-pipeline.md`，并只加载 Decision Test 命中的 reference，不提前读取后续 Stage。
- 从最早仍有未满足依赖的 Stage 开始。已有脚本、分镜、anchors、音乐或编辑决定作为 sources/runtime refs 使用，不为形式完整而重建。
- `intent-brief` 按 selected variant profile 物化为一份制作简案：narrative 有因果链时写故事骨架、无因果链时写五字段画面简案；speech/on-camera 写五字段简案并加入各自逐字内容或表演事实。
- 需要生成的新真人写实 anchor 或清晰可见真人视频时，当前 Stage 必须读取 `directing/photoreal-skin.md` 并把规则编译进最终 prompt。
- Visual Gen 未指定视频模型时，在 Stage execution lock 中使用 `{ vendor: MiniMax, model_id: MiniMax-H3 }`，默认 `resolution: 2K`；用户明确指定模型或分辨率时遵循用户选择，但必须校验所选模型的合法规格，不得静默升级或降级。
- `continuity-first` 只决定 video work item 的分组；组内按动作或信息变化切镜，并在最终 prompt 中写明镜头顺序、切点和每镜功能。若 selected variant profile 路由到 MiniMax H3，prompt 还要显式写出每个镜头的景别/机位/角度变化；同一主体相邻镜头至少跨一个景别，且在需要贴脸或强化情绪/信息时优先使用近景/特写，同时相邻视角变化必须可感知，角度差保持在 30° 到 90° 之间。
- 每个 `visual-gen` work item 的最终 prompt 必须能从已确认的 storyboard / visual plan 回算 source range、顺序、目标时长、起止状态、组内 beat 或镜头切点、每段功能和对应声音窗口；只写概念场景或只挂 reference image 不视为可执行分镜。
- 字幕/画面文字是严格显式 opt-in：只有用户原话明确要求字幕或画面文字时，才能把它写入 Post、读取 `subtitle-pipeline.md` 或创建转写/格式化/烧录操作；“完整成片”、存在对白/VO、平台习惯或提升可看性都不是字幕证据。Post 默认保留或按计划混合 Visual Gen 原生音轨，不擅自移除 SFX/ambience。

## Anti-patterns

- 因未提供 voice/music asset、未要求 BGM 或省略 Audio Stage，把 Shot Plan / video prompts 写成静音。
- 在 `speech` 中让 Visual Gen 再生完整 VO，或把 post-only 整轨 VO 重复挂到每个 video item。
- 在主 workflow 重复 profile 的 Stage 顺序、reference 清单或 driver-specific 规则。
- 读取所有 toolkit 卡、从卡片示例新增 Stage/model lock，或要求 Executor 重新创作 prompt。
- 继续用 general-video 处理已确认的固定数字人按稿口播。
