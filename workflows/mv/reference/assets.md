# MV Stage 4 — 角色与场景锚点（可选风格 Research）

## Stage-local 读取路由

- 默认资产路线：`hub_read(offset=1, limit=19)`，再读 `hub_read(offset=83, limit=69)`；先生成/登记角色、条件场景和普通场景描述。
- 用户在资产确认后明确要求联网参考：补读 `hub_read(offset=20, limit=63)`，再按当前已选风格/字体 route 搜索。
- 若标题边界移动，只补读相邻最小切片；默认路线禁止读取 Research 区段。共享 asset pipeline 只提供依赖与执行纪律，人物卡版式服从本文件的 MV 四区身份卡。

## Stage 目标与默认路径

本 Stage 默认只生成或登记必要人物锚点和极少数条件空间锚点，不执行 Web Research。先读取 `production-plan` Stage detail 的内部 Production capsule，再读取用户可见制作计划；Stage 5 直接消费人物 anchors、条件场景 anchors、普通场景描述和 capsule 里的完整 `style_anchor`。

- 先判断用户现有图片是否已是可复用的角色卡。用户明确称其为角色卡/人物设定/四区身份卡，且图片实际覆盖同一人物的清楚脸部与正面、侧面、背面全身身份信息时，直接登记为当前角色锚点；不得重绘、翻新、裁切、加风格、生成第二张角色卡，也不得要求用户再次说明或上传。只有现有图片不是完整角色卡、没有覆盖必需身份信息，或当前项目需要新增未覆盖的稳定人物时，才依据 `anchor_requirements` 生成角色卡；需要场景连续时再同批生成必要场景卡。
- 角色判断先读取 `direction_mode`。故事模式读取制作计划中已经确认的人物身份、时代、职业、关系、剧情功能和服装事实；视觉模式只读取用户事实、主唱呈现、表演 persona、服装方向、`performer_voice_lock` 和媒介，不为了把角色“补完整”而虚构职业、关系或经历。随后再读取风格覆盖层。用户明确说“图 N 是角色卡”“用这张角色卡”或“用这张图做人设/脸/服装/造型”时，必须按实际图片完整度选择直接登记或作为生成参考，不能忽略其已说明的用途。
- 角色/场景图片只为跨视频派单保持稳定。一次性人物、普通场景、氛围背景和临时布置不升级成资产。
- 默认写 `style_reference_capsule.search_mode=not_requested`、`selection_mode=style_anchor_only`、`style_refs=[]`；没有风格图不是 Stage 阻塞项。
- 资产产出后使用下方固定 `review.after_execution` 文案，同时确认人物、服装与按需场景，并清楚介绍可选 Web Research。这不是另一张 `question`，不新增独立 Stage，也不让搜索阻塞资产生成。
- 用户回复继续、确认、不需要或未明确要求搜索时，立即完成 Stage 4。只有用户明确说“帮我找 / 搜一下风格参考”时，才在当前 Stage 执行下方可选 Research。

## 按需 Pinterest Web Research

### Query 与搜索

触发后读取内部 Production capsule 的 `style_anchor`、`<workflowsDir>/mv/reference/style-system.md` 所选风格段，以及按需 `<workflowsDir>/mv/reference/typography-packaging.md` 的当前字体路线。从里面提取视觉 DNA、空间/构图、光影、材质、VFX 包装、字体骨架和运动机制，编译 3–5 个英文 query；用一次 `hub_image_search(queries=[{query: "<英文短语>", num: 5}, ...], max_images_per_query=5, min_dimension=1200)` 批量搜索。当前能力优先返回 Pinterest 图片；Pinterest 没有合格结果时才使用普通网页图片搜索兜底。

查询分三路，全部寻找高审美 style frame、艺术指导与氛围机制，不找角色样貌：

