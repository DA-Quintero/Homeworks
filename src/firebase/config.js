// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBge59jNt92-UubMKBzJuLxUhgzOHwvOyU",
  authDomain: "fir-proyect-972b9.firebaseapp.com",
  databaseURL: "https://fir-proyect-972b9-default-rtdb.firebaseio.com/",
  projectId: "fir-proyect-972b9",
  storageBucket: "fir-proyect-972b9.firebasestorage.app",
  messagingSenderId: "987944057539",
  appId: "1:987944057539:web:385dfddd3722891bc60076",
  measurementId: "G-8JDE8TNMPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase(app);

export { app, auth, analytics, db };