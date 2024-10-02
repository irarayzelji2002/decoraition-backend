import "../../css/project.css";
import ProjectHead from "./ProjectHead";
import BottomBarDesign from "./BottomBarProject";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ExportIcon from "./svg/ExportIcon";

function ProjBudget() {
  const [designData, setDesignData] = useState(null);
  const [newName, setNewName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showPromptBar, setShowPromptBar] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { projectId } = useParams();

  const handleNameChange = async () => {
    if (newName.trim() === "") {
      alert("Design name cannot be empty");
      return;
    }
  };
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleEditNameToggle = () => {
    setIsEditingName((prev) => !prev);
  };

  const togglePromptBar = () => {
    setShowPromptBar((prev) => !prev);
  };
  return (
    <>
      <ProjectHead
        designData={designData}
        newName={newName}
        setNewName={setNewName}
        isEditingName={isEditingName}
        toggleComments={toggleComments}
        handleNameChange={handleNameChange}
        setIsEditingName={setIsEditingName}
        handleEditNameToggle={handleEditNameToggle}
        setPromptBarOpen={togglePromptBar}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="budgetHolder">
        <div className="sectionBudget">
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="SubtitleBudget" style={{ fontSize: "30px" }}>
                Budget
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
      </div>

      <BottomBarDesign Budget={true} projId={projectId} />
    </>
  );
}

export default ProjBudget;
