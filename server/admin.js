var admin = require("firebase-admin");
var serviceAccount = require("./decoraition-firebase-adminsdk-g54wj-536e1e1fae.json");
const { initializeApp } = require("firebase-admin/app");

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin };
