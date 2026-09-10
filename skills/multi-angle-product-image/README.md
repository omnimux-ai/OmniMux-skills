# 多角度产品图能力包

本目录是 Gxgen 的多角度产品图 skill 包。它把单个商品的参考图、结构描述和展示目标整理成可复盘、可交接、可执行的多视角规划结果。

## 目录结构

```text
multi-angle-product-image/
├── SKILL.md
├── PUBLICATION-GOVERNANCE.md
├── README.md
├── assets/
│   ├── angle-checklist.md
│   ├── naming-convention.md
│   └── sample-views/
├── docs/
│   └── usage.md
├── examples/
│   ├── input-multi-reference.json
│   ├── input-single-product.json
│   ├── output-angle-plan.json
│   └── output-generation-prompts.md
├── prompts/
│   ├── angle-generator.md
│   ├── consistency-rules.md
│   ├── negative-prompts.md
│   ├── planner.md
│   └── system.md
├── schemas/
│   ├── input.schema.json
│   ├── output.schema.json
│   ├── plan.schema.json
│   └── shot.schema.json
└── templates/
    ├── angle-plan.md
    ├── preview-contact-sheet.md
    ├── prompts.json
    └── prompts.md
```

## 角色分工

- `SKILL.md`：唯一 Gxgen skill 入口，定义触发条件、任务模式、输出合同和运行边界。
- `docs/`：详细使用方法和目录导航。
- `prompts/`：规划、多角度一致性和提示词拆解规则。
- `schemas/`：结构化输入与输出参考合同。
- `templates/`：角度计划、提示词清单和预览联系表模板。
- `examples/`：校准样例，用于理解输出形态，不作为效果承诺。
- `assets/`：检查清单、命名规范和角度说明参考。

## 运行边界

本 skill 的公开入口由方法说明、提示、schema、模板、样例和静态参考组成。

如果某个迁移候选包的核心价值必须依赖代码执行、适配器、工作流编排或隐藏运行依赖，应该先分类为代码执行候选能力，不要直接归入当前公开业务 skill。
