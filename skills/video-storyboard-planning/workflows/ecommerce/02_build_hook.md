# Build Hook

本步骤专门用于电商短视频场景下，设计并确定**前 1–3 秒的开头钩子（hook）**。这是带货视频最关键的结构之一，因为很多视频不是输在卖点不够，而是输在前几秒没人继续看。

这个步骤的任务不是生成整条脚本，也不是拆完整分镜，而是先把“为什么用户会停下来”的部分设计清楚，并输出可直接进入脚本/分镜的 hook 方案。

适用平台包括但不限于：

- TikTok
- 抖音
- Instagram Reels
- Shorts
- 电商信息流短视频

---

## 目标

基于 `selling_points`、`parsed_input`、`angle_definition` 或用户产品信息，输出：

1. 推荐的主 hook 策略
2. 2–5 个可选 hook 方向
3. 每个 hook 的观看驱动力
4. 每个 hook 的口播/字幕/画面建议
5. 哪个 hook 最适合当前产品与目标
6. 哪些 hook 不建议使用及原因
7. 后续脚本与分镜如何承接该 hook

---

## 核心原则

### 1. Hook 的任务是“拉停留”，不是“把所有卖点说完”

前 1–3 秒的目标只有一个：让用户愿意继续看。它不需要完整解释产品，只需要把最强的问题、结果、反差、利益或好奇心扔出来。

### 2. Hook 必须和后续内容闭环

不能做“骗停留”的假 hook。前段抛出的内容，后面必须被解释、证明或完成。

例如：

- 开头说“厨房油污终于不用使劲刷了”
- 后面必须真的展示省力和结果

### 3. Hook 应优先选择最容易视觉化的点

尤其电商视频中，强 hook 往往来自：

- 明显问题
- 明显结果
- 反差
- 大动作
- 日常高频痛点
- 一眼能懂的 before/after
- 低门槛高收益的利益点

### 4. 不同产品适合不同 hook，不要机械套模板

例如：

- 清洁类适合痛点、对比、结果
- 美妆类适合上脸结果、质地、变好看
- 家居类适合省空间、省时间、使用便利
- 厨具类适合效率提升、步骤简化
- 食品类适合口感反应、制作简单、食欲画面

### 5. Hook 必须适合平台节奏

短视频平台默认要求：

- 直接
- 快速
- 一眼懂
- 可以静音理解
- 字幕也能成立
- 最好在 1 秒内进入核心信息

---

## 输入依赖

本步骤可消费以下输入：

- `selling_points`
- `parsed_input`
- `angle_definition`
- 用户给出的产品信息
- 现有口播脚本
- 已有分镜/草案
- 市场研究中总结出的高表现创意方向

其中最重要的是：

- 主卖点
- 用户痛点
- 可视化结果
- 平台目标
- 视频用途（带货 / 广告 / 店铺内容 / 测试素材）

---

## 输出格式

本步骤统一输出 YAML，结构如下：

```yaml
hook_strategy:
  meta:
    product_name: ""
    category: ""
    target_platform: ""
    target_use_case: []
    source_angle: ""
    assumptions: []
  recommended_hook:
    name: ""
    hook_type: ""
    core_driver: ""
    why_best_fit: []
    opening_structure: []
    handoff_to_main_body: ""
  hook_options:
    - id: "H1"
      name: ""
      hook_type: ""
      core_driver: ""
      best_for: []
      spoken_line: ""
      alt_spoken_line: ""
      on_screen_text: ""
      visual_direction: ""
      pattern_interrupt: ""
      risk_note: ""
      handoff_note: ""
  rejected_hooks: []
  selection_criteria:
    strongest_stop_power: ""
    easiest_to_prove: ""
    safest_for_compliance: ""
    best_for_ai_generation: ""
  execution_notes: []
```

---

## `meta` 字段说明

### `product_name`
产品名。未知时可使用通用品类名。

### `category`
如：

- `cleaning_product`
- `skincare`
- `beauty_tool`
- `kitchen_gadget`
- `food_beverage`
- `home_organizer`

### `target_platform`
如：

- `tiktok`
- `douyin`
- `instagram_reels`
- `generic_ecommerce_short_video`

### `target_use_case`
数组，可包含：

- `conversion_video`
- `shop_content`
- `ugc_ad`
- `creative_test`
- `listing_video`

### `source_angle`
如已确定主创意 angle，则在此记录，例如：

- `pain_point_demo`
- `ugc_recommendation`
- `before_after_comparison`
- `result_first_reveal`

### `assumptions`
记录本步骤使用的默认假设。

