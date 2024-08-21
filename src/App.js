import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "./App.css";

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
      {/* <Routes>
        <Route>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes> */}
      <h1>App</h1>
      {!backendData.users ? (
        <p>Loading ...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
}

export default App;
