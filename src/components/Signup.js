import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Password from "./PassInput";

import Link from "@mui/material/Link";

const defaultTheme = createTheme();

const commonInputStyles = {
  marginTop: "10px",
  marginBottom: "10px",
  input: { color: "var(--color-white)", backgroundColor: "var(--inputBg)" },
  "& label": { color: "var(--borderInput)" },
  "& label.Mui-focused": { color: "var(--borderInput)" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--borderInput)",
    },
    "&:hover fieldset": {
      borderColor: "var(--borderInput)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--borderInput)",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
};

const buttonStyles = {
  mt: 3,
  mb: 2,
  backgroundImage: "linear-gradient(90deg, #f89a47, #f15f3e, #ec2073);",
};

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  // const [userInfo, setUserInfo] = useState(null);

  const handleValidation = () => {
    let formErrors = {};

    if (!firstName) formErrors.firstName = "First name is required";
    if (!lastName) formErrors.lastName = "Last name is required";
    if (!username) formErrors.username = "Username is required";
    if (!email) formErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      formErrors.email = "Invalid email format";
    if (!password) formErrors.password = "Password is required";
    else if (password.length < 6)
      formErrors.password = "Password must be at least 6 characters long";
    else if (!/[!@#$%^&*]/.test(password))
      formErrors.password =
        "Password must contain at least 1 special character";
    if (!confirmPassword)
      formErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";

    return formErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = handleValidation();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        email,
      });

      console.log(user);
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);

      setErrors({
        email:
          errorCode === "auth/email-already-in-use"
            ? "Email already in use"
            : "",
        password:
          errorCode === "auth/weak-password" ? "Password is too weak" : "",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <span className="formLabels">
              First Name
              <span style={{ color: "var(--color-quaternary)" }}> *</span>
            </span>

            <TextField
              required
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={commonInputStyles}
            />
            <span className="formLabels">
              Last Name
              <span style={{ color: "var(--color-quaternary)" }}> *</span>
            </span>
            <TextField
              required
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={commonInputStyles}
            />

            <span className="formLabels">
              Username
              <span style={{ color: "var(--color-quaternary)" }}> *</span>
            </span>
            <TextField
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
              sx={commonInputStyles}
            />
            <span className="formLabels">
              Email Address
              <span style={{ color: "var(--color-quaternary)" }}> *</span>
            </span>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={commonInputStyles}
            />
            <p
              style={{
                color: "gray",
                fontSize: "12px",
              }}
            >
              At least 6 characters long, with 1 special character
            </p>
            <span className="formLabels">
              Password
              <span style={{ color: "var(--color-quaternary)" }}> *</span>
            </span>
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={commonInputStyles}
            />
            <span className="formLabels">
              Confirm Password
              <span style={{ color: "var(--color-quaternary)" }}> *</span>
            </span>
            <Password
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={commonInputStyles}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                ...buttonStyles,
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        ></Box>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="body2" sx={{ color: "white", marginRight: 1 }}>
              Already have an account?
            </Typography>
          </Grid>
          <Grid item>
            <Link href="/login" variant="body2" className="cancel-link">
              Login
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
