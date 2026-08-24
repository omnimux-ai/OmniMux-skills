# T14 — 工业说明书式参数版面

> 仅在索引命中 T14 时读取。`anchors` 使用“Anchors”，`storyboard` 使用“Generation Strategy”；Stage 被跳过时对应内容不生效。

## 适用信号

- 用户需要参数、部件、接口、配件清单或工程文档式版面。
- 参数和结构信息已有 verified 来源。

## Anchors

- 在 `technique_plan` 记录产品位置、网格方向、留白、标签层级、品牌色、verified 参数和 `render_owner`。
- 不把未验证参数、内部结构或配件补成视觉事实。

## Generation Strategy

- 视频 Prompt 写清极简背景、产品构图、细线框、图例占位和克制的整体运动。
- 精确参数、单位、接口名称与清单写入 `confirmed_text_timeline` 并由对应视频单元原生排版；装饰性线框同步生成。需要逐字准确时使用 verified 原文或图像 ref，能力不足时保持 blocked，不交给 Post。
- 旁白如存在，只解释最重要的一个价值，不逐项朗读版面。
