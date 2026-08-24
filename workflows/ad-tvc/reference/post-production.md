# TVC Post 合成合同

本文件是 `ad-tvc` 的私有 Post 合同，优先于 `_shared/video-merge.md` 的通用字幕、文字 overlay、Logo、CTA 与 still-card 规则；共享卡只提供拼接、裁切、音频保留 / 混合和导出能力，不得扩大本 Stage 的执行范围。

Post 只消费有序视频 runtime refs 和可选 `bgm_final`，负责拼接、保留原生音轨、按需裁切 / 混入 BGM 与导出。Post 不消费 `confirmed_text_timeline`、`brand_end_card_spec` 或视觉技法卡，不生成、补写或烧录任何字幕、文字、Logo、CTA、End Card、HUD、参数、图形包装或 still card；这些内容必须在 Storyboard 冻结，并由对应视频单元原生生成。

## 输入

- 视频按 Visual Gen `constraints[kind=tvc_video_unit].sequence_index` 排列，每项有当前可解析媒体 runtime ref 和已经完成的画面 / 原生声音；actual duration 不由上游 capsule 提供。
- BGM 可来自 Audio 的 `bgm_final` 或用户已接纳 source；没有 BGM 时只保留视频原生轨。
- Post 继承 Visual Gen 已完成状态，不重复做文字、Logo、图形包装或 End Card 的内容 QC。上游 capsule 或当前 runtime ref 缺失时保持 blocked 并返回其 owner 修正；Post 不创建替代资产、不追加问询、不执行降级烧录。

## 依赖分支与 Work Item

- **无独立 BGM**：`depends_on: [visual-gen]`；媒体 `refs` 只列有序视频 work item logical ids。
- **Audio 生成 BGM**：`depends_on: [visual-gen, audio]`；媒体 `refs` 在有序视频 ids 后追加 `bgm_final`。
- **用户 BGM source**：`depends_on: [visual-gen]`；BGM 直接引用 Plan 顶层已接纳 source id，不得依赖 omitted `audio`，也不得伪造 Audio capsule。

下例是 Audio 生成 BGM 分支的完整 Post work item；无 BGM 分支同时删除 `bgm_final` 与 `audio_input_ref`，用户 BGM 分支则在 `refs` / `audio_input_ref` 中以真实 source id 替换 `bgm_final`。

```yaml
depends_on: [visual-gen, audio]
work_items:
  - id: tvc_final
    name: <working-language final delivery name>
    modality: postprocess
    refs: [unit_01, unit_02, bgm_final]
    timeline:
      operation: concat_preserve_native_audio_and_mix_bgm
      ordered_input_refs: [unit_01, unit_02]
      audio_input_ref: bgm_final
```

Post Planner 只读取 direct dependency Stage detail 中的 compact `constraints` capsules 与当前 runtime ids：从 Visual Gen 的 `tvc_video_set` 取得全片 target、画幅、分辨率、`bgm_source_id` 与冻结 mix intent，从 `tvc_video_unit` entries 取得 logical output、顺序、目标时长和原生音轨锁；Audio 分支再以 `tvc_bgm` 的实际 output / mix locks 做一致性绑定，用户 BGM 分支直接使用 `tvc_video_set.bgm_source_id` 指向的 top-level source。Planner 只据此 author 当前 Post work item，不回读 Intake、Storyboard、Visual Gen 文档、Prompt、搜索过程或 QC 日志，也不重新判断上游画面内容。

Executor 只读取当前 `post` Stage detail，消费其中已经 author 完整的 `work_items`、`constraints`、`execution_locks`，以及随当前 detail 可解析的 direct dependency runtime refs；不得另行读取上游 Stage detail 或文档。Executor 从每个真实媒体 locator / 工具 metadata 对实际输入时长只读取一次；actual duration 只服务本轮 trim / concat / mix 与唯一最终 QC，不写回 capsule、`stage_fields` 或上游合同。

## 合成

1. 按顺序拼接视频，不重排、变速、补镜头或重做转场。
2. 保留每段视频模型原生生成的旁白、对白、环境声和动作声；不得新增、替换、重录或拼接独立旁白轨。
3. BGM 长于成片时裁切到最终时长并做短淡出；BGM 短于成片时不循环，剩余部分只保留原生轨。
4. 以固定 `bgm_gain` 混入，`ducking: off`；不做自动音量曲线或节拍吸附。
5. 导出时只执行拼接与音频合同需要的技术编码；operation / timeline / prompt 中禁止出现 `drawtext`、subtitle、overlay、文字卡、Logo 合成、still card、End Card 或任何图形烧录步骤。

## 唯一输出

创建一个 `tvc_final: postprocess` work item，timeline 只包含有序视频 refs 和可选 `audio_input_ref`。

## Compact Downstream Capsule

Post 不创建平行的 Stage 交接容器或 work item semantic-ref 字段。Planner 在执行前把最终交付 capsule 作为一个 flat entry 追加到本 Stage `constraints`；它是当前 Post work item 的冻结执行摘要，不是第二份 timeline。

```yaml
constraints:
  - kind: tvc_final_delivery
    id: tvc_post_final
    logical_output_id: tvc_final
    ordered_video_output_ids: [<unit_01>, <unit_02>]
    optional_audio_input_id: <bgm_final | accepted source id | none>
    target_duration_s: <confirmed target>
    aspect_ratio: <confirmed delivery ratio>
    resolution: <confirmed delivery resolution>
    preserve_native_audio: true
    sequence_policy: locked
```

Post work item 的媒体 `refs: [<ordered video logical output ids>, <bgm_final when applicable>]` 与 `timeline.ordered_input_refs` 使用真实 work item / source logical ids并保持同序。不得把 `tvc_video_unit`、`tvc_audio_bgm` 或 `tvc_post_final` 等 capsule kind / id 混进媒体 `refs`。用户已有 BGM 时用对应 source id 替代 `bgm_final`。

capsule 只含冻结事实、logical output ids、有序输入和交付 locks，不含 path、URL、node id、实际时长、`qc_passed` 或 QC 日志。本 Stage 的实际媒体 locator 只写入 `runtime_refs`；`status=done` 表示唯一 Post QC 已通过。禁止执行后用 runtime 结果回填 capsule。

导出后只执行唯一 `review.after_execution` / 最终文件 QC：确认文件可播放，音视频时长符合冻结目标且同步，输入顺序未变，所有视频原生轨均保留，适用 BGM 按 `bgm_gain`、`ducking: off`、裁切 / 不循环策略混入，并已写入唯一 canvas node。全部通过后再记录唯一 `tvc_final` runtime ref 并完成 Stage；任一项失败都不得交付。不得另建平行 QC，不重复 Storyboard / Visual Gen 的内容、refs、文字或画面检查。
