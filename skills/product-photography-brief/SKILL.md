---
name: product-photography-brief
description: |
  Generates production-ready product photography briefs for e-commerce and creative studios. Takes a product name, description, category, or homepage/listing URL and outputs a cohesive 4-6 shot plan with model routing (Nano Banana Pro, Soul 2.0, GPT Image 2), aspect ratios per platform, camera/lens specs, and negative prompt banks — all copy-pasteable.

  Use whenever the user wants a product photography brief, an e-commerce shoot brief, a photo-shoot brief, a shot planner for e-commerce, or types /product-photography-brief.
trigger-words: [产品摄影, 电商拍摄, 拍摄brief, shot planner, 摄影计划, 商品图, product photography, ecommerce shoot, shoot brief, shot plan, product shots, photo brief]
allowed-tools: [question, hub_read, hub_write, hub_save_file_to_session, hub_generate_image]
---

# Product Photography Brief Workflow

Plans 4-6 cohesive e-commerce shots from a product name / description / URL, routes each shot to the optimal image model, injects lens + lighting language, and (optionally) fires the generations end-to-end.

## Workflow

### Step 1: Pull existing product context

If the user gave a workspace-relative file path (product URL scrape, brand guidelines, existing brief), `hub_read` it now to pre-fill Step 2:

- `.agents/brand-guidelines.md`
- Any `product-*.md` or ingredients doc the user mentioned
- A prior brief being iterated on

### Step 2: Collect brief inputs (single batched `question`)

Fire ONE `question` covering:

1. **Product name & category** (e.g. "Organic Avocado Face Serum", "Leather Minimalist Wallet")
2. **Product details** — ingredients / texture / color / packaging type / labels
3. **Brand aesthetic** — minimalist-clean / rustic-earthy / high-end-luxury / vibrant-pop / dark-moody
4. **Lighting archetype** — Soft Studio / Hard Chiaroscuro / Golden Hour Natural
5. **Target platforms** — Amazon / Shopify / Instagram / Pinterest / TikTok / Website (multi-select)
6. **Shot count** — 4 / 5 / 6
7. **Mode** — `brief-only` (just deliver the Markdown brief) OR `brief-and-shoot` (also fire `hub_generate_image` for each shot)
8. **Legible packaging text required?** — yes/no (routes packaging shots to `imagegen_2_0`)

Do NOT proceed until answered.

### Step 3: Extract context & anchor visual style

From Step 1 + Step 2:

- **Hero ingredient/material** — raw inputs that represent the product (oats, leather grain, lavender)
- **Brand palette** — warm neutrals / bright primaries / cool blues-greens
- **Lighting archetype** applied to every shot (Soft Studio / Chiaroscuro / Golden Hour)

### Step 4: Apply the Model Routing Matrix (per shot)

Match each shot to the optimal model:

| Shot Type | Legible Text? | Model | Vendor | Rationale |
|---|---|---|---|---|
| Hero / Studio Packshot | No | `nano_banana_pro` / `nano_banana_2` | `nano-banana` | Studio lighting + crisp textures |
| Macro / Texture Close-up | No | `nano_banana_pro` | `nano-banana` | Micro-detail rendering |
| Packaging / Text Detail | Yes | `imagegen_2_0` | `openai-image` | Text legibility + spatial control |
| Lifestyle / In-Use | No | `text2image_soul_v2` / `soul_v2` | `soul` | Realistic face identity + hand context |
| Creative / Editorial Ad | No | `cinematic_studio_2_5` | `cinematic-studio` | Artistic composition + drama |

### Step 5: Pick 4-6 shot archetypes

Choose from the 8 Core Shot Types (per Step 2 shot count):

1. **Hero Shot** — clean product on seamless background, commercial lighting
2. **Macro / Detail** — extreme close-up, texture/material/ingredient
3. **Lifestyle / Contextual** — product in natural use environment
4. **Flat Lay** — top-down with raw ingredients, tools, props
5. **Unboxing / Packaging** — outer packaging, box texture, branding
6. **Hand / Human Context** — hand holding / pouring / applying
7. **Range Shot** — multiple variants / sizes together
8. **Creative / Editorial Ad Banner** — dramatic lighting, conceptual art direction

### Step 6: Map platform-specific aspect ratios

- Shopify / Amazon main image → `1:1` (pure white seamless)
- Instagram Feed → `4:5`
- Pinterest / Blog Headers → `2:3`
- Reels / TikTok / Shorts → `9:16`
- Website Banner → `16:9` / `21:9`

### Step 7: Draft the brief

For each shot, produce a Prompt Block:

```markdown
### Shot [N]: [Shot Type Name]
- **Target Model**: `[model name]`
- **Vendor**: `[vendor id]`
- **Aspect Ratio**: `[e.g. 4:5]`
- **Concept**: [1-sentence scene description]
- **Generation Prompt**:
  > [Production-grade prompt: subject, packaging material, lighting, camera lens, angle, environment.]
- **Negative Prompt**:
  > [Universal e-commerce bank + shot-specific exclusions]
- **Shot Priority**: `[High / Medium / Low]`
- **Production Tip**: [Specific tip on composition, props, texture execution.]
```

