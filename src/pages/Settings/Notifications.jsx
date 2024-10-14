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

const theme = createTheme({
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
          <FormControlLabel
            label="Allow push notifications"
            control={
              <Switch
                checked={allowNotif}
                onChange={(event) => setAllowNotif(event.target.checked)}
                aria-label="Allow push notifications"
              />
            }
          />
          <FormControlLabel
            label="Enable deletion of notifications"
            control={
              <Switch
                checked={deleteNotif}
                onChange={(event) => setDeleteNotif(event.target.checked)}
                aria-label="Enable deletion of notifications"
              />
            }
          />
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
          <FormControlLabel
            label="Mentioned in a comment or reply"
            control={
              <Switch
                checked={commentNotifications.mentionedInComment}
                onChange={(event) =>
                  handleCommentNotificationChange(
                    "mentionedInComment",
                    event.target.checked
                  )
                }
                aria-label="Mentioned in a comment or reply"
              />
            }
          />
          <FormControlLabel
            label="A new comment or reply if I'm the owner"
            control={
              <Switch
                checked={commentNotifications.newCommentReplyAsOwner}
                onChange={(event) =>
                  handleCommentNotificationChange(
                    "newCommentReplyAsOwner",
                    event.target.checked
                  )
                }
                aria-label="A new comment or reply if I'm the owner"
              />
            }
          />
          <FormControlLabel
            label="A new comment or reply if I'm an editor or commenter"
            control={
              <Switch
                checked={commentNotifications.newCommentReplyAsCollab}
                onChange={(event) =>
                  handleCommentNotificationChange(
                    "newCommentReplyAsCollab",
                    event.target.checked
                  )
                }
                aria-label="A new comment or reply if I'm an editor or commenter"
              />
            }
          />
          <FormControlLabel
            label="Comment is resolved or reopened if I'm the owner"
            control={
              <Switch
                checked={commentNotifications.commentStatusChangeAsOwner}
                onChange={(event) =>
                  handleCommentNotificationChange(
                    "commentStatusChangeAsOwner",
                    event.target.checked
                  )
                }
                aria-label="Comment is resolved or reopened if I'm the owner"
              />
            }
          />
          <FormControlLabel
            label="Comment is resolved or reopened if I'm an editor or commenter"
            control={
              <Switch
                checked={commentNotifications.commentStatusChangeAsCollab}
                onChange={(event) =>
                  handleCommentNotificationChange(
                    "commentStatusChangeAsCollab",
                    event.target.checked
                  )
                }
                aria-label="Comment is resolved or reopened if I'm an editor or commenter"
              />
            }
          />
        </FormGroup>

        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Timeline notification preferences
        </Typography>
        <FormGroup>
          <FormControlLabel
            label="Calendar event reminders"
            control={
              <Switch
                checked={timelineNotifications}
                onChange={(event) =>
                  setTimelineNotifications(event.target.checked)
                }
                aria-label="Calendar event reminders"
              />
            }
          />
        </FormGroup>

        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Design notification preferences
        </Typography>
        <FormGroup>
          <FormControlLabel
            label="Design is renamedProject by a manager"
            control={
              <Switch
                checked={designNotifications.renamedDesign}
                onChange={(event) =>
                  handleDesignNotificationChange(
                    "renamedDesign",
                    event.target.checked
                  )
                }
                aria-label="Design is renamedProject by a manager"
              />
            }
          />
          <FormControlLabel
            label="Design will be or is in inactive mode"
            control={
              <Switch
                checked={designNotifications.inactiveDesign}
                onChange={(event) =>
                  handleDesignNotificationChange(
                    "inactiveDesign",
                    event.target.checked
                  )
                }
                aria-label="Design will be or is in inactive mode"
              />
            }
          />
          <FormControlLabel
            label="Design will be or is deletedProject"
            control={
              <Switch
                checked={designNotifications.deletedDesign}
                onChange={(event) =>
                  handleDesignNotificationChange(
                    "deletedDesign",
                    event.target.checked
                  )
                }
                aria-label="Design will be or is deletedProject"
              />
            }
          />
          <FormControlLabel
            label="Your role in the design is changed by an owner or editor"
            control={
              <Switch
                checked={designNotifications.changeRoleInDesign}
                onChange={(event) =>
                  handleDesignNotificationChange(
                    "changeRoleInDesign",
                    event.target.checked
                  )
                }
                aria-label="Your role in the design is changed by an owner or editor"
              />
            }
          />
        </FormGroup>

        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "var(--color-white)", fontWeight: "bold" }}
        >
          Project notification preferences
        </Typography>
        <FormGroup>
          <FormControlLabel
            label="Project is renamedProject by a manager"
            control={
              <Switch
                checked={projectNotifications.renamedProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "renamedProject",
                    event.target.checked
                  )
                }
                aria-label="Project is renamedProject by a manager"
              />
            }
          />
          <FormControlLabel
            label="Project will be or is in inactive mode"
            control={
              <Switch
                checked={projectNotifications.inactiveProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "inactiveProject",
                    event.target.checked
                  )
                }
                aria-label="Project will be or is in inactive mode"
              />
            }
          />
          <FormControlLabel
            label="Project will be or is deletedProject"
            control={
              <Switch
                checked={projectNotifications.deletedProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "deletedProject",
                    event.target.checked
                  )
                }
                aria-label="Project will be or is deletedProject"
              />
            }
          />
          <FormControlLabel
            label="Your role in the project is changed by an manager"
            control={
              <Switch
                checked={projectNotifications.changeRoleInProject}
                onChange={(event) =>
                  handleProjectNotificationChange(
                    "changeRoleInProject",
                    event.target.checked
                  )
                }
                aria-label="Your role in the project is changed by an manager"
              />
            }
          />

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
