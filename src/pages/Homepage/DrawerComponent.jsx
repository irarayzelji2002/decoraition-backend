import React, { useState, useEffect, useRef } from "react";
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
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ArrowBackIos } from "@mui/icons-material";
import {
  fetchUserData,
  fetchDesigns,
  fetchProjects,
} from "./backend/HomepageFunctions.jsx";
import {
  DesignIcn,
  Home,
  LogoutIcn,
  ProjectIcn,
  SettingsIcn,
} from "./svg/DesignSvg.jsx";

const DrawerComponent = ({ isDrawerOpen, onClose }) => {
  // State to handle dark mode
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleAuthChange = async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user, setUsername, setUser);
        await fetchDesigns(user.uid, setDesigns);
        await fetchProjects(user.uid, setProjects);
      } else {
        setUser(null);
        setDesigns([]);
        setProjects([]);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, handleAuthChange);

    return () => unsubscribeAuth();
  }, []);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setActiveItem(null);
    }
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setActiveProject(null);
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
          backgroundColor: darkMode
            ? "var(--bgMain)"
            : "var(--nav-card-modal )",
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
            alignItems: "center",
            marginBottom: "20px",
            spaceBetween: "space-between",
          }}
        >
          <ArrowBackIos onClick={onClose} />
          <h2
            className="navName"
            style={{
              fontSize: "1.75em",
              marginTop: "-16px",
              width: "60%",
            }}
          >
            DecorAItion
          </h2>
          <IconButton
            sx={{ color: "white", marginLeft: "6px" }}
            onClick={toggleDarkMode}
          >
            <BedtimeIcon sx={{ color: "var(--color-white)" }} />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <NotificationsIcon sx={{ color: "var(--color-white)" }} />
          </IconButton>
        </div>
      </div>

      <div className="drawerUser">
        <Avatar
          sx={{
            width: 56,
            height: 56,
            marginBottom: "10px",
          }}
          src={user?.profilePicture || ""}
        >
          {username ? username.charAt(0).toUpperCase() : ""}
        </Avatar>
        <div>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            {username || "Guest"}
          </Typography>
          <Typography variant="caption">{user?.email || "No email"}</Typography>
        </div>
      </div>
      <List>
        <ListItem
          onClick={() => navigate("/homepage")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          onClick={() => navigate("/seeAllDesigns")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <DesignIcn />
          </ListItemIcon>
          <ListItemText primary="Design" />
        </ListItem>
        <ListItem
          onClick={() => navigate("/seeAllProjects")}
          sx={{ cursor: "pointer" }}
        >
          <ListItemIcon>
            <ProjectIcn />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
        <Divider sx={{ backgroundColor: "gray", my: 2 }} />
        <Typography
          variant="body2"
          sx={{
            paddingLeft: 2,
            marginBottom: 1,
            fontWeight: "bold",
            opacity: 0.8,
          }}
        >
          Recent Designs
        </Typography>

        {designs.length > 0 ? (
          designs.slice(0, 3).map((design, index) => (
            <ListItem
              key={design.id}
              button
              onClick={() =>
                navigate(`/design/${design.id}`, {
                  state: { designId: design.id },
                })
              }
            >
              <div className="miniThumbnail" />
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
        <Typography
          variant="body2"
          sx={{
            paddingLeft: 2,
            marginBottom: 1,
            fontWeight: "bold",
            opacity: 0.8,
          }}
        >
          Recent Projects
        </Typography>

        {projects.length > 0 ? (
          projects.slice(0, 3).map((project, index) => (
            <ListItem
              key={project.id}
              button
              onClick={() =>
                navigate(`/project/${project.id}`, {
                  state: { projectId: project.id },
                })
              }
            >
              <div className="miniThumbnail" />
              <ListItemText primary={project.name} />
              <IconButton
                edge="end"
                aria-label="more"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the ListItem onClick from firing
                  setActiveProject(index);
                }}
              >
                <MoreHorizIcon sx={{ color: darkMode ? "white" : "black" }} />
              </IconButton>
              {activeProject === index && (
                <div ref={optionsRef} className="dropdown-menu">
                  <div
                    className="dropdown-item"
                    onClick={() =>
                      navigate(`/project/${project.id}`, {
                        state: { projectId: project.id },
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
            <SettingsIcn />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcn />
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
