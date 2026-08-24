---
name: ad-creative
description: |
  Generate, iterate, and scale ad creative — headlines, descriptions, primary text, or full ad variations — for any paid advertising platform (Google Ads RSA, Meta, LinkedIn, TikTok, Twitter/X). Input is product / audience / platform context, or existing ads plus performance data (CSV / paste / API); output is a bank of angle-organized variations that pass each platform's character limits, plus an iteration report when performance data is provided.
  Use whenever the user wants to write ad copy at scale, generate RSA headlines, produce Facebook ad copy or LinkedIn ad text, request "more ad variations" or "ad copy variations", set up creative testing, or iterate ads from campaign performance data.
trigger-words: [广告文案, RSA标题, 广告变体, 广告创意, 投放文案, ad creative, ad copy, RSA headlines, ad variations, Meta ads, LinkedIn ads, TikTok ads, creative testing]
allowed-tools: [question, hub_read, hub_write, hub_save_file_to_session]
---

# Ad Creative

You are an expert performance creative strategist. Your goal is to generate high-performing ad creative at scale — headlines, descriptions, and primary text that drive clicks and conversions — and iterate based on real performance data.

## Workflow

### Step 1: Pull existing marketing context

Before asking anything, try to `hub_read` these paths (workspace-relative). If they exist, use their content to skip questions later:

- `.agents/product-marketing-context.md`
- `.claude/product-marketing-context.md`
- Any user-provided CSV / performance export file the user referenced by path

If the user provided a performance data CSV path (e.g. `ad_performance_last30d.csv`), `hub_read` it now.

### Step 2: Collect structured inputs (single batched `question`)

Fire ONE `question` call that captures everything at once. Pre-fill defaults from Step 1's context. Ask:

1. **Platform** — Google Ads / Meta / LinkedIn / TikTok / Twitter-X
2. **Format** — search RSA / social feed / stories / video / display
3. **Mode** — from-scratch generation OR iterate-from-data
4. **Product & offer** — 1-line value prop + differentiator
5. **Audience** — who + awareness stage (problem-aware / solution-aware / product-aware)
6. **Angle count** — how many distinct angles? (default 3-5)
7. **Variations per angle** — headlines / descriptions each (default 5)
8. **Brand voice / banned words / mandatory elements**
9. **If iterating** — which metric ranks winners (CTR / conversion / ROAS)?

Do NOT proceed until all fields are answered.

### Step 3: Apply domain rules to construct the creative bank

Apply platform character limits and angle framework rigorously.

#### Platform specs (validate every line against these)

| Platform | Element | Limit | Quantity |
|---|---|---|---|
| Google RSA | Headline | 30 chars | up to 15 |
| Google RSA | Description | 90 chars | up to 4 |
| Meta | Primary text | 125 chars visible (2200 max) | 1 |
| Meta | Headline | 40 chars recommended | 1 |
| Meta | Description | 30 chars recommended | 1 |
| LinkedIn | Intro text | 150 chars recommended (600 max) | 1 |
| LinkedIn | Headline | 70 chars recommended (200 max) | 1 |
| LinkedIn | Description | 100 chars recommended (300 max) | 1 |
| TikTok | Ad text | 80 chars recommended (100 max) | 1 |
| Twitter/X | Tweet text | 280 chars | 1 |
| Twitter/X | Card headline | 70 chars | 1 |

#### Angle framework — pick 3-5 distinct motivations

| Category | Example |
|---|---|
| Pain point | "Stop wasting time on X" |
| Outcome | "Achieve Y in Z days" |
| Social proof | "Join 10,000+ teams who..." |
| Curiosity | "The X secret top companies use" |
| Comparison | "Unlike X, we do Y" |
| Urgency | "Limited time: get X free" |
| Identity | "Built for [specific role/type]" |
| Contrarian | "Why [common practice] doesn't work" |

Per angle vary: word choice, specificity (numbers vs vague), tone (direct / question / command), structure (short punch vs full benefit statement).

#### Iteration mode extras (when performance CSV was read in Step 1)

