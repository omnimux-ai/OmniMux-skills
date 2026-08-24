# AI 生图缺陷分级清单

> **何时 read**：
> 1. 写每张 image brief 时（Anti-pitfall guards 段落）
> 2. 出图后逐张 inspection
> 3. routing regen / edit 请求时
>
> **重要**：Severity 等级是按**电商场景**校准的——海报里可忽略的小缺陷（如背景多一根手指），在 listing 里就是 severe，因为它直接打击购买信任。
>
> **配套阅读**：六维加权评分（含 14 品类权重 + Quality Bars）走 `quality-scoring.md`。

## 严重度等级

- **Severe（S）**：图直接 fail，总分作废，必须 regenerate
- **Moderate（M）**：可在 post 修；若出现在 hero / 主图则必须 regenerate
- **Minor（m）**：supporting 图可接受；hero 图标记后再决定

## Severe Defects（auto-fail，规定 regenerate）

| # | Defect | 为什么 severe | Mitigation 要点 |
|---|--------|--------------|----------------|
| **S1** | Text / logo 畸形（包装文字 / 认证 logo / 成分表渲染成乱码 / 半字 / 编造字）| 合规风险（保健品 / 母婴）+ shopper 一眼识破"AI 假图" | 永远附真产品参考图；文字密集包装先生成"占位空白"，post 合成真 label；**禁止**让模型编造保健功效面板 / 认证 badge / 检测编号。 |
| **S1b** | 框定截肢（logo / 脚 / 头 / 手 / 产品边缘被裁在不专业位置）| 每种都看着 amateur，立刻打掉信任 | 写 prompt 前规划 framing；全身：头顶 ≥ 5% 到鞋底 ≥ 5% margin；头部裁切只在中额头 OR 整头之上；手或全可见 OR 干净腕部裁；详见 `iron-laws.md` 铁律 4 + `prompt-clauses.md` C10 |
| **S2** | 人体解剖错（多指 / 融指 / 缺指 / 关节 unnatural / 第六趾 / 耳朵不对称） | shopper 信任立刻崩 | 手要么完整可见 OR 完全裁出画外，**避开半显手区**；模特优先 mid-shot 而非全身；每帧 100% 缩放检查 |
| **S3** | 产品比例失真（沙发比房间大 / 手表占半个手腕 / 耳环像拳头）| 误导，触发退货 + 平台投诉 | brief 永远加比例锚（"watch dial 38mm — should occupy roughly 1/4 of the wrist width"） |
| **S4** | 关键色偏（口红试色读成粉而非珊瑚 / 红裙读成橙红）| 美妆 / 时尚 #1 退货原因 | 用 reference 图 ground；试色在中性灰卡上 + post 调色；calibrated 屏幕 inspect |
| **S5** | 婴儿脸 uncanny valley（眼太大 / 五官不对称 / 老脸婴儿 / 塑料皮 / 僵笑）| 立刻情感劝退家长，杀死整个 listing | 母婴优先**真照片合成** > 从零生成；必须生成时用真实婴儿 reference + 100% 缩放 inspect；不确定就**不生成**婴儿脸 |
| **S6** | Subject identity drift（性别 / 版型 / 年龄 / 廓形悄悄换）| shopper 按视觉买，收到错版型 = 必然退货 | 永远先 `read` 读 reference + 出 Attribute Card + 用户确认（见 `attribute-card.md`）；性别 / 版型 / 年龄**显式英文**写在 prompt 里；在 Subject Identity Lock 和 negative prompt **两处**重复 identity tag |
| **S7** | Cross-image identity drift（同一模特跨图像不同人 / 同一产品像不同 SKU）| shopper 觉得发错产品或换了模特，信任崩 | 写**一份** Subject Identity Lock card 逐字粘到每张图 prompt；每次调用传**同一张** reference + **同一份** lighting / color grading 描述 |
| **S8** | Scene drift（detail 用白墙→绿墙→蓝墙 / shot 1 木地板 → shot 2 瓷砖）| set 读起来是 Frankenstein collage，破坏"一场拍摄"假象 | 每个 sub-set 各写一张 Scene Context Card 逐字粘到该 sub-set 每张图；任何 recurring 道具必须**同一道具同一状态** |
| **S9** | Reference 附错（缺关键 OR 过附冲突）| 缺产品 ref = 静默说 SKU 谎；过附 = 浪费每张图意图 + 拉乱模特连续性 | per Iron Law 7，**逐张判断**哪些 ref 真服务本图；纯产品图仅产品 ref；approved pilot 后跳过用户原产品照避免 double-anchoring；每个附 ref 都按 C2 显式 named role |
| **S10** | Regen drift（修过的图不再匹配 set 其它图）| set 中一张 drift 比 6 张中等质量更明显；shopper 觉得"产品在拍摄中途换了" | 永远走 regen / edit 工作流；分类意图 A/B/C；A 局部修必加 R2 Local Edit Scope clause；详见 `regen-clauses.md` |

