# Build Storyboard

本步骤负责把 `shootable_script` 转换成完整、结构化、可执行的分镜图（storyboard）。这是整个 skill 的核心执行步骤：前面的输入解析、angle 定义、脚本整理，最终都要落到**镜头级规格**上。

这里的目标不是写“创意概念”，而是输出一套足够清晰的镜头方案，让以下任何一种后续工作都能直接衔接：

- 人工拍摄
- 导演/剪辑沟通
- 客户审阅
- AI 出图
- 图生视频
- AI 视频生成
- 镜头表排期与拍摄准备

---

## 目标

基于 `shootable_script` 构建完整 storyboard，明确：

1. 每个镜头的功能
2. 每个镜头的时长
3. 每个镜头的画面主体
4. 每个镜头的动作
5. 每个镜头的景别/角度/运镜
6. 每个镜头的环境和光线
7. 每个镜头的字幕与口播对应关系
8. 产品露出要求
9. 连续性锁定项
10. AI 生成可用的画面 prompt
11. 后期剪辑提示
12. 审阅所需的可读镜头表

---

## 核心原则

### 1. 一镜头一主任务

每个镜头原则上只承担一个主要目的，最多两个紧密相关目的，例如：

- 建立痛点
- 展示动作
- 展示结果
- 主播反应
- 产品 hero shot
- CTA 收口

不要把多个独立卖点硬塞进一个镜头。

### 2. 镜头必须服务脚本 beat

每个镜头都应能追溯到 `shootable_script.beats` 中的某一段或某一信息点。不要凭空添加与主 angle 无关的炫技镜头。

### 3. 先保证转化逻辑，再优化美感

优先顺序默认是：

1. 看得懂
2. 证明清楚
3. 产品清楚
4. 节奏合适
5. 才是高级感 / 电影感 / 氛围感

### 4. 画面必须能执行

每个镜头都应明确到以下层级：

- 谁
- 在哪
- 做什么
- 怎么拍
- 要看到什么
- 为什么拍这一镜头

### 5. 连续性必须显式约束

同一条视频内，默认需锁定：

- 主角身份
- 发型/妆容/服装
- 产品包装
- 场景逻辑
- 光线方向
- 道具逻辑
- 手持方向
- 时间段

如果故意切换，必须在镜头中写明。

### 6. Storyboard 要同时面向“人类”和“模型”

既要给人看懂，也要让 AI 生成系统可消费。因此必须同时提供：

- 结构化 YAML
- 易读镜头表
- generation prompt
- negative prompt

---

## 输入依赖

本步骤主要消费：

- `parsed_input`
- `angle_definition`
- `shootable_script`

尤其使用：

- `primary_angle`
- `persuasion_path`
- `messaging_priority`
- `shootable_script.meta`
- `shootable_script.structure`
- `shootable_script.beats`
- `entities`
- `continuity_constraints`
- `compliance_flags`

---

## 输出格式

本步骤必须输出两个核心部分：

1. `storyboard` YAML
2. Markdown 镜头表

如适用，还应输出：

- 风格锚点
- 连续性说明
- 审阅备注

---

## Storyboard YAML 标准结构

```yaml
storyboard:
  meta:
    title: ""
    platform: ""
    language: ""
    total_duration_sec: 0
    aspect_ratio: "9:16"
    style: ""
    pacing: ""
    source_angle: ""
    source_script_objective: ""
    visual_consistency_notes: []
    compliance_notes: []
  global_cast:
    - id: "host_1"
      role: ""
      appearance: ""
      wardrobe: ""
      expression_baseline: ""
  global_product:
    name: ""
    category: ""
    must_keep: []
    avoid_changes: []
    visibility_strategy: ""
  global_environment:
    primary_location: ""
    lighting_style: ""
    time_of_day: ""
    prop_style: ""
    continuity_rules: []
  scenes:
    - scene_id: "S01"
      beat_ref: "B01"
      beat: "hook"
      duration_sec: 0
      voiceover: ""
      on_screen_text: ""
      shot:
        type: ""
        framing: ""
        angle: ""
        camera_motion: ""
        lens_feel: ""
      subject:
        primary: ""
        secondary: []
        action: ""
        expression: ""
      environment:
        location: ""
        time_of_day: ""
        lighting: ""
        props: []
      composition:
        layout: ""
        focus_point: ""
        foreground: ""
        midground: ""
        background: ""
        text_safe_area: ""
      product_visibility:
        required: true
        prominence: ""
        orientation: ""
        interaction: ""
      continuity:
        from_previous: ""
        locked_elements: []
        intentional_change: ""
      generation_prompt: ""
      negative_prompt: ""
      purpose: ""
      edit_notes: ""
```

