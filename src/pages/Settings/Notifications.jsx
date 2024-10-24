import * as React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  saveNotificationSettings,
  fetchNotificationSettings,
} from "./backend/SettingsFunction";
import Loading from "../../components/Loading";

export const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "& .MuiSwitch-thumb": {
            backgroundColor: "var(--color-white)", // Color of the switch thumb
          },
          "&.Mui-checked .MuiSwitch-thumb": {
            backgroundImage: "var(--gradientCircle)", // Color when checked
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "var(--inputBg)", // Track color when checked
          },
        },
        track: {
          backgroundColor: "var(--inputBg)", // Track color
        },
      },
    },
  },
});

export default function Notifications() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [allowNotif, setAllowNotif] = useState(true);
  const [deleteNotif, setDeleteNotif] = useState(true);
  const [deleteNotifAfter, setDeleteNotifAfter] = useState(15);

  const [commentNotifications, setCommentNotifications] = useState({
    mentionedInComment: true,
    newCommentReplyAsOwner: true,
    newCommentReplyAsCollab: true,
    commentStatusChangeAsOwner: true,
    commentStatusChangeAsCollab: true,
  });
  const [timelineNotifications, setTimelineNotifications] = useState(true);
  const [designNotifications, setDesignNotifications] = useState({
    renamedDesign: true,
    inactiveDesign: true,
    deletedDesign: true,
    changeRoleInDesign: true,
  });
  const [projectNotifications, setProjectNotifications] = useState({
    renamedProject: true,
    inactiveProject: true,
    deletedProject: true,
    changeRoleInProject: true,
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setLoading(true); // Set loading to true before fetching data
        const settings = await fetchNotificationSettings(user.uid);
        if (settings) {
          setAllowNotif(settings.allowNotif);
          setDeleteNotif(settings.deleteNotif);
          setDeleteNotifAfter(settings.deleteNotifAfter);
          setCommentNotifications(settings.commentNotifications);
          setTimelineNotifications(settings.timelineNotifications);
          setDesignNotifications(settings.designNotifications);
          setProjectNotifications(settings.projectNotifications);
        }
        setLoading(false); // Set loading to false after fetching data
      } else {
        setUser(null);
        setLoading(false); // Set loading to false if no user
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleSaveSettings = () => {
    if (user) {
      const settings = {
        allowNotif,
        deleteNotif,
        deleteNotifAfter,
        commentNotifications,
        timelineNotifications,
        designNotifications,
        projectNotifications,
      };
      saveNotificationSettings(user.uid, settings);
    }
  };

  useEffect(() => {
    handleSaveSettings();
  }, [
    allowNotif,
    deleteNotif,
    deleteNotifAfter,
    commentNotifications,
    timelineNotifications,
    designNotifications,
    projectNotifications,
  ]);

  const handleCommentNotificationChange = (name, value) => {
    setCommentNotifications({
      ...commentNotifications,
      [name]: value,
    });
  };

  const handleDesignNotificationChange = (name, value) => {
    setDesignNotifications({
      ...designNotifications,
      [name]: value,
    });
  };

  const handleProjectNotificationChange = (name, value) => {
    setProjectNotifications({
      ...projectNotifications,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Notification preferences
        </Typography>
        <FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Allow push notifications
            </Typography>
            <Switch
              checked={allowNotif}
              onChange={(event) => setAllowNotif(event.target.checked)}
              aria-label="Allow push notifications"
              color="warning" // Set the color prop for the switch
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Enable deletion of notifications
            </Typography>
            <Switch
              checked={deleteNotif}
              onChange={(event) => setDeleteNotif(event.target.checked)}
              aria-label="Enable deletion of notifications"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "var(--color-white)", fontWeight: "bold" }}
          >
            Delete read notifications after how many days?
          </Typography>
          <Slider
            value={deleteNotifAfter}
            onChange={(event, newValue) => setDeleteNotifAfter(newValue)}
            aria-labelledby="delete-read-notifications-slider"
            valueLabelDisplay="on"
            min={1}
            max={30}
            sx={{
              marginTop: "24px",
              color: "var(--slider)", // Slider color
              "& .MuiSlider-thumb": {
                background: "var(--gradientCircle)", // Gradient thumb
              },
              "& .MuiSlider-track": {
                backgroundColor: "var(--slider)", // Track color
              },
              "& .MuiSlider-rail": {
                backgroundColor: "var(--slider)", // Rail color
              },
            }}
          />
        </FormGroup>

        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Comment notification preferences
        </Typography>
        <FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Mentioned in a comment or reply
            </Typography>
            <Switch
              checked={commentNotifications.mentionedInComment}
              onChange={(event) =>
                handleCommentNotificationChange(
                  "mentionedInComment",
                  event.target.checked
                )
              }
              aria-label="Mentioned in a comment or reply"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              A new comment or reply if I'm the owner
            </Typography>
            <Switch
              checked={commentNotifications.newCommentReplyAsOwner}
              onChange={(event) =>
                handleCommentNotificationChange(
                  "newCommentReplyAsOwner",
                  event.target.checked
                )
              }
              aria-label="A new comment or reply if I'm the owner"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              A new comment or reply if I'm an editor or commenter
            </Typography>
            <Switch
              checked={commentNotifications.newCommentReplyAsCollab}
              onChange={(event) =>
                handleCommentNotificationChange(
                  "newCommentReplyAsCollab",
                  event.target.checked
                )
              }
              aria-label="A new comment or reply if I'm an editor or commenter"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Comment is resolved or reopened if I'm the owner
            </Typography>
            <Switch
              checked={commentNotifications.commentStatusChangeAsOwner}
              onChange={(event) =>
                handleCommentNotificationChange(
                  "commentStatusChangeAsOwner",
                  event.target.checked
                )
              }
              aria-label="Comment is resolved or reopened if I'm the owner"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Comment is resolved or reopened if I'm an editor or commenter
            </Typography>
            <Switch
              checked={commentNotifications.commentStatusChangeAsCollab}
              onChange={(event) =>
                handleCommentNotificationChange(
                  "commentStatusChangeAsCollab",
                  event.target.checked
                )
              }
              aria-label="Comment is resolved or reopened if I'm an editor or commenter"
              color="warning" // Set the color prop for the switch
            />
          </div>
        </FormGroup>

        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Timeline notification preferences
        </Typography>
        <FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Calendar event reminders
            </Typography>
            <Switch
              checked={timelineNotifications}
              onChange={(event) =>
                setTimelineNotifications(event.target.checked)
              }
              aria-label="Calendar event reminders"
              color="warning" // Set the color prop for the switch
            />
          </div>
        </FormGroup>

        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Design notification preferences
        </Typography>
        <FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Design is renamed Project by a manager
            </Typography>
            <Switch
              checked={designNotifications.renamedDesign}
              onChange={(event) =>
                handleDesignNotificationChange(
                  "renamedDesign",
                  event.target.checked
                )
              }
              aria-label="Design is renamed Project by a manager"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Design will be or is in inactive mode
            </Typography>
            <Switch
              checked={designNotifications.inactiveDesign}
              onChange={(event) =>
                handleDesignNotificationChange(
                  "inactiveDesign",
                  event.target.checked
                )
              }
              aria-label="Design will be or is in inactive mode"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Design will be or is deleted
            </Typography>
            <Switch
              checked={designNotifications.deletedDesign}
              onChange={(event) =>
                handleDesignNotificationChange(
                  "deletedDesign",
                  event.target.checked
                )
              }
              aria-label="Design will be or is deleted"
              color="warning" // Set the color prop for the switch
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "var(--color-white)" }}>
              Your role in the design is changed by an owner or editor
            </Typography>
            <Switch
              checked={designNotifications.changeRoleInDesign}
              onChange={(event) =>
                handleDesignNotificationChange(
                  "changeRoleInDesign",
                  event.target.checked
                )
              }
              aria-label="Your role in the design is changed by an owner or editor"
              color="warning" // Set the color prop for the switch
            />
          </div>
        </FormGroup>

        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Project notification preferences
        </Typography>
        <FormGroup>
          <FormGroup>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ color: "var(--color-white)" }}>
                Project is renamed by a manager
              </Typography>
              <Switch
                checked={projectNotifications.renamedProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "renamedProject",
                    event.target.checked
                  )
                }
                aria-label="Project is renamed by a manager"
                color="warning" // Set the color prop for the switch
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ color: "var(--color-white)" }}>
                Project will be or is in inactive mode
              </Typography>
              <Switch
                checked={projectNotifications.inactiveProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "inactiveProject",
                    event.target.checked
                  )
                }
                aria-label="Project will be or is in inactive mode"
                color="warning" // Set the color prop for the switch
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ color: "var(--color-white)" }}>
                Project will be or is deleted
              </Typography>
              <Switch
                checked={projectNotifications.deletedProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "deletedProject",
                    event.target.checked
                  )
                }
                aria-label="Project will be or is deleted"
                color="warning" // Set the color prop for the switch
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography style={{ color: "var(--color-white)" }}>
                Your role in the project is changed by a manager
              </Typography>
              <Switch
                checked={projectNotifications.changeRoleInProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "changeRoleInProject",
                    event.target.checked
                  )
                }
                color="warning" // Set the color prop directly here
                aria-label="Your role in the project is changed by a manager"
              />
            </div>
          </FormGroup>

          <Button
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              backgroundImage: "var(--gradientButton)",
              color: "var(--color-white)",
              fontWeight: "bold",
              borderRadius: "20px",
              textTransform: "none",
              "&:hover": {
                backgroundImage: "var(--gradientButtonHover)",
              },
            }}
          >
            Save Settings
          </Button>
        </FormGroup>
      </div>
    </ThemeProvider>
  );
}
