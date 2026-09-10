# Storyboard Quality Rubric

> Purpose: Evaluate the quality of TikTok/e-commerce video storyboards produced by the **video-storyboard-skill**. This rubric is designed for both human review and LLM self-check. It prioritizes conversion clarity, visual shootability, platform fit, and downstream usefulness for image/video generation.

## Scoring Overview

- Score each dimension from **1–5**
- Use the dimension weights to compute a **weighted total score out of 100**
- Apply **Critical Fail Conditions** before approving a storyboard
- A storyboard is considered:
  - **Excellent / Ready**: 85–100
  - **Good / Minor Revision**: 70–84
  - **Weak / Needs Revision**: 50–69
  - **Unusable / Rebuild**: below 50

### Score meanings

| Score | Meaning |
|---|---|
| 1 | Fails badly; missing, unusable, or off-brief |
| 2 | Weak; major issues limit execution |
| 3 | Adequate; usable but generic or inconsistent |
| 4 | Strong; clear, effective, and mostly production-ready |
| 5 | Excellent; precise, persuasive, platform-fit, and highly usable |

---

## Weighted Dimensions

| Dimension | Weight |
|---|---:|
| 1. Goal & Product Fit | 10 |
| 2. Audience & Platform Relevance | 8 |
| 3. Hook Strength | 12 |
| 4. Narrative Flow & Retention Design | 10 |
| 5. Scene Specificity & Visual Clarity | 14 |
| 6. Shootability / Generatability | 10 |
| 7. Product Selling Power | 12 |
| 8. Emotional / Behavioral Persuasion | 6 |
| 9. CTA Effectiveness | 6 |
| 10. Pacing, Duration, and Rhythm | 5 |
| 11. Creative Differentiation | 4 |
| 12. Consistency, Formatting, and Handoff Readiness | 3 |

**Total Weight: 100**

---

## 1. Goal & Product Fit (Weight: 10)

**What this checks:**
Whether the storyboard clearly matches the intended objective and accurately reflects the product/service being sold.

### 1
- The core objective is unclear or contradictory
- Product is generic, misrepresented, or barely integrated
- Scenes could apply to almost any product

### 2
- Some alignment to product exists, but objective is weak
- Selling angle is vague, broad, or inconsistent
- Storyboard focuses on aesthetics more than purpose

### 3
- Objective is understandable
- Product is present and mostly relevant
- Selling angle exists but is not especially sharp

### 4
- Storyboard clearly serves a defined goal
- Product traits are integrated into scenes meaningfully
- Selling angle is coherent and relevant to buyer intent

### 5
- Goal is unmistakable and strategically chosen
- Product fit is strong in every scene
- Storyboard demonstrates a clear reason this concept should convert for this specific offer

**Reviewer prompts**
- Is the storyboard trying to do one clear job?
- Does every scene support the product’s actual value?
- Is this concept truly tailored to the product, not just a template?

---

## 2. Audience & Platform Relevance (Weight: 8)

**What this checks:**
How well the storyboard reflects TikTok-native behavior and the intended buyer/viewer.

### 1
- Feels like a TV ad, brochure, or generic brand film
- No clear awareness of TikTok viewing patterns
- No audience assumptions are visible

### 2
- Some platform cues exist, but tone or structure feels off
- Viewer motivations are guessed poorly or ignored
- Content may be technically acceptable but not culturally native

### 3
- Reasonably suitable for TikTok
- Audience fit is plausible but broad
- Contains familiar short-form conventions without strong precision

### 4
- Strong short-form platform fit
- Viewer psychology and attention patterns are clearly considered
- Tone, framing, and payoff feel right for the intended audience

### 5
- Deeply native to TikTok/shopper behavior
- Storyboard reflects specific audience pain points, motivations, objections, or identity signals
- Feels highly likely to stop the right viewer and move them toward action

**Reviewer prompts**
- Would the intended audience recognize themselves in this?
- Does it feel built for TikTok feed behavior?
- Is the tone aligned with commerce content norms for the niche?

---

## 3. Hook Strength (Weight: 12)

**What this checks:**
Whether the opening earns attention immediately and creates a reason to keep watching.

### 1
- No real hook
- Starts slowly, abstractly, or with irrelevant setup
- Viewer has no reason to continue

### 2
- Hook exists but is weak, overused, or low-urgency
- Opening is understandable but not thumb-stopping
- Tension or curiosity is limited

### 3
- Functional hook
- Some reason to continue watching
- Familiar but serviceable opening device

### 4
- Strong immediate attention capture
- Hook creates curiosity, surprise, contrast, pain, proof, or promise effectively
- Opening is concise and visually useful

### 5
- Exceptional hook with high stop-power
- First beat is instantly legible, emotionally charged, and product-relevant
- Hook sets up the full video payoff cleanly without wasting time

