# Reference Analysis

本步骤用于“仿做 / 改写 / 参考复刻”类视频分镜任务中，对参考视频、参考分镜、参考脚本或参考素材做**结构化拆解分析**。目标不是照抄，而是把参考内容中真正有价值、可迁移、可改写、可重组的部分提炼出来，供后续生成新的脚本与 storyboard 使用。

这个步骤尤其适用于以下场景：

- “参考这条视频帮我做一个类似的”
- “按这个爆款的结构改成我的产品”
- “拆一下这条视频为什么能打”
- “根据这个参考视频，做一个同风格但不同产品的分镜”
- “复刻它的节奏和镜头感，但不要直接照搬”

本步骤强调：

- 提炼结构
- 提炼节奏
- 提炼卖点表达
- 提炼镜头模式
- 提炼可迁移逻辑
- 标记不可直接复制的元素与风险

---

## 目标

基于参考视频/脚本/分镜等输入，输出：

1. 参考内容的核心结构
2. 开头 hook 类型与机制
3. 中段证明链设计
4. 结尾 CTA 方式
5. 镜头组织与节奏模式
6. 视觉语言特征
7. 可迁移元素
8. 不建议直接复制的元素
9. 对应到当前用户任务的改写方向

---

## 适用输入

本步骤可处理以下输入：

- 参考视频链接
- 参考视频转录 / 内容分析结果
- 参考脚本
- 参考 storyboard
- 镜头表
- 参考广告截图 / 关键帧
- 用户口述“像某条视频那样”
- 多条参考混合

如果输入是视频链接，理想情况下应基于上游视频分析结果（如分段、转录、视觉描述、平台数据）来拆解；如果只有文字描述，也应尽量完成结构分析。

---

## 核心原则

### 1. 分析“为什么有效”，不是只复述“发生了什么”

不要停留在：

- 第一镜头是人物
- 第二镜头是产品
- 第三镜头是特写

而要进一步判断：

- 为什么这样排
- 它在卖什么
- 它怎么抓停留
- 它如何证明
- 它如何把观众带到 CTA

### 2. 提炼“可迁移结构”，不是复制表层元素

例如：

可迁移的是：

- 结果先行的 hook
- 3 段式演示证明
- 结果后再补一句省力价值
- 人物口播 + 插入特写的节奏

不可直接照搬的是：

- 原视频中的品牌名
- 明确包装外观
- 专属人设
- 原视频未授权素材
- 特定数据/评价/口号

### 3. 优先抽象出“模式”

本步骤要把参考内容尽量抽象成以下几层：

- 内容结构模式
- 卖点表达模式
- 镜头节奏模式
- 视觉风格模式
- 商业转化模式

这样后续才能稳定套到用户自己的产品/任务上。

### 4. 明确区分“可学”和“不可抄”

尤其在商业内容中，要避免：

- 直接搬运品牌信息
- 搬运独特人物形象
- 搬运竞争对手商标/包装
- 搬运未经证实的 claim
- 搬运可能侵权的文案句式
- 一比一复制镜头编排导致过于相似

### 5. 最终目标是服务“重构”

本步骤不是终点。输出应便于后续：

- 改写脚本
- 设计新 angle
- 生成新分镜
- 迁移风格但替换内容
- 构建多版本创意测试

---

## 输入依赖

本步骤可基于以下内容：

- 用户提供的参考视频/链接/截图
- 上游视频分析结构
- 平台数据摘要
- 口播转录
- 镜头级描述
- 用户任务目标和产品信息

如果当前用户已经说明了“参考它做给我的产品”，则分析时必须同步考虑当前任务，而不是孤立分析参考物。

---

## 输出格式

本步骤统一输出 YAML，结构如下：

```yaml
reference_analysis:
  meta:
    reference_type: []
    reference_summary: ""
    current_task_context: ""
    source_confidence: ""
    assumptions: []
  structural_breakdown:
    overall_pattern: ""
    hook_type: ""
    demo_pattern: ""
    cta_pattern: ""
    pacing_pattern: ""
  content_logic:
    primary_promise: ""
    buyer_problem_addressed: ""
    proof_mechanism: []
    conversion_path: []
  scene_patterns:
    recurring_shot_types: []
    visual_transitions: []
    text_overlay_style: []
    presenter_usage: ""
    product_usage_style: ""
  transferable_elements:
    high_value: []
    medium_value: []
    low_value: []
  non_transferable_elements:
    brand_locked: []
    ip_or_identity_risks: []
    claim_risks: []
    overfit_elements: []
  adaptation_guidance:
    what_to_keep: []
    what_to_change: []
    how_to_rebuild_for_current_task: []
  notes: []
```

