import { registerPuzzle } from "../puzzleRegistry";

registerPuzzle(
  "missing-number",

  // generator
  (seed) => {
    const start = (seed % 5) + 1;     // 1..5
    const step = ((seed >> 3) % 5) + 2; // 2..6

    const a = start;
    const b = start + step;
    const c = start + step * 2;
    const d = start + step * 3;

    return {
      series: [a, b, null, d],
      missing: c,
      question: `${a}, ${b}, ?, ${d}`
    };
  },

  // validator
  (puzzle, answer) => {
    return Number(answer) === puzzle.missing;
  }
);
