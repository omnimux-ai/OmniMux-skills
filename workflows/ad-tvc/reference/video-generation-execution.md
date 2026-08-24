# TVC Visual Gen 授权与执行

本文件只服务 `visual-gen`。Planner 从直接依赖 Stage detail 的 compact downstream capsules 编译每个 unit 的最终 Prompt；用户做唯一一次高成本生成前授权后，Executor 生成视频并对实际成片做一次结果 QC。

## 依赖

```yaml
depends_on: [anchors, storyboard]
```

Planner 从 Storyboard Stage detail 读取 `tvc_storyboard_plan` capsules，从 Anchors Stage detail 读取所需 constraints、ref capsules 与当前 runtime refs；禁止通过 Storyboard 传递发现产品、人物、环境或 KV refs。

## Execution Locks

Planner 从 Storyboard `constraints[kind=tvc_storyboard_plan]` 原值复制 canonical vendor、model id、分辨率、画幅、原生声音锁和 `prompt_max_chars: 7000` 到当前 Stage；不得只复制显示 alias、重新选模或依赖上游 Stage 的 execution locks。派发前按实时 capability 做 freshness check：不兼容时返回 Storyboard owner 修订，不在本 Stage 静默降级。

```yaml
execution_locks:
  - production_mode: tvc_video_generation
    vendor_model_policy:
      vendor: <frozen canonical vendor>
      model_id: <frozen canonical model id>
    resolution: <frozen resolution>
    aspect_ratio: <frozen aspect ratio>
    native_video_voice: <on | off>
    prompt_max_chars: 7000
```

## Unit 编译

- 为每个 `generation_plan_unit` 一对一创建 `generation_authorization_unit` 与 `modality: video` work item；不得拆 SG、改变来源覆盖、时长、声音、起止状态或顺序。
- 本 Stage `constraints[kind=generation_authorization_unit]` 保存 `unit_id`、source SG / offsets、coverage、业务锁、`typography_package_id`、typography events、technique ids、`execution_delta`、scene state、refs、声音、时长、顺序和 `work_item_id`；最终 Prompt 只保存在 work item，不复制第二份长 Prompt。
- 只消费 Storyboard `constraints[kind=tvc_storyboard_plan_unit]` 中已合并的 Direction / Category / `typography.baseline` / `technique.<technique_id>` keyed scalar `execution_delta`，将适用的 Prompt 输入、基础字体包、技法执行方式、结果 QC 与返修边界编译进本 Stage authorization constraint / final Prompt；不得回读 Direction、Category 或技法卡，也不得重新选择、扩写或覆盖这些规则。
- 每个 work item 按 Storyboard `ordered_ref_roles` 解析 refs：存在 `creative_route_kv` 时先加入该视觉锚点，否则直接使用 Anchors 已冻结的路线 / Style Master 事实；随后按当前 unit 加入 `product_reference_routing` 指向的 verified 产品 source 或产品卡，以及适用人物、环境、来源画面、声音或前片段 refs。
- 非直达单元直接从 `tvc_storyboard_plan_unit` capsule 的 SG/Sub-shot、业务锁、起止状态和连续性编译；不得重新发散或补问。
- 最终 Prompt 直达单元只按 `tvc_storyboard_plan_unit.direct_prompt_source_id` 与精确 field/range 读取已接纳 top-level source，逐字保留用户 Prompt 正文；不回读 Brief、其它 source 或 Storyboard 文档。`source_coverage_complete` 为 `not_applicable`；只有 Anchors 实际生成 `creative_route_kv` 时才加入其贡献边界。

每个 work item 记录：

```yaml
id: <unit_id>
name: <用户可见视频单元名>
modality: video
refs: [<ordered source/ref_capsule/work_item logical ids>]
source:
  source_scene_range: <approved SG/source range>
  clip_group_id: <unit_id>
  sequence_index: <n>
render:
  duration_target_s: <n>
  audio_approach: native_video_audio
  generate_audio: <true when dialogue/VO exists>
prompt: <single final prompt>
```

