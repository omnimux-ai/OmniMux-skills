# 换装提示草案骨架

## 基础骨架

```text
任务目标：
将 {subject} 调整为穿着 {garment} 的画面，用于 {usage}。

人物保持：
保留 {identity_features}。

服装还原：
保持 {garment_features}。

场景与镜头：
采用 {scene}，画面比例 {aspect_ratio}，突出 {focus}。

负向约束：
不要 {negative_constraints}。

人工复核：
确认 {review_points}。
```

## 使用提醒

- 先写不变项，再写变化项。
- 一个版本只改一个主要变量，方便质检。
- 不要把看不见的细节伪装成确定事实。
