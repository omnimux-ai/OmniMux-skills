# KOC Shot & VO Craft Reference — 真人感 / 分镜节奏 / 口播文案

> Planner 编写 Production stage（shot plan 文档与 video work items）时读取。把分镜节奏、台词密度、逐字对白、连续动作、切点、真人感、声音路径和讲戏规则直接写入文档或最终 prompt。

## 画面描述反文学化

写具体可拍的动作和画面，不写抽象词和比喻：不写"温柔的氛围""治愈感扑面"，写"她靠在床头，肩膀松下来"。模型只能拍出看得见的东西。

## 怎么像真人拍的，不像广告（KOC 质量杠杆最大的一节）

1. **一条情绪小线索，不贴段落标签**：先有点不对劲 / 怪 / 好笑（钩子在这）→ 反转（产品出现或情况变了）→ 那一下（笑点 / 松一口气 / "哦原来如此"）。这条线索自然融进画面描述，写成一段像导演讲戏的流动描述，不写成"第一段…第二段…"。
2. **人是活的**：自然眨眼、呼吸感（肩膀或胸口轻微起伏）、眼神自然重新聚焦一次、手入镜时至少一个小动作（握紧一点 / 手指动一下）。静止镜头里的人也要"在想事情"，每个含人 work item 都要带这些 aliveness cue。
3. **产品是笑点，不是主角**：人是主角，产品是让人松一口气或会心一笑的那个东西。不围着产品转、不 hero-lit 摆拍；产品自然出现在真实使用里。最好的收尾常来自意外（一只猫、一个路人抢走最后那一下）。
4. **切几个镜头看画面需要，别硬凑**：安静温柔的内容切两段放慢，比赶着切三段好。

### 讲戏式描述样板（学流动写法和台词密度，别照抄用词）

> **提示词语言**：画面描述用英文（模型理解更准），引号内台词用**产物语言**原文（目标受众语言，见 workflow 产物语言规则——模型会原话说出）。中文产物 = 英文画面描述 + 中文台词；英文产物 = 整段含台词全英文。

```
Reference image1 as the product moment. Handheld phone, vertical 9:16, real home, natural light.
A guy spritzes the room spray once over his couch and sets the bottle down; the camera drifts to
his cat, which lifts its head, nostrils flare, then crawls over and presses its face into the cushion
where the mist landed and flops over; the guy looks at camera, one eyebrow up, a resigned half-smile.
He is alive: natural blinks, breathing, a small eye refocus, fingers settle on the bottle.
The product just sits there in real use, not centered or hero-lit; the cat steals the last beat.
VO (Chinese, spoken verbatim, 像真人随口说): "本想喷个香薰显得讲究点" → "结果我家猫十秒钟，当场表演了个嗑晕"
→ "行吧，现在我俩口味都挺贵，谁也别嫌谁".
camera handheld, soft natural light. avoid product-hero framing, dead-still face, jitter.
```

台词逐字进 work item 的 `dialogue_excerpt`，禁止 paraphrase；示例三句是密度和语气的参照（15s 约 40-55 字，留得出真人停顿），流行说法会过期，别照抄。

## 真人皮肤与质感（含人 work item 必带，防塑料脸 / 防美颜滤镜 / 防 3D 渲染感）

> 本节作用于**视频生成 prompt**（Production 的每个含人 video work item）：锚图只锁定"这个人长什么样"，视频镜头的皮肤质感要在每个 prompt 里单独锁，否则脸照样塑料。创作者锚**图**的生成框架在 `product-grounding.md` 人物锚节（Assets 阶段用），两者不互相替代。

- **媒介锚（KOC 版）**：`real human photography, candid handheld phone footage, photoreal skin texture, natural light`。KOC 锚"iPhone 手持自然质感"，**不用** `85mm cinematic / ARRI / 电影质感 / 大光圈浅景深` 这类电影大片锚——那是 TVC 语言，破坏平台原生感（与运镜红线同理）。
- **皮肤 4 项**（近景 / 特写口播镜头强制全带，中景 ≥2 项）：① SSS 暖透感 `subsurface scattering on ears and nose edges, warm translucent glow`（防蜡像）② 毛孔 `visible pores, natural skin micro-texture`（防磨皮）③ T 区微油光 `slight oil sheen on T-zone, natural sebum not oily`——只写 T 区，通体油光 = 材质翻车 ④ 绒毛微汗 `fine peach fuzz catching light, subtle micro-perspiration`（生活感）。
- **不完美 ≥2 项**：freckles / slight unevenness / subtle facial asymmetry / faint natural blemishes / hair slightly out of place，配中文锚「真实人类面部特征，存在自然生理不完美」。
- **打光**：自然光为主，45 度侧柔光 + 轻微逆光让耳鼻边缘透光；忌硬正面光 / 顶平光（塑料脸根源）。
- **表情写具体面部动作，不写空泛情绪词**（空词 = 3D 样片脸）：真笑是颊颧上抬 + 嘴角自然上扬 + 眼角微皱，痛点共鸣是眉心轻收 + 嘴角下压半拍再松开；与 aliveness cue（眨眼 / 呼吸 / 眼神重聚焦）同时写进 prompt。
- **反 prompt（挂在避免段末尾）**：`NOT plastic mannequin skin, NOT waxy / airbrushed / over-smoothed skin, NOT 3D rendered face, NOT glossy oily face, NOT mathematically symmetrical face, NOT stock photo`。

