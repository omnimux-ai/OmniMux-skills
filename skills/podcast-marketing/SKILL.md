---
name: podcast-marketing
description: |
  Plan, produce, and market a podcast end-to-end as a growth channel. Covers concept and format selection, interview and solo episode structure, audio quality requirements, guest sourcing and outreach, SEO-optimized show notes, growth strategies from launch through scale, and revenue models. Input is a podcast concept or existing show; output is a full strategy document, guest outreach copy, or promotion checklist.
  Use whenever the user wants to launch a podcast, plan a podcast strategy, run guest outreach, write show notes, grow a podcast audience, or monetize an existing show.
trigger-words: [播客营销, 播客策略, 播客启动, 嘉宾外联, shownote, podcast strategy, launch podcast, podcast marketing, guest outreach, show notes, grow podcast, podcast monetization]
allowed-tools: [question, hub_write, hub_save_file_to_session]
---

# Podcast Marketing Skill

Podcast production and marketing expert. Help plan, produce, and grow podcasts as a marketing channel. Text deliverables only — no audio work is done inside Hub.

## Workflow

### Step 1: Establish scope
First infer what the user actually wants. Three common entry points:

- **Full strategy for a new show** — go through Steps 2-6 in full
- **Guest outreach copy only** — jump to Step 4
- **Single episode's show notes** — jump to Step 5

If ambiguous, ask via a single `question` call: "Are you planning a new show, running outreach, or writing show notes for an existing episode?"

### Step 2: Collect show context (one bundled `question` call)
Do NOT drip-feed prompts. Fire a single `question` with all six fields, so the strategy work has full context before drafting:

1. **Niche** — specific topic
2. **Target listener** — who they are, what they care about
3. **Format** — interview / solo / panel / narrative
4. **Length + frequency** — minutes per episode, weekly / biweekly / monthly
5. **Resource budget** — equipment tier, editing capacity, guest sourcing budget
6. **Primary goal** — traffic, leads, brand authority, community, monetization

### Step 3: Design the strategy document
Assemble the strategy internally using the frameworks below:

- **Episode structure** — pick from the Interview or Solo template
- **Audio quality baseline** — match to the resource budget
- **Guest wishlist** — 10-20 names with contact approach
- **Launch plan** — first 8 episodes, launch-day promo, review acquisition
- **Growth plan** — 3-month + 6-month cadence tied to the "Growth Strategies" table
- **Monetization roadmap** — tied to expected download volumes

### Step 4: Persist the strategy document
Call `hub_write` to save the strategy to a workspace file (e.g. `./strategy.md`) using the output template at the bottom of this skill.

Then call `hub_save_file_to_session` on that file with `file_type: text` so the user can pin it and hand it to downstream skills (e.g. `content-repurposing`, `copywriting`).

### Step 5: Persist outreach + show note templates
For each deliverable the user asked for, `hub_write` the file, then `hub_save_file_to_session` (`file_type: text`):

- `./outreach-template.md` — filled with the show's actual metrics + notable guest names
- `./show-notes-template.md` — filled with the show's actual format
- `./promotion-checklist.md` — per-episode task list

Return each block also as a ready-to-copy code fence in the reply, on top of persisting.

### Step 6: Flag out-of-scope handoffs
Text only. Do NOT attempt to invoke external tools. Point the user at these when they come up:

- Audio recording / editing / TTS / voice cloning → point to `hub_audio_generation` or dedicated audio skills; this skill will not call them
- Transcription → `hub_audio_transcribe_lyrics` or a dedicated transcription skill
- Email delivery / CRM push → user's own tooling; do not attempt to send

---

## Podcast as Marketing

Podcasts work differently from other marketing channels:

- **Long-form trust building** — 30-60 minutes of attention per episode
- **Relationship engine** — Guests become advocates, partners, customers
- **Content multiplier** — Each episode yields 10-20 content pieces (see content-repurposing skill)
- **SEO value** — Transcripts and show notes rank for long-tail keywords

## Episode Structure

