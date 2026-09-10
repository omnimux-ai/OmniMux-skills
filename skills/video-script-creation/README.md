# 视频脚本创作 Skill

本目录是 Gxgen 的视频脚本创作 skill 包，用于把产品信息、卖点、受众、平台目标和内容风格转成可拍摄、可改写、可交接的短视频脚本。

## 适用范围

- 短视频广告脚本
- UGC 商品种草脚本
- 商品演示、测评、开箱、对比和教程脚本
- 口播文案、字幕建议和轻量镜头动作
- 后续分镜、视频 prompt 或拍摄执行前的脚本交接

## 目录结构

- `SKILL.md`：运行入口，定义适用场景、任务模式、输出合同和边界。
- `docs/`：使用指南、自定义建议和输入输出说明。
- `prompts/`：脚本创作、角度生成、改写和信息采集提示。
- `templates/`：Hook、痛点解决、UGC 证言、对比和 CTA 脚本结构。
- `schemas/`：输入、输出和分镜结构参考。
- `examples/`：产品简报、脚本输出和 prompt 交接样例。

## 运行边界

本 skill 的公开入口由方法说明、提示、schema、模板和样例组成。以下目录不属于本 skill 的运行资产：

- `scripts/`
- `tests/`
- `workflows/`
- `adapters/`
- source-site audit records

如果某个迁移候选 skill 的核心价值必须依赖这些资产才能完成，应先登记为代码执行候选能力，不要直接归入 public business skill。

## 使用建议

1. 先用 `SKILL.md` 判断任务是否属于脚本创作。
2. 需要更细的脚本结构时读取 `prompts/` 和 `templates/`。
3. 需要结构化交接时读取 `schemas/` 和 `examples/`。
4. 用户明确要进入分镜、prompt 或视频生成阶段时，先完成脚本 handoff，再切换对应 skill 或工具。
