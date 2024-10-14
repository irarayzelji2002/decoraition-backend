import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../functions/utils";
import {
  Tabs,
  Tab,
  Avatar,
  Button,
  IconButton,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from "@mui/icons-material";

import Notifications from "./Notifications";
import TopBar from "../../components/TopBar";
import "../../css/settings.css";
import EditableInput from "./EditableInput";
import EditableInputThree from "./EditableInputThree";
import EditablePassInput from "./EditablePassInput";
import LongToggleInput from "./LongToggleInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings({ ...sharedProps }) {
  const user = sharedProps.user;
  const setUser = sharedProps.setUser;

  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null); // Reference for the file input\

  const [userId, setUserId] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLinkAccountModalOpen, setIsLinkAccountModalOpen] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [theme, setTheme] = useState(user.theme || 0);
  const [connectedAccount, setConnectedAccount] = useState(user.connectedAccount || null);
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User is signed in with UID: ${user.uid}`);
        setUserId(user.uid);

        const fetchUserDetails = async (userId) => {
          try {
            console.log(`Fetching document for user ID: ${userId}`);
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log("User data:", userData);
              setUserDetails(userData);
              setAvatarPreview(userData.photoURL || "");
            } else {
              console.error("User document not found");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };

        fetchUserDetails(user.uid);
      } else {
        console.error("No user is signed in");
        // Optionally, redirect to login page
      }
    });

    return () => unsubscribe();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Set the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // Set the avatar preview
      };
      reader.readAsDataURL(file);
      console.log("File uploaded:", file);
    }
  };

  const handleThreeInputsChange = (index, value) => {
    switch (index) {
      case 0:
        setFirstName(value);
        break;
      case 1:
        setLastName(value);
        break;
      case 2:
        setUsername(value);
        break;
      default:
        break;
    }
  };

  const handleSaveThreeInputs = (values) => {
    setFirstName(values[0]);
    setLastName(values[1]);
    setUsername(values[2]);

    handleUpdateUserDetails({
      firstName: values[0],
      lastName: values[1],
      username: values[2],
    });
  };

  // Update firstName, lastName, and username
  const handleUpdateUserDetails = async (updatedFields) => {
    try {
      const response = await axios.post("/api/update-user-profile", {
        userId: user.uid,
        ...updatedFields,
      });

      if (response.status === 200) {
        showToast("Profile updated successfully", "success");
        setUser({ ...user, ...updatedFields });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      showToast("Failed to update user profile", "error");
    }
  };

  // Update theme/ email/ connectedAccount)
  const handleSave = async (field, value) => {
    try {
      const response = await axios.post("/api/update-user-field", {
        userId: user.uid,
        field,
        value,
      });

      if (response.ok) {
        showToast(`${field} updated successfully`, "success");
        setUser({ ...user, [field]: value });
      } else {
        throw new Error("Failed to update user field");
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      showToast(`Failed to update ${field}`, "error");
    }
  };

  const handleLinkAccount = async (provider) => {
    // TO DO: logic to link the account with the chosen provider
    const newConnectedAccount = provider === "google" ? 1 : 0;
    setConnectedAccount(newConnectedAccount);
    await handleSave("connectedAccount", newConnectedAccount);
    setIsLinkAccountModalOpen(false);
  };

  // Update profilePic
  const handleSavePhoto = async () => {
    if (!selectedFile) {
      showToast("Please select a file first", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);
      formData.append("userId", user.uid);

      const response = await axios.post("/api/update-profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        showToast("Profile picture updated successfully", "success");
        setUser({ ...user, photoURL: response.data.photoURL });
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      showToast("Failed to update profile picture", "error");
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 0 ? 1 : 0;
    setTheme(newTheme);
    handleSave("theme", newTheme);
  };

  const handleConnectedAccountToggle = () => {
    setIsLinkAccountModalOpen(true);
  };

  // Update connectedAccount
  const handleConnectedAccountChange = async (value) => {
    try {
      const response = await axios.put(`/api/update-connected-account/${user.uid}`, {
        connectedAccount: value,
      });

      if (response.status === 200) {
        showToast("Connected account updated successfully", "success");
        setUser({ ...user, connectedAccount: value });
      }
    } catch (error) {
      console.error("Error updating connected account:", error);
      showToast("Failed to update connected account", "error");
    }
  };

  // Trigger file input click
  const handleChangePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handlePasswordChange = (index, value) => {
    if (index === 0) {
      setNewPassword(value);
    } else {
      setConfirmNewPassword(value);
    }
  };

  const handlePasswordSave = (values) => {
    setNewPassword(values[0]);
    setConfirmNewPassword(values[1]);
    // Here you would typically call an API to update the password
    handleUpdatePassword({
      newPassword: values[0],
      confirmNewPassword: values[1],
    });
  };

  const handleUpdatePassword = async (passwordData) => {
    try {
      // Call your API endpoint to update the password
      // This is a placeholder and should be replaced with your actual API call
      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        // Password updated successfully
        showToast("Password updated successfully", "success");
      } else {
        // Handle error
        showToast("Failed to update password", "error");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      showToast("An error occurred while updating password", "error");
    }
  };

  return (
    <>
      <TopBar state="Settings" />
      <ToastContainer />
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        className="tabs"
        TabIndicatorProps={{
          style: {
            backgroundImage: "var(--gradientCircle)",

            // Tab indicator color
          },
        }}
        sx={{
          "& .MuiTab-root": {
            color: "var(color-white)", // Color for unselected tabs
          },
          "& .MuiTab-root.Mui-selected": {
            color: "transparent", // Hide the actual text color
            backgroundImage: "var(--gradientCircle)", // Apply background image
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            fontWeight: "bold", // Optional: make text bold to stand out
          },
        }}
      >
        <Tab label="Account" className="tab-label" style={{ textTransform: "none" }} />
        <Tab label="Notification" className="tab-label" style={{ textTransform: "none" }} />
      </Tabs>
      <div className="settings-container">
        {/* App Bar for Tabs */}

        {/* Account Tab Content */}
        {selectedTab === 0 && (
          <Box mt={4} className="tab-content" sx={{ maxWidth: "1200px" }}>
            <div className="avatar-container" style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="User Avatar"
                src={avatarPreview || ""} // Use avatarPreview as the source
                sx={{
                  width: 150,
                  height: 150,
                  marginLeft: "20px",
                  border: "3px solid #FF567D", // Avatar border
                  boxShadow: "0 0 5px 2px rgba(255, 86, 125, 0.5)", // Avatar shadow
                }}
              />

              {/* Button Container */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "auto",
                  marginRight: "20px",
                }}
              >
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {/* Change Photo Button */}
                <Button
                  variant="contained"
                  className="change-photo-btn"
                  onClick={handleChangePhotoClick}
                  sx={{
                    background: "linear-gradient(to right, #F54D70, #FF894D)",
                    marginBottom: "10px",
                  }}
                >
                  Change photo
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  className="save-photo-btn"
                  onClick={handleSavePhoto}
                  sx={{
                    background: "linear-gradient(to right, #4CAF50, #81C784)",
                    marginBottom: "10px",
                  }}
                >
                  Save photo
                </Button>

                {/* Remove Photo Button */}
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  className="remove-photo-btn"
                  sx={{
                    borderColor: "#FF894D",
                    color: "#FF894D",
                    marginLeft: "10px",
                  }}
                >
                  Remove photo
                </Button>
              </div>
            </div>

            {/* Additional Fields */}
            <EditableInputThree
              labels={["First Name", "Last Name", "Username"]}
              values={[firstName, lastName, username]}
              onChange={handleThreeInputsChange}
              onSave={handleSaveThreeInputs}
            />
            <EditableInput
              label="Email"
              value={email}
              onChange={(value) => setEmail(value)}
              onSave={(value) => handleSave("email", value)}
            />
            {/* TO DO: OTP verification before enable isEditing */}
            <EditablePassInput
              labels={["New Password", "Confirm New Password", "Password"]}
              values={[newPassword, confirmNewPassword]}
              onChange={handlePasswordChange}
              onSave={handlePasswordSave}
            />
            {/* TO DO: if not linked, sign in and if success toggle icon*/}
            <LongToggleInput
              label="Connected Account"
              value={connectedAccount}
              onToggle={handleConnectedAccountToggle}
              isConnectedAccount={true}
            />
            <LongToggleInput
              label="Theme"
              value={theme}
              onToggle={handleThemeToggle}
              isConnectedAccount={false}
            />
          </Box>
        )}

        {/* Notification Tab Content */}
        {selectedTab === 1 && (
          <Box mt={4} className="notification-settings">
            <Notifications />
          </Box>
        )}
      </div>{" "}
    </>
  );
}

export default Settings;
