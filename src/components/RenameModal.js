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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          backgroundColor: "#1F1E22",
          color: "whitesmoke",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Make the ArrowBackIcon clickable by wrapping it in an IconButton */}
        <IconButton
          onClick={onClose}
          sx={{ color: "whitesmoke", marginRight: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
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
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            background: "var(--gradientButton)",
            borderRadius: "20px",
            color: "var( --color-white)",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "var(--gradientButtonHover)",
            },
          }}
        >
          Rename
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            background: "var(--gradientButton)",
            borderRadius: "20px",
            color: "var( --color-white)",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "var(--gradientButtonHover)",
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameModal;
