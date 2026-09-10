# 批量参考改编提示模板

## 适用场景

- 商品图批量重构
- 多张营销图风格统一
- 参考图转多图 prompt
- 电商 listing 图组规划
- TikTok / 社媒商品内容图组生成
- 单一主体的多场景批量延展

## 使用目标

给定若干参考图和业务要求后，输出一组可执行的图片复刻方案，通常包括：

- 参考图分析摘要
- 风格统一规则
- 图组角色分工
- 每张图的提示词草案
- 通用负向约束建议

## 标准模板

```md
请基于我提供的参考图，为同一主体生成一组风格统一的商业图片方案。

总体要求：
- 保持主体在所有输出中的核心识别特征一致
- 参考原始图片的视觉方向，但不要机械复制
- 整组图片要像同一套视觉系统或同一次拍摄产出
- 每张图分工明确，但整体风格、材质逻辑、光线语言要统一
- 输出应适合商业、电商或营销使用

任务信息：
- 主体：{subject}
- 参考图：{reference_summary}
- 必须保留：{must_preserve}
- 希望变化：{what_can_change}
- 输出数量：{output_count}
- 图组用途：{usage}
- 风格方向：{style_direction}
- 目标平台：{target_platform}
- 画幅比例：{aspect_ratio}
- 禁止项：{forbidden_elements}

请完成以下内容：
1. 先总结参考图中可复用的风格特征
2. 提炼整组图片的一致性规则
3. 设计每张图的角色分工
4. 为每张图写出结构化提示词
5. 给出通用负向约束，避免主体失真、材质错误、背景杂乱、风格跑偏等问题

输出目标：
得到一套主体稳定、风格统一、商业感强、可直接用于后续图像生成或创意执行的批量图片方案。
```

---

## 精简模板

```md
请参考这些图片，为同一主体重建一组新的商业图片。
保留主体识别特征与主要材质逻辑，借鉴参考图的构图、光线、背景和氛围，但不要直接复制。
整组图片要风格统一、用途明确、适合{usage}。
参数：
- 主体：{subject}
- 输出数量：{output_count}
- 风格：{style_direction}
- 比例：{aspect_ratio}
- 不要出现：{forbidden_elements}
```

---

## 结构化模板

```md
# Batch Image Recreation Brief

## Subject
{subject}

## Must Preserve
- {must_preserve_1}
- {must_preserve_2}
- {must_preserve_3}

## Allowed Variations
- {variation_1}
- {variation_2}
- {variation_3}

## Reference Images
- Ref 01: {reference_01_usage}
- Ref 02: {reference_02_usage}
- Ref 03: {reference_03_usage}

## Output Count
{output_count}

## Usage
{usage}

## Target Platform
{target_platform}

## Style Direction
{style_direction}

## Composition Preference
{composition_preference}

## Lighting Preference
{lighting_preference}

## Background Preference
{background_preference}

## Selling Points
- {selling_point_1}
- {selling_point_2}
- {selling_point_3}

## Forbidden Elements
- {forbidden_1}
- {forbidden_2}
- {forbidden_3}

## Goal
Create a commercially usable batch of recreated images with strong set-level consistency, clear role separation, realistic material rendering, and platform-appropriate visual quality.
```

---

## 电商图组示例

```md
请基于参考图，为同一个商品生成一组统一风格的电商图片方案。

要求：
- 保留商品外形、材质、比例、关键结构和识别细节
- 整组图像应像同一套商业 campaign
- 主图要突出商品整体外观
- 细节图要突出材质与做工
- 场景图要突出使用氛围和转化感
- 背景、光线和质感表现要统一
- 适合 TikTok Shop / 商品 listing / 营销使用

参数：
- 主体：桌面香薰机
- 参考图：一张主体参考图、一张高级商业风格参考图、一张生活方式场景参考图
- 必须保留：产品轮廓、出雾结构、材质质感、配色和品牌位
- 希望变化：场景、构图、细节强调方式
- 输出数量：3
- 图组用途：商品营销图
- 风格方向：clean commercial, premium, calm lifestyle
- 目标平台：TikTok Shop
- 画幅比例：4:5
- 禁止项：复杂背景、错误结构、错误品牌元素、夸张烟雾效果、比例失真
```

