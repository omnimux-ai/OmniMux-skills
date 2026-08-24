---
vendor: gpt-image
modality: image
status: active
provider: openai
backend: gpt-image-2
---

# gpt-image -- image 后端卡片

## 能力

- 模型：`gpt-image-2`；审美、画风参考、文字、版式、商品图、真人写实主体、复杂 brief 首选
- `model_id` 只能是 `gpt-image-2`；不要用 `g-image-2` / `openai-image` 等 picker token
- 把 prompt 当 **spec / 创意 brief** 解析；labeled segment + 显式 constraint 比 flowing prose 强
- ref 上限 16（行业最大）
- 强项：审美构图 / art direction、style ref / 画风迁移、**in-image text**（中文长 tagline、英文 ad copy、CJK + Latin 混排都稳）、infographic / UI mock / slide deck、真人写实主体、真人短剧角色锚点 / character sheet、cinematic realistic portrait、**multi-ref 合成**（virtual try-on 4-5 件衣服是 sweet spot）、photoreal、identity preservation 跨编辑
- 弱项：用户明确点名 Midjourney/MJ 风格时按用户指定路由
- 默认选型：任务含 style ref / 画风 / 审美 / in-image text / 真人写实角色锚点 / 复杂结构视觉 / 多 ref 合成时首选

## 调用约定

- **复杂 brief 用 labeled segment**：`Scene: / Subject: / Style: / Composition: / Text: / Constraints: / Medium:`
- 写明 intended use（`pitch deck slide` / `magazine ad` / `iPhone app mockup`）触发 polish mode
- 简单源图编辑用短 prompt：保留用户改动原话，让输入图承载主体；不要枚举姿态、性别、材质、光照或负面约束
- 多参考图按 `semantic-judgment` 的 contribution map 写成 labeled segments，再补 gpt-image 需要的完整场景、材质和美术整合方向。
- style/ref color/carrier handling follows `semantic-judgment`; this card only adds gpt-image prompt structure and limits.
- in-image text 双引号包裹 + 显式位置（`top center` / `bottom-right`）+ 定性字体（`bold sans-serif`）
- text-heavy 必须写成明确版式 brief：文字内容、位置、层级、字体气质、留白和对齐关系都要落在 prompt body
- 透明背景需求必须在 prompt body 写成 `transparent background / clean cut-out`，且不要传 manifest 未列出的参数
- 编辑迭代只重复用户指定的 invariant；不要为简单编辑制造 keep 列表
- 甜区 80-300 word；> 400 关键 directive 稀释（用 labeled segment 缓解）

## 已知 bug

- camera spec（`50mm f/1.4 ISO 400`）当 vibe hint 解析，**不做物理仿真**，不要期待精确散景
- aspect ratio 必须同时写进 `vendor_params.aspect_ratio` 和 prompt body，否则画布飘
- `vendor_params.resolution` 只能是 `1k` / `2k` / `4k`；MCP 不暴露 native `n`，批量只用顶层 `count`；image 任务不要传 `720p` / `1080p`
- recency bias：closing sentence 决定 medium，必须 medium lock 收尾
- `EXACTLY ONCE EXACTLY ONCE` 反而触发重复 → 正常语气说一次：`Render the tagline once, integrated into the layout`
- 命名字体当 style hint 解析、不精确匹配 → 用 `bold sans-serif like Inter`
- pure vibe 装饰 / fine-art 美感 < MJ → 路由切换

## Pointer

→ <knowledgeDir>/failures/on-image-text.md（in-image text 是本卡 sweet spot）  → <knowledgeDir>/failures/character-refs.md（multi-ref index + role）  → <knowledgeDir>/vendors/midjourney.md（pure vibe 替代）
