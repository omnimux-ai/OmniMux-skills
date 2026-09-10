# Example Case Notes

## Purpose
This file explains how the example inputs and outputs in the `examples/` directory were designed, what each one demonstrates, and how they should be used when implementing or testing the public UGC Commerce Video Skill package.

These are not authoritative performance truths.
They are reference-quality examples meant to show:
- how the schemas can be populated
- how prompt modules and templates connect together
- how structured outputs should look in realistic ecommerce use cases
- how commercial reasoning can be reflected in machine-readable and human-readable formats at the same time

---

## Included Example Files

### 1. `analysis_input.json`
This file shows a sample **content analysis input**.

It demonstrates:
- how to provide a reference video object
- how product context can be included even when the task is analysis
- how audience context improves the quality of commercial diagnosis
- how style, platform, and CTA context can shape interpretation

This example uses a:
- creator-led skincare video
- TikTok-style vertical format
- direct-response objective
- moderate-skepticism beauty audience

The sample is intentionally simple enough to read quickly, but rich enough to support meaningful analysis.

---

### 2. `analysis_output.json`
This file shows a sample **content analysis output**.

It demonstrates:
- section-by-section commercial video breakdown
- hook diagnosis
- selling-point extraction
- proof analysis
- objection-handling review
- pacing and product-visibility diagnosis
- CTA evaluation
- priority recommendations

This output is designed to reflect the `content_analysis.schema.json` structure while still being readable by a strategist, marketer, or creator.

Important design choice:
The analysis is written as **commercial interpretation**, not just video description.
That means each section explains what the video is doing from a persuasion perspective.

---

### 3. `script_input.json`
This file shows a sample **script planning input**.

It demonstrates:
- how to describe a product in structured form
- how to include audience pain points and desires
- how to provide proof assets available to the creator
- how to include desired hooks, CTA preference, and production constraints
- how to give enough business context for the script to be commercially grounded

This example was designed around:
- a beauty/skincare product
- a lightweight creator-led UGC format
- a direct-click objective
- short-form TikTok creative

The example intentionally includes both:
- structured product data
- soft creative constraints

This helps show how the planning workflow balances persuasion logic with execution reality.

---

### 4. `script_output.json`
This file shows a sample **script planning output**.

It demonstrates:
- angle generation and selection
- hook option development
- message hierarchy
- beat-by-beat script structure
- proof planning
- objection-handling integration
- CTA strategy
- execution notes
- testable variations

The output is written so it can serve multiple roles:
- script draft
- creator brief
- strategic review layer
- input for storyboard planning
- input for prompt conversion

Important design choice:
The output does not only contain final lines.
It also explains **why the script is structured that way**.

That is intentional.
In commercial workflows, a reusable system should expose reasoning structure, not just final copy.

---

### 5. `storyboard_input.json`
This file shows a sample **storyboard planning input**.

It demonstrates:
- how a finished script can become the source for storyboard creation
- how product, audience, and production constraints still matter at the storyboard stage
- how simple filming conditions should influence scene planning
- how style and creator presence stay important in visual translation

This example keeps the same skincare product and audience from the script example so the package shows continuity across stages.

That continuity is useful because it demonstrates the expected workflow chain:
**product info → script → storyboard → prompt**

---

### 6. `storyboard_output.json`
This file shows a sample **storyboard planning output**.

It demonstrates:
- top-level storyboard summary
- hook scene planning
- product visibility planning
- proof mapping
- objection-handling scenes
- overlay strategy
- pacing logic
- CTA ending design
- practical production notes

Important design choice:
The storyboard scenes are written as **commercial scenes**, not purely cinematic scenes.

Each scene has a job.
That is core to the philosophy of this skill package.

This file is useful as:
- a visual planning reference
- a creator shooting guide
- a basis for AI prompt conversion
- a briefing layer for editors or strategists

---

## Why the Example Uses Beauty / Skincare
The sample use case was chosen because beauty/skincare is a strong demonstration category for this skill package.

