---
name: image-paint-edit
dir: image-paint-edit
tool-id: "506178024759017472"
trigger-words: [paint to edit, local repaint, paint modify, paint to edit, inpaint, mask edit]
description: |
  Paint over the area you want to modify on an image, enter a modification description (optionally add a product reference image), and generate a locally edited new image. Applicable for: replacing objects, changing details, placing products into designated positions, and similar scenarios.
allowed-tools: hub_submit_dag, hub_upload_to_cdn
---

# Image Paint Edit

Paint over the area to modify on an image, describe your intent, and generate a new image

## Parameters

| ID | Type | Required | Constraints | Description |
|----|------|----------|-------------|-------------|
| image_url | file(image/png,image/jpeg,image/webp) | Yes | — | Original image (PNG/JPG/WEBP), the source image to edit |
| mask_url | file(image/png) | Yes | — | Black-and-white binary mask PNG: white = area to edit, black = area to preserve; generated and uploaded after painting on the GUI canvas |
| prompt | string | Yes | — | Natural language description of the editing intent (recommended 1-500 characters) |
| reference_image_url | file(image/png,image/jpeg,image/webp) | No | — | Optional product reference image, used to naturally place the product from the reference into the mask area; omit when not needed |

## Global Prohibitions

- ❌ **Do NOT** call the `save_file_to_session` tool — All assets produced by this tool are automatically saved to the workspace by the gateway and registered to the canvas via `recordAsset`. Any manual saving (`save_file_to_session` / `curl` / `wget` / `download_videos`, etc.) will cause the same asset to be registered twice. After completion, simply reference `local_path` / script `outputs` returned paths using markdown media syntax.

## Execution Flow

### STEP 1: Execute paint-edit

**File parameter handling**: If the following parameter values are local paths (not https URLs), first call `hub_upload_to_cdn({ file_path: "<local path>" })` to obtain a CDN URL before filling into inputs:
- `image_url`
- `mask_url`
- `reference_image_url`

Call `hub_submit_dag`:

| Field | Value |
|-------|-------|
| dag_id | `"506187248834686982"` |
| inputs | `{ "image_url": <params.image_url>, "mask_url": <params.mask_url>, "prompt": <params.prompt>, "reference_image_url": <params.reference_image_url> }` |
| asset_keys | `[]` |

After submission, **immediately end the current turn** (the gateway polls in the background and automatically injects a new user message to wake up upon completion).

### STEP 2: Render Assets

After the final step completes, the injected user message looks like:

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

#### Strict Prohibitions (apply to all steps)
- ❌ **Do NOT** use `question` / `ask` tools to notify the user to wait — the UI already provides loading feedback
- ❌ **Do NOT** proactively call `hub_query_dag_result` — the gateway will callback; proactive queries waste turns and may cause race conditions
- ❌ **Do NOT** repeat `submit_dag` — this will create multiple tasks on the backend, consuming the user's quota
- ❌ **Do NOT** sleep / spin — this is event-driven; waiting relies on gateway injection
