# Product Spec — Anchors 产品参考路由

> Anchors 读取本文件，把 Visual Research verified 产品证据和 `constraints[kind=route_asset_requirement]` 编译成下游可消费的 `product_reference_routing`。本文件不创作分镜或视频 Prompt。

## 1. 输入门槛

- 先读取 `constraints[kind=research_decision].product_evidence_mode`：`real_product` 只消费 verified Product Visual Archive / Registry；`concept_product` 使用用户已提供的概念产品图（如有）、Brief 中明确的产品外观、路线资产需求和按 `must_not_claim` 登记的 `concept_product_inspiration`，生成结果必须标记为本片概念锚点。
- `real_product` 的型号、版本、形状、颜色、材质、Logo 和部件事实来自 verified Product Visual Archive / Registry。
- `concept_product` 有用户概念图或品牌资产时，必须保真继承其中明确可见的廓形、比例、结构、材质、配色、品牌名、Logo、包装文字和位置关系；用户素材与 Brief 未定义的通用品类廓形、结构、材质或使用状态可从 verified `concept_product_inspiration` 受控借鉴，但不得借用其品牌、型号、Logo、包装文字、官方配色或真实 SKU 身份，也不得虚构未确认的官方身份声明。
- 读取 `constraints[kind=route_asset_requirement]`，把 `product_views` 与 `product_details` 逐项映射到已登记的 verified ref id 和路线用途。
- 产品角度按 Visual Research 实际 verified 覆盖记录，不设固定数量门槛；优先使用本片镜头和产品识别所需的可用视角。所需媒体必须 verified、已入库且路径可解析。
- `real_product` 的产品身份、路线所需部件 / 状态或承担产品证明的 `special_refs` 无法解析到 verified refs 时，返回具体 evidence gap；`concept_product` 的路线所需证据池可由用户素材、Brief 或 verified `concept_product_inspiration` 满足，仍缺关键外观信息时返回 Visual Research 补缺。Anchors 自身不补搜、不推断未确认产品事实、不生成占位图。

## 2. 整理资产与 KV 边界

`product_reference_card` 是唯一产品整理型图片，但只在 verified source 无法稳定承担下游完整身份，或概念产品需要补全同一设计的缺失视角时生成。无需产品卡时，`product_reference_routing` 直接绑定 Visual Research 的 verified source ids。生成概念产品卡时补全路线需要的视角与细节，并将标题与元数据标记为 `concept anchor`。Anchors 不创建独立的产品 Hero、开盖、微距、结构、品牌世界或其他二次产品锚点 work item。

按需生成的 `creative_route_kv` 可包含一张 Product Hero KV 主图。`real_product` 使用 verified 产品 refs 锁定身份；`concept_product` 在 Anchors 生成期使用已接受的概念 source 或对应 ref capsule，不等待同 Stage 的 `product_reference_card`；该卡通过 QC 后再作为下游产品身份主锚点。KV 只服务需要跨单元保持的路线 / 构图 / 色光材质 / 花字包装关系，不进入 `product_reference_routing`，也不能替代产品事实来源。

- 只有命中产品卡缺口时才读取 `prompt-templates.md` 的 TPL-01 并创建稳定 work item `product_reference_card`。
- `real_product` 的 TPL-01 Zone A / Zone B 优先覆盖 `product_views` / `product_details`，并把对应 verified refs 按用途写入该 work item。`concept_product` 使用全部用户概念 / 品牌 refs（如有）和允许贡献的 `concept_product_inspiration` 生成完整多角度卡；未被来源展示的角度属于同一概念设计的受控补全，不得改变已确认身份特征，外部灵感不得贡献目标品牌身份。
- `concept_product` 生成 `product_reference_card` 时，该卡通过 QC 后成为后续镜头的产品身份主锚点；在该卡完成前，Anchors 内其它并行 work item 只能使用已接受且覆盖充分的概念 source / ref capsule，不得引用未来 runtime ref。
- 全景/中景产品镜头：优先使用最能锁定当前角度的 verified source 或已生成产品卡。
- 局部/特写：`real_product` 只路由注册表中对应部件的 verified 原始细节图；`concept_product` 只使用产品资料卡或用户概念来源中实际可见的细节。
- UI、屏幕状态、包装文字、Logo、内部结构与功能状态：只有存在对应 verified 证据时建立路由。
- 校验参考只用于事实对照，不进入生成 refs。

