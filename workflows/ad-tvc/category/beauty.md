# Category：美妆

> 由 `category/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

### 补充事实

- 收集子类型、准确产品色、包装色 / Logo、质地、finish 和本片实际使用方式。
- 有人物时记录肤色底调、妆前状态、目标妆效和需要连续保持的唇色 / 眼妆 / 眉形 / 腮红。
- 香氛记录可信来源支持的香调、季节和场景语义；将 verified 产品事实、用户确认的品牌情绪和纯创意隐喻分开。
- 功效宣称只保留用户资料或可信来源可支持的表述。

### 参考与输出

- 为产品图登记包装朝向、色相、开合状态和涂抹 / 流动 / 粉末等适用事件。
- 分开登记人物图与产品图，不用 AI 概念图替代真实产品色和包装证据。
- 不得把产品图、包装图、模特图或妆效证据计入风格参考覆盖；同一媒体只有在用户明确指定风格用途并以独立风格角色登记时，才可贡献可迁移的构图、光线、色彩、材质、空间或运动证据。
- 缺少合格风格媒体时必须建立 5–6 个差异候选并进入画布选择，不得仅凭美妆品类、品牌色、产品质地、人物身份或内部审美基线直接编译 Style Master。
- 向 `category_profile` 写入产品色、质地、肤色 / 妆容连续性和品牌色保护关系。
- 需要感官意象路线时，向 `category_profile.sensory_basis` 写入可用的 verified 产品属性、已确认品牌情绪和不得作为功效证明的创意隐喻；未命中时不创建该字段。

## `anchors`

- 读取 `<workflowsDir>/ad-tvc/category/beauty/creative-route-beauty.md>`。
- 需要固定肤色、妆容或品牌色锚点时读取 `<workflowsDir>/ad-tvc/category/beauty/anchors-beauty.md>`。

## `storyboard`

Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs、执行约束与结果 QC，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。

### Prompt 输入增量

- 保留自然毛孔和肤色底调；唇色、眼妆、眉形、腮红与 finish 在连续镜头中保持一致。
- 为上脸接触、液体流动、粉末散开、拉丝或珠光变化写明物理来源、速度、镜头响应和结束状态。
- 产品色、品牌色、包装比例和 Logo 以真实产品参考为准。
- 只在产品、皮肤或质地事件需要时使用微距，不设置固定占比。
- 命中 T20 时，每个镜头只承载环境、人物、微观材质或产品中的一个主要母题角色，并用色彩、形状、运动或材质连续性连接下一节点。
- 感官隐喻只表达触感、气味联想或品牌情绪；护肤功效、妆效和使用结果仍由 verified 事实与可观察动作证明。

### 参考与检查

- Anchors 实际生成 `creative_route_kv` 时，适用视频单元携带该 ref 并只继承已确认路线、Hero 构图、色光材质和花字包装关系；未生成时直接编译 Style Master 与路线 constraints。当前镜头再按需加入产品、人物和特殊质地 refs，原始风格图不进入视频 refs。
- 把 `product_color`、`makeup_continuity`、`skin_rendering`、`macro_target`、`texture_event` 合并进唯一 `beauty.result_qc_boundary`；命中 T20 时追加 `sensory_motif_continuity`、`metaphor_claim_boundary` 和 `product_recall`，不另建 `quality_checks`。

### Flat capsule 执行增量

- `execution_delta` 条目 `beauty.prompt_scope` 只允许视频表达编译已确认的感官母题、承载对象和产品回收点，不在执行时增加第二套自然意象或材质符号。
- `execution_delta` 条目 `beauty.continuity` 锁定跨生成单元保持母题的色彩 / 形状 / 材质 / 运动不变量，同时让环境、人物、微观材质和产品承担不同信息。
- `execution_delta` 条目 `beauty.result_qc_boundary` 锁定上述检查、产品身份和肤色 / 妆容连续性；只定义 Visual Gen 唯一结果 QC 边界，不保存 verdict。
