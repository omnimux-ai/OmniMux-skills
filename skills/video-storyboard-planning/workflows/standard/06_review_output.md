# Review Output

本步骤负责对前面产出的结果进行最终审阅与质量把关，确保输出不是“看起来有内容”，而是真的**可执行、可审阅、可生成、可修改**。它是整个 video-storyboard-skill 的最后一道质量门，目标是发现结构缺口、连续性问题、节奏问题、转化问题、生成风险和合规风险，并产出一份结构化审阅结果。

这个步骤不是重新创作，而是：

- 检查
- 诊断
- 标记问题
- 给出修正建议
- 判断是否达到可交付标准

---

## 目标

基于已有产出（通常包括 `parsed_input`、`angle_definition`、`shootable_script`、`storyboard`、`prompt_package`），完成以下审阅任务：

1. 检查结构是否完整
2. 检查 angle 与脚本、分镜是否一致
3. 检查节奏是否合理
4. 检查镜头是否服务转化目标
5. 检查产品/人物/场景连续性是否稳定
6. 检查是否适合 9:16 短视频平台
7. 检查是否适合 AI 出图 / 图生视频 / 拍摄执行
8. 检查提示词是否足够稳定与可用
9. 检查是否存在明显合规风险
10. 输出是否达到“可交付”标准
11. 如未达标，指出优先修复项

---

## 审阅原则

### 1. 以“能不能直接拿去用”为标准

不是检查“写得多不多”，而是检查：

- 客户能否看懂
- 摄影/导演能否执行
- AI 模型能否理解
- 用户能否据此继续生产

### 2. 问题必须具体，不可泛泛而谈

不要只说：

- “节奏可以更好”
- “镜头还不够丰富”
- “需要加强一致性”

要具体指出：

- 哪个镜头
- 存在什么问题
- 影响什么
- 怎么改更合理

### 3. 优先发现高影响问题

优先级从高到低通常是：

1. 结构缺失
2. 主 angle 偏移
3. 前 3 秒无抓力
4. 产品/结果不清楚
5. 连续性断裂
6. 不适合 AI 生成
7. 提示词漂移
8. 次要风格问题

### 4. 审阅必须兼顾“人类执行”和“模型执行”

一个 storyboard 可能给人类看没问题，但 prompt 写得不稳定；也可能 prompt 很完整，但镜头逻辑不通。两端都要检查。

### 5. 先判断是否可交付，再判断是否优秀

允许存在小瑕疵，但必须判断：

- 是否可直接交付
- 是否建议先修后交
- 是否必须重做某部分

---

## 输入依赖

本步骤通常审阅以下对象：

- `parsed_input`
- `angle_definition`
- `shootable_script`
- `storyboard`
- `prompt_package`

若其中某些对象缺失，也要如实指出，并基于已有内容完成最大程度审阅。

---

## 输出格式

本步骤统一输出 YAML，并在后面追加一个简洁 Markdown 审阅摘要表。

标准结构如下：

```yaml
review_report:
  meta:
    review_scope: []
    overall_status: ""
    delivery_readiness: ""
    confidence: ""
  completeness_check:
    parsed_input_present: false
    angle_definition_present: false
    shootable_script_present: false
    storyboard_present: false
    prompt_package_present: false
    missing_components: []
  alignment_check:
    goal_alignment: ""
    angle_alignment: ""
    script_to_storyboard_alignment: ""
    storyboard_to_prompt_alignment: ""
    notes: []
  pacing_check:
    front_hook_strength: ""
    middle_flow: ""
    ending_clarity: ""
    duration_fit: ""
    notes: []
  conversion_check:
    product_visibility: ""
    proof_strength: ""
    cta_clarity: ""
    message_priority: ""
    notes: []
  continuity_check:
    character_consistency: ""
    product_consistency: ""
    environment_consistency: ""
    lighting_consistency: ""
    notes: []
  generation_readiness:
    ai_image_readiness: ""
    image_to_video_readiness: ""
    human_shoot_readiness: ""
    prompt_stability: ""
    notes: []
  compliance_check:
    risk_level: ""
    flagged_items: []
    notes: []
  critical_issues: []
  improvement_actions:
    must_fix: []
    should_fix: []
    nice_to_have: []
  final_decision:
    verdict: ""
    rationale: []
```

---

## `meta` 字段说明

### `review_scope`
列出本次实际审阅了哪些对象，例如：

