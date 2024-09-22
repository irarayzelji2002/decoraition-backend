import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Set persistence to browser session
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence set to session");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Handle forgot password functionality
export const handleForgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent! Check your inbox.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    // Handle specific error codes
    switch (error.code) {
      case "auth/user-not-found":
        alert("No user found with this email.");
        break;
      case "auth/invalid-email":
        alert("Invalid email address.");
        break;
      default:
        alert("Error sending password reset email.");
    }
  }
};

export default app;
