# 风格一致性补充模板

适用于以下场景：

- 多张商品图保持同一品牌视觉
- 批量复刻结果风格统一
- 不同场景图之间维持同一审美语言
- 提示词补充一致性约束
- 在多角色图组中避免每张图风格跑偏

## 使用目标

当你已经有主体、参考图或初步 prompt，但担心多张图“各做各的”、不够像同一套图时，可以追加本模板中的一致性约束内容。

目标包括：

- 统一主体识别特征
- 统一色彩与光线逻辑
- 统一构图语言与商业调性
- 统一材质表现与画质风格
- 保证每张图有分工，但仍属于同一套视觉系统

## 标准模板

```md
请确保整组图片在视觉上保持高度一致。

一致性要求：
- 所有图片中的核心主体必须保持同一识别特征
- 主体的结构、材质、颜色逻辑和关键细节不能前后冲突
- 整组图片要使用统一的风格方向、光线语言、色彩系统和商业调性
- 每张图片可以承担不同角色，但必须让人感觉属于同一品牌、同一 campaign 或同一次拍摄
- 画面之间允许场景和构图变化，但不能破坏整组统一感

请重点保持以下方面一致：
- 主体外形和比例
- 材质质感
- 光线方向与强弱逻辑
- 色调与色温
- 背景复杂度
- 镜头语言
- 精修程度与画质感受
- 商业感与平台适配度

同时避免以下问题：
- 主体长得像不同产品
- 材质前后变化明显
- 某一张图风格突然偏离
- 背景复杂度差异过大
- 光线逻辑互相冲突
- 有的图偏广告，有的图偏随手拍，缺乏整体体系感
```

---

## 精简模板

```md
请让整组图片保持统一风格。
要求主体一致、材质一致、色调一致、光线一致、商业感一致。
不同图片可以有不同分工，但整体必须像同一套内容产出，不能风格跑偏。
```

---

## 结构化模板

```md
# Style Consistency Brief

## Core Subject Consistency
- Keep the same subject identity across all outputs.
- Preserve defining structural features.
- Maintain stable color and material logic.

## Visual Language Consistency
- Use a unified style direction.
- Maintain consistent lighting logic.
- Keep a coherent color palette and tone.
- Preserve similar rendering quality and detail density.

## Composition Consistency
- Allow role-based framing differences.
- Keep the same overall visual system.
- Avoid unrelated composition extremes.

## Commercial Consistency
- Ensure all images feel suitable for the same platform and campaign.
- Keep the same level of polish, clarity, and product emphasis.

## Avoid
- inconsistent subject appearance
- conflicting materials
- mixed visual styles
- uneven quality levels
- random background logic
```

---

## 商品图组示例

```md
请确保这组商品图在视觉上属于同一套商业图系统。

要求：
- 商品外形、比例、颜色和材质必须稳定一致
- 所有图片都应保持干净、高级、适合电商的视觉方向
- 主图、细节图和场景图虽然分工不同，但整体要像同一次拍摄产出
- 背景可以变化，但复杂度、色调和氛围不能差异过大
- 光线要统一为柔和、受控、强调材质质感的商业打光
- 不要出现某张图很棚拍、某张图很生活随拍、某张图又像海报拼贴的割裂感
```

---

## 美妆场景示例

```md
请保持这组美妆图片的一致性。

要求：
- 包装结构、瓶型、标签布局和产品组合关系必须稳定
- 色调统一为干净、柔和、精致的美妆商业风格
- 每张图都要有高级感，但不要一张偏冷、一张偏暖、一张偏廉价
- 光线和背景层次需要统一，维持同一品牌视觉体系
- 图组可以分别承担主图、质地图、氛围图等角色，但整体上必须像同一 campaign
```

---

## 服饰场景示例

```md
请保持这组服饰图片的整体一致性。

要求：
- 服饰版型、颜色、长度、材质和关键设计点必须稳定
- 无论人物姿态、背景或镜头如何变化，服饰本身不能失真
- 风格统一为干净、克制、偏品牌化的 fashion commercial 方向
- 各张图都要保持相近的光线语言、调色方式和精修程度
- 让整组图看起来像同一品牌 lookbook，而不是来自不同项目的混合图
```

---

## 可公开一致性增强语句

以下内容可按需附加到任意图片任务中：

```md
Consistency Enhancer
- Treat all outputs as part of one coherent visual set.
- Preserve the same subject identity, material logic, and quality level.
- Maintain a stable tone, lighting style, and rendering language.
- Allow variation only where it supports role differentiation, not stylistic drift.
- Ensure the set feels intentionally art-directed rather than randomly generated.
```

---

## 可公开负向约束模板

```md
Avoid inconsistency such as:
- different-looking versions of the same subject
- mismatched color or material behavior
- conflicting light direction or scene logic
- one image looking overly realistic while another looks stylized
- abrupt changes in background complexity
- mixed commercial quality levels across the set
```

---

## 推荐配合字段

为获得更稳定的一致性结果，建议同时提供：

- 主体说明
- 必须保留内容
- 输出数量
- 用途 / 平台
- 风格方向
- 光线偏好
- 背景偏好
- 禁止项

---

## 最小附加版本

如果你已经有主 prompt，只想补一段一致性约束，可直接追加：

```md
请确保所有输出保持统一风格：
主体识别特征一致，材质与颜色逻辑一致，光线与色调一致，背景复杂度一致，商业调性一致。
允许构图和场景做角色化变化，但整组必须像同一套视觉系统，不能风格跑偏。
```

---

## 对外协作建议

在把此模板交给客户、设计师、运营或生成团队时，建议：

1. 明确“哪些元素必须统一”
2. 明确“哪些元素允许变化”
3. 不只说“保持一致”，而是具体到光线、材质、背景、色调、镜头语言
4. 把一致性要求写成可检查项，而不是抽象审美词

---

## 导出说明

本文件是公开的一致性补充模板，用于把“整组图要像一套内容”写成可检查的要求。
它是示例，不是唯一格式。
