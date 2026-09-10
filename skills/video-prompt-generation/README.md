# 视频提示词生成能力包

本目录是 Gxgen 的视频提示词生成 skill 包。它把已经存在的脚本、分镜、镜头清单或粗糙 prompt，整理成更适合视频模型理解的 prompt 包。

## 目录结构

```text
video-prompt-generation/
├── SKILL.md
├── PUBLICATION-GOVERNANCE.md
├── README.md
├── config/
│   ├── defaults.yaml
│   ├── models.yaml
│   └── safety-guidelines.yaml
├── docs/
│   ├── compliance-notes.md
│   ├── input-output-spec.md
│   ├── model-adaptation.md
│   ├── prompt-design.md
│   └── usage.md
├── examples/
│   ├── input-script.md
│   ├── input-shotlist.md
│   ├── input-storyboard.md
│   └── output-prompts/
│       ├── generic.md
│       ├── seedance.md
│       ├── sora.md
│       └── veo.md
├── prompts/
│   ├── model-mapping.md
│   └── output-format.md
├── references/
│   └── runtime-guide.md
└── schemas/
    ├── input.schema.json
    ├── model-options.schema.json
    └── prompt-output.schema.json
```

## 角色分工

- `SKILL.md`：唯一 skill 入口，定义触发条件、输出合同和边界。
- `references/runtime-guide.md`：先读的轻量入口，帮助按需取材。
- `docs/`：解释什么时候该用、怎么组织 prompt、输入输出长什么样、哪些表达有风险。
- `prompts/`：模型适配和交付结构提示。
- `config/`：建议假设、模型差异和风险表达清单。
- `schemas/`：结构化输入输出参考合同。
- `examples/`：输入与输出样例，用来校准结果形态。

## 运行边界

本 skill 的公开入口由方法说明、提示、schema、样例和静态配置组成。以下内容不属于这个公开技能包的运行资产：

- 可执行脚本
- 测试夹具和测试逻辑
- 隐藏流程控制
- 自动生成承诺
- 来源采集记录

如果一个后续候选能力必须依赖这些资产才能完成核心结果，就应该归类为代码执行候选能力，而不是继续塞进公开业务 skill。

## 使用方式

1. 先读 `SKILL.md`，确认任务确实属于 prompt 转换。
2. 再读 `references/runtime-guide.md`，判断要拉哪些支持文件。
3. 需要口径时读 `docs/` 和 `prompts/`。
4. 需要字段或结构稳定性时参考 `schemas/` 和 `config/`。
5. 需要校准表达风格时参考 `examples/`。
