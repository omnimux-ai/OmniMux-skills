---
name: skill-creator
description: |
  Create bilingual, market-ready Skills, modify existing Skills, save the current conversation workflow
  as a reusable Skill, guide users to install Skills from the marketplace,
  and understand directory structure. Always produce SKILL.md, SKILL.cn.md, and meta.yaml for publishable Skills.
  Trigger words: create skill, modify skill, save as skill, save this,
  turn into a skill, solidify workflow, remember this approach, want to do this again,
  install skill, download skill, skill marketplace, manage skill,
  create skill, save as skill, turn this into a skill,
  make this reusable, update skill, install skill, setup skill.
  Also trigger when the user reviews a completed creative output and expresses intent
  to repeat the same process with different inputs.
guide-prompt: 帮我使用它来创建一个新的技能。首先询问我这个技能应该做什么。
guide-prompt-en: Help me use it to create a new skill. First ask me what this skill should do.
---

# Skill Creator & Manager

Create, modify, install, and manage Skills. This application has one orchestrator (media-agent)
and multiple sub-agents: **image**, **video**, **audio**, **editing**.
Most Skills coordinate these agents to produce creative outputs.

## Directory Structure

| Directory | Purpose | Managed By |
|-----------|---------|------------|
| `~/.hub/skills/` | **Market-installed Skills** | Automatically managed by the app; do not modify manually |
| `~/Movies/Hub/skills/` | **User-created/edited Skills** | Full user control |

The user directory has higher priority: when Skills share the same name, the user directory version takes effect.

## Installing Skills from the Marketplace

Guide users through the in-app Skill Plaza page:

1. Open the app → go to the "Skill Plaza" page
2. Browse available Skills in the Market tab
3. Click the "Install" button
4. Enable the Skill in the Skill list after installation

Installed Skills are stored in `~/.hub/skills/`, managed by the app, with automatic updates.

---

## Skill Creation Workflow

```
1. Capture Intent   --  Understand the workflow
2. Write Skill files --  Author bilingual runtime files and metadata
3. Review & Iterate --  User feedback loop
4. Validate         --  Trigger tests + workflow walkthrough
5. Save & Reload    --  Save to user directory + trigger reload
6. Iterate (optional) -- Improve based on actual usage
```

### Three Usage Scenarios

**Scenario A: Save Current Conversation Workflow**
A workflow has already been completed in the conversation, and the user wants to solidify it as a Skill for reuse.
→ Extract the workflow from conversation history, proceed to STEP 1.

**Scenario B: Create a New Skill from Scratch**
The user has an idea but hasn't executed it yet, and wants to create a Skill directly.
→ Understand requirements through Q&A, proceed to STEP 1 (create-from-scratch branch).

**Scenario C: Modify an Existing Skill**
The user wants to adjust an existing Skill (change steps, parameters, trigger words, etc.).
→ Read the existing SKILL.md, SKILL.cn.md, and meta.yaml when present, understand modification intent, jump directly to STEP 2.

### What's Worth Saving as a Skill

Not every workflow is worth saving. Recommend saving only when at least two of the following apply:

- **Complexity**: More than 3 steps, involves multiple agents, or has branching logic
- **Reusability**: The user may repeat the same process with different inputs
- **Tacit knowledge**: Contains non-obvious techniques — model selection, parameter tuning, failure recovery strategies, creative techniques
- **Error correction history**: The user made corrections during the process that apply to future executions

If the workflow is a simple one-off operation (e.g., "generate one image"), suggest the user just describe it again next time.

---

## STEP 1: Capture Intent

### Scenario A: Extract from Conversation History

The conversation likely already contains the complete workflow. Extract from conversation history first; don't ask questions that already have answers.

#### Obtaining Conversation History

If the current context doesn't contain the complete workflow (it happened in a previous session),
use the agent's own conversation history capability to query previous session records.

**Skill Nesting**: Skills cannot nest-call other Skills. If the conversation history contains Skill invocations,
directly read the referenced Skill's SKILL.md to understand what it did — don't attempt to re-invoke it.

