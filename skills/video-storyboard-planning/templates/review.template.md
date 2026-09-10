# Review Template

> Version: 1.0.0
> File: `templates/review.template.md`
> Purpose: Define the canonical review and QA template for validating storyboard outputs, shot tables, shot manifests, style bibles, and storyboard image prompt packs.

---

## 1. Purpose

This template defines the standard review structure for checking whether a storyboard package is:

- logically complete
- visually consistent
- structurally valid
- production-readable
- faithful to the brief
- safe for downstream generation or handoff

It is intended for use after drafting and before final delivery or image rendering.

This file is a review framework, not a replacement for the storyboard itself.

---

## 2. Review Scope

This review template can be applied to any combination of the following artifacts:

- user brief
- resolved brief
- shot table
- shot manifest
- board metadata
- style bible
- template recommendation
- storyboard image prompt pack
- generated storyboard image *(if available)*

The reviewer should explicitly note which artifacts were reviewed.

---

## 3. Canonical Review Structure

A complete review should follow this structure:

```text
# Review
## Review Metadata
## Reviewed Inputs
## Overall Verdict
## Structural Validation
## Brief Alignment
## Shot Table Review
## Manifest Review
## Style Bible Review
## Template Fit Review
## Prompt Pack Review
## Continuity Review
## Readability Review
## Risk Flags
## Required Fixes
## Optional Improvements
## Approval Status
```

Sections may be omitted only when the corresponding artifact does not exist.

---

## 4. Master Template

```md
# Review

## Review Metadata
- **Review ID**: {review_id}
- **Project / Sequence**: {project_name}
- **Reviewer**: {reviewer_name_or_role}
- **Review Date**: {review_date}
- **Version Reviewed**: {version_reviewed}
- **Review Purpose**: {review_purpose}

## Reviewed Inputs
- [ ] User brief
- [ ] Resolved brief
- [ ] Shot table
- [ ] Shot manifest
- [ ] Board metadata
- [ ] Style bible
- [ ] Template recommendation
- [ ] Storyboard image prompt pack
- [ ] Generated storyboard image

## Overall Verdict
**Status**: {pass_with_no_changes | pass_with_minor_fixes | needs_revision | blocked}

**Summary**:
{overall_summary}

## Structural Validation
- **Required sections present**: {yes_no}
- **Shot numbering valid**: {yes_no}
- **One row = one shot respected**: {yes_no}
- **Prompt pack order valid**: {yes_no_or_not_applicable}
- **Template slug valid**: {yes_no_or_not_applicable}
- **Critical structural issues**:
  - {structural_issue_1}
  - {structural_issue_2}

## Brief Alignment
- **Product clarity**: {strong | partial | weak}
- **Ad goal alignment**: {strong | partial | weak}
- **Target audience alignment**: {strong | partial | weak}
- **Video language alignment**: {strong | partial | weak}
- **CTA alignment**: {strong | partial | weak}
- **Notes**:
  - {brief_note_1}
  - {brief_note_2}

## Shot Table Review
- **Coverage completeness**: {strong | partial | weak}
- **Timing logic**: {strong | partial | weak}
- **Visual clarity per row**: {strong | partial | weak}
- **Audio completeness**: {strong | partial | weak}
- **Transition logic**: {strong | partial | weak}
- **Findings**:
  - {shot_table_finding_1}
  - {shot_table_finding_2}

## Manifest Review
- **Row-to-shot mapping integrity**: {strong | partial | weak}
- **Panel label quality**: {strong | partial | weak}
- **Beat-role consistency**: {strong | partial | weak}
- **Visual-priority clarity**: {strong | partial | weak}
- **Template-ready completeness**: {strong | partial | weak}
- **Findings**:
  - {manifest_finding_1}
  - {manifest_finding_2}

## Style Bible Review
- **Continuity usefulness**: {strong | partial | weak}
- **Product identity stability**: {strong | partial | weak}
- **Character/environment clarity**: {strong | partial | weak}
- **Prompt compression quality**: {strong | partial | weak}
- **Findings**:
  - {style_finding_1}
  - {style_finding_2}

## Template Fit Review
- **Selected template**: {selected_template}
- **Fit to script/brief**: {strong | partial | weak}
- **Fit to downstream use**: {strong | partial | weak}
- **Fit to readability constraints**: {strong | partial | weak}
- **Notes**:
  - {template_note_1}
  - {template_note_2}

## Prompt Pack Review
- **Board template first-line rule**: {yes_no_or_not_applicable}
- **Template intent present**: {yes_no_or_not_applicable}
- **Global style quality**: {strong | partial | weak}
- **Layout contract clarity**: {strong | partial | weak}
- **Shot list fidelity**: {strong | partial | weak}
- **Panel label readability**: {strong | partial | weak}
- **No invented facts**: {yes_no_or_not_applicable}
- **Findings**:
  - {prompt_finding_1}
  - {prompt_finding_2}

## Continuity Review
- **Product continuity**: {strong | partial | weak}
- **Character continuity**: {strong | partial | weak}
- **Environment continuity**: {strong | partial | weak}
- **Lighting/lens continuity**: {strong | partial | weak}
- **Findings**:
  - {continuity_finding_1}
  - {continuity_finding_2}

## Readability Review
- **Production readability**: {strong | partial | weak}
- **Table compactness vs clarity**: {strong | partial | weak}
- **Board readability if rendered**: {strong | partial | weak}
- **Panel caption brevity**: {strong | partial | weak}
- **Findings**:
  - {readability_finding_1}
  - {readability_finding_2}

## Risk Flags
- **Compliance risk**: {none | low | medium | high}
- **Continuity risk**: {none | low | medium | high}
- **Generation risk**: {none | low | medium | high}
- **Readability risk**: {none | low | medium | high}
- **Misinterpretation risk**: {none | low | medium | high}
- **Flag details**:
  - {risk_flag_1}
  - {risk_flag_2}

## Required Fixes
1. {required_fix_1}
2. {required_fix_2}
3. {required_fix_3}

## Optional Improvements
1. {optional_improvement_1}
2. {optional_improvement_2}
3. {optional_improvement_3}

## Approval Status
- **Approved for final delivery**: {yes_no}
- **Approved for storyboard image generation**: {yes_no}
- **Approved with comments**: {yes_no}
- **Blocked pending fixes**: {yes_no}
```

