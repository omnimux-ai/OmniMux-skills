---
name: video-prompt-generation
description: >-
  视频提示词生成：把已有脚本、分镜、镜头清单或粗糙提示词整理成更适合视频模型理解的 prompt 包。当用户要做模型适配、逐镜头 prompt、负向约束、连续性规则或 prompt 质量诊断时激活。不应激活：从零写脚本、分析现有视频、直接交付视频成片，或把 skill 变成固定流程控制器。
metadata:
  version: "1.0.0"
  author: gxgen-team
  publicationStatus: public
  codeExecutionCore: false
  tags: [video, prompt-engineering, prompt-pack, model-adaptation]
  category: video
---

# 视频提示词生成

视频提示词生成的核心工作，不是替用户重写创意，而是把已经存在的创作输入整理成模型更容易执行的画面指令。

This skill is a public business-methodology skill. Its user-facing contract is the prompt-conversion guidance, output shapes, and support materials in this directory.

## 公开边界

- 只处理已经存在的脚本、分镜、镜头清单、口播画面描述或粗糙 prompt。
- 不承诺自动生成视频、不声称已经调用模型，也不替代公开视频生成入口。
- 不负责从商品信息、链接或一句卖点直接发散成完整创意脚本。
- 本 skill 的公开路径依赖 `docs/`、`prompts/`、`schemas/`、`examples/`、`config/` 和 `references/` 里的静态说明材料。

## 能力包结构

按任务需要读取根目录下的支持材料：

- `references/runtime-guide.md`：先读的轻量入口，帮助判断读哪些文件最有价值。
- `docs/usage.md`：什么时候适合用这套能力包，什么时候该转交别的 skill。
- `docs/input-output-spec.md`：输入字段、输出字段和交付口径。
- `docs/compliance-notes.md`：营销、版权、事实表达和风险边界。
- `docs/prompt-design.md`：提示词组织原则和镜头重写方法。
- `docs/model-adaptation.md`：不同模型偏好的整理方法。
- `prompts/model-mapping.md`：模型适配的写法提示。
- `prompts/output-format.md`：交付结构和字段说明。
- `config/defaults.yaml`：建议假设与字段提示，不是隐藏默认流程。
- `config/models.yaml`：模型差异、推荐结构和常见风险。
- `config/safety-guidelines.yaml`：高风险表达和改写方向。
- `schemas/*.schema.json`：结构化输入输出参考合同。
- `examples/`：输入和输出样例，用于校准结果形态。

## 适用场景

- 用户已经有脚本，想改成 `generic`、`Sora`、`Veo` 或 `Seedance` 风格提示词。
- 用户已经有分镜或镜头清单，想把执行描述压缩成模型可读 prompt。
- 用户已经有粗糙 prompt，想补齐主体、动作、镜头、时长、风格和约束。
- 用户要同一内容的多模型版本，便于后续比对和微调。
- 用户要检查 prompt 是否冲突、太空、太散，或者超出模型常见承载方式。

## 不适用场景

- 用户还没有脚本或画面方案，只想从零想创意。
- 用户只要分析现有视频、拆竞品、提口播或复盘结构。
- 用户要完整分镜规划、镜头表或拍摄排期，而不是 prompt 转换。
- 用户要直接交付视频成片或要求你声称已经完成模型生成。

## 输入合同

至少要有一份现成创作输入：

- 脚本
- 分镜
- 镜头清单
- 粗糙 prompt
- 口播加画面说明

能补充就补充：

- 目标模型
- 时长和比例
- 风格方向
- 必保留项
- 避免项
- 连续性要求
- 合规限制

## 任务模式

| 模式 | 用户目标 | 优先读取 | 停止边界 |
| --- | --- | --- | --- |
| `normalize-input` | 先把原始素材整理成稳定输入 | `docs/input-output-spec.md`、`config/defaults.yaml` | 不把缺失创意补造成完整脚本 |
| `prompt-pack` | 输出可直接使用的 prompt 包 | `docs/prompt-design.md`、`prompts/output-format.md` | 不升级成视频生成任务 |
| `model-adaptation` | 输出指定模型版本 | `docs/model-adaptation.md`、`prompts/model-mapping.md` | 不声称真实模型已验证 |
| `prompt-review` | 检查冲突、歧义、镜头负担和约束缺口 | `docs/compliance-notes.md`、`config/safety-guidelines.yaml` | 不替用户改写成另一种业务任务 |

## 输出合同

默认输出以下部分；信息不足时保留标题并说明假设：

1. **优化后提示词**：可直接复制使用的主 prompt。
2. **提示词拆解**：主体、场景、动作顺序、镜头重点、风格逻辑和模型适配说明。
3. **建议避免项**：当前任务最相关的失败风险、画面错位或表达风险。
4. **补充假设**：如果用户没有给足时长、比例、镜头密度或限制条件，要把采用的假设写清楚。

## 质量检查

- 不把抽象风格词当成主体内容，主体、动作和镜头要先落地。
- 不能擅自新增品牌承诺、产品功效、人物设定或版权敏感素材。
- 逐镜头表达要看得出顺序，不要让模型同时承担互相打架的指令。
- 模型适配只能是写法建议，不等于生成结果承诺。
- 如果输入本质上还是创意空白，要先指出缺口，而不是假装 prompt 已经能稳定落地。

## 运行边界

- 本 skill 只提供方法说明和输出口径，不得强制 workflow、固定阶段机、固定下一步动作或隐藏 completion gate。
- 是否调用公开视频生成能力，取决于用户是否明确要求生成，以及当轮可见能力是否真的支持。
- 如果输入缺失，只问会改变结果的最小澄清问题；否则声明假设并继续。
- 区分创意开发、分镜规划、prompt 转换、视频分析和视频生成，不要混成一条隐藏流程。
