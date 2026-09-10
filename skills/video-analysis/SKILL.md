---
name: video-analysis
description: >-
  视频分析：把短视频、竞品视频、口播视频或用户提供的转写、截图、关键帧、逐镜头描述拆成结构、镜头、口播、字幕、节奏、卖点、证据、情绪和平台适配判断。当用户要求拆解视频、提取口播/镜头/结构、复盘竞品、分析带货说服机制，或为后续脚本/分镜/复刻准备分析材料时激活。不应激活：直接生成视频成片、只写新脚本不需要参考分析、只做图片/图文创作、剪辑已有素材，或用户只给 URL 但要求你声称已看过完整视频。
metadata:
  version: "1.0.0"
  author: gxgen-team
  publicationStatus: public
  codeExecutionCore: false
  tags: [video, analysis, structure-breakdown, evidence-led]
  category: video
---

# 视频分析

视频分析的目标是把“看起来有效”拆成可复用的结构证据：谁被吸引、为什么继续看、相信了什么、最后被推向什么行动。

This skill is a public business-methodology skill. Its user-facing contract is the analysis guidance, evidence rules, output shapes, and support materials in this directory.

## 公开边界

- 只基于当前对话中可见的视频内容、用户提供的转写、截图、关键帧、逐镜头描述、标题、评论摘录或摘要做分析。
- 不承诺自动下载、自动转写、自动 OCR、自动读取外部平台视频，也不声称看过无法访问的内容。
- 本 skill 的公开路径不把 `scripts/`、`tests/`、`workflows/` 或 `adapters/` 作为完成任务的前提。
- 不负责直接生成视频成片、图片、剪辑工程、模型参数执行或平台发布。

## 能力包结构

按任务需要读取根目录下的支持材料：

- `docs/usage.md`：如何用这套能力包完成视频分析。
- `docs/input-output-spec.md`：输入证据、分析中间结构和输出字段约定。
- `docs/compliance-notes.md`：版权、营销、隐私和证据边界。
- `prompts/analysis-instructions.md`：分析任务的主提示框架。
- `prompts/labeling-guide.md`：视频片段标签判断规则。
- `prompts/report-format.md`：Markdown 报告组织方式。
- `config/defaults.yaml`：推荐输出章节和标签偏好，不作为运行时默认事实。
- `config/labels.yaml`：标签枚举和常见信号。
- `config/platforms.yaml`：平台识别线索和分析关注点。
- `schemas/*.schema.json`：结构化输出参考合同。
- `templates/*.j2`：报告、摘要和场景表的文本版交付模板。
- `examples/`：校准样例，不代表效果保证。

## 证据等级

分析前先判断你实际拥有哪种证据，并在输出中标注限制：

| 等级 | 输入 | 可做结论 | 不可声称 |
| --- | --- | --- | --- |
| `raw-video` | 已上传视频、可见帧、可读音频或用户明确提供的完整视频内容 | 可做逐段结构、画面、口播、字幕和节奏分析 | 不可补造未看到的镜头或台词 |
| `transcript-plus-frames` | 转写 + 截图/关键帧 | 可分析口播结构、信息顺序和部分视觉策略 | 不可判断完整剪辑节奏或全部画面变化 |
| `transcript-only` | 仅转写、字幕或口播文本 | 可分析脚本结构、说服机制和 CTA | 不可判断画面、镜头、演员表现或剪辑节奏 |
| `summary-only` | 用户摘要、标题、评论、商品信息 | 可做假设型复盘和待验证清单 | 不可当成视频事实 |
| `url-only` | 只有链接且当前无法访问内容 | 只能说明需要补充视频、截图或转写，并给出分析框架 | 不可声称已观看、已转写或已拆解该视频 |

## 任务模式

| 模式 | 用户目标 | 优先读取 | 停止边界 |
| --- | --- | --- | --- |
| `structure-breakdown` | 看清视频为什么能让人看下去 | `prompts/analysis-instructions.md`、`config/labels.yaml` | 不写成新脚本 |
| `shot-and-audio` | 提取镜头、画面、口播和字幕 | `docs/input-output-spec.md`、`prompts/labeling-guide.md` | 不补造未提供的画面 |
| `commerce-analysis` | 拆带货或转化机制 | `prompts/labeling-guide.md`、`docs/compliance-notes.md` | 不承诺真实销量或平台效果 |
| `platform-fit` | 判断是否适合 TikTok/Reels/Shorts/小红书等平台 | `config/platforms.yaml`、`docs/compliance-notes.md` | 不替代平台审核或投放结论 |
| `handoff-summary` | 给后续脚本、分镜、复刻或提示词使用 | `prompts/report-format.md`、`templates/summary.md.j2` | 不直接生成成片或执行工具 |

## 输出合同

默认输出以下部分；输入不足时保留标题并说明缺口：

1. **分析范围**：输入证据等级、用户目标、不能确认的内容。
2. **视频摘要**：一句话说明视频主题、受众和主要动作。
3. **分段拆解表**：时间段/段落、画面或文本、声音或字幕、传递信息、这一段的作用。
4. **关键机制**：钩子、卖点、证明、异议处理、情绪推进、CTA。
5. **观察 vs 推断**：把可直接看到/读到的事实和基于经验的判断分开列出。
6. **可复用结构**：适合迁移到脚本、分镜、提示词或复刻任务的结构。
7. **风险与限制**：版权/原创性、平台适配、证据不足、不可复用内容。
8. **后续交接**：如果用户继续要脚本、分镜、复刻或提示词，下一步需要补什么输入。

## 质量检查

- 分析必须区分事实观察和推断。
- 不能只写感受，要说明每段对观看或转化的作用。
- 如果缺少视频原始内容，必须标注输入限制。
- 分析结果应能被后续脚本或复刻任务直接使用。
- 不要把 `url-only` 当成已观看视频；先要求补充可分析内容或只输出框架。
- 引用台词、字幕或画面细节时，必须来自用户提供内容或可见素材。
- 复盘竞品时只提炼结构、节奏和说服机制，不复制品牌表达、人物身份或受版权保护的独特创意。

## 运行边界

- 本 skill 只提供上下文，不得强制 workflow、固定阶段机、provider 路由、工具选择或完成门禁。
- 是否调用通用工具取决于当前用户请求、输入完整度、权限和工具 schema；skill 不能把推荐步骤编译成 required-next tool。
- 如果输入缺失，只问会改变输出的最小澄清问题；否则声明假设并继续。
- 区分分析、创作、转换、变体规划和交付移交；不要在用户只要求分析时升级成生成任务。
