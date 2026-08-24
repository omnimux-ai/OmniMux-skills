# Direction：产品广告

> 由 `direction/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

- 补充 `direction_profile`：产品主角地位、最多 3 个 verified 卖点、需要被看见的外观 / 材质 / 机制和旁白密度。
- 产品事实只来自用户资料或可信来源，不为完整感补写未经验证的功能。

## `anchors`

- 路线约束围绕一个主要可见证明组织：外观揭示、材质变化、功能动作或真实使用结果；实际生成路线 KV 时只把该证明关系视觉化。
- 感官意象只能放大一个 verified 材质、使用动作或结果感受，并登记从意象回到真实产品证明的节点。
- 锚点图负责产品身份和路线风格，不预演全部视频镜头。

## `storyboard`

- Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs 与执行增量，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
- 固定使用 `product_ad.proof_rules`、`product_ad.ref_routing` 两个 key，把下列适用规则压成 compact scalar；不让 Visual Gen 临场重命名或重读本卡。
- 视频表达把卖点写成可观察的物理动作和结果；特写只在对应 verified 部件 / 材质时使用。
- 环境、人物或抽象材质镜头只承担感受建立和转场，不能替代真实产品接触、物理变化或使用结果，也不能把创意隐喻写成功效事实。
- 特殊角度从产品注册表选择最多 3 张真实参考；产品身份、比例和颜色优先于装饰性运镜。
