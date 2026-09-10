#!/usr/bin/env node

/**
 * export-storyboard.js
 *
 * Converts a storyboard JSON matching schemas/storyboard.schema.json into Markdown.
 *
 * Usage:
 *   node tools/export-storyboard.js path/to/storyboard.json
 */

import fs from "fs";
import path from "path";

const OPTIONAL_SHOT_STRING_FIELDS = [
  "section",
  "framing",
  "camera_movement",
  "subject_action",
  "dialogue_vo",
  "on_screen_text",
  "selling_point",
  "transition",
  "production_notes",
  "prompt_hint"
];

function fail(message, code = 1) {
  process.stderr.write(`${message}\n`);
  process.exit(code);
}

function readJson(filePath) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    fail(`Failed to read file: ${filePath}\n${err.message}`, 1);
  }

  try {
    return JSON.parse(raw);
  } catch (err) {
    fail(`Invalid JSON in file: ${filePath}\n${err.message}`, 1);
  }
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function pushError(errors, field, message) {
  errors.push(`${field} ${message}.`);
}

function validateOptionalString(value, field, errors) {
  if (value !== undefined && typeof value !== "string") {
    pushError(errors, field, "must be a string when provided");
  }
}

function validateStringArray(value, field, errors, { required = false } = {}) {
  if (value === undefined && !required) {
    return;
  }
  if (!isStringArray(value) || value.length === 0) {
    pushError(errors, field, "must be a non-empty array of strings");
  }
}

function validateStoryboard(data) {
  const errors = [];

  if (!isObject(data)) {
    errors.push("Root value must be an object.");
    return errors;
  }

  if (!isObject(data.project)) {
    errors.push("project must be an object.");
  } else {
    for (const field of ["title", "platform", "format"]) {
      if (!isNonEmptyString(data.project[field])) {
        pushError(errors, `project.${field}`, "must be a non-empty string");
      }
    }
    if (!isNumber(data.project.duration_seconds) || data.project.duration_seconds <= 0) {
      pushError(errors, "project.duration_seconds", "must be a number greater than 0");
    }
    validateOptionalString(data.project.language, "project.language", errors);
    validateOptionalString(data.project.video_type, "project.video_type", errors);
  }

  if (!isObject(data.summary)) {
    errors.push("summary must be an object.");
  } else {
    for (const field of ["objective", "target_audience"]) {
      if (!isNonEmptyString(data.summary[field])) {
        pushError(errors, `summary.${field}`, "must be a non-empty string");
      }
    }
    validateStringArray(data.summary.core_selling_points, "summary.core_selling_points", errors, { required: true });
    validateOptionalString(data.summary.cta, "summary.cta", errors);
    validateOptionalString(data.summary.creative_strategy, "summary.creative_strategy", errors);
  }

  if (!Array.isArray(data.structure) || data.structure.length === 0) {
    errors.push("structure must be a non-empty array.");
  } else {
    data.structure.forEach((section, index) => {
      const label = `structure[${index}]`;
      if (!isObject(section)) {
        errors.push(`${label} must be an object.`);
        return;
      }
      for (const field of ["section", "goal", "content"]) {
        if (!isNonEmptyString(section[field])) {
          pushError(errors, `${label}.${field}`, "must be a non-empty string");
        }
      }
      for (const field of ["start_time", "end_time"]) {
        if (!isNumber(section[field])) {
          pushError(errors, `${label}.${field}`, "must be a number");
        }
      }
    });
  }

  if (!Array.isArray(data.shots) || data.shots.length === 0) {
    errors.push("shots must be a non-empty array.");
  } else {
    data.shots.forEach((shot, index) => {
      const label = `shots[${index}]`;
      if (!isObject(shot)) {
        errors.push(`${label} must be an object.`);
        return;
      }
      for (const field of ["shot_id", "scene_purpose", "visual_description"]) {
        if (!isNonEmptyString(shot[field])) {
          pushError(errors, `${label}.${field}`, "must be a non-empty string");
        }
      }
      for (const field of ["start_time", "end_time", "duration"]) {
        if (!isNumber(shot[field])) {
          pushError(errors, `${label}.${field}`, "must be a number");
        }
      }
      if (isNumber(shot.duration) && shot.duration <= 0) {
        pushError(errors, `${label}.duration`, "must be greater than 0");
      }
      for (const field of OPTIONAL_SHOT_STRING_FIELDS) {
        validateOptionalString(shot[field], `${label}.${field}`, errors);
      }
    });
  }

  validateStringArray(data.rhythm_notes, "rhythm_notes", errors);
  validateStringArray(data.production_notes, "production_notes", errors);
  validateStringArray(data.compliance_notes, "compliance_notes", errors);

  return errors;
}

