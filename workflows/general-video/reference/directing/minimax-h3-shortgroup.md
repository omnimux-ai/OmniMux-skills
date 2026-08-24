# Continuity-first Clip Groups — 连续镜头组

## Activate When

shot plan 含多个相邻 beats，且当前 hard capability requirements 允许把连续动作、视点变化或内部切换作为一个 clip group 交给 executor 复核时读取。单个独立镜头、硬场景切换或明确逐镜生成的任务不需要套用本文件。

## Decision Test

相邻 beats 同时满足以下条件时优先合组：

- 同一地点或可自然连续的空间。
- 主体、服装、道具和 refs 兼容。
- 动作有明确承接，前一 beat 的末态能成为下一 beat 的起态。
- 对白、环境声或音乐意图一致。
- 合组后的时长、refs、音频和信息量可由一个生成路径承载；executor 最终按当前 manifest 复核。

遇到场景/时间硬切、refs 冲突、刻意蒙太奇、对白或动作溢出时拆组。不要按剧本行数或固定镜头数机械分组。

## Group Brief

每个 clip group 记录：

- group id、来源 shot/segment 范围和 sequence index。
- 本组叙事或信息目标。
- 场景、主体、动作流与关键视点变化；若同一主体连续出现在相邻镜头中，必须显式写出至少一个景别切换和可感知的角度变化。
- start continuity state 与 end continuity state。
- 对白/旁白原文、声音意图和预计时长。
- 实际需要的 refs 及每张 ref 的 role。
- 内部切换的理由和可见证据。

## Reference Packing

只携带本组会使用的角色、主体、场景、产品、首尾状态和声音 refs。先写每个 ref 锚定什么，再决定是否加入；重复角色或风格信息不靠增加更多图片解决。数量、格式和音频限制以当前 capability manifest 为准。

## Prompt Authoring

Planner 按自然执行顺序把本节规则编译进当前 work item 的最终 `prompt`：

1. 开场空间、主体位置、光线和声音状态。
2. 连续视觉动作如何启动并推进。
3. 需要的视点、景别或内部切换，以及切换发生的动作/声音证据；同一主体相邻镜头至少跨一个景别，且相邻角度变化应保持在 30° 到 90° 之间。
4. 对白或旁白出现的时机、说话者与可见表演。
5. 动作如何收束，最终构图和状态如何留给后续组。

使用摄影机能看到、麦克风能听到的语言。外观由 refs 锚定时不重复长篇静态描述；不追加固定 negative 墙或固定模板尾句。

## Dialogue and Sound

确认过的对白保持原文。若所选路径原生生成音视频，把说话者、时间和情绪过程写进同一 work item；若采用独立 VO/配音，只记录对齐区间和表演意图。不要因为存在台词就自动新增声音资产或 voice anchor。

## Internal Cuts

同一 clip 内可以连续运镜、重构图或有理由地切换视点。切换必须服务信息、反应或节奏，并保留角色方向、动作阶段和声画连续。用户参考若偏长镜头，则不为展示技巧硬切。

## Review

检查目标是否清楚、动作是否闭合、对白能否完整、refs 是否都被使用、内部切换是否有依据、开头和结尾状态是否可承接。失败时先简化动作或拆出冲突 beat；不默认退化为一镜一请求。
