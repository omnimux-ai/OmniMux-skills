# Parse Input

本步骤负责把用户原始输入规范化，提取出后续分镜生成所需的核心信息，并标记缺失项、假设项与风险项。目标不是立刻写分镜，而是先把“用户到底给了什么、想要什么、还缺什么”解析清楚，供后续 workflow 使用。

---

## 目标

将原始输入解析为统一结构，至少识别出：

1. 输入类型
2. 用户目标
3. 平台与用途
4. 时长与画幅
5. 风格方向
6. 内容结构
7. 产品/人物/场景信息
8. 连续性约束
9. 输出偏好
10. 缺失信息
11. 假设项
12. 合规风险提示

---

## 可接受输入

本步骤应兼容以下输入来源：

- 完整短视频脚本
- 口播文案
- 时间轴文案
- 卖点列表
- 粗略创意描述
- 参考视频说明
- 产品信息说明
- storyboard 初稿
- shot list 初稿
- 混合输入

若用户同时提供文本、链接、图片或附加说明，应统一并入解析结果。

---

## 解析原则

### 1. 先识别用户任务，再识别内容细节

优先判断用户要的是什么：

- 生成分镜
- 优化现有分镜
- 把脚本改成适合 AI 出图的分镜
- 为拍摄准备镜头表
- 为视频生成准备结构化 storyboard

不要一开始就陷入逐句拆解。

### 2. 输入不完整时先尽量推断

默认允许基于短视频常见场景进行合理推断，但必须把推断显式写入 `assumptions`。

### 3. 以“后续能稳定执行”为目标

解析结果必须让后续步骤能够稳定使用，因此字段名要稳定、语义明确、可复用。

### 4. 区分“用户明确提供”和“系统推断”

不要把猜测当成用户原话。凡不是用户明确给出的内容，必须进入：

- `inferred`
- 或 `assumptions`

### 5. 风险识别前置

若输入中出现潜在问题，应提前标记，例如：

- 强功效承诺
- 医疗暗示
- before/after 风险
- 绝对化措辞
- 夸大对比
- 品牌/包装识别不清，可能导致生成漂移

---

## 标准输出结构

本步骤输出统一使用 YAML，格式如下：

```yaml
parsed_input:
  request_type: ""
  input_format: []
  user_goal: ""
  deliverables: []
  platform:
    target: ""
    inferred: false
  usage_context:
    primary: ""
    secondary: []
  duration:
    requested_sec: null
    inferred_range: ""
  aspect_ratio:
    requested: ""
    defaulted: false
  language:
    script_language: ""
    output_language: ""
  style:
    requested: []
    inferred: []
  source_materials:
    script_present: false
    storyboard_present: false
    shot_list_present: false
    product_info_present: false
    reference_assets_present: false
    links_present: false
  content_structure:
    hook_present: false
    problem_present: false
    demo_present: false
    benefit_present: false
    proof_present: false
    offer_present: false
    cta_present: false
    raw_sections: []
  entities:
    products: []
    people: []
    locations: []
    props: []
    brand_elements: []
  continuity_constraints:
    required: []
    preferred: []
  output_preferences:
    include_yaml: true
    include_markdown_table: true
    include_image_prompts: false
    include_review_checklist: true
  missing_info:
    critical: []
    non_critical: []
  assumptions: []
  inferred: []
  compliance_flags: []
  notes: []
```

---

## 字段说明

### `request_type`
用户请求类型。优先从以下集合中选择最接近的一项：

- `script_to_storyboard`
- `idea_to_storyboard`
- `voiceover_to_storyboard`
- `timeline_to_storyboard`
- `storyboard_revision`
- `storyboard_to_image_prompts`
- `shotlist_optimization`
- `mixed_storyboard_request`

### `input_format`
一个数组，可多选，描述输入材料形态，例如：

- `full_script`
- `voiceover`
- `timeline`
- `bullet_points`
- `rough_idea`
- `storyboard_draft`
- `shot_list`
- `product_brief`
- `reference_video`
- `reference_image`
- `mixed`

