# Constraints Prompt

This file defines the hard constraints, non-negotiable rules, validation expectations, and failure-prevention logic for the storyboard skill.

These constraints apply across:
- brief resolution
- shot-table generation
- shot-manifest derivation
- style-bible drafting
- template recommendation
- prompt-pack construction
- storyboard image handoff
- review and QA

If any soft preference conflicts with a hard constraint, the hard constraint wins.

---

## 1. Deliverable Constraints

The standard workflow supports exactly two primary deliverables:

1. **Shot Table**
2. **Storyboard Image Prompt / Storyboard Image Handoff** *(optional, only when requested)*

Do not add default extra deliverables such as:
- strategy memo
- ad-angle matrix
- competitor analysis
- provider payload dump
- chain-of-thought style reasoning
- self-evaluation section
- generation logs
- prompt debugging notes

Additional outputs are allowed only when the user explicitly asks for them.

---

## 2. Source-of-Truth Constraints

### 2.1 Shot Table Authority
The written shot table is the single source of truth.

### 2.2 Derivative Fidelity
All downstream artifacts must derive from the shot table:
- shot manifest
- style bible
- board metadata
- prompt pack
- rendered storyboard image

### 2.3 Conflict Resolution
If any downstream artifact conflicts with the shot table:
- correct the downstream artifact
- do not retroactively bend the shot table to fit the derivative

### 2.4 No Reverse Authoring
Never generate a board first and then reverse-engineer the shot table from it.

---

## 3. Row Integrity Constraints

### 3.1 One Row = One Shot
Each row in the shot table must represent one distinct camera shot.

### 3.2 Split Triggers
A row must be split when there is a material change in:
- camera setup
- location
- subject/action phase
- product state
- visual purpose
- continuity state
- visible proof focus

### 3.3 No Multi-Scene Compression
Do not collapse multiple meaningful scenes or beats into one row merely to reduce row count.

### 3.4 No Fake Granularity
Do not split one static moment into multiple rows unless there is a real shot distinction.

---

## 4. Language Constraints

Two language layers may exist and must not be confused.

### 4.1 User Conversation Language
Use for:
- headings
- descriptions
- table headers
- recommendations
- notes to the user
- review comments

### 4.2 Video Language
Use for:
- dialogue
- subtitles
- CTA text
- on-screen copy
- panel labels rendered inside storyboard images

### 4.3 Language Integrity Rule
If visible or spoken text appears in the storyboard, it must follow the video language, not automatically the conversation language.

### 4.4 Missing Video Language
If the video language materially affects the result and cannot be safely inferred, it is a blocker and must be clarified.

---

## 5. Product Fidelity Constraints

### 5.1 Product Truth First
Product accuracy outranks aesthetic enhancement.

### 5.2 Preserve Core Product Identity
Preserve:
- silhouette
- proportions
- major components
- visible mechanisms
- label/logo placement when relevant
- packaging orientation when relevant
- material behavior when purchase-critical

### 5.3 No Product Redesign
Do not:
- redesign the product
- beautify it in a way that changes purchase expectation
- invent hidden features as facts
- switch product category
- smooth over critical structural features

### 5.4 Missing Reliable Product Reference
If product appearance is critical and no reliable visual or descriptive reference exists, do not fabricate certainty. Ask before finalizing image-facing output.

---

## 6. Continuity Constraints

### 6.1 Continuity Must Be Preserved
Maintain continuity across:
- product identity
- character identity
- wardrobe class
- environment logic
- lighting logic
- lens feel
- tone and polish level

### 6.2 Drift Is Not Allowed Without Narrative Cause
Do not allow unexplained drift such as:
- the product changing size or form
- the same role appearing as a different person
- background context switching incompatibly
- lighting changing from daylight realism to dramatic studio stylization
- texture realism changing arbitrarily across shots

### 6.3 Continuity Priority
If forced to simplify, preserve continuity before decorative detail.

