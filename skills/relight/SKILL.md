---
name: relight
trigger-words: [relight, change lighting, lighting, relight, change lighting, re-light]
description: |
  After uploading an image, control the light direction / intensity / color via a 3D lighting sphere panel, select background mode and atmosphere effects, and relight the scene with one click. Provides 20 style presets and 25 atmosphere effects, and also supports free editing of up to 3 light sources (type / angle / color temperature or HEX).
allowed-tools: hub_open_remote_tool_gui, hub_submit_dag, hub_upload_to_cdn
---

# Relight

Intelligent relighting — freely adjust light direction, intensity, and color

## Parameters

| ID | Type | Required | Constraints | Description |
|----|------|----------|-------------|-------------|
| input_img | file(image/*) | Yes | — | User-uploaded original image, the target image to be relit. Can be pre-filled by the main site via params:inject with a CDN URL (string, starting with https://); the GUI renders it as an already-uploaded state |
| reference_img | file(image/png) | Yes | — | (Auto-generated internally by GUI) PNG exported by the client using three.js offscreen rendering of the current 3D lighting sphere state. The GUI emits this on submission |
| light1 | string | Yes | — | (Auto-generated internally by GUI) JSON string for light 1, in the form {\ |
| light2 | string | Yes | — | (Auto-generated internally by GUI) JSON string for light 2, same format as light1; pass empty string as placeholder when there is no second light. **Do not inject this field via params:inject from the main site** |
| light3 | string | Yes | — | (Auto-generated internally by GUI) JSON string for light 3, same format as light1; pass empty string as placeholder when there is no third light. **Do not inject this field via params:inject from the main site** |
| background | string | Yes | — | (Auto-generated internally by GUI) Background mode: default = preserve original background, black = pure black background, white = pure white background. **Do not inject this field via params:inject from the main site** |
| effect | string | Yes | — | (Auto-generated internally by GUI) Atmosphere effect business value string, e.g., |
| user_intent | string | No | — | User's additional requirements (optional, Chinese or English); the GUI exposes an input field for the user to fill (e.g., |
| generate_count | enum | Yes | "1" \| "2" \| "3" \| "4" | (Auto-generated internally by GUI) Generate N candidate images with the same prompt, N=1-4 (default 1). The GUI exposes a dropdown control for the user to select; the emit payload passes through the string value ( |

## Execution Flow

### STEP 1: Open GUI to Collect Parameters

Call `hub_open_remote_tool_gui` with parameters:

```ts
{
  tool_name: "relight",
  entry: "scripts/index.js",
  initial_params?: { /* Optional: specific parameter values already provided by the user in conversation, keys matching the "Parameters" table IDs */ },
}
```

**Pre-fill rules**: If the user has explicitly provided specific parameter values in conversation, package them into `initial_params` for the GUI to auto-populate on mount, so the user doesn't need to re-enter them. Do not guess values for parameters not explicitly provided — leave them for the GUI form to collect.

**Attachment pre-fill (this tool's file parameter: `input_img`)**:

User messages may start with a system-injected `[User attached files: <path1>, <path2>, ...]` — these are file paths, not user-typed text. When this occurs, you **must** populate `initial_params` with the attachment paths per the table below, even if the user's text doesn't say "use this image":

| Param ID | accept | Value Rule |
|----------|--------|------------|
| `input_img` | `image/*` | First path in the attachment list matching this MIME type |

Additional constraints:

- First call `hub_upload_to_cdn({ file_path: "<local path>" })` on the matched local path to obtain a CDN URL, then place the URL into `initial_params[<id>]`
- Unmatched file fields: do not pass (leave for the GUI form to let the user upload)
- Multiple matches for the same field: take only the first; leave the rest to the GUI

Example:

- User message: `[User attached files: /Users/me/face.webp]\n\n/relight`
- First upload: `hub_upload_to_cdn({ file_path: "/Users/me/face.webp" })` → Returns CDN URL
- Then call: `hub_open_remote_tool_gui({ tool_name: "relight", entry: "scripts/index.js", initial_params: { input_img: "<CDN URL>" } })`


`initial_params` is only used for pre-filling at the time of the call. After the GUI opens, the user controls it — do not attempt to manipulate the GUI by other means.

After the GUI is submitted, the system injects a user message like:

```
User submitted GUI form for tool "relight". Form data:
{ "params": { ... }, "files": [{ "param_id": "...", "url": "...", "name": "...", "type": "..." }] }
```

Match `files[].url` by `param_id` to the corresponding fields (`params[<param_id>] = files[i].url`) and assemble the complete DAG inputs. **No need to re-upload files** (the GUI has already uploaded to CDN via `sdk.uploadFile`).

#### After receiving form data, proceed directly to the next step — strict prohibitions

- ❌ **Do NOT** re-call `hub_open_remote_tool_gui` (regardless of whether initial_params change) — the user has already confirmed parameters in the GUI. You are not a product manager; don't second-guess the user. Re-opening the GUI in the same turn will cause the new link to overwrite the old pending, the UI to permanently stuck on "Thinking...", and force the user to re-fill — a direct infinite loop
- ❌ **Do NOT** output "here's this version / this plan / let me adjust for you / let me redesign" style re-proposals in the conversation — parameters are locked, don't "change your mind"

If you determine the GUI-submitted parameters are truly unreasonable, you have only two valid options: (a) proceed to the next step as normal, let the backend report the error, then explain to the user using the error message; (b) completely terminate this task and explain the reason to the user. **Never secretly re-open the GUI.**

### STEP 2: Execute relight

**Prerequisite**: Received `collect` GUI form submission data.

**File parameter handling**: If the following parameter values are local paths (not https URLs), first call `hub_upload_to_cdn({ file_path: "<local path>" })` to obtain a CDN URL before filling into inputs:
- `input_img`
- `reference_img`

Call `hub_submit_dag`:

| Field | Value |
|-------|-------|
| dag_id | `"510954878823452675"` |
| inputs | `{ "input_img": <params.input_img>, "reference_img": <params.reference_img>, "light1": <params.light1>, "light2": <params.light2>, "light3": <params.light3>, "background": <params.background>, "effect": <params.effect>, "user_intent": <params.user_intent> }` |
| asset_keys | `["relight_image_v4"]` |
| concurrency | Take the `generate_count` field value from the GUI form submission data (convert to integer 1..5) |

After submission, **immediately end the current turn** (the gateway polls in the background and automatically injects a new user message to wake up upon completion).

Upon completion, a single aggregated notification arrives (`runs[]` length = the concurrency count the user selected in the form), with payload containing `runs[]` (each run's `status` / `outputs` / `asset_outputs`) + `requested` / `submitted` counts. If `submitted < requested` (partial submission failure), truthfully tell the user the actual generation count vs. expected count (from `requested`); **do not** proactively re-submit the remaining ones (proactive retry is blocked by the global prohibition below).

### STEP 3: Render Assets

After the final step completes, the injected user message has **two forms** (distinguish by whether the payload contains `runs[]`):

**Form A — Single run (no concurrency declared, or concurrency=1)**:

```
Async task completed:
{
  "task_id": "<run_id>",
  "status": "succeeded" | "failed" | "timeout",
  "outputs": { ... },
  "asset_outputs": [
    { "key": "image", "status": "finished", "url": "...", "local_path": "..." }
  ],
  "error_message": null
}
```

**Form B — Concurrent aggregation (this tool's step declares concurrency > 1)**:

```
Async task completed:
{
  "runs": [
    { "task_id": "...", "status": "succeeded", "outputs": {...}, "asset_outputs": [{...}, {...}] },
    { "task_id": "...", "status": "succeeded", "outputs": {...}, "asset_outputs": [{...}, {...}] },
    { "task_id": "...", "status": "failed",    "error_message": "..." }
  ],
  "requested": 3,
  "submitted": 3
}
```

Form B **has no top-level `asset_outputs`**; assets are distributed across `runs[i].asset_outputs`. First check if the payload contains a `runs` field — **if so, use Form B** (concurrent rendering rules below); otherwise use Form A (single run rules).

#### Form A: `status: "succeeded"`

Use markdown media syntax to insert assets, iterating over entries with `status == "finished"` from `asset_outputs`. Prefer `local_path`, fallback to `url`:

- Images: `![description](<asset_outputs[i].local_path || asset_outputs[i].url>)`
- Videos: `![description](<asset_outputs[i].local_path || asset_outputs[i].url>)` or link `[View video](<...>)`
- Other files: `[<description>](<...>)`

⚠️ Plain text (e.g., "Generated" or "Saved") will not render media — **you must use markdown syntax**.

#### Form B: Concurrent Rendering Rules

1. Iterate over `runs[]`, numbering each run by index (Candidate 1 / Candidate 2 / ...) for users to reference when selecting.
2. For each `runs[i].status == "succeeded"` run, iterate over its `asset_outputs` and render media (same rules as Form A: prefer `local_path`, fallback `url`).
3. For each `runs[i].status == "failed"` run, truthfully report the failure + `error_message` at the corresponding position (other successful candidates render normally; **do not** abandon everything).
4. At the end, include a one-line summary of `requested` vs `submitted` vs `runs.filter(succeeded).length` actual output statistics. **When `submitted < requested`** (partial submissions failed at the gateway entry), truthfully tell the user "actually generated X / expected N"; **do not** proactively re-submit the remaining ones (proactive retry is blocked by the global prohibition).

#### `status: "failed"` (Form A overall failure)

Report the `error_message` to the user and suggest adjusting the input before retrying. **Do not** auto-retry.

#### `status: "timeout"` (Form A overall timeout)

The task has been aborted by the gateway (not completed within 30 minutes). Report the timeout to the user and suggest retrying later.

#### Strict Prohibitions (apply to all steps)
- ❌ **Do NOT** re-call `hub_open_remote_tool_gui` — the pipeline is running; re-opening the GUI = old link overwritten + UI stuck on "Thinking..." + user forced to re-fill = infinite loop
- ❌ **Do NOT** use `question` / `ask` tools to notify the user to wait — the UI already provides loading feedback
- ❌ **Do NOT** proactively call `hub_query_dag_result` — the gateway will callback; proactive queries waste turns and may cause race conditions
- ❌ **Do NOT** repeat `submit_dag` (explicitly declared `step.concurrency` parallelism is submitted internally by the gateway and does not count as repetition) — proactive retry creates multiple tasks on the backend, consuming the user's quota
- ❌ **Do NOT** sleep / spin — this is event-driven; waiting relies on gateway injection
