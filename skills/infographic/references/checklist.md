# Infographic Pre-Submit Checklist

> 位置：`server/skills/image/infographic/references/checklist.md`
> 用途：信息图 Prompt 提交给 `generate-image` 之前的交付前自检清单
> 加载时机：构造完 prompt、调用 `generate-image` **之前**。每条均需 grep-able / 肉眼可对照。

每条规则给出 **是什么 / 为什么 / 如何验证**，按严重度分级：

- **P0** — 错了画面会直接失败（不可读 / 信息缺失 / 风格漂移）。任何 P0 不通过 → 不要调用 generate-image，回到 prompt 构造修复。
- **P1** — 错了画面能用但有明显问题（违和、信息密度不当、风格混搭）。不通过应修正后再生成。
- **P2** — 锦上添花，影响精致度。可在首版交付后迭代。
- **P3** — 边界场景处理，不一定每次都触发。

---

## P0 · 必过项

### P0-1 · `includeTextInImage = true` 已设置

- **是什么**：调用参数 `includeTextInImage` 必须显式置 true（除非用户明确说"不要文字"）。
- **为什么**：信息图本质是"带标签的视觉"，模型默认会把文字省成糊状色块。
- **如何验证**：检查即将传入 `generate-image` 的参数对象，肉眼确认 `includeTextInImage: true`。

### P0-2 · 用户内容的数据点逐字进入 prompt

- **是什么**：用户给的所有标签、数字、关键词必须**原文**出现在 prompt 字符串里，不允许 Agent 自行总结、改写、翻译、缩写。
- **为什么**：扩散模型只渲染 prompt 里出现过的字符。Agent 的"我帮你提炼"会让最终图缺词。
- **如何验证**：把用户原文里所有名词/数字列成清单 → 在 prompt 里逐个 grep，缺一个就补回去。

### P0-3 · Layout 写成结构描述，不只是名字

- **是什么**：禁止 prompt 里只写 "iceberg infographic" / "bento-grid layout"；必须展开成模型能理解的几何/空间描述。
- **为什么**：扩散模型不认识布局命名，只认识"a horizontal waterline divides the image, top half shows visible peak, bottom half shows submerged mass"这类视觉描写。
- **如何验证**：把 prompt 里的 layout 部分单独读出来，检查是否含：方位词（top/bottom/left/right/center）+ 几何词（horizontal line/grid/arc/spiral）+ 元素分布（N items evenly spaced / radiating from center）。三者缺一即不通过。
- **参考**：`references/layout-gallery.md` 每个 layout 的 "Prompt Keywords" 字段就是合格描述的范本，直接复用。

### P0-4 · Aspect ratio 与 layout 类别匹配

- **是什么**：纵向漏斗 / 故事山 / 时间线（垂直） → `9:16`；横向流程 / 桥梁 / 漫画条 → `16:9`；雷达 / 维恩图 / bento → `1:1`。
- **为什么**：错配会让模型强行拉伸/挤压结构，常见症状是"漏斗变正方形矮胖、时间线被截断"。
- **如何验证**：对照 SKILL.md 的 "Aspect Ratio Guidelines" 表，检查参数 `aspectRatio` 是否落在 layout 类别推荐区间。

### P0-5 · Prompt 里没有 AI cliché 噪声词

- **是什么**：禁止出现 `hyper-realistic` / `8K` / `4K` / `masterpiece` / `best quality` / `highly detailed` / `award-winning` / `trending on artstation` / `ultra detailed` / `photorealistic`（除非用户主诉就是写实摄影，不属于 infographic 范畴）。
- **为什么**：这些词会把模型推向数字绘画/CGI 美学，覆盖掉 Style 系统设定的扁平/手工/几何风格。
- **如何验证**：grep 上述关键词，命中即删除。

### P0-6 · 只用一套 Style，不混搭

