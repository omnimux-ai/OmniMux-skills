# 视频脚本创作使用指南

本指南说明如何使用视频脚本创作 skill 包。它不定义下载器、视频生成器、发布工具或固定流程，只说明如何把用户提供的产品和内容目标整理成脚本交付。

## 输入信息

优先收集会直接影响脚本质量的信息：

- 产品名称、品类和核心卖点
- 目标用户、使用场景和购买动机
- 目标平台、视频时长和内容风格
- 禁用表达、合规限制和必须出现的信息
- 是否需要给分镜、prompt 或拍摄执行做后续交接

信息不足时，只问会改变脚本方向的最小澄清问题；如果用户希望先看草案，可以声明假设后直接产出首版。

## 使用顺序

1. 先读 `SKILL.md` 判断任务是否属于脚本创作。
2. 用 `prompts/user-intake-template.md` 整理输入。
3. 需要多个方向时读 `prompts/angle-generation-template.md`。
4. 写完整脚本时读 `prompts/script-structure-template.md` 和相关 `templates/`。
5. 改写已有脚本时读 `prompts/rewrite-rules-template.md`。
6. 需要结构化交接时参考 `schemas/` 和 `examples/`。

## 输出建议

脚本交付应至少包含：

- 产品理解和目标用户
- 3 个可选创意角度
- 推荐角度和选择理由
- 完整脚本：镜头、画面、口播、字幕、卖点和 CTA
- 风险提示、缺失信息和后续交接建议

## 边界

- 不声称已经生成视频、分镜图、prompt pack 或文件。
- 不把推荐步骤写成 required-next tool。
- 不承诺平台审核、广告效果、销量或真实用户反馈。
- 不替代 `video-prompt-generation`、`video-storyboard-planning` 或 `video-creation` 的下游职责。
