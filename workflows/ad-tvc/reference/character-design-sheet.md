# TVC 固定模特 5-PLATE 参考卡

## Activate When

仅当人物范围为 `user_model_reference` 或 `generated_virtual_model`、同一模特需要跨镜头持续出现，且现有人物 source 无法稳定承担身份或状态连续性时读取。`no_fixed_model` 或现有 source 已充分覆盖的项目不得读取本文件或创建人物资料卡。

## Inputs

- `user_model_reference`：用户提供的模特图是第一身份主参考。
- `generated_virtual_model`：读取 `<workflowsDir>/ad-tvc/reference/casting-spec.md>`，使用实际 Brief 或已接纳 source 中确认的人物范围、投放地区、选角规格和 Style Master 编译唯一身份描述。
- 穿戴类产品同时传入已验证产品参考；不得用产品资料卡覆盖人物身份主参考。
- `wardrobe_source_mode: branded_wearable` 时，服装来自 verified 穿戴产品主锚定图；`text_style_adapted` 时，服装来自 Visual Research 的 `wardrobe_style_brief`，只以文字进入 Prompt。后者不得传入风格图片、参考视频、Hero Shot 宫格或服装参考图作为人物卡 image ref。

## Output

每个固定模特只生成一张 16:9、2K、纯浅灰背景的 `character_reference_card`，使用 TVC 5-PLATE：

1. **IDENTITY**：正脸近景、姓名/角色、年龄呈现、肤色、发型和识别特征。
2. **HERO FULL BODY**：正面全身，头顶、双手、双脚完整，体态和身高比例清晰。
3. **POSE STUDIES**：同一服装下 3–4 个来自 `constraints[kind=route_asset_requirement].human_actions` 的稳定动作。
4. **CAMERA ANGLES**：俯视、仰视和环境近景，保持同一人物身份。
5. **DETAILS**：妆容、发型、服装、鞋履和必要配饰的局部细节。

所有 PLATE 使用同一人物、同一基础服装、同一发型和同一识别特征。`branded_wearable` 的品牌产品服装、Logo 位置、比例和外观以真实参考为准；`text_style_adapted` 只落实 `wardrobe_style_brief` 的文字事实，生成原创搭配，不复刻任何参考图中的人物、品牌、Logo 或具体单品。

## Generation Guards

- 生成前必须已确认性别呈现、年龄呈现、投放市场、身份来源和人物范围；缺少会改变选角的事实时返回来源缺口，不由 Anchors 自行补造。
- `generated_virtual_model` 的族裔 / 地域呈现必须通过 `casting-spec.md` 与投放地区和目标受众对齐；`user_model_reference` 保持原人物身份，发生投放要求冲突时先回问，不通过生成改变其族裔。
- HERO FULL BODY 完整显示头顶、面部、双手、双脚与鞋履，头顶和脚下保留呼吸空间。画面只保留人物与已确认穿戴物；车辆、场景物件或其他道具只在用户明确要求时加入。
- 服装、鞋履、妆容和配饰只来自 Brief、已接纳 source、用户模特图或 verified 穿戴产品；未定义的脖颈、手腕、头部和腰部使用正向的素净状态描述。
- 皮肤保留自然毛孔、健康色调和少量细微纹理；年龄特征使用克制程度，不扩大斑驳、色素或皮肤损伤。
- `branded_wearable` 使用 verified 穿戴产品和 Logo 参考，按 `<workflowsDir>/ad-tvc/reference/_internal/brand-logo-guard.md>` 登记 brand owner 与 KEEP / STRIP；Logo 保持真实位置、小尺寸比例和清晰形状，不用文字想象品牌图形。

## Prompt Skeleton

以下英文骨架只定义语义和版式。author `character_reference_card` 前，必须把自然语言指令、标题和卡内可见栏目编译为 Brief 的 `prompt_language`（等于当前 `working_language`），只保留人名、品牌名、型号、Logo、用户逐字文案、ref id 和工具字面量原文。

```text
Create one professional TVC character reference card for {NAME}, landscape 16:9, 2K,
plain light gray background, five clearly separated plates.

Identity source: {user reference or approved generated identity description}.
Preserve the same facial geometry, skin tone, hairstyle, age presentation, body proportions,
wardrobe and distinctive features across every plate.

WARDROBE SOURCE:
- branded_wearable: wear the verified product shown in image {wearable_product_image_index}; preserve its product geometry, material, color and approved logo placement.
- text_style_adapted: create one original outfit from this text-only wardrobe brief: {wardrobe_style_brief}. Do not copy the clothing, brand, logo, person or exact look from any style reference; no style image, reference video or Hero Shot contact sheet is an image input for this character card.

PLATE 1 IDENTITY: {face and identity facts}.
PLATE 2 HERO FULL BODY: complete head-to-toe standing view with clear body proportions.
PLATE 3 POSE STUDIES: {3-4 stable actions from constraints[kind=route_asset_requirement].human_actions}.
PLATE 4 CAMERA ANGLES: top-down, low-angle and contextual close-up of the same person.
PLATE 5 DETAILS: {makeup, hair, garment, footwear and required accessories}.

Photorealistic commercial casting reference, consistent identity, clean labeled layout.
```

## Reference Order

1. 用户模特身份图，或已批准的虚拟模特身份参考。`text_style_adapted` 时它只锁定脸、发型、年龄呈现和体态，不继承图中原服装，除非实际 Brief 或已接纳 source 明确登记为 `user_approved_wardrobe`。
2. 仅 `branded_wearable`：穿戴产品的真实参考图。
3. 仅 `branded_wearable`：品牌 Logo 或服装细节参考。

不得传入分镜线稿、场景图、风格图片、参考视频、Hero Shot 宫格或无关风格图；`text_style_adapted` 的服装参考只能是最终 Prompt 内的文字简报。

## Anchors 交接字段

向 Anchors 唯一 `anchor_asset_qc` 提供：`identity_fields_present`、`target_market_casting_alignment`、`five_plate_complete`、`identity_consistency`、`wardrobe_consistency`、`wardrobe_source_mode`、`wardrobe_brief_trace`、`full_body_complete`、`unexpected_props`、`unexpected_accessories`、`skin_rendering`、`wearable_logo_fidelity`。本文件不执行独立 QC。