- **是什么**：prompt 里 Style 关键词来源必须是 `style-pairings.md` 里**单一**风格条目，不允许把 `craft-handmade` 的 "torn edges" 和 `cyberpunk-neon` 的 "neon glow" 拼在同一句。
- **为什么**：风格混搭直接导致画面层级崩溃（光照不一致 / 笔触不一致 / 色板冲突）。
- **如何验证**：找出 prompt 里所有形容词性短语（`paper craft` / `flat vector` / `neon glow` 等），核对是否全部来自同一个 style 条目。

---

## P1 · 强烈建议

### P1-1 · Layout 与数据形状匹配

- **是什么**：Sequential 数据（步骤/时间线）→ linear 系；Comparative → comparison 系；Hierarchical → tree/pyramid 系；Relational → hub/cycle 系。
- **为什么**：用 timeline 装非时间数据，用 hub-spoke 装顺序数据，模型会强行编序号或加箭头，反而误导读者。
- **如何验证**：回答一句："用户的内容如果用一句话讲清楚，需要顺序词（先...再...最后） / 对比词（VS / 相比） / 层级词（上下级 / 优先） / 关系词（围绕 / 包含）哪一种？" 然后回头核对所选 layout 的类别。

### P1-2 · Style 与受众/语气匹配

- **是什么**：B2B/Corporate 内容用 `corporate-memphis` / `technical-schematic`；教育/亲和用 `craft-handmade` / `chalkboard`；创意/趣味用 `kawaii` / `lego-brick`；技术/工程用 `ui-wireframe` / `subway-map`。
- **为什么**：风格语气错位（财报用 kawaii / 童书用 cyberpunk-neon）会让交付被退回。
- **如何验证**：写一句"这是给谁看的、什么场合"，再对照 `style-pairings.md` 顶部的"内容信号→布局推荐"表。

### P1-3 · 信息密度与 layout 容量匹配

- **是什么**：3-5 项 → 简单 layout（binary-comparison / funnel / linear）；5-10 项 → 结构化 layout（bento-grid / hub-spoke）；10+ 项 → 高密度 layout（dashboard / periodic-table / comparison-matrix）。
- **为什么**：在 `binary-comparison` 里塞 12 个要素，模型只会渲染 3-4 个其余糊掉。
- **如何验证**：数一数源数据有几条，对照 SKILL.md 的 "Content Density" 表。超额 → 换更高密度 layout 或拆图。

### P1-4 · Prompt 主体用英文，标签可保留用户语言

- **是什么**：layout 结构描述、style 关键词、布局指令一律英文；数据点 / 标签 / 数字 / 标题保留用户原始语言（中文/日文等）。
- **为什么**：模型对英文结构指令理解最稳；数据点保留原文是 P0-2 的硬约束。
- **如何验证**：扫一遍 prompt，结构性短语是否全英文；数据点是否原样未译。

### P1-5 · 视觉层级显式声明

- **是什么**：prompt 里至少出现一次 `primary focus` / `dominant element` / `main highlight` 之类的层级词，标明哪个元素最重要。
- **为什么**：不写层级，模型会均权渲染，所有要素一样大 → 读者抓不到重点。
- **如何验证**：grep `primary` / `main` / `central` / `dominant` / `focal point` 至少命中一次。

### P1-6 · 单图聚焦单一主题

- **是什么**：一张信息图只回答一个问题。混合议题（"产品对比 + 时间线 + 团队介绍"）应分成多张。
- **为什么**：扩散模型对"多主题并置"的处理几乎都是失败的。
- **如何验证**：用一句话概括这张图的主问题，如果需要"和" / "另外"才能讲完，就拆。

---

## P2 · 锦上添花

### P2-1 · 装饰元素与 Style 一致

- **是什么**：背景纹理、边框、连接线、icon 风格须与主 style 同源。craft-handmade 配 `subtle paper grain background`；cyberpunk-neon 配 `dark grid background with scanlines`。
- **如何验证**：style-pairings.md 每个风格条目里的关键词就是合格的装饰描写，照搬。

### P2-2 · 数字呈现方式显式说明

