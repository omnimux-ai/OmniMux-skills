# MV 音乐生成与实际成歌时间轴

## Stage-local 读取路由

- Stage 2 问询或已有音乐判断：`hub_read(offset=1, limit=95)`。
- Stage 2 取得回答后生成与本地定稿：`hub_read(offset=96, limit=123)`；同一 Planner session 复用前一切片的 Gate 答案。
- Stage 3 实际成歌反推与交接：`hub_read(offset=219, limit=84)`。
- 任一区段未覆盖到对应下一章标题时，只补读相邻最小切片；音乐分析属于 `production-plan` 的内部前置动作，不创建独立 Stage。

## 输入与剩余问询

先读取 intent Stage detail 的 `execution_excerpt`，验证内部 `intake_result.intake_gate.authority=mv_workflow_intent`、七项基础输入均在 `answered_card_ids`、`style_confirmation_source=mv_visual_style_card` 且 `status=pass`，再读取目标时长、音乐来源、角色—主唱锁、视觉类型、视觉风格、真实音乐 refs 和用户提供的歌词/音频。`answered_card_ids` 可以由用户显式输入与本次卡片回答共同满足；目标时长与音乐来源只继承这份内部 Intake capsule。画布方向稿只供用户审阅，不承担 Gate；Gate 不完整时返回 Stage 1 只补缺项，不重复询问已有证据的值。

来源为 `user_upload` 或 `video_extracted` 且已有一份明确主音乐时，跳过全部声音创作问询，直接登记/提取并分析真实音频；同时写 `music_gate_authority=mv_workflow_music_prep`、`music_gate_answered_card_ids=[]`、`music_gate_status=not_required_existing_main_song`，明确这是由 MV Stage 1 的有效来源选择触发，不是被工作流外答案跳过。不得要求用户重复上传，也不得询问可从成歌判断的曲风、语言或是否带歌词。用户选择上传但真实音频尚未到达时只等待文件，不创建占位路径，也不提前把 Gate 标成通过。多个已上传音频用途不明确时，才在一次 `question` 中使用 `mv_audio_roles`：“这些音频分别怎么使用？”；选项为“主音乐 / 风格参考 / 伴奏 / 人声 stem / 我来输入”，逐份登记用途且只允许一份最终 `main_song`。

来源为 `agent_generated` 时，只调用一次声音 `question`，把下列两张卡放在同一个 `questions` 数组，不得先问曲风、等待回复后再问歌词形式或语言。即使路由前已经问过曲风、是否有人声、歌词语言或类似问题，这两张 Stage 2 固定卡也必须在本次 MV 的 `music-prep` 中重新出现：

| card_id | 标题 | 固定题面 | 固定选项（按此顺序） |
|---|---|---|---|
| `mv_music_genre` | 音乐曲风 | 这支 MV 的主音乐使用哪种曲风？ | 根据当前内容与视觉风格编译的 2–3 个具体子风格 / 我来输入 |
| `mv_music_format` | 歌曲语言形式 | 这支 MV 的主音乐使用哪种歌曲语言形式？ | 带歌词（英文） / 带歌词（中文） / 纯音乐 / 用户输入语言 |

只有同一 `music-prep` 已取得本次 MV 固定卡回答、但因中断或 Stage 内修改而恢复时，才能按 `music_gate_answered_card_ids` 省略已回答整题；工作流外已有答案一律不能省略。两张卡完成后写 `music_gate_authority=mv_workflow_music_prep`、`music_gate_answered_card_ids=[mv_music_genre,mv_music_format]`、`music_gate_status=pass`。`mv_music_genre` 从本文件“五种视觉风格的曲风候选库”编译 2–3 个可听的具体子风格，第一项标记推荐。`mv_music_format` 固定映射：带歌词（英文）→ `mode=song, lyrics_language=English`；带歌词（中文）→ `mode=song, lyrics_language=Chinese`；纯音乐→ `mode=instrumental, lyrics_language=null`；用户输入语言→ `mode=song` 并使用用户在该回答中填写的具体语言。选择“用户输入语言”但没有填写语言时，只等待用户补充语言文本，不新增问询卡。`question` 的标题、题面、选项名和说明全部使用当前 `working_language`；内部生成 Prompt 使用准确语言与曲风术语。不得临时增减选项、另造同义卡或因为视觉媒介改变这四项。

## 音乐形式、歌词语言与主唱

