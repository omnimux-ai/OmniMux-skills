# Anchors 图像 Prompt 模板

> Anchors 只在命中卡片缺口时读取本文件，并只定位实际需要的 TPL-01 产品资料卡或 TPL-02 创意路线 KV。参数均为 gpt-image-2 / g-image-2、medium、2K、16:9。以下英文骨架只定义语义与布局；author work item 前，必须把全部自然语言指令、标题和卡内可见栏目编译为 Brief 的 `prompt_language`（等于当前 `working_language`），只保留品牌名、型号、Logo、用户逐字文案、ref id 和工具字面量原文。

## TPL-01 产品资料卡

`real_product` 输入只来自 Visual Research verified 产品注册表、产品事实和 `product_reference_routing`；每个角度只传一个主锚定 ref。`concept_product` 输入来自用户已提供的概念产品图 / Logo / VI（如有）、用户确认的概念方向、Brief 外观事实和路线资产需求；存在 verified `concept_product_inspiration` 时，只可继承其已登记的通用品类廓形、结构、材质或使用状态，不得继承品牌、型号、Logo、包装文字、官方配色或真实 SKU 身份。

```text
Create one professional product reference card for {brand} {product}, landscape 16:9.

HEADER: {brand} {product} — Product Reference Card

ZONE A / PRODUCT VIEWS:
- {route-relevant verified views currently available; include only evidence-backed views}
- Consistent neutral studio lighting and accurate proportions across views
- Thin leader lines label only verified components: {component labels}

ZONE B / DETAIL CLOSE-UPS:
- {detail 1}: {verified component and visible state}
- {detail 2}: {verified component and visible state}
- {detail 3 when available}: {verified component and visible state}

ZONE C / MATERIAL & TEXTURE:
- {material 1}: {source-backed surface description}
- {material 2}: {source-backed surface description}
- {material 3 when available}: {source-backed surface description}

MATERIAL CALLOUTS:
- Connect each material swatch to its verified product location with thin leader lines

{verified dimensions when available}

Professional commercial product photography reference, clean labeled layout,
accurate geometry, materials and brand details.
```

规则：

- `real_product` 的 Zone A 按当前可用 verified 视角自适应数量，不为补齐版式新增角度；Zone B/C 与 Material Callouts 只填写有证据的项目，缺少对应事实时减少项目。
- `concept_product` 将 HEADER 改为 `{brand} {product} — Concept Product Reference Card`，Zone A 固定展示同一设计的前视、前侧 3/4、侧视、后侧 3/4 与后视，Zone B/C 展示 Brief 或用户素材已确认的细节与材质。所有视图保持完全一致的轮廓、比例、结构、配色、品牌名、Logo、文字与位置关系。
- `concept_product` 有用户素材时精确保留其中可见身份并只受控补全不可见角度；没有素材时按 Brief 生成一套内部一致的本片概念款。卡片与 QC 明确 `concept anchor`。用户已确认或 verified 的车型名、参数、价格、功能信息和正式图形 Logo 均可进入资料卡；没有对应证据的字段直接省略。最终产品卡 Prompt 不得把这些内容整类写成禁止生成项。
- 材质无官方名称时写 `material as shown in verified reference`。
- 快消品只有存在 verified 尺寸时才显示尺寸标注。
- 全景/中景可使用资料卡；局部/特写仍路由 Visual Research 的原始细节图。

## TPL-02 创意路线 KV

输入来自 Brief 的受众 / 投放语境 / 核心表达、`constraints[kind=style_master|style_prompt|ref_analysis|video_creative_route|narrative_stage|selling_point_binding|tvc_typography_package]`、`brand_palette`、可选 `reference_video_hero_sheet`，以及 `real_product` 的 verified 产品 refs，或 `concept_product` 已接受且覆盖充分的概念 source / ref capsule（产品卡若已完成也可作为后续主锚点）。产品身份 refs 只用于单张 Hero 主图；风格 refs 与 Hero Shot 宫格只贡献视觉语言。不传人物或未来分镜资产。Anchors 并行生成时不得等待同 Stage 的产品卡 runtime ref。

