import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { db } from "../../firebase"; // Import your Firestore instance
import { doc, getDoc } from "firebase/firestore"; // Im
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
  <>
    {/* General Access */}
    <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
      General access
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
      <Box
        sx={{
          backgroundColor: "#FF8A65",
          width: 40,
          height: 40,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: "var(color-white)" }}>
          🌐
        </Typography>
      </Box>
      <Select
        value={generalAccess}
        onChange={(e) => setGeneralAccess(e.target.value)}
        sx={{
          backgroundColor: "var( --bgcolor)",
          color: "var(color-white)",
          width: 250,
        }}
      >
        <MenuItem value="Anyone with the link">Anyone with the link</MenuItem>
        <MenuItem value="Restricted">Restricted</MenuItem>
      </Select>
    </Box>

    {/* Viewer Settings */}
    <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
      Viewer settings
    </Typography>
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
      sx={{
        marginBottom: 3,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
      }}
    />

    {/* The following section is only for the Project tab */}
    {isProjectTab && (
      <>
        {/* Inactivity and Deletion */}
        <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
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
          sx={{
            marginBottom: 3,
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        />

        {/* Inactivity Settings */}
        {inactivityEnabled && (
          <>
            <Box sx={{ marginBottom: 2 }}>
              <Typography>
                Number of days before inactivity after user inactivity
              </Typography>
              <TextField
                type="number"
                value={inactivityDays}
                onChange={(e) => setInactivityDays(e.target.value)}
                sx={{ width: "100%", marginTop: 1 }}
                inputProps={{
                  style: {
                    backgroundColor: "var( --bgcolor)",
                    color: "var(color-white)",
                  },
                }}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography>
                Number of days before deletion after project inactivity
              </Typography>
              <TextField
                type="number"
                value={deletionDays}
                onChange={(e) => setDeletionDays(e.target.value)}
                sx={{ width: "100%", marginTop: 1 }}
                inputProps={{
                  style: {
                    backgroundColor: "var( --bgcolor)",
                    color: "var(color-white)",
                  },
                }}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography>
                Notify collaborators number of days prior to entering inactivity
                mode and deletion
              </Typography>
              <TextField
                type="number"
                value={notifyDays}
                onChange={(e) => setNotifyDays(e.target.value)}
                sx={{ width: "100%", marginTop: 1 }}
                inputProps={{
                  style: {
                    backgroundColor: "var( --bgcolor)",
                    color: "var(color-white)",
                  },
                }}
              />
            </Box>
          </>
        )}
      </>
    )}

    {/* Save Button */}
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Button
        variant="contained"
        sx={{
          backgroundImage: "var( --gradientButton)",
          borderRadius: "20px",
          textTransform: "none",
          fontWeight: "bold",
          padding: "10px 50px",
        }}
      >
        Save
      </Button>
    </Box>
  </>
);