- Agent 生成时，音乐形式和按需歌词语言必须来自本次 MV `music-prep` 的同一次 `mv_music_format` 回答，不能用路由前用户答案或旧摘要静默代选；结果与本次 `mv_music_genre` 一并写入当前 Stage 的生成参数。Gate 通过后，用户在同一 Stage 明确提出的修改是有效修订，直接 patch 当前合同，不重新弹卡。
- Agent 在内部按内容、具体曲风和目标时长写完整 `lyrics_seed` 供音乐模型生成。用户提供的完整歌词或必须保留句子优先进入种子；种子不物化为画布文档、不要求确认，也不能充当下游歌词真相源。
- `mode=vocal` 时，Planner 必须在同一次 author 中把带合法段落标签的完整 `lyrics_seed` 正文写入 `main_song_source.lyrics`，并写 `lyrics_source=planner_internal_seed`、`lyrics_review_policy=final_song_review_only`。Executor 直接执行 `mode=song` 且 `lyrics` 非空的任务，不重新暴露通用歌词确认门。只在 Prompt 中写“生成自然歌词”、只写主题或把歌词留给 Executor 都不算可执行；Stage Detail 中 `lyrics` 为空时由 Planner patch 当前 Stage，禁止向用户索要或确认歌词。
- “用户输入语言”可以接受日文、法文及其它明确语言；歌词使用自然、可唱的短句，不用机器直译腔。音乐模型可能改唱、漏唱或重组歌词，因此最终歌词必须从实际成歌反推。
- 同一演唱/表演角色已有用户明确性别呈现或脸部/人物参考时，主唱声线必须匹配 `female | male | androgynous | nonhuman`，只写一个具体方向。不得写“男女皆可”等歧义声线。
- 没有角色依据时，Agent 根据曲风和表演气质选择具体声线用于生成；实际成歌完成后，以听到的主唱呈现反向锁定 Stage 4 角色卡。用户明确歌手与画面角色分离时写 `singer_character_relation=separate`，不强制画面角色匹配。
- Agent 生成时把已有明确角色声线作为音乐 Prompt 的硬锁；用户接受最终成歌后，Stage 3 以实际听到的主唱呈现作为下游依据。上传歌曲同样以实际主唱呈现作为后续角色依据。

## 目标时长与结构

内部 Intake capsule 的 `target_duration_sec` 是期望中心值。最终主音乐允许在目标上下各浮动 5 秒；窗口内有自然结尾时优先使用，没有时直接按目标整数秒裁切并做短淡出。不因目标点仍在演唱、没有完整句尾或没有自然落点询问用户、重做歌曲或阻断流程。最终时间轴边界全部使用整数秒。

| 目标时长 | 推荐结构 | 编排重点 |
|---:|---|---|
| 30 秒 | Intro → Verse/Main → Hook → Outro | 2–4 秒内建立声音身份，只保留一个核心 Hook，结尾明确落板 |
| 45 秒 | Intro → Verse → Build → Chorus → Outro | 前段快速建立主题，后半进入完整副歌，只做一次主要高潮 |
| 60 秒 | Intro → Verse → Build → Chorus → Break → Final Hook → Outro | 两次有差异的 Hook，第二次增加和声、乐器或能量 |
| 120 秒 | Intro → Verse 1 → Pre → Chorus → Verse 2 → Bridge → Final Chorus → Outro | 才展开双主歌和桥段，每段承担新的语义或音乐功能 |
| 自定义 | 按最近档缩放 | 保留进入、发展、核心 Hook 和明确结尾，优先删重复段 |

带歌词时用合法段落标签控制歌词密度；纯音乐把相同结构写成 motif 建立、build、peak、release。`duration_plan` 同时记录中心值和 `accepted_duration_window_sec=[max(4,target-5), target+5]`；模型不能保证精确时长时通过结构和歌词量逼近，成歌后本地定稿，不伪造精确参数。

## 五种视觉风格的曲风候选库

这些候选用于编译曲风卡和音乐 Prompt，不覆盖用户输入。BPM 只指导生成，不冒充对最终音乐的测量。

### 炫酷剪纸拼贴风

| 候选 | 前奏、律动与配器 | 发展与声线 |
|---|---|---|
| K-hip-hop / trap-rap | 130–155 BPM 或半拍体感；干声短句、反向采样或短 synth motif 冷开场；punchy kick、clap/snare、滚动 hi-hat、深 808、distorted synth/brass stab | 主歌给 rap 留空间，Hook 加宽低频、问答 backing 和一次 beat switch；贴脸、自信、节奏清楚的 rap/sung-rap |
| Boom-bap zine | 82–98 BPM；滤过 Rhodes/吉他短 motif 先出现；厚 kick、脆 snare、温暖 bass、切片 keys/horn 与轻 lo-fi 颗粒 | 鼓与 bass 稳定，副歌换 stab 或 bass 变化；自然口气 rap，保留呼吸和尾韵 |
| Post-punk breakbeat | 105–138 BPM；干燥 bass 或棱角 guitar riff 直接进入；live drum 与 breakbeat、noisy synth、feedback/reverse hit | 主歌紧绷，副歌鼓组和吉他打开；spoken-sung、冷感吟唱或粗粝喊唱 |

### 可爱动画包装风