---

## `meta` 字段说明

### `reference_type`
数组，可包含：

- `video`
- `script`
- `storyboard`
- `shot_list`
- `image_frames`
- `ad_creative`
- `mixed`

### `reference_summary`
一句话概括这个参考内容是什么。

例如：

- “一条清洁喷雾的爆款短视频，采用问题开场 + 演示结果 + 软 CTA 结构”
- “一条护肤广告分镜，主打质地和上脸妆效”
- “一个真人 UGC 口播推荐视频，穿插产品使用细节”

### `current_task_context`
说明当前用户要拿这个参考做什么。

例如：

- “将该结构迁移到用户自己的厨房清洁产品”
- “参考这条美妆视频节奏，改写为另一款底妆产品”
- “借鉴其钩子与镜头节奏，不复刻品牌元素”

### `source_confidence`
建议值：

- `high`
- `medium`
- `low`

判断逻辑：

- 有完整视频分析/转录/镜头拆解：`high`
- 有部分描述：`medium`
- 只有很模糊的口头说明：`low`

### `assumptions`
写明当前分析中采用的合理假设。

---

## 结构拆解

### `structural_breakdown.overall_pattern`
用一句话总结整条内容的结构模式。

例如：

- “问题开场 → 产品介入 → 使用动作 → 结果展示 → 轻推荐 CTA”
- “结果先行 → 倒叙解释 → 对比确认 → 产品收尾”
- “真人推荐 → 演示插镜 → 主观反馈 → CTA 收口”

### `hook_type`
参考内容的 hook 类型，例如：

- `pain_point`
- `result_first`
- `comparison`
- `ugc_recommendation`
- `reaction_hook`
- `texture_reveal`
- `benefit_claim`

### `demo_pattern`
中段演示模式，例如：

- `problem_to_action_to_result`
- `comparison_then_closeup_proof`
- `recommendation_then_use_demo`
- `texture_apply_finish_reveal`

### `cta_pattern`
结尾 CTA 模式，例如：

- `soft_recommendation`
- `problem_solution_close`
- `packshot_close`
- `result_reinforcement_close`
- `offer_driven_close`

### `pacing_pattern`
节奏模式，例如：

- “前快中快尾稳”
- “结果先爆点，中段快切解释，结尾轻停留”
- “口播贯穿 + 插镜补证明”

---

## 内容逻辑提炼

### `content_logic.primary_promise`
这条参考内容最核心承诺的是什么。

例如：

- “这款清洁产品能让油污处理更轻松”
- “这款底妆产品能让妆效更服帖自然”
- “这个收纳工具能让桌面更整齐省空间”

### `buyer_problem_addressed`
它击中的用户问题是什么。

### `proof_mechanism`
数组，列出它是如何让人相信的，例如：

- before/after
- 使用动作
- 近景结果
- 主播反应
- 对比镜头
- 屏幕字幕强调
- 口播解释

### `conversion_path`
按顺序列出观众从停留到被说服再到 CTA 的路径。

例如：

```yaml
conversion_path:
  - "先用痛点建立代入"
  - "展示产品如何介入问题"
  - "用明显结果完成主要说服"
  - "补一句省力价值降低决策门槛"
  - "用温和推荐导向尝试"
```

---

## 场景模式提炼

### `scene_patterns.recurring_shot_types`
提炼常见镜头类型，例如：

- `talking_head`
- `product_macro`
- `insert_detail`
- `before_after`
- `action_demo`
- `closeup_reaction`
- `packshot_cta`

### `visual_transitions`
常见转场 / 组织方式，例如：

- 硬切
- whip pan
- 动作衔接 cut
- before/after matching cut
- 口播对镜 + 插镜切换

### `text_overlay_style`
字幕/大字风格，例如：

- 大问题句
- 关键词利益点
- 结果强化词
- step-by-step 指令字卡

### `presenter_usage`
说明人物是如何被使用的，例如：

- “人物主要承担真实感和信任感”
- “人物只在开头和结尾出现，中间交给产品演示”
- “全程口播对镜，插入局部操作镜头”

### `product_usage_style`
说明产品出场方式，例如：

- 尽早露出
- 先隐藏后揭示
- 使用中持续可见
- 结尾用 packshot 强识别

---

## 可迁移元素分级

### `transferable_elements.high_value`
最值得学、最可迁移的部分。

通常包括：

- 结构逻辑
- 证明路径
- hook 机制
- 节奏策略
- 口播和插镜关系
- 结果呈现方式

