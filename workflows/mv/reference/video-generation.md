# MV Stage 6 — 分镜派单原文投影、确认与 H3 派单

> **何时 Read**：Stage 5 全部分镜文档被接受后，author 唯一 `visual-gen` Stage 时读取。Stage 5 每组已经包含最终六段派单原文；Stage 6 只逐字投影、绑定 refs 与音乐切片并一次确认。Executor 正常读取 Plan，输出过长时按 work item 声明的分镜原文范围逐组恢复，不新增 Prompt 文档。

## Stage-local 读取路由

当前 author turn 先读取 production-plan、shot-plan、assets 三个 Stage detail。从 `shot-plan.execution_excerpt` 取得每组真实 `document_node_id`、项目 MD 路径、六段原文起止行、字符数和交界状态；按该范围逐组读取，并核对【参考素材说明】到 Medium 终行完整返回。再读取最终 `main_song` 与本文件全文。Stage 6 不读取风格库、字体库、节点预览、聊天摘要或未选路线进行二次设计；发生 compaction 后重复读取真实来源范围。

## 唯一职责

- 一个镜头组对应一个且只对应一个 video work item 和一次 H3 生成；组内 Shot 不拆，两个镜头组不合并。全部镜头组仍属于一个 `visual-gen` Stage。
- Stage 5 从【参考素材说明】到 Medium 终行的连续文本，是当前镜头组唯一 `prompt_source`；Stage 6 的 `work_items[].prompt` 必须与其换行、标题、标点和正文逐字符相同。
- Stage 6 不做标题归位、slot 补写、全局锁补写、摘要或润色。来源块若缺 slot、六段、Shot、结尾锁或 Medium，返回 Stage 5 修正同一组，再重新读取；不能在 Stage 6 临时补齐。
- 实际 path、node id、有序 `refs`、切片 runtime ref、模型与画幅属于 work item 结构，不写进或改写已确认 Prompt。Prompt 中 image/audio slot 顺序必须与 `refs` 一致。
- H3 看不到分镜、Plan 或 Reference。最终 Prompt 必须自包含；“见 Stage 5”“按分镜执行”“See Plan”“沿用 Shot 1.1–1.10”等指针不是 Prompt。

## 唯一原文块合同

来源块固定按【参考素材说明】→【核心创意】→【音乐、歌词与表演】→【视觉与动态字体系统】→【画面过程描述】→【全局要求与生成锁】排列，各出现一次；【画面过程描述】保留全部 Shot、空行、本组结束状态和后期保留，Medium lock 是最后一行。外层“镜头组”标题不进入 Prompt，内部 id、Gate、route 和字段名不进入来源块。

Stage 6 对每组执行一次连续范围复制，不从六个零散字段重新拼接。来源 MD、起止行和字符数是持久运输依据，不是新的用户文档；不得创建“Prompt 1/2/3”、逐组 Prompt MD、summary 或其它画布节点。

## 原文投影 Gate

先完整读取当前组的连续来源范围，再把工具返回的 `text` 去除行号后原样赋给 `work_items[].prompt`；这个字段不是读取指令、摘要或占位符。对每组检查：来源范围首行为【参考素材说明】、末行为完整 Medium lock；六标题、Shot 数、歌词/纯器乐、口型、动作—运镜、光影/VFX、准确文字、字体 Layer、下一镜落点和终态均存在；`work_items[].prompt` 与该连续范围逐字符相同。全部成立才写 `prompt_source_gate=pass` 和 `stage5_verbatim_projection_gate=pass`。

在调用 `hub_plan_patch_stage` 前，逐条展开将写入的 `work_items[].prompt` 自检：它必须实际以【参考素材说明】开头，包含六个完整标题并以 Medium lock 结尾。`prompt` 若是“逐字执行”“逐字复制”“按分镜”“见 Stage / Plan / 原文”“读取上述”“行范围”或任何类似的指向说明，视为空 Prompt；不得进入确认框、不得写 `pass`、不得提交 H3。此时重新读取该组来源范围并写入完整正文；不能用指针句换取更短的 Plan。

