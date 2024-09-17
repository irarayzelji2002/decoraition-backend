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
          padding: 4,
          backgroundColor: "var( --bgcolor)",
          color: "var(color-white)",
          borderRadius: 2,
        }}
      >
        {/* Top Navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          {["Project", "Timeline", "Plan Map", "Budget"].map((tab) => (
            <Typography
              key={tab}
              onClick={() => handleTabChange(tab)} // Change tab on click
              sx={{
                fontSize: 18,
                color: tab === activeTab ? "#FF8A65" : "#ccc", // Highlight the active tab
                cursor: "pointer",
                paddingBottom: 1,
                borderBottom: tab === activeTab ? "2px solid #FF8A65" : "none", // Add bottom border for active tab
              }}
            >
              {tab}
            </Typography>
          ))}
        </Box>

        {/* Conditionally render content based on the active tab */}
        {activeTab === "Project" && (
          <>
            {/* General Access */}
            <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>
              General access
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}
            >
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
                <MenuItem value="Anyone with the link">
                  Anyone with the link
                </MenuItem>
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
                    Notify collaborators number of days prior to entering
                    inactivity mode and deletion
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

            {/* Save Button */}
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
            >
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
        )}

        {activeTab === "Timeline" && (
          <Typography sx={{ fontWeight: "bold" }}>Timeline </Typography>
        )}

        {activeTab === "Plan Map" && (
          <Typography sx={{ fontWeight: "bold" }}>Plan Map </Typography>
        )}

        {activeTab === "Budget" && (
          <Typography sx={{ fontWeight: "bold" }}>Budget </Typography>
        )}
      </Box>
    </>
  );
};

export default ProjSetting;
