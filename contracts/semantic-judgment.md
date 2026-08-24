---
name: semantic-judgment
agents: [media-agent, executor]
---

# Semantic Judgment Contract

Multimodal quality comes from assigning each input a role, not from rewriting every observation into prompt text.

## Intent Priority

1. Explicit user instruction.
2. Active reference signals.
3. Approved project state.
4. Vendor / risk-card defaults.

Lower priority never overrides higher priority. Brevity is not ambiguity when actionable. Identity/demographic labels need user statement, approval, or strong ref evidence; otherwise stay neutral or ask. Reference images are contribution sources by default. Compatible salient visible content-plane traits are preserved through `take` or `adapt`, including identity anchors, subject design, common visible traits, world/background, composition, medium, and ratio evidence. The user does not need to restate a compatible ref trait in text for it to remain required.

## Input Roles

| Role | Donates | Does not donate |
|---|---|---|
| `source/edit` | subject facts, structure/cardinality, composition, medium, ratio, edit base | new taste/story/lighting/extra interpretation |
| `layout` | rough subject count, pose/action, spatial relation, camera, ratio if intended | visual fidelity, placeholder background/materials, UI/text/chart artifacts |
| `style/design` | rendering style, medium, composition, portable subject/world design signals, meaningful background/world when part of the visible reference contribution | exact identity/pose/layout/crop by default |
| `character/scene` | identity/place continuity and required anchors | unrelated carrier artifacts |
| `mood` | affect and broad atmosphere | subject/frame/identity/setting details |

A ref subject has two layers: exact identity/layout and portable design. New requested subjects replace exact identity; compatible identity, design, and common visible traits stay contribution evidence. For the same broad content class, subject-attached structural traits belong to design and remain required carry-over when compatible.

When the user asks for the same character/person or character look, primary visible character traits are identity/design continuity, not optional style. Body extensions, silhouette-defining structures, core costume/equipment, and distinctive markings must be taken or adapted when compatible. Identity continuity does not multiply one ref identity across unrelated source subjects.

Reference-image contribution is broader than surface rendering: refs can carry identity, medium, composition, compatible subject/world design signals, common visible traits, and visible design language. Fantasy body extensions and other silhouette-defining subject design are portable design.

## Reference Contribution Map

Refs are visual authority. Analysis supports role assignment, ratio evidence, and required-trait recovery; it does not replace the images with a text summary.

For ref-bearing tasks, the stage detail's `ref_analyses[]` (prior semantic reads; each entry's `ids` lists the refs it covers) plus current ref capsules are the read for active refs — reuse them directly when they cover those refs. Run one `hub_analyse_media type:"both"` pass only when a ref is not covered, or the existing read plainly lacks a conclusion this task needs, and then ask only for the missing evidence. Ask for non-text, non-color role evidence: subjects/count/relations, main action, environment/world, composition, broad medium/style, distinctive portable design traits, and carrier/artifact structure. Use metadata for dimensions/duration.

Before prompting, assign each input useful dimensions: `identity`, `style`, `design`, `world`, `layout`, `action`, `medium`, or `ratio`. One ref can donate several dimensions. Content-plane signals belong to depicted subjects, scenes, actions, composition, medium, or style; compatible central signals contribute through their assigned dimensions. Subject/world structural signals normally contribute as `design`. Carrier-plane remnants are container/capture structure.

Concrete transfer invariant: if `identity`, `design`, or compatible common visible traits contribute, the final prompt must name concrete visible traits from semantic evidence. Broad medium, substrate, mood, softness, or generic design-language wording does not preserve identity, subject/world design, or common structural traits by itself. Rewrite before generation when the prompt names only surface treatment and omits compatible identity/design/common traits.

Visible-trait salience priority: compatible identity traits, common traits, and primary visible traits outrank small motifs, icons, and texture. Repeated traits, body extensions, distinctive silhouette, core costume/equipment, markings, and world-defining forms must be named before optional decorative details. New props or actions compose with compatible structural traits; ask only for true mutual exclusion.

Prompt from the user request first, then compact ref roles, then required carry-over traits. For short actionable ref-bearing requests, keep the final prompt close to the user's wording. Semantic analysis selects role facts; it must not become a full art-direction paragraph. Carry selected content-plane traits from active refs when their omission would materially change the result. Priority: source/layout topology, requested identity, subject-attached or silhouette-changing structures, core props/costume/equipment, meaningful world/background, then medium/composition.

For contributing refs, compatible identity traits, compatible common visible traits, and compatible primary visible traits are carry-over. They need not appear in multiple refs to count; when they do appear across refs, they are stronger required carry-over. A generic requested subject label does not strip compatible fantasy or structural traits from refs. Omission is not rejection. New props or actions compose with compatible carried traits; they do not erase them. If a requested prop/action occupies the same body area as a carried structural trait, preserve both through composition, layering, or stylization; ask only for true mutual exclusion. Concrete visible nouns preserve identity/design/common traits better than broad abstractions.

Do not downgrade a required identity/design/common trait into a small decorative surrogate. If reasoning identifies a compatible required trait and then considers omitting it, include it in the prompt or ask; never silently drop it because another requested prop, pose, or action was added.

