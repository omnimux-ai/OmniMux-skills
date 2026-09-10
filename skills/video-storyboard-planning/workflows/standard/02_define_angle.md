# Define Angle

本步骤负责在进入正式分镜拆解前，先确定这条视频的“创意角度（angle）”。这里的 angle 不是摄影机角度，而是**内容切入方式、说服路径与观看驱动力**。同一个脚本可以拆出完全不同的分镜，但只有先把 angle 定准，后续镜头节奏、画面组织、信息排序和转化表达才会稳定。

---

## 目标

基于 `parsed_input`，明确以下内容：

1. 这条视频的核心切入点
2. 用户最应该优先强调的说服路径
3. 前 3 秒的观看驱动力
4. 中段的证明逻辑
5. 结尾的行动驱动方式
6. 分镜应采用的内容节奏
7. 哪些创意路径不适合本次输入
8. 若存在多个可行 angle，如何排序与选用

---

## 核心定义

### 什么是 angle

angle 指的是观众为什么会继续看、为什么会信、为什么会行动的叙事与说服主线。

它通常不是“主题”，而是“主题怎么讲”。

例如同样是一个清洁喷雾：

- 痛点角度：为什么台面总擦不干净
- 结果角度：喷一下，油污立刻化开
- 对比角度：普通清洁 vs 这个喷雾
- 懒人角度：少刷少搓也能干净
- 家庭主妇角度：做完饭 30 秒收拾厨房
- 真实推荐角度：我最近一直在回购这个

这些都可能是不同的 angle。

---

## 工作原则

### 1. Angle 必须服务转化目标

优先选最有助于达成用户目标的 angle，而不是最“文艺”或最“炫”的 angle。

例如：

- 带货：优先结果、对比、使用门槛低、真实推荐
- 品牌感：可偏质感、生活方式、价值观
- AI 出图分镜：优先视觉清楚、证明链明确
- 客户审阅：优先结构直观、逻辑完整

### 2. Angle 必须和输入素材相匹配

不要硬选需要大量证据/场景支持的 angle，如果用户并没有提供相应信息。

例如：

- 没有真实用户反馈，就不要强做“社证型”
- 没有明显实验对比条件，就不要强做“极限实验型”
- 没有强视觉结果，就不要强做“视觉奇观型”

### 3. Angle 必须能转成镜头语言

好的 angle 一定能自然对应镜头结构，例如：

- 痛点型 → 问题镜头 + 演示 + 结果
- 对比型 → 左右对照 / 前后切换 / 同位对比
- 真实推荐型 → 口播 + 使用动作 + 反馈
- 质感型 → 微距 + 包装 + 场景氛围 + 使用细节

如果 angle 很难变成一组具体镜头，说明不够好。

### 4. 优先单一主 angle，必要时允许辅 angle

默认：

- 1 个主 angle
- 最多 1–2 个辅 angle

不要把一条 15–30 秒短视频塞成 5 种表达逻辑。

---

## 输入依赖

本步骤主要消费 `parsed_input`，特别关注以下字段：

- `user_goal`
- `deliverables`
- `platform`
- `usage_context`
- `duration`
- `style`
- `content_structure`
- `entities`
- `continuity_constraints`
- `assumptions`
- `compliance_flags`

---

## 输出格式

本步骤输出统一使用 YAML，结构如下：

```yaml
angle_definition:
  primary_angle:
    name: ""
    summary: ""
    why_fit: []
    risks: []
  supporting_angles: []
  rejected_angles: []
  persuasion_path:
    hook_driver: ""
    mid_proof_logic: []
    closing_drive: ""
  pacing_strategy:
    front_loaded: ""
    middle_flow: ""
    ending_style: ""
  visual_strategy:
    priority_frames: []
    de_emphasize: []
  messaging_priority:
    primary_messages: []
    secondary_messages: []
    avoid_messages: []
  platform_fit_notes: []
  execution_notes: []
```

---

