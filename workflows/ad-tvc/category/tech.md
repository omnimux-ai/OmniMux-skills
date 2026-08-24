# Category：3C 数码

> 由 `category/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

### 补充事实

- 收集准确型号 / 版本、材质、配色、接口 / 按键 / 模组、屏幕状态和真实手持尺度。
- 参数只收集本片实际卖点，并保留测试条件、协议、版本和标准。
- 只在官方资料存在且路线需要时登记内部结构与生态联动。

### 参考与输出

- 为外观图登记角度与识别面，按具体镜头用途登记材质 / 接口特写。
- 屏幕、UI 和多设备关系使用真实状态，不为固定微距比例扩搜。
- 向 `category_profile` 写入材质光学特征、产品尺度、屏幕 / 交互状态、参数证据和生态关系。

## `anchors`

- 围绕一个主要证明机制组织工业设计、材质、参数或生态价值。
- 仅当产品属于耳机、透明硬件、AI PC、高性能笔记本、多设备生态或多色 SKU，或用户给出对应 3C 参考片时，读取 `<workflowsDir>/ad-tvc/category/tech/casebook-tech-ads.md>`；不通读 Casebook 寻找灵感。

## `storyboard`

Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs 与执行增量，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
固定使用 `tech.prompt_rules`、`tech.ref_routing`、`tech.result_qc_boundary` 三个 key；只写当前 unit 适用的 compact scalar，不另建 `quality_checks` 容器。

### Prompt 输入增量

- 铝合金、玻璃、陶瓷、塑料或碳纤维使用与真实材质一致的反射、散射和微距表现。
- 屏幕、接口、按键、镜头模组和手持比例来自注册事实；UI 写明实际状态与操作结果。
- 参数与可见价值成对表达，并保留测试条件、协议、版本或标准。
- 多设备联动写清设备位置、触发顺序和数据 / 动作承接；没有生态需求时不补联动镜头。

### 参考与检查

- 特殊角度、屏幕、接口或材质镜头选择对应产品 refs，单元总产品外观参考不超过 3 张。
- `tech.result_qc_boundary` 加入 `material_match`、`screen_state`、`parameter_evidence`、`product_scale` 和适用的生态连续性检查。