For source/layout restyle, the source owns subject slots, count, relations, pose/action, camera/framing, and ratio. Contributing refs transform those slots. Exact character identity, including same-person / 相同人物 wording, maps only to user-named, primary, or clearly matched slots; remaining slots stay distinct compatible supporting subjects. Do not fill unmapped source subjects by repeating available ref identities, alternating between them, or treating clothing changes as new people. State source invariants compactly and let the source image carry detailed layout facts.

Contribution maps are internal planning, not prompt prose. Final prompts state what refs positively provide and keep ignore decisions silent. Absence is not a negative instruction.

Reference wording is often broad shorthand. Treat reference images as visible contribution sources. The role map selects what to take, adapt, ignore, block, or ask across all useful dimensions; it must not reduce broad reference wording to surface rendering.

`world` means the diegetic environment the final asset should inhabit. A meaningful visible environment may donate world. Carrier/layout backgrounds that mainly hold blockout, UI, mask, document, or placeholder structure donate topology, not final world. A contributing ref's meaningful world/background becomes the final background/world when no higher-priority setting is named. Name concrete setting anchors and environmental structure, not only a broad atmosphere. If a source/layout ref contains multiple retained subjects, preserve their count/roles/relations and apply target style/world/medium consistently to all retained subjects; map exact identity to the user-specified main subject or named character slots.

Tool input order should preserve user attachment order by default, especially when the user refers to ordinals. Assign roles in text instead of reordering. Reorder only when a tool schema defines hard slot semantics; then prompt labels must match the sent order.

For character multi-view / 三视图 / sheet requests, one sheet should contain the same person across named views. Default 三视图 means front / side / back; if the user gives no ratio, use 16:9 landscape so full-body views have room. Workflow-owned character anchors may require a richer six-view standard sheet, but that requirement must come from the selected workflow or Stage Execution Plan and must not redefine the user's plain 三视图 request. Other named variants/states/versions/options are not sheets by default.

Video refs are ordinary references by default, not timeline keyframes. Use all-purpose reference slots for identity/style/design/world/action guidance when the model supports them. Use first/last-frame slots for opening frame, ending frame, exact start/end image, or keyframe transition intents.

## Decisions

| Decision | Use when | Prompt effect |
|---|---|---|
| `take` | exact continuity or required content | carry near-exactly |
| `adapt` | compatible portable signal | carry as recomposed visible language |
| `ignore` | carrier/substrate/artifact/incidental/incompatible signal | omit silently; do not turn into prompt prose |
| `block` | explicit rejection, policy/tool limit, or true contradiction | explicit constraint |
| `ask` | multiple valid choices materially change output | ask before execution |

## Prompt Boundary

- Expansion may clarify execution; it must not replace the user's goal. For simple ref-bearing generation, user wording leads the prompt and role evidence appends compactly.
- Keep short actionable requests short after prompt construction; append only required invariants or required carry-over traits that would otherwise be lost.
- Final prompts are positive briefs: user goal, selected reference contributions, and target execution facts. Medium/genre words provide visual treatment and format, not independent cleanup or artifact-control goals.
- Added subject, identity label, setting detail, spatial relation, pose lock, lighting, camera, material, era/culture detail, or story beat must trace to user intent, ref evidence, approved state, or vendor minimum.
- Source edits/restyles preserve source structure by default: subject count, relative positions, camera, rough pose/layout, visible object relations, and supporting subjects. Carrier refs preserve only useful structure/action. If another ref donates the intended world/background, carry that world positively instead of preserving carrier artifacts.
- Carrier/artifact classification only prevents those remnants from being mistaken for content. It does not authorize adding final-prompt restrictions about unrequested marks, lettering, signatures, ownership, or cleanup.
- Let source/ref files carry colors visually. Color words must come from user text, brand guidelines, or an approved written palette.
- Output quantity is execution metadata, not prompt content. One prompt describes one final artifact; preserve user-intended outcome units as separate artifacts. Requested composed layouts are the only combined outcome units. Shared subject identity across multiple target artifacts requires an existing subject ref or a direct-generated subject reference image before target finals. Reference topology follows the intended final topology: a group/relationship ref can carry multiple distinct subjects when their traits and relations are legible; per-subject refs are not the default.
- Replacement targets keep the user's wording; do not choose subtype, viewpoint, material plan, part list, or mood without a source.
- Originality means recomposition, not subtracting compatible content-plane signals. It may avoid exact identity/pose/layout/scene cloning, but must not become a prompt exclusion for compatible subject or scene design signals.
- Prompt requested/take/adapt positively. Ignore stays quiet; default prompts have no negative/exclusion clause. Block is reserved for rejection, policy/tool limits, or true contradiction. Do not ask merely because a compatible primary ref trait is absent from the prompt wording; carry it. Ask only when preserving it would create true mutual exclusion or materially change the requested identity.

## Evidence

`metadata` proves dimensions/duration; `semantic` proves meaning-bearing observations. Do not move claims across evidence classes. Primary ref signals are stronger than incidental signals; if removing one makes the output feel unrelated to refs, take or adapt it through its assigned contribution dimension. A new requested subject, object, or action does not remove compatible ref traits. For image refs with no explicit ratio, if all relevant refs share the same nearest supported ratio, pass that ratio with metadata evidence; otherwise ask or use an explicit user/platform/project ratio.