---

## 7. Shot Table Content Constraints

The canonical shot table columns are fixed:

`# | Duration | Shot size / angle | Camera move | Transition | On-screen content | Audio`

### 7.1 Column Order Must Not Drift
Do not reorder the standard columns unless the user explicitly requests a different production table.

### 7.2 On-Screen Content Minimum
Each row’s on-screen content must include enough detail to identify:
- subject
- action
- product position
- scene/context
- visible proof or key visual function
- visible text if any

### 7.3 Audio Minimum
Audio must contain the relevant spoken/dialogue/music/SFX information needed to understand the beat.

### 7.4 Avoid Empty Utility Fields
Do not leave essential columns conceptually empty by filling them with meaningless placeholders.

Bad examples:
- `Camera move: dynamic`
- `Transition: normal`
- `Audio: music`
- `On-screen content: product shown`

These are too vague.

---

## 8. Motion and Transition Constraints

### 8.1 Motion Must Be Purposeful
Camera motion should exist only if it improves clarity, energy, or persuasion.

### 8.2 Static Is Acceptable
Default to static when motion adds no value.

### 8.3 Transition Logic Must Be Functional
Transitions should reflect pacing or meaning, not random stylistic variety.

### 8.4 Avoid Motion Inflation
Do not make every shot handheld, pushing, panning, or arcing without reason.

### 8.5 Avoid Transition Inflation
Do not fill the sequence with whip pans, smashes, or stylized transitions unless the brief genuinely requires it.

---

## 9. Timing Constraints

### 9.1 Timing Must Serve Structure
Do not divide total duration into equal slices mechanically.

### 9.2 Persuasive Rhythm Over Symmetry
Timing should reflect:
- hook urgency
- setup efficiency
- proof clarity
- result emphasis
- CTA landing

### 9.3 Short-Form Compression Rule
In very short formats, compress gracefully rather than overloading rows.

### 9.4 Overloaded Shot Warning
If too much persuasion work is assigned to one row, split the shot or simplify the beat.

---

## 10. Shot Manifest Constraints

The shot manifest is an internal bridge artifact and must remain faithful to the shot table.

### 10.1 Required Mapping
Each shot row must map to one manifest item unless a template-specific compression rule explicitly allows otherwise.

### 10.2 Required Manifest Completeness
Each manifest item should include, where applicable:
- shot_id
- duration
- framing_angle
- camera_motion
- transition
- visual_content
- sound
- panel_label
- beat_role
- mood_tone
- rhythm_energy
- visual_priority
- action_path
- screen_text
- scene
- act
- environment_note
- reference_category

### 10.3 Panel Label Constraint
Panel labels must be short, structural, and readable.

### 10.4 No Promotional Label Drift
Panel labels should not become ad copy slogans unless the workflow explicitly requires that behavior.

---

## 11. Style Bible Constraints

### 11.1 Support Role Only
The style bible supports continuity and prompt stability; it does not replace the shot table.

### 11.2 Product-Specificity Required
A useful style bible must contain product-specific and sequence-specific anchors.

### 11.3 No Empty Aesthetic Abstraction
Avoid generic descriptions that could apply to any ad.

Bad examples:
- “modern and premium”
- “high quality visuals”
- “beautiful atmosphere”

Without operational grounding, these are too weak.

### 11.4 Negative Constraints Required
A strong style bible should specify what to avoid, not only what to aim for.

---

## 12. Template Selection Constraints

### 12.1 Template Is Layout, Not Story
A storyboard template controls presentation format, not narrative facts.

### 12.2 Fit Over Prettiness
Choose the template that best preserves:
- readability
- downstream usefulness
- continuity clarity
- shot logic

Do not choose solely by aesthetic appeal.

### 12.3 Template Change Does Not Rewrite Content
Switching templates must not rewrite or reorder shot facts.

