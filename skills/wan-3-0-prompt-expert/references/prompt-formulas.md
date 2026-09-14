# Wan 3.0 Prompt Formulas

Seven official formulas. Pick by request type, not by preference. A complete prompt combines one primary formula with the sound formula when audio matters.

---

## 1. Base formula — first-time text-to-video

**提示词 = 主体 + 场景 + 运动**

Who is where doing what. Loose and imaginative; use it when the user wants the model to fill gaps.

- 主体 — the subject: person, animal, plant, object, or an imagined non-physical entity.
- 场景 — the environment: background, foreground, real or invented.
- 运动 — the movement: subject motion and non-subject motion; may be still, small, large, partial, or a whole-frame drift.

## 2. Advanced formula — quality-critical text-to-video

**提示词 = 主体 + 场景 + 运动 + 美学控制 + 风格化 + 音效**

The upgrade path when the first result is not good enough. Every added dimension is a lever; adding all of them at once makes it hard to tell which one helped.

- 主体描述 — appearance detail as adjectives or short phrases ("a Miao girl in ethnic dress with long black hair").
- 场景描述 — environment detail, same style.
- 运动描述 — amplitude, speed, and effect ("violently swaying", "moving slowly", "shattering the glass").
- 美学控制 — light source, lighting environment, shot size, angle, camera, camera movement.
- 风格化 — the visual language: cyberpunk, line illustration, wasteland.
- 音效 — see the sound formula below.

## 3. Image-to-video / first-last-frame formula

**提示词 = 运动 + 运镜**

The supplied image already fixes subject, scene, and style. Describe only the dynamic process and the camera.

- 运动描述 — what happens to the elements in the image, with adjectives controlling degree and speed.
- 运镜 — 镜头推进, 镜头左移, or **固定镜头** to force a static camera.

## 4. Sound formula

**提示词 = 人声 + 音效 + 背景音乐（BGM）**

Wan 3.0 generates native audio, so sound is controllable rather than incidental. Specify each layer that should exist; suppress each layer that should not.

| Layer | Structure | Example |
| --- | --- | --- |
| 人声 | "content" + emotion + tone + pace + timbre + accent | 一个男人在讲脱口秀，他说道："好好学习，天天向上"，语气轻松，语速适中，声音清亮，美式英文 |
| 音效 | source material + action + environment | 一个玻璃小球从桌面掉在木质地板上，发出"砰"的声音，室内安静环境 |
| BGM | music / score + genre | 雨夜，阴森窄小的走廊，尽头有一扇窗户，配有悬疑风格背景音乐 |

A voice can be timbre-referenced from an audio asset ("音色参考@音频1").

## 5. Reference-to-video formula

**提示词 = @参考对象 + 动作 + 台词**

The 全能参考 mode formula. See `mode-omni-reference.md` for capability coverage.

- @参考对象 — address assets by supplied order: @图片1, @视频2, @音频1. An asset may be referenced repeatedly and in different positions to bind it to different intentions.
- 动作 — the referenced subject's state of motion: stillness, expression change, body movement, external force, displacement.
- 台词 — spoken content, single speaker or multi-speaker dialogue.
- 视频时序参考 — state the referenced dimension explicitly: "参考@视频1的运镜方式".
- 白膜参考 — convert a 3D preview into a finished shot by naming what is replaced.

Worked shape: 这是一个充满童趣的童话场景。@图片1 在草地上蹦跳着玩耍，@图片2 在旁边的一颗苹果树下弹奏钢琴，一颗苹果掉到了@图片2 的头上，@图片1 参考@音频1的音色，开心地指着@图片2 说："你要变成科学家了！"

## 6. Multi-shot formula

**提示词 = 总体描述 + 镜头序号 + 时间戳 + 分镜内容**

Use for coherent narrative video with several shots. This is the formula that earns the native 30-second output.

- 总体描述 — theme, narrative style, dominant emotion, core event.
- 镜头序号 — numbered shots establishing order.
- 时间戳 — each shot's time range, so content maps to the timeline.
- 分镜内容 — per-shot action, dialogue, expression, posture, written like a single-shot prompt.

Worked shape:

> 这个故事以第三人称视角，讲述了一个关于放弃与重拾希望的短剧。
> 第1个镜头[0-3秒]一个男孩在操场的角落独自坐着，低头望着手中的信纸，随后轻轻叹气，眼神中透露出迷茫。
> 第2个镜头[4-6秒]硬切转场，固定机位，聚焦于男孩的眼睛，泪光闪烁，带着失落和无助。
> 第3个镜头[7-10秒]硬切转场，场景转至一间简朴的教室。一个女孩眼神温和而坚定……走到男孩的身边安慰他。

## 7. Video editing formula

**提示词 = 编辑对象 + 编辑行为**

See `mode-omni-reference.md` for the full edit taxonomy. Three subgroups:

- 元素编辑 — direct semantic description: add, modify, or remove. Bind to a reference image when the change comes from one ("把视频中男人的衣服换为图片中的红色外套").
- 全局参数编辑 — style, lighting, color tone, atmosphere, weather. Add "其他保持不变" to freeze everything else.
- 时序编辑 — motion and dialogue changes. For dialogue, state that timbre and tone are preserved: 保持人物音色和语气，将女生的说话内容改为："Hello World".

For **video extension**, the base is already fixed, so describe only the new motion: "男人继续往前走，突然摔倒在地上".

---

## Control gaps — what happens when you stay silent

| Dimension | Default if unspecified | Control prompt |
| --- | --- | --- |
| Shot structure | Model decides single or multiple shots | Write the shot list, or 生成单镜头 / 一镜到底 |
| Dialogue | Model invents lines | Write the line exactly, or 全片无台词 |
| BGM | Model chooses music by subject matter | 无背景音乐 |
| Camera | Model improvises movement | 固定镜头 |

These four are the highest-value additions to almost any prompt, because each one replaces a silent model decision with an explicit instruction.
