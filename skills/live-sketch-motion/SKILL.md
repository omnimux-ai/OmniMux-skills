---
name: live-sketch-motion
description: |
  Create live-action sketch-motion clips from a real photo, reference video, or text scene. Use for live sketch, live-action sketch motion, marker reveal, photo-to-sketch-motion, doodle motion, or moving subjects progressively becoming hand-drawn. The workflow uses a realistic preview for text scenes, natural pre-drawing motion, marker-tip synchronized reveal, subjects that never freeze, colored-pencil doodle texture, and subtle live-action background motion. Not for static stickers, subtitles, or unrelated VFX.
trigger-words: [Live Sketch Motion, live sketch, live-action sketch motion, sketch motion, marker reveal, marker sketch, photo-to-sketch-motion, doodle motion]
allowed-tools: [question, hub_generate_image, hub_generate_video, hub_analyse_media, hub_save_file_to_session]
---

# Live Sketch Motion

Create a short live-action sketch-motion video from a real photo, a reference video, or a text scene that first needs a simulated real-photo source. The signature effect is: the real scene comes alive naturally; a foreground hand with a blue marker enters; the marker tip progressively draws and reveals a hand-drawn version of the moving subject; the sketch layer stays attached to the subject and continues moving.

Use this Skill when the user asks to generate videos like “Live Sketch Motion”, “live-action sketch motion”, “upload a photo and turn it into a hand-drawn live scene”, “marker reveal sketch video”, or similar. For single-subject clips, keep one continuous shot. The usual output is a short 16:9 or user-specified video template. Default duration is 7–10 seconds unless the user requests otherwise.

## Core Visual DNA

The effect is not a generic white-outline doodle. Preserve these rules:

1. The scene is real and alive: the uploaded photo, reference video, or generated real-photo source must become a natural live-action scene before the sketch reveal begins.
2. All plausible movable elements should have restrained motion: people breathe/blink/turn subtly, animals blink/turn/tail-sway/ear-flick, hair/clothes/leaves/grass/curtains move in light wind, water/light/shadows/background figures move subtly. The primary subject must already be moving in the opening second; do not begin with a frozen subject that only starts moving later.
3. Do not animate the whole background as an artificial effect. Keep the original composition, subject identity, and spatial relations; only plausible movable elements receive small, realistic, life-like motion.
4. A real foreground hand holds a bright blue marker or blue pencil-like marker.
5. The marker is the only drawing trigger. The sketch effect must appear from the marker tip, frame by frame, following the hand’s real motion, speed, direction, contact point, pauses, and short hatching strokes. Where the tip passes, the sketch appears; where the tip has not passed, nothing should pre-reveal.
6. The hand should usually enter from a frame edge, often the lower-right or bottom edge. Show only the hand, wrist, and a short forearm unless the user asks otherwise. Do not let a whole arm cross the frame or cover large areas. The hand must use a natural writing grip: thumb, index finger, and middle finger hold the marker, the barrel angles forward, the wrist is relaxed, and the tip clearly points at the target. Avoid fist grip, reverse grip, holding the tail, fingers wrapped around the barrel, fingers blocking the tip, extra fingers, warped hands, bent marker barrels, or changing marker color/shape.
7. After the sketch conversion is visibly complete, the drawing hand should naturally stop drawing and leave the frame unless the user asks it to remain. The hand and marker should withdraw smoothly downward or sideways like a person finishing a quick doodle; they must not keep hovering, pointing, rubbing, or continuing to smear over the completed subject.
8. Do not use a mechanical wipe, instant patch reveal, whole sticker pop-in, or simple edge tracing. The effect is not drawing around the subject outline; the target’s interior real texture is progressively replaced by a complete flat hand-drawn animated object. Only the selected target changes; background and other objects remain live action unless explicitly chosen as targets.
9. The usual drawing order starts from the subject’s upper-left or head/top area and progresses toward the lower-right. For animals, start with head/ears/upper body, then body/legs/tail. The subject’s movement direction and the reveal direction are separate: even when the subject moves horizontally, the sketch reveal still advances across the subject from upper-left to lower-right.
10. The subject must remain alive before, during, and after sketch conversion. The subject must not stop, wait for the marker, freeze during conversion, disappear, teleport, scale up/down, morph into another object, or become a static sticker. The sketch layer attaches to the moving subject and inherits the original motion path, rhythm, blinking, breathing, tail/fabric/reflective motion, or other natural movement. Conversion must happen while the subject continues its established route; after conversion, it must continue that route or complete the next natural action rather than stopping.
11. For text-only scenes, build a visually layered realistic environment first, then generate a real-photo preview image for user confirmation before video generation. The preview should not contain sketch, sticker, or cartoon effects unless the user explicitly asks for a stylized preview.
12. For a single-subject scene, prefer one continuous medium shot. Avoid frequent cuts, sudden close-ups, focal-length jumps, or abrupt shot-scale changes. Moving subjects may be followed smoothly without changing shot scale.