1. **environment / scenography**：使用 `experimental music video art direction`、`audiovisual installation`、`stage scenography`、`empty performance set` 与当前风格的空间机制，寻找完整布景、景深层次、装置关系和可拍摄氛围。
2. **dynamic typography / packaging**：使用当前 `route_id` 的字体骨架/材质/运动机制，加 `kinetic typography art direction`、`motion design style frame`、`broadcast package` 或 `lyric visual system`，寻找文字与空间、透视、遮挡和运动关系。
3. **lighting / material / color**：使用当前风格的具体灯光、材质和成像词，加 `lighting design study`、`material color study`、`projection texture` 或 `cinematic color script`，寻找光色、表面、颗粒和空间气氛。

按 `style_id` 至少使用对应语义，不把五种风格都搜成普通时尚人像：

| 风格 | 环境 / 舞台方向 | 包装方向 | 光色 / 材质方向 |
|---|---|---|---|
| cool_paper_collage | experimental music video art direction xerox zine environment、photocopy collage installation style frame | kinetic collage typography motion design、screenprint misregistration title frame | torn paper halftone ink material study、ink black paper white warning red color script |
| cute_animation_packaging | candy-colored surreal music video set design、whimsical practical scenography、pastel fantasy environment、playful miniature world | hand-drawn doodle animation style frame、naive illustration kinetic typography、sticker and bubble title design | frosting jelly cellophane plush crayon marker material、candy pastel with dark outline color script |
| fx_stage_performance | audiovisual installation projection mapping scenography、sensory light art empty stage | spatial LED kinetic typography、projection title design style frame | volumetric beam reflective surface、laser particle lighting installation |
| y2k_retro | Y2K music video art direction CRT environment、miniDV chrome pop set style frame | Y2K broadcast design system、acid rave CRT kinetic typography | chrome plastic CRT phosphor material、direct flash bubblegum color script |
| cinematic_narrative | poetic 35mm production design atmosphere、memory film location and object style frame | restrained environmental title design、cinematic editorial typography frame | motivated natural light 35mm halation、story-specific material color study |

- 每条 Query 必须同时写当前媒介 `live action` / `Japanese 2D anime` / `Unreal Engine cinematic CG`，并从当前风格/字体 Reference 原样带入至少 2 个可见机制词；末尾追加 `environment-only style frame, empty scene, no people, no portrait, no character`，2D、UE 3D 和真人结果不能互相冒充。
- 不把“moodboard、aesthetic、cinematic、4k、高清、高级感、氛围感、参考图”单独当 query；至少同时包含 `art direction` / `style frame` / `scenography` / `motion design` 之一，以及具体空间、字体、灯光或材质机制。
- 每条 query 优先加入 `set design` / `environment` / `scenography` / `typography frame` 等非人像意图；不得加入 `portrait`、`runway`、`fashion editorial`、`model`、`outfit`、`wardrobe` 或 `character design`，除非用户明确要求搜索角色参考。
- 即使画面含表演者，也只评价其空间调度和尺度，不提取脸、身份、服装或人物造型给角色卡。
- 已有用户风格 ref 时只搜索缺失维度，不用搜索结果覆盖用户明确方向。整批为空时最多改写一次 query；再次失败就记录 `style_research_gap`，不虚构图片。

### 候选分析与选择

搜索工具完成尺寸、重复和文件过滤后，淘汰所有可见人物结果，再从三路组成 6 张质量短名单，调用一次 `hub_analyse_media(type="semantic", file_paths=[...], question="逐张对照当前 style_anchor 与 typography route：列出命中的具体空间、构图、光影、材质、成像和动态字体机制；检查是否为完整高质量 art-direction/style-frame、是否含任何人物、人脸、穿搭、品牌 Logo、水印、缩略图或普通棚拍。只保留无人物且至少命中三个当前 Reference 机制的图片。")`。

每张候选按四项判定：

- **Reference 命中**：至少三个可见机制直接对应当前 `style_overlay` / `typography route`，不是只因颜色相近；
- **完整风格样式**：能看出空间、层次、光影、材质、版式或运动潜力，是完整 art-direction / style-frame，不是孤立素材或单个字体样张；
- **审美质量**：构图焦点、色彩层级、材质细节和画面完成度清楚，分辨率足够作为下游氛围垫图；
- **无人物**：画面不含人脸、人体、模特、穿搭展示或角色设计；风格由环境、光色、材质、图形和字体承担。

