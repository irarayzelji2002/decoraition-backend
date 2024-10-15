import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import useFirestoreSnapshots from "./hooks/useFirestoreSnapshots";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { showToast } from "./functions/utils.js";

import "./App.css";
import Login from "./pages/Account/Login.jsx";
import Register from "./pages/Account/Register.jsx";
import Users from "./users.js";
import ChangePassw from "./pages/Account/ChangePass.jsx";
import OneTP from "./pages/Account/Otp.jsx";
import ForgotPass from "./pages/Account/ForgotPass1.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Details from "./pages/Homepage/Details.jsx";
import SeeAllDesigns from "./pages/Homepage/SeeAllDesigns.jsx";
import SeeAllProjects from "./pages/Homepage/SeeAllProjects.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Design from "./pages/DesignSpace/Design.jsx";
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
// import { Rotate90DegreesCcw } from "@mui/icons-material";

function App() {
  const { user, setUser, loading, setLoading } = useAuth();

  // State for each collection
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [designVersions, setDesignVersions] = useState([]);
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [projectBudgets, setProjectBudgets] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [items, setItems] = useState([]);
  const [planMaps, setPlanMaps] = useState([]);
  const [pins, setPins] = useState([]);
  const [timelines, setTimelines] = useState([]);
  const [events, setEvents] = useState([]);

  // State for each user-related data
  const [userProjects, setUserProjects] = useState([]);
  const [userDesigns, setUserDesigns] = useState([]);
  const [userDesignVersions, setUserDesignVersions] = useState([]);
  const [userDesignsComments, setUserDesignsComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [userProjectBudgets, setUserProjectBudgets] = useState([]);
  const [userBudgets, setUserBudgets] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [userPlanMaps, setUserPlanMaps] = useState([]);
  const [userPins, setUserPins] = useState([]);
  const [userTimelines, setUserTimelines] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Persistence set to browserLocalPersistence");
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
        setLoading(false);
      });
  }, [setUser, setLoading]);

  // Use useFirestoreSnapshots hook to set up real-time listeners
  const generalCollections = [
    "users",
    "projects",
    "designs",
    "designVersions",
    "comments",
    "notifications",
    "projectBudgets",
    "budgets",
    "items",
    "planMaps",
    "pins",
    "timelines",
    "events",
  ];
  const userRelatedCollections = [
    "userProjects",
    "userDesigns",
    "userDesignVersions",
    "userDesignsComments",
    "userComments",
    "userNotifications",
    "userProjectBudgets",
    "userBudgets",
    "userItems",
    "userPlanMaps",
    "userPins",
    "userTimelines",
    "userEvents",
  ];
  const generalCollectionsStateSetterFunctions = {
    users: setUsers,
    projects: setProjects,
    designs: setDesigns,
    designVersions: setDesignVersions,
    comments: setComments,
    notifications: setNotifications,
    projectBudgets: setProjectBudgets,
    budgets: setBudgets,
    items: setItems,
    planMaps: setPlanMaps,
    pins: setPins,
    timelines: setTimelines,
    events: setEvents,
  };
  const userRelatedCollectionsStateSetterFunctions = {
    userProjects: setUserProjects,
    userDesigns: setUserDesigns,
    userDesignVersions: setUserDesignVersions,
    userDesignsComments: setUserDesignsComments,
    userComments: setUserComments,
    userNotifications: setUserNotifications,
    userProjectBudgets: setUserProjectBudgets,
    userBudgets: setUserBudgets,
    userItems: setUserItems,
    userPlanMaps: setUserPlanMaps,
    userPins: setUserPins,
    userTimelines: setUserTimelines,
    userEvents: setUserEvents,
  };

  const isConnected = useFirestoreSnapshots(
    [...generalCollections, ...userRelatedCollections],
    {
      ...generalCollectionsStateSetterFunctions,
      ...userRelatedCollectionsStateSetterFunctions,
    },

    user ? user.uid : null
  );

  const sharedProps = {
    user,
    users,
    setUsers,
    projects,
    setProjects,
    designs,
    setDesigns,
    designVersions,
    setDesignVersions,
    comments,
    setComments,
    notifications,
    setNotifications,
    projectBudgets,
    setProjectBudgets,
    budgets,
    setBudgets,
    items,
    setItems,
    planMaps,
    setPlanMaps,
    pins,
    setPins,
    timelines,
    setTimelines,
    events,
    setEvents,
    userProjects,
    setUserProjects,
    userDesigns,
    setUserDesigns,
    userDesignVersions,
    setUserDesignVersions,
    userDesignsComments,
    setUserDesignsComments,
    userComments,
    setUserComments,
    userNotifications,
    setUserNotifications,
    userProjectBudgets,
    setUserProjectBudgets,
    userBudgets,
    setUserBudgets,
    userItems,
    setUserItems,
    userPlanMaps,
    setUserPlanMaps,
    userPins,
    setUserPins,
    userTimelines,
    setUserTimelines,
    userEvents,
    setUserEvents,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    showToast("error", "Please log in");
    return <div>Please log in</div>;
  }

  if (!isConnected) {
    return <div>Connecting to Firestore...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* BEFORE LOGIN */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPass />} />
            <Route path="/change" element={<ChangePassw />} />
            <Route path="/otp" element={<OneTP />} />
            {/* ACCOUNT/HOMEPAGE */}
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <Homepage {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/details"
              element={
                <ProtectedRoute>
                  <Details {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings {...sharedProps} />
                </ProtectedRoute>
              }
            />
            {/* DESIGN SPACE */}
            <Route
              path="/design/:designId"
              element={
                <ProtectedRoute>
                  <Design {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/searchItem"
              element={
                <ProtectedRoute>
                  <SearchItem {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addItem/:designId"
              element={
                <ProtectedRoute>
                  <AddItem {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editItem/:designId/:itemId"
              element={
                <ProtectedRoute>
                  <EditItem {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget/:designId"
              element={
                <ProtectedRoute>
                  <Budget {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seeAllProjects"
              element={
                <ProtectedRoute>
                  <SeeAllProjects {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/seeAllDesigns"
              element={
                <ProtectedRoute>
                  <SeeAllDesigns {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/version"
              element={
                <ProtectedRoute>
                  <Version {...sharedProps} />
                </ProtectedRoute>
              }
            />
            {/* PROJECT SPACE */}
            <Route
              path="/project/:projectId"
              element={
                <ProtectedRoute>
                  <Project {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/design/:designId/:projectId/project"
              element={
                <ProtectedRoute>
                  <Design {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budget/:designId/:projectId/project"
              element={
                <ProtectedRoute>
                  <Budget {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addItem/:designId/:projectId/project"
              element={
                <ProtectedRoute>
                  <AddItem {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editItem/:designId/:itemId/:projectId/project"
              element={
                <ProtectedRoute>
                  <EditItem {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/planMap/:projectId"
              element={
                <ProtectedRoute>
                  <PlanMap {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/timeline/:projectId"
              element={
                <ProtectedRoute>
                  <Timeline {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projectBudget/:projectId"
              element={
                <ProtectedRoute>
                  <ProjBudget {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addPin/"
              element={
                <ProtectedRoute>
                  <AddPin {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editEvent/:projectId"
              element={
                <ProtectedRoute>
                  <EditEvent {...sharedProps} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projSetting/"
              element={
                <ProtectedRoute>
                  <ProjSetting {...sharedProps} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