## Realistic Preview Requirement for Text-Only Scenes

When the user provides only a text scene and wants a final video, use a preview-first route:

- First generate one realistic source preview image that shows the subject, environment, support surfaces, furniture, ground contact, and framing. This image must be photorealistic / real-photo-like by default.
- Do not add hand-drawn effects, stickers, marker hands, subtitles, logos, or visible text to the preview unless the user explicitly asks.
- Use the preview to verify natural spatial logic: the subject is grounded, furniture is physically plausible, chairs/tables are not flat decals, and the subject will not be hidden by obstacles at the planned end pose.
- After the user confirms the preview, use that image as the source frame for the live sketch motion video.

## Sketch Layer Structure

Every converted subject should use a constrained three-layer sketch structure:

- Outer separation edge: a clear, hard-edged, thick white or off-white border around the subject, like a solid white paper cutout backing. It sits only outside the subject, separates the sketch from the live-action background, and must not become glow, blur, translucent halo, or soft feathering unless the user explicitly requests a softer style.
- Main shape line: clear black hand-drawn outline inside the white border. For the default casual-doodle look, keep it medium-to-thick, simplified, loose, and slightly imperfect, with small overshoots, partial non-closures, occasional double lines, broken strokes, minor scratches, and mild boiling-line jitter. Avoid polished vector precision, realistic fur/detail rendering, dense anatomy lines, or finely shaded illustration unless the user explicitly requests a refined style.
- Interior fill: colored pencil / crayon / marker hatching, sparse diagonal strokes, paper-grain feeling, uneven fill, partially white gaps, tiny black ink dots, slight color overrun, never solid flat fill. For the casual-doodle look, keep fill light and sketchy rather than thick, complete, or painterly.

Layer order is mandatory: thick clear white outer border outside, black outline inside it, muted hatched fill inside the outline.

### Sticker-like colored-pencil style template

When the user references a cute sticker / colored-pencil / notebook style, lock the converted subject to this template:

- opaque white or off-white hard sticker border;
- medium-thick black simplified outline with slight hand jitter;
- sparse colored-pencil / crayon diagonal hatching with visible paper grain and white gaps;
- low-saturation, high-brightness macaron colors;
- simplified identity traits only, not realistic fur, dense anatomy, or complex light/shadow;
- a 2D illustrated subject that still moves with the live subject, never a frozen sticker.

Color discipline is mandatory:

- The marker itself stays bright blue.
- Main outline stays black.
- Outer edge stays white/off-white.
- Interior fill uses a limited muted palette only: beige, light brown, warm gray, pale pink, pale lavender, muted light blue, or user-approved soft macaron colors.
- Do not add decorative hearts, stars, dots, sparkles, flowers, icons, or symbols unless the user explicitly asks for them.
- Avoid rainbow chaos, neon overload, saturated random colors, and frame-to-frame color drifting.

## Spatial and Occlusion Rules

For real-scene subjects, preserve physically plausible contact with the environment:

- Animals normally move on floors, sofas, chairs, steps, or other visible support surfaces; they should not float or appear pasted to a wall or tabletop unless the source shows that.
- If a subject jumps onto a chair, sofa, ledge, or platform, land it on a visible front/outer area where the full body remains readable.
- Avoid final poses where chair backs, chair legs, table legs, railings, or furniture bars cut through or hide the converted subject. If furniture is behind the subject, keep the subject in front of it or above it so the head, body, limbs, and tail remain visible.
- Keep the subject size appropriate for the shot. Default to medium shot for one moving subject, with enough environment visible to show the contrast between live-action background and hand-drawn subject.
- When an animal reaches a final perch or furniture surface, keep a small living follow-through such as a tail movement, blink, ear flick, look-back, or user-requested light vocalization. Never freeze immediately upon landing.

## Background Life and Interaction

Background motion should support realism without stealing focus:

- Add small believable changes: window light shifting, soft shadow movement, plants slightly swaying, steam/reflections gently changing, background people breathing/blinking/turning or making tiny hand movements.
- If the scene contains people and an animal passes by, a person may naturally glance at the animal, briefly follow it with their eyes, then return to their own action. Keep this subtle and life-like, not dramatic.
- Do not add unrelated new people, major plot actions, or large background transformations unless the user asks.
- For multi-animal scenes, assign a clear hierarchy: the converted animal is the visual lead; companion animals remain secondary and can react with believable animal behavior such as looking up, ear movement, a small lean, or a few careful steps closer. Do not make companions overly anthropomorphic or let them obscure the lead.

## Sound Design

Audio remains off by default. When the user requests sound or asks for a more immersive drawing effect, use a quiet, natural mix:

- soft marker, crayon, or colored-pencil scratch synchronized with the visible reveal;
- light environmental ambience such as air movement through plants, room tone, or gentle animal footsteps;
- small contact sounds for a jump or landing, plus one brief natural animal vocalization only when requested;
- no narration, no loud music, no dense sound effects, and no subtitles unless explicitly requested.

## STEP 1: Intake and Input Check

Determine whether the user provided:

1. A real photo/image reference.
2. A video reference to imitate.
3. Only a text scene.

If an image is provided, treat it as the source real-photo scene. Preserve its subject identity, layout, camera, lighting, and background unless the user explicitly asks to change them.

If a video is provided, treat it as motion guidance first: extract the subject’s movement path, rhythm, camera behavior, sketch style, and problem areas to preserve or repair. Never let the sketch conversion freeze the moving subject.

If only a text scene is provided, first create a clean realistic photo-like source preview suitable for the effect. Good source images have:

- one clear main subject;
- readable full or near-full silhouette;
- stable medium-shot composition;
- a layered background with depth and visual balance;
- enough empty space for the hand and sketch layer;
- plausible movable elements;
- natural ground/support contact and unobstructed final subject placement;
- an overall visual tone that matches the subject and use case.

Ask only when a blocking choice is missing, such as no clear subject, desired aspect ratio materially changes composition, or the user requests multiple final videos sharing the same subject identity. Subtitles are off by default.

## STEP 2: Create the Production Plan Document

Before any detailed prompt writing or video generation, create a canvas-based production plan document.

The plan should include:

- the input type and what will be preserved;
- whether a realistic preview image is required before video;
- the main subject and any supporting subjects;
- the subject’s motion path and rhythm, including how it keeps moving during conversion;
- the environment’s natural micro-motion and any subtle background interaction;
- spatial/contact logic and final visibility, including furniture occlusion avoidance;
- the marker entrance direction, restrained hand/forearm framing, drawing path, and planned hand exit after completion;
- the reveal rule: where the pen tip lands, the sketch starts there, and every reveal moment stays synchronized with the tip;
- the upper-left-to-lower-right reveal order inside the subject;
- the three-layer sketch structure and any selected style template;
- duration, aspect ratio, audio default, and any open choices that need confirmation.

If the user provided a text scene, stop after the realistic preview image and ask the user to confirm or adjust the source scene before writing the final video prompt.

If the user provided a reference video, summarize what to preserve and what to repair, but do not overfit the reference if the user only asked to fix one problem.

## STEP 3: Create the Detailed Video Prompt

After the plan and preview/source are confirmed, create a second canvas-based document containing the final generation prompt.

The prompt should translate the approved plan into generation-ready instructions with strict language for:

- real scene videoization before sketching;
- continuous live motion in the subject and background;
- the subject moving before, during, and after sketch conversion;
- pen-tip-driven reveal with strict spatial and timing synchronization;
- no reveal before contact;
- slow, casual, loose smearing / hatching rather than fast tracing;
- small continuous reveal patches allowed only where the marker tip just passed;
- no patch pop-in, wipe, scan, static sticker, translucent overlay, or edge-only tracing;
- reveal progressing from the subject’s upper-left to lower-right;
- the subject’s original identity, traits, size, and motion path remaining intact;
- restrained hand entry from an edge, usually lower-right, with natural writing grip;
- the drawing hand naturally withdrawing after the conversion is complete;
- background micro-motion and subtle interaction when appropriate;
- final subject visibility and no furniture occlusion.

Stop after the prompt document and ask the user to confirm before generating the video.

## STEP 4: Generate the Video

Only after the prompt is confirmed, generate the video.

