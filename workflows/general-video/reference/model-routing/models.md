# Model Routing — plan capability requirements

## Activate When

当前 general-video work item 结构已稳定，且用户 / 已批准项目状态给出明确模型锁，或某项能力要求会改变 refs、音频、时长、几何或执行策略时读取。不要为了挑选“最优模型”读取；实际选择属于 executor。

## Decision Test

运行时 manifest 是模型可用性、canonical id、参数白名单和参考上限的唯一真相源。Planner 只判断哪些硬要求必须进入计划：

1. modality 与 operation；
2. 普通 references 还是 first / last timeline anchors；
3. image、video、audio refs 的数量与类型；
4. 目标时长、比例、分辨率和是否需要原生音频；
5. 可读文字、人物 / 产品保真、动作连续性等会实质改变结果的能力；
6. 用户或已批准项目状态显式提供的 vendor / model lock。

用户指定项必须原样保留，但 planner 不验证、补全或替换它。Executor 用最新 manifest 校验；不可用或与必要参数冲突时返回具体冲突，不静默换模型。

## Action

- 为 generated video work item 写明 hard capability requirements 和 constraints；不要写 workflow-local selection policy、候选模型清单或 fallback chain。
- 记录 refs 的类型、数量与顺序，first / last timeline anchor 语义，原生音频要求，时长上限，比例、分辨率，以及质量 / 速度 / 成本偏好。
- 用户或 approved project state 已提供 canonical `{vendor, model_id}` 时原样复制为 concrete lock；用户只给出非 canonical 名称或别名时，将原文记录为 model-lock requirement，由 executor 按 manifest 解析和校验。本卡不得补全、升级或替换 model lock。
- 身份与风格一致性写入 ordered refs、core anchors 和最终 prompt；本卡不新增或推导 `same_vendor_model` policy。
- Planner 写 model-agnostic 最终 prompt，不写 vendor placeholder、工具参数或静态 fallback chain。
- Executor 依照当前平台 model-selection contract 调用最新 `hub_list_capabilities` 选择并校验可用路径，不改写 prompt。
- refs、时长、几何或音频方案变化后由 executor 重新校验；不可用时返回冲突或可选项，不静默替换。

## Boundary

- Manifest 决定可用性与参数，vendor cards 只补工程事实和 prompt/call 约定。
- Semantic Judgment 决定创意与参考贡献，模型选择不得覆盖用户意图。
- General-video 模型要求只来自用户意图、approved project state 和当前 runtime capabilities；选中 vendor card 只补工程事实与 prompt/call 约定。本文件不维护静态模型矩阵、固定优先级、地区别名表、价格或重试次数。