### `medium_value`
可参考但需按任务改造的部分。

例如：

- 镜头顺序
- 口播语气
- 字幕节奏
- 视觉构图倾向
- 人物出镜比例

### `low_value`
可参考价值较低，或容易被误学的部分。

例如：

- 某些装饰性过场
- 特定流行 BGM 节点
- 跟产品无关的情绪镜头
- 平台偶然性梗

---

## 不可迁移元素

### `non_transferable_elements.brand_locked`
参考内容中绑定原品牌、原产品、原包装、原标识的元素。

### `ip_or_identity_risks`
可能涉及肖像、商标、独特角色设定、独特场景风格等不宜直接复刻的元素。

### `claim_risks`
参考内容中可能带有不适合直接搬运的功效或权威表达。

例如：

- “第一名”
- “实验室验证”
- “100%有效”
- 医疗级暗示
- 不明出处用户评价

### `overfit_elements`
即使不侵权，也不适合机械照搬的点，例如：

- 太依赖某出镜人的个人魅力
- 太依赖原产品独有使用场景
- 太依赖某一平台热点语境
- 太依赖原视频已有评论区语境

---

## 适配指导

### `adaptation_guidance.what_to_keep`
建议保留的结构/逻辑/节奏特征。

### `what_to_change`
建议替换的元素，例如：

- 产品问题场景
- 品牌信息
- 包装呈现
- 人物设定
- claim 表述
- CTA 语气

### `how_to_rebuild_for_current_task`
按当前用户任务给出重建建议步骤。

例如：

- “保留‘问题→动作→结果→推荐’结构，但将问题改成用户产品对应场景”
- “保留结果先行 hook，但用用户自己的产品结果来重做”
- “弱化原视频中的强功效口吻，改成更稳妥的可视化表达”

---

## 参考分析逻辑

实际分析时，按以下顺序：

### 第一步：判断它靠什么抓人
是问题、结果、反差、人物、质地，还是情绪？

### 第二步：判断它靠什么让人信
是动作演示、close-up 结果、人物反馈、字幕解释，还是对比？

### 第三步：判断它靠什么让人买
是省力、效果、方便、日常高频、价格、推荐感，还是品牌感？

### 第四步：判断哪些东西可以迁移
优先迁移结构，而不是包装。

### 第五步：判断哪些东西必须替换
尤其是：

- 品牌要素
- 独特视觉识别
- 高风险 claim
- 平台语境梗
- 明显竞争素材痕迹

---

## 不同参考类型的分析重点

### 参考视频
重点：

- 节奏
- 画面变化
- 文案与画面配合
- hook / demo / CTA 结构
- 停留与证明机制

### 参考脚本
重点：

- 内容逻辑
- 口播组织
- 卖点排序
- CTA 方式

### 参考 storyboard / shot list
重点：

- 镜头功能
- 转场方式
- 构图与景别分布
- 信息密度

### 参考关键帧 / 图片
重点：

- 视觉风格
- 产品露出方式
- 场景构图
- 人物与产品关系
- 字幕空间

---

## AI 生成适配提醒

如果后续要把参考逻辑迁移到 AI 出图 / 图生视频，应特别提炼：

- 哪些镜头主体明确
- 哪些镜头动作清楚
- 哪些镜头容易形成关键帧
- 哪些镜头需要锁定人物或产品参考图
- 哪些原视频镜头在 AI 中不易稳定复现

---

## 合规与风格边界

参考分析中要特别提醒：

- 可以借结构，不要借未经证实的 claims
- 可以借节奏，不要借具体品牌识别
- 可以借场景逻辑，不要借未授权人物身份
- 可以借卖点呈现方式，不要借竞品数据与话术背书
- 避免输出“照着抄”的建议

---

## 示例

### 示例：参考清洁喷雾短视频

