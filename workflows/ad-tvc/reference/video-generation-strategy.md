# TVC 分镜与视频生成规划

本文件只服务 `storyboard`。这是纯 Planner document Stage：物化唯一 `generation_strategy_doc`，把已确认路线按 `Segment → Beat → Shot Group（SG）→ Sub-shot` 技术化，将命中技法 reference 编译进分镜脚本，并形成 compact downstream capsule；不生成媒体、不编译最终视频 Prompt。

## 输入与依赖

`depends_on: [anchors]`。读取：

- Anchors 直接依赖 Stage detail 中已收敛的 `constraints`、`ref_capsules` 与当前 `runtime_refs`，包括 `video_creative_route`、`narrative_stage`、`selling_point_binding`、`tvc_typography_package`、`voice_lock`、`route_asset_requirement`、`technique_plan`、`style_master`、`style_prompt`、`product_reference_routing`，以及实际存在且可解析的产品、人物、环境或 `creative_route_kv` logical output。
- `preserve_script` / `preserve_storyboard` / 最终 Prompt 直达时，只按 Anchors `source_preservation_mapping` 读取绑定 source 的确认范围或逐字 Prompt；不回读 `brief_doc`、不浏览无关 source，也不重新推断来源用途或 `route_mode`。`compose_from_brief` 只使用 Anchors 已编译的 route / narrative / selling-point constraints。
- 当前 Stage 登记的一个 Direction 根卡 `storyboard` section 和一个 Category 根卡 `storyboard` section；每个 `technique_plan.technique_id` 必须先通过 `visual-techniques-library.md` 索引解析到唯一技法 reference，再读取该卡完整 `## Generation Strategy`。任一命中 id 无法解析或目标 section 缺失时保持 blocked，不凭技法名自行补写规则。

不得回读 Visual Research 搜索过程、未选候选、未命中技法卡或其它 Stage reference。只要保留 Storyboard 或 Visual Gen 就不得省略 Anchors；缺少可解析的 `product_reference_routing`、创意路线、Style Master 或下游所需人物 / 环境依据时保持 blocked。产品卡和 `creative_route_kv` 只在 Anchors 判定需要时才是必需依赖。

## 模型、分辨率与声音锁

- 编写规划前，若用户尚未明确合法模型与分辨率组合，用一次单选 `question` 确认组合。
- 用户可见选项固定为：`MiniMax H3 · 2K`（推荐）、`MiniMax H3 · 768P`、`S2 · 4K`、`S2 · 1080P`、`S2 · 720P`、`S2 Fast · 720P`、`S2 Mini · 720P`。用户可见文本只显示短别名。
- 内部映射：H3 为 `{vendor: MiniMax, model_id: MiniMax-H3}`；S2 三类依次为 `{vendor: seedance, model_id: seedance2.0 | seedance2.0-fast | seedance2.0-mini}`。开始 SG / unit 规划前先按实时能力验证组合，随后把 canonical vendor、model id、分辨率与画幅冻结进 `tvc_storyboard_plan` capsule；文档物化前只做 freshness check。Visual Gen 必须原值复制到自身 `execution_locks`，不得重新选模或只继承短别名。
- Brief 含旁白 / 对白时，所选模型必须支持原生音频并锁定 `generate_audio: true`。不得以独立旁白、TTS 或配音兜底。
- 模型单次 duration 上限属于执行适配。每个 SG 必须可独立执行；超限只在 Beat / Sub-shot 自然边界拆成连续 SG。
- 每个视频 work item 的最终 Prompt 上限固定为 7000 字符。Storyboard 装箱时必须为业务事实、完整时间线、refs、声音和命中技法规则保留容量；预计无法完整编译时，在 Beat / Sub-shot 自然边界拆分 generation unit，不把内容留给 Visual Gen 截断。

## 规划编译

1. **覆盖账本**：把 Brief、来源、路线、卖点、参考图剧情依据、人物动作、基础字体包中的文字事件与声音事件各自放入唯一 Segment / Beat。
2. **SG 编译**：`SG01` 是可独立校验、可独立执行的创作单元；`SG01-SS01` 是 SG 内带绝对时间的最小可见变化，不创建媒体项。
3. **SG 合同**：每个 `kind: storyboard_shot_group` 至少写 `shot_group_id`、`segment_id`、`beat_ids`、`sequence_index`、`global_time_range`、`duration_target_s`、`communication_goal`、`selling_point_proof`、`sub_shot_timeline`、`camera_contract`、`stylization_contract`、声音时间线、`scene_state_id`、`scene_anchor_ref_id`、`ordered_ref_roles`、起止状态和连续性事实。
4. **Sub-shot 合同**：每行用 `SG01-SS01 | global=0.00-2.50 | visual=... | camera=... | style=... | sound=... | end=...`，连续覆盖 SG 全长。
5. **字体与技法编译**：先把 `tvc_typography_package` 展开为每个 SG / Sub-shot 的 Type stack、载体、空间绑定、`event_lifecycle` 和 `readable_hold_s`；再把每个命中增强技法卡 `## Generation Strategy` 中适用的触发、可见状态变化、时序、摄影 / 光色 / 材质 / 文字关系、结束状态和结果检查边界逐项绑定。基础字体包使用稳定 key `typography.baseline`，增强技法使用 `technique.<technique_id>`，分镜脚本必须展示实际执行方式，不得只列 id 或卡名。
6. **声音容量**：把全片 `voice_lock` 物化为唯一 `narration_reference`；逐字旁白 / 对白、speaker、情绪、重音、语速、停顿和入出点绑定对应 SG / Sub-shot。旁白只由后续视频单元原生生成。
7. **自然装箱**：按原顺序合并相邻完整 SG；只有总时长、scene state、环境锚点、refs 槽位、身份、连续性、声音容量、基础字体包、增强技法规则和 7000 字符 Prompt 预算兼容时才进入同一 `generation_plan_unit`。
8. **一次总账校验**：单元内从 `0.00` 重新计时，只平移时间、不改变持续时长；全部来源覆盖一次、每个 SG 恰好属于一个单元，范围无空洞、重叠或越界。每个 `technique_card_id` 都必须在分镜脚本和对应 unit 的 `execution_delta` 中有实际绑定。不要为 SG、Unit、Authorization 分别保存重复的 coverage / refs / 首尾检查。