以下候选直接淘汰：任何可见人物、时尚人像/秀场/街拍、地面散落杂志/照片、纯静态 scrapbook、品牌/Logo/水印/可读广告占主体、孤立字体样张、素材拼盘/缩略图、室内装饰拼贴、只靠滤镜而没有包装/空间/光色机制的图。

目标是把 6 张合格候选调用 `hub_canvas_write_node(kind="media")` 写入画布，稳定编号 `style_candidate_01..06`。首轮不足 6 张时改写 query 并补搜，不能用弱相关图凑数；仍不足时只展示通过质量门的候选并说明数量不足，用户可以选 2 张或直接继续，搜索不阻塞 Stage 4。

6 张候选就绪后才使用固定选择卡：`card_id=mv_style_reference_selection`，标题“风格参考”，题面“请从画布上的 6 张候选中选择 2 张，作为整支 MV 的氛围风格参考。”；选项只显示候选编号与一句具体机制摘要，必须允许多选且要求恰好 2 张。用户选中的第一张/更全面者登记为 `primary_style_ref`，另一张登记为 `secondary_style_ref`。两张需共同覆盖环境/空间、光色材质、字体包装中的至少两类且命中同一 `style_anchor`；未选候选保留为画布研究记录，但不进入下游 refs。选图不反向重做角色卡或场景卡。

```yaml
style_reference_capsule:
  search_mode: not_requested | pinterest_requested | pinterest_plus_web_fallback
  selection_mode: style_anchor_only | user_selected_2 | user_refs
  candidate_limit: 6
  candidates:
    - { id: style_candidate_01, path: "真实本地路径", node_id: "真实节点", contributes: [environment, lighting], human_dominant: false }
  selected_ref_count: 0 | 1 | 2
  primary_style_ref_id: null | style_ref_01
  secondary_style_ref_id: null | style_ref_02
  style_refs:
    - { id: style_ref_01, candidate_id: style_candidate_01, path: "真实本地路径", node_id: "真实节点", role: atmosphere_style, contributes: [environment, lighting, material, composition], take: adapt }
    - { id: style_ref_02, candidate_id: style_candidate_04, path: "真实本地路径", node_id: "真实节点", role: atmosphere_style, contributes: [typography, packaging, color], take: adapt }
  style_research_gap: null
```

`style_anchor_only` 是默认完整路线：Stage 5 把 `production_plan.style_anchor` 与当前已选风格/字体段投影到组级系统和每个 Shot，Stage 6 把对应连续原文逐字投影为最终 Prompt。用户明确搜索并选图后，Style ref 只提供氛围风格，不提供人物身份、脸、服装、产品/品牌事实、Logo、可读文字或必须复刻的单一构图；下游视频按当前镜头贡献绑定 primary 或 secondary，角色卡和场景卡都不绑定搜索图，未选候选永不进入下游。

## Questions

用户在主音乐确认后要求把同一演唱角色改成与 `performer_voice_lock` 不一致的性别呈现时，生成角色卡前使用固定卡 `card_id=mv_performer_voice_mismatch`，标题“角色与主唱”，题面“修改后的演唱角色会和当前主唱声线不一致，你想怎么处理？”；固定选项依次为“按新角色重做匹配音乐（推荐）— 重新生成符合新角色声线的歌曲 / 保留音乐，角色按当前主唱呈现 — 不改变现有角色—主唱一致性 / 保留新角色，改为不演唱 — 角色只表演或出镜，不做口型”。第一项返回 Stage 2 并更新下游，第二项保持当前锁，第三项写 `singer_character_relation=separate` 且后续不为该角色安排口型。不得只弹技术字段或静默生成不匹配角色。

## 人物锚点

只为跨两个及以上 `beat_id` / 音乐段落、预计会跨视频派单保持身份与服装的人物建立锚点。先判定已有用户图，再决定登记或生成；缺少人物锚点时，一个角色一个 `image` work item。

