const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const projectController = require("../controllers/projectController");
const designController = require("../controllers/designController");

const commentController = require("../controllers/commentController");
const notificationController = require("../controllers/notificationController");
const projectBudgetController = require("../controllers/projectBudgetController");
const budgetController = require("../controllers/budgetController");
const planMapController = require("../controllers/planMapController");
const timelineController = require("../controllers/timelineController");
const { auth } = require("../firebase");

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// User routes
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOTP);
router.post("/resend-otp", userController.resendOTP);
router.post("/expire-otp", userController.expireOTP);
router.post("/change-password", userController.changePassword);
router.post("/logout", authenticateUser, userController.handleLogout);
router.get("/user/:userId", authenticateUser, userController.fetchUserData);
router.post("/settings", authenticateUser, userController.handleSettings);

// Design routes
router.get("/designs/:userId", authenticateUser, designController.fetchDesigns);
router.post("/designs", authenticateUser, designController.handleCreateDesign);
router.delete("/designs/:designId", authenticateUser, designController.handleDeleteDesign);

// Project routes
router.get("/projects/:userId", authenticateUser, projectController.fetchProjects);
router.post("/projects", authenticateUser, projectController.handleCreateProject);
router.delete("/projects/:projectId", authenticateUser, projectController.handleDeleteProject);

module.exports = router;
