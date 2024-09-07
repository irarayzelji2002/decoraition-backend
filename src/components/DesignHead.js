import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Checkbox,
  Select,
  MenuItem as DropdownItem,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../css/design.css";

function DesignHead({ toggleComments }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isChangeModeMenuOpen, setIsChangeModeMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareConfirmationModalOpen, setIsShareConfirmationModalOpen] =
    useState(false);
  const [isCopyLinkModalOpen, setIsCopyLinkModalOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [role, setRole] = useState("Editor");
  const [notifyPeople, setNotifyPeople] = useState(true);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsShareMenuOpen(false);
    setIsChangeModeMenuOpen(false);
  };

  const toggleCommentDrawer = () => {
    setIsCommentDrawerOpen((prevState) => !prevState);
  };

  const handleShareClick = () => {
    setIsShareMenuOpen(true);
  };

  const handleChangeModeClick = () => {
    setIsChangeModeMenuOpen(true);
  };

  const handleBackToMenu = () => {
    setIsShareMenuOpen(false);
    setIsChangeModeMenuOpen(false);
  };

  const handleOpenShareModal = () => {
    setIsShareModalOpen(true);
    handleClose();
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setIsSecondPage(false);
  };

  const handleAddCollaborator = () => {
    if (newCollaborator.trim() !== "") {
      setCollaborators([...collaborators, newCollaborator]);
      setNewCollaborator("");
    }
  };

  const handleNext = () => {
    setIsSecondPage(true);
  };

  const handleShareProject = () => {
    if (collaborators.length > 0) {
      setIsShareModalOpen(false);
      setIsShareConfirmationModalOpen(true);
    }
  };

  const handleCloseShareConfirmationModal = () => {
    setIsShareConfirmationModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://example.com/your-project-link").then(
      () => {
        setIsCopyLinkModalOpen(true);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const handleCloseCopyLinkModal = () => {
    setIsCopyLinkModalOpen(false);
  };

  const BackButton = ({ onClick }) => (
    <IconButton onClick={onClick} sx={{ marginRight: "16px" }}>
      <ArrowBackIcon sx={{ color: "whitesmoke" }} />
    </IconButton>
  );

  const ShareConfirmationModal = ({ isOpen, onClose, collaborators }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Share Success
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1" sx={{ marginBottom: "16px" }}>
          The following people have been added as collaborators:
        </Typography>
        <ul>
          {collaborators.map((person, index) => (
            <li key={index}>{person}</li>
          ))}
        </ul>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );

  const CopyLinkModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Link Copied
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1">
          The link has been copied to your clipboard.
        </Typography>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );

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
          <ShareIcon
            sx={{ color: "whitesmoke" }}
            onClick={handleOpenShareModal}
          />
        </IconButton>
        <IconButton onClick={handleClick}>
          <MoreVertIcon sx={{ color: "whitesmoke" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              backgroundColor: "#27262C",
              color: "white",
              minWidth: "200px",
            },
          }}
        >
          {isShareMenuOpen ? (
            <>
              {/* Share Submenu */}
              <MenuItem onClick={handleBackToMenu}>
                <ListItemIcon>
                  <ArrowBackIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </MenuItem>
              <MenuItem onClick={handleOpenShareModal}>
                <ListItemText primary="Add Collaborators" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemText primary="Manage Access" />
              </MenuItem>
              <MenuItem onClick={handleCopyLink}>
                <ListItemIcon>
                  <ContentCopy sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Copy Link" />
              </MenuItem>
            </>
          ) : isChangeModeMenuOpen ? (
            <>
              {/* Change Mode Submenu */}
              <MenuItem onClick={handleBackToMenu}>
                <ListItemIcon>
                  <ArrowBackIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Change Mode" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemText primary="Editing" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemText primary="Commenting" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemText primary="Viewing" />
              </MenuItem>
            </>
          ) : (
            <>
              {/* Default Menu */}
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <CommentIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Comment" />
              </MenuItem>
              <MenuItem onClick={handleShareClick}>
                <ListItemIcon>
                  <ShareIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Share" />
              </MenuItem>
              <MenuItem onClick={handleCopyLink}>
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
              <MenuItem onClick={handleChangeModeClick}>
                <ListItemIcon>
                  <EditIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Change Mode" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DownloadIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Download" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <RestoreIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Restore" />
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
                <ListItemText primary="Info" />
              </MenuItem>
            </>
          )}
        </Menu>
      </div>

      {/* Share Modal */}
      <Dialog open={isShareModalOpen} onClose={handleCloseShareModal}>
        <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
          <BackButton onClick={handleCloseShareModal} />
          {isSecondPage ? "Set Roles and Notifications" : "Add Collaborators"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
          {!isSecondPage ? (
            <>
              <TextField
                label="Collaborator Email"
                variant="outlined"
                fullWidth
                value={newCollaborator}
                onChange={(e) => setNewCollaborator(e.target.value)}
                sx={{ marginBottom: "16px" }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddCollaborator}
              >
                Add Collaborator
              </Button>
              <ul>
                {collaborators.map((collaborator, index) => (
                  <li key={index}>{collaborator}</li>
                ))}
              </ul>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ marginBottom: "16px" }}>
                Assign roles and choose notification settings for the added
                collaborators.
              </Typography>
              {collaborators.map((collaborator, index) => (
                <div key={index} style={{ marginBottom: "16px" }}>
                  <Typography variant="body2">{collaborator}</Typography>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ marginRight: "16px", backgroundColor: "#fff" }}
                  >
                    <DropdownItem value="Editor">Editor</DropdownItem>
                    <DropdownItem value="Commenter">Commenter</DropdownItem>
                    <DropdownItem value="Viewer">Viewer</DropdownItem>
                  </Select>
                  <Checkbox
                    checked={notifyPeople}
                    onChange={() => setNotifyPeople(!notifyPeople)}
                  />
                  <Typography variant="body2" sx={{ display: "inline" }}>
                    Notify
                  </Typography>
                </div>
              ))}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleShareProject}
              >
                Share
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleCloseShareModal}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Confirmation Modal */}
      <ShareConfirmationModal
        isOpen={isShareConfirmationModalOpen}
        onClose={handleCloseShareConfirmationModal}
        collaborators={collaborators}
      />

      {/* Copy Link Modal */}
      <CopyLinkModal
        isOpen={isCopyLinkModalOpen}
        onClose={handleCloseCopyLinkModal}
      />
    </div>
  );
}

export default DesignHead;
