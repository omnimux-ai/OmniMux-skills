---
name: fpv-tour-video-generator
description: |
  Create scene-first FPV one-take flythroughs from characters and environments, with the character as route guide. Confirm duration and ratio, keep character identity separate from scene style, and plan dives, banks, gaps, near misses, and parallax. Use a paper airplane if no character is supplied. Use for buildings, coasts, venues, interiors, product spaces, or game scenes; not talking-head ads, static showcases, ordinary drone footage, or montage trailers.
trigger-words: [first-person FPV, FPV tour, character-follow FPV, FPV flythrough, FPV venue tour, environment flythrough, flying character tour, paper airplane FPV, low-water skim, gap threading, route-driven FPV, aerial scene showcase]
allowed-tools: [question, hub_analyse_media, hub_generate_video, hub_video_edit, hub_save_file_to_session]
---

# First-Person FPV Tour

Use this Skill to turn user-uploaded subjects and scenes into immersive FPV drone tour videos. The user's images anchor the character, product, architecture, landscape, vehicle, or environment appearance; optional reference videos provide camera movement style, speed, altitude changes, and rhythm. If the user uploads a character plus a scene, default to making the character the flying protagonist, like a paper airplane or lightweight flying avatar, while the camera follows or chases it through the scene.

Hard rule for character + scene references: the character reference donates only the flying protagonist's appearance, silhouette, costume, and identity. Do not inherit the character image background, lighting, color grade, texture, camera angle, rooftop/window environment, or mood. The scene reference fully defines the world, palette, lighting, atmosphere, material texture, and spatial layout.

Hard rule for FPV output: plan and prompt as one continuous single-take flight whenever possible. Avoid hard cuts, montage edits, shot switching, repeated camera resets, or discontinuous jumps. The route should feel like one uninterrupted FPV chase/follow move with continuous speed, direction, altitude, and orientation handoff.

Character-facing and reveal rule: when an uploaded character is present, keep the character facing the flight direction by default. The main viewpoint should remain a behind / rear-three-quarter first-person follow perspective. If a character reveal is useful, place it in the middle or later half of the route as a brief inertia-preserving camera pan/orbit/overtake from behind to front or side-front, just enough to glimpse the character face, then return naturally to the behind follow/chase perspective for the ending. This reveal must preserve forward momentum and must not feel like a cut, stop, spin reset, broken inertia, or character close-up showcase. The character should not fly backward unless the user explicitly asks. If no character is uploaded and the default paper airplane is the only flying subject, do not add a character-facing reveal; keep the paper airplane route clean and forward-driven.

Scene-first priority rule: when a character is present, the scene remains the main visual subject and the character acts as the motion guide/passenger. The flight path should showcase the environment, depth, coastline/architecture/water/terrain, and spatial progression first. Any character reveal must be subtle, secondary, and naturally embedded in the route; do not push into character close-ups, hero showcases, or aggressive foreground presentation unless the user explicitly asks for a character-led reveal.

Character persistence and camera discipline rule: when a character is used as the flight guide, it must remain visible as a consistent guide through the route, including the final seconds, unless the user explicitly asks for the camera to leave it behind. Do not let the character disappear at the ending. Avoid arbitrary push-ins, pull-outs, zoom-like moves, or focus changes that are not motivated by the flight path. Visual impact should come from spatial FPV motion: close passes, low-altitude skims, banking, diving, threading gaps, parallax, near-miss architecture, water spray, and altitude changes, not from random camera push/pull.




Mandatory intake questions before planning: ask the user to confirm video duration first, then ask for the target aspect ratio. Duration is a separate required field because it affects route design, pacing, and whether one take or multiple segments are needed. Aspect ratio options should include 16:9, 9:16, 1:1, or platform-specific custom. Publishing market/platform is optional; only ask it when the user explicitly needs platform-specific delivery or when the route/crop would materially change because of the platform.



## STEP 1: Collect Inputs and Intent

Identify the available references:

- Main subject or scene images: character, building, interior, landscape, vehicle, product, event space, or route environment. If one image is a character and another is an environment, assign the character as the flying protagonist and the environment as the route space by default.
- Optional multi-angle images: use them as consistency references for the same subject or environment.
- Optional movement reference video: use it only for flight style, speed, rhythm, altitude changes, and transition energy.
- User preferences: video duration, aspect ratio, optional target market/platform, route style, difficulty level, and any must-show locations or traversal points. Duration and aspect ratio are mandatory user-facing intake fields before planning; market/platform is optional.

