# Workflow 编写规范

新增或修改 `workflows/` 下的 Markdown 时遵守本规范。

## 1. 分层

- `workflow.md` 只写进入信号、Stage 拓扑、每个 Stage 的输出与用户检查、当前 Stage 的 reference 读取范围和领域执行规则。
- `reference/*.md` 只写单个 Stage 或单类产物的具体编写方法、字段、模板、校验和失败处理。
- `_shared/*.md` 只写被多个 project workflow 共同使用的执行 contract；用 `utility` 和 `applies_to` 声明适用范围。
- `knowledge/vendors/*.md` 只写 vendor 能力与调用约束；`knowledge/failures/*.md` 只写跨 workflow 的语义风险判断。
- 同一条规则只保留在最窄且唯一的层级；上层只引用文件，不复述下层规则。
- 不把 prompt 技巧、模型原理、运行时状态机或 UI 交互实现写进 workflow。

## 2. `workflow.md` 格式

- frontmatter 只写 `project_type` 和 `stages`。固定拓扑 workflow 的 `stages` 按执行顺序排列；由 workflow-owned variant 决定不同顺序的 workflow 把它作为可用 Stage 清单，并在正文明确 selected variant 的本地资产是有效 `stage_outline` 顺序的唯一来源。Variant id 只在所属 workflow 内解释。
- 正文按 `# Title`、`> 进入信号`、`## Principle`、`## Stages`、Rules 类章节、`## Anti-patterns` 排列。
- `Principle` 只写该 workflow 的目标、适用边界和不可违反的领域约束。
- `Stages` 使用表格列出阶段、输出、执行前检查和产出后检查；不要增加确认门、结束状态或状态迁移列。
- Rules 类章节只写 Planner 编写当前 Stage 时要执行的动作和 reference 路由。
- `Anti-patterns` 只列可识别、可阻止的错误动作。
- 主文件只引用一次角色、场景、分镜、宫格、音频、视频和后期的具体规范；把细节放入对应 reference。
- 文档总长度不超过 `.opencode-v2/README.md` 规定的上限。

## 3. Stage

- 一个 Stage 只承担一个可命名目标，并产出可审阅文档、可执行媒体或可供下游读取的确定性选择。
- 固定拓扑 workflow 的 frontmatter `stages` 列出完整顺序；variant-routed workflow 从 selected variant 的本地资产生成本次有效顺序。Planner 每次只 author 当前 Stage，不提前读取、创建或执行后续 Stage。
- 当前 Stage 未完成时，不创建后续 Stage entry、work item、逻辑输出 id 或占位文档。
- 文档 Stage 由 Planner 物化；图片、视频、音频和后期产物由 Executor 按 work item 执行。
- Planner 为每个媒体 work item 写最终 `prompt`、稳定 `id`、用户可见 `name` 和有序 `refs`；Executor 不补写或改写创作内容。
- 不在 workflow 中写 Plan 状态名、等待原因、状态迁移、审批凭证或工具调用顺序。
- 用户修改当前产物时，要求 Planner patch 当前 Stage contract 和受影响文档；不要只修改阶段描述。
- 只有用户答案依赖已生成候选且会成为下游输入时，才新增选择 Stage。
- 候选生成 Stage 只生成和登记候选；没有额外审阅要求时，将对应检查写为“无”。
- 选择 Stage 使用 `question` 收集选择，并产出明确的选择记录或资产绑定；不要创建只有问题、没有下游输出的空 Stage。
- 选择 Stage 只更新 Planner-owned 文档或绑定时，不创建 Executor work item。

## 4. Question

- 在当前 Stage 的 reference 中列出 `## Questions`，每条规则使用“触发条件：要询问的选择”格式。
- 不在主 workflow 中重复各 Stage 的问题清单；主文件只指向当前 Stage 的 reference。
- 仅在触发条件成立，且答案无法从用户输入、source、当前文档或已锁定值中获得时调用 `question`。
- 同一 Stage 有多个命中项时合并为一次 `question`；没有命中项时不要提问。
- 提供互斥、可执行的选项；不要询问 Agent 可以推断、搜索或校验得到的事实。
- 在 author 当前 Stage 所需输入缺失时提问；不要提前询问后续 Stage 的问题。
- 候选必须先生成才能选择时，在候选生成完成后的选择 Stage 中提问。
- `question` 只收集信息或选择，不代表 Stage 审批，不生成 Production Board 凭证。
- 只接受用户对当前 Stage 的明确确认；不复用上一 Stage 的回答或 `question` 结果。

## 5. Stage 检查

- 在 Stage 表中分别写“执行前检查”和“产出后检查”。
- 执行前检查只列 Executor 开始前必须由用户确认的范围、输入、最终 prompts、refs、锁项或依赖。
- 产出后检查只列用户必须查看的实际文档或媒体质量。
- 没有检查时明确写“无”；不要为保持字段非空而编造检查。
- 两侧检查均为“无”时，不增加暂停、确认问题或确认 Stage。
- Planner 直接物化的文档 Stage 不写执行前检查。
- 将适用检查写入 Stage contract 的 `review.before_execution` 和 `review.after_execution`；“无”对应省略字段或 `[]`。
- 不写“确认当前计划”“确认进入下一阶段”“产出后检查通过才能继续”等框架动作。
- 不在每个 workflow 中重复实现确认 gate；由框架根据两个 review 字段决定是否暂停。
- `question` 选择和 Production Board 审阅分别处理；不要把候选选择塞进泛化的产出验收。
- 候选生成后需要用户选择时，使用选择 Stage；候选生成 Stage 不因选择而增加 `after_execution`。

## 6. Reference 写法

- 只写 Agent 要执行的动作。
- 使用祈使句，直接写读取什么、判断什么、生成什么、如何校验、失败时如何处理。
- 一条规则只表达一个动作；字段名、路径、模板名和工具名使用准确字面值。
- 删除演进史、迁移过程、旧版本行为、设计背景、模型原理和“为什么这样设计”的论述。
- 删除“本文覆盖……”“这是……的桥梁”“为了避免……”“由于模型会……”等说明性开场，直接写约束。
- 示例只用于说明正确写法、错误写法或边界条件；示例后不追加背景论证。
- 除非 Agent 必须兼容该输入，否则不要记录 legacy 字段、废弃字段或旧流程。
- 把触发条件、执行动作、输出格式和校验规则放在相邻位置；不要跨章节重复。

## 7. 修改自检

- 检查 Stage 顺序、表格、reference 路由和 frontmatter 是否一致。
- 检查每个 Stage 是否有真实输出，是否错误包含后续 Stage 内容。
- 检查每个问题是否有明确触发条件，是否可以从已有信息直接得到答案。
- 检查每项 review 是否要求用户验证具体内容，删除空泛确认。
- 检查主 workflow 与 reference 是否重复同一规则。
- 检查全文是否出现 Plan 状态、框架 gate、演进史、背景解释或 Executor 改写 prompt 的要求。
- 运行 `node scripts/lint-workflows.mjs` 和相关知识检查。
