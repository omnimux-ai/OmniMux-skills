---
name: image-recreation
description: >-
  图片参考改编：拆解参考图、竞品图或图片链接中的商业视觉逻辑，并迁移为用户自己产品的安全改编策略、变体方案、Style Bible 或图片生成 prompt。当用户要求参考图改版、产品图复刻、竞品视觉拆解后做原创化图片方案，或批量图片风格统一时激活。不应激活：自由图片生成、信息图、多页图文、视频复刻，或要求像素级复制他人品牌资产。
metadata:
  version: "1.0.0"
  author: gxgen-team
  publicationStatus: public
  codeExecutionCore: false
  tags: [image, recreation, product-visual, ecommerce, prompt-engineering]
  category: content-generation
---

# 图片参考改编

图片参考改编的核心不是“像不像原图”，而是先拆出参考图真正有效的商业方法，再把它翻译成适合用户自己产品、自己品牌和自己平台场景的原创画面方案。

This skill is a public business-methodology skill. Its public contract is the analysis method, adaptation rules, prompt guidance, schemas, templates, and examples in this directory.

## 公开边界

- 只基于当前对话可见的参考图、用户提供的图片描述、商品信息、品牌约束和平台目标做分析与改编规划。
- 可以输出参考图拆解、安全改编策略、批量分工、Style Bible、提示词草案和人工执行说明。
- 不承诺像素级复刻、品牌同款复制、未提供内容的视觉细节推断，或对外部链接做隐式读取。
- 本 skill 的公开路径只依赖方法说明、提示、schema、模板、样例和静态配置，不依赖脚本、工作流、适配器或导出产物目录。

## 适用场景

- 用户有参考图、竞品图、图片链接或清晰视觉描述。
- 用户想把参考图改成自己的产品、自己的品牌或自己的平台素材，并降低混淆风险。
- 用户需要批量图片风格统一、安全改编策略、生成提示词或 Style Bible。

## 不适用场景

- 用户只是自由生成普通图片，没有参考图或参考描述。
- 用户要求原样复制竞品 logo、包装、人物身份或独特广告创意。
- 用户要做视频复刻、信息图或长图文详情页。

## 输入要求

- 至少提供参考图、参考图描述或清晰的视觉目标说明之一。
- 补充用户产品信息、产品图、品牌调性、平台目标和禁止项时，输出会更稳定。
- 如果要做批量图组，最好说明每张图承担什么角色。

## 任务模式

| 模式 | 用户目标 | 优先读取 | 停止边界 |
| --- | --- | --- | --- |
| `reference-analysis` | 先看清参考图为什么有效 | `prompts/analysis-instructions.md`、`docs/input-output-spec.md` | 不直接跳成出图执行 |
| `safe-adaptation` | 判断哪些能借、哪些必须换 | `docs/safety-and-originality.md`、`docs/compliance-notes.md` | 不保留可混淆品牌表达 |
| `prompt-pack` | 产出可执行提示词和负向约束 | `prompts/prompting-guide.md`、`prompts/negative-guidance.md` | 不把提示词写成品牌复制说明 |
| `style-bible` | 为批量图组沉淀统一规则 | `prompts/style-consistency.md`、`config/defaults.yaml` | 不让每张图都变成不同系列 |
| `human-brief` | 交给设计、拍摄或人工改图同学执行 | `docs/output-formats.md`、`templates/delivery-note.md.j2` | 不假装已经生成最终图片 |

## 输出合同

默认输出以下部分；输入不足时保留标题并说明缺口：

1. **任务摘要**：用户目标、输入证据、主要限制。
2. **参考图拆解**：构图、光线、主体关系、卖点表达、平台适配。
3. **安全改编策略**：哪些可以迁移，哪些必须替换，用户产品如何接管主角位置。
4. **执行方案**：单张方案、批量分工、Style Bible 或人工执行 brief。
5. **提示词或画面说明**：主提示、负向约束、变体差异、人工执行重点。
6. **风险与限制**：原创性、合规、证据不足、平台误导风险。

## 质量检查

- 必须先说明参考图为什么有效，再写生成提示词。
- 必须把用户产品放回主角位置。
- 不得保留会造成竞品混淆的标识、包装、独特道具、人物身份或广告创意。
- 不得暗示未经提供的功效、成分、认证、前后对比结果或平台背书。
- 批量任务必须有统一规则和每张图分工。

## 能力包结构

按任务需要读取根目录下的支持材料：

- `docs/usage.md`：如何使用这套能力包完成单张或批量参考改编。
- `docs/input-output-spec.md`：输入字段、分析结果和结构化输出约定。
- `docs/compliance-notes.md`：知识产权、品牌混淆、人物形象和广告表达边界。
- `docs/output-formats.md`：不同交付形态的建议结构。
- `prompts/analysis-instructions.md`：参考图拆解框架。
- `prompts/prompting-guide.md`：提示词组织方式与变体控制规则。
- `prompts/negative-guidance.md`：负向约束写法。
- `prompts/style-consistency.md`：多图统一规则。
- `config/*.yaml`：静态偏好、平台笔记和批量角色建议。
- `schemas/*.schema.json`：结构化输出参考合同。
- `templates/`：交付文档模板。
- `examples/`：校准样例，不代表效果保证。

## 运行边界

- 本 skill 只提供上下文，不得强制 workflow、固定阶段机、provider 路由、工具选择或完成门禁。
- 是否调用通用工具取决于当前用户请求、输入完整度、权限和工具 schema；skill 不能把推荐步骤编译成 required-next tool。
- 如果输入缺失，只问会改变输出的最小澄清问题；否则声明假设并继续。
- 区分分析、创作、转换、变体规划和交付移交；不要在用户只要求分析时升级成生成任务。
