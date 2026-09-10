# Commerce Check

本步骤用于在电商短视频 storyboard / 脚本 / prompt 产出后，进行一轮**商业转化导向检查（commerce check）**。它不是泛泛的质量审阅，也不是法律合规审查替代，而是专门检查这条内容是否真的具备“带货能力”和“电商适配度”。

很多内容看起来完整，也有镜头、有字幕、有 prompt，但商业结果不好，常见问题包括：

- 前 3 秒没抓住高购买意图人群
- 产品出现太晚
- 镜头好看但不卖货
- 结果不清楚，证明不成立
- CTA 太弱
- 卖点顺序不对
- 包装识别度不够
- 静音观看时不知在卖什么
- 提示词更像品牌片，不像转化素材

本步骤的任务是：从“是否更容易出单”的角度，给出结构化判断与修正建议。

---

## 目标

基于已有输出（如 `selling_points`、`hook_strategy`、`demo_sequence`、`cta_sequence`、`shootable_script`、`storyboard`、`prompt_package`），完成以下检查：

1. 是否抓住了最强购买理由
2. 是否优先展示了最值得卖的点
3. 前 3 秒是否对电商有效
4. 产品是否足够早、足够清楚地出现
5. 演示是否构成可信证明链
6. CTA 是否自然且有行动推动力
7. 是否适合 TikTok / 抖音等短视频电商场景
8. 是否适合静音观看
9. 是否适合 AI 生成或拍摄执行为“卖货素材”
10. 当前版本最影响转化的缺口是什么
11. 哪些地方最值得优先优化

---

## 核心原则

### 1. 商业检查的标准是“更容易转化”，不是“更好看”

即使内容很精致，但如果：

- 产品太晚出现
- 看完不知道卖什么
- 没有证明
- CTA 不明确
- 字幕不传达核心利益

那依然商业表现不佳。

### 2. 优先检查“卖货关键链路”是否完整

默认一条电商视频至少应有这条链路：

- 停留（hook）
- 理解（问题/场景）
- 证明（demo/result）
- 信任（真实感/可理解）
- 行动（CTA）

如果断了一环，商业效果通常会受影响。

### 3. 电商素材要优先“看得懂、记得住、信得过”

尤其在短视频平台里，观众停留时间短，默认要优先：

- 一眼懂问题或结果
- 一眼识别产品
- 一眼看见卖点
- 一眼知道该不该继续看

### 4. 不把“信息多”误当成“转化强”

讲 8 个卖点不一定比讲 2 个卖点更好。电商视频通常更需要：

- 主卖点突出
- 次卖点辅助
- 证明清楚
- 节奏集中

### 5. 商业检查必须和平台使用场景挂钩

TikTok / 抖音 / Reels 带货短视频通常要求：

- 前 1–3 秒抓人
- 竖屏 9:16
- 产品早出
- 字幕大而可扫读
- 画面上能看懂价值
- CTA 不拖沓

---

## 输入依赖

本步骤优先消费：

- `selling_points`
- `hook_strategy`
- `demo_sequence`
- `cta_sequence`
- `shootable_script`
- `storyboard`
- `prompt_package`

如果不是全量提供，也要基于已有内容做尽可能完整的商业检查。

---

## 输出格式

本步骤统一输出 YAML，并在最后追加一个简短 Markdown 商业诊断表。

标准结构如下：

```yaml
commerce_check:
  meta:
    review_scope: []
    target_platform: ""
    commerce_goal: ""
    overall_commerce_readiness: ""
    confidence: ""
  purchase_reason_check:
    primary_reason_to_buy: ""
    clearly_expressed: ""
    visually_proven: ""
    notes: []
  hook_effectiveness:
    stop_power: ""
    relevance_to_buyer: ""
    product_relevance: ""
    notes: []
  product_presence_check:
    appears_early_enough: ""
    packaging_readability: ""
    visibility_during_key_moments: ""
    notes: []
  proof_chain_check:
    problem_clarity: ""
    demo_clarity: ""
    result_clarity: ""
    believability: ""
    notes: []
  conversion_clarity_check:
    message_focus: ""
    benefit_hierarchy: ""
    cta_strength: ""
    silent_viewing_clarity: ""
    notes: []
  format_fit_check:
    short_video_native: ""
    ecommerce_native: ""
    ai_generation_fit: ""
    human_shoot_fit: ""
    notes: []
  top_conversion_risks: []
  optimization_priorities:
    must_improve: []
    should_improve: []
    optional_tests: []
  final_assessment:
    verdict: ""
    rationale: []
```

