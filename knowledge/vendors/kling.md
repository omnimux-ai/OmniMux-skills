---
vendor: kling
modality: image
status: active
provider: kuaishou
backend: kling-image
---

# kling -- image 后端卡片（≠ <knowledgeDir>/vendors/kling-omni.md 视频）

## 能力

- Kuaishou Kling Image：`kling-image-o1`
- `model_id` 只能是 `kling-image-o1`；`kling-v3-omni` 只属于视频侧
- t2i + i2i；单参考图优先（当前 dispatcher cap=1），适合人像 / 脸部 identity 场景
- specialist：显式 Kling image 请求、真实人物脸 identity lock、ID-photo 风、portrait rescene、Kling-specific cinematic portrait workflow
- photoreal、人脸、portrait、character sheet 本身不是切到 kling 的理由；image 默认先走 primary pool：`gpt-image` / `banana`
- 元素层 / 图层级编辑：命名图层（`background` / `hair` / `jacket` / `label`）精准定位
- 弱项：anime / 插画角色设计（→ <knowledgeDir>/vendors/seedream.md）、in-image 长中文 / 复杂版式（→ <knowledgeDir>/vendors/gpt-image.md）

## 调用约定

- 当前 dispatcher 只暴露 `aspect_ratio` / `resolution`；不要传 ref 类型参数，把参考图用途写进 prompt body
- 开头一句话锁意图 + style：`Generate a dreamy forest-fairytale portrait in French vintage style. The subject is...`
- camera + lighting 用工程语言：`50mm, f/2.0, warm window key left + cool rim right, soft cinematic grain`
- 编辑必须显式 reference 输入图 + 命名 element：`From Image A: replace the dog with the man from Image B, keep head proportions...`
- **官方明确：复杂任务拆多步**，broad change 先 → fine detail 后
- 品牌色锁定要 ref 图 + prompt body **双锚**，否则飘
- `vendor_params.resolution` 只能是 `1k` / `2k`；不要传 `4k`、`720p`、`1080p`
- 甜区 50-150 word

## 已知 bug

- face ref 只传图但不在 prompt 里说明身份用途 → identity 精度下降，**最高频失败模式**
- 一次性多 element 编辑 → drift；必须 sequential 迭代
- text 渲染弱：英文 ≤ 3 word 偶尔可、中文只能 2-4 字短品牌名
- 用 kling 做 anime 角色设计 → 路由错误，切 <knowledgeDir>/vendors/seedream.md
- ref 数超过模型 cap → 超额静默丢弃；多参考图任务优先改用 <knowledgeDir>/vendors/banana.md 或 <knowledgeDir>/vendors/gpt-image.md
- anonymous ref（`use this image as reference`）→ 模型不知拿什么，必须命名

## Pointer

→ <knowledgeDir>/failures/character-refs.md（参考图命名绑定）  → <knowledgeDir>/failures/on-image-text.md（text-heavy 替代）  → <knowledgeDir>/vendors/seedream.md（anime 替代）  → <knowledgeDir>/vendors/gpt-image.md（text-heavy 替代）  → <knowledgeDir>/vendors/kling-omni.md（同家族视频侧）
