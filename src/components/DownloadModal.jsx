import React, { version } from "react";
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
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./../css/design.css";

const DownloadModal = ({ isOpen, onClose }) => {
  const [version, setVersion] = React.useState("");
  const [file, setFile] = React.useState("");
  return (
    <Dialog open={isOpen} onClose={onClose} className="dialog">
      <DialogTitle className="dialog-title">
        <IconButton onClick={onClose} className="dialog-icon-button">
          <ArrowBackIcon sx={{ color: "var(--color-white)" }} />
        </IconButton>
        Download
      </DialogTitle>
      <DialogContent className="dialog-content">
        <Typography variant="body1">
          Choose your download options and format.
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
      <FormControl className="form-control">
        <label>File Type</label>
        <Select
          id="date-modified-select"
          className="custom-select"
          value={file}
          label="Choose Pallete"
          onChange={(e) => setFile(e.target.value)}
          IconComponent={(props) => (
            <ArrowDropDownIcon className="select-icon" />
          )}
        >
          <MenuItem>None</MenuItem>
          <MenuItem value="1">Jpeg</MenuItem>
          <MenuItem value="2">Png</MenuItem>
        </Select>
      </FormControl>
      <DialogActions className="dialog-actions">
        {/* Download Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          className="confirm-button"
        >
          Download
        </Button>

        {/* Cancel Button */}
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

export default DownloadModal;
