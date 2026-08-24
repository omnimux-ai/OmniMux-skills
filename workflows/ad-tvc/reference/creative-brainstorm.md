# Anchors Creative Route（anchors）创意路线契约

在生成锚点图片前，按 `stage_fields.route_mode` 收敛唯一创意路线、卖点证明、声音身份、视觉技法和真实锚点缺口；Storyboard 只技术化已确认路线或来源。

## 1. 输入与模式

- Anchors 固定声明 `depends_on: [intake-brief, visual-research]`。从 Intake 的 `tvc_intake_decisions`、`tvc_intake_brief_facts` 与 `tvc_intake_delivery_locks` 继承冻结决策，并允许回读真实 `brief_doc` 和 `source_bindings` 指向的已验证 source 获取内容细节；不得从正文重新推断 `route_mode`、参考策略或交付锁，也不浏览无关 source。
- 从直接依赖 Visual Research Stage detail 读取 `tvc_visual_research`、verified 产品证据、Style Master、refs 和可选 Hero Sheet runtime ref。视觉参考必须有 `style_selection_status: user_selected`、非空 `selected_style_ref_ids`、`style_analysis_status: completed`、覆盖全部选中图片 / 视频 ids 的 `ref_analysis` 与 `creative_content_take`，以及非空 `style_master` / `style_prompt`；发生 Agent 搜索时还必须有 `style_search_status: completed` 和正数 `search_total_downloaded`。缺项时返回 `visual-research` owner 修正，不在 Anchors 内搜索、选图或分析媒体。
- 需要固定模特时，同时读取 `wardrobe_source_mode` 与可选 `wardrobe_style_brief`：穿戴类产品使用 verified 产品服装；非穿戴类产品把简报编译为人物卡的文字服装约束，不把风格媒体或 Hero Shot 宫格传入人物卡 refs。
- 路线问询前读取本卡、已完成的 Visual Research constraints、当前命中的 direction / category `anchors` section 和 `visual-techniques-library.md` 索引；索引只用于把候选路线事件映射为可能命中的 technique ids，此时不通读 `visual-techniques/`、不读取 `prompt-templates.md`、人物卡或环境锚点卡。用户选定路线后才打开该路线实际命中的技法卡与真实卡片缺口所需 Anchors references，不回读聊天或搜索过程。
- 所有需要编译非直达视频单元的路线都读取 `visual-techniques/T06-typography-composition.md` 的“基础字体包”段，先编译统一的 `tvc_typography_package`；它不占用 `technique_plan` 的 0–3 个增强技法名额。用户提供且必须逐字保留的直达 Prompt 不重写。只有字体成为主要构图或叙事事件时，才按索引命中 T06 并读取其增强段。

| `route_mode` | 动作 | 保留边界 |
|---|---|---|
| `compose_from_brief` | 生成候选并取得用户选择，再结构化唯一创意路线 | 从 Brief、研究、产品证据、品类和目标时长创作 |
| `preserve_script` | 把 Style Master、产品证据、技法、声音身份和锚点需求绑定到既有段落 | 保留场景 / 段落顺序、逐字旁白 / 对白 / 画面文字、角色关系、信息落点和结局 |
| `preserve_storyboard` | 登记既有镜头需要的锚点和可执行 refs，优先复用可解析分镜图 | 保留镜头顺序、时长、景别、运镜、动作、逐字文案和声音 |

在发出路线 `question` 或 author 任何 work item 前，把 Intake `tvc_intake_decisions.route_mode` 原值写入 `stage_fields.route_mode`。脚本 / 分镜优先级、冲突和来源用途必须已在 Intake 解决；Anchors 发现 capsule 与已绑定 source 明显矛盾时返回 Intake owner 修正，不得在本 Stage 猜测、重问或切换模式。Storyboard 和 Visual Gen 继续只继承该值。

## 2. Questions 与路线收敛

