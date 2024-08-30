import React, { useState, useEffect } from "react";
import Search from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import "../../css/homepage.css";
function Settings() {
  return (
    <div>
      <SearchAppBar />
    </div>
  );
}

export default Settings;

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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
