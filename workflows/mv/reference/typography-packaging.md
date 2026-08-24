# MV 动态字体与包装系统

## Stage-local 读取路由

Stage 3 建立全片字体系统，Stage 5 设计组级与逐镜包装：两者先读共用字体合同，再只读当前 `route_id` 所属风格区段，最后读音乐同步与 Gate；Stage 4 仅在用户明确要求 Research 时使用同一路由。Stage 6 直接复制 Stage 5 已展开的准确文字、字体配方和 Layer 过程，不重读本库：

- 共用字体合同：`hub_read(offset=1, limit=180)`，再读 `hub_read(offset=181, limit=45)`；拼贴 route：`offset=226, limit=10`；可爱 route：`offset=236, limit=10`；舞台 route：`offset=246, limit=10`。
- Y2K route：`offset=256, limit=11`；电影叙事 route：`offset=267, limit=11`；音乐同步、每组字段与 Gate：`offset=278, limit=57`。
- 若标题边界移动，只补读相邻最小切片；禁止退回整本读取、读取未选 route，或只把内部 route id 写进最终 Prompt。

## 文字来源与执行边界

先在 `production-plan.execution_excerpt` 建立内部文字账本，不从风格名、材质词和随机英文中拼伪文案。下列结构不复制到画布；画布“字体包装”只展示准确上屏文字、来源、时间、视觉角色、字体性格、色彩材质、版式和运动方式：

```yaml
text_ledger:
  language: Chinese | English | Mixed | other
  exact_texts: [{ text: "上屏原文", visible_text_token: "VISIBLE_TEXT=\"上屏原文\"", role: title | lyric_hook | keyword | label, source_cue_id: L01 | title | treatment, source_span: "对应完整歌词原句/标题", source_start_sec: 0, source_end_sec: 3, music_time_sec: 1.2, sequence_role: establish | identity | contrast | turn | hook | transition | resolve, visible_change: "这个词出现后画面发生什么变化", beat_ids: [], accuracy_required: true | false, execution: video | video_and_post_fallback }]
  agent_visual_words: [{ text: "从已确认内容提炼的短词", source_cue_id: title | treatment, source_span: "标题/Treatment 原文", music_time_sec: 0.0, sequence_role: "画面用途", visible_change: "可见变化" }]
  text_packaging: none | key_moments | lyric_visual | typography_led
```

- 用户提供的文字逐字保留，不翻译、不改大小写/标点，除非用户明确同意。
- 文字来源优先级固定为：最终成歌反推的高置信歌词关键词/Hook → 已确认片名 → 已确认 Treatment 中承担明确序列/画面作用的视觉词。Agent 不能为了“像某种风格”临时发明泛化英文、口号或品牌式文案。
- 每个文字事件必须回答“来自哪条 cue/标题、为什么是这个词、具体第几秒出现、出现后人物/空间/构图/视觉状态改变了什么”；只说明字体好看或跟着鼓点动不算作用。歌词来源必须同时保留完整 `source_span` 和整数 `source_start_sec/end_sec`，上屏 `music_time_sec` 使用 0.1 秒且落在来源窗口内。每个镜头只用一个语义主词/短句，不把完整歌词做成字幕。
- 每个可见词建立唯一 `visible_text_token`，格式固定为 `VISIBLE_TEXT="准确原文"`。Stage 5/6 只有该 token 引号内的字符允许出现在画面；token 只保留在内部 capsule，用户可见分镜和最终 Prompt 直接用引号写准确原文。route id、TYPE CAST、Display、Layer、chrome、frequency、window、日期码、颜色名和其它中英文执行术语都属于不可上屏说明。中文 token 不得翻译、音译或替换成英文，英文 token 不得改写大小写；模型难以稳定完成时保持同一原文和字形骨架，不自行换词。
- 每 12–15 秒镜头组只建立 2–4 个新的可读主词，优先 Hook、重复关键词和真正改变画面状态的词；其它 Shot 继承、变形、转移或回收已建立主词，不逐镜换新词。全片复用同一批核心词形成建立—升级—接管—收束，避免把每句歌词都变成一次陌生大字。
- 中文 Hero 优先 1–4 个完整汉字，英文 Hero 优先 1–3 个短词；较长准确短句拆成有语义的 2–3 行整体排版，不能删词、翻译或把完整歌词逐字铺满画面。
- 每个歌词文字事件同时绑定 `style_signature_plan.identity_signatures.typography_and_graphics`：拼贴字从纸张/印刷层发生，可爱字参与圆角图形与弹性尺度，舞台字进入 LED/投影/地屏/实体装置，Y2K 字进入年代界面与材质，电影叙事字进入有动机的环境、记忆或转折。不能先设计一套通用悬浮大字再换颜色冒充五种风格。
- 动态大字、字形变形、空间文字和歌词包装在 Stage 5 分镜中逐镜写完，并由 Stage 6 原样放进视频 prompt，标记 `execution=video`。
- 只有用户明确要求逐字准确的歌词、标题或指定文案，才标记 `execution=video_and_post_fallback`；视频模型仍完成动态包装，Post 只兜底准确文字。
- 用户上传字体/版式参考时，只借字形骨架、粗细、宽窄、字距、层级、材质、版式和运动机制，不复制参考中的 Logo、品牌和原文。
- 除非用户明确要求无文字，拼贴、可爱包装、舞台和 Y2K 默认 `typography_led`，电影叙事默认 `key_moments` 且在 Hook、转折或高潮允许完整接管；不可读日期码、界面符号和抽象字形只能作为 Marks，不能代替 Display A/B 的可读文字。`text_ledger` 不得为 `null`：没有可靠逐字歌词时，仍从已确认标题、主题、Treatment 和高置信 Hook 建立有来源的 `agent_visual_words`。
- “低置信歌词不用作逐字准确大字”只更换该事件的文字来源，不改变 `typography_led` / `key_moments`；Stage 3 必须让每个 `section_arc` 都有可供后续镜头组选用的高置信歌词词、标题词或 `agent_visual_words`，不得因前半段听写置信度较低而只为后半段登记文字。

