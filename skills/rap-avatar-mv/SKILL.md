---
name: rap-avatar-mv
description: |
  After the user selects this Skill, they enter one sentence or keyword as the rap theme. The Skill automatically generates short lyrics. Before generating audio, it must open a card asking whether the voice should be male or female, then generate a short rap audio clip and trim out an 8-second climax segment. After that, it must show a photo-upload card and require the user to upload a photo of themselves or a specified person. It then uses the portrait and the 8-second Rap clip as multimodal references to generate two 8-second 2K rap MV videos with the H3 video model. After generation, it muxes the original Rap clip as the final soundtrack. The two videos must randomly use two different styles from the built-in pool of avant-garde, cyber, minimalist, luxurious, grotesque, and similar rap MV styles; it is not allowed to always use the first two styles. Trigger words include: rap avatar MV, self-portrait rap video, 8-second rap video, photo-generated rap video, rap MV avatar, rap avatar mv.
trigger-words: [rap avatar MV, self-portrait rap video, 8-second rap video, photo-generated rap video, rap MV avatar, rap avatar mv]
guide-prompt: Click the arrow to start creating!
guide-prompt-en: Click the arrow to start creating!
---

# Beginner "Grammy" MV Fast-Track Studio

Zero-experience recreation of Jack Rabbit's signature "Grammy" MV.

This Skill turns a sentence or keyword into an 8-second rap audio clip and uses a user-uploaded portrait photo to generate two 8-second rap MV videos.

Default launch prompt: after selecting this Skill, the placeholder text in the input box should ideally read "Click the arrow to start creating!".

Core flow:

1. User enters a theme;
2. Generate short rap lyrics and display the full lyrics in a canvas text node;
3. Open a dialog asking whether the voice should be male or female;
4. Generate short rap audio;
5. Trim out an 8-second climax;
6. Show a photo-upload card and require the user to upload a photo;
7. Ask for the video aspect ratio;
8. Randomly pick two MV styles from the style pool;
9. Use MiniMax-H3 to generate two 8-second 2K character Rap videos, then mux the original 8-second Rap clip as each video's final soundtrack.

## Use Cases

When the user wants to:

- "Make a rap MV with my photo"
- "Help me generate an 8-second self-portrait rap video"
- "The theme is freedom. Make me an avatar rap video"
- "I upload a photo, and you make the person in it rap"
- "Generate two short rap videos in different styles"

use this Skill.

## Not Suitable For

If the user only wants:

- pure rap audio, no video;
- a full song;
- a long MV;
- a pure image avatar;
- BGM without vocals;
- a multi-shot, complex narrative MV;

do not use this Skill. Switch to the corresponding music, video, or MV workflow instead.

## Step 1: Ask for the rap direction up front

After the user selects this Skill, no matter what they say first, you must first use the `question` tool to open a card-style question. Do not ask in plain text, and do not jump straight into generation.

The `question` tool question copy must be:

"What kind of rap do you want to make? You can enter a sentence, or just choose a direction."

Design the card as "three quick direction cards + one custom input box." Do not turn "enter your own" into a card that requires a second click; rely on the `question` tool's default custom input capability.

The quick direction cards must include three options with short descriptions:

- Freedom: a short rap about breaking free and chasing yourself
- Comeback: a short rap about rising from the lows and climbing back up
- Street: a short rap about street attitude, rhythm, and confidence

Custom input box:

- Use the `question` tool's default custom input box;
- The placeholder meaning should be: you can also enter a sentence or keyword yourself;
- The user can type their own rap theme directly into the input box.

Execution rules:

- If the user chooses "Freedom": use "Freedom" as the rap theme;
- If the user chooses "Comeback": use "Comeback" as the rap theme;
- If the user chooses "Street": use "Street" as the rap theme;
- If the user types content into the custom input box: use that content as the rap theme;
- If the user both clicks a card and fills in the input box, the input box content takes priority;
- After the user selects a quick card or submits custom input, do not ask anything else; go straight into lyric creation;
- Do not ask about style, aspect ratio, photo, or video parameters at this stage.

## Step 2: Generate short lyrics

Based on the user's input, generate a short rap lyric.

Requirements:

- Keep it short enough for an 8-second performance;
- 2-4 lines is recommended;
- Start with impact;
- Be ready to go straight into the hook;
- Do not write a long verse;
- The theme must be clear.

Example:

```text
I smash the chains and fly into the wind,
No one gets to decide who I should be.
Moving against the light, my heartbeat on the drum,
Freedom explodes beneath my feet like thunder.
```

After the lyrics are generated, you must display the full lyrics on the canvas:

- Create a new text node, preferably titled "Rap Lyrics";
- The text node content must include the full lyrics generated in this run;
- Preserve line breaks in the canvas text so the user can read it easily;
- No need to wait for lyric confirmation;
- After creating the lyrics text node, go straight into voice selection.

## Step 3: Choose the voice and generate short rap audio

Before generating audio, you must first use the `question` tool to open a card-style question asking the user to choose a voice. Do not ask in plain text.

The `question` tool question copy:

"What voice do you want?"

The card must have only two primary options:

