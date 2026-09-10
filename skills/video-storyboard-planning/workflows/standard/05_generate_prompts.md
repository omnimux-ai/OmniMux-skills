# Generate Prompts

本步骤负责基于 `storyboard` 产出适合后续 AI 生成使用的提示词资产。与 `04_build_storyboard` 中每镜头自带的基础 `generation_prompt` 不同，本步骤要做的是**系统化、可直接投喂模型、带一致性策略的 prompt 包**，用于：

- AI 出图
- 图生视频
- 视频首帧生成
- 镜头关键帧生成
- 统一风格的分镜图产出
- 后续视频模型 prompt 的前置素材整理

本步骤的重点不是重新写分镜，而是把分镜“翻译”为一套稳定、模型友好、可批量执行的提示体系。

---

## 目标

基于 `storyboard` 生成：

1. 全局风格提示词
2. 全局一致性约束
3. 逐镜头高质量图像提示词
4. 逐镜头负面提示词
5. 图生视频可用的关键帧建议
6. 首轮生成优先级建议
7. 需要参考图支持的镜头提醒
8. 如适用：适配 AI 视频的镜头 prompt 简化版

---

## 核心原则

### 1. Prompt 必须服务生成，不是服务阅读

输出的 prompt 应该优先让图像/视频模型“理解该生成什么”，而不是让人觉得文案好看。

### 2. 优先稳定一致，而非逐镜头炫技

同一条视频中的镜头，默认应保持：

- 同一人物身份
- 同一服装与发型
- 同一产品包装
- 同一空间逻辑
- 同一时间段与光线策略
- 同一风格方向

不要为了每个镜头更“好看”而让整体漂移。

### 3. Prompt 要保留分镜目的

每个镜头 prompt 都必须反映镜头在分镜中的作用：

- hook
- demo
- proof
- comparison
- reaction
- CTA

不要把所有镜头都写成“高级产品海报”。

### 4. 结构化 + 易读双输出

既要有 YAML 方便后续系统处理，也要有简洁可读版方便用户审阅。

### 5. 默认适配商业短视频生成场景

若用户未指定模型，默认按以下倾向写 prompt：

- 写实
- 商业可用
- 竖屏 9:16
- 主体清楚
- 适合字幕叠加
- 产品辨识度高
- 不过度超现实
- 不依赖复杂电影特效

---

## 输入依赖

本步骤主要消费：

- `parsed_input`
- `angle_definition`
- `shootable_script`
- `storyboard`

重点使用：

- `storyboard.meta`
- `storyboard.global_cast`
- `storyboard.global_product`
- `storyboard.global_environment`
- `storyboard.scenes`
- `continuity_constraints`
- `output_preferences`
- `usage_context`

---

## 输出格式

本步骤统一输出 YAML，并在后面追加一个 Markdown 表格摘要。

标准结构如下：

```yaml
prompt_package:
  meta:
    objective: ""
    intended_use: []
    output_language: ""
    aspect_ratio: "9:16"
    visual_mode: ""
    consistency_priority: ""
    assumptions: []
  global_style_anchors:
    realism: ""
    format: ""
    visual_style: ""
    lighting: ""
    color_palette: ""
    framing_bias: ""
    continuity_priority: ""
  global_consistency:
    character:
      identity: ""
      hair: ""
      wardrobe: ""
      makeup: ""
      expression_range: ""
    product:
      pack_shape: ""
      pack_color: ""
      logo_rule: ""
      orientation_rule: ""
      material_rule: ""
    environment:
      location: ""
      surfaces: ""
      props_rule: ""
      background_rule: ""
    lighting:
      time_of_day: ""
      direction: ""
      stability_rule: ""
    avoid_drift: []
  image_prompts:
    - scene_id: "S01"
      beat: ""
      priority: "high"
      purpose: ""
      use_case: []
      image_spec:
        aspect_ratio: "9:16"
        framing: ""
        angle: ""
        composition: ""
        subject: ""
        action: ""
        environment: ""
        lighting: ""
        product_visibility: ""
        text_safe_area: ""
        continuity_must_keep: []
      prompt: ""
      negative_prompt: ""
      prompt_short: ""
      variants: []
      first_frame_candidate: false
      reference_image_recommended: false
      notes: ""
  video_prompt_adaptations:
    - scene_id: "S01"
      concise_motion_prompt: ""
      start_frame_goal: ""
      end_frame_goal: ""
  global_negative_prompt: []
  generation_strategy:
    priority_order: []
    batching_suggestion: []
    review_focus: []
```

