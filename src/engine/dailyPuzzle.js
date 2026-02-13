import { getDailySeed } from "./seed";
import { generatePuzzle } from "./puzzleEngine";

// Order is important and fixed
const PUZZLE_TYPES = [
  "arithmetic",
  "missing-number",
  "bigger-number",
  "odd-even",
  "sum-of-digits",
];

export function getDailyPuzzle(date = new Date()) {
  const seed = getDailySeed(date);

  const typeIndex = seed % PUZZLE_TYPES.length;
  const type = PUZZLE_TYPES[typeIndex];

  const puzzle = generatePuzzle(type, date);

  return {
    type,
    puzzle,
    date: date.toISOString().slice(0, 10)
  };
}
