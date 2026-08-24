---
vendor: official-music
modality: audio.music
status: active
provider: official
backend: minimax_music
---

# official-music -- audio.music 后端卡片

## 能力

- 默认模型：`music-3.0`；支持 `song`（带人声）与 `instrumental`（纯 BGM）
- `model_id` 固定 `music-3.0`；music dispatcher 不接 `vendor_params`
- song 必须有 lyrics；instrumental 忽略 lyrics
- 强项：中文 / 英文流行歌、广告 jingle、短视频 BGM、情绪化配乐
- Cover 走独立工具：`music_cover`（prepare lyrics 或 generate）

## 调用约定

- `vendor=official, mode=song|instrumental` 走 `hub_generate_audio_music`
- v2 路由把所有 BGM / 配乐 / 纯音乐，以及人声 / 歌词优先歌曲交给 `music-3.0`；`hub_generate_audio_music` 不提供 ElevenLabs 路由
- song 先用 `lyrics_generation` 起草歌词并让用户确认，再调用生成
- prompt 写风格、速度、乐器、情绪、声线；歌词结构用 `[Verse]` / `[Chorus]` / `[Bridge]`
- BGM 要写使用场景和情绪曲线，不要只写一个风格词

## 已知 bug

- song 无 lyrics 会被 dispatcher 拒绝
- 歌词太长会被模型压缩或漏唱；按 verse / chorus 控制结构
- 精确时长不可硬保；视频配乐要预留后期裁剪 / loop
- 版权歌曲“同款”请求只能做风格近似，不能复刻旋律

## Pointer

→ <knowledgeDir>/failures/constraint-negation.md（版权相似度降级）。MV 歌词 / 配乐的依赖型流程由 router 分类为 direct / ask / workflow，vendor card 不直接指向 workflow。
