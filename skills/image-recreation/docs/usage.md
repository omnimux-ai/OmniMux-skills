# 图片参考改编使用说明

## 适用任务

这套能力包适合以下场景：

- 单张参考图改版
- 竞品图拆解后做原创改编
- 同一产品的一组图风格统一
- 电商主图、卖点图、场景图的批量规划
- 给设计、拍摄或图片生成环节提供结构化 brief

## 推荐使用顺序

1. 先读 `SKILL.md`，确认任务属于“参考图改编”而不是自由生成或视频任务。
2. 用 `prompts/analysis-instructions.md` 拆出参考图的构图、光线、卖点和注意力路径。
3. 用 `docs/safety-and-originality.md` 判断哪些能借、哪些必须换。
4. 需要提示词时读 `prompts/prompting-guide.md` 和 `prompts/negative-guidance.md`。
5. 需要做图组时读 `prompts/style-consistency.md` 和 `config/defaults.yaml`。
6. 需要交付文档时参考 `docs/output-formats.md`、`schemas/` 和 `templates/`。

## 输入最低要求

- 至少要有参考图、参考图描述或明确的视觉目标。
- 如果要把参考图换成用户自己的产品，最好补上产品图、品牌调性和禁止项。
- 如果要做批量图组，最好明确输出数量、平台和每张图的角色。

## 推荐输出

- 单张任务：参考图拆解 + 安全改编策略 + 画面方案 + Prompt 草案。
- 批量任务：统一规则 + 图组角色分工 + 每张图的 Prompt 草案 + 风险提醒。
- 人工执行任务：结构化 brief + Style Bible + 审核重点。
