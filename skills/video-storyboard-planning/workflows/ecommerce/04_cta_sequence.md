# CTA Sequence

本步骤用于电商短视频中设计结尾的 **CTA 段（call-to-action sequence）**。它负责把前面已经建立的兴趣、证明和价值感，收束成一个明确、自然、可转化的动作引导。

很多视频前面做得不错，但转化差，常见原因不是卖点错了，而是 CTA 有问题，例如：

- 结尾突然结束，没有收口
- 有结果没行动
- 只有一句“快去买”但没有承接逻辑
- 包装没清楚露出
- 字幕、口播、画面各说各话
- CTA 太硬，像生插广告
- CTA 太软，观众不知道下一步该做什么

本步骤的任务就是设计一段 **短视频友好、带货友好、平台友好、可拍可生成** 的结尾动作链。

---

## 目标

基于 `selling_points`、`hook_strategy`、`demo_sequence`、`angle_definition`、`parsed_input` 或用户现有内容，输出：

1. 推荐的 CTA 主策略
2. CTA 段应该承接什么情绪与信息
3. CTA 前最后一个价值点该怎么落
4. CTA 段的画面、口播、字幕建议
5. 包装/人物/产品露出策略
6. 可测试的 CTA 版本
7. 不推荐的 CTA 类型及原因
8. 适合后续脚本与分镜拆解的 CTA 结构

---

## 核心原则

### 1. CTA 不是“突然让人买”，而是“顺势推动行动”

好的 CTA 必须承接前面已经证明过的内容。它应回答：

- 既然这个产品有价值，那我现在该做什么？
- 为什么我应该考虑试试它？
- 这件事和我有什么关系？

### 2. CTA 要明确，但不能脱离上下文

“赶紧下单”不是天然有效 CTA。有效 CTA 更像是：

- 如果你也有这个问题，可以试试
- 家里经常用得上的，可以备一个
- 想省掉这一步麻烦的，真的值得试
- 想看效果/想体验的人，可以直接入手

### 3. CTA 需要画面支持

结尾默认需要至少满足其中 2–3 个：

- 产品包装清晰
- 使用后的场景结果清晰
- 人物出镜做推荐或指向
- 大字幕明确行动暗示
- 稳定收尾构图
- 留足视觉停留时间

### 4. CTA 要适合短视频节奏

默认要求：

- 简短
- 自然
- 不重新讲一遍全部卖点
- 最后 1–3 秒可直接记住
- 静音观看也能看懂

### 5. CTA 类型应与整条视频风格一致

例如：

- UGC 风 → 更像真实建议
- 强演示风 → 更像“看完结果后顺手推荐”
- 质感产品风 → 更克制、更像高价值引导
- 对比结果风 → 更像“如果你也遇到这个问题，可以换这个方式”

### 6. CTA 必须适合后续拆镜头与 AI 生成

所以 CTA 不能只是一句文案，必须清楚说明：

- 最后看见什么
- 谁在说
- 产品怎么露出
- 字幕放哪
- 节奏怎么停
- 是否需要包装 hero shot

---

## 输入依赖

本步骤优先使用：

- `selling_points`
- `hook_strategy`
- `demo_sequence`
- `angle_definition`
- `parsed_input`

如果已有脚本、口播、镜头草案，也应纳入考虑。

重点关注：

- 主卖点已经如何被证明
- 用户痛点如何收束
- 平台是带货导向还是品牌导向
- 视频时长与节奏
- 是否偏真人 UGC 或纯产品视觉
- 是否主要用于 AI 出图 / 图生视频 / 拍摄执行

---

## 输出格式

本步骤统一输出 YAML，结构如下：

