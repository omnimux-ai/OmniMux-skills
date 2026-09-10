# Output Specification

## 目的

本文件定义“视频分镜图 skill”的标准输出结构、推荐文件职责、字段规范、不同输出模式之间的差异，以及交付质量要求。

目标是确保输出结果不仅“看起来完整”，还必须满足以下条件：

- 可读
- 可执行
- 可复用
- 可协作
- 可接入 AI 生成或拍摄流程

---

## 输出设计原则

### 1. 输出优先服务执行
本 skill 的输出不是单纯创意展示，而是为了支持：
- AI 出图
- AI 视频提示词生成
- 真人拍摄
- 剪辑协作
- 电商内容迭代

### 2. 输出应分层
同一份内容不应该塞进一个大文档里。
应根据用途拆成不同文件，例如：
- `storyboard.md` 给人看
- `shotlist.csv` 给表格与流程看
- `prompts.md` 给生成环节看
- `production-notes.md` 给执行团队看

### 3. 输出应支持不同完整度
不是每个项目都需要全套交付。
因此输出必须支持：
- 简洁版
- 标准版
- 生成就绪版
- 拍摄执行版

### 4. 输出必须镜头化
只给一个创意概述不算完成。
至少应落到：
- 视频结构
- 逐镜头任务
- 逐镜头画面说明

---

## 标准输出文件集合

根据项目复杂度，推荐以下输出文件组合：

### 最小输出
- `storyboard.md`

### 标准输出
- `storyboard.md`
- `shotlist.csv`

### 生成就绪输出
- `storyboard.md`
- `shotlist.csv`
- `prompts.md`

### 执行增强输出
- `storyboard.md`
- `shotlist.csv`
- `prompts.md`
- `production-notes.md`

### 完整协作输出
- `storyboard.md`
- `shotlist.csv`
- `prompts.md`
- `production-notes.md`
- `voiceover.md`
- `subtitle_script.md`
- `style-bible.md`

---

## 核心输出文件说明

---

## 1. `storyboard.md`

### 作用
这是主文档。
用于完整表达视频结构与逐镜头设计，是最核心的交付结果。

### 适用对象
- 策划
- 品牌方
- 客户
- 拍摄团队
- AI 生成操盘者
- 剪辑团队

### 必备内容
建议至少包含：

1. 项目摘要
2. 视频目标
3. 目标平台
4. 时长与风格
5. 核心卖点
6. 分镜结构总览
7. 逐镜头分镜表
8. 节奏建议
9. 执行备注