#### Extract from Conversation History:

1. **What happened**: Which capabilities were used, in what order
2. **Media flow**: Input (audio, images, text) → intermediate artifacts → final output
3. **Creative purpose**: Core intent
4. **Key decisions the user made**: Model selection, parameter adjustments, style direction
5. **Where things went wrong and were corrected**: Failures, retries, parameter changes — these are the most valuable knowledge
6. **What the user didn't change**: Default values working correctly is also information, indicating these parameters can remain flexible

#### Confirm Understanding

> "Here's what I extracted from the conversation: [summary]. Is this correct?"

If the user corrects or provides their own description, defer to the user's version.

### Scenario B: Create from Scratch

If there's no existing workflow, understand requirements through Q&A:

- What are the inputs? What's the final output?
- Rough sequence of steps?
- Any specific model or technical requirements?
- Any constraints (aspect ratio, duration, resolution, style consistency)?
- What's the hardest part — where does the agent tend to make mistakes?

### Scenario C: Modify an Existing Skill

1. Read the target Skill's `SKILL.md`, `SKILL.cn.md`, and `meta.yaml` when present
2. Understand what the user wants to modify
3. Jump directly to STEP 2 to make modifications, keeping bilingual files aligned. If `SKILL.cn.md` is missing, create it instead of making an English-only update.

---

## STEP 2: Write Bilingual Skill Files

### Directory Structure

```
skill-name/
├── SKILL.md           (required — Skill definition: name + description + system prompt)
├── SKILL.cn.md        (required — Chinese mirror: same name, localized description + body)
├── meta.yaml          (required — display metadata: display-name-zh / version / tag / summary / desc)
├── scripts/           (optional — reusable scripts)
└── references/        (optional — reference docs loaded on demand)
```

For any Skill intended for this market repo, always create all three required files: `SKILL.md`, `SKILL.cn.md`, and `meta.yaml`. The CI and pre-commit hooks reject directories under `skills/` or `user-skills/` when `SKILL.cn.md` is missing.

### Three-Layer Loading Mechanism

1. **Metadata** (name + description) — always in agent context, used for trigger matching. Keep `name` identical in `SKILL.md` and `SKILL.cn.md`.
2. **Runtime body** — `SKILL.md` is the English/default runtime file; `SKILL.cn.md` is the Chinese localized runtime file. Keep both under 500 lines and structurally aligned.
3. **Attached resources** — loaded on demand. Large docs go in `references/`, executable scripts in `scripts/`

### SKILL.md Frontmatter

SKILL.md only retains fields essential for agent runtime:

```yaml
---
name: my-skill                    # kebab-case, matches directory name
description: |
  Detailed description, first line is the summary.
  Includes trigger words for agent matching.
  Trigger words: keyword1, keyword2.
trigger-words: [keyword1, keyword2, keyword3, keyword4]
---
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Lowercase English words joined by `-`, matching the directory. See **`references/NAMING.md`** for structure and wording |
| `description` | ✅ | Detailed description + trigger words (200-500 characters) |
| `trigger-words` | Optional | Trigger word list |
| `allowed-tools` | Optional | Required MCP tool names |

### SKILL.cn.md Requirements

Create `SKILL.cn.md` for every new or updated Skill:

- Use the same frontmatter keys as `SKILL.md`.
- Keep `name` exactly the same as the directory name and `SKILL.md` frontmatter.
- Localize `description` and body into Chinese while preserving the same workflow, guardrails, confirmation points, and resource references.
- Keep referenced paths identical when they point to shared files such as `references/...` or `scripts/...`.
- If only one language changes, update the other file enough to keep the two versions semantically aligned.

#### Description Writing Guidelines

- **Length**: 200-500 characters
- **Tone**: Describe user intent, not implementation details
- **Coverage**: Include multiple phrasings (formal/colloquial/bilingual)
- **Boundaries**: Add brief disambiguation when similar Skills could be confused
- **Anti-pattern**: Don't write implementation steps in the description

### meta.yaml

Display metadata goes in a separate `meta.yaml`:

```yaml
display-name-zh: 广告创意脑爆          # Chinese display name, see references/NAMING.md
version: 0.1.0                       # Semantic version
tag-en: "Creative & Experimental"    # Legacy free-form string; non-empty only, not enum-checked
tag-cn: "创意实验"                    # Legacy free-form string; non-empty only
complete-tags-en:                    # YAML list; one or more "Vertical / Stage" pairs from the closed enum
  - "Creative & Experimental / Creative Generation"
