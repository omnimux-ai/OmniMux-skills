# MV Stage 1 / 3 — 创意方向与制作计划

## Stage-local 读取路由

- Stage 1 首次问询：`hub_read(offset=1, limit=50)`，读取显式输入复用与固定卡合同后立即询问。
- Stage 1 本次问询完成后：`hub_read(offset=51, limit=177)`，只写创意方向文档、内部 Intake capsule 与合法扁平 Plan。
- Stage 3：`hub_read(offset=229, limit=78)`，只写用户可读制作计划与内部 Production capsule。
- 任一区段未覆盖到对应下一章标题时，只补读相邻最小切片；不得改为整本读取，也不得在 Stage 1 提前物化制作计划。

## Stage 1 — 确定 MV 方向

### MV Workflow 内答案权威

首次 author `intent` 时，先区分“真实素材”与“问询答案”：

- 用户消息中的附件、URL、画布节点、梗概、剧本、分镜、图片、视频和音频是真实输入，必须保留并登记；进入 MV 后不要求用户重复上传或重复粘贴。
- 用户在进入 MV 前的原始消息、真实附件和明确选择是有效输入；普通聊天归纳、Router capsule、Planner 初始 prompt、`active_project_locks` 或其它摘要不能替代原始证据。只有能从用户原文或真实素材直接得到具体值的项目才能省略对应卡，含糊线索只用于推荐。
- 明确梗概/剧本/分镜可解决 `mv_content_source`；已上传或明确指定的主音乐可解决 `mv_music_source`；已上传角色图、参考图或参考视频可解决 `mv_reference_source`；明确的 2D/3D/真人、具体时长和具体画幅分别解决 `mv_visual_medium`、`mv_duration`、`mv_aspect_ratio`。角色图只解决参考素材与角色呈现，不自动决定 2D、3D 或真人媒介。
- `mv_visual_style` 永远不能被预填或省略：即使用户原文、素材或路由摘要已经出现 Y2K、拼贴、可爱、舞台或电影感等风格词，本次 MV Intake 仍必须显示视觉风格卡；已有风格词只决定推荐标记。
- 显式输入解决的项目与本次卡片回答共同写入 `answered_card_ids`；七项全部有具体值、且 `mv_visual_style` 确由本次风格卡确认后，才写 `intake_gate.authority=mv_workflow_intent` 和 `status=pass`。Gate 只用于内部恢复和去重，不显示在方向稿，也不重复追问已解决项目。

内容可以是概念、情绪、表演、歌词画面或故事，不强制把纯概念/表演硬改成剧情。`content_form` 与视觉类型、视觉风格分开判断：内容先独立成立，视觉风格后叠加；同一个完整爱情故事换成拼贴、Y2K、舞台或电影摄影后，人物目标、事件因果、地点功能和结局都不应改变。

### Questions

首次进入 `intent` 时只调用一次 Intake `question`：数组中始终包含 `mv_visual_style`，再加入没有被用户原文或真实附件解决的基础卡；不显示已经有具体答案的时长、画幅、内容、音乐、参考素材或视觉类型。Stage 1 不询问曲风、是否带歌词或歌词语言；这些声音创作选项只在 Stage 2 需要 Agent 生成音乐时一次性询问。用户选择上传后立即等待真实内容或素材；只有真实文件到达后才能判断的参考视频用途、视觉参考范围或自定义文本允许补一次合并问询。

首次问询只读取本文件开头的固定卡合同并立即调用 `question`；用户回答前不读取本文件的创意写法、Stage 3 章节或 `_shared/stage-execution-plan.md`。回答后再读取 Stage 1 剩余区段，物化方向文档并写 Plan。

七项基础输入全部解决并写入 `intent.execution_excerpt` 的 Intake capsule 后，本 Stage 才完成。后续方向稿只展示用户能理解的选择结果和创意方向，不通过 `question`、普通聊天问题、示例回复或同义清单重复收集，也不追加字幕、平台规格或“MV 类型”问询。恢复中的同一 `intent` 若 Gate 尚未通过，只补问 `answered_card_ids` 中确实缺失的项目；风格已由本次卡片确认则不再重复。

#### 固定问询卡合同

MV 内部 Stage 1 只使用下表卡片。`card_id`、标题、题面、选项名称和排列顺序固定；根据显式输入省略已解决卡，并把所有未解决卡与必问的 `mv_visual_style` 放进同一次 `question`。可以在既有选项上标记“推荐”，不能临时改写、增加同义选项或换成平台/风格专属题；需要自定义时只使用表内“我来输入”。

进入 MV workflow 后直接显示本次仍需确认的基础卡；不得增加“成片类型”“MV 规格”“制作信息”卡，也不得用临时分类替代表内卡片。只有用户原文或真实附件支持的具体值可以直接采用；宽泛范围、模型推断和摘要不能替用户选择。视觉风格卡始终显示。

