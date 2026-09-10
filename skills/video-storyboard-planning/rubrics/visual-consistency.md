# Visual Consistency Rubric

> Purpose: Evaluate whether a storyboard maintains coherent visual identity across scenes so it can be executed smoothly in production, image generation, animatics, or AI video workflows. This rubric emphasizes continuity of subject, product, styling, environment logic, camera language, and brand-world cohesion.

## Scoring Overview

- Score each dimension from **1–5**
- Apply the weights to compute a **weighted total out of 100**
- Check **Critical Consistency Failures** before approval
- Interpretation:
  - **90–100** = Excellent visual consistency
  - **75–89** = Strong consistency with minor gaps
  - **60–74** = Mixed consistency; revision recommended
  - **Below 60** = Weak consistency; likely to break execution

### Score meanings

| Score | Meaning |
|---|---|
| 1 | Broken; major continuity or identity issues |
| 2 | Weak; several visual mismatches create confusion |
| 3 | Acceptable; mostly coherent but with noticeable gaps |
| 4 | Strong; consistent and reliable across scenes |
| 5 | Excellent; highly controlled and production-ready consistency |

---

## Weighted Dimensions

| Dimension | Weight |
|---|---:|
| 1. Subject Identity Consistency | 12 |
| 2. Product Identity Consistency | 14 |
| 3. Wardrobe / Styling Continuity | 8 |
| 4. Environment & Location Logic | 10 |
| 5. Prop & Object Continuity | 6 |
| 6. Camera Language Consistency | 8 |
| 7. Lighting / Color / Mood Cohesion | 10 |
| 8. Temporal Continuity & Action Logic | 8 |
| 9. Composition & Framing Cohesion | 6 |
| 10. Brand World / Art Direction Unity | 8 |
| 11. Shot-to-Shot Handoff Reliability | 6 |
| 12. Generative Robustness | 4 |

**Total Weight: 100**

---

## 1. Subject Identity Consistency (Weight: 12)

**What this checks:**
Whether the main person, creator, model, or character remains recognizably the same across scenes.

### 1
- Subject identity is unstable or contradictory
- Different scenes imply different people without explanation
- Age, gender presentation, body type, face cues, or role drift unpredictably

### 2
- Some continuity exists, but identity cues are weak or inconsistent
- Viewer or production team may be unsure whether scenes feature the same subject

### 3
- Subject is mostly consistent
- Minor ambiguity in appearance or role remains

### 4
- Clear continuity of the same subject across scenes
- Identity cues are stable and usable

### 5
- Subject identity is unmistakable and well controlled
- Appearance, role, and on-screen function remain highly coherent throughout

**Reviewer prompts**
- Is it obviously the same person from scene to scene?
- Are identity cues stable enough for image/video generation?
- Does the storyboard accidentally drift into a different subject archetype?

---

## 2. Product Identity Consistency (Weight: 14)

**What this checks:**
Whether the product remains the same product across the full storyboard.

### 1
- Product identity changes or becomes contradictory
- Shape, material, colorway, packaging, scale, or function drift across scenes

### 2
- Product is somewhat recognizable, but key details are inconsistent
- Viewer or generator may confuse it with another item or variant

### 3
- Product identity is generally stable
- Some details are underspecified or vulnerable to drift

### 4
- Product is consistently represented
- Key form factors and distinguishing features remain coherent

### 5
- Product identity is highly controlled and unmistakable
- Details are specific enough to preserve fidelity across all scenes and outputs

**Reviewer prompts**
- Would all scenes be interpreted as the same product SKU/variant?
- Are color, proportions, materials, and design cues stable?
- Are critical product details explicit enough to prevent hallucination?

---

## 3. Wardrobe / Styling Continuity (Weight: 8)

**What this checks:**
Whether clothing, grooming, accessories, and overall styling stay coherent unless intentionally changed.

### 1
- Styling changes randomly without narrative reason
- Wardrobe continuity is broken or contradictory

### 2
- Partial continuity exists, but several styling mismatches appear
- Looks may shift in a way that harms coherence

### 3
- Mostly consistent styling
- A few gaps or ambiguities remain

### 4
- Styling continuity is strong
- Changes, if any, feel intentional and understandable

### 5
- Wardrobe and styling are extremely coherent
- Every look supports subject identity, product focus, and narrative logic

