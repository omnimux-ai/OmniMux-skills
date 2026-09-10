# Prompt Guidelines

## 目的

本文件定义“视频分镜图 skill”中提示词（Prompt）的编写原则、结构建议、镜头级写法、统一约束设计方法，以及常见错误规避方式。

这里的 prompt 不是为了堆叠华丽描述，而是为了让下游生成更稳定、更可控、更符合分镜任务。

适用场景包括：
- AI 分镜图生成
- AI 视频前置镜头 prompt
- 单镜头画面规划
- 多镜头连续性控制
- 产品类、电商类、UGC 类短视频视觉生成

---

## Prompt 的定位

在这个 skill 里，prompt 不是“灵感句子”，而是“生产指令”。

一个好的 prompt 应该帮助系统明确回答这些问题：

- 画面里是谁 / 是什么
- 在哪里
- 正在做什么
- 镜头如何看它
- 风格是什么
- 哪些元素必须一致
- 哪些错误必须避免

所以 prompt 的职责不是“写得优美”，而是“写得可生成”。

---

## Prompt 设计的核心原则

### 1. 任务先于风格
先明确这个镜头要完成什么，再决定怎么描述画面风格。

错误写法：
- cinematic, beautiful, luxury, stunning

问题：
- 很多风格词，但没有说明镜头在干什么

更好的写法：
- 年轻女性在办公室桌面前拿起便携榨汁杯喝一口，表情放松，突出“随时喝”的便利感，9:16 竖屏，中近景，轻微横移

### 2. 可视化优先
prompt 要写“看得见的东西”，不是写抽象判断。

弱：
- 表达产品很方便

强：
- 用户把小型榨汁杯直接放进托特包，随后在办公室桌面拿出使用

### 3. 单镜头单任务
一个镜头的 prompt 最好只强调一个主要信息点：
- 开场抓人
- 展示痛点
- 展示操作
- 展示场景
- CTA

如果一个 prompt 同时塞入：
- 产品外观
- 5 个卖点
- 3 个场景
- 复杂情绪转折

大概率会变得失焦。

### 4. 先主体，后环境，再风格
推荐写法顺序：
1. 主体是谁/是什么
2. 正在做什么
3. 场景在哪里
4. 镜头如何拍
5. 风格和光线
6. 输出比例或特殊约束

### 5. 一致性必须显式写出来
如果是多镜头生成，不能默认系统会自动保持一致。
应明确写：
- same product across all shots
- same female character identity
- consistent color and product design
- realistic continuity across scenes

### 6. 少堆叠空泛美学词
太多“高级感、氛围感、电影感、质感、通透感”会让 prompt 失去任务导向。

可以用，但只能作为辅助，不应取代主体、动作、场景描述。

---

## Prompt 的推荐结构

建议采用以下结构：