**Reviewer prompts**
- Would this stop a cold viewer in the first 1–2 seconds?
- Is the hook visual, verbal, or situationally strong?
- Does it connect directly to the product or payoff?

---

## 4. Narrative Flow & Retention Design (Weight: 10)

**What this checks:**
Whether the sequence of scenes creates momentum, escalation, and sustained viewer interest.

### 1
- Random or disjointed scene order
- No progression
- Retention likely collapses after the opener

### 2
- Basic sequence exists but transitions feel abrupt or repetitive
- Mid-video sags
- Tension/payoff is poorly managed

### 3
- Coherent flow
- Beginning, middle, and end are present
- Retention logic is acceptable but not especially strong

### 4
- Scenes build logically and maintain interest
- Information and visuals are sequenced intentionally
- Storyboard uses escalation, variation, or payoff effectively

### 5
- Excellent retention architecture
- Each beat earns the next
- Curiosity, proof, benefit, and action unfold in a high-performing short-form rhythm

**Reviewer prompts**
- Does each scene create a reason to watch the next one?
- Is there a clear escalation or reveal?
- Is the middle as intentional as the hook?

---

## 5. Scene Specificity & Visual Clarity (Weight: 14)

**What this checks:**
How concrete, legible, and imageable each scene is.

### 1
- Scenes are vague, abstract, or slogan-like
- Reviewer cannot picture what should appear on screen
- Multiple scenes are non-visual or redundant

### 2
- Some visual intent exists, but descriptions are muddy
- Camera, composition, action, or subject behavior is underspecified
- Scenes may require guesswork to execute

### 3
- Most scenes are understandable
- Basic visual setup is present
- Some moments still feel generic or underspecified

### 4
- Clear, visual, and scene-based descriptions
- A creator or model can understand what to show
- Distinct images/moments are present across the sequence

### 5
- Every scene is vivid, concrete, and easy to imagine
- Framing, action, product presence, and visual intention are explicit
- Storyboard provides excellent visual guidance without overcomplication

**Reviewer prompts**
- Can someone sketch or shoot the scene from the description alone?
- Is the product clearly visible in the intended moments?
- Are the scenes distinct from one another?

---

## 6. Shootability / Generatability (Weight: 10)

**What this checks:**
Whether the storyboard can actually be executed by a creator, production team, or generative image/video workflow.

### 1
- Physically unclear, contradictory, or impossible to produce
- Depends on unexplained VFX, location access, or unrealistic continuity
- Cannot be reliably handed off

### 2
- Some scenes are executable, but several are impractical
- Requires too many assumptions to produce
- Important production constraints are ignored

### 3
- Generally producible
- A few scenes may need interpretation or simplification
- Usable with moderate adjustment

### 4
- Strong execution feasibility
- Scenes are practical for shooting or prompting
- Handoff to creators/generation tools would be smooth

### 5
- Highly production-ready
- Constraints, continuity, actions, and scene intent are cleanly expressible
- Excellent fit for downstream image generation, animatics, or AI video prompting

**Reviewer prompts**
- Could a creator realistically film this?
- Could an image/video model generate the needed frames from this?
- Are there hidden continuity or practicality problems?

---

## 7. Product Selling Power (Weight: 12)

**What this checks:**
Whether the storyboard actually sells, not just entertains.

### 1
- Product value is unclear
- Benefits, use case, or proof are missing
- Viewer may remember visuals but not the product

### 2
- Product is shown, but persuasion is weak
- Selling points are generic or unconvincing
- Little differentiation or buyer confidence

### 3
- Storyboard communicates some product value
- Benefits are present but not maximally persuasive
- Conversion logic is acceptable

### 4
- Strong selling structure
- Benefits, usability, proof, and/or transformation are integrated naturally
- Viewer understands why this product is worth attention

### 5
- Excellent commerce performance potential
- Product is framed around real buyer motivations, objections, and conversion triggers
- Storyboard creates desire and clarity without feeling clumsy or overly salesy

**Reviewer prompts**
- Does the viewer understand what the product does and why it matters?
- Are claims supported visually or behaviorally?
- Does the storyboard reduce buyer hesitation?

---

## 8. Emotional / Behavioral Persuasion (Weight: 6)

**What this checks:**
How effectively the storyboard uses emotional triggers or behavioral motivation.

### 1
- No emotional or behavioral mechanism
- Feels flat, purely descriptive, or indifferent

### 2
- Attempts persuasion but in a generic or weak way
- Emotional tone is unclear or mismatched

### 3
- Some motivation is present
- Uses pain, aspiration, relief, identity, convenience, novelty, or social proof at a basic level

### 4
- Clear persuasive psychology
- Emotional and behavioral triggers support the product naturally

### 5
- Strong, nuanced buyer psychology
- Storyboard makes the desired action feel intuitive, satisfying, and timely