## 3. `product_reference_routing`

每个条目记录：

```yaml
- target: full_product | part | material | ui | logo | structure | wearable
  applicable_shots: [wide, medium, close_up]
  primary_ref_id: R01
  supporting_ref_ids: []
  allowed_contribution: "可继承的产品事实"
  ignore: "不可继承的背景、人物或风格"
  verification_source: "source pointer"
```

同一目标只设一个 `primary_ref_id`；补充 refs 只填不同角度或不同事实，不重复同角度加权。`constraints[kind=selling_point_binding].product_ref_ids` 中的每个 ref 必须能解析到对应路由条目。缺少产品证明角度、部件或状态证据时返回 Visual Research evidence gap；概念产品生成资料卡时使用该卡建立路由，否则使用已接受的概念 source。

## 4. 穿戴类产品

- 生成 TVC 5-plate `character_reference_card` 时传入对应的 verified 产品主锚定图（或已接受的用户产品 source）和 `constraints[kind=video_creative_route|route_asset_requirement]` 的 `human_role` / `human_actions`；若产品资料卡也在本 Stage 生成，人物卡不得等待该卡的 runtime ref。
- 人物资料卡中的颜色、款式、Logo 位置和材质必须与 verified 产品事实一致。
- `product_reference_routing` 将该产品标为 `target: wearable`，并记录人物资料卡与原始产品 ref 的联合用途。

非穿戴类产品不得把产品图、已选风格图、参考视频或 Hero Shot 宫格作为人物服装的 image ref。需要固定模特时，人物服装只使用 Visual Research 产出的 `wardrobe_style_brief` 文字描述，并标记 `wardrobe_source_mode: text_style_adapted`；它可借鉴廓形、层次、材质和品牌调性，但不得复刻参考人物、品牌服装、Logo 或单件款式。用户明确提供并要求保留的服装参考是唯一例外，必须在实际 Brief 或已接纳 source 的确认字段中登记为 `user_approved_wardrobe`。

## 5. Anchors 唯一检查与交接

所有实际生成的 Anchors 完成后聚合一次 `anchor_asset_qc`：产品卡检查身份真实性或概念设计一致性，路线 KV 检查风格与路线覆盖，人物 / 环境卡检查各自连续性。未生成的卡片不创建检查项。其它 Anchors reference 和品类卡只向该对象合并适用增量字段，不创建平行检查。

不生成锚点准备情况文档。`anchor_asset_qc` 是执行结果摘要，逐项汇总 requirement / selling point proof → verified ref → 目标 work item 及检查结论，随本轮执行结果交给 orchestrator，不写入不存在的自定义 runtime metadata。全部适用内部检查通过后：当前 Stage 真实生成了至少一张锚点图时进入唯一 `waiting_user(result_review)`；全部复用既有资产或只有 Planner 文档时直接 `status=done`。检查失败时保持当前 Stage 未完成并修正失败项。用户只检查本轮实际生成的产品卡、模特卡、KV 卡和按需环境锚点卡。

## 6. Compact Downstream Capsule

Planner 在 Anchors author 时，把唯一一组 compact downstream capsule 作为 flat entries 追加到本 Stage `constraints`。每个 entry 的 `id` 必须在全 Plan 稳定且唯一；首项是 header，`tvc_anchor_locks` 冻结下游不得重新选择的 style / technique / product / voice 锁，其余 flat entry 只做 anchor role → logical work item id 映射。没有固定人物、声音或多场景时省略对应可选 output entry，并把不适用 lock 写为 `not_applicable`；header `item_ids` 也只按稳定顺序列出实际存在的 entries。

