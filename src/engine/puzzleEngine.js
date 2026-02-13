import { getPuzzle } from "./puzzleRegistry";
import { getDailySeed } from "./seed";

export function generatePuzzle(type, date = new Date()) {
  const entry = getPuzzle(type);
  if (!entry) throw new Error("Puzzle type not registered");

  const seed = getDailySeed(date);
  return entry.generator(seed);
}

export function validatePuzzle(type, puzzle, userAnswer) {
  const entry = getPuzzle(type);
  if (!entry) throw new Error("Puzzle type not registered");

  return entry.validator(puzzle, userAnswer);
}
