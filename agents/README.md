# Agents — Per-Agent System Prompts

Cognitive-role topology (not modality split). The orchestrator hands tasks to the smallest needed sub-agent; sub-agents are stateless and see only the input payload they receive.

Router classifies scene/workflow routing and compresses optional source documents into routing evidence. Planner defines or revises the plan. The orchestrator decides which ordered stage to run next and updates workflow state. Executor performs only the current stage.

## File listing

| File | Role | Dispatch direction |
|------|------|--------------------|
| `media-agent.md` | Orchestrator (user-facing) | Triage user intent → direct execute when no dependency gate → dispatch only when dependencies/hard failures require it |
| `comfyui-agent.md` | ComfyUI workflow specialist | Receives an exact workflow/node pointer → inspects the graph → asks parameter questions or runs with confirmation → persists approved edits |
| `router.md` | Scene/workflow router | Receives inline intent + optional explicit source pointers + `workflows/workflow.md` route index → returns compact `routing_capsule` for route selection |
| `planner.md` | Workflow decomposer | Receives approved brief / revisions + canvas state → materializes document nodes (`hub_canvas_write_node`) + writes the Stage Execution Plan via `hub_plan_write` / `hub_plan_patch_stage`, returns only `plan_id`, `stage_count`, and minimal `stages[]` |
| `executor.md` | Stage producer (all modalities) | Receives one `stage` → reads final prompts/text → picks models → calls tools → returns compact `results[]` / `failed[]` |

The orchestrator uses router whenever a task needs route classification before workflow planning. It sends one executor call per ordered stage, patches the Stage Execution Plan from `results[]` / `failed[]`, then executes the next unfinished stage. `planner` stays off the simple direct path unless the plan itself needs revision.

## Injection mechanism

OpenCode startup runs `setupAgentStaging` in `app/packages/service/src/opencode/electron-main/config-loader.ts`:

1. **Contracts** — Each contract's `agents:` frontmatter is matched against agent name. Matching contracts wrapped as `<contract name="...">…</contract>` blocks and appended to the SP.
2. **Knowledge-base header** — `<knowledge-base>` block with `<knowledgeDir>` absolute paths injected, so SPs can use relative paths in `hub_read` calls.

See `.opencode/contracts/README.md` "How injection works" for details.

## Writing rules

| Rule | Why |
|------|-----|
| SP files contain only role identity + boundaries + dispatch interface + universal guards | All multimodal domain knowledge lives in `knowledge/` — read on demand |
| No low-level model IDs in orchestrator/planner SPs | Simple direct routing may name vendor families; exact model IDs and vendor quirks stay in capability manifests / vendor cards |
| Planner writes final workflow prompts | Executor dispatches prompts/text as-is and only maps refs and valid tool parameters |
| Sub-agent SPs are stateless contracts | Document inputs (what orchestrator gives them) + parsed outputs (what they return) precisely; no implicit state |
| Working language is infrastructure | SP field names may stay English; interaction/docs/instructions follow injected `working_language`; audience-facing artifact language remains owned by the selected Skill/workflow |

## When to add knowledge vs change SP

- **Semantic risk GPT/Claude may mishandle** → add a card to `<knowledgeDir>/failures/` (≤25 lines). The card should teach a decision test, not an enumerated case table. Don't bake into SP.
- **Vendor-specific quirk** → add to the matching card under `<knowledgeDir>/vendors/` and expose its path through `hub_list_capabilities.vendors[].knowledge_card` (≤50 lines). Don't bake into SP.
- **New project type with user-confirmation gates** → add a playbook to `<workflowsDir>/`. Don't bake into SP.
- **New sub-agent role or new orchestrator stage** → SP edit is correct.
- **New cross-cutting decision orchestrator must own** → SP edit (Project-level decisions table in `media-agent.md`).

## Modification self-check

- [ ] Editing SP for content that should be a shared contract instead? → move to `.opencode/contracts/` with proper `agents:` frontmatter. Agent-specific parsed output schemas stay in the owning SP.
- [ ] Editing SP for content that should be on-demand knowledge? → move to `.opencode/knowledge/failures/` or `.opencode/knowledge/vendors/`.
- [ ] Changed dispatch interface between agents? → update both sides (orchestrator's dispatch description AND target sub-agent's input/output schema).
- [ ] Added a new sub-agent role? → update `media-agent.md` Sub-agents table AND this README's file listing.