每个 unit 固定承接 Anchors 的产品身份路由和创意路线锁，但媒体 `refs` 只加入当前 unit 实际消费的 verified source、已生成 product / route / character / scene logical output；不得为满足形式引用不存在或不适用的卡片。任何 capsule entry `id`、constraint key 或 Stage id 都不得进入 `refs`。

Planner author 本 Stage 后，Executor 只读取当前 `visual-gen` Stage detail；生成所需事实已经编译进当前 constraints、work items 与最终 Prompt，Executor 不再读取 Storyboard、Anchors 文档或它们的 references。

## Prompt 与 ref 合同

- 非直达 `ref2va` Prompt 的 section 名称与顺序固定为 `subject_definitions → summary → retention_analysis → detailed_description → overall_soundscape → non_diegetic_music`；正文使用 `working_language`，对白、旁白、品牌名和画内文字保留确认原文。
- 每个非直达 Prompt 的 `detailed_description` 必须包含 `TYPOGRAPHY PACKAGE`：`TYPE CAST`（Display A / B / Utility / Marks）、`TEXT WHITELIST`、大 / 中 / 小尺度、`COLOR SCRIPT`、`GRAPHIC KIT`、`SPACE BINDING`、当前 unit 的文字事件、`motion_cue` 和 `触发 → 进入 → 完整可读 → 一次响应 → 回收 / 定格` 生命周期。每个事件还要给出 `effect_chain` 的来源、路径、结果和归宿。基础字体包只使用已确认文字；没有准确文字时只能输出 `marks_only` 的无文字图形层。
- Prompt 按有序 refs 建立 `<Subject N>` / `<Picture N>` / `<Video N>` / `<Audio N>`，slot、首次出现顺序和实际 refs 一一对应。
- 存在 KV 时，retention 声明只继承路线、Hero 构图、色光材质、空间层次与花字包装关系，不复制信息板、标签或卡片版式；不存在 KV 时直接编译 Style Master 与路线 constraints，不创建占位 ref。
- 每个最小视觉变化单元映射一个 Shot，保留绝对时间、动作、摄影、光线、Style Master、技法、同步声音和结束状态，不平均分配时长、不新增镜头。
- 存在旁白 / 对白时，逐字文本、voice signature、表演时间线和同一真实 `<Audio N>` 槽位进入所有适用 work item；锁定原生音频，禁止独立配音兜底。独立 BGM 不进入视频 Prompt。
- 已确认画内文字、Logo、CTA 或 End Card 必须由对应视频 unit 原生生成。缺少准确文字或 verified Logo ref 时保持 blocked，不转交 Post。
- 每个 work item 的最终 `prompt` 按实际字符串计数必须 `<= 7000` 字符。先消除重复描述并压缩不改变含义的连接语，业务事实、逐字文字、基础字体包、完整时间线、refs 槽位、声音锁和技法执行规则不得删减；仍超限时返回 Storyboard owner 在自然边界拆分 unit，不得截断 Prompt。直达 Prompt 必须逐字保留，超过 7000 字符时保持 blocked，等待用户缩短或明确允许按原时间线拆分。

## Authorization Unit Record

每个 unit 把授权事实写成 flat constraints：

```yaml
constraints:
  - kind: generation_authorization_unit
    id: authorization_unit_01
    unit_id: unit_01
    storyboard_unit_binding_hash: <stable hash>
    source_shot_group_ids: [SG01]
    source_time_offsets: <compact scalar>
    source_coverage: <compact scalar or scalar array>
    business_content_lock: <compact scalar or scalar array>
    typography_package_id: tvc_typography_package
    typography_events: <compact scalar or scalar array>
    technique_card_ids: [<id>]
    execution_delta: [<stable keyed scalar rules>]
    refs: [<same ordered source/ref_capsule/work_item logical ids as work item>]
    duration_target_s: <n>
    narration_reference: <stable multiline scalar | none>
    start_state: <compact scalar>
    end_state: <compact scalar>
    result_qc_boundary: <compact scalar or scalar array>
    final_prompt_char_count: <measured integer <= 7000>
    work_item_id: unit_01
```