```yaml
cta_sequence:
  meta:
    product_name: ""
    category: ""
    target_platform: ""
    target_use_case: []
    source_angle: ""
    source_hook: ""
    source_demo_flow: ""
    assumptions: []
  recommended_cta:
    name: ""
    cta_type: ""
    core_conversion_driver: ""
    why_best_fit: []
    emotional_state_to_carry: ""
    final_value_to_land: ""
    handoff_from_demo: ""
  cta_options:
    - id: "C1"
      name: ""
      cta_type: ""
      best_for: []
      spoken_line: ""
      alt_spoken_line: ""
      on_screen_text: ""
      visual_direction: ""
      product_visibility: ""
      urgency_level: ""
      tone: ""
      risk_note: ""
      closing_note: ""
  packaging_strategy:
    must_show: []
    should_show: []
    avoid: []
  rejected_ctas: []
  execution_notes: []
```

---

## `meta` 字段说明

### `product_name`
产品名称，未知时可用通用品类名。

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
- `generic_ecommerce_short_video`

### `target_use_case`
数组，可包含：

- `conversion_video`
- `ugc_ad`
- `shop_content`
- `listing_video`
- `creative_test`

### `source_angle`
当前视频主创意 angle。

### `source_hook`
对应 hook 名称。

### `source_demo_flow`
对应 demo 主线名称。

### `assumptions`
写明本步骤使用的默认假设。

---

## `recommended_cta` 字段说明

这是推荐的主 CTA 方案。

### `name`
CTA 名称，例如：

- `problem_solution_recommendation`
- `daily_use_prompt`
- `low_pressure_try_it`
- `packshot_close`
- `ugc_soft_recommendation`
- `result_to_action_close`

### `cta_type`
建议值包括：

- `soft_recommendation`
- `direct_action`
- `daily_use_prompt`
- `problem_solution_close`
- `result_reinforcement_close`
- `ugc_recommendation_close`
- `offer_driven_close`
- `packshot_close`

### `core_conversion_driver`
一句话说明这个 CTA 促使行动的核心机制。

例如：

- “把已证明的清洁结果翻译成‘你家也用得上’的现实建议”
- “用日常高频场景降低购买决策门槛”
- “用结果收口，让观众自然把产品和解决方案绑定”

### `why_best_fit`
列出它最适合当前产品和视频的原因。

### `emotional_state_to_carry`
说明 CTA 前希望延续的情绪状态，例如：

- 满意
- 轻松
- 被说服后的认可
- 想试试
- 问题被解决后的放松

### `final_value_to_land`
CTA 前最后一个价值点，例如：

- 省力
- 日常用得上
- 省时间
- 更方便
- 结果看得见

### `handoff_from_demo`
说明如何从 demo 自然接到 CTA，例如：

- “结果镜头后由人物补一句省力总结，再举起产品收尾”
- “对比画面停留后切包装 hero shot，用大字幕收口”
- “满意反馈后直接导向‘有同样问题的人可以试试’”

---

## `cta_options` 字段说明

建议给 2–4 个可测试版本。

每个候选结构如下：

### `id`
如：

- `C1`
- `C2`
- `C3`

### `name`
短而清晰。

### `cta_type`
使用统一类型标签。

### `best_for`
适用场景，例如：

- 真人 UGC
- 强演示型广告
- AI 生成友好
- 低压力转化
- 促销导向
- 高质感产品收尾

### `spoken_line`
主口播 CTA。要求：

- 像人会说的话
- 不要生硬喊单
- 和前文逻辑一致
- 短视频里说得顺

### `alt_spoken_line`
备选说法，便于测试不同语气。

### `on_screen_text`
结尾大字幕版，通常比口播更短。

### `visual_direction`
一句话说明结尾画面应该怎么拍/怎么生成。

例如：

- “人物站在干净台面前手持产品，看向镜头推荐”
- “产品直立放在处理干净的台面上，画面稳定收口”
- “结果画面占主区，产品进入前景做 hero shot”

### `product_visibility`
建议值例如：

- `hero_visible`
- `held_in_hand`
- `visible_supporting`
- `packshot_only`

### `urgency_level`
建议值：

- `low`
- `medium`
- `high`

