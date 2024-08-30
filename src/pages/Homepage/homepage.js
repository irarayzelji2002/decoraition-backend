import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DesignIcon from "../../components/designIcon";
import { Button } from "@mui/material";
import "../../css/homepage.css";
import Drawer from "@mui/material/Drawer";

function Homepage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State for drawer visibility
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      } else {
        setUser(null);
        setUsername("");
      }
    });

    return () => unsubscribe();
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

  return (
    <div>
      <SearchAppBar
        user={user}
        username={username}
        onMenuClick={() => setDrawerOpen(true)} // Open the drawer when menu button is clicked
      />

      {/* Overlay Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "80%", sm: "25%" }, // 80% on mobile, 25% on larger screens
            backgroundColor: "#333", // Background color of the drawer
            color: "white",
            padding: "20px",
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Menu
        </Typography>
        {/* Add any additional menu items or actions here */}
        <Button onClick={handleLogout} sx={{ color: "white" }}>
          Sign Out
        </Button>
        {/* Close button for the drawer */}
        <Button onClick={() => setDrawerOpen(false)} sx={{ color: "white" }}>
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
          <button className="design-button">Create a design</button>
          <button className="project-button">Create a project</button>
          <button className="project-button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>

        <section className="recent-section">
          <div className="recent-designs">
            <h2>Recent Designs</h2>
            <div className="no-content">
              <div className="layout">
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
              </div>

              <img src="/img/design-placeholder.png" alt="No designs yet" />
              <p>No designs yet. Start creating.</p>
            </div>
            <button className="floating-button">+</button>
          </div>

          <div className="recent-projects">
            <h2>Recent Projects</h2>
            <div className="no-content">
              <div className="layout">
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
                <DesignIcon />
              </div>
              <img src="/img/design-placeholder.png" alt="No projects yet" />
              <p>No projects yet. Start creating.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Homepage;

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
                backgroundColor: "#4B4A4B",
                borderRadius: "24px",
                "&:hover": { bgcolor: "transparent", borderRadius: "24px" },
              }}
            />
          </Search>
          {user && username && (
            <Typography variant="body1" sx={{ color: "white", ml: 2 }}>
              Welcome, {username}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
