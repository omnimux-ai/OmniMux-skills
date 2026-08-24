# TVC Intake 与意图确认

本 Stage 只整理用户输入和两类参考策略，不搜索、不分析媒体、不生成锚点。

## 高信息量问询

信息不完整时，首个 `question` 调用一次提交所有可并行回答的未决决定：每个 `questions[]` 对象对应一张卡且只问一个决定，提供 2–3 个互斥、可执行的选项；依赖上一题答案的决定顺延到下一轮。

即使用户要求“一次合并问题 / 集中确认”，也只能在同一次调用中提交多张独立卡。禁止综合默认方案、全部接受推荐、只改某项、自定义多项，或要求用户按编号一次填写多个答案。推荐项置首并说明理由。

卡片面向非专业用户：标题日常化，题面一句话，选项直接描述成片结果，说明选择后的可见差异；沿用用户的产品名、受众称呼和表达。不得展示 `route_mode`、`style_reference_strategy`、`product_evidence_mode`、`native_video_voice`、refs、Anchors 等内部字段或流程词，也不得使用“高级感 / 电影感 / 更有创意”等无法判断的空泛选项。

先用用户原话、已接纳 source 和已确认状态预填事实，只询问会改变创意路线、产品证据、资产拓扑或交付规格的决定。同一答案可可靠推导的字段不重复问；审美、镜头、节奏、技法和音乐风格由 Planner 判断，不在 Intake 逐项询问。

优先取得以下决策；已明确或可从同一答案可靠推导时跳过：

- **传播结果**：观众最后主要记住品牌、相信产品证明、产生情绪认同，还是愿意分享一个事件；该答案同时形成广告方向、期望反应和产品 / 品牌主角色。
- **核心证明**：最多 3 个必须被画面证明的 verified 价值，记录观众价值、可见动作和成功结果；不得只收集抽象卖点名。
- **情绪变化**：成片从什么状态走向什么状态，以及品牌希望留下的最终感受；若用户已给脚本、明确情绪弧或足够视觉参考意图则不再问。
- **来源用途**：已有脚本 / 分镜尚未说明用途且会改变路线时，确认必须沿用还是只作灵感；已明确的不重复问。
- **交付硬约束**：只补缺失的精确时长、画幅、受众 / 地区中会改变内容的一项，以及必须出现的旁白 / 对白语言、品牌名、Slogan、Logo、CTA 或 End Card。旁白始终由视频模型随画面原生生成，不提供独立配音 / TTS 路线。
- **产品与参考策略**：确认产品是公开真实、非公开真实还是概念产品，再按身份询问真实产品参考或概念产品来源；视觉参考独立选择 `use_existing | agent_supplement`。产品身份未确认时先问身份，下一轮只展示命中的来源策略。
- **声音交付**：只有用户意图无法判断时，确认是否需要视频原生旁白 / 对白 / 环境声和独立 BGM；不得把旁白列为独立音频产物。

TVC 默认启用基础字体包装，不新增独立问询卡。只登记已确认的品牌名、Slogan、CTA、End Card、脚本 / 对白 / 画内文字，以及用户提供的字体、Logo、VI 和标准色；没有准确文字时由下游使用 `marks_only` 或等待真实文字，不得临场编造文案。
**投放地区**:可选欧美地区,或者中国,或者世界范围,答案决定了画面中人物的人种

任一候选问题若不同答案不会改变上述结果，则不问；用 Brief 中的明确事实或 Planner 的专业判断继续。Intake 不询问创意路线，路线只在用户选定视觉参考并完成单次分析后生成。

## 产品身份路由

- 真实产品统一记录 `product_evidence_mode: real_product`；公开真实产品且用户选择 Agent 补充时记录 `product_reference_strategy: agent_supplement`。
- 非公开真实产品、只允许用户素材，或公开真实产品选择沿用现有素材时仍记录 `product_evidence_mode: real_product`，并记录 `product_reference_strategy: use_existing`；当前素材不足时等待用户补充，不得转为 Agent 搜索。
- 概念 / 虚构产品：`product_evidence_mode: concept_product`，并记录 `concept_product_source_mode: use_existing | user_supplement | agent_supplement | brief_only`；只有路线所需概念产品证据池存在缺口且用户选择 Agent 补充时，才搜索真实品类商业产品摄影，采用项不得声明为目标品牌或真实 SKU。
- `concept_product_source_mode: user_supplement` 且当前没有实际概念图或品牌资产时，返回 `plan_blocked: true`（`waiting_for_concept_product_sources`），提示用户把素材添加到对话后发送；收到附件后恢复同一 Planner。
- 用户提供的产品图片无论是否继续搜索，都交给 Visual Research 分析角度并注册。

## 输出

