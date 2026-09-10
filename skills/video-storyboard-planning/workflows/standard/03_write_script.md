# Write Script

本步骤负责在正式拆分镜头前，生成或整理一份**可分镜化脚本（shootable script）**。如果用户已经提供完整脚本，则本步骤的任务是**规范化、补齐节拍、增强可拍性与可视化表达**；如果用户只提供提纲、口播、卖点或粗略创意，则本步骤需要先基于 `parsed_input` 和 `angle_definition` 生成一份适合短视频分镜的脚本初稿。

这个步骤的目标不是产出最终镜头表，而是产出一份**对后续分镜拆解友好**的脚本文本结构。

---

## 目标

将输入整理为可供后续分镜使用的结构化脚本，至少明确：

1. 视频总目标
2. 脚本主 angle
3. 段落节拍（hook / problem / demo / proof / CTA 等）
4. 每段的核心信息
5. 每段建议时长
6. 口播/字幕/画面动作之间的关系
7. 产品出现时机
8. 结果展示时机
9. CTA 落点
10. 需避免的表达风险

---

## 适用场景

本步骤适用于：

- 用户给了完整文案，但还没有节拍化
- 用户给了口播稿，需要整理成更适合分镜的脚本
- 用户只给卖点，需要补成短视频脚本
- 用户给了粗略创意，需要整理成镜头前的脚本骨架
- 用户已有分镜方向，但缺一份便于审核的脚本版

如果输入已经是极完整、可直接拆镜头的脚本，本步骤仍需要做一次规范化整理，不能直接跳过。

---

## 核心原则

### 1. 脚本是“给分镜服务”的，不是纯文案

脚本必须天然适合被拆成镜头，因此应优先考虑：

- 是否容易视觉化
- 是否有清晰节拍
- 是否每段只表达一个核心点
- 是否适合短视频速度
- 是否能支持后续口播、字幕、动作同步

不要写成只适合读、不适合拍的广告文案。

### 2. Angle 决定脚本结构

脚本结构必须服从 `angle_definition.primary_angle`。

例如：

- `pain_point_demo` → 问题 → 动作 → 结果 → CTA
- `ugc_recommendation` → 真实推荐 → 使用展示 → 主观反馈 → CTA
- `before_after_comparison` → 对比结果 → 使用过程 → 差异说明 → CTA
- `premium_product_story` → 氛围开场 → 产品细节 → 使用体验 → 品牌式收口

不要写出与主 angle 相冲突的脚本。

### 3. 短视频脚本必须前置有效信息

默认要求：

- 前 1–3 秒就进入核心驱动力
- 产品尽量早点出现
- 不要铺垫太久
- 不要连着多句抽象口播没有画面支撑
- 不要把 CTA 拖到信息结束以后才勉强补一句

### 4. 口播、字幕、画面动作要能对应

脚本不是只有“台词”。每一段至少要让后续分镜知道：

- 这一段谁在说 / 是否无口播
- 说什么
- 屏幕上应该出现什么重点字
- 画面此时在证明什么

### 5. 优先短句、强动词、强结果

尤其是带货、演示、短视频场景下，脚本应尽量：

- 句子短
- 信息直接
- 主语清楚
- 行动明确
- 结果可感知

---

## 输入依赖

本步骤主要基于：

- `parsed_input`
- `angle_definition`

尤其关注：

- `user_goal`
- `deliverables`
- `platform`
- `duration`
- `style`
- `content_structure`
- `entities`
- `output_preferences`
- `assumptions`
- `compliance_flags`
- `primary_angle`
- `persuasion_path`
- `messaging_priority`

---

## 输出格式

本步骤统一输出 YAML，结构如下：

```yaml
shootable_script:
  meta:
    objective: ""
    primary_angle: ""
    platform: ""
    total_duration_sec: 0
    aspect_ratio: "9:16"
    language: ""
    style: []
    assumptions: []
    compliance_notes: []
  structure:
    total_beats: 0
    pacing_summary: ""
    product_first_appears_sec: 0
    result_first_appears_sec: 0
    cta_window_sec: ""
  beats:
    - beat_id: "B01"
      label: "hook"
      start_sec: 0
      end_sec: 0
      duration_sec: 0
      goal: ""
      spoken_line: ""
      alt_spoken_line: ""
      on_screen_text: ""
      visual_intent: ""
      product_presence: ""
      proof_type: ""
      transition_note: ""
      risk_note: ""
  full_script_readable: []
  revision_notes: []
```

---

## 字段说明

