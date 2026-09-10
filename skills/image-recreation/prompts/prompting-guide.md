# Prompting Guide

Use this reference when the output should include AI image generation prompts.

## Prompt Structure

Write the generation prompt in English unless the target model or user requires another language. Keep user-provided labels or text copy in the original language.

```text
[Image type and commercial purpose].
Hero subject: [user product facts, stable identity, material, color, shape].
Composition: [reference-derived structure using spatial terms].
Scene and props: [adapted, non-competitor-specific environment].
Lighting and camera: [reference-derived lighting/camera logic].
Selling point visualization: [how the image proves the product value].
Brand adaptation: [palette/mood fitting user brand, not copied from source].
Text-safe area: [if needed].
Quality constraints: [clean product, accurate proportions, no false claims].
```

## Negative Constraints

Use negative constraints to protect commercial usability:

- no competitor logo, no copied packaging, no watermark
- no distorted product, no changed label, no inconsistent materials
- no misleading claim, no impossible result
- no extra hands, no broken anatomy when models or hands appear
- no unreadable text when copy must be rendered

## Product Consistency Rules

- Repeat the product identity in concrete terms: category, shape, material, color, label placement, package proportions.
- If reference images are available, pass them as visual references instead of over-describing every pixel in prompt text.
- Do not invent claims, specs, certifications, ingredients, before/after results, or platform badges.
- For batches, reuse the same product description block and vary only scene role, angle, or selling-point emphasis.

## Variant Control

Define each variant by one controlled axis:

- angle variant: front hero, 45-degree, overhead, macro detail.
- scene variant: studio, lifestyle, use case, shelf/display.
- benefit variant: texture, convenience, result, size/scale, portability.
- channel variant: main image, secondary listing image, ad hook, social post.

## Prompt Output Template

```markdown
## 生成 Prompt
**Main prompt**
...

**Negative constraints**
...

**Reference image usage**
- Use reference image for:
- Do not copy:

**Variant differences**
1. ...
2. ...
```