---

## 5. Review Method

The reviewer should move from high-level to low-level checks in this order:

1. confirm scope
2. confirm brief alignment
3. confirm structural validity
4. inspect shot-table quality
5. inspect continuity controls
6. inspect template fit
7. inspect prompt-pack fidelity
8. assess downstream risks
9. decide approval status

The review should not begin with image aesthetics before checking structure and truthfulness.

---

## 6. Evaluation Guidance by Section

### 6.1 Review Metadata
Used to identify the review pass and what version was checked.

### Must include
- date
- reviewer
- version
- purpose

### Example
```md
## Review Metadata
- **Review ID**: rvw-2025-02-11-01
- **Project / Sequence**: Portable Blender 15s UGC
- **Reviewer**: Storyboard QA
- **Review Date**: 2025-02-11
- **Version Reviewed**: v1.2
- **Review Purpose**: Pre-render storyboard validation
```

---

### 6.2 Reviewed Inputs
Used to clarify what was actually reviewed.

### Rules
- Check only items that truly existed.
- If something important was missing, note it later as a structural or process risk.

---

### 6.3 Overall Verdict
A short executive summary.

### Allowed status values
- `pass_with_no_changes`
- `pass_with_minor_fixes`
- `needs_revision`
- `blocked`

### Example
```md
## Overall Verdict
**Status**: pass_with_minor_fixes

**Summary**:
The storyboard package is structurally strong and well aligned to the brief. The main issues are one over-compressed proof shot, slightly long panel labels in the prompt pack, and a missing continuity note for packaging orientation.
```

---

### 6.4 Structural Validation
Checks whether the package is even valid before style discussion.

### Must check
- missing sections
- shot numbering issues
- merged multi-shot rows
- malformed prompt-pack order
- invalid template slug
- missing required fields

### Example issues
- shot 4 combines two camera setups
- prompt pack starts with explanatory paragraph instead of `Board template:`
- panel label count does not match shot count

---

### 6.5 Brief Alignment
Checks whether the output actually solves the requested problem.

### Must check
- product is correct
- user goal is reflected
- audience assumptions are reasonable
- video language is respected
- CTA is present and suitable

### Weakness examples
- luxury tone used for a practical UGC brief
- CTA absent from a conversion-focused ad
- video language mismatch between table and image text instructions

---

### 6.6 Shot Table Review
This is one of the core review sections.

### Must check
- one row per shot
- clear timing progression
- meaningful transitions
- visual clarity
- readable and useful audio field
- no redundant rows
- no skipped logic between beats

### Strong signs
- hook appears early and clearly
- product proof is visible, not abstract
- CTA resolves naturally
- row language is compact but production-usable

### Common failures
- on-screen content too vague
- audio absent or generic in every row
- overuse of camera movement
- no clear product reveal

---

### 6.7 Manifest Review
Checks whether the internal shot structure is truly usable for image generation.

### Must check
- every row has a manifest entry
- panel labels are short and useful
- beat roles are coherent
- rhythm values make sense
- visual priorities are specific
- action paths are clear when needed

