# 单张参考改编提示模板

## 适用场景

适用于以下场景：

- 复刻某张商品图的视觉感觉
- 基于参考图重建单张营销图
- 生成某个主体的替代构图版本
- 保留主体但替换场景、背景、光线或镜头
- 输出适合电商、社媒或广告的单张商业图

## 标准模板

```md
请基于我提供的参考图，生成一张新的商业图片方案。

目标要求：
- 保留主体的核心识别特征
- 参考原图的视觉方向，但不要机械复制
- 输出应适合商业或电商使用
- 整体风格保持统一、清晰、真实、有质感

请重点处理以下方面：
- 主体外形与结构
- 材质与表面细节
- 构图与镜头角度
- 光线方向与阴影逻辑
- 背景与空间层次
- 画面商业感与可读性

已知要求：
- 主体：{subject}
- 希望保留：{must_preserve}
- 希望调整：{what_to_change}
- 风格方向：{style_direction}
- 使用场景：{usage}
- 画幅比例：{aspect_ratio}
- 禁止项：{forbidden_elements}

输出目标：
生成一张画面完整、主体突出、风格明确、适合商业投放或商品展示的图片。
避免结构错误、材质失真、背景杂乱、品牌信息错误、构图失衡或低质感表现。
```

---

## 精简模板

```md
参考这张图，重建一张新的商业图片。
保留主体识别特征与主要材质表现，借鉴原图的构图、光线和氛围，但不要直接复制。
请让画面更适合{usage}，风格偏向{style_direction}，比例为{aspect_ratio}。
不要出现：{forbidden_elements}。
```

---

## 结构化模板

```md
# Single Image Recreation Brief

## Subject
{subject}

## Must Preserve
- {must_preserve_1}
- {must_preserve_2}
- {must_preserve_3}

## Desired Changes
- {change_1}
- {change_2}
- {change_3}

## Style Direction
{style_direction}

## Composition Preference
{composition_preference}

## Lighting Preference
{lighting_preference}

## Background Preference
{background_preference}

## Usage
{usage}

## Aspect Ratio
{aspect_ratio}

## Forbidden Elements
- {forbidden_1}
- {forbidden_2}
- {forbidden_3}

## Goal
Create one commercially usable recreated image with strong subject clarity, realistic material rendering, clean composition, and consistent visual quality.
```

---

## 电商商品图示例

```md
请基于参考图，重建一张电商商品图。

要求：
- 保留商品的外形轮廓、材质、关键结构和识别细节
- 画面更干净、更有商业感、更适合商品展示
- 使用简洁高级的背景，避免杂乱元素
- 光线柔和但要有清晰高光，体现材质质感
- 构图应让商品成为绝对主体
- 图片适用于 TikTok Shop / 电商 listing

参数：
- 主体：便携保温杯
- 希望保留：杯身比例、杯盖结构、金属与塑料材质关系、品牌位
- 希望调整：背景更简洁，商业感更强，整体更精致
- 风格方向：clean commercial, premium, modern
- 使用场景：TikTok Shop 商品主图
- 画幅比例：4:5
- 禁止项：复杂背景、错误 logo、商品比例失真、过强反光
```

---

## 生活方式营销图示例

```md
请基于参考图，生成一张更适合生活方式营销场景的复刻图。

要求：
- 保留主体的核心识别特征
- 场景要更真实自然，带有轻度氛围感
- 产品仍然要是视觉焦点，不能被环境淹没
- 光线应柔和自然，画面具有可信度和种草感
- 整体适合社媒传播与营销展示

参数：
- 主体：护肤产品套装
- 希望保留：瓶身造型、包装配色、产品组合关系
- 希望调整：增加生活方式场景感，提升温暖感与精致度
- 风格方向：soft premium, clean lifestyle, modern beauty
- 使用场景：社媒种草图 / 营销素材
- 画幅比例：4:5
- 禁止项：背景过满、人物抢主体、错误包装结构、廉价质感
```

---

## 人像/穿搭类示例

```md
请基于参考图重建一张穿搭展示图。

要求：
- 保留服饰主体的颜色、版型、主要材质和穿搭重点
- 整体画面更统一、更干净、更适合商业展示
- 可以调整背景、姿态氛围和构图，但不要让服饰失真
- 强调服装质感、轮廓与搭配关系
- 输出适合电商或社媒展示

参数：
- 主体：女士针织开衫穿搭
- 希望保留：版型、颜色、针织质感、长度比例
- 希望调整：背景更简洁，姿态更自然，整体更像品牌 lookbook
- 风格方向：minimal fashion, soft editorial, commercial clean
- 使用场景：服饰详情图 / 社媒展示图
- 画幅比例：4:5
- 禁止项：肢体变形、服装结构错误、过度夸张姿势、背景杂乱
```

---

## 可公开负向约束模板

```md
请避免以下问题：
- 主体比例失真
- 多余结构或错误细节
- 材质不真实
- 错误品牌元素
- 光线逻辑混乱
- 背景喧宾夺主
- 构图不稳定
- 商业感不足
- 画质松散或低细节
```

## 最小输入版本

如果你只想快速发起任务，可以直接使用：

```md
请参考这张图，重建一张新的图片。
主体是：{subject}
保留：{must_preserve}
调整：{what_to_change}
风格：{style_direction}
用途：{usage}
比例：{aspect_ratio}
不要出现：{forbidden_elements}
```

---

## 推荐填写方法

建议至少填写以下字段：

1. `subject`
2. `must_preserve`
3. `what_to_change`
4. `style_direction`
5. `usage`

如果信息更完整，输出质量通常会更稳定，例如再补充：

- `composition_preference`
- `lighting_preference`
- `background_preference`
- `aspect_ratio`
- `forbidden_elements`

---

## 导出说明

本文件是公开的单张参考改编提示样式，用于需求收集、Prompt 草拟或人工执行对齐。
它是示例，不是唯一格式。
