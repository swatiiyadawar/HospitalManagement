// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF5cez-j0DmKzUod0bVHCsV6JpKy1X5Js",
  authDomain: "hospital-1a2b7.firebaseapp.com",
  projectId: "hospital-1a2b7",
  storageBucket: "hospital-1a2b7.firebasestorage.app",
  messagingSenderId: "19195407570",
  appId: "1:19195407570:web:29efbb39560e907e80910b",
  measurementId: "G-JZT8X2QFFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Now it's safe to use `app`
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
