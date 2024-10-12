import "../../css/project.css";
import ProjectHead from "./ProjectHead";
import BottomBarDesign from "./BottomBarProject";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ExportIcon from "./svg/ExportIcon";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  fetchDesigns,
  handleCreateDesign,
  handleDeleteDesign,
} from "./backend/ProjectDetails";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
function ProjBudget() {
  const { projectId } = useParams();
  const [newName, setNewName] = useState("");
  const [userId, setUserId] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (user) {
    }
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchDesigns(currentUser.uid, projectId, setDesigns);
      } else {
        setUser(null);
        setDesigns([]);
      }
    });

    return () => unsubscribeAuth();
  }, [user]);

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

              // Listen for real-time updates to the project document
              const unsubscribeProject = onSnapshot(projectRef, (doc) => {
                if (doc.exists()) {
                  const updatedProject = doc.data();
                  setProjectData(updatedProject);
                  setNewName(updatedProject.name);
                }
              });

              // Cleanup listener on component unmount
              return () => unsubscribeProject();
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

  return (
    <>
      <ToastContainer />
      <ProjectHead />
      <div className="budgetHolder">
        <span
          className="priceSum"
          style={{
            backgroundColor: "#397438",
            marginBottom: "20px",
          }}
        >
          Total Budget: ₱ <strong>1231312</strong>
        </span>
        <div>
          {designs.length > 0 ? (
            designs.slice(0, 6).map((design) => (
              <div className="sectionBudget">
                <div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      className="SubtitleBudget"
                      style={{ fontSize: "30px" }}
                    >
                      {design.name}
                    </span>
                    <span className="SubtitlePrice">Php 300.00</span>
                  </div>

                  <div className="image-frame">
                    <img
                      src="../../img/logoWhitebg.png"
                      alt={`design preview `}
                      className="image-preview"
                    />
                  </div>
                </div>
                <div className="itemList">
                  <div className="item">
                    <img
                      src="../../img/logoWhitebg.png"
                      alt={`design preview `}
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div
                      style={{
                        marginLeft: "12px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span className="SubtitleBudget">Item Name</span>
                      <span
                        className="SubtitlePrice"
                        style={{ backgroundColor: "transparent" }}
                      >
                        Php 300.00
                      </span>
                    </div>
                  </div>
                  <div className="item">
                    <img
                      src="../../img/logoWhitebg.png"
                      alt={`design preview `}
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div
                      style={{
                        marginLeft: "12px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span className="SubtitleBudget">Item Name</span>
                      <span
                        className="SubtitlePrice"
                        style={{ backgroundColor: "transparent" }}
                      >
                        Php 300.00
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ height: "100%" }}>
                  <ExportIcon />
                </div>
              </div>
            ))
          ) : (
            <div className="no-content">
              <img src="/img/design-placeholder.png" alt="No designs yet" />
              <p>No designs yet. Start creating.</p>
            </div>
          )}
        </div>
      </div>

      <BottomBarDesign Budget={true} projId={projectId} />
    </>
  );
}

export default ProjBudget;
