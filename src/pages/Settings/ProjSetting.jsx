import React, { useState } from "react";
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
import TopBar from "../../components/TopBar";

// Shared Settings Component
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
        <Typography variant="h6" sx={{ color: "var(--color-white)" }}>
          🌐
        </Typography>
      </Box>
      <Select
        value={generalAccess}
        onChange={(e) => setGeneralAccess(e.target.value)}
        sx={{
          backgroundColor: "var(--bgColor)",
          color: "var(--color-white)",
          width: 250,
          "& .MuiSvgIcon-root": {
            color: "var(--color-white)", // Set the arrow icon color to white
          },
        }}
      >
        <MenuItem
          value="Anyone with the link"
          sx={{
            backgroundColor: "var(--bgColor)",
            color: "var(--color-white)",
            "&:hover": {},
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
                    color: "var(--color-white)",
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
                    color: "var(--color-white)",
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
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
      <Button
        variant="contained"
        sx={{
          backgroundImage: "var( --gradientButton)",
          borderRadius: "20px",
          textTransform: "none",
          fontWeight: "bold",
          padding: "10px 50px",
          width: "15%",
          "&:hover": {
            backgroundImage: "var( --gradientButtonHover)",
          },
        }}
      >
        Save
      </Button>
    </Box>
  </>
);

const ProjSetting = () => {
  const [generalAccess, setGeneralAccess] = useState("Anyone with the link");
  const [allowDownload, setAllowDownload] = useState(false);
  const [inactivityEnabled, setInactivityEnabled] = useState(false);
  const [inactivityDays, setInactivityDays] = useState(90);
  const [deletionDays, setDeletionDays] = useState(30);
  const [notifyDays, setNotifyDays] = useState(7);
  const [activeTab, setActiveTab] = useState("Project"); // New state for active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab); // Change active tab
  };

  return (
    <>
      <TopBar state="Project Settings" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        {["Project", "Timeline", "Plan Map", "Budget"].map((tab, index) => (
          <Typography
            key={tab}
            onClick={() => handleTabChange(tab)}
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "none",
              cursor: "pointer",
              paddingBottom: 1,
              backgroundImage:
                activeTab === tab ? "var(--gradientFont)" : "none", // Gradient only for active tab
              backgroundClip: activeTab === tab ? "text" : "unset",
              WebkitBackgroundClip: activeTab === tab ? "text" : "unset",
              color: activeTab === tab ? "transparent" : "var(--color-white)",
              borderBottom:
                activeTab === tab ? "2px solid transparent" : "none",
              borderImage: activeTab === tab ? "var(--gradientFont) 1" : "none", // Gradient for border bottom
              borderImageSlice: activeTab === tab ? 1 : "none",
              "&:focus": {
                outline: "none",
                backgroundColor: "transparent",
              },
              "&:active": {
                outline: "none",
                backgroundColor: "transparent",
              },
            }}
          >
            {tab}
          </Typography>
        ))}
      </Box>

      {/* Conditionally render content based on the active tab */}
      {activeTab === "Project" && (
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
      )}

      {(activeTab === "Timeline" ||
        activeTab === "Plan Map" ||
        activeTab === "Budget") && (
        <SettingsContent
          generalAccess={generalAccess}
          setGeneralAccess={setGeneralAccess}
          allowDownload={allowDownload}
          setAllowDownload={setAllowDownload}
          isProjectTab={false} // Timeline, Plan Map, and Budget tab condition
        />
      )}
    </>
  );
};

export default ProjSetting;
