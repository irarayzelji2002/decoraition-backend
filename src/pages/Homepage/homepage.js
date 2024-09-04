import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import DesignIcon from "../../components/DesignIcon.js";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FolderIcon from "@mui/icons-material/Folder";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import "../../css/homepage.css";
import { query, where, onSnapshot } from "firebase/firestore";

function Homepage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [projects, setProjects] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const designsRef = collection(db, "users", user.uid, "designs");
        const q = query(designsRef, where("createdAt", ">", new Date(0))); // Example query

        const unsubscribeDesigns = onSnapshot(q, (querySnapshot) => {
          const designList = [];
          querySnapshot.forEach((doc) => {
            designList.push({ id: doc.id, ...doc.data() });
          });
          setDesigns(designList);
        });

        return () => unsubscribeDesigns();
      } else {
        setUser(null);
        setDesigns([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div>
      <SearchAppBar
        user={user}
        username={username}
        onMenuClick={() => setDrawerOpen(true)}
      />

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "80%", sm: "25%" },
            backgroundColor: darkMode ? "#121212" : "#1E1D21",
            color: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
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
              <BedtimeIcon />
            </IconButton>
            <IconButton sx={{ color: "white", marginLeft: "16px" }}>
              <NotificationsIcon />
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
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body1">{username}</Typography>
          <Typography variant="caption">{user ? user.email : ""}</Typography>
        </div>
        <Divider sx={{ backgroundColor: "gray", my: 2 }} />
        <List>
          <ListItem>
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhotoLibraryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Design" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FolderIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <Divider sx={{ backgroundColor: "gray", my: 2 }} />
          <Typography variant="body2" sx={{ paddingLeft: 2, marginBottom: 1 }}>
            Recent Designs
          </Typography>

          <ListItem>
            <ListItemText primary="Recent Design 1" />
            <IconButton edge="end" aria-label="more">
              <MoreHorizIcon sx={{ color: "white" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemText primary="Recent Design 2" />
            <IconButton edge="end" aria-label="more">
              <MoreHorizIcon sx={{ color: "white" }} />
            </IconButton>
          </ListItem>
          <ListItem>
            <ListItemText primary="Recent Design 3" />
            <IconButton edge="end" aria-label="more">
              <MoreHorizIcon sx={{ color: "white" }} />
            </IconButton>
          </ListItem>

          <Divider sx={{ backgroundColor: "gray", my: 2 }} />

          <Typography variant="body2" sx={{ paddingLeft: 2, marginBottom: 1 }}>
            Recent Projects
          </Typography>
          <ListItem button>
            <ListItemText primary="Recent Project 1" />
            <IconButton edge="end" aria-label="more">
              <MoreHorizIcon sx={{ color: "white" }} />
            </IconButton>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Recent Project 2" />
            <IconButton edge="end" aria-label="more">
              <MoreHorizIcon sx={{ color: "white" }} />
            </IconButton>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Recent Project 3" />
            <IconButton edge="end" aria-label="more">
              <MoreHorizIcon sx={{ color: "white" }} />
            </IconButton>
          </ListItem>

          <Divider sx={{ backgroundColor: "gray", my: 2 }} />

          {/* Settings Menu Item */}
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </List>

        <Button
          onClick={() => setDrawerOpen(false)}
          sx={{ color: "white", mt: 2, marginBottom: "36px" }}
        >
          Close
        </Button>
      </Drawer>

      <div className={`content ${isDrawerOpen ? "dimmed" : ""}`}>
        <div className="header">
          <img
            style={{
              height: "100px",
              paddingTop: "18px",
              marginRight: "14px",
            }}
            src="/img/Logo-Colored.png"
            alt="logo"
          />
          <h1 className="navName">DecorAItion</h1>
        </div>

        <div className="action-buttons">
          <button className="design-button" onClick={() => navigate("/design")}>
            Create a design
          </button>
          <button
            className="project-button"
            onClick={() => navigate("/project")}
          >
            Create a project
          </button>
        </div>

        <section className="recent-section">
          <div className="recent-designs">
            <h2>Recent Designs</h2>
            <div className="layout">
              {designs.length > 0 ? (
                designs.map((design) => (
                  <DesignIcon key={design.id} name={design.name} />
                ))
              ) : (
                <div className="no-content">
                  <img src="/img/design-placeholder.png" alt="No designs yet" />
                  <p>No designs yet. Start creating.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;

// SearchAppBar component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function SearchAppBar({ user, username, onMenuClick }) {
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            className="navName"
          >
            <img
              style={{
                height: "28px",
                paddingTop: "18px",
              }}
              src="/img/Logo-Colored.png"
              alt="logo"
            />
          </Typography>
          <Search
            sx={{
              backgroundColor: "rgb(27, 27, 27)",
              width: "92% !important",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "whitesmoke !important" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                backgroundColor: "rgb(27, 27, 27)",
                color: "whitesmoke !important",
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
