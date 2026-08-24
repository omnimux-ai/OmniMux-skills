# 视觉参考拆解（Vision Decomposer）

## Activate When

- 图片或视频参考需要转成 Reference Brief、ref capsule、Shot Plan 事实或生成提示。
- 多份参考需要按 role 区分贡献，避免整图照搬。

## Decision Test

只记录会改变当前项目决策的维度。先写观察，再写解释；无法从画面验证的内容标为推断，不伪装成事实。

## Evidence Layers

- **Subject**：人物/物体身份、数量、姿态、表情、服装、状态和可见关系。
- **World**：地点类型、时间线索、天气、空间结构、道具和背景信息密度。
- **Composition**：景别、机位、主体位置、视觉重心、前中后景、透视与留白。
- **Light**：可见光源、方向、软硬、对比、颜色、阴影和反射证据。
- **Color**：主辅点颜色职责、明度、饱和度、肤色/识别色和空间分布。
- **Material**：表面结构、反射/透光、磨损、湿度、尺度与接触关系。
- **Medium/Style**：成像或绘制媒介、线条、细节密度、颗粒、处理痕迹和抽象程度。
- **Motion/Time**：视频中的主体运动、镜头运动、节奏、状态变化和连续性线索。
- **Text/Marks**：只抄录清晰可见的文字与标记；不确定字符显式标注。

## Confidence Discipline

- **Observed**：画面直接可见，可作为 binding fact。
- **Likely**：有多项视觉证据支持，但仍是推断；写明依据。
- **Unknown**：看不出来或证据冲突；不要补齐精确器材、地点、身份或制作参数。

## Build the Capsule

- 为每份参考记录 `{id, role, contributes, take}`；`id` 沿用 source / ref 的稳定逻辑 id，只保留下游真正需要的可见锚点。
- `preserve` 用于必须保持的身份、结构或状态；`adapt` 用于可迁移的风格、布局、光线或节奏。
- 多图先分别拆解，再找共性与冲突；不要把差异平均成一个不存在的混合风格。
- 输出应足够短，能直接进入 brief 或单个 work item，而不是复制一份百科式分析。

## Boundaries

- 不凭画面虚构精确相机、镜头、光圈、色值或作者意图。
- 不把 subject 参考自动当成 style、world、layout 和 pacing 参考。
- 不从参考推导未出现的背面、剧情、品牌归属或人物身份。
- 本卡只提供证据，不自行增加资产、镜头、gate 或交付物。

## Check

- 每个结论都能指回一个可见证据或明确标注为推断。
- 每个保留项都有下游用途，每个 role 的边界清楚。
- 参考冲突没有被隐藏；真正影响执行的冲突已在 brief 或 Shot Plan 中解决。