If the user provides no visual reference, ask them to upload at least one scene or subject image before planning. If duration or aspect ratio is missing, ask before storyboard planning instead of silently choosing a default. Ask market/platform only when it is necessary for a platform-specific crop or delivery choice.

## STEP 2: Analyze Reference Assets

Analyze every uploaded asset before planning. Determine:

- Subject type: flying character, person, architecture, landscape, vehicle, product, interior, mixed scene, or other. For flat illustrated characters, treat the design as a lightweight paper-plane-like flying avatar unless the user asks for a different embodiment.
- Scene depth: foreground, midground, background, and whether the space supports real movement.
- Traversable structures: doors, arches, windows, corridors, gaps, bridges, stairways, alleyways, trees, rocks, furniture openings, vehicle interiors, or other flight gates.
- Spatial hazards: flat backdrops, solid-color backgrounds, unclear scale, impossible passages, or blocked routes.
- Light direction and time of day.
- Visual anchor priority when multiple images conflict. For character + scene tasks, separate role-only character traits from scene/world traits: character image = protagonist only; scene image = environment, lighting, palette, texture, and atmosphere.

When multiple images are uploaded, assign roles before proceeding: main image, environment reference, subject close-up, multi-angle support, or style-only reference. Consolidate them into one unified scene analysis.

If lighting or time of day conflicts are obvious, pause and ask the user which reference should define the standard. If the subject is blurry or unrecognizable, ask for a clearer image. If the image lacks spatial depth, ask for a replacement with a real environment or suggest switching to a landscape or architectural reference.

If a reference video is uploaded, extract only movement signals: camera path, speed, rhythm, altitude sequence, bank angle, orbit direction, acceleration pattern, and transition timing. Do not let the video contaminate the uploaded subject or scene appearance.

## STEP 3: Detect Format, Style, and Difficulty

Set defaults unless the user explicitly overrides them.

Aspect ratio:

- Ask the user to confirm aspect ratio before planning.
- Offer concise options when missing: 16:9 horizontal, 9:16 vertical, 1:1 square, or custom/platform-specific.
- Use 9:16 if the user confirms vertical, Douyin, Reels, TikTok, Shorts, or short-video platform.
- Use 16:9 if the user confirms horizontal, YouTube, website hero, presentation screen, cinematic showcase, or landscape display.
- Image orientation can suggest a recommendation, but it must not override the user-confirmed aspect ratio.

Style preset:

- Explicit user style wins: Low-altitude skimming, High-altitude dive, Spiral orbit, High-speed shuttle, Narrow gap navigation, or Hybrid FPV tour.
- If unspecified, choose by subject type:
  - Flying character or person: character-follow FPV with paper-airplane-like glide, chase-camera framing, side orbit, and identity-safe readability.
  - Architecture: High-altitude dive into close flythrough.
  - Landscape: Low-altitude skimming with terrain-following motion.
  - Vehicle: High-speed shuttle, close pass, and reveal orbit.
  - Interior or venue: Narrow gap navigation and corridor flythrough.
  - Product: Miniature FPV orbit and close pass, avoiding impossible drone scale unless stylized.

Difficulty level:

- Simple: 2–3 major moves, smooth speed, fewer risky gaps, stable orientation.
- Standard: 3–5 moves, one signature traversal or orbit, moderate speed change.
- High difficulty: fast acceleration, gap threading, roll/bank, altitude dive, close passes, and complex transitions, while preserving subject readability.

## STEP 4: Plan Trajectory Storyboard

Design a continuous one-take flight path. The storyboard must not be a montage. It must include:

- Segment order and approximate duration only when duration exceeds one model segment; otherwise one uninterrupted take with no cuts.
- Start position and end position.
- Altitude changes.
- Key camera actions: follow, chase, overtake, side-orbit, dive, skim, rise, bank, thread, reveal, whip turn, pullback, or hero hover. If there is an uploaded character, include at most one brief inertia-preserving behind-to-front or side-front reveal in the middle/later half when appropriate, then return to behind follow perspective; if no character is uploaded, skip this reveal. Only use low-water skimming when the scene actually supports water and shoreline proximity; do not force it into every route.
- Must-show scene landmarks or subject features.
- Light direction, palette, texture, and atmosphere inherited from the scene reference only.
- Speed curve: acceleration, deceleration, pause, and final stabilization, with no hard cut, camera reset, arbitrary push-in, or arbitrary pull-out. Impact should come from route geometry and proximity, not zoom-like moves.
- Safety/readability notes: keep the uploaded character facing the direction of travel and visible through the ending unless explicitly asked otherwise, but do not force character push-in shots; keep the scene as the main visual subject, avoid reducing the character to signage or scenery, and avoid clipping through the subject unless the user explicitly wants surreal FPV.