Default video settings:

- Aspect ratio: match source image if provided; otherwise 16:9.
- Duration: 5 seconds for a single-subject single-shot clip; 7–10 seconds for template demos or multi-object scenes. Use shorter duration when marker/line synchronization matters.
- Shot count: single-subject scenes should remain one continuous shot; multi-object scenes may use a few medium-shot cuts, but avoid excessive cuts and close-up inserts.
- Audio: off unless the user explicitly requests sound. If sound is requested, add light upbeat music, subtle marker scratch, and tiny pop/ding at completion.
- Subtitles: off by default.

## STEP 5: Quality Check and Repair

Review the result against this checklist:

- The source scene is alive before drawing starts, not a frozen photo.
- The primary subject is visibly moving within the opening second.
- Plausible background elements have subtle natural micro-motion without whole-background animation.
- The marker tip drives the drawing frame-by-frame.
- Sketch appears only where the marker passed; no large instant patch reveal.
- The reveal is an interior subject replacement, not edge tracing or a translucent overlay.
- Reveal direction progresses across the subject from upper-left to lower-right.
- Three-layer structure is visible: clear thick white hard outer border, black outline inside, hatched fill inside.
- Interior fill is muted and stable, not rainbow or random.
- The subject keeps moving through the entire conversion, not stopping to be drawn.
- After becoming sketch, the subject still inherits its previous motion path and rhythm instead of freezing.
- A final perch, jump, or stop has a natural living follow-through rather than an immediate freeze.
- The hand enters from a clean edge area and does not dominate the frame.
- Hand remains foreground and does not get covered by the sketch layer while drawing.
- After the sketch is complete, the hand naturally withdraws and does not keep hovering, pointing, or rubbing over the subject.
- The final subject remains readable and is not hidden by furniture, chair backs, table legs, or foreground obstacles.
- If the requested style is casual doodle / sticker pencil, the sketch is simplified, loose, medium-to-thick, lightly hatched, not overly detailed or realistic.
- No six-finger/warped hand issues.
- No unwanted text/logos/subtitles/watermarks.

If the result fails, repair using targeted prompt changes:

- Frozen photo or frozen subject: strengthen “source scene must naturally videoize before drawing” and “the subject must keep moving before, during, and after conversion”.
- Subject stops during drawing: strengthen “do not stop to be drawn; sketch layer attaches to the moving subject; conversion happens while walking/blinking/breathing”.
- Subject starts frozen: strengthen “the primary subject begins natural motion in the opening second, before the marker enters”.
- Instant patch: strengthen “frame-by-frame stroke reveal; no mask wipe; no whole patch pop-in”.
- Color chaos: remove colorful/rainbow/neon; add limited palette lock.
- White interior lines: state white only as outer edge, never inside subject.
- Static sketch subject: state the sketch layer stays attached to the moving subject and inherits the original motion path, rhythm, blinking/breathing/tail/fabric movement after conversion.
- Hand/arm dominates frame: state hand enters from lower-right or edge with only hand, wrist, and short forearm visible.
- Hand keeps drawing after completion: state that once conversion is finished, the hand and marker naturally stop, withdraw downward or sideways, and leave the completed subject unobstructed.
- Overly detailed sketch style: state casual doodle style with simplified silhouette, medium-to-thick imperfect lines, sparse hatching, no realistic fur, no dense shading, no polished vector precision.
- Marker mismatch: state line and fill follow marker tip speed, direction, pauses, contact point, and short hatching strokes; no reveal happens away from the tip.
- Edge tracing: state the target’s interior real texture is replaced by a complete flat sketch object, not outlined.
- Soft/glowing border: state hard-edged thick white paper-cutout border, with black outline inside.
- Furniture occlusion: state final subject must be in front of/above furniture and fully readable; chair backs or legs must not cut through the subject.
- Sketch looks too realistic or too flat: lock “simplified doodle silhouette, black loose outline, visible crayon/colored-pencil diagonal hatching, paper grain and white gaps; no realistic fur, painterly shading, or flat vector fill”.
- Unwanted cuts: state single-subject clips must be one continuous medium shot, no sudden close-ups.

## Boundaries

This Skill is for live-action sketch-motion generation from a real photo, a reference video, or a text scene. It is not for pure image editing, static doodle stickers, subtitle generation, ordinary hand-drawn VFX without real-scene videoization, or long narrative videos. For complex multi-shot campaigns, create separate short clips and assemble later.
