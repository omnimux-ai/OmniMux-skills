# TVC Environment Anchors — MJ 环境锚点卡

> **何时 Read**：Anchors 的确认路线包含两个以上 distinct scene states，并已 author `scene_anchor_*` 环境锚点 work items。

## 输入

- 读取对应 `constraints[kind=route_asset_requirement]` 的 `scene_anchor_id`、`narrative_stage_ids`、地点身份、持续状态、路线事件、适用 `technique_plan` 和 `product_exclusion`。
- 读取 `style_master` / `style_prompt`、direction / category 已确认的环境信号和成片画幅；只取可见的媒介、构图、光线、材质、空间气质和环境母题。
- 不把产品、包装、Logo、人物身份、旁白、卖点文案或来源风格媒体加入 refs。

## Work Item

每个 distinct scene state author 一个 `modality: image` work item：

```yaml
id: scene_anchor_<scene_state_id>
name: <用户可见环境名>
modality: image
vendor_model_policy: {vendor: midjourney}
refs: []
source: {scene_id: <scene_state_id>, narrative_stage_ids: [<ids>]}
prompt: <final English MJ t2i prompt>
```

- `vendor_model_policy` 只锁 Midjourney vendor；Executor 从 `hub_list_capabilities` 选择当前合法 canonical `model_id`，不使用静态别名。
- 环境锚点卡是单张干净的 16:9 环境图，不是信息板、KV、拼贴或多宫格，不含标题、标签和说明文字。
- 同一状态只 author 一张；A → B → A 复用 A。不可逆结构变化使用新的 `scene_state_id`。
- 环境锚点卡不消费产品卡、人物卡、路线 KV 或原始风格图。Style Master、路线和技法只通过文字编译进入 Prompt。

## Prompt 编译

使用 10–40 个英文单词的正向主体描述，按顺序写地点身份、固定空间结构、持续状态、路线需要的环境事件、Style Master 的媒介 / 构图 / 光线 / 材质和适用环境母题。只写能在空环境中成立的路线事实，不把产品动作改写成环境中的替代产品。

正向正文不出现品牌名、产品名、包装形态、Logo 或产品类别。末尾追加 `--ar 16:9`，并用 `--no` 排除当前产品类别及 `product, packaging, logo, text, watermark, collage`。产品类别必须来自 Brief，例如汽车路线排除 `car, vehicle`，香氛路线排除 `perfume bottle`；不得凭品类猜测具体外观。

人物不是环境身份来源。只有人群本身是地点不可分离的环境事实时，才允许没有稳定身份的远景背景人群；不引入可识别主角、模特服装或人物动作。

## QC 与交接

只向 Anchors 唯一 `anchor_asset_qc` 合并：

- `scene_identity_legible`：地点结构、固定地标、材质和尺度可读。
- `scene_state_distinct`：多张卡的地点 / 持续状态边界与路线一致，没有把机位或短时光线误判成新状态。
- `style_route_traceability`：可追溯到 `style_master`、`narrative_stage` 和适用 `technique_plan`。
- `product_absent`：产品、包装、产品轮廓和品牌化替代物均未出现。
- `logo_text_absent`：没有 Logo、标题、标签、水印或可读文字。
- `video_reference_safe`：单一连续环境画面可作为视频普通环境 ref，不含宫格、卡片 UI 或说明层。

为下游保留固定解释：环境锚点卡只提供地点身份、固定空间结构、地标、环境材质和基线氛围；镜头、人物、产品、动作和临时光线由当前分镜与其它 refs 决定。卡中没有产品不代表成片禁止产品。
