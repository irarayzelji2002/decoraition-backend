import React, { useState } from "react";
import { db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import SearchAppBar from "./SearchAppBar.jsx";
import DesignIcon from "../../components/DesignIcon.jsx";
import DrawerComponent from "./DrawerComponent.jsx";
import { ToastContainer } from "react-toastify";
import { useUserData } from "./UserDetails";
import "react-toastify/dist/ReactToastify.css";
import "../../css/homepage.css";
import "../../css/design.css";
import ProjectIcon from "./svg/ProjectIcon.jsx";
import DesignSvg from "./svg/DesignSvg.jsx";
import {
  handleLogout,
  handleSettings,
  toggleDarkMode,
  handleCreateDesign,
  handleCreateProject,
  handleDeleteDesign,
  toggleMenu,
} from "./HomepageActions.jsx";

function Homepage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [designs, setDesigns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState([]);

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

  const fetchProjects = (userId) => {
    const projectsRef = collection(db, "users", userId, "projects");
    const q = query(projectsRef, where("createdAt", ">", new Date(0))); // Example query

    const unsubscribeDesigns = onSnapshot(q, (querySnapshot) => {
      const projectList = [];
      querySnapshot.forEach((doc) => {
        projectList.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectList);
    });

    return () => unsubscribeDesigns();
  };

  useUserData(
    user,
    setUser,
    setUsername,
    fetchDesigns,
    setDesigns,
    fetchProjects,
    setProjects
  );

  return (
    <div className={`homepage ${menuOpen ? "darkened" : ""}`}>
      <ToastContainer />
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <SearchAppBar
        user={user}
        username={username}
        onMenuClick={() => setDrawerOpen(true)}
        onSearchChange={setSearchQuery}
      />

      <DrawerComponent
        isDrawerOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        toggleDarkMode={toggleDarkMode}
        handleLogout={handleLogout}
        handleSettings={handleSettings}
        darkMode={darkMode}
        pic={user?.profilePicture}
      />

      <div className={`content ${isDrawerOpen ? "dimmed" : ""}`}>
        <div className="header">
          <img
            style={{ height: "100px", paddingTop: "18px", marginRight: "14px" }}
            src="/img/Logo-Colored.png"
            alt="logo"
          />
          <div>
            <h1 className="navName">DecorAItion</h1>
            <p className="navTagline">Forming ideas with generative AI</p>
          </div>
        </div>

        <div className="action-buttons">
          <button className="design-button" onClick={handleCreateDesign}>
            Create a design
          </button>
          <button className="project-button" onClick={handleCreateProject}>
            Create a project
          </button>
        </div>

        <div className="recent-designs">
          {searchQuery && <h2>Search Results</h2>}
          {searchQuery && (
            <div
              style={{
                display: "flex",
                textAlign: "left",
                width: "100%",
                marginLeft: "20px",
              }}
            >
              <div className="layout" style={{ marginBottom: "100px" }}>
                {filteredDesigns.length > 0 ? (
                  filteredDesigns.slice(0, 3).map((design) => (
                    <DesignIcon
                      key={design.id}
                      name={design.name}
                      designId={design.id}
                      onDelete={handleDeleteDesign}
                      onOpen={() =>
                        navigate(`/design/${design.id}`, {
                          state: { designId: design.id },
                        })
                      }
                    />
                  ))
                ) : (
                  <div className="no-content">
                    <p>No designs found.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <section className="recent-section">
          <div className="recent-designs">
            <div className="separator">
              <DesignSvg />
              <h2>Recent Designs</h2>{" "}
              <Link
                to="/seeAllDesigns"
                className="seeAll"
                style={{ marginLeft: "auto" }}
              >
                See All
              </Link>
            </div>

            <div className="layout">
              {designs.length > 0 ? (
                designs.slice(0, 6).map((design) => (
                  <DesignIcon
                    key={design.id}
                    name={design.name}
                    designId={design.id}
                    onDelete={handleDeleteDesign}
                    onOpen={() =>
                      navigate(`/design/${design.id}`, {
                        state: { designId: design.id },
                      })
                    }
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

        <section className="recent-section">
          <div className="recent-designs">
            <div className="separator">
              <ProjectIcon />
              <h2>Recent Projects</h2>{" "}
              <Link
                to="/seeAllProjects"
                className="seeAll"
                style={{ marginLeft: "auto" }}
              >
                See All
              </Link>
            </div>

            <div className="layout">
              {projects.length > 0 ? (
                projects.slice(0, 6).map((project) => (
                  <DesignIcon
                    key={project.id}
                    name={project.name}
                    designId={project.id}
                    onDelete={handleDeleteDesign}
                    onOpen={() =>
                      navigate(`/project/${project.id}`, {
                        state: { projectId: project.id },
                      })
                    }
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
                <div
                  className="small-circle-button"
                  onClick={handleCreateProject}
                >
                  <FolderIcon className="icon" />
                </div>
              </div>
              <div className="small-button-container">
                <span className="small-button-text">Create a Design</span>
                <div
                  className="small-circle-button"
                  onClick={handleCreateDesign}
                >
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
