---
vendor: veo
modality: video
status: active
provider: google
backend: veo3
---

# veo -- video 后端卡片

## 能力

- duration **固定** 8s（要更长 → 拆多个 clip 后期合并）
- `model_id` 只能是 `veo-3.1-fast-generate-001` / `veo-3.1-generate-001`
- ratios **仅** 16:9 / 9:16（不支持 1:1 / 4:3 / 21:9）
- resolutions：720p / 1080p
- image modes：t2v / i2v (`first_frame_image`) / first-and-last-frame (`first_frame_image` + `last_frame_image`)
- 强项：固定 8s premium cinematic clip、写实质感、简单参考图过渡
- 弱项：multi-shot 长片、audio reference、自定义音频、4:3/1:1、style ref（需先用 banana bake）

## 调用约定

- prompt 5-part formula：`[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]`
- detail wins control：`a woman in her twenties with wavy brown hair and light freckles` 远好于 `a brown-haired woman`
- 如需 dialogue / SFX / ambient / music，先写进画面和声音意图；当前 dispatcher 不接 audio ref
- `vendor_params` 只用 `aspect_ratio: 16:9|9:16` 和 `resolution: 720p|1080p`
- negative 用**正向缺席描述**：`a desolate landscape with no buildings or roads` ✅；`no buildings, no cars` ✗

## 已知 bug

- **`referenceImages.style` 在 3.1 上不工作**（仅 veo-2.0-generate-exp 支持）→ 风格 ref 必须先用 nano-banana 烤进一张图，再走 ingredients
- 所有输出强制 SynthID 隐形水印（Google AI 内容标记），不可关闭
- 时长 / 比例任一不在白名单 → 直接 backend error，不会自动 fallback；planner 拆 brief 时先校验
- multi-shot brief 塞一段长 prompt → shot 边界丢失；多镜头任务优先 seedance / kling

## Pointer

→ <knowledgeDir>/failures/spoken-video.md（dialogue 原生音频）  → <knowledgeDir>/failures/character-refs.md（ingredients 多角色身份）  → <knowledgeDir>/vendors/banana.md（style ref bake 入口）
