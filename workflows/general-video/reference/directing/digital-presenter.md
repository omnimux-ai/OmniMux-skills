# Digital Presenter — 数字讲者

## Activate When

成片需要一个持续出镜、按脚本讲话的真人或虚拟讲者，并且身份、音色、口型或跨段一致性是交付重点时读取。纯旁白配画面、单次真人实拍或无需讲者形象的任务不读取。

## Decision Test

先判断讲者承担什么功能：

- 讲解：清晰传递知识，辅助画面服务理解。
- 主持：讲者维持全片关系感，画面偶尔切换。
- 演示：讲者与产品、界面或操作过程共同构成内容。
- 角色化表达：形象、表演和声音本身是创意的一部分。

用户已明确纯口播、穿插方式、形象或音色时直接沿用。只有缺失选择会改变资产或后期安排时才询问。

## Required Evidence

规划当前 stage 时记录：

- 已确认脚本或可修订的脚本节点。
- 用户形象、可用人物来源或需要生成的 subject anchor。
- 已指定音色、可用声音来源或需要选择的 voice anchor。
- 画幅、目标时长、语言、字幕与画面文字需求。
- 是否需要产品、资料图、屏幕录制或其他辅助素材。

不要因为是数字讲者就自动创建全部 anchor；已有合格来源可直接复用。

## Route by Capability

Planner 根据用户意图和已有来源记录输入类型、语言、时长、口型/原生音频、身份控制与 refs 等 hard capability requirements，并据此安排必要资产；不选择 concrete vendor/model。Executor 依照平台 model-selection contract 使用当前 capability manifest 选择并校验路径：

- 已有最终/分段音频或用户明确要求音频驱动时，planner 先安排可复用音频，再把该输入要求写入讲者视频 work item。
- 用户要求原生音视频时，planner 将确认台词、声音意图和口型要求写入视频 work item，不预选实现它的模型。
- 当前可用路径无法满足 hard requirements 时，executor 返回具体冲突；planner 再修订音频、参考素材或后期安排，只有取舍会改变用户意图时才询问。

## Segment Strategy

- 在 vendor 单次能力、脚本自然段和视觉变化范围内优先保持连续生成。
- 需要拆段时在完整语义与呼吸点切分，并复用同一人物、服装、背景、音色和画面几何。
- 每段记录 start/end continuity state；相邻段避免姿态、视线和光线无理由重置。
- 用户要求场景变化时允许主动变化，但把变化写成明确过渡而非一致性失败。

## Mixed Media

辅助素材不是默认必做。需要时从以下方式选择：

- Overlay / picture-in-picture：讲者持续可见，适合步骤、图表和短证据。
- Intercut：辅助素材暂时占满画面，适合演示、产品细节和叙事片段。
- Split screen / composited demo：讲者与操作需要同时持续可见。

具体时间映射和音轨保护读取 <workflowsDir>/general-video/reference/directing/intercut-overlay-spec.md。

## Prompt and Work Items

讲者 work item 写清身份来源、输入音频或台词、可见动作、目光对象、表情变化、背景状态、开始与结束姿态。动作提示保持简洁，外观由 refs 承载；不重复静态形象长描述。

## Review

逐段检查身份、音色、口型、台词完整性、眨眼与呼吸自然度、段间连续性和辅助素材时序。字幕、画面文字、BGM 和穿插方式都以用户要求及最终装配计划为准，不设无条件禁令。
