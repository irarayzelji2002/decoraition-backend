import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopy from "@mui/icons-material/ContentCopy";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import DownloadIcon from "@mui/icons-material/Download";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Link, useNavigate } from "react-router-dom";

const DefaultMenu = ({
  onComment,
  onCopyLink,
  onOpenDownloadModal,
  onOpenShareModal,
  onOpenRenameModal,
  onOpenRestoreModal,
  onOpenMakeCopyModal,
  onOpenInfoModal,
  onDelete,
  setIsSidebarOpen,
  onChangeMode,
  onClose,
  onSetting,
}) => {
  return (
    <>
      <MenuItem onClick={onComment}>
        <ListItemIcon>
          <CommentIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Comment" />
      </MenuItem>
      <MenuItem onClick={onOpenShareModal}>
        <ListItemIcon>
          <ShareIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </MenuItem>
      <MenuItem onClick={onCopyLink}>
        <ListItemIcon>
          <ContentCopy sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Copy Link" />
      </MenuItem>
      <MenuItem onClick={setIsSidebarOpen}>
        <ListItemIcon>
          <HistoryIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="History" />
      </MenuItem>
      <MenuItem onClick={onSetting}>
        <ListItemIcon>
          <SettingsIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem onClick={onChangeMode}>
        <ListItemIcon>
          <EditIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Change Mode" />
      </MenuItem>
      <MenuItem onClick={onOpenDownloadModal}>
        <ListItemIcon>
          <DownloadIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </MenuItem>
      <MenuItem onClick={onOpenMakeCopyModal}>
        <ListItemIcon>
          <FileCopyIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Make a Copy" />
      </MenuItem>
      <MenuItem onClick={onOpenRestoreModal}>
        <ListItemIcon>
          <RestoreIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Restore" />
      </MenuItem>
      <MenuItem onClick={onOpenRenameModal}>
        <ListItemIcon>
          <EditIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Rename" />
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <ListItemIcon>
          <DeleteIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>{" "}
      <MenuItem onClick={onOpenInfoModal}>
        <ListItemIcon>
          <InfoIcon sx={{ color: "whitesmoke" }} />
        </ListItemIcon>
        <ListItemText primary="Info" />
      </MenuItem>
    </>
  );
};

export default DefaultMenu;