| 候选 | 前奏、律动与配器 | 发展与声线 |
|---|---|---|
| Bright electropop | 110–130 BPM；2–4 秒 signature pluck、bell 或 vocal-chop；圆润 synth bass、bright pluck、soft pad、mallet 与 sparkle FX | 主歌轻，Pre 逐层加 pad/hat，副歌打开 lead 与叠唱；轻盈但不幼儿化 |
| Bubblegum pop | 115–138 BPM；先抛一句 Hook 或极短 bell/synth 旋律；handclap、弹性 bass、糖果 synth 与少量 guitar | 尽早进入可跟唱副歌，后次副歌增加 harmony/counter melody；清楚甜亮的主唱 |
| Playful funk | 98–118 BPM；bass pickup、muted guitar 或 clap count-in；melodic bass、Rhodes/clav、shaker 与短 horn accent | 主歌靠 pocket 和留白，Hook 做乐器—人声问答；灵活俏皮、有律动的唱法 |

### 特效舞台表演风

| 候选 | 前奏、律动与配器 | 发展与声线 |
|---|---|---|
| Stadium performance pop | 105–128 BPM；vocal pickup、低频 pulse 或舞台入场 hit；hybrid drums、synth bass、wide pad、lead synth 与 brass/string hit | Verse 蓄力，Pre 收低频，Chorus/Drop 全频释放；有穿透力的主唱、叠唱与短 ad-lib |
| Industrial electro-pop | 90–125 BPM；金属敲击、machine pulse 或 distorted breath；distorted bass、metal percussion、dark synth 与机械纹理 | 疏密反差而非全程轰炸，副歌由重拍与低频接管；冷硬近讲或爆发型声线 |
| Cinematic electronic | 78–120 BPM；fragile piano、环境层或远距 vocal texture；deep sub、slow arp、hybrid percussion、strings/low brass | motif、和声、低频和打击乐共同增长后明确 landing；克制到释放的电影化声线 |

### 千禧复古年代风

| 候选 | 前奏、律动与配器 | 发展与声线 |
|---|---|---|
| Y2K R&B | 88–112 BPM；Rhodes、电钢或短 vocal pickup；swung kick/snare、简单 808、digital bell/strings 与少量 buzzy synth | 主歌松弛，副歌增加分层和声、counter line 和数字弦乐；顺滑亲密的主唱 |
| UK garage / 2-step | 128–136 BPM；percussion、短 chord stab 或 chopped vocal；切分 2-step、swung hi-hat、warm sub/FM bass | Pre 抽掉 kick，Chorus 恢复完整低频与 Hook；灵巧 R&B vocal 和切分短句 |
| Glossy Y2K dance-pop | 116–130 BPM；闪亮 synth riff、drum-machine fill 或短口号；909/707 感鼓组、glossy pad、piano-house stab 与 chrome lead | Pre 拉升，副歌四拍推进并扩大叠唱；明亮精致、有年代感但不过度失真 |

### 电影感叙事风

| 候选 | 前奏、律动与配器 | 发展与声线 |
|---|---|---|
| Cinematic ballad | 60–90 BPM；solo/felt piano、acoustic guitar 或近距离人声；warm bass、克制鼓组、strings/harp | 先薄后厚，转折后弦乐和鼓进入；高潮靠旋律与动态，主唱从亲密脆弱到坚定 |
| Art pop | 75–122 BPM；不寻常但简短的 vocal/piano/string/synth motif；processed percussion、quartet 与受控 ambience | 依靠音色、和声或重心变化推进，保留空白和一次意外转折；个性表达型声线 |
| Orchestral electronic | 78–120 BPM；单音 piano/pad、低弦或远距 texture；strings、low brass、sub pulse、arp 与 hybrid percussion | 电子负责脉冲，管弦负责情绪动态；逐层增长、高潮后回到主题 motif |
| Narrative rock | 82–145 BPM；guitar riff 或 piano motif；live drums、bass、guitar、piano/organ 和按需 strings/synth | Verse 收窄、Chorus 全乐队打开，Bridge 改和声或动态，Final Chorus 回收人物主题 |

视觉类型修正：日式 2D 动漫可把 Anison J-pop、J-rock 或 anime electropop 加入候选，但仍叠加当前五种视觉风格；UE 影视级 3D 可提高 cinematic electronic/industrial 的排序；写实真人可提高 live band、R&B 或电影化声线排序。法文方向可选 French electropop、modern chanson électronique 或 French nu-disco。不要把 3D 动漫写成可爱儿童音乐。

## 音乐 Prompt 与直接生成

内部建立 `music_prompt_profile`：