---

## `meta` 字段说明

### `objective`
一句话说明这套 prompt 包的用途，例如：

- “为 8 镜头厨房清洁喷雾分镜生成统一风格的 AI 出图提示词”
- “为竖屏护肤广告分镜生成关键帧与图生视频前置素材提示词”

### `intended_use`
数组，可包含：

- `storyboard_images`
- `first_frame_generation`
- `image_to_video`
- `client_review`
- `look_development`
- `shot_visualization`

### `output_language`
提示词主语言。如果用户未指定模型偏好，可跟随用户语言；如明确偏英文模型，可用英文或中英混合，但必须稳定一致。

### `visual_mode`
可写：

- `photorealistic`
- `commercial_realism`
- `ugc_realism`
- `premium_product_visual`
- `hybrid_storyboard_frame`

### `consistency_priority`
用一句话说明本次最优先锁定的内容。

---

## 全局风格锚点

### `global_style_anchors`
用于统一所有镜头视觉方向。

字段建议：

- `realism`
- `format`
- `visual_style`
- `lighting`
- `color_palette`
- `framing_bias`
- `continuity_priority`

示例：

```yaml
global_style_anchors:
  realism: "photorealistic, commercially believable, natural skin and material rendering"
  format: "vertical 9:16"
  visual_style: "high-conversion ecommerce short video frames, realistic TikTok-native composition"
  lighting: "soft natural daylight with clean contrast, readable product highlights"
  color_palette: "neutral home environment with product-true colors"
  framing_bias: "clear subject emphasis, simple background, leave room for text overlays"
  continuity_priority: "keep the same host identity, wardrobe, kitchen layout, and spray bottle packaging across all shots"
```

---

## 全局一致性约束

### `global_consistency`
必须系统化提炼分镜里的不变项。

#### `character`
如有人物，至少明确：

- 身份
- 发型
- 服装
- 妆容
- 表情范围

#### `product`
至少明确：

- 包装形状
- 主色
- 标签/品牌规则
- 朝向规则
- 材质规则

#### `environment`
至少明确：

- 场景
- 台面/材质
- 道具边界
- 背景复杂度

#### `lighting`
明确：

- 时间感
- 光线方向
- 稳定性要求

#### `avoid_drift`
列出所有禁止漂移点，例如：

- 不要变人
- 不要变包装
- 不要换房间
- 不要忽然夜景
- 不要广告棚拍感过强（如果是 UGC）
- 不要无故添加第二人物

---

## `image_prompts` 逐镜头输出规范

这是本步骤核心。

### `scene_id`
必须与 storyboard 一致。

### `beat`
对应镜头功能标签。

### `priority`
建议值：

- `high`
- `medium`
- `low`

通常这些镜头优先级更高：

- hook
- 关键演示
- 结果展示
- before/after
- CTA packshot

### `purpose`
说明本镜头生成图的核心作用，例如：

- hook frame
- proof frame
- action demo frame
- product hero frame
- reaction frame
- CTA keyframe

### `use_case`
数组，可包含：

- `storyboard_images`
- `first_frame_generation`
- `image_to_video`
- `review_frame`
- `look_lock_reference`

### `image_spec`
将镜头核心规格整理成结构化字段。

#### 包含字段：
- `aspect_ratio`
- `framing`
- `angle`
- `composition`
- `subject`
- `action`
- `environment`
- `lighting`
- `product_visibility`
- `text_safe_area`
- `continuity_must_keep`

---

## `prompt` 写作要求

每个 prompt 必须：

1. 可直接给图像模型使用
2. 包含主体、动作、环境、光线、构图、风格
3. 明确产品/人物一致性要求
4. 适合商业短视频镜头而非静态海报过度摆拍
5. 默认考虑 9:16 竖屏
6. 留意字幕安全区
7. 反映当前镜头的功能，而不是泛化描述

### 推荐骨架

```text
A vertical 9:16 photorealistic ecommerce short-video frame showing [主体] [动作] in [场景]. [产品露出方式]. [光线描述]. [构图描述]. Realistic TikTok-style commercial frame, clear subject separation, natural textures, leave space for text overlay, maintain consistent character identity, wardrobe, environment, and packaging details across the sequence.
```

### 中文 prompt 写法要求

