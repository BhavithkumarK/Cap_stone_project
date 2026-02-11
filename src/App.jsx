import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!user ? (
        <button
          onClick={login}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="text-center space-y-2">
          <p className="text-xl font-bold">{user.displayName}</p>
          <p>{user.email}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