```yaml
music_prompt_profile:
  genre: "具体主子风格 + 可选辅助风格"
  mood_arc: "起点 → build → peak → ending"
  bpm_target: 124
  groove: "鼓组、重拍、swing/切分方式"
  intro: "最先听到的 motif/人声/乐器和进入方式"
  core_instruments: ["鼓与 bass", "2–5 个主乐器或音色"]
  vocals: { language: English, performer_voice_lock: female, range_timbre: "一个具体声线", delivery: "", backing: "" }
  structure_energy: "各段增加或抽掉什么，Hook/Drop 如何到达"
  ending: "明确收束、突然落板或自然余韵"
  ending_safety: "尽量让最后一句完整歌词在整数终点前留出短而完整的自然尾奏；最后 4 秒不开始新的歌词句或新一轮 Hook，只做尾句落音、终止和声、乐器 cadence 与自然余韵"
```

Prompt 顺序固定为：具体曲风/年代 → 情绪弧 → BPM/律动 → 前奏 → 鼓与 bass → 主乐器/音色 → 声线、唱法与语言 → 段落能量 → 结尾与安全尾段。Agent 生成 30 秒以上歌曲时，要求最后一句完整歌词在预期整数终点前留出短而完整的自然尾奏，最后 4 秒不开始新歌词句或新一轮 Hook，只保留尾句落音、终止和声、乐器 cadence 与自然余韵。该余量只用于提高成歌命中率，不成为本地裁切门槛；未命中自然结尾时仍按目标整数秒裁切并淡出。只写可听信息，不写画面、字体、镜头、插件、艺人名、歌曲名或版权旋律。参考歌曲只转译曲风、律动、配器、声线和结构规律。

Agent 生成创建稳定来源 item `main_song_source`。带歌词默认用可接收完整歌词的音乐模型，并把内部 `lyrics_seed` 全文写入合法歌词字段；纯音乐使用合法 instrumental 路线。Stage 2 的一次声音问询完成后直接 author，不写 `review.before_execution`，不展示歌词草稿让用户审批。内部歌词是本 Workflow 已授权的生成参数，不是待用户选择；Executor 直接执行带非空 `lyrics` 的 work item，不得把通用歌词确认门重新暴露给用户。

```yaml
id: main_song_source
modality: audio.music
source: { target_duration_sec: 40 }
render: { duration_target_s: 40 }
mode: song | instrumental
prompt: "由 music_prompt_profile 编译的最终英文 Prompt"
lyrics: "[Verse] 完整内部歌词正文\n[Chorus] 完整内部 Hook；纯音乐省略整个字段"
lyrics_source: planner_internal_seed
lyrics_review_policy: final_song_review_only
```

### `music-prep` 初始执行合同

Planner 子任务中的“不要执行媒体生成”“只 author 当前 Stage”只约束 Planner 本人：Planner 只负责编写合同，不亲自调用媒体生成工具。这类临时派工说明不得写入 `constraints`、`execution_locks`、`review`、`stage_fields` 或 `work_items`，也不得限制后续 Executor。`music-prep` 的持久合同必须明确允许 Executor 生成/登记来源并完成本地整数秒定稿。

首次 author 或修复 `music-prep` 时，一次写入以下两个完整 object work items，并保持此顺序：

1. `main_song_source`：Agent 生成时使用 `modality=audio.music` 和上方完整 Prompt/歌词字段；用户上传或视频提取时使用真实来源登记/提取操作。它只负责取得真实来源音频。
2. `main_song`：使用 `modality=postprocess`，`refs=[main_song_source]`，并按“本地整数秒定稿”的完整 `hub_ffmpeg` 合同输出最终音频。它不能只写在 `constraints`、Goal 或自然语言说明中。

`stage_fields.execution_policy` 必须包含 `serial` 或 `sequential` 语义，例如 `serial_music_generation_then_integer_finalize`，使 `main_song` 合法消费同 Stage 先产生的 `main_song_source`。两个 `work_items` 必须始终是对象；计划校验失败时 patch 当前 Stage 的完整对象和串行策略，不能把补充任务作为字符串传入，也不能删除 `main_song` 来绕过校验。`music-prep` 只声明这两个 Executor media work items，`completion_requires=main_song`；不得把 Planner 物化的歌词时间轴伪装成第三个 Executor work item。

同一份 Stage 必须把下列标量写入真实 `stage_fields`，不得只放在 Goal、`constraints` 或展示文案中：

```yaml
stage_fields:
  execution_policy: serial_music_generation_then_integer_finalize
  music_selection_authority: current_music_stage
  music_gate_authority: mv_workflow_music_prep
  music_gate_answered_card_ids: [mv_music_genre, mv_music_format]
  music_gate_status: pass
  forbidden_audio_analysis_tool: hub_audio_analyze_music
```

