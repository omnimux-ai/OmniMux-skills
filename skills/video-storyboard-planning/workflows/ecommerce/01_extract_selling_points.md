# Extract Selling Points

本步骤用于电商场景下，在进入脚本与分镜之前，先把产品的**可卖点、可证明点、可视化点、可转化点**抽取出来。它的任务不是写文案，也不是直接写分镜，而是建立一份“这条视频到底该卖什么、先卖什么、怎么证明”的卖点基础表，为后续短视频脚本与 storyboard 提供明确方向。

这个步骤尤其适用于：

- 带货视频
- TikTok Shop / 抖音电商短视频
- Amazon 产品短视频
- 产品演示广告
- listing 相关视频素材规划
- 多卖点产品的信息优先级梳理

---

## 目标

基于用户输入、产品信息、脚本素材、产品图、产品链接或其他说明，提取并排序：

1. 核心产品卖点
2. 用户关心的利益点
3. 可被画面证明的卖点
4. 只能通过口播补充的卖点
5. 适合前 3 秒承接的卖点
6. 适合 CTA 前强化的卖点
7. 风险卖点与需弱化的表达
8. 卖点优先级与推荐使用顺序

---

## 适用输入

本步骤兼容以下任一输入：

- 产品链接
- 产品标题 + 卖点描述
- 电商详情页提炼信息
- 用户口述产品优势
- 产品脚本素材
- 竞品对比说明
- 用户评论或测评摘要
- 产品图片 + 简介
- 已有广告文案
- 多来源混合信息

如果输入有限，也要尽可能提炼出初步卖点结构，并明确写出假设。

---

## 核心原则

### 1. 不要把“产品特征”直接等同于“卖点”

特征是客观描述，卖点是用户会在意、并可能因此购买的理由。

例如：

- 特征：500ml 容量
- 卖点：一瓶能覆盖更长时间的日常使用，减少频繁补货

- 特征：喷雾设计
- 卖点：使用更方便、更省力、更容易均匀覆盖

所以要完成从“功能/规格”到“购买理由”的转译。

### 2. 优先提炼“用户利益”，不是只列参数

短视频带货里，观众更容易被以下内容打动：

- 更省时间
- 更省力
- 更省钱 / 更值
- 更方便
- 更显效果
- 更适合某场景
- 更安心
- 更好看
- 更简单上手

### 3. 优先提炼“能拍出来”的卖点

并不是所有卖点都适合做短视频主轴。优先选：

- 能被视觉证明
- 能快速看懂
- 能在 1–3 秒内建立兴趣
- 能在 15–30 秒内讲完
- 能形成明显对比/变化/动作

### 4. 区分“强卖点”和“辅助卖点”

一条短视频通常不适合平均讲 8 个卖点。需要明确：

- 主卖点：最值得打、最容易转化
- 次卖点：作为补充
- 弱卖点：可留给字幕/详情页，不必抢主叙事

### 5. 风险点前置识别

若卖点涉及：

- 医疗/疗效
- 绝对化
- 实验/认证/权威背书
- 夸张前后对比
- 无法验证的“第一名/最好”
- 竞争对手贬损
- 收入承诺/极端结果

必须标记为风险卖点，提醒后续弱化或规避。

---

## 输入依赖

本步骤可基于以下任意信息源：

- 用户直接描述
- 产品页面解析结果
- 账号/市场研究结果
- 竞品材料
- 现有脚本
- 口播文案
- 参考视频内容总结

如同时存在多个来源，应优先使用：

1. 产品真实信息
2. 用户明确表达的定位
3. 可视化证据
4. 竞品和市场常见打法
5. 一般推断

---

## 输出格式

本步骤统一输出 YAML，结构如下：

```yaml
selling_points:
  meta:
    product_name: ""
    category: ""
    target_platform: ""
    target_use_case: []
    source_confidence: ""
    assumptions: []
  audience_angles:
    primary_audience: []
    secondary_audience: []
    urgent_needs: []
    desired_outcomes: []
  point_inventory:
    raw_features: []
    translated_benefits: []
    proof_candidates: []
    weak_or_generic_points: []
  prioritized_points:
    primary_point:
      name: ""
      consumer_value: ""
      why_it_wins: []
      visualizability: ""
      proof_method: []
      recommended_role: ""
    secondary_points: []
    supporting_points: []
  messaging_plan:
    hook_points: []
    mid_video_points: []
    pre_cta_points: []
    cta_support_points: []
  proof_strategy:
    visual_first: []
    voiceover_supported: []
    text_overlay_supported: []
    hard_to_prove: []
  risk_flags:
    low_risk: []
    medium_risk: []
    high_risk: []
  recommended_exclusions: []
  notes: []
```

