# 输入输出规范

本文件定义参考视频改编任务的输入字段、分析中间结果和最终交付包结构，帮助 Agent 在分析、适配和交付时保持同一套字段口径。

## 输入对象

推荐顶层输入对象包含以下字段：

- `reference_video_url`
- `reference_video_file`
- `reference_frames`
- `reference_script`
- `product`
- `language`
- `market`
- `duration_seconds`
- `aspect_ratio`
- `style_constraints`
- `preserve_voiceover`
- `ugc_level`
- `meta`

最少要求：至少有一个参考字段，加上一个 `product` 对象。

## 参考输入

- `reference_video_url`：参考视频链接。只有链接时不能声称已经看过内容。
- `reference_video_file`：用户已提供的视频文件引用。
- `reference_frames`：关键帧图片数组，适合做局部结构判断。
- `reference_script`：转写、脚本、字幕稿或用户摘要。

## 商品输入

`product` 建议至少包含：

- `name`
- `category`

建议尽量补充：

- `target_audience`
- `selling_points`
- `constraints`
- `brand_tone`
- `images`
- `detail_page_url`

## 分析中间结果

推荐保留三类中间结果：

1. `reference_analysis`
   - `summary`
   - `hook`
   - `hook_type`
   - `pace`
   - `scene_flow`
   - `selling_flow`
   - `evidence_types`
   - `borrowable_mechanisms`
   - `non_transferable_elements`
   - `risk_flags`
2. `product_analysis`
   - `summary`
   - `core_selling_points`
   - `best_demo_angles`
   - `use_scenarios`
   - `constraints`
   - `fit_notes`
3. `fit_grade`
   - `fit_grade`
   - `fit_summary`
   - `fit_reasoning`
   - `preserve`
   - `replace`
   - `rewrite`
   - `avoid`

## 输出包

推荐最终交付包包含以下部分：

- `fit_grade`：A/B/C/D。
- `recreation_strategy`：保留项、替换项、重写项、风险规避项和策略摘要。
- `storyboard`：按时间或逻辑顺序组织的镜头骨架。
- `final_video_prompt`：面向后续创作环节的提示词。
- `negative_constraints`：不得复用的元素与高风险表达。
- `output_spec`：语言、时长、画幅、市场和风格说明。

如果用户明确要继续交付给后续视频创作环节，可额外整理：

- `generation_handoff`
  - `task`
  - `reference_summary`
  - `product_summary`
  - `storyboard`
  - `final_prompt`
  - `safety_notes`
  - `delivery_notes`

## 说明原则

- 输入不足时，缺什么就明确写什么，不补造字段。
- 中间结果要把事实观察和判断分开。
- 最终交付包的重点是“可继续执行”，不是“像参考视频”。