用户已提供最终 Prompt 时不伪造 Segment、Beat 或 SG，只建立 `source_shot_group_ids: []` 的直达单元，锁定时长、refs、声音、模型和费用；后续 Visual Gen 保留用户 Prompt 正文，并仅在 Anchors 实际生成 `creative_route_kv` 时加入其贡献说明。逐字正文已经超过 7000 字符时不得 author 不可执行单元，必须返回用户缩短正文或明确允许按原时间线拆成多个直达单元。

## Compact Downstream Capsule

Planner 在本 Stage `constraints` 中 author Visual Gen 所需的稳定事实：

```yaml
constraints:
  - kind: tvc_storyboard_plan
    id: tvc_storyboard_plan_header
    route_mode: <preserve_storyboard | preserve_script | compose_from_brief>
    model_alias: <short alias>
    vendor: <canonical vendor>
    model_id: <canonical model id>
    resolution: <confirmed resolution>
    aspect_ratio: <confirmed delivery ratio>
    target_duration_s: <confirmed target>
    native_video_voice: <on | off>
    prompt_max_chars: 7000
  - kind: tvc_storyboard_plan_unit
    id: storyboard_unit_<unit_id>
    unit_id: unit_01
    source_shot_group_ids: [SG01]
    direct_prompt_source_id: <top-level source id | not_applicable>
    direct_prompt_source_range: <exact field/range | not_applicable>
    source_time_offsets: <compact scalar>
    sequence_index: 1
    global_time_range: <start-end>
    duration_target_s: <n>
    source_coverage: <compact scalar or scalar array>
    business_content_lock: <compact scalar or scalar array>
    typography_package_id: tvc_typography_package
    typography_events: <compact scalar or scalar array>
    technique_card_ids: [<id>]
    execution_delta: [<stable keyed scalar rules merged from selected Direction, Category and matched technique Generation Strategy sections>]
    scene_state_id: <id | none>
    scene_anchor_ref_id: <id | none>
    narration_reference: <stable multiline scalar | none>
    voice_lock_id: <id | none>
    start_state: <compact scalar>
    end_state: <compact scalar>
    continuity_from: <unit id | none>
    ordered_ref_roles: [<compact ordered roles>]
    confirmed_text_timeline: <compact scalar | none>
```

这些 capsule 是 flat `PlanItem` entries，不得把 units 嵌套为 object array。`execution_delta` 合并当前命中 Direction、Category 与技法 `## Generation Strategy` 的 stable keyed scalar entries，分别保留原 key 和 `technique.<technique_id>` key、不互相覆盖；它只携带 Visual Gen 的 Prompt 输入、执行约束、结果 QC 与返修边界，不携带最终 Prompt 或运行结果。`technique_card_ids` 中每个 id 必须有对应技法 delta，未作用于当前 unit 的技法不得列入。直达单元写已接纳 top-level source 的 `direct_prompt_source_id` 与精确 field/range，供 Visual Gen 只读取该正文并逐字保留；非直达单元两项均写 `not_applicable`。`storyboard` 不得创建 image / video work item 或 placeholder runtime ref。

下游 Planner author `visual-gen` 时，只读取其直接依赖的 Stage detail，从上述 capsule 取稳定事实，并把实际需要的内容编译进当前 Stage 的 `constraints`、`work_items` 与最终 Prompt；Executor 不读取 `generation_strategy_doc` 或其它上游长文档。capsule entry 的 `id` 是语义定位键，不得放入媒体 `refs`；媒体 `refs` 只允许 source、`ref_capsules` 或已 author work item 的 logical id。

## 唯一 Work Item 与完成合同

```yaml
id: generation_strategy_doc
modality: document
source:
  document_node_id: <real canvas node id>
```

文档展示成片概览、Segment 节奏、唯一分镜主表、命中技法在 SG / Sub-shot 中的执行方式、生成单元装箱、模型 / 分辨率、refs、声音和起止状态；不展示最终视频 Prompt。`storyboard` 不设置任何 `review.*`；Planner 物化真实文档节点且合同字段完整后直接 `done`，不得进入 `doing`、派发 Executor 或等待结果审核。修改只重编受影响 SG、包含它的生成单元和后缀，不重建已冻结前缀。

文档物化完成且合同字段完整后，`storyboard` 直接 `done`；下一 frontier author `visual-gen`，不增加中间生成 Stage 或业务选择 question。