每组最终 Prompt 上限 7000 字符。超限时返回 Stage 5 当前组删除重复措辞，同时保留全部可见、可听、可计时和可衔接事实；Stage 6 不能自行截短。短于预期时检查 Stage 5 完整度，不在本 Stage 临时补创意。

## 固定模型、音乐切片与 Stage 结构

固定 `MiniMax H3 · 2K`，画幅逐字继承 production-plan。先按镜头组绝对整数范围准备全部 WAV 音乐切片；每个视频只绑定自己的等长切片，不传整首或相邻组。模型音轨只作口型/节奏同步代理，Stage 7 丢弃并换回完整主音乐。

```yaml
depends_on: [production-plan, shot-plan, music-prep, assets]
concurrency_limit: 1
execution_locks:
  - { production_mode: mv_video_generation, vendor: MiniMax, model_id: MiniMax-H3, resolution: 2K, aspect_ratio: <已确认画幅>, duration_unit: integer_seconds, duration_range_sec: [4, 15] }
  - { submission_order_lock: sequence_index_strict, one_video_tool_call_per_assistant_step: true, prompt_transport: verbatim_work_item_prompt }
stage_fields:
  execution_policy: serial_music_reference_prep_then_serial_verbatim_video_items
  prompt_template_id: cool_music_video_longform_group
  prompt_section_count: 6
  prompt_compile_policy: exact_stage5_group_source_projection
  prompt_runtime_fallback: exact_source_range_read
  prompt_copy_gate: pass
```

`concurrency_limit=1` 与 `submission_order_lock` 是执行锁，不是性能建议。先完成所有音乐切片；随后只提交最小 `sequence_index` 的待执行视频，当前 assistant step 只能出现一次 `hub_generate_video`。该调用完成或明确失败后，下一模型回合再读取同一 Stage detail 并逐字提交下一组；用户不需要逐组确认。

```yaml
id: music_ref_cg_01
name: 镜头组1音乐参考切片
modality: postprocess
refs: [main_song]
source: "main_song [0,15]"
render: { duration_target_s: 15, output_format: wav, output_role: generation_reference_only }
timeline: { operation: "hub_ffmpeg trim_audio_reference", ordered_input_refs: [main_song] }
prompt: "从 audio 1 裁出 main_song 绝对 00:00–00:15 的 15 秒 WAV，仅作生成参考，不变速、不改调、不循环。"
```

```yaml
id: cg_01
name: 视频镜头组1
modality: video
clip_group_id: cg_01
sequence_index: 1
timing_target: "main_song 00:00–00:15；audio 1 局部 0.0–15.0s；Shot 1.1–1.12"
refs: [char_main, music_ref_cg_01]
source: "shot-plan 有序文档中的 cg_01；Shot 1.1–1.12；00:00–00:15；15s"
prompt_source_document_id: "Stage 5 真实 document node id"
prompt_source_document_path: "项目内 MV导演分镜.md 或上下篇真实路径"
prompt_source_group_heading: "镜头组 1 / 派单 1"
prompt_source_start_line: 7
prompt_source_end_line: 68
prompt_source_char_count: 5200
prompt_source_gate: pass
render: { duration_target_s: 15, generate_audio: true, audio_approach: reference_led_lipsync_proxy }
shot_block_count: 12
prompt_section_count: 6
stage5_verbatim_projection_gate: pass
```

上例只展示 work item 的结构字段，刻意不展示 `prompt` 的虚构示例值。实际写入 Plan 时，`prompt` 必须直接填入本轮 `hub_canvas_read_text` 返回的当前组完整六段正文；不可填入复制说明、路径、行号、标题名、占位符或任何对来源的指向。确认框展示的也必须是这一完整正文，而不是结构字段或读取说明。

`timing_target` 和 `source` 使用单行标量；切片、视频时长和组边界必须相等。带歌词且主唱嘴部可见的组使用 `generate_audio=true + reference_led_lipsync_proxy`；没有口型且无原生声音职责时可为 false。固定 H3 实时不可用时保留 Stage 并报告能力问题，不静默换模型。

