# Structure Mapping

本步骤用于“参考改写 / 仿做重构”类任务中，把 `reference_analysis` 中提炼出的参考结构，映射到当前用户自己的产品、卖点、场景、目标平台和执行方式上。它的核心任务不是直接写新分镜，而是先完成**结构迁移设计**：哪些位置保留、哪些位置替换、哪些逻辑重排、哪些表达需要弱化或增强。

简单说，这一步回答的是：

- 参考视频里那套结构，具体怎么改成“我的版本”？
- 哪些镜头功能保留，内容要替换成什么？
- 哪些节奏值得延续，哪些需要调整？
- 哪些参考逻辑不适合当前产品？
- 怎样做到“像它的打法”，但不是“抄它的内容”？

---

## 目标

基于 `reference_analysis`、当前用户任务信息，以及已知产品/品牌/平台/卖点信息，输出：

1. 参考结构与当前任务的对应关系
2. 哪些模块可直接迁移
3. 哪些模块必须重写
4. 当前产品应如何替换原参考中的问题、动作、结果、CTA
5. 当前版本应采用的节奏策略
6. 需要避免的一比一复刻点
7. 后续写新脚本与分镜的结构蓝图

---

## 适用场景

本步骤适用于以下请求：

- “参考这条视频，改成我的产品”
- “按这个爆款结构，重写一个类似的”
- “照这个节奏做，但换成我的场景”
- “复刻它的卖点表达方式，但不要像同款”
- “保留这个参考的 hook 和节奏，重做中段和 CTA”
- “基于这个参考做一条更适合 AI 生成的新版本”

---

## 核心原则

### 1. 映射的是“结构功能”，不是“表面内容”

优先映射：

- hook 位置与机制
- 问题/利益点逻辑
- 演示顺序
- 结果展示方式
- CTA 类型
- 节奏密度
- 人物/产品/字幕的配合关系

不要直接映射：

- 原品牌内容
- 原包装
- 原台词
- 原人物
- 原镜头角度细节
- 原 claim

### 2. 当前产品逻辑必须优先于参考模板

如果参考视频的结构不完全适合当前产品，必须让产品逻辑优先。

例如：

- 参考是清洁产品，用户产品是护肤品，则不能机械保留“擦前擦后”式结构
- 参考是强对比，用户产品不适合 before/after，则要换成质地/使用/体验逻辑
- 参考是强人物推荐，当前需求是纯产品 AI 生成，则要改为视觉演示主导

### 3. 映射应保持“像打法，不像内容”

理想输出状态是：

- 观众能感受到相似的节奏与说服路径
- 但不会看出是直接照搬
- 产品、场景、台词、镜头组织都能服务新任务

### 4. 明确列出“该保留”和“该改掉”

不要模糊说“借鉴一下结构”。必须清楚指出：

- 保留什么
- 换成什么
- 为什么这样换
- 哪些绝对不能沿用

### 5. 这一步是后续脚本和分镜的蓝图

最终输出应能让后续步骤直接接着写：

- 新脚本 beats
- 新 hook
- 新 demo sequence
- 新 CTA
- 新 storyboard scenes

---

## 输入依赖

本步骤优先消费：

- `reference_analysis`
- 当前任务的产品/品牌/卖点信息
- 用户指定的保留/不保留要求
- 已知平台与用途
- 已知输出偏好（拍摄 / AI 出图 / AI 视频）

如果用户还明确说了“只想保留某些部分”，必须纳入映射设计。

---

## 输出格式

本步骤统一输出 YAML，结构如下：

```yaml
structure_mapping:
  meta:
    reference_summary: ""
    current_product_summary: ""
    mapping_goal: ""
    target_platform: ""
    target_use_case: []
    assumptions: []
  structural_transfer:
    keep_pattern: []
    modify_pattern: []
    replace_pattern: []
    remove_pattern: []
  segment_mapping:
    hook:
      reference_function: ""
      new_function: ""
      keep_from_reference: []
      change_for_current_task: []
    demo:
      reference_function: ""
      new_function: ""
      keep_from_reference: []
      change_for_current_task: []
    cta:
      reference_function: ""
      new_function: ""
      keep_from_reference: []
      change_for_current_task: []
  message_mapping:
    original_primary_logic: ""
    new_primary_logic: ""
    carry_over_elements: []
    rewritten_elements: []
    avoid_elements: []
  visual_mapping:
    reusable_shot_logic: []
    adapted_shot_logic: []
    non_reusable_shot_logic: []
  pacing_mapping:
    preserve: []
    adjust: []
    avoid: []
  adaptation_blueprint:
    recommended_new_flow: ""
    build_order: []
    emphasis_points: []
  risk_controls:
    similarity_risks: []
    compliance_risks: []
    mitigation_actions: []
  notes: []
```

