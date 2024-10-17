import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { db } from "../../firebase"; // Import your Firestore instance
import { doc, getDoc } from "firebase/firestore";
import {
  Typography,
  Box,
  Switch,
  TextField,
  Button,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "../../css/designSettings.css"; // Import the CSS file

function DesignSettings() {
  const { designId } = useParams(); // Get the designId parameter from the URL
  const [designName, setDesignName] = useState("");
  const [generalAccess, setGeneralAccess] = useState("Anyone with the link");
  const [allowDownload, setAllowDownload] = useState(false);
  const [inactivityEnabled, setInactivityEnabled] = useState(false);
  const [inactivityDays, setInactivityDays] = useState(90);
  const [deletionDays, setDeletionDays] = useState(30);
  const [notifyDays, setNotifyDays] = useState(7);

  useEffect(() => {
    // Fetch the design name based on the designId
    const fetchDesignName = async () => {
      try {
        const designDoc = await getDoc(doc(db, "designs", designId));
        if (designDoc.exists()) {
          setDesignName(designDoc.data().name);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching design name:", error);
      }
    };

    fetchDesignName();
  }, [designId]);

  return (
    <div>
      <TopBar state={`Edit ${designName}`} />
      <SettingsContent
        generalAccess={generalAccess}
        setGeneralAccess={setGeneralAccess}
        allowDownload={allowDownload}
        setAllowDownload={setAllowDownload}
        inactivityEnabled={inactivityEnabled}
        setInactivityEnabled={setInactivityEnabled}
        inactivityDays={inactivityDays}
        setInactivityDays={setInactivityDays}
        deletionDays={deletionDays}
        setDeletionDays={setDeletionDays}
        notifyDays={notifyDays}
        setNotifyDays={setNotifyDays}
        isProjectTab={true} // Project tab condition
      />
    </div>
  );
}

export default DesignSettings;

const SettingsContent = ({
  generalAccess,
  setGeneralAccess,
  allowDownload,
  setAllowDownload,
  inactivityEnabled,
  setInactivityEnabled,
  inactivityDays,
  setInactivityDays,
  deletionDays,
  setDeletionDays,
  notifyDays,
  setNotifyDays,
  isProjectTab, // New prop to control whether it's the Project tab or Timeline tab
}) => (
  <div className="settingsContainer">
    {/* General Access */}
    <Typography className="generalAccessTitle">General access</Typography>
    <Box className="accessBox">
      <Box className="accessIcon">
        <Typography variant="h6" sx={{ color: "var(--color-white)" }}>
          🌐
        </Typography>
      </Box>
      <Select
        value={generalAccess}
        onChange={(e) => setGeneralAccess(e.target.value)}
        className="accessSelect"
      >
        <MenuItem
          value="Anyone with the link"
          sx={{
            backgroundColor: "var(--bgColor)",
            color: "var(--color-white)",
          }}
        >
          Anyone with the link
        </MenuItem>
        <MenuItem
          value="Restricted"
          sx={{
            backgroundColor: "var(--dropdown)",
            color: "var(--color-white)",
            "&:hover": {
              backgroundColor: "var(--dropdownHover)",
              color: "var(--color-white)",
            },
            "&.Mui-selected": {
              backgroundColor: "var(--dropdownSelected)",
              color: "var(--color-white)",
            },
          }}
        >
          Restricted
        </MenuItem>
      </Select>
    </Box>

    {/* Viewer Settings */}
    <Typography className="viewerSettingsTitle">Viewer settings</Typography>
    <FormControlLabel
      control={
        <Switch
          checked={allowDownload}
          onChange={(e) => setAllowDownload(e.target.checked)}
          color="warning"
        />
      }
      label="Allow to download"
      labelPlacement="start"
      className="viewerSettingsLabel"
    />

    {/* The following section is only for the Project tab */}
    {isProjectTab && (
      <>
        {/* Inactivity and Deletion */}
        <Typography className="inactivityTitle">
          Inactivity and deletion
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={inactivityEnabled}
              onChange={(e) => setInactivityEnabled(e.target.checked)}
              color="warning"
            />
          }
          label="Enable inactivity and deletion"
          labelPlacement="start"
          className="inactivityLabel"
        />

        {/* Inactivity Settings */}
        {inactivityEnabled && (
          <>
            <Box className="inactivitySettings">
              <Typography>
                Number of days before inactivity after user inactivity
              </Typography>
              <TextField
                type="number"
                value={inactivityDays}
                onChange={(e) => setInactivityDays(e.target.value)}
                className="inactivityTextField"
                inputProps={{
                  style: {
                    backgroundColor: "var(--bgcolor)",
                    color: "var(--color-white)",
                  },
                }}
              />
            </Box>

            <Box className="inactivitySettings">
              <Typography>
                Number of days before deletion after project inactivity
              </Typography>
              <TextField
                type="number"
                value={deletionDays}
                onChange={(e) => setDeletionDays(e.target.value)}
                className="inactivityTextField"
                inputProps={{
                  style: {
                    backgroundColor: "var(--bgcolor)",
                    color: "var(--color-white)",
                  },
                }}
              />
            </Box>

            <Box className="inactivitySettings">
              <Typography>
                Notify collaborators number of days prior to entering inactivity
                mode and deletion
              </Typography>
              <TextField
                type="number"
                value={notifyDays}
                onChange={(e) => setNotifyDays(e.target.value)}
                className="inactivityTextField"
                inputProps={{
                  style: {
                    backgroundColor: "var(--bgcolor)",
                    color: "var(--color-white)",
                  },
                }}
              />
            </Box>
          </>
        )}
      </>
    )}

    {/* Save Button */}
    <Box className="saveButtonContainer">
      <Button className="saveButton">Save</Button>
    </Box>
  </div>
);
