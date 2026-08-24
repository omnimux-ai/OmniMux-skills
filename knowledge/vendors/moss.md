---
vendor: moss
modality: audio.tts
status: active
provider: official
backend: minimax_tts
---

# moss -- audio.tts 后端卡片

## 能力

- Hub TTS 后端，下游 `moss-audio` (Kitex RPC + Hertz HTTP) → 开放平台 `amadeus` → `/v1/t2a_v2`（同步流式） / `/v1/t2a_async_v2`（异步长文本）
- 模型：`speech-2.8-hd`（高保真） / `speech-2.8-turbo`（快档）
- `model_name` 只能是 `speech-2.8-hd` / `speech-2.8-turbo`；speech dispatcher 不接 `vendor_params`
- 中英 + 多语言（韩日法德等），`LanguageBoost` 字段强化语言场景
- emotion 标签内联：`{emotion}文本{/emotion}` 段级情感（happy / sad / angry / fearful / disgusted / surprised / neutral）
- `PronunciationDict`：发音词典，专名 / 多音字校正
- `TimberWeights`：多 voice_id 加权混合音色（实验性）
- 异步 TTS：> 10000 字符自动 OSS 上传 + 分段并发 + 回调拼接

## 选择边界

- 默认用于纯文本朗读、信息型旁白、普通对话配音、普通男女声 / 年龄 / 语气偏好；先走 catalog `voice_id` / `hub_voice_prepare`
- `voice_id` 缺失不是 SeedAudio 信号；普通 TTS 先检索官方音色并选择最贴合候选
- catalog 找不到足够贴合音色，且用户有清晰自定义 / 影视声线描述时，交给 `seed-audio-1.0`（`<knowledgeDir>/vendors/seedaudio.md`），不要硬选不匹配的 `voice_id`

## 调用约定

- **`voice_id` 字段必须传 `VoiceInfo.UniqId`**（如 `Friendly_Person`），**不是**内部数字 `VoiceId`（`355645417484520`）；错传报 `code=2054 voice id not exist`
- gateway `ListVoices` 返回的 `voice_id` 已经是 `UniqId`，前端 / executor 直接消费即可
- `VoiceSetting`：`speed`（0.5-2.0） / `vol`（0-10） / `pitch`（-12 to +12 半音） / `emotion`
- `AudioSetting`：`sample_rate`（8000 / 16000 / 24000 / 32000 / 44100） / `bitrate` / `format`（mp3 / wav / pcm / flac） / `channel`
- `AigcWatermark: false`（强制关水印）；`SubtitleEnable: true` + `SubtitleType: "sentence"` 出字幕段
- 长文本走异步分段并发，**回调按序拼接**；同步流式仅短文本
- emotion 标签可逐段切换，但禁止嵌套

## 已知 bug

- `TimberWeights` 混合音色未暴露；需要多音色加权混合时 reflect 给 orchestrator
- 传内部数字 `VoiceId` → `code=2054`（同上面 voice_id 段重复强调）
- 异步任务回调长时间无响应 → 走 task watch 长轮询，不要本地阻塞
- emotion 标签写错（如 `{happy}` 缺闭合）→ 整段降级 neutral，不报错
- 中英混排 + 不开 `LanguageBoost` → 英文段口音重，需显式标注 boost
- `speed > 1.5` + `pitch > +6` 同时设 → 出怪音，建议二选一调

## Pointer

→ <knowledgeDir>/failures/spoken-video.md（视频侧声音路由，TTS 只负责外部配音/旁白）
