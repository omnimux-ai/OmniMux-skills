# 美妆品类：Anchors 增量

> 加载时机：Anchors 在 `category_profile.category_id: beauty` 时由品类根卡指针读取。
> 作用方式：仅在通用 Anchors 判定存在真实卡片缺口时，叠加到产品资料卡、路线 KV 或 5-plate 人物资料卡规则；未提及部分按通用 Anchors 执行。

## Input Contract

- Visual Research 已通过的 `constraints[kind=research_decision|product_ref_registry|ref_analysis|style_master|category_profile]`、`brand_palette` 和对应 `ref_capsules`。先读取 canonical `product_evidence_mode`：`real_product` 使用 verified `product_ref_registry`；`concept_product` 使用用户概念 / 品牌 source、Brief 已确认外观事实，以及带 `must_not_claim` 的 `concept_product_inspiration`。
- 实际 Intake Brief 或已接纳脚本 / 分镜 source 中确认的人物范围，以及用户提供的模特图（如有）；不得为了读取本卡补建 Brief。
- Stage 表已完成本轮 Reference 路由；本卡不再次调用 `hub_read`。

## Output Delta

- 仅当 verified 产品 source 无法稳定覆盖下游所需身份、角度或状态时生成唯一 `product_reference_card`：`real_product` 只使用已验证真实产品 refs；`concept_product` 按通用 `product-spec.md` 与 TPL-01 使用已确认概念证据、受控补全缺失角度，并明确标记 `concept anchor`。证据充分时直接复用 source。
- 仅当路线包含需要跨视频单元保持、且 Style Master 与路线 constraints 不能单独稳定表达的构图、色光材质或花字包装关系时，才把 Style Master、品牌色卡、产品色和肤色保护关系编译进唯一 `creative_route_kv`；不创建平行风格锚点卡。
- 用户选择固定模特且现有人物 source 无法稳定承担跨镜身份或妆容状态连续性时，生成唯一 `character_reference_card`，继续使用 TVC 5-plate、`gpt-image-2 / g-image-2`、medium、2K、16:9 配置；现有 source 足够时直接复用。
- 在人物 work item 的结构化 `constraints` 中登记来自 `category_profile.makeup_state_plan`、`category_profile.skin_finish` 的状态计划与肤质值，以及手部和唇形等美妆事实。
- “素颜 / 妆后”首先是同一身份的状态计划，不默认增加第二张独立人物卡；只有后续分镜明确需要两个状态且单张卡无法承载时，planner 才能显式增加额外状态 reference。

## Execution Rules

- 实际生成人物资料卡时，用户提供的模特图是身份主参考；卡片必须锁定脸型、五官、肤色、发型、年龄呈现和体态。
- 需要妆前到妆后变化时，两个状态必须共享同一身份、机位逻辑、发型和基础光线；只允许妆面、唇色、眉色、眼影和肤色明暗按实际 Brief 或已接纳来源中的确认内容改变。
- 默认 `satin finish`；`dewy` 只能写在颧骨高光和唇釉，眼周使用 `matte`。不要用“全脸水光”作为泛化美妆词。
- 资料卡中的动作、服装、配饰和肤质事实必须来自实际 Brief、已接纳脚本 / 分镜、casting-spec、用户图或已验证产品资料，不从未来分镜倒推。

## Binding

- 实际生成角色卡时，work item 固定写 `constraints.makeup_state_plan`、`constraints.identity_locks`、`constraints.skin_finish` 和 `constraints.continuity_guards`；前两项美妆值逐字继承对应 `category_profile` 字段。
- 实际生成产品资料卡时仍按通用 ZONE 结构；美妆产品的膏体、液体、刷头、喷头和包装材质进入对应局部/材质区域。`concept_product` 只写用户 source、Brief 或允许的灵感证据支持的事实，不要求真实产品注册表，也不得继承灵感产品的品牌、Logo、包装文字、官方配色或真实 SKU 身份。
- 下游通过 `style_master` / `style_prompt` 承接全片路线与风格；实际生成 `creative_route_kv` 时，只把它加入需要该视觉锚定的视频单元，否则直接使用路线 constraints。再按当前单元需要加入实际存在的 `character_reference_card`、人物 source 和真实产品特殊参考图；Prompt 禁止复制 KV 的信息板、宫格、标签和卡片版式。
- Style Master、`brand_palette` 和美妆肤色保护规则保持为文字约束；风格卡中的 Hero 不覆盖 verified 产品事实或人物身份。

## Anchors 交接字段

向 Anchors 唯一 `anchor_asset_qc` 提供：`beauty_identity_match`、`makeup_state_binding`、`product_evidence_trace`、`palette_skin_guard_trace`。本卡不执行独立 Validation。

## Anti-patterns

- 已判定人物卡缺口后仍只透传模特原图，不生成能闭合跨镜身份或妆容状态缺口的人物资料卡。
- 为了“素颜/妆后”默认生成两张独立人物卡，造成不必要积分消耗。
- 把未来分镜中的妆容动作提前编造进人物资料卡。
