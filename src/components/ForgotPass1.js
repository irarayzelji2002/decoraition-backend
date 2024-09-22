import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../css/forgotPass.css";

import { handleForgotPassword } from "../firebase";
import { useState } from "react"; // Import your forgot password function

// TODO: remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgotPass1() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic email validation
    if (!email) {
      setEmailError("Email is required.");
      return;
    }

    setEmailError(""); // Clear previous error if any

    // Call the forgot password function
    handleForgotPassword(email);
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <span className="formLabels">Email address</span>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Enter your email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              className="email-field"
              sx={{
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
                width: "400px",
              }}
            />
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
              Continue
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2" className="cancel-link">
                  Cancel
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
