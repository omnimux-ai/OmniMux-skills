# AI 换装内部接入说明

## 适用方式

这个包适合接在内部分析、方案整理和结果复核环节，不适合被当成自动执行链路。

## 建议阅读顺序

1. 先用 `prompts/user-intake.md` 收敛输入。
2. 再用 `prompts/garment-analysis.md` 和 `prompts/model-selection.md` 整理关键约束。
3. 用 `prompts/tryon-generation.md` 组合提示草案。
4. 用 `config/safety-rules.yaml` 和 `docs/compliance-notes.md` 做风险判断。
5. 用 `prompts/qa-checklist.md`、`docs/troubleshooting.md` 和 `examples/expected-output.md` 做结果复核。

## 适合交付给下游的内容

- 结构化输入摘要。
- 提示草案与负向约束。
- 风险标签。
- 质检清单。
- 需要人工确认的假设。

## 不应该由这个包承担的内容

- 自动调图、批量执行、结果导出。
- 工具顺序编排。
- 固定阶段机。
- 把静态文档升级成隐藏执行流程。

## 结构价值

这份包真正的价值，是让不同团队在同一个任务上使用一致的输入结构、风险语言和质检标准，避免每次都从零拼提示和规则。
