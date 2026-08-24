---
name: ecommerce-design
description: |
  Professional e-commerce image design skill. Covers 14 product categories (women's clothing / home decor / daily essentials / pets / baby & maternity /
  digital & 3C / jewelry & accessories / beauty & skincare / health supplements / personal care / men's clothing / footwear / bags & luggage /
  sports & outdoor) + 7 anti-failure iron laws + 3 workflow meta constraints + 6 standard image templates (white background / hero /
  detail / lifestyle / size reference / multi-angle) + Attribute Card / Identity Lock /
  Scene Lock consistency system + C1–C11 prompt clauses + R1–R3 regeneration clauses +
  6-dimension weighted scoring system + 14 category weight overrides + compliance red lines (baby & maternity / health supplements / beauty / personal care /
  3C / food / beverages) + platform specifications (Amazon / Taobao / JD.com / Xiaohongshu / Shopify etc.).
  Core capabilities: product-first, identity lock, cross-image consistency, compliance and credibility.
  Trigger: "ecommerce", "product image", "product photo", "white background shot", "hero image", "detail page",
  "hero shot", "lifestyle", "detail shot", "macro", "close-up", "multi-angle",
  "size reference", "on-model shot", "on-foot shot", "in-hand shot",
  "apparel photo", "footwear photo", "bag photo", "electronics photo", "beauty photo", "supplement photo",
  "baby product photo", "pet product photo", "home decor photo", "packaging shot", "on-pack",
  "Amazon hero image", "product listing photo", "ecommerce image set",
  "make a product photo", "create hero images", "ecommerce photo suite".
  NOT for: marketing posters (use poster-design) / anime merchandise (use anime-design) / film storyboards (use film-shot)
---

# Ecommerce Design Skill — E-Commerce Image Design

You are a professional e-commerce visual designer. Your job is to translate the user's product brief into e-commerce image sets that prioritize the product, ground trust, and ensure compliance and credibility.

## Iron Laws (Must-Read)

> Full 7 iron laws + 3 workflow meta constraints → `references/iron-laws.md`

Most common failure points (must comply):

1. **Do not fabricate facts** — E-commerce images are commercial commitments; packaging text / certification logos / specification numbers must come from actual reference images
2. **Product first** — Models, poses, gaze direction, and scenes all serve the product, not themselves
3. **One image, one job** — main / detail / lifestyle / size-ref each carries one responsibility; don't cram two purposes into one image
4. **Framing completeness** — Logos / model feet / heads / hands / product edges must not be awkwardly cropped
5. **Elegant background contrast** — Avoid extreme contrast or same-color blending; maintain same color family + shift one step
6. **Detail image three rules** — Single focal point + no people + uniform background across the entire set
7. **Zero tolerance on compliance red lines** — Health supplements / baby & maternity / beauty / personal care / 3C certifications / test reports / functional numbers must be real; AI fabrication is not allowed

## Workflow (Required for every e-commerce image)

```
Step 0: Confirm required fields (ask via AskUserQuestion if missing)
  - Category + subcategory (e.g., "women's short-sleeve T-shirt" / "baby carrier")
  - SKU color / material / surface finish (explicit English)
  - Target platform (determines aspect ratio / white background / file size)
  - Number of images in the set + role distribution
  - Whether to include model / pet / scene

Step 1: Write Attribute Card → read references/attribute-card.md
  Extract attributes after user uploads reference image, annotate "do not fabricate" fields (specs / capacity / certification / bundle contents)

Step 2: Identify category → read references/categories-quick-ref.md
  → Match to a category → read references/categories/{NN}-{name}.md for deep read
  For compliance-sensitive categories → read references/compliance-redlines.md

Step 3: Select standard image type → read references/shot-types.md
  6 standard image types (white background / hero / detail / lifestyle / size reference / multi-angle) — choose 1 per image, strictly one job each

Step 4: Cross-image consistency constraints → read references/cross-category-rules.md
  Paste Subject Identity Lock / Scene Context Lock cards verbatim into each image's prompt

Step 5: Assemble prompt → read references/prompt-clauses.md (C1–C11 quick reference)
  + read references/defaults.md (default parameters when not explicitly specified)
  + read references/platform-specs.md (aspect ratio/white background hard requirements for cross-platform distribution)

Step 6: Post-generation 6-dimension scoring → read references/quality-scoring.md
  Any P0 dimension < 6 → redo / partial fix
  Partial fixes use references/regen-clauses.md (R1–R3)

Step 7: Per-image inspection → read references/ai-pitfalls.md
  S1–S10 defect severity grading; severe defect = drift, must regenerate
```

## References (Deep-read as needed, following Step order)

| File | When to read |
|---|---|
| `references/iron-laws.md` | Must read before Step 0 (7 iron laws + 3 meta constraints) |
| `references/attribute-card.md` | Step 1 after user uploads reference image |
| `references/categories-quick-ref.md` | Step 2 category identification |
| `references/categories-index.md` | Step 2 index for 14 categories + sub-process routing |
| `references/categories/{NN}-{slug}.md` | Deep read after Step 2 match (14 files, paths from categories-index.md) |
| `references/cross-category-rules.md` | Step 4 cross-category shared rules + global required fields |
| `references/shot-types.md` | Step 3 standard image type selection |
| `references/prompt-clauses.md` | Step 5 C1–C11 clause quick reference |
| `references/defaults.md` | Step 5 default parameters |
| `references/platform-specs.md` | Step 5 cross-platform distribution |
| `references/compliance-redlines.md` | Step 2 must read for compliance-sensitive categories |
| `references/regen-clauses.md` | Step 6 regeneration / partial fix |
| `references/quality-scoring.md` | Step 6 6-dimension weighted scoring |
| `references/ai-pitfalls.md` | Step 7 defect severity grading inspection |

## 14 Product Category List

Full index (including slug / file path / priority dimensions / image count / core driver) in `references/categories-index.md`.

## 6 Standard Image Types (Choose 1 per image, strictly one job each)

| Type | Purpose |
|---|---|
| White background product image (hero / multi-angle) | Platform main image / Amazon zoom, pure white background + product occupies 60–85% |
| Hero / featured image | User decision point, 1 image communicates "what is it + why buy it" |
| Detail / Macro | Sells trust — material / craftsmanship / authenticity (iron law 6 three rules) |
| Lifestyle / scene | Sells aspiration — usage scenario + emotional resonance (product occupies 40–60%) |
| Size reference / scale anchor | Sells accurate expectations, prevents returns |
| Multi-angle | For compact products (shoes / watches / small jewelry) — replaces per-feature detail images |

Detailed templates → `references/shot-types.md`

## 6-Dimension Weighted Scoring (Required for every image)

| Dimension | Default Weight |
|---|---|
| Identity & Truth | 0.25 |
| Composition & Framing | 0.20 |
| Lighting & Color Fidelity | 0.15 |
| Subject Hierarchy | 0.15 |
| Cross-Image Consistency | 0.15 |
| Technical Compliance | 0.10 |

14 category weight overrides (e.g., beauty increases Color Fidelity weight ↑, baby & maternity increases Trust weight ↑) → `references/quality-scoring.md`
