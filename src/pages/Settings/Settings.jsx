import React, { useState, useRef } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import Notifications from "./Notifications";
import TopBar from "../../components/TopBar";
import "../../css/settings.css";

function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null); // Reference for the file input

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
      console.log("File uploaded:", file);
    }
  };

  // Trigger file input click
  const handleChangePhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <TopBar state="Settings" />{" "}
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
        <Tab
          label="Account"
          className="tab-label"
          style={{ textTransform: "none" }}
        />
        <Tab
          label="Notification"
          className="tab-label"
          style={{ textTransform: "none" }}
        />
      </Tabs>
      <div className="settings-container">
        {/* App Bar for Tabs */}

        {/* Account Tab Content */}
        {selectedTab === 0 && (
          <Box mt={4} className="tab-content" sx={{ maxWidth: "1200px" }}>
            <div
              className="avatar-container"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                alt="User Avatar"
                src=""
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

            {["First name", "Last name", "Username", "Email address"].map(
              (label, index) => (
                <TextField
                  key={index}
                  label={label}
                  value=""
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: !isEditing,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleEdit}>
                          <EditIcon sx={{ color: "#FF894D" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      "& .MuiInput-root": {
                        color: "#FF894D",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#FF894D",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#FF894D",
                      },
                    },
                  }}
                />
              )
            )}

            {/* Additional Fields */}
            <TextField
              label="Password"
              value="*******"
              fullWidth
              margin="normal"
              type="password"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => console.log("Edit password")}>
                      <EditIcon sx={{ color: "#FF894D" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Linked account"
              value="Google"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => console.log("Edit linked account")}
                    >
                      <EditIcon sx={{ color: "#FF894D" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Theme"
              value="Dark"
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => console.log("Change theme")}>
                      <BedtimeIcon sx={{ color: "#FF894D" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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

export default SettingsPage;
