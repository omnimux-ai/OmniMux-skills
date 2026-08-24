# Canvas Workflow — general-video 产物谱系

## Activate When

当前任务编辑、续写、重生成或组合已有 canvas 资产，或者一个 stage 的输出必须与其 source 建立可追踪派生关系时读取。全新且无 source 的生成跳过。

## Decision Test

- 优先使用 Stage Execution Plan 的 sources、ref capsules、depends_on 和 runtime refs，不浏览画布来猜执行输入。
- 若当前对话和计划已经唯一指向 source，直接沿用其 node id。
- 多个可见候选都可能是目标且选择会改变结果时，才向用户确认。
- 编辑 / regenerate 保留 source lineage；合并 / 对比 / concat 需要明确、有序的输入集合。
- Planner-owned brief、script、shot plan 和 Stage Execution Plan 不是 executor 的内容发现入口。

## Action

- Direct payload 或 manifest work item 已带 source canvas node id 时，按 Canvas Discipline 透传 source_node_id；缺失时省略，不构造。
- Plan 内使用稳定 logical ids 引用 sources 与 runtime refs，真实 node id / path 留在相应记录中，不复制到聊天摘要。
- 生成工具已创建的 canvas node 不重复注册。
- 外部文件或仅返回 path 的确定性后期产物，按 Canvas Discipline 写入 canvas；拿到 node id 才算可见交付。
- 合并 / 拼接使用 Stage Execution Plan 中有序的 logical refs；不要从相似文件名推断顺序。
- Regenerate 保持原 work item id 和 source lineage，新产物替换当前 runtime ref，旧产物保留为 superseded history。
- Review 与 render 按 shared Video Merge 的意图边界处理，不因“拼一下”自动导出最终成片。

## Boundary

Canvas Discipline 是节点创建、去重、source 透传和 completion proof 的唯一真相源；Stage Execution Plan 是执行输入的唯一真相源。本文件不维护 canvas 搜索工具手册、旧跨角色派单协议或 UI 操作流程。
