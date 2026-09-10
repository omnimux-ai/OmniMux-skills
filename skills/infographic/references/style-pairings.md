# Infographic Style Pairings

> 位置：`server/skills/image/infographic/references/style-pairings.md`
> 用途：内容信号→布局映射、Layout×Style 推荐搭配、17 种风格 Prompt 关键词速查
> 来源：适配自 baoyu-infographic 风格体系 + image-creation 共享风格库

---

## 内容信号 → 布局推荐

Agent 根据用户输入的关键词/语境推荐布局：

| 内容信号 | 推荐布局 | 理由 |
|---------|---------|------|
| 步骤、教程、How-to、流程 | linear-progression | 信息本身是顺序的 |
| 时间线、历史、发展、演变 | linear-progression (timeline) | 按时间排列 |
| 路线图、旅程、学习路径 | winding-roadmap | 强调里程碑和进度 |
| 对比、A vs B、优劣、前后 | binary-comparison | 两侧对照一目了然 |
| 多维度比较、评测、选购 | comparison-matrix | 网格化多因素对比 |
| 层级、优先级、金字塔 | hierarchical-layers | 自上而下重要性递减 |
| 分类、分支、决策树 | tree-branching | 父子关系清晰展开 |
| 转化、漏斗、筛选 | funnel | 宽→窄收敛过程 |
| 核心+周边、生态、思维导图 | hub-spoke | 中心辐射关联 |
| 循环、闭环、生命周期 | circular-flow | 无始无终的循环 |
| 交集、关系、共同点 | venn-diagram | 重叠区域表示共性 |
| 组合、拼图、配合 | jigsaw | 强调部分如何拼成整体 |
| 地图、空间、建筑、架构 | isometric-map | 3D 空间感呈现 |
| 综合总览、多主题、概览 | bento-grid | 灵活网格包容多种内容 |
| KPI、数据、指标、报表 | dashboard | 数据密集型展示 |
| 表面vs深层、根因、冰山 | iceberg | 水面上下的隐喻 |
| 问题→方案、差距、转型 | bridge | 跨越鸿沟的隐喻 |
| 叙事、高潮、起承转合 | story-mountain | 张力弧线 |
| 目录、分类合集、工具集 | periodic-table | 元素周期表式陈列 |
| 拆解、解剖、内部结构 | structural-breakdown | 爆炸图/剖面图 |
| 叙事、故事、场景序列 | comic-strip | 漫画分格叙事 |

---

## Layout × Style 推荐搭配

按内容场景推荐最佳 Layout + Style 组合：

| 内容场景 | Layout | Style | 搭配理由 |
|---------|--------|-------|---------|
| 入门教程 | linear-progression | ikea-manual | 极简步骤图解 |
| 历史时间线 | linear-progression | aged-academia | 复古学术质感 |
| 学习路线图 | winding-roadmap | watercolor-storybook | 梦幻旅程感 |
| 产品对比 | binary-comparison | corporate-memphis | 商业化清晰对比 |
| 产品评测 | comparison-matrix | ui-wireframe | 技术规格感 |
| 优先级模型 | hierarchical-layers | craft-handmade | 亲和力金字塔 |
| 技术分类 | tree-branching | origami | 几何折纸树 |
| 营销漏斗 | funnel | corporate-memphis | 商业化漏斗 |
| 产品生态 | hub-spoke | subway-map | 网络连接感 |
| 循环流程 | circular-flow | craft-handmade | 温暖手工循环 |
| 概念交集 | venn-diagram | craft-handmade | 友好的概念重叠 |
| 团队协作 | jigsaw | craft-handmade | 温暖拼图感 |
| 系统架构 | isometric-map | pixel-art | 复古像素地图 |
| 功能总览 | bento-grid | chalkboard | 黑板教学总览 |
| 数据面板 | dashboard | cyberpunk-neon | 未来感数据屏 |
| 深层原因 | iceberg | watercolor-storybook | 艺术化深度 |
| 转型方案 | bridge | corporate-memphis | 商业转型桥梁 |
| 项目生命周期 | story-mountain | watercolor-storybook | 叙事弧线 |
| 工具合集 | periodic-table | bold-graphic | 高对比元素格 |
| 产品拆解 | structural-breakdown | technical-schematic | 工程蓝图拆解 |
| 用户故事 | comic-strip | kawaii | 可爱角色叙事 |

通用候选：`bento-grid` + `craft-handmade` 可用于混合型、低风险概览，但不得作为默认值；仍需先判断信息结构、受众和语气。

