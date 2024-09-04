import React, { useState, useRef } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Avatar,
  Button,
  IconButton,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
    <div className="settings-container">
      <AppBar position="static" className="app-bar">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          className="tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#FF894D",
            },
          }}
        >
          <Tab label="Account" className="tab-label" />
          <Tab
            label="Notification"
            icon={<NotificationsIcon />}
            className="tab-label"
          />
        </Tabs>
      </AppBar>

      {/* Account Tab Content */}
      {selectedTab === 0 && (
        <Box mt={4} className="tab-content">
          <div
            className="avatar-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Avatar
              alt="User Avatar"
              src=""
              sx={{
                width: 80,
                height: 80,
                marginRight: "20px",
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
                className="remove-photo-btn"
                sx={{
                  borderColor: "#FF894D",
                  color: "#FF894D",
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
                        <EditIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
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
                    <EditIcon />
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
                    <EditIcon />
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
                    <BedtimeIcon />
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
          <Typography variant="h6">Notification Settings</Typography>
          <Typography>..l</Typography>
        </Box>
      )}
    </div>
  );
}

export default SettingsPage;
