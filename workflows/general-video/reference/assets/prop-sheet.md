# Prop Sheet — 关键道具辅助参考

## Activate When

- 用户明确要求 prop sheet、道具多视图或道具设定图。
- 当前已批准 Stage Execution Plan 已包含 prop-sheet supporting-ref work item，且跨镜关键物件缺少足够外观证据。
- 仅发现潜在跨镜一致性风险、但用户与已批准计划都未要求该输出时，不把本卡作为新增生成项的依据。

## Decision Test

Prop sheet 是 supporting ref，不新增 core anchor kind。先判断：

1. 该物件的轮廓、材质、结构或标记是否必须跨镜保持？
2. 是否有多个角度、特写或交互需要共同识别它？
3. 现有产品 / 场景 / 人物 anchor 是否已经充分承载它？
4. 单张 source ref 是否比新做 sheet 更可靠？

只有上述激活条件成立且确实需要补充视觉证据时才生成。道具依附于角色、场景或 brand/product source 时，保持该归属，不另造平行资产系统。

## Action

- 视图数量服务于几何信息，不固定四视图：常规立体物可用 front / side / three-quarter / back；扁平物突出正反面和厚度；长物展示全长与关键细节；组合物展示组装关系。
- 多视图放在一张清晰、统一的参考图中时，各视图必须是同一物件、同一状态、同一尺度逻辑和媒介。
- 背景与光线以便于读形为目标；用户需要标签、尺寸或特定展示风格时按其要求，不把内部默认变成用户交付限制。
- 外观事实只来自用户、source、可见参考或已批准设计：轮廓、主要材料、主色、关键纹样、部件数量与相对位置。
- 在 ref capsule 中记录该图贡献的具体维度和适用镜头；只有相关 work item 才引用它。
- 下游 prompt 先写动作与场景，再紧凑声明必须保持的道具特征，不重复完整设计说明。

### State Changes

物件从完整到打开、离手、破损或变形时，先保留基础外观证据，再从当前状态派生。允许状态变化改变结构，但必须留下足够的同物识别特征。仅在 shot plan 中记录、无需独立视觉参考的短暂状态不生成新 sheet。

## Review

检查视图是否属于同一物件，结构和材质是否一致，状态是否匹配 source range，关键交互面是否可读；不要因修一个状态而重做已批准的基础设计。

## Boundary

- 没有用户明确请求或已批准 work item 时，只能把 prop-sheet 建议写入现有 brief / shot plan，不新增 output unit、gate 或 anchor。

共享 Asset Pipeline 决定 core anchors；Semantic Judgment 决定参考贡献；运行时 manifest 决定模型与参考能力。本文件不规定默认搜索、固定 vendor、静态模型 fallback、负面墙或视频参考槽参数。
