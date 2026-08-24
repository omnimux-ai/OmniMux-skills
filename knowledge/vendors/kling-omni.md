---
vendor: kling-omni
modality: video
status: active
provider: kuaishou
backend: kling-omni
---

# kling-omni -- video 后端卡片

## 能力

- 两个变体：
  - `kling-video-o1`：single-shot 3-10s，std (720p) / pro (1080p)，**不支持原生音频**
  - `kling-v3-omni`：multi-shot ≤6 shots in one call，3-15s，std / pro / **4k**，原生音频 ✓
- `model_id` 只能是 `kling-video-o1` / `kling-v3-omni`
- ratios：16:9 / 9:16 / 1:1
- multimodal_ref：image refs ≤7-10 + video ref + start/end frame
- 多语言原生音频（EN / JA / KO / ZH，code-switching ✓）
- I2V **保留输入图片中的文字 + 布局**（视频模型里少有的能力）
- reference video → 抽取摄影机移动 + pacing + 角度切换迁移到 subject
- start frame + end frame：模型生成中间过渡，identity 锁定
- 强项：cinematic 语言、multi-shot 单次连续性、多语言对话；弱项：纯写实人脸（不如 MiniMax H3）、fast iteration（最慢一档之一）

## 调用约定

- **placeholder 语法是硬约束**：prompt 里必须用 `<<<image_n>>>` / `<<<video_1>>>` 显式绑定 ref 媒体；缺占位符 ref 只是松散上下文，模型不会按角色用
- multi-shot 模式：每 shot 单独 `Shot N (Duration: Xs): ...`，**所有 shot duration 之和 = 顶层 `duration`**
- `shot_type: intelligence` + multi-shot 必须有顶层 prompt 总览（master prompt 强烈推荐）
- 4k → 必须 `kling-v3-omni` + `mode: 4k`；`kling-video-o1` 不接受 4k
- 角色对话：`[Character A: 黑衣特工]` / `[Character B: 女助理]` 唯一标签 + 描述，**禁止用代词 / 同义词**（"he" / "the agent"）→ 模型会丢说话人追踪
- 每角色配独立 tone label：`[raspy, deep voice]` / `[clear, fearful voice]`
- visual anchor before dialogue：先写动作，再写台词，模型才知道谁在说
- `vendor_params` 只用 manifest 列出的 key；avatar / motion-control 模式省略 `model_id`，由 `mode` 路由

## 已知 bug

- **`kling-video-o1` 不支持 `sound: on`**：需要原生音频时直接选 `kling-v3-omni`；否则显式 `sound: off`
- `sound: on` + 同时传 `video_path` → 强制关音频（video ref 与 native audio 互斥），需要后期 mux
- 通用 `moves` / `goes` 不出戏 → 必须用 cinematic 动词（`dolly push` / `whip-pan` / `crash zoom` / `tracking shot`）
- 写实人脸 close-up 任务 → 改路由到 MiniMax H3（kling 在这个细分弱于 MiniMax H3）
- 单次 multi-shot ≤6，超过会被截断
- pure photoreal portrait 任务别强行用 kling，质量损失明显

## Pointer

→ <knowledgeDir>/failures/spoken-video.md（dialogue 原生音频）  → <knowledgeDir>/failures/character-refs.md（placeholder 占位符绑定）  → <knowledgeDir>/vendors/minimax.md（写实人脸 close-up 替代）
