import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { db } from "../../firebase";
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
import "../../css/designSettings.css";
import PublicIcon from "@mui/icons-material/Public";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

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

const DesignSettings = () => {
  const { designId } = useParams(); // Get the designId parameter from the URL
  const [designName, setDesignName] = useState("");
  const [generalAccess, setGeneralAccess] = useState("Anyone with the link");
  const [allowDownload, setAllowDownload] = useState(false);
  const [allowHistory, setAllowHistory] = useState(false);
  const [allowMakeACopy, setAllowMakeACopy] = useState(false);
  const [allowCopyByOwner, setAllowCopyByOwner] = useState(false);
  const [allowCopyByEditor, setAllowCopyByEditor] = useState(false);
  const [inactivityEnabled, setInactivityEnabled] = useState(false);
  const [inactivityDays, setInactivityDays] = useState(90);
  const [deletionDays, setDeletionDays] = useState(30);
  const [notifyDays, setNotifyDays] = useState(7);
  const [activeTab, setActiveTab] = useState("Project"); // Default active tab

  useEffect(() => {
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

  const handleTabChange = useCallback((tab) => setActiveTab(tab), []);

  return (
    <div>
      <TopBar state={`Design Settings for ${designName}`} />
      <SettingsContent
        {...{
          generalAccess,
          setGeneralAccess,
          allowDownload,
          setAllowDownload,
          allowHistory,
          setAllowHistory,
          allowMakeACopy,
          setAllowMakeACopy,
          allowCopyByOwner,
          setAllowCopyByOwner,
          allowCopyByEditor,
          setAllowCopyByEditor,
          inactivityEnabled,
          setInactivityEnabled,
          inactivityDays,
          setInactivityDays,
          deletionDays,
          setDeletionDays,
          notifyDays,
          setNotifyDays,
          activeTab,
          handleTabChange,
        }}
      />
    </div>
  );
};

export default DesignSettings;

const SettingsContent = ({
  generalAccess,
  setGeneralAccess,
  allowDownload,
  setAllowDownload,
  allowHistory,
  setAllowHistory,
  allowMakeACopy,
  setAllowMakeACopy,
  allowCopyByOwner,
  setAllowCopyByOwner,
  allowCopyByEditor,
  setAllowCopyByEditor,
  inactivityEnabled,
  setInactivityEnabled,
  inactivityDays,
  setInactivityDays,
  deletionDays,
  setDeletionDays,
  notifyDays,
  setNotifyDays,
  activeTab,
  handleTabChange,
}) => (
  <ThemeProvider theme={theme}>
    <div className="settingsContainer">
      {/* Tab Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      ></Box>

      {/* General Access */}
      <div className="generalAccessTitle">General Access</div>
      <Box className="accessBox">
        <Box className="accessIcon">
          <PublicIcon sx={{ color: "var(--color-white)" }} />
        </Box>
        <Select
          value={generalAccess}
          onChange={(e) => setGeneralAccess(e.target.value)}
          className="accessSelect"
          sx={selectStyles}
        >
          <MenuItem value="Anyone with the link" sx={menuItemStyles}>
            Anyone with the link
          </MenuItem>
          <MenuItem value="Restricted" sx={menuItemStyles}>
            Restricted
          </MenuItem>
        </Select>
      </Box>

      {/* Viewer Settings */}
      <Typography className="viewerSettingsTitle">Viewer settings</Typography>
      <CustomSwitch
        label="Allow to download"
        checked={allowDownload}
        onChange={setAllowDownload}
      />
      <CustomSwitch
        label="Allow to view history"
        checked={allowHistory}
        onChange={setAllowHistory}
      />
      <CustomSwitch
        label="Allow to make a copy"
        checked={allowMakeACopy}
        onChange={setAllowMakeACopy}
      />

      {/* History Settings */}
      <Typography className="viewerSettingsTitle">History settings</Typography>
      <CustomSwitch
        label="Document copies made by owner"
        checked={allowCopyByOwner}
        onChange={setAllowCopyByOwner}
      />
      <CustomSwitch
        label="Document copies made by editor"
        checked={allowCopyByEditor}
        onChange={setAllowCopyByEditor}
      />

      {activeTab === "Project" && (
        <>
          <Typography className="inactivityTitle">
            Inactivity and deletion
          </Typography>
          <CustomSwitch
            label="Enable inactivity and deletion"
            checked={inactivityEnabled}
            onChange={setInactivityEnabled}
          />

          {inactivityEnabled && (
            <>
              <InactivitySetting
                label="Number of days before inactivity after user inactivity"
                value={inactivityDays}
                onChange={setInactivityDays}
              />
              <InactivitySetting
                label="Number of days before deletion after project inactivity"
                value={deletionDays}
                onChange={setDeletionDays}
              />
              <InactivitySetting
                label="Notify collaborators number of days prior to entering inactivity mode and deletion"
                value={notifyDays}
                onChange={setNotifyDays}
              />
            </>
          )}
        </>
      )}

      {/* Save Button */}
      <Box className="saveButtonContainer">
        <Button className="saveButton">Save</Button>
      </Box>
    </div>
  </ThemeProvider>
);

// Custom Switch Component for reusability
const CustomSwitch = ({ label, checked, onChange }) => (
  <FormControlLabel
    control={
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        color="warning"
        sx={switchStyles}
      />
    }
    label={label}
    labelPlacement="start"
    className="viewerSettingsLabel"
  />
);

// Inactivity Setting Component for input fields
const InactivitySetting = ({ label, value, onChange }) => (
  <Box className="inactivitySettings">
    <Typography>{label}</Typography>
    <TextField
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="inactivityTextField"
      inputProps={textFieldInputProps}
      sx={textFieldStyles}
    />
  </Box>
);

// Reusable styles for MenuItem
const menuItemStyles = {
  backgroundColor: "var(--bgColor)",
  color: "var(--color-white)",
  "&:hover": {
    backgroundColor: "var(--dropdownHover)",
    color: "var(--color-white)",
  },
  "&.Mui-selected": {
    backgroundColor: "var(--dropdownSelected)",
    color: "var(--color-white)",
  },
};

// Styles for Switch
const switchStyles = {
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--inputBg)",
  },
  "& .MuiSwitch-thumb": {
    backgroundImage: "var(--color-white)",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "var(--inputBg)",
  },
};

// Styles for Select
const selectStyles = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--inputBg)",
    borderWidth: 2, // border thickness
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--bright-grey)", //  hover
  },
  "& .MuiSelect-select": {
    color: "var(--color-white)", //
  },

  "& .MuiSelect-icon": {
    color: "var(--color-white)", // dropdown arrow icon color to white
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--bright-grey)", // focused state
  },
};

// Styles for TextField
const textFieldStyles = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderWidth: 2, // border thickness
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "var(--borderInput)",

    "& fieldset": {
      borderColor: "var(--borderInput)",
    },
    "&:hover fieldset": {
      borderColor: "var(--bright-grey)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--bright-grey)",
    },
  },
  "& input": {
    color: "var(--color-white)", // input text color
  },
};

const textFieldInputProps = {
  style: { color: "var(--color-white)" }, // Input text color
};
