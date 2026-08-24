---
name: lip-product-ad-generator
description: |
  Create a horizontal lip-product TVC from references or from scratch. Produce the model portrait, 3×3 product still life, and storyboard in that order; after approval, generate H3 shot segments, background music, and the final composite. Preserve model identity, packaging, texture, readable copy, and natural interaction with products and props, with segment-level retries. Use for lipstick, gloss, tint, mud, oil, and glaze ads, not skincare, eye makeup, or generic beauty reels.
trigger-words: [lip product TVC, lipstick ad, lip gloss TVC, lip tint, lip mud, lip oil, lip beauty, lipstick commercial, horizontal 30s, background music]
---

# Lip Product TVC

Use this Skill when the user wants a complete horizontal lip-product commercial workflow that starts from scratch and ends with a finished 30s TVC with background audio. It is optimized for lipstick, lip gloss, lip tint, lip mud, lip oil, lip glaze, and similar lip-color ads where model identity, product presentation, packaging text, and finish consistency matter more than general beauty footage.

## STEP 1: Generate the Model Portrait

When no approved model portrait exists yet, create the model image first. The model should match the latest creative direction or the user's brief, and should be suitable for lip-product advertising. Keep the portrait composition, identity, lighting, and beauty style stable enough to support later video generation. If the user already uploaded a model image or a canvas model node exists, use that as the locked reference instead of regenerating it.

## STEP 2: Generate the Product Still-Life Image

Create the product still-life image after the model portrait. The still-life must be a 3x3 grid composition. Use the exact prompt words from the canvas still-life image node or the latest storyboard prompt as the generation source of truth, and keep the product form, packaging, label placement, applicator, and finish aligned with that prompt. If the brand or packaging is not fixed, keep the still-life broad but clearly lip-product-specific, and avoid inventing a brand mark. When a product reference already exists, treat it as the anchor and preserve the visible product traits in later stages.

## STEP 3: Write the Storyboard Script

After the model portrait and the 3x3 product still-life image both exist, write or refine the storyboard script for the final 30s piece. Do not start video generation before these three assets are complete: model portrait, 3x3 still-life image, and storyboard script file. The script should define the shot order, time windows, product claims, text-overlay rules, and the closing end card. If the user provides a script, treat it as the source of truth and update the workflow to match it. If the user later asks for a change, rewrite only the affected section of the script and keep the rest aligned.

## STEP 4: Inspect Inputs and Lock the Final Plan

Read the model image, 3x3 product still-life image, and latest storyboard script file together before generation. Video generation is allowed only after all three are present and approved. Extract the model identity, lip color, product form, label, pack design, texture, and any text-overlay rules. If the script conflicts with older instructions, follow the latest script. If the user asks for a replacement shot, preserve the rest of the cut and regenerate only the requested segment.

Do not assume a specific brand, texture, package shape, or lip-product format unless it is visible in the references or explicitly stated in the script. If the references are generic or incomplete, keep the product representation broad and avoid inventing brand details.

Confirm the target output before generation:
- 16:9 horizontal format
- 30s total duration
- lip-product commercial, not a generic beauty montage
- background music required in the final version

## STEP 5: Build the Shot Plan and Generate Video Segments

Turn the storyboard into a shot-by-shot plan with one claim per shot. For a 30s piece, prefer 7-8 shots or 3 modular segments if the user wants faster production. Every script must include: model and product interaction, product texture and prop-contrast proof, and model and prop interaction. Keep text overlays small and confined to negative space. Never place animated text over lips, face, applicator, label, or product geometry.

For lip-product TVCs, always include these proof points somewhere in the cut:
- a model beauty shot
- a product hero shot
- a texture proof shot
- a lip application or finish shot
- a closing packshot or end card
- a model-and-product interaction shot
- a product texture / prop-contrast shot
- a model-and-prop interaction shot

Generate the commercial in small segments that match the storyboard shot plan exactly. Split the video into shot-level micro segments following the storyboard timing and sequence, so each visual beat can be controlled or regenerated independently:
- opening / mood setup
- product or texture proof
- lip result / emotional payoff
- end card or closing packshot

Use the model portrait as the primary identity anchor. Use the 3x3 still-life image only as storyboard, mood, prop, layout, and product-world reference; do not force the video to literally reproduce the 3x3 grid unless the script asks for it. Use product-specific reference details only when they are clearly visible or stated. Do not force a single brand or package archetype unless the references clearly establish it. Keep shade, cap shape, label placement, bottle shape, and the overall product silhouette stable across all segments when they are visible in the references. Split the video into smaller shot-level segments that mirror the storyboard exactly, so each script beat can be regenerated independently. Ensure the generated shots include natural model-and-product interaction, product texture / prop-contrast proof, and natural model-and-prop interaction. The model may add subtle lively expressions and gestures such as a soft smile, gaze shift, fingertip touch, gentle product handling, slight head turn, or relaxed lip press, so the interaction feels spontaneous rather than posed. If the user asks for one section to be redone, regenerate only that section and keep the untouched segments unchanged.

For H3 workflows, remember that the model has a minimum useful segment length, so short end-card fixes may need to be rendered slightly longer and then trimmed back during final assembly.

## STEP 6: Add Background Music

Every finished TVC must include background audio. If the user provides a music reference, extend or adapt it to the full 30s final cut; if not, generate a fresh instrumental track that matches the storyboard mood. The music should support the visuals, not overpower them: sweet, airy, glossy, youthful, premium, and clean. Avoid vocals unless the user explicitly requests a song.

When the user asks for the final piece, do not stop at silent video. Make sure the delivery path includes audio generation or audio extension before export.

## STEP 7: Composite, Replace, and Validate

After segment generation, assemble the final 30s horizontal TVC in the storyboard order. If one segment is updated, replace only that portion and re-export the full cut. If the user requests no on-screen text, remove all graphic overlays before delivery.

Before handing over the result, verify:
- the final video is 16:9 and 30s long
- the model and product still match the references or the latest script
- the requested section was regenerated if applicable
- the final export contains background audio
- text overlays do not block the face, lips, or product
- the end card matches the latest storyboard wording
