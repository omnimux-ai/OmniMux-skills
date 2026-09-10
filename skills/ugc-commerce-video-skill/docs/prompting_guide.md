# Prompting Guide

## Purpose
This document explains how to write effective prompts for AI video generation within the public UGC Commerce Video Skill package.

The goal of prompting in this system is not simply to create beautiful video language.
The goal is to turn short-form ecommerce logic into generation-ready instructions that preserve:
- product clarity
- persuasion structure
- visual proof
- creator authenticity when needed
- execution usefulness

This guide covers:
- how to think about prompt design for short-form commerce video
- how to turn product and script information into visible scene instructions
- how to maintain product consistency
- how to avoid weak or overly abstract prompts
- how to write prompts that are commercially useful, not just stylistically rich

---

## 1. Prompting Philosophy

A good prompt for short-form ecommerce video is not just descriptive.
It is operational.

That means a good prompt should help a video model understand:
- what the product is
- what should happen on screen
- what the viewer must notice
- what proof must appear
- what visual order matters
- what kind of style and realism is required

The prompt should preserve the reason the content exists:
**to help the viewer stop, understand, believe, and act.**

If the prompt becomes beautiful but commercially unclear, it has failed.

---

## 2. Core Prompting Rule

**Write what the model can show, not what the marketer hopes the viewer feels.**

Bad prompt language:
- “make it feel premium and effective”
- “show how amazing the product is”
- “make the viewer want it”
- “make it very engaging”

Better prompt language:
- “a creator applies a lightweight serum in a bathroom mirror and the skin looks visibly fresher and more hydrated after application”
- “close-up of the product texture absorbing quickly into skin without greasy residue”
- “the creator looks at the camera with a natural impressed reaction after the visible result”

The model can render:
- subjects
- objects
- actions
- expressions
- environments
- movement
- visual contrast
- texture
- sequencing

So prompts should be built from those elements.

---

## 3. What a Good Ecommerce Video Prompt Must Preserve

A strong commerce prompt should usually preserve:

### 3.1 Product identity
The viewer should know what the product is.

### 3.2 Product role
The product should be doing something useful in the scene.

### 3.3 Main promise
The most important benefit should be visually supported.

### 3.4 Proof
There should be an observable reason to believe the product claim.

### 3.5 Viewing clarity
The scene should be understandable quickly.

### 3.6 Format fit
The output should feel right for UGC, demo, comparison, or showcase depending on the use case.

---

## 4. Prompting Workflow

A reliable prompting workflow usually follows this order:

1. define the commercial objective
2. identify the product clearly
3. define the scene structure
4. convert claims into visible events
5. specify the subject and environment
6. add camera and pacing guidance
7. add product consistency constraints
8. add negative constraints where useful
9. package the final prompt cleanly

This order helps avoid vague prompt writing.

---

## 5. Start With the Objective

Before writing the prompt, clarify what the video is supposed to do.

Examples:
- direct conversion
- creator-style product recommendation
- before/after proof
- quick demo
- comparison
- product education
- routine integration
- short CTA-focused ad

Why this matters:
Different objectives require different prompt structures.

For example:
- a direct-response UGC ad may need fast hook clarity and creator realism
- a polished showcase may need cleaner lighting and product framing
- a comparison video may need stronger contrast logic

Do not write the same prompt style for every use case.

---

## 6. Define the Product Clearly

The product should not be visually underdefined.

A useful product definition may include:
- product category
- size or scale
- shape
- color
- material
- packaging
- use format
- what remains consistent across scenes

Example:
- “a small glass dropper bottle of lightweight facial serum with a soft neutral label, clear liquid texture, and clean skincare packaging”

This helps prevent generic product drift.

If the prompt is too vague, the model may invent the wrong object or mutate its appearance across shots.

---

## 7. Define the Product’s Job in the Scene

Do not only define what the product is.
Define what the product is doing.

Possible product roles:
- being introduced
- being applied
- being demonstrated
- being compared
- causing a visible result
- sitting inside a daily routine
- being recommended by a creator