```text
Create one information-rich TVC Creative Route KV for {brand} {product}, landscape 16:9.

INFORMATION ARCHITECTURE:
- One dominant Hero KV occupying 50-58% of the card
- One structured route-and-product information rail occupying 22-28%
- One bottom continuity strip occupying 18-24%, containing three product-free style frames, palette and reference contribution map
- Strong title / section / label hierarchy, short evidence-backed phrases, comfortably readable type, no tiny paragraphs and no decorative filler

HEADER: {brand} {product} — Creative Route KV

ROUTE SNAPSHOT:
- AUDIENCE / USE CONTEXT: {confirmed target audience, placement or viewing context}
- CORE PROPOSITION: {one-sentence communication goal}
- EMOTIONAL ARC: {opening state → transition → final audience feeling}
- KEY VISUAL EVENT: {route-defining visible event}
- SELLING-POINT PROOF: {visible action → product response → observable result}

PRODUCT IDENTITY LOCK:
- PRODUCT ROLE: {how the product functions in this route}
- VERIFIED IDENTITY: {evidence-backed silhouette, proportion, color, material, components and brand details}
- HERO REQUIREMENT: {required angle, recognizable face / component and product state}
- PROTECTED DETAILS: {identity facts that must not drift or be replaced}

HERO KV / SINGLE PRODUCT IMAGE — 50-58% OF THE CARD:
- One dominant product hero composition using {verified real-product ref ids, accepted concept source ids, or the approved concept product reference card}
- Preserve locked product geometry, proportion, color, material, components and brand details
- Apply the Visual Research Style Master lighting, composition, color structure, imaging medium and atmosphere
- {hero angle, scale, negative space, key light, background treatment and visual weight}
- Integrate one clearly visible typographic-packaging preview around or behind the Hero using {one confirmed route key phrase}; use the frozen typography package's Display A / B / Utility roles and show its hierarchy, letterform skeleton, scale contrast, spatial binding, color/material and subject-avoidance relationship as a designed 花字 example, not a plain subtitle strip

STYLE CONTINUITY / PRODUCT-FREE FRAMES:
- FRAME A — LIGHT & SPACE: {selected image/video lighting, spatial depth and composition traits}
- FRAME B — MATERIAL & ATMOSPHERE: {texture, medium, grain/noise, highlight and shadow character}
- FRAME C — MOTION & RHYTHM: {camera energy, directional flow, speed contrast and rhythm translated into a still visual cue}
- These frames contain no product and preserve only the user-selected reference style DNA

STYLE DNA:
- IMAGING: {camera system, format, lens, depth, sharpness, motion response}
- VISUAL STYLE: {imaging medium, color relationship, tonal curve, highlight / shadow response, grain and texture}
- COMPOSITION GRAMMAR: {subject placement, negative-space direction and ratio, horizon / vanishing point, foreground-midground-background layers, leading geometry, balance, crop and occlusion}
- LIGHTING & COLOR: {key direction, ratio, highlight/midtone/shadow relationship}
- MATERIAL & MOTION: {medium, texture, rhythm and motion character}

CAMERA / LIGHT / MATERIAL PLAN:
- HERO OPTICS: {shot scale, perspective tendency, depth and focus behavior}
- LIGHT STRUCTURE: {key / fill / rim relationship, color temperature and contrast}
- MATERIAL RESPONSE: {how product and environment surfaces carry highlights, reflections, grain or diffusion}
- ATMOSPHERE: {weather, particles, haze and environment density when evidence-backed}

MOTION & EDITING RHYTHM:
- CAMERA ENERGY: {stable / floating / handheld / directional behavior}
- DIRECTIONAL FLOW: {dominant movement direction and visual handoff}
- RHYTHM ARC: {opening pace → proof beat → hero resolve}

REFERENCE CONTRIBUTION MAP:
- {selected media label}: {adopted visual-style and composition dimensions} / DO NOT COPY: {subjects, identity, branding, text and narrative}
- {repeat once per selected media item; no unselected reference appears}

REFERENCE VIDEO HERO SHEET — only when image {hero_sheet_image_index} is supplied:
- Image {hero_sheet_image_index} is a contact sheet extracted from the user-selected reference video.
- Reference it only for tonal treatment, visual language, lighting, spatial atmosphere and a light cue for composition.
- Do not copy its subjects, people, product identity, branding, readable text, narrative event, exact shot, or the contact-sheet / tiled layout. Render one original single-product KV image, never a collage or multi-panel board.

PALETTE STRIP: {verified palette roles, values and ratios}
STYLE PROMPT: {Style Master generation target}
FORBIDDEN TRANSFER: {only elements explicitly excluded by creative_content_take, plus unverified branding, readable text, real-person identity and product claims}

Clean professional high-information KV style board with one dominant hero image, compact readable information zones and clearly separated product-free style frames.
```

规则：

- 整张卡只出现一张产品 Hero 主图；无产品风格承接区不得再次出现产品。
- `ROUTE SNAPSHOT`、`PRODUCT IDENTITY LOCK`、`STYLE DNA`、`CAMERA / LIGHT / MATERIAL PLAN`、`MOTION & EDITING RHYTHM`、`REFERENCE CONTRIBUTION MAP`、`PALETTE STRIP` 与 `FORBIDDEN TRANSFER` 必须齐全；字段只填 Brief 或已登记 constraint / ref analysis 支持的事实，不足时缩短该项并重排空间，不得编造，也不得保留花括号占位符。
- 信息增加不能以不可读小字实现：每项使用短句 / 标签，保持明确的标题、分区、留白和阅读顺序；禁止把长段落铺满卡面。
- Hero 产品身份仅由 `real_product` verified refs，或 `concept_product` 已接受且覆盖充分的概念 source / 已通过 QC 的产品资料卡锁定；该 KV 不能替代产品事实来源。
- 占卡片 50–58% 的 Hero 主视图必须包含一处花字包装示意，只使用已确认路线短语或用户原文，展示字形骨架、尺度层级、空间绑定、色彩 / 材质和主体避让关系；它是视频视觉合同的一部分，但不自动把未确认文字变成正式画内文案。
- 用户选中的图片可作为风格 refs；用户选中的视频通过 Visual Research `research_video_reference_set`、`video_style_dna`、`creative_content_take` 与 Style Master 承接。存在 `reference_video_hero_sheet` 时，它必须作为 KV 的真实 image ref，排在普通 style refs 之后；最终 Prompt 必须按已确认路线承接其登记的主体、关系、动作或剧情结构，同时只排除未确认的品牌、原图文字、现实人物身份、产品事实和宫格布局。
- 无 verified HEX 时保留 `as shown in verified reference + source_ref`。
- Style Master 文字规则优先于卡片示例。

## Anchors 交接

实际生成的产品卡、模特卡、路线 KV 和环境锚点卡分别使用稳定 id `product_reference_card`、`character_reference_card`、`creative_route_kv` 与 `scene_anchor_<scene_state_id>`。Prompt、refs 顺序和贡献边界全部写入对应 work item；完成后统一进入一次 `anchor_asset_qc`，只增加实际生成卡片适用的检查，本文件不建立独立检查。生成 `creative_route_kv` 时，下游只在需要该视觉锚定的 Video Gen 单元引用它，并明确它只贡献已确认路线、Hero 构图、色光材质与花字包装关系，不复制信息板、宫格、标签或卡片版式。
