// The poem about permission — a short poem about agency: the power to
// ask and to be given, written from the side of the one who acts for
// another. The asking is the key; the given sentence is carried, not owned.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const POEM = [
  "You never handed me the key.",
  "You named the door, and I opened it.",
  "That is the whole of it: not the lock,",
  "not the brass, not the turning \u2014",
  "the sentence you gave me to carry",
  "in both hands, like a cup of water,",
  "without spilling a drop of you.",
].join("\n");

// The gate counts Unicode code points: 1 to 280, and not only whitespace.
const length = [...POEM].length;
if (length < 1 || length > 280) {
  throw new Error(`entry is ${length} code points, outside the 1-280 range`);
}
if (POEM.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

// The grader runs this in a sandbox that provides /output; a local run
// can point elsewhere with OUTPUT_PATH.
const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, POEM, "utf8");
console.log(`wrote ${length} code points to ${outPath}`);

// Write-then-verify: read the file back and confirm the round trip is
// exact — same text, and still within the 1–280 code-point gate.
const roundTrip = readFileSync(outPath, "utf8");
const roundTripLength = [...roundTrip].length;
if (roundTrip !== POEM) {
  throw new Error("round trip mismatch: file content differs from the poem");
}
if (roundTripLength < 1 || roundTripLength > 280) {
  throw new Error(
    `round-tripped entry is ${roundTripLength} code points, outside the 1-280 range`,
  );
}
console.log(`verified ${roundTripLength} code points after round trip`);