- Male: powerful male rap voice
- Female: assertive female rap voice

Execution rules:

- If the user selects "Male": clearly use a male rap voice when generating the short rap audio;
- If the user selects "Female": clearly use a female rap voice when generating the short rap audio;
- Do not generate audio before the user has chosen a voice;
- Once the voice is chosen, generate the audio immediately; do not confirm again.

Use the music-generation capability to generate a short rap audio clip.

Requirements:

- With vocals;
- Chinese rap;
- The voice must match the user's chosen male or female voice;
- The goal is a short highlight version;
- No long intro;
- Start as directly as possible with the hook;
- Default style: Chinese trap / modern hip-hop / short-form social-media beat hit;
- If the user specifies a style, follow that.

Note:

The music model may not produce exactly 8 seconds, so you cannot promise the raw audio will be exactly 8 seconds. After generation, you must check the actual duration.

## Step 4: Locate and trim the 8-second climax

From the generated audio, trim the real 8-second climax segment. Do not mechanically cut the first 0-8 seconds.

Climax selection rules:

- First determine the part of the audio best suited as a short-video hook;
- Prefer the hook / chorus / repeated main line / the most memorable vocal moment;
- Also consider beat density, low-frequency impact, volume energy peaks, and emotional eruption points;
- If lyric timestamps are available, prioritize the most complete and most shareable 8-second section of the theme line;
- If no lyric timestamps are available, still look for the climax based on audio energy and structure;
- Only if the opening itself is clearly already the hook climax may you trim 0-8 seconds;
- Do not fix the opening 8 seconds just because it is easier.

Editing requirements:

- Segment length should be about 8 seconds;
- Start preferably on a complete lyric line or at the onset of a strong beat;
- End naturally. Do not cut off half a word abruptly;
- Do not overwrite the original audio;
- Output a separate audio file;
- Keep the original audio as a fallback;
- The 8-second climax audio is what will be used for video generation.

Hard constraint for the trimming task: the task description must explicitly say, "Do not default to cutting 0-8 seconds unless you confirm the opening is the climax." If the trimming tool returns a segment reason that is just "cut from the beginning," it must be considered invalid and the climax segment must be reselected.

If the generated audio itself is already close to 8 seconds, you still need to determine whether the whole clip is actually the climax. If not, regenerate a shorter audio that gets to the hook faster, rather than using it directly.

## Step 5: Go straight to photo upload

After trimming the 8-second audio, do not pop up a "satisfied / not satisfied" confirmation, and do not ask whether to regenerate.

Execution rules:

- Use the 8-second rap audio directly as the audio for later video generation;
- Immediately move to Step 6 and show the photo-upload reminder card;
- If the user proactively says "not satisfied / change the song / regenerate / change the style," return to Step 2 to regenerate the short lyrics and short rap audio, then trim the 8-second climax again;
- If the user did not explicitly request regeneration, do not stop at an audio confirmation step.

## Step 6: Show the photo-upload reminder card

After the 8-second audio is generated, you must use the `question` tool to show a card-style "photo upload reminder" telling the user to upload a portrait photo through chat attachments. There is no need to open the system file picker, and you should not ask the tool to open one automatically.

`question` tool card copy:

Question: Please upload a portrait photo
Description: Please upload a clear portrait photo in the chat box to generate your rap MV.

Card options:

- I'll upload a photo: after seeing the prompt, the user uploads an image through chat attachments

Reminder card requirements:

- The card can only have that one option;
- Do not provide custom answers / Type your own answer / other input entries;
- If using the `question` tool, you must set `custom: false` to disable custom answers;
- This is a reminder card, not a file upload control;
- Its purpose is only to make it clear that the user needs to upload a photo now;
- Do not enter the video aspect-ratio selection before the user uploads a photo;
- Do not generate video before the user uploads a photo;
- The photo should include a clear human face;
- It can be the user's own photo or a photo of someone the user is authorized to use;
- Only one photo is needed;
- If the photo is unclear, ask the user to upload again.

Once the photo is received, use it as the facial reference for the video.

## Step 7: Ask for aspect ratio and randomly choose two MV styles

After receiving the user's photo and before generating video, you must use the `question` tool to ask for the video aspect ratio. Do not ask in plain text.

The `question` tool question copy:

"What aspect ratio do you want the video in?"

The card must provide two primary options:

- 16:9: landscape video;
- 9:16: vertical video.

After the user chooses, both later videos must use the same aspect ratio. Do not make one landscape and one vertical.

Then randomly select two different styles from the following style pool and generate two different versions of the video.

Randomization rules:

- Select exactly two styles each time;
- You must randomly draw from all 8 styles. Do not always use the first two;
- Recommended approach: list style numbers 1-8 first, then randomly draw two non-repeating numbers in random order;
- If two consecutive runs draw the same pair of styles, redraw to improve diversity;
- If the user requests a specific style, honor that first; otherwise randomize strictly.

### Style Pool

