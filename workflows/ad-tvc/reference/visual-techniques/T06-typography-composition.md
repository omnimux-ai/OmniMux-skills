# T06 — 文案图形化排版

> 本卡的“基础字体包”供所有保留 Storyboard / Visual Gen 的 TVC 使用；只有当字体成为主要构图或叙事事件时，才把 T06 作为 `technique_plan` 技法命中。`anchors` 使用“基础字体包”并把结果写入 `tvc_typography_package`；命中 T06 时再把增强事件写入 `technique_plan`，`storyboard` 读取对应段落并编译进 SG 与视频 Prompt。

## 基础字体包（所有 TVC）

基础字体包必须从产品 / 品牌事实、已选 Style Master 和品类调性中推导一套可连续复用的包装语言，不要求用户额外选择，也不把它当作独立路线。

```yaml
kind: tvc_typography_package
id: tvc_typography_package
source_mode: brand_asset | style_master | product_tone_inferred | preserve_source
text_policy: confirmed_only | preserve_source_only | marks_only
type_cast:
  display_a: <主 Hero 的字骨架、字宽、字重、端点 / 字腔、材质、颜色和空间角色>
  display_b: <与 Display A 形成宽窄 / 粗细 / 曲直 / 衬线对比的次级角色>
  utility: <稳定中小字号骨架；真实标签、短句、字幕或部件名>
  marks: <白名单文字的描边 / 重复 / 裁切纹理，或无文字边框、线、点、箭头>
scale_ladder: <hero / mid / utility 三档比例与版式>
color_script: <背景、Display A、Display B、专色和终态的角色变化>
graphic_kit: <2–4 个可持续复用的载体及其文字职责>
space_binding: <至少两种墙、地、玻璃、主体、画框或独立深度层关系>
motion_language: <进入、完整可读停留、一次响应、回收 / 继承下一状态>
motion_cue: <每个状态的触发、一个最强运动焦点和一个回收 / 继承点>
effect_chain: <真实来源 → 路径 → 接触 / 结果 → 回收到来源或成为下一状态组件>
```

- 字体用可见骨架描述，不写依赖安装的字体名称；`Display A / B / Utility` 在不同状态持续复用，短单元可收缩为 `Display A + Utility`。
- `text_policy` 为 `confirmed_only` 时只使用 `required_native_texts`、已确认脚本 / 对白 / 画内文字；没有准确文字时使用 `marks_only`，不得自行编造品牌名、卖点、CTA 或字幕。
- 13–15 秒成片至少形成大 / 中 / 小三档关系、一个图形载体和一个空间绑定；每个文字事件都写成 `触发 → 进入 → 完整可读 → 一次响应 → 回收 / 定格`，并给出 `readable_hold_s`。
- 基础动态从尺度阶梯、前后景交换、载体滑入 / 吸附、引导线标注或字形变框中选择 1–2 种；每个状态只设一个最强运动焦点，并把光线、主体动作或切镜作为触发来源。
- 基础包装不强制大字接管画面；只有用户要求动态字卡、空间文字、分栏、歌词 / 口播关键词或字体成为主要视觉事件时，才追加 T06 花字模式并占用一个技法名额。

## 适用信号

- 用户希望品牌文案、对白、口播、歌词或关键词成为构图与动态包装元素，而不是无设计的普通字幕条。
- 用户已确认文字原文，或已确认可从对白 / 口播中选取完整语义句、重音短语或关键词做视觉包装。
- 仅仅存在对白、旁白或歌词不命中 T06；必须有明确的文字视觉化方向。

## Anchors

- 在 `technique_plan` 为每个文字事件记录 `text_id`、`exact_text`、文字来源、语义角色、`typography_mode`、`font_skeleton`、`scale_hierarchy`、`spatial_binding`、`graphic_carrier`、`subject_avoidance_zone`、`color_material`、`event_lifecycle`、`readable_hold_s` 和固定 `render_owner: video`。
- 对白 / 口播文字使用已确认原文与时间范围；可使用完整语义句、重音短语或关键词，不为配合版式改写台词。
- KV 可验证文字与主体的空间关系；文字准确性高时，KV 只确认版式，不把生成图中的字当作最终资产。

## 花字模式

| `typography_mode` | 适用表达 | 可执行画面语义 |
|---|---|---|
| `impact_hero` | 社媒快节奏、单次重音 | 一组高冲击大字在节拍点进入，产品或人物从文字信息层中穿出；完整读字后回收为色块、图案或硬切触发物 |
| `spatial_translucent` | 新品揭示、科技或轻奢 | 克制的半透明无衬线空间文字位于主体后方或侧后方，透视、视差、反射、接触影和景深与现场一致 |
| `technical_callout` | 单一卖点或结构证明 | 一个短标题配合极细引导线、轻量技术标注或图形符号，并绑定已核验的产品部件或功能事件 |
| `material_type` | 材质、工艺、包装特写 | 凹凸、压印、纸张油墨、金属蚀刻或玻璃折射形成可读字面，掠光先完成辨认，再触发一次材质响应 |
| `editorial_wordmark` | 品牌过程、拼贴、设计演化 | 字标草稿、纸张卡片、网格翻页、印刷网点和错峰波浪逐步收束到已确认的成品字标版式 |
| `minimal_brand_phrase` | 高端定版、材质氛围 | 大面积可控留白中只出现一个极短品牌词组，以舒展字距和稳定停留承接材质高潮 |

`technical_callout` 中需要准确读取的参数属于 T06；只有不可读参数、坐标和代码感边缘纹理时使用 T05。正式 Logo、包装文字、CTA 和法律信息必须使用已确认原文与可用图像资产作为视频 refs；模型无法可靠生成时保持 Visual Gen blocked，不转交 Post。

## Generation Strategy

- 把原文和可执行的字形骨架、字宽 / 字重、字距、大中小尺度、位置 / 景深、图形载体、遮挡关系和主体构图关系写入对应镜头；不只写“高级字体”或字体名。
- 从“花字模式”只选择一个主模式；对白 / 口播可使用关键词 Hero、动态字卡、空间文字、分栏、前后景交换或人物与字体共存终态，完整台词也可作为有设计的画面事件，不自动退化为底部字幕条。
- 每个文字事件按 `触发 → 进入 / 揭示 → 完整可读 → 一次空间或材质响应 → 回收 / 转场` 写入 `event_lifecycle`；每个构图状态只设一个最强运动焦点，并给出明确的 `readable_hold_s`。
- 文字至少与主体、墙面、地面、玻璃、独立深度层或图形载体建立一种可见关系；需要空间包装时补透视、视差、遮挡、反射 / 接触影与景深匹配。
- 只生成已确认文字白名单内容；Prompt 明确“仅出现该组文字”，不根据语音自行生成默认底部字幕、逐句转写或随机可读文字。
- 所有 TVC 文字事件都由视频单元原生生成；Post 不接收字体事件。能力不足时返回该视频单元重做或补充准确图像 ref，不降级为普通底部字幕。
