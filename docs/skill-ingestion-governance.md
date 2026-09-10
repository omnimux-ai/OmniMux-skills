# Skill工坊入库与公共云分发治理规范 (Skill Ingestion Governance)

## 0. 背景与核心铁律

Skill工坊（`omnimux-market`）是 OmniMux 桌面端面向全网创作者的公共技能集市。
**任何进入工坊 Catalog 的技能，其目标都是提供给全网跨用户一键下载与安装，绝对禁止“仅开发者本机可用”的本地自嗨式入库。**

### 核心铁律（Hard Gates）
1. **无真实可达远端源，绝对禁止录入 Catalog（No Reachability, No Entry）**：
   - 严禁录入未 push 到公共云的本地 Git 仓库名；
   - 严禁录入 GitHub 上返回 404 或无读权限的虚假/私有仓库；
   - 录入前必须执行 HTTP 探活与子路径存在性验证。
2. **官方公仓归一化原则**：
   - OmniMux 官方与社区自研通用 Skill 唯一官方公共托管仓库为：**`omnimux-ai/OmniMux-skills`**（GitHub 组织 `omnimux-ai`）；
   - 禁止继续使用历史废弃或未授权的 `infometa/OmniMux-skills`。
3. **交付完备性铁律**：
   - 本地写完 `SKILL.md` 仅代表**资产草稿就绪**；
   - 只有在完成远端推送（Git Push）、远端探活（HTTP 200 Probe）、Catalog 注册并验证跨机器拉取后，方可宣布**入库交付完成**。

---

## 1. 合法分发渠道与准入标准

工坊当前支持三种合法分发源（`source`）：

| 渠道类型 | `source` 定义规范 | 适用场景 | 准入前置条件 |
| :--- | :--- | :--- | :--- |
| **Git 远程源** | `{"type": "git", "repo": "omnimux-ai/OmniMux-skills", "path": "skills/<name>", "ref": "main"}` | 大多数官方与社区开源技能（主流） | 1. 目标 repo 必须在 GitHub 公开且 `curl` 接口返回 HTTP 200；<br>2. 目标子路径必须真实存在 `SKILL.md`；<br>3. `main` 分支必须已成功 push。 |
| **随版内置源 (Bundled)** | `{"type": "bundled"}` 或 `"bundled"` | 核心 P0 离线高频技能 | 物理文件必须真实存在于 `plugins/omnimux-market/catalog/skills/<name>/SKILL.md`。 |
| **SkillHub 平台** | `{"type": "skillhub", "identity": "<owner>/<slug>", "version": "<ver>"}` | 社区上架技能 | 必须在 `https://api.skillhub.cn` 存在可下载的有效 ZIP 资产。 |

---

## 2. Skill 包体规范标准

放入 `OmniMux-skills/skills/<name>/` 的每个技能必须满足以下规范：

### 2.1 目录结构
```text
<skill-name>/
├── SKILL.md                 # 核心说明书（必须）
├── meta.yaml                # 工坊货架与卡片元数据（必须）
├── references/              # 可选：提示词词典、风格参考、参数规范
└── scripts/                 # 可选：纯本地运行的无副作用辅助脚本
```

### 2.2 `SKILL.md` 规范
* **命名**：采用小写连字符 `[a-z0-9]([a-z0-9-]*[a-z0-9])?`，与目录名完全一致。
* **Frontmatter 强制单行**：
  ```markdown
  ---
  name: video-script-creation
  description: "一键生成结构化短视频分幕脚本，支持钩子、反转、正文与行动呼吁。Use for 视频, 脚本, 分镜. Not for unauthorized deployment or live mutation."
  ---
  ```
  *(注：禁止使用 YAML `>` 折叠多行，避免粗暴解析器截断丢失)*。
* **内容结构**：包含 概述与定位、输入契约 (Intake)、标准工作流 (Workflow)、输出交付规范 (Output Spec)、安全与权限护栏。

### 2.3 `meta.yaml` 规范
必须包含面向工坊卡片的呈现字段：
```yaml
display-name-zh: "视频脚本分幕创作"
version: 1.0.0
tag-cn: "视频生产 / 脚本分镜"
complete-tags-cn:
  - "短剧漫剧"
  - "视频脚本"
  - "UGC带货"
summary-cn: "一键生成结构化短视频分幕脚本，支持钩子、反转、正文与行动呼吁。"
desc-cn: "专业短视频分幕脚本创作工具，内置开篇3秒黄金Hook公式、冲突铺垫与行动呼吁转化模板。"
author-cn: "OmniMux"
source: official
```

### 2.4 分类映射
必须归属以下 9 大法定业务领域之一：
`短剧漫剧`、`专业影视`、`动画`、`商业广告`、`电商`、`教育`、`创意实验`、`音频音乐`、`平台工具`。

---

## 3. Agent 入库标准执行 SOP（5 步走）

后续任何 Agent 执行技能入库任务时，必须严格按序执行以下 5 步：

1. **Step 1: 制作与解耦**：去除对特定私有项目（如 Gxgen 内部端口/CLI）的硬依赖，具备通用执行能力。
2. **Step 2: 放入公共仓库**：将技能包放置于 `/Users/x/Desktop/Project/Github/OmniMux-skills/skills/<name>/`。
3. **Step 3: 推送与真实探活验证（必须！）**：
   ```bash
   cd /Users/x/Desktop/Project/Github/OmniMux-skills
   git add skills/<name>
   git commit -m "feat(skills): add <name> skill"
   git push origin main

   # 强制探活：验证 GitHub 远端接口可达
   curl -s -f -I "https://raw.githubusercontent.com/omnimux-ai/OmniMux-skills/main/skills/<name>/SKILL.md" | head -n 1
   # 必须输出 HTTP/2 200，否则禁止继续！
   ```
4. **Step 4: 注册至 Catalog**：在 `plugins/omnimux-market/catalog/index.json` 中配置该项，`source.repo` 必须统一为 `"omnimux-ai/OmniMux-skills"`。
5. **Step 5: 交付物汇报标准**：向用户提供 Skill ID、GitHub 远程公仓地址、HTTP 200 探活回执与 Catalog 注册状态。
