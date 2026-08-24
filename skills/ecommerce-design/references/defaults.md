# 电商图默认参数表

> **何时 read**：每个 image brief 撰写时——无明确指示按本表默认。
> **配套阅读**：7 条铁律走 `iron-laws.md`；平台特定 spec 走 `platform-specs.md`。

| 参数 | 默认 | 何时覆盖 |
|---|---|---|
| 输出分辨率 | **1K** | 平台硬要求（如 Amazon zoom 需 ≥ 2000）或用户明确要 2K/4K |
| 灯光 | **自然光（中性日光，~5000-5500K，不偏暖不偏冷）** | 品类必需（3C 暗底 hero / 珠宝高光）或用户 brief |
| 色调 | **干净中性，肉眼日光，无暖偏无冷偏** | 同上；色调由场景 / 道具决定（暖木 + 米麻 = 暖；混凝土 + 钢 = 冷），**不是**给灯光染色 |
| 模特独立镜头背景 | **纯白 / 近白 seamless 棚拍 + 自然光** | 用户明确要场景 |
| 图上叠加文字 | **禁止**；negative 加 `no overlay text, no spec callouts, no marketing badges, no watermarks` | 用户明确要做 banner / 详情页文字版，且**提供准确文案** |
| 平台规格 + 画幅 | **必须显式**写入 prompt（aspect ratio、像素下限、白底要求等）；从用户问 / 从平台手册查 | — 没有"默认"，每张图都要明确（详见 `platform-specs.md`）|
| 相机机身 / 胶片 / 电影色调 | **禁止**默认加（`shot on Sony A7R V`、`Kodak Portra 400`、`teal-orange grade`）——会扭曲产品颜色、引发退货 | 用户或 styling direction 明确要这种风格 |
| 反向性别版型 negative（服饰）| 女装加 `negative: men's cut, masculine drape, broad shoulders`；男装加反向 | — 服饰图必备 |
| Reference 角色描述 | 每张附的 reference 都要在 prompt 里 named role（C2 Role/Take/Ignore）| — 任何附 ref 的 prompt 必备 |

## 默认参数的"为什么"

- **1K 分辨率**：足够 review 迭代，足够社交平台 / content feed listing，足够大多数 listing supporting 图。2K/4K 烧 compute 而中间稿用不上。
- **自然光中性日光**：色彩保真 + 跨图一致最容易；偏暖偏冷的灯本身会让产品颜色偏离真实。
- **禁相机/胶片/调色**：Google 官方 Nano Banana 指南里相机/胶片是创意杠杆，但电商图这些杠杆**反向**伤害色彩保真。
- **禁默认 overlay 文字**：AI 生成的中文 / 复杂字体 / 长文案高风险出乱码 / 假字 / 编造数字 → 合规风险（详见 `compliance-redlines.md`）。
- **平台规格不留默认**：同一商品发淘宝（3:4）和 Amazon（1:1 + 纯白）出 prompt 完全不同，押错平台 = 重做。
