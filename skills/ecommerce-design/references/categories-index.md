# 电商 14 品类索引

> **何时 read**：进入某品类深度策划（决定组图张数、构图、灯光、模特、必填角度）时载入对应品类文件。
>
> **本文件同时是电商领域的总索引**——任意电商任务从本文件下沉到具体子文件，主 INDEX.md 只保留入口指引。

## 入口层（任何电商任务必读）

| 文件 | 何时 Read |
|---|---|
| `iron-laws.md` | 7 条防翻车铁律 + 3 条工作流 meta 约束 — 任何电商图都必须遵守 |
| `categories-quick-ref.md` | 14 品类要点 + 高危雷区高密度速查 — 决定要不要深入某品类 playbook |

## 深度层（按场景按需读，不要无差别加载）

| 文件 | 何时 Read |
|---|---|
| `cross-category-rules.md` | 14 品类共用 7 条规则 + 全局必填字段 + 跨品类边界判断 |
| `defaults.md` | 写每张 image brief 时——无明确指示按本表默认参数 |
| `shot-types.md` | 决定本图属于哪种类型（白底 / 场景 / 模特上身 / 微距 / 多角度 / 尺寸参考）+ 拼对应 prompt 框架 |
| `attribute-card.md` | 用户上传参考图后写 Attribute Card 时 |
| `prompt-clauses.md` | 写每张 image prompt 时（C1-C11 子句速查） |
| `regen-clauses.md` | 用户要求重做 / 编辑某张已生成图时（R1 / R2 / R3） |
| `ai-pitfalls.md` | 写 brief 时 / 出图后 inspection / regen 请求时 |
| `platform-specs.md` | 跨平台分发时（aspect / background / 文件大小） |
| `compliance-redlines.md` | 涉及"认证 / 检测 / 功能宣称"品类（母婴 / 保健品 / 个护 / 美妆 / 运动 / 3C / 食品 / 饮料） |
| `quality-scoring.md` | 每张电商图生成后评分（六维加权 + 14 品类权重 + Quality Bars） |

## 子流程路由（按用户行为命中按需追加）

| 用户行为 | 在入口层 + 品类文件之上追加 Read |
|---|---|
| 写 prompt 拼装 | `prompt-clauses.md` + `shot-types.md` |
| 涉合规品类（母婴 / 保健品 / 美妆 / 个护 / 运动 / 3C） | `compliance-redlines.md` |
| 用户上传参考图 | `attribute-card.md` |
| 跨平台分发 | `platform-specs.md` |
| 重做 / 局部修 | `regen-clauses.md` + `ai-pitfalls.md` |
| 出图评分自检 | `quality-scoring.md` + `ai-pitfalls.md` |

> 通用约束（角色一致 / 多图保真 / nano-banana 包装文字渲染）由 hilo knowledge 路由层统一引导，本 skill 不重复维护。

> 配套阅读：通用规则 `cross-category-rules.md`、合规红线 `compliance-redlines.md`、平台规范 `platform-specs.md`、六维评分 `quality-scoring.md`（含 14 品类权重覆盖）。

## 14 品类索引表

| # | 品类 | 文件 | 优先维度 | 张数 | 核心转化驱动 |
|---|------|------|----------|------|--------------|
| 1 | 女装 (Womenswear) | [`categories/01-womenswear.md`](categories/01-womenswear.md) | Visual + Trust | 8–10 | 色彩还原 + 面料质感 + 穿着代入感 |
| 2 | 家装家居 (Home & Furniture) | [`categories/02-home.md`](categories/02-home.md) | Information + Visual | 8–10 | 空间比例感 + 尺寸准确 |
| 3 | 日用品 (Daily Goods) | [`categories/03-daily-goods.md`](categories/03-daily-goods.md) | Clarity + Information | 6–8 | 功能可视化 + 使用便利性 |
| 4 | 宠物 (Pet) | [`categories/04-pet.md`](categories/04-pet.md) | Visual + Information | 6–8 | 萌宠情感 + 安全性 |
| 5 | 母婴 (Mother & Baby) | [`categories/05-baby.md`](categories/05-baby.md) | Trust + Brand Consistency | 8–10 | 安全第一 + 功能便利 |
| 6 | 数码 3C | [`categories/06-3c.md`](categories/06-3c.md) | Clarity + Information | 8–10 | 科技感 + 参数说服力 |
| 7 | 饰品珠宝 (Jewelry) | [`categories/07-jewelry.md`](categories/07-jewelry.md) | Visual + Clarity | 7–9 | 美感 + 工艺信任 |
| 8 | 美妆护肤 (Beauty) | [`categories/08-beauty.md`](categories/08-beauty.md) | Visual + Trust（颜色）| 7–9 | 颜值 + 质地 + 效果 |
| 9 | 保健品 (Supplements) | [`categories/09-supplements.md`](categories/09-supplements.md) | Trust + Information | 6–8 | 成分透明 + 权威认证 |
| 10 | 洗护用品 (Personal Care) | [`categories/10-personal-care.md`](categories/10-personal-care.md) | Visual + Brand Consistency | 6–8 | 质地感知 + 效果证明 |
| 11 | 男装 (Menswear) | [`categories/11-menswear.md`](categories/11-menswear.md) | Clarity + Brand Consistency | 7–9 | 版型 + 做工品质 |
| 12 | 鞋靴 (Footwear) | [`categories/12-footwear.md`](categories/12-footwear.md) | Clarity + Information | 7–9 | 颜值 + 舒适暗示 |
| 13 | 箱包 (Bags) | [`categories/13-bags.md`](categories/13-bags.md) | Clarity + Information | 7–9 | 尺寸感知 + 收纳能力 |
| 14 | 运动户外 (Sports & Outdoor) | [`categories/14-sports.md`](categories/14-sports.md) | Visual + Information | 8–10 | 动态活力 + 功能证据 |

每个品类文件都包含：

- 优先质量维度与权重覆盖（详见 `quality-scoring.md` 14 品类权重覆盖表）
- 组图设计分布（详细到每张图的角色 / 数量 / 内容 / 不可遗漏信息）
- 整体风格与质感（风格方向 / 光线 / 背景 / 色调 / 道具 / 模特）
- 单图构图要求（构图方式 / 焦点 / 突出 / 禁忌）
- 易错点（Watch For）+ 合规红线引用
