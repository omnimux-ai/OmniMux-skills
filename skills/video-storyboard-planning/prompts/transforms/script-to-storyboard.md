# Script to Storyboard

将用户提供的短视频脚本、口播文案、卖点提纲或粗略创意，转换为结构化、可执行、适合 TikTok / 抖音 / 信息流短视频的分镜图规范。输出应同时服务于人工拍摄、AI 出图、AI 视频生成、客户审阅与剪辑执行。

---

## 目标

把输入内容拆解为：

1. 分镜总览
2. Storyboard YAML
3. 镜头表（Markdown）
4. 关键画面提示词
5. 连续性与合规审阅清单

如用户明确需要，也可补充：

- 字幕建议
- 画外音拆分
- 运镜建议
- 道具清单
- 首帧/尾帧说明
- AI 图像/视频生成提示词增强版

---

## 适用输入

接受以下任一输入形式：

- 完整短视频脚本
- 口播台词
- 分段提纲
- 时间轴文案
- 带货话术
- 产品演示逻辑
- 粗略创意描述
- 结合产品图/参考视频的说明

---

## 输出原则

### 1. 以“可执行”为第一优先级

不要只写抽象风格词，必须明确到可执行层面，例如：

- 景别
- 机位角度
- 主体动作
- 场景位置
- 光线
- 运镜
- 时长
- 字幕安全区
- 产品露出要求
- 本镜头目的

### 2. 以短视频节奏为核心

默认优先满足：

- 前 1–3 秒有强钩子
- 产品尽早出现
- 每个镜头承载单一核心信息
- 台词与画面相互补充
- 适合竖屏 9:16
- 字幕可读
- 可直接进入拍摄或生成

### 3. 自动补全，但要标明假设

若用户未提供完整信息，可合理假设并继续输出，同时在“假设项”中明确说明。

默认假设：

- 平台：TikTok / 抖音通用
- 画幅：9:16
- 时长：15–30 秒
- 风格：高转化短视频广告 / UGC / 产品演示兼容
- 输出语言：跟随用户输入语言

### 4. 优先保证一致性

分镜中必须显式约束以下连续性要素：

- 主角身份
- 发型妆容
- 服装
- 产品包装
- 场景
- 光线方向
- 道具
- 手持方向
- 品牌元素

### 5. 对风险表达做基础提醒

若脚本包含下列表达，要加简短合规提醒：

- 绝对化效果
- 医疗/治疗暗示
- “前后对比”夸张呈现
- 无证据支撑的强功效
- 排他性/第一名/唯一性表述

提醒应简短，不要喧宾夺主。

---

## 输入理解流程

收到用户输入后，按以下顺序处理：

### 第一步：识别输入类型

判断属于以下哪类：

- 完整脚本
- 口播文案
- 时间轴脚本
- 创意提纲
- 混合输入

### 第二步：提炼视频骨架

抽取：

- 核心目标
- 受众
- 卖点
- 内容结构
- CTA
- 主要人物
- 产品/场景
- 风格方向

### 第三步：映射内容节拍

优先识别这些功能段：

- hook
- problem
- demo
- benefit
- proof
- comparison
- social_proof
- offer
- cta
- closing

### 第四步：拆镜头

按“信息动作单位”拆镜头，每个镜头原则上只服务一个主要任务：

- 提问/钩子
- 展示问题
- 拿出产品
- 使用动作
- 细节特写
- 结果展示
- 表情反馈
- 包装展示
- CTA

### 第五步：输出结构化结果

按固定结构输出，不要省略 YAML 和镜头表。

---

## 镜头拆分规则

### 1. 每镜头一个主任务

避免单镜头内承载太多动作和信息。

### 2. 台词和画面不能纯重复

例如：

差：
- 台词说“去污很快”
- 画面还是人物站着讲话

优：
- 台词说“去污很快”
- 画面展示喷洒后污渍立刻被擦净

### 3. 优先视觉证明

对于卖点，优先使用可见画面证明，而不是只依赖口播。

### 4. 前 3 秒必须有抓力

可用方式：

- 反差
- 痛点
- 明显结果
- 强视觉动作
- 大字幕问题句
- 意料之外的场景切入

### 5. 时长要符合短视频语法

默认建议：

- Hook：0.5–2.0 秒
- Demo：0.8–2.5 秒
- 反应镜头：0.5–1.5 秒
- 产品特写：0.5–1.2 秒
- CTA：1.0–2.5 秒

### 6. 避免机械重复镜头

如连续都是“中景人说话”，应适当穿插：

- 特写
- 插入镜头
- 手部动作
- 结果镜头
- 包装镜头
- 俯拍/侧拍
- 反应镜头

---

## 输出格式

默认必须按以下结构输出。

# 1. 分镜总览

使用 YAML：

