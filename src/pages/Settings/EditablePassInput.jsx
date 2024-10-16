import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { handleSetError, getHasError, getErrMessage, toCamelCase } from "../../functions/utils";

const EditablePassInput = ({
  labels,
  values,
  onChange,
  onSave,
  errors,
  setErrors,
  isEditable = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState(values);

  const handleEdit = () => {
    if (isEditable) setIsEditing(true);
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = (index) => {
    const newValues = [...inputValues];
    newValues[index] = "";
    setInputValues(newValues);
  };

  const handleClose = () => {
    setIsEditing(false);
    const newValues = Array(values.length).fill("");
    setInputValues(newValues);
    if (setErrors) {
      labels.forEach((label) => {
        handleSetError(toCamelCase(label), "", errors, setErrors);
      });
      if (labels.length > 1) {
        handleSetError("all", "", errors, setErrors);
      }
    }
  };

  const renderPasswordField = (index, value, label) => (
    <TextField
      key={index}
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
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
            <IconButton onClick={handleClickShowPassword} edge="end" disabled={!isEditing}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  const renderPasswordView = (value, label) => (
    <TextField
      label={label}
      type="password"
      value={value}
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
    />
  );

  return (
    <Box>
      {isEditing ? (
        <>
          {renderPasswordField(0, inputValues[0], labels[0])}
          {renderPasswordField(1, inputValues[1], labels[1])}
        </>
      ) : (
        <>{renderPasswordView("********", labels[2])}</>
      )}

      {isEditable && (
        <>
          {isEditing && (
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          )}
          <IconButton onClick={isEditing ? handleSave : handleEdit}>
            {isEditing ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </>
      )}
      {getHasError("all", errors) && <span className="">{getErrMessage("all", errors)}</span>}
    </Box>
  );
};

export default EditablePassInput;
