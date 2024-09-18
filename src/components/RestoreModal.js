import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RestoreModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <ArrowBackIcon sx={{ color: "whitesmoke" }} />
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
};

export default RestoreModal;