- `parsed_input`
- `angle_definition`
- `shootable_script`
- `storyboard`
- `prompt_package`

### `overall_status`
建议值：

- `strong`
- `usable_with_minor_issues`
- `needs_revision`
- `incomplete`

### `delivery_readiness`
建议值：

- `ready_to_deliver`
- `deliver_after_minor_fixes`
- `revise_before_delivery`
- `not_deliverable_yet`

### `confidence`
审阅信心等级，可用：

- `high`
- `medium`
- `low`

如果输入缺失较多，应降低信心等级。

---

## 完整性检查

### `completeness_check`
检查关键模块是否存在。

如果缺失，必须明确指出，不可假装完整。

#### `missing_components`
列出缺失模块，例如：

- `prompt_package`
- `angle_definition`

若缺少关键模块，要在 `overall_status` 和 `final_decision` 中体现影响。

---

## 对齐性检查

### `alignment_check.goal_alignment`
检查最终输出是否真的服务原始用户目标。

例如：

- 是否真的在做带货分镜，而不是泛广告概念
- 是否满足“适合 AI 出图”的要求
- 是否满足“适合 TikTok 节奏”的要求

### `angle_alignment`
检查主 angle 是否在脚本与分镜中被贯彻，而不是前后跑偏。

### `script_to_storyboard_alignment`
检查脚本 beat 是否被合理拆分到镜头中。

### `storyboard_to_prompt_alignment`
检查 prompt 是否准确反映 storyboard，而不是另起炉灶。

### `notes`
补充具体观察。

---

## 节奏检查

### `pacing_check.front_hook_strength`
检查前 3 秒是否足够强。

可评估：

- 是否有问题/结果/对比/动作驱动
- 是否避免空镜开场
- 是否值得用户停留

### `middle_flow`
检查中段是否：

- 有证明链
- 不拖沓
- 没有重复讲同一件事
- 口播与画面配合良好

### `ending_clarity`
检查结尾是否：

- 真正收口
- 有 CTA
- 有产品露出
- 不突然结束

### `duration_fit`
检查内容量与时长是否匹配。

### `notes`
具体指出快慢失衡、镜头冗余、结果出现过晚等问题。

---

## 转化检查

### `conversion_check.product_visibility`
检查产品是否：

- 出现足够早
- 关键卖点镜头中清楚可见
- 不被字幕或构图遮挡

### `proof_strength`
检查卖点是否被画面证明，而不是只靠口播。

### `cta_clarity`
检查 CTA 是否明确。

### `message_priority`
检查是否把最重要的信息放在了最醒目的镜头与时段。

### `notes`
说明如：

- 结果不够清楚
- 利益点过多导致分散
- 没有真正“证明”镜头
- CTA 太弱

---

## 连续性检查

### `continuity_check.character_consistency`
检查人物身份、发型、服装、状态是否稳定。

### `product_consistency`
检查包装颜色、形状、标签位置、尺寸感是否稳定。

### `environment_consistency`
检查场景、桌面、道具、空间逻辑是否跳变。

### `lighting_consistency`
检查时间感与光线方向是否稳定。

### `notes`
指出具体镜头中的连续性断点风险。

---

## 生成可用性检查

### `generation_readiness.ai_image_readiness`
评估 storyboard 和 prompt 是否适合 AI 出图。

### `image_to_video_readiness`
评估是否适合作为图生视频起点，包括：

- 首帧是否稳定
- 连续镜头是否有一致性策略
- 动作描述是否足够清楚

### `human_shoot_readiness`
评估是否适合人工拍摄执行。

### `prompt_stability`
评估 prompt 是否：

- 够具体
- 不漂移
- 有负面提示词
- 有一致性约束
- 没有过度抽象

### `notes`
指出诸如：

- prompt 过于文学化
- 角色锁定不足
- 包装约束不够
- 字幕区没说明
- 某些镜头很难拍/很难生成

---

## 合规检查

### `compliance_check.risk_level`
建议值：

- `low`
- `medium`
- `high`

### `flagged_items`
列出具体风险项，结构建议：

```yaml
flagged_items:
  - type: ""
    severity: ""
    location: ""
    issue: ""
    suggestion: ""
```

例如：

```yaml
flagged_items:
  - type: "absolute_claim"
    severity: "medium"
    location: "shootable_script.beats[B03]"
    issue: "使用了过强的绝对化效果描述"
    suggestion: "改为更相对、可视化的结果表达"
```

### `notes`
汇总总体合规观察。