---

## `meta` 字段说明

### `review_scope`
列出本次实际检查了哪些对象，例如：

- `selling_points`
- `hook_strategy`
- `demo_sequence`
- `cta_sequence`
- `shootable_script`
- `storyboard`
- `prompt_package`

### `target_platform`
如：

- `tiktok`
- `douyin`
- `generic_ecommerce_short_video`

### `commerce_goal`
一句话说明该内容的商业目标，例如：

- “推动短视频带货转化”
- “提升店铺产品兴趣和点击意愿”
- “生成可测试的电商广告素材”

### `overall_commerce_readiness`
建议值：

- `strong`
- `usable_with_optimizations`
- `weak_for_conversion`
- `not_ready_for_commerce`

### `confidence`
建议值：

- `high`
- `medium`
- `low`

---

## 购买理由检查

### `purchase_reason_check.primary_reason_to_buy`
识别这条视频最终是否清楚回答了：用户为什么要买？

例如：

- “更容易处理厨房油污”
- “更省力、更省时间”
- “上脸妆效更服帖”
- “让收纳更整齐省空间”

### `clearly_expressed`
建议值：

- `yes`
- `partial`
- `no`

### `visually_proven`
建议值：

- `strong`
- `medium`
- `weak`

### `notes`
指出：

- 是否主卖点清楚
- 是否太分散
- 是否只口播没证明
- 是否卖点和购买理由脱节

---

## Hook 有效性检查

### `hook_effectiveness.stop_power`
判断前 1–3 秒是否足以拉停留。

建议值：

- `strong`
- `medium`
- `weak`

### `relevance_to_buyer`
判断 hook 是否和高意向买家相关，而不是泛娱乐。

### `product_relevance`
判断 hook 是否真的与产品和卖点一致，而不是假热闹。

### `notes`
指出：

- 是否一眼懂
- 是否足够问题导向 / 结果导向
- 是否能自然接主卖点
- 是否适合静音观看

---

## 产品露出检查

### `product_presence_check.appears_early_enough`
判断产品是否出现足够早。

建议值：

- `yes`
- `late`
- `too_late`

### `packaging_readability`
判断包装/标签是否容易识别：

- `clear`
- `partial`
- `unclear`

### `visibility_during_key_moments`
判断在关键时刻（demo / result / CTA）产品是否仍具存在感：

- `strong`
- `medium`
- `weak`

### `notes`
例如：

- 结果强但产品没跟上
- CTA 看见产品但认不出
- 包装角度不稳
- 出现太晚导致观众不知在卖什么

---

## 证明链检查

### `proof_chain_check.problem_clarity`
问题是否清楚。

### `demo_clarity`
动作或使用过程是否清楚。

### `result_clarity`
结果是否看得懂。

### `believability`
整体是否可信，不像假特效或空口说。

建议值可用：

- `strong`
- `medium`
- `weak`

### `notes`
指出：

- 哪一段证明最强
- 哪一段最弱
- 是否缺少关键 close-up
- 是否结果太晚或太短
- 是否缺少“为什么值得买”的桥接

---

## 转化清晰度检查

### `conversion_clarity_check.message_focus`
这条视频是否集中在少数关键卖点，而不是散乱铺开。

### `benefit_hierarchy`
是否有明确主卖点 > 次卖点 > 辅助点的层级。

### `cta_strength`
CTA 是否足够推动行动。

### `silent_viewing_clarity`
静音情况下能否看懂：

- 卖什么
- 解决什么问题
- 为什么值得继续看
- 最后要做什么

建议值可用：

- `strong`
- `medium`
- `weak`

### `notes`
重点指出：

- 字幕是否承载关键信息
- CTA 是否与卖点相连
- 是否出现“看完了但不知道为什么买”的问题

---

## 形式适配检查

### `format_fit_check.short_video_native`
是否像真正的短视频内容，而不是横版广告塞进竖屏。

### `ecommerce_native`
是否像卖货素材，而不是只有审美内容。

### `ai_generation_fit`
是否适合 AI 出图 / 图生视频做成商业素材。

### `human_shoot_fit`
是否适合真人拍摄执行。

### `notes`
指出：

- 镜头是否易生成
- 是否有足够字幕区
- 是否有太多复杂空镜
- 是否节奏偏慢
- 是否过度品牌片化

---

## `top_conversion_risks`

