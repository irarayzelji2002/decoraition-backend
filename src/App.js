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
import Homepage from "./pages/Homepage/Homepage.js";
import Settings from "./pages/Settings/Settings.js";
import Design from "./pages/DesignSpace/Design.js";
import SeeAllDesigns from "./pages/DesignSpace/SeeAllDesigns.js";
import Budget from "./pages/DesignSpace/Budget.js";
import AddItem from "./pages/DesignSpace/AddItem.js";
import EditItem from "./pages/DesignSpace/EditItem.js";
import SearchItem from "./pages/DesignSpace/SearchItem.js";
import Project from "./pages/ProjectSpace/Project.js";
import { AuthProvider } from "./AuthContext"; // Adjust the path as necessary
import ProtectedRoute from "./ProtectedRoute"; // Adjust the path as necessary
import { Rotate90DegreesCcw } from "@mui/icons-material";

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
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/settings" element={<Settings />} />
          {/* Use a dynamic ID for the design route */}
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

          <Route path="/design/:designId" element={<Design />} />
          <Route path="/project" element={<Project />} />
          <Route path="/searchItem" element={<SearchItem />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/editItem" element={<EditItem />} />
          <Route path="/users" element={<Users />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/seeAllDesigns" element={<SeeAllDesigns />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
