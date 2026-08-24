---
utility: video-merge
applies_to: [general-video, drama-series, ad-tvc, mv]
---

# Video Merge — final media assembly

> **何时 Read**：多段视频已经生成，需要确定性拼接、保留或替换音频、显式字幕/文字 overlay 或终剪上画布。

## Boundary

Postprocess 只做确定性剪辑操作：reviewable edit / trim / concatenate / scale / preserve or replace audio / subtitle overlay / transcode / final mix。改变人物、场景、动作、画风、镜头内容属于 video generation，不属于本卡。

## Assembly Contract

- 输入视频按 shot/script 顺序进入编辑计划；需要直接渲染成片时优先用 `merge_videos` 做确定性拼接。不要把多段内容重新写成一个生成 prompt。
- Stage Execution Plan 的 post stage 必须包含有序 clip logical refs、明确的 trim/concat/transcode/mix 操作、仅在用户要求时提供的字幕/文字来源、音频策略和最终 output id。输出画幅与分辨率放在 `execution_locks`。
- Review vs render is a hard decision. 用户要求“我看看 / 让我看 / 对不对 / review / inspect”时，必须操作已打开的视频编辑器插件：先按 `<plugin_editing_context>` 的方法目录读取项目状态，再用一次批量 `plugin_agent_invoke` 完成修改。收到 `editor_not_open` 时请用户打开插件节点，不得改成直接渲染。只有显式 final-output work item 才 render/export。
- 分辨率不一致时先选择 `scale_mode`：用户指定优先；否则项目锁定比例/首段视频为准。不要静默拉伸主体。
- 音频策略来自 plan/script：默认保留视频阶段生成的 clip audio；只有明确要求时才替换 VO、叠 BGM 或做静音版。未指定时不额外创作配乐。
- Subtitles/text overlays are explicit opt-in. A selected project workflow may declare a subtitle default settled at intake; that confirmed plan decision counts as requested. Otherwise default final assembly does not burn subtitles; when absent, only concat/trim/transcode, preserve clip audio, and write the final canvas media node. 用户可后续自行添加字幕。When requested, reuse trusted SRT / `subtitle_path` / user-provided timed text first; call `hub_media_transcribe mode="subtitle"` only to produce a plain SRT source; call `hub_subtitle_format` for ASS/SRT/VTT styling and pass the formatted subtitle file into the final burn/render step. For `hub_ffmpeg -vf subtitles=...`, use the formatter's `absolute_path` field, not relative `path`. Intermediate SRT/ASS/VTT files stay in the workspace and are not canvas nodes unless the user explicitly requests subtitle-file export.
- VO + BGM final mix uses the plan's fixed BGM gain. Do not add ducking or volume automation unless the user explicitly requests it.
- 转场是用户/shot script 的剪辑意图；未指定时用简单 cut 或工具默认，不发明复杂转场风格。
- `hub_ffmpeg` 只用于 `merge_videos` 覆盖不了的滤镜、精确转码或音画处理；输入先从 ordered clip refs 解析到当前 runtime refs 的绝对路径，不用聊天摘要或编辑器里的展示名。
- 明确要求的字幕、logo、标题卡、CTA、精确文字属于 deterministic postprocess/still-card work, not generated video text, unless the selected vendor is explicitly locked for readable text.
- 输出命名为项目语义名 + `_final`；保留实际路径，不重命名生成物。

## Canvas Proof

Postprocess 返回 path 不是交付完成。主 agent 必须调用 `hub_canvas_write_node(kind:"media")` 把终剪写到画布；返回 `nodeId` 才是完成信号。

## Checks

- 实际时长与用户/brief 目标差异明显时说明原因，必要时回到 shot plan 调整。
- Multi-input renders must preserve audio/video duration parity; if tool evidence shows visible desync or missing audio, stop and revise instead of continuing.
- 缺片段、顺序不明、分辨率策略冲突、音频策略冲突、review/render 意图冲突时先问或重排 plan，不猜。视频编辑器写入后重读项目状态确认结果。

## Anti-patterns

- 把返回的文件 path 当作交付完成，不写 canvas media node。
- 在片段缺失、顺序不明或音视频时长不齐时强行合成而不回到 shot plan。
- 用户未要求时擅自加字幕 / 转场 / 文字叠层，或重新编码改变原始时长。
