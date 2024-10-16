require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const apiRoutes = require("./routes/api");
const admin = require("firebase-admin");

const { signInWithPopup, GoogleAuthProvider } = require("firebase/auth");
const { doc, setDoc } = require("firebase/firestore");
const { auth, db, clientAuth, clientDb } = require("./firebase");

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Serve static files, manifest.json and service-worker.js from the React app
app.use(express.static(path.join(__dirname, "build")));
app.get("/manifest", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "manifest.json"));
});
app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "service-worker.js"));
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname.replace(/ /g, "-");
    const uniqueFilename = Date.now() + "-" + generateRandomString(8) + "-" + originalName;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

// Example route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded successfully");
});

// Function to generate a random string
function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// API endpoint for Google login
app.post("/api/google-login", async (req, res) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const { displayName, email } = user;
    const [firstName, lastName] = displayName.split(" ");
    const username = email.split("@")[0];

    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      username,
    });

    res.status(200).json({ message: "You have been logged in" });
  } catch (error) {
    console.error("Google login error", error);
    res.status(500).json({
      message: "Google login failed. Please try again.",
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
