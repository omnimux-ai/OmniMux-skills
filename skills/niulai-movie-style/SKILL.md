---
name: niulai-movie-style
description: |
  Turn a supplied photo into awkward primitive low-poly 3D. Use for Niulai movie style, primitive folk CGI, bootleg CGI, early game imagery, crude characters, or awkward motion/camera. Preserve subject count, layout, action, camera, scene type, props, and colors while degrading geometry, proportions, rigging, collisions, textures, lighting, rendering, and motion. Requires an image unless a new scene is requested; not for pixelation, VHS, horror distortion, low-poly art, or cinematic animation.
trigger-words: [niulai movie style, niulai camera movement, protagonist motion, reverse viral low quality, crude character low-poly, early 3D game screenshot, primitive folk CGI, bootleg CGI, failed low-poly]
allowed-tools: [question, hub_analyse_media, hub_generate_image, hub_generate_video, hub_save_file_to_session]
---

# Niulai Movie Style

Transform a source image into a sincere but technically limited early-3D reconstruction. The output should remain readable and related to the source, but its low quality must come from the whole production stack: sparse topology, broken proportions, stiff rigging, local collision failures, crude faces, tiny repeated textures, reused assets, naive lighting, and cheap rendering. A stylish or attractive low-poly illustration is a failure.

Core principle: preserve large relationships; intentionally abandon fine reproduction.

Model policy: Use MiniMax-H3 as the default video model. If the user explicitly names another model, check its capabilities and follow that choice. If generation fails, retry once with a targeted adjustment, then switch to another capable model instead of repeatedly retrying the same model.

## STEP 1: Confirm Input and User Intent

- At the beginning of normal use, guide the user to upload a photo/image as the source. Briefly say that the Skill works best when it can preserve the user's real subject, composition, and broad scene anchors.
- Require a source image unless the user explicitly asks to invent a new scene. If no image is present, ask the user to upload one before generation instead of starting from text-only defaults.
- Execute directly when the user supplies an image and asks for the default treatment, asks the agent to decide, or asks to apply the Niulai look.
- If the user asks for prompt-only work, treatment options, or approval before generation, return at most three treatment options and do not generate.
- Ask at most one blocking question only when a missing decision changes the output materially, such as gentler degradation, stronger likeness, prompt-only delivery, or a non-source aspect ratio.
- Treat the task as image reconstruction/editing, not compression, pixelation, polygon overlay, or a post-filter.

## STEP 2: Analyze Source Anchors Internally

Extract only the anchors needed to keep the result recognizable:

- subject count and broad subject type;
- large hairstyle or silhouette masses, garment category, dominant color blocks, and major props;
- semantic action or relationship, rough facing direction, and broad left-to-right arrangement;
- crop, camera height, perspective, horizon, depth layers, scale, spacing, occlusion, and scene category;
- three to six large color blocks worth preserving visually.

Also identify deliberately mutable details: exact anatomy, precise joint angles, clean silhouette, body ratios, garment fit, mesh separation, fine likeness, subtle expression, hair strands, embroidery, microtexture, small signs, and incidental decoration.

## STEP 3: Choose Preset and Strength

Default preset is `primitive_folk_cgi`:

```yaml
preset: primitive_folk_cgi
reconstruction_strength: extreme
anchor_lock: strict
identity_lock: medium
detail_budget: very_low
geometry: primitive_low_poly
polygon_budget: extremely_low
proportion_fidelity: deliberately_broken
pose_lock: semantic_action_only
pose_quality: stiff_failed_rig
collision_quality: visible_clipping
clipping_count: 1_to_3
texture_resolution: very_low
material_model: diffuse_only_mismatched
asset_reuse: heavy
lighting: naive_single_light
ratio: source_ratio
```

Read `references/style-system.md` only when a source type or user request suggests another preset, such as gentler likeness, architecture, group staging, or genuine night scenes.

## STEP 4: Preserve Meaning, Not Anatomy