如果以中文输出 prompt，不要堆砌关键词式断句。应写成清晰自然的图像描述，例如：

“竖屏 9:16 写实电商短视频画面，一位穿浅色居家服的女性在明亮家庭厨房里，右手拿白色喷瓶朝带油污的台面喷洒，绿色标签清晰稳定，白天自然侧光，主体清楚，背景简洁，左上预留字幕空间，保持人物与产品包装在整组镜头中一致。”

---

## `negative_prompt` 写作要求

每镜头必须独立提供，至少覆盖：

- 多余手指
- 手部畸形
- 多余人物
- 产品变形
- 包装颜色漂移
- logo 错误
- 字体乱码
- 背景过杂
- 过度磨皮
- 不合理透视
- 过度电影化或幻想感
- 不符合场景逻辑的道具

并根据镜头用途补充，例如：

- 包装镜头：不要裁切关键标签区域
- 手部动作镜头：不要遮住喷头
- before/after 镜头：不要让结果夸张到失真
- UGC 镜头：不要棚拍海报感过强

---

## `prompt_short`
为每镜头给一个简化版摘要，便于快速审阅或用于表格中展示。

要求：

- 15–35 字左右
- 提炼主体 + 动作 + 场景 + 重点

例如：

- “厨房油污台面近景，白天自然光，问题钩子画面”
- “女性手持喷雾喷洒台面，产品标签清晰稳定”
- “擦拭后干净台面结果特写，强调变化清楚”

---

## `variants`
为每镜头提供 2–3 个轻微变体方向，不是完全重写 prompt。

适合的变体类型：

- 更近一点
- 字幕空间更多
- 产品朝镜头更正
- 手部动作更明显
- 背景更简洁
- 结果区域更突出
- 更偏 UGC / 更偏商业一点

示例：

```yaml
variants:
  - "更近的手部喷洒特写，强调喷头与液体方向"
  - "保留更多左侧字幕空间，产品位于中右区域"
  - "背景更简洁，弱化非必要厨房道具"
```

---

## `first_frame_candidate`
布尔值。若该镜头特别适合作为图生视频首帧，标 `true`。

通常适合作为首帧的镜头：

- 构图稳定
- 主体明确
- 动作起始清楚
- 画面信息集中
- 不依赖前后文才能理解

### 不太适合作首帧的镜头
- 纯过渡镜头
- 需要中间运动状态才能成立的镜头
- 画面要素过多且复杂
- 叙事依赖前一镜头强

---

## `reference_image_recommended`
如果某镜头很依赖产品包装、人物一致性或复杂场景，建议标 `true`，表示后续最好配参考图。

常见需要参考图的情形：

- 包装有明确品牌外观
- 主人公脸部需要跨镜头高度一致
- 产品细节很重要
- 同场景多镜头连续要求高

---

## `notes`
补充说明，例如：

- “建议先低复杂度出第一版确认包装”
- “如人物一致性要求高，建议锁定同一参考脸”
- “适合作为首轮 look-dev 判断图”
- “若结果不够清楚，第二轮应增强对比区域可见性”

---

## `video_prompt_adaptations`

如果后续要用于图生视频或视频模型，可为每镜头再补一个精简运动版 prompt。

结构：

- `scene_id`
- `concise_motion_prompt`
- `start_frame_goal`
- `end_frame_goal`

示例：

```yaml
video_prompt_adaptations:
  - scene_id: "S02"
    concise_motion_prompt: "A woman’s hand lifts a white spray bottle and sprays cleaning mist across a greasy kitchen counter, slight handheld motion, natural daylight, vertical 9:16."
    start_frame_goal: "product enters clearly with label readable"
    end_frame_goal: "spray action completes with mist visible over the dirty surface"
```

要求：

- 更偏动作与时间变化
- 不要重复静态细枝末节太多
- 适合视频模型理解起止动作

---

## `global_negative_prompt`

全局负面提示词数组，用于所有镜头共享的通用规避项。

至少建议包含：

```yaml
global_negative_prompt:
  - "extra fingers"
  - "deformed hands"
  - "extra people"
  - "wrong logo"
  - "distorted product packaging"
  - "label color drift"
  - "garbled text"
  - "messy cluttered background"
  - "unrealistic reflections"
  - "warped perspective"
  - "overly airbrushed skin"
  - "fantasy cinematic look"
```

如是中文，也可使用中文，但要保持模型可理解性；若面向英文模型，优先英文。