- 只创建 `brief_doc: document`。
- Planner 先物化真实 Brief 文档，再把返回的真实 node id 写入 `brief_doc` work item 的 `source.document_node_id`；这是 document contract 的合法 locator，不写入 `runtime_refs`，也不复制到 downstream capsule。
- `brief_doc` 记录已确认的脚本 / 分镜用途；实际 source 仍只保存在 Plan 顶层。Intake 按 workflow 的固定优先级冻结唯一 `route_mode`。Visual Research 与 Anchors 可以回读真实 `brief_doc` 和已绑定 source 获取内容细节，但必须原值继承已冻结决策，不得从正文重新推断 `route_mode` 或参考策略。
- Stage Plan 保存 `prompt_language = working_language`、`route_mode: preserve_storyboard | preserve_script | compose_from_brief`、`product_reference_strategy: use_existing | agent_supplement`、`concept_product_source_mode`（适用时）、`style_reference_strategy: use_existing | agent_supplement`、`product_evidence_mode: real_product | concept_product`、`native_video_voice: on | off`、`independent_bgm: on | off` 和已确认文字包装需求；不得创造新的策略枚举，TVC 不保存独立旁白 / TTS 选项。
- 用户上传、链接和画布素材只登记到 Plan 顶层 `sources`；本 Stage 不复制素材 manifest。

## Compact Downstream Capsule

Planner 在 Intake author 时，把唯一一组 compact downstream capsule 作为 flat entries 追加到本 Stage `constraints`。每个 entry 的 `id` 必须在全 Plan 稳定且唯一；首项是 header，其余只放下游必须原值继承的冻结事实。`concept_product_source_mode` 只在概念产品分支取实际值，其它分支写 `not_applicable`，不得在下游重新推断。

```yaml
constraints:
  - kind: tvc_intake_brief
    id: tvc_intake_manifest
    item_ids: [tvc_intake_decisions, tvc_intake_brief_facts, tvc_intake_delivery_locks]
  - kind: tvc_intake_decisions
    id: tvc_intake_decisions
    logical_output_id: brief_doc
    route_mode: <preserve_storyboard | preserve_script | compose_from_brief>
    product_evidence_mode: <real_product | concept_product>
    product_reference_strategy: <use_existing | agent_supplement>
    concept_product_source_mode: <use_existing | user_supplement | agent_supplement | brief_only | not_applicable>
    style_reference_strategy: <use_existing | agent_supplement>
    native_video_voice: <on | off>
    independent_bgm: <on | off>
    bgm_source_id: <accepted top-level source id | generate | none>
  - kind: tvc_intake_brief_facts
    id: tvc_intake_brief_facts
    communication_goal: <single frozen outcome>
    target_audience: <compact confirmed audience>
    core_proofs: [<audience value → visible action → result>]
    emotional_arc: <start → end>
    source_bindings: [<stable source id + preserve role>]
    must_include: [<confirmed business facts>]
    must_avoid: [<confirmed exclusions>]
  - kind: tvc_intake_delivery_locks
    id: tvc_intake_delivery_locks
    target_duration_s: <confirmed target>
    aspect_ratio: <confirmed delivery ratio>
    resolution: <confirmed delivery resolution | not_specified>
    working_language: <confirmed language>
    delivery_region: <confirmed region | not_specified>
    required_native_texts: [<brand name>, <slogan>, <logo>, <CTA>, <end card>]
```

`tvc_intake_brief_facts` 只保留创作必需的已确认事实和 source id / preserve role，不复制 source 正文或 Brief 文档；`required_native_texts` 只保留适用且已确认的精确值，不适用时为空数组。capsule 不得放入问询过程或 Planner 推理。Visual Research 与 Anchors 按上述稳定 ids 继承冻结决策，并可通过 `brief_doc` 的真实 `document_node_id` 回读内容、按 `source_bindings` 读取已绑定 source 的确认范围；不得浏览无关 source，也不得用回读内容覆盖已冻结决策。

下游媒体 `refs` 只能使用真实 top-level source id、本 Stage / 直接依赖可解析的 `ref_capsules[].id` 或 work item logical id；不得把 `tvc_intake_manifest`、`tvc_intake_decisions`、`tvc_intake_brief_facts` 或 `tvc_intake_delivery_locks` 放入媒体 `refs`。capsule 只含冻结事实、logical output id 和交付 locks，不含 path、URL、node id、实际时长、`qc_passed` 或 QC 日志。Intake 没有媒体 locator；真实 document locator 只保留在 `brief_doc` work item 的 `source.document_node_id`，不写入 `runtime_refs`。Intake 不设置任何 `review.*`；真实 `brief_doc` 已物化且合同字段完整后直接 `status=done`，不得进入 `doing`、派发 Executor 或等待结果审核。执行结果不回填 capsule。