默认电商短视频多为 `low` 或 `medium`，除非用户明确要强促销。

### `tone`
描述 CTA 语气，例如：

- `friendly`
- `confident`
- `casual`
- `helpful`
- `direct`
- `premium`

### `risk_note`
如有潜在问题，需标注。例如：

- 太硬像广告植入
- 太软可能不够转化
- 若无优惠信息，不宜做强促销口吻
- 若结果证明不足，推荐式 CTA 会显得空

### `closing_note`
说明该 CTA 如何结束镜头，例如：

- “定格 0.5–1 秒便于观众识别产品”
- “最后轻推近产品包装”
- “字幕和产品同时停在画面中部下方”

---

## `packaging_strategy` 字段说明

CTA 阶段对包装和产品露出的要求必须明确。

### `must_show`
在 CTA 中一定要看到的内容，例如：

- 产品整体包装
- 标签主视觉
- 使用后环境结果
- 若有人物，人物和产品的关系

### `should_show`
建议出现但不是强制的内容，例如：

- 手持状态
- 使用后干净背景
- 简洁台面
- 价格/优惠位（若用户明确需要）

### `avoid`
不建议在 CTA 结尾出现的情况，例如：

- 背景过杂
- 产品被字幕挡住
- 包装角度歪导致识别差
- 最后一秒还在剧烈运动
- 只有人脸没有产品
- 只有产品没有上下文（若视频整体偏 UGC）

---

## `rejected_ctas`

列出当前不建议采用的 CTA 类型与原因。

示例：

```yaml
rejected_ctas:
  - name: "hard_sell_discount_push"
    reason: "如果用户未提供优惠信息，强促销口径会显得突兀且可信度低"
  - name: "abstract_brand_close"
    reason: "当前视频目标偏转化，抽象品牌口号收尾力度不足"
```

---

## CTA 类型库

以下用于识别与选择，不要求全部输出。

### 1. `soft_recommendation`
像真实建议：

- “家里也有这种情况的，真的可以试试”
- “这种我会建议备一个”

适合：

- UGC
- 真人推荐
- 日常高频产品

### 2. `problem_solution_close`
把问题和解决方案再绑定一次：

- “如果你家也总有这种油污，这种真的方便很多”

适合：

- 清洁
- 家居
- 收纳
- 工具

### 3. `daily_use_prompt`
强调日常会用到：

- “这种放家里真的很实用”
- “经常做饭的，基本都用得上”

适合：

- 高频日用产品
- 家居 / 厨房 / 清洁

### 4. `result_reinforcement_close`
用刚刚看到的结果再次收口：

- “这种效果，做完饭顺手擦一下就够了”

适合：

- 有强结果演示的产品

### 5. `ugc_recommendation_close`
更像个人经验推荐：

- “反正我现在厨房清洁基本都用这个”
- “这个我最近是真常用”

适合：

- 真人 UGC
- 有可信出镜人

### 6. `offer_driven_close`
以优惠、活动、价格推动：

- “现在有活动的可以直接冲”
- “最近想入手的可以趁现在”

仅在用户明确有优惠信息时优先考虑。

### 7. `packshot_close`
以视觉收尾为主，文案较少：

- 包装 hero shot
- 简短一句
- 强识别收尾

适合：

- 纯产品片
- 质感片
- AI 生成收尾镜头

---

## CTA 选择逻辑

选择主 CTA 时，按以下顺序判断：

### 1. 是否承接前面已证明的卖点
CTA 必须从前文自然长出来。

### 2. 是否适合当前视频风格
UGC、演示型、纯产品型的 CTA 语气不能混。

### 3. 是否足够明确但不突兀
既要推动行动，又不能像突然插播广告。

### 4. 是否适合产品品类
例如清洁类更适合“你家也用得上”，而不是空泛品牌口号。

### 5. 是否适合拍摄或 AI 生成
最后画面要稳定、清楚、可执行。

---

## 不同品类的 CTA 倾向

