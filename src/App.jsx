import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase";

import { getDailyPuzzle } from "./engine/dailyPuzzle";
import { checkSolution } from "./engine/solutionEngine";

import { idbGet, idbSet } from "./idb";
import { motion } from "framer-motion";

const API = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);

  const [daily, setDaily] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const [streak, setStreak] = useState(0);
  const [scoreToday, setScoreToday] = useState(0);

  const [showHint, setShowHint] = useState(false);
  const [solvedToday, setSolvedToday] = useState(false);

  const [solvedDates, setSolvedDates] = useState([]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    setUser(res.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    if (!user) return;

    const d = getDailyPuzzle();
    setDaily(d);

    setAnswer("");
    setResult(null);
    setShowHint(false);

    loadFromBackend(d.date);
    loadSolvedDatesLocal();
  }, [user]);

  // -------- backend load --------
  async function loadFromBackend(today) {
    try {
      const res = await fetch(
        `${API}/progress/${user.uid}`
      );

      const data = await res.json();

      if (!data) {
        setStreak(0);
        setScoreToday(0);
        setSolvedToday(false);
        return;
      }

      setStreak(data.streak || 0);

      if (data.last_date === today) {
        setScoreToday(data.score_today || 0);
        setSolvedToday(true);
      } else {
        setScoreToday(0);
        setSolvedToday(false);
      }
    } catch (e) {
      console.warn("Backend unavailable, using local data");

      const local = await idbGet("progress");
      if (!local) return;

      setStreak(local.streak || 0);
      setScoreToday(local.scoreToday || 0);
      setSolvedToday(local.solvedToday || false);
    }
  }

  // -------- heatmap local only --------
  async function loadSolvedDatesLocal() {
    const dates = (await idbGet("solvedDates")) || [];
    setSolvedDates(dates);
  }

  const submit = async () => {
    if (!daily || solvedToday) return;

    const r = checkSolution(daily.type, daily.puzzle, answer);
    setResult(r);

    if (!r.correct) return;

    const today = daily.date;
    const todayScore = showHint ? 0 : 1;

    // update local heatmap store
    const oldDates = (await idbGet("solvedDates")) || [];
    if (!oldDates.includes(today)) {
      const updated = [...oldDates, today];
      await idbSet("solvedDates", updated);
      setSolvedDates(updated);
    }

    let newStreak = streak;
    if (!solvedToday) {
      newStreak = streak + 1;
    }

    // ---- save to backend ----
    try {
      await fetch(`${API}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          streak: newStreak,
          lastDate: today,
          scoreToday: todayScore
        })
      });
    } catch (e) {
      // fallback local
      await idbSet("progress", {
        lastDate: today,
        streak: newStreak,
        scoreToday: todayScore,
        solvedToday: true
      });
    }

    setStreak(newStreak);
    setScoreToday(todayScore);
    setSolvedToday(true);
  };

  const heatmapDays = Array.from({ length: 21 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (20 - i));
    return d.toISOString().slice(0, 10);
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-3">
      {!user ? (
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="w-full max-w-sm space-y-5 text-center">

          <div className="flex justify-between items-center">
            <p className="font-semibold">{user.displayName}</p>
            <button
              onClick={logout}
              className="text-sm text-red-500"
            >
              Logout
            </button>
          </div>

          {daily && (
            <>
              <h2 className="text-lg font-bold">
                Daily Puzzle ({daily.date})
              </h2>

              <div className="flex justify-between text-sm px-1">
                <p>🔥 {streak} day streak</p>
                <p>⭐ {scoreToday}</p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <div className="grid grid-cols-7 gap-1 mt-1">
                  {heatmapDays.map((d) => {
                    const done = solvedDates.includes(d);

                    return (
                      <motion.div
                        key={d}
                        title={d}
                        whileHover={{ scale: 1.2 }}
                        className={`w-4 h-4 rounded ${
                          done ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
              </motion.div>

              <p className="text-xl mt-2">
                {daily.puzzle.question}
              </p>

              {!solvedToday && (
                <button
                  onClick={() => setShowHint(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
                >
                  Show hint
                </button>
              )}

              {showHint && (
                <p className="text-sm text-gray-600">
                  {daily.puzzle.hint || "Try breaking the number into digits."}
                </p>
              )}

              <input
                className="border px-3 py-2 w-full rounded"
                placeholder="Your answer"
                value={answer}
                disabled={solvedToday}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <button
                onClick={submit}
                disabled={solvedToday}
                className={`px-4 py-2 rounded w-full text-white
                  ${solvedToday ? "bg-gray-400" : "bg-green-600"}`}
              >
                {solvedToday ? "Already solved today" : "Submit"}
              </button>

              {result && (
                <motion.p
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`font-semibold ${
                    result.correct ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.message}
                </motion.p>
              )}

              {solvedToday && (
                <p className="text-sm text-gray-500">
                  Come back tomorrow for a new puzzle 👋
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
