import React, { useState, useEffect, useRef } from "react";
import { Drawer, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import Notif from "./Notif";

const DrawerComponent = ({ isDrawerOpen, onClose }) => {
  // State to handle dark mode
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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

  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "80%", sm: "25%" },
          minWidth: "300px",
          backgroundColor: darkMode
            ? "var(--bgMain)"
            : "var(--nav-card-modal )",
          color: darkMode ? "white" : "black",
          padding: "16px",
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
            spaceBetween: "space-between",
          }}
        >
          <ArrowBackIos onClick={onClose} />
          <h2
            style={{
              color: "var(--color-white)",
              fontSize: "1.25em",
              width: "auto",
            }}
          >
            Notifications
          </h2>
          <h3 className="mark-read">Mark all as read</h3>
        </div>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundImage: "var(--gradientFont)", // Customize the indicator color
            },
          }}
        >
          <Tab
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              color:
                activeTab === 0 ? "var(--brightFont)" : "var(--color-white)",

              "&.Mui-selected": {
                color: "transparent", // Hide the actual text color
                backgroundImage: "var(--gradientFont)", // Apply background image
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                fontWeight: "bold", // Optional: make text bold to stand out
              },
            }}
            label="All"
          />
          <Tab
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              color:
                activeTab === 1 ? "var(--brightFont)" : "var(--color-white)",
              "&:focus": {
                outline: "none",
                backgroundColor: "transparent",
              },
              "&:active": {
                outline: "none",
                backgroundColor: "transparent",
              },

              "&.Mui-selected": {
                color: "transparent", // Hide the actual text color
                backgroundImage: "var(--gradientFont)", // Apply background image
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                fontWeight: "bold",
              },
            }}
            label="Mentions"
          />
        </Tabs>{" "}
        {activeTab === 0 && (
          <>
            <Notif />
            <Notif />
            <Notif />
          </>
        )}
        {activeTab === 1 && (
          <>
            <Notif />
            <Notif />
          </>
        )}
      </div>
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
