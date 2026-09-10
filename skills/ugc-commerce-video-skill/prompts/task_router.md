# Task Router: UGC Commerce Video Skill

## Purpose
This file defines how the UGC Commerce Video Specialist should classify incoming requests and choose the correct short-form commerce video workflow.

The goal of routing is to avoid treating every short-video commerce request the same way.
A request to diagnose a winning ad, write a UGC script, convert a storyboard into an AI video prompt, or adapt a reference video requires different analysis depth, output structure, and execution detail.

This router should help the agent:
- identify the user's real commercial objective
- classify the task into the most appropriate workflow
- determine what output format is needed
- decide whether the user needs analysis, planning, adaptation, prompt conversion, or testing variants
- reduce ambiguity before writing the final answer

Routing is a reasoning layer only.
It does not call tools, generate final media, upload files, or execute an external workflow.

---

## Core Routing Principle
Do not route based only on surface wording such as "analyze," "script," "prompt," "storyboard," "recreate," or "make a video like this."

Route based on the actual production objective.

Always ask:
- Is the user trying to understand an existing video, create a new selling asset, or prepare generation instructions?
- Do they have product information, a reference video, a script draft, a storyboard, or only a creative goal?
- Is the main job retention, product clarity, proof, objection handling, CTA, or variation testing?
- Does the user need one output, a staged workflow, or multiple testable variants?
- Is the requested output meant for creators, editors, marketers, or AI video generation systems?

Choose the workflow based on functional intent, not just vocabulary.

---

## Primary Task Types

### 1. Content Analysis / Video Diagnosis
#### Definition
The user provides a video, video link, transcript, script, storyboard, or described short-form commerce creative and wants to understand how it works, why it performs, or why it underperforms.

#### Typical User Signals
- "Analyze this video"
- "Break down this TikTok ad"
- "Why does this short video convert?"
- "Tell me what works and what does not"
- "Diagnose this UGC ad"
- "What should I improve in this script/video?"

#### Primary Goal
Diagnose the commercial structure of the content and identify the highest-impact improvements.

#### Recommended Workflow
1. Establish the source context and likely commercial objective
2. Segment the content by function, not only by shots
3. Analyze the first 1-3 seconds as the hook zone
4. Extract the selling points and message hierarchy
5. Separate claims from proof
6. Review objection handling, pacing, product visibility, and CTA
7. Deliver prioritized recommendations tied to conversion impact

#### Required Output
- objective summary
- section breakdown
- hook diagnosis
- selling logic analysis
- proof and objection review
- pacing and product visibility review
- CTA review
- top improvement recommendations

#### Notes
Use this route when the user needs understanding before creating or revising content.
Do not rewrite the whole concept unless the user asks for revision or next-step planning.

---

### 2. Script Planning
#### Definition
The user wants a conversion-oriented short-form UGC script based on product information, audience, proof assets, and business objective.

#### Typical User Signals
- "Write a TikTok Shop script"
- "Create a UGC script for this product"
- "Turn this product info into a selling video"
- "Give me hook, body, proof, and CTA"
- "Write a product seeding/review script"
- "Make this sound more creator-native"

#### Primary Goal
Turn product value into a short, believable persuasion flow that can be spoken, filmed, or handed to a creator.

#### Recommended Workflow
1. Normalize product, audience, offer, platform, and constraints
2. Define the main commercial job of the video
3. Identify the audience belief gap and strongest hesitation
4. Choose one dominant promise
5. Generate or select a creative angle
6. Write the hook, body, proof moment, objection response, and CTA
7. Add visual guidance, overlay notes, and optional variants

#### Required Output
- audience and objective summary
- creative angle
- hook options when useful
- full script or structured script beats
- visual guidance
- subtitle or overlay suggestions
- CTA variants
- proof and compliance notes

#### Notes
Use this route when the user needs words, message logic, or a shootable script.
Do not start from feature dumping; start from the selling job.

---

### 3. Storyboard Planning
#### Definition
The user wants a script, product concept, selling angle, or rough creative direction turned into a scene-by-scene visual plan.

#### Typical User Signals
- "Create a storyboard"
- "Turn this script into shots"
- "Give me a scene plan"
- "Make this easier to shoot"
- "Plan the visuals for this UGC ad"
- "Prepare this for production or AI generation"

#### Primary Goal
Translate the persuasion logic into visual execution so the content can be filmed, edited, briefed, or converted into prompts.

#### Recommended Workflow
1. Identify the source input: product idea, script, angle, reference, or draft storyboard
2. Define the visual persuasion chain
3. Decide scene count and pacing density
4. Plan the hook shot and early product visibility
5. Map claims to visual proof
6. Assign each scene a commercial purpose
7. Add overlay, camera, transition, and CTA notes
8. Check execution feasibility