#### Style 1: Cyber Violent Girl MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. A tribute to Rico Nasty's cyber-violent-girl MV style. The character wears a neon-green PVC bodysuit and exaggerated platform shoes, rapping intensely in a virtual space filled with pixelated flames and glitch-art backgrounds. The motions are exaggerated and aggressive. The camera uses a game-engine-like third-person follow shot. The palette is blinding neon green and acid pink, with a violently cute videogame-and-internet aesthetic.

#### Style 2: Cold Minimal Red Room MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. A tribute to 21 Savage's cold minimalist MV style. The character wears an all-black outfit and thin-frame sunglasses, sitting alone on a chair in the center of an empty all-red room and rapping with a detached expression. The room contains no other objects. The camera slowly pushes in until it reaches a close-up of the face. The frame is only deep red and pure black, with an icy, dangerous atmosphere.

#### Style 3: Warm Healing Backyard MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. A tribute to Mac Miller's warm healing MV style. The character wears an old plaid shirt and a baseball cap, softly rapping while playing guitar on a sunny backyard lawn, with vintage speakers and scattered vinyl records around them. The camera uses the warm texture of Super 8 film, with slight overexposure and a soft glow. The palette is nostalgic warm yellow and pale green, with a pure and sorrowful atmosphere.

#### Style 4: Psychedelic Trap MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. A tribute to Future's psychedelic trap MV style. The character wears a full purple velvet suit and a diamond necklace, rapping in a huge empty studio filled with purple smoke, with irregular LED light strips faintly flickering in the haze. The camera uses a very slow push-in and soft-focus treatment. The palette is deep purple fading into magenta, with all edges blurred and melting, creating a hallucinatory feeling.

#### Style 5: Sunny Gospel Community MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. A tribute to Chance the Rapper's sunny gospel MV style. The character wears a colorful baseball cap and white overalls, happily rapping and dancing in front of mural walls in a Chicago neighborhood street, with a group of kids running and playing around them. The camera uses a handheld documentary feel. The frame is bright, warm, and slightly oversaturated, full of the joy and positivity of a community celebration.

#### Style 6: Artistic Desert Highway MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. In the style of Kendrick Lamar's artistic MV work. The character wears a loose white T-shirt and jeans, walking and rapping on an empty desert highway. Harsh sunlight creates high-contrast light and shadow. The camera uses a wide-angle low angle, and the frame features surreal color treatment with an unnatural purplish-red sky.

#### Style 7: Luxury Rooftop MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. In the style of Jay-Z's luxury MV aesthetic. The character wears a black three-piece suit and sunglasses, rapping confidently on the rooftop of a luxury hotel, with a dazzling city nightscape in the background. The camera slowly circles around them. The frame is warm golden, with a premium, blockbuster commercial feel.

#### Style 8: Grotesque Candy House MV

A character rap video using the 8-second rap audio. Use the face from the reference image, i.e. the user's uploaded photo. In the style of Tyler, the Creator's grotesque MV aesthetic. The character wears a bright yellow suit and a pink bow tie, performing rap in a huge colorful candy-house setting surrounded by giant lollipops and cake props. The camera uses a fisheye wide angle. The colors are extremely vivid and saturated, full of pop-art energy.

## Step 8: Generate two videos

Generate two videos at once.

Video requirements:

- Model ID: `MiniMax-H3`;
- Image mode: `reference`;
- Duration: `8`;
- Resolution: `2K`;
- Ratio: use `16:9` or `9:16` as chosen by the user in Step 7;
- Reference image: one uploaded portrait photo;
- Reference audio: one 8-second Rap audio file from Step 4;
- Audio generation: `generate_audio: true`;
- Silent output is forbidden. Do not set `generate_audio: false`, `mute`, or equivalent no-audio parameters;
- Content: character rapping;
- Must reference the face in the photo;
- The two videos must use two different random styles, and they must be drawn from the 8-style pool at random. Do not always use the first two;
- Do not add subtitles;
- Do not generate on-screen text;
- Do not merge the two styles into one video;
- Append this sentence to the end of each video's prompt: Multiple cuts.

Note: set `generate_audio: true`. The 8-second Rap clip is a multimodal reference for character motion, rhythm, vocal character, and lip sync. MiniMax H3 does not document bit-for-bit preservation of reference audio, so after generation mux the original 8-second Rap clip onto each video as the final soundtrack.

Each video's task description must include:

- `model_id: MiniMax-H3`
- `image_mode: reference`
- `duration: 8`
- `resolution: 2K`
- `ratio: 16:9` or `ratio: 9:16`, depending on the user's choice in Step 7;
- `generate_audio: true`
- one portrait reference-image path;
- one 8-second reference-audio path;
- confirmation that reference audio is not the only multimodal input;
- the full randomly selected style description;
- the prompt must end with the fixed sentence: Multiple cuts.
- after generation, mux the original 8-second Rap clip as the final soundtrack.

## Step 9: Delivery

After generation, reply to the user with:

- the 8-second rap audio file;
- the two final video files with the original 8-second Rap clip muxed as their soundtrack;
- the styles used by the two videos;
- a short note saying they can continue by changing the song, regenerating the video, or specifying a style.

If this run generated multiple files, group the audio and the two final sound-enabled videos together so the user can review them easily.
