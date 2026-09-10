# 图片参考改编能力包

本目录是 Gxgen 的 `image-recreation` skill 包。它面向“有参考图、但不能直接照搬”的图片任务，把参考图里的商业视觉方法拆出来，再翻译成适合用户自己产品的原创画面方案。

## 目录结构

```text
image-recreation/
├── SKILL.md
├── PUBLICATION-GOVERNANCE.md
├── README.md
├── config/
├── docs/
├── examples/
├── prompts/
├── schemas/
└── templates/
```

## 角色分工

- `SKILL.md`：唯一 Gxgen skill 入口，定义触发条件、输出合同和运行边界。
- `config/`：静态偏好、批量角色建议和平台关注点。
- `docs/`：使用方式、输入输出规范、交付格式、合规和质检规则。
- `prompts/`：参考图拆解、提示词写法、一致性和负向约束 guidance。
- `schemas/`：结构化输出参考合同。
- `templates/`：Style Bible、改编计划、交付说明和清单模板。
- `examples/`：样例 brief，用于校准输入形态，不代表效果承诺。

## 运行边界

本 skill 的公开入口由方法说明、提示、schema、模板、样例和静态配置组成。它不把脚本、工作流、适配器、导出成果或来源审计记录当作运行前提。

如果未来某个版本必须依赖代码执行、固定工具顺序或外部副作用才能完成核心价值，那应该单独治理为代码执行候选能力，而不是继续挂在这个公开业务 skill 名下。