| card_id | 标题 | 固定题面 | 固定选项（按此顺序） |
|---|---|---|---|
| `mv_content_source` | MV 内容 | 这支 MV 的内容或梗概怎么准备？ | Agent 为我构思 / 稍后上传详细剧本或分镜 / 我来输入 |
| `mv_music_source` | 音乐素材 | 这支 MV 是否已有主音乐？ | 我有音乐，稍后上传 / Agent 为我生成 |
| `mv_reference_source` | 参考素材 | 这支 MV 是否有参考图或参考视频？ | Agent 原创 / 我来上传 |
| `mv_video_usage` | 参考视频用途 | 这段参考视频怎么使用？ | 视觉参考 / 提取其中音乐 / 视觉和音乐都参考 |
| `mv_visual_reference_scope` | 视觉参考范围 | 这些视觉参考主要参考哪些方面？ | 综合参考 / 人物或场景 / 风格与包装 / 动作与运镜 / 剪辑节奏 / 我来输入 |
| `mv_visual_medium` | 视觉类型 | 这支 MV 使用哪种视觉类型？ | 2D 动漫 / 3D 动画 / 写实真人 |
| `mv_visual_style` | 视觉风格 | 这支 MV 使用哪种视觉风格？ | 炫酷剪纸拼贴风 / 可爱动画包装风 / 特效舞台表演风 / 千禧复古年代风 / 电影感叙事风 |
| `mv_duration` | 成片时长 | 这支 MV 的成片时长是多少？ | 30 秒 / 45 秒 / 1 分钟 / 2 分钟 / 我来输入 |
| `mv_aspect_ratio` | 成片画幅 | 这支 MV 使用哪种画幅？ | 16:9 / 21:9 / 4:3 / 9:16 / 3:4 |

推荐只改变“推荐”标记，不改变题面、选项名称或顺序；电影感叙事风始终位于风格卡最后。不得把时长改写成“15–30 秒 / 1–2 分钟”等区间，不得根据发布平台替换画幅选项，也不得新增“未来感方向”等与既有风格卡重复的前置题。

**内容来源。** 用户已经给出可执行梗概、剧本、分镜或明确要求 Agent 构思时，直接写对应 `user_input | user_upload | agent_draft` 并省略本卡；只有“爱情、青春、自由、炫酷、复古”等主题/情绪/风格词时仍需询问。上传/输入后等待或登记真实内容，不提前写镜头或秒点。

上传恢复后登记真实 `source_refs`，提炼不改写原意的 `creative_core`；不得用占位内容继续。用户提供完整剧本/分镜时保留其人物关系、事件结果和表达顺序，只做方向级摘要。

**音乐素材来源。** 已上传或明确指定一份主音乐时直接写 `source=user_upload` 并登记真实 `music_input_refs`，省略本卡；用户明确要求 Agent 作曲时直接写 `source=agent_generated`。只有音乐来源不明确时才显示本卡；参考视频是否提取音乐不明确时使用 `mv_video_usage`。Stage 1 不据此推断曲风、音乐形式或歌词语言。

**参考素材来源。** 已上传角色图、参考图或参考视频时直接写 `references.source=user_upload`、登记真实素材并省略本卡；用户明确要求完全原创时写 `agent_original`。只有是否使用参考素材不明确时才显示本卡。

收到素材后逐份保留真实 `ref_id`、`node_id` 或 `path`。一份素材可以贡献多个方面：人物身份、服装妆发、场景空间、色彩材质、构图光影、动作运镜、剪辑节奏或字体版式。用户已说明用途时直接采用；视频用途不明时使用 `mv_video_usage`，视觉和音乐都参考时同时登记到 `references.items` 与 `music_input_refs`。视觉参考的具体范围仍会产生多个明显不同结果时才使用 `mv_visual_reference_scope`；不询问媒体分析可以识别的可见事实。

#### 视觉类型、风格、时长

首次 MV Intake 只收集未解决项目，并始终收集视觉风格。用户已明确视觉类型、具体时长或具体画幅时直接采用；恢复中的同一 `intent` 只补问确实缺失的项目。风格原文与素材证据只用于推荐，不能省略风格卡。

- 视觉类型根据内容和 refs 推荐；电影感不是独立视觉类型：
  - **2D 动漫**：日式手绘动画/赛璐璐体系，清楚线稿、稳定上色和二维运动。
  - **3D 动画**：Unreal Engine / UE 影视级实时 CG，成熟人物与世界、PBR 材质和电影级光照空间；不默认儿童卡通或软萌玩具造型。
  - **写实真人**：真实人物电影摄影，真实皮肤/毛发/服装材质，大光圈、浅景深和适度柔光扩散。
- 风格：炫酷剪纸拼贴风 / 可爱动画包装风 / 特效舞台表演风 / 千禧复古年代风 / 电影感叙事风。根据内容、主体和 refs 从前四项推荐；电影感叙事风固定最后且不主动推荐。无证据时推荐炫酷剪纸拼贴风。
- 时长：30 秒 / 45 秒 / 1 分钟 / 2 分钟 / 我来输入。简单概念、测试或单一表演推荐 30 秒；有明显段落可推荐 45 秒或 1 分钟；长版需求或内容体量充分时推荐 2 分钟。自定义必须取得具体时长。

- 画幅未明确时与风格同批询问；用户已经给出具体画幅则直接采用。电影感叙事推荐 21:9，千禧复古年代推荐 4:3，其它风格推荐 16:9；风格无论是否已在原文出现都由本次风格卡确认。

### 创意方向稿

Agent 构思或提炼用户内容时，先判定 `direction_mode=narrative_story|visual_aesthetic`，再判定主 `content_form`。只有用户输入/素材已经包含角色、事件和因果链，或用户选择 `cinematic_narrative` 且没有否定故事时，使用 `narrative_story`；其它四种风格在用户没有提供故事时默认 `visual_aesthetic`。用户已经提供故事时，任何风格都可承载同一故事，不能因选择拼贴/Y2K/可爱/舞台而删除故事。用户明确说“视觉为主、故事不要强、弱叙事、氛围、展示、实验或表演”时，必须使用 `visual_aesthetic`，不得把抽象主题、歌词隐喻或风格机制扩写成人物剧情。

