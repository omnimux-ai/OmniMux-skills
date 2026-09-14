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

## Multi-shot inside this mode

Boundary frames do not forbid a shot list. When the request spans several beats between the frames, use the multi-shot formula inside this mode: overall description, then shot number with timestamp, then the per-shot content. Keep the intermediate beats consistent with the supplied frames' subject, scene, and lighting so the endpoints remain reachable.

## Aspect ratio note

First-last-frame mode follows the input image's original aspect ratio. It does not accept an independent ratio setting, so a 9:16 still produces a 9:16 video. If the user needs a different ratio, produce or crop the boundary frames first — do not try to override the ratio in the prompt.