```text
[主体] + [动作] + [场景] + [镜头语言] + [风格/光线] + [构图/画幅] + [一致性约束]


例如：

text
年轻女性在明亮整洁的办公室桌面前拿起便携榨汁杯喝一口，表情轻松满足，现代日常办公环境，中近景，轻微横移，真实生活方式感，自然柔和室内光，9:16 竖屏，保持产品颜色和人物形象一致

单镜头 Prompt 应包含哪些信息
1. 主体（Subject）

要明确画面主体是谁或是什么。

可选主体包括：

产品
用户
出镜模特
手部动作
成品饮品
使用环境中的人和物

示例：

年轻女性
一只手拿起产品
便携榨汁杯放在厨房台面上
2. 动作（Action）

说明主体正在做什么。

示例：

按下启动按钮
把产品放进包里
对镜头举起产品
喝一口后点头

动作必须可见、可理解。

3. 场景（Environment）

说明画面发生在哪里。

示例：

厨房台面
办公桌面
健身房外
卧室梳妆台前

场景不要只写“室内”“生活场景”，尽量具体。

4. 镜头语言（Camera / Framing）

说明怎么拍。

可写内容：

近景 / 中景 / 特写
轻推 / 横移 / 定镜 / 跟拍
自拍感 / 手持感 / 稳定器感

示例：

close-up product shot
medium close-up
slight handheld push-in
5. 风格与光线（Style / Lighting）

只写能帮助生成的风格信息。

示例：

realistic lifestyle
social-commerce visual style
bright natural light
clean modern background
6. 画幅与构图（Format / Composition）

推荐写清楚：

9:16 vertical
space for subtitles
subject centered
clean composition
7. 连续性约束（Continuity）

多镜头项目建议写：

same product across all shots
same female character identity
consistent clothing palette
keep product design unchanged
Prompt 的层级设计

在多镜头项目中，建议把 prompt 分成三层：

层级 1：全局约束

适用于所有镜头，例如：

9:16 竖屏
真实生活方式感
平台原生内容视觉
统一人物与产品
层级 2：场景组约束

适用于同一组镜头，例如：

厨房场景系列
办公室场景系列
健身场景系列
层级 3：单镜头 prompt

适用于具体镜头任务，例如：

按按钮
出门手持
对镜 CTA

这样能减少重复，也更利于一致性控制。

不同镜头类型的 Prompt 写法建议
1. Hook 镜头
目标

快速建立注意力或问题代入。

写法重点
明确冲突或状态
不要描述太满
动作要一眼可懂
示例

年轻女性早晨在厨房台面前赶时间，一只手拿水果，另一只手看时间，表情略急，真实通勤前生活状态，9:16 竖屏，中近景，轻微手持推进，自然晨间室内光

2. 痛点镜头
目标

表现旧方案麻烦、笨重、低效或不适配。

写法重点
通过画面表现问题
不要依赖大量文字解释
不必攻击具体品牌
示例

厨房台面上笨重传统机器和复杂准备过程带来麻烦感，用户动作停顿，露出犹豫和嫌麻烦的反应，真实家居环境，近景，快切电商短视频风格

3. 产品登场镜头
目标

让产品作为解决方案清晰出现。

写法重点
产品必须看清
外观与体积要明确
背景尽量简洁
示例

一只手把小巧便携榨汁杯举到镜头前，产品外观干净简洁，白色杯身，体积适合手持，真实厨房背景，产品近景，快速推进，明亮自然光，9:16 竖屏

4. 卖点演示镜头
目标

通过动作展示卖点，而不是讲卖点。

写法重点
动作清楚
顺序清楚
尽量只展示一个核心卖点
示例

手把水果块放进便携榨汁杯，倒入液体后按下启动按钮，产品开始工作，动作步骤清晰，产品特写，厨房台面背景，电商演示风格，9:16 竖屏

5. 场景适配镜头
目标

展示产品融入生活的能力。

写法重点
场景具体
动作自然
避免摆拍感太强
示例

年轻女性坐在整洁办公室桌面前，拿起便携榨汁杯轻松喝一口，表情自然满足，真实办公场景，中近景，轻微横移，清爽生活方式感，9:16 竖屏

6. CTA 镜头
目标

引导点击、查看、下单或关注。

写法重点
产品清楚
人物表情自然
留出字幕空间
示例

年轻女性对镜头举起便携榨汁杯，表情自然推荐感，画面最后停留在产品清晰特写，明亮干净背景，9:16 竖屏，中近景转产品近景，轻微推进，预留 CTA 字幕区域

Prompt 编写模板
模板 A：通用单镜头模板
text
[主体] 在 [场景] 中 [动作]，突出 [本镜头任务]， [景别]， [运镜]， [风格]， [光线]， [画幅]， [一致性约束]

模板 B：产品演示镜头模板
text
close-up of [product] as [action], showing [selling point], in [scene], realistic ecommerce social video style, [lighting], 9:16 vertical, clean composition, consistent product design

模板 C：UGC 人物镜头模板
text
young [character] speaking or reacting naturally in [scene], showing [product/use moment], realistic UGC content style, [framing], [camera feel], natural lighting, 9:16 vertical, authentic everyday mood

负面提示词设计建议

负面提示词的目的不是越多越好，而是防止高频错误。

产品类常见负面词
distorted product
inconsistent product design
broken shape
duplicate object
wrong proportions
人物类常见负面词
extra fingers
deformed hands
unnatural face
asymmetric eyes
awkward pose
画面类常见负面词
blurry
cluttered background
text artifacts
watermark
overexposed
underexposed
messy composition
风格类常见负面词
over-stylized luxury ad
heavy cinematic darkness
surreal composition
abstract editorial look
多镜头连续性写法建议

如果是整套分镜，建议在每个镜头 prompt 后统一追加类似语句：

text
same product across all shots, same female character identity, consistent product color and size, realistic continuity, keep wardrobe and styling coherent


如果场景跨越较大，还可以补：

maintain visual continuity while adapting location
keep product design unchanged across scenes
Prompt 常见错误
错误 1：只有风格词，没有任务

示例：

cinematic, premium, soft light, luxury, beautiful, realistic

问题：

不知道画面主体是什么
不知道镜头在干嘛
错误 2：一条 prompt 塞太多信息

问题：

同时写 3 个场景、5 个动作、多个卖点
生成结果失焦
错误 3：主体不明确

问题：

“展示方便感”
“表达高级感” 这种写法没有明确对象
错误 4：产品一致性没有显式约束

问题：

多镜头下产品颜色、尺寸、结构容易漂移
错误 5：只写镜头，不写场景

问题：

近景、推进、特写写了很多
但不知道在什么环境里发生
Prompt 质量自检清单

在定稿前，建议检查每条 prompt 是否满足：

能看出主体是谁/是什么
能看出正在发生什么动作
能看出场景在哪里
能看出镜头如何拍
能看出为什么这个镜头存在
不依赖抽象形容词才能成立
多镜头情况下有一致性约束
适合 9:16 短视频场景
一句话总结

好 prompt 不是“词藻丰富”，
而是：

主体明确、动作清楚、场景具体、镜头可控、一致性可维护。
