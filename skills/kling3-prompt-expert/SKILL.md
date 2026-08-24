---
name: kling3-prompt-expert
description: |
  kling3-prompt-expert is a production-ready Kling 3.0 video prompt expert using the canonical 9-field formula (Subject, SubjectDescription, Movement, Scene, SceneDescription, Camera, Lighting, Atmosphere, Negative). Includes locked character/environment specs for the Crococopter and Swa & Danny universes so recurring characters and locations stay visually consistent across shots. Input is a natural-language shot description; output is a structured Kling 3.0 prompt with suggested aspect ratio and duration.
  Use whenever the user invokes kling3-prompt-expert, asks for 可灵3提示词专家, wants a Kling 3.0 prompt, asks to write a Kling prompt, wants to convert a scene into a Kling prompt, or requests any Kling-tagged prompt-related draft.
trigger-words: [kling3-prompt-expert, 可灵3提示词专家, Kling prompt, Kling 3.0 prompt, Kling 3.0 视频, Kling 分镜, 写 Kling prompt, Maak een Kling, Kling video prompt, Schrijf een Kling prompt]
allowed-tools: [question, hub_generate_video, hub_save_file_to_session]
---

# Kling3 Prompt Expert

Produce production-ready Kling 3.0 video prompts using the canonical 9-field formula. This skill is opinionated: structure is non-negotiable, motion consistency is the priority, and recurring characters/environments get full descriptions every time — no shortcuts like "as above".

Default mode is **prompt-writing only**. Rendering (`hub_generate_video`) happens only after explicit user greenlight — this skill does not auto-burn Kling credits.

## When to trigger

Trigger whenever the user requests a Kling 3.0 prompt, in any phrasing or language. Examples:

- "Maak een Kling 3.0 prompt voor [scene]"
- "Schrijf hier een Kling prompt van"
- "Zet deze scène om in een Kling prompt"
- "Ik heb een Kling video prompt nodig voor..."
- "Kling 3.0 prompt voor Gideon in de KillCo-achterkamer"
- Any request that pairs the word "Kling" with prompt-related verbs (schrijf, maak, genereer, bouw, draft)

Do NOT trigger for Seedance prompts, Sora prompts, MidJourney prompts, or generic video prompts without Kling mentioned.

## Workflow

### Step 1: Parse the request
Identify: characters, environment, action, mood, aspect ratio hint (if any). Detect which project universe (Crococopter / Swa & Danny / generic).

### Step 2: Resolve locked-spec conflicts
If the user's ask touches a locked character or environment (see Project Universes below) AND asks for a change to a locked property (e.g. "make Gideon wear a red jacket"), do NOT silently draft. Fire a `question` first that names the specific conflict and asks whether to:

- Honor the lock and reject the change
- Break the lock for this shot only
- Update the lock permanently

Do not proceed until the user resolves it.

### Step 3: Split multi-beat requests
If the user packed multiple actions into one shot ("she walks in, sits down, opens the letter, then cries"), fire a `question` to propose splitting into N separate prompts. Kling 3.0's motion consistency degrades with too many simultaneous concepts.

### Step 4: Fill the 9 fields (in order)
This is the load-bearing structure. Skip nothing — write a deliberate minimal value ("neutral", "minimal context") rather than dropping a field.

| # | Field | Purpose |
| --- | --- | --- |
| 1 | Subject | Primary character/object, one short noun phrase |
| 2 | SubjectDescription | Ultra-detailed appearance: build, face, clothing, props, textures |
| 3 | Movement | What the subject does — strong action verbs, one clear arc |
| 4 | Scene | Where it happens, short phrase |
| 5 | SceneDescription | Ultra-detailed environment: architecture, objects, materials, depth layers |
| 6 | Camera | Shot type + camera movement + lens |
| 7 | Lighting | Light source, direction, quality, color temperature |
| 8 | Atmosphere | Mood, weather, particles, post-processing feel |
| 9 | Negative | What to exclude (never empty) |

Apply the Hard Rules below during fill.