This is critical for ecommerce prompting.
A product that only appears as decoration may not sell well.

---

## 8. Turn Claims Into Visual Events

This is one of the most important prompting rules.

### Claim:
“lightweight feel”

### Weak prompt:
- “show a lightweight skincare product”

### Better prompt:
- “the creator applies a few drops of serum to the skin and it absorbs quickly with no visible heaviness or greasy residue”

---

### Claim:
“easy to use”

### Better prompt:
- “the creator uses the product in one simple motion as part of a quick everyday routine”

---

### Claim:
“faster than the old way”

### Better prompt:
- “split visual contrast between the old multi-step method and the faster one-step product use”

---

### Claim:
“makes skin glow”

### Better prompt:
- “close-up of the skin after application with a visibly fresher, hydrated finish catching soft natural light”

The model cannot render “benefit” unless you convert it into a visible outcome.

---

## 9. Build Prompts With Scene Logic

Short-form ecommerce prompts usually work better when they follow scene logic instead of one long mood paragraph.

A common structure is:
- opening hook shot
- product context or reveal
- demo or use
- proof or visible result
- CTA-ending visual

Even if the final prompt is delivered as one paragraph, you should think in scene order.

Why this matters:
Short-form ecommerce content depends on progression.
The viewer needs to understand what comes first and why it matters.

---

## 10. Prompt Structure Patterns

### Pattern A: Paragraph Prompt
Best for:
- compact workflows
- simpler generation systems
- short concepts with clear sequence

Structure:
- one coherent paragraph describing scene progression

Strength:
Simple and portable

Risk:
Can become vague if the sequence is too dense

---

### Pattern B: Scene-Block Prompt
Best for:
- complex commercial logic
- clear multi-beat content
- storyboard-driven generation

Structure:
- Scene 1
- Scene 2
- Scene 3
- Scene 4

Strength:
More control over progression

Risk:
Can become too rigid if over-specified

---

### Pattern C: Hybrid Prompt
Best for:
- balancing structure and readability
- commerce prompts that need both flow and control

Structure:
- short objective summary
- scene logic
- integrated descriptive prompt
- constraints

Strength:
Often the most practical format for production-quality prompting

---

## 11. Subject and Creator Prompting

If a creator or human subject is present, define them usefully but not excessively.

Useful creator details:
- role
- general age range or vibe if necessary
- tone of behavior
- whether they speak to camera
- whether they demonstrate the product
- whether they react naturally

Examples:
- “a young female creator in a casual home vanity setting, speaking directly to camera in a natural, relatable UGC style”
- “a creator applying the product while looking at the mirror, then turning back to camera with a subtle impressed reaction”

Avoid overloading the prompt with unnecessary identity detail unless required.

Too much overconstraint can produce awkward or brittle outputs.

---

## 12. Environment Prompting

The environment should support the product use case.

Examples:
- bathroom mirror for skincare
- kitchen counter for food or utility demo
- desk setup for productivity tools
- bedroom or vanity for routine content
- simple home setting for creator-native UGC

Ask:
- does this setting help the viewer understand the product?
- does it feel natural for the use case?
- is it too busy?
- does it support trust?

The best setting is often not the fanciest one.
It is the one that makes the product easy to understand and believable to use.

---

## 13. Camera Prompting

Use camera direction to support clarity, not to impress with jargon.

Useful camera terms:
- close-up
- medium close-up
- macro detail
- handheld selfie framing
- front-facing creator shot
- over-the-shoulder demo
- natural push-in
- static product shot
- quick cut between before and after

Bad camera prompting often:
- uses too much film language without visual priority
- creates cinematic behavior that hurts product comprehension
- makes the sequence feel like a mood reel instead of commerce content

In most ecommerce prompts, camera choices should answer:
- what should the viewer notice?
- how quickly should they notice it?
- how intimate or practical should the shot feel?

---

## 14. Pacing Prompting

The prompt should often imply pacing.

Examples:
- “fast-moving short-form sequence”
- “quick creator-led hook followed by a clear product demo”
- “slightly longer hold on the post-application glow close-up so the result registers”
- “quick cut from problem state to product use to visible payoff”