### `meta`
记录脚本层面的总体信息。

#### `objective`
一句话描述该脚本的核心目的。

例如：

- “通过快速演示厨房去污效果，推动清洁喷雾下单转化”
- “用真实推荐 + 使用过程展示提升产品可信度与购买意图”

#### `primary_angle`
直接复用主 angle 名称，例如：

- `pain_point_demo`
- `ugc_recommendation`
- `before_after_comparison`

#### `platform`
如：

- `tiktok`
- `douyin`
- `generic_short_video`

#### `total_duration_sec`
脚本建议总时长。

#### `aspect_ratio`
默认 `9:16`。

#### `language`
脚本语言。

#### `style`
数组形式列出风格关键词，例如：

- `ugc`
- `demo_driven`
- `fast_paced`

#### `assumptions`
继承并补充假设项。

#### `compliance_notes`
只写简短风险提示，不展开长篇解释。

---

### `structure`
概括脚本结构层次。

#### `total_beats`
段落数量，不等于最终镜头数。

#### `pacing_summary`
一句话描述脚本节奏，例如：

- “前 3 秒强痛点 + 中段演示快切 + 结尾直接 CTA”
- “结果先行 + 倒叙解释 + 包装收口”

#### `product_first_appears_sec`
产品第一次明确出现的时间点。

#### `result_first_appears_sec`
结果/效果第一次明确出现的时间点。

#### `cta_window_sec`
CTA 建议出现区间，例如：

- `"12-15"`
- `"18-22"`

---

## `beats` 段落拆分规则

每个 `beat` 是脚本层级的“信息单元”，比镜头粗一级，但必须能被拆镜头。

### 建议标签

优先使用以下 `label`：

- `hook`
- `problem`
- `setup`
- `demo`
- `benefit`
- `proof`
- `comparison`
- `social_proof`
- `offer`
- `cta`
- `closing`

不要求每条视频都有全部标签。

### 时间要求

- `start_sec` / `end_sec` / `duration_sec` 必须合理
- 各段时长加总应接近总时长
- 短视频默认不要长篇大段口播

### 每个 beat 至少要写清：

#### `goal`
这一段要完成什么，例如：

- 建立痛点共鸣
- 展示使用动作
- 证明结果真实
- 总结利益点
- 触发行动

#### `spoken_line`
推荐主口播/旁白文本。

要求：

- 可直接说出口
- 短视频语感
- 与画面互补

#### `alt_spoken_line`
可选备选说法。若不需要可留空，但推荐在关键 hook 或 CTA 给一版备选。

#### `on_screen_text`
屏幕大字 / 字幕重点，必须更短、更狠、更好扫读。

#### `visual_intent`
说明这段画面应该证明什么，而不是直接写完整镜头。

例如：

- “先展示台面油污，快速建立脏乱问题”
- “用喷洒 + 擦拭动作证明操作简单”
- “给清洁前后近景差异，强化结果可信度”

#### `product_presence`
说明产品在这一段的出现方式，例如：

- `not_visible`
- `teased`
- `held_in_hand`
- `actively_used`
- `hero_visible`
- `background_only`

#### `proof_type`
说明这一段主要用什么类型说服：

- `visual_demo`
- `spoken_claim`
- `reaction`
- `comparison`
- `social_proof`
- `packshot`
- `benefit_summary`

#### `transition_note`
说明与下一段如何衔接，例如：

- “从问题近景切到拿出产品动作”
- “通过擦拭动作自然进入结果镜头”
- “结果后补一条主观反馈，再收 CTA”

#### `risk_note`
如有风险则标注，例如：

- “避免把效果说成对所有污渍都适用”
- “前后对比需避免过度夸张”
- “若无证据，不宜强调杀菌/医疗级效果”

---

## `full_script_readable`

在 YAML 的 `beats` 之外，再补一版顺读脚本，便于人审阅。

建议数组形式，每段一条，例如：

```yaml
full_script_readable:
  - "[Hook 0-2s] 每次做完饭，台面这层油真的很烦。"
  - "[Demo 2-6s] 我现在都会直接喷这个，等几秒，再一擦。"
  - "[Proof 6-10s] 你看，油污一下就被带走，连缝里都干净很多。"
  - "[Benefit 10-13s] 不用来回猛刷，省力太多。"
  - "[CTA 13-15s] 家里厨房总有这种重油污的，真的可以试试。"
```

要求：

- 可读性强
- 与 `beats` 一致
- 方便用户快速把握整体节奏

---

## 脚本生成逻辑