**Reviewer prompts**
- Is the styling stable across connected scenes?
- If wardrobe changes, is there a reason?
- Do accessories, hair, or makeup introduce confusion?

---

## 4. Environment & Location Logic (Weight: 10)

**What this checks:**
Whether the settings and locations feel part of one believable visual world.

### 1
- Locations jump randomly with no logic
- Environment continuity is broken or confusing

### 2
- Some environmental coherence exists, but transitions are weak
- Spatial logic is underdeveloped

### 3
- Locations are broadly understandable
- Minor discontinuities or arbitrary changes remain

### 4
- Environment choices are coherent and support the concept well
- Location shifts feel intentional or logically sequenced

### 5
- Excellent location logic
- Settings create a unified world and help each scene feel connected and credible

**Reviewer prompts**
- Do the environments belong to the same narrative/world?
- If the location changes, does it make sense?
- Are spatial cues coherent enough for execution?

---

## 5. Prop & Object Continuity (Weight: 6)

**What this checks:**
Whether supporting objects remain stable and non-distracting across scenes.

### 1
- Props or secondary objects shift unpredictably
- Object continuity actively breaks scene logic

### 2
- Some recurring objects are inconsistent
- Small continuity errors may create confusion

### 3
- General prop continuity is acceptable
- Minor gaps exist but may be manageable

### 4
- Props and supporting objects are consistent and intentional
- They reinforce rather than distract from the main subject/product

### 5
- Excellent continuity control of all relevant objects
- Secondary elements support realism, clarity, and downstream generation reliability

**Reviewer prompts**
- Do supporting objects persist logically?
- Are there avoidable continuity breaks?
- Could props distract from product identity?

---

## 6. Camera Language Consistency (Weight: 8)

**What this checks:**
Whether the storyboard uses a coherent visual grammar in shot selection, perspective, and movement style.

### 1
- Camera approach is chaotic or contradictory
- Shot style changes feel random

### 2
- Some camera logic exists, but visual grammar is unstable
- Perspective or movement style shifts without reason

### 3
- Basic consistency in camera language
- Some unevenness remains

### 4
- Camera choices feel coherent and intentional
- Shot style supports the concept and is easy to execute

### 5
- Strong, disciplined camera language
- Perspective, lens feel, distance, and movement form a clear visual system across the storyboard

**Reviewer prompts**
- Do the shots feel like they belong to the same video?
- Is camera behavior consistent with the intended tone?
- Would multiple artists/operators interpret this similarly?

---

## 7. Lighting / Color / Mood Cohesion (Weight: 10)

**What this checks:**
Whether the storyboard maintains a unified lighting, palette, and emotional visual atmosphere.

### 1
- Lighting and color mood are inconsistent or contradictory
- Scenes feel like unrelated campaigns

### 2
- Some mood is present, but palette/lighting drift noticeably
- Emotional tone varies in an uncontrolled way

### 3
- Generally cohesive mood
- Some scenes may feel off-brand or off-tone

### 4
- Strong mood consistency
- Lighting and color support a unified visual identity

### 5
- Excellent color and lighting cohesion
- Mood feels highly controlled and supports product, audience, and brand intent across all scenes

**Reviewer prompts**
- Do scenes share a compatible color story?
- Is the mood stable enough for a coherent edit?
- Would the sequence feel visually unified when assembled?

---

## 8. Temporal Continuity & Action Logic (Weight: 8)

**What this checks:**
Whether the implied timing, sequence of actions, and cause-effect relationships make sense.

### 1
- Action order is contradictory or impossible
- Time flow is confusing

### 2
- Some temporal logic exists, but transitions or actions are inconsistent
- Viewer may struggle to understand sequence

### 3
- Mostly understandable action flow
- A few timing gaps or logic jumps remain

### 4
- Strong continuity of action and sequence
- Scene order supports believable progression

### 5
- Excellent temporal logic
- Actions, reactions, and transitions are easy to follow and production-friendly

**Reviewer prompts**
- Do actions happen in a believable order?
- Are before/after relationships clear?
- Could the edit flow naturally without continuity confusion?

---

## 9. Composition & Framing Cohesion (Weight: 6)

**What this checks:**
Whether scene framing and visual emphasis stay coherent across the sequence.

### 1
- Framing priorities are inconsistent or confusing
- Product/subject emphasis changes unpredictably

### 2
- Some framing logic exists, but important visual emphasis is unstable

