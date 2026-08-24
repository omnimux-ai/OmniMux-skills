# TVC Visual Research — 产品与风格视觉调研

本卡只服务 `visual-research` Stage。固定声明 `depends_on: [intake-brief]`，负责产品真实参考与风格参考的证据缺口判断、候选展示、画布选择、最终 refs 唯一批量分析，以及 Research Capsule、sources、语义 capsules 和品类指针编译；不生成产品卡、路线 KV、人物卡或环境卡。`product-research.md` 只判断产品证据，`visual-style-spec.md` 只定义风格与 Style Master；两者不重写本卡顺序。

## 1. 门禁条件

读取 Intake 的冻结 capsules、真实 `brief_doc`、已绑定脚本 / 分镜 source、Plan 顶层 sources 和已接受视觉资产。以下合同全部满足时跳过搜索与画布选择，直接完成分析和 Stage author：

- `real_product` 已验证真实型号 / 版本并覆盖本片识别与路线所需角度，或 `concept_product` 已有路线所需概念产品证据池。
- 已有至少一个可解析的真实风格图片或视频，且全部已选媒体合计能够覆盖 Style Master 所需的关键视觉维度；需要固定人物时已有身份 source 或人物卡。
- Style Master、产品证据模式和来源保持边界可由现有事实编译。

HARD：产品图、包装图、Logo / VI、人物身份图都不能作为风格媒体，仅因这些素材存在不得满足“真实风格图片或视频”门禁。同一媒体只有在用户明确指定其风格用途、以独立风格角色登记，并且确实包含可迁移的构图、光线、色彩、材质、空间或运动证据时，才可同时计入风格覆盖；否则必须进入风格候选搜索与画布选择。

只补真实缺口；已满足的产品、风格或人物证据不重复搜索。已确认脚本 / 分镜始终保持原叙事、逐字文案和时间线。

## 2. 搜索、展示与选择

产品与风格搜索共用 `image_search_budget_s: 120`，从第一次外部图片搜索开始计时；预算到点后使用当前最佳有效结果，不为凑数量继续扩 query。

1. **建立槽位**：产品按缺失角度建立必要槽位，并最多增加 2 个替代角度，总候选不超过 4 张；风格按未覆盖视觉维度建立 5–6 个差异候选，去重后展示数量不得少于 5 张，除非同轮可靠结果客观不足。
2. **受控搜索**：产品 query 使用品牌 / 型号 / 版本 / 角度条件，风格 query 使用动态类型和真实广告条件。每个窄 query 固定 `max_images_per_query: 1`；`num` 只扩大搜索检查范围。产品与风格可并行，正常路径每类最多一轮。
3. **内部预筛**：展示前去除重复、明显错误型号、低分辨率、拼贴 / 缩略图、不可解析 locator 和风格重复项；此时不得调用 `hub_analyse_media`。
4. **一次展示**：用一次 `hub_canvas_write_node(items[])` 写入尚无可见 `node_id` 的候选媒体。候选保持独立节点供用户多选，不生成说明文档。
5. **一次普通文字等待**：候选可见后不 author 半成品 Stage，也不改动已完成 Stage runtime。把仍缺的视觉输入合并成一条普通 assistant 提示：第一项要求用户在画布候选中选出足以定义目标风格的图片或视频并回复“选好了”，不规定固定采用数量；存在产品角度或来源缺口时，再用独立编号写清当前缺口，并列出可直接回复的执行分支，例如补充指定角度素材，或授权 Agent 在既定身份边界内补充。Visual Research 不调用 `question`，也不把画布动作改写成选项卡。

这个等待固定使用 Planner 已支持的 blocked payload，不增加自定义返回字段：

```yaml
plan_blocked: true
reason: |-
  visual_reference_selection_required：
  下一阶段需要补充以下视觉输入后才能继续：
  1. 请在画布中选出足以定义 <style_direction> 的风格图片或视频，选好后回复“选好了”。
  2. <仅在产品证据存在缺口时：当前缺少什么；请直接回复补充指定素材，或允许 Agent 按已确认边界补充。>
suggested_questions: []
plan_id: <current plan id>
```

HARD：`visual_reference_selection_required` 是画布操作与素材收集等待；即使产品证据缺口需要用户在“自行补充 / 授权补充”之间回复，也属于同一条普通文字提示，不是结构化决策卡。Planner 必须显式返回空 `suggested_questions`；主 Agent 只把 `reason` 中中文冒号后的内容作为普通 assistant 文本转达并结束本轮，不生成选项卡、不询问用户是否已经选好。

用户以普通文本回复“选好了”或指向当前选择后，主 Agent 先调用 `hub_canvas_get_selection`，把真实 `node_id`、path、候选角色和同轮产品补充授权作为 delta 恢复同一 Planner task。选择为空、产品角度不足或已选风格媒体仍无法覆盖关键维度时，只用普通文本说明剩余缺口并继续等待，不重新搜索或分析已合格媒体。