## 美妆产品图组示例

```md
请基于参考图，为同一组美妆产品设计一套批量复刻图片方案。

要求：
- 产品包装结构、瓶型、颜色和组合关系必须稳定
- 整组图要保持高级、干净、偏美妆商业广告的视觉语言
- 每张图需要有不同分工，例如主图、质地图、氛围图
- 背景和色调可以有轻微变化，但不能破坏整组统一感
- 输出适用于社媒、电商详情页和广告素材

参数：
- 主体：护肤精华套装
- 必须保留：瓶身比例、包装配色、标签布局、产品组合关系
- 希望变化：背景层次、镜头距离、卖点重点
- 输出数量：4
- 图组用途：营销种草 + 电商详情展示
- 风格方向：modern beauty, clean premium, soft luxury
- 目标平台：TikTok / 独立站 / 广告落地页
- 画幅比例：4:5
- 禁止项：错误包装、廉价质感、颜色漂移、背景过满、主体不一致
```

---

## 服饰/穿搭图组示例

```md
请基于参考图，为同一款服饰生成一组风格统一的展示图。

要求：
- 保留服饰版型、颜色、主要面料和穿搭核心特征
- 整组图片要兼顾商品展示与穿搭表达
- 不同图片可有不同姿态、取景和背景，但整体要像同一品牌视觉体系
- 每张图的主体都要清楚，不能因为场景或人物姿态削弱服饰本身
- 输出适合服饰电商和社媒展示

参数：
- 主体：女款针织外套
- 必须保留：版型、长度、颜色、针织纹理、主要设计点
- 希望变化：背景、姿态、镜头远近、氛围表达
- 输出数量：3
- 图组用途：电商详情页 + 社媒 lookbook
- 风格方向：minimal fashion, soft editorial, clean commercial
- 目标平台：TikTok / Instagram / 独立站
- 画幅比例：4:5
- 禁止项：肢体变形、服装结构错误、过度戏剧化背景、廉价光线
```

---

## 可公开一致性约束模板

```md
Batch Consistency Requirements
- Keep the same core subject identity across all outputs.
- Maintain consistent material behavior and structural accuracy.
- Use a unified color logic, lighting logic, and styling direction.
- Let each image serve a different role without breaking overall cohesion.
- Ensure the whole set feels like one campaign, not unrelated individual images.
```

---

## 可公开负向约束模板

```md
Avoid:
- distorted proportions
- incorrect structure
- mismatched materials
- inconsistent branding
- cluttered composition
- conflicting lighting directions
- noisy or low-detail rendering
- background elements that overpower the subject
- visual inconsistency across the batch
```

---

## 输出结构建议

建议将结果组织为以下结构：

```md
# Batch Recreation Output

## 1. Reference Analysis
{reference_summary}

## 2. Style Bible
{style_rules}

## 3. Image Role Plan
- Image 01: {role_1}
- Image 02: {role_2}
- Image 03: {role_3}

## 4. Prompt Drafts
### Prompt 01
{prompt_01}

### Prompt 02
{prompt_02}

### Prompt 03
{prompt_03}

## 5. Negative Guidance
{negative_guidance}
```

---

## 最小输入版本

如果只想快速发起批量任务，可以直接使用：

```md
请参考这些图，为同一主体做一组新的商业图片方案。
主体：{subject}
保留：{must_preserve}
可变化：{what_can_change}
输出：{output_count}
风格：{style_direction}
用途：{usage}
比例：{aspect_ratio}
不要出现：{forbidden_elements}
```

---

## 推荐填写优先级

建议至少填写以下内容：

1. `subject`
2. `must_preserve`
3. `output_count`
4. `style_direction`
5. `usage`

如果任务更复杂，建议补充：

- `reference_summary`
- `target_platform`
- `selling_points`
- `composition_preference`
- `lighting_preference`
- `background_preference`
- `forbidden_elements`

---

## 导出说明

本文件是公开的批量参考改编提示样式，用于把多张参考图整理成一套统一的图组 brief。
它是示例，不是唯一格式。
