import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="dialog">
      <DialogTitle className="dialog-title">
        <IconButton onClick={onClose} className="dialog-icon-button">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: "var(--color-white)" }}>
          {" "}
          Confirm Delete
        </Typography>
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Typography variant="body1">
          Are you sure you want to delete this item? <br />
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button
          fullWidth
          variant="contained"
          onClick={onDelete}
          className="confirm-button"
        >
          Delete
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

export default DeleteConfirmationModal;