- 先通过上述视觉参考门禁，再处理创意路线；不得以“下一步再补参考或分析”为由先问路线、人物细节或生成锚点。
- `compose_from_brief` 尚无本轮确认路线：以高信息量 Brief、产品证据、direction / category、已完成的 `ref_analysis`、逐图 `creative_content_take`、`style_master` / `style_prompt` 和技法索引为输入，形成恰好 3 个内容结构明显不同且可执行的候选，用一次单选 `question` 让用户选择。每项使用短路线名，并紧凑写清一句话创意、视频结构、核心视觉事件、产品 / 品牌角色、卖点的可见证明、从哪些已选 ref 承接了什么内容、情绪 / 节奏变化、可能命中的 technique ids 和目标时长可行性；只换风格、场景或镜头包装不算不同路线。路线必须实际转译已选参考图的主体设定、人物关系、动作、场景事件或剧情 beat，允许直接延续其剧情结构。`forbidden_transfer` 只阻止把未确认的品牌、原图文字、现实人物身份或产品事实当成真实信息，不得把主体与剧情一并排除。综合最优项置顶并标记推荐，但不默认选中。
- 用户已完成本轮路线选择：只把选中路线写入 Stage Plan，丢弃未选路线和内部评分，不生成路线文档、概念板或隐藏备选。
- 用户主动要求换路线：重新展示原候选或按反馈重做候选；其它情况不重复询问。
- 路线确认后不再询问人物造型、场景方案、镜头、技法或锚点类型；先只读取选中路线实际命中的技法卡并冻结 `technique_plan`，再判断产品、路线、人物和环境的真实卡片缺口，只 author 命中缺口的 work items。`compose_from_brief` 的 `video_creative_route.selection_status` 不是 `confirmed` 时，禁止 author 任一锚点图片 work item。

从零创作时，每个用户选择卖点必须且只能落入一个 `narrative_stage`，并在同一阶段完整记录初始状态、可见证明动作和结果状态。产品出现、静态 Hero Shot 或旁白口播不能单独构成证明。

来源接纳模式沿用原有表达位置；证明不足时记录缺口并请用户决定是否修改来源，不静默改写。每个 `selling_point_binding` 记录来源表达、受众价值、可见证明、结果和所属段落 / 镜头。

完成路线选择或来源映射后，按索引只打开实际命中的 0–3 张技法卡，分别读取其 `## Anchors` 并绑定路线事件、预期镜头位置和叙事作用；没有独立作用就不选，不为凑数量读取卡片。来源模式只结构化既有技法，或增加不改写来源的安全适配技法。

按顺序把 `narrative_stage` 归一为场景状态：地点身份或持续环境状态不同才算新状态；景别、机位、普通光线、短时天气和临时布置不算。不同状态不足两个时不生成环境锚点卡；达到两个时，先判断 verified 环境 source 与文字锁能否稳定覆盖每个状态，只为仍有一致性缺口的 state 生成一张。A → B → A 复用 A，同地点发生不可逆结构变化时拆成新状态。

## 3. Stage Plan 契约

把确认路线写入 Anchors Stage 的平铺 `constraints`，不生成路线文本节点：

- `kind: video_creative_route`：路线名、一句话主张、产品 / 品牌角色、人物角色、主视觉事件、节奏和情绪曲线；`compose_from_brief` 记录 `selection_source: user_question` 与 `selection_status: confirmed`，来源模式记录 source stable id。
- `kind: narrative_stage`：每段一条，记录观众经历、可见事件、起止状态和来源范围。
- `kind: selling_point_binding`：每个核心表达一条，记录受众价值、证明动作、结果状态和所属段落。
- `kind: tvc_typography_package`：全片唯一基础字体包，记录 `source_mode`、`text_policy`、`type_cast`、`scale_ladder`、`color_script`、`graphic_kit`、`space_binding` 和 `motion_language`；字体使用字骨架描述，不写依赖安装的字体名称。
- `kind: route_asset_requirement | technique_plan | source_preservation_mapping`：每个锚点缺口、技法用途或来源边界单独一条。环境项记录 `scene_anchor_id`、覆盖的 `narrative_stage_ids`、地点身份、持续状态、路线事件、适用技法和 `product_exclusion: true`。
- `kind: voice_lock`：存在旁白时全片只建一条，至少包含 `narrator_id`、`language`、`accent`、`voice_role`、`perceived_age_range`、`gender_presentation`、`timbre`、`pitch_range`、`resonance`、`vocal_texture`、`pace`、`rhythm`、`pause_style`、`articulation`、`emotional_baseline`、`allowed_emotional_range`、`performance_rules`、`pronunciation_lexicon` 和可选 `reference_audio_ref_id`。字段来自用户要求、已接纳脚本 / 声音参考、品牌调性与路线情绪，不按段创建新声音身份。