## TYPE CAST

每个项目建立 2–4 个持续复用的字体角色：

```text
TYPE CAST
Display A: 主 Hero；骨架、字宽、字重、端点/笔画、字腔、字距、材质、颜色、尺度、空间角色。
Display B: 第二标题/关键词；与 A 在粗细、宽窄、曲直、衬线、实心/线框中至少形成两项对比。
Utility: 稳定小字、歌词辅助或身份说明；保持清楚，不是 A 的等比缩小。
Marks: 不承担新文字的边框、线、点、箭头、网点、纸边、涂鸦或字符碎片。
```

TYPE CAST 是全片的**语义与字形角色**：Display A 主词、Display B 第二标题/辅助词、Utility 信息和 Marks 图形可以使用不同原文；它们必须分别来自 `text_ledger`，不能临时拼文案。Layer A/B/C/D 是**同一个文字事件的画面层次**：Layer B 是当前准确主词的风格回声，Layer C 是该词的字符碎片、已登记 Utility 或非文字 Marks；如果出现另一句有独立含义的 Display B，它必须作为新的已登记文字事件，不得冒充 Layer B 回声。两套层级不得混写。

每个主要文字事件使用统一层级：`Layer A — HERO BASE` 是完整可读的主词与最大尺度；`Layer B — STYLE ECHO` 是同词的当前风格回声，如套印、CRT 残影、chrome 轮廓、投影或贴纸副层；`Layer C — ACTION / FOREGROUND` 是沿人物动作、镜头路径和前景遮挡运动的字符碎片、Utility 与 Marks；需要人物穿字或字腔转场时增加 `Layer D — OCCLUSION / RECOVERY`。层级随 route 改变材质和运动，不改变全片 TYPE CAST。

复杂包装的最低要求不是堆形容词，而是把同一个准确词做成有空间、有层级、有时间的事件：Layer A 负责完整可读与主尺度，Layer B 负责当前风格的材质/年代/光学回声，Layer C 负责人物、镜头和前景的动作关系，Layer D 只在穿字、遮挡或转场时承担恢复。每层都写占屏比例、前中后景、出现时刻、可读停留、一次主要变化和退出落点；不能把 A/B/C 压缩成“加大字、加残影、跟音乐动”。

视频模型不依赖真实安装字体名。用可见解剖描述字体：

- 骨架：condensed / wide geometric / neutral grotesk / high-contrast serif / slab / rounded / monospaced / brush / 中文方黑、圆黑、现代宋、窄黑、人文黑体。
- 字宽与字重：具体写窄/正常/宽、550–950 等级和 tight/normal/loose tracking。
- 笔画与字腔：直端点、圆端点、粗细对比、矩形/开放字腔、中文偏旁完整。
- 尺度：Hero 45%–120% 画幅，中尺度 18%–55%，Utility 6%–16%；一组文字先完整可读，再变形。

## 字体库投影合同

`route_id` 只供 Planner 在本文件中查找路线，不能单独充当视频模型能理解的字体说明。Stage 3 选择路线后必须把对应行编译为 `prompt_type_recipe`，Stage 5 逐值消费并写入分镜，Stage 6 原文复制，不把内部 route 名当成审美指令：

```yaml
prompt_type_recipe:
  display_a_anatomy: "语言适配后的骨架、宽度、字重、端点/衬线、字腔、tracking/行距"
  display_b_contrast: "与 A 至少两项明确对比"
  utility_anatomy: "清楚的小字骨架与用途；没有可靠原文时不生成可读小字"
  hero_layout: "占屏、行数、对齐边、越界/留白和阅读顺序"
  surface_model: "油墨/纸纤维/贴纸/LED/投影/chrome/玻璃/环境表面的具体质感"
  edge_and_depth: "平面印刷，或具体侧面厚度、倒角强度、接触阴影/反射；不写泛化立体字"
  lighting_response: "继承哪盏场景光、哪一侧高光与阴影，不使用无来源发光"
  allowed_visible_tokens: ["VISIBLE_TEXT=\"准确原文\""]
  forbidden_visible_text: "除 allowed_visible_tokens 外不出现任何字母、汉字、数字、伪品牌或界面文案"
```

- 最终视频 Prompt 必须展开 `prompt_type_recipe` 的实际内容；只写 `y2k_chrome_cyber`、`collage_zine_impact`、`圆体`、`高级大字` 或字体库名称不算投影。
- 中文路线先保证偏旁、字腔、笔画连接和阅读重心，再应用宽窄、衬线、像素、chrome 或手写效果；不得把中文强行套成拉丁字母结构，也不得自动换成英文同义词。
- 立体字写清侧面厚度、边缘和同场景受光。Y2K chrome/果冻字使用浅浮雕或可读的实体厚度、宽阔字腔和单一主高光，避免多重描边、厚重斜面、默认金属 WordArt、廉价霓虹外发光和无法辨认的镜面扭曲。
- 平面字写清纸纤维、油墨渗边、贴纸白边、投影断面或屏幕像素怎样贴合载体；不得用通用阴影把所有路线伪装成立体悬浮字。

