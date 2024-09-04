import React from "react";
import "../css/homepage.css";

function DesignIcon({ name }) {
  return (
    <div className="iconFrame">
      <div className="options">
        <h3 className="selectOption">
          <center>&#8942;</center>
        </h3>
      </div>
      <img src="/img/logoWhitebg.png" className="pic" alt="Design" />

      <h3 className="titleDesign">{name}</h3>
    </div>
  );
}

export default DesignIcon;
