---
name: ugc-commerce-video-skill
description: >-
  Use when creating, analyzing, adapting, or testing short-form ecommerce UGC videos,
  including TikTok Shop ad breakdowns, conversion scripts, storyboards, AI video
  prompts, reference-video adaptation, hooks, CTAs, and creator briefs for TikTok,
  Reels, Shorts, or marketplace ads.
compatibility: Designed for Gxgen/Mastra Agent Skills runtime. SKILL.md is the only runtime entrypoint; SKILL.yaml is package metadata only.
metadata:
  package_id: ugc-commerce-video-skill
  catalog_id: ugc-commerce-video-skill
  display_name: UGC Commerce Video Skill
  version: "1.0.0"
  category: short_form_ecommerce_video
  publicationStatus: public
  codeExecutionCore: false
---

# UGC Commerce Video Skill Documentation

## 1. Skill Name
**UGC Commerce Video Skill**

---

## 2. Skill Purpose
This skill is designed to support the creation, analysis, and adaptation of short-form ecommerce videos, especially for TikTok-style environments where conversion, retention, product clarity, and native-feeling content all matter at the same time.

The skill helps transform:
- product information
- creative goals
- reference videos
- storyboard ideas
- rough scripts

into structured commercial video outputs that are usable in production or AI generation workflows.

## Publication Governance

This skill is a public business-methodology skill, not a code-execution skill. The publication readiness record lives in [`PUBLICATION-GOVERNANCE.md`](PUBLICATION-GOVERNANCE.md).

Do not turn UGC commerce video planning into a fixed workflow, required-next tool, sticky skill state, or video/image generation completion gate. Generation, persistence, export, or production delivery requires explicit user intent and real tool evidence.

---

## 3. What This Skill Does
This skill can be used to:

1. Analyze an existing commerce video
2. Diagnose why a video works or underperforms
3. Plan a conversion-oriented UGC script
4. Create a scene-by-scene storyboard
5. Convert a script into an AI-video prompt
6. Rebuild a reference video into an original product-fit concept
7. Generate hook and CTA variants for testing

It is especially useful when the user needs **practical outputs**, not just abstract ideas.

---

## 4. Core Philosophy

### 4.1 Commercial intent comes first
This skill is optimized for short-form selling performance, not general creative writing.

### 4.2 Structure matters
The system assumes that effective short-form commerce content usually depends on clear sequencing:
- hook
- relevance
- product reveal
- proof
- objection reduction
- CTA

### 4.3 Platform-native tone matters
Outputs should feel appropriate for TikTok-style UGC or short-form ad content, rather than sounding like traditional polished advertising copy.

### 4.4 Product visibility matters
The product should not be buried under concept language.
Good outputs help the viewer quickly understand what the product is and why it matters.

### 4.5 Proof matters more than hype
A useful script or analysis must address whether the content shows enough evidence, demo clarity, or believable user experience to reduce skepticism.

---

## 5. Main Capability Areas

## 5.1 Content Analysis
This mode breaks down an existing short-form video and evaluates:
- opening strength
- section structure
- selling points
- proof quality
- objection handling
- pacing
- editing support
- CTA quality

Goal:
Explain how the video works and how to improve it.

---

## 5.2 Script Planning
This mode creates a short-form ecommerce video script based on:
- product info
- target audience
- business objective
- desired style

Goal:
Generate a conversion-oriented script with a clear hook, proof sequence, and CTA.

---

## 5.3 Storyboard Planning
This mode turns a concept or script into shot-by-shot visual logic.

Goal:
Make the content easier to shoot, edit, delegate, or generate.

---

## 5.4 Prompt Conversion
This mode turns a script or storyboard into a model-aware AI video prompt.

Goal:
Preserve commercial logic while improving generation readiness.

---

## 5.5 Reference Video Adaptation
This mode studies a reference video and rebuilds it into a concept that fits another product or brand.

Goal:
Preserve useful selling mechanics without depending on surface imitation.

---

## 5.6 Creative Variation Planning
This mode creates alternative hooks, angles, CTAs, scene structures, or testing variants.

Goal:
Support experimentation and creative iteration.

---

## 6. Inputs

### Minimum Inputs
At least one of the following:
- product description
- video link or file
- script draft
- storyboard draft
- creative direction

### Recommended Inputs
- target audience
- main problem or desire
- main product benefit
- platform
- length target
- offer details
- objection notes
- creator style
- visual references

### Optional Inputs
- product images
- customer reviews
- competitor references
- region
- campaign stage
- target AI model
- compliance notes

---

## 7. Outputs

Depending on the task, this skill may produce:

### Analysis Deliverables
- structured breakdown
- hook diagnosis
- strengths and weaknesses
- likely retention issues
- CTA critique
- recommendations

### Planning Deliverables
- angle options
- full short script
- scene guidance
- subtitle ideas
- CTA variants

### Storyboard Deliverables
- shot list
- scene purpose
- visual action notes
- product visibility rules
- pacing guidance
- transitions

### Prompt Deliverables
- final prompt
- scene timing hints
- style constraints
- product consistency rules
- alternate prompt variants

### Recreation Deliverables
- reference logic summary
- adaptation feasibility
- original variant concepts
- production or generation handoff materials

---

## 8. Standard Workflow

### Step 1: Determine task mode
Identify whether the user needs analysis, script creation, storyboarding, prompt conversion, or adaptation.

### Step 2: Understand the selling job
Clarify what the video must accomplish:
- stop the scroll
- explain the product
- create desire
- overcome doubt
- drive action

### Step 3: Identify the primary audience
Determine who the message is for and what belief or hesitation must change.

### Step 4: Build the logic chain
Organize:
- attention trigger
- relevance signal
- main promise
- proof
- objection response
- CTA

### Step 5: Format the output for execution
Make sure the final answer is usable for filming, editing, briefing, or AI generation.

---

## 9. Quality Standards

A strong output should:
- make the first few seconds count
- center one dominant message
- include believable proof
- reduce likely skepticism
- use clear and direct language
- make the product easy to understand
- lead naturally to action
- be realistic to produce

---

## 10. Common Failure Modes

### 10.1 Too many messages in one short video
The content becomes unfocused and weak.

### 10.2 Hook is generic
The viewer has no reason to stop.

### 10.3 Product appears too late
The content wastes valuable attention early.

### 10.4 Claims are not visually supported
The content says benefits without showing them.

### 10.5 CTA feels disconnected
The ending asks for action without enough persuasive buildup.

### 10.6 Script sounds unnatural
The voice feels like brand copy rather than creator-native language.

### 10.7 Output is hard to execute
The concept may read well but fail in production.

---

## 11. Best Use Cases
This skill performs especially well for:
- TikTok Shop product videos
- UGC product recommendation videos
- creator brief development
- product demo ads
- before/after concept planning
- performance creative testing
- AI-assisted short video production

---

## 12. Recommended Companion Modules
This skill pairs well with:
- image generation workflows
- product image planning
- competitor research
- trend analysis
- ecommerce listing strategy
- creator sourcing workflows

---

## 13. Final Principle
The purpose of this skill is not to produce content that merely sounds creative.

Its purpose is to convert selling logic into platform-native, structured, believable, and executable short-form video outputs.