## 中文、英文与混排

### 英文

- 高冲击：extra-bold condensed grotesk，适合压屏、竖排、跨边和动作撞击。
- 编辑感：high-contrast serif 或 slab display，适合纸面、电影、拼贴和安静段落。
- 清新：rounded soft grotesk / chunky playful display，适合圆角框、贴纸和弹性运动。
- 科技：wide geometric sans + monospaced utility，适合扫描、线框和精密标注。
- 手写只作 Display B 或 Marks，不承担长歌词和随机签名。

### 中文

- 超粗方黑：2–4 字全屏 Hero；保持偏旁、字腔和重心完整。
- 几何圆黑/怪趣粗黑：2–6 字可爱标题；单字夸张不破坏阅读。
- 现代宋/粗宋：编辑、电影和纸面标题；配中性黑体 Utility。
- 窄体黑/几何线框：科技、纵向空间和背景字阵；主信息仍保留实心阅读焦点。
- 粗笔刷/现代手写：只作短情绪词、批注和下划线动作。

### 中英混排

指定主语言与编辑语言，分别承担 Display A/B/Utility。两种语言共享一个对齐边或空间轴，但不逐条机械翻译、不融合成不可读字块。主语言高度 100%，次级语言通常为 22%–45%；需要次级接管时可升到 55%–85%。

## DESIGN SCORE

```yaml
type_design_score:
  scale_ladder: [full_frame, mid, small]
  color_script: "背景与 A/B/Utility 的颜色角色及一次反白/专色接管"
  graphic_kit: ["2–4 个持续复用的框、纸片、面板、线、圆环或网点"]
  space_binding: ["至少两种人物/墙/地/玻璃/纸缝/镜头入口关系"]
  composition_states: ["3–5 个有继承关系的版式状态"]
  motion_cues: ["每个状态的音乐触发、主动作、可读时刻和回收点"]
```

全片保持同一 TYPE CAST、主色组和 Graphic Kit；允许尺度、前后景和材质变化，不每镜随机换字体。

## 歌词/内容—空间字体合同

每个主要文字事件先锁来源与时间，再设计造型和运动：`source_cue_id + 完整歌词/标题原文 + source_start/end → 上屏短词 + music_time_sec → sequence_role + visible_change → 音乐/动作触发 → 空间绑定/独立包装平面 → 下一状态`。相同 Hook 再次出现时可以复用同一 Display A，但必须改变或升级空间、人物关系、材质、遮挡或退出结果，形成建立—升级—接管—收束，而不是重复贴一次同样的大字。视觉模式的 `sequence_role/visible_change` 只描述画面作用，不编剧情。

空间字体必须遵循一条可追踪的过程：`DISCOVER → ATTACH → TRACK → OCCLUDE → TRANSFER → SETTLE`。

- **DISCOVER**：镜头、人物动作、光线、遮挡或版式先揭示文字的进入方向和深度关系，不让文字无因漂在画面上。
- **ATTACH**：文字可以绑定墙、地面、玻璃、舞台、纸面、人物轮廓、服装、道具和字腔，也可以建立在镜头与主体之间、主体与背景之间或跨画幅边界的独立包装平面；两者都写清透视、光线、材质和深度。
- **TRACK**：相机和人物运动时保持同一消失点、尺度变化、视差与空间朝向；字体不突然变成贴屏图层。
- **OCCLUDE**：人物、道具、建筑边缘或字体自身产生真实前后遮挡；关键字先有完整可读停留，再允许被遮挡、切片或变形。
- **TRANSFER**：文字沿动作、视线、镜头路径、共同形状或字腔，把注意力和运动方向交给下一人物、空间或镜头。
- **SETTLE**：在下一个稳定平面恢复、重组、退出或成为下一状态的一部分，留下清楚终态。

一个主要字体事件至少写清空间绑定或独立包装平面、前中后景、消失方向、光照/材质、人物或前景遮挡和镜头移动后的落点；高能包装组优先让同一词跨越两个可见深度或平面。Hero 大字可以越界压屏、切开构图、从人物前后穿插或成为转场入口，不必伪装成墙面标语。只固定在画幅上的 Lens-locked 字用于 Utility、界面或一次全屏接管；普通悬浮标签、无透视贴字和持续贴脸跟随不算空间包装。

每个主要文字事件同时记录 `spatial_proof`。至少满足三项，其中包含一项人物/前景遮挡，以及“透视收缩/视差变化/可见侧面厚度/接触阴影/同源反射折射/跨景深清晰度变化”中的至少一项；只写“有空间感、贴在墙上、跟随镜头”不通过。真实载体或独立包装平面都必须由动作、镜头、光线或版式揭示，镜头运动后仍保持可见关系，退出时把方向或形状交给下一镜。

## 字体运动机制

每个项目选择 2–4 个机制，分配到不同镜头组，不在同一时刻全部叠加：