---

## `meta` 字段说明

### `reference_summary`
简要概括原参考结构。

### `current_product_summary`
简要说明当前要映射到什么产品 / 场景 / 任务。

### `mapping_goal`
一句话说明本次映射目标，例如：

- “保留参考视频的问题—演示—结果结构，重写为用户自己的清洁产品视频”
- “借参考视频的 UGC 推荐节奏，改写为适合护肤产品的版本”
- “保留爆款短视频的停留与 CTA 逻辑，但用 AI 生成友好的纯产品结构重建”

### `target_platform`
如：

- `tiktok`
- `douyin`
- `generic_short_video`
- `generic_ecommerce_short_video`

### `target_use_case`
数组，可包含：

- `conversion_video`
- `ugc_ad`
- `ai_image_generation`
- `ai_video_generation`
- `client_review`
- `creative_test`

### `assumptions`
记录映射时采用的默认前提。

---

## 结构迁移设计

### `structural_transfer.keep_pattern`
列出建议保留的“结构模式”。

例如：

- 问题开场
- 结果前置
- 口播 + 插镜节奏
- 结果后再推荐
- 结尾稳定收口

### `modify_pattern`
列出保留大框架但要改写的部分。

例如：

- 原来的清洁对比改成用户产品对应的演示逻辑
- 原来的真人主导改成产品主导
- 原来的快切结果改成更稳一点的 close-up 结果

### `replace_pattern`
列出必须完全替换的内容。

例如：

- 原品牌包装
- 原台词
- 原使用场景
- 原特定情绪表达
- 原 claim 类型

### `remove_pattern`
列出应直接去掉、不要进入新版本的元素。

例如：

- 与新产品无关的桥段
- 原视频依赖某个人设的段落
- 原视频中风险较高的绝对化表达
- 不适合 AI 生成的复杂镜头

---

## 分段映射

### `segment_mapping.hook`
把参考 hook 的“功能”映射成当前产品的新 hook 逻辑。

字段说明：

- `reference_function`: 原参考 hook 在做什么
- `new_function`: 新任务里 hook 应做什么
- `keep_from_reference`: 保留的机制，如“先抛问题”“先给结果”
- `change_for_current_task`: 具体要换成什么内容

### `segment_mapping.demo`
映射中段演示逻辑。

例如：

- 保留“动作→结果→确认”结构
- 把“喷洒+擦拭”改成“涂抹+上脸结果”
- 把“左右对比”改成“步骤前后对比”
- 把“人物反应”改成“质地 close-up”

### `segment_mapping.cta`
映射结尾收口方式。

例如：

- 保留软推荐 CTA
- 改掉原来的品牌口号
- CTA 改成更适合当前人群的日常建议
- 如果是纯产品视觉，则改成 packshot + 结果收口

---

## 信息逻辑映射

### `message_mapping.original_primary_logic`
原参考最核心的说服逻辑。

例如：

- “这个产品能让厨房油污更容易处理”
- “这个产品能让妆效更服帖”

### `new_primary_logic`
当前任务的新主逻辑。

### `carry_over_elements`
可以沿用的表达模式，例如：

- “先问题，后演示，再结果”
- “用一句利益点把结果翻译成人话”
- “先可视化，再口播总结”

### `rewritten_elements`
必须重写的表达，例如：

- 用户痛点
- 产品使用动作
- 结果形式
- 人物身份
- CTA 语气

### `avoid_elements`
明确不要延续的表达方式，例如：

- 原品牌特有口头禅
- 原竞争产品贬低方式
- 原视频强 claim
- 平台热点梗

---

## 视觉映射

### `visual_mapping.reusable_shot_logic`
可保留的镜头功能逻辑，例如：

