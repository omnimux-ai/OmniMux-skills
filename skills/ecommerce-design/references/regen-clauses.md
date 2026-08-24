# 重生 / 编辑 Clauses（R1 / R2 / R3）

> **何时 read**：用户要求重做 / 编辑某张已生成图时拼 regen prompt（与 Identity / Scene Lock 并存）。

## Clause R1：Set-Consistency Lock（意图 A 或 B）

```
This image is part of an existing approved set. The following attributes must remain IDENTICAL to the other images of the set (attached as references):
- Product appearance: color, packaging, on-pack text, signature features, material finish, weave, texture density
- Model identity (if applicable): face, hair, skin tone, body proportions, expression family
- Outfit (if applicable): every styling element around the focal product (下装 / 上装 / 鞋 / 包 / 首饰 / 发型 / 指甲) must match the locked outfit
- Scene family: surface, wall color, time of day, color grade, lighting direction and quality
- Recurring props: same prop in the same state (cup fill level, plant leaf angle, notebook page)
Only the following changes are allowed in this regeneration: {explicit list of what is being changed and nothing else}.
```

## Clause R2：Local Edit Scope（仅意图 A）

```
This is a LOCAL EDIT, not a regeneration. Use the attached base image as the canvas. The ONLY region to change is {explicit region — e.g. "the right sleeve fabric, where pilling is currently visible"}. Every other pixel of the image must remain byte-identical to the base. Do not adjust the model's pose, the lighting, the background, the color grade, or any other element. Match the new region's texture / color / lighting to the surrounding pixels of the base image so the edit is invisible.
```

## Clause R3：Texture / Detail Match Reference（意图 A 或 B，修材质 defect 时）

修纹理 / 材质瑕疵（pilling / weave wrong / gloss off / fabric drape unrealistic）时，把用户原产品参考图作为 texture source-of-truth 附上，并加：

```
The texture / material rendering of the corrected region must match the attached product reference image exactly: {specific descriptors — e.g. "smooth tightly-woven combed cotton, no pilling, soft gentle drape, slight matte finish"}. Do not invent texture; mirror the reference's microsurface, weave density, and finish.
```

## 三个 clause 的组合使用

| 意图 | 必加 clause | 可选加 |
|---|---|---|
| A. 局部修 | R1 + R2 | R3（修材质时）|
| B. 全图重做保 set 一致 | R1 | R3（修材质时）|
| C. 换方向重做 | 都不加（脱离 set 约束）| — |

> **#1 bug**：用户说 "fix the pilling on the sleeve"（意图 A），重生用了 fresh seed 的 full text-to-image——结果模特变了、背景变了、灯光变了。**永远**用 image-edit + 把破图当画布 + 加 R2 clause。

## 与其它 reference 的协同

- post-regen 跨图 inspection：参照本目录 `ai-pitfalls.md` S6/S7/S8 的 Drift 检查项