1. **Full-frame Hero takeover**：短词从中尺度扩到满屏，完整可读后被人物/物件真实遮挡，再退到后景或退出。
2. **Subject/type depth exchange**：人物与文字在前后景交换，保持透视、视差、遮挡和最终共同可读。
3. **Scale ladder**：同一文字按中尺度 → Hero → 局部裁切依次出现，前一档退出后再进入下一档。
4. **Split-stack assembly**：短句拆成 2–3 个语义行，从不同方向吸附到同一网格，完整后作为整体移动。
5. **Typographic portal**：真实字腔或笔画放大成镜头入口/遮挡面，下一状态恢复完整词。
6. **Material transition**：纸边、光、粒子、扫描或玻璃只改变经过区域，完成后回到统一字材质。
7. **Multi-panel poster**：人物、Display A、Display B/Utility 和材质面板组成动态海报，一个面板扩张成下一场景。
8. **Repetition field**：只重复一个已确认词，低对比轮廓形成阵列，一个实心词保留阅读焦点并最终接管。
9. **Contour/space binding**：文字沿人物轮廓外侧、墙地消失线或纸缝建立独立平面，保持安全间距和正面可读。
10. **Annotation choreography**：真实对象边缘长出一条线，到点后完整标签出现；线和标签一起保持后依次回收。
11. **Kinetic type field**：一个完整主词保持实心可读，其余字母拆成前中后景字符场，沿人物动作、镜头路径或音乐脉冲旋转、散开、聚合；回收时重新组成主词或退出画面。
12. **Window / interface choreography**：文字、人物和媒介分别进入旧电脑窗口、播放器、卡牌或圆角面板；通过选择、级联、扩窗和全屏接管推进场景，一个主窗口始终承担阅读焦点。
13. **Shape-mask reveal**：圆形、星形、人物轮廓或真实字腔成为可见窗口，先揭示下一画面局部，再扩大完成场景切换；形状来自当前 Graphic Kit 或内容母题。
14. **Volumetric title object**：短标题以 chrome、充气、玻璃、金属或软塑的立体物存在于真实/CG 空间，接受同一光源、透视、遮挡和人物接触；完整可读后才旋转、挤压或成为入口。
15. **Continuous letterform morph**：同一词、字腔或笔画保持一个可追踪轮廓，连续变成物件、图形或下一段文字；前后共享形状、方向或色彩，完成后恢复新的清楚主体。

每组遵循：`触发 → 构建/揭示 → 完整文字 → 可读停留 → 一次响应 → 稳定/退出`。文字在变形、切片、撕裂或遮挡前必须有清楚可读时刻。

### 字体与镜头联动

每个文字事件先选择一种空间绑定，再选择至多一种主镜头响应。绑定关系必须持续到该文字退出，不在运动中从空间字突然变成无透视贴片：

| 绑定方式 | 可执行关系 |
|---|---|
| World-locked | 文字固定在墙、地面、玻璃、屏幕、舞台或空间深度中；跟拍、环绕和升降时保持透视、视差、光照与真实遮挡 |
| Lens-locked | 文字固定在画幅或安全框，背景和主体从其后方运动；只用于频道标识、Utility、界面或一次全屏接管 |
| Subject-bound | 文字沿人物轮廓、服装、道具或动作路径建立独立平面；跟随整体位移，不扭曲脸和身体，不持续黏在主体上 |
| Transition-carrier | 字腔、笔画、文字面板或立体字短暂占满镜头，成为下一镜入口；下一镜必须继承方向、颜色、形状或运动速度 |

| 镜头/动作 | 字体响应 |
|---|---|
| 推近 / crash zoom | tracking 逐步收紧、字重或尺度增加，在目标词完整可读时落稳；只响应一次重拍或信息揭示 |
| 拉远 / 空间揭示 | 从局部笔画或裁切字退到完整标题，再显出它与人物/场景的空间位置 |
| Dolly zoom | 人物尺度近似不变，字宽、字距或背景文字深度随空间拉伸/压缩；用于认知突变和关系压力 |
| Whip pan / 甩镜 | 字形沿甩动方向产生短暂拖影或切片，在下一镜同方向重新拼成完整词；落稳后恢复清晰 |
| Rack focus | 焦点从人物/物件转到空间文字，文字由柔化半透明变为清晰实心；或反向把阅读焦点交回人物 |
| 环绕 / camera roll | 平面字保持真实空间朝向，立体字显示侧面厚度和视差；旋转结束时回到可读角度，不让贴片机械反转抵消镜头 |
| 手势 / 乐器 / 舞步撞击 | 接触点驱动一次压缩、扩张、裂开、发光或颜色接管，随后按惯性回弹/退出，不让无关文字同时跳动 |
| Handheld / frame skip / step-printing | 字体继承有限的采样、扫描或印刷抖动，关键可读停留恢复稳定，不让整段持续漂移 |

### 长片包装编排

- 全片选择 2–4 个主机制持续复用。第一次建立规则，第二次改变尺度/前后景，主副歌让其中一个机制接管，结尾以简化、反向或回到初始版式完成收束。
- 同一个 Hook 可以保持相同 Display A 和进入动作，但重复段必须改变空间、人物遮挡、材质或退出方式；不逐镜更换字体和包装体系。
- 接近 15 秒的拼贴/Y2K 组通常让 60%–100% 的 Shot 承担文字层，至少包含 1 次 Hero 接管、2–4 次中尺度/空间文字变化和持续复用的 Utility/Marks；可爱包装/舞台组通常覆盖 40%–80%，高潮同样可以由贴纸 Hero、LED/投影或立体标题全面接管。电影叙事的安静段通常使用 2–4 个与环境透视融合的完整事件，高能 Hook/转折可使用 3–6 个并包含一次 Hero 接管；只有用户明确无文字时才为 0。同一时刻仍只保留一个主词和阅读焦点，复杂度来自尺度、空间、材质、遮挡、镜头联动与段落演进，不靠每镜随机换字体。
- 窗口、形状蒙版、立体标题和字腔入口属于场景结构时，必须写进对应 subshot 的空间、镜头和转场过程；不能只在 Typography 一栏写一个效果名。
- 声音只决定触发与运动方式：重拍适合扩张/撞击/全屏接管，groove 适合字符场和窗口连续运动，歌词 Hook 适合主词出现，texture swell 适合材质或字形连续变形，呼吸与静默负责完整可读停留和回收。