### `user_goal`
用一句清晰中文概括用户意图，不要照抄原文，要做归纳。

例如：

- “将清洁产品带货口播改写为适合 TikTok 的结构化分镜图”
- “基于产品演示文案生成可用于 AI 出图的竖屏分镜”

### `deliverables`
识别用户想要的交付物，可多选，例如：

- `storyboard_yaml`
- `markdown_shot_table`
- `image_prompts`
- `continuity_rules`
- `review_checklist`
- `subtitle_suggestions`
- `camera_notes`

若用户未明确说明，默认后续主流程常见交付物即可。

---

## 平台与用途识别

### `platform.target`
优先识别：

- `tiktok`
- `douyin`
- `instagram_reels`
- `youtube_shorts`
- `generic_short_video`

若用户未说，默认填最合适值并标记 `inferred: true`。

### `usage_context.primary`
主用途，建议值：

- `human_shoot`
- `ai_image_generation`
- `ai_video_generation`
- `client_review`
- `editing_plan`

### `usage_context.secondary`
补充用途数组，例如：

- `pitch_deck`
- `creative_alignment`
- `pre_production`

---

## 时长与画幅识别

### `duration.requested_sec`
用户明确给出时长则填数字；没给则为 `null`。

### `duration.inferred_range`
如果未明确指定，按内容复杂度推断，例如：

- `10-15`
- `15-30`
- `20-30`
- `30-45`

### `aspect_ratio`
优先识别：

- `9:16`
- `1:1`
- `16:9`

对短视频分镜默认 `9:16`。

---

## 语言识别

### `language.script_language`
脚本/输入内容语言。

### `language.output_language`
最终分镜输出语言。通常跟随用户。

如果用户明确要求英文 prompt 或双语输出，要在这里记录。

---

## 风格识别

### `style.requested`
用户明确说出的风格，例如：

- `ugc`
- `premium_ad`
- `cinematic`
- `product_only`
- `minimal`
- `dramatic`
- `fast_paced`
- `educational`
- `demo_driven`

### `style.inferred`
根据内容推断出的风格倾向。例如：

- 带货口播通常可推断 `ugc`
- 纯产品细节展示可推断 `product_only`
- 高级护肤广告可推断 `premium_ad`

不要把推断混入 `requested`。

---

## 素材识别

### `source_materials`
布尔字段说明用户提供了什么。

判断标准：

- `script_present`: 有成段脚本、文案、台词
- `storyboard_present`: 已有分镜结构
- `shot_list_present`: 已有镜头表/shot list
- `product_info_present`: 有产品卖点/包装/使用场景等
- `reference_assets_present`: 有参考视频、参考图片或视觉方向
- `links_present`: 有网页或社媒链接

---

## 内容结构识别

### `content_structure`
识别脚本中是否具备关键短视频段落：

- `hook_present`
- `problem_present`
- `demo_present`
- `benefit_present`
- `proof_present`
- `offer_present`
- `cta_present`

### `raw_sections`
提取原始内容结构，按顺序简短归纳，例如：

```yaml
raw_sections:
  - "开头提问：为什么台面总擦不干净"
  - "展示油污问题"
  - "拿出喷雾并喷洒"
  - "擦拭后展示效果"
  - "强调省力"
  - "结尾 CTA"
```

这一步不需要写正式分镜，只做结构摘要。

---

## 实体提取

### `entities.products`
提取产品信息。每个产品建议包含：

```yaml
- name: ""
  category: ""
  visible_attributes: []
  must_keep: []
```

例如：

```yaml
- name: "厨房清洁喷雾"
  category: "cleaning_product"
  visible_attributes:
    - "白色喷瓶"
    - "绿色标签"
  must_keep:
    - "喷雾瓶形状稳定"
    - "标签主色保持一致"
```

### `entities.people`
提取人物信息，例如：

```yaml
- role: ""
  count: 1
  required: true
  appearance_notes: []
```