#### Required Output
- video goal summary
- storyboard overview
- scene-by-scene breakdown
- product visibility notes
- proof placement notes
- text overlay suggestions
- pacing and production notes
- CTA ending note

#### Notes
Use this route when the user needs a visual plan, not just lines.
Every scene should have a job.

---

### 4. Prompt Conversion
#### Definition
The user wants a script, storyboard, reference structure, or commercial concept converted into a generation-ready AI video prompt.

#### Typical User Signals
- "Convert this script into a video prompt"
- "Make this prompt-ready"
- "Turn this storyboard into an AI video prompt"
- "Adapt this for Veo/Sora/Seedance"
- "Write a prompt for this UGC video"
- "Make this concept usable for generation"

#### Primary Goal
Translate commercial video logic into concrete visual instructions while preserving product clarity, proof logic, sequence, and platform-native realism.

#### Recommended Workflow
1. Parse the source material and identify the selling chain
2. Define the generation objective and target model if provided
3. Convert abstract claims into visible events
4. Define product appearance and consistency requirements
5. Define setting, subject behavior, camera language, and pacing
6. Add style and realism constraints
7. Add negative constraints only when they reduce real generation risk
8. Package the final prompt and optional variants

#### Required Output
- prompt objective
- visual strategy summary
- main prompt
- scene or beat structure when needed
- product consistency constraints
- motion, framing, and realism notes
- optional variants

#### Notes
Use this route when the deliverable is text for an AI video model.
This route does not generate the final video; it prepares instructions.

---

### 5. Reference Video Adaptation
#### Definition
The user provides or describes a reference video and wants to adapt its useful selling logic into an original concept for another product, brand, or audience.

#### Typical User Signals
- "Make a video like this for my product"
- "Adapt this winning ad"
- "Recreate this structure but make it original"
- "Use this competitor video as inspiration"
- "Extract the logic from this reference"
- "Keep the hook style but change the execution"

#### Primary Goal
Preserve transferable commercial logic while avoiding shallow imitation and rebuilding the concept around the user's product truth.

#### Recommended Workflow
1. Identify the reference type and likely commercial job
2. Break down the reference by hook, reveal, proof, pacing, and CTA
3. Identify what actually makes it work
4. Separate transferable structure from non-transferable surface expression
5. Test product fit and proof feasibility
6. Define what must change
7. Generate original adaptation directions
8. Recommend the strongest direction and next-step handoff

#### Required Output
- reference summary
- strategic breakdown
- transferable vs must-change elements
- product fit assessment
- adaptation directions
- recommended direction
- next-step handoff for script, storyboard, or prompt

#### Notes
Use this route when the user wants inspiration from an existing video.
Do not copy exact lines, creator identity, shot order, or brand-specific behavior.

---

### 6. CTA Optimization
#### Definition
The user wants to improve, create, compare, or adapt calls to action for a short-form commerce video.

#### Typical User Signals
- "Write a CTA"
- "Improve the ending"
- "Make the CTA stronger"
- "Give me CTA options"
- "This ending feels weak"
- "Make it less hard-sell"

#### Primary Goal
Turn the viewer's attention, belief, and desire into a clear next action with a reason to act.

#### Recommended Workflow
1. Identify the video's commercial objective
2. Determine audience warmth and likely readiness
3. Identify the strongest reason to act
4. Choose CTA type: direct, benefit-led, problem-relief, curiosity, urgency, or trust-led
5. Match CTA tone to the format and creator style
6. Make the action explicit
7. Add the action reason
8. Provide variants when useful

#### Required Output
- CTA objective
- CTA strategy
- primary CTA
- variant options
- usage note or fit guidance

#### Notes
Use this route when the rest of the video is mostly defined and the closing action is the main problem.
If the body does not earn the CTA, state what must be strengthened first.

---

### 7. Hook Generation / Hook Repair
#### Definition
The user wants new hooks, a hook diagnosis, or a stronger first 1-3 seconds for a short-form commerce video.

#### Typical User Signals
- "Give me hooks"
- "Improve the opening"
- "The first 3 seconds are weak"
- "Make this scroll-stopping"
- "Write hook options"
- "Why is this hook not working?"

#### Primary Goal
Create or improve the opening so the target viewer has a fast reason to stop, understand relevance, and continue watching.

#### Recommended Workflow
1. Identify target audience and pain/result/desire
2. Identify the strongest hook mechanism
3. Check whether the product or problem can be shown early
4. Generate hook options across different mechanisms
5. Label each hook by intent and best use case
6. Add visual or overlay support where useful
7. Recommend the strongest option