列出最影响商业转化的关键风险。每条建议结构如下：

```yaml
- issue: ""
  severity: ""
  impact: ""
  recommendation: ""
```

示例：

```yaml
top_conversion_risks:
  - issue: "产品在前3秒内识别度不足"
    severity: "high"
    impact: "观众可能停留了但没有建立明确商品认知"
    recommendation: "在hook后1秒内增加更清楚的包装或使用动作露出"
```

优先列 3–6 条真正影响转化的问题。

---

## 优化优先级

### `optimization_priorities.must_improve`
不改会显著影响转化的问题。

### `should_improve`
改了会明显更好，但不一定阻止交付。

### `optional_tests`
适合做 AB 测试的方向，例如：

- 换 hook
- 换 CTA 语气
- 强化结果镜头
- 更早露出包装
- 增加人物反应
- 更大字幕问题句

---

## 最终判断

### `final_assessment.verdict`
建议值：

- `commerce_ready`
- `commerce_ready_with_tweaks`
- `needs_commerce_revision`
- `not_commerce_ready`

### `rationale`
用 2–5 条说明最终判断依据。

---

## 商业检查逻辑

实际执行时，按以下顺序判断：

### 第一步：这条视频到底卖什么？
如果看不出最强购买理由，商业基础就弱。

### 第二步：前 3 秒有没有抓住潜在买家？
不是泛泛热闹，而是与目标用户问题/欲望强相关。

### 第三步：产品是否尽早出现？
观众不能看了几秒还不知道在卖什么。

### 第四步：中段有没有真正证明？
不是台词证明，而是画面证明。

### 第五步：结尾有没有推动行动？
不是自然结束，而是顺势收口。

### 第六步：静音观看是否成立？
大多数平台用户并不保证开声音。

### 第七步：做出来会像“卖货素材”吗？
检查是否过度品牌片化、抽象化、审美化。

---

## 不同内容类型的商业检查侧重点

### 真人 UGC
重点看：

- 是否真实可信
- 是否人和产品关系自然
- 是否像真实推荐而非硬广
- 是否有使用证明

### 纯产品演示
重点看：

- 结果是否清楚
- 包装是否明确
- 动作是否直观
- CTA 是否不空

### 高质感产品片
重点看：

- 有没有牺牲转化去换美感
- 卖点是否仍可理解
- 产品和利益是否仍然清楚

### AI 生成素材
重点看：

- 主体是否明确
- 包装是否稳定
- 结果镜头是否可生成
- 文案是否可静音理解

---

## 合规与商业的平衡

本步骤不是法律审查，但要提醒一种常见问题：为了提高转化而把表达做得过强，反而削弱可信度或带来风险。

尤其注意：

- 夸张 before/after
- 无依据强功效
- 绝对化承诺
- 假优惠/假稀缺
- 不真实实验感

商业上更好的做法通常是：

- 强调“更容易”“更轻松”“更适合日常”
- 用画面说话
- 用相对稳妥的结果表达
- 让用户自己得出“值得试”的结论

---

## 示例

### 示例：厨房清洁喷雾

