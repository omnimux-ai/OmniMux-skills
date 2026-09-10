# Workflow Guide

## Purpose
This document explains the end-to-end workflow of the public UGC Commerce Video Skill package.

The goal of the workflow is to turn short-form ecommerce video requests into structured, commercially useful outputs that can support:
- analysis
- scripting
- visual planning
- prompt generation
- creative adaptation
- testing

This guide explains how the different modules, schemas, templates, and example files connect together.

---

## 1. Workflow Philosophy

The workflow is built around one core idea:

**Short-form ecommerce video is not just creative content. It is structured persuasion.**

That means every workflow should help answer four commercial questions:

1. Why would the viewer stop?
2. Why would they understand the product quickly?
3. Why would they believe the promise?
4. Why would they take action?

Every stage of the workflow should strengthen one or more of these outcomes.

---

## 2. High-Level Workflow Modes

The skill package supports two main types of work:

### A. Diagnostic Work
Use this when the user already has:
- an existing video
- a competitor reference
- a creator ad
- a winning example
- a draft asset that needs improvement

Typical outputs:
- breakdown
- analysis
- diagnosis
- adaptation plan
- recommendations

### B. Constructive Work
Use this when the user needs to create something new:
- a selling script
- a storyboard
- an AI video prompt
- multiple test variants
- a full video concept pipeline

Typical outputs:
- script
- storyboard
- prompt
- CTA set
- variant plan

---

## 3. Primary Workflow Entry Points

The public skill package is designed around several main task entry points.

### 3.1 Content Analysis
Entry when the user wants to understand an existing video.

Typical starting inputs:
- reference video link
- uploaded video
- rough summary of a video
- competitor content

Goal:
Explain how the video works commercially and what can be improved.

Output:
- analysis report
- section breakdown
- hook diagnosis
- proof review
- CTA review
- recommendations

---

### 3.2 Script Planning
Entry when the user wants a new short-form ecommerce script.

Typical starting inputs:
- product info
- target audience
- creative goal
- product proof assets
- preferred tone

Goal:
Turn product value into a short, persuasive, creator-friendly script.

Output:
- angle selection
- hook options
- full script
- proof plan
- objection handling plan
- CTA variants

---

### 3.3 Storyboard Planning
Entry when the user needs a visual execution plan.

Typical starting inputs:
- product info
- script
- creative angle
- production constraints

Goal:
Translate selling logic into scene-by-scene execution.

Output:
- storyboard summary
- scene breakdown
- proof scenes
- overlay plan
- pacing notes
- CTA ending plan

---

### 3.4 Prompt Conversion
Entry when the user wants AI-video generation readiness.

Typical starting inputs:
- script
- storyboard
- concept brief
- target model
- style preferences

Goal:
Convert commercial video logic into model-usable visual instructions.

Output:
- prompt objective
- scene logic summary
- main prompt
- constraints
- negative constraints
- optional prompt variants

---

### 3.5 Reference Video Adaptation
Entry when the user wants to build an original concept inspired by an existing video.

Typical starting inputs:
- reference video
- user product info
- audience
- brand or creator tone
- desired production goal

Goal:
Transfer the strategic engine of the reference without copying its surface expression.

Output:
- reference logic breakdown
- fit assessment
- transferable elements
- must-change elements
- original concept variants
- recommended direction

---

### 3.6 Variation Planning
Entry when the user wants structured creative testing rather than one single answer.

Typical starting inputs:
- product info
- audience
- current concept
- testing goal
- proof constraints

Goal:
Create a set of controlled creative variants that can reveal meaningful performance insights.

Output:
- testing summary
- shared core
- variation axes
- variant set
- test order
- decision guidance

---

## 4. Core Workflow Sequence

Even though users may enter from different points, the internal workflow usually follows a common logic chain.

### Step 1: Understand the request
Identify:
- what the user wants
- what stage of content development they are in
- whether they need analysis, creation, adaptation, or prompt conversion
- whether they need one output or many

This routing step is handled by the task router.

---

### Step 2: Clarify the commercial objective
Before producing any output, define what the content must do.

Possible objectives:
- direct conversion
- product education
- creator recommendation trust
- objection reduction
- problem-solution selling
- comparison
- awareness with commercial intent
- test planning

This objective shapes all downstream decisions.

---

### Step 3: Normalize product and audience context
Where relevant, identify:
- what the product is
- who the target audience is
- what problem or desire matters most
- what friction or skepticism exists
- what proof is realistically available

Without this step, the workflow risks becoming generic.

---

### Step 4: Define the persuasion structure
No matter which output type is needed, the system should identify the persuasion chain.

Common short-form chain:
- hook
- relevance
- reveal
- proof
- objection reduction
- CTA

Not every output uses these labels explicitly, but most effective ecommerce videos depend on this logic.

---

### Step 5: Generate the requested layer
After the structure is clear, build the specific requested output:
- analysis
- script
- storyboard
- prompt
- adaptation plan
- variants

This is the layer most visible to the user.

---

### Step 6: Preserve downstream usability
Every output should help the next production step.

Examples:
- analysis should reveal what to fix
- scripts should be easy to storyboard
- storyboards should be easy to prompt
- prompts should be ready for generation
- variant plans should be ready for testing

This skill package is designed as a workflow system, not as isolated answers.

---

## 5. Typical Workflow Chains

### 5.1 Analysis Chain
**Use when the user already has a reference video.**

Input:
- video link or file
- optional product or audience context

Flow:
1. route to content analysis
2. break video into functional sections
3. analyze hook, proof, pacing, CTA
4. generate recommendations

Outputs:
- analysis report
- possible improvement strategy
- possible adaptation starting point

---

### 5.2 Creation Chain
**Use when the user wants to create a new video from product info.**

