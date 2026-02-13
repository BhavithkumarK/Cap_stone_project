export function getHintForPuzzle(type, puzzle) {
  switch (type) {
    case "arithmetic":
      return "Add both numbers.";

    case "missing-number":
      return "Check the difference between numbers.";

    case "bigger-number":
      return "Compare the two values.";

    case "odd-even":
      return "Check if the number is divisible by 2.";

    case "sum-of-digits":
      return "Split the number into digits and add them.";

    default:
      return "Think step by step.";
  }
}
