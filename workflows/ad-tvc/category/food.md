# Category：餐饮食品

> 由 `category/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

### 补充事实

- 收集产品 / 菜品准确外观、温度状态、核心质地、制作动作和目标食用场景。
- 只在实际画面会出现时收集品牌餐具、包装、摆盘和标准色。
- 原料、营养、产地和功效文案只使用可核对来源。

### 参考与输出

- 按路线需要登记生 / 熟、切面、流动、蒸汽、脆裂或拉丝等状态。
- 参考图只贡献真实质地、颜色和物理变化，不把摆盘数量当完成门槛。
- 向 `category_profile` 写入主要食欲触发、温度 / 新鲜度状态、物理动作和品牌摆盘边界。

## `anchors`

- 选择一个主要食欲触发机制，如蒸汽、流心、拉丝、脆裂、液体或咬合；不把所有效果堆进同一路线。

## `storyboard`

Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs 与执行增量，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
固定使用 `food.prompt_rules`、`food.ref_routing`、`food.result_qc_boundary` 三个 key；只写当前 unit 适用的 compact scalar，不另建 `quality_checks` 容器。

### Prompt 输入增量

- 为蒸汽、油脂、流心、拉丝、切开、入锅、倒入、咬合等事件写明真实来源、速度和物理结果。
- 热食、冷饮、烘焙或茶咖保持对应温度、新鲜度、颜色和质地状态。
- 让光线服务食欲：蒸汽强调逆光层次，液体保持通透，食物表面避免塑料感。
- 将油炸、切菜、倒入、碰杯和咬合声写入原生声音。

### 参考与检查

- 特殊切面、摆盘、包装或质地镜头选择对应 refs。
- `food.result_qc_boundary` 加入 `appetite_texture`、`food_color`、`steam_or_temperature`、`freshness_state` 和 `ambient_sfx`。
