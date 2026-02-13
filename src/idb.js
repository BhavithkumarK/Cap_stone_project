import { openDB } from "idb";

const dbPromise = openDB("daily-puzzle-db", 1, {
  upgrade(db) {
    db.createObjectStore("store");
  }
});

export async function idbGet(key) {
  const db = await dbPromise;
  return db.get("store", key);
}

export async function idbSet(key, value) {
  const db = await dbPromise;
  return db.put("store", value, key);
}