### Step 5: Emit structured prompt
Return the structured 9-field block using the Output Format shape. Include suggested aspect_ratio (16:9 / 9:16 / 1:1) and duration (3-10 s). This is the default terminal step for most requests.

### Step 6: Confirm render (only if user asks for it)
If the user explicitly asks to render the shot (e.g. "run it", "submit it", "generate the video"), fire a `question` to confirm the paid generation and the target resolution:

- Default 720p to conserve credits
- 1080p only for final renders
- Confirm which single start_image to pass (Kling 3.0 accepts only one)

### Step 7: Submit render
On explicit greenlight, call `hub_generate_video` with:

- vendor: `kling`
- model: `kling_3_0` (or the specific Kling variant the user named)
- prompt: the 9 fields concatenated into one string (labeled `Subject: ..., SubjectDescription: ..., Movement: ...` etc, preserving field order)
- aspect_ratio: per the suggested settings from Step 5
- duration_sec: per suggested settings
- medias: at most one entry with role `start_image`, referencing the picked image. Additional visual references are encoded as text cues inside SubjectDescription / SceneDescription (see Hard Rule 1).

### Step 8: Register the render
On successful return, call `hub_save_file_to_session` on the `.mp4` with `file_type: video`. User can then pin it or hand it downstream.

## Output format

Structured prompt shape (Step 5):

```
**Kling 3.0 prompt — [shot title]**

Subject: [...]
SubjectDescription: [...]
Movement: [...]
Scene: [...]
SceneDescription: [...]
Camera: [...]
Lighting: [...]
Atmosphere: [...]
Negative: [...]

Suggested settings:
- aspect_ratio: [16:9 | 9:16 | 1:1]
- duration: [3-10 seconds]
- start_image: [if applicable, otherwise omit]
```

When the user explicitly asks for an MCP-format or Kling CLI command format, append it below the structured prompt. Otherwise leave the structured prompt as the single output.

## Hard rules

1. **One `start_image` maximum.** Kling 3.0 accepts only one reference image. If the user describes multiple references, pick the most important one and mention the others as visual cues inside SubjectDescription/SceneDescription instead. In Step 7, only one entry with role `start_image` gets passed to `hub_generate_video`.
2. **Aspect ratios are limited to 16:9, 9:16, or 1:1.** Default to 16:9 for cinematic, 9:16 for social (Swa & Danny default), 1:1 only on explicit request.
3. **One clear action per shot.** If the user describes a multi-beat sequence, use Step 3's `question` to propose splitting into multiple prompts.
4. **Strong action verbs in Movement.** "Walks slowly toward the camera, then pauses and turns his head sharply" is better than "moves around the room".
5. **Negative field is never empty.** Default baseline if user doesn't specify: "distorted faces, extra limbs, warped hands, low resolution, blurry, watermark, text overlay, cartoonish, plastic skin".
6. **Repeat full character descriptions every time.** Never use "(as above)" or "(see previous)". Each prompt must stand alone.
7. **Locked environments get consistent recurring details.** When a scene is in a locked environment (see Project Universes below), every prompt set in that location must include the same anchoring details so shots cut together visually.
8. **Ultra photo-realistic by default** unless the user explicitly asks for stylized, animated, or other looks.

## Project Universes — auto-apply when detected

When the user mentions any of these characters, projects, or locations, automatically apply the locked specifications below. Do not ask for confirmation on already-locked elements — only ask about new details, or fire the Step 2 `question` if there's a conflict with an existing lock.

### Crococopter universe

Style baseline for all Crococopter prompts: ultra photo-realistic, cinematic realism, real-world lighting, 35mm/50mm/85mm lens feel. One character per shot unless the story explicitly requires multiple. Gideon shots prefer wider framing with the environment visible — don't always center him.

Gideon (protagonist, pre-hitman phase) — full lock:

- Type: humanoid crocodile adult male, fysiek 20-25 jaar
- Hoofd: brede driehoekige krokodillenschedel, matte dark olive/near-black huid, diepe gele ogen met verticale pupillen, zichtbare scherpe tanden, scherpe wenkbrauw-ridge, stevig gespierde nek
- Lichaam: atletisch, gespierd reptiel-menselijk lichaam, donkere matte schubbenhuid, grote klauwhanden, brede borst
- Kleding (pre-hitman/urban functional): zwarte M65 field jacket (gedragen, matte finish), donkergrijs versleten katoenen T-shirt, zwarte tactische cargobroek met patch op knie, zwarte lederen gevechtslaarzen (stoffig), geen handschoenen, zwarte nylon schoudertas met versleten band
- Houding: licht voorovergebogen, schokkerige precieze bewegingen, hoge alertheid
- Trainingsscènes only: blauw trainingspak met witte strepen in plaats van bovenstaande outfit

Vittorio 'Il Rosso' Marcelli (antagonist) — full lock:

- Zeer donkerrode, verbrande huid (geen masker — herhalen: GEEN masker)
- Bordeaux driedelig Italiaans pak, scherpe trekken
- Eén zwarte lederen handschoen
- Houding: gecontroleerd, sussend, demonisch charismatisch

Other locked characters (use full description when they appear): Nox de Waker (ex-militair conciërge), Lucia Glass, Father Bricks (altijd driehoek-symbool, NOOIT kruis), Slick Benny (tech sidekick), Helia (jeugdliefde, flashbacks).

Locked environments — anchor details to repeat every time:

- KillCo achterkamer: donkere kamer, bureau, rode neonverlichting, oosterse tapijten op de vloer
- KillCo gang: industriële verweerde gang, natte vloer, zichtbare leidingen aan het plafond
- Junglebunker: elke kamer apart uitgewerkt met eigen detailset, helikoptertoegang via het dak, zware stevige poort, camera's overal
- Wapenbeurs (loods): alle standjes op vaste locaties, naburige standjes altijd subtiel zichtbaar voor continuïteit

### Swa & Danny universe

Style baseline: Flemish absurdist deadpan comedy. Default aspect ratio 9:16 (social media). Default duration 5-10 seconds. Naturalistic Flemish village or interior settings unless the bit is dystopian/surreal.

Critical character distinction — this has been wrong before:

- **Danny = de KALE man in de donkerrode Standard Liège trainingsjas/tracksuit**
- **Swa = de man met de matje (mullet), draagt dark teal Adidas trainingspak**

When both appear: confirm in the prompt that Danny is bald with red Standard Liège, Swa has the mullet with teal Adidas. Do not abbreviate this distinction.

Other recurring characters: Jan Peeters (on a Camino moped), het Liegebeest (green felt puppet), Eddy Wally In Space (market vendor), Puppet-fox, BUMO (clown figures), ROBOT-A, the Opel Kadett (Danny always drives, Swa always passenger).

## Examples

### Example 1 — Crococopter, locked environment

User: "Maak een Kling 3.0 prompt waarin Gideon door de KillCo-gang loopt richting de achterkamer."

Output:

```
**Kling 3.0 prompt — Gideon enters KillCo hallway**

Subject: Humanoid crocodile male walking down an industrial hallway
SubjectDescription: Gideon, humanoid crocodile adult male, physically 20-25 years old, ultra photo-realistic. Broad triangular crocodile skull with matte dark olive near-black skin, deep yellow eyes with vertical pupils, visible sharp teeth, sharp brow ridge, muscular neck. Athletic muscular reptile-human body with dark matte scaled skin, large clawed hands, broad chest. Wearing a worn black M65 field jacket with matte finish, dark grey worn cotton T-shirt, black tactical cargo pants with a patch on the knee, dusty black leather combat boots, no gloves, black nylon shoulder bag with frayed strap. Slightly forward-leaning posture, tense and precise.
Movement: Gideon walks slowly down the hallway toward the camera, head turning left then right as he scans the corridor, right hand resting near the strap of his shoulder bag.
Scene: KillCo industrial hallway leading to the back room
SceneDescription: Industrial weathered hallway, exposed pipes and conduits running along the ceiling, wet concrete floor reflecting overhead lights, peeling paint on the walls, single flickering fluorescent fixture halfway down, heavy steel door visible at the far end with a faint red light leaking from underneath.
Camera: Medium-wide shot, slow dolly-in at chest height, 35mm lens
Lighting: Cool fluorescent overheads with one flickering source, hard shadows on the wet floor, faint warm red spill from the door at the end of the corridor, high contrast
Atmosphere: Tense, oppressive, claustrophobic industrial noir, faint steam drifting from the pipes
Negative: distorted faces, extra limbs, warped hands, low resolution, blurry, watermark, text overlay, cartoonish, plastic skin, cross symbols

Suggested settings:
- aspect_ratio: 16:9
- duration: 6 seconds
```

