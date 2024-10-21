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
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailInput from "./EmailInput";
import { Avatar } from "@mui/material";

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
  const [isViewer, setIsViewer] = useState(false);

  const users = [
    { name: "Guest 1", email: "email1@gmail.com" },
    { name: "Guest 2", email: "email2@gmail.com" },
    { name: "Guest 3", email: "email3@gmail.com" },
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#2E2E32", // Custom background color for the dialog
          borderRadius: "20px", // Custom border radius for the dialog
          width: "90%", // Custom width for the dialog
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "var(--nav-card-modal)", // Title background color
          color: "var(--color-white)", // Title text color
          display: "flex",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon
          sx={{
            color: "var(--color-white)",
            cursor: "pointer",
            marginRight: "16px",
          }}
          onClick={onClose}
        />
        {isSecondPage ? "Manage Access" : "Add Collaborators"}
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: "var(--nav-card-modal)", // Content background color
          color: "var(--color-white)", // Text color in the content
          width: "auto",
          padding: "0px",

          "& .MuiDialog-paper": {
            width: "100%",
          },
        }}
      >
        {!isSecondPage ? (
          <div style={{ width: "auto", padding: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "16px",
              }}
            >
              <EmailInput />
            </div>
            <Divider sx={{ backgroundColor: "grey", marginBottom: "16px" }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{
                  width: "50%",
                  backgroundColor: "transparent", // Select background color
                  "& .MuiSelect-select": { color: "var(--color-white)" }, // Select text color
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent", // Border color
                  },
                  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "transparent", // Hover border color
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "transparent", // Focused border color
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
                sx={{
                  color: "var(--color-white)",
                  "&.Mui-checked": {
                    color: "var(--brightFont)",
                  },
                }}
              />
            </div>

            <br />
            <Divider sx={{ backgroundColor: "grey", marginBottom: "16px" }} />

            <TextField
              multiline
              minRows={1}
              variant="standard"
              placeholder="Optional message"
              sx={{
                marginBottom: "16px",
                padding: "16px",
                width: "90%",
                backgroundColor: "transparent",
                "& .MuiInput-root": {
                  color: "var(--color-white)",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={onNext}
              sx={{
                width: "95%",
                background: "var(--gradientButton)",
                borderRadius: "20px",
                color: "var(--color-white)",
                margin: "10px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "var(--gradientButtonHover)",
                },
              }}
            >
              Next
            </Button>
          </div>
        ) : (
          <div>
            <Typography
              variant="body1"
              sx={{ marginBottom: "16px", padding: "12px" }}
            >
              People with access
            </Typography>
            {users.map((user, index) => (
              <div className="drawerUser" key={index}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    marginBottom: "10px",
                  }}
                  src={""}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <div>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption">{user.email}</Typography>
                </div>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{
                    marginRight: "16px",
                    backgroundColor: "#3E3E42",
                    color: "var(--color-white)",
                    marginLeft: "auto",
                  }}
                >
                  <MenuItem value="Editor">Editor</MenuItem>
                  <MenuItem value="Commenter">Commenter</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </Select>
              </div>
            ))}
            <Typography
              variant="body1"
              sx={{ marginBottom: "16px", padding: "12px" }}
            >
              General Access
            </Typography>
            <div className="drawerUser">
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  marginBottom: "10px",
                }}
                src={""}
              >
                W
              </Avatar>

              {isViewer ? (
                <div>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Anyone with link
                  </Typography>
                  <Typography variant="caption">
                    Anyone on the Internet can access as an Editor
                  </Typography>
                </div>
              ) : (
                <Select
                  sx={{
                    marginRight: "16px",
                    backgroundColor: "#3E3E42",
                    color: "var(--color-white)",
                  }}
                >
                  <MenuItem value="Editor">
                    Anyone with link Anyone on the Internet can access as an
                    Editor
                  </MenuItem>
                  <MenuItem value="Commenter">Commenter</MenuItem>
                  <MenuItem value="Viewer">Viewer</MenuItem>
                </Select>
              )}
            </div>

            <Button
              fullWidth
              variant="contained"
              onClick={onShareProject}
              sx={{
                width: "92%",
                background: "var(--gradientButton)",
                borderRadius: "20px",
                color: "var(--color-white)",
                margin: "16px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  background: "var(--gradientButtonHover)",
                },
              }}
            >
              Share
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
