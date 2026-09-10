# 视频分析使用说明

本文件说明如何使用视频分析 skill 包。它不是脚本运行手册，也不定义下载器、转写器、OCR 或外部平台解析实现。

## 读取顺序

1. 读取根目录 `SKILL.md`，确认任务是否匹配，并判断证据等级。
2. 需要完整分析步骤时读取 `prompts/analysis-instructions.md`。
3. 需要统一标签时读取 `prompts/labeling-guide.md` 和 `config/labels.yaml`。
4. 需要报告结构时读取 `prompts/report-format.md`、`templates/report.md.j2` 或 `templates/scene-table.md.j2`。
5. 需要结构化字段时读取 `docs/input-output-spec.md` 和 `schemas/*.schema.json`。
6. 涉及竞品、广告、带货、版权或平台规则时读取 `docs/compliance-notes.md`。

## 输入类型

Agent 可以处理以下用户已经提供的材料：

- 已上传或当前对话可见的视频内容。
- 用户粘贴的转写、字幕、口播文本。
- 用户提供的截图、关键帧、逐镜头描述。
- 视频标题、评论摘录、商品信息、平台线索或用户摘要。
- 只有 URL 时，只能作为来源线索；如果当前环境无法访问内容，按 `url-only` 证据等级处理。

## 输出形态

默认输出一份面向内容团队和运营人员的 Markdown 分析报告，包含：

- 分析范围和证据等级。
- 视频摘要。
- 分段拆解表。
- 关键机制：hook、卖点、证明、异议处理、情绪推进、CTA。
- 观察 vs 推断。
- 可复用结构。
- 风险与限制。
- 后续交接建议。

如果用户需要结构化结果，可参考 `schemas/analysis-report.schema.json`、`schemas/toc.schema.json` 和 `schemas/scene-labels.schema.json` 输出 JSON 形态。

## 运行边界

以下目录不属于本 skill 的公开运行资产：

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`

如果后续迁移的其他 skill 只有在运行脚本、工作流或适配器后才能产出核心结果，应先登记为代码执行候选能力，不要直接归入 public business skill。

## 常见处理

### 用户只给 URL

不要声称已经看过、下载过或转写过视频。应说明当前只能基于链接做分析框架，并请用户补充视频、截图、转写或摘要。

### 用户给了转写但没有画面

可以分析脚本结构、口播顺序、卖点和 CTA，但不要判断镜头、演员表现、剪辑节奏或画面细节。

### 用户给了截图/关键帧但没有音频

可以分析视觉结构、字幕层级、产品露出和画面信号，但不要编造口播或完整节奏。

### 用户要后续复刻或改写

先完成分析报告，再把可迁移结构和不可迁移风险交接给对应创作 skill。不要在用户只要求分析时直接升级为生成任务。
