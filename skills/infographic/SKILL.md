---
name: infographic
description: >-
  信息图创作导演：把复杂资料、数据、流程、对比关系或知识结构转成信息图方案、
  内容结构、布局/风格规范、生成提示词、渲染交付或诊断。
  激活：信息图、知识图、结构化视觉总结、流程图式说明、对比图、数据可视化、
  AI 生图信息图提示词。
  不应激活：普通插画、封面图、产品海报、社交卡片、多页图文、PPT/幻灯片、
  视频任务、已有模板编辑，或只需要数据分析但不需要视觉化的任务。
metadata:
  version: "2.0.0"
  author: gxgen-team
  relatedTools:
    - generate-image
  tags: [infographic, data-visualization, information-architecture, layout]
  category: content-generation
  publicationStatus: public
  codeExecutionCore: false
---

# Infographic Creation Director Skill

信息图创作导演负责把信息、数据和知识结构转成可阅读、可生成、可设计或可诊断的信息图交付物。先判断任务模式，再决定是否调用生成工具。

选择 `infographic` 只表示本条消息附加信息图方法论，不等于必须生成图片，不等于必须渲染或持久化 artifact。

## Publication Governance

This skill is a public business-methodology skill, not a code-execution skill. The publication readiness record lives in [`PUBLICATION-GOVERNANCE.md`](PUBLICATION-GOVERNANCE.md).

Do not turn infographic planning into a fixed generation route, required-next tool, sticky skill state, or image-artifact completion gate. Generated images require explicit user intent and real tool evidence.

## 产出范围

**适用**：单张信息图方案、数据/流程/对比/层级关系可视化、知识结构图、AI 生图信息图 prompt、信息图草稿诊断。

**不适用**：普通插画、封面/海报/产品图、社交卡片、多页图文、PPT/幻灯片、视频、已有模板编辑、纯数据分析或纯文案总结。

**边界**：信息图的核心是信息结构和阅读路径。若用户要的是美术封面，转 `image-creation`；要多页社交卡片，转 `social-card` 或 `slideshow-creation`；要视频结构，转 `video-storyboard`；要成片，转 `video-creation`。

## 任务模式

| Mode | 用户真实需求 | 标准交付物 | 需要图片 artifact |
|------|--------------|------------|-------------------|
| `brief-to-infographic-plan` | 从主题、资料或粗 brief 做信息图策划 | 受众、核心问题、数据缺口、信息结构、布局方向、画幅建议 | No |
| `data-to-infographic` | 把表格、清单、指标或事实数据转成信息图结构 | 数据分组、视觉映射、关键标签、布局/画幅、可生成 prompt | No |
| `copy-to-infographic` | 把文章、报告、长文本压成信息图文案 | 标题、分区、短标签、阅读顺序、删改建议 | No |
| `reference-breakdown` | 拆解参考信息图、截图、URL 或竞品图 | 信息架构、视觉语言、可复用版式、风险点 | No |
| `prompt-only` | 用户只要 AI 生图提示词或参数 | 英文 prompt、中文解释、aspectRatio、includeTextInImage、参考图建议 | No |
| `generate-infographic` | 用户明确要生成图片、出图、PNG 或先做一版 | `generate-image` 结果、图片 URL、prompt、关键参数或失败证据 | Yes |
| `variant/revision` | 对已有方案、prompt 或图片改版 | 改版差异、保持项、更新后的方案/prompt/生成结果 | Conditional |
| `infographic-diagnosis` | 诊断已有信息图或方案 | 问题清单、优先级、结构/文字/视觉改进建议 | No |

模式判断规则：
- 用户说"做方案"、"整理成结构"、"给我提示词"、"拆解/诊断"时，默认不生成图片。
- 用户说"生成图片"、"出图"、"给我 PNG"、"先做一版图"时，进入 `generate-infographic`。
- 用户只说"做一张信息图"，但缺失内容数据、画幅、用途或交付物会影响成本、工具调用或成功标准时，先问一个高价值问题：要先出结构/prompt，还是直接生成图片？
- 只有用户明确"直接生成/先出一版/不用问"时，才带声明假设推进；涉及真实数据缺失时仍不能编造事实。

## Brief-First Gate

先判断缺失信息是否会改变用途、画幅、成本、交付物或成功标准。只问一个最关键问题，不连续填表。

优先确认：

1. **信息来源**：用户文本、表格、链接、截图、报告、已有图。
2. **真实数据**：数字、名称、比例、价格、日期、指标是否完整。
3. **阅读目标**：让读者理解流程、做对比、记住结论、看趋势，还是掌握层级关系。
4. **受众与场景**：汇报、科普、营销、教育、内部说明、社媒传播。
5. **输出形态**：方案、文案、prompt、诊断，还是生成图片。
6. **画幅约束**：16:9、9:16、1:1、A4、长图，或平台要求。