## 分镜节奏（KOC 比短剧快）

- shot plan 文档可以比生成粒度细；video work item 是 continuity-first clip group（默认 cap 15s）。KOC 的多镜感有两条实现路径：
  1. **clip 内有意切换**：在最终 prompt 中显式写出 intentional cuts（如“镜头从产品特写切到她的反应”）；未写切换时保持一条连续长镜。
  2. **相邻 clip 切分**：只因硬跳变切（场景 / 时间 / 换装 / 状态变化 / 时长溢出），每次切分写 cut reason。
- 节奏基准（启发式，不是硬指标）：单镜感 3-8s；≤15s 短片 3-5 个镜头感；30s 约 6-10 个。低于这个密度像 TVC，高于它像鬼畜。
- 镜 1（0-3s）必须是 hook 落地：近 / 特写 + 钩子句第一句（0-3s 是成片时间轴位置不是独立 clip，不为 hook 镜切 3s work item）；展开镜与镜 1 景别跨 ≥2 级避免跳切感；尾镜收在产品回放或博主互动 + CTA。

## 声音路径（HARD — 口播/对白 native 直出）

- KOC 口播、对白和环境音效一律随视频 work item native 直出：`audio_approach` 写 native dialogue，逐字台词（与 `dialogue_excerpt` 同文）和场景音效写进最终 prompt，让视频模型声画同步直出。TTS 后配声画错位、翻译腔，丢 KOC 真实感。
- 默认禁止为口播/对白创建 standalone TTS、voice-prep、voice anchor、vo-overlay 或替换配音 work item。**"要烧字幕"不是走 TTS 的理由**——字幕源是 `dialogue_excerpt`，post 按 clip 时长烧录；**"仅手部 / 仅产品画面的画外口播"也不是理由**——台词照样写进 video prompt native 直出。
- 仅当用户明确要求外部旁白/替换音轨，或选中 video vendor 不支持可用 native speech 时才走 standalone TTS，例外原因写进 plan。
- BGM 按 workflow Audio 规则默认加、post 整条垫底；BGM 开启时 video prompt 的环境音效只写非音乐元素（口播 / 对白 / 场景音）；不构成关闭 native audio 或改走 TTS 的理由。

## 台词密度预算（shot plan 硬校验）

- 中文口播平稳段约 3-4 字/秒：**15s clip 台词约 40-55 字**，留出呼吸和停顿。
- 英文口播约 2.5-3 词/秒：**15s clip 约 35-45 词**。预算按产物语言算，不按用户对话语言。
- planner 写每个 video work item 时按 `duration_target_s` 反推 `dialogue_excerpt` 字数并校验；超预算时删词或拆相邻 clip，禁止指望模型倍速念完。
- 台词完整度优先于凑时长：装不下就拆 clip，不砍到不通顺。

## VO 口播文案（松弛地讲一件自己的事）

中文 VO 尬的根因是**用力过猛**。目标：像真人松弛地讲一件自己的事，产品自然在里面——不是逐条用力推销。

### 四条铁律

1. **一条情绪线**：整条 VO 是一个连贯状态的流动，反转整条最多一次（通常在开头）。句句"本来→结果"像精神分裂。
2. **开头不硬塞热词**："姐妹们 / 谁懂啊"不是必须开场。用一个具体的、有画面的真实状态切入（当时在干嘛、什么感受）。
3. **逻辑顺下去，不用"反正"粘合**：需要"反正"硬转说明前面没讲圆——回去讲顺，不是盖过去。
4. **结尾语气与前文一致**：前面松弛分享、结尾突然"链接放下面自取"会瞬间出戏。CTA 顺语气软收。

