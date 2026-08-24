---
vendor: wan
modality: video
status: active
provider: alibaba
backend: wan
---

# wan -- video 后端卡片

## 能力

- **仅 I2V**（项目纯 T2V 任务不走 wan，路由到 seedance / veo / kling）
- `model_id` 只能是 `wan2.6-i2v`
- duration **Hub Zod enum 强约束** `5 | 10 | 15`（raw API 实际支持 2-15 任意整数，但 MCP 层会拒绝其它值）
- ratios：**继承首帧 image 比例**（无独立 ratio 参数）
- resolutions：720P / 1080P
- native audio：`wan2.6` 系列默认出音；传 common field `audio_path` 走 audio-led I2V，不传则自动配 BGM
- `shot_type: 'multi'` → 单次出 multi-shot 叙事；prompt 必须按镜头顺序写清动作和节奏
- 强项：audio-led I2V、中文场景文化保真、real physics I2V；弱项：T2V、多角色绑定、cinematic 摄影机词汇

## 调用约定

- `audio_path` 走 common field，可传 workspace path / absolute path / public URL，Gateway 负责上传
- `audio_path` 音频会按 `duration` 截断；**音频比 duration 短 → 末尾 silent**；务必让 audio 长度 ≥ duration
- I2V 的 subject 已由 `image` 锁定，prompt 预算应该花在**动作 / 表演 / 情绪 / 微动作**上，不要再描述 subject 外观
- 中文 prompt 与英文同等优秀，官方示例以中文文化场景为主
- 单 image first frame，**没有 multi-image ref** → 需要多角色 / scene+character 绑定走 seedance multimodal 或 kling-omni
- 摄影机控制弱：没有 MiniMax H3 风的 `[Camera command]` 语法，没有 Kling 的 cinematic 词汇 → camera 由 prompt 描述 + 首帧构图 emerge
- `audio_path` 走 common field；`vendor_params` 只用 `resolution: 720P|1080P` 和 `shot_type: single|multi`

## 已知 bug

- duration 写 7 / 8 / 12 → MCP Zod 直接 reject，**必须** `5 | 10 | 15`
- T2V 任务路由到 wan → backend 直接 error，没有 fallback；planner 必须先确认有 first frame image
- `audio_path` 缺失但 prompt 描述了 dialogue → 模型自动生成 BGM 但**不出对话**，对话靠 prompt 文本不行
- 多镜头模式 prompt 未按 shot 拆分 → 只跟随第一个动作，其余被忽略

## Pointer

→ <knowledgeDir>/failures/spoken-video.md（audio-led video）  → <knowledgeDir>/failures/character-refs.md（多角色场景应改路由）
