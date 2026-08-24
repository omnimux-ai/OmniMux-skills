---
vendor: seedream
modality: image
status: active
provider: bytedance
backend: seedream
---

# seedream -- image 后端卡片

## 能力

- ByteDance Seedream 5.0 Pro：`doubao-seedream-5-0-pro-260628`
- `model_id` 默认用 `doubao-seedream-5-0-pro-260628`（另可选 `doubao-seedream-4-5-251128`）
- 输出分辨率只用 `1k` / `2k`（in-image text 必须 ≥ 2048 长边才清晰，需清晰文字选 `2k`）
- 模式：t2i / i2i (edit) / reference-based / **sequential 批量跨图一致性**（`seedream-v4/sequential` + `edit-sequential`）
- ref 上限 14 张
- specialist：显式 Seedream / Doubao 请求、anime / 韩漫专项角色表、sketch-to-render、**精准 surgical edit**（Add / Remove / Replace / Modify）
- photoreal、人脸、portrait、character sheet 本身不是切到 seedream 的理由；image 默认先走 primary pool：`gpt-image` / `banana`
- 弱项：long-text 海报、稠密中文版式、英文 vibe 装饰美感（→ 走 <knowledgeDir>/vendors/midjourney.md / <knowledgeDir>/vendors/gpt-image.md）

## 调用约定

- 自然语言、完整句子、**禁止关键词堆叠**；甜区 30-100 word
- 模型对**句首权重高**：subject + 关键 style 写最前，技术 / 灯光后置
- 中英文均可，但**禁止单句混用**
- 多 ref 必须命名角色：`Image 1: face, Image 2: outfit, Image 3: lighting only — do not copy subject`（anonymous ref 是 #1 失败模式）
- sequential 模式触发词：`a series of N images` / `a set of images` / `generate multiple images`
- 编辑模式签名：`Change 'X' into 'Y'. Preserve [显式 invariant 列表]`，**一次只改一处**，多 element 拆成多句
- in-image text 必须**双引号**包裹；中文每元素 ≤ 8 字、英文 ≤ 10 词
- verbose ornate prompt 反而降质
- `vendor_params.resolution` 只用 `1k` / `2k`

## 已知 bug

- in-image 长中文（多行 / 段落）仍不如 <knowledgeDir>/vendors/gpt-image.md，路由切换
- 1024 分辨率出 text-heavy 海报 → 文字软糊，必须升到 2048+
- mega-prompt（300+ word）→ 中段 directive 被稀释，拆成 30-100 word + 迭代
- 英文 vibe / fine-art 装饰审美明显弱于 MJ
- 同句中英混用 → token attention 混乱

## Pointer

→ <knowledgeDir>/failures/character-refs.md（多 ref 角色绑定）  → <knowledgeDir>/failures/on-image-text.md（长中文/版式）  → <knowledgeDir>/vendors/gpt-image.md（text-heavy 海报替代）  → <knowledgeDir>/vendors/midjourney.md（pure vibe 替代）
