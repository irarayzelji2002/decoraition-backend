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
import Users from "./users.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
