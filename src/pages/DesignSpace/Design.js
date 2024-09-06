import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import DesignHead from "../../components/DesignHead";
import PromptBar from "./PromptBar";
import BottomBar from "../../components/BottomBar";
import "../../css/design.css";

function Design() {
  const [designName, setDesignName] = useState("");
  const [showComments, setShowComments] = useState(false); // State to toggle comments
  const [comment, setComment] = useState(""); // State for comment input
  const navigate = useNavigate();

  const handleCreateDesign = async () => {
    if (designName.trim() === "") {
      alert("Please enter a design name.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const designId = new Date().getTime().toString(); // Generate a unique ID
        const designRef = doc(db, "users", user.uid, "designs", designId);

        await setDoc(designRef, {
          name: designName,
          createdAt: new Date(),
        });

        navigate("/homepage");
      } else {
        alert("User not authenticated.");
      }
    } catch (error) {
      console.error("Error creating design: ", error);
      alert("Error creating design. Please try again.");
    }
  };

  // Toggle comments section
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="whole">
      <DesignHead />
      <div className="create-design">
        <div className="workspace">
          <PromptBar />
          <div>
            <h6>Create a New Design</h6>
            <button onClick={toggleComments} className="toggle-comment-button">
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
            <input
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="Enter design name"
            />
            <button onClick={handleCreateDesign}>Create Design</button>
          </div>

          <div className="working-area">
            <div className="image-frame">
              <img
                src="./img/design-placeholder.png"
                alt="design preview"
                className="image-preview"
              />
            </div>
            {/* Button to toggle comment section */}
            <button onClick={toggleComments} className="toggle-comment-button">
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>

          {/* Comment section, shown when showComments is true */}
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

      <BottomBar />
    </div>
  );
}

export default Design;
