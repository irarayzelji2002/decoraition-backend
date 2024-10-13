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
        <button className="download-btn">Login Now!</button>
      </div>

      {/* <div className="image-grid">
        <img src="/img/landing-image.png" alt="Design 1" className="grid-image"/>
      </div> */}
    </div>
  );
};

export default Landing;