`narrative_story` 的主 `content_form` 为 `narrative` 或 narrative-led `hybrid`；`visual_aesthetic` 的主形态为 `concept` / `performance` / `lyric_visual` 或其中的 `hybrid`。2D、3D、写实是真实媒介，不作为内容形态，也不新增固定问卷。

`creative_core` 是 Stage 1 的方向级产物，不是完整剧本或分镜。按 `direction_mode` 使用两种不同形状，不能把两者混写：

1. **方向模式**：明确写 `narrative_story` 或 `visual_aesthetic`。视觉模式同时记录 `no_fabricated_story_gate=pass`。
2. **叙事故事梗概（仅 narrative_story）**：用一个短段落写清“起点/日常 → 目标与行动 → 阻碍或预期打破 → 关键选择/高潮 → 结果与余韵”，形成有人物因果和结局的完整小故事；视觉风格另列，不改写故事事实。
3. **视觉概念梗概（仅 visual_aesthetic）**：采用视觉审美短片的五字段简案——`主体/表演者`、`情绪基调`、`视觉母题`、`关键画面状态`、`视觉演进`。视觉演进只写“建立 → 扩张/变体 → 接管/高潮 → 回收/停留”，由人物姿态、空间尺度、光色、材质、构图、镜头、字体和 VFX 推动画面；不得写人物背景、任务、追赶、秘密、未发送的消息/声音、关系、阻碍、选择、和解、走出困境或其它用户未提供的剧情。
4. **Logline**：故事模式写“人物 + 目标/事件 + 结果方向”；视觉模式写“主体 + 主要视觉机制 + 画面能量如何变化”，不能把视觉隐喻说成真实事件。
5. **主体**：故事模式写人物与关系；视觉模式只写已确认的表演者、物件、文字或抽象主体及其画面职责，不补职业、经历、心理秘密和关系。
6. **空间与发展**：故事模式写时代、地点、功能空间、剧情道具和内容弧；视觉模式写 `visual_space_system` 与 `visual_progression`，允许根据音乐、歌词、所选风格和 refs 设计表演空间、视觉状态、光色、材质和包装变化，但这些只属于视觉设计，不登记为故事事实。

### 内容—风格分离合同

- `narrative_story` 中，`style_independent_synopsis`、人物目标/关系、事件因果、时代地点、空间功能、关键道具和结局属于 **Content Truth**；视觉风格不能新增、替换或改写这些事实。
- `visual_aesthetic` 中只锁用户明确提供的主体、身份、地点、物件和歌词事实；其余由 `visual_aesthetic_brief` 组织为画面状态，不生成 `style_independent_synopsis` 式故事。风格可以驱动表演空间、光色、材质、构图、镜头、字体和 VFX 的视觉演进，但不得把视觉隐喻写成人物经历、任务或因果剧情。完成后记录 `no_fabricated_story_gate=pass`。
- `medium` 决定用 2D、UE 3D 或写实真人呈现；`style` 只决定色盘、光影、成像、表面质感、构图、字体、图形包装、VFX、剪辑与转场语言。它可以覆盖画面，但不能把普通房间改造成“由剪纸搭成的房间”，也不能因选择 Y2K 就自动把故事改到 2000 年代或塞入 CRT、翻盖手机和旧网页。
- 只有用户内容或已确认 Treatment 本身明确写了纸片世界、游戏世界、虚拟设备、舞台演出、年代空间等设定时，这些元素才属于 Content Truth；不能由风格选项反向创造。
- 故事模式执行**换风格测试**：替换风格后，主体、故事、空间功能和结局保持不变，记录 `content_style_separation_gate=pass`。视觉模式执行**去剧情测试**：删除所有人物动机、关系和事件句后，主体、情绪、母题、关键画面与视觉演进仍完整；若删完后创意不成立，说明它错误依赖了虚构故事，必须改写。检查都在同一次 author 中完成，不新增 Stage、模型调用或用户问询。

存在会重复出镜并承担演唱/表演主体的角色时，同时写 `performer_voice_lock`。用户已指定角色性别呈现，或已上传并明确用于该演唱角色的人物参考图且呈现清楚时，直接锁为 `female | male | androgynous | nonhuman`，并写 `performer_voice_lock_source=user_specified|character_reference`；这里只描述成片角色的可见呈现，不判断参考人物的现实性别身份。后续音乐必须使用匹配声线。

没有角色性别设定和演唱角色参考图时写 `performer_voice_lock=pending_music`、`performer_voice_lock_source=music_led_pending`，方向稿用用户能懂的话显示“角色呈现将跟随最终主唱声线”。Stage 2 生成音乐时先选择一个具体声线；Stage 3 试听实际成歌后以听到的主唱呈现为最终依据，再反向锁定 Stage 4 角色卡、分镜演唱者和视频口型；没有可见主表演者时写 `not_applicable`。用户明确说明歌手与画面角色不是同一人时另记 `singer_character_relation=separate`。

#### 叙事型

- 写清主角、关键关系、初始状态、可见目标、触发事件、具体阻力/代价、关键选择和结尾关系状态；事件之间必须有因果。
- 爱情故事用一个可拍摄的共同地点、物件、约定、习惯或未完成行动承载关系变化，不用“相遇 → 相爱 → 分开 → 和解”代替故事。
- 非线性、回忆和碎片结构可以打乱揭示顺序，但人物关系、信息变化和最终选择必须可追踪。
- Stage 1 只形成故事 Treatment 种子；用户明确需要完整剧本、场景或对白时读取 `<workflowsDir>/general-video/reference/screenwriting/script-writing.md`。

#### 概念型

