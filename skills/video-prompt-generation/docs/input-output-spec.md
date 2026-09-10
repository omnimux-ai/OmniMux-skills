# 输入输出说明

## 输入字段

建议输入包含以下内容：

- `source_material`：脚本、分镜、镜头清单或粗糙 prompt
- `input_type`：`script`、`storyboard`、`shot-list`、`rough-prompt`、`mixed`
- `target_model`：`generic`、`sora`、`veo`、`seedance`
- `duration_seconds`
- `aspect_ratio`
- `style`
- `tone`
- `must_keep`
- `avoid`
- `continuity_rules`
- `reference_inputs`
- `compliance_notes`

## 输出字段

建议输出包含以下部分：

- `optimized_prompt`
- `prompt_breakdown`
- `negative_constraints`
- `assumptions_used`

可按需要补充：

- `per_shot_prompts`
- `model_notes`
- `on_screen_text`
- `continuity_notes`

## 输入质量分层

| 等级 | 输入情况 | 可做输出 | 不能假装做到 |
| --- | --- | --- | --- |
| `shot-ready` | 分镜或镜头清单已经较完整 | 可直接整理逐镜头 prompt | 不应凭空新增完整创意方向 |
| `script-ready` | 脚本已有主体、场景、动作顺序 | 可转成连续 prompt 包 | 不应假装镜头规划已经确定 |
| `rough-prompt` | 只有粗糙 prompt 或零散描述 | 可补结构、约束和顺序 | 不应把空白创意补造成用户确认过的事实 |
| `underspecified` | 只有一句方向或商品信息 | 只能先说明缺口并给补充框架 | 不应假装已经完成稳定 prompt |

## 输出验收标准

- 主体、动作、场景和镜头重点清楚。
- 如果有多镜头，顺序能读出来。
- 负向约束和合规风险有单独说明。
- 所有假设都显式列出。