---

## `generation_strategy`

说明实际执行建议。

### `priority_order`
建议首轮先生成哪些镜头，按顺序列出 `scene_id`。

一般优先：

1. Hook
2. 关键产品动作
3. 结果镜头
4. CTA packshot

### `batching_suggestion`
说明哪些镜头可一起批量生成。例如：

- 同场景、同人物、同光线的一组
- 同一产品特写的一组
- 同一 before/after 对比的一组

### `review_focus`
说明首轮审图重点，例如：

- 产品包装是否稳定
- 人物是否一致
- 字幕区是否足够
- 结果是否清楚
- UGC 感是否过强或过弱
- 背景是否太杂

---

## 易读版摘要表

在 YAML 后，必须输出 Markdown 表格：

| 镜头 | 功能 | 主提示词摘要 | 构图重点 | 产品露出 | 优先级 | 首帧候选 |
|---|---|---|---|---|---|---|

要求：

- 一镜头一行
- 可快速审阅
- 与 YAML 保持一致
- 不要过长

---

## 生成策略建议

### 首轮建议
先出最能判断全局方向的镜头：

- 开头 hook
- 关键演示
- 结果证明
- CTA 包装

### 第二轮建议
再补：

- 反应镜头
- 过渡镜头
- 重复信息的细节镜头

### 对一致性要求高时
建议：

- 先锁定人物参考图
- 先锁定产品包装参考图
- 同场景镜头尽量同批生成
- 先验证光线/背景逻辑，再扩大批次

---

## 不同视频类型的 prompt 倾向

### 真人 UGC
重点：

- 自然皮肤
- 真实居家环境
- 手机拍摄感
- 不要过强商业棚拍
- 手部动作清楚

### 纯产品广告
重点：

- 包装精确
- 材质质感
- 构图简洁
- 背景干净
- 高光控制

### 演示/功效广告
重点：

- 问题区域可见
- 使用动作清晰
- 结果区域清晰
- 对比逻辑自然
- 不像夸张特效

---

## 合规处理要求

若存在风险项，本步骤需在 prompt 层面规避夸张表达：

- 不要写“magic”, “instant miracle”, “medical cure” 等高风险词
- 不要生成夸张到失真的 before/after
- 不要加入未经说明的认证、实验室、专家背书元素
- 对效果镜头优先强调“visible improvement / clearer result / cleaner appearance”等相对稳妥表达

---

## 示例

