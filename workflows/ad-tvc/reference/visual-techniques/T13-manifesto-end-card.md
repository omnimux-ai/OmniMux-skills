# T13 — 碑文式宣言终帧

> 仅在索引命中 T13 时读取。`anchors` 使用“Anchors”，`storyboard` 使用“Generation Strategy”；Stage 被跳过时对应内容不生效。

## 适用信号

- 用户需要品牌宣言、价值观、态度文案或带纹理的 End Card。
- 标题、正文、Logo 和出现顺序均已由用户确认。

## Anchors

- 在 `technique_plan` 记录暗色纹理、版式、标题 / 正文层级、Logo 位置、出现顺序和每项 `render_owner`。
- KV 用于确认构图与材质气质；文字原文仍以 Brief / 用户确认为准。

## Generation Strategy

- T13 源 SG 必须冻结为独立生成单元，不与相邻 SG 打组。视频 Prompt 直接生成与 Style Master 一致的完整 End Card：暗色纹理、1–2% 呼吸运动、已确认标题 / 正文、verified Logo 或准确品牌名、Slogan、版式位置、进入时间和至少 2 秒稳定可读停留。
- verified Logo 资产必须进入该单元 refs；Anchors 实际生成 `creative_route_kv` 时同时加入并说明它只贡献花字包装、色光材质和版式层级，不复制整张卡片，否则直接编译 Style Master 与 `brand_end_card_spec`。能力不足或 Logo / 原文缺失时保持 Visual Gen blocked，不生成空 motion plate，也不转交 Post。
- 没有 verified Logo 时只使用准确品牌名；标题、正文、品牌名和 Slogan 均以 Brief / 用户确认原文为准。

```text
end_card_video_prompt: 暗色纹理背景（[水泥/画布/金属拉丝]，亮度 10–15%），极慢 1–2% 呼吸运动；0:00 标题句 "[确认原文]" 按 KV 花字包装关系进入；0:01.5 正文按确认顺序出现；verified Logo / 准确品牌名位于 [位置]；最后至少 2 秒全部稳定可读；仅出现文字白名单与 verified Logo。
```
