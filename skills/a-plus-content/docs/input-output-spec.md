## 输入输出规范

本文档描述 Gxgen A+ 内容 skill 的输入、模块规划对象、提示词包和最终交付约定。它帮助 Agent 稳定表达字段含义和交接格式，不定义抓取、图片生成或发布实现。

## 1. 输入规范

### 1.1 最小输入
最小输入至少应包含以下之一：

- `product_info`
- `product_images`
- `product_url`
- `reference_pages`

### 1.2 关键补充信息
建议补充以下字段：

- `target_platform`
- `target_market`
- `target_audience`
- `core_selling_points`
- `brand_guidelines`
- `must_avoid_claims`
- `output_goal`

### 1.3 证据说明
如果某个卖点依赖以下内容，建议单独标记：

- 参数或尺寸证明
- 成分或材质证明
- 认证、奖项、测试或销量证明
- 对比依据
- 使用效果边界

## 2. 中间结果规范

### 2.1 模块规划对象
每个模块建议包含：

- `id`
- `type`
- `goal`
- `copy`
- `visual_plan`
- `asset_requirements`
- `priority`

### 2.2 文案对象
`copy` 建议包含：

- `headline`
- `subheadline`
- `body_points`
- `cta`

### 2.3 视觉计划对象
`visual_plan` 建议包含：

- `scene`
- `composition`
- `focus`
- `background`
- `props`
- `text_overlay_notes`

## 3. 输出规范

### 3.1 Markdown 交付
Markdown 交付建议包含以下章节：

- 任务边界
- 页面目标
- 模块顺序
- 模块详情
- 风格说明
- 提示词包
- 风险与待补信息
- 上线前检查

### 3.2 JSON 交付
如果输出结构化 JSON，建议至少包含：

- `summary`
- `style_bible`
- `modules`
- `global_direction`
- `review_checklist`

### 3.3 交接内容
如果用户要求后续设计或生图交接，应补充：

- 产品一致性要求
- 模块对应的提示词
- 负面提示词
- 文案留白区说明
- 必须保留或不得出现的元素

## 4. 稳定性建议

- 保持字段命名稳定。
- 保持模块顺序与页面叙事一致。
- 把事实、推断和待补证据分开写。
- 不要把链接、印象或竞品猜测写成已验证卖点。
