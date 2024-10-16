import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { handleSetError, getHasError, getErrMessage, toCamelCase } from "../../functions/utils";

const EditableInputThree = ({
  labels,
  values,
  onChange,
  onSave,
  errors,
  setErrors,
  origValues,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValues, setInputValues] = useState(values);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const success = await onSave(inputValues);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
    onChange(index, value);
  };

  const handleReset = (index) => {
    const newValues = [...inputValues];
    newValues[index] = origValues[index];
    setInputValues(newValues);
  };

  const handleClose = () => {
    setIsEditing(false);
    setInputValues(origValues);
    if (setErrors) {
      labels.forEach((label) => {
        handleSetError(toCamelCase(label), "", errors, setErrors);
      });
      if (labels.length > 1) {
        handleSetError("all", "", errors, setErrors);
      }
    }
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
                {isEditing && (
                  <IconButton onClick={() => handleReset(index)}>
                    <CloseRoundedIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      ))}

      {isEditing && (
        <IconButton onClick={handleClose}>
          <CloseRoundedIcon />
        </IconButton>
      )}
      <IconButton onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </IconButton>

      {getHasError("all", errors) && <span className="">{getErrMessage("all", errors)}</span>}
    </div>
  );
};

export default EditableInputThree;
