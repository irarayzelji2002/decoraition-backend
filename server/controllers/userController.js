const { db, auth, clientAuth, clientDb } = require("../firebase");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const emailjs = require("@emailjs/browser");
const {
  REACT_APP_EMAILJS_SERVICE_ID,
  REACT_APP_EMAILJS_TEMPLATE_ID,
  REACT_APP_EMAILJS_PUBLIC_KEY,
} = process.env;

// Create User
exports.createUser = async (req, res) => {
  let createdUserDoc = null;
  let firebaseUserId = null;
  try {
    const { firstName, lastName, username, email, password, userId } = req.body;
    let { profilePic, connectedAccount } = req.body;

    // Check if email already exists
    const existingUser = await db.collection("users").where("email", "==", email).get();
    if (!existingUser.empty) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if email already exists
    const existingUsername = await db.collection("users").where("username", "==", username).get();
    if (!existingUsername.empty) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // Create user in Firebase Authentication
    // 0 for Google, 1 for Facebook
    if (connectedAccount === 0) {
      // For Google OAuth
      firebaseUserId = userId;
    } else {
      // For email/password registration
      const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
      firebaseUserId = userCredential.user.uid;
      connectedAccount = null;
      profilePic = null;
    }

    // Create user document in Firestore
    const userData = {
      firstName,
      lastName,
      username,
      email,
      theme: 0, //0 for dark mode (default), 1 for light mode
      connectedAccount, //0 for Google, 1 for Facebook, null
      profilePic,
      notifSettings: {
        allowNotif: true,
        deleteNotif: true,
        deleteNotifAfter: 15, // in days
        timeForCalEventReminder: "0800", //"0000" to "2359"
        mentionedInComment: true,
        newCommentReplyAsOwner: true,
        newCommentReplyAsCollab: false,
        commentStatusChangeAsOwner: true,
        commentStatusChangeAsCollab: false,
        calEventReminder: true,
        renamedDesign: true,
        inactiveDesign: false,
        deletedDesign: false,
        changeRoleInDesign: false,
        renamedProject: true,
        inactiveProject: false,
        deletedProject: false,
        changeRoleInProject: false,
      },
      layoutSettings: {
        designsListHome: 0, //0 for tiled view, 1 for list view
        projectsListHome: 0,
        designsListDesigns: 0,
        projectsListProjects: 0,
        timeline: 0,
      },
      lastUsedSettings: {
        colorPalette: null,
        numberOfImages: 1,
      },
      colorPalettes: [],
      otp: null,
      projects: [],
      designs: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createdUserDoc = await db.collection("users").doc(firebaseUserId).set(userData);
    res.status(200).json({ message: "User created successfully", userId });
  } catch (error) {
    console.error("Error creating user:", error);

    // Rollback: Delete user from Authentication if it was created
    if (firebaseUserId) {
      try {
        await auth.deleteUser(firebaseUserId);
      } catch (deleteAuthError) {
        console.error("Error deleting user from Authentication:", deleteAuthError);
      }
    }

    // Rollback: Delete user document from Firestore if it was created
    if (createdUserDoc) {
      try {
        await db.collection("users").doc(firebaseUserId).delete();
      } catch (deleteFirestoreError) {
        console.error("Error deleting user document from Firestore:", deleteFirestoreError);
      }
    }

    res.status(500).json({ error: "Failed to create user", message: error.message });
  }
};

// Read User
exports.fetchUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the requesting user matches the userId
    if (req.user.uid !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error("Error fetching user data: ", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    await db.collection("users").doc(userId).update(updateData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await db.collection("users").doc(userId).delete();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Login with email and password
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
    const user = userCredential.user;

    // Fetch additional user data from Firestore
    const userDoc = await db.collection("users").doc(user.uid).get();
    const userData = userDoc.data();

    // Add the document ID (user.uid) to userData
    const userDataWithId = {
      ...userData,
      id: user.uid,
    };

    res.status(200).json({
      message: "Login successful",
      userData: userDataWithId,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(401).json({ error: "Login failed", message: error.message });
  }
};

// Login with Google
exports.loginUserGoogle = async (req, res) => {
  try {
    const { user } = req.body;

    // Check if the user exists in the 'users' collection
    const userDoc = await db.collection("users").doc(user.uid).get();

    if (userDoc.exists) {
      // User exists, fetch their data
      const userData = userDoc.data();

      // Add the document ID (user.uid) to userData
      const userDataWithId = {
        ...userData,
        id: user.uid,
      };

      res.status(200).json({
        message: "Login successful",
        userData: userDataWithId,
      });
    } else {
      // User doesn't exist in Firestore yet
      res.status(200).json({
        message: "No account yet",
        userData: null,
      });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(401).json({ error: "Login failed", message: error.message });
  }
};

// Send OTP if email exists
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userDoc = await db.collection("users").where("email", "==", email).get();
    if (userDoc.empty) {
      return res.status(404).json({ message: "Email not found" });
    }
    const username = userDoc.docs[0].username;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await db.collection("users").doc(userDoc.docs[0].id).update({ otp });

    // Send email with OTP using emailjs
    const templateParams = {
      from_email: "decoraition@gmail.com",
      to_email: email,
      to_name: username,
      otp: otp,
    };
    await emailjs.send(
      REACT_APP_EMAILJS_SERVICE_ID,
      REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      REACT_APP_EMAILJS_PUBLIC_KEY
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const userDoc = await db.collection("users").where("email", "==", email).get();
    if (userDoc.empty) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = userDoc.docs[0].data();
    if (userData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    // Remove OTP from user document
    await db.collection("users").doc(userDoc.docs[0].id).update({ otp: null });
    res.json({ success: true });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Resend & Update OTP
exports.resendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const userDoc = await db.collection("users").where("email", "==", email).get();
    if (userDoc.empty) {
      return res.status(404).json({ message: "User not found" });
    }
    const username = userDoc.docs[0].username;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await db.collection("users").doc(userDoc.docs[0].id).update({ otp });

    // Send email with new OTP using emailjs
    const templateParams = {
      from_email: "decoraition@gmail.com",
      to_email: email,
      to_name: username,
      otp: otp,
    };
    await emailjs.send(
      REACT_APP_EMAILJS_SERVICE_ID,
      REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams,
      REACT_APP_EMAILJS_PUBLIC_KEY
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Error in resendOTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Clear OTP if time expires
exports.expireOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const userDoc = await db.collection("users").where("email", "==", email).get();
    if (!userDoc.empty) {
      await db.collection("users").doc(userDoc.docs[0].id).update({ otp: null });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error in expireOTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await auth.getUserByEmail(email);
    await auth.updateUser(user.uid, { password });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
  }
};

// Update Profile Picture
exports.updateProfilePic = async (req, res) => {
  const { selectedFile, userId } = req.body;
  const updatedAt = new Date();

  if (!selectedFile || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const storage = getStorage();
    const storageRef = ref(storage, `profilePic/${userId}`);
    await uploadBytes(storageRef, selectedFile);
    const photoURL = await getDownloadURL(storageRef);

    const userDocRef = db.collection("users").doc(userId);
    await userDocRef.update({ photoURL: photoURL, updatedAt: updatedAt });

    res.status(200).json({
      message: "Profile picture updated successfully",
      photoURL: photoURL,
      updatedAt: updatedAt,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
};

// Update User Field (theme, email)
exports.updateUserField = async (req, res) => {
  const { userId, field, value } = req.body;

  if (!userId || !field || value === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = {};
    const updatedAt = new Date();
    updateData.updatedAt = updatedAt;

    switch (field) {
      case "theme":
        updateData[field] = value;
        break;

      case "email":
        if (userDoc.data().email !== value) {
          const emailExists = await db
            .collection("users")
            .where("email", "==", value)
            .where("userId", "!=", userId)
            .get();
          if (!emailExists.empty) {
            return res.status(400).json({ error: "Email already exists" });
          }
          try {
            await auth.updateUser(userId, { email: value });
            updateData.email = value;
          } catch (error) {
            console.error("Error updating auth user email:", error);
            return res.status(500).json({ error: "Failed to update email" });
          }
        }
        break;

      default:
        return res.status(400).json({ error: "Invalid field" });
    }

    await userDocRef.update(updateData);
    res
      .status(200)
      .json({ message: `${field} updated successfully`, [field]: value, updatedAt: updatedAt });
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
    res.status(500).json({ error: `Failed to update ${field}` });
  }
};

// Update User Field (firstName, lastName, and username)
exports.updateUserDetails = async (req, res) => {
  const { userId, firstName, lastName, username } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const userDocRef = db.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = {};
    updateData.updatedAt = new Date();

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;

    if (username !== undefined) {
      const usernameExists = await db
        .collection("users")
        .where("username", "==", username)
        .where("userId", "!=", userId)
        .get();
      if (!usernameExists.empty) {
        return res.status(400).json({ error: "Username already exists" });
      }
      updateData.username = username;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    await userDocRef.update(updateData);
    res.status(200).json({ message: "Profile updated successfully", updatedFields: updateData });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update user profile" });
  }
};

// Link/Unlink Account
exports.updateConnectedAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const { connectedAccount, oldConnectedAccount } = req.body;
    const updatedAt = new Date();

    // Ensure the authenticated user matches the userId
    if (req.user.uid !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    let message = "";
    const userRecord = await auth.getUser(userId);
    if (connectedAccount === null) {
      // Unlink all providers except password
      const providers = userRecord.providerData;
      for (const provider of providers) {
        if (provider.providerId !== "password") {
          await auth.updateUser(userId, {
            providerToUnlink: provider.providerId,
          });
        }
      }
      if (oldConnectedAccount === 0) message = "Google account unlinked successfully.";
      else if (oldConnectedAccount === 1) message = "Facebook account unlinked successfully.";
    } else if (!(connectedAccount === 0 || connectedAccount === 1)) {
      console.error("Error: connected account is not 0, 1, null");
      res.status(400).json({ error: "Failed to update connected account" });
    } else {
      if (connectedAccount === 0) message = "Google account linked successfully.";
      else if (connectedAccount === 1) message = "Facebook account linked successfully.";
    }
    await db
      .collection("users")
      .doc(userId)
      .update({ connectedAccount: connectedAccount, updatedAt: updatedAt });

    res.status(200).json({
      message: message,
      connectedAccount: connectedAccount,
      updatedAt: updatedAt,
    });
  } catch (error) {
    console.error("Error updating connected account:", error);
    res.status(500).json({ error: "Failed to update connected account" });
  }
};

// Update User Notification Settings
exports.updateNotificationSettings = async (req, res) => {
  try {
    const { userId, notifSettings } = req.body;

    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedAt = new Date();
    await userRef.update({
      notifSettings: notifSettings,
      updatedAt: updatedAt,
    });

    res.status(200).json({
      message: "Notification settings updated successfully",
      notifSettings: notifSettings,
      updatedAt: updatedAt,
    });
  } catch (error) {
    console.error("Error updating notification settings:", error);
    res
      .status(500)
      .json({ error: "Failed to update notification settings", details: error.message });
  }
};

exports.updateLayoutSettings = async (req, res) => {
  try {
    const { userId } = req.body;
    const settingToUpdate = Object.keys(req.body)[1];
    const newValue = req.body[settingToUpdate];

    await db
      .collection("users")
      .doc(userId)
      .update({
        [`layoutSettings.${settingToUpdate}`]: newValue,
      });

    res.status(200).json({ message: "Layout setting updated successfully" });
  } catch (error) {
    console.error("Error updating layout setting:", error);
    res.status(500).json({ message: "Error updating layout setting", error: error.message });
  }
};

exports.updateTheme = async (req, res) => {
  try {
    const { userId, theme } = req.body;
    if (!userId || theme === undefined) {
      return res.status(400).json({ message: "Missing userId or theme" });
    }
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }
    await userRef.update({ theme });
    res.status(200).json({ message: "Theme updated successfully" });
  } catch (error) {
    console.error("Error updating theme:", error);
    res.status(500).json({ message: "Error updating theme", error: error.toString() });
  }
};
