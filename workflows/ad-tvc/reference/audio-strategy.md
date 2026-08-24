# TVC 最小 BGM 策略

只有用户需要新生成独立 BGM 时 author Audio。用户已有 BGM 或不需要 BGM 时跳过。旁白 / 对白始终由 Visual Gen 的视频模型随画面原生生成，不属于本 Stage。

author 本 Stage 时固定声明 `depends_on: [visual-gen]`；只有 `independent_bgm: on` 且 `bgm_source_id: generate` 时 author。`off` 或已有 source id 时直接 omit，不创建 Audio contract。

HARD：Audio Stage 只允许 `audio.music` 的 `bgm_final`，禁止 author narration、voiceover、speech、TTS、voice clone、配音或任何人声 work item；不得把视频 Prompt 中的旁白文本复制到音频工具。即使某段视频旁白缺失或不一致，也只能回到对应 Visual Gen 视频单元修正 / 重生成，不得在 Audio 或 Post 补一条独立旁白轨。

## 最小输入

Audio Planner 从同一个 Planner task 已冻结的 `tvc_audio_intent` compact handoff 取得 `independent_bgm`、`bgm_source_id`、音乐方向、核心乐器或音色、整体能量走势和 `bgm_gain`，据此一次 author 当前 Prompt / capsule。`visual-gen` 只提供完成顺序依赖，不是 Audio 的内容输入；Audio 不调用 `hub_plan_get_stage_detail`，不读取任何 Stage 动态对象，也不回读 Brief、Direction、视频 Prompt 或 Storyboard。缺少 handoff 时返回 Anchors owner 补齐，不从其它 Stage 推断音乐。

## 唯一 Work Item

```yaml
execution_locks:
  - kind: tvc_audio_generation
    vendor: official
    model_id: music-3.0
    mode: instrumental
work_items:
  - id: bgm_final
    modality: audio.music
    prompt: "<brand tone>; <music direction>; <core instruments>; <simple energy arc>; clean ending"
```

`vendor`、`model_id`、`mode` 是全 Stage 共用事实，只在 `execution_locks` 声明；work item 不重复 `vendor`、`model_id` 或 `mode`。Stage `constraints` 写入下列唯一 flat entry；它同时承载 mix policy 与下游所需 capsule，不得修改、替换或重新生成视频原生旁白。

## Compact Downstream Capsule

Audio 不创建平行的 Stage 交接容器或 work item semantic-ref 字段。Planner 在执行前把 compact capsule 直接追加到本 Stage 已有的 `constraints`；每个 entry 都是 flat key-value object，不复制 Prompt、音频分析或 runtime 结果。

```yaml
constraints:
  - kind: tvc_bgm
    id: tvc_audio_bgm
    logical_output_id: bgm_final
    sequence_index: 1
    bgm_gain: <frozen gain>
    ducking: off
```

Post Planner 只从 direct dependency `audio` 的 Stage detail 读取 `constraints[kind=tvc_bgm]` 与当前 `runtime_refs[id=bgm_final]`，据此 author Post 当前 work item。媒体 `refs: [bgm_final]` 只引用真实 work item logical output id；`tvc_audio_bgm` 只是 capsule id，不得进入 `refs`。用户已有 BGM 时 Audio 被 omit，Post 直接引用已接纳 source id，不得伪造 Audio capsule。

capsule 只含冻结事实、logical output id、顺序和 mix locks，不含 path、URL、node id、实际时长、`qc_passed` 或 QC 日志。本 Stage 的实际媒体 locator 只写入 `runtime_refs`；`status=done` 表示唯一 Audio 内部 QC 已通过。禁止执行后用 runtime 结果回填 capsule。

## 完成与重试

- 每次正常任务只保留一条成功结果，不建立候选、选曲或详细分段编曲。
- Prompt 只写可听内容，纯器乐模式只由 Stage `execution_locks` 的 `mode: instrumental` 决定；Prompt、`render` 和 vendor params 都不得要求固定或近似时长。
- 工具报错或没有可用 path 时保持失败；取得 path 后执行唯一 Executor 内部结果 QC：文件可播放且非空，保持纯器乐并符合已冻结音乐方向，没有意外人声、异常截断或明显失真。全部通过后直接完成 Stage；Audio 不设置任何 `review.*`，不得触发 `waiting_user(result_review)`。
- 这套检查一次聚合，不重复询问音乐风格或目标时长，不把实际时长与目标成片时长比较，也不得另建平行 QC、候选评选或第二个检查对象。失败时只重试同一 `bgm_final` logical id；用户明确要求重生成时同样替换该 id 的当前结果。
- Post 将超出部分裁切到成片长度；实际较短时不循环，剩余画面保留原生音轨。
