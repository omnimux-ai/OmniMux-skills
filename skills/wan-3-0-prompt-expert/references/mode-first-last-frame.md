# 首尾帧 Mode (First-Last-Frame)

Use when the user supplies a **first frame**, or a **first frame and a last frame**, and needs the output to adhere strictly to them.

Typical uses: an approved key visual that must open the shot, a defined opening and closing state for a transition, an image-to-motion request where the still is already final.

## The two forms

| Form | Input | Prompt's job |
| --- | --- | --- |
| First frame only | One image | Describe the motion that departs from that frame |
| First frame + last frame | Two images | Describe the motion arc that connects them |

In both forms the subject, scene, and style are already fixed by the image. Do not re-describe them at length — spend the prompt budget on **motion and camera**, which is what the model has to invent.

## Exclusivity with reference mode

Supplying boundary frames **disables reference inputs**. You cannot combine a first frame with a subject reference image, a temporal reference video, or an audio reference in the same request.

If the user wants both — for example, "start from this frame and also keep the character from that photo" — resolve it before submitting:

1. Ask which constraint is harder: the exact opening frame, or the identity carried from the reference.
2. If the frame wins: use 首尾帧 and describe the subject's identity in words, accepting weaker identity lock.
3. If the reference wins: use 全能参考 with the frame supplied as a subject or composition reference, accepting that the first frame will be approximate.
4. If the user needs both strictly: generate in two stages, or review whether a different model is required.

Never send both and hope one is ignored.

## Formula

**运动 + 运镜**

Motion: describe what happens to the elements already visible in the frame — running, greeting, turning. Control the degree and speed with adjectives: 快速地, 缓慢地.

Camera: state the movement explicitly — 镜头推进, 镜头左移. When the camera must hold still, write **固定镜头** to force it. Without it the model improvises movement that can break the adherence to the supplied frames.

## Structure between the frames

The handbook's 首尾帧 examples are written as timestamped beats inside one continuous shot (`(0:00 - 0:03) 运镜：…`), so time-coded structure is the native form here. When a request spans several beats between the frames, keep that shape: overall description, then each beat with its timestamp, then the per-beat content.

Keep intermediate beats consistent with the supplied frames' subject, scene, and lighting so both endpoints stay reachable. Whether this mode honors a hard cut between separate shots is not stated in the handbook — if the user needs definite cutting, ask for it in the prompt and treat the result as something to verify rather than assume.

## Aspect ratio

Aspect ratio stays an independent setting in this mode — the boundary frames do not force it. The handbook states exactly one restriction for this mode (mutual exclusivity with reference inputs); it does not restrict ratio, resolution, or duration.

Still, match the output ratio to the supplied frames. A 16:9 output built from 9:16 boundary frames asks the model to reframe between the endpoints, which weakens adherence to them. When the user wants a ratio the frames do not have, produce or crop the boundary frames to that ratio before submitting. This is engineering practice, not a model restriction, so do not present it to the user as one.
