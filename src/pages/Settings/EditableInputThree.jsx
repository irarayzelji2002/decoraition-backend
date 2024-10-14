import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const EditableInputThree = ({ labels, values, onChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValues, setInputValues] = useState(values);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(inputValues);
  };

  const handleChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
    onChange(index, value);
  };

  return (
    <div>
      {labels.map((label, index) => (
        <TextField
          key={index}
          label={label}
          value={inputValues[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          disabled={!isEditing}
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
            endAdornment: index === labels.length - 1 && (
              <InputAdornment position="end">
                <IconButton onClick={isEditing ? handleSave : handleEdit}>
                  {isEditing ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ))}
    </div>
  );
};

export default EditableInputThree;
