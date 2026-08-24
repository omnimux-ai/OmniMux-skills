# KOC Product Grounding Reference — 素材判定 / 人物锚 / 产品保真

> Read when the KOC workflow authors the Brief or Assets stage：分析用户素材、决定预处理、建立产品 / 人物锚点。
>
> media-agent 在 intake 时对每个产品/source ref 执行一次 verdict-complete `hub_analyse_media`。Planner 把结论写入 `ref_capsules` 和 brief/assets work items。Executor 从 `ref_analyses` 复用结论和 `width` / `height`；仅在缺少所需结论时补充分析。没有分析结果时不要断言 verdict。把生成后 QC 规则写进对应 work item 的 postcondition 或最终 prompt。

## 5 维默想（看图提取信号，内部使用）

| # | 维度 | 默想问题 | 用于 |
|---|---|---|---|
| 1 | 人群 | 这张图暗示的目标用户是谁（年龄段 / 性别 / 身份） | 钩子与人设匹配 |
| 2 | 场景 | 什么场景拍的（居家 / 咖啡店 / 通勤 / 户外） | 原生度判定 + 场景化补景 |
| 3 | 光线 | 光源 / 色温 / 方向 | 视觉锚定 |
| 4 | 构图 | 主体位置 / 留白 / 视角 | 分镜景别参考 |
| 5 | 情绪 | 图传递什么情绪（愉悦 / 治愈 / 兴奋 / 平静） | 钩子情绪过滤 + BGM 调性 |

**三铁律**：① 默想不输出（不在对话里逐项念给用户）；② 从图推断人群，不空泛反问"想给谁看"，但把推断结论写进 brief 提案让用户确认；③ 默想结果只用于质量判定、钩子匹配、分镜调性锚定。

### 人群推断信号源

产品本体（香水 / 口红 → 偏女性成年；3C / 户外 → 偏男性 / 年轻人；母婴 → 新手父母）、模特画像（发型 / 妆容 / 穿着）、场景线索（写字楼 → 职场；宿舍 → 学生；厨房客厅 → 居家）、平台调性（小红书 → 年轻女性审美向；抖音 → 全年龄泛娱乐）。多源一致置信度高，仅一源或矛盾时降低该信号在钩子匹配中的权重。

## 平台原生度判定（KOC 独有的素材门）

KOC 与其它品类最大的区别是"像博主随手拍"。逐维判定用户素材：

| 维度 | 原生（可直接用） | 非原生（需处理） |
|---|---|---|
| 光线 | 自然光 / 室内暖光 | 棚拍硬光 / 闪光灯过曝 |
| 构图 | 轻微倾斜 / 主体略偏 / 留白多 | 严格居中商业产品图 |
| 背景 | 生活化场景（桌面杂物 / 床品） | 纯白底 / 渐变底 / 棚拍纯色 |
| 调色 | 暖调 / 自然饱和度 | 高饱和商业调 / 黑白广告感 |
| 模特 | 自然表情 / 微动作 | 摆拍僵硬 / 标准广告微笑 |

**路由（三档，按原生维度计数）**：
- **高度原生（5 维中 ≥4 项原生）**→ 直接作视频 ref，不做场景化。
- **中度原生（2-3 项原生）**→ 轻度增强 image work item：i2i 低改动强度，只补光线 / 背景质感 / 生活化细节，构图与产品完全保留，prompt 写明"轻度增强、最小改动"。
- **非原生（≥3 项非原生，典型：电商白底图）**→ 强场景化 image work item：i2i 把产品放进真实生活场景，prompt 写明场景重建意图。

两档都必须**保留产品识别度**——logo / 文字 / 形态 / 颜色不可变。当前 image 工具无 denoise 参数，改动强度用 prompt 意图表达；具体模型由 executor 按选中 image vendor 卡决定，plan 只写操作意图与保真约束。

- 场景化锚图产出后对照原始产品图逐项核验 logo / 包装文字 / 形态 / 颜色，任一漂移即按反馈重生，不带漂移锚图进 production。
- 中度 / 非原生路由的场景化锚是生成图，不是产品外观真相：原始产品图必须继续进入每个 production video work item 的 refs 末尾作保真锁；高度原生路由下产品锚即原始图，不重复携带。

**锚图留发挥空间**：场景化产出的第一张图会锚定全片风格，生成时场景与构图留发挥空间；派视频时的场景多样性规则见 `<workflowsDir>/koc-video/reference/shot-vo-craft.md`。

## 产品保真与 brand 风险

