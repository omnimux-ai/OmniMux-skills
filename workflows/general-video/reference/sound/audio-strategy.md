# Audio Strategy — 旁白与音乐策略

## Activate When

- 当前 Stage 需要独立旁白、配音、BGM、歌曲、stems、替换音轨或最终混音。
- 需要把 Brief / Shot Plan 的情绪、节奏和信息层级编译为音频 work item。
- Visual Gen 已声明原生音频，但仍需要判断哪些声音留在视频、哪些声音交给独立 Audio 或 Post。

## Decision Test

先确认独立音频是否是最终交付的一部分。原生视频音频已经满足需求、用户没有要求独立 BGM/VO，或音频只是一次性 prompt 事实时，跳过独立 Audio；这不关闭 Visual Gen 的原生音轨。需要独立音频时，再区分 voice、music、effects、replacement 和 mix，不把所有声音塞进一个 work item。

## Native Video Audio

- 用户未提音频时，Visual Gen 默认生成与可见事件匹配的原生 SFX/ambience，不生成独立 BGM；把具体声音写进 `audio_approach` 和最终 prompt，不写空泛的“ambient only”。
- 已批准的故事对白或真人出镜表达按 profile 原生生成时，同时保留动作声和现场 ambience。语音驱动的完整 VO 在 Audio 生成并由 Post 铺入；Visual Gen 只生成 SFX/ambience，不重复旁白或音乐。
- 静音只按共享 Stage contract 的证据门槛处理；非静音 item 始终正向写出可听事件，不使用 `silent/ambient only` 之类混合表述。
- 独立 VO/BGM 与原生 SFX/ambience 共存时，Post 明确 preserve、duck 或 mix；不要通过关闭原生音轨来省略混音判断。

## Voice and Dialogue

- 保留用户批准的对白、旁白和歌词原文；只在用户要求或明确错误时修改措辞。
- 音色按角色身份、语言、表演距离和项目调性选择，不用性别或年龄刻板印象推断未给出的身份。
- 多角色建立稳定的 `speaker → voice/ref` 映射；连续对戏、打断、重叠或情绪递进的句子保持独立 work item，方便局部重试。
- 旁白节奏服从画面信息：铺垫可以留白，信息密集处提高清晰度，转折处用停顿、重音或能量变化表达，不追求匀速念完。
- 品牌名、人名、地名、数字和专业术语按 `pronunciation.md` 处理；不能确定且会改变交付的读法才向用户确认。
- 写 TTS work item 前，先区分整片时长和实际发声时长；中文按约 3–4 个可朗读字/秒、英文按约 2.5–3 个单词/秒粗估，每个独立段落末尾预留 0.5–1 秒换气，并把字/词数与估算范围作为 `source` timing evidence，`render.duration_target_s` 只写实际发声目标。
- 估算时长与目标明显不符时，先调整文案或 Shot Plan；涉及修改用户确认的逐字文本、总时长或是否持续旁白时，先 `question`，不能直接生成。
- 生成后以工具返回或实测时长为准；明显不符就重做语音或重新规划，不把短音频通过后期整体变速拉到目标时长。

## Music and BGM

只有用户要求音乐或确认的项目方向需要独立音乐时才创建 music work item。一个项目或连续段落优先生成一条可复用的 music bed，最终混音留给 Post；不要默认每个 clip 一条 BGM。

Music prompt 同时吸收：

1. Brief 的调性、受众、媒介和 sonic identity。
2. Shot Plan 的节奏、段落变化、转折位置和目标时长。

根据内容选择是否需要 `intro → build → peak → release` 的完整弧线；纯氛围或短循环不强行添加高潮。时长、循环、尾部 fade 和拼接点写入 item 的 `timeline` / `render`，不硬编码旧工具的固定秒数。

默认提出一个推荐方向。只有用户要求对比、存在真正互斥的音乐路线，或失败证据表明需要探索时，才生成多个候选，并记录每个候选的差异。

## Mix Preparation

- 对白 / 旁白优先于动作音效、环境声和 BGM；需要 ducking 时说明谁让位给谁。
- BGM 与旁白同时存在时，避免持续占用语言清晰度所在的频段；无旁白段可以保留更完整的音乐层次。
- Post 读取真实输入路径和时长后再裁切、延展、淡出或混音；不要在 Planner 里伪造 runtime refs。
- 字幕和文字烧录是显式选择，没有用户要求时不默认添加。

## Review

- 文本、语言、speaker、voice/ref 和目标时长完整且可追溯。
- 旁白可懂，停顿服务句义，音乐不遮挡语言，连续段落没有突变。
- 独立 Audio 的存在有交付理由，且下游 Post 知道如何消费它。

## Boundaries

旁白逐字稿、音乐方向、speaker、timing 和混音交接直接写入 Audio Stage 的结构化 work items；不创建独立音频方案、旁白方案或音乐方案 Markdown。

本卡不强制 BGM、候选数量、固定响度、固定采样率、固定模型或独立 Audio Stage；具体工具字段和执行顺序服从共享 Audio Pipeline、当前 workflow 和 runtime capability。
