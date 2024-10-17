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
  initErrors,
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
      setErrors(initErrors);
      labels.slice(0, labels.length - 1).forEach((label, index) => {
        onChange(index, ""); // exclude the last one
      });
    }
  };

  return (
    <Box>
      {isEditing ? (
        <>
          {labels.slice(0, labels.length - 1).map((label, index) => (
            <TextField
              key={index}
              label={label}
              type={showPassword ? "text" : "password"}
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
                    borderColor: "var(--borderInput)",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--borderInput)",
                    borderWidth: "2px",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--brightFont)",
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
          ))}
        </>
      ) : (
        <TextField
          label={labels[labels.length - 1]} // last label
          type="password"
          value="********"
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
                borderColor: "var(--borderInput)",
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: "var(--borderInput)",
                borderWidth: "2px",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--brightFont)",
                borderWidth: "2px",
              },
            },
            "& .MuiFormHelperText-root": {
              color: "white",
            },
          }}
        />
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