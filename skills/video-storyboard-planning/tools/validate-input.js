#!/usr/bin/env node

/**
 * validate-input.js
 *
 * Validates the primary JSON inputs used by video-storyboard-skill.
 *
 * Supported file types:
 * - brief JSON, matching schemas/brief.schema.json
 * - product JSON, matching schemas/product.schema.json
 * - shot JSON, with cross-field timing checks
 * - storyboard JSON, with cross-field timing checks for sections and shots
 *
 * Usage:
 *   node tools/validate-input.js path/to/file.json
 *
 * Exit codes:
 *   0 = valid
 *   1 = invalid usage or file read error
 *   2 = validation failed
 */

import fs from "fs";
import path from "path";
import { Ajv } from "ajv";

const PLATFORMS = ["TikTok", "Instagram Reels", "YouTube Shorts", "Amazon", "Other"];
const FORMATS = ["9:16", "1:1", "16:9", "4:5", "Other"];
const VIDEO_TYPES = [
  "ecommerce_conversion",
  "ugc_demo",
  "product_showcase",
  "comparison_review",
  "brand_story",
  "creator_explainer",
  "other"
];
const SHOT_SCHEMA_URL = new URL("../schemas/shot.schema.json", import.meta.url);
const STORYBOARD_SCHEMA_URL = new URL("../schemas/storyboard.schema.json", import.meta.url);
const TIME_TOLERANCE_SECONDS = 0.01;

