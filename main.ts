// One-Line Office Joke Laugh-Off — make.fun entry.
//
// This program writes exactly one joke to stdout and to the entry
// file the sealed scorer reads. The joke is a single line about
// office life, kept here as one plain string so every run of the
// program produces the identical entry, byte for byte.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My boss swore my job was safe, then asked me to train the AI replacing me — so I taught it to call in sick.";

// The gate allows 1 to 200 characters and rejects whitespace-only
// entries; refuse to write anything outside that range rather than
// silently shipping a bad entry.
const MAX_CHARS = 200;
if (JOKE.length < 1 || JOKE.length > MAX_CHARS || JOKE.trim().length === 0) {
  throw new Error(`entry is ${JOKE.length} characters, outside the 1-200 gate`);
}
if (JOKE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

// Write the file with no trailing newline: entry.txt must hold
// exactly the entry text and nothing else.
writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
// Stdout may carry a newline; print the entry and nothing else.
console.log(JOKE);
