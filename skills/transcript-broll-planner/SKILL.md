---
name: transcript-broll-planner
description: |
  Plan transcript-driven B-roll for talking-head and knowledge videos. Use when the user provides a script, voiceover, data table, screenshots, or references and needs semantic segmentation, shot selection, missing-material checks, bilingual on-screen text control, continuous one-take design, a reviewable B-roll plan, and approval-gated generation. Trigger for transcript B-roll planning, talking-head B-roll, voiceover B-roll, narration B-roll, or B-roll shot planning.
trigger-words: [transcript B-roll planner, B-roll planning, transcript-driven B-roll, talking-head B-roll, voiceover B-roll, narration B-roll, B-roll shot planning]
allowed-tools: [question, hub_analyse_media, hub_generate_image, hub_generate_video, hub_canvas_get_node, hub_canvas_group_recent_outputs, hub_save_file_to_session]
---

# Transcript B-roll Planner

Use this Skill when the user already has a transcript, voiceover draft, data-rich narration, or talking-head script and wants a repeatable workflow that turns it into B-roll planning and generation. It is designed for knowledge videos, explainers, market analysis, and transcript-led editing where the model must decide what should stay as A-roll, what needs visual support, and what should become a separate B-roll shot or a beat inside a continuous one-take.

## Inputs

Required:
- A transcript, voiceover draft, or script with enough text to segment by meaning.

Optional:
- Existing footage, screenshots, logos, UI captures, product photos, documents, maps, charts, data tables, or other reference materials.
- User constraints such as aspect ratio, duration per shot, continuous-shot requirements, style direction, on-screen text language, target generation model, or whether the output should be more literal or more abstract.

Do not use this Skill for a one-off image prompt, pure subtitle export, simple trimming, or unrelated long-form editing tasks.

## STEP 1: Split the Transcript by Meaning

Read the transcript and break it into semantic units, not just punctuation-based sentences.

For each unit, decide whether it should become:
- A-roll retention
- Evidence-driven support
- Existing-material reuse
- text packaging / motion typography
- pure visual B-roll

Rules:
- Keep one core idea per shot whenever possible.
- Prefer fewer, clearer shots over over-cutting the script.
- If the user asks for a continuous one-take B-roll, design all units as beats inside one continuous camera move instead of separate disconnected shots.
- If a line contains claims, numbers, brand names, legal text, citations, or any word that must be exact, mark it for evidence or deterministic handling instead of free-form visual invention.
- If the transcript is too weak to segment confidently, ask the user for the full script or a cleaner transcript before continuing.

## STEP 2: Choose the Best Template Route

Match each semantic unit to the most suitable template family below.

Use the template family that best fits the content type:
- conclusions, reversals, punchlines → kinetic statement
- concepts, single metaphors, hero ideas → concept hero
- verified numbers and rankings → number impact
- evidence, articles, reports, and citations → evidence excerpt or evidence desk
- processes, causality, workflows → relation flow or chapter sequence
- comparisons and contrasts → split system comparison
- systems, organizations, mechanisms, taxonomies → white diorama system, branching taxonomy network, or technical mechanism explainer
- products, parts, or assembly logic → 3D product assembly
- geography, maps, supply chains, or global distribution → geospatial intelligence map

Rules:
- Choose the simplest template that still expresses the meaning clearly.
- Do not force a visual metaphor when the content is better served by evidence or a clean overlay.
- If the transcript contains multiple ideas that would fight each other in one shot, split them into separate shots or separate beats inside a continuous one-take.

## STEP 3: Identify Missing or Required Materials

Check whether the shot needs assets the user has not provided yet.

Common missing materials:
- logo or brand lockup
- product photos
- app or website screens
- charts, papers, screenshots, or source tables
- identity references for a recurring person or character
- maps, diagrams, or technical illustrations
- precise text that must appear on screen

Rules:
- Call out missing essentials before generation.
- Do not invent factual content, brand claims, citations, legal text, or source references.
- If a shot depends on exact wording, require the exact wording from the user or a trustworthy source.
- If the user specifies an on-screen text language, keep all on-screen text in that language while keeping the generation prompt in the user's requested prompt language.
- MiniMax-H3 is the default video model. If the user explicitly specifies another model, follow that choice after a capability check.

## STEP 4: Produce a Reviewable B-roll Plan

Create a shot-by-shot or beat-by-beat plan that the user can review before any video generation.

Each plan item should include:
- shot or beat id
- source transcript segment
- template family
- visual purpose
- required assets
- on-screen text limits and language
- motion and continuity notes
- whether it needs generative video, evidence, or a deterministic tool instead of free generation

Rules:
- Keep each shot or beat focused on one core semantic unit.
- Keep on-screen text short and readable.
- When the text load becomes too heavy, split the shot or remove free text and move the idea into a cleaner visual solution.
- When the user requests continuity, explicitly describe how one visual form transforms into the next.
- If the user asked for a more polished, more literal, or more continuous result, adjust the plan accordingly while preserving the semantic structure.

## STEP 5: Ask for Approval Before Generation

Stop after the plan is ready and wait for the user to approve the shots or request edits.

Approval is required before any real video generation.

Do not skip this gate even if the plan looks obvious.

## STEP 6: Generate the Approved Shots

After approval, generate only the approved shots or approved continuous take.

Rules:
- Batch similar work together when possible.
- Preserve continuity across shots that share the same subject, product, data system, or visual world.
- Use the review plan as the source of truth for shot order, beat order, motion continuity, and asset requirements.
- If a shot fails, retry only the missing or rejected part once instead of redoing the whole plan. If it still fails, switch to MiniMax-H3 or another available model instead of repeatedly retrying the same model.
- Keep generated outputs organized so they can be reviewed and reused in later edits.

## STEP 7: Deliver the Plan and Assets

Return the final B-roll plan, generated shots, and any missing-material notes in a form the user can review immediately.

This Skill is best for transcript-driven B-roll planning and approval-gated video generation. It is not intended for pure subtitle translation, simple trimming, long-form scriptwriting, or unrelated branding workflows.
