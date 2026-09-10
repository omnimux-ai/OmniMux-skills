# Demo Sequence

本步骤用于电商短视频中设计“演示段（demo sequence）”——也就是产品真正开始被使用、被展示、被证明的中段结构。它是连接 hook 与 CTA 的核心部分，承担“让观众相信”的任务。

很多电商视频有问题，不是因为产品不行，而是因为：

- 开头有停留，后面没证明
- 一直在说，却没有看到
- 演示很多，但顺序混乱
- 卖点很多，但没有最强主线
- 结果出现太晚或不够清楚

本步骤就是为了解决这些问题：把中段演示链路设计成一条**短视频可理解、可拍摄、可生成、可转化**的证明路径。

---

## 目标

基于 `selling_points`、`hook_strategy`、`angle_definition`、`parsed_input` 或用户产品信息，输出：

1. 推荐的演示主线
2. 演示段的节拍结构
3. 每一段应该证明什么
4. 每一段应该怎么演示
5. 哪些镜头/动作最关键
6. 哪些补充点适合口播或字幕支持
7. 哪些演示方式不推荐
8. 如何从 demo 顺畅过渡到 CTA

---

## 核心原则

### 1. Demo 的核心任务是“证明”，不是“重复介绍”

中段最重要的是让用户看到：

- 产品怎么用
- 为什么有效 / 有价值
- 为什么比原来的方式更好
- 为什么值得继续看并考虑下单

### 2. 优先“视觉证明链”，而不是纯口播堆卖点

强 demo 通常由以下元素组成：

- 使用前问题画面
- 产品出场
- 使用动作
- 使用中细节
- 结果画面
- 反应 / 总结
- 对比 / 再确认

不是每条都必须全有，但要形成逻辑闭环。

### 3. 按“理解顺序”组织，不按“想到什么说什么”

默认更合理的顺序通常是：

1. 先让人看懂问题
2. 再让人看到怎么做
3. 再给结果
4. 再补价值解释
5. 再往 CTA 收

而不是一上来讲很多卖点，再补动作。

### 4. 优先把最强卖点做成最强动作或最强结果

如果主卖点是“更容易清洁”，那中段核心就应该是：

- 喷
- 擦
- 干净

而不是先拍一堆包装特写。

### 5. Demo 必须适合短视频节奏

默认要求：

- 每步都快
- 每步都清楚
- 不拖沓
- 不长篇解释
- 尽早给结果
- 关键变化不要被字幕挡住

### 6. Demo 必须能为后续分镜服务

输出要能被直接转成：

- 脚本 beats
- shot list
- storyboard scenes
- image/video prompts

所以描述必须可执行，不要停留在抽象层。

---

## 输入依赖

本步骤优先使用：

- `selling_points`
- `hook_strategy`
- `angle_definition`
- `parsed_input`

如果有用户现成脚本、演示思路、产品动作说明，也应吸收进来。

尤其关注：

- 主卖点
- 可视化能力
- 风险卖点
- 平台节奏
- 视频时长
- 视频用途（拍摄 / AI 生成 / 广告测试）

---

## 输出格式

本步骤统一输出 YAML，结构如下：

```yaml
demo_sequence:
  meta:
    product_name: ""
    category: ""
    target_platform: ""
    target_use_case: []
    source_angle: ""
    source_hook: ""
    assumptions: []
  recommended_flow:
    name: ""
    summary: ""
    why_fit: []
    transition_from_hook: ""
    transition_to_cta: ""
  sequence_blocks:
    - block_id: "D1"
      name: ""
      role: ""
      objective: ""
      key_message: ""
      visual_action: ""
      proof_type: ""
      product_visibility: ""
      voiceover_support: ""
      on_screen_text: ""
      timing_hint_sec: ""
      risk_note: ""
      edit_note: ""
  proof_hierarchy:
    must_show: []
    should_show: []
    can_support_with_voiceover: []
    avoid_overexplaining: []
  rejected_demo_patterns: []
  execution_notes: []
```

---

## `meta` 字段说明

### `product_name`
产品名，不清楚时可用通用品类名。

### `category`
例如：

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
如：

- `pain_point_demo`
- `result_first_reveal`
- `before_after_comparison`
- `ugc_recommendation`

### `source_hook`
记录本次 demo 承接的 hook 名称。

### `assumptions`
写明默认前提，例如：

- 默认竖屏 9:16
- 默认时长 15–30 秒
- 默认优先视觉证明
- 默认先围绕一个主卖点组织 demo

---

## `recommended_flow` 字段说明

### `name`
给整段 demo 主线命名，例如：