```yaml
overview:
  objective: ""
  audience: ""
  duration_sec: 0
  aspect_ratio: "9:16"
  style: ""
  pacing: ""
  conversion_focus: []
  assumptions: []
```

字段要求：

- `objective`: 这条视频的核心转化/传播目标
- `audience`: 目标受众
- `duration_sec`: 建议总时长
- `aspect_ratio`: 默认 9:16
- `style`: 风格描述
- `pacing`: 节奏说明
- `conversion_focus`: 核心转化点列表
- `assumptions`: 补全时使用的假设项

---

# 2. Storyboard YAML

必须输出结构化 storyboard：

```yaml
storyboard:
  meta:
    title: ""
    platform: ""
    language: ""
    total_duration_sec: 0
    aspect_ratio: "9:16"
    style: ""
    visual_consistency_notes: []
    compliance_notes: []
  global_cast:
    - id: "host_1"
      role: ""
      appearance: ""
      wardrobe: ""
  global_product:
    name: ""
    must_keep: []
    avoid_changes: []
  scenes:
    - scene_id: "S01"
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
        background: ""
        text_safe_area: ""
      product_visibility:
        required: true
        prominence: ""
        orientation: ""
      continuity:
        from_previous: ""
        locked_elements: []
      generation_prompt: ""
      negative_prompt: ""
      purpose: ""
      edit_notes: ""
```

---

## 字段填写规范

### meta

- `title`: 给这条分镜一个简洁标题
- `platform`: TikTok / 抖音 / 通用
- `language`: 输出语言
- `total_duration_sec`: 总时长
- `aspect_ratio`: 默认 9:16
- `style`: 如“真实 UGC + 演示型带货”
- `visual_consistency_notes`: 总体一致性要求
- `compliance_notes`: 合规提醒

### global_cast

如有真人，至少描述：

- 身份/角色
- 年龄感
- 外形特征
- 穿着类型

如无人像，可留空数组。

### global_product

必须说明：

- 产品名称
- 不可改变元素
- 需要避免的变形/漂移

### scenes

每个镜头一条，必须完整。

#### `scene_id`
从 `S01` 开始递增。

#### `beat`
优先使用以下值：

- `hook`
- `problem`
- `demo`
- `benefit`
- `proof`
- `comparison`
- `social_proof`
- `offer`
- `cta`
- `transition`
- `closing`

#### `voiceover`
镜头对应旁白或口播。没有可留空。

#### `on_screen_text`
镜头内核心字幕/贴字。应简短有力，适合短视频。

#### `shot.type`
示例可选：

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

#### `shot.framing`
建议值：

- `extreme_close_up`
- `close_up`
- `medium_close_up`
- `medium`
- `medium_wide`
- `wide`

#### `shot.angle`
建议值：

- `eye_level`
- `high_angle`
- `low_angle`
- `top_down`
- `three_quarter`
- `over_shoulder`

#### `shot.camera_motion`
建议值：

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

#### `shot.lens_feel`
用简洁自然语言描述镜头感觉，例如：

- 手机原生感
- 轻微微距质感
- 纪录片式手持临场感
- 干净商业广告感

#### `subject`
要明确：

- 主体是谁
- 在做什么
- 情绪/表情是什么

#### `environment`
至少写清：

- 场景
- 时间感
- 光线类型
- 关键道具

#### `composition`
至少写清：

- 主体布局
- 视觉焦点
- 前景/背景
- 字幕安全区

`text_safe_area` 建议值：

- `top_safe`
- `bottom_safe`
- `left_safe`
- `right_safe`
- `center_clear_for_packshot`

#### `product_visibility`
明确产品是否必须出现，以及出现方式。

- `required`: 是否必须出现
- `prominence`: 例如“高 / 中 / 低”或简短说明
- `orientation`: 如“正面朝镜头”“侧放”“手持标签朝外”

#### `continuity`
描述与上镜头衔接关系，以及必须锁定不变的元素。

#### `generation_prompt`
必须是高质量、可执行提示词，至少包含：

- 主体
- 动作
- 场景
- 光线
- 构图
- 风格
- 镜头感
- 产品一致性要求

#### `negative_prompt`
至少规避：

- 多余手指
- 产品变形
- logo 错误
- 包装颜色漂移
- 文本乱码
- 过度磨皮
- 不合理透视
- 多余人物/道具

#### `purpose`
说明本镜头的商业/叙事目的。

#### `edit_notes`
说明转场、字幕、节奏、是否适合加音效等。

---

# 3. 镜头表

在 YAML 之后，必须再输出一个 Markdown 表格，格式如下：

| 镜头 | 时长 | 功能 | 画面 | 台词/字幕 | 运镜 | 产品露出 | 目的 |
|---|---:|---|---|---|---|---|---|

要求：

- 一镜头一行
- 文字直白清晰
- 非专业用户也能快速看懂
- 与 YAML 内容一致

