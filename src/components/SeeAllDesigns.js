import React, { useState } from "react";
import SearchAppBar from "../pages/Homepage/SearchAppBar.js";
import DrawerComponent from "../pages/Homepage/DrawerComponent.js";
import "../css/seeAll.css"; 

export default function SeeAllDesigns() {
  /*const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  }; */

  return (
    // <SearchAppBar
    //     onMenuClick={() => setDrawerOpen(true)}
    //     // You might need to pass additional props if required by SearchAppBar
    //   />

    //   <DrawerComponent
    //     isDrawerOpen={isDrawerOpen}
    //     onClose={() => setDrawerOpen(false)}
    //     toggleDarkMode={toggleDarkMode}
    //     darkMode={darkMode}
    //     // Other props might be optional or required based on DrawerComponent
    //   />

    //   <div className={`content ${isDrawerOpen ? "dimmed" : ""}`}>
    //     <div className="header">
    //       <img
    //         style={{
    //           height: "100px",
    //           paddingTop: "18px",
    //           marginRight: "14px",
    //         }}
    //         src="/img/Logo-Colored.png"
    //         alt="logo"
    //       />
    //       <h1 className="navName">See All Designs</h1>
    //     </div>
    <div>
      <div className="dropdown-container">
        <div className="dropdown">
          <span>Owner</span>
          <span className="dropdown-icon">⌄</span>
        </div>
        <div className="dropdown">
          <span>Date Modified</span>
          <span className="dropdown-icon">⌄</span>
        </div>
        <div className="dropdown">
          <span>Date Created</span>
          <span className="dropdown-icon">⌄</span>
        </div>
        <div className="dropdown">
          <span>Sort by</span>
          <span className="dropdown-icon">⌄</span>
        </div>
        <div className="dropdown">
          <span>Order</span>
          <span className="dropdown-icon">⌄</span>
        </div>
      </div>
      <section className="recent-section">
        <div className="recent-designs">{/* Add content here */}</div>
      </section>
    </div>
  );
}