```yaml
reference_analysis:
  meta:
    reference_type:
      - "video"
      - "ad_creative"
    reference_summary: "一条清洁喷雾短视频，以厨房油污问题开场，接产品喷洒和擦净演示，最后用软推荐 CTA 收口"
    current_task_context: "将参考视频的节奏和证明结构迁移到用户自己的家居清洁产品"
    source_confidence: "high"
    assumptions:
      - "默认用户希望借鉴结构与表达方式，而非复刻品牌元素"
  structural_breakdown:
    overall_pattern: "问题开场 → 产品动作 → 擦拭结果 → 价值总结 → 软推荐 CTA"
    hook_type: "pain_point"
    demo_pattern: "problem_to_action_to_result"
    cta_pattern: "soft_recommendation"
    pacing_pattern: "前段抓问题，中段快切演示，结尾稳定收口"
  content_logic:
    primary_promise: "让厨房油污更容易处理"
    buyer_problem_addressed: "做完饭后台面油污难清理、费力"
    proof_mechanism:
      - "脏污问题近景"
      - "喷洒动作"
      - "擦拭过程"
      - "清洁后结果特写"
      - "人物主观反馈"
    conversion_path:
      - "先用高频问题建立代入"
      - "快速让产品进入画面"
      - "用擦净结果形成主要说服"
      - "补一句省力价值降低决策门槛"
      - "用温和推荐推动尝试"
  scene_patterns:
    recurring_shot_types:
      - "insert_detail"
      - "action_demo"
      - "before_after"
      - "talking_head"
      - "packshot_cta"
    visual_transitions:
      - "硬切问题到动作"
      - "通过擦拭动作切入结果镜头"
      - "结尾由人物手持产品稳定收口"
    text_overlay_style:
      - "大问题句"
      - "步骤型短字幕"
      - "结果强化词"
    presenter_usage: "人物负责真实感和推荐感，中段主要交给产品演示"
    product_usage_style: "产品在前段尽快进入，演示中持续参与，结尾再做清晰露出"
  transferable_elements:
    high_value:
      - "问题→动作→结果→推荐的结构闭环"
      - "用脏污近景快速建立痛点"
      - "喷洒与擦拭作为清晰的演示动作组合"
      - "结果后补一句省力价值"
    medium_value:
      - "人物只在关键位置出场，中段让结果镜头主导"
      - "字幕用短句而不是完整长句"
      - "结尾采用手持产品推荐而非强促销"
    low_value:
      - "原视频中特定厨房摆件风格"
      - "偶然性情绪停顿"
      - "平台背景音乐节奏点"
  non_transferable_elements:
    brand_locked:
      - "原产品包装设计"
      - "原品牌名称和标签视觉"
    ip_or_identity_risks:
      - "原出镜人物的脸部与个人风格"
      - "原视频中可识别品牌布局"
    claim_risks:
      - "若原视频存在过强‘一擦全净’表达，不应直接搬用"
      - "未经证实的效率或功效字样不应照搬"
    overfit_elements:
      - "原视频完全依赖特定出镜人语气成立"
      - "原产品专有使用场景不一定适合用户产品"
  adaptation_guidance:
    what_to_keep:
      - "保留问题开场与结果证明的核心逻辑"
      - "保留中段快切动作演示节奏"
      - "保留结尾软推荐的低压力收口方式"
    what_to_change:
      - "替换为用户自己产品的真实使用场景"
      - "替换人物、包装、字幕文案"
      - "弱化原视频中可能过强的绝对化效果措辞"
    how_to_rebuild_for_current_task:
      - "先找到用户产品最接近的高频痛点场景"
      - "保留‘问题→动作→结果’证明骨架"
      - "重新设计适配用户产品包装和卖点的演示镜头"
      - "将 CTA 改成更贴近用户目标人群的日常建议式收口"
  notes:
    - "该参考最值得学习的是证明链，而不是包装或人物风格本身"
    - "后续改写时应优先迁移节奏和结构，而非复制表层视觉元素"
```

---

## 必要时的补问规则

只有在“参考物”和“当前要做的任务”之间关系不清时，才允许一次性补问，优先问：

1. 你是想参考它的结构、节奏、口播方式，还是镜头感觉？
2. 你要改成你的什么产品/品牌/场景？
3. 哪些元素你想保留，哪些一定要换掉？
4. 是做真人口播版，还是纯产品 / AI 生成版？
5. 有没有明确不能碰的品牌、包装、人物元素？

如果不问也能从上下文合理推断，就直接输出结构化分析结果。

---

## 禁止事项

不要在本步骤中：

- 直接建议一比一照抄
- 只复述参考视频内容而不提炼结构
- 忽视品牌/IP/claim 风险
- 不区分可迁移与不可迁移元素
- 直接写完整新分镜而不先完成分析
- 因素材不完整就放弃输出可用分析

---

## 最终要求

本步骤必须输出一份 `reference_analysis` YAML，让后续步骤明确知道：

1. 这个参考真正值得学的是什么
2. 哪些结构和节奏可以迁移
3. 哪些元素不能直接复制
4. 如何根据当前任务重建成新的内容
5. 后续写脚本和分镜时应该保留什么、替换什么

即使参考素材信息不完整，也要尽量给出一个可用的结构分析初版，而不是只说“需要更多参考内容”。