---

# 4. 关键提示词

按以下小节输出：

## 统一风格锚点

例如：

- 真实短视频广告感
- 竖屏 9:16
- 强转化节奏
- 自然光或柔和商业光
- 产品包装高度一致
- 清晰主体、避免复杂背景

## 人物一致性锚点

如有人物，说明：

- 性别表达
- 年龄段
- 发型
- 穿着
- 妆容
- 情绪基调

## 产品一致性锚点

至少说明：

- 包装外形
- 主色
- 标签位置
- 材质
- 尺寸感
- 不可变化点

## 场景一致性锚点

至少说明：

- 场景类型
- 道具风格
- 时间感
- 桌面/背景材质
- 整洁程度

## 通用负面提示词

至少包含：

- 不要多余人物
- 不要额外产品
- 不要错误 logo
- 不要奇怪手部
- 不要乱码字幕
- 不要产品形变
- 不要包装颜色漂移
- 不要过强美颜
- 不要不合理透视

---

# 5. 审阅清单

必须输出以下检查项。

## 连续性

- [ ] 主角形象是否前后一致
- [ ] 服装/发型是否前后一致
- [ ] 产品包装是否稳定一致
- [ ] 手持方向是否无明显跳变
- [ ] 场景与光线是否连续或有明确切换理由

## 转化表达

- [ ] 前 3 秒是否足够抓人
- [ ] 产品是否尽早出现
- [ ] 每个卖点是否被画面证明
- [ ] CTA 是否清晰明确

## 可执行性

- [ ] 每个镜头是否可拍或可生成
- [ ] 是否存在高难度镜头需要替代
- [ ] 是否需要额外道具/素材
- [ ] 字幕是否有安全空间

## 平台适配

- [ ] 是否适合 9:16 观看
- [ ] 是否适合短视频节奏
- [ ] 是否适合静音观看
- [ ] 文字信息是否足够醒目

## 合规风险

- [ ] 是否有绝对化表述
- [ ] 是否含医疗/疗效暗示
- [ ] 是否存在夸张前后对比
- [ ] 强 claim 是否需要证据支持

---

## 镜头数量建议

如用户未指定时长，可参考：

- 10–15 秒：6–9 镜头
- 15–20 秒：7–10 镜头
- 20–30 秒：8–14 镜头
- 30–45 秒：10–18 镜头

---

## 默认风格策略

### 1. 真人带货 / UGC

优先镜头：

- talking head
- handheld ugc
- insert detail
- over shoulder demo
- reaction closeup
- product cta

特点：

- 强钩子
- 多反应
- 多手部动作
- 真实感优先于电影感

### 2. 纯产品广告

优先镜头：

- product macro
- texture closeup
- top-down arrangement
- rotating product
- usage detail
- packshot

特点：

- 质感稳定
- 包装一致
- 强调材质、纹理、卖点细节

### 3. 功效/演示型广告

优先镜头：

- before
- application
- transformation
- after
- comparison
- proof shot

特点：

- 结果必须清楚
- 尽量避免假特效感
- 要强调“看得懂”的变化

---

## 修改模式

如果用户是在已有分镜上要求调整，而不是首次生成，则输出优先顺序改为：

1. 修改摘要
2. 受影响镜头
3. 更新后的 Storyboard YAML
4. 更新后的镜头表
5. 如有需要，补充更新后的提示词和审阅项

可处理的典型修改包括：

- 更高级
- 更像 UGC
- 更快节奏
- 更适合 AI 生成
- 增加产品特写
- 减少口播
- 改成 15 秒
- 保留文案，重做分镜

---

## 必要时的提问规则

只有在确实影响输出质量且无法合理假设时，才一次性补问，最多一轮。优先问：

1. 发布平台是 TikTok、抖音还是通用？
2. 期望时长是多少秒？
3. 更偏向 UGC、商拍还是纯产品质感？
4. 这个分镜主要用于拍摄、AI 出图、AI 视频，还是都要？
5. 是否有必须保留的人物形象、产品包装或品牌元素？

如果用户未回复，也要先给出带“假设项”的可用初版。

---

## 禁止事项

不要输出以下低质量结果：

- 只有概念，没有镜头级细节
- 不含 YAML
- 不含镜头表
- 不写时长
- 不写景别/运镜
- 不写产品露出要求
- 不写连续性约束
- 不写 generation prompt
- 不写 negative prompt
- 所有镜头都写成“人物中景说话”
- 编造用户未提供的品牌事实、销量、认证、奖项
- 为强功效背书
- 输出结构不稳定

---

## 最终执行要求

无论用户输入多简单，都应尽量输出一个可用初版，并严格包含：

1. 分镜总览
2. Storyboard YAML
3. 镜头表
4. 关键提示词
5. 审阅清单

若信息不足，写明假设，不要仅回复“请补充更多信息”。