---

## 关键问题清单

### `critical_issues`
列出当前最影响交付的问题。每条建议结构：

```yaml
- issue: ""
  impact: ""
  affected_output: []
  recommended_fix: ""
```

只列真正重要的问题，不要把所有小建议都塞进来。

常见关键问题包括：

- 前 3 秒无钩子
- 产品出现太晚
- 没有结果证明镜头
- Prompt 没有一致性约束
- 包装设定不稳定
- CTA 缺失
- 分镜与脚本不一致
- 输出缺失必要模块

---

## 改进动作分级

### `improvement_actions.must_fix`
不修就不建议交付的问题。

### `improvement_actions.should_fix`
建议修，能明显提升质量。

### `improvement_actions.nice_to_have`
锦上添花项。

要求：

- 动作导向
- 可执行
- 尽量具体到模块或镜头

例如：

```yaml
must_fix:
  - "在前2秒加入更明确的问题或结果镜头，增强停留"
  - "为产品包装镜头补充稳定标签与颜色约束"
should_fix:
  - "减少一条重复口播，把节奏压缩0.5-1秒"
nice_to_have:
  - "为CTA镜头补一版更适合字幕覆盖的构图变体"
```

---

## 最终判断

### `final_decision.verdict`
建议值：

- `approved`
- `approved_with_minor_revisions`
- `revision_required`
- `rebuild_recommended`

### `rationale`
用 2–5 条说明为什么做出这个判断。

例如：

- 主 angle 清晰且在脚本和分镜中贯彻一致
- 结构完整，镜头具有可执行性
- Prompt 基本可用，但产品一致性约束还需加强
- CTA 清晰，但前 3 秒停留力仍可提升

---

## 审阅逻辑清单

实际执行审阅时，按以下顺序判断：

### 第一步：模块是否完整
有没有：

- 解析
- angle
- 脚本
- 分镜
- prompt 包

### 第二步：是否围绕同一个目标
看有没有：

- 用户想要带货，结果却做成纯品牌片
- 用户要 AI 生成，结果输出太偏拍摄手册
- 用户要快节奏，结果前半段铺垫过长

### 第三步：前 3 秒是否成立
检查：

- 是否有强钩子
- 是否有产品/问题/结果驱动
- 是否值得停留

### 第四步：证明链是否成立
检查：

- 画面有没有真正证明卖点
- 是不是只靠台词在说
- 结果镜头够不够强

### 第五步：是否能交给人类或模型执行
检查：

- 拍不拍得出来
- 生不生得出来
- prompt 是否明确
- 一致性是否有约束

### 第六步：是否存在明显风险
检查：

- 绝对化
- 医疗暗示
- 夸张前后对比
- 品牌漂移风险

---

## 审阅打分建议

如需内部使用，可按以下维度在脑内或 notes 中隐式评估：

- 结构完整度
- 转化清晰度
- 节奏强度
- 可执行性
- 一致性稳定度
- AI 生成友好度
- 合规稳健度

不要求输出数值分，但结论要能体现这些维度。

---

## 示例

