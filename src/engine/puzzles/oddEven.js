import { registerPuzzle } from "../puzzleRegistry";

registerPuzzle(
  "odd-even",

  (seed) => {
    const n = (seed % 100) + 1; // 1..100

    return {
      number: n,
      answer: n % 2 === 0 ? "even" : "odd",
      question: `Is this number odd or even? ${n}`
    };
  },

  (puzzle, userAnswer) => {
    if (!userAnswer) return false;
    return puzzle.answer === String(userAnswer).toLowerCase();
  }
);
