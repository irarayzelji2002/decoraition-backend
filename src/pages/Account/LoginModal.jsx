import * as React from "react";
import { useEffect, useState } from "react";
import { showToast } from "../../functions/utils";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { GoogleIcon, FacebookIcon } from "../../components/CustomIcons";
import { db } from "../../../server/firebase"; // Import Firestore instance
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const defaultTheme = createTheme();

export default function LoginModal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleValidation = () => {
    let formErrors = {};
    if (!email) {
      formErrors.email = "Email is required";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }
    return formErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formErrors = handleValidation();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { userData } = await response.json();
        // Handle successful login
        showToast("success", "Login successful!");
        setTimeout(() => navigate("/homepage", { state: { userData } }), 1000);
      } else {
        const errorData = await response.json();
        showToast("error", errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("error", "An error occurred. Please try again.");
      setErrors({ general: "Login failed. Please try again." });
    }
  };

  const handleGoogleLogin = async () => {
    let user = {};
    let userData = {};
    try {
      const response = await fetch("/api/google-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      user = await response.json();

      // Check if user object contains all expected properties
      if (!user || !user.uid || !user.displayName || !user.email || !user.photoURL) {
        throw new Error("Incomplete user data received");
      }

      // Extract user information from Google sign-in
      userData = {
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ").slice(1).join(" "),
        username: user.email.split("@")[0], // Using email as a base for username
        email: user.email,
        connectedAccount: "Google",
        profilePic: user.photoURL,
        userId: user.uid,
      };
    } catch (error) {
      console.error("Google login error:", error);
      showToast("Failed to log in with Google", "error");
      return;
    }

    try {
      // Call your API to create or update user in your database
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful user creation/login
        showToast("success", "Successfully signed in with Google!");
        setTimeout(() => navigate("/homepage"), 1000);
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Google login error", error);
      showToast("error", "Google login failed. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <span className="formLabels">Email Address</span>
            <TextField
              required
              fullWidth
              placeholder="Enter your email address"
              name="email"
              autoComplete="email"
              autoFocus
              id="email-address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
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

            <span className="formLabels">Password</span>
            <TextField
              required
              fullWidth
              label="" // or simply omit this line
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        color: "var(--color-white)",
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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

            {errors.general && (
              <Typography color="error" variant="body2">
                {errors.general}
              </Typography>
            )}

            <Grid container alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      sx={{
                        color: "var(--color-white)",
                        "&.Mui-checked": {
                          color: "var(--brightFont)",
                        },
                        borderRadius: "4px",
                        "& .MuiSvgIcon-root": {
                          fontSize: 28,
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
                      color: "var(--brightFont)",
                      textDecoration: "underline",
                      "&:hover": {
                        color: "var(--color-white)",
                        textDecoration: "underline",
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
                backgroundImage: "var(--gradientButton)",
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundImage: "var(--gradientButtonHover)",
                },
              }}
            >
              Login
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
            type="button"
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "var(--color-white)",
              backgroundColor: "transparent",
              border: "none",
              "&:hover": {
                background: "transparent", // Ensure background remains transparent

                color: "var(--color-white)", // Ensure color is transparent to reveal the gradient
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
            Login with Google&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
          <Button
            type="button"
            fullWidth
            onClick={() => alert("Login with Facebook")}
            startIcon={<FacebookIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "var(--color-white)",
              backgroundColor: "transparent",
              border: "none",
              "&:hover": {
                background: "transparent", // Ensure background remains transparent

                color: "var(--color-white)", // Ensure color is transparent to reveal the gradient
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
              marginTop: "-12px",
            }}
          >
            Login with Facebook
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "18px ",
          }}
        >
          Don&apos;t have an account?&nbsp;
          <Link href="/register" variant="body2" className="cancel-link">
            Sign Up
          </Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
