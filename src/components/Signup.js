import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Import Firestore
import { doc, setDoc } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Password from "./passInput";
import { GoogleIcon, FacebookIcon } from "./customIcons";
import Link from "@mui/material/Link";

const defaultTheme = createTheme();

const commonInputStyles = {
  input: { color: "white" },
  label: { color: "white" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
};

const buttonStyles = {
  mt: 3,
  mb: 2,
  backgroundImage: "linear-gradient(20deg, #faa653, #f04f59)",
};

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let formErrors = {};

    if (!fname) formErrors.fname = "First name is required";
    if (!lname) formErrors.lname = "Last name is required";
    if (!username) formErrors.username = "Username is required";
    if (!email) formErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      formErrors.email = "Invalid email format";
    if (!password) formErrors.password = "Password is required";
    else if (password.length < 6)
      formErrors.password = "Password must be at least 6 characters long";
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

      // Save user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fname,
        lname,
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              name="fname"
              autoFocus
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              error={!!errors.fname}
              helperText={errors.fname}
              sx={commonInputStyles}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lname"
              label="Last Name"
              name="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              error={!!errors.lname}
              helperText={errors.lname}
              sx={commonInputStyles}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
              helperText={errors.username}
              sx={commonInputStyles}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={commonInputStyles}
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={commonInputStyles}
            />
            <Password
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={commonInputStyles}
            />
            <Grid container alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid item xs>
                <Box display="flex" justifyContent="flex-end">
                  <Link
                    href="/forgot"
                    variant="body2"
                    sx={{
                      color: "#FF894D",
                      textDecoration: "underline", // Add underline
                      "&:hover": {
                        textDecoration: "underline", // Ensure underline on hover
                      },
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundImage: "linear-gradient(20deg, #faa653, #f04f59)",
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
        >
          <Button
            type="submit"
            fullWidth
            onClick={() => alert("Login with Google")}
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              maxWidth: "400px",
            }}
          >
            Login with Google
          </Button>
          <Button
            type="submit"
            fullWidth
            onClick={() => alert("Login with Facebook")}
            startIcon={<FacebookIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "transparent",
              border: "none",
              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "&:active": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
              maxWidth: "400px",
            }}
          >
            Login with Facebook
          </Button>
        </Box>
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
