import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import DesignHead from "../../components/DesignHead";
import "../../css/design.css";

function Design() {
  const [designName, setDesignName] = useState("");
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
          // Add other design fields as necessary
        });

        // Redirect to homepage or another page
        navigate("/homepage");
      } else {
        alert("User not authenticated.");
      }
    } catch (error) {
      console.error("Error creating design: ", error);
      alert("Error creating design. Please try again.");
    }
  };

  return (
    <div>
      <DesignHead />
      <div className="create-design">
        <h1>Create a New Design</h1>
        <input
          type="text"
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
          placeholder="Enter design name"
        />
        <button onClick={handleCreateDesign}>Create Design</button>
       
      </div>
    </div>
  );
}

export default Design;