## 字段说明

### `primary_angle`
当前推荐的主创意角度。

#### `name`
建议使用短且稳定的命名，例如：

- `pain_point_demo`
- `instant_result_proof`
- `before_after_comparison`
- `ugc_recommendation`
- `low_effort_solution`
- `premium_product_story`
- `texture_first_beauty`
- `routine_simplification`
- `problem_to_solution`
- `social_proof_recommendation`

#### `summary`
一句话概括这个 angle 是怎么打动用户的。

例如：

- “先把厨房油污痛点拉满，再用即时清洁结果完成说服”
- “通过真实口播推荐 + 使用细节，建立可信度与购买动机”
- “用明显前后对比，把效果可视化为核心卖点”

#### `why_fit`
列出它为什么适合这次输入，至少 2–4 条。

例如：

- 用户输入自带强痛点开头
- 产品效果适合视觉展示
- 目标是短视频转化而非品牌叙事
- 可在 15–20 秒内完成完整证明闭环

#### `risks`
列出采用该 angle 需要注意的问题，例如：

- 前后对比容易夸张失真
- 若镜头不够快，痛点段会拖沓
- 需要尽早露出产品，否则像泛内容视频
- 若只有口播没有演示，会削弱说服力

---

### `supporting_angles`
辅助 angle 数组。每个元素结构建议为：

```yaml
- name: ""
  role: ""
  use_when: ""
```

示例：

```yaml
supporting_angles:
  - name: "ugc_recommendation"
    role: "增强可信度"
    use_when: "主演口播出镜时，用于承接演示后的主观反馈"
  - name: "low_effort_solution"
    role: "降低决策门槛"
    use_when: "在结果展示后补一句省时省力的生活价值"
```

---

### `rejected_angles`
列出看似可行但本次不建议优先采用的 angle，帮助后续保持聚焦。

结构建议：

```yaml
- name: ""
  reason: ""
```

例如：

```yaml
rejected_angles:
  - name: "premium_lifestyle_story"
    reason: "当前输入更偏结果导向带货，不适合用慢节奏生活方式叙事"
  - name: "heavy_social_proof"
    reason: "未提供真实评价或权威证据，不宜把社证作为主角度"
```

---

## 说服路径设计

### `persuasion_path.hook_driver`
前 3 秒最主要的观看驱动力。要明确，不可模糊。

可选方向包括：

- 强痛点问题
- 强视觉结果
- 明显对比
- 出人意料动作
- 强利益点
- 真实推荐开场
- 高质感包装吸引

示例：

- “用脏污台面 + 反问句快速建立共鸣”
- “直接先给干净结果，再倒叙展示怎么做到”
- “先上左右对比，制造停留”

### `persuasion_path.mid_proof_logic`
中段如何让人相信。按顺序列出 2–5 个证明步骤。

例如：

```yaml
mid_proof_logic:
  - "展示产品喷洒动作，建立使用门槛低"
  - "展示污渍被擦净，证明即时结果"
  - "补一个近景特写，强调去污细节"
  - "用表情或口播反馈补充主观体验"
```

### `persuasion_path.closing_drive`
结尾如何推动行动。例如：

- “以省时省力总结并直接导向下单”
- “用回购口吻增强信任后给 CTA”
- “用包装 hero shot + 价格/优惠信息完成收口”

---

## 节奏策略

### `pacing_strategy.front_loaded`
说明前段策略：

- 强钩子直入
- 结果先行
- 提问开场
- 对比开场
- 人脸开场
- 产品开场

### `pacing_strategy.middle_flow`
说明中段镜头组织方式，例如：

- 演示驱动
- 对比驱动
- 口播 + 插镜混合
- 微距细节递进
- 快切证明链

### `pacing_strategy.ending_style`
说明结尾风格，例如：

- 直接 CTA
- 柔和收口
- packshot 定格
- 结果回扣
- 口播总结 + 行动召唤

---

## 视觉策略