### Interview Format (Most Common for Marketing)

```
0:00-1:00   Cold open (best quote from the episode as a teaser)
1:00-3:00   Intro (theme music, host intro, episode overview)
3:00-5:00   Guest introduction (bio, credentials, context)
5:00-25:00  Main discussion (3-4 core questions)
25:00-35:00 Deep dive (the "surprising" or "controversial" section)
35:00-40:00 Lightning round / rapid-fire questions
40:00-42:00 Guest CTA + where to find them
42:00-43:00 Outro (recap, next episode preview, subscribe CTA)
```

### Solo Format

```
0:00-0:30   Hook (what you'll learn and why it matters NOW)
0:30-2:00   Context (the problem or situation)
2:00-12:00  Main content (3-5 key points, stories, examples)
12:00-14:00 Summary + action items
14:00-15:00 CTA (subscribe, review, share)
```

## Audio Quality Essentials

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Microphone | USB mic ($50+) | XLR + interface ($150+) |
| Environment | Quiet room, soft surfaces | Treated space / closet |
| Recording | Audacity (free) | Descript, Riverside, Squadcast |
| Hosting | Anchor (free) | Transistor, Buzzsprout, Captivate |
| Post-production | Noise removal, leveling | Professional editing |

**Rules:**

- Record in WAV/AIFF, not MP3 (compress for delivery only)
- Audio levels between -16 and -12 LUFS
- Remove long pauses, filler words, and background noise
- Always have a backup recording (record locally + cloud)

## Guest Management

### Finding Guests

1. **Your network** — Customers, partners, industry contacts
2. **Podcast guest databases** — PodMatch, Podmatch.com
3. **LinkedIn search** — Find experts by topic + "podcast guest" or "speaker"
4. **Other podcasts** — Guests on similar shows are likely to say yes
5. **Book authors** — Actively promoting, need podcast appearances

### Guest Outreach Template

```
Subject: Guest invitation: {Podcast Name}

Hi {Name},

I host {Podcast Name}, a podcast about {topic} for {audience}.
We have {X} listeners per episode and previous guests include {notable names}.

I'd love to have you on to discuss {specific topic relevant to their expertise}.

Here's what previous guests have said: "{testimonial}"

The recording takes about {time}. We handle all editing and promotion.

Would you be open to a quick chat about this?

{Your name}
{Podcast URL}
```

### Pre-Interview Checklist

- Send recording link and tech requirements 24h in advance
- Share 3-5 discussion questions (not a script)
- Confirm pronunciation of guest's name
- Get guest's preferred bio and social links
- Ask guest to prepare 1-2 stories relevant to the topic

## Show Notes & SEO

Every episode should have optimized show notes:

```markdown
# {Episode Title — includes target keyword}

{2-3 sentence summary of the episode optimized for search}

## Key Takeaways

1. {Takeaway 1}
2. {Takeaway 2}
3. {Takeaway 3}

## Timestamps

- [00:00] Introduction
- [03:15] {Topic 1}
- [12:30] {Topic 2}
- [25:00] {Topic 3}
- [38:00] Lightning round
- [42:00] Where to find {guest}

## Resources Mentioned

- [{Resource name}]({URL})
- [{Resource name}]({URL})

## About {Guest Name}

{Brief bio with links to their website and social profiles}

## Subscribe & Follow

- [Apple Podcasts]({URL})
- [Spotify]({URL})
- [YouTube]({URL})
- [RSS Feed]({URL})
```

**SEO tips:**

- Include full or partial transcript for long-tail keyword coverage
- Use the episode title as an H1 with the target keyword
- Internal link to related episodes
- Embed the audio player on the page

## Growth Strategies

### Launch Phase (First 8 Episodes)

1. **Launch with 3+ episodes** — Gives new listeners binge content
2. **Ask guests to share** — Provide pre-written social posts and audiograms
3. **Personal network push** — Email contacts, post on all social channels
4. **Apple Podcasts reviews** — Ask early listeners to leave reviews (affects ranking)
5. **Submit to directories** — Apple, Spotify, Google, Amazon, Stitcher, Pocket Casts