### 清洁类
优先：

- 问题解决型
- 日常实用型
- 省力总结型

### 护肤美妆类
优先：

- 使用体验推荐型
- 结果强化型
- 日常步骤简化型

### 厨具/工具类
优先：

- 省时间型
- 一步到位型
- 家里常用型

### 食品类
优先：

- 想吃/想试型
- 口感回味型
- 日常囤货型

### 收纳整理类
优先：

- 家里都能用上型
- 整理后更轻松型
- 空间更整齐型

---

## AI 生成适配原则

如果后续主要用于 AI 出图 / 图生视频，CTA 更适合：

- 构图稳定
- 主体明确
- 产品露出清楚
- 背景简洁
- 动作简单
- 字幕区明确
- 易做为结尾定格

更适合 AI 的 CTA：

- 人物手持产品推荐
- 产品放在使用结果前的 hero shot
- 结果 + 包装双出现
- 轻微推近的稳定收尾

不太适合 AI 的 CTA：

- 复杂多人互动
- 口播情绪很重但画面动作很弱
- 最后还在复杂移动
- 包装很小、难识别

---

## 合规与风险处理

CTA 结尾要避免：

- “必须买”
- “不买亏了”
- “全网最强”
- “人人都适合”
- “100%有效”
- 医疗式承诺
- 没有依据的优惠/限时信息
- 用夸张结果强行逼单

更稳妥的 CTA 通常是：

- 试试
- 值得备一个
- 家里常用得上
- 有同样问题的人可以考虑
- 如果你也在意这个问题，这种会方便很多

---

## 示例

### 示例：厨房清洁喷雾