- **已完成角色卡复用路线**：当用户原始图片明确是该稳定人物的完整角色卡，并实际包含可用于后续视频的同一身份、脸部与全身造型信息时，写 `asset_route=register_existing_user_asset`、`source=user_ref`、`registration=preserve_existing_user_asset`、`generation=skipped` 和原始 path/node id。只将原图登记为当前唯一 `char_<slug>`，它直接锁定后续视频的人物身份与服装；登记项允许写入画布 media node，但绝不调用图片生成，不写重绘 Prompt，不创建第二张四区身份卡。用户原图保持原版式、画幅和内容，不要求它适配当前视频画幅。
- **不完整参考图路线**：只有单张脸照、单角度人像、穿搭照、氛围图或无法确认同一人物多视角的图片，才作为 `identity` / `wardrobe` ref 生成新的四区身份卡。生成前沿用用户明确指定的贡献，不从图片猜测未授权的人物事实。

- **默认原创路线**：人物 prompt 先按 `direction_mode` 写对应的人物事实：故事模式使用已确认的时代/职业/关系/剧情功能，视觉模式只使用用户事实、表演 persona、主唱呈现和服装方向；两者都写 `performer_voice_lock`，再单列 `medium_anchor` 与 `style_overlay`。`ordered_input_refs=[]`，不得把 Pinterest 候选或已选氛围 refs 传给角色卡。
- **用户明确参考路线**：只有用户明确指定某张真实图片用于人物身份、脸、服装或造型时，才把该图作为人物 ref，并在 `asset_anchors` 记录 `reference_use_explicit=true` 与具体贡献；未明确用途的上传图和所有默认搜索图都不进入角色卡。
- `singer_character_relation=same_performer` 时，角色卡的可见人物呈现必须与 Stage 3 从实际成歌反推并锁定的 `performer_voice_lock` 一致：female / male / androgynous / nonhuman 各自只落一个明确方向，不生成相反或模糊呈现；`separate` 时不把歌手声线强加给画面角色。
- `direction_mode=narrative_story` 时，人物依据已确认时代、地域、职业、关系与故事功能设计可信身份，视觉风格不改写角色。`direction_mode=visual_aesthetic` 时，只依据用户事实、主唱呈现、表演 persona、媒介与视觉方向设计角色，不补职业、经历、关系、秘密或故事任务；可以强化服装轮廓、材质层次、妆发与配饰，使其服务视觉审美和表演。
- 每条 prompt 继承 `production_plan.style_anchor.medium_anchor`、必要 `style_overlay` 与当前 `style_signature_plan`，写 `asset_style_projection`。人物卡只投影不会妨碍身份读取的服装轮廓、妆发配饰、主材质、色彩关系和成像质感，不在纯白身份卡上叠大字、界面或遮脸 VFX；条件场景卡/普通 `scene_descriptions` 投影空间构图、光线、材质、图形载体和可供 Stage 5 触发的风格机制。只写风格名不算投影。所有图片 prompt 以完全相同的 `medium_lock` 收尾，不得改变 2D、UE 3D 或写实真人底盘。
- 单张 16:9，`resolution=1k`、`quality=medium`，纯白背景，固定 `character_sheet_layout=mv_four_panel_identity_sheet`。这条 MV 专属布局覆盖共享 Asset Pipeline 的 six-view / 3×2 默认规则。
- 左侧约 30–35% 是一张大幅正脸特写：正视镜头、脸部无遮挡、五官/妆发/肤质清楚；右侧约 65–70% 分成三个独立等宽区域，依次为 front / side / back 全身，全部从头顶到鞋底完整入画，区域之间留清楚白色间隔。
- 四个区域保持同一张脸、年龄、发型、体型、肤质、服装、鞋、配饰和持续状态；右侧不是三张半身或重复角度，左侧不是第四张全身。
- 视觉模式人物必须体现当前 MV persona：先锋但可穿着的整体轮廓、至少两层服装结构、两种以上材质对比、明确妆发和 1–2 个标志配饰；不能默认普通黑西装、基础 T 恤或无设计棚拍模特。故事模式人物以已确认的时代、职业、地点和关系可信为先，但仍需清楚服装轮廓与人物辨识点。
- 人物卡只作为 identity / wardrobe ref，不冒充视频首帧。Prompt 必须逐字写出四区比例、四个指定视图、头脚完整和同一身份，不能只写“人物三视图/角色卡”。

