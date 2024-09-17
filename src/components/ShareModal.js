import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShareModal = ({
  isOpen,
  onClose,
  onAddCollaborator,
  onNext,
  onShareProject,
  collaborators,
  isSecondPage,
}) => {
  const [newCollaborator, setNewCollaborator] = useState("");
  const [role, setRole] = useState("Viewer");
  const [notifyPeople, setNotifyPeople] = useState(false);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        <ArrowBackIcon
          sx={{ color: "whitesmoke", cursor: "pointer" }}
          onClick={onClose}
        />
        {isSecondPage ? "Set Roles and Notifications" : "Add Collaborators"}
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#1F1E22", color: "whitesmoke" }}>
        {!isSecondPage ? (
          <div>
            {/* Collaborator Input Field */}
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
              onClick={() => onAddCollaborator(newCollaborator)}
            >
              Add Collaborator
            </Button>

            {/* Display List of Collaborators */}
            <ul>
              {collaborators.map((collaborator, index) => (
                <li key={index}>{collaborator}</li>
              ))}
            </ul>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={onNext}
            >
              Next
            </Button>
          </div>
        ) : (
          <div>
            {/* Role and Notification Assignment */}
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
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="Commenter">Commenter</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </Select>

                {/* Notify Checkbox */}
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
              onClick={onShareProject}
            >
              Share
            </Button>
          </div>
        )}
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
