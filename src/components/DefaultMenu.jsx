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
  project,
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
      {!project && (
        <MenuItem onClick={onComment}>
          <ListItemIcon>
            <CommentIcon sx={{ color: "var(--color-white)" }} />
          </ListItemIcon>
          <ListItemText primary="Comment" />
        </MenuItem>
      )}
      <MenuItem onClick={onOpenShareModal}>
        <ListItemIcon>
          <ShareIcon sx={{ color: "var(--color-white)" }} />
        </ListItemIcon>
        <ListItemText primary="Share" />
      </MenuItem>
      <MenuItem onClick={onCopyLink}>
        <ListItemIcon>
          <ContentCopy sx={{ color: "var(--color-white)" }} />
        </ListItemIcon>
        <ListItemText primary="Copy Link" />
      </MenuItem>
      {!project && (
        <MenuItem onClick={setIsSidebarOpen}>
          <ListItemIcon>
            <HistoryIcon sx={{ color: "var(--color-white)" }} />
          </ListItemIcon>
          <ListItemText primary="History" />
        </MenuItem>
      )}
      <MenuItem onClick={onSetting}>
        <ListItemIcon>
          <SettingsIcon sx={{ color: "var(--color-white)" }} />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      {!project && (
        <MenuItem onClick={onChangeMode}>
          <ListItemIcon>
            <EditIcon sx={{ color: "var(--color-white)" }} />
          </ListItemIcon>
          <ListItemText primary="Change Mode" />
        </MenuItem>
      )}
      <MenuItem onClick={onOpenDownloadModal}>
        <ListItemIcon>
          <DownloadIcon sx={{ color: "var(--color-white)" }} />
        </ListItemIcon>
        <ListItemText primary="Download" />
      </MenuItem>
      {!project && (
        <MenuItem onClick={onOpenMakeCopyModal}>
          <ListItemIcon>
            <FileCopyIcon sx={{ color: "var(--color-white)" }} />
          </ListItemIcon>
          <ListItemText primary="Make a Copy" />
        </MenuItem>
      )}
      {!project && (
        <MenuItem onClick={onOpenRestoreModal}>
          <ListItemIcon>
            <RestoreIcon sx={{ color: "var(--color-white)" }} />
          </ListItemIcon>
          <ListItemText primary="Restore" />
        </MenuItem>
      )}
      <MenuItem onClick={onOpenRenameModal}>
        <ListItemIcon>
          <EditIcon sx={{ color: "var(--color-white)" }} />
        </ListItemIcon>
        <ListItemText primary="Rename" />
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <ListItemIcon>
          <DeleteIcon sx={{ color: "var(--color-white)" }} />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>{" "}
      <MenuItem onClick={onOpenInfoModal}>
        <ListItemIcon>
          <InfoIcon sx={{ color: "var(--color-white)" }} />
        </ListItemIcon>
        <ListItemText primary="Details" />
      </MenuItem>
    </>
  );
};

export default DefaultMenu;
