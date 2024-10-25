import React, { useState, useRef, useEffect } from "react";
import { Tabs, Tab, Avatar, Button, Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
import Notifications from "./Notifications";
import TopBar from "../../components/TopBar";
import "../../css/settings.css";
import EditableInput from "./EditableInput";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase";
import LinkIcon from "@mui/icons-material/Link";

function Settings() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null); // Reference for the file input\
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const [userId, setUserId] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

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
  const handleInputChange = (field) => (event) => {
    setUserDetails({
      ...userDetails,
      [field]: event.target.value,
    });
  };

  const handleSave = async () => {
    if (userId) {
      try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, userDetails);
        toast.success(`Details updated successfully`, {
          className: "custom-toast-success", // Apply custom class name
        });
        setIsEditing(false); // Exit editing mode after saving
      } catch (error) {
        toast.error(`Error updating details: ${error.message}`, {
          className: "custom-toast-success", // Apply custom class name
        });
      }
    }
  };

  const handleSavePhoto = async () => {
    if (selectedFile && userId) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `avatars/${userId}`);
        await uploadBytes(storageRef, selectedFile);
        const photoURL = await getDownloadURL(storageRef);

        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          photoURL,
        });
        toast.success("Photo updated successfully");
      } catch (error) {
        console.error("Error updating photo:", error);
      }
    }
  };

  const changePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedPhoto(URL.createObjectURL(event.target.files[0]));
      setImageUploaded(true);
    }
  };
  const handleCombinedChange = (event) => {
    handleFileChange(event);
    changePhoto(event);
  };

  // Trigger file input click
  const handleChangePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleRemovePhoto = () => {
    setUploadedPhoto(null);
    setImageUploaded(false);
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
            fontWeight: "bold",
            backgroundImage: "var(--gradientFont)",

            // Tab indicator color
          },
        }}
        sx={{
          "& .MuiTab-root": {
            color: "var(--color-white)", // Color for unselected tabs
          },
          "& .MuiTab-root.Mui-selected": {
            color: "transparent", // Hide the actual text color
            backgroundImage: "var(--gradientFont)", // Apply background image
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            fontWeight: "bold", // Optional: make text bold to stand out
          },
        }}
      >
        <Tab
          label="Account"
          className="tab-label"
          style={{ textTransform: "none", fontWeight: "bold" }}
        />
        <Tab
          label="Notification"
          className="tab-label"
          style={{ textTransform: "none", fontWeight: "bold" }}
        />
      </Tabs>
      <div className="settings-container">
        {/* App Bar for Tabs */}

        {/* Account Tab Content */}
        {selectedTab === 0 && (
          <Box mt={4} className="tab-content" sx={{ minWidth: "100%" }}>
            <div
              className="avatar-container"
              style={{ display: "flex", alignItems: "center" }}
            >
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
                  onChange={handleCombinedChange}
                />

                {/* Change Photo Button */}
                <Button
                  variant="contained"
                  className="change-photo-btn"
                  onClick={handleChangePhotoClick}
                  sx={{
                    marginBottom: "10px",
                    borderRadius: "20px",
                    textTransform: "none",
                    fontWeight: "bold",
                    width: "150px",
                    "&:hover": {
                      background: "var(--gradientButtonHover)",
                    },
                  }}
                >
                  Change photo
                </Button>
                {imageUploaded && (
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
                )}

                {/* Remove Photo Button */}
                <Button
                  sx={{
                    background: "transparent",
                    border: "2px solid transparent",
                    borderRadius: "20px",
                    backgroundImage:
                      "var(--lightGradient), var(--gradientButton)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: "150px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundImage =
                      "var(--lightGradient), var(--gradientButtonHover)")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundImage =
                      "var(--lightGradient), var(--gradientButton)")
                  }
                >
                  Remove photo
                </Button>
              </div>
            </div>

            {/* Edit/Save Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={
                  isEditing ? (
                    <SaveIcon sx={{ color: "#FF894D" }} />
                  ) : (
                    <EditIcon sx={{ color: "#FF894D" }} />
                  )
                }
                onClick={isEditing ? handleSave : toggleEdit}
                className="invisible-button"
              ></Button>
            </div>

            {/* Additional Fields */}
            <div className="inputField">
              <label className="inputLabel">First Name</label>
              <EditableInput
                fieldName="First Name"
                value={userDetails.firstName}
                onChange={handleInputChange("firstName")}
                isEditing={isEditing}
                single={true}
              />
            </div>
            <div className="inputField">
              <label className="inputLabel">Last Name</label>
              <EditableInput
                fieldName="Last Name"
                value={userDetails.lastName}
                onChange={handleInputChange("lastName")}
                isEditing={isEditing}
                single={true}
              />
            </div>
            <div className="inputField">
              <label className="inputLabel">Username</label>
              <EditableInput
                fieldName="Username"
                value={userDetails.username}
                onChange={handleInputChange("username")}
                isEditing={isEditing}
                single={true}
              />
            </div>

            <div className="inputFieldImportant">
              <label className="inputLabel">Email</label>
              <EditableInput
                fieldName="Email"
                value={userDetails.email}
                onChange={handleInputChange("email")}
                // isEditing={isEditing}
              />
            </div>
            <div className="inputFieldImportant">
              <label className="inputLabel">Password</label>
              <EditableInput
                fieldName="Password"
                value="*************"
                // isEditing={isEditing}
              />
            </div>
            <div className="inputFieldImportant">
              <label className="inputLabel">Linked Account</label>
              <EditableInput
                fieldName="Password"
                value="None"
                linked
                // isEditing={isEditing}
              />
            </div>
            <div className="inputFieldImportant">
              <label className="inputLabel">Theme</label>
              <EditableInput
                fieldName="Password"
                value="Light Mode"
                theme
                // isEditing={isEditing}
              />
            </div>
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
