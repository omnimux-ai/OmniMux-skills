# Cross-Modal Coordination — 声画与时间协同

## Activate When

一个 general-video 交付同时消费两种或更多模态，例如视频 + 原生音频、画面 + VO、视频 + BGM、人物 anchor + 声音 anchor 或多段素材 + final mix。纯单模态任务跳过。

## Decision Test

为每个 clip / clip group 建立一个共同意图，而不是让视觉、声音和后期各自猜测：

| Dimension | Required decision |
|---|---|
| Visual beat | 谁 / 什么在何处做什么，起止状态是什么 |
| Audible beat | dialogue、VO、SFX、ambience、music 或 deliberate silence |
| Timing | 文本 / 动作 / 音乐在有效时长内的进入、发展与收束 |
| Reference roles | 每个 image / video / audio ref 贡献什么 |
| Audio approach | native audio、standalone VO、preserve、replace、mix 或 silent |
| Assembly | 哪些内容在生成阶段完成，哪些留给 deterministic post |

声画可以同向，也可以有意对位；只要该关系来自用户、source 或批准的创作选择。不要把“情绪一致”误写成所有模态使用相同强度。

## Action

- 把上述决定写进 Stage Execution Plan 的 prompt、refs、source、render、timeline 和 execution locks，而不是散落在多个聊天派单中。
- 说话人物的批准台词保持原文；按真实 / 估算语速核对 clip 容量，留出动作和呼吸空间。估算只用于发现超载，不把固定字速当创作硬门。
- 原生音频视频在 prompt 中写清说话者、台词、表演、环境声和时间意图。
- 独立 VO / dubbing、BGM、voice anchor、stems 和 final mix 的资产形态服从 shared Audio Pipeline。
- 用户提供的音乐床或原声优先作为 source；不要因为 workflow 支持 BGM 就自动替换或重复生成。
- 多 clip 后期明确 preserve / replace / duck / silence；有 VO 时可懂度优先，音乐对位与切点服从已批准 shot / audio intent。
- 音频或视频的实际时长以工具证据为准；偏差先修 plan / trim / mix 决策，不伪造“已同步”。
- 跨镜可用连续 ambience、room tone 或 BGM 作为 sound bridge，但只有内容关系支持时使用。

## Review

检查台词是否装得下、角色与声音 ref 是否对应、原生与独立音频是否重复、用户音乐是否被覆盖、clip 顺序与音频时长是否一致、最终 mix policy 是否明确。

## Boundary

Stage Execution Plan 管执行事实，Audio Pipeline 管音频资产形态，Video Merge 管确定性合成。本文件不规定固定 vendor、固定 WPM、固定音量、旧 agent 协作或额外 gate。