---

## `recommended_hook` 字段说明

这是推荐主方案。

### `name`
给 hook 起一个清晰名称，例如：

- `pain_question_open`
- `result_first_open`
- `before_after_open`
- `effort_reduction_open`
- `ugc_confession_open`
- `texture_reveal_open`

### `hook_type`
建议值包括：

- `pain_point`
- `result_first`
- `comparison`
- `question_hook`
- `ugc_recommendation`
- `demo_action`
- `surprise_visual`
- `benefit_claim`
- `reaction_hook`

### `core_driver`
一句话说明这个 hook 让用户停下来的核心机制。

例如：

- “通过高频痛点问题快速建立共鸣”
- “直接先给结果，制造‘这是怎么做到的’好奇心”
- “用明显前后对比形成视觉停留”
- “用省力收益击中懒人/效率需求”

### `why_best_fit`
列出它为什么最适合当前产品和任务，建议 2–5 条。

### `opening_structure`
用步骤列出前 1–3 秒怎么组织，例如：

- “0.0–0.8s：先给脏污近景”
- “0.8–1.8s：口播提问 + 大字”
- “1.8–3.0s：产品动作入场”

### `handoff_to_main_body`
说明 hook 如何自然衔接后续脚本，例如：

- “从问题镜头直接切到产品喷洒动作”
- “从结果倒叙进入使用过程”
- “从对比定格切入演示解释”

---

## `hook_options` 字段说明

这是候选 hook 列表，建议给 2–5 个。

每个候选结构如下：

### `id`
如 `H1`, `H2`, `H3`。

### `name`
hook 名称，短而清楚。

### `hook_type`
使用统一类型标签。

### `core_driver`
该 hook 的观看驱动力。

### `best_for`
说明适用场景，例如：

- 强结果可视化产品
- 适合真人出镜
- 适合纯产品演示
- 适合 AI 出图
- 适合低时长快测素材

### `spoken_line`
主口播句。

要求：

- 能直接说出口
- 短
- 有停留感
- 不要解释太多

### `alt_spoken_line`
备选口播，尤其适合测试不同语气。

### `on_screen_text`
字幕大字版。通常比口播更短、更有扫读性。

### `visual_direction`
一句话说明画面该怎么开。

例如：

- “油污台面近景，手指划过脏污区域”
- “先给擦净后的对比结果，再倒回脏污状态”
- “人物对镜举起产品，表情像在分享私藏”

### `pattern_interrupt`
说明这个 hook 的打断感来自哪里，例如：

- 脏污反差
- 大字幕问题句
- 明显动作
- 结果先出
- 表情反应
- 包装异常近景
- 左右对比

### `risk_note`
写该 hook 的潜在风险，例如：

- 结果太强可能显得夸张
- 纯口播开场可能不够停留
- 对比需要真实画面支撑
- 易和同类素材撞钩子

### `handoff_note`
说明 hook 后怎么接主内容，避免断裂。

---

## `rejected_hooks`

列出不建议当前使用的 hook 类型及原因。

结构建议：

```yaml
rejected_hooks:
  - name: ""
    reason: ""
```

例如：

```yaml
rejected_hooks:
  - name: "slow_lifestyle_open"
    reason: "当前任务偏带货转化，慢生活方式开场停留力不足"
  - name: "heavy_claim_open"
    reason: "若没有强证据支持，强功效开场存在合规与信任风险"
```

---

## `selection_criteria`

帮助后续明确为什么选这个 hook。

### `strongest_stop_power`
哪个 hook 最能拉停留，为什么。

### `easiest_to_prove`
哪个 hook 最容易通过后续演示闭环证明。

### `safest_for_compliance`
哪个 hook 最稳妥，不容易踩风险。

### `best_for_ai_generation`
哪个 hook 最适合用 AI 出图/图生视频做出来。

---

## Hook 类型库

以下用于识别与命名，不是必须全部输出。

### 1. `pain_point`
从问题切入：

- “你家厨房也总这样吗？”
- “每次擦这个地方都最烦”

适合：

- 清洁
- 收纳
- 家居
- 厨具
- 工具

### 2. `result_first`
先给结果，再解释过程：

- “我现在都直接擦成这样”
- “这个效果我是真没想到”

适合：

- 有强前后变化的产品
- 快节奏投流素材

### 3. `comparison`
直接展示差异：

- 左右对比
- 使用前/使用后
- 普通方式 / 该产品方式

适合：

- 清洁
- 美妆
- 效率工具
- 厨房工具

### 4. `ugc_recommendation`
真实推荐口吻开场：