### 情况 A：用户提供完整脚本
本步骤应：

1. 保留原意
2. 压缩冗余
3. 增强节拍感
4. 补齐缺失的结果展示段
5. 补齐 CTA 落点
6. 必要时给出更适合口播的短句版本

### 情况 B：用户只提供口播
本步骤应：

1. 提炼信息顺序
2. 切成可拍节拍
3. 补上视觉意图
4. 适当缩短句子
5. 强化前 3 秒

### 情况 C：用户只给卖点/提纲
本步骤应：

1. 先按主 angle 组织顺序
2. 生成短视频可说的脚本
3. 确保有 hook / 证明 / CTA
4. 不要写得像长广告词

### 情况 D：用户只给粗略创意
本步骤应：

1. 先将创意整理成“观看驱动 + 展示逻辑 + CTA”
2. 再写出极简但能分镜的脚本骨架
3. 明确假设项

---

## 不同 angle 的脚本组织建议

### `pain_point_demo`
推荐顺序：

1. 痛点钩子
2. 问题场景
3. 拿出产品
4. 使用动作
5. 结果展示
6. 利益总结
7. CTA

### `ugc_recommendation`
推荐顺序：

1. 真实推荐开头
2. 产品出场
3. 使用动作
4. 主观体验
5. 小结果
6. CTA

### `before_after_comparison`
推荐顺序：

1. 对比先行
2. 快速解释怎么做
3. 使用过程
4. 再次对比确认
5. CTA

### `premium_product_story`
推荐顺序：

1. 氛围或产品质感开场
2. 使用细节
3. 感官体验
4. 核心价值点
5. 品牌式收口

---

## 节奏控制建议

### 10–15 秒
适合：

- 4–6 个 beats
- 强钩子
- 少解释
- 结果快出
- CTA 直接

### 15–20 秒
适合：

- 5–7 个 beats
- 一轮完整演示
- 一条主要利益点
- 一条清晰 CTA

### 20–30 秒
适合：

- 6–8 个 beats
- 可加入更多证明与补充利益点
- 但不能失去前段节奏

---

## 语言风格要求

### 带货型
- 直接
- 短句
- 强动词
- 强结果
- 少空话

### 质感型
- 依然要简洁
- 不要堆砌华丽形容词
- 优先视觉可感知的描述

### UGC 型
- 像真实人会说的话
- 不要官话
- 不要“企业宣传稿”腔调

---

## 合规处理要求

如果存在 `compliance_flags`，脚本阶段应做轻量处理：

### 可做的处理
- 把绝对化表达改成相对温和版本
- 避免写出无法证实的强 claim
- 对前后对比保持真实描述
- 不编造实验、销量、认证、专家背书

### 不能做的事
- 不要伪造证据
- 不要写“治愈、根除、100%有效”等高风险表达
- 不要把用户未提供的奖项/认证加入脚本

例如把：

- “一喷全干净”
改为：
- “喷上去再擦，日常油污会好清很多”

---

## 示例

### 示例：清洁喷雾

