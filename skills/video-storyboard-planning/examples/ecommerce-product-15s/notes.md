# 示例说明：ecommerce-product-15s

这个示例展示了一个**15 秒 TikTok 电商带货视频分镜图**的完整输入与输出组织方式，用于说明“视频分镜图 skill”如何从产品信息出发，生成一套可执行的短视频分镜结果。

---

## 一、示例目标

本示例的目标是：

- 用一个具体商品案例演示 skill 的工作方式
- 展示从 brief / product info 到 storyboard / shotlist / prompts 的标准链路
- 提供一个适合复用的参考项目结构
- 让后续操作者可以直接替换产品信息，快速套用

这个示例对应的典型需求是：

> “给我做一条 15 秒的 TikTok 带货视频分镜图，用来做 AI 出图或真人拍摄。”

---

## 二、示例内容概览

目录结构如下：

```text
examples/ecommerce-product-15s/
├── input/
│   ├── brief.md
│   └── product_info.json
├── output/
│   ├── storyboard.md
│   ├── shotlist.csv
│   └── prompts.md
└── notes.md

三、输入文件说明
1. input/brief.md

用于描述本项目的任务背景与要求，重点定义：

视频目标
平台
时长
用户类型
卖点方向
CTA 目标
内容风格
输出要求

它更偏“项目视角”。

适合由：

运营
品牌方
内容策划
客户经理

来填写。

2. input/product_info.json

用于结构化描述产品和受众信息，重点包括：

产品名称
产品分类
价格带
外观特征
核心卖点
用户痛点
场景偏好
风格偏好
约束条件
交付项要求

它更偏“数据与生产视角”。

适合由：

运营
商品团队
AI 内容生产人员
自动化流程

来提供。

四、输出文件说明
1. output/storyboard.md

这是核心产物。
用于输出完整的视频分镜方案，通常包含：

视频定位摘要
分镜结构总览
逐镜头分镜设计
节奏建议
字幕/口播建议
拍摄或出图执行备注

适合给：

策划确认
客户过稿
导演 / 拍摄团队
AI 出图人员
后期剪辑人员

使用。

2. output/shotlist.csv

这是镜头表的结构化版本。
适合：

导入表格工具
做项目管理
给拍摄与剪辑团队协作
做自动化处理
接入 AI 流程

字段通常包括：

shot_id
duration
section
visual_description
framing
camera_movement
dialogue
on_screen_text
selling_point
production_notes
3. output/prompts.md

这是给 AI 出图 / AI 视频前置准备的提示词包。

它的目标不是单纯写“好看的 prompt”，而是确保：

每个镜头视觉任务明确
产品一致性可控
人物一致性可控
场景迁移合理
下游生成更稳定

适合给：

AI 出图人员
AI 视频操盘人员
视觉创意团队

使用。

五、这个示例体现了什么方法

这个示例体现的是一种电商短视频分镜工程化思路，核心逻辑如下：

1. 先有商业任务，再有镜头

不是先想“画面怎么美”，而是先定义：

用户为什么看
为什么继续看
为什么相信
为什么点击
2. 用镜头承接卖点

每个镜头都应承担一个明确任务，例如：

Hook
痛点
解决方案
产品演示
信任感建立
CTA
3. 让输出能被下游直接使用

同一套输入，最终要支持：

分镜确认
真人拍摄
AI 出图
AI 视频生成
剪辑节奏安排
4. 让信息结构可复用

通过 brief + product_info + storyboard + shotlist + prompts 这种结构，后续只需替换输入内容，就可以复用同样的方法做其他产品。

六、为什么示例选“15 秒电商视频”

因为这是最常见、也最容易标准化的一类场景：

时长短，镜头任务清晰
转化导向明显
TikTok 平台适配度高
适合 AI 生成和真人拍摄双用
适合做最小可行模板

这个例子中的产品是“便携榨汁杯”，但这个结构同样可以迁移到：

美妆个护
收纳家居
服饰配件
小家电
厨房工具
健身用品
通勤类产品
七、如何复用这个示例
方式一：替换产品

保留整个目录结构，只替换：

brief.md
product_info.json

然后重新生成：

storyboard.md
shotlist.csv
prompts.md
方式二：替换风格

如果不是 UGC 带货，而是：

高级感广告
对比测评
专家讲解
开箱体验

则保留结构，修改：

视频风格
镜头节奏
字幕逻辑
人物表达方式
方式三：扩展交付

如果项目更复杂，可以继续补：

production-notes.md
style-bible.md
subtitle-script.srt
voiceover.md
shot-frames/
八、建议新增但当前未包含的文件

为了保持示例最小可读性，这里没有把所有扩展文件都放进去。
实际项目中，可以继续增加：

text
examples/ecommerce-product-15s/
├── output/
│   ├── production-notes.md
│   ├── style-bible.md
│   ├── subtitle-script.md
│   ├── voiceover.md
│   └── frame-prompts/


如果你要做成更完整的生产模板，这些文件很有价值。

九、适用边界

这个示例更适合：

15 秒左右短视频
电商转化目标明确的内容
需要快速执行的分镜项目
需要结构化输出的团队

它不完全适合：

60 秒以上复杂剧情广告
高叙事电影感短片
纪录片式长内容
纯品牌形象片

这些场景通常需要更复杂的叙事层和镜头设计层。

十、一句话结论

这个示例不是为了展示“写得多完整”，而是为了提供一个清楚、标准、能复用的电商短视频分镜模板样板。
它的重点在于：

输入清楚、输出结构化、镜头可执行、下游可直接接。
