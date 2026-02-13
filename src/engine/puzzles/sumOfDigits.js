import { registerPuzzle } from "../puzzleRegistry";

registerPuzzle(
  "sum-of-digits",

  (seed) => {
    const n = (seed % 900) + 100; // 100..999

    const digits = String(n).split("").map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);

    return {
      number: n,
      sum,
      question: `Find the sum of digits of ${n}`
    };
  },

  (puzzle, answer) => {
    return Number(answer) === puzzle.sum;
  }
);