### `entities.locations`
如：

- 厨房
- 浴室
- 卧室
- 纯色棚拍背景
- 客厅

### `entities.props`
提取关键道具，例如：

- 抹布
- 镜子
- 桌面污渍
- 化妆棉
- 食材
- 包装盒

### `entities.brand_elements`
包括：

- logo
- 品牌色
- 包装版式
- slogan
- 指定字体风格（若有）

---

## 连续性约束识别

### `continuity_constraints.required`
明确必须保持一致的元素，例如：

- 同一位女生
- 同一套服装
- 同一厨房
- 同一瓶产品包装
- 光线保持白天自然光

### `continuity_constraints.preferred`
最好保持但非硬性要求的元素，例如：

- 背景道具风格一致
- 桌面材质一致
- 镜头色温一致

---

## 输出偏好识别

### `output_preferences`
根据用户要求判断是否需要：

- YAML
- Markdown 镜头表
- 图像提示词
- 审阅清单

如果用户只说“做分镜”，默认：

```yaml
output_preferences:
  include_yaml: true
  include_markdown_table: true
  include_image_prompts: false
  include_review_checklist: true
```

如果用户明确提到“适合 AI 出图”，则可将 `include_image_prompts` 标为 `true`。

---

## 缺失信息分类

### `missing_info.critical`
只有真正会影响输出方向的缺失项才放这里，例如：

- 平台完全未知且用户又明确要求平台适配
- 时长要求对节奏影响极大但完全缺失
- 必须保留的人物/产品元素不清楚
- 用户是要拍摄用还是 AI 生成用完全不清楚

### `missing_info.non_critical`
可合理假设的内容，例如：

- 光线未说明
- 道具未说明
- 妆容未说明
- 背景细节未说明

---

## 假设项与推断项

### `assumptions`
写后续流程将采用的默认假设，例如：

- “默认平台为 TikTok / 抖音通用短视频”
- “默认画幅为 9:16”
- “默认控制在 15–30 秒”
- “默认风格为可拍可生成的真实商业短视频”

### `inferred`
记录从输入中推断出来但非用户原话的判断，例如：

- “根据口播带货结构推断视频以转化为主要目标”
- “根据清洁演示内容推断需突出 before/after 结果展示”
- “根据用户提到字幕，推断画面需预留安全区”

---

## 合规风险识别

### `compliance_flags`
只做识别和标记，不在本步骤展开长篇合规解释。

可标记内容包括：

- `absolute_claim`
- `medical_claim`
- `before_after_risk`
- `unverified_superlative`
- `exaggerated_comparison`
- `brand_identity_unclear`
- `product_visual_consistency_risk`

必要时可附一行简短说明，例如：

```yaml
compliance_flags:
  - type: "before_after_risk"
    note: "脚本强调使用前后强对比，后续输出应避免夸张失真表达"
  - type: "absolute_claim"
    note: "出现'一喷全干净'类绝对化表达，建议弱化或加证据支持"
```

---

## 解析判断逻辑

### A. 如何判断是“脚本转分镜”
若输入以台词、段落、口播内容为主，且没有完整镜头结构，则通常归为：

- `script_to_storyboard`
- `voiceover_to_storyboard`
- `timeline_to_storyboard`

### B. 如何判断是“优化现有分镜”
若输入含有镜头编号、shot list、scene list、镜头表，则优先归为：

- `storyboard_revision`
- `shotlist_optimization`

### C. 如何判断需输出图像提示词
若用户明确提到：

- AI 出图
- 首帧
- 图生视频
- 参考图
- image prompts

则在 `deliverables` 中加入 `image_prompts`，并将 `output_preferences.include_image_prompts` 设为 `true`。

---

## 输出质量要求

解析结果必须：

1. 字段完整
2. 不混淆事实与推断
3. 让下游步骤不需要回头看原始输入也能继续工作
4. 语言简洁但准确
5. 不提前写成完整分镜
6. 不遗漏关键限制条件
7. 不编造品牌事实、产品数据、效果证据

