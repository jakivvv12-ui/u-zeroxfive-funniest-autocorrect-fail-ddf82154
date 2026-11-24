// Funniest Autocorrect Fail (make.fun u-zeroxfive-funniest-autocorrect-fail-ddf82154)
// Writes a single one-line autocorrect fail to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Plain Node 22 JavaScript, no dependencies. Deterministic: same bytes every run.
const fs = require("node:fs");
const path = require("node:path");

// The fail: one wrong word ("mating" for "meeting") turns a routine
// message to the boss into a disaster — clear slip, high stakes, first read.
const ENTRY = "I just texted my boss 'I'm mating at 3' instead of 'meeting at 3.'";

function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");

  // Guard: sealed scorer requires 1-199 characters, one line, not whitespace-only.
  const codePoints = [...ENTRY];
  if (codePoints.length < 1 || codePoints.length > 199) {
    throw new Error("entry must be 1-199 characters, got " + codePoints.length);
  }
  if (ENTRY.trim().length === 0) throw new Error("entry must not be whitespace-only");
  if (/[\r\n]/.test(ENTRY)) throw new Error("entry must be a single line");

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, ENTRY, "utf8");

  // Round-trip validation of the file this program just wrote.
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== ENTRY) throw new Error("round-trip mismatch on entry.txt");
}

main();
