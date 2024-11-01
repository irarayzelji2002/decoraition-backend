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
import { FormControl, Select, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MakeCopyModal = ({ isOpen, onClose }) => {
  const [version, setVersion] = React.useState("");
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "var(  --nav-card-modal)", // Custom background color for the dialog
          borderRadius: "20px", // Custom border radius for the dialog
        },
      }}
    >
      <DialogTitle className="dialog-title">
        {/* Wrapping ArrowBackIcon inside IconButton for clickability */}
        <IconButton
          onClick={onClose}
          sx={{ color: "var(--color-white)", marginRight: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        Make a Copy
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Typography variant="body1">
          Choose a Version for making a copy of the item.
        </Typography>
      </DialogContent>
      <FormControl className="form-control">
        <label>Version</label>
        <Select
          id="date-modified-select"
          className="custom-select"
          value={version}
          label="Choose Pallete"
          onChange={(e) => setVersion(e.target.value)}
          IconComponent={(props) => (
            <ArrowDropDownIcon className="select-icon" />
          )}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value="1">Version 1</MenuItem>
          <MenuItem value="2">Version 2</MenuItem>
          <MenuItem value="3">Version 3</MenuItem>
          <MenuItem value="4">Version 4</MenuItem>
        </Select>
      </FormControl>
      <DialogActions
        sx={{ backgroundColor: "var(  --nav-card-modal)", margin: "10px" }}
      >
        {/* Make Copy Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            background: "var(--gradientButton)", // Gradient background
            borderRadius: "20px", // Button border radius
            color: "var(--color-white)", // Button text color
            fontWeight: "bold",
            textTransform: "none",

            "&:hover": {
              background: "var(--gradientButtonHover)", // Reverse gradient on hover
            },
          }}
        >
          Make Copy
        </Button>

        {/* Cancel Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            color: "var(--color-white)",
            background: "transparent",
            border: "2px solid transparent",
            borderRadius: "20px",
            backgroundImage: "var(--lightGradient), var(--gradientButton)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundImage =
              "var(--lightGradient), var(--gradientButtonHover)")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundImage =
              "var(--lightGradient), var(--gradientButton)")
          }
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakeCopyModal;
