const { db, auth, adminAuth, adminDb } = require("../firebase");
const {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} = require("firebase/auth");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const emailjs = require("emailjs/browser");
const {
  REACT_APP_EMAILJS_SERVICE_ID,
  REACT_APP_EMAILJS_TEMPLATE_ID,
  REACT_APP_EMAILJS_PUBLIC_KEY,
} = process.env;

// Signin with Google and return user
exports.handleGoogleSignIn = async (req, res) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    res.status(200).json({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.error("Error in Google sign-in:", error);
    res.status(500).json({ error: "Failed to sign in with Google" });
  }
};

// Create User
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, connectedAccount, profilePic, userId } =
      req.body;

    // Create user in Firebase Authentication
    let firebaseUserId;
    if (connectedAccount === "Google") {
      // For Google OAuth
      firebaseUserId = userId;
    } else {
      // For email/password registration
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUserId = userCredential.user.uid;
    }

    // Create user document in Firestore
    const userRef = db.collection("users").doc(firebaseUserId);
    await userRef.set({
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
    });

    res.status(201).json({ message: "User created successfully", userId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user", message: error.message });
  }
};

// Read User
exports.fetchUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(userDoc.data());
  } catch (error) {
    console.error("Error fetching user data:", error);
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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
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

// Logout
exports.handleLogout = async (req, res) => {
  try {
    await auth.signOut();
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Internal server error" });
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
    const user = await adminAuth.getUserByEmail(email);
    await adminAuth.updateUser(user.uid, { password });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password" });
  }
};

// Update Profile Picture
export const updateProfilePic = async (req, res) => {
  const { selectedFile, userId } = req.body;

  if (!selectedFile || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const storage = getStorage();
    const storageRef = ref(storage, `profilePic/${userId}`);
    await uploadBytes(storageRef, selectedFile);
    const photoURL = await getDownloadURL(storageRef);

    const userDocRef = adminDb.collection("users").doc(userId);
    await userDocRef.update({ photoURL });

    res.status(200).json({ message: "Profile picture updated successfully", photoURL });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ error: "Failed to update profile picture" });
  }
};

// Update User Field (theme, email, connectedAccount)
export const updateUserField = async (req, res) => {
  const { userId, field, value } = req.body;

  if (!userId || !field || value === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userDocRef = adminDb.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = {};

    switch (field) {
      case "theme":
        updateData[field] = value;
        break;

      case "email":
        if (userDoc.data().email !== value) {
          const emailExists = await adminDb
            .collection("users")
            .where("email", "==", value)
            .where("userId", "!=", userId)
            .get();
          if (!emailExists.empty) {
            return res.status(400).json({ error: "Email already exists" });
          }
          try {
            await adminAuth.updateUser(userId, { email: value });
            updateData.email = value;
          } catch (error) {
            console.error("Error updating auth user email:", error);
            return res.status(500).json({ error: "Failed to update email" });
          }
        }
        break;

      case "connectedAccount":
        if (value === null || value === 0 || value === 1) {
          updateData.connectedAccount = value;
          if (value === null) {
            try {
              await adminAuth.updateUser(userId, {
                providerToLink: null,
                providerId: "password",
              });
            } catch (error) {
              console.error("Error unlinking account:", error);
              return res.status(500).json({ error: "Failed to unlink account" });
            }
          } else if (value === 0) {
            try {
              await adminAuth.updateUser(userId, {
                providerToLink: { providerId: "google.com" },
              });
            } catch (error) {
              console.error("Error linking Google account:", error);
              return res.status(500).json({ error: "Failed to link Google account" });
            }
          }
        } else {
          return res.status(400).json({ error: "Invalid connectedAccount value" });
        }
        break;

      default:
        return res.status(400).json({ error: "Invalid field" });
    }

    await userDocRef.update(updateData);
    res.status(200).json({ message: `${field} updated successfully`, [field]: value });
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
    res.status(500).json({ error: `Failed to update ${field}` });
  }
};

// Update User Field (firstName, lastName, and username)
export const updateUserProfile = async (req, res) => {
  const { userId, firstName, lastName, username } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const userDocRef = adminDb.collection("users").doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;

    if (username !== undefined) {
      const usernameExists = await adminDb
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
    const { connectedAccount } = req.body;

    await db.collection("users").doc(userId).update({ connectedAccount });

    const user = auth.currentUser;

    if (connectedAccount === null) {
      // Unlink all providers and set to email/password
      const providers = user.providerData;
      for (const provider of providers) {
        if (provider.providerId !== "password") {
          await user.unlink(provider.providerId);
        }
      }
    } else if (connectedAccount === 0) {
      // Link to Google
      const provider = new GoogleAuthProvider();
      await user.linkWithPopup(provider);
    }

    res.status(200).json({ message: "Connected account updated successfully" });
  } catch (error) {
    console.error("Error updating connected account:", error);
    res.status(500).json({ error: "Failed to update connected account" });
  }
};
