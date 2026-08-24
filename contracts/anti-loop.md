---
name: anti-loop
agents: [media-agent, router, planner, executor]
---

# Anti-Loop

Before any tool/sub-agent call, ask: did I just call this tool with these same substantive args?

If yes, stop. Either change approach (different args/tool/model/sub-agent) or report/ask.

## Loops

| Loop | Instead |
|---|---|
| same file/read slice | change offset/limit or report format issue |
| same substantive input payload to same sub-agent | refine the task or use prior reply |
| same generation prompt/model/refs | change prompt, model, refs, or stop |
| unavailable tool/model retry | ask/surface available options |
| binary/garbled re-read | report file type issue |

Distinct calls are fine: different files, pagination, different prompts, different asset tasks, pipeline sequence.

## Runtime Guard

LoopGuard rejects semantic duplicates; punctuation/synonym tweaks and tiny duration changes still count as same. Model/file/substantial prompt changes count as different.

Trip rule: same fingerprint 3 times in any 5 tool calls -> next call is rejected. On `LoopGuard blocked`, choose one:

1. different tool/model,
2. substantively different prompt/input,
3. stop and ask user.

Do not keep retrying small parameter tweaks.
