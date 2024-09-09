import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import SearchAppBar from "./SearchAppBar.js";
import DesignIcon from "../../components/DesignIcon.js";
import DrawerComponent from "./DrawerComponent.js";
import "../../css/homepage.css";
import "../../css/design.css";

function Homepage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [designs, setDesigns] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchDesigns(user.uid);
      } else {
        setUser(null);
        setDesigns([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchDesigns = (userId) => {
    const designsRef = collection(db, "users", userId, "designs");
    const q = query(designsRef, where("createdAt", ">", new Date(0))); // Example query

    const unsubscribeDesigns = onSnapshot(q, (querySnapshot) => {
      const designList = [];
      querySnapshot.forEach((doc) => {
        designList.push({ id: doc.id, ...doc.data() });
      });
      setDesigns(designList);
    });

    return () => unsubscribeDesigns();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleCreateProject = async () => {
    try {
      const designId = new Date().getTime().toString(); // Generate a unique ID
      const currentUser = auth.currentUser;

      if (currentUser) {
        const designRef = doc(
          db,
          "users",
          currentUser.uid,
          "designs",
          designId
        );
        await setDoc(designRef, {
          name: "Untitled", // Default design name
          createdAt: new Date(),
        });

        // Navigate to the newly created design
        navigate(`/design/${designId}`);
      }
    } catch (error) {
      console.error("Error creating design: ", error);
    }
  };

  const handleDeleteDesign = async (designId) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const designRef = doc(
          db,
          "users",
          currentUser.uid,
          "designs",
          designId
        );
        await deleteDoc(designRef);
      }
    } catch (error) {
      console.error("Error deleting design: ", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`homepage ${menuOpen ? "darkened" : ""}`}>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <SearchAppBar
        user={user}
        username={username}
        onMenuClick={() => setDrawerOpen(true)}
      />

      <DrawerComponent
        isDrawerOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
        darkMode={darkMode}
        username={username}
        userEmail={user ? user.email : ""}
        designs={designs}
      />

      <div className={`content ${isDrawerOpen ? "dimmed" : ""}`}>
        <div className="header">
          <img
            style={{ height: "100px", paddingTop: "18px", marginRight: "14px" }}
            src="/img/Logo-Colored.png"
            alt="logo"
          />
          <h1 className="navName">DecorAItion</h1>
        </div>

        <div className="action-buttons">
          <button className="design-button" onClick={handleCreateProject}>
            Create a design
          </button>
          <button
            className="project-button"
            onClick={() => navigate("/project")}
          >
            Create a project
          </button>
        </div>

        <section className="recent-section">
          <div className="recent-designs">
            <h2>Recent Designs</h2>
            <Link to="/seeAllDesigns" className="seeAll">
              See All
            </Link>

            <div className="layout">
              {designs.length > 0 ? (
                designs.map((design) => (
                  <DesignIcon
                    key={design.id}
                    name={design.name}
                    designId={design.id}
                    onDelete={handleDeleteDesign}
                    onOpen={() => navigate(`/design/${design.id}`)}
                  />
                ))
              ) : (
                <div className="no-content">
                  <img src="/img/design-placeholder.png" alt="No designs yet" />
                  <p>No designs yet. Start creating.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="circle-button-container">
          {menuOpen && (
            <div className="small-buttons">
              <div className="small-button-container">
                <span className="small-button-text">Create a Project</span>
                <div className="small-circle-button">
                  <FolderIcon className="icon" />
                </div>
              </div>
              <div className="small-button-container">
                <span className="small-button-text">Create a Design</span>
                <div className="small-circle-button">
                  <ImageIcon className="icon" />
                </div>
              </div>
            </div>
          )}
          <div
            className={`circle-button ${menuOpen ? "rotate" : ""}`}
            onClick={toggleMenu}
          >
            {menuOpen ? <CloseIcon /> : <AddIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;