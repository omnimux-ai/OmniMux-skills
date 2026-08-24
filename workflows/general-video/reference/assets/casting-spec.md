# Casting Spec — 出镜主体与角色选定

## Activate When

- `on-camera` 或 `narrative` 任务需要规划可复用的 presenter / character 身份。
- 角色、出镜主体或群像会影响 Brief、Assets、表演和连续性。
- 用户提供的主体资料不足以稳定年龄段、身份、体态、服装或表演边界。

一次性人物、用户已经提供充分的身份 ref，或画面没有人物时跳过。

## Decision Test

先把可见事实与创作选择分开。只有某项选择会改变身份、资产准备方式、角色关系或最终表演时才追问；其余维度由 Planner 提出一个推荐方向。不要把品牌广告的选角流程、受众研究或 vendor 规则带入普通 general-video 项目。

## Casting Dimensions

| 维度 | 应记录的可见事实或选择 |
|---|---|
| 年龄段 | 具体范围或可见成熟度，不用空泛的“年轻” |
| 身份 | 真实从业者、主持人、演员、普通用户或不设定 |
| 体态 | 身高比例、体型、肤色、手部或身体上与行动相关的特征 |
| 气质 | 用眼神、动作幅度、说话方式和行为描述，不只写形容词 |
| 服装 / 装备 | 会跨镜复用的核心服装、设备和可见标记 |
| 表演边界 | 自然、克制、外放、即兴、专业或其它明确行为方式 |
| 人数与关系 | 单人、双人、群像、采访关系或无人意象 |
| 禁区 | 用户明确不接受的身份、姿态、表演或视觉误读 |

现实题材优先让手部使用痕迹、动作熟练度、身体状态和眼神支持身份，而不是只写“看起来专业”。群像中的每个持续身份都要有区分点；关系图不能替代需要跨镜稳定的 per-subject anchor。

## Output

将结果直接写入 `Assets` Stage，不创建单独的角色 / presenter brief 或资产判定 Markdown：

```text
identity / age_range / role
body_and_visible_features
core_outfit_or_equipment
performance_and_voice_intent
relationship_or_screen_presence
allowed_variation / prohibited_drift
evidence_or_source
```

只有下游会复用身份时才升级为 Character / Subject anchor；临时情绪、动作、光线和一次性道具留在 Shot Plan 或 work item prompt。

## Review

- 选定主体与用户输入、参考或 Brief 一致。
- 气质能通过可见行为和表演执行，而不是只靠标签。
- 角色数量、关系和身份差异足以支撑下游 refs 与连续性。
- 不确定的关键身份选择已确认，非关键细节没有制造额外问题。

## Boundaries

本卡不强制性别询问、不生成角色图、不选择模型、不创建额外 Stage；人物参考图生成前如命中角色守卫，再读取 `character-guard.md`。
