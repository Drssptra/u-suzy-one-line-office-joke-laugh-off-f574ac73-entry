// One-Line Office Joke Laugh-Off — v2 resubmit.
//
// The entry below is a fresh joke for this resubmission: the office
// suggestion box turns on its own first suggestion. It is assembled
// from three short fragments so the wording stays readable in the
// source while the emitted line is one fixed, deterministic string,
// identical on every run.

import { closeSync, mkdirSync, openSync, writeSync } from "node:fs";
import { resolve } from "node:path";

const FRAGMENTS: readonly string[] = [
  "Our boss installed a suggestion box, ",
  "then shredded the first suggestion: ",
  "remove the suggestion box.",
];

function assemble(fragments: readonly string[]): string {
  return fragments.reduce((acc, part) => acc + part, "");
}

function checkEntry(text: string): void {
  const chars = Array.from(text);
  const problems: string[] = [];
  if (chars.length < 1 || chars.length > 200) {
    problems.push(`length ${chars.length} is outside 1-200`);
  }
  if (text.trim().length === 0) {
    problems.push("entry is blank");
  }
  if (/[\r\n]/.test(text)) {
    problems.push("entry spans more than one line");
  }
  if (problems.length > 0) {
    throw new Error(`invalid entry: ${problems.join("; ")}`);
  }
}

const entry = assemble(FRAGMENTS);
checkEntry(entry);

const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outDir, { recursive: true });

const fd = openSync(resolve(outDir, "entry.txt"), "w");
try {
  // A raw descriptor write: entry.txt gets exactly the entry bytes,
  // with no trailing newline added by any helper.
  writeSync(fd, entry, null, "utf8");
} finally {
  closeSync(fd);
}

process.stdout.write(entry + "\n");