- 带歌词的 `main_song_source` 必须逐值携带 `mode=song`、非空 `lyrics`、`lyrics_source` 和 `lyrics_review_policy`；任一字段缺失时由 Planner patch 同一 work item，不转成用户歌词确认。
- `main_song` 必须逐值携带 `endpoint_selection_tool=hub_analyse_media`、`endpoint_selection=direct_listening_required`、`forbidden_tool=hub_audio_analyze_music` 和 `completion_evidence=endpoint_decision_and_final_five_seconds_audit`；即使 Executor 能看到被禁用工具，也不得把它、Python/librosa、BPM、`beat_times` 或能量曲线作为定稿依据。

### 当前音乐选择覆盖旧状态

`mv_music_format` 在当前 `music-prep` 中解析出的 `mode` 和 `lyrics_language` 是唯一当前权威。用户把纯音乐改为带歌词，或把带歌词改为纯音乐时，Planner 在同一 `music-prep` Stage 内重写 `main_song_source` 和 `main_song` 的当前合同；较早 `intake_result.music_form`、旧 Prompt/歌词字段、旧纯音乐/带歌词 runtime ref 与聊天摘要都无权反向覆盖。被替换结果只进入 `superseded_runtime_refs`，不标成当前失败项、不新建 `music-prep-v2` 或 repair Stage，也不继续传给 Stage 3–7。

派发 Executor 时，从最近一次成功的 `hub_plan_create`、`hub_plan_patch_stage` 或 `hub_plan_get_stage_status` 结果逐字符复用 `plan_id`、当前 `stage_id` 和 `order`，不得手工改写、缩短或从聊天摘要重建。首次执行或整张合同修复后省略 `retry_ids`；只有重试计划中真实存在且其全部依赖仍有当前 runtime ref 的失败 work item，才传对应的稳定 id。恢复执行先核对当前结果：已有 `main_song_source` runtime ref 时只补试听、裁剪和末尾复听；项目已有真实来源文件但 ref 丢失时先把该文件重新登记为当前 `main_song_source`；来源文件与 ref 都不存在时省略 `retry_ids`，从 `main_song_source → main_song` 完整执行，禁止单独重试依赖缺失的 `main_song`。

### 音乐定稿到制作计划的自动交接

1. Author `music-prep` 时只写 `main_song_source → main_song`；`review.after_execution` 只让用户试听并判断最终成歌是否可用，不声称歌词时间轴已经完成。
2. 用户确认成歌后 author 既有 `production-plan`；在同一次 author 中先试听这份已确认 `main_song`、物化/覆盖唯一 `main_song_lyrics_timeline` 并补齐 `audio_decision`、`music_analysis`、`music_match`，随后立即写 `production_plan`。
3. 把上述反推作为 `production-plan` 的无问询前置动作；不要表述为“缺少音乐分析/歌词时间轴”，不要新增 Stage、卡片、确认或 Executor 派单。
4. 写出逐句时间轴后再完成 `production_plan`；只有真实音频无法读取时才记录 `blocking_issue=unreadable_audio`。

## 用户上传与来源统一

收到音频后登记真实路径，不凭文件名编造速度、段落或时长。上传音频使用 `register_existing_audio`；从用户视频取音乐使用 `extract_audio`；都产出稳定 id `main_song_source`。风格参考音乐只用于曲风、律动和结构，不进入最终时间线。上传源未到达前保持本 Stage 未完成，不创建占位路径。

三条来源路径统一后，下游只允许消费最终 `main_song`，不得改用来源 id、聊天旧路径或歌词种子。

## 本地整数秒定稿

取得真实 `main_song_source` 后，由同一个 Executor turn 连续完成试听、整数终点选择、本地裁剪和末尾复听；这是自动定稿，不得退回 Planner 或向用户追问裁切方式：

1. 直接试听目标附近至少 8 秒，不调用 `hub_audio_analyze_music`、Python 节拍检测或测量型 BPM 工具。目标 ±5 秒窗口内如果有完整句尾、段落收束、重拍落板或自然余韵，选其后最近的整数秒边界。
2. 窗口内没有自然节点、目标点仍在演唱或歌曲继续发展时，不再评估是否重做；只要源时长足够，直接使用 `target_duration_sec` 作为整数终点。
3. Agent 生成且开头有效时从 0 秒开始；上传长歌可从非 0 秒的完整段落入口开始。命中自然结尾并且本身已有清楚 hard stop 或自然衰减时不叠加淡出；直接按目标裁切时，在终点前做 0.8–1.5 秒 equal-power 短淡出，包括终点处仍有演唱的情况。
4. 使用 `hub_ffmpeg` 裁剪为稳定 id `main_song`，时间原点重置为 `00:00`。`-ss` 和 `-t` 只使用整数；fade 的开始点与时长可以使用小数，但最终文件时长仍为整数。不得变速、改调、循环、补静音或用画面尾帧掩盖音乐断句。
5. 裁剪后再次直接试听最后 5 秒并读取 metadata，只确认“淡出平滑、末尾无突兀 click、物理时长为整数”。不平滑时只用同一来源调整淡出，不重新生成音乐、不触发 Planner 修订。
6. 只有源时长短于允许窗口下界、无法裁出足够时长时才视为时长不足；Agent 生成源自动补生成一次，上传源则用简单说明告知用户。