### 推荐章节结构
```md
# 标题
## 一、视频定位摘要
## 二、分镜结构总览
## 三、逐镜头分镜表
## 四、节奏建议
## 五、执行备注
## 六、可选扩展建议

单镜头最少字段

每个镜头至少建议包含：

镜头编号
时长
镜头目的
画面内容
景别
运镜
动作
台词 / 字幕
卖点任务
备注
2. shotlist.csv
作用

这是结构化镜头表，用于协作、排期、执行、导入表格系统或自动化流程。

适用对象
导演
制片
剪辑师
AI 流程系统
项目管理人员
推荐字段
text
shot_id
start_time
end_time
duration
section
scene_purpose
visual_description
framing
camera_movement
subject_action
dialogue_vo
on_screen_text
selling_point
transition
production_notes

字段说明
shot_id

镜头编号
示例：01

start_time

镜头开始时间
示例：0.0

end_time

镜头结束时间
示例：1.2

duration

镜头时长
示例：1.2

section

所在段落
示例：

Hook
痛点
卖点演示
CTA
scene_purpose

该镜头承担的任务
示例：

抓住注意力
展示操作门槛低
引导点击
visual_description

画面内容说明

framing

景别
示例：

近景
中景
中近景
产品特写
camera_movement

运镜
示例：

轻推
快切
跟拍
横移
定镜
subject_action

主体动作说明

dialogue_vo

口播 / 旁白

on_screen_text

字幕文案

selling_point

对应卖点

transition

与下一镜头的衔接方式

production_notes

执行备注

3. prompts.md
作用

这是给 AI 出图、AI 视频生成前置使用的提示词包。

适用对象
AI 视觉生成人员
AI 视频操盘者
视觉创意团队
推荐内容结构
项目基础信息
统一风格约束
产品一致性要求
人物一致性要求
负面提示词
镜头级 prompt
连续性补充说明
推荐章节结构
md
# Prompt Pack
## 一、统一风格约束
## 二、负面提示词
## 三、镜头级 Prompt
## 四、连续性补充说明
## 五、使用建议

单镜头 prompt 应尽量包含
主体是谁
在哪里
做什么
构图或景别
光线/氛围
风格要求
输出画幅
连续性约束（如需要）
注意事项
不要让 prompt 只剩风格词堆砌
要有明确动作和主体
要控制产品形态一致性
尽量避免镜头任务不清
4. production-notes.md
作用

补充 storyboard 中不便展开的执行层信息。

适用对象
导演
制片
摄影
场务
剪辑协作人员
推荐内容
场景建议
道具列表
出镜人物建议
服装建议
光线建议
拍摄顺序建议
注意事项
镜头衔接建议
5. voiceover.md
作用

单独管理口播稿，避免和分镜主文档互相干扰。

适用对象
出镜人
配音
导演
剪辑师
推荐内容
全片口播稿
按镜头拆分口播
强调词
停顿建议
不同语气版本
6. subtitle_script.md
作用

单独管理字幕脚本，方便后期和多语言处理。

推荐内容
时间轴
字幕文本
强调词
分段换行建议
7. style-bible.md
作用

在多镜头、多版本、多角色项目中，用于统一风格标准。

推荐内容
产品视觉规范
人物形象规范
场景风格规范
色彩方向
字幕样式建议
品牌显性元素使用规则
输出模式定义
模式 A：简洁版输出
适用场景
用户只想快速看一版方向
方案初稿
早期提案
包含内容
视频摘要
分镜结构总览
6–8 个核心镜头
不一定包含
prompt
production notes
voiceover 独立文档
模式 B：标准版输出
适用场景
大多数常规项目
需要交付分镜方案
需要后续执行协作
包含内容
storyboard.md
shotlist.csv
模式 C：生成就绪版输出
适用场景
需要 AI 出图
需要 AI 视频前置准备
需要镜头级 prompt
包含内容
storyboard.md
shotlist.csv
prompts.md
模式 D：拍摄执行版输出
适用场景
需要真人落地拍摄
有拍摄或剪辑团队协作
包含内容
storyboard.md
shotlist.csv
production-notes.md
视情况补 voiceover.md 与 subtitle_script.md
质量要求

输出完成后，至少应满足以下标准：

1. 结构完整
有开场
有中段价值展示
有结尾收口
有镜头逻辑连续性
2. 画面具体
能想象出画面
能被拍出来
能被生成出来
3. 卖点清晰
每个卖点有镜头承接
不只靠口播解释
4. 平台适配
节奏适合短视频
前 3 秒有效
竖屏观看友好
5. 执行友好
不空泛
不堆砌形容词
不需要二次猜测才能落地
6. 输出一致
文案语气一致
产品形态一致
人物与场景逻辑一致
常见输出问题
问题 1：只有概念，没有镜头

错误表现：

“展示产品高级感”
“表达轻松氛围” 但没有画面细节
问题 2：只有文案，没有视觉任务

错误表现：

给了一段口播，但没说画面怎么走
问题 3：镜头很多，但没有结构

错误表现：

镜头堆砌，缺少段落逻辑
不知道为什么这一镜在前，那一镜在后
问题 4：分镜可读，但不可执行

错误表现：

太抽象
太空泛
AI 难生成，真人难拍
问题 5：不同文件之间信息冲突

错误表现：

storyboard 说是白色产品
prompt 写成黑色产品
shotlist 场景与 production notes 对不上
文件之间的对应关系
CSVMarkdown
文件

主要用途

面向对象


storyboard.md

主分镜说明

人


shotlist.csv

结构化镜头表

表格/系统/协作


prompts.md

AI 生成提示词

AI 生成流程


production-notes.md

执行补充

拍摄/剪辑团队


voiceover.md

口播管理

出镜/配音/导演


subtitle_script.md

字幕管理

后期/本地化


style-bible.md

统一视觉标准

多人协作项目
推荐输出顺序

在实际交付时，建议按以下顺序组织内容：

先给 storyboard.md
再给 shotlist.csv
若有 AI 需求，再给 prompts.md
若有执行需求，再补 production-notes.md
若口播较重，再拆 voiceover.md
若字幕较多，再拆 subtitle_script.md
一句话总结

好的输出不是“写得很满”，
而是：

让策划能确认、让客户能过稿、让 AI 能生成、让团队能执行。
