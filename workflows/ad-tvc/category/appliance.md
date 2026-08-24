# Category：家用电器

> 由 `category/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

### 补充事实

- 收集 campaign 实际涉及的功能、使用场景、产品尺寸 / 安装关系和可见操作结果。
- 只在成片需要交互镜头时收集面板 / APP 状态。
- 只在文案涉及时核对能效、除菌、安全认证和检测结果的官方来源。
- 只在官方资料存在且路线需要时登记内部结构、滤芯、风道或电机。

### 参考与输出

- 登记产品的实际角度、空间比例、面板状态和可见部件，不为固定角度数量扩搜。
- 只在路线确实依赖效果对比时收集 Before / After 参考。
- 向 `category_profile` 写入功能事实、尺度关系、屏幕 / 面板状态和适用证据边界。

## `anchors`

- 将用户痛点、产品介入和可信结果收敛为一个可见证明机制；只有真实结构 / 认证支持时才使用内部透视、参数或安全宣称。

## `storyboard`

Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs 与执行增量，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
固定使用 `appliance.prompt_rules`、`appliance.ref_routing`、`appliance.result_qc_boundary` 三个 key；只写当前 unit 适用的 compact scalar，不另建 `quality_checks` 容器。

### Prompt 输入增量

- 将功能写成连续的“操作 → 可见物理过程 → 可信结果”，不使用瞬间完成的失真效果。
- 使用 Before / After 时保持可比较的场景、机位和角度，只改变目标状态。
- 从已注册事实中写入产品与家居空间比例、面板 / APP 状态和使用动作。
- 将运行声、水流、蒸汽、开合和提示音写入对应镜头的原生声音。

### 参考与检查

- 特定面板、部件或角度镜头从产品注册表选择匹配 refs。
- `appliance.result_qc_boundary` 加入 `effect_credibility`、`before_after_match`、`screen_state`、`spatial_scale` 和适用的认证文案检查。
