// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Account/Login.jsx";
import Register from "./pages/Account/Register.jsx";
import Users from "./users.js";
import ChangePassw from "./pages/Account/ChangePass.jsx";
import OneTP from "./pages/Account/Otp.jsx";
import ForgotPass from "./pages/Account/ForgotPass1.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Details from "./pages/Homepage/Details.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Design from "./pages/DesignSpace/Design.jsx";
import SeeAllDesigns from "./pages/DesignSpace/SeeAllDesigns.jsx";
import Budget from "./pages/DesignSpace/Budget.jsx";
import AddItem from "./pages/DesignSpace/AddItem.jsx";
import EditItem from "./pages/DesignSpace/EditItem.jsx";
import SearchItem from "./pages/DesignSpace/SearchItem.jsx";
import Project from "./pages/ProjectSpace/Project.jsx";
import ProjBudget from "./pages/ProjectSpace/ProjBudget.jsx";
import PlanMap from "./pages/ProjectSpace/PlanMap.jsx";
import Timeline from "./pages/ProjectSpace/Timeline.jsx";
import AddPin from "./pages/ProjectSpace/AddPin.jsx";
import EditEvent from "./pages/ProjectSpace/EditEvent.jsx";
import ProjSetting from "./pages/Settings/ProjSetting.jsx";
import Version from "./pages/DesignSpace/Version.jsx";
import SeeAllProjects from "./pages/DesignSpace/SeeAllProjects.jsx";
import DesignSettings from "./pages/DesignSpace/DesignSettings.jsx";
import Landing from "./pages/Landing/Landing";
import PinOrder from "./pages/ProjectSpace/PinOrder.jsx";
import FAQ from "./pages/Homepage/FAQ.jsx";
import Terms from "./pages/Account/Terms.jsx";
import Privacy from "./pages/Account/Privacy.jsx";
import Error from "./components/Error.jsx";
import GenerateImgLoadingPage from "./components/GenerateImgLoadingPage.jsx";
import { AuthProvider } from "./AuthContext"; // Adjust the path as necessary
// import ProtectedRoute from "./ProtectedRoute"; // Adjust the path as necessary
// import { Rotate90DegreesCcw } from "@mui/icons-material";
import { useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

function App() {
  useEffect(() => {
    const auth = getAuth();
    // Set persistence to local so the user stays logged in across sessions.
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Check if the user is logged in or not
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, you can set the user state here
            console.log("User is logged in:", user);
          } else {
            // No user is signed in, redirect to login page or handle accordingly
            console.log("No user logged in");
          }
        });
      })
      .catch((error) => {
        console.error("Error with setting persistence:", error);
      });
  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} /> {/*Checked */}
          <Route path="/register" element={<Register />} /> {/*Checked */}
          {/* <Route path="/" element={<Login />} /> Checked */}
          <Route path="/forgot" element={<ForgotPass />} /> {/*Checked */}
          <Route path="/change" element={<ChangePassw />} /> {/*Checked */}
          <Route path="/otp" element={<OneTP />} />
          <Route path="/homepage" element={<Homepage />} /> {/*Checked */}
          <Route path="/details/:designId" element={<Details />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/error" element={<Error />} />
          <Route
            path="/generateImgLoadingPage"
            element={<GenerateImgLoadingPage />}
          />
          {/*Checked */}
          {/* DESIGN SPACE */}
          <Route path="/design/:designId" element={<Design />} />
          <Route path="/searchItem" element={<SearchItem />} />
          <Route path="/addItem/:designId" element={<AddItem />} />
          <Route path="/editItem/:designId/:itemId" element={<EditItem />} />
          <Route path="/users" element={<Users />} />
          <Route path="/budget/:designId" element={<Budget />} />
          <Route path="/seeAllProjects" element={<SeeAllProjects />} />
          <Route path="/seeAllDesigns" element={<SeeAllDesigns />} />
          <Route path="/setting/:designId" element={<DesignSettings />} />
          <Route path="/version" element={<Version />} />
          {/* PROJECT SPACE */}
          <Route path="/project/:projectId" element={<Project />} />
          <Route
            path="/design/:designId/:projectId/project"
            element={<Design />}
          />
          <Route
            path="/budget/:designId/:projectId/project"
            element={<Budget />}
          />
          <Route
            path="/addItem/:designId/:projectId/project"
            element={<AddItem />}
          />
          <Route
            path="/editItem/:designId/:itemId/:projectId/project"
            element={<EditItem />}
          />
          <Route path="/planMap/:projectId" element={<PlanMap />} />
          <Route path="/timeline/:projectId" element={<Timeline />} />
          <Route path="/projBudget/:projectId" element={<ProjBudget />} />
          <Route path="/addPin/:projectId" element={<AddPin />} />
          <Route path="/pinOrder/:projectId" element={<PinOrder />} />
          <Route path="/editEvent/:projectId" element={<EditEvent />} />
          <Route path="/projSetting/:projectId" element={<ProjSetting />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
