export function getDailySeed(date = new Date()) {
  const d = date.toISOString().slice(0, 10); // YYYY-MM-DD
  let hash = 0;

  for (let i = 0; i < d.length; i++) {
    hash = (hash << 5) - hash + d.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}
