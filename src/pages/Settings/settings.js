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
import Brightness4Icon from "@mui/icons-material/Brightness4";
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
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Account" />
          <Tab label="Notification" icon={<NotificationsIcon />} />
        </Tabs>
      </AppBar>

      {/* Account Tab Content */}
      {selectedTab === 0 && (
        <Box mt={4}>
          <div className="avatar-container">
            <Avatar
              alt="User Avatar"
              src=""
              sx={{ width: 80, height: 80, marginRight: "20px" }}
            />
            <div>
              <Button
                variant="contained"
                className="change-photo-btn"
                color="secondary"
              >
                Change photo
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Remove photo
              </Button>
            </div>
          </div>

          <TextField
            label="First name"
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
          <TextField
            label="Last name"
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
          <TextField
            label="Username"
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
          <TextField
            label="Email address"
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
                    <Brightness4Icon />
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

export function SearchAppBar({ onMenuClick }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ zIndex: 1200 }}>
        <Toolbar sx={{ backgroundColor: "#1E1D21" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, backgroundColor: "transparent" }}
            onClick={onMenuClick} // Open drawer on click
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default SettingsPage;
