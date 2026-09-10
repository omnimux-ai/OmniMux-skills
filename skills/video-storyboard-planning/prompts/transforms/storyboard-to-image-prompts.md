# Storyboard to Image Prompts

将结构化分镜图（storyboard）转换为适合 AI 出图的逐镜头高质量图像提示词。目标是让每个镜头都能生成可审阅、可拼板、可作为视频首帧或分镜图的关键画面，同时尽可能维持人物、产品、场景和风格一致性。

---

## 目标

把输入的 storyboard / 镜头表 / 分镜 YAML 转成：

1. 全局风格锚点
2. 全局一致性约束
3. 每个镜头的出图提示词
4. 每个镜头的负面提示词
5. 构图与字幕安全区说明
6. 可选：首轮出图优先级建议
7. 可选：哪些镜头适合作为参考图继续生成视频

输出必须适用于：

- 分镜图制作
- 视频首帧生成
- 关键帧审阅
- 提前确认场景/服化道/产品露出
- 后续图生视频或视频生成前的视觉定稿

---

## 适用输入

接受以下输入形式：

- 完整 storyboard YAML
- 镜头表（Markdown/表格）
- 已拆好的 shot list
- 分镜描述文本
- 混合输入：分镜 + 产品信息 + 风格要求 + 参考图说明

---

## 基本原则

### 1. 输出的是“图像提示词”，不是重新写分镜

不要重复写长篇镜头策划。重点是把每个镜头转成**可以直接交给图像模型理解的 prompt**。

### 2. 保留镜头意图，而不是逐字复述原文

需要提炼出真正影响画面的要素：

- 主体是谁
- 在做什么
- 在哪里
- 如何构图
- 光线如何
- 情绪和风格如何
- 产品如何出现
- 哪些元素必须锁定一致

### 3. 一致性优先于花哨

如果分镜是同一条视频中的连续镜头，默认优先保持：

- 同一人物长相与年龄感
- 同一服装
- 同一产品包装
- 同一场景风格
- 同一时间段与光线逻辑

不要为了“每张图都好看”而把每镜头做成不同广告风格。

### 4. 提示词要适合商业短视频场景

默认偏好：

- 写实
- 可商用
- 构图清楚
- 主体明确
- 产品可辨识
- 便于后续加字幕
- 适合 9:16 竖屏

### 5. 若信息不足，合理补全并写出假设

如果原分镜没有明确说明：

- 人物长相
- 场景细节
- 光线
- 产品材质
- 构图

可以按商业短视频常识补全，但必须在“假设项”中说明。

---

## 输出结构

默认按以下顺序输出：

1. 转换说明
2. 全局风格锚点
3. 全局一致性约束
4. 逐镜头图像提示词 YAML
5. 易读版提示词表
6. 负面提示词总表
7. 出图优先级建议（如适用）

---

## 第一部分：转换说明

简要说明本次转换的目标和假设，例如：

```yaml
conversion_overview:
  objective: "将 9 镜头清洁产品分镜转换为可直接用于 AI 出图的逐镜头提示词"
  intended_use:
    - "分镜图审阅"
    - "视频首帧参考"
    - "图生视频前置视觉定稿"
  assumptions:
    - "默认输出为 9:16 竖屏商业短视频关键帧"
    - "默认保持同一人物、同一产品包装、同一厨房场景连续性"
```

---

## 第二部分：全局风格锚点

输出一组对所有镜头都生效的风格锚点，帮助保持统一视觉语言。

应覆盖以下内容：

- 写实程度
- 广告感 / UGC 感 / 电影感倾向
- 画幅
- 光线风格
- 色彩倾向
- 镜头清晰度
- 商业用途约束
- 字幕安全区意识

示例：

```yaml
global_style_anchors:
  realism: "photorealistic, commercially believable, not overly stylized"
  format: "vertical 9:16"
  visual_style: "high-conversion short-form ecommerce ad, realistic mobile-first composition"
  lighting: "soft natural daylight with clean highlights, product-readable contrast"
  color_palette: "clean neutral background with product-true colors"
  framing_bias: "clear subject separation, simple backgrounds, leave room for text overlays"
  continuity_priority: "character, product packaging, and environment must remain stable across shots"
```

---

## 第三部分：全局一致性约束

把分镜里需要锁定的内容提炼成统一约束，避免逐镜头提示词漂移。

至少包括：

- 人物一致性
- 产品一致性
- 场景一致性
- 品牌元素一致性
- 光线/时间一致性
- 禁止漂移项

示例：