## 唯一生成前授权

所有 unit 编译完成后，只设置一次 `review.before_execution`，只展示最终 Prompts、权威费用依据和相对 Storyboard 已冻结执行锁的变化 delta。模型、分辨率、总时长、unit 顺序与 refs 没有变化时只作为既有锁引用，不重新展示为待确认项；任一项确需变化时必须先展示精确 delta，返回 Storyboard 更新对应 capsule 后再授权，不在 Visual Gen 内静默改写。

授权前只做一次 Stage-level deterministic validation：每个 authorization unit 记录并核对 `storyboard_unit_binding_hash` 与实测 `final_prompt_char_count`，确认绑定的 Storyboard unit capsule、Anchors semantic facts、refs-slot 和当前 runtime outputs 可解析，全部 Prompt 均不超过 7000 字符，且每个 `technique_card_id` 都已有对应 `technique.<technique_id>` delta 并进入匹配镜头。coverage、SG 归属、目标时长、声音合同与起止连续性只验证 capsule binding / hash 未变化，不得重新推理 coverage、SG 归属或再建 SG / Unit / Authorization 三套重复自证清单。

## 执行后 QC 与 Compact Downstream Capsule

Executor 按 unit 生成视频。每个实际成片只做一次 result QC：核心业务与身份保留、卖点因果、起止状态、连续运动、预期原生声音、基础字体角色连续、文字准确可读、至少一次完整停留、事件按生命周期进入 / 响应 / 回收、无未规划文字 / 声音。失败只以原授权 work item 重生成对应 unit，不改写成功单元。

Planner 在执行前把 Post 所需的稳定输出映射与上面的 authorization entries 合并进同一个 flat `constraints` collection，执行后不得回填。header 中的全片交付字段原值继承 Storyboard plan capsule，音乐字段原值继承直接依赖 Anchors 的 `constraints[kind=tvc_audio_intent]`；本 Stage 不重新判断：

```yaml
constraints:
  - kind: tvc_video_set
    id: tvc_video_set_header
    model_alias: <short alias>
    vendor: <canonical vendor>
    model_id: <canonical model id>
    resolution: <confirmed resolution>
    aspect_ratio: <confirmed delivery ratio>
    target_duration_s: <confirmed target>
    execution_policy: parallel_independent_work_items
    independent_bgm: <on | off>
    bgm_source_id: <accepted top-level source id | generate | none>
    music_direction: <compact direction | not_applicable>
    core_instruments: [<instrument or timbre>]
    energy_arc: <compact arc | not_applicable>
    bgm_gain: <frozen gain | not_applicable>
  - kind: tvc_video_unit
    id: video_manifest_<unit_id>
    unit_id: unit_01
    logical_output_id: unit_01
    sequence_index: 1
    duration_target_s: <planned>
    audio_approach: native_video_audio
```

这些 capsule 是 flat `PlanItem` entries；每个 unit 独占一个稳定 `id`。它在执行前固定 unit → logical output、顺序、目标时长和音频锁，不携带 path、node id、实际时长或 QC verdict；`logical_output_id` 必须与对应视频 `work_items[].id` 完全一致。实际 locator 只写入 `runtime_refs`，QC 通过由 runtime stage status 表示；禁止为了写结果 patch constraints。

Post Planner 只读取直接依赖 Visual Gen Stage detail 的上述 capsule 与当前 `runtime_refs`，把顺序、音频锁和实际媒体 logical ids 编译进 Post 当前 constraints / work item；Post 的媒体 `refs` 只引用对应 video logical output id，不引用 capsule key，也不重复检查上游分镜规划。Visual Gen 除唯一生成前授权外不设置其它 `review.*`；实际成片内部 QC 通过后完成 Stage。