Keep each generated video segment at 15 seconds or less. If the user requests longer than 15 seconds, split the route into connected segments and explain that they will be assembled afterward.

## STEP 5: Pause for User Confirmation

Before video generation, present a concise flight path summary:

- Video duration and aspect ratio.
- Style preset and difficulty level.
- Ordered flight actions.
- Altitude changes.
- Traversal points, follow distance, chase angle, orbit radius, whether a middle/later-half character face glimpse is included, and how the route returns to behind first-person follow for the ending.
- Lighting/time-of-day standard, explicitly from the scene reference when separate character and scene refs are provided.

Ask the user to confirm or revise. Accept adjustments such as changing orbit radius, adding a doorway traversal, lowering altitude, slowing the dive, removing risky gaps, or switching to vertical output.

Do not generate final video until this confirmation is complete.

## STEP 6: Write Generation Prompts

For each segment, write a prompt that preserves uploaded subject and scene identity while describing only the FPV camera behavior needed for that segment. When a character is present, explicitly state that the character is the flying motion guide/passenger and the camera follows, chases, or orbits it; keep the scene as the main visual subject unless the user explicitly asks for a character-led showcase; do not describe the character as a sign, prop, logo, or background decoration.

Each prompt should include:

- FPV drone first-person camera language, or character-follow FPV language when a flying protagonist is present.
- Exact route for this segment, using visually impactful FPV geometry such as close passes, banking, dives, gap threading, parallax, and low-water skims rather than random push/pull camera movement.
- Speed, altitude, bank, roll, and stabilization behavior.
- Single-take continuity: no montage, no hard cuts, no repeated shot resets; if a character reveal is used, it must be a smooth camera overtake/arc that preserves forward inertia; if multiple segments are unavoidable, every segment must preserve direction, speed, altitude, and end/start motion handoff.
- Subject preservation requirements, including keeping the uploaded character readable as the flying role rather than scene decoration, keeping the character facing the flight direction, keeping it visible through the final seconds, and keeping the character reveal subtle when the user wants scene-first emphasis.
- Lighting, color grade, texture, and atmosphere consistency from the scene reference; ignore the character reference background and grade.
- Output ratio and duration.

Avoid prompts that replace the user's uploaded scene with generic mountains, cities, forests, or stock drone footage. The scene reference defines the world, palette, lighting, texture, and atmosphere; the character reference defines only the flying protagonist. The prompt defines the route.

## STEP 7: Generate Video Assets

Generate each segment from the confirmed storyboard and reference assets. Use images as subject/scene anchors and optional videos as motion-style references. MiniMax-H3 is the default model. If the user explicitly specifies another model, follow that choice after a capability check. Pass the character image and scene image as references and write the prompt around a flying-character chase/follow route when applicable. Keep each segment within the selected model's supported duration and no longer than 15 seconds.

If a segment fails, loses the subject, drops the character at the ending, shows the character facing the wrong direction, or relies on arbitrary push/pull camera moves, allow one targeted retry with clearer character persistence, forward-facing orientation, route-driven impact, stronger proximity/gap/banking motion, or simpler traversal constraints. If it still fails, switch to MiniMax-H3 or another available model instead of repeatedly retrying the same model. If gap navigation fails, replace it with a close pass or reveal orbit rather than forcing an impossible path.

## STEP 8: Assemble Final Output

If the route uses multiple segments, assemble them in storyboard order. Maintain continuity of direction, speed, altitude, light, palette, texture, and motion handoff. Avoid abrupt cuts; a true FPV tour should read as one continuous flight unless the user explicitly requests montage editing.

Final deliverables should include:

- The assembled FPV tour video.
- If segments were generated separately, keep the individual segment outputs available for revision.
- A brief route summary so the user can request targeted changes.