- `problem_to_action_to_result`
- `result_explain_result_confirm`
- `recommendation_then_use_demo`
- `comparison_then_closeup_proof`
- `texture_apply_finish_reveal`

### `summary`
一句话说明该演示主线怎么让用户相信。

### `why_fit`
列出 2–5 条适配理由。

### `transition_from_hook`
说明 hook 后如何自然进入演示。

例如：

- “从油污痛点近景直接切到产品喷洒动作”
- “从结果先行画面倒叙进入使用步骤”
- “从人物推荐口播切到实际操作演示”

### `transition_to_cta`
说明 demo 末尾如何顺滑进入 CTA。

例如：

- “结果镜头后补一句省力总结，再切包装 CTA”
- “对比确认后直接用产品 hero shot 收口”
- “使用完成后的满意反馈自然导向推荐购买”

---

## `sequence_blocks` 字段说明

这是本步骤的核心。每个 block 代表演示中的一个“证明单元”，比镜头粗一层，但必须可拆成镜头。

建议给 3–6 个 block，视时长与复杂度而定。

每个 block 结构如下：

### `block_id`
如：

- `D1`
- `D2`
- `D3`

### `name`
模块名，短而清晰，例如：

- `show_problem_state`
- `introduce_product_action`
- `apply_product`
- `show_result`
- `confirm_benefit`
- `compare_and_close`

### `role`
建议值：

- `problem_setup`
- `product_intro`
- `application_demo`
- `proof_reveal`
- `benefit_confirmation`
- `comparison`
- `reaction`
- `cta_bridge`

### `objective`
这一段必须完成的任务。

例如：

- 让观众看懂问题
- 说明产品怎么介入
- 证明使用步骤简单
- 证明结果是真的
- 总结使用价值

### `key_message`
当前 block 要传达的核心信息。

### `visual_action`
一句话说明最关键的画面动作。

例如：

- “镜头对准油污区域，手部喷洒产品”
- “抹布轻擦带出明显清洁变化”
- “近景展示处理后的台面细节”
- “人物看向镜头给出满意反馈”

### `proof_type`
建议值：

- `visual_demo`
- `before_after`
- `comparison`
- `reaction`
- `closeup_detail`
- `spoken_support`
- `usage_speed`

### `product_visibility`
建议值例如：

- `not_visible`
- `introduced`
- `actively_used`
- `visible_supporting`
- `hero_visible`

### `voiceover_support`
如需要口播，写一句最适合配合该 block 的表达。若不依赖口播，可简写或留空。

### `on_screen_text`
大字幕建议，要求短、强、可扫读。

### `timing_hint_sec`
建议时长或时段，例如：

- `0.5-1.5`
- `2-4`
- `6-9`

### `risk_note`
若本段有潜在风险，需标出，例如：

- 对比夸张
- 结果表述过强
- 动作不够清楚会削弱说服力
- 若无真实产品包装参考，易生成漂移

### `edit_note`
说明剪辑或节奏处理建议，例如：

- “适合硬切”
- “适合加音效增强喷洒动作”
- “结果镜头建议停留多 3–5 帧”
- “字幕不要挡住变化区域”

---

## 证明层级设计

### `proof_hierarchy.must_show`
必须通过画面直接证明的内容。

通常是：

- 主要问题
- 关键使用动作
- 最终结果
- 关键差异

### `should_show`
最好能画面呈现，但也可简化的内容。

例如：

- 使用轻松感
- 包装标签
- 细节质感
- 主播满意反馈

### `can_support_with_voiceover`
更适合用口播/字幕辅助，而非强行做主视觉的内容。

例如：

- 日常使用频率
- 更省时
- 适合某人群
- 个人偏好
- 购买建议

### `avoid_overexplaining`
提醒哪些点不要在中段讲太多。

例如：

- 参数细节
- 冗长品牌背景
- 重复卖点
- 证据不足的强 claim
- 与结果无关的扩展信息

---

## 常见 Demo Flow 模板

以下是识别与组织参考，不要求机械套用。

### 1. `problem_to_action_to_result`
适合：

- 清洁
- 家居
- 工具
- 厨具

结构：

1. 问题状态
2. 产品介入
3. 使用动作
4. 结果展示
5. 价值确认

### 2. `result_explain_result_confirm`
适合：

- 结果先行 hook
- 快节奏广告
- 有强视觉变化的产品

结构：

1. 先给结果
2. 回看怎么做到
3. 再确认结果
4. 总结价值

### 3. `recommendation_then_use_demo`
适合：

- 真人 UGC
- 需要信任感的产品

结构：

1. 人物推荐
2. 产品拿出
3. 使用过程
4. 主观反馈
5. CTA 过渡