- 写清 `concept_statement`、核心主体/意象、世界规则、贯穿母题、变化机制、升级阶梯、高潮接管和最终画面状态。
- 概念必须能持续变化：尺度、材质、空间、复制、破碎、重组、现实/平面转换或文字接管至少形成一条可见演进轴。
- 不补虚构人物关系；人物可以作为姿态、身份、情绪或视觉能量的承载者。

#### 表演型与歌词视觉型

- 表演型写表演者 persona、进入与空间路线、动作/气场升级、标志性时刻、高潮姿态和收束状态；不把舞蹈动作清单当故事。
- 歌词视觉型写歌曲核心命题、关键词/Hook、画面与文字的分工、重复意象及文字接管的升级方式；不逐句图解歌词。
- `hybrid` 只保留一条主发展线：表演或歌词包装可以增强叙事/概念，不能另起一套互不相干的内容。

#### 风格在方向稿中的位置

故事模式先保留唯一的 `style_independent_synopsis` 与 `content_world`，再单列“视觉呈现”。视觉模式不编写独立故事梗概，直接展示五字段 `visual_aesthetic_brief`，并说明当前风格怎样形成关键画面和视觉演进。默认情况下，`cinematic_narrative` 可进入故事模式，其它四种风格进入视觉模式；用户已提供故事时，任何风格都可承载同一故事，不能覆盖或替代已确认故事。

### 参考素材证据与用途

先复用覆盖当前 refs 的 `ref_analyses[]` 和 `ref_capsules`。参考图或参考视频没有分析证据，或现有证据缺少本次用途所需结论时，只补一次 `hub_analyse_media type="both"`；同一媒体不重复分析。尺寸、画幅和时长来自 metadata，可见语义来自 semantic。原媒体始终是视觉依据，分析文字只负责分配用途，不替代 ref。

#### 参考图

| 维度 | 记录 |
|---|---|
| 人物/场景 | 身份、数量、关系、服装妆发，或空间地标、结构、尺度与材质 |
| 色彩/材质 | 原图作为 ref 传递；只有用户明确给出的色彩词进入文字 |
| 构图/光影 | 主体位置、前中后景、视角、光源方向和明暗关系 |
| 动作/运镜 | 提取 2–3 个可执行动作、运镜或空间关系 |
| 情绪/表达 | 提取表演气质、情绪变化和可见高潮状态 |
| 字体/版式 | 提取字形骨架、层级、尺度、空间关系和运动机制 |

#### 参考视频反推

用户上传/提供可分析的参考视频，且用途不是“只提取音乐”时，必须形成 `reference_video_profile`：

```yaml
reference_video_profile:
  ref_id: "真实 ID"
  usage_scope: [subject, world, style, performance, camera, edit_rhythm, transition, typography_vfx]
  subject_world: "可迁移的人物/场景/空间特征"
  performance_motion: ["动作发力、姿态、速度和落点"]
  camera_grammar: ["景别变化、机位、路径、速度和终点"]
  edit_rhythm: { density: "", shot_length_pattern: "", hold_pattern: "", energy_change: "" }
  transitions: ["可见来源 → 切换机制 → 下一状态"]
  typography_vfx: ["文字/VFX 的触发、空间关系、结果和回收"]
  reusable_rules: ["可迁移到本项目的规律"]
  source_specific_elements: ["只属于原视频、不自动迁移的人物/Logo/文字/剧情/镜头顺序"]
```

- 运镜与剪辑按相对模式反推，不照搬原视频绝对秒点；Stage 3/5 结合当前主音乐重新对齐。
- 模型支持视频参考时，原视频按实际 `usage_scope` 继续作为 `video 1` 等有序 ref；不支持时仍把已确认 `reusable_rules` 编译进制作计划、分镜和 prompt，不伪造视频 slot。
- 用户只点名某支 MV、没有可分析文件或链接时，请求上传/提供可读取来源并等待；不凭标题、记忆或通用类型标签编写反推结论。
- 参考图/视频中的 Logo、标题、逐字文字、人物身份、完整剧情和逐镜顺序不自动复制；只有用户明确要求且具备合法 ref 时才进入对应用途。

### 方向稿展示与内部 Intake capsule

画布方向稿只写用户可读正文，不显示 YAML/JSON、代码块、内部英文键、Gate、card id、node id、route id、工具名或 `key=value` 清单。正文固定使用以下自然语言章节：

1. **项目选择**：内容来源、音乐来源、参考素材来源、视觉类型、视觉风格、目标时长和画幅。
2. **故事梗概或视觉概念**：按方向模式展示独立故事，或主体、情绪、视觉母题、关键画面状态和视觉演进五项。
3. **视觉呈现**：媒介质感、色彩、光影、材质、空间、字体和包装如何服务内容。
4. **角色与声音关系**：仅用用户能懂的话说明角色呈现、主唱声线及二者是否同一表演者。
5. **参考素材用途**：按素材名称说明参考人物、场景、风格包装、动作运镜或剪辑节奏中的哪些方面。

以下嵌套结构逐值写入 `intent` Stage 的 `execution_excerpt`，作为 Stage 2/3 恢复完整创意的内部权威；`answered_card_ids` 包含显式输入已解决项与本次卡片回答的并集，并且必须包含由本次卡片确认的 `mv_visual_style`。`style_confirmation_source` 让恢复执行和 Stage 2 能验证风格确实经过必问卡，而不是被摘要预填。不得复制到画布正文、文末附录、折叠区或用户审阅说明。