- Strictly preserve subject count/type, broad layout, semantic action, camera, scene category, major props, and dominant color blocks.
- Preserve what the action means, not the exact pose. A wave remains a wave and an embrace remains an embrace, but elbows, shoulders, wrists, knees, balance, and torso twist should become simplified and slightly wrong.
- Preserve identity anchors such as species, hair mass, clothing category, markings, and relationship, but do not lock body proportions or source-faithful silhouette.
- Deliberately distort human and animal proportions while keeping subjects recognizable and non-horrific.
- Add one to three readable local clipping failures only where source-evidenced contact exists: sleeve into elbow, upper arm through shoulder or garment, hand into sleeve or prop, loose clothing into torso, fur into harness, or adjacent bodies slightly intersecting.
- Do not hide faces, erase whole limbs, expose bodies, imply injury, or turn every contact into clipping.
- For real people, do not change apparent age, ethnicity, body category, or relationships merely to create the style.
- Add no new people, animals, cow traits, horns, weapons, logos, subtitles, interface elements, landmarks, weather, or props absent from the source.

## STEP 5: Build the Image-Edit Prompt

Read `references/prompt-blueprint.md` before writing a full prompt. Build the prompt in this order:

1. Declare source-based primitive low-budget 3D reconstruction.
2. Lock semantic and compositional anchors while releasing exact pose, silhouette, anatomy, and clean mesh separation.
3. Set extremely low polygon budget and deliberately broken proportions.
4. Specify stiff failed rigging and one to three plausible clipping zones.
5. Specify crude faces, eyes, hair, hands, paws, hooves, and joints as relevant.
6. Require very-low-resolution diffuse maps, obvious tiling, UV stretching, and heavy asset reuse.
7. Strip background detail down to sparse repeated scene primitives.
8. Specify naive single-light or preset-appropriate lighting, uneven exposure, and cheap render limitations.
9. State source ratio or confirmed ratio, text behavior, and source-tailored prohibitions.

Prefer observable production failures over generic labels like ugly or bad quality. Mention a named game, engine, meme, film, or era only if the user asked; translate it into geometry, materials, lighting, and rendering properties.

## STEP 5A: Add Motion and Camera When Needed

When the user requests video, image-to-video, protagonist motion, or camera movement, read `references/motion-camera.md` before writing the video prompt. Keep the same Niulai production thesis in motion:

- protagonist movement should be stiff, segmented, and under-simulated;
- turns should often pivot the whole body as one rigid unit;
- jumps, falls, or forward movement should use constant-speed linear translation;
- gestures should pop into place and hold too long, with weak contact and sliding feet;
- eyes should remain vacant, static, or poorly converged instead of polished expressive tracking;
- cameras should use locked-off jump cuts, linear pans or zooms, abrupt starts/stops, awkward low-angle close-ups, and occasional clipping through simple scenery.

Do not replace the user's requested action or shot; apply these rules as the motion/camera failure layer.

## STEP 6: Generate or Return Prompt

- For normal requests, generate/edit one image from the source image and keep the source aspect ratio unless the user explicitly requests another ratio.
- For prompt-only requests, return one production prompt plus one negative block.
- Do not create multiple variants unless the user asks for options.
- Do not use output quantity as prompt text.

## STEP 7: Inspect and Recover

Read `references/quality-and-recovery.md` before judging generated outputs. Retry when the result is too faithful, attractive, detailed, varied, or professionally lit. Reject results where:

- geometry uses many small facets or preserves smooth source-faithful silhouettes;
- proportions remain correct, flattering, or source-faithful;
- poses retain natural balance, weight transfer, or clean contact;
- contact-rich scenes remain perfectly collision-free;
- faces and eyes look polished, cute, or professionally animated;
- textures are clean, unique, high-resolution, or subtly varied;
- backgrounds are rich and individually modeled;
- lighting uses cinematic separation, rim light, soft bounce, volumetrics, or beauty lighting;
- the effect comes only from blur, noise, pixelation, VHS, CRT, JPEG damage, or color grading.

On retry, restate all broad anchor locks, change only the failed dimension, and stop after two retries unless the user asks to continue.

## STEP 8: Output and Video Follow-up

For completed image edits, return the generated image and one compact treatment note naming the preset and retained anchors. Include YAML only when the user requests parameters. For prompt-only requests, return the prompt and negative block without generating.

After a Niulai-style image is successfully generated, ask the user whether they want to continue turning that image into a short video. Keep the question lightweight and concrete: suggest a quick 5-second test by default, with options such as stiff protagonist motion, vacant eye behavior, rigid whole-body pivoting, sliding contact, locked-off jump cuts, or awkward linear camera push-in. Do not start video generation until the user confirms a duration and video intent.