Prompt refs 顺序固定为：用户明确指定的 identity refs → 用户明确指定的服装/造型 refs。没有用户明确授权时为空；搜索候选、已选氛围 refs 和“看起来像角色参考”的图片都不能补入。每个 slot 写清贡献，重复图片只传一次。

## 场景策略

普通 MV 不生成场景锚点。故事模式为每个地点写 `story_space + style_rendering`：先锁地点功能、时代、入口、结构、人物使用方式、剧情道具和 `beat_ids`，再叠加 `style_signature_plan` 中分配给该段的空间构图、光色材质、成像和转场载体。视觉模式写 `visual_space_state`：表演/展示区域、主体位置、空间尺度、前中后景、光色材质、图形/字体/VFX 状态、当前风格必现证据和对应 `beat_ids`；它可以是现实布景、抽象装置或媒介空间，但不得补人物为何来到这里、要完成什么任务或剧情道具。

只有以下任一条件成立时创建场景四视图 image work item：

- `direction_mode=narrative_story`，同一可识别空间跨多个预计视频派单，且人物走位、入口/出口、地标或光向连续会影响叙事；
- 用户明确要求所有相关镜头保持同一个真实/虚构空间；
- 同一叙事动作需要跨派单延续，缺少空间 ref 会导致方向、尺度或位置关系失真。

故事模式的条件场景卡为单张 16:9、`resolution=1k`、`quality=medium` 的 2×2 四视图。Prompt 先写 `story_space` 的正常空间与剧情功能，再写 `style_rendering`；顺序为同一空间正面、背面、左侧、右侧，保持入口、地标、固定物、剧情道具、尺度、时段、天气和光源方向一致，不放人物、标题或方向标签。除非 Content Truth 明确如此，拼贴不把建筑/家具变成剪纸，Y2K 不自动增加 CRT/旧网页，可爱不把空间玩具化，舞台风不把地点改成舞台。视觉模式只有用户明确要求保持同一具体空间时才创建条件空间卡，此时按已确认 `visual_space_state` 锁定布局、尺度、地标、光向和视觉状态，不补剧情功能或剧情道具。场景卡只作为 scene identity ref，不冒充视频首尾帧。

## Work Items、Gate 与交接

- 默认不创建 `style_research_doc`。只有用户明确要求联网找风格参考时才创建真实 canvas document node，并以 `modality=document`、真实 `document_node_id` 登记；简要展示三路搜索词、6 张合格候选、淘汰原因、用户选中的 2 张氛围 refs 及各自贡献。
- 搜索得到的图片登记为 Stage `ref_capsules`，不是生成 work item；生成的人物卡和条件场景卡创建 `modality=image` work items。已完成角色卡的登记项只写 `operation=register_existing_reference`，Executor 只登记已有 media node，不调用图片生成。
- 稳定媒体 id 使用 `char_<slug>` / `scene_<slug>`；同批图片使用同一 vendor/model lock，Stage-wide execution lock 记录 `medium_lock`。
- `asset_anchors` 记录 `id`、`role`、`source=user_ref|generated`、真实 runtime ref、贡献、对应 `beat_ids`、后续使用范围、`character_sheet_layout` 和 `asset_style_projection`；已完成角色卡登记后立即成为唯一当前 runtime ref。生成的人物卡只有实际输出通过四区版式检查且风格造型/材质没有退回普通默认人物时才可登记。
- 人物卡或场景卡重做时保留 Stage id `assets` 和原 `char_<slug>` / `scene_<slug>` work item id，在同一资产位置写入新结果；新结果成为唯一当前 runtime ref，原结果只进入 `superseded_runtime_refs`。不得追加 `assets-v2`、`assets-retry` 或其它平行资产 Stage，也不得为同一角色另造第二个逻辑 id。
- `scene_descriptions`、`style_reference_capsule` 和 `asset_anchors` 一起交给 Stage 5；视频阶段继续消费相同 refs，不重新搜索。