```yaml
intake_result:
  intake_gate:
    authority: mv_workflow_intent
    required_card_ids: [mv_content_source, mv_music_source, mv_reference_source, mv_visual_medium, mv_visual_style, mv_duration, mv_aspect_ratio]
    answered_card_ids: [mv_content_source, mv_music_source, mv_reference_source, mv_visual_medium, mv_visual_style, mv_duration, mv_aspect_ratio]
    style_confirmation_source: mv_visual_style_card
    status: pass
  content:
    source: agent_draft | user_upload | user_input
    synopsis: "narrative_story 写独立故事梗概；visual_aesthetic 写五字段视觉概念梗概，不生成故事"
    source_refs: []
    creative_core:
      direction_mode: narrative_story | visual_aesthetic
      content_form: narrative | concept | performance | lyric_visual | hybrid
      primary_form: "主逻辑"
      secondary_form: null
      theme: "核心命题"
      subject_and_relationship: "主体及关系/作用"
      content_world: { period: "仅故事模式或用户明确事实", locations: [], spatial_functions: [], causal_rules: [], story_objects: [] }
      content_arc: { setup: "仅故事模式", development: "", turn_or_climax: "", resolution: "" }
      style_independent_synopsis: "仅 narrative_story 填写；visual_aesthetic 不生成故事"
      visual_aesthetic_brief: { subject: "", mood: "", motifs: [], key_visual_states: [], visual_progression: [] }
      content_style_separation_gate: pass | not_applicable
      no_fabricated_story_gate: pass | not_applicable
      performer_voice_lock: female | male | androgynous | nonhuman | pending_music | not_applicable
      performer_voice_lock_source: user_specified | character_reference | music_led_pending | music_design | uploaded_audio | not_applicable
      singer_character_relation: same_performer | separate | not_applicable
      emotional_arc: { start: "", turn: "", peak: "", final: "" }
      direction_outline: ["连续状态 1", "连续状态 2"]
      form_treatment_seed: { kind: "与主逻辑一致", details: {} }
  references:
    source: agent_original | user_upload
    items: [{ ref_id: "真实 ID", media_type: image | video, role: character | scene | style | motion | edit | typography | mixed, contributes: [], take: "明确用途", analysis_id: "覆盖该 ref 的证据", video_profile: null | "reference_video_profile" }]
  visual_direction: { medium: 2d_animation | 3d_animation | live_action, style: cool_paper_collage | cute_animation_packaging | fx_stage_performance | y2k_retro | cinematic_narrative }
  target_duration_sec: 30
  aspect_ratio: "16:9"
  music_intake:
    source: agent_generated | user_upload | video_extracted
  music_input_refs: []
```

字段必须为具体值，不写“已确认”“见聊天”或占位。`form_treatment_seed.details` 按上方对应形态写齐字段，不把无关形态填成空模板。`review.after_execution` 让用户查看创意方向稿、音乐素材来源、参考用途、视觉类型、风格、目标时长和画幅；不提前展示或确认声音创作选项。

Plan 的 `stage_fields` 只保存标量：`intake_gate_authority`、`intake_gate_status`、`intake_answered_card_ids`、`direction_mode`、`content_form`、`visual_medium`、`visual_style`、`target_duration_sec`、`aspect_ratio`、`music_source`、`performer_voice_lock`、`singer_character_relation`、`direction_output_ref`、`direction_confirmed_inputs`、`direction_review_summary`、`direction_review_text`。`intake_answered_card_ids` 使用逗号分隔单行字符串；完整嵌套对象只保留在 `execution_excerpt`，不塞进 `constraints` 或画布文档。

方向文档按模式二选一：`narrative_story` 先展示“独立故事梗概”，再展示“视觉呈现”；`visual_aesthetic` 先展示“视觉概念梗概”，按主体、情绪、视觉母题、关键画面状态和视觉演进五项写清，并直接展示媒介、风格及色彩/光影/成像/材质/字体/包装作用。正文使用自然语言标题和表格，不出现 `narrative_story`、`visual_aesthetic` 等内部枚举。视觉模式不得出现“人物想要/必须/却被/决定/终于”等剧情句式，也不得用虚构道具包装成弱叙事。

### 方向稿审阅交接

物化方向文档后，按上方标量清单写当前 Stage 的 `stage_fields`，把 `direction_review_text` 作为 `review.after_execution` 的唯一一项，并在本轮 Planner 简短结果中返回；不能只返回阶段名称或“等待确认”。`direction_output_ref` 使用刚物化的真实 node id/path；`direction_confirmed_inputs` 与 `direction_review_summary` 序列化为单行可读字符串，不嵌套对象。故事模式摘要摘取内容形态、独立故事梗概、Logline 和核心命题，视觉模式摘要摘取五字段视觉概念、Logline 和视觉演进；视觉风格始终另列，不与内容摘要混写。

`direction_review_text` 按模式使用“独立故事梗概：<起承转合故事>”或“视觉概念梗概：<主体 + 情绪 + 母题 + 关键画面 + 视觉演进>”，其后再写“视觉呈现：<视觉类型 + 风格>；<时长>；<画幅>；音乐来源为<已上传/参考视频提取/由 Agent 生成>。请确认这份方向稿是否可以；如需调整，只写希望修改的内容。”不能列问题清单、提供重新填写示例、要求重复上传或询问下一 Stage 的音乐创作选项。

