# Video Generation Strategy — 视频生成策略

## Activate When

需要把已确认的 shot / clip group 和 refs 编译成视频生成 work item，并记录 text-to-video、image-to-video、首尾帧、多参考或原生音视频路径所需的能力事实时读取。

## Decision Test

根据画幅、时长、音频、refs 和连续性要求确定所需的输入/输出路径；planner 不在本卡选择 concrete vendor/model：

| 路径 | 适用判断 |
|---|---|
| Text-to-video | 无需锁定特定主体，概念、环境或效果可由文字稳定表达 |
| Single-frame I2V | 起始构图重要，动作幅度有限或可从一帧自然展开 |
| First/last frame | 起止姿态、构图或状态都需要明确控制 |
| Multi-reference / multimodal | 身份、产品、场景或动作阶段需由多种视觉来源共同锚定；声音通过 prompt/audio approach 描述 |
| Grouped audio+video | 相邻 beats 可连续生成，且对白/环境声希望原生同步 |

不要按文件名或旧模型习惯锁定 vendor；能力不足时调整 refs、简化动作、拆组或把声音转后期。

## Work-item Inputs

每个 work item 写清以下字段，并写出最终 `prompt`：

- logical id、source range、sequence index。
- 叙事/信息目标、`continuous_visual_action` 和目标时长。
- refs 及其 role；首帧、尾帧、身份、场景和风格来源分开说明。
- start/end continuity state。
- `cut_reason`、内部视点变化及其可见/可听证据。
- audio approach，以及需要保留的对白/旁白原文和画面文字。完整独立 VO 的时序与内容作为 Post 音轨规划，不作为本 work item 的 audio reference；audio ref 仅表示短音色身份参考。
- 会影响路径选择的 hard capability requirements。
- 当前 stage 的画幅和分辨率 locks。
- 仅把本节规则编译进命中 Decision Test 的 item。

不要把设定卡直接当成真实首帧；首帧应是该 clip 的起始画面。设定卡可以作为身份或结构 reference。

## Prompt Authoring

Planner 读取本节并编译最终 prompt。最终 prompt 描述：

1. 起始画面中的主体、空间、光线和动作状态。
2. 动作、表演和环境变化的连续过程。
3. 摄影机路径、速度变化、内部切换及其证据。
4. refs 分别锚定的事实与允许变化的维度。
5. 对白、旁白、环境声或静音意图。
6. 结束前如何完成动作并落到可承接的状态。

不要把 work item 的 `id`、`name`、source 文件名或 Stage 名称写进 prompt；这些只用于 plan / runtime 绑定，不属于模型可见创作内容。

当输入包含已确认的 storyboard 或 visual plan 时，最终 prompt 还必须显式编译组内镜头时间轴：每个时间段从 `0s` 起算，写出该段的景别/构图、主体动作或状态变化、镜头运动、信息功能和声音/旁白窗口。时间段应覆盖整个 work item，不能用一段无切点的概念描述替代；对应 storyboard 的 source range、sequence index 和 refs 必须保持一致。不同 driver 的 timing 来源可以不同，但都必须在 prompt 中可追溯。

当路由落到 MiniMax H3 时，prompt 里的时间轴还必须继承 Shot Plan 的镜头目的与景别：建立和行动之外，情绪或信息落点必须用近景、特写或局部特写呈现。同一主体相邻镜头至少跨一个景别，且需要写清机位或视角变化；若是连续看同一主体，前后镜头的角度差应保持在 30° 到 90° 之间，避免只换文字不换画面关系。

真人写实 H3 item 在人物清晰可见时，先编译画面锐利细节、自然哑光肤质、正常肤色、浅景深、大光圈和电影摄影质感；再按 `photoreal-skin.md` 补充当前镜头实际可见的皮肤、光线、表演或物理细节。

使用正向、可视、可听语言；外观由 refs 承载时减少重复。时长分段跟随动作节奏，不用固定字段模板限制创作。

## Clip Group vs Separate Clips

相邻 beats 在空间、主体、动作、refs 和声音上兼容时，优先一个 continuity-first clip group。以下情况再拆：

- 场景或时间硬切。
- 起止 refs 或风格来源冲突。
- 需要刻意蒙太奇而 vendor 无法在 clip 内可靠完成。
- 动作、对白或目标时长超过当前能力。
- 用户明确要求独立 clips。

逐镜生成是可选的独立 work item 策略；组内的时间化镜头规划在有 storyboard / visual plan 时是必需的，不得因为采用 continuity-first clip group 而省略。

## Motion Design

动作幅度大时可以提供首尾状态、多阶段 refs 或拆成可闭合的动作段；先降低单个 work item 的冲突目标，再考虑增加 refs。手部精细操作、快速群体动作、结构变形和正脸大幅口型需要更清楚的阶段与失败回退。

## Continuity and Post

后一 work item 引用前一结果时，明确承接的是构图、动作、光线、身份还是声音，不把前一尾帧当作无条件必传。生成时长与计划不一致时，根据内容完整性选择裁切、调整后续时间线、延长 hold 或重生；不默认只裁尾部。

## Review

检查最终 prompt 是否覆盖完整动作、每个 ref 的作用、身份与产品稳定、声音策略、可用结束状态和内部切换；检查关键情绪或信息落点是否已按 Shot Plan 落到近景、特写或局部特写；真人写实 H3 item 检查成像基线和当前镜头细节是否完整。返修只改变失败维度，保留用户满意的构图、动作和声音。
