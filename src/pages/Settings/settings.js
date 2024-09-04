import React, { useState } from "react";
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
  Toolbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import "../../css/settings.css";

function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="settings-container">
      {/* App Bar for Tabs */}
      <AppBar position="static" className="app-bar">
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          className="tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#FF894D", // Tab indicator color
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
          <div className="avatar-container">
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
            <div>
              <Button
                variant="contained"
                className="change-photo-btn"
                sx={{
                  background: "linear-gradient(to right, #F54D70, #FF894D)",
                }}
              >
                Change photo
              </Button>
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