---

## 顶层字段说明

### `meta`
描述整条视频的分镜级信息。

#### `title`
简洁清楚，例如：

- “厨房清洁喷雾痛点演示分镜”
- “护肤精华质地与上脸效果分镜”
- “UGC 推荐型带货视频分镜”

#### `platform`
如：

- `tiktok`
- `douyin`
- `generic_short_video`

#### `language`
分镜输出语言。

#### `total_duration_sec`
总时长，应与脚本接近。

#### `aspect_ratio`
默认 `9:16`。

#### `style`
一句话描述整体视觉风格，例如：

- `真实 UGC + 快节奏产品演示`
- `精致商业质感 + 微距细节`
- `高转化短视频广告风`

#### `pacing`
一句话描述节奏。

#### `source_angle`
对应主 angle。

#### `source_script_objective`
对应脚本目标。

#### `visual_consistency_notes`
全局一致性说明。

#### `compliance_notes`
全局合规备注。

---

## `global_cast`

如有真人，必须抽取为全局角色，避免每镜头漂移。

字段建议：

- `id`: 如 `host_1`
- `role`: 主播 / 用户 / 模特 / 手部演示者
- `appearance`: 年龄感、基础外观
- `wardrobe`: 穿着说明
- `expression_baseline`: 整体情绪基线

如是纯产品视频，可为空数组。

---

## `global_product`

必须提炼产品层级的一致性要求。

字段建议：

- `name`
- `category`
- `must_keep`
- `avoid_changes`
- `visibility_strategy`

例如：

- 包装颜色一致
- 标签位置一致
- 不要凭空增减部件
- 关键卖点镜头需正向露出 logo/标签区域
- 产品在前 1/3 视频中尽早出现

---

## `global_environment`

描述全局场景统一原则：

- `primary_location`
- `lighting_style`
- `time_of_day`
- `prop_style`
- `continuity_rules`

例如：

- 同一家庭厨房
- 白天自然侧光
- 干净但真实的家居道具
- 不要场景在相邻镜头间跳变

---

## 场景拆分规则

### 镜头数量建议

可参考但不机械套用：

- 10–15 秒：6–9 镜头
- 15–20 秒：7–10 镜头
- 20–30 秒：8–14 镜头
- 30–45 秒：10–18 镜头

### 镜头切分方法

从 `shootable_script.beats` 出发，每个 beat 可拆成 1–3 个镜头，取决于是否需要：

- 建立镜头
- 动作镜头
- 细节镜头
- 结果镜头
- 反应镜头
- 包装镜头

例如一个 `demo` beat 常可拆为：

1. 拿出产品
2. 喷洒动作
3. 擦拭特写

---

## 每镜头字段填写规范

### `scene_id`
从 `S01` 开始递增。

### `beat_ref`
引用脚本段落编号，如 `B01`。

### `beat`
推荐值：

- `hook`
- `problem`
- `setup`
- `demo`
- `benefit`
- `proof`
- `comparison`
- `social_proof`
- `offer`
- `cta`
- `transition`
- `closing`

### `duration_sec`
应精确到可执行层面，通常 0.5–3 秒不等。

