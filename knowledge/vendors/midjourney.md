---
vendor: midjourney
modality: image
status: active
provider: midjourney
backend: midjourney
---

# midjourney -- image 后端卡片

## 能力

- Midjourney V7（必须显式 `--v 7`）
- `model_id` 只能是 `midjourney`；dispatcher 不支持 `vendor_params`
- **本项目 wrapper 不透传 image refs** → `max_refs: 0`，按 t2i-only 处理（原生 MJ 支持 `--sref` / `--oref` / `--cw` 但 Hub 没暴露）
- 强项：**英文 vibe / 装饰审美** —— 杂志封面感、art print、艺术封面、装饰图案（`--tile`）、抽象实验（`--weird`）、painterly 插画、英文 fashion editorial vibe
- 弱项：i2i / multi-ref / 一切中文 / in-image 文字 / identity preservation / character consistency
- 选型唯一适用条件：纯英文 vibe + 无 ref + 无 text + 无角色一致性需求

## 调用约定

- 官方明确：**short prompt 比 long prompt 好**，body 10-40 word + 参数尾部
- subject 写最前（V7 attention bias 偏前置 token）
- **唯一支持英文**，禁止中文（in-prompt 和 in-image 都不可用）
- 一次一个 medium，禁止 `oil painting + photorealistic` 之类混搭 → 出 muddled
- 参数控制 taste 而非 prose：
  - `--s 0-100` 写实 / `--s 200-300` 平衡（推荐默认） / `--s 400-600` 偏艺术 / `--s 700-1000` 重绘画感
  - `--chaos 0-10` 一致 / `--chaos 15-30` 适中 / `--chaos 40-100` 探索
- 必须显式 `--ar` 锁画幅，否则默认 1:1 走偏
- `--no` 用 exclusion：`--no text, watermark`

## 已知 bug

- **wrapper 不透传 ref**：传 `image_paths` 静默丢弃 → 任务带 ref 应路由别处，不要硬塞 MJ
- 中文 prompt → 不可用，整体路由切换
- in-image 多词英文 → 失败可重现 → text 留 post-overlay
- character 一致性 → 没 `--oref` wrapper 支持就做不到 → 路由 <knowledgeDir>/vendors/seedream.md / <knowledgeDir>/vendors/kling.md
- 同账号 personalization profile 影响出图 → reproducibility 问题
- 长 mega-prompt（200+ word）→ 官方明确不推荐
- 漏掉 `--v 7` → 默认走老版本，质量分布不一致

## Pointer

→ <knowledgeDir>/failures/on-image-text.md（text-heavy 必须切换）  → <knowledgeDir>/failures/character-refs.md（一致性必须切换）  → <knowledgeDir>/vendors/gpt-image.md（text-heavy 替代）  → <knowledgeDir>/vendors/seedream.md / <knowledgeDir>/vendors/kling.md（一致性替代）