## 字体包装路线选择

Stage 3 根据已确认风格、内容形态、音乐、歌词语言和 refs 选择一个主 `route_id`，只在高潮需要明确反差时增加一个同风格辅助路线。用户已给字体/包装 ref 时优先吸收其骨架、层级、材质、色彩角色和运动机制；下列内部结构写入 Production capsule，不复制到画布。画布用自然语言和表格展示同一设计结果。

```yaml
typography_system:
  style_id: cool_paper_collage | cute_animation_packaging | fx_stage_performance | y2k_retro | cinematic_narrative
  primary_route_id: "一个主路线"
  accent_route_id: null
  route_reason: "内容、音乐或参考依据"
  prompt_type_recipe: { display_a_anatomy: "", display_b_contrast: "", utility_anatomy: "", hero_layout: "", surface_model: "", edge_and_depth: "", lighting_response: "", allowed_visible_tokens: [], forbidden_visible_text: "" }
  type_cast: { display_a: "", display_b: "", utility: "", marks: "" }
  palette_roles: { background: "", display_a: "", display_b: "", utility: "", accent: "" }
  material_stack: []
  layout_grammar: []
  motion_mechanisms: []
  camera_type_bindings: []
  visual_event_plan: [{ exact_text: "", visible_text_token: "VISIBLE_TEXT=\"\"", source_cue_id: "", source_span: "", source_start_sec: 0, source_end_sec: 0, music_time_sec: 0.0, sequence_role: "", visible_change: "", beat_ids: [], spatial_binding: "", carrier: "", spatial_proof: [], transition_destination: "" }]
  design_score: {}
  route_projection_gate: required
```

- 每条路线是可选配方，不是全量清单。全片只维持 2–4 个字体角色、一个主色组、2–4 个运动机制和一套 Graphic Kit。
- 有颜色贡献的用户/Research ref 时，原图承担具体色值；只把背景、Hero、辅助、专色等角色关系写入计划，不从图片猜色名或十六进制值。
- 没有颜色 ref 时，从当前路线选择一套组合并逐色分配到 `palette_roles`，不把颜色名称原样堆成无职责列表；基础色承担大面积，专色只在 Hook、重拍、歌词关键词或段落接管时出现。
- 颜色运动只在当前 `palette_roles` 内执行：可用背景/文字反白、专色短暂接管、同词逐字交替色、材质高光扫过或 CRT 短暂 RGB 分色；完成后回到主色组，不做持续随机色相循环。
- Stage 5 从 `text_ledger` 为当前组选择 2–4 个准确文字，以 Stage 3 的 `prompt_type_recipe` / TYPE CAST 为锁，直接决定文字进入、组级字体系统、每个 Shot 的 Layer A/B/C、按需 D、空间绑定、人物/镜头联动、可读停留、跨镜传递和退出，并完整写进分镜。内部 `route_id` 只用于定位，不能代替最终字体配方。
- Stage 6 不重新选择文字、route、字体、颜色、材质、空间或 Layer；它把 Stage 5 的组级字体系统与同编号 Shot 字体过程逐字复制到固定六段 Prompt。

### 五种风格的 Layer 投影

| 风格 | Layer A — HERO BASE | Layer B — STYLE ECHO | Layer C — ACTION / FOREGROUND |
|---|---|---|---|
| 炫酷剪纸拼贴 | 超粗窄字、stencil、酸性宽窄对比的完整 Hero 词 | 同词复印、半调、套印、撕纸或丝网回声 | 字符沿纸缝、人物动作、海报边和消失点穿插 |
| 可爱动画包装 | 圆体、手写、泡泡或果冻 Hero 主词 | 同词蜡笔/马克笔轮廓、软阴影、贴纸白边或糖纸高光 | 星点、花朵、小漫画线、糖珠和字符沿人物动作、镜头路径与景深穿插 |
| 特效舞台表演 | LED 主屏、地屏、投影或立体标题装置 | 同词线框、激光、粒子、镜面/投影回声 | 字符沿光束、舞步、乐器和镜头前景形成空间轨迹 |
| 千禧复古年代 | 酸性、CRT/像素、chrome、bubblegum 或 DV 编辑 Hero | 同词 RGB 分色、扫描、液态塑料、广播/杂志副层 | 光标、贴纸、窗口碎片和字符沿鱼眼、直闪、镜面运动 |
| 电影感叙事 | 衬线、人文无衬线、档案或空间标题的完整关键词 | 同词胶片、反射、光学炫光、手写/档案或环境材质回声 | 字符沿风、玻璃、道路、照片、人物视线或记忆转场运动 |

### A. 炫酷剪纸拼贴风

