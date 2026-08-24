# Style Consistency — 跨镜视觉系统

## Activate When

多个资产或镜头需要共享一个可识别的视觉系统，且风格漂移会破坏项目连贯性时读取。单个产物、用户要求每段显著变体或参考已经充分约束时可跳过。

## Decision Test

Style 不是 core anchor。先区分：

- 必须不变：主媒介、批准的视觉语言、关键项目调色逻辑、贯穿性的材质 / 光影方式；
- 可以变化：每镜机位、景别、动作、局部光照、叙事色温变化和有意的段落对比；
- 尚未决定：若多个方向会实质改变整片，才向用户确认；否则由 planner 选择并在 brief 中说明。

用户参考是视觉证据。不要把参考图完整翻译成长 prompt，也不要从图片臆测精确色值；用 ref capsule 标记 medium、style、world、composition 等实际贡献。

## Action

建立紧凑 style baseline：

| Field | Meaning |
|---|---|
| Medium | 一个主要媒介或成像方式 |
| Visual grammar | 2-4 个真正影响构图、光、色或材质的信号 |
| Continuity scope | 哪些 stage / shot 默认继承 |
| Variations | 哪些段落允许有意偏离及原因 |

- 源头生成若没有同项目成品 ref，用文字明确 medium 和少量关键视觉信号。
- 下游已有同项目成品 ref 时，让图像承担媒介和细节，prompt 聚焦当前动作与有意变化；不要逐镜复制整段 baseline。
- Per-shot 只写相对 baseline 的差异，例如“同一媒介，高潮段提高对比并加快运动”，不重述所有不变项。
- 同一依赖 batch 需要 vendor/model 一致时，把锁写入 Stage Execution Plan，不在正文写静态模型名。
- 如果用户明确要章节式风格变化，记录每段的切换点和持续范围，而不是强行统一。

## Visual Range

风格连续性不等于画面重复。多组项目继承同一 medium / visual grammar 时，仍必须形成可解释的 visual progression：

- 逐组选择内容真正需要的视觉模式，例如人物与行动、环境与空间、文献与物件、解释图形、过渡与呼吸；这些是判断维度，不是固定清单。
- 相邻组应在主体 / 世界、景别 / 空间层、镜头位置 / 运动、材质 / 光线状态或信息表达方式中形成有意变化；连续复用同一场景、道具、构图和运动时写明叙事理由。
- 长篇纪录片或讲解保持同一 style baseline，但不能让单一桌面、单一物件、同一种浅景深或同一种慢推承担整段内容。
- Production approval 按分镜序列检查章节节奏、视觉重心变化和母题回归；若缩略图只是同一画面的同义改写，先修订 visual progression。

## Review

检查无叙事理由的 medium 漂移、人物 / 场景参考传错、颜色与光照意外跳变、无依据的跨组重复，以及 style prose 是否压过镜头动作。先修 reference binding，再修 baseline、visual progression 或 per-shot diff。

## Boundary

Medium locking 与参考取舍以 Semantic Judgment、medium-drift failure card 和 Stage Execution Plan 为准。本文件不创建 style anchor 资产，不规定 vendor、固定 palette、固定 prompt 尾句或全局禁止词。
