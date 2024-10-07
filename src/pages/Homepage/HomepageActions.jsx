import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Navigate } from "react-router-dom";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { CheckCircle } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete.js";
import "react-toastify/dist/ReactToastify.css";
import "../../css/homepage.css";
import "../../css/design.css";

export const handleLogout = () => {
  const navigate = Navigate;
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.error("Sign-out error:", error);
    });
};

export const handleSettings = () => {
  const navigate = Navigate;
  signOut(auth)
    .then(() => {
      navigate("/settings");
    })
    .catch((error) => {
      console.error("Settings error:", error);
    });
};

export const toggleDarkMode = (darkMode, setDarkMode) => {
  setDarkMode(!darkMode);
  document.body.classList.toggle("dark-mode", !darkMode);
};

export const handleCreateDesign = async (setDesigns) => {
  const navigate = Navigate;
  try {
    const designId = new Date().getTime().toString(); // Generate a unique ID
    const currentUser = auth.currentUser;

    if (currentUser) {
      const designRef = doc(db, "users", currentUser.uid, "designs", designId);
      await setDoc(designRef, {
        name: "Untitled", // Default design name
        createdAt: new Date(),
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

export const handleCreateProject = async (setProjects) => {
  const navigate = Navigate;
  try {
    const projectId = new Date().getTime().toString(); // Generate a unique ID
    const currentUser = auth.currentUser;

    if (currentUser) {
      const designRef = doc(
        db,
        "users",
        currentUser.uid,
        "projects",
        projectId
      );
      await setDoc(designRef, {
        name: "Untitled", // Default design name
        createdAt: new Date(),
      });

      // Show toast notification when the project is created
      toast.success("Project created successfully!", {
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
      setTimeout(() => navigate(`/project/${projectId}`), 1500);
    }
  } catch (error) {
    console.error("Error creating project: ", error);
    toast.error("Error creating project! Please try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};

export const handleDeleteDesign = async (designId) => {
  try {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const designRef = doc(db, "users", currentUser.uid, "designs", designId);
      await deleteDoc(designRef);

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

export const toggleMenu = (menuOpen, setMenuOpen) => {
  setMenuOpen(!menuOpen);
};