```yaml
constraints:
  - kind: tvc_anchor_set
    id: tvc_anchor_manifest
    item_ids: [tvc_anchor_locks, tvc_anchor_audio_intent, <actual tvc_anchor_output ids only>]
  - kind: tvc_anchor_locks
    id: tvc_anchor_locks
    route_mode: <preserve_storyboard | preserve_script | compose_from_brief>
    target_duration_s: <confirmed target>
    aspect_ratio: <confirmed delivery ratio>
    delivery_resolution: <confirmed delivery resolution | not_specified>
    native_video_voice: <on | off>
    required_native_texts: [<exact confirmed texts>]
    style_master_id: <stable style master id>
    style_prompt_id: <stable style prompt id>
    technique_ids: [<confirmed technique id>]
    product_evidence_mode: <real_product | concept_product>
    product_identity_lock_id: <stable product identity constraint id>
    product_identity_ref_ids: [<verified source or generated product card logical id>]
    route_visual_anchor_id: <creative_route_kv | not_applicable>
    voice_lock_id: <stable voice lock id | not_applicable>
  - kind: tvc_audio_intent
    id: tvc_anchor_audio_intent
    independent_bgm: <on | off>
    bgm_source_id: <accepted top-level source id | generate | none>
    music_direction: <single compact direction | not_applicable>
    core_instruments: [<instrument or timbre>]
    energy_arc: <compact arc | not_applicable>
    bgm_gain: <frozen gain | not_applicable>
  # 以下 tvc_anchor_output 仅示例；只有对应 work item 实际 author 时才写入。
  - kind: tvc_anchor_output
    id: tvc_anchor_product
    role: product_identity
    logical_output_id: product_reference_card
    sequence_index: 1
  - kind: tvc_anchor_output
    id: tvc_anchor_route_kv
    role: creative_route
    logical_output_id: creative_route_kv
    sequence_index: 2
  - kind: tvc_anchor_output
    id: tvc_anchor_character_<role_id>
    role: character_<role_id>
    logical_output_id: character_reference_card_<role_id>
    sequence_index: <stable output order>
  - kind: tvc_anchor_output
    id: tvc_anchor_scene_<scene_state_id>
    role: scene_<scene_state_id>
    logical_output_id: scene_anchor_<scene_state_id>
    sequence_index: <stable output order>
```

`technique_ids` 只列用户已确认路线命中的 0–3 个稳定 id；锁 entry 不复制 style prompt、产品事实正文或 voice 文本。`tvc_audio_intent` 由已确认 Brief、路线和品牌调性一次编译，不新增 question；无 BGM 时写 `independent_bgm: off`、`bgm_source_id: none`，用户已有 BGM 时写其 top-level source id，需要新生成时写 `generate`。同一 Planner task 将该 entry 保留为冻结的 compact handoff，Audio 恢复 task 时直接取得，不调用 Stage detail。output entry 只列实际 author 的 work item，且 `logical_output_id` 必须等于该 work item 及其当前 `runtime_refs` 使用的稳定 id。不得复制搜索过程、候选列表、图片分析正文、选择理由或其它上游推理。

Storyboard / Visual Gen 的 Planner 只读取其直接依赖 Anchors 的 Stage detail，按上述稳定 ids 取得 capsule，再把本 Stage 实际需要的 locks、role 映射和 logical output ids 编译到自身 `constraints` / `execution_locks` / work items。媒体 `refs` 使用 `product_reference_routing` 指向的 verified sources、实际生成的 Anchors work item logical ids 和适用的合法 ref capsules；不得把 `tvc_anchor_manifest`、`tvc_anchor_locks` 或任何 `tvc_anchor_*` capsule entry id 混进媒体 `refs`，也不得用 capsule entry 代替当前 runtime output。

capsule 只含冻结事实、logical output ids、顺序和 locks，不含 path、URL、node id、实际尺寸 / 时长、`qc_passed` 或 `anchor_asset_qc` 日志。本 Stage 的实际媒体 locator 只写入 `runtime_refs`；`status=done` 表示全部适用 QC 已通过，即唯一 `anchor_asset_qc` 执行结果摘要已聚合通过。执行结果不回填 capsule。