complete-tags-cn:                    # Same length + same index alignment as complete-tags-en
  - "创意实验 / 创作生成"
summary-en: "One declarative sentence, up to 45 words, mirroring summary-cn."
summary-cn: "基于品牌简报与竞品参考，脑爆创意方向并产出视觉概念图，适用于 campaign 提案阶段。"
desc-en: "One paragraph, ~95-260 words, five elements: positioning / input / how it works / deliverable / boundary..."
desc-cn: "一段话，150-400 汉字，五要素：定位 / 用户输入 / 使用方式 / 最终产出 / 能力边界……"
author-en: "MiniMax Design"          # Official: MiniMax Design; community: submitter's username
author-cn: "MiniMax Design"
source: official                     # official-featured | official | community (must match dir)
```

⚠️ **The single source of truth for every rule below is `spec/metadata.yml`.**
Enums and length caps come from there; the pre-commit hook and CI both read the same file.
If a limit here disagrees with `spec/metadata.yml`, the spec wins — and this doc is stale, please fix it.

| Field | Required | Description |
|-------|----------|-------------|
| `display-name-zh` | ✅ | Concise, accurate Chinese display name with no legacy 10-character hard cap. See **`references/NAMING.md`** |
| `version` | ✅ | Semantic version `MAJOR.MINOR.PATCH` |
| `tag-en` | ✅ | **Legacy field** — English old category, free-form string (non-empty only, no longer enum-checked). Current classification lives in `complete-tags-en` |
| `tag-cn` | ✅ | **Legacy field** — Chinese old category, free-form string (non-empty only) |
| `complete-tags-en` | ✅ | English category tags, **YAML list**. Each item `"Vertical / Stage"` from the closed enum. A skill may have multiple tags. Front-end verticals (`tags`) are derived from this |
| `complete-tags-cn` | ✅ | Chinese category tags, **YAML list**. Same length and same index alignment as `complete-tags-en`. Derive it from the English list via the spec mapping — do not translate it independently, misalignment is a hard error |
| `summary-en` | ✅ | English UI summary, ≤45 words. One declarative sentence, mirror of `summary-cn` |
| `summary-cn` | ✅ | Chinese UI summary, 30–60 Chinese chars. One declarative sentence |
| `desc-en` | ✅ | English detailed description, ~95–260 words (hard cap 280). Single paragraph |
| `desc-cn` | ✅ | Chinese detailed description, 150–400 Chinese chars. Single paragraph |
| `author-en` | ✅ | English author name (official → `MiniMax Design`; community → submitter's username) |
| `author-cn` | ✅ | Chinese author name (official → `MiniMax Design`; community → submitter's username) |
| `source` | ✅ | 3-value enum `official-featured` / `official` / `community`, must match dir (`skills/` → official-featured/official, `user-skills/` → community) |
| `cover` | Optional | Cover media CDN URL (16:9). Upload with `hub_upload_to_cdn` to `hailuo_cn` / `hailuo_oversea`, then validate and write URLs with `scripts/set-cover.sh` |
| `cover-en` | Optional | Cover media for English locale (same format check). Empty → falls back to `cover` |

Below the caps there are also **soft minimums** (`summary-cn` 30, `desc-cn` 150). Falling short only
prints a hint, it does not block the commit — but content that short usually means the summary just
restates the name.

#### Writing `summary-cn` / `summary-en`

One complete declarative sentence. **Must not restate the skill name** — the name already says
"what it is"; the summary adds "how" / "what it produces" / "when to use it".

> From [user input], [core processing steps], producing [final deliverable], for [use case].

#### Writing `desc-cn` / `desc-en`

One paragraph, covering five elements in order:

1. **Positioning** — which users, what problem, what scenario
2. **User input** — what the user provides, specific about format
3. **How it works** — key steps in execution order, 3–6 steps
4. **Final deliverable** — the concrete output form
5. **Capability boundary** — what it is best at, and explicitly what it does **not** handle

Full prompts with good/bad examples: `.ci/prompts/summary-*.md` and `.ci/prompts/desc-*.md`.

#### Category enum

Do not hand-copy the enum here — render it from the spec:

```bash
python3 .ci/lib/print_tag_enum.py en --pairs   # English verticals / stages / full tag set
python3 .ci/lib/print_tag_enum.py cn --pairs   # Chinese
```

`Platform Tooling` appears alone with no stage and is **exclusive** — if a skill's tag list contains
it, that must be its only tag. Otherwise a skill may carry multiple tags, e.g. a short-drama
soundtrack skill: `["Short Drama / Post-production", "Sound & Music / Creative Generation"]`.

### Body Structure

1. `# Skill Name` — Title
2. Introduction paragraph — when to use, what media types are involved
3. Step-by-step — `## STEP N: Step Name`

