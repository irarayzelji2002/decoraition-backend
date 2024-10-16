import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { getHasError, getErrMessage, toCamelCase } from "../../functions/utils";

export default function EditableInput({
  label,
  value,
  onChange,
  onSave,
  onReset,
  errors,
  isEditable = true,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEdit = () => {
    if (isEditable) setIsEditing(true);
  };

  const handleSave = async () => {
    const success = await onSave(inputValue);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const handleReset = (field) => {
    if (onReset) {
      onReset(field);
      setIsEditing(false);
    }
  };

  return (
    <TextField
      label={label}
      type="text"
      value={value}
      onChange={handleChange}
      disabled={!isEditing}
      fullWidth
      margin="normal"
      helperText={getErrMessage(toCamelCase(label), errors)}
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
        endAdornment: (
          <InputAdornment position="end">
            {isEditable && (
              <>
                {isEditing && (
                  <IconButton onClick={() => handleReset(toCamelCase(label))}>
                    <CloseRoundedIcon />
                  </IconButton>
                )}
                <IconButton onClick={isEditing ? handleSave : handleEdit}>
                  {isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
