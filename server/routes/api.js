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
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// User routes
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/loginWithGoogle", userController.loginUserGoogle);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOTP);
router.post("/resend-otp", userController.resendOTP);
router.post("/expire-otp", userController.expireOTP);
router.post("/change-password", userController.changePassword);
router.get("/user/:userId", authenticateUser, userController.fetchUserData);
router.post("/user/profile-pic", authenticateUser, userController.updateProfilePic);
router.post("/user/update-field", authenticateUser, userController.updateUserField);
router.post("/user/user-details", authenticateUser, userController.updateUserDetails);
router.put(
  "/user/connected-account/:userId",
  authenticateUser,
  userController.updateConnectedAccount
);
router.post(
  "/user/update-notifications",
  authenticateUser,
  userController.updateNotificationSettings
);
router.post("/user/layout-settings", authenticateUser, userController.updateLayoutSettings);
router.post("/user/theme", authenticateUser, userController.updateTheme);

// Design routes
router.get("/design/:userId", authenticateUser, designController.fetchUserDesigns);
router.post("/design/create", authenticateUser, designController.handleCreateDesign);
router.delete("/design/delete/:designId", authenticateUser, designController.handleDeleteDesign);

// Project routes
router.get("/project/:userId", authenticateUser, projectController.fetchUserProjects);
router.post("/project/create", authenticateUser, projectController.handleCreateProject);
router.delete(
  "/project/delete/:projectId",
  authenticateUser,
  projectController.handleDeleteProject
);

module.exports = router;
