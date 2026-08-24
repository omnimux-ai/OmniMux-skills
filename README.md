# OmniMux-skills

Official curated & translated skills repository for OmniMux and DeepSeek Harness ecosystem.

## Overview

`OmniMux-skills` is the dedicated repository for curated third-party and multi-modal platform skills (such as MiniMax Design, Hailuo AI, and specialized AI pipelines) that complement the core `workbuddyskills` and `SkillHub` catalogs.

### Key Domains

- **Video Generation & Direction**: 3D Animation, FPV Tour, POV Short Films, Video Deconstruct, Storyboard Generation, Beat Sync.
- **Image & Visual Arts**: Image Remix, Relight, Character Scene Storyboards, Anime Style Forge, Dynamic Posters.
- **Audio & Sound**: Multi-character Audiobooks, ASMR ambient sound, Voice cloning, Rap avatar MV, Voiceover direction.
- **Creative Marketing & E-Commerce**: 6-Funnel Detail Pages, Minimalist Product Ads, UGC Ad Production, Brand Promo Videos.
- **Storytelling & Scripts**: Micro-drama screenwriting, Chinese style short dramas, Dialogue & Script adaptation.

## Structure

```text
OmniMux-skills/
├── README.md
├── skills/
│   ├── 3d-animation-short-generator/
│   ├── audiobook/
│   ├── backrooms-dreamcore/
│   ├── detail-page-skill-course/
│   ├── rap-avatar-mv/
│   ├── zodiac-world/
│   └── ... (103 skills)
├── agents/
│   ├── comfyui-agent.md
│   ├── executor.md
│   ├── media-agent.md
│   ├── planner.md
│   └── router.md
├── workflows/
├── contracts/
└── knowledge/
```

## Distribution & Marketplace

Skills in this repository are distributed via the OmniMux Marketplace (`omnimux-market` plugin) with source declarations:
```json
{
  "type": "git",
  "repo": "infometa/OmniMux-skills",
  "path": "skills/<skill-name>",
  "ref": "main"
}
```
