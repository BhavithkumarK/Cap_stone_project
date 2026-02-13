import { validatePuzzle } from "./puzzleEngine";

export function checkSolution(type, puzzle, userAnswer) {
  const correct = validatePuzzle(type, puzzle, userAnswer);

  return {
    correct,
    answer: userAnswer,
    message: correct ? "Correct" : "Wrong"
  };
}