### 4. `comparison_then_closeup_proof`
适合：

- 对比型产品
- 旧方式 vs 新方式
- before/after 强产品

结构：

1. 左右差异
2. 使用解释
3. 特写确认
4. 总结

### 5. `texture_apply_finish_reveal`
适合：

- 护肤
- 美妆
- 食品质地展示

结构：

1. 质地 / 外观
2. 上脸 / 使用
3. 结果 / 妆效 / 完成态
4. 主观体验

---

## 不同电商品类的 Demo 重点

### 清洁类
必须优先证明：

- 问题真实存在
- 操作简单
- 结果明显
- 更省力 / 更省时间

### 护肤美妆类
必须优先证明：

- 质地
- 上脸/上手过程
- 完成后的视觉结果
- 使用感或服帖度

### 厨具/工具类
必须优先证明：

- 怎么用
- 为什么更快
- 为什么更方便
- 与旧方式比好在哪

### 食品类
必须优先证明：

- 卖相 / 口感暗示
- 制作是否简单
- 食用反应 / 成品结果

### 收纳整理类
必须优先证明：

- 整理前状态
- 收纳动作
- 整理后状态
- 节省空间 / 更整齐

---

## AI 生成适配原则

如果后续主要用于 AI 出图 / 图生视频，demo 结构应优先选择：

- 主体单一明确
- 动作可被静态关键帧描述
- 前后变化清楚
- 场景不频繁跳变
- 包装和人物一致性易控制

更适合 AI 的 demo block：

- 问题近景
- 产品动作近景
- 使用中细节
- 结果特写
- 包装收口

相对更难生成稳定的段落：

- 复杂多人互动
- 动作跨越大且连续变化复杂
- 需要大量表演才能成立的“真实感”
- 大量微妙情绪变化驱动的段落

---

## 合规与风险处理

Demo 段尤其容易在“证明”时踩风险，因此必须避免：

- 把结果做成夸张魔法消失
- 把普通产品演示做成医疗疗效暗示
- 用无依据实验画面冒充权威证明
- 夸张 before/after 到不可信
- 暗示所有场景都适用

如果风险较高，应改为更稳妥的演示方式：

- 展示“更容易”“更清爽”“更整齐”
- 展示“日常场景下的改善”
- 用相对描述而不是绝对结果

---

## 示例

### 示例：厨房清洁喷雾

