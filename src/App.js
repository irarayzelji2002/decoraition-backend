import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Account/login.js";
import Register from "./pages/Account/register.js";
import Users from "./users.js";
import ChangePassw from "./pages/Account/changePass.js";
import OneTP from "./pages/Account/otp.js";
import ForgotPass from "./pages/Account/forgotPass1.js";
import Homepage from "./pages/Homepage/homepage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Users />} />
          <Route path="/forgot" element={<ForgotPass />} />
          <Route path="/change" element={<ChangePassw />} />
          <Route path="/otp" element={<OneTP />} />
          <Route path="/homepage" element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
