---
name: video-model-kling-v3-motion-control
description: >-
  Kling 3.0 Motion Control 视频模型的专业 guidance。当用户选择 Kling Motion Control 或需要参考视频驱动图片角色动作时参考此 guidance，
  用于把参考视频中的人体动作迁移到参考图片主体。
metadata:
  version: "1.0.0"
  author: gxgen-team
  publicationStatus: internal
  codeExecutionCore: false
  governance: ../../model-skill-governance.md
  tags: [video, model-skill, kling-v3-motion-control, motion-transfer]
  category: content-generation
---

# Kling 3.0 Motion Control Model

## Model Guidance Governance

This is internal model-specific guidance, not a public product skill or workflow gate. See [`../../model-skill-governance.md`](../../model-skill-governance.md).


Kling 3.0 Motion Control 是“动作迁移”模型：参考视频提供运动，参考图片提供角色或主体外观。它不是普通 reference-to-video，也不是自由视频编辑器。

## Best-Fit Scenarios (Low Freedom)

优先使用：
- 用户有角色图片，并希望模仿参考视频里的动作
- 参考视频提供人体动作、舞蹈、运动姿态或表演节奏
- 需要保留图片角色身份，同时复制动作轨迹

不优先使用：
- 没有参考视频或没有主体图片
- 只想把视频风格换成另一种视觉风格
- 要多图、多视频、多音频混合参考
- 要对原视频做语义编辑或内容替换

## Model Characteristics (Low Freedom)

公开 Evolink 与 Kling 资料描述该模型用于把 driving video 的 motion dynamics 转移到 reference image。仓库里 provider model 是 `kling-v3-motion-control`，执行器会把图片和视频引用归一到 `image_urls` / `video_urls`，并设置 `model_params.character_orientation`。

## Parameter Boundaries (Low Freedom)

- 必须同时有 1 个主体参考图像和 1 个动作参考视频
- 参考视频应清楚展示动作主体，避免遮挡、多人混乱、快速剪辑
- `character_orientation` 默认应与参考视频主体朝向一致；不确定时先询问或使用合同默认
- 输出时长、质量、最长边等以当前 mode contract 为准
- 参考视频不是“风格素材”，它的主要职责是动作和节奏

## Prompt Style (Medium Freedom)

Prompt 要把两个输入职责分开：
- image 1：角色身份、服装、外观
- video 1：动作、姿态、节奏、身体运动轨迹

推荐写法：
```text
Use image 1 as the character identity and outfit reference. Use video 1 only for the body motion, dance rhythm, and pose timing. Keep the character visible full-body throughout, with a stable camera and no identity change.
```

## Negative Cases (Low Freedom)

- 用 Motion Control 做普通图生视频
- 参考视频里多人同框却不说明跟随谁
- 参考视频只有镜头运动，没有清晰人体动作
- 让模型同时复制动作、场景、服装、风格和声音，没有优先级

## Common Errors

| 错误 | 修正 |
| --- | --- |
| 只有图片就提交 | Motion Control 还需要动作参考视频。 |
| 只写“模仿这个视频” | 说明模仿动作、姿态和节奏，不复制身份或背景。 |
| 多人参考视频无主语 | 指定 video 1 中左/右/中心人物作为动作源。 |
| 把 reference video 当编辑对象 | 如果要改原视频，应换 edit 模型。 |

## Input Examples

```text
Use image 1 as the character identity and outfit. Use video 1's central dancer as the motion source, copying the arm swings, footwork, and timing only. Keep a full-body framing with a stable front camera; do not copy the original video's background or person identity.
```

## Verification

- [ ] 有 1 个主体参考图像
- [ ] 有 1 个动作参考视频
- [ ] prompt 明确图片负责身份、视频负责动作
- [ ] 参考视频主体清晰且动作可迁移
- [ ] 没有把 Motion Control 当普通编辑或风格迁移工具