**Reviewer prompts**
- What human motivation is being activated?
- Does the storyboard create desire, urgency, relief, confidence, or identity alignment?
- Is persuasion embedded in the scenes, not just the copy?

---

## 9. CTA Effectiveness (Weight: 6)

**What this checks:**
Whether the ending turns attention into action clearly and credibly.

### 1
- No CTA, or CTA is confusing
- Ending feels cut off or disconnected

### 2
- CTA exists but is weak, generic, or late
- Action requested is not compelling

### 3
- Clear CTA is present
- Adequate but standard closing

### 4
- CTA is well-timed and aligned with the pitch
- Ending gives a clear next step and reinforces value

### 5
- CTA is highly effective
- Action feels natural, urgent, and earned by the sequence
- Closing strengthens conversion rather than merely ending the video

**Reviewer prompts**
- Is the viewer told what to do next?
- Does the CTA match the evidence provided in the video?
- Is the final impression persuasive?

---

## 10. Pacing, Duration, and Rhythm (Weight: 5)

**What this checks:**
Whether the storyboard feels like the right length and cadence for short-form commerce video.

### 1
- Bloated, rushed, or structurally mismatched to short-form
- Too many scenes or too little content for the intended duration

### 2
- Noticeable pacing issues
- Some scenes feel unnecessary or underdeveloped

### 3
- Reasonable pace
- Duration and scene count are acceptable

### 4
- Good rhythm and timing logic
- Scenes are proportioned effectively for short-form attention

### 5
- Excellent cadence
- Fast where needed, spacious where useful
- Sequence feels engineered for retention and conversion

**Reviewer prompts**
- Is the storyboard likely to feel smooth at the target length?
- Are scene beats appropriately sized?
- Does the rhythm support watch time?

---

## 11. Creative Differentiation (Weight: 4)

**What this checks:**
Whether the concept has enough distinctiveness to avoid being forgettable.

### 1
- Entirely generic
- Easily interchangeable with countless low-quality ads

### 2
- Slight variation on a common pattern
- Limited memorable value

### 3
- Some fresh detail or angle
- Not especially distinctive, but not stale

### 4
- Clearly differentiated concept or execution
- Contains memorable framing, setup, or payoff

### 5
- Strongly original within the niche while staying commercially useful
- Concept is memorable without sacrificing clarity or sellability

**Reviewer prompts**
- What makes this concept stand out?
- Is the differentiation helpful or merely decorative?
- Would a viewer remember this after scrolling?

---

## 12. Consistency, Formatting, and Handoff Readiness (Weight: 3)

**What this checks:**
Whether the storyboard is internally consistent and easy to use downstream.

### 1
- Messy, contradictory, incomplete, or hard to parse
- Missing key scene information or structure

### 2
- Understandable but inconsistent
- Scene formatting, naming, or logic may confuse handoff

### 3
- Generally usable
- Formatting is acceptable with minor cleanup needed

### 4
- Clear structure and consistent formatting
- Easy to pass into production or prompting workflows

### 5
- Exceptionally clean and operational
- Strong labeling, sequencing, and handoff utility
- Ready for storyboarding, image generation, or prompt conversion with minimal friction

**Reviewer prompts**
- Is the storyboard easy to scan and use?
- Are scene descriptions consistently structured?
- Would a teammate know exactly what to do with it?

---

## Critical Fail Conditions

If **any** of the following are true, the storyboard should not be approved without revision, regardless of total score:

1. **No clear hook** in the opening beat
2. **Product is not visually or functionally clear**
3. **Scenes are too vague to produce**
4. **Narrative sequence is incoherent**
5. **No meaningful selling logic** beyond generic aesthetics
6. **CTA is absent** for a conversion-oriented brief
7. **Major mismatch** between brief and storyboard output
8. **Unsafe / disallowed content direction** for the intended use case
9. **Depends on impossible or unexplained visuals** that break handoff viability

---

## Fast Evaluation Template

Use this when scoring a storyboard quickly.

```yaml
storyboard_quality_review:
  overall_score_100: 0
  verdict: ""
  critical_fail: false
  critical_fail_reasons: []

  dimension_scores:
    goal_product_fit:
      score_1_to_5: 0
      notes: ""
    audience_platform_relevance:
      score_1_to_5: 0
      notes: ""
    hook_strength:
      score_1_to_5: 0
      notes: ""
    narrative_flow_retention:
      score_1_to_5: 0
      notes: ""
    scene_specificity_visual_clarity:
      score_1_to_5: 0
      notes: ""
    shootability_generatability:
      score_1_to_5: 0
      notes: ""
    product_selling_power:
      score_1_to_5: 0
      notes: ""
    emotional_behavioral_persuasion:
      score_1_to_5: 0
      notes: ""
    cta_effectiveness:
      score_1_to_5: 0
      notes: ""
    pacing_duration_rhythm:
      score_1_to_5: 0
      notes: ""
    creative_differentiation:
      score_1_to_5: 0
      notes: ""
    consistency_handoff_readiness:
      score_1_to_5: 0
      notes: ""

  strongest_elements:
    - ""
  weakest_elements:
    - ""

  must_fix_before_approval:
    - ""

  revision_priority:
    - hook
    - narrative_flow
    - scene_specificity
    - selling_logic
    - cta

  summary: ""
```

