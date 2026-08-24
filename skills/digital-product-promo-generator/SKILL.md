---
name: digital-product-promo-generator
description: |
  Turn a product, webpage, frontend project, or shot reference into a cinematic promo. Collect the real URL, screenshots, brand assets, duration, and ratio; analyze its visual language; propose a reviewable shot, rhythm, and sound plan; then generate and edit the approved video. Treat Ink Press or shot-card references as style constraints, not bundled assets. Use for launch films, feature demos, and product storytelling, not generic editing or unrelated motion art.
trigger-words: [digital product promo, product video, promo video, shot card, frontend promo, webpage video, 数字产品宣传片, 网页产品视频]
allowed-tools: [question, webfetch, hub_analyse_media, hub_generate_video, hub_generate_audio, hub_video_edit, hub_save_file_to_session]
---

# Video Shotcraft

Use this Skill to turn a real product, webpage, frontend project, or supplied motion reference into a polished product promo with authentic interface visuals, purposeful camera movement, beat-aware editing, and sound design.

## Inputs

Collect only the missing information:

- Product URL, screenshots, screen recordings, or frontend assets.
- Brand assets and any product text that must remain exact.
- Target duration and aspect ratio.
- Intended audience, launch message, and delivery context when they affect the cut.
- Optional Ink Press reference, shot card, or motion example supplied by the user.

Do not claim that an Ink Press template, shot-card library, Remotion project, or audio pack is bundled with this Skill. If the user names one of these references but does not supply it, ask for the reference or clarify the desired visible effect.

## Workflow

1. Inspect the supplied URL and media. Preserve the product's real layout, typography, colors, copy, and interaction logic; do not invent unsupported features or UI states.
2. Confirm the duration and aspect ratio. Ask about platform or export details only when they materially affect framing, timing, or delivery.
3. Decide whether the request is a complete promo or a single motion shot. Treat any user-supplied template, Ink Press example, or shot card as a reference constraint, not as an assumed bundled asset.
4. Draft a reviewable plan covering the narrative arc, shot order, camera movement, UI focus, transition logic, on-screen text, rhythm, music or sound design, and required source assets.
5. Stop for user approval before costly generation or final assembly. Surface missing screenshots, recordings, copy, logos, or style references explicitly.
6. Generate approved video shots with MiniMax-H3 by default. If the user explicitly specifies another model, check that it supports the required input references, duration, resolution, aspect ratio, and audio needs before following that choice.
7. If a user-specified model fails, make at most one targeted retry after correcting the likely parameter, prompt, or reference issue. If it still fails, switch to MiniMax-H3 or another available capable model instead of repeatedly retrying the same model.
8. Generate or source only the approved sound elements, edit the shots, and check visual continuity, text accuracy, beat alignment, audio balance, and clean opening and end frames.
9. Save the final deliverable and summarize the chosen format, duration, ratio, source references, and any substitutions made during generation.

## Execution Rules

- Prefer real screenshots or recordings when the video represents an actual product interface.
- Use 2.5D moves, depth separation, crops, zooms, pans, perspective shifts, or parallax only when they clarify the product story.
- Keep readable product and brand text exact. Do not infer claims, prices, metrics, or features that are not present in user-approved sources.
- Match motion and sound to the product's tone; avoid decorative movement that competes with the interface.
- Preserve user-supplied reference intent while adapting it to the target product rather than copying unrelated brand content.

## Boundaries

Use this Skill for product promos, launch clips, feature demos, and web or desktop product storytelling. Do not use it for unrelated generic editing, talking-head cleanup, or non-product motion art.