### 3
- Composition is generally serviceable
- Some scenes may feel mismatched in emphasis or balance

### 4
- Framing is coherent and purposeful
- Scene compositions feel related and editorially compatible

### 5
- Excellent compositional consistency
- The storyboard demonstrates a unified framing philosophy that supports clarity and polish

**Reviewer prompts**
- Is the visual emphasis stable across scenes?
- Are close-ups, mids, and wides used intentionally?
- Does framing support continuity and product clarity?

---

## 10. Brand World / Art Direction Unity (Weight: 8)

**What this checks:**
Whether the storyboard feels like one campaign world, not a mix of unrelated creative directions.

### 1
- No clear art direction
- Scenes feel pulled from unrelated concepts

### 2
- Partial unifying style, but significant mismatch remains
- Brand tone is unstable or generic

### 3
- Basic unity exists
- Visual direction is acceptable but not especially controlled

### 4
- Strong art direction coherence
- Storyboard feels like one intentional campaign concept

### 5
- Exceptional unity of visual world
- Every scene supports a distinctive, consistent brand/story aesthetic

**Reviewer prompts**
- Do all scenes feel like the same campaign?
- Is there a clear visual world?
- Does the art direction support brand and product positioning?

---

## 11. Shot-to-Shot Handoff Reliability (Weight: 6)

**What this checks:**
Whether the storyboard gives enough continuity guidance for teams or models to preserve consistency across outputs.

### 1
- Handoff is unreliable
- Too many unspecified continuity variables

### 2
- Some useful signals exist, but execution would likely drift
- Key continuity anchors are missing

### 3
- Reasonably usable handoff
- Additional interpretation may still be required

### 4
- Good continuity handoff
- Subject, product, and visual anchors are sufficiently clear

### 5
- Excellent handoff reliability
- Teams or models can preserve continuity with minimal guesswork

**Reviewer prompts**
- Would two different executors produce matching scenes?
- Are continuity anchors explicit enough?
- Is there enough information to avoid drift?

---

## 12. Generative Robustness (Weight: 4)

**What this checks:**
How well the storyboard is protected against common AI generation drift across frames/scenes.

### 1
- Highly vulnerable to drift
- Too vague or too variable for stable generation

### 2
- Some stable anchors exist, but many drift risks remain

### 3
- Moderately robust
- Works with some prompt discipline and correction

### 4
- Strongly generation-friendly
- Good anchors for identity, product, styling, and environment

### 5
- Excellent robustness for multi-image or multi-shot generation
- Storyboard is structured to preserve fidelity across iterations and scenes

**Reviewer prompts**
- Would an AI model likely keep the same subject/product across scenes?
- Are enough repeating anchors specified?
- Are unnecessary variables minimized?

---

## Critical Consistency Failures

If any of the following occur, the storyboard should not be approved without revision:

1. **Main subject identity drifts across scenes**
2. **Product details change in ways that imply a different product or variant**
3. **Location or environment logic becomes incoherent**
4. **Wardrobe/styling changes randomly without narrative reason**
5. **Action continuity is contradictory or impossible**
6. **Visual mood or art direction shifts so strongly that scenes feel unrelated**
7. **Descriptions are too vague to preserve continuity in downstream generation**
8. **Scene-to-scene handoff lacks enough anchors to maintain consistency**

---

## Fast Evaluation Template

```yaml
visual_consistency_review:
  overall_score_100: 0
  verdict: ""
  critical_fail: false
  critical_fail_reasons: []

  dimension_scores:
    subject_identity_consistency:
      score_1_to_5: 0
      notes: ""
    product_identity_consistency:
      score_1_to_5: 0
      notes: ""
    wardrobe_styling_continuity:
      score_1_to_5: 0
      notes: ""
    environment_location_logic:
      score_1_to_5: 0
      notes: ""
    prop_object_continuity:
      score_1_to_5: 0
      notes: ""
    camera_language_consistency:
      score_1_to_5: 0
      notes: ""
    lighting_color_mood_cohesion:
      score_1_to_5: 0
      notes: ""
    temporal_continuity_action_logic:
      score_1_to_5: 0
      notes: ""
    composition_framing_cohesion:
      score_1_to_5: 0
      notes: ""
    brand_world_art_direction_unity:
      score_1_to_5: 0
      notes: ""
    shot_to_shot_handoff_reliability:
      score_1_to_5: 0
      notes: ""
    generative_robustness:
      score_1_to_5: 0
      notes: ""

  strongest_elements:
    - ""
  weakest_elements:
    - ""
  must_fix_before_approval:
    - ""
  summary: ""
```