```yaml
cta_sequence:
  meta:
    product_name: "厨房清洁喷雾"
    category: "cleaning_product"
    target_platform: "generic_ecommerce_short_video"
    target_use_case:
      - "conversion_video"
      - "ugc_ad"
    source_angle: "pain_point_demo"
    source_hook: "pain_question_open"
    source_demo_flow: "problem_to_action_to_result"
    assumptions:
      - "默认用于 15-20 秒竖屏带货短视频"
      - "默认不使用强促销价格信息"
  recommended_cta:
    name: "problem_solution_recommendation"
    cta_type: "soft_recommendation"
    core_conversion_driver: "把已经被证明的清洁结果转成‘你家也用得上’的现实建议，降低行动门槛"
    why_best_fit:
      - "与清洁类日常高频使用场景高度一致"
      - "承接前面的问题与结果逻辑自然"
      - "比生硬喊单更适合真实 UGC / 演示风"
      - "即使没有优惠信息，也能成立"
    emotional_state_to_carry: "看到结果后的轻松和认可"
    final_value_to_land: "做完饭后处理台面会轻松很多"
    handoff_from_demo: "结果镜头后由人物补一句省力总结，再手持产品对镜做温和推荐"
  cta_options:
    - id: "C1"
      name: "problem_solution_recommendation"
      cta_type: "soft_recommendation"
      best_for:
        - "真人 UGC"
        - "清洁类日常产品"
        - "低压力转化"
      spoken_line: "家里厨房也总有这种油污的，真的可以试试这个。"
      alt_spoken_line: "如果你也嫌厨房难打理，这种会方便很多。"
      on_screen_text: "厨房清洁可以试试它"
      visual_direction: "人物站在已经擦干净的台面前，手持产品看向镜头，画面稳定收尾"
      product_visibility: "held_in_hand"
      urgency_level: "low"
      tone: "friendly"
      risk_note: "如果前面的结果镜头不够清楚，这种推荐式 CTA 会显得支撑不足"
      closing_note: "建议最后定格 0.5-1 秒，让包装和字幕都能被看清"
    - id: "C2"
      name: "daily_use_prompt"
      cta_type: "daily_use_prompt"
      best_for:
        - "家居日用产品"
        - "高频场景"
        - "纯产品也可适配"
      spoken_line: "像这种放在厨房里，做完饭顺手擦一下真的很方便。"
      alt_spoken_line: "经常做饭的，家里备一个会省事很多。"
      on_screen_text: "做完饭顺手擦一下"
      visual_direction: "产品放在干净台面前景，背景保留处理后的厨房区域，强调日常使用场景"
      product_visibility: "hero_visible"
      urgency_level: "low"
      tone: "helpful"
      risk_note: "如果用户想要更强下单驱动，这个版本可能偏软"
      closing_note: "适合做 packshot 收尾，字幕放上方或左侧"
    - id: "C3"
      name: "result_reinforcement_close"
      cta_type: "result_reinforcement_close"
      best_for:
        - "结果变化强"
        - "适合 AI 出图"
        - "纯演示型广告"
      spoken_line: "这种效果，做完饭顺手处理一下就够了。"
      alt_spoken_line: "台面干净很多，后面清洁真的轻松不少。"
      on_screen_text: "擦完清爽很多"
      visual_direction: "干净台面结果占主画面，产品在前景或侧前方清晰露出"
      product_visibility: "hero_visible"
      urgency_level: "low"
      tone: "confident"
      risk_note: "如果结果表达过强，容易接近夸张承诺"
      closing_note: "结果画面建议稳住，多留几帧给观众看清"
  packaging_strategy:
    must_show:
      - "产品整体包装轮廓"
      - "标签主视觉或可识别朝向"
      - "使用后的干净台面结果"
    should_show:
      - "人物与产品的关系（手持或放置）"
      - "简洁干净的厨房背景"
      - "适合字幕覆盖的留白区域"
    avoid:
      - "字幕遮住包装"
      - "背景过杂导致产品不突出"
      - "最后镜头仍大幅移动"
      - "只有人脸没有产品"
      - "包装角度过歪难识别"
  rejected_ctas:
    - name: "hard_sell_discount_push"
      reason: "当前没有明确优惠信息，强推单会显得突兀且不够可信"
    - name: "abstract_brand_close"
      reason: "当前视频目标偏清洁结果转化，抽象品牌口号收尾力度不足"
  execution_notes:
    - "CTA 建议控制在最后 2-3 秒内，不要重新讲一遍前面卖点"
    - "如果用于 AI 出图，优先选择 C2 或 C3，构图更稳定"
    - "如果是真人 UGC，C1 更自然，也更容易承接前面的使用演示"
    - "CTA 镜头中产品和字幕都必须清楚可见，避免抢位"
```

---

## 必要时的补问规则

只有在 CTA 风格会因关键信息不同而明显变化时，才允许一次性补问，优先问：

1. 这条视频更偏真人推荐、强演示带货，还是纯产品视觉？
2. 有没有优惠、活动、价格信息需要放进 CTA？
3. 你更想要温和推荐型，还是更直接的行动引导？
4. 主要用于拍摄、AI 出图、AI 视频，还是都要？
5. 结尾必须保留人物出镜，还是也可以纯产品收尾？

如果不问也能合理设计 CTA，就直接输出初版，并在 `assumptions` 中说明。

---

## 禁止事项

不要在本步骤中：

- 直接写完整分镜 YAML
- 把 CTA 写成生硬喊单模板
- 不说明 CTA 怎么承接前文
- 不说明结尾画面怎么组织
- 没有产品露出策略
- 没有可测试的备选 CTA
- 忽视静音观看与字幕可读性
- 忽视合规和夸张促销风险
- 因输入有限而不输出可用初版

---

## 最终要求

本步骤必须输出一份 `cta_sequence` YAML，让后续脚本与分镜步骤明确知道：

1. 结尾该怎么收
2. 用什么语气推动行动
3. 最后一个价值点是什么
4. 产品和字幕怎么露出
5. 有哪些可测试 CTA 版本
6. 哪些 CTA 类型不适合当前任务

即使输入不完整，也必须给出一个可执行初版，而不是只说“需要更多信息”。
