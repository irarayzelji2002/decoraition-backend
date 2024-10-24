import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import SearchAppBar from "./SearchAppBar.jsx";
import DesignIcon from "../../components/DesignIcon.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/homepage.css";
import "../../css/design.css";
import ProjectIcon from "./svg/ProjectIcon.jsx";
import DesignSvg from "./svg/DesignSvg.jsx";
import {
  fetchUserData,
  fetchDesigns,
  fetchProjects,
  handleCreateDesign,
  handleCreateProject,
  handleDeleteDesign,
  handleDeleteProject,
  toggleMenu,
  formatDate,
} from "./backend/HomepageFunctions.jsx";
import Loading from "../../components/Loading.jsx";
import { AddDesign, AddProject } from "../DesignSpace/svg/AddImage.jsx";

function Homepage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [designs, setDesigns] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleAuthChange = async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user, setUsername, setUser);
        await fetchDesigns(user.uid, setDesigns);
        await fetchProjects(user.uid, setProjects);
      } else {
        setUser(null);
        setDesigns([]);
        setProjects([]);
      }
      setLoading(false);
    };

    const unsubscribeAuth = onAuthStateChanged(auth, handleAuthChange);

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = designs.filter((design) =>
        design.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDesigns(results);
    } else {
      setFilteredDesigns([]); // Clear search results when no query
    }
  }, [searchQuery, designs]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className={`homepage ${menuOpen ? "darkened" : ""}`}>
      <ToastContainer />
      {menuOpen && (
        <div
          className="overlay"
          onClick={() => toggleMenu(menuOpen, setMenuOpen)}
        ></div>
      )}

      <SearchAppBar
        user={user}
        username={username}
        onMenuClick={() => setDrawerOpen(true)}
        onSearchChange={setSearchQuery}
      />

      <div className="recent-section">
        <div className="headerPlace">
          <div className="header">
            <img
              style={{
                height: "96px",
                marginRight: "14px",
              }}
              src="/img/Logo-Colored.png"
              alt="logo"
            />
            <div>
              <h1 className="navName">DecorAItion</h1>
              <p className="navTagline">Forming ideas with generative AI</p>
            </div>
          </div>{" "}
          <div className="action-buttons">
            <button
              className="design-button"
              onClick={() => handleCreateDesign(navigate, setDesigns)}
            >
              Create a design
            </button>
            <button
              className="project-button"
              onClick={() => handleCreateProject(navigate, setProjects)}
            >
              Create a project
            </button>
          </div>
        </div>

        <div className="recent-designs">
          {searchQuery && <h2>Search Results</h2>}
          {searchQuery && (
            <div className="recent-designs">
              <div className="layout">
                {filteredDesigns.length > 0 &&
                  filteredDesigns.slice(0, 3).map((design) => (
                    <DesignIcon
                      key={design.id}
                      name={design.name}
                      designId={design.id}
                      lastAccessed={design.lastAccessed}
                      onDelete={() => handleDeleteDesign(design.id, setDesigns)}
                      onOpen={() =>
                        navigate(`/design/${design.id}`, {
                          state: { designId: design.id },
                        })
                      }
                    />
                  ))}
              </div>
              {filteredDesigns.length === 0 && (
                <div className="no-content">
                  <p>No designs found.</p>
                </div>
              )}
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
              {designs.length > 0 &&
                designs.slice(0, 6).map((design) => (
                  <DesignIcon
                    key={design.id}
                    name={design.name}
                    designId={design.id}
                    lastAccessed={design.lastAccessed}
                    onDelete={() => handleDeleteDesign(design.id, setDesigns)}
                    onOpen={() =>
                      navigate(`/design/${design.id}`, {
                        state: { designId: design.id },
                      })
                    }
                  />
                ))}{" "}
            </div>
            {designs.length === 0 && (
              <div className="no-content">
                <img src="/img/design-placeholder.png" alt="No designs yet" />
                <p>No designs yet. Start creating.</p>
              </div>
            )}
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
              {projects.length > 0 &&
                projects.slice(0, 6).map((project) => (
                  <DesignIcon
                    key={project.id}
                    name={project.name}
                    designId={project.id}
                    lastAccessed={project.lastAccessed}
                    onDelete={() =>
                      handleDeleteProject(project.id, setProjects)
                    }
                    onOpen={() =>
                      navigate(`/project/${project.id}`, {
                        state: { projectId: project.id },
                      })
                    }
                  />
                ))}{" "}
            </div>
            {projects.length === 0 && (
              <div className="no-content">
                <img src="/img/design-placeholder.png" alt="No designs yet" />
                <p>No designs yet. Start creating.</p>
              </div>
            )}
          </div>
        </section>

        <div className="circle-button-container">
          {menuOpen && (
            <div className="small-buttons">
              <div className="small-button-container">
                <span className="small-button-text">Create a Project</span>
                <div
                  className="small-circle-button"
                  onClick={() => handleCreateProject(navigate, setProjects)}
                >
                  <AddProject />
                </div>
              </div>
              <div className="small-button-container">
                <span className="small-button-text">Create a Design</span>
                <div
                  className="small-circle-button"
                  onClick={() => handleCreateDesign(navigate, setDesigns)}
                >
                  <AddDesign />
                </div>
              </div>
            </div>
          )}
          <div
            className={`circle-button ${menuOpen ? "rotate" : ""}`}
            onClick={() => toggleMenu(menuOpen, setMenuOpen)}
          >
            {menuOpen ? <CloseIcon /> : <AddIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