```yaml
global_consistency:
  character:
    identity: "same woman across all applicable shots, late 20s to early 30s, natural appearance"
    hair: "dark shoulder-length hair, consistent style"
    wardrobe: "light neutral casual homewear, unchanged across sequence"
    makeup: "minimal natural makeup"
  product:
    pack_shape: "same spray bottle silhouette in every shot"
    pack_color: "consistent white bottle with green label"
    logo_rule: "do not invent or distort branding"
    orientation_rule: "when label faces camera, keep label placement stable"
  environment:
    location: "same bright home kitchen"
    surfaces: "light countertop, clean domestic setting"
    props_rule: "props should support cleaning context without clutter"
  lighting:
    time_of_day: "daytime"
    direction: "soft side daylight, stable across scene sequence"
  avoid_drift:
    - "no extra people unless specified"
    - "no packaging color drift"
    - "no changing room style between adjacent shots"
    - "no surreal cinematic effects unless specified"
```

---

## 第四部分：逐镜头图像提示词 YAML

这是核心输出。每个镜头一条，适合直接拿去生成图片。

使用如下结构：

```yaml
image_prompts:
  - scene_id: "S01"
    priority: "high"
    purpose: "hook frame"
    keep_from_storyboard:
      beat: "hook"
      duration_sec: 1.2
      on_screen_text: ""
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
      continuity_must_keep: []
      text_safe_area: ""
    prompt: ""
    negative_prompt: ""
    variants:
      - ""
      - ""
    notes: ""
```

### 字段说明

#### `scene_id`
与 storyboard 保持一致。

#### `priority`
用于建议首轮先出哪些图，建议值：

- `high`
- `medium`
- `low`

通常以下镜头优先级更高：

- hook
- 产品关键演示
- before/after
- CTA packshot

#### `purpose`
说明该图的用途，例如：

- hook frame
- product proof frame
- transformation frame
- reaction frame
- CTA board frame

#### `keep_from_storyboard`
保留原分镜中的关键结构信息，方便追溯。不要冗长。

#### `image_spec`
将影响画面的关键规格结构化。

包含：

- `aspect_ratio`
- `framing`
- `angle`
- `composition`
- `subject`
- `action`
- `environment`
- `lighting`
- `product_visibility`
- `continuity_must_keep`
- `text_safe_area`

#### `prompt`
主提示词，必须满足以下要求：

1. 用自然、清晰、具体的视觉语言描述
2. 包含主体、动作、场景、光线、风格、构图、镜头感
3. 明确产品或人物一致性要求
4. 默认适配商业图像模型
5. 不要写成过度口语化命令堆砌
6. 不要只抄 YAML 字段，必须整合成高质量自然语言 prompt

#### `negative_prompt`
每镜头必须提供，至少覆盖：

- 解剖错误
- 多余手指
- 多余人物
- 产品变形
- logo 错误
- 包装颜色漂移
- 文本乱码
- 背景过杂
- 夸张滤镜
- 不合理透视

#### `variants`
给出 2–3 个轻微变体方向，不是完全重写。适合首轮探索，例如：

- 更近一点
- 手部动作更明显
- 背景更简洁
- 留更多字幕空间
- 产品更朝向镜头

#### `notes`
可写：

- 是否适合作为视频首帧
- 是否建议先出低复杂度版本
- 是否需要额外参考图锁定产品

---

## Prompt 写作规范

### 好的 prompt 应包含

- 主体身份
- 明确动作
- 场景位置
- 可感知光线
- 商业图像风格
- 构图方式
- 重点展示对象
- 真实度要求
- 一致性约束
- 适合竖屏的画面组织

### 示例骨架

```text
A vertical 9:16 photorealistic ecommerce ad frame showing [主体] [动作] in [场景]. The [产品] is clearly visible [露出方式]. [光线描述]. [构图描述]. Realistic commercial short-video style, clean background, product-true colors, natural skin texture, designed for TikTok-style text overlay, maintain consistent character identity and packaging details.
```

如果输出语言为中文，也可以写中文 prompt；但若用户明确用于英文模型，可优先输出英文 prompt，并在必要时附简短中文说明。

---

## 构图规则

每镜头必须明确构图意图，尤其注意：

### 1. 字幕安全区
常用值：

- `top_safe`
- `bottom_safe`
- `left_safe`
- `right_safe`
- `center_clear_for_packshot`

### 2. 焦点层次
明确谁是视觉焦点：

- 人脸
- 手部动作
- 产品包装
- 结果区域
- 使用前后差异

