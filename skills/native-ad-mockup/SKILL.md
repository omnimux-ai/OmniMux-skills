---
name: native-ad-mockup
description: |
  Generate native-looking soft-ad static images inside realistic mobile mock frames using the user's product, product images, product page, or typed product facts. Supports iMessage/DM, WeChat-style chat, Xiaohongshu notes, comment Q&A, product cards, checkout/cart, low-battery alerts, reminders, weather/body-status apps, workplace chat, ingredient cards, scarcity cards, testimonials, and comparison ads. It asks whether product images are ready, asks which native-ad format to use, then produces prompts and images with phone-frame, inner-screen proportion, system-font, top-whitespace, and text-readability rules.
  Use whenever the user wants 手机 mock 外框、原生广告样机、软广图片、iMessage 广告、微信聊天推荐、小红书电商图、评论区问答、商品卡、低电量弹窗、App 截图风广告, or a set of native UI static ads for a product.
trigger-words: [native-ad-mockup, 原生广告样机, 手机mock, 软广图片, iMessage广告, 微信聊天推荐, 小红书电商图, 商品卡]
---

# Native Ad Mockup

Creates native-looking soft-ad static images inside realistic phone mock frames using the user's product image, product page, or typed product facts.

This Skill does **not** require a brand folder, local product-image directory, or prebuilt brand system. It works from the current conversation attachments and user-provided product information.

---

## Step 1 — Ask product readiness and native-ad format

Before writing prompts or generating images, pause and ask the user two practical questions in one message unless the user already answered them.

### 1. Product / product image readiness

Ask:

> Do you already have a product image or packshot?

Offer concrete options:

- Use attached image(s)
- I will upload product image(s)
- Fetch from product page / URL
- No product image yet — make a concept draft from description

Rules:

- If the user attached image(s), use them as product visual anchors.
- If the user gives a product page URL, use it as the copy/product-claim source when available.
- If the user only provides a text description, proceed as a concept draft and do not claim real packaging accuracy.
- If multiple images are attached, ask or infer roles: product packshot, style reference, layout reference, scene reference.

### 2. Soft-ad / native-ad format choice

Ask:

> Which native soft-ad format do you want?

Offer concrete choices:

- iMessage / DM conversation
- WeChat-style friend recommendation
- Xiaohongshu note / social-commerce post
- Xiaohongshu comment Q&A
- Xiaohongshu product card
- mobile checkout / cart
- low-battery / system alert
- reminder / calendar / to-do app
- weather / body-status app
- workplace chat / Slack-like chat
- ingredient spotlight / clean-label card
- countdown urgency / scarcity card
- user testimonial / review card
- before-after / comparison card
- custom format described by user

If the user picks multiple formats, generate one image per format as a coherent set.

If the user says “all / all capabilities / 都来一个”, select a balanced set of 4–6 formats based on product category and platform.

---

## Step 2 — Analyze product and reference inputs

For each supplied product image, extract only details needed for generation:

- Product form: sachet, bottle, tube, box, app screen, device, food item, clothing, etc.
- Visible brand/product text.
- Packaging structure and distinctive design signals.
- Material feel and product category.
- Transferable brand signals: shapes, labels, typography logic, recurring visual motifs.
- What must stay accurate in the generated image.

For optional ad/layout references, extract:

- Format type and layout logic.
- Content zones and visual hierarchy.
- Copy slots and their roles.
- Product placement logic.
- Typography treatment.
- Whether the format needs a phone mock frame.

Do not copy third-party identity from a reference. Take structure only, not colors, logos, typefaces, or brand marks.

---

## Step 3 — Write or adapt copy

Generate copy according to the chosen format and product evidence.

Copy rules:

- Use actual product claims when provided by the user or product page.
- If claims are not provided, write lower-risk lifestyle copy and avoid unsupported medical, performance, or quantified claims.
- Keep native-ad copy short, conversational, and screenshot-like.
- For chat formats, use short bubbles and avoid long sentences.
- For Xiaohongshu formats, use natural “种草” language, not corporate ad slogans.
- For comment Q&A, handle real objections: price, taste, usage, size, fit, sweetness, skin type, portability, routine, etc.
- For product cards, use concise benefit tags and one clear CTA.