It naturally supports:
- visible before-and-after logic
- texture-based proof
- routine integration
- creator-led recommendation
- low-friction UGC formats
- direct ecommerce conversion use cases

It also makes it easier to demonstrate:
- product visibility
- proof timing
- emotional payoff
- skepticism handling

That said, the example structure is not limited to beauty.
The same workflow can be adapted to:
- fashion
- home goods
- food and wellness
- electronics
- cleaning products
- convenience tools
- lifestyle accessories

---

## How the Example Files Connect

### Flow 1: Analysis Path
`analysis_input.json`
→ used with content analysis logic
→ produces `analysis_output.json`

This path is useful when the user already has a reference video and wants diagnosis.

---

### Flow 2: Creation Path
`script_input.json`
→ used with script planning logic
→ produces `script_output.json`

Then:

`script_output.json` + production context
→ feeds storyboard planning
→ produces `storyboard_output.json`

This path is useful when the user wants to create original content from product information.

---

### Flow 3: Expanded Production Path
Though not yet included in example JSONs here, the intended next step would be:

`storyboard_output.json`
→ converted using prompt conversion logic
→ becomes a `video_prompt`-style output

This is the natural bridge into AI video generation.

---

## What These Examples Demonstrate Structurally

### 1. Commercial intent is always explicit
Each example tries to make the business purpose visible:
- conversion
- proof
- objection reduction
- product understanding
- CTA movement

This helps keep the system grounded in ecommerce, not general creative writing.

---

### 2. Outputs are dual-use
Each output is designed to work for both:
- human operators
- structured systems

This means they contain:
- readable strategy explanations
- machine-friendly structure
- consistent fields
- practical next-step usability

---

### 3. Reasoning is embedded, not hidden
The examples show that a good implementation should not only generate outcomes.
It should also preserve:
- strategic rationale
- proof logic
- scene purpose
- testing intent
- execution risks

This makes the workflow easier to audit, improve, and reuse.

---

### 4. The system is modular
The examples are meant to prove that:
- schemas
- prompts
- templates
- examples

can all work together cleanly.

A product team can:
- use the prompt modules for agent behavior
- use the schemas for validation
- use the templates for human-facing output
- use the example files for testing and onboarding

---

## How to Use These Examples in Practice

### For Prompt / Agent Designers
Use these examples to check whether your prompt behavior produces outputs that:
- match the expected structure
- include commercial reasoning
- stay concise but useful
- preserve proof and CTA logic

---

### For Backend / Schema Implementers
Use these examples to validate:
- field compatibility
- nested object structure
- enum usefulness
- minimum viable payload design
- serialization and storage behavior

---

### For Product / UX Teams
Use these examples to understand:
- what output quality should feel like
- what level of detail users may need
- how creators or sellers might consume the deliverables
- how an analysis answer differs from a script answer or storyboard answer

---

### For QA / Evaluation Teams
Use these examples to build checks for:
- hook clarity
- proof visibility
- product understanding
- objection handling
- CTA quality
- output completeness
- consistency between related files

---

## Suggested Future Example Files
If this package continues to expand, useful future example files may include:

- `video_prompt_input.json`
- `video_prompt_output.json`
- `variant_plan_input.json`
- `variant_plan_output.json`
- `reference_adaptation_input.json`
- `reference_adaptation_output.json`
- `cta_optimization_input.json`
- `cta_optimization_output.json`

These would make the package feel more complete and provide end-to-end coverage across all core workflows.

---

## Final Note
The examples in this folder are not meant to be “perfect ad creative.”
They are meant to be **clear, implementation-friendly reference cases** that show how commercial short-form video logic can be structured, explained, and passed between workflow stages.

Their real purpose is to reduce ambiguity for:
- builders
- prompt designers
- integrators
- evaluators
- creative operators

A strong skill package is easier to adopt when its examples are not only correct, but also instructive.
