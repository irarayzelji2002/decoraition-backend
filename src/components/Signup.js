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
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./customIcons";

const defaultTheme = createTheme();

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

    if (!fname) {
      formErrors.fname = "First name is required";
    }

    if (!lname) {
      formErrors.lname = "Last name is required";
    }

    if (!username) {
      formErrors.username = "Username is required";
    }

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Invalid email format";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
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
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundImage: "linear-gradient(20deg, #faa653, #f04f59)",
              }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <a href="#" variant="body2">
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <a href="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </a>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            type="submit"
            fullWidth
            onClick={() => alert("Sign up with Google")}
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Button
            type="submit"
            fullWidth
            onClick={() => alert("Sign up with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign up with Facebook
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
