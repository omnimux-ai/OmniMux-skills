---
name: brand-font-effect-editor
description: |
  Brand font-effect transfer Skill. Identifies logo lettering, bubble fonts, handwriting, decorative type, and brand custom fonts in a reference image, then transfers either the glyph shape or the full font effect onto specified text in a target image. Produces a font-identification report first, then confirms font source, licensing version, replacement target, text content, copy scope, output size, and font size through a single selection card. Trigger words include: brand font transfer, font recreation, font replacement, logo font transfer, bubble font replacement, copy font style, replace font effect.
trigger-words: [brand font transfer, font recreation, font replacement, logo font transfer, bubble font replacement, copy font style, replace font effect]
---

# Brand Font-Effect Transfer

Transfers a font or brand font effect from a reference image onto a target image. Particularly suited for logo lettering, bubble fonts, handwriting, decorative type, brand custom fonts, and title effects with strokes / gradients / highlights / outer glows.

Supports two outcomes:

- Identification only: output a font report with commercial-free alternative suggestions.
- Identify and replace: identify the reference font first, then replace specified text in the target image.

## Step 1: Receive Reference Image 1

When the user uploads the first image, treat it as the font-source reference image directly. Do not ask about intent.

If the user uploads two images at once, remind them of the ordering: identify reference image 1 first, then upload target image 2.

## Step 2: Identify Fonts in Reference Image 1

Analyze all visible text in reference image 1 and organize the result as a table.

Must cover:

- Text content
- Font style: serif, sans-serif, handwriting, decorative, logo type, bubble, etc.
- Weight: Light, Regular, Medium, Bold, Black, Ultra-Bold
- Letter spacing: tight, normal, loose
- Color
- Effects: stroke, shadow, gradient, highlight, outer glow, 3D, etc.
- Closest matching font name, or a "custom brand glyph" judgment
- Licensing type: only "commercial-free" or "commercial-paid"
- If commercial-paid, recommend 1-2 visually similar commercial-free alternatives

Output table format:

| Text | Font name | Weight | Color | Effect | Licensing | Similar commercial-free font |
|---|---|---|---|---|---|---|

After identification, if the user has no replacement need, the flow may end. If the user uploads a second image or expresses a replacement need, proceed to the next step.

## Step 3: Receive Target Image 2

When the user uploads the second image, treat it as the target editing image directly. Do not ask again whether to continue.

## Step 4: Identify Fonts in Target Image 2

Analyze all visible text in target image 2 using the same dimensions and table format as Step 2.

After identification, always summarize the font information of target image 2 for the user before entering the selection card. Do not skip the summary.

## Step 5: Single Selection Card to Confirm Replacement Parameters

Use one selection card to ask everything at once. Do not open-ended-ask each dimension one at a time. Give a recommendation for each dimension and place it first.

Must confirm:

1. Font source: which piece of text in reference image 1 to use as the font or effect source.
2. Licensing version: use the original-style replica, or a commercial-free alternative font direction.
3. Replacement target: which piece of text in target image 2 to replace.
4. Text content: keep the original text or change to new text.
5. Copy scope:
   - Font only: transfer glyph outline only; preserve the target's original color and effects.
   - Font + style: also transfer fill color, gradient, stroke, shadow, highlight, glow — the full font effect.
6. Output size: keep the target image's original size, or output an ultra-HD version.
7. Font size: keep original size, or allow slight shrinking to avoid overflow.

Once the user answers the selection card, treat it as confirmed. Continue execution immediately. Do not restate and wait for confirmation again.

## Step 6: Read Target Image Dimensions

Before executing image editing, read the exact pixel dimensions and aspect ratio of target image 2.

- If the user chose to keep original size: write the target size and aspect ratio explicitly in the edit instruction. If the generation model outputs a slightly different size, restore it to the original with a deterministic resize.
- If the user chose ultra-HD: keep the same aspect ratio and output at a higher resolution.

## Step 7: Write the Image-Editing Instruction

The edit instruction must be self-contained and include:

- Path to target image 2
- Path to font-source reference image 1
- The target text to be replaced
- The replaced text content
- A complete visual description of the source font — not just a font name
- Copy scope
- Size requirement
- Font-size strategy
- Every element that must remain unchanged

If "Font only" is chosen, always emphasize:

- Change glyph outline only
- Preserve the target image's original text color, stroke, shadow, gradient, transparency, and all effects
- Do not copy the source image's color and effects

If "Font + style" is chosen, describe the source image's fill color, stroke, shadow, gradient, highlight, glow, and decorative details.

Always emphasize: except for the specified text, the background, characters, buttons, icons, other text, composition, colors, transparency, and shadows must all stay unchanged.

## Step 8: Execute Image Editing

Use target image 2 as the editing source, and reference image 1 as the font-source reference.

Prefer image models that support image editing, text control, and multi-reference input. Do not let the sub-flow pick the model on its own — write the model field explicitly at dispatch time.

Do not specify the output file name; let the generation tool auto-name to avoid breaking asset tracking.

## Step 9: Result Check and Delivery

At delivery, state:

- Output image path
- Font source
- Replacement target
- Copy scope
- Whether the original size is kept
- Which elements remain unchanged

If the user says the font isn't similar enough or other elements got altered, prioritize adjusting the edit instruction:

- Strengthen glyph visual description — bolder, rounder, narrower, more inflated, more handwritten, etc.
- Strengthen the "keep unchanged" requirement
- Split the replacement scope — replace the main title first, then handle other text
- Toggle between original-style and commercial-free alternative

## Notes

- Commercial licensing has only two outputs: commercial-free, commercial-paid.
- Brand custom logo lettering should normally be marked as commercial-paid or proprietary licensing.
- Font names are not always accurately understood by image models — always transcribe them into visual features.
- After a selection-card reply, do not wait for another "continue".
- If the user only uploads one image, first complete the font identification report.
- If the user explicitly wants identification only, do not enter the replacement step.