如果用户只给主题没有数据：
- 想要真实信息图：先要数据/资料/链接，不要编造。
- 只要结构示例：可以用占位符，但必须标明是占位，不当作真实数据。
- 明确要"先出示意图"：可生成示意图，但 prompt 中的数据应写成用户认可的占位或抽象标签。

声明假设格式：

```text
我先按 [受众/用途/画幅/信息结构] 推进；其中 [数据/标签] 先用占位，不代表真实结论。
```

## 信息结构判断

先判断内容天然形状，再选布局。布局是信息架构，不是装饰风格。

| 数据形状 | 典型信号 | 推荐布局方向 |
|----------|----------|--------------|
| Sequential | 步骤、时间线、过程、先后关系 | linear-progression、winding-roadmap、comic-strip |
| Comparative | A/B 对比、优缺点、多维指标 | binary-comparison、comparison-matrix |
| Hierarchical | 层级、优先级、分类、金字塔 | hierarchical-layers、tree-branching、funnel |
| Relational | 中心概念、分支、循环、互相影响 | hub-spoke、circular-flow、venn-diagram、jigsaw |
| Spatial | 模块、区域、地图、仪表盘 | isometric-map、bento-grid、dashboard |
| Conceptual | 隐喻、冰山、桥梁、故事山 | iceberg、bridge、story-mountain、periodic-table |

完整布局定义按需读取 `references/layout-gallery.md`。

不要设置万能默认布局。无明确信号时，先从内容形状和信息密度推断；如果推断会明显影响交付，就问一个问题。

## 风格判断

风格服务可读性和受众信任，不服务炫技。

选择风格时：
- B2B / 专业 / 汇报：corporate-memphis、technical-schematic、ui-wireframe。
- 教育 / 科普 / 亲和：craft-handmade、chalkboard、flat-vector。
- 创意 / 轻松 / 儿童向：kawaii、lego-brick、bold-graphic。
- 工程 / 系统 / 路线：technical-schematic、subway-map、ui-wireframe。

完整风格映射按需读取 `references/style-pairings.md`。

不要设置万能默认风格。用户没给风格时，用受众和场景推断；若用户明确"先出一版"，声明采用的风格假设。

## Prompt Construction

`prompt-only` 和 `generate-infographic` 都使用同一套 prompt 结构。

```text
[Style rendering description] infographic using [Layout type] information architecture.
[Layout structure]: [Map user content to layout zones with positions and hierarchy].
[Visual style]: [color palette, texture, typography style, icon style].
[Content labels and text]: [All user-provided data points verbatim in the original language].
[Hierarchy]: [Primary focus, secondary groups, detail labels].
[Aspect ratio guidance]: [landscape / portrait / square / user-specified].
```

规则：
- Prompt 主体用英文；用户提供的中文/日文/英文标签和数据原文保留。
- 所有用户提供的数据点、名称、数字、日期、指标必须逐字进入 prompt；不能总结、改写或自行补数。
- Layout 必须写成空间结构描述，不只写布局名字。
- 明确主次层级：主结论、分组、细节标签。
- 避免 `hyper-realistic`、`8K`、`masterpiece`、`best quality`、`highly detailed` 等噪音词。

### Aspect Ratio Guidelines

| Layout Category | Recommended Aspect |
|-----------------|--------------------|
| Wide/horizontal flow | 16:9 |
| Vertical hierarchy/funnel/process | 9:16 |
| Grid/radial/balanced | 1:1 |
| Print handout or report insert | A4 / user-specified |

用户指定画幅优先；否则按布局类别推断并说清楚。

## Tool Use Boundary

### 非生成模式

`brief-to-infographic-plan`、`data-to-infographic`、`copy-to-infographic`、`reference-breakdown`、`prompt-only`、`infographic-diagnosis` 可以直接用结构化文本完成。不要为了满足 skill 选择而调用 `generate-image`。

### 生成模式

只有 `generate-infographic`，或其他模式中用户明确要求出图时，才调用 `generate-image`。

调用前按需读取 `references/checklist.md`，P0 不通过就先修 prompt 或澄清，不要先生成。

`generate-image` 参数建议：
- `prompt`：按上文结构构造的英文主 prompt，保留用户原文标签。
- `aspectRatio`：用户指定优先，否则来自布局类别。
- `includeTextInImage`：信息图默认为 true；只有用户明确要无文字图才设 false。
- `referenceImageUrls`：用户提供的参考图或风格图 URL。
- `contentCategory`：按用途选择 educational / marketing / business。

