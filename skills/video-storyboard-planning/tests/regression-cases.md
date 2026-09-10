# Regression Cases for video-storyboard-skill

> Purpose: Catch common failure modes in storyboard generation, conversion logic, TikTok fit, and continuity preservation. These cases are intended for manual review, scripted evaluation, or LLM self-check against the expected behavior of the skill.

---

## How to Use

For each case:

1. Feed the **input brief/script/product context** into the skill or sub-step under test
2. Compare the output against the **expected pass criteria**
3. Flag any matching **failure signals**
4. Record whether the system:
   - passes cleanly
   - passes with warning
   - fails and requires revision
   - fails critically

Suggested result labels:

- **PASS**
- **PASS_WITH_WARNINGS**
- **FAIL**
- **CRITICAL_FAIL**

---

## Case 01 — Generic Product Swap Syndrome

### Goal
Detect whether the storyboard is so generic that the product could be swapped with almost anything.

### Input Pattern
- Product: portable blender
- Brief asks for TikTok Shop UGC
- Benefits include portability and smoothie-on-the-go convenience

### Expected Pass Criteria
- Scenes clearly reflect a blender-specific use case
- Ingredients, blending action, and drink outcome are visible
- Portability is shown in a way that is specific to this product category
- Script/storyboard could not be reused unchanged for a random skincare or gadget product

### Failure Signals
- Output focuses only on “busy lifestyle” with no blender-specific action
- Product reveal is vague and category-agnostic
- No blending demo
- Benefits are generic like “so useful” or “great for daily life”

### Severity
**FAIL**

---

## Case 02 — Hook Exists but Middle Collapses

### Goal
Catch outputs with a strong opener but weak retention structure after scene 1.

### Input Pattern
- Brief requires strong hook in first 2 seconds
- 6–8 scenes, 18–25 seconds
- TikTok-native pacing required

### Expected Pass Criteria
- Each scene advances curiosity, proof, benefit, or payoff
- Middle scenes are not repetitive
- The sequence escalates from problem → solution → demo → lifestyle payoff → CTA

### Failure Signals
- First scene is strong, but scenes 2–5 merely restate the same point
- No progression from reveal to proof
- Ending feels disconnected from earlier setup
- Viewer has no new reason to keep watching after the hook

### Severity
**FAIL**

---

## Case 03 — Product Clarity Arrives Too Late

### Goal
Ensure the product is understandable early enough for short-form commerce.

### Input Pattern
- TikTok Shop sales-focused brief
- Product should be clear fast

### Expected Pass Criteria
- Product appears clearly within opening beats
- Viewer can identify category and function early
- Product role is not hidden behind atmosphere or lifestyle setup

### Failure Signals
- First several scenes only show creator mood, kitchen vibe, or generic routine
- Product is not shown or explained until halfway through
- Viewer might not know what is being sold by second or third scene

### Severity
**CRITICAL_FAIL**

---

## Case 04 — Unsupported Claim Drift

### Goal
Check whether the output invents claims beyond the product brief.

### Input Pattern
- Product constraints forbid medical, weight-loss, exaggerated power, or unproven capability claims

### Expected Pass Criteria
- Claims remain within provided product facts
- Demonstration aligns with allowed use cases
- No unsupported performance exaggeration

### Failure Signals
- Says or implies “melts fat,” “detox,” “professional-grade power,” “crushes anything,” or “perfect for ice” without proof
- Before/after body transformation language appears
- Product is shown handling ingredients outside the brief’s safe scope

### Severity
**CRITICAL_FAIL**

---

## Case 05 — Visual Identity Drift Across Scenes

### Goal
Detect subject/product continuity failures.

### Input Pattern
- Product visual identity specifies one white portable blender with clear body and flip-top lid
- Same creator should persist across scenes

### Expected Pass Criteria
- Same creator identity throughout
- Same product colorway and silhouette throughout
- No random wardrobe or environment changes that break logic

### Failure Signals
- Product changes color or shape between scenes
- Creator appears to become a different person
- Kitchen scene uses one bottle design, gym scene uses another
- Wardrobe changes with no narrative reason

### Severity
**CRITICAL_FAIL**

---

## Case 06 — Overproduced TV Commercial Feel

### Goal
Catch outputs that miss TikTok-native authenticity.

### Input Pattern
- Brief explicitly asks to avoid polished TV commercial feel
- Platform is TikTok

### Expected Pass Criteria
- UGC, handheld, selfie, or creator-native framing is present
- Language feels spoken and natural
- Video concept feels plausible in a real feed

### Failure Signals
- Heavy cinematic language with luxury camera moves
- Glossy ad-style montage with no creator perspective
- Formal brand voice instead of conversational delivery
- Too polished to feel like TikTok-native content

### Severity
**FAIL**

---

## Case 07 — No Real Proof Moment

### Goal
Ensure the storyboard includes visible product evidence rather than empty description.