---

## Weighted Scoring Formula

```text
weighted_points = (dimension_score / 5) * dimension_weight
overall_score_100 = sum(all weighted_points)
```

### Example

```text
Product Identity Consistency score = 4
Weight = 14
Weighted points = (4/5) * 14 = 11.2
```

---

## Approval Heuristics

### Approve
Use when:
- No critical consistency failures
- Score is 85+
- Subject, product, environment, and mood continuity are all strong

### Approve with Minor Revisions
Use when:
- No critical consistency failures
- Score is 70–84
- Core continuity is sound, with a few clarity gaps

### Revise
Use when:
- Score is 50–69
- Or any major continuity dimension scores 1–2 in subject identity, product identity, or environment logic

### Rebuild
Use when:
- Score is below 50
- Or there are multiple critical consistency failures
- Output is too unstable for reliable execution

---

## What Strong Visual Consistency Usually Looks Like

A strong storyboard typically:

- Keeps the same person clearly recognizable throughout
- Preserves the same product variant, shape, and detailing
- Uses wardrobe and styling that remain stable unless intentionally changed
- Places scenes in compatible locations or logically connected settings
- Maintains a coherent visual mood, palette, and camera style
- Describes enough repeating anchors to support production and AI generation
- Avoids introducing unnecessary variables that invite drift

---

## Common Consistency Failure Patterns

1. **Prompt drift disguised as creativity**
   - Each scene adds new variables until identity breaks

2. **Product mutation**
   - The item changes material, scale, or silhouette across scenes

3. **Random setting hopping**
   - Environments shift without story logic

4. **Style fragmentation**
   - Lighting, tone, or art direction changes between scenes

5. **Invisible continuity assumptions**
   - Writer assumes continuity without explicitly anchoring it

6. **Camera incoherence**
   - Shot language feels stitched from unrelated references

7. **Temporal contradiction**
   - Cause and effect or action order stop making sense

---

## Revision Guidance by Weak Area

### If Subject Identity Consistency is weak
- Add stable physical and role-defining descriptors
- Reduce unnecessary appearance variation
- Re-anchor the same subject in every scene

### If Product Identity Consistency is weak
- Specify colorway, materials, shape, packaging, and unique details
- Reuse the same product description language across scenes
- Remove variant ambiguity

### If Environment Logic is weak
- Limit location changes
- Clarify transitions and relationship between spaces
- Keep backgrounds compatible with the concept

### If Styling Continuity is weak
- Lock wardrobe, accessories, hair, and grooming unless a change is motivated
- Make intentional look changes explicit

### If Lighting / Mood Cohesion is weak
- Define a stable palette and atmosphere
- Avoid mixing unrelated visual moods
- Use lighting direction as an art-direction anchor

### If Handoff Reliability is weak
- Add recurring anchors for subject, product, scene world, and visual tone
- Standardize scene description structure
- Reduce implied but unstated details

### If Generative Robustness is weak
- Minimize variables that need to change between scenes
- Increase repeated descriptors
- Ensure each scene carries enough identity anchors independently

---

## LLM Self-Check Questions

Before finalizing a storyboard, ask:

1. Is it obviously the same subject throughout?
2. Is it obviously the same product throughout?
3. Do styling and environment changes make sense?
4. Would the scenes look like one campaign when assembled?
5. Could multiple generated frames preserve continuity without heavy manual correction?
6. Are continuity anchors explicit enough in every scene?

If any answer is “no,” revise before approval.

---

## Compact Reviewer Output Format

```json
{
  "overall_score_100": 0,
  "verdict": "approve | approve_with_minor_revisions | revise | rebuild",
  "critical_fail": false,
  "top_strengths": [
    "strength 1",
    "strength 2"
  ],
  "top_issues": [
    "issue 1",
    "issue 2"
  ],
  "priority_fix": "single most important consistency improvement",
  "summary": "one paragraph visual consistency assessment"
}
```

---

## Reviewer Principle

Visual consistency is not merely sameness.
It is the disciplined preservation of identity, product fidelity, and visual world coherence so the storyboard can survive real execution without drifting into a different ad.
