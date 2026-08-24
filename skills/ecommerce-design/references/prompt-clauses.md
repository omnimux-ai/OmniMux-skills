# C1-C11 Prompt Coverage Cheatsheet

> **何时 read**：写每张 image prompt 时，对每条 clause 判断"是否适用本图"，适用就在 prompt 里**表达对应的想法**（用任何贴合本图的措辞，不必逐字粘示例）。
>
> **核心原则**：**Coverage > volume**。目标 prompt ~200-400 词，跳过对本图不适用的 clause。Pasting 11 段长 block = 1500+ 词的 kitchen-sink mess，互相矛盾的描述会稀释关键信号。

## C1. Background-Product Contrast — minimum-viable, harmonious

命名产品色调、命名背景色调，背景在亮度或饱和度上**只移一档**（不跳到对立极端），保持同一大色调家族。目标"优雅分离"，不是"高对比海报"。**服饰捷径**：detail / macro / 工艺特写 + 纯展示图（flat-lay / 衣架 / 假人 / 棚拍）默认**自然柔白底**——白 / 米 / 象牙服饰用微离纯白的柔白，靠柔和接触阴影定边缘。

**示例**：`The product is warm cream off-white matte cotton. The background is soft natural white with a faintly cooler undertone — just enough contrast for the silhouette to read crisply, same broad mood family. Avoid extreme opposite tones (no pure black behind a cream product).`

**速查表**：

| 产品 | 可接受的 harmonious 背景 | 避免 |
|---|---|---|
| 米 / 象牙 / 奶白服饰 | 自然柔白、微冷未漂白亚麻、淡暖灰 | 黑、炭灰、饱和色 |
| 纯白服饰 | 柔淡灰、淡暖奶油 | 纯白（融）、纯黑（过对比）|
| 黑设备 / 黑服饰 | 暖浅灰、柔燕麦、淡灰褐 | 纯白、饱和色 |
| 暖木家具 | 偏冷柔灰、哑米石膏 | 钢蓝、黑、饱和红 |
| 冷钢 / 银产品 | 偏暖柔灰、柔暖奶油 | 热橙、深海军 |
| 饱和色（如红色口红）| 中性 muted 互补色 | 同饱和度撞色 |
| 图案产品 | 产品主色调的纯色，明度位移一档 | 另一种图案、高对比纯色 |

**平台硬白底例外**（Amazon / JD）：`Background: pure white seamless RGB(255,255,255). Product silhouette must read crisply.`

## C2. Reference-Image Grounding — 任何附 reference 都要写

> **附 reference 但不告诉模型怎么用** = 本 contract **#1 bug 来源**。Pixels 不是指令。

每张附的 reference 要写：**Name** (Reference 1 / 2 / ...) + **Role**（产品 / 模特 / pilot / 场景 / mood / 纹理 / anti-reference）+ **Take**（从它锁定什么）+ **Ignore**（从它丢弃什么）。

> **不要重复描述参考图已编码的内容**：写 `the model from Reference 2`，**不要**写一段长描述（"young East Asian woman, ~25, ..."）。长描述会和像素竞争，把生成结果拉向文字 paraphrase。文字只描述参考图**没编码**的东西（这张图的 pose / framing / scene / action）。

**示例**：

> Reference 1 (`product.jpg`) — Role: product source-of-truth. Take: exact color, packaging silhouette, on-pack text placement, signature embroidery on left chest. Ignore: original studio lighting, background.
>
> Reference 2 (`model.jpg`) — Role: model identity reference. Take: face, hair, skin tone, body proportions, default expression. Ignore: the garment in this reference (use product from Reference 1), pose, scene, lighting.
>
> Subject in this image: the model from Reference 2 wearing the product from Reference 1, standing relaxed on... {pose / framing / scene specific to this image}.

## C3. No-Skin + Single-Focus + Unified-Background — 每张 detail / macro / 工艺特写

纯产品（无肉 / 手 / 身体 / 杂物）+ 命名的单一焦点 + 整组细节图共享的统一背景。

**示例**：`Product-only macro of {the collar stitching on the front placket}. No human skin, no hands, no fingers, no body parts, no irrelevant props in frame. Single focus point: only this one feature is in crisp focus. Surface and lighting match every other detail shot in this set: matte ivory cotton fabric backdrop, soft directional natural daylight from upper-left at 45°, neutral 5000K. {If detail #2+}: Reference N (detail shot #1) is attached — match its surface and lighting exactly.`

## C4. Subject Identity Lock — 每张含 recurring 模特 / 宠物 / variant

把 Subject Identity Lock card 整段粘进来 + 加 canonical 声明：

> The subject described above is the canonical identity for this set. Do not drift face, hair, skin tone, body proportions, garment cut or signature features across this image or any other image of the set.

## C5. Scene Context Lock — 每张共享场景的 sub-set image

粘 Scene Context Lock card + 声明本 sub-set 锁定：

> The scene above is canonical for this sub-set. Do not introduce new walls, surfaces, props, or color grades. Wall color, surface material, time of day, color grade and recurring props match exactly across every image of this sub-set.

## C6. Natural-Light Default — 每张模特或产品图（除非品类例外）

clean neutral natural daylight (~5000-5500K)，光本身不偏暖也不偏冷。**整体暖 / 冷感**由背景材质 / 道具决定，**不**由给灯光染色。