## Stage 3 — 制作计划
通过 intent Stage detail 的 `execution_excerpt` 读取完整 `intake_result`，再通过 `direction_output_ref` 读取用户可见创意方向稿，同时读取用户已确认的最终 `main_song` runtime ref 和真实 refs；不得从聊天摘要反推缺失创意。先执行 `<workflowsDir>/mv/reference/music.md` 的“实际成歌反推与唯一时间轴”：直接试听 `main_song`，物化逐句 `main_song_lyrics_timeline` 并补齐内部 `audio_decision`、`music_analysis`、`music_match`；随后在同一次 author 中物化用户可读的 `production_plan` 文档，并把完整机器执行数据写入当前 Stage 的 `execution_excerpt`。当前 Stage 的 `work_items` 只登记两个已物化 document，顺序为 `main_song_lyrics_timeline`、`production_plan`，两项都复制真实 `document_node_id`；不添加 Executor media work item。不要把这项正常前置动作表述为“缺少音乐分析”，也不要新增修复 Stage、用户问询或确认。

### 制作计划结构

1. **项目摘要**：Logline、内容形态、视觉类型、风格、期望时长、允许窗口、最终整数时长、画幅、交付目的和音乐来源。
2. **Treatment**：按 `direction_mode` 二选一。`narrative_story` 把 `creative_core.style_independent_synopsis` 与真实音乐展开成故事 Treatment，包含人物/关系、内容世界、因果发展和带稳定 `beat_id` 的歌曲段落映射。`visual_aesthetic` 把 `visual_aesthetic_brief` 与真实音乐展开成视觉 Treatment，逐段写主体/表演状态、情绪、视觉重心、空间尺度、光色、材质、构图、镜头、字体/VFX 密度和进入/离开状态；不得补人物目标、阻碍、选择、关系或故事结局。两种模式都需要环境建立、物件/身体细节、反应/意象和可见变化，但视觉模式的变化是画面演进，不伪装成事件。
3. **音乐与时间依据**：先核对内部 `audio_decision`、`music_analysis`、`music_match` 与 `main_song_lyrics_timeline` 最后一行结束时间，四者必须是同一个整数；时间轴还必须通过逐句、整数边界和连续覆盖校验。最终音乐物理时长不合法时返回 Stage 2 定稿；本次反推或时间轴不一致时在当前 Stage 修正。画布“音乐与时间”只显示最终时长、实际歌曲形式与语言、曲风、段落、能量、Hook、呼吸点和角色—主唱关系；Gate、authority、range、内部 id 与执行标记写入 capsule。歌词必须来自最终成歌反推时间轴，不得复制生成前 `lyrics_seed`。
4. **时长架构与节奏策略**：写 `duration_architecture` 和 `rhythm_strategy`。基准组数按最终整数时长除以 15 秒向上取整；例如最终 38 秒通常为 3 组。这里只锁基准数量、4–15 整数秒范围和尾段重平衡规则，不提前写精确分镜边界。全片节奏借用影视预告片的蓄力、预期打破、爆发和释放逻辑，写清能量弧、各音乐段落的快慢关系、呼吸与爆发位置，以及 build / burst-and-hold / hold-and-burst / wave / release 等可用轨迹；同时写 `spatial_progression`、`performance_choreography` 和 `insert_strategy`，让相邻段落在空间尺度、人物位置、动作幅度、镜头类型或媒介状态上发生可见变化，避免整片匀速、同景、同动作和连续人像中近景。
5. **声音设计策略**：写 `sound_design_strategy`，明确主音乐始终来自当前 `main_song`、按镜头组切片为 `audio 1`、最终在 Post 合入。带歌词且同一表演者的非电影叙事路线写 `lip_sync_default=singing_performer_first`：人物出镜且嘴部可见时默认演唱，关键歌词大字优先与唱出同词同镜；少量不唱镜头必须有器乐、空镜、动作插入或嘴部不可见依据。固定 H3 使用参考音频驱动口型，分镜标记 `lip_sync=required` 的组采用 `reference_led_lipsync_proxy` 并临时 `generate_audio=true`，模型音轨只作同步代理、后期必须替换为原始主音乐；其余组 `generate_audio=false`。按需另记 `sfx_ambience_only`，任何路线都不让视频模型另创歌曲/BGM。
6. **视觉系统与可选 Research 需求**：Treatment 完成后在内部 capsule 写完整 `style_anchor`，画布“视觉风格”用自然语言展示同一套媒介底盘、内容锁、六类可见风格身份证、逐段强度弧、音乐/动作触发、接管与恢复逻辑。Stage 5 把空间、构图、镜头、强度、光色、材质、成像、VFX、字体和切点包装全部展开到具体 Shot；Stage 6 只逐字投影对应连续原文。Research 的内部策略写入 capsule，画布只说明“角色卡完成后可按需搜索 6 张氛围参考并选 2 张；默认不搜索”。
7. **字体与包装**：读取 `<workflowsDir>/mv/reference/typography-packaging.md`，把 `route_id`、`typography_system`、`prompt_type_recipe`、TYPE CAST 和 `text_ledger` 写入内部 capsule。画布“字体包装”展示主字/辅助字的视觉性格、色彩材质、版式层级、运动方式、密度变化，以及计划上屏的准确文字、来源和秒点；不显示 route id、token、字段名或 Layer schema。Stage 5 逐镜写完准确文字、字体配方、空间包装和 Layer A/B/C，Stage 6 原文复制。
8. **角色、场景与锚点需求**：把完整 `anchor_requirements` 和 `scene_descriptions` 写入内部 capsule；画布“角色与场景”按可读表格说明要复用或生成谁、为什么需要、在哪些歌曲段落出现、参考素材用途，以及哪些普通场景只需描述。重复人物按需生成/复用；普通 MV 场景不升级成锚点，只有故事模式需要空间连续、用户锁定同一空间或跨派单动作依赖空间关系时才登记场景锚点。
9. **空间连续策略**：把完整 `spatial_continuity_policy` 写入内部 capsule；画布“空间连续”只说明是否需要连续，以及重复场景的轴线、人物左右、视线、屏幕运动和允许的越轴重建方式。非连续空间直接写“本片允许按音乐切换不同空间，不要求固定场景连续”。
10. **参考映射**：内部 capsule 保留每份素材的稳定 id、role、contributes、take 和 usage scope；画布按素材名称逐行说明参考人物、场景、风格包装、动作运镜或剪辑节奏中的哪些方面，不显示内部 id。参考视频另写可迁移规律和适用段落。
11. **制作执行说明**：画布只用自然语言说明“一个镜头组对应一条视频、每组 4–15 个整数秒、所有组总和等于主音乐、分镜逐镜写完画面与包装、视频生成阶段按原文装配并逐组派单、动态大字随视频生成、准确文字按需后期兜底”。`generation_contract` 的键值结构只写入当前 Stage 的 `execution_excerpt`；Stage 5/6 从 Stage detail 读取，不在画布展示 `unit`、`prompt_skeleton`、author、gate 或字符上限等内部字段。

