# Anchors 前置产品调研与证据协议

本卡只定义产品事实、候选要求、验证标准和覆盖结论；搜索、候选冻结、媒体分析、画布写入和 Plan 提交顺序全部由 `creative-research.md` 负责。

## 1. 文本事实

优先官网产品页、发布会、品牌规范、专业媒体和设计 / 工程访谈。提取准确型号 / 版本、品牌定位、最多 3 个 campaign 卖点，以及每个卖点对应的可见部件、材质、动作和结果。

## 2. 产品候选要求

- `real_product` query 必须包含准确品牌、型号、版本、所需角度和 `official render`；已确认官网域名时优先加入 `site:{official_domain}`。
- `concept_product` 使用真实品类、目标产品类型、所需视角 / 细节和 `commercial editorial product photography`，不得伪造目标品牌型号或官方来源。
- 产品候选与风格候选分池；不因来自零售、电商、Pinterest 或媒体转载而直接注册或直接排除。
- 最终参考只覆盖本片识别产品、路线镜头和卖点证明需要的角度与细节，不设置固定角度数量。局部、材质、使用场景和 Logo 只在卖点需要时加入。

## 3. 验证与分级

最终选中产品候选必须检查准确型号、版本、角度、比例、Logo / 部件、几何、材质、颜色和独特细节，并归入：

- `official_primary`：可追溯到品牌官网或用户提供的官方资产，作为主锚点。
- `verified_secondary`：来源非官方或来源信息不足，但可见事实与官方事实或主锚点一致，只补充已验证角度和细节。
- `rejected`：AI / 粉丝图、型号或年份错误、几何 / Logo / 部件 / 颜色冲突，或置信度不足。

`verified_secondary` 必须记录 `source_kind`、置信度、比对依据、允许贡献和禁止贡献；不能作为 Logo、包装文字、UI、颜色命名、尺寸或内部结构的唯一证据。只有 `official_primary` 和 `verified_secondary` 可进入 verified `product_ref_registry`；覆盖不足时前置研究保持 `blocked`，不得 author Anchors。

`concept_product` 只保留可确认是真实摄影或品牌 editorial、且能贡献廓形、结构、材质或使用状态的媒体。它们使用 `role: concept_product_inspiration` 和 `must_not_claim`，不得贡献目标品牌 Logo、型号、包装文字、官方配色或真实 SKU 身份，也不得进入 verified 注册表。

## 4. Source 与覆盖记录

每张最终采用媒体在其唯一顶层 source 上保存：stable `id`、path / URL、node id、source URL / kind、verification、可见内容、角度、分辨率、参考角色、`contributes`、`take`、适用镜头与禁止贡献。不得把同一媒体 id 或 locator 复制到 Anchors `ref_capsules`；`research_product_reference_set` 只能使用自己的唯一语义 id，并通过 `refs` 引用这些 canonical source ids。

产品参考角色：主锚定每个角度 / 部位唯一；补充参考只填缺失角度；细节参考只对应具体部件 / 材质；校验参考只做事实对照，不进入生成 refs。短边 720–1079px 标记需评估，短边低于 720px 标记需超分，但原图仍须先验证。已注册 ID 不改号。

动态产品视频仅用于汽车、机器人、无人机、运动装备等真实运动证据，提取动态细节、速度与声画关系，不作为风格参考。Anchors `research_evidence` constraint 的 `product_status` 必须回溯到真实 source 和验证结论，不能只写 `verified` 字符串。
