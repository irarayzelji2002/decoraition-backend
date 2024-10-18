import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSharedProps } from "../../contexts/SharedPropsContext";
import {
  fetchUserDesigns,
  fetchUserProjects,
  handleCreateDesign,
  handleCreateProject,
  handleDeleteDesign,
  handleDeleteProject,
  handleViewChange,
  toggleDarkMode,
  toggleMenu,
  formatDate,
} from "./backend/HomepageActions";

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
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FolderIcon from "@mui/icons-material/Folder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const DrawerComponent = ({ isDrawerOpen, onClose }) => {
  const { user, userDoc, handleLogout, designs, setDesigns } = useSharedProps();

  // State to handle dark mode
  const initDarkMode = userDoc?.theme === 0 ? true : false;
  const [darkMode, setDarkMode] = useState(initDarkMode);
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const optionsRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setActiveItem(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <IconButton
            sx={{ color: "white" }}
            onClick={() => toggleDarkMode(user, userDoc?.id, darkMode, setDarkMode)}
          >
            {darkMode ? (
              <DarkModeIcon sx={{ color: "var(--color-white)" }} />
            ) : (
              <LightModeIcon sx={{ color: "var(--color-black)" }} />
            )}
          </IconButton>
          <IconButton sx={{ color: "white", marginLeft: "16px" }}>
            <NotificationsIcon
              sx={{ color: darkMode ? "var(--color-white)" : "var(--color-black)" }}
            />
          </IconButton>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={userDoc?.profilePic || ""}
        >
          {userDoc?.username ? userDoc?.username.charAt(0).toUpperCase() : ""}
        </Avatar>
        <Typography variant="body1">{userDoc?.username || "Guest"}</Typography>
        <Typography variant="caption">{userDoc?.email || "No email"}</Typography>
      </div>
      <Divider sx={{ backgroundColor: "gray", my: 2 }} />
      <List>
        <ListItem onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          <ListItemIcon>
            <HomeIcon sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem onClick={() => navigate("/seeAllDesigns")} sx={{ cursor: "pointer" }}>
          <ListItemIcon>
            <PhotoLibraryIcon sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Design" />
        </ListItem>
        <ListItem onClick={() => navigate("/seeAllProjects")} sx={{ cursor: "pointer" }}>
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
          designs.slice(0, 5).map((design, index) => (
            <ListItem
              key={design.id}
              button
              onClick={() =>
                navigate(`/design/${design.id}`, {
                  state: { designId: design.id },
                })
              }
            >
              <ListItemText primary={design.name} />
              <IconButton
                edge="end"
                aria-label="more"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the ListItem onClick from firing
                  setActiveItem(index);
                }}
              >
                <MoreHorizIcon sx={{ color: darkMode ? "white" : "black" }} />
              </IconButton>
              {activeItem === index && (
                <div ref={optionsRef} className="dropdown-menu">
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      navigate(`/design/${design.id}`, {
                        state: { designId: design.id },
                      })
                    }
                  >
                    <span className="icon"></span> Open
                  </div>
                  <div className="dropdown-item">
                    <span className="icon"></span> Delete
                  </div>
                  <div className="dropdown-item">
                    <span className="icon"></span> Copy Link
                  </div>
                  <div className="dropdown-item">
                    <span className="icon"></span> Rename
                  </div>
                </div>
              )}
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No recent designs" />
          </ListItem>
        )}

        <Divider sx={{ backgroundColor: "gray", my: 2 }} />

        {/* Settings Menu Item */}
        <ListItem button onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={() => handleLogout(navigate)}>
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
