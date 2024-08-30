import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

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

export const handleForgotPassword = async (email) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent! Check your inbox.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    if (error.code === "auth/user-not-found") {
      alert("No user found with this email.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email address.");
    } else {
      alert("Error sending password reset email.");
    }
  }
};

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore initialization
export default app;
