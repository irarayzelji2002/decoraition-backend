import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ChangeModeMenu = ({ onClose, onBackToMenu }) => {
  return (
    <>
      <MenuItem onClick={onBackToMenu}>
        <ListItemIcon>
          <EditIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Change Mode" />
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemText primary="Editing" />
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemText primary="Commenting" />
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemText primary="View ing" />
      </MenuItem>
    </>
  );
};

export default ChangeModeMenu;
