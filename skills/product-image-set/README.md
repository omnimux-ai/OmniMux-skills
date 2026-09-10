# 商品套图能力包

本目录是 `product-image-set` 的公开 skill 包。它服务的不是“出一张图”，而是把一组商品图拆成清晰的商业分工：哪张负责点击，哪张负责解释卖点，哪张负责建立信任，哪张负责消除疑虑。

## 目录结构

```text
product-image-set/
├── SKILL.md
├── PUBLICATION-GOVERNANCE.md
├── README.md
├── config/
│   ├── resolutions.json
│   └── safety-rules.json
├── docs/
│   ├── compliance-notes.md
│   ├── export-guide.md
│   ├── naming-conventions.md
│   └── usage.md
├── examples/
│   ├── sample-input.json
│   ├── sample-output.json
│   └── sample-style-bible.md
├── prompts/
│   ├── generation.md
│   ├── intake.md
│   ├── planning.md
│   ├── qa.md
│   └── system.md
├── schemas/
│   ├── input.schema.json
│   ├── output.schema.json
│   ├── shot-plan.schema.json
│   └── style-bible.schema.json
└── templates/
    ├── comparison-chart.md
    ├── detail-closeup.md
    ├── end-card.md
    ├── feature-callout.md
    ├── hero-image.md
    ├── lifestyle-scene.md
    └── spec-sheet.md
```

## 角色分工

- `SKILL.md`：唯一运行入口，定义触发条件、输出合同和边界。
- `docs/`：使用方法、合规提醒、导出和命名建议。
- `prompts/`：输入收集、套图规划、单图说明和质检提示框架。
- `schemas/`：结构化输入输出参考。
- `templates/`：单图类型模板，帮助稳定每张图的职责表达。
- `examples/`：样例输入输出，用于校准形态，不代表效果承诺。
- `config/`：尺寸偏好与公开风险规则。

## 运行边界

这个包的核心价值来自业务方法、提示、结构约束和样例，不来自脚本、测试、适配器或工作流执行。如果未来有人要把它做成依赖代码执行的能力，应该重新分类，而不是继续沿用这个公开 skill 包。
