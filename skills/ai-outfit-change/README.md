# AI 换装内部审阅包

这个目录现在只保留一层干净的内部审阅结构，目标很明确：帮助团队把换装任务的输入、提示、质检和风险说清楚，而不是把来源包、脚本包或采集包继续挂在 skill 入口下。

## 保留内容

- `SKILL.md`：运行时入口，只描述适用边界和阅读顺序。
- `docs/`：方法说明、风险说明、排错说明。
- `prompts/`：可复用的分析与提示草案。
- `schemas/`：输入输出结构定义。
- `examples/`：标准样例和预期输出说明。
- `config/`：静态规则和质量预设。

## 不再保留

- 来源记录、采集账本、来源包 wrapper。
- 脚本、工作流、适配器、测试和 manifest。
- 任何把这个包伪装成可直接自动执行的内容。

## 使用建议

1. 先读 `SKILL.md` 判断任务是否适合用这份内部包。
2. 需要收集信息时看 `prompts/user-intake.md`。
3. 需要整理提示草案时看 `docs/prompt-design.md` 和 `prompts/`。
4. 需要统一输入输出时看 `schemas/` 和 `examples/`。
5. 需要做风险判断时看 `docs/compliance-notes.md` 和 `config/safety-rules.yaml`。

## 治理原则

- 保持 `publicationStatus: internal`。
- 保持中性、稳定、可审阅。
- 一旦核心价值依赖执行链路，就不要把它当成公开业务 skill 继续包装。
