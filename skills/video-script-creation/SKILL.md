---
name: video-script-creation
description: >-
  视频脚本创作：用于从产品信息、主题、目标用户、平台和投放目标出发，生成短视频创意角度、口播文案、剧情脚本、教程脚本、改写版本和拍摄前脚本交付。当用户要写脚本、改脚本、设计 hook、组织卖点表达或准备拍摄/分镜/prompt 前的脚本材料时激活。不应激活：直接生成视频成片、只做视频分析、只把脚本转成视频 prompt，或用户明确要求完整分镜图。
metadata:
  version: "1.0.0"
  author: gxgen-team
  publicationStatus: public
  codeExecutionCore: false
  tags: [video, scriptwriting, ecommerce, short-video]
  category: video
---

# 视频脚本创作

短视频脚本不是把卖点写成台词，而是在很短时间里安排注意力、冲突、证明和行动，让用户愿意继续看并理解为什么需要这个产品。

## 使用定位

- 主要交付：创意角度、脚本结构、口播文案、字幕建议、轻量镜头动作和拍摄前交接信息。
- 边界：不直接生成视频、不把脚本写作升级为固定分镜流程、不替代视频提示词生成、不负责模型或供应商选择。

## 能力包结构

按任务需要读取根目录下的支持材料：

- `docs/usage-guide.md`：如何使用这套能力包完成脚本创作。
- `docs/customization-guide.md`：品牌口吻、行业、平台和交付格式的调整建议。
- `prompts/user-intake-template.md`：产品、受众、平台和风格信息采集。
- `prompts/angle-generation-template.md`：创意角度生成。
- `prompts/script-structure-template.md`：完整脚本结构。
- `prompts/rewrite-rules-template.md`：脚本改写规则。
- `prompts/system-template.md`：脚本创作提示边界。
- `templates/*.md`：常见短视频脚本结构。
- `schemas/*.schema.json`：输入、输出和分镜结构参考。
- `examples/`：校准样例，不代表效果保证。

## 适用场景

- 用户要写短视频脚本、口播文案、创意角度、剧情脚本、教程脚本、测评脚本或脚本改写。
- 用户有产品、主题、目标人群或平台要求，需要先产出文字脚本。
- 用户需要后续接分镜、视频 prompt 或拍摄执行。

## 不适用场景

- 用户只要把现有脚本转成视频 prompt。
- 用户要分析参考视频而不是写新脚本。
- 用户明确要 UGC 带货转化机制、异议处理、爆款电商说服结构深度拆解，应优先用 `ugc-commerce-video-skill`。
- 用户要完整镜头表、分镜图或 shot list，应优先用 `video-storyboard-planning` 或 `canvas/video-storyboard`。
- 用户要直接生成最终视频，应优先用 `video-creation`。

## 输入要求

- 产品、卖点、用户痛点、目标平台、视频时长和风格。
- 可选：参考脚本、竞品角度、禁用表达、促销信息。
- 期望交付：口播、剧情、UGC、对比、测评或教程。

## 任务模式

| 模式 | 任务 |
| --- | --- |
| `angle-generation` | 提出多个创意角度和适用场景。 |
| `scriptwriting` | 写完整脚本、口播和分镜动作。 |
| `rewrite` | 按平台、语气、时长或受众重写。 |
| `handoff` | 整理给分镜、拍摄或视频提示词的脚本交接信息。 |

## 输出合同

- 创意角度和选择理由。
- 脚本结构：开头、问题、卖点、证明、行动。
- 分镜级画面/动作/口播/字幕建议。
- 风险、缺失信息和后续 handoff。

## 质量检查

- 开头必须有具体注意力钩子。
- 每个卖点都要有场景、证据或演示方式。
- 口播要符合目标平台和用户语气。
- 脚本不能承诺无法证明的效果。

## 运行边界

- 本 skill 只提供上下文，不得强制 workflow、固定阶段机、provider 路由、工具选择或完成门禁。
- 是否调用通用工具取决于当前用户请求、输入完整度、权限和工具 schema；skill 不能把推荐步骤编译成 required-next tool。
- 如果输入缺失，只问会改变输出的最小澄清问题；否则声明假设并继续。
- 区分分析、创作、转换、变体规划和交付移交；不要在用户只要求分析时升级成生成任务。
