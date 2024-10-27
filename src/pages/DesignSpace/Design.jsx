import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming you have firebase setup
import DesignHead from "../../components/DesignHead";
import { getAuth } from "firebase/auth";
import PromptBar from "./PromptBar";
import BottomBar from "./BottomBar";
import Loading from "../../components/Loading";
import CommentTabs from "./CommentTabs";
import { ToastContainer, toast } from "react-toastify";
import Version from "./Version";
import "../../css/design.css";
import TwoFrames from "./svg/TwoFrames";
import FourFrames from "./svg/FourFrames";
import CommentContainer from "./CommentContainer";
import { onSnapshot } from "firebase/firestore";
import { Tabs, Tab } from "@mui/material";
import {
  handleNameChange,
  toggleComments,
  togglePromptBar,
  handleSidebarEffect,
} from "./backend/DesignActions"; // Import the functions from the backend file

function Design() {
  const { designId, projectId } = useParams(); // Get designId from the URL
  const [designData, setDesignData] = useState(null);
  const [newName, setNewName] = useState("");
  const [showComments, setShowComments] = useState(false);

  const [showPromptBar, setShowPromptBar] = useState(true);
  const [numImageFrames, setNumImageFrames] = useState(2);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState("Open");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const handleError = (event) => {
      if (
        event.message ===
        "ResizeObserver loop completed with undelivered notifications."
      ) {
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        // Use the original design reference
        const designRef = doc(db, "designs", designId);
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
            await updateDoc(designRef, {
              lastAccessed: new Date(),
            });
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

  useEffect(() => {
    const cleanup = handleSidebarEffect(isSidebarOpen);
    return cleanup;
  }, [isSidebarOpen]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleNotifClick = () => {
    setIsNotifOpen(true);
  };

  const handleNotifClose = () => {
    setIsNotifOpen(false);
  };

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
        toggleComments={() => toggleComments(setShowComments)}
        handleNameChange={() =>
          handleNameChange(
            newName,
            userId,
            projectId,
            designId,
            setIsEditingName
          )
        }
        setIsEditingName={setIsEditingName}
        setIsSidebarOpen={handleNotifClick}
      />

      <>
        <div className="create-design">
          <div className="workspace">
            {showPromptBar && <PromptBar />}
            <div
              className="fixed-arrow-button"
              onClick={() => togglePromptBar(setShowPromptBar)}
            ></div>

            <Version isDrawerOpen={isNotifOpen} onClose={handleNotifClose} />

            <div className="working-area">
              <div className="frame-buttons">
                <button onClick={() => setNumImageFrames(2)}>
                  <TwoFrames />
                </button>
                <button onClick={() => setNumImageFrames(4)}>
                  <FourFrames />
                </button>
              </div>
              <div
                className={
                  numImageFrames === 4 ? "image-grid-design" : "image-drop"
                }
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
              <CommentTabs
                activeTab={activeTab}
                handleTabChange={handleTabChange}
                status={status}
                handleStatusChange={handleStatusChange}
              />
            )}
          </div>
        </div>
      </>

      <BottomBar design={true} designId={designId} projectId={projectId} />
    </div>
  );
}

export default Design;
