// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Account/Login.js";
import Register from "./pages/Account/Register.js";
import Users from "./users.js";
import ChangePassw from "./pages/Account/ChangePass.js";
import OneTP from "./pages/Account/Otp.js";
import ForgotPass from "./pages/Account/ForgotPass1.js";
import Homepage from "./pages/Homepage/homepage.js";
import Settings from "./pages/Settings/settings.js";
import Design from "./pages/DesignSpace/Design.js";
import { AuthProvider } from "./AuthContext"; // Adjust the path as necessary
import ProtectedRoute from "./ProtectedRoute"; // Adjust the path as necessary

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot" element={<ForgotPass />} />
          <Route path="/change" element={<ChangePassw />} />
          <Route path="/otp" element={<OneTP />} />
          {/* <Route
            path="/homepage"
            element={<ProtectedRoute element={<Homepage />} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute element={<Settings />} />}
          />
          <Route
            path="/design"
            element={<ProtectedRoute element={<Design />} />}
          />
          <Route
            path="/users"
            element={<ProtectedRoute element={<Users />} />}
          /> */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/design" element={<Design />} />{" "}
          <Route path="/users" element={<Users />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
