import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import UnlinkIcon from "@mui/icons-material/LinkOff";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const LongToggleInput = ({ label, value, onToggle, isConnectedAccount }) => {
  const icon = isConnectedAccount ? (
    value === null ? (
      <LinkIcon />
    ) : (
      <UnlinkIcon />
    )
  ) : value === 0 ? (
    <DarkModeIcon />
  ) : (
    <LightModeIcon />
  );

  return (
    <TextField
      label={label}
      value={
        isConnectedAccount ? (value === null ? "None" : value) : value === 0 ? "Dark" : "Light"
      }
      disabled
      fullWidth
      margin="normal"
      sx={{
        marginTop: "10px",
        marginBottom: "10px",
        backgroundColor: "var(--inputBg)",
        input: { color: "var(--color-white)" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "transparent",
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: "transparent",
            borderWidth: "2px",
          },
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
            borderWidth: "2px",
          },
        },
        "& .MuiFormHelperText-root": {
          color: "white",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onToggle}>{icon}</IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default LongToggleInput;