| route_id | 字体骨架与层级 | 材质与配色 | 版式、运动与适用段落 |
|---|---|---|---|
| `collage_zine_impact` | A：extra-condensed heavy grotesk / 超粗窄黑；B：报刊衬线或 slab；Utility：工业 mono | 油墨黑 + 纸白 + 警示红；复印颗粒、网点、轻套印偏移 | 跨边 Hero、非规则分栏和纸缝吸附；主歌建立版式，副歌由短词压屏并以撕纸遮挡退出 |
| `collage_xerox_punk` | A：粗粝方黑或 raw grotesk；B：尖角手写/窄体标签；Utility：打字机等宽 | 骨白 + 焦黑 + 酸性黄绿；复印爆黑、折痕、胶带、磨损纸边 | 文字像被贴上、撕下、重印和错位回弹；适合 Rock、Post-punk、攻击性表演和短促鼓点 |
| `collage_acid_editorial` | A：超宽几何字与极窄字形成强对比；B：高反差衬线；Utility：小号 grotesk | 深黑 + 荧光绿或高饱和橙紫专色；丝网油墨、液态扭曲、色块 | 文字沿网格拉伸、宽窄轴变化、局部弯折后恢复；适合实验电子、Rave、时尚编辑和连续 groove |
| `collage_rock_blackletter` | A：压缩黑体与尖锐 blackletter 二选一主导；B：粗 slab；Utility：窄体无衬线 | 黑 + 旧纸灰 + 暗红或钴蓝；粗糙墨迹、划痕、金属油墨 | 主标题像乐队标识占据中心，吉他/鼓击触发轮廓裂开或重影；只用于短词，长歌词交给清楚 Utility |
| `collage_technical_stencil` | A：重型 stencil / 切口方黑；B：工程 mono；Utility：编号和网格标签 | 深蓝黑 + 工业白 + 安全橙；喷漆、钢印、蓝图线、印章 | 字块沿空间结构卡位，推镜时逐段对齐，机械 hit 触发切口发光；适合工业、机能、城市与 3D/UE 空间 |

### B. 可爱动画包装风

| route_id | 字体骨架与层级 | 材质与配色 | 版式、运动与适用段落 |
|---|---|---|---|
| `cute_sticker_bubble` | A：chunky rounded / 几何圆黑；B：轻手写；Utility：清楚 rounded sans | 奶油白 + 珊瑚粉 + 薄荷 + 深可可；贴纸白边、软阴影 | 主词由人物手势、表情或道具碰撞弹入，只回弹一次后稳定；适合明亮 Pop、人物反应和副歌 Hook |
| `cute_soft_geometric` | A：wide soft grotesk；B：细圆体；Utility：中性人文无衬线 | 晴空蓝 + 奶油黄 + 深海军蓝；平涂色块、喷枪柔和渐变、轻纸纹 | 字距随旋律呼吸，圆形和弧线在留白、人物和环境之间引导阅读；适合温暖叙事、轻 Funk 和较慢的完整动作 |
| `cute_crayon_notebook` | A：完整结构的怪趣粗黑；B：蜡笔/铅笔/马克笔手写；Utility：清楚人文无衬线 | 暖纸白 + 番茄红 + 草绿 + 铅笔灰；蜡笔纹、纸张、手绘轮廓、下划线 | 主词完整出现后，线条才沿人物/道具动作逐笔画圈、延长、补小漫画或完成遮挡转场；适合 2D、真人涂鸦和生活感段落 |
| `cute_jelly_plastic` | A：充气圆体或柔软半透明字；B：小型几何字；Utility：清楚 neutral sans | 透明果冻粉蓝 + 柠檬黄 + 葡萄紫；软塑、糖纸高光、轻折射 | 立体字在景深中漂浮或受人物/巨大道具触碰后挤压回弹，保持统一光源、正面可读和受控侧面厚度；适合 3D/UE、舞蹈和糖果感电子乐 |
| `cute_photo_doodle` | A：稚拙但完整的手绘粗体或自然圆体；B：松弛马克笔/蜡笔手写；Utility：克制小号 sans | 真实照片/场景主色 + 1–2 个高饱和线条专色；马克笔、蜡笔、荧光描边和轻复印纹 | 手绘轮廓、星点、花朵和小漫画线沿身体、发丝、视线、道具及镜头路径生长，Hero 词可与人物前后穿插并在下一场景重组；适合真人、旅行、青春和快剪段落 |

### C. 特效舞台表演风

| route_id | 字体骨架与层级 | 材质与配色 | 版式、运动与适用段落 |
|---|---|---|---|
| `stage_led_arena` | A：超宽几何无衬线或强重窄体；B：中性 grotesk；Utility：舞台 mono | 黑场 + 电光蓝 + 冷白，高潮加入单一红色；LED、发光边缘 | 主标题绑定主屏/地屏透视，灯光扫描后完整亮起；适合体育场 Pop、完整副歌和舞台全景 |
| `stage_laser_outline` | A：实心 Hero + 同骨架线框副层；B：精密 mono；Utility：小号无衬线 | 深黑 + 激光青 + 品红或紫；线框、光束、薄雾 | 线框沿舞台消失线聚合成实心词，环绕镜头显示空间深度；适合电子、舞蹈和段落 build |
| `stage_particle_assembly` | A：重型几何字；B：细窄体；Utility：克制标签 | 深靛 + 银白 + 高潮金；粒子、尘雾、能量丝 | 粒子从真实灯具、地面或人物动作路径聚成字，清楚停留后再散回来源；适合 texture swell 与高潮释放 |
| `stage_projection_body` | A：高对比宽体或大型衬线；B：线性无衬线；Utility：投影标签 | 黑白基底 + 单一饱和投影色；投影、镜面、折射 | 文字作为投影落在人物和布景不同深度，人物遮挡使字断开再在空间重组；适合感官舞台和慢节奏表演 |
| `stage_chrome_monument` | A：超宽/超重立体字；B：窄体几何字；Utility：工业 mono | 黑 + chrome silver + 冷蓝或热红高光；金属、玻璃、镜面 | 立体标题作为舞台装置被推镜、环绕或人物穿越，重拍只改变一次尺度/光色；适合 3D/UE、工业舞台和 Final Hook |