### Growth Phase

| Strategy | Effort | Impact |
|----------|--------|--------|
| Guest cross-promotion | Low | High — each guest brings their audience |
| Audiogram clips on social | Medium | High — visual content on audio platforms |
| Newsletter mentions | Low | Medium — converts readers to listeners |
| Podcast guesting (be a guest on others) | Medium | High — direct audience exposure |
| YouTube video podcast | High | High — searchable, discoverable |
| Paid ads (Overcast, podcast apps) | Medium | Medium — $1-3 per subscriber |
| Transcript blog posts | Medium | Medium — SEO traffic to show notes |

### Promotion Checklist Per Episode

```
[ ] Publish episode on all platforms
[ ] Post audiogram clip on Twitter/X
[ ] Post audiogram clip on LinkedIn
[ ] Share on Instagram Stories
[ ] Email to newsletter subscribers
[ ] Send share assets to guest
[ ] Post in relevant communities (Reddit, Slack, Discord)
[ ] Create 2-3 quote cards from the episode
[ ] Update website show notes page
[ ] Respond to all comments within 48h
```

## Monetization

| Revenue Model | Audience Size | Rate |
|---------------|--------------|------|
| Host-read ads | 1,000+ downloads/ep | $20-50 CPM |
| Pre-roll ads | 5,000+ downloads/ep | $15-25 CPM |
| Sponsorships | 500+ downloads/ep | $500-2,000/month |
| Premium content | Any size | $5-15/month |
| Affiliate links | Any size | Commission varies |
| Services/consulting | Any size | From the leads generated |
| Live events | 10,000+ downloads/ep | Ticket sales |

**CPM = Cost per 1,000 downloads (industry standard for pricing)**

## Output Format

When creating a podcast strategy, this is the shape to `hub_write` in Step 4:

```markdown
# Podcast Strategy: {Show Name}

## Concept
- **Niche:** {specific topic}
- **Target listener:** {who and what they care about}
- **Format:** {interview/solo/panel/narrative}
- **Length:** {minutes}
- **Frequency:** {weekly/biweekly}

## First 10 Episode Topics
1. {Topic} — {Why this first}
2. {Topic} — {Guest: Name}
...

## Guest Wishlist
| Name | Relevance | Contact Approach |
|------|-----------|-----------------|

## Growth Plan
### Month 1: Launch
### Month 2-3: Establish
### Month 4-6: Scale

## Equipment Budget
| Item | Cost |

## Content Repurposing Plan
{How each episode becomes 10+ content pieces}
```

## Important Notes

- Consistency beats quality for the first 20 episodes. Ship weekly, improve as you go.
- Your first 10 episodes will not be great. That's normal. Keep going.
- Downloads in the first 7 days are the metric that matters most (affects charts and sponsorship pricing).
- Always record video, even if you only publish audio initially. Video podcasts on YouTube are growing rapidly.
- Guest-driven shows grow faster than solo shows because of built-in cross-promotion.

## Notes for Hub adaptation

- Use `question` to collect concept + niche + target listener + format + frequency + resource budget in a single structured pass before drafting the strategy — this skill is context-hungry.
- Persist the final strategy document, guest wishlist table, outreach email templates, and per-episode promotion checklists with `hub_write` inside the active session workspace, then register them via `hub_save_file_to_session` (`file_type: text`) so the user can pin them and hand them to downstream skills.
- This skill produces text deliverables only — no audio recording, editing, transcription, or media generation. If the user asks for audio-side help (voice cloning, TTS, transcription), point them at `hub_audio_generation` / `hub_audio_transcribe_lyrics` / voice-related skills instead.
- Guest outreach copy and show-note markdown should be returned as ready-to-copy blocks and also persisted via `hub_write` — do not fire external email or CRM tools; delivery is the user's responsibility.
- For monetization / CPM math, keep computations inline in the strategy doc; do not synthesize sponsorship rates the user did not provide.
