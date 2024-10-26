import React from "react";
import TopBar from "../../components/TopBar";
import "../../css/details.css";
import { NavigateNext } from "@mui/icons-material";

function Details() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <TopBar state="Details" />
      <div className="details-container">
        <div className="content">
          <img
            className="room-image"
            src="../../img/logoWhitebg.png"
            alt="Room 1803"
          />
          <div className="room-info">
            <h1>Room 1803</h1>
            <p>Type</p>
            <p>
              <strong>Design</strong>
            </p>
            <p>Created</p>
            <p>
              <strong>July 7, 2024 at 8:00pm by Juan Dela Cruz</strong>
            </p>
            <p>Modified</p>
            <p>
              <strong>July 7, 2024 at 8:01pm by Juan Dela Cruz</strong>
            </p>
            <p>Owner</p>
            <p>
              <strong>Juan Dela Cruz</strong>
            </p>
          </div>
          <div className="access-portion">
            <h3>Who has Access</h3>
            <NavigateNext style={{ marginLeft: "auto", marginRight: "12px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