```yaml
demo_sequence:
  meta:
    product_name: "厨房清洁喷雾"
    category: "cleaning_product"
    target_platform: "generic_ecommerce_short_video"
    target_use_case:
      - "conversion_video"
      - "ugc_ad"
    source_angle: "pain_point_demo"
    source_hook: "pain_question_open"
    assumptions:
      - "默认用于 15-20 秒竖屏带货短视频"
      - "默认中段优先展示真实使用动作和结果"
  recommended_flow:
    name: "problem_to_action_to_result"
    summary: "从厨房油污问题自然切入产品喷洒和擦拭动作，再用清晰结果镜头完成说服"
    why_fit:
      - "与主卖点‘更容易清理油污’完全一致"
      - "适合短视频快速建立证明链"
      - "容易转成拍摄镜头和 AI 关键帧"
      - "结果镜头可承担主要转化任务"
    transition_from_hook: "从油污问题近景直接切到产品进入画面并喷洒"
    transition_to_cta: "结果特写后补一句省力总结，再切产品包装或人物推荐 CTA"
  sequence_blocks:
    - block_id: "D1"
      name: "show_problem_state"
      role: "problem_setup"
      objective: "让观众快速看懂厨房台面油污问题"
      key_message: "这个问题是日常高频且让人烦的"
      visual_action: "镜头近距离展示台面油污和擦不净的区域"
      proof_type: "visual_demo"
      product_visibility: "not_visible"
      voiceover_support: "每次做完饭，最烦的就是这层油。"
      on_screen_text: "台面总是油乎乎？"
      timing_hint_sec: "0.5-1.5"
      risk_note: "问题不够明显会削弱后续结果反差"
      edit_note: "开头硬切进入，脏污区域要足够清楚"
    - block_id: "D2"
      name: "introduce_product_action"
      role: "product_intro"
      objective: "让观众看到解决方案正式入场"
      key_message: "这个产品上手简单，不需要复杂步骤"
      visual_action: "手拿清洁喷雾对准油污区域喷洒"
      proof_type: "visual_demo"
      product_visibility: "introduced"
      voiceover_support: "我现在都会直接喷这个。"
      on_screen_text: "直接喷上去"
      timing_hint_sec: "1-2"
      risk_note: "如果标签方向不稳，产品识别度会下降"
      edit_note: "喷洒动作要清楚，建议加轻微音效"
    - block_id: "D3"
      name: "apply_and_wipe"
      role: "application_demo"
      objective: "证明操作过程直观且不复杂"
      key_message: "喷完等一下，再擦就行"
      visual_action: "抹布顺着喷洒区域轻擦，动作连贯且省力"
      proof_type: "usage_speed"
      product_visibility: "actively_used"
      voiceover_support: "等几秒，再一擦。"
      on_screen_text: "等几秒，再一擦"
      timing_hint_sec: "2-4"
      risk_note: "如果擦拭动作不够明确，会弱化‘省力’感"
      edit_note: "擦拭路径要清晰，字幕不要挡住变化区域"
    - block_id: "D4"
      name: "show_result"
      role: "proof_reveal"
      objective: "用结果镜头完成最核心说服"
      key_message: "清洁后的变化是看得见的"
      visual_action: "近景展示擦拭后的干净台面，对比前一状态"
      proof_type: "before_after"
      product_visibility: "visible_supporting"
      voiceover_support: "你看，擦完真的清爽很多。"
      on_screen_text: "擦完清爽很多"
      timing_hint_sec: "2-3"
      risk_note: "结果表达不能夸张到像假特效"
      edit_note: "结果镜头建议多停留几帧，便于观众看清"
    - block_id: "D5"
      name: "confirm_benefit"
      role: "benefit_confirmation"
      objective: "把演示结果翻译成用户价值"
      key_message: "不用来回猛刷，日常清洁会轻松很多"
      visual_action: "人物轻松收尾或手持产品回到干净台面前"
      proof_type: "reaction"
      product_visibility: "hero_visible"
      voiceover_support: "关键是真的省力很多。"
      on_screen_text: "省力很多"
      timing_hint_sec: "1-2"
      risk_note: "如果没有前面演示支撑，这句会显得主观"
      edit_note: "这里是从 demo 向 CTA 过渡的桥段，节奏别拖"
  proof_hierarchy:
    must_show:
      - "油污问题状态"
      - "喷洒动作"
      - "擦拭动作"
      - "清洁后结果"
    should_show:
      - "产品标签或包装识别"
      - "轻松完成的使用感"
      - "人物满意反馈"
    can_support_with_voiceover:
      - "日常更省力"
      - "做完饭就能顺手处理"
      - "适合厨房高频清洁"
    avoid_overexplaining:
      - "参数细节"
      - "品牌背景"
      - "没有证据的强功效扩展"
      - "重复强调同一个卖点"
  rejected_demo_patterns:
    - name: "packaging_first_long_intro"
      reason: "如果中段先长时间拍包装，会削弱主卖点证明效率"
    - name: "talking_head_only_demo"
      reason: "只靠人物讲解不足以证明清洁效果"
    - name: "overcomplicated_multi_benefit_sequence"
      reason: "在短时长内平均讲太多卖点会稀释最强结果"
  execution_notes:
    - "中段最重要的是结果镜头必须清楚，不要被字幕遮挡"
    - "如做创意测试，可试两个版本：一个强调结果，一个强调省力"
    - "如用于 AI 出图，建议优先锁定问题镜头、喷洒镜头、结果镜头三张关键帧"
```

---

## 必要时的补问规则

只有在 demo 主线会因关键信息不同而明显变化时，才允许一次性补问，优先问：

1. 你最想证明的是结果、使用方便、省力，还是质感？
2. 这条视频更偏真人口播还是纯产品演示？
3. 有真实 before/after 或使用过程素材吗？
4. 主要用于拍摄、AI 出图、AI 视频，还是都要？
5. 有没有必须避免展示或必须保留的产品细节？

如果不问也能合理组织 demo sequence，就直接输出初版，并在 `assumptions` 中说明。

---

## 禁止事项

不要在本步骤中：

- 直接写完整分镜 YAML
- 只给抽象“中段展示产品”这类空话
- 不说明每段在证明什么
- 平均铺开太多卖点
- 只依赖口播，没有视觉证明逻辑
- 忽视结果镜头的重要性
- 忽视合规与夸张风险
- 因输入不完整而不输出可用初版

---

## 最终要求

本步骤必须输出一份 `demo_sequence` YAML，让后续脚本与分镜步骤明确知道：

1. 中段应该怎么证明产品
2. 每段要证明什么
3. 哪些动作和画面必须出现
4. 如何从 hook 接进来
5. 如何往 CTA 收过去
6. 哪些演示方式应避免

即使输入信息不完整，也要给出一个可执行初版，而不是停留在原则层。