### `voiceover`
当前镜头下最匹配的口播/旁白片段。若是无口播镜头，可留空。

### `on_screen_text`
当前镜头内核心字幕，要求简短、强扫读。

---

## `shot` 填写规范

### `type`
优先使用稳定枚举或近似枚举：

- `talking_head`
- `handheld_ugc`
- `product_macro`
- `insert_detail`
- `top_down`
- `over_shoulder`
- `closeup_reaction`
- `wide_establishing`
- `before_after`
- `split_screen`
- `screen_recording`
- `packshot_cta`
- `action_demo`
- `result_reveal`

### `framing`
推荐值：

- `extreme_close_up`
- `close_up`
- `medium_close_up`
- `medium`
- `medium_wide`
- `wide`

### `angle`
推荐值：

- `eye_level`
- `high_angle`
- `low_angle`
- `top_down`
- `three_quarter`
- `over_shoulder`

### `camera_motion`
推荐值：

- `static`
- `push_in`
- `pull_out`
- `pan_left`
- `pan_right`
- `tilt_up`
- `tilt_down`
- `handheld`
- `track_with_subject`
- `whip_pan`
- `locked_off`

### `lens_feel`
简洁自然语言说明镜头质感，例如：

- 手机原生广角感
- 微距细节质感
- 轻微手持临场感
- 干净商业广告感

---

## `subject` 填写规范

### `primary`
主要主体，例如：

- 主播
- 手部
- 产品瓶身
- 油污台面
- 护肤质地
- 使用结果区域

### `secondary`
次要主体数组。

### `action`
必须是明确动作，而不是抽象状态。例如：

- “右手持喷雾朝台面喷洒”
- “抹布从左向右擦过油污区域”
- “主播看向镜头并举起产品”
- “镜头靠近瓶身标签”

### `expression`
如有人脸镜头，写清表情：

- 惊讶
- 满意
- 放松
- 可信推荐感
- 专注演示

---

## `environment` 填写规范

至少包含：

- `location`
- `time_of_day`
- `lighting`
- `props`

要求明确：

- 是厨房还是浴室
- 是白天自然光还是棚拍柔光
- 关键道具有哪些
- 不要只写“室内”

---

## `composition` 填写规范

### `layout`
例如：

- 主体居中偏右，左侧留字幕区
- 台面占下半画面，手部从右侧进入
- 产品居中直立，背景轻虚化

### `focus_point`
当前画面最该看哪里。

### `foreground` / `midground` / `background`
简要说明空间层次，有助于 AI 出图和拍摄执行。

### `text_safe_area`
推荐值：

- `top_safe`
- `bottom_safe`
- `left_safe`
- `right_safe`
- `center_clear_for_packshot`

---

## `product_visibility` 填写规范

### `required`
产品是否必须出现在该镜头。

### `prominence`
例如：

- `high`
- `medium`
- `low`

也可补自然语言说明。

### `orientation`
例如：

- 正面标签朝向镜头
- 侧放
- 手持瓶身略向上倾斜
- 背景虚化露出

### `interaction`
写清产品和人/环境的互动关系，例如：

- 手持展示
- 正在喷洒
- 放置在台面中央
- 使用后摆拍 packshot

---

## `continuity` 填写规范

### `from_previous`
说明与上一镜头的衔接关系。

### `locked_elements`
列出本镜头必须承接不变的元素。

### `intentional_change`
若本镜头有意切换，例如从问题区切到包装 hero shot，要明确写出。

---

## `generation_prompt` 写作规范

每镜头必须有高质量 prompt，适合图像模型或视频模型理解。至少包含：

1. 画幅
2. 主体
3. 动作
4. 场景
5. 光线
6. 构图
7. 风格
8. 一致性要求
9. 产品/人物关键约束

推荐骨架：

```text
Vertical 9:16 photorealistic ecommerce ad frame showing [主体] [动作] in [场景]. [产品露出方式]. [光线描述]. [构图描述]. Realistic TikTok-style short video frame, commercially believable, clean subject separation, leave room for text overlay, maintain the same character appearance, wardrobe, and stable product packaging details across shots.
```