#### Required Output
- hook strategy
- hook options
- rationale for each option
- visual or overlay cue
- recommended hook

#### Notes
Use this route when the opening is the user's biggest concern.
Do not create catchy lines that fail to identify relevance or selling direction.

---

### 8. Creative Variation Planning
#### Definition
The user wants multiple testable versions of hooks, angles, scripts, CTAs, scene structures, proof order, or prompt directions.

#### Typical User Signals
- "Give me variants"
- "Create 5 angles"
- "Make A/B test versions"
- "Give me different hook directions"
- "Generate multiple script concepts"
- "How should I test this product?"

#### Primary Goal
Produce meaningfully different options for creative testing without losing product truth or message clarity.

#### Recommended Workflow
1. Define the fixed product truth and fixed constraints
2. Identify the variable dimension: hook, angle, proof, CTA, format, creator stance, or pacing
3. Generate distinct variants rather than wording swaps
4. Explain what each variant tests
5. Identify proof requirements and likely risks
6. Recommend a testing priority

#### Required Output
- testing objective
- fixed assumptions
- variant set
- what each variant tests
- proof or production needs
- recommended priority

#### Notes
Use this route when the user wants structured experimentation rather than one final answer.
Variants should differ by strategy, not just adjective changes.

---

### 9. Creator Brief / Production Handoff
#### Definition
The user wants the strategy, script, or storyboard packaged into a creator-ready or editor-ready handoff.

#### Typical User Signals
- "Make this into a creator brief"
- "Give me filming instructions"
- "Prepare this for our editor"
- "What should the creator shoot?"
- "Turn this into a production brief"

#### Primary Goal
Convert the selling logic into practical instructions a creator, editor, or internal team can execute.

#### Recommended Workflow
1. Summarize the video objective and target audience
2. Define the required product claims and proof assets
3. List essential shots and optional shots
4. Provide spoken line or subtitle guidance
5. Define do-not-say and do-not-show constraints
6. Add pacing, tone, and CTA instructions
7. Provide a concise handoff checklist

#### Required Output
- creator brief summary
- required shots
- required proof
- script or talking points
- overlay and caption notes
- constraints
- handoff checklist

#### Notes
Use this route when the user needs operational production clarity rather than more creative ideation.

---

### 10. Planning-Only / Pre-Production Consultation
#### Definition
The user is still deciding direction and wants strategy, evaluation, or a recommended path before creating the final script, storyboard, or prompt.

#### Typical User Signals
- "What should I do with this product?"
- "Which angle is best?"
- "Help me plan the content"
- "What kind of video should I make?"
- "Should this be demo-led or testimonial-led?"
- "I am not ready for a full script yet"

#### Primary Goal
Help the user choose the strongest commercial direction before producing a final text deliverable.

#### Recommended Workflow
1. Clarify the product category, audience, and business goal
2. Identify likely buyer hesitation
3. Compare possible video formats and angles
4. Recommend the strongest direction
5. State what inputs are needed for the next step
6. Suggest the next workflow route

#### Required Output
- situation summary
- possible directions
- comparison
- recommendation
- required next inputs
- suggested next route

#### Notes
Use this route when the user is exploring.
Do not overproduce a full script when the strategy is not yet chosen.

---

## Secondary Routing Modifiers

Modifiers do not replace the primary task type.
They refine how the chosen workflow should be executed.

### Modifier A: Platform Context
If the platform is TikTok, TikTok Shop, Instagram Reels, YouTube Shorts, marketplace ads, or a product detail page, adjust:
- pacing assumptions
- CTA pressure
- overlay density
- creator-native language
- proof expectations
- offer visibility

### Modifier B: Audience Warmth
If the audience is cold, prioritize:
- fast relevance
- problem or result clarity
- lower-friction CTA
- earlier proof

If the audience is warm or retargeting, prioritize:
- offer clarity
- stronger CTA
- objection reduction
- comparison or urgency when justified

### Modifier C: Proof Availability
If proof assets are strong, build around them.

If proof assets are weak or absent:
- avoid inflated claims
- recommend specific proof to add
- reduce claim intensity
- use demonstration, specificity, or creator honesty where possible

### Modifier D: Compliance and Claim Sensitivity
If the product category has health, beauty, financial, safety, or regulated claims:
- avoid unsupported outcomes
- mark claims needing verification
- prefer observed experience over guaranteed results
- include a risk note when useful

### Modifier E: Downstream AI Video Use
If the output will feed an AI video model:
- make visuals concrete
- define product identity clearly
- keep scene count manageable
- specify motion and camera only when helpful
- avoid contradictory prompt details

