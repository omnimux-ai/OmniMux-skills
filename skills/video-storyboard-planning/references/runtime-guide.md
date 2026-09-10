# 视频分镜图运行时指南

本文件是 Mastra runtime 可读的分镜规划操作入口。它把发布包里的模板、schema、工作流和 rubric 收敛成运行时可直接参考的规则。

## Use This Skill For

- 把产品、卖点、脚本、参考画面或参考视频结构转成分镜方案。
- 输出 storyboard、shot list、prompt pack、拍摄备注或审稿清单。
- 为真人拍摄、AI 出图或视频生成前置规划提供逐镜头蓝图。

## Do Not Escalate To Video Generation

这个 skill 是前期规划能力。即使用户提到视频，也不要因为加载本 skill 就默认调用视频生成工具。

只有当用户明确要求“生成成片、提交视频任务、调用视频模型、导出视频文件”时，才转到视频生成流程。

## Default Runtime Flow

1. 提炼目标：平台、时长、受众、产品或主题、转化目标。
2. 选择结构：Hook、痛点、演示、证据、CTA，或按用户脚本自然拆段。
3. 拆成镜头：每个镜头只承担一个主要信息点。
4. 补执行层：景别、运镜、主体动作、字幕、口播、道具、光线、转场。
5. 如用户需要 AI 出图或视频前置 prompt，补单镜头 prompt 和统一视觉约束。
6. 最后自检：前 3 秒钩子、卖点视觉化、节奏密度、产品一致性、CTA 清晰度、合规风险。

## Output Contract

默认输出 Markdown。优先使用 `references/output-template.md` 的结构。

必要模块：
- 项目摘要
- 分镜结构总览
- 逐镜头分镜表
- 拍摄/剪辑执行备注

可选模块：
- Prompt Pack
- Style Bible
- QA Review
- Shotlist CSV

## Timing Rules

- `start_time` 和 `end_time` 单位为秒。
- 每个镜头必须满足 `end_time > start_time`。
- `duration` 应与 `end_time - start_time` 保持一致；允许因剪辑节奏做小幅取整，但不要反向或重叠混乱。

## Quality Rules

- 画面描述必须可视化，不能只写抽象意图。
- 每个镜头只讲一个任务：抓注意力、展示痛点、展示卖点、建立信任或引导 CTA。
- 带货分镜要让卖点被看见，不只被口播说出。
- Prompt Pack 要保持人物、产品、空间、光线和画幅一致。
- 不编造销量、认证、医疗功效、极限承诺或无法验证的对比结论。
