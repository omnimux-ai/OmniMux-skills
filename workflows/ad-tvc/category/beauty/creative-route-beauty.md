# 美妆品类：Anchors Video Creative Route 增量

> 加载时机：Anchors 确认 `category_profile.category_id: beauty` 后，由 `beauty.md` 的 `Anchors Reads` 指向本文件。
> 作用方式：叠加到 Anchors `constraints[kind=video_creative_route|narrative_stage|route_asset_requirement]`，不创建平行路线产物。

## Input Contract

- Brief、Style Master、已验证 `research_style_reference_set`、`direction_profile.visual_rhythm` 和已选参考视频节奏。
- verified 产品参考图注册表、`beauty_research.application_states`、可选 `category_profile.sensory_basis`、人物范围和已确认广告类型。

## Output Delta

将美妆增量直接编译进通用 `video_creative_route`：

| 美妆信号 | 写入位置 |
|---|---|
| 仪式、转变、自我表达或质地证明 | `creative_premise` |
| 妆前 / 上妆 / 妆后状态弧与产品揭晓 | `narrative_stages` |
| 妆容状态带来的情绪变化 | `emotional_arc` |
| Hero Shot、产品仪式与品牌记忆点 | `product_brand_role` |
| 液体、粉末、刷毛接触、上脸变化等质地事件 | `impact_signature` |
| 同一感官母题在环境、人物、微观材质与产品之间互译 | `impact_signature` |

同时把 `beauty_research.application_states` 编译为 `category_profile.makeup_state_plan`：按路线顺序记录每个状态的稳定 id、可见妆面事实、进入该状态的产品动作和 verified evidence；状态不足以支持路线时返回 Visual Research evidence gap，不由 Anchors / Storyboard 补造。

## Execution Rules

- 产品广告可用“妆前低保和 -> 上妆仪式 -> 妆后揭晓”；品牌广告可用个人哲学、妆容隐喻和自我表达。
- 剧情广告让妆容承载人物变化；病毒广告可用妆前后反差、ASMR 上妆或身份反转，但不能牺牲真实产品事实。
- 香氛或品牌情绪路线从 `category_profile.sensory_basis` 选择一个主感官命题，让产品作为意象来源、开启事件或回收点；不把花卉、露珠、风和梦境同时堆成无主次素材库。
- 护肤或产品证明路线把环境 / 身体触感和真实的涂抹、流动、吸收外观或 finish 连接；隐喻只建立感受，功效仍由 verified 事实和可见结果承接。
- 需要跨环境、人物、微观材质与产品互译同一感官母题时，将 T20 作为技法候选，并把事实依据、承载对象和产品回收点写入对应 `technique_plan`。
- Hero Shot 至少在 `narrative_stages` 中出现一次预告或末段定格，具体次数由全片时长和分镜节奏决定。
- 路线消费 Visual Research 已验证的品牌色卡和产品色，不凭创意新造颜色；主色、辅色、肤色保护和背景反射关系继承 Style Master。
- 视觉风格的光线和背景不得让肤色出现明显绿、灰、青偏移；品牌色只贡献色彩和环境语言，不改变产品外观或人物身份。

## Binding

美妆信号必须落入 `video_creative_route` 的现有字段；Storyboard 再将这些信号展开为逐镜计划，不新建品类信号文档或平行字段。

## Anchors 交接

美妆事实只写入上表对应的通用路线字段、`category_profile.makeup_state_plan`、`constraints[kind=route_asset_requirement]` 和现有 `constraints[kind=selling_point_binding]`；溯源统一由路线字段及 Storyboard `route_trace` 承接，不新增平行 trace 字段或独立 Validation。
