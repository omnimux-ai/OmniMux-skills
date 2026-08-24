---
project_type: koc-video
stages: [brief, assets, production, post]
---

# KOC Video — UGC product seeding workflow

> **进入信号**：KOC、UGC、种草、带货、测评、开箱、素人 vlog、小红书、抖音种草、产品试用视频。

## Principle

KOC 视频的核心是可信的产品体验和平台原生表达，三个优先级贯穿所有决策：产品事实不能错（信任崩塌点）、人要像活人（可信度来源）、表达要平台原生（过度精致 = 广告 = 划走）。KOC 是最轻的视频品类，阶段少、gate 少而重：用户在 Brief 一次拍板（选 hook、选 persona、定时长），在 Assets 一次认可形象，其余检查是核验不是决策。不要把种草片做成品牌 TVC；用户明确要制作感、品牌大片、发布会广告时改走 `<workflowsDir>/ad-tvc/workflow.md`。

## Stages

| 阶段 | 输出 | 执行前检查 | 产出后检查 |
|---|---|---|---|
| Brief | 一份提案文档：产品事实卖点与所有权、原生感 verdict 与场景化锚需求、内容形式（真人出镜 / 仅手部 / 仅产品）、5 个 hook 方案、真人出镜时 3 个文字 persona 候选、CTA 假设、字幕策略（默认不加，用户要求才开）、BGM 策略（默认加垫底纯器乐，用户明确不要才关）、目标时长与平台、产物语言（VO/文案语言，按平台与对标市场推断）、refs 角色 | 无；文档由 planner 直接产出。 | 用户拍板：选定 hook（5 选 1）、选定 persona（3 选 1）、确认时长、内容形式、产物语言、字幕策略、CTA/logo 用途假设、产品事实来源与 refs 角色（含"上传模特图作为出镜博主锚"类 assumption）；把全部用户选择写成具体值。 |
| Assets（需要生成锚点资产时） | 场景化产品锚（原生度不足时）、persona 选定后的单图创作者锚、穿戴/美妆产品的试穿参考 | 确认资产范围、最终 prompts、产品/人物 refs、身份和试穿需求。 | 用户认可创作者锚图形象——不符预期时回 Brief 修订 persona 或按反馈重生锚图，认可前不得进入 production refs；对照原始产品图核验产品锚保真（logo / 文字 / 形态 / 颜色）、单图锚点自然度和试穿参考。 |
| Production | 镜头与 VO 计划文档（前三秒 hook、时长预算内逐字 VO、产品动作、字幕/CTA 摘录、切分原因）+ 每个 hook/segment 一个原生 UGC clip group，所有片段携带相同的创作者与产品锚点组 | 批准 shot plan：hook 前三秒落地、逐字 VO 与时长预算、产品动作、切分原因、每个 video work item 的 `audio_approach` 为 native（口播/对白/音效随视频直出，无 TTS/vo-overlay 项）、有序 refs、时长与连续性。 | 检查平台原生感、产品真实性、人物身份、动作、逐字 VO、连续性、镜头与场景多样性（镜头感与景别跨度达标、多 clip 场景不全同）和干净画面。 |
| Post（需要确定性后处理时） | trim/concat 与最终画布产物；用户要求时烧录字幕、CTA/logo/文字叠加 | 确认输入片段顺序、字幕、CTA、文字、BGM 和剪辑操作。 | 检查字幕和 CTA 策略、节奏、音频、产品真实性和最终画布产物。 |

## Intake Analysis (media-agent, before planner)

When the user's product/source refs are uploaded, media-agent runs ONE verdict-complete `hub_analyse_media type:"both"` pass per product/source ref right after selecting this workflow and before dispatching planner. This single read is the run's semantic authority for those refs — planner distills it into `ref_capsules`, and every downstream stage (brief, assets, production, post) reuses it through `ref_analyses` instead of re-analyzing. Do not pre-analyze a ref with a generic question first, and do not analyze the same ref again later.

Ask this (adapt the product nouns to the actual product; keep every axis):

> 请为 KOC/UGC 真人带货视频的产品锚点评估这张产品来源图：提取可见产品事实（品牌文字、logo、品名、类别、形态 / 瓶型 / 包装、主体数量、构图 / 背景 / 光线）；逐维判断平台原生度（光线 / 构图 / 背景 / 调色 / 模特，是否像博主随手拍）；判断技术质量（清晰度、遮挡、是否单人、可抠图 / 可作为视频产品 ref）；标出产品保真风险与不可编造的 claim；给出是否需要生成生活化场景产品锚图的结论。不要推断价格、容量、功效、促销或任何不可见数据。