### Common failures
- every beat role set to `proof`
- panel labels too promotional
- `visual_priority` too vague like “nice composition”
- missing `screen_text` normalization

---

### 6.8 Style Bible Review
Checks whether the continuity controls are actionable.

### Must check
- product truth is explicit
- character continuity rules are sufficient
- environment logic is stable
- lighting/lens are helpful
- prompt compression summary is usable

### Common failures
- generic style bible that could fit any product
- no product-specific non-negotiables
- no explicit “avoid” constraints
- prompt compression summary too long or too vague

---

### 6.9 Template Fit Review
Checks whether the selected board format is the right one.

### Must check
- fit to tone
- fit to shot count
- fit to downstream use
- fit to readability
- fit to act structure or action-rhythm needs

### Common failures
- choosing campaign board for rough director-planning use
- choosing action-rhythm board for a static product detail sheet
- forcing one board when shot count makes labels unreadable

---

### 6.10 Prompt Pack Review
Checks whether the prompt pack is generation-ready and faithful.

### Must check
- strict section order
- layout contract clarity
- shot list fidelity to manifest
- no invented facts
- readable labels
- template-specific annotations stay within scope

### Common failures
- global style repeats the whole story
- layout contract too poetic, not operational
- shot list changes product facts
- annotations introduce new scenes or props

---

### 6.11 Continuity Review
Checks whether the package will stay coherent across panels.

### Must check
- product shape/color/branding stability
- same lead identity across recurring shots
- background compatibility
- lighting and lens logic consistency

### Common failures
- product changes size across shots
- wardrobe shifts without reason
- environment jumps from office to home kitchen with no narrative bridge
- mixed lighting logic across adjacent shots

---

### 6.12 Readability Review
Checks whether people and models can use the package easily.

### Must check
- table is compact but readable
- prompt pack is scannable
- labels are short enough
- rendered board would remain legible
- no long bloated rows

### Common failures
- rows overloaded with strategy commentary
- labels exceed practical panel space
- too many micro-notes in layout contract
- 16 tiny panels forced into one unreadable board

---

### 6.13 Risk Flags
This section summarizes downstream hazards.

### Risk categories
- compliance risk
- continuity risk
- generation risk
- readability risk
- misinterpretation risk

### Example
```md
## Risk Flags
- **Compliance risk**: low
- **Continuity risk**: medium
- **Generation risk**: medium
- **Readability risk**: low
- **Misinterpretation risk**: medium
- **Flag details**:
  - Shot 5 uses an implied performance claim that may need softer wording.
  - The prompt pack does not clearly preserve package front-facing orientation in all hero shots.
```

---

### 6.14 Required Fixes
This section should only include items that block approval or reduce quality materially.

### Good required fixes
1. Split shot 4 into two distinct rows because the row currently contains both mechanism detail and reaction result.
2. Shorten panel labels 7–10 to fit likely board layout constraints.
3. Add explicit product-orientation continuity rule to the style bible.

### Bad required fixes
- vague suggestions like “make it better”
- cosmetic preferences that do not change outcome quality

---

### 6.15 Optional Improvements
These are useful but non-blocking.

### Good optional improvements
1. Tighten the CTA wording in the final packshot row for stronger purchase intent.
2. Add one clearer environment note to distinguish desk surface from countertop in close-ups.
3. Raise rhythm energy on the hook row if the intended tone is more social-native.

---

### 6.16 Approval Status
This section determines next-step readiness.

### Possible interpretations
- **Approved for final delivery**: user-facing package is strong enough
- **Approved for storyboard image generation**: prompt/render stage can proceed
- **Approved with comments**: usable, but keep comments in mind
- **Blocked pending fixes**: do not proceed

---

## 7. Scoring Variant (Optional)

If a quantitative review is needed, use this optional scorecard.

```md
## Scorecard (Optional)
- **Brief Alignment**: {score}/5
- **Shot Table Quality**: {score}/5
- **Continuity Control**: {score}/5
- **Template Fit**: {score}/5
- **Prompt Readiness**: {score}/5
- **Overall**: {total}/25
```

### Suggested interpretation
- `22–25`: strong
- `18–21`: workable with minor fixes
- `13–17`: needs revision
- `<13`: blocked

---

## 8. Minimal Filled Example