只有槽位为空或分析前即可判定候选不可用时，允许在剩余预算内对失败槽位做一次定向替换搜索，仍固定 `max_images_per_query: 1`。未选文件不登记为 Plan source，不进入分析、constraints、`ref_capsules`、work items 或下游 Stage。

## 3. 唯一批量分析

取得选择后一次冻结全部 `selected_reference_media_ids`，并将最终产品图与已选风格图片 / 本地参考视频合并为正常路径唯一一次 `hub_analyse_media`。同一次 analysis request 使用一个分析指令同时提取：

- 产品真实性、品牌 / 型号 / 版本、角度、几何、包装文字边界和材质。
- 风格的构图、光线、色彩、成像媒介、材质、空间、运动、可迁移贡献和不可迁移内容。
- 视频的 Hero Shot 时间码、节奏事实和可执行影调 / 构图贡献。
- 每张风格媒体可承接的主体类型、人物关系、动作、场景事件、初始状态、触发、冲突和结果暗示；写入平铺 `creative_content_take`，供 BS_group 的三路线编译消费。

分析后直接编译产品结论、Style Master、source metadata 和 Research Capsule，不因主观不确定性、想增加角度或风格丰富度再次分析。仅工具失败、文件不可读、结果明确不可用，或用户在 Anchors 审核时要求换素材时，才分析对应失败项 / 替换项。

## 4. Plan 合同

最终采用媒体的 locator 只登记一次到顶层 `sources`；同一 source 保存唯一 stable `id`、`origin`、`role`、path / URL、`node_id`、`source_url`、`verification`、`contributes`、`take` 和简短 `execution_excerpt`。不得把同一 id 或 locator 复制到 Anchors `ref_capsules`。

Visual Research 使用新的唯一语义 id，通过 `refs` 引用 canonical source ids：

- `research_product_reference_set`：最终产品 refs、角度用途和身份边界。
- `research_style_reference_set`：最终风格 refs、贡献维度和不可迁移内容。
- `research_video_reference_set`：最终视频 refs、迁移范围和 Hero Shot 用途。

Research Capsule 拆成当前 Stage `constraints` 中的扁平 item。首项固定为 `kind: tvc_visual_research, id: tvc_visual_research_manifest`，其 `item_ids` 按实际存在顺序引用 `research_decision`、`research_evidence`、`product_ref_registry`、`product_reference_routing`、`ref_analysis`、`creative_content_take`、`style_master`、`style_prompt`、`brand_palette`、`direction_profile`、`category_profile`，以及按需存在的 `video_style_dna`、`wardrobe_style_brief`。每项只用 scalar、scalar array 或一层 scalar map；复杂列表拆成多个稳定 item，不把对象 JSON stringify。

`research_decision` 记录规范化参考策略。视觉参考必须记录 `style_selection_status: user_selected`、非空 `selected_style_ref_ids` 和 `style_analysis_status: completed`；`selected_style_ref_ids` 可以只包含图片、只包含视频或混合媒体。`ref_analysis.ids` 完整覆盖选中 ids，每个选中媒体都有非空 `creative_content_take`，并已有非空 `style_master` / `style_prompt`；发生 Agent 搜索时还必须记录 `style_search_status: completed` 与正数 `search_total_downloaded`。不得据此补造不存在的媒体证据。

品类指针只使用当前 Stage 两个可选 scalar `stage_fields`：`category_reference_pointer_anchors`、`category_reference_pointer_storyboard`。未命中时省略；不得写 `category_reference_pointers` object / array。`product_evidence_mode` 只继承 Intake 的 canonical `real_product | concept_product`，不得在本 Stage 重命名或重新推断；`route_mode` 等开关也只用 scalar，研究事实进入 constraints。

author 前预检：`stage_fields` 全为 scalar；`sources`、`work_items`、`ref_capsules` logical id 全局唯一；work item refs 可从 sources、当前 capsules、前序 work item output 或直接依赖解析；最终选择均有真实 locator 与 `node_id`。正常路径第一次 `hub_plan_write` / `hub_plan_patch_stage` 必须通过。

## 5. 视频与交接

存在已选本地参考视频时，在当前 Stage author `reference_video_hero_sheet: postprocess`。它使用唯一分析得到的 4–6 个时间码生成无标题、时间码、分隔线、Logo 或其它文字的 2×2 / 3×2 宫格；逐格检查只属于输出 QC，不是第二次语义分析。Anchors 按需生成路线 KV 时通过该 work item id 引用 runtime output；Hero Sheet 不复制进 `ref_capsules`。

完成条件：产品真实性 / 概念边界满足；已选风格图片或视频足以编译 Style Master；正常路径只有一次成功批量分析；`tvc_visual_research`、语义 capsules、品类指针和可选 Hero Sheet 均已完成。当前 Stage 不设置任何 `review.*`；合同完整后直接 `done`，下一 frontier author `anchors`。
