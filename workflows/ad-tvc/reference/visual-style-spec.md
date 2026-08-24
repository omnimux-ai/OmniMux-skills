# Anchors 前置视觉参考与 Style Master 契约

本卡只定义风格媒体的候选质量、选择标准、分析维度和 Style Master；搜索、冻结最终媒体、唯一批量分析、画布写入和 Plan 提交顺序由 `creative-research.md` 负责。内部审美基线只补齐用户与真实媒体未定义的视觉维度；产品图不作为风格图，风格媒体不贡献产品外观或人物身份。

## 1. 输入与媒体分支

- 输入为实际存在的 `brief_doc`，或已接纳脚本 / 分镜 source 中锁定的品牌、项目与视觉要求；同时读取 Plan 顶层 role 为 `style_reference_image` / `style_reference_video` 的 user sources、verified 品牌 / 产品事实、Direction Profile、Category Profile 和有来源的 `brand_palette`。不得为了读取本卡创建占位 Brief。
- 无已分析的风格图片或视频时，必须形成真实参考图片候选；有风格媒体时只补未覆盖的关键视觉维度。内部审美基线只能辅助生成检索词与补齐维度，不能单独作为 Style Master 或跳过真实媒体。
- 用户明确提供且指定使用的单支参考视频直接视为已选；存在多支视频、混合媒体或仍需搜索风格图时，Planner 只做明显不可用项预筛，把少量有效候选写入画布，让用户选择足以覆盖目标视觉维度的图片或视频，不规定固定采用数量。选择结果通过真实 canvas node ids 回传，不生成采用 / 未采用理由文档。
- 视频链接必须先取得当前 workspace 的真实 path；inspect 的标题、时长、分辨率、fps 和缩略图只用于获取校验，不能建立 `video_style_dna` 或视觉覆盖结论。
- 链接视频无法下载、需要登录或当前 Stage 没有本地 path 时，记录 `video_acquisition_gap` 并返回 Orchestrator 补齐来源；同时把视频覆盖度视为未知，按第 2 节搜索真实风格图片，不得用标题、用户偏好或内部基线替代视频分析。
- 只有已选视频的分析覆盖成像、构图、光线、色彩、材质和运动 / 节奏所需维度时才不强制补图；未选媒体留在候选池，不进入下游 refs。
- 已选视频取得本地 path 后，必须先完成本节的语义分析，再从分析中选出 4–6 个时间码明确、视觉差异足够的 Hero Shot。它们共同覆盖影调、成像质感、光线、空间层次和可迁移的构图节奏；排除片头片尾、纯字幕 / Logo 卡、重复帧和只靠人物或产品身份成立的画面。不得依据标题、缩略图或 inspect 元信息选帧。
- Hero Shot 必须有可辨认的有效画面内容：至少能看见主体、场景空间、明确物件或可迁移的光影 / 材质关系之一。禁止截取全黑 / 全白 / 纯色帧、淡入淡出或闪白 / 闪黑过程帧、只有字幕或 Logo 的画面、严重运动模糊至主体与空间不可辨的画面，以及任何无可用视觉内容的空帧。低照度本身不是淘汰理由；只要仍能辨认有效画面内容即可保留。
- 有多支已选视频时，按对当前 Style Master 的覆盖度选一支 `primary_video_reference` 生成唯一 Hero Shot 宫格，不能混拼不同来源；其余视频只保留各自的 `video_style_dna`。在 `research_video_reference_set` 记录主视频选择依据。

## 2. 内部审美基线与图片搜索

| `style_id` | 成像 / 质感 | 构图 / 运动 | 光色 / 氛围 |
|---|---|---|---|
| `cinematic_realism` | 轻胶片颗粒、浅景深、宽银幕光晕 | 三分法、稳定跟随、缓推拉 | 自然光、冷暖随情绪、暗部有层次 |
| `minimalist_luxury` | 高解析、干净材质 | 留白、对称或极端偏移、极慢运动 | 黑白灰加单一品牌色、精确工作室光 |
| `urban_energy` | 运动模糊、低保真数字感 | 紧构图、手持、快切 | 高饱和强对比、霓虹混合光 |
| `dreamy_softness` | 柔焦、bokeh、前景虚化 | 居中、多层虚实、缓慢漂浮 | 粉彩低对比、柔光和逆光光晕 |
| `tech_future` | 金属 / 玻璃高解析反射 | 中心对称、机械式精确运动 | 深背景、冷色边缘光、品牌 accent |
| `vintage_film` | 强颗粒、光漏、lifted blacks | 纪实构图、微晃和 zoom | 褪色色偏、自然窗光、怀旧温暖 |
| `documentary_authenticity` | 自然色、可用光、细微噪点 | 纪实构图、手持跟拍 | 极少调色、现场光、坦诚可信 |
| `surreal_concept` | 超清晰或刻意失真、混合媒介 | 透视错位、比例失真、不可能空间 | 去饱和或超饱和、多向光 |

每个项目选择一个 `primary_baseline`；只有明确段落对比时增加一个 `secondary_baseline`。用户要求和真实参考优先，体系外视觉语言保留为项目专属动态类型。

把基线与项目偏差编译为 1 个 `visual_style_type`；用户明确存在不可合并方向时最多 2 个。每类记录 `visual_style_type_id`、`visual_style_type_en`、`baseline_trace`、`rationale`、`target_dimensions` 和 `search_query`。

无已分析风格媒体、视频覆盖度未知或关键视觉维度仍有缺口时，为每个动态类型生成一个 query，交给 `creative-research.md` 的前置候选搜索步骤：