- **是什么**：含数字的图（dashboard / comparison-matrix / funnel）应在 prompt 里指明"large bold numerals" / "tabular figures" / "percentage with unit"。
- **为什么**：默认数字会被渲染成普通文字字号，失去视觉重量。

### P2-3 · 留白与边距提示

- **是什么**：prompt 里加 `generous whitespace` / `clear margins` / `breathing room between sections`。
- **为什么**：模型默认倾向"填满画面"，导致信息图变成密集纹样。

### P2-4 · 配色不直接命名 hex

- **是什么**：色彩用语义词（warm earth tones / cool monochrome blues / muted pastel）而不是 `#1a2e1f`。
- **为什么**：扩散模型不认 hex；语义词更稳定。

### P2-5 · 图片占位器策略一致

- **是什么**：如果 layout 里有人物/产品/场景图位，要么全部具象（"a friendly designer at desk"）要么全部抽象（"abstract human silhouette"），不要混。

---

## P3 · 边界处理

### P3-1 · 内容超出单图容量

- **触发条件**：源数据 > 12 项 / 包含 ≥ 3 个独立子主题 / 单个 cell 文本 > 30 字。
- **处理**：提议用户拆成 2-3 张图（按主题或按层级），或换到 `dashboard` / `periodic-table` / `bento-grid` 高密度 layout。

### P3-2 · 用户提供了参考图

- **是什么**：用户上传了 reference image（"按这个风格做"）。
- **处理**：把 URL 传到 `referenceImageUrls`，**且** prompt 里仍要写完整 layout 结构与数据点（参考图只影响视觉风格，不影响内容）。

### P3-3 · 生成质量不达标的重试策略

- **触发条件**：首次生成出现 — 文字糊掉 / 元素堆叠 / 风格漂移。
- **处理顺序**：① 简化 layout（减少分区数量）→ ② 强化同一 style 关键词（补充 1-2 个同风格关键词）→ ③ 保留全部数据点但提升可读性（缩短非数据性修饰语 / 加大字号 / 增强层级与留白 / 把次要元素降权但不删除）→ ④ 切换到更兼容的 layout，或建议拆分为多张图（每张承载一部分数据点）。
- **不允许**：通过加 `hyper-realistic` / `4K` 等噪声词"提质量"——会触发 P0-5。
- **不允许**：通过删数据点降密度——会违反 P0-2"逐字保留"的硬约束。

### P3-4 · 用户给出 hex 色或具体字体

- **是什么**：用户硬性要求"用 #1a2e1f 主色 / 用思源黑体"。
- **处理**：告知用户 — 模型对精确 hex 和具体字体名识别极不稳定，建议改用语义色（"deep forest green"）和字体类别（"clean sans-serif" / "elegant serif"）。强行透传 hex 会被忽略且可能引入风格漂移。

### P3-5 · 多语言混排

- **是什么**：标签同时含中文和英文。
- **处理**：在 prompt 里明确 `bilingual labels with Chinese primary and English secondary, both visible`，否则模型会把次要语言糊掉。

---

## 自检流程速记

构造完 prompt、点击 `generate-image` 之前：

1. **P0 全跑一遍** — 任意一项不过即返回修 prompt，不要先生成再说。
2. **P1 跑一遍** — 不过的标记下来，第一版生成后看是否真的影响交付，再决定是否回炉。
3. **P2 / P3** — 第一版交付后根据用户反馈再迭代。

不要把"先生成看看效果"当成自检替代品。模型一次调用是有成本的，自检是把成本花在 prompt 字符上而不是 GPU 上。

---

## 实例 · 修复前后对比

**用户输入**（场景化示意，未提供具体数值）：
> "做一张对比 模型A / 模型B / 模型C 三个产品的信息图，给开发者看，包含上下文窗口、版本号、单价"

> ⚠️ 注意：用户只列了"维度"（上下文窗口 / 版本号 / 单价），没给"数值"。按 P0-2 "数据点逐字"原则，Agent **必须**先向用户索要每个维度的实际数值（或允许用户提供官方文档/链接），不得擅自填入"看起来合理"的数字——那本身就是 P0-2 违反与事实风险。
>
> 下面例子中所有具体数值用 `<USER-PROVIDED>` 占位，演示**结构**而非真实数据。

