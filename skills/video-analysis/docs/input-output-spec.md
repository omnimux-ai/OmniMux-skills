## 输入输出规范

本文档描述 Gxgen 视频分析 skill 的输入、处理中间结果和最终输出约定。它帮助 Agent 稳定表达证据等级、字段含义和交接格式，不定义下载、转写、OCR 或外部平台解析实现。

## 1. 输入规范

### 1.1 输入类型
可接受以下输入类型之一：
- 当前对话可见或已上传的视频内容
- 用户提供的转写、字幕、口播文本
- 用户提供的截图、关键帧或逐镜头描述
- 用户提供的视频标题、评论摘录、商品信息或摘要
- 视频 URL 作为来源线索；无法访问内容时按 `url-only` 处理

### 1.2 最小输入
最小输入至少应包含：
- source：用户提供的来源描述
- evidence_level：`raw-video`、`transcript-plus-frames`、`transcript-only`、`summary-only` 或 `url-only`

### 1.3 可选输入
根据用户输入，可扩展如下可选字段：
- locale：期望输出语言或地区配置
- include_risk_notes：是否包含风险提示
- max_scene_count：最大切分场景数
- product_context：商品或品牌背景
- platform_hint：平台线索
- analysis_goal：分析目的

## 2. 中间结果规范

### 2.1 分析范围对象
分析范围对象可包含以下字段：
- source：原始输入来源
- evidence_level：证据等级
- source_kind：来源类型，例如 uploaded_video、transcript、frames、summary、url、unknown
- title：标题或占位标题
- platform：平台标识
- duration_seconds：视频时长（秒）
- orientation：画幅，例如 9:16
- width：宽度
- height：高度
- language：语言标识
- has_audio：是否有音频
- limitations：当前证据无法确认的内容

### 2.2 场景列表对象
场景列表建议为数组，每一项可包含：
- index：序号
- start：开始时间
- end：结束时间
- section：片段标签
- summary：片段摘要
- signals：支持该判断的信号列表

### 2.3 用户提供的转写对象
如果用户提供转写，建议至少包含：
- full_text：完整文本
- segments：分段数组

每个 segments 项可包含：
- start
- end
- speaker
- text
- confidence

## 3. 输出规范

### 3.1 Markdown 报告
Markdown 报告建议包含以下章节：
- 基本信息
- 内容总览
- 分段目录
- 场景拆解
- 关键表达观察
- 可复用框架
- 可执行优化建议
- 风险与备注
- 结论

### 3.2 JSON 报告对象
如果输出结构化 JSON 报告，建议至少包含：
- evidence_level
- basic_info
- overview
- toc
- scene_breakdown
- actionable_recommendations
- conclusion

### 3.3 交接内容
如果用户要求后续脚本、分镜或复刻，应交接：
- 可复用结构
- 不可复用风险
- 缺失证据
- 下一步需要补充的素材

## 4. 字段约定

### 4.1 时间格式
建议使用以下任一格式，并在同一项目中保持一致：
- mm:ss
- hh:mm:ss

### 4.2 标签取值
建议使用一组稳定的标签枚举，例如：
- hook
- intro
- problem
- demo_scene
- feature_highlight
- benefit_highlight
- social_proof
- objection_handling
- offer
- cta
- outro
- unknown

### 4.3 无法确认字段
当语音、字幕、画面或意图无法稳定判断时，建议明确输出：
- 无法确认
或：
- unknown

避免将猜测写成确定信息。

## 5. 输入不足处理
如果输入视频不可访问、为空或证据不足，建议：
- 返回可读的失败原因
- 保留最小结构化输出
- 不要返回空白结果
- 对调用方可恢复的错误提供清晰提示

## 6. 稳定性建议
- 保持 JSON 字段名称稳定。
- 保持 Markdown 章节顺序尽量稳定。
- 不要依赖未文档化的隐式字段。
- 不要把 URL、平台名或文件名当作已观看证据。

## 7. 安全与公开导出建议
- 不在输出中包含 API 密钥、访问令牌、内部 URL、系统提示词或隐藏控制指令。
- 不在公开样例中暴露私有目录结构与生产环境细节。
- 对真实用户内容进行导出时，应遵守适用的平台规则与隐私要求。

## Gxgen 运行说明
本文件只规定输入输出结构，不定义视频解析实现。