```yaml
commerce_check:
  meta:
    review_scope:
      - "selling_points"
      - "hook_strategy"
      - "demo_sequence"
      - "cta_sequence"
      - "storyboard"
      - "prompt_package"
    target_platform: "generic_ecommerce_short_video"
    commerce_goal: "推动厨房清洁喷雾短视频带货转化"
    overall_commerce_readiness: "usable_with_optimizations"
    confidence: "high"
  purchase_reason_check:
    primary_reason_to_buy: "让厨房油污更容易清理，减少日常清洁负担"
    clearly_expressed: "yes"
    visually_proven: "strong"
    notes:
      - "主购买理由聚焦较清楚，围绕油污问题、喷洒动作和结果展开"
      - "省力这一辅助利益点已出现，但还可以再更明确地落在结果后"
  hook_effectiveness:
    stop_power: "strong"
    relevance_to_buyer: "high"
    product_relevance: "high"
    notes:
      - "厨房油污问题属于高频家庭场景，适合抓住目标用户"
      - "hook 与主卖点一致，没有偏题"
      - "如果字幕更大、更短，静音停留力会更强"
  product_presence_check:
    appears_early_enough: "yes"
    packaging_readability: "partial"
    visibility_during_key_moments: "medium"
    notes:
      - "产品在前段进入较及时"
      - "喷洒镜头中产品存在感不错，但包装识别还可以更稳定"
      - "CTA 结尾建议再加强标签朝向，提升商品识别"
  proof_chain_check:
    problem_clarity: "strong"
    demo_clarity: "strong"
    result_clarity: "medium"
    believability: "medium"
    notes:
      - "问题和动作都清楚"
      - "结果镜头已经形成证明，但还可增加更明确的对比区域"
      - "应避免把清洁效果做得像夸张瞬间消失，以免削弱可信度"
  conversion_clarity_check:
    message_focus: "strong"
    benefit_hierarchy: "medium"
    cta_strength: "medium"
    silent_viewing_clarity: "medium"
    notes:
      - "主卖点集中，但次卖点‘省力’和‘日常适用’还可分层更清楚"
      - "CTA 自然但偏软，如用于投流，可测试更明确的日常问题解决型结尾"
      - "静音观看下建议加更直接的字幕，如‘喷一喷，再一擦’"
  format_fit_check:
    short_video_native: "strong"
    ecommerce_native: "strong"
    ai_generation_fit: "medium"
    human_shoot_fit: "strong"
    notes:
      - "整体结构符合短视频带货逻辑"
      - "适合真人拍摄执行"
      - "若用于 AI 生成，需进一步锁定包装和结果镜头一致性"
  top_conversion_risks:
    - issue: "结果镜头的差异还不够强"
      severity: "high"
      impact: "会削弱主卖点‘更容易清理’的说服力"
      recommendation: "增加更明确的擦前擦后区域对比，或延长结果镜头停留"
    - issue: "包装标签识别不够稳定"
      severity: "medium"
      impact: "观众看懂效果后，可能仍记不住具体商品"
      recommendation: "在喷洒镜头和 CTA 镜头中明确标签朝向和可见面积"
    - issue: "CTA 偏温和，投流素材可能转化推动不够"
      severity: "medium"
      impact: "用户理解了价值，但最后一步行动引导不足"
      recommendation: "测试一版更直接的日常问题解决型 CTA"
  optimization_priorities:
    must_improve:
      - "强化结果镜头的可见差异"
      - "提升关键镜头中的包装识别度"
    should_improve:
      - "把省力这个利益点在结果后落得更明确"
      - "提升静音观看时的字幕信息效率"
    optional_tests:
      - "测试痛点问题 hook vs 结果先行 hook"
      - "测试软推荐 CTA vs 问题解决型 CTA"
      - "测试更近的结果特写镜头"
  final_assessment:
    verdict: "commerce_ready_with_tweaks"
    rationale:
      - "主卖点清楚，整体链路具备电商短视频转化基础"
      - "hook、demo、CTA 结构完整，适合带货使用"
      - "最主要的商业优化空间在于结果证明更强、包装识别更清楚、CTA 再略微增强"
```

---

## Markdown 商业诊断表

在 YAML 后追加：

| 维度 | 结论 | 主要风险 | 优先动作 |
|---|---|---|---|
| 购买理由 |  |  |  |
| Hook |  |  |  |
| 产品露出 |  |  |  |
| 证明链 |  |  |  |
| CTA |  |  |  |
| 静音可懂度 |  |  |  |
| 电商适配度 |  |  |  |

要求：

- 简洁明确
- 与 YAML 保持一致
- 方便快速判断是否适合上线测试

---

## 必要时的补问规则

本步骤原则上不主动补问；应尽量基于现有材料完成商业检查。只有当缺少关键对象导致无法判断时，才允许一次性指出：

- 缺少 storyboard 无法判断画面商业性
- 缺少 CTA 或 demo 信息无法判断转化链是否闭环
- 缺少目标平台无法判断短视频电商适配程度

即使如此，也应先给出“基于当前材料的商业检查初版”。

---

## 禁止事项

不要在本步骤中：

- 只给审美层面的评价
- 用“感觉不错”替代结构化判断
- 不指出最影响转化的问题
- 把所有建议都列成同等优先级
- 忽视静音观看与产品早出
- 只谈 CTA 不检查证明链
- 因缺少部分材料就完全不做商业判断

---

## 最终要求

本步骤必须输出一份结构化 `commerce_check`，让用户或系统可以快速判断：

1. 这条内容是否具备卖货基础
2. 最强购买理由是否被表达清楚
3. 哪一环最影响转化
4. 是否适合短视频电商平台
5. 哪些地方最值得先优化

最终标准不是“评论全面”，而是“能指导是否适合上线测试以及如何提高转化”。