## Moderate Defects（post 可修；hero 出现则 regen）

| # | Defect | Mitigation |
|---|--------|-----------|
| M1 | 光线方向不匹配（产品阴影向左，场景窗光向右）| 重写 brief 显式光源（"single key light from frame-left"）|
| M2 | 边缘 artifact（cutout halo / ringing / "贴在背景上"感）| regenerate with "shot in scene" 不要合成；post refine matte + 加 contact shadow |
| M3 | 材质误读（金属像漆塑料 / 皮像 vinyl / 丝像尼龙）| brief 写具体（"brushed aluminum with subtle anisotropic highlights"）；用同材质参考图 |
| M4 | 重复纹理（背景织物 / 砖墙 / 树皮明显平铺）| 换 seed regen；brief 加 "non-repeating organic texture" |
| M5 | 数错件数（钮扣 / 手指 / 睫毛 / 花瓣）| brief 显式写数（"five buttons down the front placket"）；100% inspect |
| M6 | 反射 / 折射错（珠宝 / 镜面 / 玻璃反射不匹配场景）| subtle 时容忍；高端珠宝 / 奢侈品 regenerate |
| M7 | 背景产品对比度错（欠 OR 过对比）| brief 写 "background contrast" 行显式 harmonious 一档位移；详细对比表见 `prompt-clauses.md` C1 |
| M8 | Detail / 工艺图含皮肤 / 手 / 身体 | 每个 detail brief negative 加 `no human skin, no hands, no body parts, no fingers`；产品放中性表面 |
| M9 | 产品在 busy 帧里丢失（产品太小 / 在角落 / 被竞争焦点包围）| 写 Clause C8 产品 fill % 填好（hero 60-85% / lifestyle 40-60%）；产品在强构图锚；缩到 thumbnail + 眯眼 1 秒内找不到产品 → regen |

## Minor Defects（hero 标记，否则可接受）

| # | Defect | Mitigation |
|---|--------|-----------|
| m1 | 微色偏（≤ 5% Lab delta）| post 调色 |
| m2 | 远景小物不一致（bokeh 球形不对）| hero 就 crop 或更模糊 |
| m3 | 高光略 blown | 减弱光强 regen，或 post burn down |
| m4 | 文字软（intentional 文字时）| post 里加文字保证锐利 |
| m5 | 模特 catchlight 怪 | 通常 OK；只在 portrait 是 hero 时修 |

## Pre-Submit 检查清单（每张图批准前过一遍）

1. **100% 缩放打开**，沿产品边缘 / 手 / 脸 / on-pack text 平移
2. **对照 reference**：色 / 比例 / 标志性特征都匹配？读所有可见文字每个词都真且拼对？
3. **数件数**（钮扣 / 手指 / 睫毛 / 花瓣 / 珠子）符合预期？
4. **对照 Attribute Card**（性别 / cut / 年龄 / 色 / 廓形 / 标志性特征）都匹配锁定？服饰是否真读成你指定的 gendered cut？
5. **跨图一致性**（set 时）：所有图并排同模特同 SKU？同 sub-set 同墙色 / 同表面 / 同时间段？重复道具同状态？
6. **Detail / macro 是纯产品**？无皮肤 / 手 / 身体 / 杂物？
7. **框定完整性**：顶边模特完整头 + ≥ 5% margin？底边脚 + 鞋可见 + ≥ 5% margin？产品（hero / 白底 / detail）完整 + 干净 margin？

任一 1-5, 7 fail → **severe** → regenerate（aspect / pose 引起则 re-frame）；任一 6 fail → **moderate** → post 修或 hero 时 regen。

## 与六维质量模型的关系

`ec-quality-model`（保留的工作流 skill）是**六维加权打分流程**，本文件是**缺陷型 fail-fast 自检知识库**。**两者都过才能 ship**：

- 六维加权 ≥ category 阈值（hero ≥ 8.5 / supporting ≥ 8.0，详见 `quality-scoring.md`）
- AND 任一 severe defect 都没命中
- AND 平台 hard spec 都满足（详见 `platform-specs.md`）

任一 severe defect 命中 → 总分 fail，不论加权多高。
