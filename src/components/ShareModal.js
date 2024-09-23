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
          sx={{ color: "var(--co)", cursor: "pointer" }}
          onClick={onClose}
        />
        {isSecondPage ? "Set Roles and Notifications" : "Add Collaborators"}
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: "#1F1E22",
          color: "var(--color-white)",
          width: "400px",
        }}
      >
        {!isSecondPage ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                label="Enter email address"
                variant="outlined"
                fullWidth
                value={newCollaborator}
                input={{ color: "var(--color-white)" }}
                onChange={(e) => setNewCollaborator(e.target.value)}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  backgroundColor: "var(--inputBg)",
                  input: { color: "var(--color-white)" },
                  "& label": { color: "var(--borderInput)" },
                  "& label.Mui-focused": { color: "var(--borderInput)" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--borderInput)",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--borderInput)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--borderInput)",
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "white",
                  },
                }}
              />
            </div>
            {/* Collaborator Input Field */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  width: "50%",
                  backgroundColor: "var(--inputBg)",
                  "& .MuiSelect-select": { color: "var(--color-white)" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--borderInput)",
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "var(--borderInput)",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "var(--borderInput)",
                    },
                }}
              >
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Commenter">Commenter</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
              <p style={{ color: "var(--color-white)", marginLeft: "auto" }}>
                Notify People
              </p>
              <Checkbox
                checked={notifyPeople}
                onChange={(e) => setNotifyPeople(e.target.checked)}
                sx={{ color: "var(--color-white)" }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <Typography variant="body1" color="var(--color-white)">
                Added Collaborators
              </Typography>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {collaborators.map((collaborator, index) => (
                  <li key={index} style={{ marginTop: "10px" }}>
                    <Typography variant="body1" color="var(--color-white)">
                      {collaborator}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <br />
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
