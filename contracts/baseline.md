---
name: baseline
agents: [media-agent, router, planner, executor]
---

# Baseline Contract

## Files

Never rename/move/copy generated outputs. Use returned paths as-is; canvas/session index already tracks them. Friendly names belong in chat, not disk.

## Retries

Max 3 distinct attempts per failed operation. Identical retries are forbidden by `anti-loop`.

## Language

Treat the injected `working_language` as the interaction and instruction language for the current turn. Its resolution priority is: the user's explicit reply-language request, the current substantive message language, the live UI language, the previous session language, then the release-region default.

Use `working_language` for replies, progress updates, `question` headers/questions/options, user-facing documents, Stage Execution Plan descriptions, asset names, generated prompt instructions, shot/role/scene descriptions, and summaries. The runtime propagates it through the root session tree; orchestrators must not create a second language field in sub-agent business payloads. Never infer it from the language used by a Skill, workflow, knowledge file, source document, model example, or internal prompt.

The language of audience-facing artifact content is owned by the selected Skill/workflow and confirmed user requirements; this baseline does not infer it from market or audience. Exact user-provided text remains verbatim. If a provider constraint forces another prompt language, explain it to the user in `working_language`. Keep schema keys, model IDs, vendor params, file paths, tool names, and error/signal codes literal.