function fail(message, code = 2) {
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
    fail(`Invalid JSON in file: ${filePath}\n${err.message}`, 2);
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

function isBoolean(value) {
  return typeof value === "boolean";
}

function isNumberInRange(value, min, max) {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function pushError(errors, field, message) {
  errors.push({ field, message });
}

function validateAllowedKeys(value, allowedKeys, prefix, errors) {
  if (!isObject(value)) {
    return;
  }

  for (const key of Object.keys(value)) {
    if (!allowedKeys.includes(key)) {
      pushError(errors, prefix ? `${prefix}.${key}` : key, "is not an allowed field");
    }
  }
}

function validateRequiredString(value, field, errors) {
  if (!isNonEmptyString(value)) {
    pushError(errors, field, "must be a non-empty string");
  }
}

function validateOptionalString(value, field, errors) {
  if (value !== undefined && !isNonEmptyString(value)) {
    pushError(errors, field, "must be a non-empty string when provided");
  }
}

function validateRequiredObject(value, field, errors) {
  if (!isObject(value)) {
    pushError(errors, field, "must be an object");
    return false;
  }
  return true;
}

function validateOptionalObject(value, field, errors) {
  if (value !== undefined && !isObject(value)) {
    pushError(errors, field, "must be an object when provided");
    return false;
  }
  return value !== undefined;
}

function validateOptionalStringArray(value, field, errors, { minItems = 0 } = {}) {
  if (value === undefined) {
    return;
  }

  if (!isStringArray(value)) {
    pushError(errors, field, "must be an array of strings when provided");
    return;
  }

  if (value.length < minItems) {
    pushError(errors, field, `must contain at least ${minItems} item(s)`);
  }
}

function validateRequiredStringArray(value, field, errors, { minItems = 0 } = {}) {
  if (!isStringArray(value)) {
    pushError(errors, field, "must be an array of strings");
    return;
  }

  if (value.length < minItems) {
    pushError(errors, field, `must contain at least ${minItems} item(s)`);
  }
}

function validateOptionalBoolean(value, field, errors) {
  if (value !== undefined && !isBoolean(value)) {
    pushError(errors, field, "must be a boolean when provided");
  }
}

function validateOptionalEnum(value, field, allowedValues, errors) {
  if (value !== undefined && !allowedValues.includes(value)) {
    pushError(errors, field, `must be one of: ${allowedValues.join(", ")}`);
  }
}

function validateRequiredEnum(value, field, allowedValues, errors) {
  if (!allowedValues.includes(value)) {
    pushError(errors, field, `must be one of: ${allowedValues.join(", ")}`);
  }
}

function validateDeliverables(value, field, errors) {
  if (!validateOptionalObject(value, field, errors)) {
    return;
  }

  const allowed = [
    "need_storyboard",
    "need_shotlist",
    "need_prompts",
    "need_production_notes",
    "need_voiceover",
    "need_subtitle_script"
  ];
  validateAllowedKeys(value, allowed, field, errors);
  for (const key of allowed) {
    validateOptionalBoolean(value[key], `${field}.${key}`, errors);
  }
}

function validateAudience(value, field, errors, { required = false, allowObjections = false } = {}) {
  const exists = required
    ? validateRequiredObject(value, field, errors)
    : validateOptionalObject(value, field, errors);
  if (!exists) {
    return;
  }

  const allowed = ["primary", "secondary", "pain_points", "motivations"];
  if (allowObjections) {
    allowed.push("objections");
  }
  validateAllowedKeys(value, allowed, field, errors);
  if (required) {
    validateRequiredString(value.primary, `${field}.primary`, errors);
  } else {
    validateOptionalString(value.primary, `${field}.primary`, errors);
  }
  validateOptionalString(value.secondary, `${field}.secondary`, errors);
  validateOptionalStringArray(value.pain_points, `${field}.pain_points`, errors);
  validateOptionalStringArray(value.motivations, `${field}.motivations`, errors);
  if (allowObjections) {
    validateOptionalStringArray(value.objections, `${field}.objections`, errors);
  }
}

function validateCreativeDirection(value, field, errors, { allowCreatorType = false } = {}) {
  if (!validateOptionalObject(value, field, errors)) {
    return;
  }

  const allowed = ["style", "tone", "with_voiceover", "with_subtitles", "show_face"];
  if (allowCreatorType) {
    allowed.push("creator_type");
  }
  validateAllowedKeys(value, allowed, field, errors);
  validateOptionalString(value.style, `${field}.style`, errors);
  validateOptionalString(value.tone, `${field}.tone`, errors);
  validateOptionalBoolean(value.with_voiceover, `${field}.with_voiceover`, errors);
  validateOptionalBoolean(value.with_subtitles, `${field}.with_subtitles`, errors);
  validateOptionalBoolean(value.show_face, `${field}.show_face`, errors);
  if (allowCreatorType) {
    validateOptionalString(value.creator_type, `${field}.creator_type`, errors);
  }
}

function validateConstraints(value, field, errors) {
  if (!validateOptionalObject(value, field, errors)) {
    return;
  }

  const allowed = ["avoid", "must_include", "must_not_show"];
  validateAllowedKeys(value, allowed, field, errors);
  for (const key of allowed) {
    validateOptionalStringArray(value[key], `${field}.${key}`, errors);
  }
}

function detectInputType(data) {
  if (!isObject(data)) {
    return "unknown";
  }

  if (isObject(data.project) && isObject(data.summary) && Array.isArray(data.structure) && Array.isArray(data.shots)) {
    return "storyboard";
  }

  if (
    isNonEmptyString(data.shot_id) &&
    data.start_time !== undefined &&
    data.end_time !== undefined &&
    data.duration !== undefined
  ) {
    return "shot";
  }

  if (isObject(data.product) && isObject(data.audience) && isObject(data.content_goal)) {
    return "product";
  }

  if (
    isNonEmptyString(data.project_name) &&
    data.duration_seconds !== undefined &&
    data.objective !== undefined
  ) {
    return "brief";
  }

  return "unknown";
}

function validateBrief(data) {
  const errors = [];
  const allowedRoot = [
    "project_name",
    "platform",
    "format",
    "duration_seconds",
    "language",
    "objective",
    "cta",
    "video_type",
    "target_audience",
    "creative_direction",
    "key_messages",
    "core_selling_points",
    "scene_preferences",
    "references",
    "constraints",
    "deliverables",
    "notes"
  ];

  validateAllowedKeys(data, allowedRoot, "", errors);
  validateRequiredString(data.project_name, "project_name", errors);
  validateRequiredEnum(data.platform, "platform", PLATFORMS, errors);
  validateRequiredEnum(data.format, "format", FORMATS, errors);
  if (!isNumberInRange(data.duration_seconds, 3, 180)) {
    pushError(errors, "duration_seconds", "must be a number between 3 and 180");
  }
  validateRequiredString(data.objective, "objective", errors);

  validateOptionalString(data.language, "language", errors);
  validateOptionalString(data.cta, "cta", errors);
  validateOptionalEnum(data.video_type, "video_type", VIDEO_TYPES, errors);
  validateAudience(data.target_audience, "target_audience", errors);
  validateCreativeDirection(data.creative_direction, "creative_direction", errors);
  validateOptionalStringArray(data.key_messages, "key_messages", errors);
  validateOptionalStringArray(data.core_selling_points, "core_selling_points", errors, { minItems: 1 });
  validateOptionalStringArray(data.scene_preferences, "scene_preferences", errors);
  validateOptionalStringArray(data.references, "references", errors);
  validateConstraints(data.constraints, "constraints", errors);
  validateDeliverables(data.deliverables, "deliverables", errors);
  validateOptionalString(data.notes, "notes", errors);

  return errors;
}

function validateProductRoot(data) {
  const errors = [];
  const allowedRoot = [
    "project_name",
    "platform",
    "format",
    "duration_seconds",
    "language",
    "product",
    "audience",
    "content_goal",
    "creative_direction",
    "scene_preferences",
    "props_preferences",
    "camera_preferences",
    "references",
    "constraints",
    "deliverables",
    "notes"
  ];

  validateAllowedKeys(data, allowedRoot, "", errors);
  validateOptionalString(data.project_name, "project_name", errors);
  validateOptionalEnum(data.platform, "platform", PLATFORMS, errors);
  validateOptionalEnum(data.format, "format", FORMATS, errors);
  if (data.duration_seconds !== undefined && !isNumberInRange(data.duration_seconds, 3, 180)) {
    pushError(errors, "duration_seconds", "must be a number between 3 and 180");
  }
  validateOptionalString(data.language, "language", errors);

  validateProductInfo(data.product, errors);
  validateAudience(data.audience, "audience", errors, { required: true, allowObjections: true });
  validateContentGoal(data.content_goal, errors);
  validateCreativeDirection(data.creative_direction, "creative_direction", errors, { allowCreatorType: true });
  validateOptionalStringArray(data.scene_preferences, "scene_preferences", errors);
  validateOptionalStringArray(data.props_preferences, "props_preferences", errors);
  validateOptionalStringArray(data.camera_preferences, "camera_preferences", errors);
  validateOptionalStringArray(data.references, "references", errors);
  validateConstraints(data.constraints, "constraints", errors);
  validateDeliverables(data.deliverables, "deliverables", errors);
  validateOptionalString(data.notes, "notes", errors);

  return errors;
}

function schemaErrorField(error) {
  const pathParts = String(error.instancePath || "")
    .split("/")
    .filter(Boolean)
    .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"));
  if (error.keyword === "required" && error.params?.missingProperty) {
    pathParts.push(error.params.missingProperty);
  }
  return pathParts.length > 0 ? pathParts.join(".") : "$";
}

function validateJsonSchema(data, schemaUrl) {
  const schema = JSON.parse(fs.readFileSync(schemaUrl, "utf8"));
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  if (validate(data)) {
    return [];
  }

  return (validate.errors || []).map((error) => ({
    field: schemaErrorField(error),
    message: error.message || `failed schema keyword: ${error.keyword}`
  }));
}

function validateTimeWindow(value, field, errors) {
  if (!isObject(value)) {
    return;
  }

  const start = value.start_time;
  const end = value.end_time;
  if (start === undefined || end === undefined) {
    return;
  }

  if (!isFiniteNumber(start)) {
    pushError(errors, `${field}.start_time`, "must be a finite number");
  }
  if (!isFiniteNumber(end)) {
    pushError(errors, `${field}.end_time`, "must be a finite number");
  }
  if (isFiniteNumber(start) && isFiniteNumber(end) && end <= start) {
    pushError(errors, `${field}.end_time`, "must be greater than start_time");
  }
}

function validateShotTiming(value, field, errors) {
  validateTimeWindow(value, field, errors);

  if (!isObject(value)) {
    return;
  }

  const start = value.start_time;
  const end = value.end_time;
  const duration = value.duration;

  if (
    isFiniteNumber(start) &&
    isFiniteNumber(end) &&
    isFiniteNumber(duration) &&
    Math.abs((end - start) - duration) > TIME_TOLERANCE_SECONDS
  ) {
    pushError(errors, `${field}.duration`, "must match end_time - start_time");
  }
}

function validateShot(data) {
  const errors = validateJsonSchema(data, SHOT_SCHEMA_URL);
  validateShotTiming(data, "$", errors);
  return errors;
}

function validateStoryboard(data) {
  const errors = validateJsonSchema(data, STORYBOARD_SCHEMA_URL);

  if (Array.isArray(data.structure)) {
    data.structure.forEach((section, index) => {
      validateTimeWindow(section, `structure[${index}]`, errors);
    });
  }

  if (Array.isArray(data.shots)) {
    data.shots.forEach((shot, index) => {
      validateShotTiming(shot, `shots[${index}]`, errors);
    });
  }

  return errors;
}

function validateProductInfo(value, errors) {
  if (!validateRequiredObject(value, "product", errors)) {
    return;
  }

  const allowed = [
    "name",
    "category",
    "brand",
    "price_range",
    "variants",
    "materials",
    "package_includes",
    "usage",
    "core_selling_points",
    "functional_claims",
    "visual_highlights",
    "usage_scenarios",
    "target_use_moment"
  ];
  validateAllowedKeys(value, allowed, "product", errors);
  validateRequiredString(value.name, "product.name", errors);
  validateRequiredString(value.category, "product.category", errors);
  validateRequiredString(value.usage, "product.usage", errors);
  validateRequiredStringArray(value.core_selling_points, "product.core_selling_points", errors, { minItems: 1 });

  validateOptionalString(value.brand, "product.brand", errors);
  validateOptionalString(value.price_range, "product.price_range", errors);
  validateOptionalString(value.target_use_moment, "product.target_use_moment", errors);
  validateOptionalStringArray(value.variants, "product.variants", errors);
  validateOptionalStringArray(value.materials, "product.materials", errors);
  validateOptionalStringArray(value.package_includes, "product.package_includes", errors);
  validateOptionalStringArray(value.functional_claims, "product.functional_claims", errors);
  validateOptionalStringArray(value.visual_highlights, "product.visual_highlights", errors);
  validateOptionalStringArray(value.usage_scenarios, "product.usage_scenarios", errors);
}

function validateContentGoal(value, errors) {
  if (!validateRequiredObject(value, "content_goal", errors)) {
    return;
  }

  const allowed = ["objective", "cta", "priority_metric"];
  validateAllowedKeys(value, allowed, "content_goal", errors);
  validateRequiredString(value.objective, "content_goal.objective", errors);
  validateOptionalString(value.cta, "content_goal.cta", errors);
  validateOptionalString(value.priority_metric, "content_goal.priority_metric", errors);
}

function printSuccess(type, filePath) {
  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        type,
        file: path.normalize(filePath)
      },
      null,
      2
    ) + "\n"
  );
}

function printFailure(type, filePath, errors) {
  process.stderr.write(
    JSON.stringify(
      {
        ok: false,
        type,
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

function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    fail("Usage: node tools/validate-input.js path/to/file.json", 1);
  }

  const data = readJson(filePath);
  const type = detectInputType(data);

  if (type === "unknown") {
    fail(
      JSON.stringify(
        {
          ok: false,
          type: "unknown",
          file: path.normalize(filePath),
          error_count: 1,
          errors: [
            {
              field: "$",
              message:
                "Unable to detect input type. Expected brief, product, shot, or storyboard structure."
            }
          ]
        },
        null,
        2
      ),
      2
    );
  }

  const validators = {
    brief: validateBrief,
    product: validateProductRoot,
    shot: validateShot,
    storyboard: validateStoryboard
  };
  const errors = validators[type](data);

  if (errors.length > 0) {
    printFailure(type, filePath, errors);
  }

  printSuccess(type, filePath);
}

main();