## Reference 绑定

从 Stage 1 用户 refs、唯一 assets Stage 当前 runtime refs、用户已选氛围 refs、合法前序 runtime refs 和本组音乐切片解析真实 path/url/node id。按 Prompt 中 image 1、image 2、video 1、audio 1 的出现顺序建立 `refs`；同一 ref 不重复，被替换资产、搜索候选和聊天旧路径不进入。人物卡锁 identity/wardrobe，条件场景卡锁 scene identity，普通场景沿用 Stage 5 描述。Production Board 展示 slot → 素材名 → stable id → 当前真实 path/node id → 用途；缺失、错位或不可读时不派单。

## 一次确认与逐组原样派单

`hub_plan_patch_stage` 一次写入全部切片、全部 video items、原文来源定位、执行锁和一条 `review.before_execution`：`当前确认的是以下全部最终 H3 派单提示词，每条对应一个镜头组；请展开核对完整内容、对应秒数、音乐切片和有序参考素材。确认后将按分镜中的同一原文逐组生成，不再改写。` 写入前每个 item 的 `prompt` 必须已经是可读、可直接交给 H3 的完整六段正文；用户仍在同一 Production Board 一次确认全部组，不逐组确认。

确认后不再触发 Planner。正常情况下直接使用 stage detail 中的完整 `work_items[].prompt`。若 `hub_plan_get_stage_detail` 明确返回“output truncated / full output saved”，这不是用户问题，也不返回 `stage_blocked`：只针对当前最小 `sequence_index` 项，从项目 `.hilo/plan/<plan_id>.json` 的该 work item 附近读取原文来源路径、起止行、refs、时长和锁，再按起止行读取 Stage 5 项目 MD 的连续六段原文，将其不增不减地作为本次 `hub_generate_video.prompt`。不得读取整份 Plan 或其它组来重写内容。

来源范围完整、单行未命中 `line truncated`、末行是 Medium lock 时，Executor 直接派单；不得摘要、翻译、润色、拼接零散字段或改成“见 Plan/Stage/分镜”。只有真实来源文件/范围缺失、行内容自身被截断或 copy gate 已失效时，才返回 `prompt_source_missing` 给同一 Stage Planner 修复，不询问用户拆文档。网络、参数或 capability 重试只改报错字段并复用同一来源范围、Prompt、refs、id、时长和顺序。

用户在确认前修改某组 Prompt 时，Planner 先把修改写回 Stage 5 同一组六段原文范围，重新记录行号和字符数，再逐字投影到 work item；只改 Plan Prompt 而不更新来源时 `prompt_source_gate` 失效，不得确认或执行。

## 派单前检查

检查全部组时长总和等于最终音乐；每组 4–15 秒整数；六段齐全；Shot 数、编号、时间、来源文件/行范围和原文投影通过；refs/slot/路径/媒体类型一致；画幅、Medium lock、audio 1 与生成参数一致；`concurrency_limit=1`、顺序锁和原样传输锁存在。确认前先检查每个 `work_items[].prompt` 是完整正文而非指针句，正常读取时再检查 `hub_generate_video.prompt == work_item.prompt`；运行时截断回退时检查所读范围与 `prompt_source_gate=pass` 对应，命中指针句或短摘要不派单。

## 反模式

- Stage 6 重读风格/字体库后重新创作、把 Stage 5 连续画面改成七行字段、机器清单或短摘要。
- 只读一份分镜、节点预览或聊天摘要，遗漏下篇、镜头组、Shot 或文档交界状态。
- 为凑最低字数重复形容词，或为低于 7000 而删除动作、运镜、歌词口型、光影/VFX、字体 Layer、衔接和终态。
- 用户确认后并行提交多个长 Prompt，导致后续组被引用句或摘要替代。
- 运行时 Stage detail 过长就要求用户拆 Prompt 文档、暂停或重新确认；已有来源范围却仍重写 Prompt。
- Executor 自行重写 Prompt、错组音乐切片、重排 refs，或让代理音轨成为最终歌曲。
