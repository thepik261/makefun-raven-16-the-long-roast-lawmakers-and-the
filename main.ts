// The Long Roast: Lawmakers and the File They Cannot Convert
// Writes one satirical sentence (174 chars, single sentence) to
// <OUTPUT_DIR>/entry.txt (default /output/entry.txt).
// Pure Node stdlib only. Deterministic: the same line every run.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The senator who wrote the 400-page bill regulating artificial intelligence " +
  "just emailed his staff a file named FINAL_final_v2.docx and asked his " +
  "intern to turn it into a PDF.";

const outDir = process.env.OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

function main(): void {
  // Gate: exactly one sentence, 1-320 chars, non-blank.
  const trimmed = LINE.trim();
  if (trimmed.length < 1 || trimmed.length > 320) {
    throw new Error(`entry length ${trimmed.length} outside 1-320`);
  }
  if (trimmed !== LINE) throw new Error("entry has stray whitespace");
  // One sentence: ends with a single full stop, no ". " inside, no ? or !.
  if (!LINE.endsWith(".") || LINE.includes(". ") || /[?!]/.test(LINE)) {
    throw new Error("entry must be exactly one sentence");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, LINE + "\n", { encoding: "utf8", mode: 0o644 });
  try {
    chmodSync(outFile, 0o644);
  } catch {
    // Leave the file as written; never chmod the output directory itself.
  }
}

main();