```yaml
id: main_song
modality: postprocess
operation: trim_audio_to_integer_timeline
tool: hub_ffmpeg
ordered_input_refs: [main_song_source]
depends_on: [main_song_source]
render: { target_duration_sec: 40, accepted_duration_window_sec: [35, 45], endpoint_selection: direct_listening_required, source_use_range_sec: pending, final_duration_sec: pending, time_origin_sec: 0, output_role: main_song }
endpoint_selection_tool: hub_analyse_media
forbidden_tool: hub_audio_analyze_music
completion_evidence: endpoint_decision_and_final_five_seconds_audit
```

Author `music-prep` 时只预填 `target_duration_sec` 和 `accepted_duration_window_sec`，不得在真实来源生成/到达前把 `source_use_range_sec`、`final_duration_sec` 或 fade 时间写死。Executor 试听后在结果中登记：

```yaml
endpoint_decision:
  source_use_range_sec: [0, 40]
  final_duration_sec: 40
  last_complete_lyric_end_sec: 38.6 | null
  musical_landing: "自然落点描述" | "target_cut_with_fade"
  ending_mode: natural_tail | intentional_hard_stop | short_equal_power_fade
  fade: { start_sec: 38.8, duration_sec: 1.2 } | null
  direct_listening_gate: pass
  final_five_seconds_audit: pass
```

上述数值只是格式示例，必须来自当前真实音频。命中自然结尾时记录实际选中的整数终点；未命中时记录目标整数终点和短淡出。随后把决定写回 `main_song` runtime 结果和 `audio_decision`。

### `audio_decision` 交接结构

内部 `audio_decision.duration_authority` 是下游唯一总时长来源。它写入 `production-plan` Stage 的 `execution_excerpt`，画布时间轴和制作计划只用“最终时长、使用范围、整数边界”等直观中文显示同一结果，不展示结构化字段。歌曲段落、Hook 结束点、metadata 小数和聊天摘要都不得覆盖它。

```yaml
audio_decision:
  source: user_upload | agent_generated | video_extracted
  main_song_source_id: main_song_source
  main_song_id: main_song
  main_song_path: "最终文件真实路径"
  duration: { target_duration_sec: 40, accepted_duration_window_sec: [35, 45], source_use_range_sec: [0, 40], final_duration_sec: 40, time_origin_sec: 0 }
  duration_authority: { main_song_id: main_song, final_duration_sec: 40, music_use_range: [0, 40], boundary_unit: integer_seconds }
  endpoint_decision: { last_complete_lyric_end_sec: 38.6 | null, musical_landing: "自然落点描述" | "target_cut_with_fade", ending_mode: natural_tail | intentional_hard_stop | short_equal_power_fade, fade: { start_sec: 38.8, duration_sec: 1.2 } | null, direct_listening_gate: pass, final_five_seconds_audit: pass }
  genre_profile: { selected_subgenre: "用户已选具体曲风", visual_style_basis: "当前 MV 风格", intro_identity: "", core_instruments: [], hook_strategy: "" }
  music_mode: vocal | instrumental
  lyrics_language: "用户确认的生成语言" | null
  lyrics_seed_scope: generation_only_not_timing_authority
  performer_voice_lock: female | male | androgynous | nonhuman | not_applicable
  performer_voice_lock_source: user_specified | character_reference | music_design | uploaded_audio | not_applicable
  singer_character_relation: same_performer | separate | not_applicable
  music_prompt_profile: { genre: "", mood_arc: "", bpm_target: 118, groove: "", intro: "", core_instruments: [], vocals: {}, structure_energy: "", ending: "" }
```

## 实际成歌反推与唯一时间轴

用户确认本地定稿的 `main_song`、Planner author `production-plan` 时，先对这份 `main_song` 调用一次 `hub_analyse_media(type="both", file_path=<main_song 真实路径>, question="只根据这份最终音频试听实际歌词/语言/主唱、段落、快慢与律动感、主要鼓/bass/乐器、能量变化、Hook、呼吸/停顿和结尾。按最终整数总时长输出逐句 cue：每一句实际唱出的完整歌词必须单独一条，给出准确的整数 start_sec/end_sec；禁止把两句以上歌词、整段 Verse 或 0–11 秒内的多句歌词合并成一个时间窗。器乐、呼吸和无歌词间隙也单独覆盖；从 00:00 连续到结尾，不重叠、不留空。不要推测测量型 BPM、逐拍点或小数秒。")`。同一路径的音频被重新生成或重新裁剪后才传 `force=true`，否则省略 `force`。`metadata` 只确认文件可读与物理时长，`semantic` 直接试听实际成歌；语义描述里的估算时长不得覆盖 `audio_decision.duration_authority.final_duration_sec`。不得分析 `main_song_source`、音乐 Prompt、`lyrics_seed` 或风格参考音乐；不得另派音乐分析/歌词转录 work item，也不得创建第二个用户可见 Stage。

