# 爆款视频复刻能力包

本目录是 Gxgen 的爆款视频复刻 skill 包。它把参考视频里的有效结构拆出来，再迁移成适合用户自己产品、品牌或主题的原创视频方案。

## 目录结构

```text
recreate-viral-video/
├── SKILL.md
├── PUBLICATION-GOVERNANCE.md
├── README.md
├── docs/
│   ├── compliance-notes.md
│   ├── input-output-spec.md
│   └── usage.md
├── examples/
│   ├── sample-analysis.md
│   ├── sample-fit-grade.json
│   ├── sample-input.json
│   └── sample-output-pack.json
├── prompts/
│   ├── analysis-instructions.md
│   ├── fit-grading-guide.md
│   ├── prompt-composition.md
│   └── report-format.md
├── schemas/
│   ├── analysis-report.schema.json
│   ├── fit-grade.schema.json
│   ├── generation-handoff.schema.json
│   ├── input.schema.json
│   └── output-pack.schema.json
└── templates/
    ├── brief.md.j2
    ├── report.md.j2
    └── storyboard.md.j2
```

## 角色分工

- `SKILL.md`：唯一 Gxgen skill 入口，定义触发条件、证据等级、输出合同和运行边界。
- `docs/`：详细使用方法、输入输出规范和风险边界。
- `prompts/`：参考视频拆解、适配度判断、提示词合成和报告组织方式。
- `schemas/`：结构化输入、中间结果和输出包参考字段。
- `templates/`：brief、分析报告和分镜模板。
- `examples/`：校准样例，用于理解输出形态，不作为效果承诺。

## 运行边界

公开入口由方法说明、提示、schema、模板和样例组成。若某个候选能力的核心价值必须依赖脚本、适配器或工作流执行，应该改判为代码执行候选能力，而不是继续放在公开业务 skill 里。

## 使用方式

1. 先读 `SKILL.md`，确认任务是否属于参考视频改编。
2. 按任务类型读取 `docs/usage.md` 或对应 `prompts/` 文件。
3. 需要稳定字段时参考 `schemas/`。
4. 需要统一文本交付格式时参考 `templates/`。
5. 资料不足时先标注证据等级和风险边界，再决定是否继续输出原创方案。
