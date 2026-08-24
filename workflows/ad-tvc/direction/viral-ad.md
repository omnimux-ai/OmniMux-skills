# Direction：病毒传播广告

> 由 `direction/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

- 补充 `direction_profile`：一个主要传播动力、可信常态、异常线索、单一爆点和简短品牌落点。
- 爆点需要能转成一个可见事件，不用多个反转或抽象传播标签堆叠。

## `anchors`

- 路线约束建立常态与异常之间的清晰反差，并为唯一爆点保留视觉空间；实际生成路线 KV 时只把该反差视觉化。

## `storyboard`

- Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
- `execution_delta` 条目 `viral_ad.event_arc` 锁定视频表达先建立可信常态，再蓄力并完成一个爆点；爆点后快速收束，不追加竞争事件。
- `execution_delta` 条目 `viral_ad.brand_role` 锁定产品只在传播事件需要时出现，品牌信息不盖过记忆点。