---

## Weighted Scoring Formula

Convert each dimension’s 1–5 score into weighted points:

```text
weighted_points = (dimension_score / 5) * dimension_weight
overall_score_100 = sum(all weighted_points)
```

### Example

```text
Hook Strength score = 4
Weight = 12
Weighted points = (4/5) * 12 = 9.6
```

---

## Approval Heuristics

### Approve
Use when:
- No critical fail conditions
- Total score is 85+
- Hook, scene clarity, and selling logic are all strong
- Storyboard is ready for downstream prompt/image/video work

### Approve with Minor Revisions
Use when:
- No critical fail conditions
- Total score is 70–84
- Core concept works, but 1–3 dimensions need tightening

### Revise
Use when:
- Score is 50–69
- Or any major dimension scored 1–2 in hook, scene clarity, or selling power
- Output is salvageable, but not execution-ready

### Rebuild
Use when:
- Score below 50
- Or there are multiple critical fail conditions
- Storyboard is too vague, generic, or structurally weak to fix incrementally

---

## What “Good” Looks Like for This Skill

A high-quality storyboard from **video-storyboard-skill** usually has these traits:

- Opens with a clear, visually immediate hook
- Makes the product understandable fast
- Breaks the concept into concrete, distinct, imageable scenes
- Feels native to TikTok and commerce viewing behavior
- Builds from attention → interest → proof/value → action
- Gives enough specificity for creators, designers, or AI generation tools
- Balances creativity with commercial clarity
- Ends with a CTA that feels earned and actionable

---

## Common Failure Patterns

Reviewers should watch for these recurring weak outputs:

1. **Pretty but empty**
   - Nice mood, no actual selling logic

2. **Hook-only thinking**
   - Strong first scene, weak middle and ending

3. **Generic UGC template**
   - Product could be swapped with anything

4. **Non-visual copy disguised as storyboard**
   - Reads like ad copy bullets, not scenes

5. **Overcomplicated production fantasy**
   - Cool on paper, unrealistic in execution

6. **Feature dump without narrative**
   - Informative but boring, low retention

7. **Vibe mismatch**
   - Luxury tone for mass impulse item, or vice versa

8. **No buyer psychology**
   - Explains product but never motivates action

---

## Revision Guidance by Weak Area

### If Hook Strength is weak
- Start with pain, surprise, outcome, contrast, or visible proof
- Remove slow setup
- Make frame one instantly legible

### If Scene Specificity is weak
- Add subject, action, framing, product placement, and environment
- Replace abstract claims with visible moments
- Ensure each scene has a distinct visual job

### If Selling Power is weak
- Clarify benefit, use case, proof, objection handling, or transformation
- Show why this product beats inaction or alternatives
- Tie visuals to buyer decision triggers

### If Narrative Flow is weak
- Reorder scenes to create escalation
- Remove repetition
- Make each beat answer: “why keep watching?”

### If Shootability is weak
- Simplify production assumptions
- Clarify transitions and continuity
- Avoid requiring impossible camera moves or unexplained effects

### If CTA is weak
- State the next action clearly
- Reinforce the payoff before asking
- Match CTA to the product and funnel stage

---

## LLM Self-Check Instructions

Before finalizing a storyboard, the model should ask:

1. Can a viewer understand the product within the first few beats?
2. Is the opening genuinely stopping attention?
3. Are all scenes visual, specific, and different from one another?
4. Does the sequence build toward desire and action?
5. Could a creator or generation model execute this without guessing?
6. Is the storyboard selling, not just describing?
7. Is the CTA clear and appropriate?

If the answer to 2, 3, 4, or 5 is “no,” revise before presenting.

---

## Compact Reviewer Output Format

```json
{
  "overall_score_100": 0,
  "verdict": "approve | approve_with_minor_revisions | revise | rebuild",
  "critical_fail": false,
  "top_issues": [
    "issue 1",
    "issue 2"
  ],
  "top_strengths": [
    "strength 1",
    "strength 2"
  ],
  "priority_fix": "single most important improvement",
  "summary": "one paragraph evaluation"
}
```

---

## Reviewer Principle

The best storyboard is **not** the one with the most style.
It is the one that makes the product easy to understand, hard to ignore, easy to produce, and more likely to convert.
