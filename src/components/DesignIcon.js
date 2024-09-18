import React, { useState } from "react";
import "../css/homepage.css";

function DesignIcon({ name, designId, onOpen, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);

  // Toggle the visibility of options
  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="iconFrame">
      {/* Options button */}
      <div className="options" onClick={toggleOptions}>
        <h3 className="selectOption">
          <center>&#8942;</center>
        </h3>
        {showOptions && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={onOpen}>
              <span className="icon"></span> Open
            </div>
            <div className="dropdown-item" onClick={() => onDelete(designId)}>
              <span className="icon"></span> Delete
            </div>
            <div className="dropdown-item">
              <span className="icon"></span> Copy Link
            </div>
            <div className="dropdown-item">
              <span className="icon"></span> Rename
            </div>
            <div className="dropdown-item">
              <span className="icon"></span> Details
            </div>
          </div>
        )}
      </div>

      {/* Design image */}
      <img
        src="/img/logoWhitebg.png"
        className="pic"
        alt="Design"
        onClick={onOpen}
        style={{ objectFit: "cover", objectPosition: "top left" }}
      />

      {/* Design title */}
      <h3 className="titleDesign">{name}</h3>
    </div>
  );
}

export default DesignIcon;