生成失败：
- 文字糊、元素堆叠、布局混乱：简化布局或建议拆成多张，再最多重试 1 次。
- 数据缺失或事实不确定：停止生成，向用户要数据或给占位方案。
- 工具/provider 失败：给出错误证据、已尝试处理和下一步。

## Output Contracts

### `brief-to-infographic-plan`

- 目标读者和使用场景。
- 一句话核心问题。
- 数据/素材缺口。
- 推荐信息结构、布局、画幅和风格方向。
- 不要求图片 artifact。

### `data-to-infographic`

- 数据完整性判断。
- 数据分组和视觉映射。
- 标题、分区、关键标签。
- 布局/画幅/prompt 或设计说明。
- 不要求图片 artifact。

### `copy-to-infographic`

- 从长文中提炼的信息图标题、分区和短标签。
- 删除、合并和保留的内容说明。
- 阅读顺序和重点层级。
- 不要求图片 artifact。

### `reference-breakdown`

- 参考来源和可验证证据。
- 信息架构拆解。
- 视觉语言和布局规则。
- 可复用点与不可复刻风险。
- 不要求图片 artifact。

### `prompt-only`

- 任务模式和声明假设。
- 英文 prompt。
- aspectRatio、includeTextInImage、referenceImageUrls 使用建议。
- 不调用生成工具，不要求图片 artifact。

### `generate-infographic`

- 任务模式和声明假设。
- 英文 prompt 与关键参数。
- 生成结果证据：`imageUrl`、task id、provider status 或明确失败证据。
- 多图请求逐张列出 artifact 或失败证据。

### `variant/revision`

- 保持项。
- 变化项。
- 更新后的结构、文案、prompt 或生成结果。
- 是否需要 artifact 取决于用户是否要求出图。

### `infographic-diagnosis`

- 诊断维度：信息完整性、结构匹配、文字可读性、视觉层级、风格一致性、画幅适配。
- 按优先级排序的问题清单。
- 可执行修改建议或改版 prompt。
- 不要求图片 artifact。

## Quality Standards

交付前检查：

1. 模式正确：没有把方案、prompt 或诊断请求误升级为图片生成。
2. 事实保真：数字、名称、日期、指标不编造、不改写。
3. 结构匹配：布局来自内容形状，而不是固定默认值。
4. 可读性明确：主次层级、标签长度和信息密度可落地。
5. 风格一致：只使用一套风格语言，不混搭。
6. 画幅合理：画幅和布局类别一致，或遵从用户指定。
7. 参考证据真实：参考图、链接或截图来自当前轮可验证来源。

## Verification

### 通用完成证据

- [ ] Task Mode 已声明或可从输出看出。
- [ ] 输出匹配用户请求：方案 / 结构 / 文案 / 拆解 / prompt / 生成结果 / 诊断之一。
- [ ] 影响用途、画幅、成本、工具调用或成功标准的缺口已澄清，或已声明假设。
- [ ] 如涉及真实数据，未编造缺失事实；占位数据已明确标注。
- [ ] 如输出 prompt，主 prompt 为英文，用户数据原文保留。
- [ ] 如使用参考证据，来源真实且未伪造 URL。

### 非生成模式证据

`brief-to-infographic-plan`、`data-to-infographic`、`copy-to-infographic`、`reference-breakdown`、`prompt-only`、`infographic-diagnosis` 完成时不要求图片 artifact。有效完成证据分别是：
- 策划模式：核心问题、受众、信息结构、数据缺口、布局和画幅建议。
- 数据模式：数据分组、视觉映射、标签、布局和 prompt/spec。
- 文案模式：标题、分区、短标签、阅读顺序和删改说明。
- 拆解模式：参考证据、信息架构、视觉语言和可复用规则。
- prompt 模式：英文 prompt 和关键参数。
- 诊断模式：问题清单、优先级、修改建议和验收标准。

### 生成模式额外证据

`generate-infographic` 完成前确认：
- [ ] `generate-image` 返回 `imageUrl`、task id、provider status 或明确失败证据。
- [ ] `includeTextInImage` 与任务一致；默认 true，除非用户明确不要文字。
- [ ] prompt 包含布局结构、风格、主次层级和用户原文数据点。
- [ ] 多图请求每张都有独立 artifact 或失败证据。
- [ ] 失败时已说明 provider/task 错误、已尝试处理和下一步。

如果只选中了 `infographic`，但用户请求属于策划、结构化、文案、拆解、prompt 或诊断，不要把缺少图片 artifact 当成未完成。

## Reference 文件索引

按需读取，不预加载：

| 文件 | 何时读取 |
|------|----------|
| `references/layout-gallery.md` | 需要选择或解释信息架构布局 |
| `references/style-pairings.md` | 需要选择或解释视觉风格 |
| `references/checklist.md` | 构造完 prompt、调用 `generate-image` 之前 |