### 热词与黑名单

- 平台热词是可选调料，连用即假；不列具体流行语（会过期），按当下语感临场判断。黑名单是中文示例，英文产物按等价语义适用（shock-bait / "don't scroll away" / "in 10 seconds" / 绝对化 claim 同禁）。
- **低质黑名单（HARD，命中即重写）**：震惊体（震惊 / 惊呆了）· 喊话体（别划走 / 一定要看到最后）· 标题党（10秒教你 / 99%的人不知道）· 绝对化（史上最强 / 全网最低）· 速成诱饵（一秒变美 / 立刻瘦10斤）。这类词还是平台限流信号。
- **套版开场黑名单（HARD，命中即重写）**：照抄 knowledge 示例的固定句式，真人不这么说。典型："我闺蜜疯狂安利我…""他不是那种…""我之前一直觉得X不行…""姐妹们听我说…"。判据：**开场句换个产品也成立=套版**，重写成「只涂粉底=扁平寡淡」这种离开本产品说不出的具体话。
- 英文 UGC 的松弛可参考，但别直译英文句式（"我从不觉得…直到…"是英文腔）。

### 自检（每条 VO 写完）

① 是一条顺的情绪线吗？② 开头是真实状态切入还是套话（换个产品还成立=套话，重写）？③ 有没有"反正"粘合断层？④ 结尾语气一致吗？⑤ 扫一遍黑名单（含套版开场）。⑥ 字数在时长预算内吗？

## 运镜（轻量克制）

| 运镜 | 适合钩子 | 用法 |
|---|---|---|
| 推近 | 真香反转 / 痛点共鸣 | 全景推到产品特写，聚焦反差瞬间 |
| 拉远 | 平铺直叙 | 产品特写拉到博主全身，展示使用场景 |
| 跟拍 | 教程拆解 | 跟手部动作呈现步骤 |
| 微摇 | 闺蜜吐槽 | 跟表情，情绪变化 |
| 固定 | 任何钩子 | 静态特写让内容说话 |

**红线**：禁摇臂 / 航拍 / 升降 / 环绕 / 频繁推拉组合——戏剧化运镜破坏原生感，是 TVC 语言。默认手持感。

## 场景选择与多样性（agent 自判，不堆固定库）

- **场景由 agent 按产品特性自判，不甩固定场景菜单让用户挑**。真博主会本能把产品放进"它最该出现的真实场景"（香薰 → 居家氛围、防晒 → 出游路上）。默认贴真实使用情境，按产品默想"用户会在哪用它"直接落地。
- **反差场景是弹药（强适配才用）**：仅当反差能放大卖点时用（硬核户外装备放极限环境反衬耐用）；温和日常品类（护肤 / 母婴 / 食品）硬塞 = 违和。一条视频一个记忆点。
- **多 clip 不锁死锚图同一景**：场景化产品锚图只锚产品与质感，每个 video prompt 写"参考产品与质感，场景不限于锚图"；clip 间允许场景 / 时段 / 机位变化（切换写 cut reason），不得全部沿用锚图同一景。

## 多 clip 衔接与后期

- 跨 clip 一致性来自**每个 clip 带同一组产品 / 人物锚 refs + `continuity` 文字**（起始状态 / 结束状态 / 交接动作）。禁止把前一个生成 clip 当 video reference 链式引用（误差累积漂移，与锚点双重约束冲突）。
- 产品锚为生成图时 refs 末尾追加原始产品图，prompt 按位置声明职责："image N is the real product photo: logo, text, shape and color must match it exactly; use it for product appearance only, do not adopt its background or composition."（N = 该图在 refs 中的位置；场景氛围仍由产品锚锁定。）
- 转场默认硬切（cut）。跨段大跳（日→夜、室内→户外）用闪白 / 色调切换等非黑场轻过渡；**禁一切 fade-to-black**——黑场吃留存。

## Anti-patterns

- 画面描述写抽象氛围词，不写可拍动作。
- 含人 work item 不带 aliveness cue（静止假脸）。
- 含人近景 / 特写不带皮肤质感锚（塑料脸 / 蜡像 / 美颜磨皮），或表情只写空泛情绪词。
- KOC prompt 挂电影大片媒介锚（85mm cinematic / ARRI / 大光圈浅景深）。
- 产品 hero-lit 居中摆拍（广告感）。
- 台词字数超时长预算还派单。
- VO 句句反转 / 热词开场 / "反正"粘合 / 结尾跳戏 / 命中黑名单。
- 戏剧化运镜（摇臂 / 航拍 / 环绕）。
