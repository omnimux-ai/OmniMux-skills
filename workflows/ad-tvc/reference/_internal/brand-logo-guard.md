# Brand Logo Guard — Anchors 品牌资产约束

Anchors 含品牌名、Logo、VI、包装或产品文字时读取。品牌归属必须已在实际 `brief_doc` 或已接纳脚本 / 分镜 source 中确认，并由 Visual Research verified refs 提供可见证据；Anchors 不追加问询、不创建品牌占位图。

## 1. 品牌元素映射

逐张读取当前 work item 的 refs，为每个可见品牌元素记录：位置、内容、归属与动作。

| 动作 | 用法 |
|---|---|
| `KEEP` | 甲方自有 Logo、品牌位、包装识别和已验证文字 |
| `REPLACE` | 用户明确要求替换的甲方文案，保留已验证版式关系 |
| `STRIP` | 第三方 Logo、竞品品牌和未授权商标 |

```text
Brand owner: {Visual Research verified brand}
Image 1: {position, visible mark, ownership} -> KEEP | REPLACE | STRIP
```

- `real_product` 缺少路线必需的甲方 Logo / 包装 / 文字证据时，Anchors 返回 Visual Research evidence gap。
- `concept_product` 有用户确认的正式 Logo 资产时保真继承；没有该资产时只使用用户明确提供的品牌名原文作为 `text_only` 字标。产品卡与 KV 标记为 concept anchor，只有 verified 正式资产可声明为官方 VI。
- 品牌区域只呈现 verified 正式 Logo 或已确认 `text_only` 字标，不留 `[LOGO]` 占位，也不把品牌修复推给 Post。
- Prompt 只正向描述应保留的甲方品牌事实；第三方元素通过 `STRIP` 约束处理，不堆叠 negative 列表。

## 2. Work Item Binding

每个 Anchors 图像 work item 写入：

- `brand_owner`
- `brand_element_actions`
- 对应 verified brand refs
- 每个 ref 的贡献边界与忽略边界

## 3. Anchors 交接字段

向 Anchors 唯一 `anchor_asset_qc` 提供：`brand_owner_resolved`、`keep_elements_present`、`strip_elements_absent`、`brand_text_fidelity`。本文件不执行独立输出验证。
