# Iterate — 局部修复与安全续跑

## Activate When

用户否决已有结果、QC 发现具体问题、某个 work item 失败，或执行被中断后需要续跑时读取。第一次正向生成不读取。

## Decision Test

先区分问题类型：

| Type | Response |
|---|---|
| User revision | 将用户新决定写回受影响的 planner-owned 文档 / stage，再继续 |
| Semantic miss | 修 prompt、ref contribution、source range 或连续性描述 |
| Technical failure | 根据工具证据调整能力路径、参数或可用输入 |
| Partial stage failure | 只重试 missing / failed / rejected work item ids |
| Interrupted execution | 先对账已落 canvas 的结果，再补真正缺失项 |
| Explicit restart | 用户明确要求抛弃上一版时，才按新创作方向处理 |

不要把“再来一版”默认理解为从头丢弃所有已批准内容；也不要在用户明确要全新方向时强行保留旧构图。

## Action

### Preserve / Change / Evidence

每次局部重做先形成紧凑修复合同：

| Field | Content |
|---|---|
| Preserve | 原用户目标、已批准文档、成功 refs 与未被否决的可见事实 |
| Change | 用户反馈或 QC 指出的具体失败，只写受影响维度 |
| Evidence | 失败输出、工具错误、source / ref mismatch 或 timing 数据 |
| Scope | stable work item ids 与依赖范围 |
| Success | 本轮可观察的通过条件 |

- 保持原 work item id；更新受影响 prompt / refs，重试范围用 retry ids 表达，不缩减完整 work item 合同。
- 用户修改了 brief、script、shot plan 或其它 planner-owned 文档时，先续接 planner 写回内容，再推进 stage 状态。
- 成功 runtime refs 保留；重生成同一 logical id 时，让计划工具记录 superseded history。
- 每轮只改变有证据的关键杠杆。相同 prompt、model、refs 和实质参数不得重复调用；措辞微调不算新策略。
- Model / vendor 变化服从 manifest、用户指定和当前 agent 的切换授权；不要在本文件维护 fallback chain。
- Reference 错误先修角色与贡献映射；构图 / 裁切错误写成具体可见目标；连续性错误修 start / end state 和依赖，而不是堆长排除词。
- 中断后先依据 canvas 可见产物或用户确认回填已完成 ids，再仅派缺失项，避免重复付费。
- 达到当前 agent / workflow 的 retry budget 或没有实质新策略时停止，说明证据、已尝试变化和最短下一选择。

## Review

验证修复项已改变，同时 Preserve 项没有回退；核对 stage refs、canvas node ids、时长和依赖状态；不要因一个失败 item 宣称整 stage 完成。

## Boundary

Anti-Loop 决定重复调用边界，Stage Execution Plan 决定 stable ids、runtime refs 与状态更新，Canvas Discipline 决定产物谱系。本文件不维护通用重试次数、旧模型表、固定修复 prompt、denoise 或自动换模型规则。
