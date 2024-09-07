import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import DesignHead from "../../components/DesignHead";
import PromptBar from "./PromptBar";
import BottomBar from "../../components/BottomBar";
import "../../css/design.css";

function Design() {
  const [designName, setDesignName] = useState("Untitled");
  const [designId, setDesignId] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [numImageFrames, setNumImageFrames] = useState(2);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const createInitialDesign = async () => {
      const user = auth.currentUser;
      if (user) {
        const newDesignId = new Date().getTime().toString();
        const designRef = doc(db, "users", user.uid, "designs", newDesignId);

        try {
          await setDoc(designRef, {
            name: "Untitled",
            createdAt: new Date(),
          });
          setDesignId(newDesignId);
        } catch (error) {
          console.error("Error creating initial design:", error);
          alert("Failed to create initial design.");
        }
      } else {
        alert("User not authenticated.");
        navigate("/");
      }
    };

    createInitialDesign();
  }, [navigate]);

  const handleUpdateDesignName = (newName) => {
    setNewName(newName);
    setShowConfirmation(true);
  };

  const confirmNameChange = async () => {
    if (designId) {
      try {
        const user = auth.currentUser;
        if (user) {
          const designRef = doc(db, "users", user.uid, "designs", designId);
          await updateDoc(designRef, { name: newName });
          setDesignName(newName);
          setShowConfirmation(false);
        }
      } catch (error) {
        console.error("Error updating design name:", error);
        alert("Failed to update design name.");
      }
    }
  };

  const cancelNameChange = () => {
    setNewName("");
    setShowConfirmation(false);
  };

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <div className="whole">
      <DesignHead
        designName={designName}
        setDesignName={handleUpdateDesignName}
        toggleComments={toggleComments}
      />

      <div className="create-design">
        <div className="workspace">
          <PromptBar />
          <div className="frame-buttons">
            <button onClick={() => setNumImageFrames(2)}>2 Image Frames</button>
            <button onClick={() => setNumImageFrames(4)}>4 Image Frames</button>
          </div>
          <div className="working-area">
            {Array.from({ length: numImageFrames }).map((_, index) => (
              <div className="image-frame" key={index}>
                <img
                  src="../../img/logoWhitebg.png"
                  alt={`design preview ${index + 1}`}
                  className="image-preview"
                />
              </div>
            ))}
          </div>
          {showComments && (
            <div className="comment-section">
              <h4>Comments</h4>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment here..."
              />
              <button className="add-comment-button">Submit Comment</button>
            </div>
          )}
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to change the design name to "{newName}"?</p>
          <button onClick={confirmNameChange}>Confirm</button>
          <button onClick={cancelNameChange}>Cancel</button>
        </div>
      )}
      <BottomBar />
    </div>
  );
}

export default Design;
