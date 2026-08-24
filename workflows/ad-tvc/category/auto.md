# Category：汽车

> 由 `category/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## Stage Scope

| 知识组 | 作用环节 | 写入位置 |
|---|---|---|
| 车型、材质、功能与合规证据 | `creative-research` | `category_profile`、产品参考注册表 |
| 路线原型、状态变化与卖点证明 | `anchors` | `video_creative_route`、`selling_point_binding`、`technique_plan` |
| 产品揭示、镜头递进、转场和声画事件 | `storyboard` | `generation_strategy_doc`、`generation_plan_unit` |
| 车辆身份、运动、材质和屏幕状态校验 | `storyboard` 冻结，`visual-gen` 执行 | `constraints[kind=tvc_storyboard_plan_unit].execution_delta`、video work item `prompt` |

## `creative-research`

### 补充事实

- 收集准确车型 / 年款、车身比例、动力类型、官方漆色和本片实际卖点。
- 只在路线包含对应镜头时收集座舱、仪表盘、中控屏和内饰材质。
- 为续航、加速、制动、安全和智驾文案记录官方工况、机构、年份和功能名。

### 参考与输出

- 为外观图登记前 / 后、侧面、三分之四、俯视或低机位等自然语言角度，以及可见识别面。
- 按具体位置登记内饰和屏幕图片，不为完整机位组合扩搜。
- 向 `category_profile` 写入车型身份、漆色 / 材质、动力声音边界、屏幕状态和合规文案依据。
- 风格候选优先覆盖场景建立、道路运动、环境动态、光影反射、材质呼应和车景关系，不把 5–6 张名额消耗在相似整车英雄图上；只补 Style Master 尚未覆盖的职责，并逐张写明 `contributes`。
- 静态图片只证明视觉质感和运动线索，不用于推断剪辑时长。参考视频额外提取开场镜头密度、快切簇位置、平均镜长、运动方向、环境插镜和车辆镜头之间的切换触发点。

## `anchors`

- 路线使用“世界 / 人物状态 → 问题或欲望 → 车辆揭示 → 产品介入 → 可见功能证明 → 人物 / 环境状态改变 → 产品与品牌回收”；不从连续车头、车灯、轮毂或 Logo 展示开始。
- 豪华生活方式 / 品牌身份路线把 `brand_identity_reveal` 映射为“道路、建筑或自然建立品牌世界 → 人物姿态与微动作建立身份状态 → 单一精神图腾显影 → 车辆轮廓 / 材质 / 声音暗示 → 可识别整车英雄亮相与品牌回收”；保持克制运镜、精细材质和稳定情绪推进，不把连续车头、车灯、轮毂或 Logo 特写当作产品暗示。
- 动物图腾只承载品牌气质与驾驶情绪：用姿态、视线、速度趋势、轮廓、灯光或声音与车辆建立一次明确映射，再回到真实车型；保持物种和行为连续，不让动物替代卖点证明，也不得把其力量、速度或环境适应性写成车辆性能、安全或通过性事实。
- 自然旅途路线从出发、城市行驶扩展到自然互动与停留；车辆是旅程载体，但结尾仍回到可识别的整车与环境关系。
- 科幻功能路线从危机、失控进入车辆救援、内外空间切换和功能解决；车门可作为画面、声音与情绪的硬转折。
- 材质微距是证明工艺与价值的模块，不默认独立成路线；使用时必须回到整车、使用结果或品牌记忆。
- 每个卖点都写明初始状态、产品操作、环境反馈和结果状态；座椅、空调、音响、屏幕、冷暖箱和天幕不做脱离人物需求的配置平铺。
- 动力、安全、续航和智驾只使用 verified 事实；微距、冷暖弧线、HUD、英雄镜头、动作匹配与速度感只作为现有技法库候选，由当前路线和 verified 事件决定。

## `storyboard`

Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs、执行约束与结果 QC，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。

### 生成规划增量

- 车身比例、漆色、镀铬 / 灯组反射和车型识别面以 verified refs 为准。
- 按用户方向选择外观、座舱、屏幕和驾驶动态，不要求固定四段结构或镜头占比。
- 豪华生活方式 / 品牌身份路线在 `auto.luxury_reveal` 中原序绑定五段情绪语法，不写固定秒数或镜头数。`product_tease` 只从 verified refs 支持的车身轮廓、车漆 / 玻璃 / 镀铬反射、灯组局部、门体开合、动力声与环境声中选择能延续当前情绪的一到数项；门体结构、灯组形态、车身比例和动力声音必须与真实车型一致。`hero_reveal` 给出比例、漆色和识别面清晰的完整整车，再通过人物状态、空间关系、驾驶结果或品牌终帧回收，不停在不可识别局部。
- 命中动物图腾时，`auto.symbolic_totem` 只登记动物载体、象征含义、跨镜不变量、与车辆连接的姿态 / 视线 / 运动 / 光声事件和回收镜头；不得把创意隐喻写入 `selling_point_proof`。
- 产品信息按“识别层 → 质感层 → 体验层”递进：先让观众识别车型，再证明材质和工艺，最后通过人物操作与结果证明体验。
- 卖点 SG 保留“人物状态 / 需求 → 车辆操作 → 环境反馈 → 人物结果”的可见因果，并写入 `selling_point_proof`、`start_state`、`end_state` 与 `sub_shot_timeline`。
- 需要内外反差时，把车门打开 / 关闭同时写为空间、声音和情绪转折；外部环境声、车门声与内部安静状态写入 `sub_shot_timeline` 对应时段的 `sound=` 事件。
- 动作、材质、光线、色彩、形状或声音匹配转场必须具有前后可见连续性；不为技巧感增加无因果转场。
- 运动、科技、都市能量或即时冲击路线可在开场编排 3–6 个最小变化单元，按需从“环境细节 → 道路运动 → 光影 / 材质 → 车辆局部 → 整车进入”取用；每个单元必须改变角度、尺度或事件并写明 `cut_trigger`，建议镜长 0.4–1.2 秒，最终服从已分析参考节奏、BGM 重拍或真实物理事件。
- 安全、家庭、静谧豪华或慢揭示路线不强制快切；来源脚本 / 分镜没有开场快切时，只能作为 Storyboard 内部规划建议，不得静默增删或重排来源事件。
- 行驶环境插镜只使用运动匹配、图形匹配、材质匹配、光线接力或声音反差，并保持时间、天气、色调、道路侧、屏幕方向和运动轴连续；环境镜头必须把速度、自由、安全、豪华或科技等路线信号传递给相邻车辆镜头，不能只作装饰。
- 同一生成单元内的快切写入 Sub-shot 时间线；跨生成单元只使用 Storyboard 已冻结的硬切或 match cut，Post 不重新设计快切。
- 从零创作时可从微观细节递进到人物、整车、场景和大环境，但末段必须回收到可识别的整车或座舱英雄画面与已确认品牌信息；来源保持模式不改写已确认结尾。
- 驾驶动作符合目标市场常识；仪表和中控写明实际亮屏 / 息屏状态。
- 按动力类型写入引擎、排气、电机、胎噪和风声。

### 参考与检查

- 特殊外观角度、内饰位置或屏幕镜头从注册表选择最多 3 张匹配 refs。
- 把 `vehicle_identity`、`paint_color`、`screen_state`、`driving_compliance`、`opening_rhythm`、`motion_direction`、`environment_insert_semantic_gap` 和适用的官方文案检查合并进唯一 `auto.result_qc_boundary`，不另建 `quality_checks`。

### Flat capsule 执行增量

- `execution_delta` 条目 `auto.prompt_scope` 只允许视频表达编译 Storyboard 已确认的路线、镜头、声画事件和参考路由，不在执行时改换路线原型或追加车辆功能。
- `execution_delta` 条目 `auto.luxury_reveal` 与可选 `auto.symbolic_totem` 原值携带上述五段映射、产品可见性和图腾连续性，不把暗示阶段扩写成完整产品露出，也不让动物段落脱离车辆回收点。
- `execution_delta` 条目 `auto.motion` 锁定车辆运动保留车身朝向、道路侧、轮胎旋转、惯性、路面反馈和前后单元的速度趋势；驾驶或漂移不超出 verified 能力与目标市场常识。
- `execution_delta` 条目 `auto.material` 锁定车漆、灯组、玻璃、镀铬、皮革、缝线和屏幕的反射 / 散射与 verified refs 一致；沙尘、烟雾、火花、运动模糊和 HUD 不遮挡车型识别面。
- `execution_delta` 条目 `auto.result_qc_boundary` 锁定上述检查，以及适用的 `material_match`、`powertrain_sound`、`product_recall`；只定义 Visual Gen 唯一结果 QC 边界，不保存 verdict。