Input:
- product info
- audience
- goal
- creator style

Flow:
1. route to script planning
2. choose angle
3. write script
4. route to storyboard planning
5. convert script into scene plan
6. optionally route to prompt conversion

Outputs:
- script
- storyboard
- prompt

This is one of the most common and highest-value workflows.

---

### 5.3 Adaptation Chain
**Use when the user wants a new video inspired by an existing one.**

Input:
- reference video
- user product
- audience
- goal

Flow:
1. route to reference adaptation
2. identify strategic engine
3. assess fit
4. create original concepts
5. choose a direction
6. optionally generate script / storyboard / prompt

Outputs:
- adaptation plan
- script direction
- storyboard direction
- generation prompt

---

### 5.4 Testing Chain
**Use when the user wants multiple directions or A/B testing support.**

Input:
- product info
- current concept or goal
- audience
- metric or testing objective

Flow:
1. route to variation planning
2. establish shared core
3. define test axes
4. generate variants
5. recommend test order
6. optionally expand best variant into script or storyboard

Outputs:
- testing plan
- concept variants
- hypotheses
- production priorities

---

## 6. Module Interaction Map

### Router Layer
- `prompts/task_router.md`
- decides which workflow to apply

### Strategic Behavior Layer
- `prompts/system_prompt.md`
- defines overall behavior and priorities

### Specialized Prompt Modules
- `prompts/content_analysis.md`
- `prompts/script_planning.md`
- `prompts/storyboard_planning.md`
- `prompts/prompt_conversion.md`
- `prompts/recreation_strategy.md`
- `prompts/cta_framework.md`

These modules define how each task should be thought through.

### Schema Layer
- `schemas/input.schema.json`
- `schemas/output.schema.json`
- task-specific schemas

These make outputs machine-usable and enforce structure.

### Template Layer
- `templates/analyze_video.md`
- `templates/write_script.md`
- `templates/build_storyboard.md`
- `templates/convert_to_prompt.md`
- `templates/recreate_reference_video.md`
- `templates/generate_variants.md`

These make outputs easier to present consistently to users or systems.

### Example Layer
- `examples/*.json`
- `examples/case_notes.md`

These help implementers understand how the package works in practice.

---

## 7. Decision Points in the Workflow

### Decision Point 1: Analysis vs Creation
Ask:
- does the user want to understand an existing video?
- or do they want to build something new?

This determines whether to start with diagnostic or constructive flow.

---

### Decision Point 2: Single Output vs Multi-Step Chain
Ask:
- does the user only need a script?
- or do they need the full path from idea to prompt?

This determines whether the system returns one layer or orchestrates several connected stages.

---

### Decision Point 3: One Concept vs Variants
Ask:
- does the user want the strongest single answer?
- or do they want multiple angles for testing?

This determines whether the system prioritizes convergence or controlled exploration.

---

### Decision Point 4: Human Production vs AI Generation
Ask:
- will this be filmed by a creator?
- handed to an editor?
- turned into an AI prompt?
- used for all of the above?

This changes how specific visual planning and technical formatting must be.

---

## 8. Quality Control Across the Workflow

Every stage should be checked against the same commercial questions:

### Hook Quality
- does the opening create enough relevance, contrast, or curiosity?

### Product Clarity
- does the viewer understand what the product is and why it matters?

### Proof Quality
- is there enough visual or testimonial support for the claim?

### Objection Handling
- are likely hesitations addressed clearly enough?

### CTA Fit
- does the ending feel earned and actionable?

### Execution Readiness
- can the output actually be used by the next operator or system?

These are cross-stage standards.

---

## 9. Common Failure Modes Across the Workflow

### 9.1 Feature Dumping
Happens when product information is repeated without persuasion structure.

Fix:
Return to the main promise and viewer belief gap.

---

### 9.2 Over-Creative but Under-Commercial Concepts
Happens when outputs sound interesting but do not help the viewer understand or trust the product.

Fix:
Re-anchor in proof, product role, and action logic.

---

### 9.3 Weak Proof Translation
Happens when a script claims too much but the storyboard or prompt cannot show enough.

Fix:
Move proof earlier, simplify claims, or strengthen visible evidence.

---

### 9.4 Disconnected CTA
Happens when the ending asks for action without enough setup.

Fix:
Reconnect CTA to the strongest benefit or proof moment.

---

### 9.5 Workflow Breakage Between Stages
Happens when:
- the script is not visual enough for storyboarding
- the storyboard is not concrete enough for prompt conversion
- the prompt loses the product's commercial role

Fix:
Preserve structural continuity from one stage to the next.

---

## 10. Recommended Best Practices for Implementers

### For Prompt Designers
Keep modules focused and role-specific.
Do not overload one prompt with every possible task.

### For Product Teams
Expose the workflow as stages users can understand:
- analyze
- write
- storyboard
- prompt
- test

### For Engineers
Use schemas for validation and storage, but keep templates for user-facing readability.

### For Evaluators
Judge not only output quality, but stage-to-stage consistency and downstream usability.

---

## 11. Suggested End-to-End Example Path

A common high-value use case might look like this:

1. User provides product info
2. Route to script planning
3. Create hook options and final script
4. Route to storyboard planning
5. Build shot-by-shot structure
6. Route to prompt conversion
7. Produce model-ready AI video prompt
8. If needed, route to variant planning for testing alternative hooks or proof sequences

This is a model workflow for AI-assisted commerce video production.

---

## 12. Final Principle
The workflow exists to make short-form ecommerce video creation more structured, more consistent, and more commercially effective.

A good workflow does not just generate outputs.

It connects:
- strategy
- persuasion
- production
- testing
- generation readiness

into one reusable system.