Show the user the copy slots for approval when the request is high-stakes, brand-sensitive, or involves multiple outputs. If the user already says to proceed or “你看着办”, continue with reasonable defaults.

---

## Step 4 — Aspect ratio and output set

Default aspect ratio is `4:5` unless the user specifies otherwise.

Supported ratios:

- `4:5` default for social feed / Xiaohongshu / Meta static ads
- `9:16` for Story / Reels / Shorts / Douyin
- `1:1` for square feed
- `3:4` for portrait product-card variants
- `16:9` for landscape placements

For a set, keep the same aspect ratio across all images unless the user asks for multiple ratios.

---

## Step 5 — Prompt construction rules

Every generated prompt must include:

- Product visual anchor(s), including image paths when available.
- Chosen native-ad format.
- Outer aspect ratio.
- Phone mock frame requirement when the format is mobile/app-native.
- Inner-screen proportion lock.
- Typography and readability constraints.
- Platform/logo safety constraints.
- Exact copy to render.

### Mobile UI mockup rule — mandatory for phone/app-native formats

Apply this whenever the ad format is a phone screenshot, chat screenshot, app interface, iMessage/DM, low-battery alert, reminder, weather app, checkout page, Xiaohongshu note, WeChat-style chat, or mobile social-commerce layout.

- The **outer ad canvas** follows the requested aspect ratio.
- The **inner phone screen** keeps authentic tall-mobile proportions.
- Never stretch or squeeze the phone interface to fill the canvas.
- Add a subtle, realistic **phone mock frame** unless the user asks for a frameless screenshot.
- For `4:5`, compose as: outer ad canvas → close or centered phone mock frame → inner screen content at natural tall-phone proportions.
- Text and UI elements must remain horizontally proportioned.
- No tall skinny letters, no condensed fonts, no vertical stretching, no artificial tracking, no warped message bubbles, no compressed line height.
- For iPhone-like English UI, typography should resemble Apple San Francisco / SF Pro proportions: regular width, normal tracking, natural optical sizing, neutral rounded sans-serif.
- For Chinese mobile UI, typography should resemble PingFang SC / modern Chinese system UI proportions: normal width, natural line height, no stretched Chinese characters.
- For chat formats, prefer **close-up phone mock framing** over showing the full phone when readability matters.
- For iMessage/DM-style formats, leave generous top whitespace: the header/contact area should feel tall and breathable, with clear vertical space between the contact name and the first message bubble.
- Copy the interaction pattern and layout logic, not protected platform logos or exact proprietary marks.
- Do not include real app logos, platform watermarks, generated-by marks, random notifications, QR codes, fake official badges, or unrelated UI chrome.

---

## Step 6 — Built-in prompt templates

Use these as internal templates. Fill placeholders with the product, approved copy, and chosen aspect ratio.

### iMessage / DM Conversation

Create a mobile DM/iMessage-inspired chat screenshot inside a realistic slim phone mock frame. The outer image is [ASPECT RATIO]. Prefer a close-up crop of the phone mock rather than showing the full phone, so the visible screen and text are large. The inner phone screen keeps authentic tall-mobile proportions and must not be stretched. Typography resembles SF Pro proportions: regular width, normal tracking, not condensed, not tall, not skinny. Top: clean mobile header with centered contact name “[FIRST NAME]”, optional avatar, small “iMessage”/DM label, generic back/info icons only. Keep the top header tall and breathable. Leave clear vertical whitespace before the first bubble. Use 3–5 short bubbles max. Each bubble contains short text only. Below the last bubble, add a realistic link preview/product card with [PRODUCT NAME], [TAGLINE/URL], and product thumbnail. Bottom input bar may say “iMessage” or “Message”. No platform logo, exact protected app mark, watermark, or random notifications.

### WeChat-Style Friend Recommendation

Create a Chinese friend-to-friend chat screenshot inside a realistic slim phone mock frame. Use a generic domestic chat-app pattern without official WeChat logo or proprietary marks. The outer canvas is [ASPECT RATIO]; the inner chat screen keeps natural tall-phone proportions. Typography resembles PingFang SC proportions. Conversation should feel casual and specific: one friend mentions an everyday pain point, the other asks a short question, then the product is recommended naturally. Include a small link/product card for [PRODUCT NAME] with product thumbnail. No platform logo, watermark, QR code, fake official badge, or stretched Chinese characters.

