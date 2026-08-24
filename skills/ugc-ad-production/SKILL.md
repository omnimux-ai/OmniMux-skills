---
name: ugc-ad-production
description: |
  Full end-to-end pipeline for producing a realistic AI-generated UGC ad for a product. 15-second, vertical 9:16 format that looks like a real creator, not AI. Inputs are the product, a reference UGC video, 2+ creator face references, target audience, and hook type; outputs are a shooting script, a 4K creator face image, and a 15-second Kling 3.0 video ready for post.
  Use whenever the user wants to make a UGC ad, produce a UGC video, spin up an AI UGC creator, generate product UGC, or run a full UGC pipeline.
trigger-words: [UGC 广告, UGC 视频, AI UGC creator, 产品 UGC, UGC ad, UGC video, ugc pipeline, product UGC, 拟真 UGC, 达人视频]
allowed-tools: [question, hub_generate_image, hub_generate_video, hub_read_media, hub_save_file_to_session]
---

# UGC Ad Production Pipeline

Full end-to-end workflow for generating a realistic AI UGC ad for a product. 15-second format. Looks real. Doesn't feel AI.

Locked defaults — never negotiate these with the user:

- Editing tool: Canva (external, out of Hub scope)
- Video length: 15 seconds
- Aspect ratio: 9:16 vertical
- Video model: Kling 3.0
- Image model: Nano Banana Pro (4K)

---

## Workflow

### Step 1: Collect the five required inputs
Fire a single `question` call with all five prompts bundled. Do NOT ask them one at a time — the pipeline burns credits and a missing input near the end wastes a Kling render.

Ask for:

1. **Product** — name, URL, or image
2. **Reference UGC video** — Pinterest / TikTok / YouTube link in the same niche
3. **Creator face references** — 2+ real-person images (attractive, brand-matched); these get face-mixed
4. **Target audience** — e.g. women 18-35 with acne-prone skin
5. **Hook type** — problem/solution, before/after, testimonial, transformation, or "you decide"

If the user drops the reference UGC video into the session as an asset, call `hub_read_media` on it once before Step 2 to confirm duration and aspect ratio so the script matches its pacing.

### Step 2: Draft the shooting script (Claude reasoning, no tool call)
Use Claude's own reasoning to write a timestamped script — this is a text-only step, no Hub tool involved.

Prompt template to fill in:

```
Make a UGC script for a 15-second video like [REFERENCE VIDEO] but for [PRODUCT].
Use [CREATOR DESCRIPTION from face references] as the UGC creator/speaker.
Include:
- Hook (first 3-5 seconds): show the problem visually + audio hook
- Voiceover lines with exact words
- Cut descriptions: what the camera shows at each moment (creator face, product, before/after, etc.)
- Actions and mannerisms: make the creator feel like a real character — nervous laugh, hair tuck, direct eye contact, pointing at product, etc.
- Call to action (last 2-3 seconds)
- Timestamps for each cut/action
Output as a shooting script with columns: Timestamp | Voiceover | Visual/Shot | Action/Mannerism
```

Feed Claude maximum context: product details, target audience pain points, other viral UGC in the niche, storytelling frameworks (problem-agitate-solve, before/after). Bake in virality principles: pattern-interrupt hook, social proof, transformation moment, urgency CTA.

Output of this step: timestamped shooting script surfaced to the user.

### Step 3: Generate the creator face
Call `hub_generate_image` with:

- vendor: `nano-banana` (Nano Banana Pro)
- model: 4K variant
- prompt (template):
  ```
  Mix these faces to create a new attractive face that does not belong to any real person.
  Use as the face of a UGC beauty/lifestyle content creator.
  4K resolution. Hyperrealistic skin texture, pores, natural imperfections, natural lighting.
  Creator holding the product near her face, holding a ring-light mic. Suitable as a UGC first frame.
  ```
- resolution: 4K (required — pores and micro-detail are what break the AI tell)
- medias: pass all user-supplied face refs + product image as image inputs
- aspect_ratio: 9:16

If the user asked for variants, generate 3-5 and let them pick. Otherwise, generate one.