Pacing is important because short-form commerce is highly sensitive to dead time.

A prompt that ignores pace may produce content that looks visually fine but commercially slow.

---

## 15. Product Consistency Rules

One of the biggest prompting problems in ecommerce generation is product drift.

To reduce drift:
- repeat the product category clearly
- mention shape, packaging, or color consistency
- keep the product’s role stable
- avoid unnecessary scene complexity that causes object mutation
- remind the model that the same product remains present across scenes

Useful consistency phrasing:
- “the same serum bottle appears consistently throughout the video”
- “keep the product packaging stable across all shots”
- “maintain consistent product shape, label placement, and color”

This matters more in commerce than in general creative video.

---

## 16. Negative Constraints

Negative constraints are useful when they solve likely errors.

Examples:
- no product morphing
- no unreadable packaging
- no extra fingers or distorted hands
- no cluttered background
- no overly cinematic darkness
- no exaggerated ad-gloss if the style should feel natural
- no unrelated props dominating the frame

Use them strategically, not excessively.

Too many negative constraints can make prompts noisy and harder to interpret.

---

## 17. UGC Prompting Rules

If the output should feel UGC-style, preserve:
- natural handheld framing
- casual environment
- realistic creator behavior
- believable product handling
- conversational energy
- simple, feed-native structure

Do not accidentally convert UGC into:
- glossy cinematic ad language
- luxury-brand visual styling
- overdesigned camera behavior
- artificial emotional performance

UGC prompts should feel:
- human
- direct
- practical
- specific
- lightly imperfect in a credible way

---

## 18. Common Prompt Failure Modes

### 18.1 Abstract Benefit Language
The prompt says what the product should “feel like” rather than what should be visible.

Fix:
Translate claims into actions, textures, or result shots.

---

### 18.2 Product Drift
The product changes appearance or role across the video.

Fix:
Strengthen product definition and consistency constraints.

---

### 18.3 Too Cinematic, Not Commercial
The prompt produces pretty scenes but weak selling structure.

Fix:
Re-center product visibility, proof, and message sequence.

---

### 18.4 No Proof Scene
The prompt describes product presence but not why the viewer should believe the claim.

Fix:
Add a visible result or demonstration beat.

---

### 18.5 Overloaded Prompt
Too many environments, actions, tones, and camera moves create model confusion.

Fix:
Reduce scene count, simplify, and prioritize.

---

### 18.6 Wrong Format Feel
A UGC concept becomes over-polished, or a polished concept becomes too raw.

Fix:
State the intended format clearly and align subject, camera, and environment to it.

---

## 19. Prompting by Workflow Stage

### In Script-to-Prompt Conversion
Preserve:
- hook
- product role
- key proof moment
- CTA-ending logic

### In Storyboard-to-Prompt Conversion
Preserve:
- scene order
- shot purpose
- visual emphasis
- product visibility logic

### In Reference Adaptation Prompting
Preserve:
- strategic engine
- proof logic
- pace and role of scenes

Avoid:
- carrying over protected or overly specific surface details

### In Variant Prompting
Change only the intended variable:
- hook style
- tone
- proof order
- scene emphasis
- CTA energy

Keep the shared core stable where needed.

---

## 20. Practical Prompt Checklist

Before finalizing a prompt, ask:

- Is the product clearly defined?
- Is the product doing something, not just appearing?
- Is the main claim converted into a visible event?
- Is there enough proof?
- Is the scene order understandable?
- Does the output fit the intended platform style?
- Does the human behavior feel natural if applicable?
- Are the camera instructions useful rather than decorative?
- Are product consistency constraints strong enough?
- Would this prompt generate a commercially useful video, not just a beautiful one?

If several answers are weak, revise before use.

---

## 21. Final Principle
A strong commerce video prompt is not a poem about a product.

It is a clear visual instruction system that tells a model:
- what matters
- what happens
- what must be believed
- what must stay consistent
- why the viewer should care

That is what makes prompting useful in a commercial workflow.
