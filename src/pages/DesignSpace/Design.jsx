import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming you have firebase setup
import DesignHead from "../../components/DesignHead";
import { getAuth } from "firebase/auth";
import PromptBar from "./PromptBar";
import BottomBar from "./BottomBar";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import Version from "./Version";
import "../../css/design.css";
import DrawerComponent from "../Homepage/DrawerComponent";
import { FaCheckCircle, FaEllipsisV, FaAt } from "react-icons/fa"; // Icons used: Check, Dots, At symbol
import TwoFrames from "./svg/TwoFrames";
import FourFrames from "./svg/FourFrames";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { onSnapshot } from "firebase/firestore";

function Design() {
  const { designId, projectId } = useParams(); // Get designId from the URL
  const [designData, setDesignData] = useState(null);
  const [newName, setNewName] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showPromptBar, setShowPromptBar] = useState(true);
  const [numImageFrames, setNumImageFrames] = useState(2);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userId, setUserId] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [activeCommentTab, setActiveCommentTab] = useState("left"); // For "All Comments / For You"
  const [activeStatusTab, setActiveStatusTab] = useState("left"); // For "Open / Resolved"
  const [clicked, setClicked] = useState(false); // Handle click state

  // Fetch design details based on designId

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);

        const isProjectPath = window.location.pathname.includes("/project");

        let designRef;
        if (isProjectPath) {
          // Use a different reference when "/project" is in the URL
          designRef = doc(
            db,
            "users",
            user.uid,
            "projects",
            projectId,
            "designs",
            designId
          );
        } else {
          // Use the original design reference
          designRef = doc(db, "users", user.uid, "designs", designId);
        }

        const fetchDesignDetails = async () => {
          try {
            const designSnapshot = await getDoc(designRef);
            if (designSnapshot.exists()) {
              const design = designSnapshot.data();
              setDesignData(design);
              setNewName(design.name);
            } else {
              console.error("Design not found");
            }
          } catch (error) {
            console.error("Error fetching design details:", error);
          }
        };

        fetchDesignDetails();

        const unsubscribeSnapshot = onSnapshot(designRef, (doc) => {
          if (doc.exists()) {
            const design = doc.data();
            setDesignData(design);
            setNewName(design.name);
          } else {
            console.error("Design not found");
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        console.error("User is not authenticated");
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [designId]);

  const handleCommentTabClick = (side) => {
    setActiveCommentTab(side);
  };

  const handleStatusTabClick = (side) => {
    setActiveStatusTab(side);
  };
  const handleContainerClick = () => {
    setClicked((prev) => !prev); // Toggle clicked state
  };

  const handleNameChange = async () => {
    if (newName.trim() === "") {
      alert("Design name cannot be empty");
      return;
    }

    try {
      const isProjectPath = window.location.pathname.includes("/project");
      if (isProjectPath) {
        const designRef = doc(
          db,
          "users",
          userId,
          "projects",
          projectId,
          "designs",
          designId
        );
        await updateDoc(designRef, { name: newName });
      } else {
        const designRef = doc(db, "users", userId, "designs", designId);
        await updateDoc(designRef, { name: newName });
      }

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
    } catch (error) {
      console.error("Error updating design name:", error);
      alert("Failed to update design name");
    }
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const togglePromptBar = () => {
    setShowPromptBar((prev) => !prev);
  };
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden"; // Disable body scroll
    } else {
      document.body.style.overflow = "auto"; // Enable body scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Clean up on component unmount
    };
  }, [isSidebarOpen]);

  if (!designData) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div className="whole">
      <ToastContainer
        progressStyle={{ backgroundColor: "var(--brightFont)" }}
      />
      <DesignHead
        designData={designData}
        newName={newName}
        setNewName={setNewName}
        isEditingName={isEditingName}
        toggleComments={toggleComments}
        handleNameChange={handleNameChange}
        setIsEditingName={setIsEditingName}
      />

      <>
        <div className="create-design">
          <div className="workspace">
            {showMenu && <DrawerComponent />}
            {showPromptBar && <PromptBar />}
            <div className="fixed-arrow-button" onClick={togglePromptBar}>
              <div className="arrow-button">
                {showPromptBar ? (
                  <ArrowBackIosIcon sx={{ color: "var(--color-white) " }} />
                ) : (
                  <ArrowForwardIosIcon sx={{ color: "var(--color-white)" }} />
                )}
              </div>
            </div>

            <div className="working-area">
              <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="close-sidebar"
                >
                  Close
                </button>
                <div className="sidebar-content">
                  <Version />
                </div>
              </div>

              {isSidebarOpen && (
                <div
                  className="overlay"
                  onClick={() => setIsSidebarOpen(false)}
                ></div>
              )}

              <div className="frame-buttons">
                <button onClick={() => setNumImageFrames(2)}>
                  <TwoFrames />
                </button>
                <button onClick={() => setNumImageFrames(4)}>
                  <FourFrames />
                </button>
              </div>
              <div
                className={numImageFrames === 4 ? "image-grid" : "image-drop"}
              >
                {Array.from({ length: numImageFrames }).map((_, index) => (
                  <div className="image-frame" key={index}>
                    <img
                      src="../../img/Room1.png"
                      alt={`design preview ${index + 1}`}
                      className="image-preview"
                    />
                  </div>
                ))}
              </div>
            </div>
            {showComments && (
              <div className="comment-section">
                <div className="split-button">
                  <button
                    onClick={() => handleCommentTabClick("left")}
                    className={`button-side ${
                      activeCommentTab === "left" ? "active" : ""
                    }`}
                  >
                    All Comments
                  </button>
                  <button
                    onClick={() => handleCommentTabClick("right")}
                    className={`button-side ${
                      activeCommentTab === "right" ? "active" : ""
                    }`}
                  >
                    For You
                  </button>
                </div>

                <div className="split-button">
                  <button
                    onClick={() => handleStatusTabClick("left")}
                    className={`button-side ${
                      activeStatusTab === "left" ? "active" : ""
                    }`}
                  >
                    Open
                  </button>
                  <button
                    onClick={() => handleStatusTabClick("right")}
                    className={`button-side ${
                      activeStatusTab === "right" ? "active" : ""
                    }`}
                  >
                    Resolved
                  </button>
                </div>
                <div
                  className={`comment-container ${clicked ? "clicked" : ""}`}
                  onClick={handleContainerClick}
                >
                  <div className="profile-section">
                    <div className="profile-info">
                      <div className="profile-pic"></div>
                      <div className="user-details">
                        <span className="username">Juan Dela Cruz</span>
                        <span className="date">June 17, 2024</span>
                      </div>
                    </div>
                    <div className="profile-status">
                      <FaCheckCircle className="check-mark" />
                      <FaEllipsisV className="options-dots" />
                    </div>
                  </div>
                  <div className="comment-text">
                    Lorem ipsum dolor sit amet...
                  </div>

                  {clicked && (
                    <div className="reply-input">
                      <FaAt className="at-symbol" />
                      <input type="text" placeholder="Add a Reply" />
                    </div>
                  )}
                </div>
                <button className="add-comment-button">Add a comment</button>
              </div>
            )}
          </div>
        </div>
      </>

      <BottomBar design={true} designId={designId} projectId={projectId} />
    </div>
  );
}

export default Design;
