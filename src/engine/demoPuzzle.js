import { registerPuzzle } from "./puzzleRegistry";

registerPuzzle(
  "demo",
  (seed) => {
    return {
      a: seed % 10,
      b: (seed % 10) + 1
    };
  },
  (puzzle, answer) => {
    return puzzle.a + puzzle.b === Number(answer);
  }
);