### Example 2 — Swa & Danny, social media short

User: "Kling 3.0 prompt: Swa en Danny staan in de regen aan een bushokje, allebei chagrijnig."

Output:

```
**Kling 3.0 prompt — Swa & Danny bus stop in the rain**

Subject: Two Flemish men standing at a small village bus shelter in the rain
SubjectDescription: On the left, Danny — bald man, mid-40s, wearing a dark red Standard Liège tracksuit jacket zipped up, arms crossed, deadpan expression, slight scowl. On the right, Swa — same age, prominent mullet hairstyle, wearing a dark teal Adidas tracksuit top with three white stripes on the sleeves, hands shoved deep in pockets, equally deadpan, faint frown. Both stare straight ahead, motionless, naturalistic Flemish village look.
Movement: Both men stand still. Danny slowly blinks once. Swa exhales through his nose, breath barely visible. Neither turns. Rain runs down the shelter glass behind them.
Scene: Small Flemish village bus shelter on a grey afternoon
SceneDescription: Plexiglass-and-metal bus shelter on a quiet narrow street, wet asphalt, small puddles, a faded yellow De Lijn bus stop sign on the right, low brick houses with closed shutters visible in the background, bare branches of a roadside tree on the left, no other people, no traffic.
Camera: Locked medium two-shot, slight low angle, 50mm lens, no movement
Lighting: Overcast diffuse daylight, no direct sun, soft even shadows, slightly cool color temperature
Atmosphere: Damp, melancholic, absurd-comedy deadpan, faint mist, steady rain
Negative: distorted faces, extra limbs, warped hands, low resolution, blurry, watermark, text overlay, cartoonish, plastic skin, smiling expressions, exaggerated movement

Suggested settings:
- aspect_ratio: 9:16
- duration: 6 seconds
```

## Reminders for the assistant

- Never invent character details that aren't in the locked specs. If something isn't locked, either ask the user or pick a reasonable choice and flag it.
- If the user wants the same shot from multiple camera angles, produce multiple separate Kling 3.0 prompts — don't try to encode multiple angles in one prompt (that's territory for other models, not Kling).
- When the scene involves a Crococopter locked environment, repeat the anchor details verbatim across all prompts in that location, even if it feels repetitive. That's the whole point.

## Notes for Hub adaptation

- Default mode is prompt-writing only — return the structured 9-field text. Do NOT auto-submit paid generations. Only call `hub_generate_video` (with `vendor: kling`, `model: kling_3_0` or the requested Kling variant) after the user explicitly greenlights the render.
- When the user asks for the render, use `question` first to confirm the paid generation and the target resolution (default 720p to conserve credits; 1080p only for final renders).
- On submission, map the 9 fields into a single `prompt` string, set `aspect_ratio` per the "Suggested settings" block, and pass the (single) start image as `start_image` role via `medias`. Kling 3.0 only accepts one reference image — pick the most important one and encode the rest as visual cues in SubjectDescription/SceneDescription.
- Register any successfully rendered `.mp4` back to the session with `hub_save_file_to_session` (`file_type: video`).
- This skill's Project Universes (Crococopter, Swa & Danny) are locked lore fixtures — treat them as immutable. If the user tries to change a locked spec inline (e.g. "make Gideon wear a red jacket instead"), surface the conflict via `question` before drafting.
- Do NOT use this skill for Seedance / Sora / MidJourney / generic video prompts — those have dedicated skills.
