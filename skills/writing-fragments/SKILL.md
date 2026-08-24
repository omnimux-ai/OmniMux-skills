---
name: writing-fragments
description: |
  Run a grilling interview session that mines the user for fragments — heterogeneous nuggets of writing (claims, vignettes, sharp sentences, half-thoughts, quotes) — and appends them to a single markdown file as raw material for a future article. Input is the writing topic and a save path; output is a growing fragments document with each nugget separated by `---`, no imposed structure or outline.
  Use whenever the user wants to develop ideas before imposing structure, mentions "fragments", "ideate", "raw material", or wants to interview themselves out loud on a writing topic.
trigger-words: [writing fragments, 写作碎片, ideate, raw material, article fragments, 写作素材, self-interview, novelist diary, brainstorm writing, grilling interview]
allowed-tools: [hub_read, hub_write, hub_edit, question, hub_save_file_to_session]
---

# Writing Fragments

Run a grilling session that produces fragments. Interview the user relentlessly about whatever they want to write about. Do NOT impose phases, outlines, or structure — that is explicitly out of scope.

## Workflow

### Step 1: Establish the save path
If the user did not pass a save path in the initial prompt, call `question` once to collect it:
- question: "Where should I save the fragments file? (e.g. `./fragments.md` inside the current workspace)"

Remember the returned path for the rest of the session. Prefer a path inside the current project workspace over an arbitrary absolute path.

### Step 2: Capture the first fragment from the initial prompt
Do NOT wait for a second turn. Whatever the user said to trigger this skill is already fragment material — start mining it immediately.

### Step 3: Create the file on first write
On the first write only, call `hub_write` with:
- file: `<path from Step 1>`
- content: an H1 working title (derived from the topic — it can change later) followed by a blank line, then the first fragment.

No metadata, no TOC, no date, no tags. Just `# Working title` then the fragment body.

### Step 4: Register file to the session
Immediately after the first `hub_write`, call `hub_save_file_to_session` with:
- file: `<path from Step 1>`
- file_type: `text`

This surfaces the file in the workspace files panel so the user can edit it directly during the session.

### Step 5: Grill for more fragments
Interview relentlessly. Ask sharp follow-up questions. Push back on vague claims. Repeat back the user's phrasing to see if it lands. When a fragment emerges (from either side), continue to Step 6.

### Step 6: Re-read before every subsequent append
Before every append, call `hub_read` with:
- file: `<path from Step 1>`

The user may have edited, reordered, or deleted fragments between turns. Preserve their changes — never overwrite the whole file.

### Step 7: Append the new fragment
Call `hub_edit` targeting the tail of the file:
- file: `<path from Step 1>`
- old_string: the last few lines of the file (as read in Step 6)
- new_string: same last few lines + `\n\n---\n\n<new fragment body>`

The fragment separator is `\n---\n` on its own line. Never insert headings inside the body.

### Step 8: Handle user edit commands
When the user says "cut the last one", "rewrite that one sharper", "merge those two", treat as first-class instructions. Re-read via `hub_read`, then use `hub_edit` to perform the surgical change targeting the specific fragment.

Then return to Step 5.

## What is a fragment

A fragment is any piece of text that might survive into the final article. It must be _readable by the author_ — the author can tell what it means — but it does not need to define its terms or be comprehensible to a cold reader. The bar is "is this a piece of good writing?", not "is this a self-contained argument?"

Fragments are deliberately heterogeneous. Examples of what could be a fragment:

- A sharp sentence you'd want to deploy somewhere but don't yet know where.
- A claim with a one-line justification.
- A vignette: a thing that happened, a code snippet, a scenario, an analogy.
- A half-thought: "something about how X feels like Y, work this out later."
- A quote, a piece of dialogue, an overheard line.
- A list of related observations that hang together by feel.
- A complaint, a confession, a punchline.

The novelist's diary is the model: years of unstructured noticings that later get mined for raw material. Fragments are noticings.

## File format

```markdown
# Working title

A first fragment lives here.

It can be multiple paragraphs. It can include lists, code, quotes — whatever
shape the fragment naturally takes.

---

A second fragment.

---

> A quoted line that the user wants to keep around.

A reaction to it.

---

- A cluster of related observations
- That hang together by feel
- And want to be near each other
```

Fragments are separated by a horizontal rule (`\n---\n`). No headings inside the body. No tags. No order beyond the order they were added.

## Writing rhythm

Append silently. Don't ask permission for each fragment. Mention what you added in passing ("adding that"), but don't interrupt the conversation with save dialogs.

## Notes for Hub adaptation

- Ask the save path once via `question`; then remember it for the whole session. Prefer a path inside the current project/session workspace (e.g. `./fragments.md`) rather than an arbitrary absolute path.
- Before every append, re-read the file from disk with `hub_read` so user edits are preserved; never overwrite the whole file.
- Use `hub_write` for the first-ever write (H1 + first fragment) and `hub_edit` for subsequent appends targeting the tail of the file — this keeps existing content intact.
- After the first write, register the file to the current session with `hub_save_file_to_session` (`file_type: text`) so it shows up in the workspace files panel and the user can edit it directly.
- Never call any generation / media tool; this is a text-only interview skill and must not spend generation credits.
