import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Paper, IconButton, InputBase } from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Folder as FolderIcon,
  Image as ImageIcon,
  CheckCircle,
  Delete,
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

import { auth, db } from "../../firebase";
import ProjectHead from "./ProjectHead";
import Modal from "../../components/Modal";
import BottomBarDesign from "./BottomBarProject";
import Loading from "../../components/Loading";
import DesignIcon from "../../components/DesignIcon";

import "../../css/seeAll.css";
import "../../css/project.css";

function Project() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { projectId } = useParams();
  const [newName, setNewName] = useState("");
  const [userId, setUserId] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (user) {
    }
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
  }, [user]);

  const fetchDesigns = (userId) => {
    const designsRef = collection(
      db,
      "users",
      userId,
      "projects",
      projectId,
      "designs"
    );
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
  const handleCreateDesign = async () => {
    try {
      const designId = new Date().getTime().toString(); // Generate a unique ID
      const currentUser = auth.currentUser;

      if (currentUser) {
        const projectRef = doc(
          db,
          "users",
          currentUser.uid,
          "projects",
          projectId
        );

        // Design reference within the specific project
        const designRef = doc(projectRef, "designs", designId);

        await setDoc(designRef, {
          name: "Untitled", // Default design name
          createdAt: new Date(),
          projectId: projectId, // Linking design to the project
        });

        // Show toast notification when the project is created
        toast.success("Design created successfully!", {
          icon: <CheckCircle />,
          position: "top-right",
          autoClose: 3000, // 3 seconds auto close
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            color: "var(--color-white)",
            backgroundColor: "var(--inputBg)",
          },
          progressStyle: {
            backgroundColor: "var(--brightFont)",
          },
        });

        // Navigate to the newly created design
        setTimeout(() => navigate(`/design/${designId}`), 1500);
      }
    } catch (error) {
      console.error("Error creating design: ", error);
      toast.error("Error creating design! Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const handleDeleteDesign = async (designId) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const projectRef = doc(
          db,
          "users",
          currentUser.uid,
          "projects",
          projectId
        );

        await deleteDoc(projectRef);

        toast.success("Design deleted", {
          icon: <Delete />,
          style: {
            color: "var(--color-white)",
            backgroundColor: "var(--inputBg)",
          },
          progressStyle: {
            backgroundColor: "var(--brightFont)",
          },
        });
      }
    } catch (error) {
      console.error("Error deleting design: ", error);
    }
  };
  const handleNameChange = async () => {
    if (newName.trim() === "") {
      alert("Design name cannot be empty");
      return;
    }

    try {
      const projectRef = doc(db, "users", userId, "projects", projectId);
      await updateDoc(projectRef, { name: newName });
      setIsEditingName(false);
      toast.success("Design name updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          color: "var(--color-white)",
          backgroundColor: "var(--inputBg)",
        },
        progressStyle: {
          backgroundColor: "var(--brightFont)",
        },
      });

      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error updating design name:", error);
      alert("Failed to update design name");
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);

        const fetchProjectDetails = async () => {
          try {
            const projectRef = doc(
              db,
              "users",
              user.uid,
              "projects",
              projectId
            );
            const projectSnapshot = await getDoc(projectRef);
            if (projectSnapshot.exists()) {
              const project = projectSnapshot.data();
              setProjectData(project);
              setNewName(project.name);
            } else {
              console.error("Project not found");
            }
          } catch (error) {
            console.error("Error fetching project details:", error);
          }
        };

        fetchProjectDetails();
      } else {
        console.error("User is not authenticated");
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [projectId]);

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  if (!projectData) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="app-container">
      <ToastContainer
        progressStyle={{ backgroundColor: "var(--brightFont)" }}
      />
      <ProjectHead
        projectData={projectData}
        setIsEditingName={setIsEditingName}
        setNewName={setNewName}
        isEditingName={isEditingName}
        handleNameChange={handleNameChange}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "90%",
            marginTop: "40px",
            backgroundColor: "var(--inputBg)",
            borderRadius: "20px",
            border: "1px solid #4B4A4B",
          }}
        >
          <IconButton
            type="button"
            sx={{ p: "10px", color: "var(--color-white)" }}
            aria-label="search"
          >
            <SearchIcon sx={{ color: "var(--color-white)" }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: "var(--color-white)" }}
            placeholder="Search Item"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <main
            className="content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              overflow: "hidden",
            }}
          ></main>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "92%",

          padding: "20px",
        }}
      >
        <span
          className="SubtitleBudget"
          style={{ marginLeft: "20px", fontSize: "30px" }}
        >
          Project Name
          <br />
          <span
            className="SubtitlePrice"
            style={{
              backgroundColor: "transparent",
            }}
          >
            Designs
          </span>
        </span>

        <span className="seeAll" style={{ marginLeft: "auto " }}>
          See All
        </span>
      </div>
      <div className="layout" style={{ marginBottom: "20%" }}>
        {designs.length > 0 ? (
          designs.slice(0, 6).map((design) => (
            <DesignIcon
              key={design.id}
              name={design.name}
              designId={design.id}
              onDelete={handleDeleteDesign}
              onOpen={() =>
                navigate(`/design/${design.id}/project`, {
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

      <div className="circle-button-container">
        {menuOpen && (
          <div className="small-buttons">
            <div className="small-button-container">
              <span className="small-button-text">Import a Project</span>
              <div className="small-circle-button">
                <FolderIcon className="icon" />
              </div>
            </div>
            <div
              className="small-button-container"
              onClick={handleCreateDesign}
            >
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

      {modalOpen && <Modal onClose={closeModal} />}

      <BottomBarDesign Design={true} projId={projectId} />
    </div>
  );
}

export default Project;