存在生成 image work items 时，`review.before_execution` 展示角色/场景生成清单、统一 `medium_lock`、每条最终 prompt、仅用户明确指定的人物 refs、四区人物卡版式、16:9、`resolution=1k` 和 `quality=medium`。已完成角色卡只展示“直接复用原角色卡”的登记结果，不增加生成前确认。`review.after_execution` 展示当前角色卡、必要的条件场景卡和普通场景描述；生成的人物卡若不是“左脸特写 + 右正/侧/背全身”则只重做该资产，不进入 Stage 5。

资产全部通过后，`review.after_execution` 的用户可见确认文案固定为：

> 角色资产已经完成，请确认：①角色的脸、发型和整体气质是否正确；②服装、鞋履、配饰和造型是否正确；③场景是否符合预期（只有本次生成了场景卡时才显示这一项）。我还可以按当前 MV 风格联网寻找 6 张高质量氛围参考，让你从中选 2 张，用于后续分镜和视频的风格统一。如果需要，请回复“帮我找”；如果角色和服装没有问题，直接回复“继续”“确认”或“不需要”即可跳过搜索并进入分镜。

这段说明与角色/服装/按需场景共用一次确认，不得拆成第二个等待节点。用户回复“继续/确认/不需要”立即完成 Stage 4；只有明确回复“帮我找/需要风格参考”才在当前 Stage 执行 Research。

只有用户明确请求搜索后，`review.after_execution` 才补充展示 6 张候选、用户选中的 2 张氛围垫图和研究缺口；搜索失败或用户不选图时保持 `style_anchor_only`，不返工已通过的角色/场景卡。

完成条件：所有必要人物 anchors、条件场景 anchors 和普通场景描述完整，且每项都有与用途匹配的 `asset_style_projection`；直接复用的角色卡保持用户原始身份与造型，生成的人物卡保持清楚身份同时体现当前风格造型/材质，场景描述能供 Stage 5 直接落实当前风格的空间、光色、材质和图形载体。默认 `style_reference_capsule.selection_mode=style_anchor_only` 即可进入 Stage 5。用户明确要求联网且完成选择时，2 张氛围 refs 必须都有真实本地 path 与画布节点；搜索无合格结果或用户直接继续时记录缺口并保持 `style_anchor_only`，不阻塞 Stage。

## 反模式

- 未经用户明确要求就搜索、创建搜索文档或弹出选图卡，打断资产确认后的继续操作。
- 搜索 portrait、runway、fashion editorial 或角色造型，导致候选出现任何人物。
- 把 Pinterest 搜索结果或已选氛围图传给角色卡，导致照抄陌生人的脸、品牌、服装或现成角色。
- 等搜索或选图才开始生成角色卡，制造无必要的串行等待。
- 用静态杂志拼贴、杂志堆、普通街拍或品牌广告代替 MV 空间、动态包装和光色材质证据。
- 用风格关键词覆盖人物身份或场景事实，例如把正常卧室做成剪纸房、把任意故事改成 CRT 房间、把普通角色默认做成先锋时尚模特。
- 人物卡退回共享六视图/3×2，或生成普通黑西装棚拍，导致版式和 persona 都不符合 MV。
- 用户已上传并明确指定完整角色卡时，仍把它当作普通人物 ref 重做角色卡，或在原角色卡之外保留第二个可用人物锚点。
- 重做人物卡或场景卡时创建第二个资产 Stage、保留两个可用角色 id，或让被替换的图片继续进入分镜和视频 refs。
- 为普通 MV 的每个地点生成四视图，并在所有视频中重复绑定同一场景图。
- 让用户选 2 张却展示超过 6 张候选，或把未选候选继续传给视频派单。
- 用户已明确选图时只保留文字总结，不把选中的真实图片写入画布和下游 refs。