### ❌ 不合规版本（容易出现的偷懒 prompt）

```text
Create a comparison infographic about Model A, Model B, and Model C with a clean tech style.
```

**P0 检查**：
| 项 | 结果 | 失败原因 |
|---|---|---|
| P0-1 includeTextInImage | ❌ | 调用参数未显式置 true |
| P0-2 数据点逐字 | ❌ | "上下文窗口 / 版本号 / 单价"维度名 + 任何数值都没出现；同时也没触发"数值缺失先问用户"的澄清动作 |
| P0-3 Layout 写结构 | ❌ | 只写了 "comparison" 没说几列几行、表头位置 |
| P0-4 aspect ratio | ❌ | 未指定，模型默认会出 16:9 但 grid 应是 1:1 |
| P0-5 无 cliché | ✅ | 没出现 hyper-realistic / 8K |
| P0-6 单一 style | ❌ | "clean tech style" 不是 17 风格中任一条目的关键词组 |

**结论**：6 项 P0 命中 5 项失败 → 不要 generate，回去**先澄清数值**再修 prompt。

### ✅ 合规版本（按 P0 修复 + 已从用户拿到数值后）

> 假设澄清后用户提供了每行数值（这里用 `<USER-PROVIDED>` 占位，实际 prompt 里替换为用户原文）。

```text
ui-wireframe infographic using comparison-matrix information architecture.
Layout: 4-column × 5-row grid table. Header row lists the 3 model names across columns 2–4: <MODEL-A-NAME>, <MODEL-B-NAME>, <MODEL-C-NAME>. Column 1 lists criteria labels. Cells contain values or checkmarks.
Visual style: monochrome dotted line borders, blueprint-style annotation labels, technical schematic aesthetic, single blue accent color for primary row highlight.
Content (verbatim from user):
- Context window row: <MODEL-A-NAME> = <USER-PROVIDED>, <MODEL-B-NAME> = <USER-PROVIDED>, <MODEL-C-NAME> = <USER-PROVIDED>
- Version row: <USER-PROVIDED>, <USER-PROVIDED>, <USER-PROVIDED>
- Input price row: <USER-PROVIDED>, <USER-PROVIDED>, <USER-PROVIDED>
Primary focus: context window comparison row, larger numerals, accent color background.
Generous whitespace between rows. Square layout.
```

调用参数：
- `aspectRatio: "1:1"`（与 grid layout 类别匹配）
- `includeTextInImage: true`
- `contentCategory: "educational"`

**P0 检查**：6/6 通过（前提是 `<USER-PROVIDED>` 占位都已被用户实际给的字符串替换；占位本身在最终 prompt 里 **不允许残留**）。

### 修复带来的差异

| 维度 | 不合规版本 | 合规版本 |
|---|---|---|
| 数据保真 | 维度名都丢失，遑论数值 | 维度名 + 用户提供的数值都逐字进入 prompt |
| 数据真实性 | 模型可能臆造数字 | 数值来自用户输入，不允许 Agent 编造 |
| 结构稳定 | 模型可能出 cards/Venn/timeline 任一种 | 锁定 4×5 grid |
| 风格一致 | "tech style" 触发数字绘画/CGI 概率高 | ui-wireframe 关键词锁定蓝图风 |
| 重点突出 | 三模型权重相同 | 上下文窗口行被加重 |
| 一次出图可用率 | 低（多数需要重抽） | 高（数据完整 + 结构清晰） |

> 这个例子也说明两件事：
> 1. **P0 不是"额外功夫"**——它是把模型从"猜测填空"拉回到"按谱执行"的最低门槛。
> 2. **Agent 自己不能补数据**——遇到用户只给维度没给数值的输入，**先澄清**，不要以"看起来合理"为由填入虚构事实。这适用于一切包含具体数据的信息图（产品参数、价格、性能指标、统计数据等）。
