import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCzJUAa5AA6Fadfdpl1SNJH8WtkugH3wdQ",
  authDomain: "cap-stone-project-5dbef.firebaseapp.com",
  projectId: "cap-stone-project-5dbef",
  storageBucket: "cap-stone-project-5dbef.firebasestorage.app",
  messagingSenderId: "365464256718",
  appId: "1:365464256718:web:cdd770d11f6c94861bd09f",
  measurementId: "G-SG45H86N70"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

/* ---- SAFE analytics init (no blank screen in dev) ---- */

let analytics = null;

isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
