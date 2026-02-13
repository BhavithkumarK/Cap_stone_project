import { idbGet, idbSet } from "../idb";

const KEY = "daily-hint";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export async function getHintUsed() {
  const data = await idbGet(KEY);
  if (!data) return false;
  return data.date === today();
}

export async function markHintUsed() {
  await idbSet(KEY, { date: today() });
}
