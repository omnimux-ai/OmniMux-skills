# 视频分析能力包

本目录是 Gxgen 的视频分析 skill 包。它把短视频、竞品视频、口播视频或用户提供的转写/截图/关键帧拆成可复盘、可交接、可复用的结构化分析结果。

## 目录结构

```text
video-analysis/
├── SKILL.md
├── PUBLICATION-GOVERNANCE.md
├── README.md
├── config/
│   ├── defaults.yaml
│   ├── labels.yaml
│   └── platforms.yaml
├── docs/
│   ├── compliance-notes.md
│   ├── input-output-spec.md
│   └── usage.md
├── examples/
│   ├── sample-input-evidence.txt
│   ├── sample-output-report.md
│   └── sample-scenes.json
├── prompts/
│   ├── analysis-instructions.md
│   ├── labeling-guide.md
│   └── report-format.md
├── schemas/
│   ├── analysis-report.schema.json
│   ├── scene-labels.schema.json
│   └── toc.schema.json
└── templates/
    ├── report.md.j2
    ├── scene-table.md.j2
    └── summary.md.j2
```

## 角色分工

- `SKILL.md`：唯一 Gxgen skill 入口，定义触发条件、证据等级、输出合同和运行边界。
- `config/`：标签、平台和输出结构偏好，帮助 Agent 保持分析口径一致。
- `docs/`：详细使用方法、输入输出规范和合规边界。
- `prompts/`：主分析提示、标签判断规则和报告格式。
- `schemas/`：结构化输出参考合同。
- `templates/`：Markdown 报告、摘要和场景表模板。
- `examples/`：校准样例，用于理解输出形态，不作为效果承诺。

## 运行边界

本 skill 的公开入口由方法说明、提示、schema、模板和样例组成。以下目录不属于本 skill 的运行资产：

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- 自动下载、自动转写、自动 OCR、自动解析外部平台视频的实现

如果某个迁移候选 skill 的核心价值必须依赖这些资产才能完成，应先登记为代码执行候选能力，不要直接归入 public business skill。

## 使用方式

1. 先读 `SKILL.md`，确认任务是否属于视频分析。
2. 按任务类型读取 `docs/usage.md` 或对应 `prompts/` 文件。
3. 需要稳定字段时参考 `schemas/`。
4. 需要统一文本交付格式时参考 `templates/`。
5. 输入证据不足时先标注证据等级，不补造视频内容。
