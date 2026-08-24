# Video Reference Analysis — 参考视频与节奏拆解

## Activate When

- 用户提供参考视频，需要把它转换为 Reference Brief、ref capsule 或 Shot Plan 的可执行事实。
- 参考视频的剪辑节奏、景别变化、运镜、声画关系或文案风格会改变本项目方向。
- 多份参考之间存在风格或节奏冲突，需要在创作前显式处理。

只有静态图参考时，读取 `vision-decomposer.md`；没有参考时跳过。

## Acquisition and Evidence

- 已存在的会话附件或用户提供的可下载媒体先注册为 source / canvas media；使用当前可用的媒体分析工具读取，不编造下载结果。
- 分析结果区分 `Observed`、`Likely` 和 `Unknown`。无法从画面验证的器材、地点、作者意图和制作参数不写成事实。
- 每份参考都记录 role：`subject`、`world`、`style`、`pacing`、`layout`、`audio` 等；一张参考不能自动控制所有维度。

## Visual Style DNA

按项目需要提取：

| 维度 | 结构化内容 |
|---|---|
| 色彩 | 主辅点颜色、明度、饱和度、冷暖和保护色 |
| 光影 | 光源方向、软硬、对比、轮廓、反射和阴影证据 |
| 镜头 | 景别、视点、焦段倾向、运镜起止和景深感 |
| 节奏 | 总时长、镜头 / cut 数、镜头时长序列、密度和段落变化 |
| 转场 | 硬切、匹配、溶解、跳切、长镜头或蒙太奇的位置与作用 |
| 材质 / 媒介 | 胶片颗粒、数码清晰度、绘制媒介、细节密度和处理痕迹 |
| 声画 | 音乐驱动、对白同步、平行、反差、环境声或留白 |

节奏不要写成“节奏很强”这类空话。证据不足时给范围和不确定性；不要为了精确而伪造逐镜数据。

## Brief Comparison

Brief 与参考视频分别分析后，逐维度检查调性、色彩、节奏、主体、叙事姿态和声画关系是否冲突。只有冲突会改变最终交付内容、身份、叙事立场或不可逆风格时才向用户确认；否则提出一个融合方案并记录 preserve / adapt / ignore。

## Output

把结果压缩为可消费的 Reference Brief / ref capsule：

```text
reference_id / role
observed_facts / confidence
preserve / adapt / ignore
style_dna
rhythm_evidence
conflicts_and_resolution
downstream_use
```

不要把完整分析散文直接塞进 Visual Gen prompt；只编译会改变当前 work item 的事实和参考贡献。

## Review

- 每个结论都能回指参考证据或明确标为推断。
- 节奏、景别和转场信息足够影响 Shot Plan，但没有被硬编码成镜头数量公式。
- 参考角色边界清楚，冲突没有被默默平均。

## Boundaries

本卡不强制用户上传参考、不创建 Mood Board / gate、不规定爬虫或命令行下载方式，也不要求逐镜复刻参考视频。
