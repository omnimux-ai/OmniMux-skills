# N-grid — 多格视觉预览

## Activate When

用户明确需要 N 宫格、故事板整图、多角度预览或关键瞬间比较，或当前已批准 Stage Execution Plan 已包含 N-grid work item 时读取。仅因多格预览可能降低不确定性，不足以新增生成项；它不是视频生成的固定前置 stage。

## Decision Test

先选择产物类型：

- Sequence grid：一张图呈现一段叙事的 N 个连续瞬间。
- Shot study：为一个 shot 探索动作阶段、角度或构图变化。
- Comparison grid：并列不同设计路线，格子之间允许有意差异。
- Contact sheet：汇集已有画面供选择，不重新解释叙事。

已有 refs 和文字 shot plan 已足够执行时，可以跳过 N-grid。

## Grid Geometry

明确列数、行数、总格数、阅读顺序、单格比例和整图比例。X×Y 表示 X 列、Y 行；总格数等于 X×Y。

整图宽高比按以下关系推导：

整图宽高比 = 列数 × 单格宽 : 行数 × 单格高

例如 4 列×2 行、单格 1:1 时，整图约为 2:1。工具参数使用最接近的可用比例；若只能近似，给单格留安全裁切空间。

## Panel Design

每格说明：

- panel id 与阅读位置。
- 这一格唯一要展示的瞬间或路线。
- 主体、动作阶段、构图、光线和情绪证据。
- 与前后格的连续或对比关系。
- 需要继承的角色、场景、产品或风格 refs。

Sequence grid 按时间推进，每格只承担一个可辨认变化。Comparison grid 则明确每格改变的变量，其他条件尽量保持可比。

## Reference Strategy

- 身份、产品和场景来源用于保持可识别事实。
- 风格参考只承担被指定的色彩、媒介、构图或光线角色。
- 多张 refs 先分配各自 role，不假设一张图同时定义全部视觉维度。
- 用户叙事与 reference 有冲突时，以用户对 reference role 的说明为准；会改变主体身份时再询问。

## Prompt Assembly

用正向语言声明这是单张复合画布、列×行布局、总格数、阅读顺序、每格内容和一致性范围。需要分隔时说明留白或细线；不需要分隔时说明连续画面边缘。避免重复列出同一风格词或使用长 negative 清单。

## Downstream Use

用户可选择整张图用于方向、布局或风格确认，也可选一格或数格派生后续 refs。A composite grid must not be used as a video first frame, last frame, or state keyframe.需要动画化其中一格时，先选择、裁取或重新生成真实单帧 runtime ref；Production approval 只绑定该单帧，不绑定带分隔线、标签或多格内容的整张板。是否把所选格子用于首帧、尾帧或多参考视频输入，取决于选定 vendor 的能力和实际 shot 需要；不自动把每格变成生成任务。

## Review

检查格数、顺序、单格比例、主体身份、跨格连续性和文字可读性。若某格信息过载，减少该格内容或增加格数；若各格差异无意义，合并成更少的关键瞬间。

## Boundary

- 没有用户明确请求或已批准 work item 时，只能把 N-grid 建议写入现有 brief / shot plan，不新增 output unit、gate 或 anchor。
- 本卡细化已经存在的复合画布，不把每格自动升级为独立生成任务。