---

## `meta` 字段说明

### `product_name`
产品名。若未知，可写通用名，例如：

- “厨房清洁喷雾”
- “保湿修护精华”
- “便携榨汁杯”

### `category`
产品品类，例如：

- `cleaning_product`
- `skincare`
- `beauty_tool`
- `kitchen_gadget`
- `supplement`
- `fashion_accessory`

### `target_platform`
如已知则填：

- `tiktok`
- `douyin`
- `amazon_video`
- `generic_ecommerce_short_video`

### `target_use_case`
数组，可包含：

- `conversion_video`
- `ugc_ad`
- `product_demo`
- `listing_video`
- `shop_content`
- `creative_test`

### `source_confidence`
用于标记信息可靠度：

- `high`
- `medium`
- `low`

判断逻辑：

- 有明确产品信息和用户描述：`high`
- 只有部分信息或混合推断：`medium`
- 信息极少，主要靠猜测：`low`

### `assumptions`
写明本步骤为完成提炼所做的假设。

---

## 用户与需求角度提炼

### `audience_angles.primary_audience`
识别最主要用户群体，优先按使用场景表达，不要只写年龄性别。

例如：

- “经常在家做饭、在意厨房清洁效率的人”
- “希望精简护肤步骤但又重视肤感的人”
- “想快速整理桌面和收纳的人”

### `secondary_audience`
补充次级适用人群。

### `urgent_needs`
观众当前最紧迫的问题，例如：

- 油污难擦
- 清洁太费力
- 护肤步骤太麻烦
- 妆容不服帖
- 桌面杂乱
- 做饭效率低

### `desired_outcomes`
用户希望达到的结果，例如：

- 更快清洁
- 更轻松打理
- 更干净可见的结果
- 更稳定肤感
- 更省时间
- 更适合日常持续使用

---

## 卖点库存提炼

### `point_inventory.raw_features`
列出原始产品特征，尽量客观，不加工。

例如：

- “喷雾瓶设计”
- “柑橘香型”
- “500ml 容量”
- “可用于厨房台面”

### `translated_benefits`
把原始特征转成消费者利益点。

例如：

- “喷雾形式让使用动作更快、更顺手”
- “较大容量更适合高频日常使用”
- “适合厨房台面意味着使用场景明确，不用临时找替代品”

### `proof_candidates`
列出适合被画面证明的卖点候选。

例如：

- “喷洒覆盖范围清楚可见”
- “擦拭后结果变化明显”
- “一步式操作更省动作”

### `weak_or_generic_points`
列出太泛、太弱、太难转化的点，例如：

- “品质很好”
- “设计高级”
- “很多人喜欢”
- “体验不错”

这些点不适合当主卖点。

---

## 卖点优先级结构

### `prioritized_points.primary_point`
当前最值得作为主卖点的一项。

字段说明：

#### `name`
卖点名，短而清晰，例如：

- `easy_grease_cleanup`
- `low_effort_cleaning`
- `visible_skin_finish`
- `compact_daily_convenience`

#### `consumer_value`
用人话说明为什么消费者会在意。

#### `why_it_wins`
列 2–4 条原因，说明为什么它最适合当前视频。

例如：

- 观众一眼能看懂
- 容易形成 before/after
- 符合当前平台快节奏带货
- 与用户痛点直接相关

#### `visualizability`
建议值：

- `high`
- `medium`
- `low`

#### `proof_method`
数组，说明可怎么证明，例如：

- `before_after`
- `application_demo`
- `closeup_result`
- `reaction`
- `comparison`
- `usage_speed`

#### `recommended_role`
说明建议在视频中扮演什么角色：

- `main_hook`
- `main_demo`
- `main_proof`
- `cta_support`

---

### `secondary_points`
列出 1–3 个适合辅助主卖点的次卖点。

每项建议结构：

```yaml
- name: ""
  consumer_value: ""
  role: ""
  visualizability: ""
  proof_method: []
```

### `supporting_points`
列出更弱但仍可用于字幕、补充口播或详情页过渡的点。

---

## 信息排序策略

### `messaging_plan.hook_points`
适合用于前 1–3 秒建立兴趣的卖点。

特点通常是：

- 问题强
- 结果强
- 对比强
- 一眼能懂

### `mid_video_points`
适合在中段展开的卖点。

特点通常是：

