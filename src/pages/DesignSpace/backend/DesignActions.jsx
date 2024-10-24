// designHandlers.js
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../firebase"; // Adjust the import path as needed

export const handleCommentTabClick = (side, setActiveCommentTab) => {
  setActiveCommentTab(side);
};

export const handleStatusTabClick = (side, setActiveStatusTab) => {
  setActiveStatusTab(side);
};

export const handleContainerClick = (setClicked) => {
  setClicked((prev) => !prev); // Toggle clicked state
};

export const handleNameChange = async (
  newName,
  userId,
  projectId,
  designId,
  setIsEditingName
) => {
  if (newName.trim() === "") {
    alert("Design name cannot be empty");
    return;
  }

  try {
    const isProjectPath = window.location.pathname.includes("/project");
    const designRef = isProjectPath
      ? doc(db, "projects", projectId, "designs", designId)
      : doc(db, "designs", designId);

    await updateDoc(designRef, { name: newName });

    setIsEditingName(false);
    toast.success("Design name updated successfully!", {
      className: "custom-toast-success", // Apply custom class name
    });
  } catch (error) {
    console.error("Error updating design name:", error);
    alert("Failed to update design name");
  }
};

export const toggleComments = (setShowComments) => {
  setShowComments((prev) => !prev);
};

export const togglePromptBar = (setShowPromptBar) => {
  setShowPromptBar((prev) => !prev);
};

export const handleSidebarEffect = (isSidebarOpen) => {
  if (isSidebarOpen) {
    document.body.style.overflow = "hidden"; // Disable body scroll
  } else {
    document.body.style.overflow = "auto"; // Enable body scroll
  }

  return () => {
    document.body.style.overflow = "auto"; // Clean up on component unmount
  };
};