Anchors 不 author 旁白音频、TTS、voice clone 或 speech work item。用户提供声音参考时，把真实 audio ref 写入 `voice_lock.reference_audio_ref_id` 和封闭 `{id, role, contributes, take}` `ref_capsule`；`take` 只继承说话人身份、音色、口音和表演基线。Storyboard 按 `video-generation-strategy.md` 物化并复用唯一 `narration_reference` 及 Audio 槽位。

只要 Plan 保留 Storyboard 或 Visual Gen，就不得省略 Anchors，但 Anchors 可以是纯 Planner Stage。已有 verified source 能稳定承担产品、人物、场景或路线锚定时直接复用；只有下游一致性仍有真实缺口时才生成对应卡片。用户明确改为 concept-only 并移除后续视频 Stage 时，才结束在概念交付。

直接复用 Visual Research 已覆盖当前 refs 的 `constraints[kind=ref_analysis]` 和 `ref_capsules`。当前记录缺少 work item 必需的可见事实时返回 Visual Research owner 补齐，不在 Anchors 重做媒体分析。

## 4. Work Item 决策与执行

Anchors Stage 的图片 work items 统一写入 `stage_fields.execution_policy: parallel_independent_work_items`，并在同一批次提交所有已 author 且 refs 已解析的产品、路线、人物和环境卡。Anchors 不再使用整 Stage 串行队列；如果某个 work item 原本会消费同 Stage 生成结果，改为绑定同一份已存在的上游 source / ref capsule，使其成为独立 item。生成结果之间的 QC、`product_reference_routing` 更新和下游交接仍在本批次全部完成后统一处理，不构成生成期依赖。

| 稳定 `id` | author 条件 | 有序 refs / 依赖 |
|---|---|---|
| `product_reference_card` | Visual Research 的 verified 产品 refs 无法稳定覆盖下游所需完整身份 / 多角度，或概念产品仍需补全唯一设计时 author；已有可解析产品卡时复用 | 用户概念 refs 或 verified 真实产品 refs；使用 TPL-01 |
| `character_reference_card` | 固定人物需要跨镜身份一致，且没有已接受人物卡或足够身份 source | identity 与 wearable refs；使用 5-PLATE |
| `creative_route_kv` | 路线包含需要跨多个视频单元保持的 Hero 构图、色光材质或花字包装关系，且 Style Master / 路线 constraints 不能单独稳定表达时 author；来源模式不改写来源事件 | 产品身份 ref、策略要求时的已选风格 refs、可选 `reference_video_hero_sheet`；使用 TPL-02 |
| `scene_anchor_<scene_state_id>` | 路线包含两个以上 distinct scene states，且 verified 环境 source 与文字锁无法稳定覆盖该 state 时 author | `refs: []`；按 `environment-anchors.md` 使用 item `vendor_model_policy: {vendor: midjourney}` 文生图 |

