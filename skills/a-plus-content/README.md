# A+ 内容能力包

本目录是 Gxgen 的 A+ 内容 skill 包。它负责把产品信息、卖点、品牌调性和目标平台整理成适合商品详情页、品牌故事模块、对比模块、参数模块和视觉提示词交付的内容包。

## 目录结构

```text
a-plus-content/
├── SKILL.md
├── PUBLICATION-GOVERNANCE.md
├── README.md
├── config/
│   ├── constraints.yaml
│   ├── defaults.yaml
│   ├── layouts.yaml
│   └── styles.yaml
├── docs/
│   ├── compliance-notes.md
│   ├── input-output-spec.md
│   └── usage.md
├── examples/
│   ├── export-package/
│   ├── generation-prompts.json
│   ├── image-set-plan.json
│   ├── product-brief.full.json
│   └── product-brief.min.json
├── prompts/
│   ├── analyzer.md
│   ├── generator.md
│   ├── planner.md
│   ├── system.md
│   └── writer.md
├── schemas/
│   ├── input.schema.json
│   ├── output.schema.json
│   ├── plan.schema.json
│   └── prompt.schema.json
└── templates/
    ├── brand-story.md
    ├── comparison-table.md
    ├── module-plan.md
    ├── prompt-sheet.md
    └── style-bible.md
```

## 角色分工

- `SKILL.md`：唯一 skill 入口，定义适用场景、输出合同和运行边界。
- `config/`：模块数量、布局偏好、风格预设和风险约束。
- `docs/`：使用方式、输入输出结构和合规说明。
- `prompts/`：分析、规划、文案和视觉提示词的写作指引。
- `schemas/`：结构化输入输出参考合同。
- `templates/`：模块规划、风格说明、品牌故事和提示词交付模板。
- `examples/`：校准样例，用于理解交付形态，不代表效果保证。

## 运行边界

本 skill 的公开入口由方法说明、提示、schema、模板、样例和静态配置组成。它不负责脚本执行、固定阶段机、隐藏工作流 owner、强制工具顺序或图片自动生成。

如果未来某个详情页能力必须依赖脚本、适配器或工作流才能完成核心结果，应先归类为代码执行候选能力，而不是继续塞进当前公开业务 skill。