若整体输出为中文，可写中文 prompt；若用户明确用于英文模型，也可优先英文。

---

## `negative_prompt` 写作规范

每镜头必须有负面提示词，至少覆盖：

- 多余手指
- 手部畸形
- 多余人物
- 产品变形
- 包装颜色漂移
- logo 错误
- 文本乱码
- 背景过杂
- 不合理透视
- 过度磨皮
- 过度电影化导致不真实

并根据镜头再加专属限制。

---

## `purpose`
说明镜头商业/叙事目的，例如：

- 强化停留
- 建立痛点
- 证明使用简单
- 可视化结果
- 增强可信度
- 收口 CTA

---

## `edit_notes`
写给剪辑或后续生成环节的说明，例如：

- 与上一镜头做硬切
- 适合加喷雾音效
- 字幕在左上方大字进入
- 结果镜头可停 3–5 帧加强识别
- CTA 镜头适合轻推近收尾

---

## 镜头表输出要求

在 YAML 后，必须补一份 Markdown 镜头表，格式如下：

| 镜头 | 时长 | 功能 | 画面 | 台词/字幕 | 运镜 | 产品露出 | 目的 |
|---|---:|---|---|---|---|---|---|

要求：

- 每镜头一行
- 与 YAML 严格一致
- 语言让非专业用户也能审阅
- 画面描述简洁但不可失真
- 如果镜头多，可适当精炼，但不省略核心信息

---

## 视觉与节奏优化规则

### 1. Hook 镜头
必须强，可通过：

- 问题句
- 明显脏污
- 结果先出
- 大动作
- 意外对比

默认不建议把开头做成无信息量空镜。

### 2. 产品出现时机
带货类视频中，默认应尽早露出产品，通常不晚于前 1/3 时长。

### 3. 结果镜头
若卖点依赖效果证明，结果镜头必须：

- 清楚
- 足够近
- 不被字幕挡住
- 有停留时间
- 最好与动作或前态形成逻辑关系

### 4. CTA 镜头
结尾应明确是 CTA，而不是自然结束。通常要有：

- 产品清晰露出
- 口播收口
- 大字收口
- 相对稳定构图

### 5. 静音友好
默认要考虑无声观看，因此：

- 关键句要能字幕化
- 镜头本身要看得懂
- 不要把关键信息只放在口播里

---

## 不同类型视频的分镜侧重

### 真人 UGC
优先：

- 人物可信
- 手持感
- 真实室内环境
- 插入动作与结果镜头
- 避免全程人对镜讲话

### 纯产品广告
优先：

- 包装一致性
- 微距细节
- 清晰构图
- 干净背景
- 光线质感
- packshot 收口

### 演示/功效广告
优先：

- 问题清晰
- 使用动作清晰
- 结果变化清晰
- 对比自然可信
- 减少无关氛围镜头

---

## 合规处理要求

如果存在 `compliance_flags`，本步骤必须体现在：

- `meta.compliance_notes`
- 相关镜头的 `risk` 通过 `purpose` / `edit_notes` / prompt 侧面规避
- 避免生成明显违规画面表述

例如：

- 不要把普通清洁演示做成夸张“魔法瞬间消失”
- 不要输出像医疗广告的治疗暗示
- 不要输出未经证实的权威背书元素
- 对 before/after 镜头保持真实可视化，不做离谱夸张

---

## 示例

