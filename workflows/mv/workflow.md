---
project_type: mv
stages: [intent, music-prep, production-plan, assets, shot-plan, visual-gen, post]
---

# MV — music-led video workflow

> **进入信号**：MV、音乐视频、给歌配画面、卡点视频、歌词视觉、音乐可视化、Rap Video、Music Video、AI Music Video、Lyric Video、Music Visualizer、Performance Video、Visual Album、make a video for my song、turn this song into a video、video synced to music / beat。
>
> **不适合**：15 秒以内单条高能拼贴音乐短片由 `cool-music-video` skill 承接；口播带货 / 种草 UGC 由 `koc-video` skill 承接；连续剧集短剧进入 drama-series。

## Principle

最终主音乐是唯一时间权威。七个 Stage 只消费已确认上游产物，不从聊天摘要重建事实；已完成且被接受的 Stage 直接跳过。所有画布 MD 只展示用户可理解和修改的制作内容；Gate、稳定 id、字段路径、route、模型派单骨架和其它机器合同写入对应 Stage 的 `execution_excerpt`，下游通过 Stage detail 读取，不在画布正文或附录展示。

内容先锁 `direction_mode`。`narrative_story` 保护人物、事件、因果、地点功能和结局，五种风格只改变呈现；`visual_aesthetic` 用主体、情绪、母题、关键画面和视觉演进组织画面，不编人物目标、关系、任务、阻碍或结局。动态大字默认在视频模型内生成，只有逐字准确歌词、标题或指定文案登记 Post 兜底。

## Stages

| 用户显示 | stage_id | 稳定输出 | 执行前检查 | 产出后检查 |
|---|---|---|---|---|
| Stage 1 — 确定 MV 方向 | intent | 显式输入与单次补充问询、内部 Intake capsule、用户可读创意方向文档、音乐来源、媒介、风格、时长、画幅、角色—主唱锁和真实 refs 映射 | 无 | 查看故事梗概或五字段视觉概念，以及媒介、风格、时长、画幅和音乐来源 |
| Stage 2 — 确定音乐 | music-prep | 最终整数秒 `main_song` runtime ref、音乐 Gate、来源/形式/语言/曲风和主唱呈现 | 无 | 试听最终歌曲，确认整体效果与末尾处理可用 |
| Stage 3 — 制作计划 | production-plan | 唯一 `main_song_lyrics_timeline`、内部 Production capsule 和用户可读 `production_plan` | 无 | 同时查看实际歌词时间轴、内容方案、段落/空间/动作/风格/字体发展与制作执行说明 |
| Stage 4 — 角色与场景锚点 | assets | `style_reference_capsule`、角色卡、按条件生成的场景卡和普通场景描述；用户主动要求时追加 Research | 检查真实生成/复用清单、prompts、用户明确指定的人物 refs 与图片参数 | 查看人物身份/服装/风格投影、条件场景；同一说明附非阻塞 Research 邀请 |
| Stage 5 — 分镜规划 | shot-plan | 一份或长片上下两份真实导演分镜；每组含可直接派单的连续六段原文及完整 Shot、动作、运镜、歌词口型、光影/VFX、字体 Layer 和生成锁 | 无 | 一次查看全部分镜文档，核对连续时间、镜头密度、逐组派单原文、风格包装、字体层和跨文档衔接 |
| Stage 6 — 视频生成 | visual-gen | 每组真实音乐切片、1:1 `video_work_items`；`prompt` 是 Stage 5 对应六段原文的逐字投影，并记录真实文档与行范围 | 固定 MiniMax H3 · 2K；在同一 Production Board 展开检查完整 Prompt、refs、时长、画幅和声音策略 | 查看各组主体/场景、歌词口型、节奏、字体包装和段间衔接 |
| Stage 7 — 后期合成 | post | `mv_timeline` 和 `mv_final` | Stage 6 视频确认后自动执行，不再询问剪辑确认 | 直接展示最终成片，检查音乐连续、文字/SFX、画幅、首尾和黑屏 |

## Artifact Handoff

