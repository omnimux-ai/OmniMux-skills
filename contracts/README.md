# Contracts — Always-On Behavior Rules

Auto-spliced into each agent's staged SP at OpenCode startup by `app/packages/service/src/opencode/electron-main/config-loader.ts:setupAgentStaging`. Per-agent routing via frontmatter `agents:` list.

## Active contracts

| File | `agents:` | Purpose |
|------|-----------|---------|
| `baseline.md` | `[media-agent, router, planner, executor]` | Universal rules: no rename/move, max 3 retries, match upstream language |
| `anti-loop.md` | `[media-agent, router, planner, executor]` | Self-check before any tool / sub-agent call to prevent identical-args repeat loops; describes LoopGuard runtime enforcement |
| `semantic-judgment.md` | `[media-agent, executor]` | Multimodal intent judgment: take, adapt, ignore, block, or ask per input role |
| `canvas-discipline.md` | `[media-agent, executor]` | File location, generated-output registration, source-node pass-through, and Stage canvas access boundaries |
| `canvas-grouping.md` | `[media-agent]` | Auto-groups current-turn outputs and fulfills explicit grouping or ungrouping of canvas nodes |

Total: 5 contracts. Contracts are targeted by concrete agent name so docs in `agents/` do not accidentally receive wildcard rules.
Agent-specific parsed output schemas live directly in each agent SP, not in contracts.

## How injection works

`setupAgentStaging` runs once at OpenCode startup (desktop main process), NOT via a runtime plugin hook:

1. Scans `.opencode/contracts/*.md`, parses each contract's `agents:` frontmatter list.
2. For each agent under `.opencode/agents/`, filters contracts whose `agents:` includes that agent's name OR `'*'`.
3. Wraps matched contracts as `<contract name="...">…</contract>` blocks and appends to the agent's SP body.
4. Writes staged SP to `<staging-dir>/agents/<name>.md`.
5. Desktop main sets `OPENCODE_CONFIG_DIR=<staging-dir>` so OpenCode's `directories2()` scan loads the staged version last (right-wins via D2 merge).

Implications:
- Agents only see contracts targeted at them (or `'*'`). No token waste on irrelevant contracts.
- Contract edits require restarting OpenCode (in dev: re-run `pnpm dev`). The splice is startup-time, not per-session.
- Same mechanism is used to inject the `<knowledge-base>` header with absolute `<knowledgeDir>` paths.

## Frontmatter format

```yaml
---
name: contract-name              # optional, defaults to filename
agents: [media-agent]            # required; prefer concrete agent names over '*'
---
```

Contracts without `agents:` are skipped with a warning. The loader is strict to prevent silent fan-out.

## Contract scope

Modality-specific rules stay out of the always-on layer:

- Vendor engineering facts (params, known bugs) → `knowledge/vendors/*.md` via manifest `knowledge_card`. Authored prompts stay content-level and model-agnostic; neither planner nor executor rewrites them from a vendor card.
- Semantic risk decision tests → `knowledge/failures/<topic>.md` (read on-demand by `executor`)
- Multi-stage workflows → `workflows/<project_type>/workflow.md` (top-level resource, read on-demand only after a dependency gate)

Keep this layer small so each agent's working memory at session start leaves most context for the actual task.

## Adding / changing contracts

- Adding a new contract → place under `.opencode/contracts/`, include `agents:` frontmatter, add row to the table above. If targeting a new agent, update the relevant agent SP and `.opencode/agents/README.md`.
- Changing a contract → review every line for "you" / agent-name references and confirm they still match the targeted audience. Restart OpenCode for changes to take effect.
- Deleting a contract → remove the file, remove its row above, grep `.opencode/` for references to its name.

## Decision: contract vs knowledge vs SP

| Lives in… | When |
|---|---|
| **SP** (`.opencode/agents/<role>.md`) | Role identity and dispatch interface for that role |
| **Contract** (this dir) | Cross-cutting behavior rule that must be auto-injected — short (~60-100 lines), narrow scope |
| **Knowledge** (`.opencode/knowledge/{failures,vendors}/`) | Domain content read on-demand. Failures: ≤25 lines/file. Vendors: ≤50 lines/file. |
| **Workflows** (`.opencode/workflows/`) | Dependency-bearing project workflows (`<project_type>/workflow.md`) + `_shared/` utilities. ≤100 lines/file. Top-level resource, sibling to knowledge/. |
| **Skill** (`~/.hub/skills/`) | Genre-specific user-opt-in recipes (documentary, mv-creator, …) |