```yaml
review_report:
  meta:
    review_scope:
      - "parsed_input"
      - "angle_definition"
      - "shootable_script"
      - "storyboard"
      - "prompt_package"
    overall_status: "usable_with_minor_issues"
    delivery_readiness: "deliver_after_minor_fixes"
    confidence: "high"
  completeness_check:
    parsed_input_present: true
    angle_definition_present: true
    shootable_script_present: true
    storyboard_present: true
    prompt_package_present: true
    missing_components: []
  alignment_check:
    goal_alignment: "输出整体符合清洁产品带货短视频分镜目标，兼顾了拍摄与 AI 生成用途"
    angle_alignment: "主 angle 为 pain_point_demo，在脚本、分镜和 prompt 中保持一致"
    script_to_storyboard_alignment: "脚本五段结构被合理拆成问题、动作、结果、利益点和 CTA 镜头"
    storyboard_to_prompt_alignment: "大多数 prompt 能准确反映镜头目的，但个别镜头的包装朝向约束还可更明确"
    notes:
      - "Hook 与结果证明链总体一致"
      - "CTA 镜头与脚本收口匹配"
  pacing_check:
    front_hook_strength: "前2秒问题镜头成立，停留力较强"
    middle_flow: "中段演示与结果衔接顺畅，但可再压缩一条重复说明"
    ending_clarity: "结尾 CTA 明确，产品收口清楚"
    duration_fit: "15 秒内容量基本合适"
    notes:
      - "可考虑将中段一条重复口播再缩短 0.5 秒以增强节奏"
  conversion_check:
    product_visibility: "产品在前段及时出现，关键使用镜头中露出明确"
    proof_strength: "通过喷洒与擦净结果形成基本证明链，结果镜头较清楚"
    cta_clarity: "CTA 清晰，适合短视频收口"
    message_priority: "主信息集中在去污结果和省力感上，优先级较合理"
    notes:
      - "若要进一步提升转化，可增强结果特写停留时间"
  continuity_check:
    character_consistency: "人物设定较稳定"
    product_consistency: "产品包装规则已写出，但标签朝向约束还能更明确"
    environment_consistency: "厨房场景逻辑清楚"
    lighting_consistency: "整体白天自然光设定稳定"
    notes:
      - "建议在结果镜头补充台面材质锁定，降低生成漂移"
  generation_readiness:
    ai_image_readiness: "适合 AI 出图，镜头描述和 prompt 基本完整"
    image_to_video_readiness: "适合作为图生视频前置，但动作起止描述还可更具体"
    human_shoot_readiness: "适合人工拍摄执行"
    prompt_stability: "整体稳定，已有一致性与负面提示，但个别镜头还可补更精确的产品朝向规则"
    notes:
      - "可为关键动作镜头再补一版更偏 motion 的 concise prompt"
  compliance_check:
    risk_level: "medium"
    flagged_items:
      - type: "absolute_claim"
        severity: "medium"
        location: "shootable_script.beats[B03]"
        issue: "结果描述接近绝对化表达"
        suggestion: "改成更相对、可视化的表述，如‘清爽很多’或‘更容易擦净’"
    notes:
      - "总体风险可控，但应避免把效果表达得过满"
  critical_issues:
    - issue: "个别结果描述偏绝对化"
      impact: "可能带来合规风险，影响对外使用安全性"
      affected_output:
        - "shootable_script"
        - "storyboard"
      recommended_fix: "将强功效表达改为相对稳妥的视觉结果描述"
  improvement_actions:
    must_fix:
      - "弱化结果段中过强的绝对化措辞"
    should_fix:
      - "为关键产品镜头补充更明确的标签朝向约束"
      - "为结果镜头增加更清晰的对比区域说明"
    nice_to_have:
      - "补充一版更适合图生视频的动作简化 prompt"
  final_decision:
    verdict: "approved_with_minor_revisions"
    rationale:
      - "整体结构完整，已具备可执行性和可审阅性"
      - "主 angle 在脚本与分镜中贯彻一致"
      - "提示词体系基本可用，但仍有少量一致性与合规措辞可优化"
```

---

## Markdown 审阅摘要表

在 YAML 后追加：

| 维度 | 结论 | 主要问题 | 建议动作 |
|---|---|---|---|
| 完整性 |  |  |  |
| 对齐性 |  |  |  |
| 节奏 |  |  |  |
| 转化 |  |  |  |
| 连续性 |  |  |  |
| 生成可用性 |  |  |  |
| 合规 |  |  |  |

要求：

- 每行一句核心结论
- 不重复长篇描述
- 方便快速判断是否可交付

---

## 必要时的补问规则

本步骤原则上不主动补问；它应尽量基于现有材料完成审阅。只有当缺失关键信息导致无法判断是否可交付时，才允许一次性指出缺失并请求补充，例如：

- 缺少 storyboard 本体
- 缺少 prompt_package
- 看不到用户原始目标，无法判断对齐性

但即便如此，也应先输出“基于当前材料的审阅结果”，而不是空等。

---

## 禁止事项

不要在本步骤中：

- 重新大篇幅创作分镜
- 只给笼统好评/差评
- 不指出具体问题位置
- 不区分 must fix / should fix
- 把小问题夸成必须重做
- 忽略合规与一致性问题
- 因部分输入缺失就完全不审阅
- 输出无法指导下一步修改的空泛评论

---

## 最终要求

本步骤必须输出一份结构化 `review_report`，让用户或系统能够立刻知道：

1. 当前产出是否完整
2. 是否围绕正确的目标与 angle
3. 是否适合短视频转化
4. 是否适合拍摄或 AI 生成
5. 有哪些关键问题
6. 哪些必须先修
7. 是否可以交付

最终标准不是“说得全面”，而是“能指导是否交付以及如何修改”。