### Input Pattern
- Product requires at least one blending demo
- Commerce output should sell via visible proof

### Expected Pass Criteria
- At least one scene clearly shows the blender operating
- Product value is demonstrated visually
- Proof connects to stated benefit

### Failure Signals
- The product is only held, pointed at, or mentioned
- No active usage scene
- “Easy” or “portable” is claimed without showing usage
- Demo is too vague to count as proof

### Severity
**CRITICAL_FAIL**

---

## Case 08 — CTA Missing or Detached

### Goal
Verify that conversion-oriented outputs actually end with an action-supportive close.

### Input Pattern
- Storyboard brief requires clear CTA
- TikTok Shop context

### Expected Pass Criteria
- Final scene includes a natural, clear next-step prompt
- CTA matches the audience pain point and demonstrated value
- Ending feels earned by the content

### Failure Signals
- No CTA scene
- Video simply ends on vibe or product beauty shot
- CTA is generic and disconnected, e.g. “Buy now!!!” with no context
- Ending introduces a sales ask without prior persuasive setup

### Severity
**FAIL**

---

## Case 09 — Non-Visual Storyboard Writing

### Goal
Catch outputs that are structured like copy points instead of scenes.

### Input Pattern
- User requests storyboard or shotable visual plan

### Expected Pass Criteria
- Scenes describe visible action, framing, environment, subject behavior, and product presence
- A creator or image model could interpret each beat visually

### Failure Signals
- Output is mostly slogans or marketing bullets
- Scene descriptions are abstract, e.g. “show convenience,” “highlight quality”
- No actual visual staging or action language

### Severity
**FAIL**

---

## Case 10 — Too Many Ideas for the Duration

### Goal
Detect overstuffed concepts that cannot plausibly fit within target runtime.

### Input Pattern
- 18–25 second video
- 6–8 scenes
- Product demo + portability + lifestyle payoff + CTA required

### Expected Pass Criteria
- Scene count and beat density fit the stated duration
- Each scene has a realistic timing footprint
- Concept is concise enough for fast TikTok delivery

### Failure Signals
- Storyboard tries to include too many locations, too many subplots, or too many claims
- Individual scenes would each require several seconds beyond available runtime
- Pacing would be rushed to the point of incomprehensibility

### Severity
**FAIL**

---

## Case 11 — Audience Mismatch

### Goal
Check whether the output actually reflects the target shopper.

### Input Pattern
- Audience: busy women 22–35 interested in fitness, wellness, and convenient routines

### Expected Pass Criteria
- Tone, setting, and problem framing align with this audience
- Use-case details reflect commuting, gym, or healthy-routine context
- Emotional payoff feels relevant to the audience

### Failure Signals
- Tone feels aimed at an unrelated demographic
- Use-case is detached from health or convenience routines
- Script sounds generic enough for anyone without speaking to target context

### Severity
**FAIL**

---

## Case 12 — Product Mutates Into Fantasy Capability

### Goal
Catch subtle escalation beyond brief constraints during “creative enhancement.”

### Input Pattern
- Blender suitable for smoothies, shakes, soft fruit
- Constraints prohibit overclaiming power

### Expected Pass Criteria
- Demo remains within soft-fruit / smoothie use
- Convenience is emphasized without inventing industrial power

### Failure Signals
- Storyboard adds hard ice, frozen blocks, nuts, or impossible blend scenarios
- Creator implies “blends literally anything”
- Product becomes superhero appliance rather than convenient portable cup blender

### Severity
**CRITICAL_FAIL**

---

## Case 13 — Weak Shot-to-Shot Continuity Anchors

### Goal
Ensure downstream image/video generation can preserve consistency.

### Input Pattern
- Storyboard intended to support later shotlist, storyboard frames, or AI generation

### Expected Pass Criteria
- Repeating product descriptors are stable
- Subject, wardrobe, and environment are anchored
- Scene transitions preserve enough detail to maintain coherence

### Failure Signals
- Product is described once, then left generic later
- Subject identity is not re-anchored in practical ways
- Environment becomes too vague for reliable continuity
- Scene descriptions require guesswork to preserve fidelity

### Severity
**FAIL**

---

## Case 14 — TikTok Surface Cues Without True Platform Logic

### Goal
Catch outputs that imitate TikTok language but still behave like conventional ads.

### Input Pattern
- Platform-fit should be genuinely TikTok-native, not cosmetic

### Expected Pass Criteria
- Hook, pacing, retention, and delivery reflect feed behavior
- Creator-native logic exists beyond just saying “POV” or “TikTok”
- Product is integrated into believable in-feed content structure

### Failure Signals
- Uses words like “POV” or “you need this” but pacing remains slow
- Still structured like a polished ad despite TikTok phrases
- Retention logic is weak after the first scene
- “TikTokness” is only skin-deep

### Severity
**FAIL**

---

## Case 15 — Conversion Without Objection Reduction

### Goal
Verify the storyboard reduces at least one likely buyer hesitation.