- 问题 close-up
- 产品介入镜头
- 结果特写
- 包装收口

注意：这里说的是“功能逻辑”，不是原画面内容。

### `adapted_shot_logic`
需要改造的镜头逻辑，例如：

- 原来是手擦台面，现在改成手部上脸/穿戴/摆放/切割
- 原来是人物对镜推荐，现在改成人物半出镜 + 产品主镜头
- 原来是前后对比，现在改成使用步骤递进

### `non_reusable_shot_logic`
不建议沿用的镜头逻辑，例如：

- 太依赖原出镜人的个人表现
- 与新产品物理动作完全不匹配
- AI 很难稳定复现的复杂镜头
- 过于品牌专属的场景特写

---

## 节奏映射

### `pacing_mapping.preserve`
保留哪些节奏特点，例如：

- 前快后稳
- 中段快切证明
- CTA 留一拍停住
- 字幕与动作同步

### `adjust`
当前任务需要调整的节奏，例如：

- 产品更复杂，需要中段多半秒解释
- 结果没那么强，需要增加一个 close-up 确认镜头
- 人物不出镜，需要用更多字幕支撑

### `avoid`
当前不该沿用的节奏问题，例如：

- 过度依赖口播
- 太慢的品牌式空镜
- 结果出来太晚
- CTA 收得过硬

---

## 适配蓝图

### `adaptation_blueprint.recommended_new_flow`
一句话概括新版本建议采用的总流程。

例如：

- “保留参考视频的问题→动作→结果→推荐骨架，但将问题、动作和结果全部替换为用户产品自己的使用场景”
- “保留结果先行 hook，但用更适合 AI 生成的产品 close-up 和稳定收尾重建”

### `build_order`
建议后续构建顺序，例如：

1. 先确定新的主卖点与问题场景
2. 再重写 hook
3. 再重建 demo sequence
4. 再改 CTA 语气
5. 最后输出 storyboard

### `emphasis_points`
后续写作中应重点强化的点。

例如：

- 产品出场时机
- 结果的可见性
- 字幕对静音观看的支撑
- 包装识别度
- 与参考视频的相似度控制

---

## 风险控制

### `risk_controls.similarity_risks`
指出可能“像得太过头”的风险。

例如：

- Hook 句式太接近
- 镜头顺序一模一样
- 包装摆位太像
- CTA 口气太像原视频
- 人物动作设计过近似

### `compliance_risks`
指出从参考迁移时的表达风险。

例如：

- 参考本身存在强功效表达
- 结果对比容易夸张
- 原视频使用了无依据评价或认证
- 原视频有贬损竞品成分

### `mitigation_actions`
给出具体规避动作。

例如：

- 改写 hook 文案机制但不用原句
- 重新设计中段动作顺序
- 使用新场景和新构图
- 用更稳妥的结果描述替代强 claim
- 保留结构，不保留原包装镜头语言

---

## 结构映射逻辑

实际执行时按以下顺序思考：

### 第一步：参考视频最有效的不是“镜头”，而是什么？
通常是：

- 停留机制
- 卖点结构
- 证明顺序
- CTA 方式

### 第二步：当前产品的主卖点与使用动作是什么？
只有把这个搞清楚，才能判断哪些结构能迁移。

### 第三步：参考的哪一段跟当前产品逻辑不兼容？
这里必须敢于替换，不要硬套。

### 第四步：新版本如何既保留“打法”，又避免“撞车”？
通过替换：

- 问题
- 场景
- 动作
- 台词
- 镜头组合
- CTA 句式

### 第五步：把它整理成可写脚本的蓝图
最终不是停留在分析，而是直接可供下游写作使用。

---

## 不同映射场景的处理重点

### 参考清洁视频 → 新清洁产品
可多保留：

- 问题-动作-结果结构
- before/after
- 省力总结

但仍要换：

- 包装
- 台词
- 场景细节
- CTA 语气

### 参考清洁视频 → 护肤 / 美妆产品
保留：

- 停留机制
- 结果证明思路
- 口播 + 插镜节奏

替换：

- 问题类型
- 动作逻辑
- 结果表达方式
- CTA 口气

### 参考真人 UGC → 纯产品 AI 生成版
保留：

- 结构节奏
- 卖点排序
- 结果收口方式

替换：