function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function formatTime(start, end) {
  return `${start}s-${end}s`;
}

function tableEscape(value) {
  return String(value ?? "").replace(/\n/g, "<br>").replace(/\|/g, "\\|");
}

function renderOptionalSection(lines, title, items) {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }
  lines.push(`## ${title}`);
  lines.push("");
  lines.push(bulletList(items));
  lines.push("");
}

function renderStoryboard(data) {
  const lines = [];
  const title = data.project.title;

  lines.push(`# ${title}`);
  lines.push("");
  lines.push("## Project");
  lines.push(`- **Platform:** ${data.project.platform}`);
  lines.push(`- **Format:** ${data.project.format}`);
  lines.push(`- **Duration:** ${data.project.duration_seconds}s`);
  if (data.project.language) lines.push(`- **Language:** ${data.project.language}`);
  if (data.project.video_type) lines.push(`- **Video Type:** ${data.project.video_type}`);
  lines.push("");

  lines.push("## Summary");
  lines.push(`- **Objective:** ${data.summary.objective}`);
  lines.push(`- **Target Audience:** ${data.summary.target_audience}`);
  lines.push(`- **Core Selling Points:** ${data.summary.core_selling_points.join(", ")}`);
  if (data.summary.cta) lines.push(`- **CTA:** ${data.summary.cta}`);
  if (data.summary.creative_strategy) lines.push(`- **Creative Strategy:** ${data.summary.creative_strategy}`);
  lines.push("");

  lines.push("## Structure");
  lines.push("");
  lines.push("| Section | Time | Goal | Content |");
  lines.push("| --- | --- | --- | --- |");
  for (const section of data.structure) {
    lines.push(`| ${tableEscape(section.section)} | ${formatTime(section.start_time, section.end_time)} | ${tableEscape(section.goal)} | ${tableEscape(section.content)} |`);
  }
  lines.push("");

  lines.push("## Shot Table");
  lines.push("");
  lines.push("| Shot | Time | Purpose | Visual | Camera | Dialogue / VO | On-screen Text | Selling Point | Notes |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const shot of data.shots) {
    const camera = [shot.framing, shot.camera_movement].filter(Boolean).join("; ");
    lines.push([
      `| ${tableEscape(shot.shot_id)}`,
      tableEscape(formatTime(shot.start_time, shot.end_time)),
      tableEscape(shot.scene_purpose),
      tableEscape(shot.visual_description),
      tableEscape(camera),
      tableEscape(shot.dialogue_vo),
      tableEscape(shot.on_screen_text),
      tableEscape(shot.selling_point),
      `${tableEscape(shot.production_notes)} |`
    ].join(" | "));
  }
  lines.push("");

  const promptShots = data.shots.filter((shot) => isNonEmptyString(shot.prompt_hint));
  if (promptShots.length > 0) {
    lines.push("## Prompt Hints");
    lines.push("");
    for (const shot of promptShots) {
      lines.push(`- **${shot.shot_id}:** ${shot.prompt_hint}`);
    }
    lines.push("");
  }

  renderOptionalSection(lines, "Rhythm Notes", data.rhythm_notes);
  renderOptionalSection(lines, "Production Notes", data.production_notes);
  renderOptionalSection(lines, "Compliance Notes", data.compliance_notes);

  return lines.join("\n").trimEnd();
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    fail("Usage: node tools/export-storyboard.js path/to/storyboard.json", 1);
  }

  const data = readJson(filePath);
  const errors = validateStoryboard(data);

  if (errors.length > 0) {
    process.stderr.write(
      JSON.stringify(
        {
          ok: false,
          file: path.normalize(filePath),
          error_count: errors.length,
          errors
        },
        null,
        2
      ) + "\n"
    );
    process.exit(2);
  }

  process.stdout.write(renderStoryboard(data) + "\n");
}

main();
