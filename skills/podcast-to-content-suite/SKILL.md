---
name: podcast-to-content-suite
description: |
  Transform a podcast transcript into a comprehensive content marketing suite — SEO-optimized blog post, social media content for Twitter/X, LinkedIn, Instagram, Facebook, email newsletter, show notes, 3-5 audiogram clip scripts, and SEO elements (keywords, meta tags, schema markup). Input is a podcast transcript with timestamps; output is a complete cross-channel content ecosystem assembled from the `references/output-template.md`.
  Use whenever the user provides a podcast transcript, asks to repurpose a podcast episode, wants to convert audio into blog / social / newsletter content, or mentions podcast marketing or distribution.
trigger-words: [podcast to content, podcast repurposing, podcast transcript, blog from podcast, show notes, audiogram, podcast marketing, 播客套件, 播客二次加工, podcast distribution]
allowed-tools: [hub_read, hub_write, hub_save_file_to_session, question]
---

# Podcast to Content Suite

Convert a podcast episode into a complete content marketing ecosystem: blog post, social posts, newsletter, show notes, audiograms, and SEO elements.

## Contents

- `references/component-specs.md` — per-asset requirements, best practices, and examples
- `references/output-template.md` — full assembled output format with placeholders

## Workflow

### Step 1: Load skill reference files
Call `hub_read` on the two skill-shipped reference files (do not paraphrase from memory — templates are load-bearing):
- file: `references/component-specs.md`
- file: `references/output-template.md`

### Step 2: Locate the podcast transcript
Check whether the user attached a transcript file. If yes, call `hub_read` on it:
- file: `<transcript file path>`

If no transcript is attached, call `question`:
- question: "Please provide the podcast transcript — either a file path in the workspace, or paste it directly. Also tell me: episode title, guest name(s), publish date, and target audience."

Do NOT paste the transcript back into chat as a wall of text — read it, then work from the loaded content.

### Step 3: Analyze the transcript
Following `references/component-specs.md` section 1, identify:
- Main topic and subtopics
- 5-7 key insights
- Memorable quotes
- Statistics and data points
- Guest credentials
- Target audience
- Actionable advice
- Timestamps for major segments (preserve verbatim from the transcript)

### Step 4: Write the SEO-optimized blog post
Call `hub_write`:
- file: `./blog.md`
- content: 1200-2000 words, H1 with primary keyword, meta description, H2/H3 structure, embedded quotes, CTA (follow section 2 of component-specs)

Then call `hub_save_file_to_session`:
- file: `./blog.md`
- file_type: `text`

### Step 5: Write the social media content
Call `hub_write`:
- file: `./social.md`
- content: Twitter/X thread + LinkedIn post + Instagram caption + Facebook post (follow section 3)

Then call `hub_save_file_to_session`:
- file: `./social.md`
- file_type: `text`

### Step 6: Write the email newsletter
Call `hub_write`:
- file: `./newsletter.md`
- content: subject line variations (3-5), preview text, mobile-friendly body (follow section 4)

Then call `hub_save_file_to_session`:
- file: `./newsletter.md`
- file_type: `text`

### Step 7: Write the show notes
Call `hub_write`:
- file: `./show-notes.md`
- content: summary, guest bio, verbatim timestamps, resources mentioned, quotes, subscribe links (follow section 5)

Then call `hub_save_file_to_session`:
- file: `./show-notes.md`
- file_type: `text`

### Step 8: Write the audiogram scripts (scripts only, no rendering)
Call `hub_write`:
- file: `./audiograms.md`
- content: 3-5 clips, each 30-60 seconds, with verbatim timestamp excerpts + on-screen text (follow section 6)

Then call `hub_save_file_to_session`:
- file: `./audiograms.md`
- file_type: `text`

Do NOT attempt to render audio or video — this skill has no media tools. Actual audiogram production hands off to the user or a downstream video skill.

### Step 9: Extract SEO elements
Call `hub_write`:
- file: `./seo.md`
- content: primary/secondary keywords, meta tags, schema markup (JSON-LD), suggested internal links (follow section 7)

Then call `hub_save_file_to_session`:
- file: `./seo.md`
- file_type: `text`

### Step 10: Assemble the master output
Following `references/output-template.md`, produce a final assembled deliverable that references all six files above.

Call `hub_write`:
- file: `./podcast-suite-index.md`
- content: the assembled index following the template exactly, with links / summaries pointing to blog.md, social.md, newsletter.md, show-notes.md, audiograms.md, seo.md

Then call `hub_save_file_to_session`:
- file: `./podcast-suite-index.md`
- file_type: `text`

## Notes for Hub adaptation

- Load the two reference files (`references/component-specs.md`, `references/output-template.md`) via `hub_read` on skill activation; do not paraphrase from memory — the templates are load-bearing for correct output shape.
- Read the user-provided transcript with `hub_read` (do not paste it back into chat as a wall of text). If no transcript is attached, ask via `question` for either a file path or a paste, plus the episode title, guest name(s), publish date, and target audience.
- Write each deliverable as a separate markdown file in the current project/session workspace (`blog.md`, `social.md`, `newsletter.md`, `show-notes.md`, `audiograms.md`, `seo.md`) using `hub_write`, then register each with `hub_save_file_to_session` (`file_type: text`) so they appear in the workspace files panel for user editing.
- Audiogram deliverables are **scripts only** (transcript excerpt + timestamps + on-screen text). Do not attempt to render audio or video — this skill has no media tools; hand off actual audiogram production to the user or a downstream video skill.
- Preserve the original transcript's timestamps verbatim inside show notes and audiogram scripts; do not re-invent times.
