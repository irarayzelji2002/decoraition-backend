import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RenameModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="dialog">
      <DialogTitle className="dialog-title">
        <IconButton
          onClick={onClose}
          sx={{ color: "var(--color-white)", marginRight: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        Rename
      </DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          placeholder="New Name"
          variant="outlined"
          fullWidth
          className="element"
        />
      </DialogContent>
      <DialogActions
        sx={{ backgroundColor: "var(  --nav-card-modal)", margin: "10px" }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          className="confirm-button"
        >
          Rename
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          className="cancel-button"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameModal;
