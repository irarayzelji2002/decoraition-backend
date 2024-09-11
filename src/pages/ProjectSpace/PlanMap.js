import "../../css/project.css";
import React, { useState } from "react";
import ProjectHead from "../../components/ProjectHead";
import "../../css/project.css";
import MapPin from "./MapPin";
import BottomBarDesign from "../../components/BottomBarProject";
import "../../css/seeAll.css";

function PlanMap() {
  return (
    <div className="app-container">
      <ProjectHead />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="budgetSpace">
          <div className="image-frame">
            <img
              src="../../img/logoWhitebg.png"
              alt={`design preview `}
              className="image-preview"
            />
          </div>
        </div>
        <div className="budgetSpace">
          <MapPin />
          <MapPin />
        </div>
      </div>
      <BottomBarDesign PlanMap={true} />
    </div>
  );
}

export default PlanMap;
