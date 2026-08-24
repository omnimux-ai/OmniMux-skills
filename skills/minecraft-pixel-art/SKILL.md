---
name: minecraft-pixel-art
description: |
  Converts a user-provided image into a Minecraft pixel art style image (16x16 voxel block style).
  Trigger phrases: minecraft pixel art, MC pixel style, convert to minecraft style, make minecraft pixel art, pixel block art, MC style image, make minecraft version, minecraft block art, voxel art.
  dag_id: 17759317728971100
allowed-tools: hilo_tools_run_dag hilo_tools_query_dag_result hilo_tools_upload_to_cdn
---

# Minecraft Pixel Art Generation

Convert any image into a Minecraft-style 16x16 voxel pixel art.

## DAG Information

- dag_id: `17759317728971100`

## Input Parameters

### Fixed Inputs (built into the DAG, no user input required)

- Minecraft pixel art style prompt (16x16 voxel blocks, MC block color palette, pixel game screenshot style)

### Variable Inputs (provided by the user each time)

- `ref_image`: image — User-provided reference image (local file path or existing URL), **required**

## Output Assets (asset_keys)

Request the following asset_keys:

- `minecraft_pixel_art`: The final generated Minecraft pixel art style image (image)

## Execution Flow

### STEP 1: Collect User Input

Collect from the user:
- The image to convert (local file path)

If the user has not provided an image, prompt: "Please provide an image, and I'll convert it into Minecraft pixel art style."

### STEP 2: Upload Image to CDN

Call `hilo_tools_upload_to_cdn` to upload the user's image and obtain a CDN URL:

```
hilo_tools_upload_to_cdn(file_path=<user's local image path>)
→ Returns: cdn_url
```

### STEP 3: Submit DAG

Call `hilo_tools_run_dag`:

- dag_id: `17759317728971100`
- inputs: `{ "ref_image": "<cdn_url>" }`
- asset_keys: `["minecraft_pixel_art"]`
- Returns: run_id

**Important: Every parameter in inputs must be passed. Optional parameters without values should use an empty string "" as a placeholder.**

### STEP 4: Poll for Results

Call `hilo_tools_query_dag_result(run_id)` to poll continuously:

- Polling interval: 5-10 seconds
- `running`: Continue polling; you may inform the user "Generating, please wait..."
- `succeeded`: Find the entry with `key == "minecraft_pixel_art"` and `status == "finished"` in `asset_outputs`, and retrieve its `url`
- `failed`: Report `error_message` to the user and suggest trying a different image

### STEP 5: Display Results

After successful generation:
1. Display the result in Markdown image format: `![Minecraft Pixel Art](<url>)`
2. Provide the CDN URL for the user to download or share
3. Inform the user they can continue uploading other images for conversion

## Error Handling

- **Upload failed**: Verify that the local file path is correct and the file exists
- **DAG submission failed**: Check that `ref_image` in inputs is a valid URL
- **Polling timeout**: Image generation typically takes 30-120 seconds; suggest continuing to wait and retrying the poll
- **DAG execution failed**: Display the `error_message` and suggest the user change the image or adjust the input before retrying
- **Content moderation block**: When `status == "sensitive"` appears in `asset_outputs`, inform the user that the image content does not comply with platform guidelines
