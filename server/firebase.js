// Client-side Firebase
const { initializeApp: initializeClientApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getAnalytics, isSupported } = require("firebase/analytics");
const firebaseConfig = require("./firebaseConfig");
const { adminApp, adminAuth, adminDb } = require("./admin");

// Initialize client-side Firebase
const clientApp = initializeClientApp(firebaseConfig);
const auth = getAuth(clientApp);
const db = getFirestore(clientApp);
// Initialize analytics only if supported
let analytics = null;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(clientApp);
    }
  })
  .catch(console.error);

// Export both apps and services
module.exports = {
  clientApp,
  adminApp,
  auth,
  db,
  analytics,
  adminAuth,
  adminDb,
};

// Default export
module.exports.default = clientApp;