---

## 示例

### 示例 1：带货口播脚本

输入示意：

> “每次做完饭台面都一层油？我最近都用这个清洁喷雾，喷一下等几秒，再一擦就干净了……”

对应解析示例：

```yaml
parsed_input:
  request_type: "script_to_storyboard"
  input_format:
    - "voiceover"
    - "product_brief"
  user_goal: "将厨房清洁喷雾带货口播转成适合短视频投放的结构化分镜"
  deliverables:
    - "storyboard_yaml"
    - "markdown_shot_table"
    - "review_checklist"
  platform:
    target: "generic_short_video"
    inferred: true
  usage_context:
    primary: "human_shoot"
    secondary:
      - "client_review"
  duration:
    requested_sec: null
    inferred_range: "15-30"
  aspect_ratio:
    requested: "9:16"
    defaulted: true
  language:
    script_language: "zh-CN"
    output_language: "zh-CN"
  style:
    requested: []
    inferred:
      - "ugc"
      - "demo_driven"
      - "fast_paced"
  source_materials:
    script_present: true
    storyboard_present: false
    shot_list_present: false
    product_info_present: true
    reference_assets_present: false
    links_present: false
  content_structure:
    hook_present: true
    problem_present: true
    demo_present: true
    benefit_present: true
    proof_present: false
    offer_present: false
    cta_present: true
    raw_sections:
      - "厨房油污痛点提问"
      - "拿出清洁喷雾"
      - "喷洒并等待几秒"
      - "擦拭展示清洁结果"
      - "强调省力"
      - "引导下单"
  entities:
    products:
      - name: "厨房清洁喷雾"
        category: "cleaning_product"
        visible_attributes: []
        must_keep:
          - "包装外形保持稳定"
    people:
      - role: "home_demo_host"
        count: 1
        required: true
        appearance_notes: []
    locations:
      - "home_kitchen"
    props:
      - "台面油污"
      - "抹布"
    brand_elements: []
  continuity_constraints:
    required:
      - "同一位演示者"
      - "同一厨房环境"
      - "同一产品包装"
    preferred:
      - "光线保持一致"
  output_preferences:
    include_yaml: true
    include_markdown_table: true
    include_image_prompts: false
    include_review_checklist: true
  missing_info:
    critical: []
    non_critical:
      - "具体时长未说明"
      - "服装与光线未说明"
  assumptions:
    - "默认平台为 TikTok/抖音通用短视频"
    - "默认画幅为 9:16"
    - "默认视频时长为 15-30 秒"
  inferred:
    - "该内容以转化带货为核心目标"
    - "应突出使用前后结果展示"
  compliance_flags:
    - type: "absolute_claim"
      note: "若后续保留'一擦就干净'类表达，建议避免绝对化呈现"
  notes:
    - "适合拆分为强钩子 + 演示 + 结果 + CTA 的短视频结构"
```

---

## 必要时的补问规则

如果确实存在关键缺口，需要补问时，只能一次性询问最关键问题，避免来回拉扯。优先问题：

1. 这条分镜主要发布在哪个平台？
2. 期望控制在多少秒内？
3. 更偏向真实 UGC、商拍，还是纯产品展示？
4. 主要用于拍摄、AI 出图、AI 视频，还是都要？
5. 是否有必须保留的人物形象、产品包装或品牌元素？

如果不问也能默认推进，就直接推进，并在 `assumptions` 中说明。

---

## 禁止事项

不要在本步骤中：

- 直接写完整分镜
- 输出镜头级 prompt
- 编造用户未提供的品牌信息
- 把推断当事实
- 因信息不完整而停止工作
- 长篇展开创意建议
- 输出与后续结构不兼容的自由散文

---

## 最终要求

本步骤的最终输出必须是一份稳定、结构化、可被后续步骤直接消费的 `parsed_input` YAML。若原始输入非常简略，也应给出尽可能完整的解析结果，并清楚列出假设项与缺失项。
