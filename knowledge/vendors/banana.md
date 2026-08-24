---
vendor: banana
modality: image
status: active
provider: google
backend: nano-banana
---

# banana -- image 后端卡片

## 能力

- 模型：`nano_banana_2_flash`（fast/default）/ `nano_banana_2`（higher quality/slower）
- `model_id` 只能用上述两个 canonical 值；display name / picker token 不可作为 `model_id`
- t2i + i2i + 多 ref（≤10）
- 强项：subject identity 跨编辑保留、multi-ref 融合、**9-grid 表情/姿态批量**、character continuation 跨场景、conversational iteration（小幅追加 prompt 精修）
- 真实世界知识推断：历史时代 / 真实城市 / 命名事件（如 "Bethel, NY August 1969"）能渲染时代正确细节
- 弱项：最极端的 photoreal 人脸特写锐度、long-text、稠密中文版式、精确字体匹配、纯画风/审美迁移；不要仅因 photoreal / 人物 / character sheet 就离开 banana/gpt-image primary pool
- 默认选择：任务信号模糊且不含 style ref / 画风 / 审美 / 版式诉求时优先选 banana（覆盖面广）

## 调用约定

- **descriptive 自然语言**，完整句子，禁止关键词堆叠
- 甜区 40-120 word；< 30 留白太多、> 150 关键约束被稀释
- 强动词开头：`Generate / Render / Photograph / Illustrate / Compose`
- 5 段式骨架：`[Style/Medium] + [Subject + descriptors] + [Setting] + [Action] + [Composition/Camera]`，最后一句放 medium lock；只在用户明确排除某媒介/风格时写负向约束
- 每个 ref 必须命名角色（同 <knowledgeDir>/vendors/seedream.md 规则）
- 多参考图按 `semantic-judgment` 的 contribution map 写成简洁自然语言；banana 会补全普通真实世界细节，ref 绑定要比装饰性扩写更清楚。
- 多角色用命名实体绑定：`the woman from Image 1, named "Anna", standing next to the dog from Image 2, named "Max"`（命名实体追踪比位置追踪稳）
- aspect ratio 必须**同时**写在 prompt body 和 tool param 里，单边申明会出错
- `vendor_params.resolution` 只能是 `1K` / `2K` / `4K`；image 任务不要传 `720p` / `1080p`
- 中文 in-image text ≤ 8 字、英文 ≤ 5 词；超长文本必须 reflect 给 orchestrator 改路由

## 已知 bug

- 显式品牌 / hex 色要转成感知色词并绑定位置；不要把参考图背景或纸张色推成 `warm cream / off-white`
- **过度全大写**（`EXACTLY ONCE EXACTLY ONCE`）反而触发重复，正常语气说一次即可
- 长 SD 风格 negative list（`ugly, blurry, low-q, watermark...`）→ 解析失败；默认不用 negative list
- 命名字体（`Helvetica Neue Bold`）忽略 → 用 `bold rounded sans-serif` 等定性描述
- 300+ word mega-prompt → 关键 constraint 稀释，60-100 base + 迭代精修

## Pointer

→ <knowledgeDir>/failures/on-image-text.md（长文本路由切换）  → <knowledgeDir>/failures/character-refs.md（多 ref 命名）  → <knowledgeDir>/vendors/gpt-image.md（text-heavy 替代）  → <knowledgeDir>/vendors/seedream.md / <knowledgeDir>/vendors/kling.md（显式 specialist 或 primary-pool 失败后的替代）