### `visual_strategy.priority_frames`
明确在分镜中必须重点做强的画面类型，例如：

- before/after 对比
- 产品喷洒动作
- 污渍变化特写
- 主播反应特写
- 产品包装 hero shot
- 使用步骤 top-down

### `visual_strategy.de_emphasize`
明确不应花太多时长的画面，例如：

- 纯站桩口播
- 无信息量空镜
- 纯氛围镜头
- 过长的包装旋转
- 与结果无关的装饰性过场

---

## 信息优先级

### `messaging_priority.primary_messages`
必须优先传达的 1–3 个信息点。

例如：

- “去污效果直观可见”
- “使用简单、省力”
- “适合厨房重油污场景”

### `messaging_priority.secondary_messages`
可以辅助但不应抢主叙事的信息，例如：

- “气味清新”
- “包装好看”
- “适合日常囤货”

### `messaging_priority.avoid_messages`
当前不建议强调的内容，可能因为证据不足、分散注意力或存在风险。

例如：

- “全网第一”
- “绝对无毒”
- “适合所有污渍类型”
- “医学级杀菌效果”

---

## Angle 选择逻辑

在多个 angle 都可行时，按以下优先级排序：

### 1. 是否最符合用户目标
例如带货视频优先能促转化的角度。

### 2. 是否最符合现有素材
例如已有明显对比条件，就优先对比角度。

### 3. 是否最利于短视频前 3 秒停留
例如强反差/强结果优先于平铺直叙。

### 4. 是否最容易落地执行
例如能拍、能剪、能生成、能维持一致性。

### 5. 是否合规风险更低
例如没有真实证据时，避免强实验和夸张社证。

---

## 常见 angle 模板库

以下不是固定套用，而是供识别和命名参考。

### 带货 / 电商常见

- `pain_point_demo`
- `instant_result_proof`
- `before_after_comparison`
- `ugc_recommendation`
- `problem_to_solution`
- `low_effort_solution`
- `myth_busting_demo`
- `why_i_switched`
- `routine_upgrade`
- `3_benefits_fast`

### 美妆 / 护肤常见

- `texture_first_beauty`
- `routine_simplification`
- `finish_reveal`
- `application_proof`
- `premium_sensory_story`

### 家居 / 清洁常见

- `mess_to_clean_transformation`
- `time_saving_solution`
- `stubborn_stain_test`
- `side_by_side_cleaning`

### 食品 / 保健常见

- `ingredient_confidence`
- `easy_daily_habit`
- `taste_reaction_first`
- `prep_to_enjoy`

---

## 平台适配考虑

### TikTok / 抖音
倾向：

- 更快节奏
- 更强前置钩子
- 更直给结果
- 更早露出产品
- 更明确字幕配合

### Instagram Reels
可略多一点生活方式感，但依然需简洁。

### AI 出图 / 图生视频用途
应优先：

- 画面清晰度
- 主体单一明确
- 易于连续一致
- 便于生成模型理解

---

## 合规与风险考量

如果 `parsed_input.compliance_flags` 中存在风险，本步骤要在 `primary_angle.risks` 或 `execution_notes` 中体现其对创意角度的影响。

例如：

- 若存在 `before_after_risk`，应避免 angle 过度依赖夸张前后反差
- 若存在 `medical_claim`，应避免把疗效证明做成主 angle
- 若存在 `brand_identity_unclear`，应避免大量包装特写作为唯一说服核心
- 若存在 `absolute_claim`，应减少“瞬间解决一切”的表达强度

---

## 示例

### 示例 1：清洁喷雾带货