- `intent`：完整机器结构写入 Stage `execution_excerpt`，方向文档只展示同一创意的可读正文；Plan 另保存合法标量锁值、真实文档引用和审阅文案。Stage 2/3 同时读取 intent Stage detail 与方向文档。
- `music-prep`：Stage 3 只分析当前最终 `main_song`；歌词种子和音乐生成 prompt 都不是最终歌词真相。
- `production-plan`：内部 Production capsule 是 Stage 4–7 的精确执行数据，用户可见制作计划是同一事实的可读表达；下游同时读取 Stage detail 和当前文档，无权重算音乐总时长。
- `assets`：未选 Research 候选不进入下游；被替换资产移出当前 refs，稳定资产 id 不变。
- `shot-plan`：一个镜头组对应一个视频 work item；内部 capsule 锁稳定 id、refs、一到两份分镜顺序，以及每组六段派单原文的真实文档路径、起止行和字符数。用户可见分镜中的该连续原文块同时承担详细分镜与持久 Prompt source，不另建 Prompt 文档。
- `visual-gen`：`work_items[].prompt` 是 Stage 5 对应原文块的逐字投影，供用户一次确认；每个 item 同时携带同一来源定位。Executor 正常读取 Plan，Plan 输出过长时只读取当前组来源范围原样派单。Post 只按 `sequence_index` 消费当前视频 runtime refs，并以 Stage 2 完整主音乐替换口型代理音轨。

## Reference Routing

先用 `hub_read(file_path, offset=1, limit=12)` 读取目标 MV Reference 顶部；存在 Stage-local 读取路由时只读当前区段，不存在时完整读取该文件。不得因为文件曾在更早 Stage 读过而跳过当前要求，也不得把未选风格路线读入当前 author。

| 当前 Stage | Required reads |
|---|---|
| intent | `<workflowsDir>/mv/reference/creative-and-plan.md` 的 Stage 1 问询切片；显式输入登记与本次补充问询完成后再读 Stage 1 创意/方向文档切片，以及 `<workflowsDir>/_shared/stage-execution-plan.md` 的 `offset=14,limit=40` 与 `offset=66,limit=71` |
| music-prep | intent Stage detail 的内部 Intake capsule、方向文档、标量锁与真实音乐 refs；`<workflowsDir>/mv/reference/music.md` 的 Stage 2 问询切片，回答后读 Stage 2 生成/本地定稿切片；多音频用途不明、Cover/Remix 或独立混音时才读 `<workflowsDir>/_shared/audio-pipeline.md` |
| production-plan | intent Stage detail 的内部 Intake capsule、当前方向文档、最终 `main_song`；`<workflowsDir>/mv/reference/music.md` 的 Stage 3 切片、`<workflowsDir>/mv/reference/creative-and-plan.md` 的 Stage 3 切片、`<workflowsDir>/mv/reference/style-system.md` 共用段+已选风格段、`<workflowsDir>/mv/reference/typography-packaging.md` 共用段+已选 route 段+同步 Gate |
| assets | production-plan Stage detail 的内部 capsule 与用户可见制作计划；`<workflowsDir>/_shared/asset-pipeline.md` 的图片 work item 核心段；`<workflowsDir>/mv/reference/assets.md` 默认资产切片；用户明确要求 Research 后才读 Research 切片及当前风格/字体路线 |
| shot-plan | production-plan Stage detail 中的 Treatment、节奏/空间/动作/插入策略、`style_anchor`、`typography_system`、文字账本与时长权威，最终 `main_song_lyrics_timeline`，用户可见制作计划和 Stage 4 当前资产；本轮重新读取 `<workflowsDir>/_shared/stage-execution-plan.md` 的 `offset=14,limit=40` 与 `offset=66,limit=71`，完整读取 `<workflowsDir>/mv/reference/storyboard.md`，再按各自路由读取 `<workflowsDir>/mv/reference/style-system.md` 共用底盘+已选风格+Stage 使用规则，以及 `<workflowsDir>/mv/reference/typography-packaging.md` 共用合同+已选 route+音乐同步与 Gate |
| visual-gen | 当前 author turn 重新读取 production-plan、shot-plan、assets 三个 Stage detail，按 `shot-plan.execution_excerpt` 逐组读取一份或上下两份真实分镜 MD 的六段原文范围，再读最终 `main_song` 与 `<workflowsDir>/mv/reference/video-generation.md` 全文；Stage 5 已物化最终 Prompt source，不再读取风格库、字体库或聊天摘要进行二次设计 |
| post | 按 `shot-plan.execution_excerpt` 读取一份或上下两份分镜的完整顺序/画幅/准确文字兜底、`main_song`、Stage 6 refs；`<workflowsDir>/mv/reference/post.md` 与 `<workflowsDir>/_shared/video-merge.md`；只有连续字幕兜底时读 `<workflowsDir>/_shared/subtitle-pipeline.md` |

## Stage Rules