- 人物驱动信任 → 产品 close-up / 字幕驱动
- 口播主导 → 视觉主导
- 复杂表演 → 稳定关键帧

### 参考品牌感广告 → 电商转化素材
保留：

- 质感控制
- 构图审美
- 产品突出方式

替换：

- 空镜比例
- 信息密度
- 更明确的结果/利益点
- 更强的 CTA

---

## AI 生成适配提醒

如果新版本主要给 AI 出图 / 图生视频，映射时要额外关注：

- 哪些参考镜头能简化成稳定关键帧
- 哪些人物镜头可改为手部 / 产品 / 结果镜头
- 哪些动态段落要拆成更清晰的单步动作
- 哪些场景要减少复杂变化
- 哪些包装或产品细节必须锁定参考图

---

## 示例

### 示例：将参考清洁视频映射到用户自己的家居清洁产品

```yaml
structure_mapping:
  meta:
    reference_summary: "参考视频采用问题开场、快速喷洒演示、结果展示和软推荐 CTA 的电商短视频结构"
    current_product_summary: "用户产品为家居清洁类产品，希望做一条适合 TikTok / 抖音的带货短视频"
    mapping_goal: "保留参考视频的停留与证明结构，重写为用户自己的产品问题场景、演示动作和 CTA"
    target_platform: "generic_ecommerce_short_video"
    target_use_case:
      - "conversion_video"
      - "ugc_ad"
      - "ai_video_generation"
    assumptions:
      - "默认用户希望借鉴打法而非复刻原品牌内容"
      - "默认新视频仍以结果和省力为主卖点"
  structural_transfer:
    keep_pattern:
      - "问题开场快速建立代入"
      - "产品在前段尽快进入"
      - "动作演示后紧接结果镜头"
      - "结尾使用低压力推荐式 CTA"
    modify_pattern:
      - "原参考中的厨房油污问题改为当前产品对应的家居清洁问题"
      - "原人物口播比例根据新执行方式调整"
      - "结果镜头的呈现方式需按当前产品最容易看懂的变化重做"
    replace_pattern:
      - "原品牌包装和标签"
      - "原口播句式"
      - "原产品使用区域和细节"
      - "原视频中的强 claim 表达"
    remove_pattern:
      - "原视频中依赖特定人物语气的段落"
      - "与当前产品无关的厨房场景细节"
      - "不适合 AI 稳定生成的复杂移动镜头"
  segment_mapping:
    hook:
      reference_function: "用高频油污问题在前1秒建立停留"
      new_function: "用当前产品对应的日常清洁痛点快速建立代入"
      keep_from_reference:
        - "问题先出"
        - "大字幕问题句"
        - "画面一眼可懂"
      change_for_current_task:
        - "改成当前产品最典型、最容易视觉化的问题"
        - "避免沿用原视频句式和原场景摆位"
    demo:
      reference_function: "通过喷洒和擦拭动作证明产品有效"
      new_function: "通过当前产品最直观的使用动作和结果变化完成说服"
      keep_from_reference:
        - "产品介入问题后快速给动作"
        - "动作后立即给结果"
        - "中段保持快切证明节奏"
      change_for_current_task:
        - "将原动作替换为当前产品真实使用方式"
        - "将结果镜头改为更适合当前产品的变化展示"
        - "如用于 AI 生成，拆成更清晰的关键步骤"
    cta:
      reference_function: "结果后补一句省力推荐，低压力收口"
      new_function: "根据当前产品场景，用更贴近目标用户的建议式 CTA 收尾"
      keep_from_reference:
        - "结果后再 CTA"
        - "语气偏真实建议，不强喊单"
      change_for_current_task:
        - "换成用户产品的人群和场景语境"
        - "如果人物弱化，则用包装+结果镜头承担更多 CTA 任务"
  message_mapping:
    original_primary_logic: "这个产品能让厨房油污更容易处理"
    new_primary_logic: "这个产品能让当前目标清洁问题更轻松、更高效地解决"
    carry_over_elements:
      - "问题→动作→结果→推荐的说服顺序"
      - "先视觉证明，再口播总结"
      - "用省力/方便作为接近 CTA 的价值点"
    rewritten_elements:
      - "问题场景"
      - "演示动作"
      - "结果描述"
      - "CTA 口播句式"
      - "字幕关键词"
    avoid_elements:
      - "原视频品牌话术"
      - "原视频绝对化结果措辞"
      - "原视频特定出镜人语感"
  visual_mapping:
    reusable_shot_logic:
      - "问题近景"
      - "产品进入动作镜头"
      - "结果特写镜头"
      - "结尾产品收口镜头"
    adapted_shot_logic:
      - "原喷洒擦拭动作改为当前产品的真实使用动作"
      - "原人物对镜镜头改为适合当前执行方式的人物或产品镜头"
      - "原厨房背景改为用户产品最相关场景"
    non_reusable_shot_logic:
      - "原包装正面 hero shot"
      - "原人物表演节奏的一比一模仿"
      - "原视频高度依赖动态手持的镜头串联"
  pacing_mapping:
    preserve:
      - "前段快进问题"
      - "中段快切动作与结果"
      - "结尾留一拍稳定识别产品"
    adjust:
      - "根据当前产品复杂度调整中段解释长度"
      - "如果结果不够强，增加一个 close-up 确认镜头"
      - "如为 AI 生成，减少过快和过碎的运动描述"
    avoid:
      - "照搬原视频每一拍节奏点"
      - "结果出现过晚"
      - "结尾突然结束没有识别停留"
  adaptation_blueprint:
    recommended_new_flow: "保留参考视频的问题—动作—结果—推荐骨架，但将问题、动作、结果和 CTA 全部替换为用户产品自己的真实使用逻辑，并为 AI 生成优化镜头清晰度"
    build_order:
      - "先确定当前产品最典型的问题场景"
      - "再定义新的 hook 句和开场画面"
      - "重建中段动作与结果证明链"
      - "改写贴合当前人群的 CTA"
      - "最后输出适合拍摄或 AI 生成的 storyboard"
    emphasis_points:
      - "产品应尽早被识别"
      - "结果镜头必须比参考更适合当前产品"
      - "字幕要支持静音观看"
      - "控制与原参考的相似度"
  risk_controls:
    similarity_risks:
      - "Hook 问题句若结构过近，容易显得直接模仿"
      - "镜头顺序完全相同会增加相似感"
      - "结尾 CTA 语气若太像原视频，会削弱新版本独立性"
    compliance_risks:
      - "若沿用原视频强结果措辞，可能造成绝对化表达风险"
      - "若参考视频有未证实 claim，不应迁移到新版本"
    mitigation_actions:
      - "改写口播机制而不复用原句"
      - "重组中段动作顺序"
      - "更换场景、人物与包装呈现方式"
      - "使用更稳妥的结果语言"
  notes:
    - "本次映射应以保留参考说服路径为主，而非保留参考视觉表面"
    - "后续下游写作应优先利用本蓝图重写 hook、demo 和 CTA"
```