The nativeness / technical-quality / fidelity conclusions from this read ARE the grounding verdict; they also let planner decide up front whether a scene-anchor (i2i) work item is needed in Assets. Short-edge pixels for the technical-quality / anchor-spec check ride on the stage detail's `ref_analyses[]` entries (`width` / `height`), so executor reads them there with no new call — `type:"metadata"` / `canvas_get_node` is only a fallback when a ref is absent from the stage detail.

## Stage Plan Contract

- 每次只 author 当前 Stage。首次写计划头、包含 `id`、`order`、短 `name` 的完整 `stage_outline` 和第一个 required Stage；当前 Stage 的产出后检查通过后恢复同一个 planner `task_id`，每次用 `hub_plan_patch_stage` 追加下一个 required Stage，不重写已完成 Stage。

| 顺序 | 编写阶段 | 落地文档 | 读取范围（当前 Stage 只能读这些） |
|---|---|---|---|
| 1 | brief | 提案文档 | 本文件、`<workflowsDir>/_shared/stage-execution-plan.md`、`<workflowsDir>/koc-video/reference/product-grounding.md`、`<workflowsDir>/koc-video/reference/creative-route.md` 和已确认用户输入 |
| 2（需要生成锚点资产时） | assets | 无 | `<workflowsDir>/_shared/asset-pipeline.md`、`<workflowsDir>/koc-video/reference/product-grounding.md` 和已确认 Brief 文档 |
| 3 | production | 镜头与 VO 计划 | `<workflowsDir>/koc-video/reference/shot-vo-craft.md` 和已确认 Brief 文档、资产 refs |
| 4（需要确定性后处理时） | post | 无 | `<workflowsDir>/_shared/video-merge.md`、`<workflowsDir>/_shared/subtitle-pipeline.md` 和已确认 Production 产物 |

- 只读取当前 Stage 列出的 references；不要提前读取、author 或物化后续 Stage。
- **按 `stage_outline` 顺序推进，不得越过 required Stage**：media-agent 请求 planner author 下一 Stage 时，下一 Stage 只能是 `stage_outline` 中第一个未完成的 required Stage。真人出镜且用户未上传合格模特图时，assets 是 required Stage（必须生成创作者锚并经用户认可），不得从 brief 直接跳到 production。
- **Brief 拍板项用 `question` 工具选项化问询**：planner 在 author brief 时用**一次** `question` 调用携带多个独立 question 对象——hook 一题（5 选 1）、真人出镜时 persona 一题（3 选 1）、时长一题（确认或改）、产物语言推断依据不足时加一题，每题各自 header + 单选 options、推荐项放第一位。用 `question` tool 一次性向用户提问，所有待定项合并到**一次**调用里，推荐项放在第一位。
- **Production 的 work_items 必须完整**：同时包含 shot-plan document work item 和每个 clip group 的 video work item（带有序锚 refs、`duration_target_s`、`audio_approach`、final `prompt`）。只有文档没有 video work item 的 production Stage 是不完整的，不得在文档确认后直接把 production 标记为 done。
- Materialize the brief document during Brief and the shot-plan document during Production; 提案文档是本 workflow 唯一的 brief 类画布文档——media-agent 的 Creative Read 只在对话给出，不另写 Creative Brief / Production Intent text 节点，创意对齐内容随 planner 输入传递。 Keep unrun document Stages only in `stage_outline` and never create placeholders. Do not re-ask settled hook, persona, or duration values. If the user changes the hook or persona while reviewing the Brief, resume the planner `task_id` and patch the brief document; patch an already-authored affected downstream Stage in the same planner call. Require a separate review for the later shot plan.
- Assets 是条件 Stage：用户上传的模特图通过锚图验收标准、且产品 refs 原生度足够（无需场景化锚、无试穿需求）时整段跳过；此时"该图作为出镜博主锚"必须已在 Brief 作为 assumption 经用户确认。
- Brief 提案的排版把拍板项放最前（5 个 hook 方案、3 个 persona 候选、时长），assumption（内容形式 / 字幕策略 / BGM / CTA / logo 用途 / refs 角色）列其后，供用户一次回复全部定下。
- Compile exact dialogue, continuous action, aliveness cues, 真人皮肤质感锚（含人镜头，见 shot-vo-craft）, cut reasons, subtitle/CTA text, nativeness decisions, scene-diversity requirements（"参考产品与质感，场景不限于锚图"）, directing rules, anchor requirements, native-audio locks, and QC requirements into each final prompt or explicit postcondition. Do not pass reference paths to Executor.
- Document work item 写入真实 `document_node_id`。生成型 work item 写入最终 `prompt`、有序 `refs`、稳定 `id` 和 reference 要求的执行字段；executor 不补写创作内容。
- Put domain acceptance criteria in the Stage goal/work items. Write settled user decisions as concrete values and never ask them again during planning. Do not write workflow gate fields.
- media-agent 在 intake 时完成 `product-grounding.md` 要求的 5 维默想、原生度、技术质量和锚图规格分析。Planner 把结果编译进 `ref_capsules` 和 brief/assets work items。Executor 优先复用 `ref_analyses`，仅补充缺失结论。没有分析结果时不要断言原生度或质量 verdict。
- Document stages are planner-owned canvas nodes: planner writes or patches the brief and shot-plan documents, returns refs, and the orchestrator routes revisions back through planner.

