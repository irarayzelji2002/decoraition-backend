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

const MakeCopyModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <ArrowBackIcon sx={{ color: "whitesmoke" }} />
        Make a Copy
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <Typography variant="body1">
          Choose options for making a copy of the item.
        </Typography>
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
};

export default MakeCopyModal;
