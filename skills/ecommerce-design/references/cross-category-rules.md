# Cross-Category Rules（电商 14 品类共用规则）

> **何时 read**：写任何品类 brief 之前必读，与对应的 `categories/{NN}-{name}.md` 配套使用。

这七条规则被频繁忘记，占了大多数失败案例。无论什么品类，每个 brief 都要执行：

1. **Identity must be explicit, not inferred.** 凡是定义 SKU 的属性——性别、版型、年龄段、颜色、材质、表面处理——都必须写成 prompt 里的英文字面词。**不要**指望模型从 reference 图里推导，它会 drift 到训练先验。

2. **Same subject = same Identity Lock card across every image.** 模特、宠物、产品 variant 在多张图里出现时，写一份固定描述，**逐字粘贴**到每张图的 prompt；同时把同一张 reference 图传给每次调用。

3. **Same sub-set = same Scene Context Lock.** 详情镜头共享一个表面和一面墙颜色（白墙不能在镜头之间变成绿/蓝）。生活化镜头共享一个地点和时间。重复出现的道具（杯子、植物、笔记本）必须是同一个、同一个状态。

4. **Background contrast must be minimum-viable and harmonious.** 背景在亮度或饱和度上**移动一档**，**不要**跳到对立极端。保持同一大色调家族。目标是"优雅分离"而非"高对比海报"。禁止过度对比：奶白衣撞黑底、黑设备撞纯白、中性产品撞高饱和色。禁止欠对比：白撞白、黑撞炭灰、木撞木。可接受：奶白 → 自然柔白或微冷未漂白亚麻；黑 → 暖浅灰或柔燕麦色；暖木色 → 偏冷柔灰。详见 `prompt-clauses.md` C1。

5. **Detail / macro / workmanship shots are product-only AND single-focus.** 不要人体皮肤、不要手、不要身体部位、不要无关道具。产品摆在干净中性表面（哑光织物、原木、拉丝混凝土、中灰纸）。**一张细节图 = 一个焦点——永远不要把多个不相关细节（领口 + 袖口 + 下摆）塞进一帧；拆成多张**。详见 `prompt-clauses.md` C3。

6. **Framing follows the focal product, not the model.** 焦点产品是模特佩戴 / 手持的小型 / 局部配饰（鞋、包、腰带、手表、首饰、墨镜、围巾、帽子）时，**模特的脸不是主体**——把焦点产品放在视觉中心，按下面规则裁掉模特：
    - **鞋** → 膝盖以下；不带脸
    - **包（单肩 / 跨身）** → 肩到髋，包占主导；下颚以上或整头裁掉
    - **腰带 / 腰部配饰** → 胸到大腿；通常不带头
    - **手表 / 手镯** → 前臂周围；身体其余是上下文
    - **项链 / 耳饰 / 墨镜 / 帽子** → **可以**包含脸（脸是画布）——干净肖像构图，但焦点仍通过光线 / 对焦 / 构图引向产品
    - **围巾 / 领部** → 胸到上肩；脸视情况是否真正服务产品

   **默认**：焦点产品是颈部以下的小件 → **不带脸**。带脸会形成抢戏的焦点（"她是谁"赢过"产品是什么"），同时还要让模特的眼神 / 表情也工作，通常会失败。**有疑问时把脸裁掉**。详见 `prompt-clauses.md` C10。

7. **Inspect against Attribute Card + Scene Context Lock before approving.** 每张已批准图必须在每个锁定属性上匹配 Attribute Card；每张子集图必须匹配该子集的 Scene Context Lock。Drift = severe defect = 重新生成。详见 `ai-pitfalls.md` S6/S7/S8。

服装类（女装 / 男装 / 童装）额外加：

- 性别（`women's` / `men's` / `unisex` / `kids'`）以英文文本写在 prompt 里
- 版型显式写出（`slim` / `regular` / `oversized`；`cropped` / `regular` / `longline`；`cinched waist` / `straight body`；袖型与领型）
- 反向性别版型加进 negative：女装写 `negative: men's cut, masculine drape, broad shoulders`；男装反过来

---

## 全局必填项原则（适用所有品类的 Brief 必填字段）

每个品类的 Brief 都至少要明确以下字段，缺一不可。**用户没明确给的字段就主动问 / 留空，禁止编造**——细分必填项见每个品类文件。

| 必填字段 | 说明 |
|---|---|
| 品类 + 子品类 | 主搜索关键词级别（如"女装短袖 T 恤" / "母婴婴儿背带"）|
| SKU 颜色 / 材质 / 表面处理 | 显式英文写出，避免训练先验 drift |
| 目标平台 | 决定画幅 / 白底 / 文件大小（详见 `platform-specs.md`）|
| 组图张数 + 角色分布 | 见各品类文件「组图设计分布表」|
| 是否含模特 / 宠物 / 场景 | 决定是否走 pilot 流程 |
| 卖点优先级（top 3）| 每张图聚焦 1 个卖点，避免一图多任务 |
| 合规敏感字段 | 认证标识 / 检测报告 / 功能数字（SPF / UV / 防水等级 / 容量 / 抗菌率 / 能效）必须有真实素材，否则不画或留空（见 `compliance-redlines.md`）|

**服装 / 鞋靴 / 箱包额外必填**：性别、版型、廓形、领型、袖型、款长、整组穿搭锁（OUTFIT LOCK）

**母婴 / 保健品 / 美妆 / 个护 / 3C 额外必填**：包装文字必须由参考图原图保留，AI 不重生；任何认证 / 检测 / 功能宣称数字必须有用户提供的真实素材（详见 `compliance-redlines.md`）

---

## Cross-Category Notes（跨品类边界）

商品横跨两个品类时，按**主搜索关键词**归类：

- "婴儿背带" → 母婴（Trust 优先），不是箱包
- "宠物服" → 宠物，不是服装
- "智能手表" → 3C（Information / Clarity 优先），不是饰品珠宝
- "运动鞋" → 鞋靴（Clarity / Information），不是运动户外
- "运动服" → 运动户外（功能优先于版型）
- "瑜伽服" → 运动户外（功能 + 场景）；非"瑜伽 lifestyle 服" 才归女装
- "母婴洗护" → 母婴（Trust 0.30 优先），不是个护
- "宠物保健品" → 宠物（情感 + 安全），不是保健品
- "孕产装" → 母婴（Trust 优先）