---

## 17 种风格 Prompt 关键词速查

Agent 选定风格后，从此表提取 Prompt 关键词融入信息图 prompt。

### craft-handmade（手工纸艺）
**Prompt**: `paper craft illustration style, cut paper collage, handmade paper texture, torn edges, warm shadow, layered paper cutout`
**适合布局**: 几乎所有布局（通用性最强）

### corporate-memphis（企业孟菲斯）
**Prompt**: `corporate memphis style, flat vector characters, bold color blocks, geometric shapes, no shadows, vibrant startup illustration`
**适合布局**: funnel, binary-comparison, hub-spoke, dashboard, bridge

### technical-schematic（技术蓝图）
**Prompt**: `blueprint technical drawing, white lines on dark blue grid, engineering schematic, annotation lines, technical diagram`
**适合布局**: structural-breakdown, isometric-map, comparison-matrix, tree-branching

### chalkboard（黑板粉笔）
**Prompt**: `colorful chalk drawing on blackboard, hand-lettered, dusty chalk texture, classroom aesthetic, educational chalkboard`
**适合布局**: bento-grid, hierarchical-layers, linear-progression, hub-spoke

### watercolor-storybook（水彩绘本）
**Prompt**: `soft watercolor illustration, dreamy storybook art, gentle color blending, fairy tale aesthetic, whimsical painting`
**适合布局**: winding-roadmap, iceberg, story-mountain, circular-flow

### cyberpunk-neon（赛博霓虹）
**Prompt**: `cyberpunk neon glow, dark background with glowing edges, futuristic holographic, sci-fi neon lights, electric blue and magenta`
**适合布局**: dashboard, isometric-map, hub-spoke, linear-progression

### bold-graphic（粗线漫画）
**Prompt**: `bold comic style, thick outlines, halftone dots, pop art graphic, high contrast, comic book illustration`
**适合布局**: periodic-table, binary-comparison, comic-strip, jigsaw

### aged-academia（复古学术）
**Prompt**: `vintage academic illustration, aged parchment paper, copperplate engraving, botanical drawing, antique scientific diagram`
**适合布局**: linear-progression (timeline), tree-branching, structural-breakdown

### pixel-art（像素艺术）
**Prompt**: `pixel art, 8-bit retro game style, chunky pixels, limited color palette, nostalgic video game aesthetic`
**适合布局**: isometric-map, periodic-table, bento-grid, dashboard

### ikea-manual（宜家手册）
**Prompt**: `ikea instruction manual style, minimal line art, simple step illustration, blue and red accent, wordless diagram`
**适合布局**: linear-progression, structural-breakdown, funnel

### claymation（黏土动画）
**Prompt**: `claymation 3D style, clay figure, stop-motion aesthetic, rounded soft shapes, playful sculpted characters`
**适合布局**: hub-spoke, hierarchical-layers, comic-strip, jigsaw

### knolling（俯拍陈列）
**Prompt**: `knolling flat lay, overhead view, neatly organized objects, uniform spacing, clean background, curated arrangement`
**适合布局**: periodic-table, bento-grid, comparison-matrix

### origami（折纸几何）
**Prompt**: `origami folded paper style, geometric faceted forms, visible fold lines, cast shadows showing depth, low-poly paper aesthetic, angular shapes on clean background`
**适合布局**: tree-branching, hierarchical-layers, jigsaw, hub-spoke

### kawaii（卡哇伊）
**Prompt**: `kawaii Japanese cute style, big sparkly eyes, soft pastel pink mint lavender, rounded bubbly shapes, blushing cheeks, sparkles and stars, chibi characters`
**适合布局**: comic-strip, circular-flow, hub-spoke, bento-grid

### subway-map（地铁图）
**Prompt**: `subway transit map style, colored route lines at 45° and 90° angles, station circle markers, interchange symbols, simplified geography, clean sans-serif labels`
**适合布局**: hub-spoke, circular-flow, linear-progression, winding-roadmap, tree-branching

### lego-brick（乐高积木）
**Prompt**: `lego brick construction style, visible brick studs, modular stackable elements, classic primary colors (red blue yellow green), plastic sheen, building instruction aesthetic`
**适合布局**: hierarchical-layers, structural-breakdown, bento-grid, isometric-map

### ui-wireframe（线框原型）
**Prompt**: `grayscale UI wireframe style, clean interface mockup, placeholder boxes, minimal line art, technical specification layout, grid-aligned components`
**适合布局**: dashboard, comparison-matrix, bento-grid, structural-breakdown
