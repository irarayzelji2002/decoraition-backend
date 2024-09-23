import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FolderIcon from "@mui/icons-material/Folder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const DrawerComponent = ({
  isDrawerOpen,
  onClose,
  handleLogout,
  handleSettings,
  username = "", // Default to empty string
  userEmail = "", // Default to empty string
  designs = [], // Default to empty array
}) => {
  // State to handle dark mode
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.add("light-mode");
    } else {
      setDarkMode(true);
      document.documentElement.classList.remove("light-mode");
    }
  }, []);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "80%", sm: "25%" },
          backgroundColor: darkMode ? "#121212" : "#f0f0f0",
          color: darkMode ? "white" : "black",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        },
        "& .MuiDrawer-paper::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <IconButton sx={{ color: "white" }} onClick={toggleDarkMode}>
            <BedtimeIcon sx={{ color: "var(--color-white)" }} />
          </IconButton>
          <IconButton sx={{ color: "white", marginLeft: "16px" }}>
            <NotificationsIcon sx={{ color: "var(--color-white)" }} />
          </IconButton>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar
          sx={{
            bgcolor: "gray",
            width: 56,
            height: 56,
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {username ? username.charAt(0).toUpperCase() : ""}
        </Avatar>
        <Typography variant="body1">{username || "Guest"}</Typography>
        <Typography variant="caption">{userEmail || "No email"}</Typography>
      </div>
      <Divider sx={{ backgroundColor: "gray", my: 2 }} />
      <List>
        <ListItem>
          <ListItem button onClick={() => navigate("/")}>
            <ListItemIcon>
              <HomeIcon sx={{ color: darkMode ? "white" : "black" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PhotoLibraryIcon sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Design" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FolderIcon sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        <Divider sx={{ backgroundColor: "gray", my: 2 }} />
        <Typography variant="body2" sx={{ paddingLeft: 2, marginBottom: 1 }}>
          Recent Designs
        </Typography>

        {designs.length > 0 ? (
          designs.slice(0, 5).map((design) => (
            <ListItem key={design.id}>
              <ListItemText primary={design.name} />
              <IconButton edge="end" aria-label="more">
                <MoreHorizIcon sx={{ color: darkMode ? "white" : "black" }} />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No recent designs" />
          </ListItem>
        )}

        <Divider sx={{ backgroundColor: "gray", my: 2 }} />

        {/* Settings Menu Item */}
        <ListItem button onClick={handleSettings}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>

      <Button
        onClick={onClose}
        sx={{
          color: darkMode ? "white" : "black",
          mt: 2,
          marginBottom: "36px",
        }}
      >
        Close
      </Button>
    </Drawer>
  );
};

export default DrawerComponent;