#### Negative prompt banks (inject verbatim)

- **Universal e-commerce**: `low resolution, draft, blurry, out of focus, distorted proportions, low quality, noise, grain, ugly, text artifact, double branding, cluttered background, cheap plastic look, artificial shadows.`
- **Anatomical** (Hand / Lifestyle): `extra fingers, deformed hands, mutated fingers, fused digits, double hands, backward hand, claw hand, poor anatomy, unnatural pose.`
- **Amazon main image**: `shadow, text, logo, watermark, accessory, prop, colored background, off-white, shadow on product, reflection, graphic element.`

#### Camera & lens specifiers (inject verbatim)

- **Macro**: `Captured on 100mm macro lens, f/2.8, shallow depth of field, sharp focus on raw cream texture.`
- **Studio / Hero**: `Shot on 85mm prime lens, clean studio lighting, f/8 aperture, razor-sharp edge definition, commercial photography style.`
- **Lifestyle**: `Shot on 35mm lens, natural daylight, organic shadows, f/4 aperture, high-end editorial lifestyle photography.`

### Step 8: Confirm before writing

Present:
- Total shot count + model breakdown (e.g. "3 × nano_banana_pro, 1 × imagegen_2_0, 1 × soul_v2, 1 × cinematic_studio_2_5")
- Aspect ratio distribution per platform
- Filename slug
- Whether `brief-and-shoot` mode is on (i.e. we're about to fire generations after saving the brief)

Wait for user yes.

### Step 9: Save the brief

1. Call `hub_write`:
   - `file_path`: workspace-relative slug (e.g. `photo-briefs/2026-07-03/serum-brief.md`)
   - `content`: full Markdown brief (Strategic Analysis + Cohesive Shot List with Prompt Blocks)
2. Call `hub_save_file_to_session`:
   - `file`: same path
   - `file_type`: `text`

### Step 10: (Optional) Fire the generations

Only if Step 2 answered `brief-and-shoot`. For EACH shot in the brief:

1. Call `hub_generate_image`:
   - `vendor`: from Step 4 matrix (`nano-banana` / `openai-image` / `soul` / `cinematic-studio`)
   - `model`: from Step 4 matrix (`nano_banana_pro` / `imagegen_2_0` / `soul_v2` / `cinematic_studio_2_5`)
   - `prompt`: Generation Prompt from that shot's block (concatenate with the negative prompt bank per Step 7)
   - `aspect_ratio`: from Step 6
   - `resolution`: `2k` for hero/macro/editorial, `1k` acceptable for lifestyle/packaging
   - `medias`: only if the user provided a product reference asset; pass its ID as `role: media_input`
2. Call `hub_save_file_to_session`:
   - `file`: the generated image path
   - `file_type`: `image`

Fire shots serially so the user sees each result before spending on the next. If a shot fails or looks off, offer to retry with a tweaked prompt before continuing.

## Output verification checklist

Before delivering:

1. Strategic Analysis — short brand alignment + aesthetic justification
2. Cohesive Shot List — 4-6 numbered shots matching brand aesthetic
3. Exact Model Selections — assigned per Model Routing Matrix
4. Copy-Pasteable Prompts — with lens specs, lighting, backgrounds, negative prompts
5. Multi-Platform Aspect Ratios — clear distribution mappings

## Pitfalls

- **Packaging text becomes gibberish** → routed to wrong model. Route to `imagegen_2_0`, not `nano_banana_pro`.
- **Lifestyle shot has hand deformation** → forgot the anatomical negative bank. Inject verbatim.
- **Amazon main image rejected** → missed the Amazon-specific negative bank (no shadow, no colored background, no reflection).
- **Shots don't feel cohesive** → each shot picked its own lighting archetype. Lock ONE lighting archetype in Step 3 and reuse across all shots.

## Notes for Hub adaptation

- The brief itself is a Markdown deliverable — save with `hub_write` and register via `hub_save_file_to_session` (`file_type: text`) so the user can hand it to their production team.
- When the user asks the skill to actually shoot (`brief-and-shoot` mode), route each shot's prompt through `hub_generate_image` with the assigned vendor/model (`nano_banana_pro`, `imagegen_2_0`, `soul_v2`, `cinematic_studio_2_5`) and register outputs with `hub_save_file_to_session` (`file_type: image`).
- Use `question` to lock the required inputs (product name, category, brand aesthetic, target platforms, mode) in a single structured turn rather than free-form back-and-forth.
- Reference product URLs or brand asset files can be pulled with `hub_read` when the user provides paths inside the session.
- The negative prompt banks and lens/lighting specifiers are string constants — inject them verbatim into every `hub_generate_image` call for that shot type.
