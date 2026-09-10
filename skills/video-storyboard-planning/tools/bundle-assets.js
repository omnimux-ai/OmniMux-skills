#!/usr/bin/env node

/**
 * bundle-assets.js
 *
 * Collects storyboard-related files into schemas/asset-manifest.schema.json shape.
 *
 * Usage:
 *   node tools/bundle-assets.js --project-name "Project" --storyboard path/to/storyboard.md
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";

const ASSET_FLAGS = ["storyboard", "shotlist", "brief", "product", "script"];
const VALUE_FLAGS = ["project-name", "version", ...ASSET_FLAGS];

function fail(message, code = 1) {
  process.stderr.write(`${message}\n`);
  process.exit(code);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = {};

  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (!token.startsWith("--")) {
      fail(`Unexpected argument: ${token}\nExpected flags like --project-name "Project" --storyboard path/to/file`, 1);
    }

    const key = token.slice(2);
    if (!VALUE_FLAGS.includes(key)) {
      fail(
        `Unsupported flag: --${key}\nSupported flags: ${VALUE_FLAGS.map((f) => `--${f}`).join(", ")}`,
        1
      );
    }

    const value = args[i + 1];
    if (!value || value.startsWith("--")) {
      fail(`Missing value for flag: --${key}`, 1);
    }

    result[key] = value;
    i += 1;
  }

  return result;
}

function ensureRequiredInputs(inputs) {
  if (typeof inputs["project-name"] !== "string" || inputs["project-name"].trim().length === 0) {
    fail("Missing required flag: --project-name", 1);
  }

  if (!ASSET_FLAGS.some((flag) => inputs[flag])) {
    fail(
      [
        "Usage:",
        "  node tools/bundle-assets.js --project-name \"Project\" --storyboard path/to/storyboard.md [--shotlist path/to/shotlist.csv] [--brief path/to/brief.json] [--product path/to/product.json] [--script path/to/script.md]",
        "",
        "At least one asset input flag is required."
      ].join("\n"),
      1
    );
  }
}

function readStatSafe(filePath) {
  try {
    return fs.statSync(filePath);
  } catch (err) {
    fail(`Failed to access file: ${filePath}\n${err.message}`, 1);
  }
}

function readTextSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    fail(`Failed to read file: ${filePath}\n${err.message}`, 1);
  }
}

function checksum(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function inferAssetType(flag) {
  switch (flag) {
    case "storyboard":
    case "script":
      return "document";
    case "shotlist":
      return "csv";
    case "brief":
    case "product":
      return "json";
    default:
      return "other";
  }
}

function inferRole(flag) {
  switch (flag) {
    case "storyboard":
      return "storyboard_output";
    case "shotlist":
      return "shotlist_output";
    case "brief":
      return "input_brief";
    case "product":
      return "input_data";
    case "script":
      return "input_script";
    default:
      return "other";
  }
}

function buildAssetId(flag, index) {
  return `${flag}_${String(index + 1).padStart(2, "0")}`;
}

function validateFile(flag, filePath, content) {
  const errors = [];

  if (typeof content !== "string" || content.length === 0) {
    errors.push(`--${flag} file is empty or unreadable as text`);
  }

  const ext = path.extname(filePath).toLowerCase();
  if (flag === "storyboard" && ext !== ".md") errors.push("--storyboard should point to a .md file");
  if (flag === "shotlist" && ext !== ".csv") errors.push("--shotlist should point to a .csv file");
  if ((flag === "brief" || flag === "product") && ext !== ".json") errors.push(`--${flag} should point to a .json file`);
  if (flag === "script" && ext !== ".md") errors.push("--script should point to a .md file");

  if ((flag === "brief" || flag === "product") && content.trim().length > 0) {
    try {
      JSON.parse(content);
    } catch (err) {
      errors.push(`--${flag} contains invalid JSON: ${err.message}`);
    }
  }

  if (flag === "shotlist") {
    const firstLine = content.split(/\r?\n/, 1)[0] || "";
    if (!firstLine.includes("shot_id") || !firstLine.includes("scene_purpose")) {
      errors.push("--shotlist does not appear to contain the expected schema-aligned CSV header");
    }
  }

  if (
    flag === "storyboard" &&
    !content.includes("## Shot Table") &&
    !content.includes("## 逐镜头分镜表")
  ) {
    errors.push("--storyboard does not appear to contain a shot table section");
  }

  return errors;
}

function buildEntry(flag, filePath, index) {
  const stat = readStatSafe(filePath);
  if (!stat.isFile()) {
    fail(`Path is not a file: ${filePath}`, 1);
  }

  const content = readTextSafe(filePath);
  const validationErrors = validateFile(flag, filePath, content);
  if (validationErrors.length > 0) {
    return {
      ok: false,
      flag,
      path: path.normalize(filePath),
      validation_errors: validationErrors
    };
  }

  return {
    asset_id: buildAssetId(flag, index),
    asset_type: inferAssetType(flag),
    role: inferRole(flag),
    path: path.normalize(filePath),
    format: path.extname(filePath).replace(/^\./, "").toLowerCase() || undefined,
    source: "local_file",
    checksum: checksum(content),
    notes: `${flag} asset, ${stat.size} bytes`
  };
}

function main() {
  const inputs = parseArgs(process.argv);
  ensureRequiredInputs(inputs);

  const entries = [];
  for (const flag of ASSET_FLAGS) {
    if (inputs[flag]) {
      entries.push(buildEntry(flag, inputs[flag], entries.length));
    }
  }

  const invalidEntries = entries.filter((entry) => entry.ok === false);
  if (invalidEntries.length > 0) {
    process.stderr.write(
      JSON.stringify(
        {
          ok: false,
          error_count: invalidEntries.length,
          errors: invalidEntries
        },
        null,
        2
      ) + "\n"
    );
    process.exit(2);
  }

  const manifest = {
    project_name: inputs["project-name"].trim(),
    ...(inputs.version ? { version: inputs.version } : {}),
    generated_at: new Date().toISOString(),
    assets: entries
  };

  process.stdout.write(JSON.stringify(manifest, null, 2) + "\n");
}

main();
