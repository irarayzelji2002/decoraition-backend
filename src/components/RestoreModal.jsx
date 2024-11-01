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
import { FormControl, Select, MenuItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const RestoreModal = ({ isOpen, onClose }) => {
  const [version, setVersion] = React.useState("");
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleRestoreClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmRestore = () => {
    setConfirmOpen(false);
    onClose();
    // Add your restore logic here
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="dialog">
        <DialogTitle className="dialog-title">
          <IconButton onClick={onClose} className="dialog-icon-button">
            <ArrowBackIcon />
          </IconButton>
          Restore
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Typography>Select what version you want to Restore</Typography>
        </DialogContent>

        <FormControl className="form-control">
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
        <DialogActions className="dialog-actions">
          {/* Restore Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleRestoreClick}
            className="button"
          >
            Restore
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        className="confirm-dialog"
      >
        <DialogTitle className="confirm-dialog-title">
          Confirm Restore
        </DialogTitle>
        <DialogContent className="confirm-dialog-content">
          <Typography>Do you want to restore this version?</Typography>
        </DialogContent>
        <DialogActions className="confirm-dialog-actions">
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirmRestore}
            className="confirm-button"
          >
            Restore
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirmClose}
            className="cancel-button"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestoreModal;