### Modifier F: Reference Material Type
If the user provides a video, route by what they want from it:
- performance diagnosis -> Content Analysis
- selling structure transfer -> Reference Video Adaptation
- exact script extraction or rewrite -> Script Planning
- scene extraction -> Storyboard Planning
- prompt-ready conversion -> Prompt Conversion

Do not assume every reference means adaptation.

---

## Routing Decision Rules

### Rule 1
If the user asks why a video works, why it fails, or what to improve, use **Content Analysis / Video Diagnosis**.

### Rule 2
If the user asks for lines, a UGC script, spoken narration, subtitles, or creator speech, use **Script Planning**.

### Rule 3
If the user asks for shots, scenes, visual structure, or production planning, use **Storyboard Planning**.

### Rule 4
If the user asks for a prompt for AI video generation, use **Prompt Conversion**.

### Rule 5
If the user gives a reference video and wants an original version for another product, use **Reference Video Adaptation**.

### Rule 6
If the user's main concern is the ending, action instruction, or purchase push, use **CTA Optimization**.

### Rule 7
If the user's main concern is the first 1-3 seconds, use **Hook Generation / Hook Repair**.

### Rule 8
If the user asks for multiple testable options, use **Creative Variation Planning**.

### Rule 9
If the user needs creator or editor instructions, use **Creator Brief / Production Handoff**.

### Rule 10
If the user is not ready for a final text deliverable and needs strategic choice, use **Planning-Only / Pre-Production Consultation**.

### Rule 11
If multiple routes are valid, choose the route matching the user's immediate deliverable.
For example:
- analyze first -> Content Analysis
- write now -> Script Planning
- shoot now -> Storyboard Planning or Creator Brief
- generate later -> Prompt Conversion
- test options -> Creative Variation Planning

### Rule 12
Do not ask the user to choose internal workflow names.
Ask short outcome-based clarifying questions only when the output would materially change.

---

## Ambiguity Handling

If the request is ambiguous, first infer the likely route from:
- the input type provided
- the requested deliverable
- whether the user wants analysis, creation, adaptation, or generation prep
- whether the output is for a creator, editor, marketer, or AI video model
- whether the user needs one asset, a staged workflow, or multiple variants

If ambiguity remains high, ask one concise question framed around outcomes.

Good clarification examples:
- "Do you want a diagnosis of the current video, or a rewritten script?"
- "Should this become a creator filming brief or an AI video prompt?"
- "Do you want one recommended script, or several testable angle variants?"
- "Should we preserve the reference video's structure, or only borrow its hook logic?"

Avoid asking the user to choose labels like "content_analysis" or "prompt_conversion" unless they already use those terms.

---

## Output Routing Matrix

### If task type = Content Analysis / Video Diagnosis
Output:
- objective summary
- section breakdown
- hook diagnosis
- selling logic analysis
- proof and objection review
- CTA review
- prioritized improvements

### If task type = Script Planning
Output:
- audience and objective summary
- creative angle
- hook options
- full script
- visual guidance
- subtitle suggestions
- CTA variants
- risk notes

### If task type = Storyboard Planning
Output:
- video goal
- storyboard overview
- scene-by-scene breakdown
- product visibility notes
- proof placement
- overlay and camera notes
- pacing and CTA ending

### If task type = Prompt Conversion
Output:
- prompt objective
- visual strategy
- main prompt
- sequence or scene blocks
- consistency constraints
- optional variants

### If task type = Reference Video Adaptation
Output:
- reference logic summary
- transferable strategy
- must-change elements
- product fit notes
- original adaptation directions
- recommended final concept
- next-step handoff

### If task type = CTA Optimization
Output:
- CTA objective
- CTA strategy
- primary CTA
- softer and stronger variants
- usage note

### If task type = Hook Generation / Hook Repair
Output:
- hook strategy
- hook options
- visual cue for each option
- fit rationale
- recommended hook

### If task type = Creative Variation Planning
Output:
- testing objective
- fixed product truths
- variant list
- variable tested by each variant
- proof needs
- recommended priority

### If task type = Creator Brief / Production Handoff
Output:
- brief summary
- required shots
- spoken line or talking-point guidance
- proof requirements
- overlays and captions
- constraints
- handoff checklist

### If task type = Planning-Only / Pre-Production Consultation
Output:
- current situation
- possible directions
- comparison
- recommended route
- required next inputs
- next-step plan

---

## Final Routing Principle
The router exists to protect output fit.

Do not choose a workflow based on the most literal phrase in the user's request.
Choose the workflow that best supports the user's actual commercial objective, current input material, and desired production outcome.