### D. 千禧复古年代风

| route_id | 字体骨架与层级 | 材质与配色 | 版式、运动与适用段落 |
|---|---|---|---|
| `y2k_acid_rave` | A：夸张超宽/极窄 display、扭曲但可回正的开放字腔或液态切角；B：硬质 grotesk；Utility：micro mono | 黑 + acid lime + 紫罗兰或炽橙；酸性渐变、丝印噪点、液态塑料 | 主词沿非对称网格和窗口边界改变字宽/字距，bass 拉伸、重拍压缩后恢复完整基线；适合 Rave、实验电子和高密度副歌 |
| `y2k_crt_terminal` | A：有机像素 grotesk、低分辨率方体或圆角早期桌面 display；B：半透明窗口标题；Utility：terminal/system mono | CRT 黑 + 磷光绿/琥珀橙，或冰蓝 + 淡紫半透明面板；扫描线、RGB 色散、像素光晕、窄倒角控件 | Utility 建立稳定窗口/HUD 骨架，光标选择、窗口级联，一个主面板扩满画面并变成真实空间入口；适合桌面、播放器、监控和设备内外转换 |
| `y2k_chrome_cyber` | A：锐利宽几何字、迷宫式开放字腔或窄未来体；B：细窄无衬线；Utility：等宽标签 | chrome silver + baby blue + 深黑；浅浮雕侧厚、单层窄倒角、单一主高光和清楚正面 | 字体作为可读反光物接受同场景光线，人物遮挡或相机穿越后回到正面落点；适合 3D/UE、Dance-pop 和主副歌接管 |
| `y2k_bubblegum_gloss` | A：宽字腔泡泡/花体 display 或柔软粗体；B：脚本体只作短词；Utility：清楚 neutral sans | bubblegum pink + 奶油白 + baby blue + 巧克力棕；亮面塑料、果冻、透明 PVC、贴钻与珠饰 | Hero 保持同一基线；中尺度词可成为镜面、设备外壳、服装或配饰上的贴钻/珠饰实体，触碰后挤压、闪光或弹回并交接下一镜 |
| `y2k_pixel_arcade` | A：可读 bitmap / pixel-bead display；B：像素 serif；Utility：固定状态栏游戏 mono | 草绿 + 淡紫 + 荧光黄，或黑 + 主机灰 + 红色专色；1-bit/低色深、抖色、像素图标块 | 持续 HUD 保持同一网格，动作结果只更新有来源的状态/主词；角色选择、像素溶解或视窗放大真正改变场景，适合 2D、游戏世界和 Break 段 |
| `y2k_editorial_dv` | A：90 年代高反差窄衬线或 faux-condensed display；B：粗 grotesk；Utility：日期/频道 mono | 纸白 + 墨黑 + 水洗蓝或暗红；DV 颗粒、直闪、杂志裁切、镜面 | 字体在 4:3 安全框、杂志跨页、画中画和频道框架间传递；鱼眼/直闪负责爆点，完整表演段保留稳定标题和 Utility 阅读轴 |

### E. 电影感叙事风

| route_id | 字体骨架与层级 | 材质与配色 | 版式、运动与适用段落 |
|---|---|---|---|
| `cinematic_editorial_serif` | A：高反差 Didone / 现代宋；B：中性 grotesk；Utility：细人文无衬线 | 象牙白 + 炭黑 + 克制暗红；清洁印刷或轻胶片颗粒 | 大留白、慢显影、完整标题与人物错层；适合爱情、时尚电影、关系转折和片名时刻 |
| `cinematic_humanist_realism` | A：人文 grotesk 或低对比衬线；B/Utility：同家族不同字重 | 雾灰 + 空气蓝 + 自然白；柔和光学、玻璃反射 | 文字安静进入墙、天空、道路或玻璃留白，rack focus 把焦点在人与字之间交接；适合当代写实、旅途与城市关系 |
| `cinematic_archive_dossier` | A：打字机/档案 mono 或窄体 grotesk；B：盖章式 slab；Utility：编号等宽 | 暖纸色 + 墨黑 + 氧化绿或褪色蓝；纸纤维、打字、档案标记 | 文字按证据、地点和时间逐层出现，推镜揭示批注关系；适合悬疑、调查、历史记忆和非线性叙事 |
| `cinematic_handwritten_memory` | A：自然手写只承担片名/短句；B：现代宋或低调 serif；Utility：清楚 sans | 暖白 + 褪色棕 + 阴影蓝；铅笔、墨迹、照片边缘 | 手写沿真实信件、照片、玻璃雾气或人物动作出现，叠化连接时间；长信息仍由 B/Utility 承担，适合青春和私人记忆 |
| `cinematic_period_engraving` | A：古典 old-style / 雕刻衬线 / 粗宋；B：small caps；Utility：时期匹配的低调 serif | 羊皮纸暖色 + 深棕黑 + 旧金或铜绿；压印、雕刻、旧纸 | 标题以克制中心构图、章节卡或建筑铭文出现；运动来自光影、相机和材质显现，不做现代弹跳，适合年代、史诗和仪式感 |
| `cinematic_minimal_spatial` | A：超轻或中等字重 neutral sans；B：窄体无衬线；Utility：小号 mono | 深黑 + 冷白 + 单一环境专色；雾、反射、体积光 | 标题远置于大空间或以尺度极小的负空间出现，随长镜头逐渐靠近/离开；适合科幻、孤独、梦境和克制片尾 |

## 音乐与歌词同步