## Execution Rules

- Default platform shape is 9:16 for 小红书 / 抖音 unless the user or source material says otherwise; write it into the production stage's `execution_locks` together with resolution（MiniMax H3 默认 `2K`，用户明确要求其它清晰度时再按可用能力调整）and `vendor_model_policy`（用户未显式点名视频模型时锁 `{vendor: MiniMax, model_id: MiniMax H3}`；用户点名模型时锁用户指定值）, not per work item.
- The first 3 seconds must contain a concrete hook. Brief 提案必须按 `<workflowsDir>/koc-video/reference/creative-route.md` 的匹配流程给出 5 个 hook 方案（含多样性硬约束）和真人出镜时的 3 个文字 persona 候选，由用户拍板选定；选定后写成具体值，不再生成 unasked 平行 hook 版本。
- **交互语言与产物语言分离**：Brief、question、shot plan、状态说明使用注入的 `working_language`。VO、对白、字幕、CTA 和画内文字使用 `deliverable_language`：用户明确指定优先，否则按目标受众、平台与对标市场推断（北美/海外平台默认英文，小红书/抖音国内默认中文），依据不足或会显著影响交付时在 Brief 拍板 question 中询问。中文 Skill/workflow 文档不参与两者判断。VO copy must sound native in `deliverable_language` and follow the VO rules and blacklist in `<workflowsDir>/koc-video/reference/shot-vo-craft.md`（黑名单按语言等价适用）. Every video work item validates `dialogue_excerpt` length against `duration_target_s` per the 台词密度预算 in `<workflowsDir>/koc-video/reference/shot-vo-craft.md`; over budget means trimming lines or splitting adjacent clips, never expecting faster delivery.
- **生成 prompt 语言**：KOC video/image work item 的完整模型 prompt 使用 `deliverable_language`，引号内台词与画内文字保持该语言原文；用户 facing 的 brief / shot plan 使用 `working_language`，其中逐字 VO、字幕和 CTA 保持 `deliverable_language` 原文、不翻译。准确用户原文始终逐字保留。
- Product claims, usage effects, price, specs, and before/after statements must trace to user text, refs, or approved placeholders; product fidelity and brand-risk rules follow `<workflowsDir>/koc-video/reference/product-grounding.md`.
- **Audio（HARD）**：口播、对白和环境音效随视频 work item native 直出——`audio_approach` 写 native dialogue，逐字台词与场景音效写进最终 `prompt`，判定细则见 `<workflowsDir>/koc-video/reference/shot-vo-craft.md` 声音路径节。默认不为 KOC 口播/对白创建 `audio.tts`、voice-prep、voice anchor、`vo-overlay` 或替换配音 work item；仅当用户明确要求外部旁白/替换音轨、或选中 video vendor 不支持可用 native speech 时例外，例外原因写进 plan。BGM 按 Brief 确认的策略创建（默认加，用户明确不要才跳过）：整条纯器乐一次生成、ducking 压在口播之下（约低 18-20dB），按 `<workflowsDir>/_shared/audio-pipeline.md`。
- The KOC creator/model anchor is a single natural front or half-body image. This explicitly overrides the six-view default in `<workflowsDir>/_shared/asset-pipeline.md`; multi-view sheets must not enter video reference slots.
- 创作者锚图必须经用户认可后才可写入 production refs（Assets 产出后检查）；用户上传模特图跳过 Assets 时，其"出镜博主锚"角色必须已在 Brief 经用户确认。规则见 `<workflowsDir>/koc-video/reference/product-grounding.md` 人物锚节。
- Wearable/beauty/try-on requests create the try-on reference as an explicit image work item in the Assets stage; the try-on image is an input ref, not a keyframe and not a replacement for product grounding.
- `<=15s` should be one continuous clip when the hook arc fits. Longer videos use continuity-first clip groups where every clip carries the same anchor ref group plus `continuity` text; never pass a previously generated clip as a video reference.
- **视频生成必须带锚 refs 且走 executor**：真人出镜的每个 video work item 的 refs 必须包含创作者锚 + 产品锚（试穿时加试穿参考；产品锚为生成图时末尾追加原始产品图作保真锁），缺失即 `refs_missing`，禁止只靠文字描述生成博主或产品。用户催促（"直接生成成片 / 快点出片"）表示推进当前 plan 的剩余 required Stage（经 executor 执行 work items），不是授权跳过 assets、绕过 plan 直接派 `hub_generate_video`。
- **镜头与场景多样性**：production 遵守 `<workflowsDir>/koc-video/reference/shot-vo-craft.md` 的分镜节奏与场景多样性规则（镜头感密度、景别跨度、多 clip 不锁死锚图同一景），这些项列入 production 产出后检查。
- 用户要求多条视频时按不同卖点/hook 拆条：各条不得共享同一 hook + persona + 场景组合，差异点写进各自 shot plan 与 work item prompt。
- Subtitles are explicit opt-in（默认不加，与 `<workflowsDir>/_shared/stage-execution-plan.md` 的通用默认一致）：仅当用户明确要求字幕时才做，需求在 Brief 记录为具体值，不要主动推荐或默认打开。opt-in 时 each clip's `dialogue_excerpt` is the subtitle source; post burns clip-level aligned subtitles from clip durations per `<workflowsDir>/_shared/subtitle-pipeline.md`. Word-level alignment is out of scope; do not promise it.
- Transitions default to hard cut; no fade-to-black anywhere, first frame is content, ending does not fade out. Cross-section jumps use light non-black transitions per `<workflowsDir>/koc-video/reference/shot-vo-craft.md`.
- When subtitle policy is off, BGM is off, and a single clip needs no deterministic post operation, omit Post and use the Production canvas proof as the final output; otherwise apply `<workflowsDir>/_shared/video-merge.md` in Post.
- Write each visual work item with a stable `id`, ordered product/creator/try-on `refs`, source hook or segment range, `clip_group_id`, `sequence_index`, `duration_target_s`, `audio_approach`, and a final `prompt`. Put aspect ratio and resolution in stage `execution_locks`. Include exact VO, subtitle/CTA text, product action, aliveness cues, start/end continuity, intentional cut reason, and QC-visible conditions in the prompt.