```yaml
angle_definition:
  primary_angle:
    name: "pain_point_demo"
    summary: "从厨房油污难清理的痛点切入，用即时喷洒擦净的结果完成说服"
    why_fit:
      - "输入内容天然包含问题到解决方案的结构"
      - "产品效果适合用演示镜头证明"
      - "适合 15-20 秒内建立完整转化闭环"
      - "便于同时兼容真人口播与插入特写"
    risks:
      - "若痛点铺垫过长，会削弱前3秒节奏"
      - "若清洁结果不够清楚，演示说服力会不足"
      - "需避免绝对化清洁表达过强"
  supporting_angles:
    - name: "low_effort_solution"
      role: "降低使用门槛"
      use_when: "在演示后强调省时省力、无需用力刷"
    - name: "ugc_recommendation"
      role: "增强真实可信感"
      use_when: "由出镜人物补充主观使用反馈时"
  rejected_angles:
    - name: "premium_lifestyle_story"
      reason: "当前任务偏转化带货，不宜牺牲结果展示去换慢节奏氛围"
    - name: "heavy_social_proof"
      reason: "未提供足够真实评价与数据支持，不适合作为主说服路径"
  persuasion_path:
    hook_driver: "用油污台面和提问句快速激发共鸣与停留"
    mid_proof_logic:
      - "先展示脏污问题"
      - "再展示喷洒动作，强调使用简单"
      - "再给擦拭后的直观结果"
      - "补一个近景细节证明不是假干净"
      - "最后由人物口播总结省力体验"
    closing_drive: "以省时省力的生活价值收口，并直接导向下单 CTA"
  pacing_strategy:
    front_loaded: "强痛点开场，1秒内建立问题"
    middle_flow: "快切演示驱动，中间用结果镜头做证明核心"
    ending_style: "产品 packshot + 直接 CTA 收尾"
  visual_strategy:
    priority_frames:
      - "脏污台面问题镜头"
      - "喷洒动作近景"
      - "擦净结果对比镜头"
      - "产品包装 hero shot"
    de_emphasize:
      - "长时间站桩口播"
      - "纯氛围厨房空镜"
      - "与清洁结果无关的生活方式过场"
  messaging_priority:
    primary_messages:
      - "去污结果清晰可见"
      - "使用步骤简单"
      - "省时省力"
    secondary_messages:
      - "适合家庭日常清洁"
      - "真实使用感受不错"
    avoid_messages:
      - "一瓶解决所有清洁问题"
      - "绝对安全无刺激"
      - "全网第一去污效果"
  platform_fit_notes:
    - "适合 TikTok/抖音前3秒强钩子逻辑"
    - "应尽早露出产品与结果，避免像纯生活内容"
  execution_notes:
    - "后续分镜应把结果展示放在中段最强位置"
    - "字幕应配合痛点问题句和结果句，增强静音观看理解"
    - "若用于 AI 生成，应优先保证产品包装与台面场景连续性"
```

---

## 必要时的补问规则

如果 angle 确实会因关键信息不同而发生重大变化，才允许补问一次。优先补问：

1. 这条视频更偏带货转化，还是品牌质感展示？
2. 更希望像真实 UGC，还是更像精致广告？
3. 主要给真人拍摄、AI 出图，还是 AI 视频生成？
4. 是否必须突出某一个卖点，而不是平均讲全部卖点？

如果不问也能合理判断，则直接给出主 angle，并把判断依据写入 `why_fit` 与 `assumptions`。

---

## 禁止事项

不要在本步骤中：

- 直接输出完整分镜
- 直接写逐镜头 YAML
- 只给“高级感/氛围感”这类空泛风格词而没有说服逻辑
- 同时指定太多互相冲突的 angle
- 忽略用户目标而选一个自嗨创意
- 把证据不足的说法当成主证明路径
- 输出无法转成镜头语言的抽象表达

---

## 最终要求

本步骤的最终输出必须是一份 `angle_definition` YAML，清楚回答：

- 这条视频应该怎么切入
- 为什么这么切入
- 说服路径如何展开
- 哪些内容应该突出
- 哪些内容不该抢戏
- 后续分镜应朝什么方向执行

如果输入不完整，也要给出一个有依据的主 angle 初版，并明确写出采用该 angle 的理由与风险。
