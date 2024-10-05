import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function EditableInput({ onSave, value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave();
    // Save the new value to your state or backend here
  };

  return (
    <TextField
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      sx={{
        marginTop: "10px",
        marginBottom: "10px",
        backgroundColor: "var(--inputBg)",
        input: { color: "var(--color-white)" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "var(--borderInput)", // Border color when not focused
            borderWidth: "2px", // Adjust the border thickness here
          },
          "&:hover fieldset": {
            borderColor: "var(--borderInput)", // Border color on hover
            borderWidth: "2px", // Maintain the thickness on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--brightFont)", // Border color when focused
            borderWidth: "2px", // Maintain the thickness on focus
          },
        },
        "& .MuiFormHelperText-root": {
          color: "white",
        },
      }}
      InputProps={{
        readOnly: !isEditing,
        endAdornment: (
          <InputAdornment position="end">
            {isEditing ? (
              <IconButton onClick={handleSaveClick}>
                <SaveIcon sx={{ color: "#FF894D" }} />
              </IconButton>
            ) : (
              <IconButton onClick={handleEditClick}>
                <EditIcon sx={{ color: "#FF894D" }} />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