- 每个图片项写入最终 `prompt`、稳定 `id`、用户可见名称和有序 `refs`；Planner author 与 Executor 执行使用同一份 Prompt。环境锚点卡因 MJ provider 约束使用英文 Prompt，其余图片继续使用 Brief `prompt_language`，并在 `working_language` 中说明该语言切换。
- author 任一图片项前必须已有唯一确认路线：`compose_from_brief` 要求 `video_creative_route.selection_source: user_question` 且 `selection_status: confirmed`；来源模式要求唯一已接纳 source 和完成的 `source_preservation_mapping`。未满足时 Anchors 只保留路线问询或来源澄清，不得预生成产品卡、人物卡、路线 KV 或环境卡。
- `product_reference_card`、`creative_route_kv`、`character_reference_card` 与 `scene_anchor_*` 在生成期全部并行；`creative_route_kv` 使用已接受的概念 / verified 产品 source（或其 ref capsule），不得等待或引用同 Stage 尚未生成的产品卡。产品卡通过 QC 后仍可作为下游产品身份主锚点，但只影响本批次之后的路由与视频 refs，不阻塞本批次生成。
- item 级 MJ policy 只作用于 `scene_anchor_*`，不改变其它 Anchors work item 的模型路由；它也不改变统一的并行执行策略。
- Anchors 图片调用若返回明确内容安全 / policy 拒绝（`safety_blocked`、`content_policy_violation`、`content_safety`、`ErrKeySafetyBlocked` 或明确指向内容审核的 vendor message），该 work item 不做原模型重试，直接且仅一次降级为 `vendor: seedream`、`model_id: doubao-seedream-5-0-pro-260628`。保留原稳定 id、Prompt、refs、画幅、分辨率和语义约束，并在结果摘要记录 `controlled_fallback_to_seedream_5_0_pro`；Seedream 仍失败或拒绝时返回原安全信号与降级错误，不循环。此规则仅作用于 ad-tvc Anchors，不扩散到其它 workflow 或 direct path。
- Planner 在路线、用途、来源、画幅、最终 Prompt 和 refs 完整后 author 图片项；Executor 在同一 Stage 逐字执行。若职责包装与 `modality: image` 冲突，只修正未完成项的执行包装，不删除图片项或转为 document。
- `product_reference_routing` 写入 Stage Plan；`anchor_asset_qc` 是本轮执行结果摘要，交给 orchestrator 决定 Stage 是否完成，二者都不是 work item，也不写入自定义 runtime metadata。证据不足时返回明确 evidence gap，不生成占位或豁免项。
- 所有实际 author 的锚点 work item 都取得可解析 canvas node id 与当前 `runtime_refs`，且唯一 `anchor_asset_qc` 结果摘要聚合通过后，仅当当前 Stage 真实生成了至少一张锚点图时，才设置唯一 `review.after_execution`，一次性请用户检查本轮实际生成的锚点图片；不需要生成任何卡片时不设置 review，直接完成。证据不足时返回 Visual Research owner，不创建空 work item 或豁免占位。

## 5. 交接边界

Storyboard 消费 `video_creative_route`、`narrative_stage`、`selling_point_binding`、`tvc_typography_package`、`voice_lock`、`route_asset_requirement`、`technique_plan`、`style_master`、`style_prompt`、`product_reference_routing`，以及实际存在的产品 / 路线 / 人物 / 环境锚点和 verified sources；它按 `technique_plan.technique_id` 只重读对应增强技法卡的 `## Generation Strategy`，不通读技法目录。

原始风格媒体、风格视频和 `reference_video_hero_sheet` 只用于 Anchors。实际生成 `creative_route_kv` 时，它进入需要该视觉锚定的视频单元并只贡献已确认路线、主视觉构图、色光材质和花字包装示意；未生成时由 `video_creative_route`、`style_master` / `style_prompt` 和 `technique_plan` 直接承担路线与风格锁。环境锚点卡按 scene-state binding 进入匹配的视频 refs。真实产品 refs 按 `product_reference_routing` 进入对应镜头；概念产品使用已接受 source 或按需生成且通过 QC 的产品卡。下游不重新发散路线、增加技法、改写来源或从图片反推产品事实。
