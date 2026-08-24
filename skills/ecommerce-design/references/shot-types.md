# 电商六种典型图类型 + Prompt 模板

> **何时 read**：决定本图属于哪种类型 + 拼对应 prompt 框架时。
> **配套阅读**：单张 prompt 撰写细则走 `prompt-clauses.md` C1-C11；7 条铁律走 `iron-laws.md`。

## 1. 白底图（Pack Shot）

- **用途**：详情页主图、SKU 多角度展示
- **模板**：`studio shot, pure white seamless background RGB(255,255,255), 5500K softbox or natural daylight, 45° front angle, sharp focus on product, soft contact shadow, 4:5 aspect ratio`
- **关键**：背景写 "seamless white"，产品占 60–85%，平台硬白底场景产品下要带柔接触影
- **配套 clause**：C1 (背景对比) + C8 (产品显著性) + C10 (框定完整) + C11 (no overlay text)

## 2. 场景图（Lifestyle）

- **用途**：banner、广告位、社媒
- **模板**：`<product> placed on/in <场景物体>, <时间/光线>, <环境氛围>, shallow DOF, magazine-style composition, product 40-60% of frame`
- **关键**：场景必须服务商品定位（高端 → 大理石 + 冷光；温馨家居 → 暖光 + 柔木），产品仍是焦点
- **配套 clause**：C1 + C5 (场景锁) + C6 (自然光) + C8 + C9 (styling 锁) + C10 + C11

## 3. 模特上身图

- **用途**：服饰 / 穿戴类商品上身展示
- **模板**：`model wearing <product>, <pose>, <角度>, <场景>, natural skin texture, professional fashion photography, eye-level shot`
- **默认色调**：清透中性自然日光，不偏暖不偏冷
- **独立模特镜头**（无场景）：默认纯白棚 + 自然光（per `iron-laws.md` 铁律 7）
- **关键**：性别 + 版型显式英文写出（不能只说 `T-shirt`，要 `women's slim-fit cropped T-shirt with bust dart and feminine drape`），避免回归训练先验
- **焦点产品框定**（如鞋类上脚 / 戒指特写）：**不带脸**，减少模型把注意力分到脸上而忽略产品；上脚 / 上手 / 上颈这类局部镜头**仍然算模特镜头**，可见搭配（下装 / 袜子 / 上衣 / 首饰 / 指甲）按 OUTFIT LOCK 与用户确认
- **配套 clause**：C2 (参考图 grounding) + C4 (主体身份锁) + C5 + C6 + C7 (服饰版型) + C8 + C9 + C10

## 4. 微距特写（Macro Detail）

- **用途**：材质 / 工艺细节展示
- **模板**：`extreme close-up of <product detail>, macro lens 100mm, f/2.8 shallow DOF, side lighting to enhance texture, <texture description>`
- **必须满足"细节图三规则"**（见 `iron-laws.md` 铁律 6）：单一焦点 + 不带人 + 统一背景
- **配套 clause**：C3 (no-skin + single-focus + unified-bg) + C8 + C10 + C11

## 5. 多角度图（Multi-Angle）

- **用途**：紧凑产品（鞋 / 表 / 小首饰 / 墨镜 / 配件）的全方位展示
- **模板**：组合 6 个角度（front / side / back / 3-4 / top / sole-up 或 inside），全用统一背景 + 统一灯光
- **关键**：紧凑产品**优先多角度，不要硬拆 per-feature 细节图**（per 铁律 6 紧凑产品例外）
- **配套 clause**：C5 + C8 + C10

## 6. 尺寸参考图（Size Reference）

- **用途**：通过比例锚消除尺寸误判，降低退货
- **模板**：产品 + **真实比例锚**（手 / 手腕 / 颈部 / 房间 / 同类常见物 / 硬币）
- **关键**：比例锚必须**真实**（耳环旁是真耳；沙发旁是真人或真房间）；编造比例 = 退货高发
- **文字标注**：默认走纯比例锚、不加文字（per 铁律 7 默认禁止叠加文字）；只有当用户**提供准确尺寸 / 文案**时才加文字标注，否则编造规格 = 合规风险（详见 `compliance-redlines.md`）
- **配套 clause**：C8 + C10 + C11

---

## 类型决策速查

| 用户需求 | 推荐图类型 | 数量建议 |
|---|---|---|
| 一张主图代表 SKU | 1 (Pack Shot) | 1 |
| 完整电商详情页 | 1 + 4 + 5 + 6 + 2 (混合) | 6-10 |
| 服饰上架 | 3 (上身) + 4 (材质) + 6 (尺寸) | 8-10 |
| 鞋 / 表 / 配饰上架 | 5 (多角度) + 4 (工艺) + 3 (上身) | 7-9 |
| 美妆 / 个护上架 | 1 + 4 (质地) + 3 (上手) + 2 (生活场景) | 7-9 |
| 家装家居上架 | 2 (生活场景) + 6 (尺寸 with 人) + 5 (多角度) | 8-10 |
| 食品 / 饮料 / 保健品上架 | 1 + 4 (开盖 / 内容物) + 2 (使用场景) | 6-8 |
| 营销 banner / 广告位 | 2 (场景) | 1 (大图) |
