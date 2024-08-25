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
import ForgotPass from "./pages/Account/forgotPass1.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Users />} />
          <Route path="/forgot-1" element={<ForgotPass />} />
          <Route path="/change" element={<ChangePassw />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