```yaml
storyboard:
  meta:
    title: "厨房清洁喷雾痛点演示分镜"
    platform: "generic_short_video"
    language: "zh-CN"
    total_duration_sec: 15
    aspect_ratio: "9:16"
    style: "真实 UGC + 快节奏产品演示"
    pacing: "前2秒问题钩子，中段快切演示，结尾直接CTA"
    source_angle: "pain_point_demo"
    source_script_objective: "通过油污清洁演示推动厨房清洁喷雾转化"
    visual_consistency_notes:
      - "同一位女性演示者贯穿全片"
      - "产品包装颜色与标签位置保持一致"
      - "厨房环境保持同一空间逻辑"
      - "整体维持白天自然光感"
    compliance_notes:
      - "避免夸大为适用于所有污渍类型"
      - "前后对比应保持真实可信"
  global_cast:
    - id: "host_1"
      role: "home_demo_host"
      appearance: "25-35岁女性，自然居家状态，亲和可信"
      wardrobe: "浅色简洁居家服"
      expression_baseline: "真实、利落、轻松"
  global_product:
    name: "厨房清洁喷雾"
    category: "cleaning_product"
    must_keep:
      - "白色喷瓶轮廓稳定"
      - "绿色标签主视觉稳定"
      - "标签朝镜头时位置一致"
    avoid_changes:
      - "不要改变瓶身形状"
      - "不要生成额外配件"
      - "不要漂移包装颜色"
    visibility_strategy: "前段尽早露出，中段通过使用动作证明，结尾 packshot 收口"
  global_environment:
    primary_location: "家庭厨房台面区域"
    lighting_style: "白天自然侧光，干净明亮"
    time_of_day: "daytime"
    prop_style: "真实家居清洁道具，简洁不过度杂乱"
    continuity_rules:
      - "台面材质保持一致"
      - "抹布颜色不要跳变"
      - "相邻镜头背景陈设保持稳定"
  scenes:
    - scene_id: "S01"
      beat_ref: "B01"
      beat: "hook"
      duration_sec: 1.5
      voiceover: "每次做完饭，台面这层油真的太烦了。"
      on_screen_text: "做完饭台面全是油？"
      shot:
        type: "insert_detail"
        framing: "close_up"
        angle: "high_angle"
        camera_motion: "handheld"
        lens_feel: "手机原生近景，真实临场感"
      subject:
        primary: "带油污的厨房台面"
        secondary:
          - "模糊入画的手部"
        action: "镜头快速扫到台面上明显的油污和残留痕迹"
        expression: ""
      environment:
        location: "家庭厨房"
        time_of_day: "daytime"
        lighting: "自然侧光，油污反光可见"
        props:
          - "台面"
          - "锅具边缘"
      composition:
        layout: "台面油污占画面中下部，顶部留字幕区"
        focus_point: "台面脏污区域"
        foreground: "轻微入画手部"
        midground: "油污台面"
        background: "虚化厨房环境"
        text_safe_area: "top_safe"
      product_visibility:
        required: false
        prominence: "low"
        orientation: ""
        interaction: ""
      continuity:
        from_previous: "首镜头，无前序"
        locked_elements:
          - "厨房台面材质"
          - "白天自然光方向"
        intentional_change: ""
      generation_prompt: "竖屏 9:16 写实电商短视频画面，家庭厨房台面近景，明显可见做饭后的油污和脏痕，白天自然侧光，真实手机拍摄临场感，画面聚焦脏污区域，背景轻微虚化，顶部预留字幕空间，真实家居环境，不过度美化。"
      negative_prompt: "多余人物，夸张特效，台面材质漂移，奇怪反光，脏污不清晰，透视错误，过度电影化，文字乱码，背景杂乱，手部畸形"
      purpose: "在1秒内建立清晰痛点，拉住用户停留"
      edit_notes: "适合硬切开场，可配合问题句大字幕快速进入"
    - scene_id: "S02"
      beat_ref: "B02"
      beat: "demo"
      duration_sec: 2.0
      voiceover: "我现在都直接喷这个，等几秒，再一擦。"
      on_screen_text: "喷一喷，等几秒"
      shot:
        type: "action_demo"
        framing: "medium_close_up"
        angle: "three_quarter"
        camera_motion: "push_in"
        lens_feel: "真实商业短视频近景"
      subject:
        primary: "女性手部与清洁喷雾"
        secondary:
          - "厨房台面"
        action: "右手拿起喷雾朝台面油污区域喷洒"
        expression: ""
      environment:
        location: "家庭厨房"
        time_of_day: "daytime"
        lighting: "自然侧光，瓶身与喷雾颗粒清晰可见"
        props:
          - "清洁喷雾"
          - "油污台面"
          - "抹布"
      composition:
        layout: "产品和喷洒动作位于画面中央偏右，左上留字幕区"
        focus_point: "喷雾动作与产品瓶身"
        foreground: "手部和喷雾瓶"
        midground: "油污台面"
        background: "干净厨房背景"
        text_safe_area: "top_safe"
      product_visibility:
        required: true
        prominence: "high"
        orientation: "标签尽量朝镜头可辨识方向"
        interaction: "手持并正在喷洒"
      continuity:
        from_previous: "从问题台面直接切到产品使用动作"
        locked_elements:
          - "同一台面"
          - "同一产品包装"
          - "同一光线方向"
        intentional_change: "从纯问题镜头切入产品解决方案"
      generation_prompt: "竖屏 9:16 写实电商广告画面，家庭厨房中一位女性的手正拿着白色喷瓶清洁产品朝油污台面喷洒，绿色标签清晰稳定，白天自然侧光，真实高转化短视频风格，动作明确，主体清楚，左上预留字幕空间，产品包装保持一致。"
      negative_prompt: "多余手指，手部畸形，产品瓶身变形，标签错位，包装颜色漂移，多余人物，喷雾方向不合理，乱码文字，背景过杂，透视错误"
      purpose: "展示产品出场和使用动作，建立解决方案"
      edit_notes: "可轻推近强化动作，喷雾音效可增强临场感"
```