**示例**：`Lighting: soft natural daylight — clean clear ordinary midday light from a window-lit / open-shade / overcast scene. Neutral 5000–5500K white balance. Light is neither warm-tinted nor cool-tinted. No studio strobe, no hard rim, no dramatic spotlight, no cinematic teal-and-orange. Warm/cool image feel comes from background materials, not from tinting the light.`

如果 brief / styling 锁定了不同光调（如"warm golden-hour hero"），用 brief 的描述代替默认句。

## C7. Apparel Gender / Cut — 每张服饰图

性别（women's / men's / unisex / kids'）、显式 cut details、反向性别 negative tag。在 identity lock 和 product description **两处都重复**——没冗余的话生成会回到训练先验默认 drift。

**示例**：`The garment is women's — slim-fit cropped T-shirt with subtle bust dart, feminine drape, softer shoulder line, cap sleeve, scoop neckline. Negative: men's cut, masculine drape, broad shoulders, boxy silhouette, straight waist.`

## C8. Product Prominence + Background Calmness — 每张图

产品 fill %（hero / detail / 白底 / 纯展示 60-85%；lifestyle 40-60%，不能低于 40%）、构图锚（中心或三分点）、calm 简洁背景。

**示例**：`The product is the visual hero and dominates composition: ~75% of frame width, positioned at centered. Lighting, focus, contrast and saturation all favor the product; nothing else competes for attention. {If model in frame}: model's gaze and gesture lead the eye to the product. Background is calm and uncluttered — at most one or two intentional supporting elements. Avoid: busy patterns, random objects, shop-shelf clutter, dense floral or graphic prints behind the product.`

## C9. Styling Direction Lock — 一旦 styling 方向锁定后每张图都要写

锁定方向的 name + mood + qi + scene flavor + palette/lighting flavor。没这条 Shoot Plan 的 styling 会在生成时漂走。

**示例**：`Styling direction (locked): 高级质感 Editorial Premium. Mood: calm cool elegance with subtle emotional restraint. Model qi: 冷感优雅, 微妙情绪. Scene flavor: 中性棚拍, 极简室内. Palette / lighting flavor: 自然柔光, 低饱和奶油 / 燕麦 / 裸色. Every composition / lighting / palette choice supports this direction.`

## C10. Framing Integrity — 每张图（logo / body / head / hands / 产品边缘）

> 写 prompt 之前先**规划 framing**：列出本图必须出现的所有重要元素，选能装下所有元素 + 带 breathing room 的画幅 / pose。如果物理上装不下 → **改画幅或改 pose**。

覆盖对本图相关的 framing 规则：

- **Brand logo**：whole and unobstructed，通过产品 reference 携带；**永不**从文字描述发明
- **全身模特**：头顶 ≥ 5% margin 到鞋底 ≥ 5% margin；脚 AND 鞋完整；3:4 / 4:5 only —— **永不 1:1**
- **半身 / 肖像**：完整头 + 头发 + 头顶 ≥ 5% margin；永不在 hairline / forehead / eye / nose / mouth 处裁
- **手持产品**：完整手 OR 干净腕部裁切；**永不**中指 / 中掌 / 中关节
- **纯产品 / hero / 白底 / detail**：产品在画布内完整 + 干净 margin（除非 crop 是设计点）

**示例**：`Framing integrity: woven logo on left chest is whole and unobstructed (carried via Reference 1, do not invent or alter). Full-body framing: model from ≥ 5% margin above the head to ≥ 5% margin below the soles, feet and shoes fully visible, aspect 3:4. Negative: cropped logo, distorted logo, invented brand text, sliced head, hairline crop, mid-finger hand crop, edge-clipped product, half-foot full-body.`

## C11. No Unbriefed Overlay Text — 每张图（除非用户 brief on-image copy）

默认情况下生成图**无 overlay 文字**——无规格 callout / 无 marketing 文案 / 无 badge / banner / sticker / caption / measurement label / watermark。文案需要的话**post 里加**。

**示例**：`No overlay text in this image. Do not add: product specifications, marketing copy (New, Best Seller, Sale, % Off), brand taglines not present on the physical product, descriptive captions, feature callouts, measurement labels, badges, stickers, banners, watermarks. The only text that may appear is text that physically exists on the product itself (logo / on-pack text per Reference 1), preserved not regenerated.`

**例外**：用户明确 brief on-image copy（如"在主图右上角写 '夏季新品 19.9 元起'"）时，quote 引用确切文本 + 命名 font / 位置。

## 何时跳过哪些 clause（决策表）

| 图类型 | 必须 cover | 可跳过 |
|---|---|---|
| 纯白底产品图（hero / 多角度）| C1 / C8 / C10 / C11 | C2（无 ref 时）/ C3（不是 detail）/ C4-C5 / C6 / C7 / C9 |
| 服饰模特图 | C1 / C2 / C4 / C5（如 lifestyle）/ C6 / C7 / C8 / C9 / C10 / C11 | C3（不是 detail）|
| 服饰 detail / 工艺特写 | C1 / **C3** / C8 / C10 / C11 | C2（无 ref 时）/ C4-C5 / C6 / C7 / C9 |
| Lifestyle / 场景图 | C1 / C2 / C4 / **C5** / C6 / C8 / C9 / C10 / C11 | C3 / C7（非服饰）|
| 美妆 / 保健品 / 母婴等合规品类 | C1-C11 全套 + 见 `categories-index.md` 对应品类合规红线 | 无 |
| 纯文本生图（无 ref）| C1 / C6 / C7（如服饰）/ C8 / C9 / C10 / C11 | C2 / C3 / C4 / C5 |
