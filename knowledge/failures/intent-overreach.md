---
topic: intent-overreach
activation_hints: ["short request", "simple edit", "短指令", "改成", "换成", "上色", "restyle", "prompt rewrite", "润色"]
modality: multi
---

# intent-overreach -- prompt expansion drift

## Activate When
A short, actionable user request is being turned into an over-specified sub-agent payload or final prompt, especially with source refs or canvas assets.

## Decision Test
A failure exists when the descriptor or final prompt would fail `semantic-judgment` Prompt Boundary by adding ungrounded concrete decisions or over-specifying a replacement target. If several valid choices would materially change output, ask; otherwise keep the user target primary.

## Action
- Build `intent_contract` before final prompt: requested / take / adapt / ignore / block / ask_if.
- Keep the user's requested change near-verbatim and primary.
- For source edits, use `semantic-judgment` source/ref decisions and a minimal edit prompt; do not turn analysis into extra art direction.
- Do not replace a user-level target with more specific symbols, parts, props, or mood unless the user asked.
- For background / setting replacement, keep the named target itself as the setting; do not choose a subtype, viewpoint, part list, material list, or lighting plan unless stated.
- Do not lock incidental source layout when the requested transform needs natural recomposition.
- Distinguish final visual sources from low-fidelity layout guides. Blockout / sketch / previz refs donate rough composition, action, and camera; prompt the model to render a complete scene/background instead of preserving placeholder space or artifacts.
- Critique against the user's original intent, not against the rewritten prompt.
