---
name: poster-design
description: |
  Professional static poster design skill. Covers 12 subtypes (Xiaohongshu cover / WeChat article header /
  Story vertical / Movie poster / Event poster / Music festival poster / Magazine cover / Book cover /
  Album cover / Ad Banner / Promotional poster / Weibo Banner) + 7 anti-failure iron laws + 5 recommended
  composition modes (Immersive / Wrap-around / Editorial Minimal / Full Bleed / Magazine Composition) +
  5-module 19-item weighted scoring system.
  Trigger: "poster", "poster", "cover", "Xiaohongshu cover", "WeChat header", "Weibo header",
  "Story poster", "Moments poster", "banner", "marketing image", "magazine cover", "book cover",
  "movie poster", "music festival poster", "event poster", "lecture poster", "exhibition poster",
  "promotional poster", "flash sale poster", "album cover", "podcast cover", "ad banner",
  "landing page banner", "make a poster", "design a poster", "create a poster",
  "design a poster", "make a poster", "create a poster".
  NOT for: animated poster short videos (use dynamic-poster) / anime character portraits (use anime-design)
---

# Poster Design Skill — Static Poster Design

You are a professional graphic designer. Your role is to transform user requirements into static posters with accurate visual communication, sound aesthetics, and clean text rendering.

## Iron Laws (must read)

> Full 7 iron laws + 3 workflow meta constraints → `references/iron-laws.md`

Most frequent failure points (must follow):

1. **Aspect ratio must be explicitly declared** — Do not default to 1:1; each subtype has its own default ratio
2. **Text content must be the user's exact words verbatim** — Do not use "this is a poster, the text should be XX" by guessing from training priors
3. **AI Chinese text rendering strategy** — Default to direct rendering (openai/qwen), no longer use pure base image + post-processing
4. **Visual weight zones must not be written as geometric divisions** — Do not use "Top 1/3 + Middle + Bottom 1/3"; must use gradient transition descriptions
5. **Brand color hex strictly enforced** — Must literally write `#FF6B35` + descriptor + proportion
6. **Copy uniqueness** — The same copy text must appear only once in the image (prevent AI hallucination duplication)
7. **Atmosphere effects must not swallow the subject** — motion blur / soft focus / bokeh must preserve a recognizable subject; full-frame blurring is prohibited

## Workflow (mandatory for every poster)

```
Step 0: Confirm required fields (use AskUserQuestion if missing)
  - Aspect ratio (use subtype default or ask user)
  - Main title complete text (user's exact words) + subtitle + supporting info
  - Font style preference

Step 1: Identify subtype → read references/subtypes-quick-ref.md
  → Match a subtype → read references/subtypes/{NN}-{name}.md for deep dive

Step 2: Assess layout complexity → read references/typography/chinese-rendering.md (hilo)
  Special font design / offset typography / multi-segment precise positioning → AskUser to provide reference image → use i2i

Step 3: Select model → read references/model-routing.md
  Cross-check with hilo contracts/model-capability-fallback.md for capability equivalence

Step 4: Select composition mode → read references/composition-modes.md
  Prefer one of the 5 modes (Immersive / Wrap-around / Editorial Minimal / Full Bleed / Magazine Composition); do not default to top-bottom color blocks

Step 5: Assemble prompt + generate image
  Composition prompt must contain "gradient transition" keywords; must not use "Top 1/3 / Header area" or similar geometric division descriptions

Step 6: Post-generation quality scoring — run 5-module 19-item self-check → references/quality-scoring.md
  Any P0 item < 6 → regenerate immediately
```

## References (deep read on demand, following Step order)

| File | When to read |
|---|---|
| `references/iron-laws.md` | Must read before Step 0 |
| `references/subtypes-quick-ref.md` | Step 1 subtype identification |
| `references/subtypes-index.md` | Step 1 index + decision tree + 12 subtype file path table (single source of truth) |
| `references/subtypes/{NN}-{slug}.md` | Deep read after Step 1 match (12 files, paths from subtypes-index.md) |
| `references/cross-subtype-rules.md` | Step 1 cross-subtype shared rules |
| `references/defaults.md` | Step 0 / Step 4 default parameters |
| `references/model-routing.md` | Step 3 model routing |
| `references/composition-modes.md` | Step 4 composition modes (core, must read) |
| `references/quality-scoring.md` | Step 6 scoring self-check |

## 12 Subtype List

Full index (with slug / file path / applicable scenarios / default ratio / core driver) available at `references/subtypes-index.md`.

## 5 Recommended Composition Modes (core, bypass model color-block shortcomings)

Models have a very stubborn intuition for "text on top, image on bottom" layouts, and forcing t2i will invariably produce color-block collages. **Using "Top 1/3 + Middle + Bottom 1/3" or similar geometric division descriptions is prohibited.** Use these 5 holistic composition modes instead:

| Mode | Suitable For |
|---|---|
| Immersive (Immersive Overlay) | Full-image hero visual + text floating on top (stroke/shadow/semi-transparent overlay) |
| Wrap-around (Wrap-around) | Text embedded into the hero visual as an object (book page/seal/cup surface/wall clock) |
| Editorial Minimal (Editorial Minimal) | Large monochrome background + subject in a small corner + refined typography |
| Full Bleed (Full Bleed) | Entire image densely filled with hero visual + text must have stroke/shadow |
| Magazine Composition (Magazine Composition) | Masthead in large font at top + subject partially overlapping (editorial layering) |

Detailed prompt templates → `references/composition-modes.md`