### 画布制作计划格式

`production_plan` 画布正文固定使用“项目概览、内容方案、音乐与时间、时长与节奏、声音与演唱、视觉风格、字体包装、角色与场景、空间连续、参考素材、制作执行说明”十一章。优先使用短段落和表格；字段名改写为直观中文，不显示 YAML/JSON、代码块、路径式字段名、内部英文枚举、route id、beat id、cue id、node id、slot id、Gate、工具名或 `key=value`。歌词原文、时间、风格名、画幅和模型名等用户需要核对的内容正常显示。

同一事实只出现一次。内部数据比正文更细时，只写入 `execution_excerpt`；正文保留用户能验证的含义，不附“Production Plan 数据块”“Intake Gate”“下游生成合同”或其它机器附录。

### 内部 Production capsule

以下结构逐值写入 `production-plan` Stage 的 `execution_excerpt`，Stage 4–7 通过 Stage detail 读取；不得复制到 `production_plan` 画布正文、文末附录或用户审阅说明：

```yaml
production_plan:
  target_duration_sec: 40
  accepted_duration_window_sec: [35, 45]
  final_duration_sec: 38
  duration_authority: { main_song_id: main_song, final_duration_sec: 38, music_use_range: [0, 38], boundary_unit: integer_seconds }
  aspect_ratio: "16:9"
  content_treatment: { direction_mode: narrative_story | visual_aesthetic, style_independent_synopsis: "仅故事模式", visual_aesthetic_brief: {}, content_world: {}, content_arc: {}, visual_progression: [], section_arc: [], content_style_separation_gate: pass | not_applicable, no_fabricated_story_gate: pass | not_applicable }
  music_use_range: [0, 38]
  music: { main_song_id: main_song, lyrics_timeline_node_id: "真实节点", timing_authority: main_song_lyrics_timeline, performer_voice_lock: "继承已解决值", singer_character_relation: "继承已解决值" }
  duration_architecture: { baseline_group_count: 3, duration_sec: [4, 15], preferred_duration_sec: 15, tail_policy: rebalance }
  rhythm_strategy: { overall_energy_arc: "", section_pacing: [], contrast_rule: "" }
  spatial_progression: { world_premise: "", group_routes: [], recurring_locations: [], transition_logic: "" }
  performance_choreography: { amplitude_arc: "", large_action_families: [], space_interactions: [], signature_landings: [] }
  insert_strategy: { establishing_or_empty: [], object_or_body_details: [], reaction_or_motif: [], narrative_purpose: "" }
  sound_design_strategy: { generate_audio_default: false, lip_sync_route: reference_led_lipsync_proxy, generated_track_role: disposable_sync_proxy, main_song_merge: post }
  style_anchor: { direction_mode: narrative_story | visual_aesthetic, story_world_lock: {}, content_basis_lock: {}, visual_progression_lock: {}, style_application_scope: [palette, lighting, surface_treatment, imaging, composition, camera, typography, vfx, edit_transition], style_signature_plan: { style_id: "", selected_route: "", identity_signatures: {}, intensity_arc: [], section_deployment: [], group_compile_rule: "按 beat_ids 与强度弧选择逐组必现组合，写音乐/动作触发、接管、恢复并分配到具体 Shot", style_evidence_gate: required } }
  text_packaging: typography_led | key_moments | none
  text_ledger: { language: "", exact_texts: [{ text: "", visible_text_token: "VISIBLE_TEXT=\"\"", source_cue_id: "", source_span: "", source_start_sec: 0, source_end_sec: 0, music_time_sec: 0.0, sequence_role: "", visible_change: "", beat_ids: [] }], agent_visual_words: [] }
  typography_system: { primary_route_id: "按 style_id 选择，仅供内部查库", accent_route_id: null, prompt_type_recipe: { display_a_anatomy: "", display_b_contrast: "", utility_anatomy: "", hero_layout: "", surface_model: "", edge_and_depth: "", lighting_response: "", allowed_visible_tokens: [], forbidden_visible_text: "" }, type_cast: {}, palette_roles: {}, material_stack: [], layout_grammar: [], motion_mechanisms: [], camera_type_bindings: [], visual_event_plan: [], density_plan: [], shot_projection_rule: "cue/完整歌词与上屏秒点 → VISIBLE_TEXT → 字体配方与空间载体 → Layer A/B/C → 动作/镜头联动 → 遮挡传递、恢复或退出", route_projection_gate: required }
  style_research_requirement: { mode: deferred_user_opt_in, candidate_limit: 6, selected_ref_count: 0, usage_scope: atmosphere_only, character_reference_policy: user_explicit_only }
  anchor_requirements: []
  scene_descriptions: []
  spatial_continuity_policy: { mode: not_required }
  reference_map: []
  generation_contract: { unit: clip_group, duration_sec: [4, 15], duration_unit: integer_seconds, subshot_timing_precision_sec: 0.1, one_group_one_video: true, duration_sum_rule: equals_final_music_duration, post_tail_policy: forbidden, stage5_output: complete_execution_storyboard_and_prompt_source, storyboard_document_count: one_or_two, stage6_prompt_author: visual_gen_verbatim_projector, prompt_skeleton: cool_music_video_longform_group, prompt_source: stage5_group_six_section_range, prompt_runtime_fallback: exact_source_range_read, final_prompt_max_chars: 7000, one_to_one_shot_projection: verbatim, selected_style_typography_refresh_stage: shot-plan, per_subshot_audio_sync: required, per_subshot_typography_expansion: stage5_required, per_subshot_spatial_action_preservation: required, video_concurrency_limit: 1, prompt_transport: verbatim_work_item_prompt }
```