- 每轮只 author 当前 Stage；当前 Stage 产物被接受后才添加下一 Stage。全部镜头组共用一个 `shot-plan`，全部视频共用一个 `visual-gen`，禁止版本号 Stage、汇总 Stage或逐组 Stage。
- Stage 1 首次进入时，先从用户原文和真实附件登记已明确的内容、音乐、参考素材、媒介、时长与画幅；随后立即用一次 `question` 只弹出缺失卡和必问的视觉风格卡。已经有具体证据的项目不重复问，摘要或模型推断不能代填；回答后再写方向文档和合法扁平 Plan，不把嵌套 `intake_result` / `creative_core` 放进 `constraints` 或 `stage_fields`。
- Stage 2 只有 Agent 生成音乐时询问一次具体曲风与固定“歌曲语言形式”卡；该卡只含带歌词（英文）、带歌词（中文）、纯音乐、用户输入语言四项。内部歌词直接用于生成，不展示或确认。来源生成/复用、目标附近试听、整数终点、本地裁剪和末尾复听在同一 Executor turn 完成；窗口内没有自然落点时直接按目标整数秒裁切并短淡出，不询问用户、不退回 Planner、不重做歌曲。
- Stage 3 在同一次 author 中先从最终成歌物化逐句整数时间轴，再写用户可读制作计划与内部 Production capsule；不新增音乐分析 Stage、问询或 Executor 工作。实际时长、时间轴末行和制作计划必须为同一整数。
- Stage 4 默认直接生成角色卡；普通 MV 只写场景描述，只有叙事空间连续、用户锁定同一空间或跨派单动作依赖空间时生成场景卡。资产确认说明附一次可选 Research 邀请；用户继续即跳过搜索。
- Stage 5 先按最终整数时长计算全部 4–15 秒整数组，连续无缺口且总和严格等于音乐；12–15 秒非叙事高能组默认 10–15 个独立 Shot，电影叙事通常 4–8 镜。它重新读取导演规范、当前已选风格与字体路线，每组直接按固定六段写完素材说明、核心创意、音乐表演、视觉字体、逐镜过程和生成锁；该连续块就是最终派单原文，Stage 6 无权重排、补创意或另建 Prompt 文档。
- Stage 5 默认物化一份导演分镜；镜头组超过 6 组或预计正文超过 36000 字符时，只在完整镜头组边界近似均分为上下两份，两份仍属于同一个 `shot-plan` 并只确认一次。文档顺序、覆盖范围和交界终态写入 `execution_excerpt`。
- Stage 5 写完后复读真实项目 MD，为每组记录六段原文的文档路径、起止行和字符数；单行小于 1800 字符，单组不超过 7000 字符。用户修改任一组时同步刷新该组来源范围。
- Stage 6 是零创作投影器：逐组把 Stage 5 连续六段范围原样写入 `work_items[].prompt`，只在 item 结构绑定真实 refs、audio 1 切片、模型和画幅。写入前逐条确认 `prompt` 实际含完整六段正文、首行【参考素材说明】和末行 Medium lock；任何“按分镜 / 逐字复制 / 见 Plan / 行范围”等指针句视为未写入，重读来源范围重建同一 Stage，不能展示确认或派单。全部 Prompt 在同一 Production Board 一次确认，不逐组确认。
- `visual-gen` 固定 `concurrency_limit=1` 和严格 `sequence_index`。若 Stage detail 完整，Executor 使用已确认 work item；若运行时明确截断，则从已声明的 Stage 5 文档行范围只读取当前组原文并直接派单，不摘要、不重组，也不要求用户拆文档。来源缺失时返回同一 Stage Planner 修复，只有新的内容选择才询问用户。
- Stage 7 在用户确认 Stage 6 结果后自动合成，完整主音乐覆盖代理音轨；只执行 Stage 3/5 已登记的准确文字兜底，不重新设计动态包装。

## Anti-patterns

- 为已完成 Stage 重复问询、重新分析或重新生成稳定产物。
- 视觉模式编造人物故事，或故事模式让风格改写人物、因果、地点功能和结局。
- 把未选 Research 图、旧资产、旧音乐或聊天摘要当成当前权威。
- 镜头组超过 15 秒、总时长不等于音乐、一个组拆成多个派单或逐组创建 Stage。
- Stage 5 只写概念摘要或包装接口，没有逐镜动作、运镜、歌词口型、风格/VFX、字体 Layer 和承接终态；或 Stage 6 二次设计、合并/省略 Shot、生成短版 Prompt。
- 长片把镜头组拆到超过两份文档、上下篇重复/漏掉 Shot，或 Stage 6 没有按顺序完整读取两份正文。
- 用户确认后并行提交多个长 Prompt、把后续组改成“见 Plan/Stage”的引用句，或让派单参数与已确认 work item 不一致。
- Stage detail 截断后让用户把 Prompt 拆成独立文档、暂停执行，或从零散字段重新编写；Stage 5 来源完整时应直接逐组读取。
- 用普通字幕、随机文字、单层贴字或 Post 重做动态大字，替代视频模型内的字体包装。
