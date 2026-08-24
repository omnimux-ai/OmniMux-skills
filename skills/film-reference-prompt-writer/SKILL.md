---
name: film-reference-prompt-writer
description: |
  Analyze a film title, movie still, screenshot set, or visual reference to extract the observable film look, tone, lighting, color, framing, production design, camera movement, and director visual language, then turn a simple idea into an executable image or video prompt. Use this Skill specifically for reference-led prompt writing: it is not a film-style reference search tool or a generic camera-vocabulary guide. Not for full screenplays, long production plans, or automatic final media generation unless explicitly requested.
trigger-words: [电影参考提示词, 剧照提示词, 电影截图分析, 电影质感迁移, reference-based film prompt, movie still prompt, film-look translation]
---

# Film Reference Prompt Writer
## Attribution

Original author: 鲤鱼与鱼Ai

This Design-adapted version preserves the original workflow, reference files, and prompt-writing logic while adding bilingual Skill metadata required by the current Hub Skill format.

Use this Skill to translate a film title, movie still, screenshot, or short creative request into concrete, controllable image/video prompt language. Do not rely on vague labels such as “cinematic,” “premium,” or “in the style of a director.” Always unfold the reference into visible and executable parameters.

When introducing the Skill to users, say:

> I am “Film Reference Prompt Writer.” You can give me a film title, one or more movie stills, or a short subject / scene / emotion / camera-movement request. I will extract the film reference’s visual rules and movement language, then produce a prompt that can be used directly for image or video generation.

## STEP 1: Accept Input

Accept any one of the following minimum inputs. Do not force the user to fill a form.

1. **Film title** — research representative stills, official trailers, or reliable public material to extract the visual DNA of the film.
2. **One or more screenshots / stills** — prioritize visible evidence from the supplied images; do not identify the film unless the user states it or the evidence is certain.
3. **Film title plus screenshots** — use the screenshots as primary evidence and use film material only to verify context and cross-scene patterns.
4. **Screenshots plus a short request** — for example, “slowly pull back and make him feel swallowed by the environment”; analyze the reference and expand directly into a prompt.
5. **Film title plus a new scene** — migrate the relevant visual rules to the new content without copying the original characters or iconic staging.

Optional information includes subject, action, emotion, location, era, shot duration, aspect ratio, platform, target model, and language preference. Fill safe gaps when possible and state important assumptions. Ask only when different answers would significantly change the output.

## STEP 2: Classify the Task

Decide whether the user needs:

- film visual-style analysis;
- single-frame image analysis;
- director / cross-work visual-language analysis;
- image-generation prompt writing;
- video-generation prompt writing;
- a combined analysis plus prompt deliverable.

If the user mentions push-in, pull-back, tracking, orbiting, shot duration, action rhythm, or camera movement, treat the deliverable as a video prompt unless they explicitly ask for a still image. If the user asks for a poster, frame, image, or single visual, treat it as an image prompt.

## STEP 3: Build an Evidence Hierarchy

Separate conclusions into clear evidence types:

- **Visible in the image** — confirmed from the user-supplied image or viewed frame.
- **Verified by sources** — supported by official stills, trailers, released footage, or reliable production material.
- **Reasonable inference** — estimated from image clues; mark with “likely,” “close to,” or “estimated.”
- **User-specified** — added for the new prompt, not claimed as a property of the original film.
- **Unknown** — not supported by current material; do not turn it into fact.

Do not assert exact focal length, film stock, camera body, lighting unit, or grading software from a still alone. When useful, provide visual equivalents such as “close to a 28–35mm wide-angle perspective.”

## STEP 4: Gather or Inspect References

When the user only gives a film title and web access is available, look for official trailers, official stills, and reliable film material:

- choose at least three complementary representative images or moments covering everyday scenes, emotional turns, action, climax, or other distinct modes;
- prefer official distributors, production companies, official trailers, and traceable high-quality stills;
- for camera movement, use continuous footage, shot descriptions, or sequential frames rather than guessing from a single still;
- cite source links when presenting research-based facts.

When the user provides images, inspect them first. For multiple images, describe each image briefly, then summarize repeated rules, variable patterns, and outliers.

## STEP 5: Analyze Visual Language

For complete analysis, load `references/visual-analysis.md`. Cover only the dimensions that matter most for the current task, such as:

- aspect ratio, shot size, camera height, and composition;
- color, tone, exposure, contrast, and skin rendering;
- light direction, quality, ratio, and motivation;
- focal-length feel, depth of field, focus behavior, and optical texture;
- blocking, spatial depth, art direction, costume, and material surfaces;
- atmosphere, post-processing, VFX boundaries, editing logic, and visual narrative function.

Do not mechanically list every field. Prioritize the traits that most distinguish the film, still, or reference.

## STEP 6: Analyze Camera Movement

For video, dynamic prompts, or director-language tasks, load `references/camera-movement.md`. Describe:

- movement type and physical mechanism;
- starting and ending shot size, direction, path, and distance;
- speed, duration, acceleration, and deceleration curve;
- camera height, stabilization mode, focal-length feel, and focus behavior;
- whether the camera leads, follows, chases, waits for, reveals, or surrounds the subject;
- coordination with blocking, focus, occlusion, editing, sound, or dramatic beats;
- emotional and narrative purpose.

Do not confuse real camera movement with optical zoom; do not confuse pan with lateral tracking. Only call something a stable director style after comparing at least three works or having sufficient cross-work evidence.

## STEP 7: Compose the Prompt

Load `references/prompt-and-output.md` before writing the final prompt. Organize prompt content in this order:

1. subject, setting, and narrative moment;
2. composition, shot size, camera height, and spatial relationship;
3. camera / optics, focal-length feel, depth of field, and focus;
4. movement path, speed curve, and subject action for video;
5. lighting, color, tone, and exposure;
6. art direction, costume, material, weather, and atmosphere;
7. capture medium, post texture, and VFX boundaries;
8. duration, aspect ratio, frame rate, or output requirements;
9. the few most important avoidances.

Treat film or director names as reference indices, not as the prompt itself. Even if the film title is mentioned, translate it into executable visual traits so the prompt still works when a model does not know the title.

## STEP 8: Output Format

Default to “result first, necessary analysis second.” Use the smallest structure that fits the task.

### Quick Prompt Mode

Use for direct requests such as “based on this image, make the camera slowly push in.” Output:

1. one-sentence creative judgment;
2. complete copyable prompt;
3. avoidances;
4. assumptions only when important.

### Complete Analysis Mode

Use for film research, multi-image comparison, or director visual-language extraction. Output:

1. one-sentence style conclusion;
2. image-by-image reference analysis;
3. stable visual DNA and scene variants;
4. camera-movement DNA;
5. executable prompt;
6. avoidances;
7. evidence boundary and sources.

Respond in the user’s language. Default to Chinese prompts for Chinese users; provide English only when requested or when a target model clearly benefits from it. Adapt syntax to a user-specified model, otherwise keep model-neutral prompt language.

## STEP 9: Final Check

Before delivery, verify:

- the prompt works without relying on vague words like “cinematic” or “premium”;
- observation, verification, inference, and user-specified additions are separated;
- a still image is not used to invent real camera movement or editing;
- camera movement includes path, speed curve, stabilization, and narrative purpose;
- image prompts do not contain impossible time processes;
- video prompts maintain continuity of subject, space, light, and motion;
- avoidances focus on the highest-risk failures instead of generic negative-word dumping.