不得调用 `hub_audio_analyze_music`，不得生成测量型 BPM、逐拍点或能量曲线。分镜所需节奏依据只记录直接听到的快慢、律动/重拍感、段落变化、歌词、呼吸、Hook 和整数秒窗口。`hub_analyse_media` 调用失败时保留已定稿的 `main_song`，保持本 Stage 未完成并记录 `blocking_issue=unreadable_audio`；不自动改用其它分析工具，不重复生成音乐，也不得在缺少真实 `main_song_lyrics_timeline` 时放行下游。

1. 从这一次 `semantic` 结果提取实际歌词、语言、主唱声线、段落、快慢与律动感、主要鼓/bass/乐器、能量变化、Hook、呼吸/停顿和结尾。媒体能力只读取同一文件，不把插件错误、仪器参数或置信度技术细节展示给用户。
2. 最终歌词以实际唱出的内容为准。`lyrics_seed` 只帮助辨认，不能覆盖真实成歌；听不清的词写 `[听不清]` 或标低置信度，不能用种子补成确定歌词。
3. 一句实际演唱的完整歌词就是一个 `cue_id` 和一行。每行歌词单元格只能有这一句及其紧邻 ad-lib，禁止用换行、斜杠或长段落塞入第二句；INTRO、VERSE、CHORUS 等段落范围只能写在“段落”列，不能代替逐句时间。
4. 每句写准确的整数 `start_sec/end_sec`。相邻主句以前一句结束秒作为后一句开始秒；短于 1 秒的吸气、连音或 ad-lib 并入相邻主句并注明“该秒内先/后发生”，不制造 0.x 秒时间码，也不把十几秒内容粗略归成一行。
5. 从 `00:00` 到 `final_duration_sec` 连续覆盖：无人声区单独写“纯器乐/呼吸/停顿”，所有行不重叠、不留空，最后一行严格结束于最终整数时长。每行同时写演唱者、重读词、呼吸/停顿、快慢、强弱、可听重拍感和可驱动的视觉响应。
6. 写文档前做同一 author pass 内的结构检查：任一歌词格含两句完整歌词、任一歌词行超过 6 秒却不是持续长音、第一行不从 `00:00` 开始、行间不连续或末行未到最终时长，都先按本次试听结果拆行/修正再物化，不新增工具调用、Stage 或用户确认。
7. 识别实际主唱为 `female | male | androgynous | nonhuman | mixed | unclear | instrumental`。无先验角色时用该结果锁定后续角色；用户已接受的 Agent 成歌或上传歌曲都按实际主唱对齐后续角色，不能继续沿用与成歌不符的推测声线。

物化或覆盖唯一稳定 document node `main_song_lyrics_timeline`，用户可见标题固定为“最终主音乐歌词与节奏时间轴”。文档开头说明“供分镜、口型和动态大字对齐，时间从最终音乐 00:00 重新计算”。同一项目只保留一份 Agent 当前文档；音乐被替换或重新裁剪时覆盖原节点正文，不追加第二份。用户上传的原始歌词文件保持只读。

文档结构固定沿用 Y2K 完整项目的有效格式，但把段落级歌词升级为逐句时间窗：

结构依次为：`## 音频依据`（最终音乐、整数时长、时间范围、形式、实际主唱、律动和听写置信度）；`## 连续逐句整数秒时间轴`（表头逐字为 `时间 | 段落 | 逐句歌词/器乐 | 主唱 | 快慢与能量 | 重读词 / Hook | 呼吸、停顿与可听重拍感`，从 `00:00` 连续覆盖到最终整数时长）；`## 音乐分析结论`（用自然语言汇总歌曲结构、能量、口型粒度和适配结论）。禁止出现内部 cue id、字段路径、JSON/YAML 或“00:00–00:11 一行包含多句歌词”之类段落级合并。

它不是孤立歌词附件，而是 Stage 3 制作计划、Stage 5 分镜、Stage 6 H3 音乐切片与口型共同使用的唯一音乐依据。

以下 document 绑定、逐句 cue id、音乐分析和匹配结构只写入 `production-plan` Stage 的 `execution_excerpt`，不得复制到“最终主音乐歌词与节奏时间轴”画布正文：

```yaml
id: main_song_lyrics_timeline
modality: document
document_node_id: "真实节点 ID"
source: { main_song_id: main_song, audio_path: "最终文件真实路径", final_duration_sec: 40, time_origin_sec: 0 }
contains: [actual_lyrics, song_structure, key_moments, lyric_timeline, sync_timeline, audible_profile]
```

