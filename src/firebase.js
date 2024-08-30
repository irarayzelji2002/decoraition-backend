import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX78AGpu3POftTNfK0QSI4Og0nFlTq_6E",
  authDomain: "decoraition.firebaseapp.com",
  projectId: "decoraition",
  storageBucket: "decoraition.appspot.com",
  messagingSenderId: "637004924746",
  appId: "1:637004924746:web:c7b833cf3577456472a3b3",
  measurementId: "G-DQL41XE7BK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore initialization
export default app;
