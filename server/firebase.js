// Client-side Firebase
import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "./firebaseConfig";

// Admin-side Firebase
import admin from "firebase-admin";
import serviceAccount from "./decoraition-firebase-adminsdk-g54wj-536e1e1fae.json";

// Initialize client-side Firebase
const clientApp = initializeClientApp(firebaseConfig);
export const auth = getAuth(clientApp);
export const db = getFirestore(clientApp);
export const analytics = getAnalytics(clientApp);

// Initialize admin-side Firebase
const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export const adminAuth = adminApp.auth();
export const adminDb = adminApp.firestore();

// Export both apps
export { clientApp, adminApp };
export default clientApp;
