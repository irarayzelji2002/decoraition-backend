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

function App() {
  const [backendData, setBackendData] = useState({});

  useEffect(() => {
    fetch("/api/sample")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  const name = "adama";

  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
