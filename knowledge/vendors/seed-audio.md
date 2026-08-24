---
vendor: seed-audio
modality: audio.tts
status: active
provider: bytedance
backend: seedaudio
---

# seed-audio -- audio.tts 后端卡片

## 能力

- 模型：`seed-audio-1.0`；工具：`hub_seedaudio_generation`
- 参考条件 TTS：`reference_audio_paths` 最多 3 条，或 `reference_image_path` 最多 1 张；音频参考和图片参考互斥
- `text_prompt` 最多 2048 字；参考音频按上传顺序用 `@音频1` / `@音频2` / `@音频3` 绑定
- 支持自然语言音色、角色表演、情绪起伏、环境声 / 背景音 / 音效与台词一起生成
- 不消费官方 `voice_id`；需要 catalog 音色的普通 TTS 用 `speech-2.8-hd`

## 选择边界

- 用于影视类配音、短剧对白、广播剧、预告片旁白、角色表演、参考音频 / 图片复刻、明确自定义音色、复杂声场或台词 + 氛围 / 音效同生
- 用户给了参考音频并希望用这个声音说新内容时，直接用 SeedAudio；不要先要求官方 `voice_id`
- 普通朗读、信息型旁白、普通男女声 / 年龄 / 语气偏好默认走 `speech-2.8-hd` + catalog 选择
- 只有 catalog 找不到足够贴合的明确自定义 / 影视声线时，才从 official speech 受控升级

## Prompt 约定

- 把 `text_prompt` 写成按时间推进的导演脚本，不写分类摘要
- 开头定义角色音色：年龄段、语言 / 口音、音色特征、身份；多角色保持角色名稳定
- 场景底、BGM、环境声、音效必须嵌入发生时刻，如“此时音乐停止”“随后传来脚步声”
- 实际台词用引号；台词前写表演方式、情绪、停顿、音量和语速变化
- 有参考音频时在 prompt 中显式写 `@音频1 用这个音色说...`；多参考音频不要改变编号顺序

## 已知限制

- 单次调用不要混用 `reference_audio_paths` 和 `reference_image_path`
- 多个互不连续场景分开生成；不要把 unrelated 场景塞进同一个时间线
- 输出时长是生成结果，不是严格时长控制；需要精确卡点时交给后期 trim / mix