```md
# Review

## Review Metadata
- **Review ID**: rvw-2025-02-11-01
- **Project / Sequence**: Portable Blender 15s UGC
- **Reviewer**: Storyboard QA
- **Review Date**: 2025-02-11
- **Version Reviewed**: v1.2
- **Review Purpose**: Pre-render storyboard validation

## Reviewed Inputs
- [x] User brief
- [x] Resolved brief
- [x] Shot table
- [x] Shot manifest
- [x] Board metadata
- [x] Style bible
- [x] Template recommendation
- [x] Storyboard image prompt pack
- [ ] Generated storyboard image

## Overall Verdict
**Status**: pass_with_minor_fixes

**Summary**:
The package is structurally sound and suitable for a short TikTok conversion storyboard. The core flow is strong, but one proof row is slightly overloaded, two panel labels are longer than ideal, and product-front orientation should be stated more explicitly in the continuity layer.

## Structural Validation
- **Required sections present**: yes
- **Shot numbering valid**: yes
- **One row = one shot respected**: partial
- **Prompt pack order valid**: yes
- **Template slug valid**: yes
- **Critical structural issues**:
  - Shot 4 mixes mechanism proof and reaction payoff too tightly.
  - No structural blocker beyond that compression issue.

## Brief Alignment
- **Product clarity**: strong
- **Ad goal alignment**: strong
- **Target audience alignment**: strong
- **Video language alignment**: strong
- **CTA alignment**: strong
- **Notes**:
  - The practical office-use framing matches the audience well.
  - The CTA is present and tonally aligned with short-form conversion intent.

## Shot Table Review
- **Coverage completeness**: strong
- **Timing logic**: strong
- **Visual clarity per row**: partial
- **Audio completeness**: strong
- **Transition logic**: strong
- **Findings**:
  - The hook lands quickly and clearly.
  - Shot 4 should either simplify its proof burden or split into two rows in a longer version.

## Manifest Review
- **Row-to-shot mapping integrity**: strong
- **Panel label quality**: partial
- **Beat-role consistency**: strong
- **Visual-priority clarity**: strong
- **Template-ready completeness**: strong
- **Findings**:
  - Most panel labels are compact and usable.
  - Labels 5 and 6 could be shortened further for safer board readability.

## Style Bible Review
- **Continuity usefulness**: strong
- **Product identity stability**: strong
- **Character/environment clarity**: strong
- **Prompt compression quality**: strong
- **Findings**:
  - The style bible is practical and product-specific.
  - Add a clearer note that the package front should remain readable in hero-oriented shots.

## Template Fit Review
- **Selected template**: ugc_ad_act_board
- **Fit to script/brief**: strong
- **Fit to downstream use**: strong
- **Fit to readability constraints**: strong
- **Notes**:
  - The act-based layout suits the hook-proof-CTA structure.
  - The current shot count remains safely readable in a single board.

## Prompt Pack Review
- **Board template first-line rule**: yes
- **Template intent present**: yes
- **Global style quality**: strong
- **Layout contract clarity**: strong
- **Shot list fidelity**: strong
- **Panel label readability**: partial
- **No invented facts**: yes
- **Findings**:
  - The prompt pack stays faithful to the shot structure.
  - Two labels are slightly long for small-panel layouts.

## Continuity Review
- **Product continuity**: strong
- **Character continuity**: strong
- **Environment continuity**: strong
- **Lighting/lens continuity**: strong
- **Findings**:
  - Continuity is stable across the package.
  - Product-facing orientation could be stated more explicitly in the hero and CTA shots.

## Readability Review
- **Production readability**: strong
- **Table compactness vs clarity**: strong
- **Board readability if rendered**: strong
- **Panel caption brevity**: partial
- **Findings**:
  - The table is compact and usable.
  - A small label pass would improve board readability further.

## Risk Flags
- **Compliance risk**: none
- **Continuity risk**: low
- **Generation risk**: low
- **Readability risk**: low
- **Misinterpretation risk**: low
- **Flag details**:
  - Slight chance of panel-label crowding in smaller rendered thumbnails.
  - Product-facing orientation should be reinforced to reduce model drift.

## Required Fixes
1. Shorten the two longest panel labels for safer small-panel readability.
2. Add a continuity note preserving package/product front-facing orientation in hero-biased shots.
3. Simplify or split the most compressed proof row if extending this concept into a longer version.

## Optional Improvements
1. Tighten the final CTA row wording for even stronger purchase clarity.
2. Add one environment note distinguishing desk close-ups from wider lifestyle context.
3. Slightly increase rhythm energy on the opening hook if a more social-native cut feel is desired.

## Approval Status
- **Approved for final delivery**: yes
- **Approved for storyboard image generation**: yes
- **Approved with comments**: yes
- **Blocked pending fixes**: no
```

---

## 9. Usage Notes

Use this file:
- as a review framework before final delivery
- as a QA checklist before storyboard image generation
- as an internal consistency audit tool
- as a handoff validator between writing and rendering stages

Do not use this file:
- as the storyboard itself
- as a substitute for the brief
- as a template catalog
- as a generation prompt

---
