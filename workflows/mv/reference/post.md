# MV Stage 7 — 后期合成

> **何时 Read**：所有 Stage 6 镜头组视频完成并经用户确认后，author `post` Stage 时读取。按 `shot-plan.execution_excerpt` 顺序读取一份或上下两份分镜中的成片概览、完整组顺序、画幅和准确文字兜底，再读取 Stage 2 当前 `main_song`、Stage 6 当前 runtime refs 和 `<workflowsDir>/_shared/video-merge.md`；不重读 `production_plan`、风格库、字体库或视频 Prompt 正文。

## 输入完整性

按 `shot_plan.sequence_index` 收集每个 `clip_group_id` 的当前成功视频，只使用真实 runtime ref：

- 每个镜头组恰好对应一个片段，id、顺序、路径和时长均可读取。
- Stage 6 的 `music_ref_<clip_group_id>` 只是生成中间参考，不进入视频片段顺序、最终音轨或交付列表。
- 主音乐必须是 Stage 2 当前确认的 `main_song`；更换音乐后必须先在 Stage 3 覆盖实际成歌逐句时间轴和制作计划，再更新受影响分镜。
- 读取制作计划中已接受的音乐使用范围、目标画幅、输出规格、SFX 策略和 `execution=video_and_post_fallback` 文字账本。
- 缺片、重复 id、顺序不明、路径不可读或使用旧版音乐时停止，不编造路径或跳过片段。

## 时间线

创建一个稳定 id 为 `mv_timeline` 的 timeline work item，输出 id 为 `mv_final`：

1. 依照 `sequence_index` 排列片段；每段视频时长直接等于分镜整数 `duration_sec`。只有用户确认或分镜明确登记的内容 trim 才调整入点/出点。
2. 使用 hard cut 或分镜已登记的确定性转场；不在 Post 发明新的视觉转场。
3. 输出画幅继承 `shot_plan` 成片概览中的已确认画幅，输出分辨率继承 Stage 6 execution lock；不同尺寸按 `<workflowsDir>/_shared/video-merge.md` 的 scale 策略统一，不拉伸主体。
4. 时间线从 0 秒连续覆盖到 `final_duration_sec`，所有片段时长总和必须等于最终主音乐整数时长，不留空档、重复片段或黑屏填充。
5. 片段时长与分镜整数值不一致时返回 Stage 5/6 修订；`post_tail_hold_sec` 必须为空或 0，不靠变速、补静帧、黑屏、补小数尾段或在 Post 临时裁掉音乐解决。

```yaml
mv_timeline:
  id: mv_timeline
  ordered_clips:
    - { clip_group_id: cg_01, runtime_ref: "真实路径", trim_in_sec: 0, trim_out_sec: 15 }
  transition_policy: "分镜已确认的 cut / transition"
  output_aspect_ratio: "16:9"
  output_resolution: "Stage 6 锁定值"
  final_output_id: mv_final
```

## 主音乐与片段声音

- 从 `production-plan` Stage detail 的内部 Production capsule 读取唯一主音乐真实路径与最终使用范围，从音乐 0 秒对齐时间线 0 秒；用户可见制作计划只用于核对同一时长结论。
- Stage 6 的分组音乐切片只负责生成时的节奏与口型参考，不参与最终拼接或混音；最终音轨始终从当前完整 `main_song` / 已确认 `music_use_range` 一次性取得。
- 移除各生成片段的音乐、BGM 和 `reference_led_lipsync_proxy` 同步代理音轨，保留其画面嘴型；再把原始主音乐连续对齐到时间线，不按镜头组切碎歌曲。
- Stage 6 明确生成并保留 SFX/ambience 时，先去除其中的音乐成分，再按制作计划的音量策略与主音乐混合。
- 不改变主音乐速度、音高、段落或歌词来迁就错误视频时长；需要重新定稿主音乐时返回 Stage 2，需要更新时间轴/制作计划或分镜时返回 Stage 3/5。
- 最终检查音频不断裂、不叠加第二条歌曲、无明显削波，画面切点与 P0/P1 音乐事件保持一致。

## 动态字体与准确文字

Stage 6 已生成的动态大字、字形运动、空间文字和包装特效作为画面的一部分保留，Post 不重新设计或替换成普通字幕。

只处理 shot-plan 内部 capsule 和 Production capsule 的文字账本中明确标记为视频生成并允许后期准确兜底的歌词、标题或指定文案：

- 原文、语言、标点、大小写、时间范围和版式角色必须来自已确认账本。
- 连续歌词或字幕读取 `<workflowsDir>/_shared/subtitle-pipeline.md`，先锁定终剪时间，再格式化和烧录。
- 标题、关键词或少量指定文字使用 `<workflowsDir>/_shared/video-merge.md` 允许的确定性 text overlay，并遵守已确认位置、安全区和字体角色。
- 兜底层只保证准确可读，不模仿或覆盖视频模型已经完成的动态字体表演。
- 没有 `execution=video_and_post_fallback` 条目时不读字幕流程，不添加字幕、Logo、标题卡或随机文字。

## Work Item 与画布交付

Post work item 必须写入：有序绝对输入路径、每段 trim、转场、scale、主音乐路径与使用范围、片段声音策略、mix、准确文字操作、输出规格和 `mv_final`。

渲染成功的文件路径不是交付完成。调用 `hub_canvas_write_node(kind="media")` 把 `mv_final` 写入画布，记录真实 `nodeId` 和 path；Deliver 只交付这一个当前成片节点。

## 自动执行与交付

Stage 6 全部视频成功且用户确认画面没有问题后，自动 author 并执行本 Stage。片段顺序、trim、转场、输出规格、主音乐、片段声音、SFX 和准确文字均来自已确认上游，只做内部完整性核对；不得创建 `review.before_execution`、不得展示后期提示词、不得要求用户回复“确认执行”。

渲染完成后直接把 `mv_final` 写入画布并交付。最终展示音画同步、歌曲连续性、节奏切点、动态字体保留、准确文字、SFX 平衡、画幅、清晰度、首尾有效画面和无黑屏结果；这是成片查看，不是继续执行的确认 Gate。

## 反模式

- 缺片、顺序或时长不确定时强行合成。
- 视频已经确认后再次展示“MV 最终时间线与成片”提示词并等待用户确认执行。
- 让 Post 重新生成画面、音乐或整套动态字体包装。
- 同时保留片段 BGM 和 Stage 2 主音乐，造成双音乐叠加。
- 用户未要求准确文字时擅自添加整首歌词字幕。
- 只返回文件路径，不把 `mv_final` 写入画布。
