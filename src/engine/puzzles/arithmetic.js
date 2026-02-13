import { registerPuzzle } from "../puzzleRegistry";

registerPuzzle(
  "arithmetic",

  (seed) => {
    const a = (seed % 20) + 1;
    const b = ((seed >> 3) % 20) + 1;

    return {
      a,
      b,
      question: `${a} + ${b}`
    };
  },

  (puzzle, answer) => {
    return Number(answer) === puzzle.a + puzzle.b;
  }
);