```yaml
music_analysis:
  main_song_id: main_song
  main_song_path: "与 audio_decision 一致的最终文件路径"
  timing: { total_duration_sec: 40, time_origin_sec: 0, timing_unit_sec: 1 }
  is_instrumental: false
  tempo_feel: slow | medium | fast | changing
  pulse_and_groove: "可听重拍、切分、推进或松弛关系"
  song_structure: [{ section: INTRO, start_sec: 0, end_sec: 5, energy_level: 1, audible_summary: "" }]
  key_moments: [{ time_sec: 18, type: SECTION_CHANGE | ENERGY_SHIFT | INSTRUMENTAL_HIT | LYRIC_HOOK | BREATH, priority: P0 | P1 | P2, description: "可听事件" }]
  lyric_timeline: [{ cue_id: L01, start_sec: 5, end_sec: 9, text: "只含一句实际唱出的歌词", vocal_role: lead, stressed_words: [], confidence: high | medium | low }]
  sync_timeline: [{ cue_id: L01, start_sec: 5, end_sec: 9, section: VERSE, audible_state: "", lyric_text: "与同 cue_id 的单句歌词逐字一致", rhythm_energy_breath: "", confidence: high | medium | low }]
  lyrics_language: "实际听到的语言" | null
  audible_profile: { lead_vocal_presentation: female | male | androgynous | nonhuman | mixed | unclear | instrumental, vocal_delivery: "", hook_peak: "", ending: "" }
  lyrics_timeline_node_id: "真实节点 ID"
  analysis_mode: semantic_listening

music_match:
  duration_fit: within_window | source_too_short | invalid
  final_duration_sec: 40
  performer_voice_consistency: match | aligned_to_actual | separate | not_applicable | unclear
  timing_authority: main_song_lyrics_timeline
  blocking_issue: null | unreadable_audio | performer_voice_unresolved
```

## 制作计划前自动交接

`music-prep.review.after_execution` 只展示可试听的最终 `main_song`、目标与最终整数时长和已选音乐方向；用户只需判断这首成歌整体是否可用，不重复询问曲风、音乐形式、语言或歌词正文。

用户确认后，Planner 在 `production-plan` 同一次 author 中先物化逐句 `main_song_lyrics_timeline` 与音乐结论，再基于它写制作计划；不新增“音乐分析确认”。用户此时要求调整歌词或音乐，才回到 `music-prep` 修改内部种子并重新生成/裁剪，随后覆盖相同时间轴 id 与文档节点并 patch Stage 3–6 受影响内容；不得把这次成歌后的修改权变成生成前确认门。

## 反模式

- 生成歌曲前物化或确认歌词草稿，或把内部 `lyrics_seed` 当成实际成歌歌词。
- `mode=vocal` 的 `main_song_source` 只有“自动生成歌词”描述而没有非空 `lyrics` 正文，或因该字段缺失转而要求用户先写词、看词或确认歌词。
- 把只约束 Planner 本人的“不要执行媒体生成”持久化为 Stage 约束，导致 Executor 无法执行 `main_song_source` 或 `main_song`。
- 初始合同只有 `main_song_source`，把 `main_song` 仅写进 Goal/约束，或校验失败时用字符串补任务、删除任务、编造 `retry_ids`。
- 派单时手工重写或截短 Plan 工具返回的 `plan_id`，再把“计划未找到”误判为原计划丢失或要求用户重做 Intake。
- 使用路由前曲风、音乐形式、歌词语言、全局 `question` 回答或旧聊天摘要跳过本次 MV Stage 2 的 `mv_music_genre` / `mv_music_format`。
- 把实际成歌反推叫作“缺少依赖”或独立 repair 工作，插入 `music-understanding-repair` / `music-analysis` / `lyrics-timeline` Stage，或增加第二个确认节点/画布文档。
- 需要 Agent 生成时把曲风、音乐形式和歌词语言拆成多轮问询，或这些选项确认后继续要求用户确认歌词正文。
- 未完成整数秒定稿就写歌词时间轴、制作计划或分镜；更换音乐后继续沿用旧时间轴。
- 只凭 Prompt、歌词种子或文件名编造段落、歌词和卡点，伪造 0.x 秒逐字时间码，或把多句歌词合并进一个长达十几秒的段落级时间窗。
- 把插件错误、技术参数、曲风偏差或声线内部修正展示给用户。
- 源时长足够时，因目标点仍在演唱、没有完整句尾或缺少自然落点而弹出处理选择、退回 Planner 或重新生成音乐，没有直接按目标整数秒裁切并短淡出。
- 把生成 Prompt 中期望的尾奏余量当成本地定稿硬门，因零点几秒差异拒绝可用的整数终点。
- 同一表演者路线主唱与明确角色不一致仍放行，或让用户在角色确认前处理内部音色冲突。
