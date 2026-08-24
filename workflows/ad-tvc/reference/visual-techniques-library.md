# TVC Visual Technique 索引

Anchors 创意阶段先读本索引，把路线事件映射为候选 technique ids，不通读 `visual-techniques/`；所有保留 Storyboard / Visual Gen 的 TVC 先按 T06 卡的“基础字体包”编译一套 `tvc_typography_package`，它不占用技法名额。用户选定路线后只打开实际命中的 0–3 张增强技法卡，并读取其 `## Anchors` 编译 `technique_plan`。每张增强卡必须绑定明确且不同的路线事件、预期镜头位置和叙事作用，没有独立作用就不选，不为凑数量加载。`preserve_script` / `preserve_storyboard` 只绑定来源已有或可安全适配的增强技法，不为补足数量改写来源。

用户明确要求品牌文案、对白、口播、歌词或关键词成为主要构图事件，采用动态字体、字卡、空间文字、分栏或海报式包装时，必须选择 T06，并占用一个增强技法名额；仅仅存在对白或旁白，以及 TVC 默认的基础字体包，不自动触发 T06。

## Stage 作用

- `anchors` 对每个命中 id 只读取对应卡的 `## Anchors`，并把采用事实、适用事件与卡路径写入 `technique_plan`。
- `storyboard` 按已冻结 `technique_plan` 重新打开同一批命中卡，只读取各卡的 `## Generation Strategy`；不得只依赖摘要，也不得打开未命中卡或重新选择技法。
- 一张卡不会自动触发读取其它卡；其它技法只有独立命中时才读取。

## 目录

| ID | 快速识别 | 路径 |
|---|---|---|
| T01 | 数字故障、信号干扰、碎片化切换 | `visual-techniques/T01-glitch.md` |
| T02 | Logo / 产品标识序列化出现 | `visual-techniques/T02-logo-sequence.md` |
| T03 | 冷暖或色温随叙事变化 | `visual-techniques/T03-color-temperature-arc.md` |
| T04 | 闪黑、暗场冲击开场 | `visual-techniques/T04-flash-black-opening.md` |
| T05 | HUD、参数或数据叠层 | `visual-techniques/T05-hud-overlay.md` |
| T06 | 品牌文案、对白或口播文字作为主要构图与动态包装元素 | `visual-techniques/T06-typography-composition.md` |
| T07 | 标志性光线 Hero Shot | `visual-techniques/T07-iconic-light-hero.md` |
| T08 | 黑白画面中的单点色彩 | `visual-techniques/T08-monochrome-color-puncture.md` |
| T09 | 聚光灯隔离主体 | `visual-techniques/T09-spotlight-isolation.md` |
| T10 | 微距材质蒙太奇 | `visual-techniques/T10-macro-texture-montage.md` |
| T11 | Logo 自发光激活 | `visual-techniques/T11-logo-self-luminance.md` |
| T12 | 高反差过曝冲击帧 | `visual-techniques/T12-high-key-impact-flash.md` |
| T13 | 宣言式品牌终帧 | `visual-techniques/T13-manifesto-end-card.md` |
| T14 | 工业说明书 / 参数版面 | `visual-techniques/T14-industrial-manual-layout.md` |
| T15 | 抽象几何变形成产品 | `visual-techniques/T15-abstract-to-product-morph.md` |
| T16 | 液体声波、悬浮声学隐喻 | `visual-techniques/T16-acoustic-ripple.md` |
| T17 | 表里透视、内部科技链 | `visual-techniques/T17-inside-out-tech-chain.md` |
| T18 | 物理动作与节奏匹配 | `visual-techniques/T18-physics-beat-matching.md` |
| T19 | 高速驾驶与速度推进 | `visual-techniques/T19-speed-driven-driving.md` |
| T20 | 感官母题跨环境、人物与产品互译 | `visual-techniques/T20-sensory-motif-translation.md` |

只打开实际选中的文件，并把采用事实、适用镜头和未采用边界写入 `technique_plan`。
