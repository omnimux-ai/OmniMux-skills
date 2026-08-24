# Storyboard Format — 视频执行表与可选逐镜格式

## Activate When

- `narrative` 内容存在故事链，需要在生成视频前审阅 clip groups、画面、时长、refs 和声音设计。
- 用户要求分镜表、逐镜脚本、制作团队交接表，或输入资料本身已经是表格型 storyboard。
- 其它 profile 的 Visual Plan 需要稳定的 source range、镜头顺序、时长、refs 和连续性记录。

普通 brief、教程步骤或没有故事链的轻量画面方案不需要为了格式统一而重写。

## Decision Test

有故事链的 `narrative` 默认把 continuity-first clip groups 写成一份 canvas 视频执行表，一个组对应后续一个 video clip。默认只写组内必要 beats，不要求逐镜拆解；只有用户需要逐镜交接、源资料必须保留表格语义，或硬切 / 多素材需要精确顺序时才扩成逐镜行。

## Canvas Deliverable

每个 scope 物化一个 canvas 文档，命名为「视频执行表 — <scope>」。按稳定 `clip_group_id` 分块；正文只留在该节点，Media-agent 在 `result_review` 时提醒用户审阅，不在聊天中完整回显。

```markdown
## 片段组 <clip_group_id> — <本组 beat / 目的>

- 内容范围：<来源场次、brief 或动作起止>
- 目标时长：<秒数及拆组理由>
- 有序 refs：<ref id + 当前贡献，按 prompt slot 排序>
- audio_approach：<原生对白 / SFX / ambience / 独立音频关系>
- 最终视频 prompt：<可直接写入对应 visual-gen work item 的 prompt>

| 顺序 | 时长 | 景别/机位 | 场景与主体状态 | 画面动作与逐字对白 | 声音 | 连续性 |
|---:|---:|---|---|---|---|---|
```

一个片段组就是后续一个 `visual-gen` work item。表格获接受后，Planner 从该文档编写对应 work items；Executor 不读取 canvas，因此最终 prompt、有序 refs、时长和 `audio_approach` 必须复制进 Stage contract。

## Grouping and Writing

- 同地点、同主体、动作连续、refs 兼容且声音意图一致的相邻 beats 优先合成一个 clip group。
- 场景 / 时间硬切、refs 冲突、刻意蒙太奇、动作或对白超出能力时拆开；不要按每句对白机械拆分。
- 每项开头写主体和当前状态，动作写启动—过程—结果，转场写前一状态如何结束、后一状态如何开始。
- 用户已批准的对白逐字保留；引用图片、视频、音频按稳定 id 和 prompt slot 有序映射。
- 每个组的表格可以保留多个连续 beats，但不把整条故事压成“生成一个视频”这种不可执行目标。

## Review

- 每项都有唯一目的、可追溯来源、目标时长和实际 refs。
- 每个 `clip_group_id` 只对应一个后续 clip，组数、顺序和目标时长可以由表格回算。
- 景别 / 镜头能承载描述，切换带来新信息，动作和对白完整。
- 相邻项的身份、位置、道具、光线、时间和声音状态连续。
- 最终 prompt、有序 refs 和 `audio_approach` 与表格中的可见决定一致。
- 表格仅承载已确认事实和创作决定，没有把未来执行结果写成 placeholder。

## Compilation Contract

当 storyboard 被选为 Visual Gen 的输入时，它是可追溯的镜头规划来源，不只是图片集合。Planner 必须把每个片段组的 source range、顺序、目标时长、连续 beats、起止状态、切点和声音窗口复制到对应 video work item 的最终 prompt。每个片段组至少要能回算出一条连续时间轴；缺少这些字段时，必须先补齐 storyboard，不能直接派发视频生成。

## Boundaries

本卡不新增 storyboard Stage、不强制固定列数或镜头数量、不要求组级线稿，也不替代 `storyboard-discipline.md` 与 Stage Execution Plan 的 work item schema。
