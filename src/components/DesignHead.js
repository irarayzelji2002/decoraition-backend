import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  TextField,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ContentCopy from "@mui/icons-material/ContentCopy";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import DownloadIcon from "@mui/icons-material/Download";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import "../css/design.css";

function DesignHead({ toggleComments }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleCommentDrawer = () => {
    setIsCommentDrawerOpen((prevState) => !prevState);
  };

  return (
    <div className="designHead stickyMenu">
      <div className="left">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ backgroundColor: "transparent", marginTop: "6px" }}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <p className="headTitle">Project Title</p>
      </div>
      <div className="right">
        <IconButton onClick={toggleComments}>
          <CommentIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
        <IconButton>
          <ShareIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
        <IconButton onClick={handleClick}>
          <MoreVertIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: "#27262C",
              color: "white",
              minWidth: "200px",
            },
          }}
        >
          {/* Menu items */}
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <CommentIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Comment" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ShareIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Share" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <ContentCopy sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Copy Link" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <HistoryIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="History" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Change mode" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DownloadIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Download" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <FileCopyIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Make a Copy" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <RestoreIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Restore" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Rename" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <InfoIcon sx={{ color: "whitesmoke" }} />
            </ListItemIcon>
            <ListItemText primary="Details" />
          </MenuItem>
        </Menu>
      </div>

      {/* Comment Drawer */}
      <Drawer
        anchor="right"
        open={isCommentDrawerOpen}
        onClose={toggleCommentDrawer}
        PaperProps={{
          sx: {
            width: "350px",
            backgroundColor: "#27262C",
            color: "whitesmoke",
          },
        }}
      >
        <div className="commentSection" style={{ padding: "20px" }}>
          <h4>Comments</h4>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add a comment..."
            variant="outlined"
            sx={{ marginBottom: "16px", backgroundColor: "white" }}
          />
          <Button variant="contained" color="primary" fullWidth>
            Post Comment
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default DesignHead;
