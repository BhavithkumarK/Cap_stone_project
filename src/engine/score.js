import { idbGet, idbSet } from "../idb";
import { getStreak } from "./streak";
import { getHintUsed } from "./hint";

const KEY = "daily-score";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export async function getTodayScore() {
  const data = await idbGet(KEY);
  if (!data || data.date !== today()) return 0;
  return data.score;
}

export async function calculateAndSaveScore(isCorrect) {
  if (!isCorrect) return 0;

  const streak = await getStreak();
  const hintUsed = await getHintUsed();

  let score = 10 + streak * 2;

  if (hintUsed) score -= 3;

  await idbSet(KEY, {
    date: today(),
    score
  });

  return score;
}
