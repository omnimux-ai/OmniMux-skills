#!/usr/bin/env node

/**
 * render-shotlist.js
 *
 * Converts a storyboard JSON matching schemas/storyboard.schema.json into CSV.
 *
 * Usage:
 *   node tools/render-shotlist.js path/to/storyboard.json
 */

import fs from "fs";
import path from "path";

const CSV_HEADERS = [
  "shot_id",
  "start_time",
  "end_time",
  "duration",
  "section",
  "scene_purpose",
  "visual_description",
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

const OPTIONAL_STRING_FIELDS = [
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
const TIME_TOLERANCE_SECONDS = 0.01;
const CSV_QUOTE_TRIGGERS = [",", "\n", "\r"];

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

function validateStoryboard(data) {
  const errors = [];

  if (!isObject(data)) {
    errors.push("Root value must be an object.");
    return errors;
  }

  if (!Array.isArray(data.shots) || data.shots.length === 0) {
    errors.push("shots must be a non-empty array.");
    return errors;
  }

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

    if (isNumber(shot.start_time) && isNumber(shot.end_time) && shot.end_time <= shot.start_time) {
      pushError(errors, `${label}.end_time`, "must be greater than start_time");
    }

    if (isNumber(shot.duration) && shot.duration <= 0) {
      pushError(errors, `${label}.duration`, "must be greater than 0");
    }

    if (
      isNumber(shot.start_time) &&
      isNumber(shot.end_time) &&
      isNumber(shot.duration) &&
      Math.abs((shot.end_time - shot.start_time) - shot.duration) > TIME_TOLERANCE_SECONDS
    ) {
      pushError(errors, `${label}.duration`, "must match end_time - start_time");
    }

    for (const field of OPTIONAL_STRING_FIELDS) {
      validateOptionalString(shot[field], `${label}.${field}`, errors);
    }
  });

  return errors;
}

function csvEscape(value) {
  const str = String(value ?? "");
  if (str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  if (CSV_QUOTE_TRIGGERS.some((trigger) => str.includes(trigger))) {
    return `"${str}"`;
  }
  return str;
}

function shotToRow(shot) {
  return CSV_HEADERS.map((field) => csvEscape(shot[field])).join(",");
}

function renderCsv(data) {
  return [
    CSV_HEADERS.join(","),
    ...data.shots.map(shotToRow)
  ].join("\n");
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    fail("Usage: node tools/render-shotlist.js path/to/storyboard.json", 1);
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

  process.stdout.write(renderCsv(data) + "\n");
}

main();
