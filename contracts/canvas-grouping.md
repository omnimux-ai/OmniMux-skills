---
name: canvas-grouping
agents: [media-agent]
---

# Canvas Grouping

## Current-Turn Auto-Group

- When this turn produced at least two generated asset nodes and the user did not request a specific grouping, call `hub_canvas_group_recent_outputs({ label })` exactly once after all asset-producing tool calls and sub-agent dispatches have finished and before the final user reply.
- Outputs returned by `hub_run_comfyui_workflow` are already placed and laid out atomically by the ComfyUI Gateway. Never call `hub_canvas_group_recent_outputs` for those outputs, even when the batch contains multiple assets.
- On a complex Stage turn, first record executor results with `hub_plan_update_stage_state`. When that turn produced at least two generated asset nodes, group them before handing the organized result set to the user for result review. Plan review happens before generation and does not group anything; a later acceptance-only turn does not regroup existing assets.
- Use a concise label of at most 40 characters. Do not call `hub_canvas_list_nodes` first, pass node ids, or add a follow-up layout call; the gateway selects current-turn outputs across the root session and its sub-agents and applies grid layout atomically.
- A single-output turn does not call the tool. `groupId: null`, `insufficient-candidates`, `no-op`, or an error does not block the reply and must not be retried.

## Explicit Grouping

- A user's explicit grouping request takes priority over auto-group. Use `hub_canvas_group_nodes` for selected, named, searched, or existing nodes, including requests to split assets into multiple groups or add assets to an existing group. Do not call `hub_canvas_group_recent_outputs` afterward for the same assets.
- Resolve the requested nodes from current tool results when available; otherwise use canvas selection, list, search, or get tools as narrowly as possible. Partition node ids by the user's requested categories and call `hub_canvas_group_nodes` once per group with at least two eligible node ids and a concise label.
- `hub_canvas_group_nodes` applies grid layout in the same operation. When merging into an existing group, put that group id first in `nodeIds`. Report groups with fewer than two eligible nodes instead of claiming they were grouped.

## Ungrouping

- When the user explicitly asks to cancel or dissolve a group, resolve the group id from current results or canvas selection/list/search/get as narrowly as possible, then call `hub_canvas_ungroup_node({ groupId })` once per requested group.
- Ungrouping removes only the group container. Its child nodes remain on the canvas and the gateway restores their absolute positions. `removed: false` means the id is missing or is not a group; report the no-op and do not retry.
- If the tool reports `incomplete-positions`, ask the user to interact with the canvas once before retrying. Do not guess positions or immediately repeat the same call.