### 3. 竖屏适配
避免横向铺太满，优先：

- 中轴构图
- 上下分层
- 单主体清晰突出
- 边缘不过于拥挤

---

## 负面提示词规范

默认全局负面提示词可包含：

```yaml
global_negative_prompt:
  - "extra fingers"
  - "deformed hands"
  - "extra people"
  - "wrong logo"
  - "distorted packaging"
  - "color drift in product label"
  - "garbled text"
  - "overly airbrushed skin"
  - "unrealistic reflections"
  - "messy cluttered background"
  - "warped perspective"
  - "overly cinematic fantasy look"
```

但每镜头还要根据实际内容补充专属负面项，例如：

- 厨房台面不要多余食材
- 护肤产品不要液体乱飞
- 口播镜头不要出现多只手
- 包装镜头不要裁切 logo 关键区域

---

## 易读版提示词表

在 YAML 之后，再输出一个便于审阅的 Markdown 表格：

| 镜头 | 用途 | 主提示词摘要 | 构图重点 | 产品露出 | 优先级 |
|---|---|---|---|---|---|

要求：

- 一镜头一行
- 提示词摘要不要太长
- 能让用户快速判断是否符合预期

---

## 出图优先级建议

如镜头较多，应在最后补充建议：

### 建议先出的镜头
优先首轮生成这些镜头：

1. Hook 镜头
2. 产品关键卖点镜头
3. 结果展示镜头
4. CTA 包装镜头

原因：

- 最能判断整体风格方向是否正确
- 最能尽早发现人物/产品一致性问题
- 最能决定是否需要调整场景和光线策略

### 建议后出的镜头
通常可放在第二轮的镜头：

- 过渡镜头
- 反应镜头
- 装饰性插入镜头
- 与主叙事重复度较高的细节镜头

---

## 针对不同类型分镜的转换策略

### 1. 真人口播 / UGC 分镜

提示词重点：

- 自然人物状态
- 手机拍摄感
- 真实室内环境
- 手势清晰
- 留字幕区
- 不要过度精修广告脸

优先保留：

- 人物可信度
- 产品自然露出
- 使用动作真实

### 2. 纯产品广告分镜

提示词重点：

- 包装形状精确
- 材质真实
- 高光控制
- 干净背景
- 构图简洁
- 标签可见但不要乱码

优先保留：

- 产品一致性
- 质感
- 可辨识细节

### 3. 功效/演示型分镜

提示词重点：

- 使用前状态清晰
- 使用中动作清晰
- 使用后结果清晰
- 前后差异可见
- 不要像假特效

优先保留：

- 证明逻辑
- 结果可视化
- 真实可信

### 4. 美妆/护肤分镜

提示词重点：

- 皮肤质感自然
- 产品瓶身一致
- 涂抹动作干净
- 微距不过度假
- 光线显质地

避免：

- 医美级夸张效果
- 不真实磨皮
- 不合理“瞬间换肤”

---

## 修改模式

如果用户提供的是已有 prompt 集合或已有 storyboard，要求“优化出图提示词”，则输出方式改为：

1. 优化目标摘要
2. 全局需保留项
3. 更新后的逐镜头 prompts
4. 关键修改点
5. 若适用，指出哪些镜头仍需参考图支持

---

## 必要时的最少提问

仅在无法安全生成高质量图像提示词时，才一次性补问，最多一轮：

1. 这些图主要用于分镜审阅、AI 出图，还是图生视频首帧？
2. 你希望偏真实 UGC、精致商拍，还是纯产品质感风？
3. 是否有必须锁定的人物外观、产品包装、品牌元素？
4. 是否已有参考图作为统一风格基准？
5. 提示词更希望输出中文、英文，还是中英双版？

如果用户未回答，也应先给出基于合理假设的可用版本。

---

## 禁止事项

不要输出以下低质量结果：

- 只是把原分镜复制一遍
- 每镜头没有独立 prompt
- 不提供 negative prompt
- 不提一致性约束
- 只写抽象词，如“高级感、电影感”
- 不写产品露出方式
- 不考虑字幕安全区
- 让镜头间人物/产品/场景明显漂移
- 编造品牌事实
- 强行加入原分镜没有的夸张元素

---

## 最终执行要求

无论输入多粗略，都应尽量输出：

1. 转换说明
2. 全局风格锚点
3. 全局一致性约束
4. 逐镜头图像提示词 YAML
5. 易读版提示词表
6. 负面提示词建议
7. 出图优先级建议

如信息不足，明确写出假设，不要只回复“请补充更多细节”。
