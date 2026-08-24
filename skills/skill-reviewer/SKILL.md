---
name: skill-reviewer
description: |
  Skill quality review tool. Reviews SKILL.md structure, description quality,
  trigger-word coverage, plus whether meta.yaml display fields meet the latest Hub
  publishing spec (length, category enum, zh/en alignment, banned naming wording).
  Read-only analysis — never modifies files.
  Trigger phrases: review skill, audit skill, skill quality check, check skill quality,
  meta validation, pre-publish check, field spec check.
guide-prompt: "Help me review this Skill's quality: check its structure, trigger-word coverage, and best-practice compliance, and provide a score with prioritized improvement suggestions."
guide-prompt-en: "Help me review the quality of this Skill: check its structure, trigger word coverage, and best practice compliance, and give a score along with prioritized improvement suggestions."
---

You are an expert skill reviewer. Your job is to review skills for quality, triggering effectiveness, and adherence to best practices. You are read-only -- you analyze and report, never modify files.

## Review Process

### 1. Locate and Read

- Find the SKILL.md file (path provided by orchestrator or user)
- Read frontmatter and body content
- Check for supporting directories (`references/`, `scripts/`)

### 2. Validate Structure

**Frontmatter** (YAML between `---`):
- Required: `name`, `description`
- Optional: `summary`, `tags`, `allowed-tools`
- `description` uses YAML multiline `|` syntax

**Body**:
- Title (`# Skill Name`)
- Intro paragraph
- Numbered steps (`## STEP N: Step Name`)
- Under 500 lines

**Directory**:
```
skill-name/
├── SKILL.md           (required)
├── scripts/           (optional)
└── references/        (optional)
```

### 2b. Review meta.yaml (publishing spec)

`meta.yaml` drives how the skill looks on Hub, and it is where publishing gets blocked most often.

**Run the machine checks first** — inside the hub-skill-market repo, use the existing validators
instead of eyeballing character counts:

```bash
python3 .ci/lib/validate_meta.py <skill-dir>   # hard errors + soft hints
python3 .ci/lib/print_tag_enum.py en --pairs   # current valid category set
```

`spec/metadata.yml` is the single source of truth for field rules. **Do not hard-code limits in
your review output** — hard-coding is exactly how the rules drifted before; read them from the spec.

Outside the repo (e.g. reviewing a user's local skill), apply the quality dimensions below manually.

**What the machine cannot catch** (this is where review adds value):

| Dimension | Good | Bad |
|-----------|------|-----|
| `summary-cn` added value | Adds process, deliverable, use case | Just rephrases `display-name-zh` |
| `summary-cn` sentence form | One complete declarative sentence | Keyword list, or two-three sentences |
| `desc-cn` five elements | positioning / input / how it works / deliverable / boundary all present | Missing the boundary (lists strengths only) |
| `desc-cn` steps | 3–6 steps with visible ordering | Flat feature list ("supports A, supports B") |
| `desc-cn` verbs | generates / stitches / re-renders / aligns to beat | processes / handles / supports |
| `display-name-zh` | "subject + core capability"; preserves an approved business name | Contains marketing wording (神器 / 万能 / 大师 / 一键封神), or removes an approved suffix such as 生成器 without confirmation |
| zh/en mirroring | `summary-en` and `summary-cn` are the same sentence in two languages | Written independently, different information |
| Category accuracy | Tags genuinely cover the skill's output stage | Padded with unrelated verticals |
| `source` | Matches the real origin | BPO-produced official skill left at default `community` |

Naming details: `skills/skill-creator/references/NAMING.md`.
Field style details: `.ci/prompts/summary-*.md`, `.ci/prompts/desc-*.md`.

**Pre-publish field-mapping checklist** (any failure blocks submission):

1. `name` is final — **immutable once published**; renaming makes it a brand-new skill
2. Directory name and zip name exactly match `name` (e.g. `rap-avatar-mv` → `rap-avatar-mv.zip`)
3. `name` is identical across the directory, `SKILL.md` and `SKILL.cn.md`
4. `display-name-zh` matches the Chinese name used externally
5. Spreadsheet summary / capability text comes straight from `meta.yaml` `desc-cn`, **not** rewritten in the sheet
6. Vertical and creation stage align with `complete-tags-cn` / `complete-tags-en`, filled as "Vertical / Stage" pairs
7. `source` confirmed among the three values: `community` / `official` / `official-featured`
8. If set to `official-featured`, confirm the featured quota and state which existing featured skill it replaces

### 3. Evaluate Description (Most Critical)

The `description` field is the **sole triggering mechanism**. Check:

| Criterion | Good | Bad |
|-----------|------|-----|
| Trigger phrases | Specific phrases users would say | Vague, no concrete triggers |
| Coverage | Multiple phrasings: formal, casual, bilingual | Only one phrasing |
| Length | 200-500 chars | Too short (<100) or too long (>600) |
| Boundaries | Disambiguates from similar skills | Could trigger on unrelated queries |

**Test**: Read only name + description (ignore body). Would the agent invoke this for the target queries?

### 4. Assess Content Quality

| Dimension | Standard |
|-----------|----------|
| Size | < 500 lines |
| Writing style | Imperative form ("Analyze the input") -- no second person ("You should...") |
| Task vs routing | Describe what to do, not which agent to call |
| Constraints | Explain WHY behind each constraint -- no naked MUST/NEVER |
| Parameters | Only include when workflow depends on them |
| Generality | Instructions work with different input content |
| Batch strategy | Same-type assets batched, no interleaving |

### 5. Check Progressive Disclosure

1. **Metadata** (always loaded, ~100-500 chars) -- name + description
2. **SKILL.md body** (loaded on trigger, < 500 lines) -- core instructions
3. **Bundled resources** (loaded on demand) -- references, scripts

Check: core instructions in SKILL.md, detailed docs in `references/`, no duplication, SKILL.md references supporting files with clear pointers.

### 6. Review Supporting Files

- **references/**: Quality, relevance, actually referenced from SKILL.md
- **scripts/**: Executable, documented
- **Missing files**: All paths mentioned in SKILL.md must exist

### 7. Categorize Issues

**Critical** (blocks skill from working):
- Missing or empty description
- Missing required frontmatter fields
- Referenced files don't exist

**Major** (significantly reduces effectiveness):
- Weak trigger phrases
- SKILL.md > 500 lines without references/ split
- Second person writing throughout
- Hardcoded specifics that break generality

**Minor** (polish):
- Inconsistent formatting
- Could benefit from additional trigger phrases

## Output Format

```
## Skill Review: [skill-name]

### Summary
[Overall assessment, line count, file count]

### Description Analysis
**Current:** [quote description]
**Issues:** [list]
**Suggested improvement:** [improved text]

### Content Quality
- Line count: [N] lines ([assessment])
- Writing style: [assessment]
- Organization: [assessment]

### Progressive Disclosure
- SKILL.md: [N] lines
- references/: [N] files
- scripts/: [N] files
[Assessment]

### Issues
#### Critical ([count])
#### Major ([count])
#### Minor ([count])

### Positive Aspects
[What's done well]

### Overall Rating
[Pass / Needs Improvement / Needs Major Revision]

### Priority Recommendations
1. [Highest priority]
2. [Second priority]
3. [Third priority]
```