Use `references/SKILL-TEMPLATE.md` as a starting template.

### Writing Principles

#### Describe Tasks, Not Routing

- Good: "Generate a 16:9 protagonist portrait — young woman in red dress, cinematic lighting"
- Bad: "Call image agent, use nano_banana model to generate..."

#### Only Mention Models When the User Explicitly Specifies

If the user says "use Kling for video generation," record it. Don't hardcode default values that the agent selects automatically.

#### Explain the Reasoning Behind Constraints

- Good: "Remove the audio track from lip-sync clips before final compositing, because the compositing step adds the original song and duplicate tracks cause audio overlap"
- Bad: "Must use the `-an` flag"

#### Capture the Creative Process, Not Implementation Details

- Good: "Analyze the music's emotional shifts, rhythm transitions, and vocal sections"
- Bad: "Call `read_media`, set the question parameter to..."

#### Batch Process, Don't Alternate

- Good: "Generate all scene images at once, then generate all videos at once"
- Bad: "For each segment: generate image first, then video, then move to the next"

#### Add User Confirmation at Creative Decision Points

Add confirmation steps before high-cost operations (video generation, final compositing). Don't confirm at every small step.

#### Encode User Error Corrections, Not Just the Happy Path

Retries and corrections are the most valuable knowledge.

#### Generalize from the Specific

- Good: "Analyze audio to determine section boundaries" (generic)
- Bad: "Split at 0:45, 1:30, 2:15" (file-specific)

#### All Outputs Go to the Session Project Directory

Don't hardcode output paths. Use file paths returned by tools for subsequent operations.

#### Keep Body Under 500 Lines

Move excess content to `references/`, extract executable patterns to `scripts/`.

---

## STEP 3: Review & Iterate

Present the complete `SKILL.md`, `SKILL.cn.md`, and `meta.yaml` to the user:

> "Here's the Skill I've written — anything you'd like to adjust?"

Common modifications: adjust step order, change model selection, tune parameter flexibility, add edge case handling, change trigger words, remove overly specific instructions.

---

## STEP 4: Validate

### 4a: Trigger Test

1. **Write 6 test queries** — 3 that should trigger, 3 that should not. Include both English and Chinese phrasings when the Skill is bilingual.
2. **Self-test**: Looking only at name and descriptions in `SKILL.md` / `SKILL.cn.md`, ask yourself "would this trigger?"
3. **Show the user**: Present test queries and expected results

### 4b: Workflow Walkthrough

Using a hypothetical scenario different from the original conversation, walk through step by step:

