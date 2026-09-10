# Structured Schemas

Use these schemas as field contracts for structured planning or JSON-style outputs. They are guidance, not runtime API contracts.

## Input Shape

```json
{
  "task_type": "single_image_recreation | batch_image_recreation | competitor_adaptation | product_swap | style_bible | prompt_generation",
  "reference_images": ["url-or-attachment-id"],
  "product_images": ["url-or-attachment-id"],
  "brand_info": "brand tone, palette, audience, constraints",
  "target_platform": "Amazon | TikTok Shop | Shopify | Instagram | other",
  "goal": "main image | listing secondary image | ad creative | social post | A+ detail",
  "must_keep": ["composition", "lighting", "mood", "text space"],
  "must_change": ["logo", "model identity", "brand-coded props"],
  "variants_count": 1
}
```

## Reference Analysis Shape

```json
{
  "composition": "",
  "lighting": "",
  "color_palette": "",
  "subject_relationship": "",
  "commercial_message": "",
  "platform_fit": "",
  "transferable_elements": [],
  "non_transferable_elements": []
}
```

## Recreation Plan Shape

```json
{
  "keep_elements": [],
  "change_elements": [],
  "adaptation_logic": "",
  "scene_or_layout_plan": "",
  "commercial_priority": "",
  "risk_notes": [],
  "generation_prompts": []
}
```

## Batch Plan Shape

```json
{
  "series_goal": "",
  "shared_rules": {
    "product": "",
    "lighting": "",
    "color": "",
    "background": "",
    "props": ""
  },
  "image_roles": [
    {
      "index": 1,
      "role": "",
      "reference_logic": "",
      "variation_axis": "",
      "prompt_focus": ""
    }
  ],
  "consistency_checks": []
}
```