### Step 4: Register the picked face
For the chosen creator portrait, call `hub_save_file_to_session` with `file_type: image`. This gives Step 5 a stable media handle to use as `start_image`.

### Step 5: Generate the 15-second video
Call `hub_generate_video` with:

- vendor: `kling`
- model: `kling_3_0`
- prompt: the shooting script from Step 2, restructured as director cuts. Example shape:
  ```
  [First frame: creator holding product, looking at camera, natural lighting]
  Cut 1 (0-3s): Creator speaks directly to camera with [mannerism], says "[hook line]"
  Cut 2 (3-7s): Close-up of product being applied / used
  Cut 3 (7-12s): Creator reaction shot — [emotion/mannerism from script]
  Cut 4 (12-15s): Creator faces camera, delivers CTA, [mannerism]
  ```
- duration_sec: 15 (locked)
- aspect_ratio: 9:16 (locked)
- medias:
  - role `start_image`: the Step 4 creator image (session ID)
  - role `image` (or reference): the product image
- Only one generation per run unless the user explicitly asks for variants.

### Step 6: Register the final video
Call `hub_save_file_to_session` on the returned `.mp4` with `file_type: video`. The user can then pin it or hand it downstream.

### Step 7: Hand off external post-production
Tell the user what still lives outside Hub, do not attempt to run these:

- Voice cloning / dubbing: ElevenLabs or Play.ht
- Editing / captions / cuts: Canva
- SFX: Artlist (whoosh at cuts, 10% reverb on VO for room presence)

---

## Virality Principles (Bake Into Every Step)

- **Hook = Problem Mirror**: show the audience their own problem in the first 3 seconds. They stop scrolling because they see themselves.
- **Before/After = Hope Loop**: after the problem hook, show the transformation. Creates desire.
- **Audio Hook**: whoosh SFX at cuts is a pattern interrupt — keeps watch time up.
- **Creator Mannerisms = Trust**: a creator that feels real (laughs nervously, tucks hair, sighs) builds subconscious trust faster than a perfect delivery.
- **Reverb = Room Presence**: 10% reverb removes the AI-radio-voice feel.
- **CTA Urgency**: last 2-3 seconds. Direct, specific, low-friction ("link in bio", "tap the link", "DM me").

## Branding Note

If this is for a real account/brand (not testing):

- The creator face should match the brand's target audience persona
- The creator's style/vibe should stay consistent across all UGC videos
- Don't mix aesthetics between videos — pick one and lock it

## Platform / Cost Summary

| Tool | Purpose |
|------|---------|
| Claude / Gemini 2.5 Pro | Script writing |
| Nano Banana Pro (`hub_generate_image`) | Creator face + product image |
| Kling 3.0 (`hub_generate_video`) | Video generation |
| ElevenLabs | Voice cloning + swap (external) |
| Play.ht | Voice cloning alt (external) |
| Canva | Editing + text (external) |
| Artlist | Sound effects (external) |

## Notes for Hub adaptation

- Collect all five required inputs (product, reference UGC video, 2+ creator face refs, target audience, hook type) via a single `question` call — do not fire step-by-step prompts and do not silently assume defaults for the never-ask list (Canva, 15s, 9:16, Kling 3.0, Nano Banana Pro).
- Step 2 (creator face) uses `hub_generate_image` with a Nano Banana Pro model selector; pass the 2+ face references as image inputs and target 4K. Register the picked variant to the session with `hub_save_file_to_session` (`file_type: image`) so it is available as the Step 3 start frame.
- Step 3 (15-second video) uses `hub_generate_video` with `vendor: kling` + `model: kling_3_0`, the Step 2 creator image as `start_image`, and the product image as a secondary media reference. Duration = 15s, aspect_ratio = 9:16 — non-negotiable.
- Register the final `.mp4` with `hub_save_file_to_session` (`file_type: video`). External-tool steps (ElevenLabs voice, Canva edit, Artlist SFX) happen outside Hub — call them out as user follow-up work, do not attempt to invoke them.
- Use `hub_read_media` if the user drops the reference UGC video into the session and you need to inspect duration / aspect ratio before writing the script.
- Kling 3.0 credits: this is a single generation per run at 15s. Do not fan out multiple variants unless the user explicitly asks.
