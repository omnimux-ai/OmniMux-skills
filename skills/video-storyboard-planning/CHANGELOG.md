# Changelog

## [1.0.1] - 2026-07-03

### Governance
- 标记为 Gxgen 公开业务 skill。
- 明确 `tools/` 里的 JavaScript 脚本不是 Agent runtime 核心能力。
- 明确 `workflows/` 里的 Markdown 是方法模板，不是隐藏阶段机或固定工具序列。
- 补充 `PUBLICATION-GOVERNANCE.md`，记录公开使用边界与 `canvas/video-storyboard` 的关系。

## [1.0.0] - 2026-07-01

### Added
- 初始化通用型视频分镜图 skill 结构
- 新增 `SKILL.md`，定义能力边界、适用场景、输入输出、工作流与质量标准
- 新增 `README.md`，说明 skill 目标、工作方式、目录分工与使用建议
- 新增 `VERSION`，提供基础版本号
- 新增标准化目录建议：
  - `docs/`
  - `schemas/`
  - `templates/`
  - `prompts/`
  - `workflows/`
  - `rubrics/`
  - `examples/`
  - `tests/`
  - `tools/`
  - `assets/`
  - `output/`

### Included
- 支持从以下输入生成结构化视频分镜：
  - 产品信息
  - 产品链接
  - 产品图片
  - 脚本草稿
  - 卖点列表
  - 参考视频
  - 创意方向
- 支持以下输出模式：
  - 简洁版分镜
  - 标准版分镜
  - 生成就绪版分镜
  - 拍摄执行版分镜

### Design Principles
- 强调“可执行”而不是“仅有创意”
- 强调“镜头级视觉表达”而不是泛化文案
- 强调短视频平台适配与电商转化逻辑
- 强调 AI 出图 / 真人拍摄 / 后期剪辑三类下游可承接性

### Notes
- 本版本为通用结构包，后续由 Gxgen 公共 skill 治理流程维护
- 后续版本可继续补充：
  - `schemas/*.json`
  - `templates/*.md`
  - `prompts/` 下的任务模板
  - `workflows/` 下的分阶段流程文档
  - `examples/` 样例输入输出
  - `rubrics/` 质量评估标准
