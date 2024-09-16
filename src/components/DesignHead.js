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

function DesignHead({ designName, setDesignName, toggleComments }) {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [isCommentDrawerOpen, setIsCommentDrawerOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isChangeModeMenuOpen, setIsChangeModeMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareConfirmationModalOpen, setIsShareConfirmationModalOpen] =
    useState(false);
  const [isCopyLinkModalOpen, setIsCopyLinkModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isMakeCopyModalOpen, setIsMakeCopyModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [role, setRole] = useState("Editor");
  const [notifyPeople, setNotifyPeople] = useState(true);

  // const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsShareMenuOpen(false);
    setIsChangeModeMenuOpen(false);
  };

  // const toggleCommentDrawer = () => {
  //   setIsCommentDrawerOpen((prevState) => !prevState);
  // };

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

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Item deleted");
    handleCloseDeleteModal();
  };

  const handleOpenDownloadModal = () => {
    setIsDownloadModalOpen(true);
  };

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  const handleOpenRenameModal = () => {
    setIsRenameModalOpen(true);
  };

  const handleCloseRenameModal = () => {
    setIsRenameModalOpen(false);
  };

  const handleOpenRestoreModal = () => {
    setIsRestoreModalOpen(true);
  };

  const handleCloseRestoreModal = () => {
    setIsRestoreModalOpen(false);
  };

  const handleOpenMakeCopyModal = () => {
    setIsMakeCopyModalOpen(true);
  };

  const handleCloseMakeCopyModal = () => {
    setIsMakeCopyModalOpen(false);
  };

  const handleOpenInfoModal = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
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

  const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Confirm Delete
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button fullWidth variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  const DownloadModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Download
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1">
          Choose your download options and format.
        </Typography>
        {/* Add download options here */}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Download
        </Button>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  const RenameModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Rename
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <TextField
          label="New Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "16px" }}
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Rename
        </Button>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  const RestoreModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Restore
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1">
          Are you sure you want to restore this item?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Restore
        </Button>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  const MakeCopyModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Make a Copy
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1">
          Choose options for making a copy of the item.
        </Typography>
        {/* Add copy options here */}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Make Copy
        </Button>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  const InfoModal = ({ isOpen, onClose }) => (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <BackButton onClick={onClose} />
        Info
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1">
          Here is some information about the item.
        </Typography>
        {/* Add additional info here */}
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
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
        <input
          type="text"
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
          placeholder="Untitled"
          className="headTitleInput"
        />
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
              <MenuItem onClick={handleOpenDownloadModal}>
                <ListItemIcon>
                  <DownloadIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Download" />
              </MenuItem>
              <MenuItem onClick={handleOpenRenameModal}>
                <ListItemIcon>
                  <EditIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Rename" />
              </MenuItem>
              <MenuItem onClick={handleOpenRestoreModal}>
                <ListItemIcon>
                  <RestoreIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Restore" />
              </MenuItem>
              <MenuItem onClick={handleOpenMakeCopyModal}>
                <ListItemIcon>
                  <FileCopyIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Make a Copy" />
              </MenuItem>
              <MenuItem onClick={handleOpenInfoModal}>
                <ListItemIcon>
                  <InfoIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Info" />
              </MenuItem>
              <MenuItem onClick={handleOpenDeleteModal}>
                <ListItemIcon>
                  <DeleteIcon sx={{ color: "whitesmoke" }} />
                </ListItemIcon>
                <ListItemText primary="Delete" />
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDelete={handleDelete}
      />

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={handleCloseDownloadModal}
      />

      {/* Rename Modal */}
      <RenameModal
        isOpen={isRenameModalOpen}
        onClose={handleCloseRenameModal}
      />

      {/* Restore Modal */}
      <RestoreModal
        isOpen={isRestoreModalOpen}
        onClose={handleCloseRestoreModal}
      />

      {/* Make Copy Modal */}
      <MakeCopyModal
        isOpen={isMakeCopyModalOpen}
        onClose={handleCloseMakeCopyModal}
      />

      {/* Info Modal */}
      <InfoModal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} />
    </div>
  );
}

export default DesignHead;
