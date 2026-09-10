# 负向约束指南

## 使用原则

负向约束的目标不是“堆词越多越好”，而是：

1. 避免最常见的失败模式
2. 保护主体一致性
3. 提升商业可用性
4. 降低背景、材质、结构和光线上的失真
5. 保持画面可读、可审、可交付

建议优先围绕以下维度写负向约束：

- 主体结构
- 比例
- 材质
- 构图
- 背景
- 光线
- 品牌元素
- 风格一致性
- 商业感
- 画面质量

## 通用基础版

```md
Avoid:
- distorted proportions
- malformed structure
- extra unwanted elements
- incorrect material rendering
- cluttered composition
- noisy background
- unrealistic reflections
- inconsistent lighting
- low-detail texture
- wrong branding
- duplicated parts
- floating objects
- visual artifacts
- weak commercial focus
```

---

## 中文基础版

```md
请避免以下问题：
- 主体比例失真
- 结构错误或多余结构
- 材质表现不真实
- 背景杂乱
- 构图不稳定
- 光线逻辑混乱
- 品牌元素错误
- 低细节或脏噪点
- 不必要的道具
- 漂浮物体
- 重复部件
- 画面商业重点不明确
```

---

## 结构化模板

```md
# Negative Guidance

## Subject Integrity
- no distorted proportions
- no structural errors
- no extra parts
- no missing essential parts
- no inconsistent identity

## Material Accuracy
- no fake texture
- no plastic-looking metal unless intended
- no unrealistic gloss
- no muddy surface detail
- no incorrect transparency or reflection

## Composition Control
- no clutter
- no unstable framing
- no awkward cropping
- no competing focal points
- no distracting edge elements

## Lighting Control
- no conflicting shadows
- no random highlight placement
- no flat lighting when premium texture is required
- no overexposure
- no underexposed subject

## Background Control
- no messy environment
- no unrelated props
- no overpowering background
- no inconsistent scene logic

## Branding / Accuracy
- no wrong logo placement
- no fake product details
- no incorrect packaging structure

## Quality Control
- no blur unless intended
- no low-detail rendering
- no noise artifacts
- no visual duplication
- no broken small details
```

## 商品图适用版

```md
Negative Guidance for Product Images
- no product deformation
- no incorrect product structure
- no scale inconsistency
- no wrong cap / lid / handle / edge details
- no fake material behavior
- no chaotic reflections
- no cluttered props
- no background overpowering the product
- no wrong logo or label layout
- no soft low-detail rendering
- no cheap-looking lighting
- no e-commerce-unfriendly composition
```

---

## 美妆产品适用版

```md
Negative Guidance for Beauty Products
- no incorrect bottle shape
- no wrong label placement
- no inconsistent packaging color
- no unrealistic glass or plastic texture
- no sticky or muddy reflections
- no cluttered beauty props
- no overpowering flowers or decorations
- no low-end cosmetic look
- no over-retouched artificial texture
- no style inconsistency across the set
```

---

## 服饰 / 人像适用版

```md
Negative Guidance for Fashion / Apparel
- no body deformation
- no extra fingers or malformed hands
- no incorrect garment structure
- no broken seams or impossible folds
- no fabric texture inconsistency
- no unrealistic draping
- no background overpowering the outfit
- no awkward pose that hides key design details
- no mismatched styling elements
- no cheap editorial look
```

---

## 家居 / 场景适用版

```md
Negative Guidance for Home / Lifestyle Scenes
- no unrealistic furniture scale
- no impossible spatial layout
- no mixed lighting logic
- no over-decorated environment
- no visual clutter
- no props unrelated to the main subject
- no weak focal hierarchy
- no messy surfaces
- no inconsistent interior style
```

---

## 批量一致性适用版

```md
Negative Guidance for Batch Consistency
- no subject identity drift across images
- no inconsistent material behavior between outputs
- no sudden color palette shifts
- no conflicting lighting directions
- no random background complexity changes
- no mixed rendering styles within one set
- no uneven quality level across the batch
- no campaign-breaking composition differences
```

---

## 电商商业感适用版

```md
Commercial Readiness Negative Guidance
- no unclear subject hierarchy
- no weak first-glance readability
- no distracting scene elements
- no low-contrast product separation
- no muddy or unclear material expression
- no over-stylization that hurts product recognition
- no composition that reduces click appeal
- no non-commercial framing
```

---

## 简洁拼接版

适合直接拼接到主 prompt 尾部：

```md
Avoid distorted proportions, structural mistakes, wrong branding, unrealistic materials, messy background, cluttered props, conflicting lighting, duplicated parts, floating objects, low-detail rendering, noisy artifacts, and anything that weakens subject clarity or commercial usability.
```

---

## 中文简洁拼接版

```md
避免主体比例失真、结构错误、品牌元素错误、材质不真实、背景杂乱、道具喧宾夺主、光线冲突、重复部件、漂浮物体、低细节渲染、脏噪点，以及任何削弱主体清晰度和商业可用性的问题。
```

---

## 按风险优先级推荐

如果需要控制长度，建议优先保留以下高优先级负向约束：

### 高优先级
- 主体比例失真
- 结构错误
- 材质错误
- 品牌信息错误
- 背景杂乱
- 光线逻辑混乱

### 中优先级
- 多余道具
- 构图不稳定
- 漂浮元素
- 低细节
- 重复部件

### 低优先级
- 边缘噪点
- 局部轻微质感偏差
- 轻度色温不稳

---

## 示例：商品复刻任务中的负向约束组合

```md
请避免以下问题：
- 商品外形比例失真
- 材质表现不真实
- 杯盖、边缘、接口等结构错误
- 背景杂乱或道具过多
- 高光过曝或反光混乱
- 错误品牌元素或标签布局
- 主体不够突出
- 细节模糊、表面质感松散
- 图像整体缺乏商业感
```

---

## 示例：批量图组中的负向约束组合

```md
请避免以下问题：
- 同一主体在不同图中长得不一样
- 某张图材质偏塑料感，另一张图材质偏金属感
- 某张图偏暖黄，某张图偏冷蓝，整体不统一
- 有的图背景过满，有的图过空，缺少体系感
- 构图、光线和商业调性前后割裂
- 画质和精修程度不一致
```

---

## 输出建议

正式交付时，可将负向约束整理成：

- `negative_prompts.md`
- `quality_checklist.md`
- `final_prompts.md` 中每条 prompt 的附加段落

---

## 使用提醒

- 负向约束要与任务类型匹配
- 不要无意义堆叠过长列表
- 尽量优先约束“真的会出错”的问题
- 如果是批量任务，记得增加“一致性”类负向约束
- 如果是电商任务，记得增加“商业可读性”类负向约束

---

## 导出说明

本文件是公开的负向约束参考，用于帮助输出更稳定、更可商用。
它是示例，不是唯一格式。
