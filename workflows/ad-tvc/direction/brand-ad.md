# Direction：品牌广告

> 由 `direction/index.md` 命中后读取。参考准备只应用 `creative-research`，进入 Stage 后只应用当前 Stage section。

## `creative-research`

- 补充 `direction_profile`：品牌价值、期望情绪、品牌 / 产品角色、文案语气和整体节奏倾向。
- 品牌事实不足且会改变广告方向时返回 Intake owner 补齐；Visual Research 不调用 `question`，也不用原型、段落占比或固定露出比例替用户做决定。

## `anchors`

- `compose_from_brief` 以生活方式、身份认同或情绪价值为目标时，把 `video_creative_route.route_structure` 固定为 `brand_identity_reveal`，并按语义顺序建立五条 `narrative_stage.stage_role`：`world_build → identity_state → symbolic_totem → product_tease → hero_reveal`。五段分别建立品牌世界、人物气场、精神图腾、产品暗示和完整产品 / 品牌回收；不套固定秒数或镜头数，每段至少提供一个新的可见事件，短片可把相邻段装入同一生成单元但不得省略其语义作用。
- `symbolic_totem` 只选择一个与品牌气质和目标市场文化相容的动物、自然力或物件母题；在 `technique_plan` 绑定 T20，并记录载体、象征含义、色彩 / 形状 / 材质 / 运动不变量、与人物 / 产品的可见关联和最终回收点。动物图腾保持物种、外观和行为连续，不做无关动物插镜，也不得把速度、力量、稀有性等创意隐喻写成产品功效或事实证明。
- `product_tease` 只用轮廓、局部材质、反射、交互动作或声音制造期待，不重复堆砌无语义细节；`hero_reveal` 才给出可识别完整产品、使用结果或品牌动作，并把前述世界、人物与图腾关系收束为同一个品牌记忆点。
- 路线约束用一个清晰视觉母题承载品牌价值；实际生成路线 KV 时只把该母题视觉化。Style Master 与用户选中的视觉参考优先于类型默认审美。
- `compose_from_brief` 存在旁白时，从已确认文案中选择 1–3 个承担情绪转折或品牌记忆的短语写入 `key_copy_policy`；逐字绑定原旁白时间并使用 T06 动态字体构图，不转写全量旁白，也不与同一时段普通字幕重复。
- `compose_from_brief` 在 `hero_reveal` 后按目标时长编译 `brand_end_card_spec`：使用 verified Logo 资产或准确品牌名、已确认 Slogan、单一版式层级、与 Style Master 一致的完整动态 End Card，并在时长允许时保留至少 2 秒稳定可读停留，不固定占用 3–5 秒。该单元由视频模型直接生成；Anchors 实际生成 `creative_route_kv` 时携带该 ref，否则直接使用 Style Master 与文字包装锁。没有 verified Logo 时只使用准确品牌名，不仿造 Logo 图形。
- `preserve_script` / `preserve_storyboard` 只保留来源已有的关键词花字与尾卡；来源未定义时不得以质量增强为由新增或改写事件。

## `storyboard`

- Storyboard 把本 section 的适用规则作为 stable scalar entries 追加到对应 flat `constraints[kind=tvc_storyboard_plan_unit].execution_delta`；这里只冻结 Prompt inputs 与执行增量，不编译 video work item。只有 Visual Gen Planner author 的 video work item 拥有并写入 `prompt`；Visual Gen 只消费该 capsule，不回读本卡。
- 固定使用 `brand_ad.emotional_grammar`、`brand_ad.prompt_rules`、`brand_ad.native_text` 三个 key，把下列适用规则压成 compact scalar；不让 Visual Gen 临场重命名或重读本卡。
- `brand_ad.emotional_grammar` 按顺序登记五个 `stage_role` 各自的 `narrative_stage_id`、可见事件、情绪变化、产品可见性和交接方式。`world_build`、`identity_state`、`symbolic_totem` 固定为 `product_visibility: absent`，`product_tease` 为 `tease`，`hero_reveal` 为 `full`；前三区分别建立可识别品牌世界、用微表情 / 姿态 / 生活动作建立身份想象并推进同一母题，后两区累积期待并完成产品与品牌回收。不得用无因果唯美空镜或重复产品局部凑满五段。
- 动物图腾必须通过姿态、视线、运动、色彩、形状、材质或声音与相邻人物 / 产品镜头建立可见连续性；不得变成独立野生动物段落，不得暗示未经 verified 事实支持的性能、安全或稀缺性。
- 品牌名、Slogan、Logo 与 End Card 按 `confirmed_text_timeline` 和 verified refs 交给对应视频单元原生生成，不反复露出，也不交给 Post 烧录。
