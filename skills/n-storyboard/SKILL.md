---
name: n-storyboard
trigger-words: [multi-panel storyboard, n-panel storyboard, story panel grid, storyboard, story panel grid, multi panel storyboard]
description: |
  Generates a multi-panel storyboard composite image based on story text and grid settings (2x2/3x3/4x4) + per-cell aspect ratio + optional reference images.
allowed-tools: hub_open_remote_tool_gui, hub_submit_dag
---

# N Storyboard

Break a story into a multi-panel storyboard composite image, with optional reference images

## Parameters

| ID | Type | Required | Constraints | Description |
|----|------|----------|-------------|-------------|
| grid_setting | string | Yes | — | Grid configuration JSON string, in the form {\ |
| user_prompt | string | Yes | — | User story description, Chinese or English |
| aspect_ratio | enum | Yes | "16:9" \| "4:3" \| "1:1" \| "3:4" \| "9:16" | Per-cell (and overall image, since NxN square grids) aspect ratio |
| reference_image_1 | file(image/*) | No | — | Optional reference image 1 (CDN URL); pass empty string when not provided |
| reference_image_2 | file(image/*) | No | — | Optional reference image 2 (CDN URL); pass empty string when not provided |
| reference_image_3 | file(image/*) | No | — | Optional reference image 3 (CDN URL); pass empty string when not provided |
| reference_image_4 | file(image/*) | No | — | Optional reference image 4 (CDN URL); pass empty string when not provided |

## Global Prohibitions

- ❌ **Do NOT** call the `save_file_to_session` tool — All assets produced by this tool are automatically saved to the workspace by the gateway and registered to the canvas via `recordAsset`. Any manual saving (`save_file_to_session` / `curl` / `wget` / `download_videos`, etc.) will cause the same asset to be registered twice. After completion, simply reference `local_path` / script `outputs` returned paths using markdown media syntax.

## Execution Flow

### STEP 1: Open GUI to Collect Parameters

Call `hub_open_remote_tool_gui` with parameters:

```ts
{
  tool_name: "n-storyboard",
  entry: "scripts/index.js",
  initial_params?: { /* Optional: specific parameter values already provided by the user in conversation, keys matching the "Parameters" table IDs */ },
}
```

**Pre-fill rules**: If the user has explicitly provided specific parameter values in conversation (e.g., "use this pose" or "prompt should be 'running at sunset'"), package them into `initial_params` for the GUI to auto-populate on mount, so the user doesn't need to re-enter them. Do not guess values for parameters not explicitly provided — leave them for the GUI form to collect.

**Attachment pre-fill (this tool's file parameters: `reference_image_1`, `reference_image_2`, `reference_image_3`, `reference_image_4`)**:

User messages may start with a system-injected `[User attached files: <path1>, <path2>, ...]` — these are file paths, not user-typed text. When this occurs, you **must** populate `initial_params` with the attachment paths per the table below, even if the user's text doesn't say "use this image":

| Param ID | accept | Value Rule |
|----------|--------|------------|
| `reference_image_1` | `image/*` | First path in the attachment list matching this MIME type |
| `reference_image_2` | `image/*` | First path in the attachment list matching this MIME type |
| `reference_image_3` | `image/*` | First path in the attachment list matching this MIME type |
| `reference_image_4` | `image/*` | First path in the attachment list matching this MIME type |

Additional constraints:

- Place the matched local path **directly** into `initial_params[<id>]` (the GUI will recognize local paths and automatically upload to CDN; do not call `hub_upload_to_cdn` / `upload_to_cdn` yourself)
- Unmatched file fields: do not pass (leave for the GUI form to let the user upload)
- Multiple matches for the same field: take only the first; leave the rest to the GUI

Example:

- User message: `[User attached files: /Users/me/face.webp]\n\n/n-storyboard`
- Should call: `hub_open_remote_tool_gui({ tool_name: "n-storyboard", entry: "scripts/index.js", initial_params: { reference_image_1: "/Users/me/face.webp" } })`

`initial_params` is only used for pre-filling at the time of the `open_remote_tool_gui` call. After the GUI opens, the user controls it — do not attempt to manipulate the GUI by other means.

### STEP 2: Receive User Submission

After the GUI is submitted, the system injects a user message like:

```
User submitted GUI form for tool "n-storyboard". Form data:
{ "params": { ... }, "files": [{ "param_id": "...", "url": "...", "name": "...", "type": "..." }] }
```

Match `files[].url` by `param_id` to the corresponding fields (`params[<param_id>] = files[i].url`) and assemble the complete DAG inputs. **No need to re-upload files** (the GUI has already uploaded to CDN via `sdk.uploadFile`).

#### After receiving form data, proceed directly to STEP 3 — strict prohibitions

- ❌ **Do NOT** re-call `hub_open_remote_tool_gui` (regardless of whether initial_params change) — the user has already confirmed parameters in the GUI. You are not a product manager; don't second-guess the user. Re-opening the GUI in the same turn will cause the new link to overwrite the old pending, the UI to permanently stuck on "Thinking...", and force the user to re-fill — a direct infinite loop
- ❌ **Do NOT** output "here's this version / this plan / let me adjust for you / let me redesign" style re-proposals in the conversation — parameters are locked, don't "change your mind"

If you determine the GUI-submitted parameters are truly unreasonable, you have only two valid options: (a) proceed with STEP 3 as normal, let the DAG backend report the error, then explain to the user using the error message; (b) completely terminate this task and explain the reason to the user. **Never secretly re-open the GUI.**

### STEP 3: Call hub_submit_dag

Use the inputs assembled in the previous step to call the tool:

| Field | Value |
|-------|-------|
| dag_id | "508770976364388360" |
| inputs | `{ "grid_setting": "<Grid configuration JSON string, in the form {\>", "user_prompt": "<User story description, Chinese or English>", "aspect_ratio": "16:9", "reference_image_1": "<cdn_url>", "reference_image_2": "<cdn_url>", "reference_image_3": "<cdn_url>", "reference_image_4": "<cdn_url>" }` |
| asset_keys | `[]` (always pass an empty array) |

**inputs format constraints**:
- All values **must be string literals** (including numbers, booleans)
- All parameters from the "Parameters" table above must be passed; optional parameters without values use an empty string `""` as placeholder
- File-type parameters use CDN URLs (starting with `https://...`)

**Output**: `{ run_id: string, estimated_seconds: number }`

### STEP 4: End Current Turn Immediately After Submission

After `submit_dag` returns, **the current turn must end immediately**. The gateway polls in the background (15s interval, 30-minute timeout) and automatically injects a new user message to wake up upon completion.

#### Strict Prohibitions

- ❌ **Do NOT** re-call `hub_open_remote_tool_gui` — submit_dag has been sent, the task is running; re-opening the GUI = queueing the same task twice + old link overwritten by new link + UI permanently stuck on "Thinking..." + user forced to re-fill = infinite loop. **This is the most common and most damaging violation within the same turn**; any urge to "let me adjust another version for you" means you've already stepped into the loop
- ❌ **Do NOT** output "here's this version / this plan / let me redesign" style re-proposal text — parameters have been handed to the DAG; you are not a product manager, don't second-guess the user
- ❌ **Do NOT** use `question` / `ask` tools to "notify the user to wait" or "ask whether to continue" — the UI already has loading feedback; a question will block the conversation flow, preventing the DAG completion message from getting through
- ❌ **Do NOT** proactively call `hub_query_dag_result` — the gateway will callback; proactive queries waste turns and may cause race conditions
- ❌ **Do NOT** repeat `submit_dag` — this creates multiple tasks on the backend, consuming the user's quota
- ❌ **Do NOT** output intermediate state text like "task in progress, please wait" — this makes the UI think it's waiting for user input
- ❌ **Do NOT** sleep / spin / wait in any form — this is event-driven; waiting relies on system injection

### STEP 5: Handle Completion Message

The injected user message looks like:

```
Async task completed:
{
  "task_id": "<run_id>",
  "status": "succeeded" | "failed" | "timeout",
  "outputs": { ... },
  "asset_outputs": [
    { "key": "image", "status": "finished", "url": "https://cdn...", "local_path": "..." }
  ],
  "error_message": null
}
```

#### `status: "succeeded"`

Use markdown media syntax to insert assets, iterating over entries with `status == "finished"` from `asset_outputs`:

- Images: `![description](<asset_outputs[i].local_path>)`
- Videos: `![description](<asset_outputs[i].local_path>)` or link `[View video](<local_path>)`
- Other files: `[<description>](<local_path>)`

**Key Constraints**:
- ✅ **Must use `local_path`** (the gateway has already downloaded to the workspace and registered to the canvas via `recordAsset`)
- ❌ **Do not use `url`** (CDN URL is only a fallback; using it directly will cause the canvas to lose asset references)
- ❌ **Do NOT** call `save_file_to_session` / `curl` / `wget` / `download_videos` or other download tools — the gateway has already downloaded; duplicating will register the same asset twice
- ⚠️ Plain text (e.g., "Generated" or "Saved") will not render media — **you must use markdown syntax**

#### `status: "failed"`

Report the `error_message` to the user and suggest adjusting the input before retrying. **Do not** auto-retry.

#### `status: "timeout"`

The task has been aborted by the gateway (not completed within 30 minutes). Report the timeout to the user and suggest retrying later.

## Troubleshooting Reference

- `submit_dag` call itself errors (returns non-ok): Check that inputs are complete; all keys must be passed (optional items use `""`)
- Completion message never arrives: The user should be able to see the UI loading indicator; if no completion message after 30+ minutes, the gateway may have aborted — wait for the next user-initiated action