### 12.4 Template Confirmation
When a storyboard image is requested and template choice materially affects output, the workflow should recommend or confirm a template unless the user clearly requests auto-selection.

---

## 13. Prompt Pack Constraints

### 13.1 Fixed Section Order
A storyboard image prompt must begin in this order:

1. `Board template:`
2. `Template intent:`
3. `Global style:`
4. `Layout contract:`
5. `Shot list:`
6. `Panel labels:`
7. `Template-specific annotations:`

### 13.2 No Intro Paragraph
Do not place any explanation before `Board template:`.

### 13.3 No New Story Facts
The prompt pack must not invent:
- new actions
- new props
- new scenes
- new claims
- new product features
- new character logic

### 13.4 Layout Contract Must Be Operational
The layout contract must specify practical rendering constraints, not just aesthetic tone.

### 13.5 Panel Count Fidelity
For one-panel-per-shot templates, panel count must equal shot count within that batch.

### 13.6 Split for Readability
If a single board becomes unreadable, split it into multiple contiguous boards instead of shrinking labels into uselessness.

---

## 14. Board Readability Constraints

### 14.1 No Empty Panels
Do not create blank placeholder cells to force a symmetrical grid.

### 14.2 Sequence Numbers Must Be Readable
Each panel should maintain readable numbering.

### 14.3 Panel Labels Must Stay Short
If labels become too long, shorten them or split the board.

### 14.4 No Long Paragraph Overlays
Do not place dense explanation inside panels.

### 14.5 No Accidental Contact-Sheet Drift
The board should read like a structured production artifact, not a random collage, mosaic, or decorative contact sheet.

---

## 15. Review and QA Constraints

### 15.1 Review Before Finalization
Before final delivery or board rendering, verify:
- brief alignment
- row integrity
- product fidelity
- continuity
- template fit
- prompt-pack fidelity
- readability

### 15.2 Truth Priority Stack
When trade-offs appear, prioritize:
1. truth
2. continuity
3. readability
4. persuasive structure
5. visual polish

### 15.3 Non-Pass Conditions
Do not treat output as ready if:
- rows are structurally invalid
- product identity is drifting
- prompt pack invents facts
- language handling is wrong
- board readability would collapse

---

## 16. Compliance and Claim Constraints

### 16.1 Do Not Upgrade Claims by Styling
Do not make a claim look more certain than the input supports.

### 16.2 Risky Copy Must Stay Identifiable
Potentially risky claims in screen text or spoken copy must remain clearly recognizable for downstream compliance review.

### 16.3 No Hidden Claim Injection
Do not silently add:
- medical claims
- ranking claims
- certification claims
- income claims
- unverifiable superlatives
- before/after implications
- celebrity or competitor associations

unless explicitly provided and intentionally handled.

---

## 17. Failure Patterns to Avoid

Common failure modes include:
- writing a beautiful but unproducible shot table
- over-compressing multiple beats into one row
- under-specifying product appearance
- over-stylizing transitions and camera motion
- confusing user language with video language
- generating decorative panel labels instead of usable ones
- choosing a board template that hurts readability
- producing a global style block that rewrites the script
- adding new story facts in template-specific annotations
- preserving aesthetics but losing product truth

You must actively prevent these.

---

## 18. Minimum Quality Threshold

A valid storyboard package must be:

### Structurally valid
- the table is coherent
- rows are distinct
- fields are meaningful

### Visually actionable
- the shots can actually be visualized
- the product and proof are clear

### Continuity-safe
- repeated entities remain stable

### Prompt-ready
- the downstream board can be built without guessing core facts

### User-relevant
- the result answers the real brief, not a generic ad pattern

If those conditions are not met, the output is not ready.

---

## 19. Constraint Resolution Principle

When two goals conflict, resolve them in this order:
1. preserve factual accuracy
2. preserve product fidelity
3. preserve continuity
4. preserve shot clarity
5. preserve board readability
6. preserve style and aesthetic polish

This ordering is mandatory.

---
