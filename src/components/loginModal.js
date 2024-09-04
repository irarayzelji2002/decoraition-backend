import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Password from "./passInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleIcon, FacebookIcon } from "./customIcons";

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
        const user = userCredential.user;
        navigate("/homepage");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrors({ general: "Login failed. Please try again." });
      });
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
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              id="email-address"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
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
              }}
            />

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
              Don&apos;t have an account?
            </Typography>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" className="cancel-link">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
