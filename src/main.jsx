import "./engine/demoPuzzle";
import "./engine/puzzles/arithmetic";
import "./engine/puzzles/missingNumber";
import "./engine/puzzles/biggerNumber";
import "./engine/puzzles/oddEven";
import "./engine/puzzles/sumOfDigits";

import { registerSW } from "virtual:pwa-register";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ✅ PWA service worker register
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