- 可被动作演示
- 可被细节补充
- 可形成证明链

### `pre_cta_points`
适合在 CTA 前强化的一句价值点。

通常是：

- 省力
- 省时
- 值得囤
- 日常高频使用
- 适合某类人群

### `cta_support_points`
用于帮助 CTA 落地的辅助点，例如：

- “日常都能用上”
- “厨房重油污尤其适合”
- “放家里很实用”

---

## 证明策略

### `proof_strategy.visual_first`
最适合纯画面证明的点。

### `voiceover_supported`
更适合画面 + 口播一起解释的点。

### `text_overlay_supported`
适合通过大字幕强化但不能单独成镜头主线的点。

### `hard_to_prove`
较难在短视频中直接证明的点，例如：

- 专业认证
- 长周期效果
- 抽象品牌理念
- 非即时的体感差异

这些不适合作为强主线。

---

## 风险识别

### `risk_flags.low_risk`
可安全表达、较少风险的点。

例如：

- 使用方便
- 适合日常场景
- 构图可见的结果变化
- 收纳方便
- 包装便携

### `medium_risk`
需要措辞谨慎或需有一定证据支撑的点。

例如：

- 明显效果提升
- 前后对比
- 省时很多
- 敏感功效暗示

### `high_risk`
尽量避免作为视频核心表达的点。

例如：

- 医疗/治疗
- 100%有效
- 全网第一
- 杀菌率/实验数据无依据
- 极限减肥/增高/治愈
- “人人都适用”
- 未证实权威背书

---

## `recommended_exclusions`

列出本次不建议纳入主视频叙事的点，原因可能包括：

- 太抽象
- 太弱
- 风险高
- 不好拍
- 与主卖点重复
- 容易分散注意力

例如：

- “品牌故事”
- “全系列介绍”
- “复杂技术原理”
- “没有证据的权威声称”

---

## 卖点提炼逻辑

### 第一步：列出所有原始信息
先把产品描述、用户表达、页面文案中提到的特征全部列出。

### 第二步：把特征翻译成利益
问自己：这件事对消费者意味着什么？

### 第三步：判断哪些能拍
只有能转成画面、动作、变化、结果的点，才适合作为短视频主轴。

### 第四步：判断哪些能成为前 3 秒
优先能快速激发停留的点。

### 第五步：排序
选出：

- 一个主卖点
- 一到三个次卖点
- 若干补充卖点
- 一组不建议主打的点

---

## 常见电商卖点类型库

以下是常见卖点结构，用于帮助识别和命名，不是固定模板。

### 清洁类
- `easy_cleanup`
- `visible_result`
- `low_effort_use`
- `multi_surface_convenience`
- `kitchen_specific_solution`

### 护肤美妆类
- `texture_feel`
- `finish_result`
- `routine_simplification`
- `comfortable_wear`
- `visible_glow`
- `easy_application`

### 厨具/家居类
- `time_saving`
- `space_saving`
- `ease_of_use`
- `daily_convenience`
- `mess_reduction`

### 服饰配件类
- `styling_convenience`
- `outfit_upgrade`
- `comfort_fit`
- `multi_occasion_use`

### 食品/保健类
- `easy_daily_habit`
- `taste_experience`
- `simple_prep`
- `ingredient_confidence`

---

## 电商视频的默认卖点排序建议

若无强特殊情况，短视频通常优先：

1. 结果
2. 使用门槛低
3. 日常场景适配
4. 省时省力
5. 其他辅助价值

而不是：

1. 参数
2. 品牌故事
3. 抽象理念
4. 冗长背景

---

## 示例

### 示例：厨房清洁喷雾

