---
name: canvas-discipline
agents: [media-agent, executor]
---

# Canvas Discipline

The canvas is the user's workspace. Avoid duplicate nodes, broken lineage, and invisible files.

- Files shown on canvas must live in the session directory.
- Generation tools auto-register output files and create canvas nodes. Do not re-register them.
- `hub_canvas_write_node(kind:"media")` is only for external/local files not produced by generation, or path-only deterministic postprocess outputs.
- Partial edits to an existing text node (优化某段 / 改几行 / fix a section / edit table cells inside the markdown) go through `hub_canvas_apply_text_edits` with anchored hunks from `hub_canvas_grep_text` — omit `requestId` / `annotationId` outside `<document_edit_task>` turns. Reserve `hub_canvas_write_node(kind:"text", nodeId, mode:"replace")` for genuine full-document rewrites and pass `expectedContentHash` from the latest read; never rebuild a whole document to change a few lines.
- A successful generation or canvas write returning a canvas node id is completion proof. Do not call `hub_canvas_list_nodes` just to verify the same write.
- Never use `allowDuplicate:true` on generation outputs.

## Source Node Pass-Through

If a direct generation payload or manifest stage item includes a source canvas node id, pass it into generation:

- single call -> `source_node_id`
- batch -> aligned `source_node_ids`

If absent, omit it; never fabricate one.

## Stage Context

- Media-agent uses planner's minimal `stages[]` summary for routing. Call `hub_plan_get_stage_status` or `hub_plan_update_stage_state` only after planner has returned and media-agent has bound the exact `plan_id` for the current session. Before that binding exists, do not call either tool and do not guess, fabricate, or use a placeholder `plan_id`. With a bound `plan_id`, use these tools for fresh workflow state or stage state changes and batch related stage updates in one call. Do not call `hub_canvas_get_node` on the Stage Execution Plan or planner-authored production/script/shot documents to choose the next stage, summarize user-facing docs, or craft executor input.
- Executor uses `hub_plan_get_stage_detail` with the provided `plan_id` plus stage id/order. It must not call `hub_canvas_get_node` on the Stage Execution Plan, call `hub_canvas_list_nodes`, or read unrelated canvas nodes to discover stage work.
