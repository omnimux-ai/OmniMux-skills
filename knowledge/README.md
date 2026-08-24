# Knowledge — 按需 Read 的领域知识

Knowledge 不是启动上下文。`setupAgentStaging` 只注入 `<knowledgeDir>` 路径，正文必须由 agent 在任务需要时读取。

| 子目录 | 内容 | 读取者 |
|---|---|---|
| `vendors/` | vendor 能力、参数白名单、已知 bug | vendor 工程事实来源；executor 直接派发 plan 写好的 prompt，不读该卡 |
| `failures/` | 跨 vendor 语义风险 decision test | executor 预防 / media-agent 重试决策 |
| `image-recipes/` | image-only 垂直品类 prompt 编译配方 | media-agent 在 Simple Direct Path 通过 `hub_select_image_recipe` 命中后读一张卡 |

> 项目 workflow 不在 knowledge 下。它们是顶层 `.opencode/workflows/` 资源（与 knowledge/ 平级），见 `workflows/workflow.md`。

## Routing

- vendor 选择以 `hub_list_capabilities` 的 manifest 为准；vendor card 只补工程事实。
- failure card 只在风险成立时读；`activation_hints` 是召回，不是规则边界。
- image recipe 不改变任务拓扑；只服务 direct image prompt 编译，不作为 `workflow_match`，不进入 planner。
- workflow routing 见顶层 `workflows/workflow.md`；它不属于 knowledge，这里不展开。
- 不新增中央索引，不把知识正文复制进 SP/contract。

## Writing

- vendor card ≤50 行；failure card ≤25 行；image recipe ≤180 行。（workflow 行限见 `workflows/workflow.md`。）
- 每句话都要能改变路由、prompt、参数、依赖或重试决策。
- 例子只做 calibration；不要写演进史、TODO、墓碑、长解释或模型已经知道的创作常识。
