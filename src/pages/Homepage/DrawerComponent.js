import React from "react";
import { styled, alpha } from "@mui/material/styles";
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
import MenuIcon from "@mui/icons-material/Menu";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FolderIcon from "@mui/icons-material/Folder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import InputBase from "@mui/material/InputBase";
import DesignIcon from "../../components/DesignIcon.js";

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

const DrawerComponent = ({
  isDrawerOpen,
  onClose,
  toggleDarkMode,
  handleLogout,
  darkMode,
  username,
  userEmail,
  designs,
}) => {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={onClose}
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
        <Typography variant="caption">{userEmail}</Typography>
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

        {designs.length > 0 ? (
          designs.map((design) => (
            <ListItem key={design.id}>
              <ListItemText primary={design.name} />
              <IconButton edge="end" aria-label="more">
                <MoreHorizIcon sx={{ color: "white" }} />
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
        onClick={onClose}
        sx={{ color: "white", mt: 2, marginBottom: "36px" }}
      >
        Close
      </Button>
    </Drawer>
  );
};

export default DrawerComponent;