## Anti-patterns

- Skipping product/source grounding and generating from vague claims.
- Pre-creating document nodes for unrun stages (shot plan written at brief time, or empty "to be filled later" placeholders).
- Passing white-background e-commerce refs into video generation without a nativeness verdict.
- 为 KOC 口播/对白创建 standalone TTS、voice-prep、voice anchor 或 vo-overlay work item（用户未明确要求外部配音/替换音轨时）。
- 未经用户认可创作者锚图（或上传模特图未经 Brief 确认其博主锚角色）就写入 production refs。
- 真人出镜时跳过 assets、不带创作者锚/产品锚 refs 直接生成视频（纯文字描述博主 = 每条视频随机换人）。
- plan 存在未完成 required Stage 时绕过 executor 直接派 `hub_generate_video`，或 production 只确认了文档、未执行 video work items 就标记 done。
- 为已存在的 brief / shot-plan 文档再写重复的说明性 text node（成片说明并入既有文档或 group 标签，画布上 brief 只有一份）。
- 拍板项让用户在 chat 手打长文本回复而不用 `question` 选项。
- Brief 只给一条 hook 路线或一个 persona 推荐、不给候选；或用户选定后继续生成平行钩子版本。
- 多 clip 全部锁死在场景化锚图的同一场景；多条视频共享同一 hook + persona + 场景组合无差异点。
- Treating creator style, camera style, or "vlog感" as a product fact.
- Asking for a fixed KOC questionnaire when the product, hook, and platform are already clear.
- Re-asking hook, persona, or duration the user already gave.
- Turning KOC into high-polish brand film language without user approval.
- Splitting one try-on, demo, unboxing, or creator speaking action into many generated videos without a platform/timing cut reason.
- Dispatching a video work item whose dialogue exceeds the duration budget or hits the VO blacklist.
- Chaining a previously generated clip as the next clip's video reference.
- Fade-to-black transitions or empty fade-in openings.