- “这个我最近真的一直在用”
- “家里最常拿出来的就是这个”

适合：

- 真人出镜
- UGC 风
- 需要信任感的产品

### 5. `demo_action`
直接上动作：

- 打开、喷、抹、穿、涂、切、收纳、折叠

适合：

- 产品动作一眼能懂
- AI 生成也容易做

### 6. `benefit_claim`
直接说收益：

- “真的省我很多时间”
- “这个步骤能省掉我以前最烦的一步”

适合：

- 厨具
- 清洁
- 效率工具
- 家居收纳

### 7. `reaction_hook`
先给惊讶/满意反应：

- “我第一次用的时候真的有点意外”
- “这个细节比我想的顺手很多”

适合：

- UGC
- 美妆
- 小家电
- 食品试吃

### 8. `texture_reveal`
先给质地或观感：

- 护肤品拉丝
- 粉底上脸
- 食品质感
- 面料质感

适合：

- 美妆
- 护肤
- 食品
- 服饰

---

## Hook 选择逻辑

选择推荐 hook 时，按以下优先级判断：

### 1. 是否最容易让人停下来
即是否能在 1 秒内被理解。

### 2. 是否和主卖点完全一致
hook 不应偏题。

### 3. 是否能被后续内容证明
否则会像标题党。

### 4. 是否适合当前输出方式
例如：

- 如果主要用于 AI 生成，优先画面明确的 hook
- 如果真人出镜，UGC 推荐型 hook 可以更强
- 如果产品强视觉结果明显，结果先行更优

### 5. 是否风险可控
优先低风险、高可信的 hook。

---

## 不同产品类型的默认 hook 倾向

### 清洁类
优先：

- 痛点
- 对比
- 结果先行
- 省力收益

### 护肤美妆类
优先：

- 质地
- 上脸结果
- 妆效变化
- 真实推荐
- 细节反应

### 厨具 / 家居工具类
优先：

- 省时间
- 一步到位
- 使用动作
- 对比旧方式

### 食品类
优先：

- 口感反应
- 食欲画面
- 制作简单
- 香气/拉丝/脆感等视觉结果

### 收纳整理类
优先：

- 杂乱到整齐
- 收纳前后
- 省空间
- 一步整理

---

## AI 生成适配原则

如果后续主要给 AI 出图 / 图生视频，hook 优先选择以下类型：

- 画面一眼清楚
- 主体单一
- 有明确动作
- 对比关系清晰
- 不依赖太长口播理解
- 易于留下字幕安全区

通常更适合 AI 生成的 hook：

- `result_first`
- `comparison`
- `demo_action`
- `pain_point`（若问题能视觉化）

相对更难生成稳定的 hook：

- 完全靠语气的纯口播
- 抽象概念型收益
- 需要复杂连续表演才能成立的反应型开头

---

## 合规与风险处理

hook 阶段尤其要避免：

- “100%有效”
- “根治/治愈”
- “全网第一”
- 无依据实验室背书
- 夸张失真的 before/after
- 恶意贬损竞品
- 夸大价格/收入/医疗结果

如果主卖点本身有风险，hook 应改为：

- 问题型
- 场景型
- 体验型
- 相对结果型

而不是直接用强 claim 冲开头。

---

## 示例

### 示例：厨房清洁喷雾