### Xiaohongshu Note / Social-Commerce Post

Create a Chinese Xiaohongshu-style native social-commerce note screenshot inside a realistic phone mock frame. The inner app screen keeps natural mobile proportions. Typography resembles PingFang SC proportions. Top profile row: avatar placeholder, username, subtle “关注” button. Title: [种草标题]. Body: 2–4 short natural Chinese lines grounded in product facts. Product card: [PRODUCT NAME], subtitle, 3–4 short tags, and button “去看看”. Optional comment preview: 2–3 Q&A comments. Use Xiaohongshu-like content mechanics, but do not include the actual Xiaohongshu logo, app watermark, QR code, platform marks, or fake official badges.

### Xiaohongshu Comment Q&A

Create a mobile comment-section ad inside a phone mock frame. The main content is a realistic comment thread. Start with one short post line, then show 3–5 comments and replies that answer product objections. Keep the UI minimal and believable. Include a small product card at the bottom. Use normal-width Chinese system UI type. No platform logo or watermark.

### Xiaohongshu Product Card

Create a mobile social-commerce product-card screenshot inside a phone mock frame. Top: strong lifestyle headline. Center: product card with product image, product name, subtitle, benefit tags, and one CTA button. Bottom: short use-case line or trust/lifestyle note. Keep it like an in-app commerce card, not a traditional poster.

### Mobile Checkout / Cart

Create a clean mobile checkout/cart screenshot inside a phone mock frame. Show product row, product thumbnail, product name, subtitle, optional discount code, price, CTA button, and trust line. Keep the UI generic and platform-safe.

### Low-Battery / System Alert

Create a generic mobile system-alert ad inside a phone mock frame. Center alert card with title, short body, two native-style buttons, and product card/packshot nearby. Keep it generic; do not copy exact Apple/iOS marks.

### Reminder / Calendar / To-Do App

Create a generic reminder/calendar/to-do app screenshot inside a phone mock frame. Use daily schedule rows or reminder items to make the product feel like a routine. Keep text short and UI believable.

### Weather / Body-Status App

Create a generic weather/body-status app screenshot inside a phone mock frame. Turn the user’s body state or routine moment into a playful forecast. Include a small product card at the bottom.

### Workplace Chat

Create a generic workplace chat screenshot inside a phone or desktop-style app frame. Avoid real Slack logo or proprietary marks. Use short office-context messages and a product link preview.

### Ingredient Spotlight / Clean-Label Card

Create an educational ingredient or clean-label product card. Use clear hierarchy, benefit rows, product image, and one trust badge. This does not always need a phone mock unless requested.

### Countdown Urgency / Scarcity Card

Create a high-urgency static ad with countdown, stock bar, offer label, product hero, CTA, and disclaimer. This does not always need a phone mock unless requested.

### Testimonial / Review Card

Create a native-looking review/testimonial card with a short quote, profile placeholder, product card, and concise CTA. Avoid fake platform logos.

### Before-After / Comparison Card

Create a native comparison card with two states, short labels, product explanation, and CTA. Avoid unsupported claims unless evidence is provided.

---

## Step 7 — Generate images

Generate one image per selected format.

For batch outputs:

- Keep product identity consistent across the set.
- Keep aspect ratio consistent.
- Keep phone-frame and typography rules consistent.
- Vary only the native-ad format, copy angle, and layout.
- Do not combine multiple formats into one image unless the user asks for a collage.

---

## Step 8 — Review and iteration

After generation, check:

- Does the image include the intended phone mock frame when required?
- Does the inner phone screen keep natural proportions?
- Is the text readable and normal-width?
- Is there enough top whitespace for iMessage/DM formats?
- Are there any platform logos, watermarks, QR codes, or fake official badges?
- Is the product close to the supplied reference?
- Is the output still native-looking rather than a traditional poster?

If the user requests changes, preserve the approved parts and edit only the requested area, e.g. more top whitespace, fewer bubbles, larger text, closer phone crop, different soft-ad format, or more product prominence.
