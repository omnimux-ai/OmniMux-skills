# Character Features — 多参考人物贡献隔离

## Activate When

两个或更多参考共同影响人物，尤其是“图 A 的身份 + 图 B 的动作 / 服装 / 风格 / 场景”时读取。目标是保留每张图真正贡献的维度，避免跨图污染。

## Decision Test

先使用 Semantic Judgment 的 contribution map。一个 ref 可以贡献多个维度，但每个维度都必须有可见证据。

| Role | May contribute | Keep separate |
|---|---|---|
| Identity | 脸、发型、肤色、体型、轮廓性标记 | 不自动继承姿势和场景 |
| Action / pose | 头部朝向、躯干与四肢关系、动作轨迹 | 不自动继承人物身份、服装或配饰 |
| Outfit / equipment | 明确要求沿用的服装、装备、手持物 | 不替换身份 ref 的脸和体型 |
| Style / medium | 笔触、渲染媒介、材质语言、光影方式 | 不复制具体人物和物体 |
| World / scene | 空间结构、环境与世界设定 | 不复制其中偶然出现的人物 |
| Layout | 数量、位置、关系、构图与镜头 | 不保留占位材质、UI 或标签 |

如果两个 refs 对同一维度给出互斥答案，只有该选择会实质改变结果时才问；否则按用户指令、主要 ref 和已批准状态的优先级裁决。

## Action

- 保持用户附件顺序，用稳定名称声明每张 ref 的角色与贡献，不写匿名的“参考这些图”。
- Pose transfer 只抽取可观察的身体关系：朝向、重心、躯干角度、四肢角度和动作；服装 / 道具由用户、身份 ref 或当前状态决定。
- 对 source / layout ref，保留人物数量、相对关系和主要动作；把目标身份只映射到用户点名或明确对应的槽位。
- 把 take / adapt 的可见事实写进 prompt；ignore 保持静默，不把忽略项变成长排除列表。
- 同一人物跨镜头时复用相同 ref id 和 Lock Card；多人物时逐个命名，避免身份交叉。
- 工具输入通常保持附件顺序；只有工具定义硬槽位时才调整，并同步更新 prompt 中的编号。

## Boundary

本文件不重新定义 ref capsule schema，不决定 vendor 或参考数量上限。贡献取舍以 Semantic Judgment 为真相源，具体槽位能力以运行时 manifest 和所选 vendor card 为准。