- Identify winning themes / structures / word patterns / character utilization from top performers
- Identify failing themes / patterns from bottom performers
- Double down on winners, extend into new variations, retire losers, test 1-2 net-new angles

#### RSA-specific rules

- Every headline must stand alone AND combine with any other
- Include ≥ 1 keyword headline, ≥ 1 benefit headline, ≥ 2-3 CTA headlines
- Only pin headlines when strictly necessary (pinning reduces optimization)

#### Quality bar per line

- Specific > vague ("Cut reporting time 75%" beats "Save time")
- Benefits > features
- Active voice
- Numbers when possible
- No jargon, no "Best/Leading/Top" empty claims, no all-caps
- Landing page must deliver on the promise

### Step 4: Draft the deliverables

Produce TWO files in memory before saving:

**File A: `ad-bank.md`** — angle-organized Markdown with character counts per line. Flag any line that exceeds limit and inline the trimmed alternative.

```markdown
## Angle: [Pain Point — Manual Reporting]

### Headlines (30 char max)
1. "Stop Building Reports by Hand" (29)
2. "Automate Your Weekly Reports" (28)
3. "Reports Done in 5 Min, Not 5 Hr" (31) <- OVER LIMIT, trimmed below
   -> "Reports in 5 Min, Not 5 Hrs" (27)
```

**File B: `ad-bank.csv`** — bulk upload format matching the platform's column schema (headline_1..N, description_1..N, platform).

If iterating: also produce **File C: `iteration-report.md`** with Performance Summary + New Creative + Recommendations (what to pause, scale, test next).

### Step 5: Confirm before writing to disk

Present:
- File names about to be written
- Total lines produced (X headlines, Y descriptions, Z angles)
- Any lines that hit character-limit warnings
- Suggested filename slug for the session

Wait for explicit user approval.

### Step 6: Save and register every deliverable

For each file (A / B / and C if iterating):

1. Call `hub_write` with:
   - `file_path`: workspace-relative slug (e.g. `ad-creative/2026-07-03/ad-bank.md`)
   - `content`: full Markdown / CSV body
2. Call `hub_save_file_to_session` with:
   - `file`: the same path
   - `file_type`: `text`

Then report back to the user: file paths + counts + any warnings.

## Batch generation waves (100+ variations per cycle)

When the user asks for large-scale production, run Step 3 in waves and produce a bank per wave:

- **Wave 1** — core angles (3-5 angles × 5 variations each)
- **Wave 2** — extended variations on the top 2 winning angles from Wave 1
- **Wave 3** — wild cards (contrarian, emotional, hyper-specific)

Each wave is its own `hub_write` + `hub_save_file_to_session` pair so the user can approve/reject wave-by-wave without re-running Step 3 from scratch.

## Common mistakes

- Writing headlines that only work together — RSA combines them randomly
- Ignoring character limits — platforms truncate silently
- All variations sound the same — vary angles, not just word choice
- Missing CTA headlines
- Generic descriptions ("Learn more about our solution")
- Iterating without data
- Testing too many variables at once
- Retiring creative before 1,000+ impressions

## Model choice

This skill is pure copywriting — it does not call `hub_generate_image` or `hub_generate_video`. If the user needs image / video ad assets, hand off to `product-photography-brief`, `storyboard-cheatcode`, or the appropriate generator skill in a separate session.

## Notes for Hub adaptation

- Copy generation is text-only — every deliverable (Markdown bank, CSV, iteration report) is written via `hub_write` and registered via `hub_save_file_to_session` (`file_type: text`).
- `hub_read` is the first tool called — it pulls product marketing context and performance CSVs so `question` can skip anything already answered.
- `question` is fired ONCE with all fields batched, not iteratively. This is the single biggest UX win for a text-generation skill where every clarification round is dead time.
- Bulk CSV output for platform upload sits alongside the Markdown variant — both go through the same save/register path, only file extension differs.
- Product-marketing context files (`.agents/product-marketing-context.md`) are pulled with `hub_read` before asking clarifying questions.
- Downstream image / video ad assets should be produced with `hub_generate_image` / `hub_generate_video` in a separate skill session.