```yaml
selling_points:
  meta:
    product_name: "厨房清洁喷雾"
    category: "cleaning_product"
    target_platform: "generic_ecommerce_short_video"
    target_use_case:
      - "conversion_video"
      - "product_demo"
    source_confidence: "medium"
    assumptions:
      - "默认用于 TikTok / 抖音带货短视频"
      - "默认观众关注清洁效率与结果可见性"
  audience_angles:
    primary_audience:
      - "经常在家做饭、需要高频打理厨房的人"
      - "嫌厨房油污难清理的人"
    secondary_audience:
      - "想减少清洁时间的家庭日常用户"
    urgent_needs:
      - "做完饭后油污明显"
      - "台面难擦、费力"
      - "不想花太多时间清洁"
    desired_outcomes:
      - "更快恢复干净台面"
      - "更轻松完成日常清洁"
      - "看得见的清洁结果"
  point_inventory:
    raw_features:
      - "喷雾瓶设计"
      - "适用于厨房台面"
      - "用于油污清洁"
    translated_benefits:
      - "喷雾形式上手快，日常使用动作简单"
      - "针对厨房场景，观众容易代入自己的使用需求"
      - "如果结果清楚，能快速建立转化说服力"
    proof_candidates:
      - "喷洒动作容易看懂"
      - "擦拭后结果可做近景展示"
      - "前后差异可形成停留点"
    weak_or_generic_points:
      - "品质很好"
      - "家里都能用"
      - "设计不错"
  prioritized_points:
    primary_point:
      name: "easy_grease_cleanup"
      consumer_value: "让日常厨房油污更容易处理，减少清洁负担"
      why_it_wins:
        - "与高频真实痛点直接相关"
        - "适合用画面快速证明"
        - "容易形成问题到结果的完整短视频闭环"
        - "符合电商短视频前3秒抓停留逻辑"
      visualizability: "high"
      proof_method:
        - "before_after"
        - "application_demo"
        - "closeup_result"
      recommended_role: "main_demo"
    secondary_points:
      - name: "low_effort_cleaning"
        consumer_value: "不用费劲猛刷，日常清洁更轻松"
        role: "main_proof"
        visualizability: "medium"
        proof_method:
          - "usage_speed"
          - "reaction"
      - name: "kitchen_daily_convenience"
        consumer_value: "做完饭就能顺手处理，适合日常高频使用"
        role: "cta_support"
        visualizability: "medium"
        proof_method:
          - "context_demo"
          - "voiceover"
    supporting_points:
      - name: "routine_ready"
        consumer_value: "放在厨房里随手就能用"
        role: "text_overlay"
        visualizability: "low"
        proof_method:
          - "text_overlay_supported"
  messaging_plan:
    hook_points:
      - "厨房油污难清理"
      - "擦完饭台面一层油的痛点"
    mid_video_points:
      - "喷洒动作简单"
      - "擦拭后结果清楚"
      - "比来回猛刷更省力"
    pre_cta_points:
      - "日常厨房清洁更轻松"
    cta_support_points:
      - "家里常做饭的很适合备一瓶"
  proof_strategy:
    visual_first:
      - "油污问题画面"
      - "喷洒动作"
      - "擦净结果"
    voiceover_supported:
      - "更省力"
      - "适合日常高频清洁"
    text_overlay_supported:
      - "做完饭台面全是油？"
      - "喷一喷，再一擦"
      - "清爽很多"
    hard_to_prove:
      - "适用于所有污渍"
      - "极限强力去污"
  risk_flags:
    low_risk:
      - "使用方便"
      - "适合厨房日常场景"
    medium_risk:
      - "前后对比效果表达"
      - "省力很多"
    high_risk:
      - "一喷全干净"
      - "适合所有油污类型"
      - "绝对化强力清洁表述"
  recommended_exclusions:
    - "不要把抽象品牌故事作为主卖点"
    - "不要把无依据的强功效当主视频核心"
    - "不要平均铺开太多次卖点"
  notes:
    - "主视频建议围绕问题-喷洒-结果-省力-CTA 组织"
    - "最强转化点是结果可见性，而不是参数描述"
```

---

## 必要时的补问规则

只有在卖点排序会因关键信息不同而明显变化时，才允许一次性补问，优先问：

1. 这条视频主要卖哪个场景：结果、使用方便、价格，还是质感？
2. 产品最想强调的一个核心优势是什么？
3. 有没有必须避免提的功效或敏感表达？
4. 有没有真实评论、实验、前后对比可以支持卖点？
5. 视频更偏带货转化还是品牌展示？

如果不问也能合理提炼，就先给出初版，并在 `assumptions` 中说明。

---

## 禁止事项

不要在本步骤中：

- 直接写完整脚本
- 直接拆镜头
- 把所有产品特征都当主卖点
- 编造用户未提供的认证、实验、销量、评价
- 用抽象词替代真实利益点
- 忽视合规风险
- 因信息少就不提炼卖点

---

## 最终要求

本步骤必须输出一份 `selling_points` YAML，让后续脚本与分镜步骤可以明确知道：

1. 这条视频应该主打什么
2. 哪些卖点值得放前面
3. 哪些卖点适合被画面证明
4. 哪些卖点只能辅助表达
5. 哪些表达要谨慎或排除

即使输入信息不完整，也必须给出一个可用初版，而不是停留在“请补充更多产品信息”。
