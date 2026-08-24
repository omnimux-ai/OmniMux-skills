# Category：服装

> 由 `category/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

### 补充事实

- 收集服装类型、准确颜色、面料、版型、工艺细节和本片穿着场景。
- 有固定模特时记录人物身份、尺码 / 穿着关系和需要保持的造型状态。
- 有可用品牌字体、标准色或 Logo 资产时登记其来源与适用范围，供 TVC 基础字体包和 End Card 复用；没有资产时由 Anchors 根据 Style Master 推导字骨架，不虚构品牌字体名称。

### 参考与输出

- 按路线实际需要收集整体 look、面料微距和动态参考，不追求固定数量。
- 面料动态只贡献真实摆动、拉伸、垂坠或反光规律，不直接复制参考人物与场景。
- 向 `category_profile` 写入面料光学特征、服装运动特征、完整 look 和人物 / 场景关系。

## `anchors`

- 围绕穿着者状态、面料运动和场景身份形成一个路线；风格由 Style Master 决定，不套固定奢侈 / 街头模板。

## `storyboard`

Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs 与执行增量，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
固定使用 `fashion.prompt_rules`、`fashion.ref_routing`、`fashion.result_qc_boundary` 三个 key；只写当前 unit 适用的 compact scalar，不另建 `quality_checks` 容器。

### Prompt 输入增量

- 面料光线与真实材质匹配：绒面偏散射、丝绸 / 缎面突出侧逆光、皮革控制高光、蕾丝 / 网纱保留透光层次。
- 为行走、转身、风吹、跑跳或换装写清面料运动方向、速度和结束状态。
- 需要完整穿搭时保证全身比例可见；需要工艺时再进入微距，不设固定景别比例。
- 固定模特存在时保持人物身份、服装状态和场景关系。

### 参考与检查

- 特殊面料、完整 look 或人物身份镜头选择对应 refs。
- `fashion.result_qc_boundary` 加入 `fabric_rendering`、`garment_color`、`full_look`、`model_identity` 和 `setting_match`。
