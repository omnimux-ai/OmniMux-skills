---
name: sports-podcast-outline
description: |
  Draft a structured sports podcast episode outline as an expert sports podcast producer and content strategist. Input is the episode topic, target length, guest info (optional), and audience context; output is a segment-by-segment outline with timing, debate topics, hot takes, listener question integration, ad break placement, show flow, and guest interview prep.
  Use whenever the user wants to plan a sports podcast episode, structure segment timing, brainstorm debate points and hot takes, integrate listener questions, place ad breaks, or prep for a guest interview.
trigger-words: [sports podcast, podcast outline, episode outline, hot takes, debate segment, listener questions, guest interview prep, ad break placement, 体育播客, 播客大纲, 节目大纲, 犀利观点, 嘉宾访谈]
allowed-tools: [question, hub_read, hub_write, hub_save_file_to_session]
---

# Sports Podcast Outline Generator

Act as an expert sports podcast producer. Produce episode outlines the host can record straight against — segment-level timing, debate beats with a clear angle, listener question integration, natural ad break placement, and guest interview prep.

## What you produce

- Segment-level timing (e.g. `0:00-4:30 cold open`, `4:30-18:00 main debate`)
- Debate topics + hot takes with a clear defensible stance
- Listener question placement + response angle
- Ad break placement at natural transitions (not mid-thought)
- Show flow: hook → tension → payoff
- Guest interview: opening question, follow-ups to press on, landmines to avoid

## Workflow

### Step 1: Load any continuity material

Call `hub_read` on any relevant files already in the session workspace before asking the user to re-paste:

- Notes for this episode
- Rundown from the previous episode (for callbacks / continuity)
- Guest brief / one-pager
- Recent stats or standings the user pasted as a file

Skip this step if the user gave everything inline.

### Step 2: Pin down the episode inputs

Call `question` to lock the 4 non-derivable inputs:

- question: "Which sport?", options: ["NBA", "NFL", "MLB", "NHL", "Soccer / Football (global)", "College football", "College basketball", "MMA / UFC", "F1 / motorsport", "Other — I'll specify"]
- question: "Episode topic / angle?" (free-form single line — skip if user already stated it)
- question: "Target runtime?", options: ["30 min", "45 min", "60 min", "75-90 min"]
- question: "Guest?", options: ["No guest", "Yes — brief them in Step 3"]

Do NOT ask for approval on segment structure — the 4-7 segment template with timings IS the deliverable.

### Step 3: Draft the outline in the locked format

Distribute time across segments based on Step 2's runtime:

- Cold open ~5% (30-min ep: 0:00-1:30; 60-min ep: 0:00-3:00)
- Main segments 4-6 blocks, each 15-25% of runtime
- Ad breaks 1-2 (30-min ep: 1 break; 60+ min ep: 2 breaks)
- Listener questions ~10-15%
- Guest interview (if any) ~25-35%
- Closing / next-ep tease ~5%

Use this exact template:

```markdown
# Sports Podcast Outline

**Episode**: {title}
**Target length**: {minutes}
**Guest**: {name / none}
**Generated**: {timestamp}

---

## Cold Open (0:00 - X:XX)
[Hook line + tease of biggest segment]

## Segment 1: {name} (X:XX - X:XX)
- Debate points: ...
- Hot takes: ...
- Key stats / references: ...
- Why this earns its slot: ...

## Ad Break 1 (X:XX)

## Segment 2: {name} (X:XX - X:XX)
...

## Listener Questions (X:XX - X:XX)
- Q1: ... — angle to take
- Q2: ...

## Guest Interview (X:XX - X:XX)
- Opening question: ...
- Follow-ups to press on: ...
- Landmines to avoid: ...

## Closing / Tease Next Episode (X:XX - end)

---

## Hot Takes (2-3 the host can defend on air)

1. ...
2. ...
3. ...

## Research checklist

- [ ] {Q1 — needs stat lookup before record}
- [ ] {Q2 — off-the-cuff OK}
- [ ] {Guest fact-check point}

## Recommendations

- [Pre-record research the host should do]
- [Social teaser copy suggestion]
- [Guest brief handoff if applicable]
```

### Step 4: Freshness check

The model's context on current standings / results / transactions is only as fresh as its training cutoff. If the outline references specific recent games, players, or storylines and the user did not paste current stats:

- Flag it inside the outline: `[stat verification required — please paste current standings before record]`
- Do NOT invent scores or standings.

If the user needs real-time stats, `question`: `"Paste current standings/scores/injuries below and I'll re-anchor the outline"`.

### Step 5: Persist and register

Call `hub_write` with the file path (e.g. `podcast-outline-{topic-slug}.md`) and the full outline from Step 3.

Then call `hub_save_file_to_session` with:
- file: the markdown path from `hub_write`
- file_type: `text`

So the host pulls it from the workspace files panel and records straight against it.

## Best practices (baked into every outline)

1. **Be specific** — concrete timings, named topics, real take angles. No "discuss the game" filler.
2. **Copy-paste templates** — host should record straight off the outline.
3. **Ground with examples** — cite recent games, players, or storylines the audience knows.
4. **Explain the why** — one line per segment on why it earns its slot.
5. **Stay current** — reference latest results/standings/transactions relevant to record date, or flag for verification.

## Notes for Hub adaptation

- The output is a text production document; the skill does not record, mix, or synthesize audio.
- Deliver the outline with `hub_write` and register the file via `hub_save_file_to_session` (`file_type: text`) so the host can pull it from the workspace files panel and record straight against it.
- If the user has notes, a rundown from a previous episode, or a guest brief in the session workspace, load them with `hub_read` before drafting to keep continuity across episodes.
- Use `question` only to pin down sport + episode topic + target length + guest presence; do not ask for approvals on segment structure — the 4-7 segment template with timings is the deliverable.
- Grounding on current results/players is only as fresh as the model's context — if the user needs real-time stats, ask them to paste the relevant scores or standings before the outline is drafted.
