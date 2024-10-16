import React from "react";
import "../../css/landing.css";
import { useNavigate } from "react-router-dom";

const features = [
  {
    img: "/img/ai-icon.png",
    title: "AI helps you come up with design ideas",
    description:
      "Great for people who plan events, decorate homes, own businesses, and live in houses. DecorAItion Planner helps with all your decorating tasks. You can plan your designs if you're a pro or just like to do it yourself.",
  },
  {
    img: "/img/easy-icon.png",
    title: "Made for anyone",
    description:
      "Great for people who plan events, decorate homes, own businesses, and live in houses. DecorAItion Planner helps with all your decorating tasks. You can plan your designs if you're a pro or just like to do it yourself.",
  },
  {
    img: "/img/team-icon.png",
    title: "Team up and give feedback without stress",
    description:
      "Work with your team by sharing and handling designs in the app. Write comments and get feedback from peers. Join forces to make your ideas real.",
  },
  {
    img: "/img/track-icon.png",
    title: "Keep all your project plans in one place",
    description:
      "Take care of designs for venues or floors with tools that map spaces, show timelines, and help you manage your budget. Keep all your design plans neat and easy to find.",
  },
  {
    img: "/img/track-icon.png",
    title: "Track your design changes",
    description:
      "See all the changes made to your designs as time goes by. Bring back old versions without any trouble. Get your projects on your device with no fuss.",
  },
];

const Landing = () => {
  const navigate = useNavigate();
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
        <button className="download-btn" onClick={() => navigate("/login")}>
          Login Now!
        </button>
      </div>

      <div className="features-section">
        <h2>Why pick our app?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              className={`feature feature-${index % 2 === 0 ? "odd" : "even"}`}
              key={index}
            >
              <div className="feature-icon">
                <img src={feature.img} alt={"icon"} />
              </div>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="makeover-section">
        <h3>
          Want to give your spaces a <span className="highlight">Makeover</span>
          ?
        </h3>
        <p>Get DecorAltion Planner today.</p>
        <p>Start your path to wonderfully designed spaces now!</p>
        <button className="download-btn">Login Now</button>
      </div>
    </div>
  );
};

export default Landing;
