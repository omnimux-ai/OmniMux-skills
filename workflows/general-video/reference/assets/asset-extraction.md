# Visual Asset Extraction — 最小可复用资产判定

## Activate When

- general-video 已进入依赖型工作流，且多个下游镜头可能复用人物、声音或场景。
- 用户已有剧本、brief、shot plan 或参考素材，需要判断哪些内容必须先成为可复用锚点。
- 单镜头、一次性背景或现有参考已经足够时不读取。

## Decision Test

本 workflow 的 core anchor 只处理 character / subject、voice 和 reusable scene identity。风格、道具、灯光、构图、动作和情绪不是新的 core anchor kind。

对每个候选连续问：

1. 它会被两个或更多下游 work item 复用吗？
2. 外观或声音漂移会实质改变成片吗？
3. 当前 sources、ref capsules 或既有 runtime refs 不足以稳定它吗？
4. 单独制作锚点的收益高于额外依赖和确认成本吗？

只有答案均为“是”时才规划 core anchor。否则把它保留为 source fact、brief signal、ref capsule 或单个 work item 的 prompt 事实。

### 状态变体

只有持续、可见且会影响后续镜头识别的变化才形成状态依赖，例如明显换装、长期损伤、湿透、异化或不可逆场景变化。表情、情绪、一次性动作、普通光照或短暂污渍留在镜头 prompt。

人物状态判定必须扫描以下变化，不只看换装：

| 变化 | 需要独立状态资产的信号 |
|---|---|
| 换装或服装层次 | 服装整体轮廓改变，且后续镜头仍会保持该状态 |
| 持续战损 / 脏污 | 伤痕、血污、撕裂或大面积污渍跨多个镜头不恢复 |
| 湿身 / 环境附着 | 全身湿透、泥浆、灰尘或其它附着物改变人物识别 |
| 身体或系统标识 | 疤痕、纹路、发光装置或其它持续可见标记改变身份 |
| 异化 / 变身 | 体型、材质、物种或轮廓发生根本改变 |
| 关键道具生命周期 | 戴上、摘下、损坏、丢失或离手后仍在后续镜头承担识别作用 |

每个候选状态都检查三件事：视觉差异是否明显、是否持续、后续是否需要靠独立 ref 保持一致。三项都成立才创建状态资产；情绪、表情、场景后缀和短暂动作留在 prompt，不创建“崩溃角色卡”“病房角色卡”这类资产。

关键道具即使需要跨镜追踪，也不升级成新 core anchor kind。它可以：

- 依附于 character / scene anchor；
- 作为 ref capsule 进入相关 work item；
- 在 shot plan 中记录完整、离手、损坏等生命周期状态。

## Action

资产判断直接写入 `Assets` Stage，不生成单独的资产判定 Markdown。每个实际资产只创建一个 work item 和一个主输出；其它知识卡只把约束编译进该 work item，不创建独立文档、资产或画布节点。

- 优先复用用户素材和已有 anchor，不为流程完整度重复生成。
- 一个 core anchor 表示一个持续身份；关系图可作为 blocking / supporting ref，但不能替代需要跨镜稳定的 per-subject core anchors。只有无需 core anchor 的一次性群像才可仅用关系图。
- 链式状态先生成基础身份，再从当前有效状态派生下一状态；互不继承的状态可并行。
- 只把当前 stage 真正需要的 refs 放进 work item，避免为了“可能有用”占用参考槽位。
- 资产名、状态名和专有名词沿用用户语言；不要把临时情绪或场景名写进角色身份名。
- 基础人物资产使用中性表情和中性背景；状态资产只写相对基础状态的变化，并保留基础身份 ref。

## Boundary

- 是否创建、采用何种 core anchor 及角色卡默认结构，以共享 Asset Pipeline 为准。
- 参考贡献、take / adapt / ignore / ask 由 Semantic Judgment 决定。
- 本文件只帮助提取与裁剪资产依赖，不规定 vendor、模型、工具调用、固定 gate 或执行参数。
