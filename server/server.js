const express = require("express");
const multer = require("multer");

const app = express();
// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));
// Middleware to set CORS headers
app.use((req, res, next) => {
  // Allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow any headers in requests
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const dotenv = require("dotenv").config({ path: "./.env" });
// const { MY_API_KEY } = process.env;
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "../public/uploads");
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded files
    const originalName = file.originalname.replace(/ /g, "-");
    const uniqueFilename =
      Date.now() + "-" + generateRandomString(8) + "-" + originalName;
    cb(null, Date.now() + uniqueFilename);
  },
});
const upload = multer({ storage: storage });
const { admin } = require("./admin");
const { db } = require("./firebase");
const {
  collection,
  onSnapshot,
  doc,
  getDocs,
  addDoc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  arrayUnion,
} = require("firebase/firestore");
const { FieldValue } = require("firebase-admin/firestore");
*/

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// GET PALENGKE
app.get("/api/sample", async (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

// SERVER ON PORT 5000
app.listen(5000, () => {
  console.log("SERVER STARTED ON PORT 5000");
});
