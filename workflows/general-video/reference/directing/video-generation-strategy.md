# Video Generation Strategy — 分组与生成策略

## Activate When

- 需要把已确认的 Shot Plan / clip groups 编译成 Visual Gen work items。
- 需要判断连续 beats 是否合组、哪些 refs 进入当前 item，以及如何把动作和时间轴写入最终 prompt。

工具能力、字段和模型选择仍以 `video-generation-spec.md`、Stage Execution Plan 和 runtime manifest 为准。

## Decision Test

相邻 beats 在地点 / 时间、主体身份、动作、refs、声音和目标时长上兼容时，优先一个 continuity-first clip group。以下情况拆成相邻 work items：

- 场景或时间硬切。
- 起止状态、风格来源或 refs 互相冲突。
- 用户明确要求蒙太奇、独立 clips 或精确顺序。
- 动作、对白、信息密度或当前能力超出一个 item 的可执行范围。

不要按脚本行数、固定镜头数或旧模型默认时长机械分组。

## Work-item Compilation

每个 item 至少携带：

- stable `id`、source range、sequence index 和目标时长。
- 本组叙事 / 信息目的、可见动作链、start / end continuity state。
- 有序 refs 及每个 ref 锁定的身份、空间、风格、状态或声音事实。
- camera / viewpoint、内部切换理由、对白 / VO 原文和 audio approach。
- 当前 stage 的 `execution_locks` 由 Stage 统一承载；item 只记录自身的 capability requirements 和 post handoff 事实，不在每个 item 或 prompt 重复画幅、分辨率或 vendor/model lock。

Planner 直接写 ready-to-generate 的最终 prompt。Prompt 按执行顺序描述开场状态、动作过程、环境变化、镜头路径、声音和结束状态；每个故事 beat 都把本组要传达的新事件、关系或信息落实为可见行动或可听文本，不能只写人物、场景、氛围和运镜。需要语言才能成立时写入逐字对白/旁白、说话者和对方反应；无对白时用动作及其结果形成可读因果。不要把长篇静态资产描述重复进 prompt，也不要让 Executor 二次改写或猜测。

## References and Timing

- prompt 中的“图 1 / 图 2 / video 1”与 `refs` 保持同序；需要声音身份时，短音色参考作为唯一 audio ref 单独标注 role。完整 VO、旁白和替换音轨留给 Post，不进入 Visual Gen refs。
- 首帧 / 尾帧只在对应状态真正影响生成时携带；前一 item 的结果不是无条件 reference。
- 目标时长服从 stage 的 `max_generated_clip_duration_s` 和能力上限，超限时拆成有连续说明的相邻 item；不默认统一生成再裁切。
- 独立 video items 默认可并行；同 Stage 输出依赖或必须等待前一结果时串行，并记录原因。

## Audio and Post

- 所选路径原生生成对白 / 环境声时，将批准文本和 audio approach 写在同一 video item；独立 VO、BGM、stems 或 replacement track 由 Audio Stage 处理。
- 不把 BGM、字幕、画面文字或固定 negative boilerplate 自动塞进每个 prompt；只执行用户或已批准计划中的内容。
- Post 根据当前 runtime refs 的绝对路径执行 concat、trim、mix；仅用户明确要求时执行字幕/画面文字或其它对应的确定性操作。

## Review

- 分组理由、refs、动作、对白、时长、声音和结尾状态完整。
- prompt 能独立执行，且每个 ordered ref 都有实际贡献。
- 相邻 item 的身份、空间、光线、动作和声音连续；失败时只修受影响维度或拆出冲突 beat。

## Boundaries

本卡不固定 Seedance、15 秒、串行生成、候选列表或 vendor 参数；执行契约以 `video-generation-spec.md` 和当前能力为准。