```text
{具体英文产品类型} {visual_style_type_en} commercial editorial cinematic
```

- 只保留真实广告、品牌 campaign、editorial 或 cinematic still；排除 AI 概念图、无来源拼贴和无关泛 moodboard。
- 每个动态类型保留 1–3 张，跨类型去重后收敛为总计 5–6 张差异明确的搜索候选并一次写入画布；可靠候选不足 5 张时只检查同轮剩余结果并展示当前全部有效项。采用集合以 Style Master 关键维度覆盖为准，可以是一张图片、一支覆盖充分的视频或多项互补媒体，不把搜索候选数当作采用数。
- 每张最终候选必须有 stable id、local path、source URL 和初步来源状态。用户选择并完成唯一批量分析后，把 `verification`、`contributes`、`take` 与真实 node id 补充到该媒体唯一的顶层 source；不能只留下 URL 或文字结论。

## 3. 风格分析维度

用户冻结最终产品与风格媒体后，在 Anchors author 前的唯一批量分析中按本节提取风格事实；本卡不发起独立分析，也不因 Style Master 编译再次读取媒体。

图片与视频共同提取色彩、光线、构图、镜头、成像媒介、材料质感和氛围。视频额外记录可执行的 Hero Shot 候选：`timestamp_s`、画面直接观察、它贡献的影调 / 视觉 / 构图信号，以及不应迁移的主体、品牌或叙事内容。视频额外记录：

成像媒介必须归纳为胶片 / 数字摄影 / 低保真数字 / 模拟电子信号 / 复合媒介之一或组合，并记录对应颗粒、halation、锐度、动态范围、高光滚降、压缩、扫描线或信号噪波；按最终观感判断，不机械添加胶片术语。

```yaml
rhythm_analysis:
  total_duration_s: N
  total_shots: N
  average_shot_duration_s: N
  shot_duration_sequence_s: [N, N]
  duration_range: {min: N, median: N, max: N}
  cuts_per_min: N
  segments:
    - {range: "0-30%", average_shot_duration_s: N, cuts_per_min: N, trait: "..."}
    - {range: "30-70%", average_shot_duration_s: N, cuts_per_min: N, trait: "..."}
    - {range: "70-100%", average_shot_duration_s: N, cuts_per_min: N, trait: "..."}
  pace_pattern: constant | acceleration | pulse | breathing
  shot_size_pattern: gradual | jumping | alternating
  signature_edits: [{type: "...", position: "..."}]
  confidence: high | medium | low
```

计数困难时给最佳估计并降低 `confidence`。品牌片视频含旁白时，补充人称、句长、文案密度、声画关系和情绪曲线。链接视频保留 inspect / download provenance。

按 `用户明确要求 > 已接纳媒体的贡献维度 > verified 品牌 / 产品事实 > 内部基线 > 品类默认` 处理冲突。不可兼容且会改变交付物、又无法通过实际 Brief、已接纳 artifact source 和 source role 判断时，返回 Intake owner 补齐决定；Visual Research 不发起结构化问询。

## 4. Style Master 编译与输出

把分析结果编译为唯一 `style_prompt` 和六维 Style Master：

| 维度 | 必要锚点 |
|---|---|
| 成像设备 | 主成像体系、画幅、镜头、焦段、景深、锐度、运动响应及依据 |
| 构图 | 景别倾向、主体位置、空间关系、负空间、透视、机位和视觉重心 |
| 光线 | 主/辅/轮廓/背景光方向与硬度、光比、阴影边缘、高光滚降 |
| 色彩结构 | 主辅色、高光/中间调/阴影关系、通道倾向、空间渐变、已验证色值 |
| 材料质感 | 与媒介一致的颗粒、光晕、黑位、高光、噪点、压缩或锐度特征 |
| 生成目标 | 汇总前五维的 1–2 句可执行 `style_prompt` |

`brand_palette` 记录 primary/secondary/accent/background/text-contrast 的 role、已验证 HEX 或 `as shown in verified reference`、`source_ref` 和比例，不推测无来源色值。

当当前已确认人物合同需要固定模特且目标产品不是穿戴类产品时，从已分析、已选的风格媒体额外编译一个 `wardrobe_style_brief` constraint：只记录可迁移的服装文字事实——廓形、层次、衣物类别、合身程度、材质表现、鞋履与必要配饰，以及与 Style Master 一致的克制程度。它必须明确 `source_mode: text_style_adapted`，并排除参考媒体中的人物身份、具体品牌、Logo、可读文字、单件服装款式复刻和画面构图。该简报只进入 Anchors 内部合同和人物卡最终 Prompt；原始风格图片、视频及 Hero Shot 宫格不得因此成为人物卡的 image ref。

将基线 provenance、动态类型、最终已选媒体及来源、贡献边界、分析摘要和收敛依据编译为唯一 `research_style_reference_set` 语义 capsule，并将六维结果写入 Anchors `style_master` constraint；搜索 query 和未选候选不进入 Plan。这些结论不创建重复媒体注册。本地视频完成唯一批量分析后才能写 `video_style_dna` constraint。有可用已选视频时，在 Anchors 中 author 唯一 `reference_video_hero_sheet`，从真实本地视频提取 4–6 个选中帧并合成为一张无标题、时间码、分隔线、Logo 或其他文字的 2×2 / 3×2 横版宫格。成图后必须检查每格有效画面；不合格时只替换时间码并重出。该图是 `work_items` 产出的唯一 `runtime_ref`，不复制为 `ref_capsules`；`contributes` 仅限影调、视觉质感、光线、空间氛围和轻微构图提示。后续不回读搜索过程或再次分析媒体。
