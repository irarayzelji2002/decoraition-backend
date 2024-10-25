import React from "react";
import Avatar from "@mui/material/Avatar";
import { FaCheckCircle, FaEllipsisH, FaCircle } from "react-icons/fa";

function Notif() {
  return (
    <div>
      <div className="notif-box">
        <div className="profile-section">
          <div className="profile-info">
            <FaCircle
              style={{
                marginRight: "4px",
                color: "red",
              }}
            />
            <Avatar
              sx={{
                height: 40,
                width: 40,
                borderRadius: "50%",
                marginRight: "10px",
                background: "var(--gradientButton)",
                border: "2px solid var(--brightFont)",
                color: "white", // Optional: to set the text color inside the avatar
              }}
            ></Avatar>
            <div className="user-details">
              <span className="username"></span>
              <span style={{ fontSize: "0.7rem" }} className="date">
                <strong> Jakob</strong> made a comment on your post
              </span>
              <span style={{ fontSize: "0.7rem" }} className="date">
                <strong>-</strong> "I like the design!"
              </span>
            </div>
          </div>
          <div
            className="profile-status"
            style={{
              marginLeft: "4px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "0.5rem" }} className="date">
              <strong>15h</strong>
            </span>
            <FaEllipsisH className="options-dots" />
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
}

export default Notif;