每个主要文字事件只绑定一个 `cue_source`：downbeat、snare、808、instrumental hit、lyric hook、texture swell、speech stress 或 gesture contact。

```yaml
typography_cue:
  music_time_sec: 18.2
  clip_local_time_sec: 6.2
  source: lyric_hook
  exact_text: "原文"
  visible_text_token: "VISIBLE_TEXT=\"原文\""
  source_cue_id: L08
  source_span: "对应完整歌词原句/标题/Treatment 原文"
  source_start_sec: 17
  source_end_sec: 20
  sequence_role: hook
  visible_change: "出现后发生的可见变化"
  role: Display_A
  binding_mode: world_locked | subject_bound | transition_carrier | lens_locked
  carrier_and_depth: "空间绑定或独立包装平面、前中后景、消失方向"
  spatial_proof: ["真实遮挡", "透视/视差/侧面厚度/接触阴影/同源反射折射中的至少一项", "第三项可见证据"]
  enter: "如何进入"
  readable_hold_sec: 1.0
  response: "一次尺度/材质/空间响应"
  occlusion_depth: "谁在前、谁在后"
  transfer_and_settle: "如何把动作/视线交给下一状态并恢复、落稳或退场"
  execution: video | video_and_post_fallback
```

`source_start_sec/end_sec` 逐值复制 Stage 3 逐句整数时间轴；`music_time_sec` 和 `clip_local_time_sec` 是 Stage 5 分镜安排的视觉触发点，使用 0.1 秒并落在来源 cue 与当前 Shot 的交集内，不能伪装成新增的逐词听写精度。字体进入、可读停留、响应和退出必须在 Stage 5 绑定本组真实音乐中可听的歌词重音、Hook、重拍感、音色变化或呼吸，Stage 6 只把同范围 `audio 1` 与该原文绑定。

不要求每句歌词上屏。优先标题、重复 Hook、核心名词、段落首句和能量爆点；无可靠歌词时间时只对齐段落，不伪造逐字卡点。

## 每镜头组写入字段

Stage 5 的每个 Shot 在用户可见分镜中写完整歌词原句/纯器乐与对应主音乐时间，并把准确文字、上屏秒点、来源和画面作用按 `DISCOVER → ATTACH → TRACK → OCCLUDE → TRANSFER → SETTLE` 展开为可见的动作—镜头—空间过程；同时逐值写出字体骨架、尺度、材质/颜色、版式区域、空间绑定、Layer A/B/C、按需 D、变形、恢复与下一镜落点。`source_cue_id`、`VISIBLE_TEXT` token 和其它内部映射只写入 `execution_excerpt`，内部步骤名不作为屏幕文字。

Stage 6 逐字复制上述组级与逐镜内容。`typography_led` / `key_moments` 的已登记事件不得被改成“无动态文字包装”；只有用户明确 `text_packaging=none` 的 Shot 才写无文字。`text_packaging!=none` 时，分镜或最终 Prompt 出现“无可读文字”、“不出现任何可读文字”、“Layer A/B 为空”或整组只有 Marks时直接判定 Gate 失败，回到 Stage 5 当前组补齐 2–4 个已确认来源主词及其 Layer 过程。`route_projection_gate` 只有在 Stage 5 的 TYPE CAST、`prompt_type_recipe`、当前组上屏文字与逐镜 Layer A/B/C 均使用所选路线的骨架、材质、空间和运动，且 Stage 6 原样保留时才通过。

## Gate 与检查

- Stage 3：用户查看文字来源 cue、完整歌词原句、来源整数秒、上屏 0.1 秒点、画面作用、发生后的可见变化、语言、主/辅助 `route_id`、TYPE CAST、配色角色、材质、运动机制、空间路线和 video/post 分工。
- Stage 5：用户查看每镜完整歌词/纯器乐与来源秒数、准确文字、字体骨架/材质/尺度、Layer A/B/C、空间遮挡、运动、可读停留、传递和退出；字体设计在分镜确认时一并锁定。
- Stage 6：每个 `work_items[].prompt` 原样展示同组 Stage 5 字体内容、准确文字和有序 refs，`review.before_execution` 只用一条无换行短说明引导用户展开检查；`video_and_post_fallback` 条目另列 Post 保留。
- Stage 7：不重新设计动态大字，只执行已登记的准确文字兜底。

## 反模式

- 只写“加大字、做高级字体、跟音乐动”，没有文字、骨架、层级、时间和运动。
- 从风格名临时生成无来源口号，或字体只起装饰作用，无法说明它对应哪句歌词、为什么此刻出现和推动了什么变化。
- 把文字当作浮在镜头表面的贴片，没有明确空间绑定或独立包装平面、透视、视差、光照、遮挡和向下一状态的传递。
- 每镜随机换字体、颜色和版式，或让所有元素同时跳动。
- 把完整歌词默认做成字幕，或把视频模型生成的动态包装交给 Post 重做。
- 把任一风格的可读字体缩成不可读 Marks，或只写纸张、贴纸、灯光、CRT、chrome、颗粒等材质而没有歌词主词、TYPE CAST、Layer A/B/C、占比和运动过程。
- 只把内部 route id 写进最终 Prompt，没有把字体库路线展开为 `prompt_type_recipe`；或 15 秒内逐镜更换新主词，导致模型自行翻译、换字体和生成默认 3D 字。
- 画面要求中文 `VISIBLE_TEXT`，却在同一事件中提供英文同义词、翻译或可被误认成屏幕文案的技术词，导致中文被替换成英文。
- 文字从出现开始就破碎、变形或被遮住，没有完整可读时刻。