- 产品的 logo / 包装文字 / 形态 / 颜色是受控资产不是氛围风格：**logo 必须来自用户 ref，禁止从文字描述发明 logo 几何**；品牌色写感知色词 + 使用位置，不默认铺满背景。
- claim 溯源：功效、价格、规格、before/after 陈述必须来自用户文字、refs 或已批准 placeholder；不可从"看起来像"编造。
- 用户上传 logo / 品牌图但没说用途时：不静默忽略也不自行发挥，在 brief 提案里带一个默认假设（如"片尾 CTA 角标露出"）随 hook 一起确认。

## 人物锚（KOC 例外，覆盖 asset-pipeline 六视图默认）

- **KOC 博主 / 模特锚 = 单张自然正面或半身图**，不是六视图 character sheet——多视图 sheet 直接喂视频 ref slot 会导致多人同框（已验证的翻车模式）。此条显式覆盖 `<workflowsDir>/_shared/asset-pipeline.md` 的六视图默认。
- **锚图输入规格**（用户上传模特图与生成锚图同一验收标准）：清晰正脸或微侧、光照均匀、面部无遮挡（墨镜 / 大帽檐 / 手挡脸）、面部占画面 ≥20%、表情中性或自然微笑、画面单人、短边 ≥512px；全身图做口播锚易翻车，取半身。不达标时提示用户换图或改 hands-only 形态，不静默硬用。
- **锚图认可 gate**：生成的创作者锚图必须经用户认可形象后才可写入 production video refs——Assets 产出后检查即此认可，不是纯质量自检。用户不认可时回 Brief 修订 persona 或按具体反馈重生锚图，不得静默沿用。用户上传模特图跳过 Assets 时，认可以 Brief 中「此图作为出镜博主锚」assumption 的确认完成。
- 用户上传的模特图经 Brief 确认博主锚角色后直接作锚；生成博主图时（persona 经 Brief 拍板选定后）用以下框架（本框架只管**锚图这一张图**的生成；视频镜头里的皮肤质感由 `shot-vo-craft.md` 真人皮肤与质感节在每个 video prompt 单独锁定）：
  - **真实质感词**：natural skin texture、subtle freckles / pores、slight asymmetry、flyaway hairs、natural imperfections、candid phone-photo look、soft natural light、9:16、shallow depth of field。
  - **人物具体化**：年龄 + 族裔 + 肤调 + 发型 + 表情 + 穿着，越具体越稳（例：23 岁东亚女性、暖肤调、松散低发髻、oversized 针织衫、安静自信的表情）。
  - **打光**：45 度侧柔光 + 轻微逆光（耳鼻边缘透光），忌硬正面光 / 顶平光（塑料脸根源）。
  - **negative 去 AI 感**：glossy AI skin、plastic face、perfect symmetry、flawless skin、8k hyperrealistic over-render、exaggerated makeup、cartoon / anime、oversexualized。
  - 真人感来自**不完美 + 自然光 + 具体**，不是堆细节词；删掉 perfect / cinematic / 大片类词。
- 跨 clip 一致性：每个 video work item 带同一组 [人物锚, 产品锚] refs（产品锚为生成图时末尾追加原始产品图保真锁）；连续性写法见 `<workflowsDir>/koc-video/reference/shot-vo-craft.md` 多 clip 衔接节。

## 试穿叠加（服装 / 美妆 / 穿戴 / 鞋 / 包）

- 时机：Assets 阶段、shot plan 之前。用 multi-ref image 生成把产品穿戴到人物锚上的试穿参考图。
- 试穿图是视频 work item 的**额外 input ref**（视觉锚点），不是关键帧、不替代产品 grounding；产品细节仍以产品锚为准。
- plan 中写成显式 image work item（inputs：人物锚 + 产品图；output_role：try-on reference），不能只写"may create"留给 executor 猜。

## 生成后 QC（写入 production video work item 的 postcondition）

每个 production video work item 附带验收要点，executor 生成后对照，明显违背时按 `medium_drift_detected` / 定向 retry 处理，不带病交付：

- 产品保真：logo / 文字 / 形态 / 颜色与原始产品图一致，无变形错字（产品锚只锁场景氛围，不作保真基准）。
- 人物同一：与人物锚同一张脸，跨 clip 不换人。
- 台词完整：`dialogue_excerpt` 逐字念全，无截断 / 倍速感。
- 原生感：无棚拍广告感、无静止假脸。

## Anti-patterns

- 给 KOC 博主生成六视图 sheet 并喂进视频 ref slot（导致多人同框）。
- 从文字发明 logo / 编造功效数据。
- 场景化锚图未对照原始产品图验收就写入 production refs，或 video refs 漏带原始产品图保真锁。