```yaml
hook_strategy:
  meta:
    product_name: "厨房清洁喷雾"
    category: "cleaning_product"
    target_platform: "generic_ecommerce_short_video"
    target_use_case:
      - "conversion_video"
      - "creative_test"
    source_angle: "pain_point_demo"
    assumptions:
      - "默认用于 TikTok / 抖音电商短视频"
      - "默认观众更容易被厨房油污问题和清洁结果吸引"
  recommended_hook:
    name: "pain_question_open"
    hook_type: "pain_point"
    core_driver: "用高频厨房油污痛点快速建立共鸣，让用户立刻代入自己的清洁烦恼"
    why_best_fit:
      - "与主卖点‘更容易清理油污’直接一致"
      - "问题场景一眼可懂，适合前1秒抓停留"
      - "后续可自然衔接产品喷洒与擦净证明"
      - "比纯口播推荐更适合当前清洁类产品的视觉证明"
    opening_structure:
      - "0.0-0.8s：脏污台面近景先出"
      - "0.8-1.8s：口播提出痛点问题"
      - "1.8-3.0s：产品动作入场，准备解决"
    handoff_to_main_body: "从油污问题镜头直接切到手持喷雾喷洒动作，进入解决方案演示"
  hook_options:
    - id: "H1"
      name: "pain_question_open"
      hook_type: "pain_point"
      core_driver: "高频问题共鸣"
      best_for:
        - "清洁类产品"
        - "问题明显的家庭场景"
        - "短时长转化素材"
      spoken_line: "每次做完饭，台面这层油真的太烦了。"
      alt_spoken_line: "你家厨房是不是也总擦不干净？"
      on_screen_text: "做完饭台面全是油？"
      visual_direction: "油污台面近景，脏污区域占据画面中心，顶部留字幕区"
      pattern_interrupt: "脏污问题画面 + 大字幕问题句"
      risk_note: "如果油污问题画面不够明显，停留力会下降"
      handoff_note: "问题镜头后立刻切产品喷洒动作，进入解决段"
    - id: "H2"
      name: "result_first_open"
      hook_type: "result_first"
      core_driver: "先给干净结果，制造‘怎么做到的’好奇心"
      best_for:
        - "结果变化明显"
        - "适合图生视频"
        - "快测信息流素材"
      spoken_line: "我现在做完饭，台面基本都是这样擦的。"
      alt_spoken_line: "这个效果我现在真离不开。"
      on_screen_text: "现在台面都这样擦"
      visual_direction: "先给擦净后的台面结果近景，再快速倒回脏污状态"
      pattern_interrupt: "结果先出形成反差"
      risk_note: "如果后续没有清楚解释过程，容易像空结果展示"
      handoff_note: "结果镜头后倒叙进入脏污状态和喷洒动作"
    - id: "H3"
      name: "effort_reduction_open"
      hook_type: "benefit_claim"
      core_driver: "用‘省力’打中不想费劲清洁的人"
      best_for:
        - "省时省力型产品"
        - "适合真人口播"
      spoken_line: "我现在擦厨房，真的懒得再来回猛刷了。"
      alt_spoken_line: "这种地方我现在都尽量用省力一点的方法。"
      on_screen_text: "不用再猛刷了"
      visual_direction: "人物一边看着油污台面一边准备拿出产品，语气像经验分享"
      pattern_interrupt: "直接利益点 + 人物真实语气"
      risk_note: "如果没有动作证明，容易只像主观感受"
      handoff_note: "口播后立即进入喷洒和轻松擦拭动作，证明省力"
  rejected_hooks:
    - name: "slow_lifestyle_open"
      reason: "当前任务偏带货转化，慢节奏生活方式开头停留力不足"
    - name: "heavy_claim_open"
      reason: "强功效开场若证据不足，容易带来信任与合规风险"
  selection_criteria:
    strongest_stop_power: "H1，因厨房油污问题一眼可懂，最容易建立用户代入"
    easiest_to_prove: "H1 和 H2，后续都可直接接喷洒与擦净结果镜头"
    safest_for_compliance: "H1，以问题切入相对稳妥，不依赖强功效承诺"
    best_for_ai_generation: "H2，结果先行和反差结构更适合视觉化生成"
  execution_notes:
    - "如果做多素材测试，可优先同时测试 H1 和 H2"
    - "若用于 AI 出图，建议 Hook 画面保留明确字幕安全区"
    - "Hook 后 1 秒内最好让产品入场，避免只停留在问题描述"
```

---

## 必要时的补问规则

只有在 hook 选择会因关键策略差异而明显变化时，才允许一次性补问，优先问：

1. 这条视频最想打的是结果、使用方便、省力，还是品牌质感？
2. 更偏真人口播 UGC，还是纯产品演示？
3. 主要用于拍摄、AI 出图、AI 视频，还是都要？
4. 有没有必须避开的敏感卖点表达？
5. 你更想做强问题钩子，还是强结果钩子？

如果不问也能给出合理建议，则直接输出主 hook 与候选 hook。

---

## 禁止事项

不要在本步骤中：

- 直接写整条脚本
- 直接拆完整分镜
- 只给一个 hook 而没有备选思路
- 给出无法被后续证明的 clickbait 式开头
- 用空泛词如“高级感开头”替代真实钩子机制
- 忽视平台节奏和静音观看需求
- 忽视合规风险
- 因信息不足而不输出初版 hook 策略

---

## 最终要求

本步骤必须输出一份 `hook_strategy` YAML，让后续脚本与分镜步骤明确知道：

1. 开头该怎么抓停留
2. 为什么这样抓
3. 有哪些可测试 hook 版本
4. 哪个版本最适合当前产品
5. hook 后如何自然进入主内容

即使输入信息有限，也必须给出可用初版，而不是只说“需要更多产品资料”。
