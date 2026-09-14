# 全能参考 Mode (All-Purpose Reference)

The default mode on Wan 3.0 and the mode that most creative work should use. The user supplies free-form assets — images, videos, audio, documents, web pages — and the prompt states what each asset governs.

This is the mode that delivers 像素级一致性: precise restoration of reference detail for production work.

## Capabilities

| Capability | What the user supplies | What the prompt must state |
| --- | --- | --- |
| Subject reference | Images and/or videos of a character, object, or environment | Which asset is which subject, and what that subject does |
| Temporal reference | A video carrying motion, camera work, or a visual effect | Which aspect is being referenced (action / camera / effect) and what changes |
| Audio reference | Audio carrying a voice timbre, rhythm, or performance | Whether the audio drives timing, supplies voice, or both |
| Document / web page reference | One document or one web page | The narrative or data intent drawn from the source |
| Video editing | A source video, optionally with reference images | The edit target and the preserved content |
| Video extension | A source video | Direction (forward / backward / both) and the new motion |

## Reference addressing

Address assets by index in the order they were supplied: @图片1, @视频2, @音频1. An asset may be referenced more than once and in different places, which is how a single reference is bound to multiple intentions.

The prompt formula for this mode is in `prompt-formulas.md` (reference-to-video). The short form is:

**@参考对象 + 动作 + 台词**

## Temporal reference is selective

A temporal reference does **not** mean "copy this video". It means one dimension is being carried over. State the dimension explicitly:

- action reference — "the subject performs the action from @视频1"
- camera reference — "use the camera movement of @视频1, change the scene to …"
- effect reference — "the subject in @图片1 carries the energy effect and action of @视频1"

An unqualified "reference @视频1" leaves the model to choose, and it often chooses the whole frame layout.

## Video editing

Editing keeps the source footage as the base. The formula is **edit target + edit behavior**, and the categories are:

| Edit kind | What to say |
| --- | --- |
| Add an element | Name the element and where it goes, plus its physical behavior |
| Modify an element | Name the replacement and what is preserved from the original |
| Remove an element | Name the element and state that the rest is unchanged |
| Lighting | Describe the lighting result; state that subject motion is unchanged |
| Motion / blocking | Describe positional changes and whether rhythm stays with the original |
| Style | Name the target style, or bind it to a reference image |
| Dialogue | Give the exact line, and state that voice timbre and tone are preserved |
| Reference edit | Bind the edited element to a specific reference asset |
| Plot rework | Restate the changed plot beat while keeping the scene continuous |

Every edit instruction should end by naming what must **not** change. Without it, the model re-improvises untouched regions.

## Video extension

Extensions are content generation, not splicing. Because the visible content, style, and layout are already fixed, the prompt only needs to describe the **new** motion.

- backward / forward / both directions are all supported;
- with video input, the input plus output timeline must stay within 30 s total;
- **state the expectation gap up front**: the handbook notes that the generated segment differs slightly from the original footage. This is expected model behavior, not a defect.

## Combining references

Multiple subjects, a subject plus an environment, or a subject plus an audio timbre all compose in one request. Keep each asset's role singular and explicit. When two assets could plausibly govern the same dimension, say which one wins.