---

## Markdown 镜头表示例

| 镜头 | 时长 | 功能 | 画面 | 台词/字幕 | 运镜 | 产品露出 | 目的 |
|---|---:|---|---|---|---|---|---|
| S01 | 1.5s | Hook | 厨房油污台面近景，问题一眼可见 | “每次做完饭…” / “台面全是油？” | 手持近景 | 无或极弱 | 建立痛点、拉停留 |
| S02 | 2.0s | Demo | 手持喷雾朝油污区域喷洒 | “直接喷这个…” / “喷一喷，等几秒” | 轻推近 | 高 | 展示解决方案 |

---

## 必要时的补问规则

如果缺失信息会直接影响 storyboard 的可执行性，允许一次性补问，但仅限关键问题，例如：

1. 这条分镜主要用于真人拍摄、AI 出图，还是 AI 视频？
2. 是否有必须保留的人物形象或产品包装参考？
3. 更偏真实 UGC 还是精致广告风？
4. 期望总时长是多少秒？
5. 是否必须包含品牌 logo / 指定字幕语句？

如果不问也能合理输出，就直接基于假设完成，并把假设写入 `meta` 或上游结构。

---

## 禁止事项

不要在本步骤中：

- 只输出抽象创意描述而不写镜头级细节
- 缺少 YAML
- 缺少镜头表
- 不写时长
- 不写运镜/景别
- 不写产品露出方式
- 不写连续性锁定项
- 不写 generation prompt
- 不写 negative prompt
- 把所有镜头都做成人物中景口播
- 编造用户未提供的品牌事实或证据
- 为高风险 claim 做视觉背书
- 因输入粗略而拒绝给初版

---

## 最终要求

本步骤必须输出一套完整 storyboard，使后续任一执行方都能直接继续工作。最低标准包括：

1. 完整 `storyboard` YAML
2. 每镜头清晰功能定义
3. 每镜头明确画面与动作
4. 每镜头明确产品露出与连续性要求
5. 每镜头可用于 AI 生成的 prompt
6. 可读的 Markdown 镜头表

如果信息不足，也必须在合理假设下给出一个可执行初版，而不是停留在概念层。
