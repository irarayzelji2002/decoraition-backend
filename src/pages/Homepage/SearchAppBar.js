import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

const SearchAppBar = ({ user, username, onMenuClick }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          zIndex: 1200,
          backgroundColor: "transparent",
          boxShadow: "none",
          paddingTop: "10px",
        }}
      >
        <Toolbar sx={{ backgroundColor: "transparent" }}>
          <IconButton
            size="large"
            edge="start"
            color="var(--color-white)"
            aria-label="open drawer"
            sx={{ mr: 2, backgroundColor: "transparent" }}
            onClick={onMenuClick} // Open drawer on click
          >
            <MenuIcon sx={{ color: "var(--color-white)" }} />
          </IconButton>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "24px",

              backgroundColor: "var(--inputBg)",
            }}
          >
            <IconButton
              type="button"
              sx={{ p: "10px", color: "var(--color-white)" }}
              aria-label="search"
            >
              <SearchIcon sx={{ color: "var(--color-white)" }} />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, color: "var(--color-white)" }}
              placeholder="Search Item"
              inputProps={{ "aria-label": "search google maps" }}
            />
          </Paper>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;
