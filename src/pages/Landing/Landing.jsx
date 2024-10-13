// src/pages/Landing/Landing.jsx
import React from "react";
import "../../css/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="content-section">
        <h1>
          Hello from <span className="highlight">DecorAltion!</span>
        </h1>
        <p className="tagline">
          Let AI spark ideas for your spaces.
          <br />
          See how AI can help you think up venue, stage, and interior designs.
        </p>
        <button className="download-btn">Download for Android</button>
      </div>

      <div className="image-grid">
        <img src="image1.jpg" alt="Design 1" className="grid-image" />
        <img src="image2.jpg" alt="Design 2" className="grid-image" />
        <img src="image3.jpg" alt="Design 3" className="grid-image" />
      </div>
    </div>
  );
};

export default Landing;
