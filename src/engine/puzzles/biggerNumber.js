import { registerPuzzle } from "../puzzleRegistry";

registerPuzzle(
  "bigger-number",

  (seed) => {
    const a = (seed % 90) + 10;           // 10..99
    const b = ((seed >> 4) % 90) + 10;    // 10..99

    const bigger = a > b ? a : b;

    return {
      a,
      b,
      bigger,
      question: `Which is bigger: ${a} or ${b}?`
    };
  },

  (puzzle, answer) => {
    return Number(answer) === puzzle.bigger;
  }
);