```yaml
prompt_package:
  meta:
    objective: "为厨房清洁喷雾短视频分镜生成统一风格的 AI 出图提示词"
    intended_use:
      - "storyboard_images"
      - "first_frame_generation"
      - "image_to_video"
    output_language: "zh-CN"
    aspect_ratio: "9:16"
    visual_mode: "commercial_realism"
    consistency_priority: "优先保持同一女性演示者、同一厨房空间和同一喷雾包装"
    assumptions:
      - "默认用于竖屏短视频关键帧生成"
  global_style_anchors:
    realism: "写实、商业可信、不过度风格化"
    format: "vertical 9:16"
    visual_style: "高转化电商短视频画面，真实 TikTok 原生构图"
    lighting: "白天自然侧光，产品高光清晰但不过曝"
    color_palette: "干净中性色家居环境，产品颜色真实稳定"
    framing_bias: "主体清晰突出，背景简洁，预留字幕区"
    continuity_priority: "人物、产品包装、台面和光线逻辑在整组镜头中保持稳定"
  global_consistency:
    character:
      identity: "同一位 25-35 岁女性居家演示者，亲和自然"
      hair: "深色中长发，造型保持一致"
      wardrobe: "浅色简洁居家服"
      makeup: "自然淡妆"
      expression_range: "真实、利落、满意，不夸张表演"
    product:
      pack_shape: "同一白色喷瓶轮廓"
      pack_color: "白色瓶身配绿色标签"
      logo_rule: "不要发明或扭曲品牌标识"
      orientation_rule: "标签朝镜头时保持位置稳定"
      material_rule: "瓶身塑料质感真实，不要变成玻璃或金属"
    environment:
      location: "明亮家庭厨房"
      surfaces: "浅色厨房台面"
      props_rule: "只保留与清洁相关的基础家居道具，不要杂乱堆叠"
      background_rule: "背景简洁真实，不要变成商业棚拍背景"
    lighting:
      time_of_day: "daytime"
      direction: "soft side daylight"
      stability_rule: "相邻镜头保持相同白天自然光逻辑"
    avoid_drift:
      - "不要更换人物"
      - "不要改变包装颜色"
      - "不要从厨房切换到其他房间"
      - "不要加入额外人物"
      - "不要突然变成重电影打光"
  image_prompts:
    - scene_id: "S01"
      beat: "hook"
      priority: "high"
      purpose: "hook frame"
      use_case:
        - "storyboard_images"
        - "review_frame"
      image_spec:
        aspect_ratio: "9:16"
        framing: "close_up"
        angle: "high_angle"
        composition: "油污台面占据主要画面，上方留字幕空间"
        subject: "带油污的厨房台面"
        action: "镜头聚焦做饭后残留的油污与脏痕"
        environment: "家庭厨房"
        lighting: "白天自然侧光，油污反光清晰"
        product_visibility: "not_visible"
        text_safe_area: "top_safe"
        continuity_must_keep:
          - "同一厨房台面材质"
          - "同一白天光线逻辑"
      prompt: "竖屏 9:16 写实电商短视频关键帧，家庭厨房浅色台面近景，做饭后残留的明显油污和脏痕清晰可见，白天自然侧光，真实手机拍摄临场感，主体聚焦在脏污区域，背景轻微虚化，顶部预留字幕空间，真实家居环境，不过度美化。"
      negative_prompt: "多余人物，奇怪手部，油污不清楚，透视错误，背景杂乱，过度电影化，夸张特效，乱码文字，台面材质漂移，不真实反光"
      prompt_short: "厨房油污台面近景，问题钩子画面"
      variants:
        - "更近的脏污局部特写，强化问题感"
        - "留更多顶部字幕空间"
        - "背景更简洁，弱化厨房杂项"
      first_frame_candidate: true
      reference_image_recommended: false
      notes: "适合作为开头关键判断图，重点看痛点是否一眼可懂"
  video_prompt_adaptations:
    - scene_id: "S01"
      concise_motion_prompt: "Close high-angle view of a greasy kitchen counter in daylight, slight handheld movement, vertical 9:16, realistic home setting."
      start_frame_goal: "dirty countertop is immediately readable"
      end_frame_goal: "viewer clearly understands the cleaning problem"
  global_negative_prompt:
    - "extra fingers"
    - "deformed hands"
    - "extra people"
    - "wrong logo"
    - "distorted product packaging"
    - "label color drift"
    - "garbled text"
    - "messy cluttered background"
    - "warped perspective"
    - "overly airbrushed skin"
    - "fantasy cinematic look"
  generation_strategy:
    priority_order:
      - "S01"
      - "S02"
      - "S04"
      - "S07"
    batching_suggestion:
      - "同一厨房同一人物的连续镜头可同批生成"
      - "产品特写镜头单独一批，便于锁包装"
    review_focus:
      - "人物与产品包装是否稳定"
      - "字幕区是否足够"
      - "结果画面是否足够清楚"
      - "UGC 感和商业感是否平衡"
```

---

## 必要时的补问规则

只有在 prompt 生成质量会明显受影响时，才一次性补问：

1. 这些 prompt 主要用于 AI 出图、图生视频，还是视频模型关键帧？
2. 你更希望提示词输出中文还是英文？
3. 是否有必须锁定的人物或产品参考图？
4. 更偏真实 UGC 还是精致广告风？
5. 是否要特别适配某个模型的提示词风格？

如果不问也能基于默认假设输出，就直接输出，并在 `meta.assumptions` 中写明。

---

## 禁止事项

不要在本步骤中：

- 只是复制 storyboard 原文
- 不输出全局一致性约束
- 不输出逐镜头 negative prompt
- 不写首轮优先级建议
- 让镜头 prompt 之间明显风格漂移
- 写成纯文学描述，不利于生成
- 编造品牌事实
- 强化高风险功效表达
- 因为没有参考图就拒绝给初版 prompt 包

---

## 最终要求

本步骤必须输出一套完整 `prompt_package`，使后续用户或系统能够：

1. 批量生成分镜图
2. 先生成关键帧确认方向
3. 进行图生视频前的视觉锁定
4. 维持人物、产品、场景的一致性
5. 快速审阅每个镜头的生成目标

即使输入信息有限，也要在合理假设下给出一个可用初版，而不是只给原则说明。
