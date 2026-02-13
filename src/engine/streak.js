import { idbGet, idbSet } from "../idb";

const KEY = "streak-data";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(dateStr) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export async function markTodaySolved() {
  const today = todayStr();

  let data = await idbGet(KEY);

  if (!data) {
    data = {
      solvedDates: []
    };
  }

  if (!data.solvedDates.includes(today)) {
    data.solvedDates.push(today);
  }

  await idbSet(KEY, data);

  return data;
}

export async function getStreak() {
  const data = await idbGet(KEY);

  if (!data || !data.solvedDates.length) return 0;

  const dates = [...data.solvedDates].sort().reverse();

  let streak = 0;
  let current = todayStr();

  for (const d of dates) {
    if (d === current) {
      streak++;
      current = yesterdayStr(current);
    }
  }

  return streak;
}
export async function getSolvedDates() {
  const data = await idbGet(KEY);
  return data?.solvedDates || [];
}
