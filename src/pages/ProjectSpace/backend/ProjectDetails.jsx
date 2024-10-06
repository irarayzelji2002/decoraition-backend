import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust the import path as necessary
import { toast } from "react-toastify";

export const useHandleNameChange = (
  newName,
  userId,
  projectId,
  setIsEditingName
) => {
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
    } catch (error) {
      console.error("Error updating design name:", error);
      alert("Failed to update design name");
    }
  };

  return handleNameChange;
};

export const useProjectDetails = (
  projectId,
  setUserId,
  setProjectData,
  setNewName
) => {
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
  }, [projectId, setUserId, setProjectData, setNewName]);
};
