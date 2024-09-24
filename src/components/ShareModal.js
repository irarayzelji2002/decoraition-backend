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
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#2E2E32", // Custom background color for the dialog
          borderRadius: "20px", // Custom border radius for the dialog
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1F1E22", // Title background color
          color: "whitesmoke", // Title text color
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon
          sx={{ color: "whitesmoke", cursor: "pointer" }}
          onClick={onClose}
        />
        {isSecondPage ? "Set Roles and Notifications" : "Add Collaborators"}
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: "#1F1E22", // Content background color
          color: "whitesmoke", // Text color in the content
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
                onChange={(e) => setNewCollaborator(e.target.value)}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#3E3E42", // Input background color
                  input: { color: "whitesmoke" }, // Input text color
                  "& label": { color: "whitesmoke" }, // Label color
                  "& label.Mui-focused": { color: "whitesmoke" }, // Focused label color
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "whitesmoke", // Border color
                    },
                    "&:hover fieldset": {
                      borderColor: "whitesmoke", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "whitesmoke", // Focused border color
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "white",
                  },
                }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  width: "50%",
                  backgroundColor: "#3E3E42", // Select background color
                  "& .MuiSelect-select": { color: "whitesmoke" }, // Select text color
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "whitesmoke", // Border color
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "whitesmoke", // Hover border color
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "whitesmoke", // Focused border color
                    },
                }}
              >
                <MenuItem value="Editor">Editor</MenuItem>
                <MenuItem value="Commenter">Commenter</MenuItem>
                <MenuItem value="Viewer">Viewer</MenuItem>
              </Select>
              <p style={{ color: "whitesmoke", marginLeft: "auto" }}>
                Notify People
              </p>
              <Checkbox
                checked={notifyPeople}
                onChange={(e) => setNotifyPeople(e.target.checked)}
                sx={{ color: "whitesmoke" }} // Checkbox color
              />
            </div>

            <div style={{ marginTop: "10px" }}>
              <Typography variant="body1" color="whitesmoke">
                Added Collaborators
              </Typography>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {collaborators.map((collaborator, index) => (
                  <li key={index} style={{ marginTop: "10px" }}>
                    <Typography variant="body1" color="whitesmoke">
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
              onClick={() => onAddCollaborator(newCollaborator)}
              sx={{
                background: "var(--gradientButton)", // Gradient background
                borderRadius: "20px", // Button border radius
                color: "whitesmoke", // Button text color
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "var(--gradientButtonHover)", // Reverse gradient on hover
                },
              }}
            >
              Add Collaborator
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={onNext}
              sx={{
                background: "var(--gradientButton)", // Gradient background
                borderRadius: "20px", // Button border radius
                color: "whitesmoke", // Button text color
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "var(--gradientButtonHover)", // Reverse gradient on hover
                },
              }}
            >
              Next
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant="body1" sx={{ marginBottom: "16px" }}>
              Assign roles and choose notification settings for the added
              collaborators.
            </Typography>

            {collaborators.map((collaborator, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <Typography variant="body2" color="whitesmoke">
                  {collaborator}
                </Typography>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    marginRight: "16px",
                    backgroundColor: "#3E3E42",
                    color: "whitesmoke",
                  }}
                >
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="Commenter">Commenter</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </Select>

                <Checkbox
                  checked={notifyPeople}
                  onChange={() => setNotifyPeople(!notifyPeople)}
                  sx={{ color: "whitesmoke" }} // Checkbox color
                />
                <Typography
                  variant="body2"
                  sx={{ display: "inline", color: "whitesmoke" }}
                >
                  Notify
                </Typography>
              </div>
            ))}

            <Button
              fullWidth
              variant="contained"
              onClick={onShareProject}
              sx={{
                background: "var(--gradientButton)", // Gradient background
                borderRadius: "20px", // Button border radius
                color: "whitesmoke", // Button text color
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "var(--gradientButtonHover)", // Reverse gradient on hover
                },
              }}
            >
              Share
            </Button>
          </div>
        )}
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#1F1E22" }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            background: "var(--gradientButton)", // Gradient background
            borderRadius: "20px", // Button border radius
            color: "whitesmoke", // Button text color
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "var(--gradientButtonHover)", // Reverse gradient on hover
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareModal;