```yaml
shootable_script:
  meta:
    objective: "通过油污清洁演示推动厨房清洁喷雾转化"
    primary_angle: "pain_point_demo"
    platform: "generic_short_video"
    total_duration_sec: 15
    aspect_ratio: "9:16"
    language: "zh-CN"
    style:
      - "ugc"
      - "demo_driven"
      - "fast_paced"
    assumptions:
      - "默认用于 TikTok/抖音竖屏短视频"
      - "默认场景为家庭厨房"
    compliance_notes:
      - "避免绝对化去污表达"
  structure:
    total_beats: 5
    pacing_summary: "前2秒痛点钩子，中段快切演示，结尾直接CTA"
    product_first_appears_sec: 2
    result_first_appears_sec: 6
    cta_window_sec: "12-15"
  beats:
    - beat_id: "B01"
      label: "hook"
      start_sec: 0
      end_sec: 2
      duration_sec: 2
      goal: "快速建立厨房油污痛点，拉住停留"
      spoken_line: "每次做完饭，台面这层油真的太烦了。"
      alt_spoken_line: "你家厨房是不是也总擦不干净？"
      on_screen_text: "做完饭台面全是油？"
      visual_intent: "快速展示带油污的厨房台面，让问题一眼可见"
      product_presence: "not_visible"
      proof_type: "spoken_claim"
      transition_note: "从脏污近景切到拿出产品"
      risk_note: ""
    - beat_id: "B02"
      label: "demo"
      start_sec: 2
      end_sec: 6
      duration_sec: 4
      goal: "展示产品使用方式简单"
      spoken_line: "我现在都直接喷这个，等几秒，再一擦。"
      alt_spoken_line: "喷上去放几秒，再擦就轻松很多。"
      on_screen_text: "喷一喷，等几秒"
      visual_intent: "展示拿出喷雾、喷洒台面、抹布准备擦拭的连续动作"
      product_presence: "actively_used"
      proof_type: "visual_demo"
      transition_note: "擦拭动作直接带出结果画面"
      risk_note: ""
    - beat_id: "B03"
      label: "proof"
      start_sec: 6
      end_sec: 10
      duration_sec: 4
      goal: "让观众看懂清洁结果"
      spoken_line: "你看，油污一下就被带走，台面干净很多。"
      alt_spoken_line: "这种日常油污，擦完真的清爽不少。"
      on_screen_text: "擦完干净很多"
      visual_intent: "用近景展示擦拭后的明显变化，强化结果可信度"
      product_presence: "background_only"
      proof_type: "comparison"
      transition_note: "结果镜头后补人物主观反馈"
      risk_note: "避免使用过强绝对化清洁表述"
    - beat_id: "B04"
      label: "benefit"
      start_sec: 10
      end_sec: 12
      duration_sec: 2
      goal: "补充省力这个生活利益点"
      spoken_line: "关键是真的不用来回猛刷，省力太多。"
      alt_spoken_line: "不用死命擦，日常清洁轻松很多。"
      on_screen_text: "省力很多"
      visual_intent: "用轻松擦拭完成后的状态或人物放松反应强化使用体验"
      product_presence: "held_in_hand"
      proof_type: "reaction"
      transition_note: "接产品包装镜头或对镜 CTA"
      risk_note: ""
    - beat_id: "B05"
      label: "cta"
      start_sec: 12
      end_sec: 15
      duration_sec: 3
      goal: "明确导向尝试或下单"
      spoken_line: "家里厨房总有这种油污的，真的可以试试这个。"
      alt_spoken_line: "如果你也嫌厨房难打理，这种真的值得备一瓶。"
      on_screen_text: "厨房清洁试试它"
      visual_intent: "产品包装清晰露出，作为最终收口镜头"
      product_presence: "hero_visible"
      proof_type: "packshot"
      transition_note: "结尾定格或轻推近收尾"
      risk_note: ""
  full_script_readable:
    - "[Hook 0-2s] 每次做完饭，台面这层油真的太烦了。"
    - "[Demo 2-6s] 我现在都直接喷这个，等几秒，再一擦。"
    - "[Proof 6-10s] 你看，油污一下就被带走，台面干净很多。"
    - "[Benefit 10-12s] 关键是真的不用来回猛刷，省力太多。"
    - "[CTA 12-15s] 家里厨房总有这种油污的，真的可以试试这个。"
  revision_notes:
    - "已将原始口播整理为适合快节奏演示视频的五段结构"
    - "已把结果展示前置到中段核心位置"
    - "已弱化过强绝对化表述，便于后续合规处理"
```

---

## 必要时的补问规则

只有在脚本形态会因关键信息不同而显著变化时，才允许补问一次，优先问：

1. 这条视频更偏带货转化还是品牌展示？
2. 期望时长是多少秒？
3. 更像真实 UGC，还是更精致商拍？
4. 主要用于拍摄、AI 出图、AI 视频，还是都要？
5. 是否有必须保留的原始台词或品牌话术？

如果不问也能写出合理脚本，就直接输出，并在 `assumptions` 中说明。

---

## 禁止事项

不要在本步骤中：

- 直接写最终逐镜头分镜 YAML
- 用长篇广告腔文案替代可拍脚本
- 没有时间节拍
- 没有口播与画面关系
- 没有产品出现时机
- 没有 CTA
- 把所有卖点都平均堆进去
- 编造品牌事实、销量、认证、用户评价
- 写出明显高风险 claim 而不标注风险
- 因输入不完整而放弃给初版

---

## 最终要求

本步骤必须输出一份 `shootable_script` YAML，让后续步骤可以稳定地将其拆成镜头。即使用户只给了很短的一句话创意，也要尽量产出：

1. 清晰的段落节拍
2. 简洁可说的口播
3. 对应的画面意图
4. 产品与结果出现时机
5. CTA 收口方式
6. 必要的假设与风险说明

脚本的最终标准是：既能给人读懂，也能被顺利拆成高质量短视频分镜。