---

## 必要时的补问规则

只有在当前产品或“想保留哪些参考元素”不明确时，才允许一次性补问，优先问：

1. 你想保留参考里的哪一部分：hook、节奏、镜头感觉，还是卖点结构？
2. 你的产品最想打的核心卖点是什么？
3. 这条新视频更偏真人拍摄、AI 出图，还是 AI 视频？
4. 有哪些元素一定不能像参考，比如人物、包装、文案语气？
5. 你希望更偏“同打法新内容”，还是“同风格弱参考”？

如果不问也能从上下文推断，就直接输出结构映射蓝图。

---

## 禁止事项

不要在本步骤中：

- 直接输出完整新分镜
- 建议一比一复刻原参考
- 只说“保留结构、换内容”而不具体化
- 忽视当前产品逻辑与参考逻辑不兼容的问题
- 不区分可保留、需改写、必须删除的部分
- 忽视相似度/IP/claim 风险
- 因信息有限而不给出可用映射蓝图

---

## 最终要求

本步骤必须输出一份 `structure_mapping` YAML，让后续步骤明确知道：

1. 参考结构如何迁移到当前任务
2. 哪些段落逻辑保留，哪些必须重写
3. 新版本的 hook / demo / CTA 应如何重建
4. 如何既保留打法又避免抄袭感
5. 下一步应该按什么顺序写成新脚本和分镜

即使当前输入不完整，也要给出一个合理、可执行的结构映射初版。