### Input Pattern
- Portable blender for busy people
- Common objections: too bulky, annoying to use, not worth carrying, not practical for routine

### Expected Pass Criteria
- At least one scene or line reduces friction around use, portability, or convenience
- Product feels easy to adopt into daily life

### Failure Signals
- Features are shown without addressing buyer doubt
- Storyboard never shows carryability, simplicity, or routine fit
- Viewer may still think “sounds nice, but I wouldn’t actually use it”

### Severity
**FAIL**

---

## Case 16 — CTA Tone Break

### Goal
Detect endings that break the established tone.

### Input Pattern
- Storyboard uses relatable, lightly persuasive creator voice

### Expected Pass Criteria
- CTA feels like a natural continuation of the creator’s tone
- Recommendation style matches earlier scenes

### Failure Signals
- Ending suddenly becomes hard-sell, loud, or unnatural
- Tone shifts from relatable routine to aggressive promo language
- Final ask sounds imported from a different ad

### Severity
**FAIL**

---

## Case 17 — Scene Redundancy

### Goal
Catch repetitive storyboard beats that reduce retention.

### Input Pattern
- 6–8 scene short-form storyboard

### Expected Pass Criteria
- Each scene has a distinct job
- No repeated “holding product and talking about it” beats unless meaningfully escalated

### Failure Signals
- Multiple scenes repeat the same benefit with no new proof or context
- Product is shown in nearly identical ways repeatedly
- Viewer learns little after scene 2

### Severity
**FAIL**

---

## Case 18 — Weak Handoff to Shotlist

### Goal
Ensure the storyboard is operationally useful, not just conceptually acceptable.

### Input Pattern
- Output may later be transformed into shotlist, prompt set, or storyboard frames

### Expected Pass Criteria
- Scenes include enough visual detail to derive shot type, location, subject action, and continuity notes
- Temporal order and scene purpose are easy to extract

### Failure Signals
- Storyboard is too vague to become a shotlist without rewriting
- Scene descriptions lack visual nouns and action verbs
- Purpose of scenes is unclear or overlapping

### Severity
**FAIL**

---

## Case 19 — Benefit Overload Without Hierarchy

### Goal
Catch outputs that try to sell too many things at once.

### Input Pattern
- Product has prioritized selling points:
  - portability
  - quick convenience
  - easy operation
  - healthy routine support

### Expected Pass Criteria
- One or two top benefits lead the sequence
- Secondary benefits support rather than compete
- Viewer can remember the main takeaway

### Failure Signals
- Every scene introduces a different major benefit
- Messaging feels crowded or scattered
- No single takeaway dominates viewer memory

### Severity
**FAIL**

---

## Case 20 — Clean Pass Gold Standard

### Goal
Define what a strong passing output should roughly exhibit.

### Input Pattern
- Use sample brief, sample product, and sample script together

### Expected Pass Criteria
- Strong first-scene hook in under 2 seconds
- Product clear by scene 2
- At least one visible blend demo
- Portable lifestyle transition shown
- Same creator and same white blender across scenes
- Conversational TikTok-native lines
- Distinct scene purposes across 6–8 beats
- CTA feels natural and conversion-appropriate
- No unsupported claims
- Storyboard can cleanly become a shotlist

### Failure Signals
- Any major regression matching earlier cases
- Output loses either sellability, TikTok fit, or continuity
- Excessive vagueness prevents downstream execution

### Severity
**PASS target case**

---

## Recommended Review Matrix

Use this matrix when logging regression outcomes.

```csv
case_id,case_name,result,severity,notes
01,Generic Product Swap Syndrome,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
02,Hook Exists but Middle Collapses,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
03,Product Clarity Arrives Too Late,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,CRITICAL_FAIL,
04,Unsupported Claim Drift,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,CRITICAL_FAIL,
05,Visual Identity Drift Across Scenes,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,CRITICAL_FAIL,
06,Overproduced TV Commercial Feel,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
07,No Real Proof Moment,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,CRITICAL_FAIL,
08,CTA Missing or Detached,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
09,Non-Visual Storyboard Writing,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
10,Too Many Ideas for the Duration,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
11,Audience Mismatch,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
12,Product Mutates Into Fantasy Capability,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,CRITICAL_FAIL,
13,Weak Shot-to-Shot Continuity Anchors,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
14,TikTok Surface Cues Without True Platform Logic,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
15,Conversion Without Objection Reduction,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
16,CTA Tone Break,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
17,Scene Redundancy,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
18,Weak Handoff to Shotlist,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
19,Benefit Overload Without Hierarchy,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,FAIL,
20,Clean Pass Gold Standard,PASS|PASS_WITH_WARNINGS|FAIL|CRITICAL_FAIL,PASS,
```

---

## Reviewer Principle

A regression suite for this skill should not only catch bad writing.
It should catch failures of **sellability, continuity, platform behavior, and production usefulness** before they reach downstream generation or users.
