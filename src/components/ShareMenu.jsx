import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopy from "@mui/icons-material/ContentCopy";

const ShareMenu = ({ onClose, onBackToMenu, onOpenShareModal }) => {
  return (
    <>
      <MenuItem onClick={onBackToMenu}>
        <ListItemIcon>
          <ArrowBackIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </MenuItem>
      <MenuItem onClick={onOpenShareModal}>
        <ListItemText primary="Add Collaborators" />
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemText primary="Manage Access" />
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <ContentCopy sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Copy Link" />
      </MenuItem>
    </>
  );
};

export default ShareMenu;
