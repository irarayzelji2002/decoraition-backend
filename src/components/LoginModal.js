import * as React from "react";
import { useEffect, useState } from "react";
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
import Password from "./PassInput";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Import Firestore instance

const defaultTheme = createTheme();

export default function LoginModal() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  const auth = getAuth();

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, redirect to homepage
        navigate("/homepage");
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth, navigate]);

  const onLogin = (e) => {
    e.preventDefault();
    const formErrors = handleValidation();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        toast.success("Login successful");
        navigate("/homepage");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error("Login failed. Please try again.");
        setErrors({ general: "Login failed. Please try again." });
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Extract user information
      const displayName = user.displayName ? user.displayName.split(" ") : [];
      const firstName = displayName[0] || "";
      const lastName = displayName.slice(1).join(" ") || "";
      const email = user.email || "";
      const username = `${firstName}_${lastName}`.toLowerCase();

      // Save user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        username,
      });

      toast.success("Google login successful");
      navigate("/homepage");
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed. Please try again.");
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
            width: "100%",
          }}
        >
          <Box component="form" onSubmit={onLogin} noValidate sx={{ mt: 1 }}>
            <span className="formLabels">Email Address</span>
            <TextField
              required
              fullWidth
              label="Your email address"
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
              }}
            />
            <span className="formLabels">Password</span>
            <Password
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
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
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
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
                      color: "#FF894D",
                      textDecoration: "underline",
                      "&:hover": {
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
                backgroundImage:
                  "linear-gradient(90deg, #f89a47, #f15f3e, #ec2073);",
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Box>
          <ToastContainer />
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
