import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CopyLinkModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <ArrowBackIcon sx={{ color: "whitesmoke" }} />
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
};

export default CopyLinkModal;
