import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

export default function Password({ value, onChange, error, helperText }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{ width: "100%", marginTop: "12px" }}
      variant="outlined"
      error={error}
    >
      <InputLabel
        htmlFor="outlined-adornment-password"
        sx={{
          color: "#ffffff", // Default label color
          "&.Mui-focused": {
            color: "#ffffff", // Label color when focused
          },
        }}
      >
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{ color: "#ffffff" }} // Make the visibility icons white
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
        sx={{
          color: "#ffffff", // Input text color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff", // Outline color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff", // Outline color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff", // Outline color when focused
          },
        }}
      />
      {helperText && (
        <FormHelperText sx={{ color: "#ffffff" }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
