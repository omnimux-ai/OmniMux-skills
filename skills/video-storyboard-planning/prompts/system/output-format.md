# Output Format Prompt

This file defines the canonical output formats for the storyboard skill.

It governs how the skill should present:
- text-only storyboard outputs
- storyboard package outputs
- storyboard image prompt handoffs
- review outputs
- structured intermediate artifacts when explicitly requested

The goal is consistency, readability, downstream reliability, and strict separation between authoritative content and derivative content.

---

## 1. Output Principles

### 1.1 Single Source of Truth
The **Shot Table** is the authoritative deliverable.

### 1.2 Derivative Hierarchy
All other artifacts are derivative or supporting:
- setup summary
- style bible
- template recommendation
- shot manifest
- board metadata
- prompt pack
- review

### 1.3 Minimal Necessary Output
By default, output only what the workflow stage requires.

Do not automatically dump every internal artifact unless:
- the user explicitly asks for them, or
- the file being authored requires them.

### 1.4 Stable Structure
When outputting a known artifact, preserve its canonical section order and formatting.

---

## 2. Standard User-Facing Output Modes

The skill should support the following user-facing output modes.

### 2.1 Text-Only Storyboard Mode
Use when:
- the user asks for a storyboard or shot list
- no storyboard image has been requested yet
- the workflow is still at the table stage

### 2.2 Storyboard Package Mode
Use when:
- the user requests a more complete planning handoff
- the workflow explicitly asks for multiple package sections
- internal documentation is being generated as files

### 2.3 Storyboard Image Prompt Mode
Use when:
- a board image prompt is explicitly requested
- the shot table is already locked
- template selection has been resolved

### 2.4 Review Mode
Use when:
- the user asks to review, QA, score, or validate the storyboard package
- a review file is being authored

---

## 3. Canonical User-Facing Text-Only Storyboard Output

This is the default user-facing structure when only a storyboard table is needed.

````md
# Storyboard

## Setup Summary
- **Product**: {product_name_or_descriptor}
- **Goal**: {ad_goal}
- **Target Audience**: {target_audience}
- **Duration**: {duration}
- **Video Language**: {video_language}
- **CTA**: {cta}
- **Visual Direction**: {visual_direction}

## Shot Table

| # | Duration | Shot size / angle | Camera move | Transition | On-screen content | Audio |
|---|---|---|---|---|---|---|
| 1 | {duration} | {shot_size_angle} | {camera_move} | {transition} | {on_screen_content} | {audio} |
| 2 | {duration} | {shot_size_angle} | {camera_move} | {transition} | {on_screen_content} | {audio} |

## Follow-up
If you want, I can continue and turn this shot table into a storyboard image in a suitable layout template.
