# T05 — HUD 技术叠层

> 仅在索引命中 T05 时读取。`anchors` 使用“Anchors”，`storyboard` 使用“Generation Strategy”；Stage 被跳过时对应内容不生效。

## 适用信号

- 用户需要 HUD、仪表、数据可视化、技术参数或工程界面感。
- 叠层能解释已验证的产品状态，而不是只增加科技装饰。

## Anchors

- 在 `technique_plan` 记录叠层用途、信息层级、位置、品牌色、主体避让区和文字 / 数值的准确性要求。
- 装饰性线框、动态标记、精确参数、单位和 UI 文案都由对应视频单元生成；精确内容必须来自 verified 原文或图像 ref，能力不足时保持 blocked，不交给 Post。

## Generation Strategy

- Prompt 写清半透明线框、锁定框、轨迹或抽象数据层与主体运动的对应关系，并逐字写入 verified 参数 / 单位 / UI 文案；需要准确界面时加入已确认图像 ref。
- 叠层保持主体、Logo 和关键部件可读，不把未验证数值写成产品事实。