### `content_treatment`

Stage 3 必须在分镜前补全内部 capsule 的 `content_treatment`，并把同一含义写成画布“内容方案”章节；两层逐值继承 Stage 1 的 `direction_mode`。故事模式保留独立故事、内容世界与结局方向，再按音乐展开并执行换风格测试。视觉模式保留五字段视觉简案，按音乐展开视觉演进并执行去剧情测试；不得因歌词隐喻、音乐情绪或所选风格新增人物关系、任务、时代、剧情道具或结局。`no_fabricated_story_gate` 只留在内部 capsule，不显示给用户。

- **叙事型**：记录主角/关系、目标、触发、行动、阻力/代价、信息变化、关键选择和结尾关系状态。每个歌曲段落至少推进事件、信息、关系、反应或选择中的一项，并通过地点、时间、天气、光线、道具状态或人物空间关系中的至少一项可见变化承载推进；环境空镜与细节特写必须提供信息或情绪触发。
- **概念型**：记录视觉主体、情绪基调、视觉母题、关键画面状态、变化机制、逐级升级、高潮接管、变体/回收和最终画面状态。每个歌曲段落必须改变主体尺度、空间层级、光色、材质、构图、镜头、字体/VFX 密度或环境反馈中的至少一项；这些是视觉变化，不补“人物为何这样做”的故事解释。
- **表演型**：记录 persona、空间路线、表演状态、动作与镜头关系、能量升级、标志性时刻、高潮姿态和收束。人物不能只在单一布景走动；每段至少改变表演区域、身体尺度、空间借力、队形/前后景或环境反馈中的一项。
- **歌词视觉型**：记录歌词命题、关键 Hook/词、文字与画面职责、重复/对照关系、视觉隐喻和包装接管顺序。
- **混合型**：先写主形态的完整 Treatment，再标记辅助形态在哪些段落增强它；辅助形态不产生第二套结局。

建立 `section_arc`：每项使用稳定 `beat_id`（`tb_01` 起连续递增），记录音乐段落/绝对时间、进入状态、歌词/能量依据、当前变化和离开状态。故事模式记录事件/人物状态变化；视觉模式记录主体、表演、空间尺度、光色、材质、构图、字体与 VFX 的视觉状态变化，不写虚构因果。它不提前规定子镜头数量或精确镜头组边界；Stage 4 据此生成/登记重复对象锚点，Stage 5 每个镜头组必须引用一个或多个 `beat_id`。

### 完成与下游

`review.after_execution` 让用户同时查看逐句“最终主音乐歌词与节奏时间轴”和整张制作总表，重点确认每句歌词的整数起止秒、故事方案或五字段视觉方案、段落发展、歌词关键词大字与上屏秒点、时长架构、节奏策略、声音策略、视觉系统、字体包装、角色/场景、空间连续、可选风格 Research、普通场景描述、参考用途和直观的制作执行说明。审阅文案不提内部字段名或 capsule。

用户修改时同时 patch 本 Stage 的用户文档和 `execution_excerpt` 中受影响字段。Stage 4–7 必须同时读取已接受的 `production_plan` 正文与 `production-plan` Stage detail 的内部 capsule，不得靠聊天摘要重建方向。

## 反模式

- 把一句 Logline 当成完整创意，导致 Stage 3/5 临时补故事或概念。
- 从“拼贴、Y2K、可爱、舞台、电影感”等风格词直接生成故事、年代、地点和道具，导致换一个风格就变成另一套剧情。
- 用户没有提供故事、且选择前四种视觉风格时，仍强行编人物目标、阻碍、秘密、关系、任务、剧情道具或结局；或用户已经提供故事时，因为选择前四种风格而删除故事。
- 用抽象主题词或“相遇—相爱—分开”等阶段名代替具体关系、事件、变化机制和结局。
- Agent 构思时把概念型 MV 强行扩写成完整剧情。
- 忽略用户原文中的明确时长、画幅、媒介或真实附件而重复提问；或依据摘要和模型推断跳过缺失项；或任何情况下省略视觉风格卡。
- 用户选择上传后继续询问、写占位内容或提前生成资产。
- 把参考素材统称“参考风格”，不登记用途。
- 制作计划缺少 `content_treatment.section_arc`、时长/节奏、声音策略、空间连续策略或生成合同，导致下游临时补决定。
- 把重复人物/场景留到分镜阶段才识别，导致 Stage 5 没有可绑定的真实锚点。
