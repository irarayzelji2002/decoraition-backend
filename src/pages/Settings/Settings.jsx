import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import axios from "axios";
import {
  handleSetError,
  getHasError,
  getErrMessage,
  showToast,
  capitalizeFieldName,
} from "../../functions/utils";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
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
  const { user, userDoc } = sharedProps;
  console.log("sharedProps:", sharedProps);

  const [selectedTab, setSelectedTab] = useState(0);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLinkAccountModalOpen, setIsLinkAccountModalOpen] = useState(false);
  const [isUnlinkAccountModalOpen, setIsUnlinkAccountModalOpen] = useState(false);
  const [isChangeProfileModalOpen, setIsChangeProfileModalOpen] = useState(false);

  const [firstName, setFirstName] = useState(userDoc.firstName ?? "");
  const [lastName, setLastName] = useState(userDoc.lastName ?? "");
  const [username, setUsername] = useState(userDoc.username ?? "");
  const [email, setEmail] = useState(userDoc.email ?? "");
  const [theme, setTheme] = useState(userDoc.theme ?? 0);
  const [connectedAccount, setConnectedAccount] = useState(userDoc.connectedAccount ?? null);
  const [profilePic, setProfilePic] = useState(userDoc.profilePic ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState(0);
  const [unlinkPassword, setUnlinkPassword] = useState("");
  const [unlinkConfirmPassword, setUnlinkConfirmPassword] = useState("");

  const initUserDetailsErr = [
    { field: "firstName", hasError: false, errMessage: "" },
    { field: "lastName", hasError: false, errMessage: "" },
    { field: "username", hasError: false, errMessage: "" },
    { field: "all", hasError: false, errMessage: "" },
  ];

  const initEmailErr = [{ field: "email", hasError: false, errMessage: "" }];

  const initPassErr = [
    { field: "otp", hasError: false, errMessage: "" },
    { field: "oldPassword", hasError: false, errMessage: "" },
    { field: "newPassword", hasError: false, errMessage: "" },
    { field: "confirmNewPassword", hasError: false, errMessage: "" },
    { field: "all", hasError: false, errMessage: "" },
  ];

  const initUnlinkErr = [
    { field: "password", hasError: false, errMessage: "" },
    { field: "confirmPassword", hasError: false, errMessage: "" },
    { field: "all", hasError: false, errMessage: "" },
  ];

  const [userDetailsErr, setUserDetailsErr] = useState(initUserDetailsErr);
  const [emailErr, setEmailErr] = useState(initEmailErr);
  const [passErr, setPassErr] = useState(initPassErr);
  const [unlinkErr, setUnlinkErr] = useState(initUnlinkErr);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleReset = (field) => {
    if (field === "email") {
      setEmail(userDoc.email);
    } else if (field === "firstName") {
      setFirstName(userDoc.firstName);
    } else if (field === "lastName") {
      setLastName(userDoc.lastName);
    } else if (field === "username") {
      setUsername(userDoc.username);
    } else if (field === "theme") {
      setTheme(userDoc.theme);
    } else if (field === "connectedAccount") {
      setConnectedAccount(userDoc.connectedAccount);
    } else if (field === "profilePic") {
      setProfilePic(userDoc.profilePic);
    } else if (field === "newPassword") {
      setNewPassword("");
      setConfirmNewPassword("");
      setOtp(0);
    } else if (field === "otp") {
      setOtp(0);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Set the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Set the avatar preview
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

  const handleSaveThreeInputs = async (values) => {
    const trimmedFirstName = values[0].trim();
    const trimmedLastName = values[1].trim();
    const trimmedUsername = values[2].trim();
    setFirstName(trimmedFirstName);
    setLastName(trimmedLastName);
    setUsername(trimmedUsername);

    setUserDetailsErr(initUserDetailsErr);
    const tempErrors = initUserDetailsErr;
    if (trimmedFirstName === "") {
      tempErrors.find((field) => field.field === "firstName").hasError = true;
      tempErrors.find((field) => field.field === "firstName").errMessage = "This field is required";
    }
    if (trimmedLastName === "") {
      tempErrors.find((field) => field.field === "lastName").hasError = true;
      tempErrors.find((field) => field.field === "lastName").errMessage = "This field is required";
    }
    if (trimmedUsername === "") {
      tempErrors.find((field) => field.field === "username").hasError = true;
      tempErrors.find((field) => field.field === "username").errMessage = "This field is required";
    }
    if (
      trimmedFirstName === userDoc.firstName &&
      trimmedLastName === userDoc.lastName &&
      trimmedUsername === userDoc.username
    ) {
      tempErrors.find((field) => field.field === "all").hasError = true;
      tempErrors.find((field) => field.field === "all").errMessage = "Nothing has changed";
    }

    setUserDetailsErr(tempErrors);
    const hasError = tempErrors.some((field) => field.hasError);
    if (!hasError) {
      const success = await handleUpdateUserDetails({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        username: trimmedUsername,
      });
      return success;
    }
    return false;
  };

  // Update firstName, lastName, and username
  const handleUpdateUserDetails = async (updatedFields) => {
    try {
      console.log("updatedFields passed: ", updatedFields);
      const response = await axios.post(
        "/api/user/user-details",
        {
          userId: userDoc.id,
          ...updatedFields,
        },
        {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );

      if (response.status === 200) {
        showToast("success", "Profile updated successfully");
        return true;
        // setUser({ ...user, ...updatedFields });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      showToast("error", "Failed to update user profile");
      return false;
    }
  };

  // Update theme or email
  const handleSave = async (field, value) => {
    if (field === "email") {
      const trimmedEmail = value.trim();
      setEmail(trimmedEmail);

      setEmailErr(initEmailErr);
      const tempErrors = initEmailErr;
      if (trimmedEmail === "") {
        tempErrors.find((field) => field.field === "email").hasError = true;
        tempErrors.find((field) => field.field === "email").errMessage = "This field is required";
      } else if (trimmedEmail === userDoc.email) {
        tempErrors.find((field) => field.field === "email").hasError = true;
        tempErrors.find((field) => field.field === "email").errMessage = "Email did not change.";
      }

      setEmailErr(tempErrors);
      const hasError = tempErrors.some((field) => field.hasError);
      if (!hasError) {
        const success = await handleUpdateField("email", trimmedEmail);
        return success;
      }
      return false;
    } else if (field === "theme") {
      const success = await handleUpdateField("theme", value);
      return success;
    }
  };

  const handleUpdateField = async (field, value) => {
    try {
      const response = await axios.post(
        "/api/user/update-field",
        {
          userId: userDoc.id,
          field,
          value,
        },
        {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );

      if (response.status === 200) {
        const fieldName = capitalizeFieldName(field);
        if (field === "theme") {
          setTheme(value);
        }
        showToast("success", `${fieldName} updated successfully`);
        return true;
        // setUser({ ...user, [field]: value });
      } else {
        throw new Error("Failed to update user field");
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      showToast("error", `${error.response?.data?.error || `Failed to update ${field}`}`);
      if (error.response?.data?.error === "Email already exists") {
        const tempErrors = emailErr;
        tempErrors.find((field) => field.field === "email").hasError = true;
        tempErrors.find((field) => field.field === "email").errMessage = "Email already exists";
        setEmailErr(tempErrors);
      }
      return false;
    }
  };

  // Update profilePic
  const handleSavePhoto = async () => {
    if (!selectedFile) {
      showToast("error", "Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);
      formData.append("userId", userDoc.id);

      const response = await axios.post("/api/user/profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
      });

      if (response.status === 200) {
        showToast("success", "Profile picture updated successfully");
        // setUser({ ...user, photoURL: response.data.photoURL });
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      showToast("error", "Failed to update profile picture");
    }
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 0 ? 1 : 0;
    // setTheme(newTheme);
    handleSave("theme", newTheme);
  };

  // Update connectedAccount
  const openlinkAccountModal = () => {
    if (!(connectedAccount === 0 || connectedAccount === 1)) {
      setIsLinkAccountModalOpen(true);
    } else {
      reAuthenticateUser();
    }
  };

  const reAuthenticateUser = async () => {
    try {
      if (!user) {
        showToast("error", "User not authenticated");
        return;
      }

      // Reauthenticate the user
      // let reAuthUser;
      // if (connectedAccount === 0) {
      //   const provider = new GoogleAuthProvider();
      //   const result = await reauthenticateWithPopup(user, provider);
      //   reAuthUser = result.user;
      // } else if (connectedAccount === 1) {
      //   const provider = new FacebookAuthProvider();
      //   const result = await reauthenticateWithPopup(user, provider);
      //   reAuthUser = result.user;
      // }
      // if (!reAuthUser) {
      //   showToast("error", "Reauthentication failed");
      //   return;
      // }

      setIsUnlinkAccountModalOpen(true);
    } catch (error) {
      showToast("error", "Failed to reauthenticate user.");
      console.error("Failed to reauthenticate user.", error.code);
    }
  };

  const handleUnlink = async () => {
    try {
      // Password validation
      setUnlinkErr(initUnlinkErr);
      const tempErrors = initUnlinkErr;
      if (!unlinkPassword) {
        tempErrors.find((field) => field.field === "password").hasError = true;
        tempErrors.find((field) => field.field === "password").errMessage =
          "This field is required";
      }
      if (!unlinkConfirmPassword) {
        tempErrors.find((field) => field.field === "confirmPassword").hasError = true;
        tempErrors.find((field) => field.field === "confirmPassword").errMessage =
          "This field is required";
      } else if (unlinkPassword !== unlinkConfirmPassword) {
        tempErrors.find((field) => field.field === "confirmPassword").hasError = true;
        tempErrors.find((field) => field.field === "confirmPassword").errMessage =
          "Password and confirm password does not match";
      }
      setUnlinkErr(tempErrors);
      const hasError = tempErrors.some((field) => field.hasError);
      console.log("tempErrors", tempErrors);
      console.log("hasError", hasError);
      if (hasError) {
        return;
      }

      // After linking email/password, proceed with unlinking Google/Facebook account
      const success = await handleConnectedAccountChange(null);
      if (success) {
        await user.reload();
        setUnlinkPassword("");
        setUnlinkConfirmPassword("");
        setIsUnlinkAccountModalOpen(false);
        setUnlinkErr(initEmailErr);
      }
    } catch (error) {
      setUnlinkPassword("");
      setUnlinkConfirmPassword("");
      setUnlinkErr(initEmailErr);
      console.error("Error unlinking account:", error);
      // Check if the error is related to invalid credentials
      const tempErrors = unlinkErr;
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        tempErrors.find((field) => field.field === "password").hasError = true;
        tempErrors.find((field) => field.field === "password").errMessage = "Incorrect password";
        console.log("Password incorrect, unlink unsuccessful.");
      } else {
        showToast("error", "Failed to unlink account. Please check your password and try again.");
        console.error("Unlink unsuccessful.", error.code);
      }
      setUnlinkErr(tempErrors);
    }
  };

  const handleLinkAccount = async (provider) => {
    try {
      let newConnectedAccount = null;
      if (provider === "google") {
        const acctProvider = new GoogleAuthProvider();
        await user.linkWithPopup(acctProvider);
        newConnectedAccount = 0;
      } else if (provider === "facebook") {
        const acctProvider = new FacebookAuthProvider();
        await user.linkWithPopup(acctProvider);
        newConnectedAccount = 1;
      }
      handleConnectedAccountChange(newConnectedAccount);
    } catch (error) {
      console.error("Error unlinking account:", error);
      showToast("error", "Failed to link account.");
    }
  };

  const handleConnectedAccountChange = async (value) => {
    const previousValue = connectedAccount;
    try {
      const response = await axios.put(
        `/api/user/connected-account/${userDoc.id}`,
        { connectedAccount: value, oldConnectedAccount: userDoc.connectedAccount },
        {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );

      if (response.status === 200) {
        showToast("success", response?.data?.message || "Account updated successfully");
        setIsLinkAccountModalOpen(false);
        setIsUnlinkAccountModalOpen(false);
        setConnectedAccount(value);
        return true;
        // setUser({ ...user, connectedAccount: value });
      }
    } catch (error) {
      console.error("Error updating connected account:", error);
      showToast("error", error.response?.data?.error || "Failed to update account");
      setConnectedAccount(previousValue);
      return false;
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
      const response = await axios.post(
        "/api/user/update-password",
        {
          userId: userDoc.id,
          ...passwordData,
        },
        { headers: { Authorization: `Bearer ${await user.getIdToken()}` } }
      );

      if (response.status === 200) {
        // Password updated successfully
        showToast("success", "Password updated successfully");
      } else {
        // Handle error
        showToast("error", "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      showToast("error", "An error occurred while updating password");
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
                src={profilePic || ""}
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
              origValues={[userDoc.firstName, userDoc.lastName, userDoc.username]}
              onChange={handleThreeInputsChange}
              onSave={handleSaveThreeInputs}
              errors={userDetailsErr}
              setErrors={setUserDetailsErr}
            />
            <EditableInput
              label="Email"
              value={email}
              onChange={(value) => setEmail(value)}
              onSave={(value) => handleSave("email", value)}
              onReset={handleReset}
              errors={emailErr}
              isEditable={connectedAccount == null ? true : false}
            />
            {/* TO DO: OTP verification before enable isEditing */}
            <EditablePassInput
              labels={["New Password", "Confirm New Password", "Password"]}
              values={[newPassword, confirmNewPassword]}
              onChange={handlePasswordChange}
              onSave={handlePasswordSave}
              errors={passErr}
              setErrors={setPassErr}
              isEditable={connectedAccount == null ? true : false}
            />
            {/* TO DO: if not linked, sign in and if success toggle icon*/}
            <LongToggleInput
              label="Connected Account"
              value={connectedAccount}
              onToggle={openlinkAccountModal}
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
            <Notifications {...sharedProps} />
          </Box>
        )}
      </div>{" "}
      {isLinkAccountModalOpen && (
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <button onClick={() => handleLinkAccount("google")}>Google</button>
          <button onClick={() => handleLinkAccount("facebook")}>Facebook</button>
          <br />
          <button onClick={() => setIsLinkAccountModalOpen(false)}>Cancel</button>
        </div>
      )}
      {isUnlinkAccountModalOpen && (
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <div>Enter new password</div>
          <label htmlFor="unlinkPassword">Password:</label>
          <br />
          <input
            type="password"
            id="unlinkPassword"
            value={unlinkPassword}
            onChange={(e) => setUnlinkPassword(e.target.value)}
          />
          <span style={{ color: "#ff0000" }}>{getErrMessage("password", unlinkErr)}</span>
          <br />
          <label htmlFor="unlinkConfirmPassword">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="unlinkConfirmPassword"
            value={unlinkConfirmPassword}
            onChange={(e) => setUnlinkConfirmPassword(e.target.value)}
          />
          <span style={{ color: "#ff0000" }}>{getErrMessage("confirmPassword", unlinkErr)}</span>
          <br />
          <button onClick={handleUnlink}>
            Unlink {connectedAccount === 0 ? "Google" : "Facebook"} Account
          </button>
          <br />
          <button onClick={() => setIsUnlinkAccountModalOpen(false)}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default Settings;