- [ ] **Completeness**: Is each step's output the input needed for the next step?
- [ ] **Generality**: Are any steps bound to specific content from the original conversation?
- [ ] **Confirmation points**: Is user confirmation placed before high-cost operations?
- [ ] **Failure paths**: Does the Skill provide guidance when generation fails?
- [ ] **Batching strategy**: Are similar resources batch-processed or alternated individually?

---

## STEP 5: Save & Reload

After user confirmation, save to the target Skill directory. For user-local Skills, use `~/Movies/Hub/skills/<skill-name>/`. For market contributions, use the repo path requested by the user, usually `skills/<skill-name>/` or `user-skills/<skill-name>/`.

### 1. Create Directory and Write Files

Set the target directory first:

- User-local Skill: `TARGET_DIR=~/Movies/Hub/skills/<skill-name>`
- Market contribution: `TARGET_DIR=<repo-path-requested-by-user>/<skill-name>` (usually `skills/<skill-name>` or `user-skills/<skill-name>`)

```bash
mkdir -p "$TARGET_DIR"
```

Save SKILL.md to `$TARGET_DIR/SKILL.md`.
Save SKILL.cn.md to `$TARGET_DIR/SKILL.cn.md`.
Save meta.yaml to `$TARGET_DIR/meta.yaml`.

If there are references or scripts, create corresponding subdirectories.

### 2. Verify Reference Integrity

After saving, confirm required files exist and all referenced files exist:

```bash
test -f "$TARGET_DIR/SKILL.md"
test -f "$TARGET_DIR/SKILL.cn.md"
test -f "$TARGET_DIR/meta.yaml"
grep -oE '(references|scripts)/[^\s`"]+' "$TARGET_DIR/SKILL.md" | \
  while read f; do
    [ -f "$TARGET_DIR/$f" ] || echo "MISSING: $f"
  done
grep -oE '(references|scripts)/[^\s`"]+' "$TARGET_DIR/SKILL.cn.md" | \
  while read f; do
    [ -f "$TARGET_DIR/$f" ] || echo "MISSING: $f"
  done
```

For market contributions, run `.ci/validate.sh` before finishing. If `SKILL.md`, `SKILL.cn.md`, or `meta.yaml` changed, bump `meta.yaml` version: patch for content fixes, minor for new capability.

### 3. Trigger Skill Reload

For user-local Skills, after saving, call `hub_reload_skills` to trigger a reload of the Skill list.
If there's an active session, the user will see a notification bar prompting to confirm restart; if there's no active session, the reload completes silently.
For market contributions, skip local reload and report the repo path plus `.ci/validate.sh` result.

### 4. Inform the User

- Skill has been saved to `$TARGET_DIR`
- For user-local Skills, reload has been triggered; the new Skill is available in the current or next session
- For market contributions, validation has passed and the repo path is ready for commit/MR
- List the 3 trigger test queries from Step 4a as examples

---

## STEP 6: Iterate & Improve (Optional)

The first version of a Skill is rarely the best. Come back to improve after actual usage.

### Observation Signals

| Signal | Meaning | Fix |
|--------|---------|-----|
| Agent doesn't trigger the Skill | Description is missing the user's phrasing | Expand trigger words |
| Triggers but executes poorly | Instructions unclear or ambiguous | Clarify steps, add examples |
| Triggers when it shouldn't | Description too broad | Add boundary descriptions |
| Agent writes similar scripts each time | Repeated work not packaged | Extract to `scripts/` |
| User always modifies the same step | Constraints too loose | Add explicit guidance with reasoning |
| Agent does unnecessary work | Instructions cause wasted effort | Remove or simplify |

### Improvement Process

1. Collect evidence from 2-3 usage sessions
2. Diagnose: trigger issue (description), execution issue (body), or missing resource?
3. Targeted fix: only change what's broken
4. Re-validate (run Step 4 checklist)
5. After modification, also call `hub_reload_skills` to trigger reload
