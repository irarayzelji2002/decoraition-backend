import React from "react";
import { Tabs, Tab, Select, MenuItem, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CommentContainer from "./CommentContainer";


function CommentTabs({
  activeTab,
  handleTabChange,
  status,
  handleStatusChange,
  handleCloseComments, // Add this prop
}) {
  return (
    <div className="comment-section">
      <div className="comment-tabs-header">
        <IconButton onClick={handleCloseComments} className="close-icon-button">
          <CloseIcon sx={{ color: "var(--color-white)" }} />
        </IconButton>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundImage: "var(--gradientFont)", // Customize the indicator color
            },
          }}
        >
          <Tab
            className={`tabStyle ${activeTab === 0 ? "Mui-selected" : ""}`}
            label={
              <span style={{ fontWeight: "bold", textTransform: "none" }}>
                All Comments
              </span>
            }
          />
          <Tab
            className={`tabStyle ${activeTab === 1 ? "Mui-selected" : ""}`}
            label={
              <span style={{ fontWeight: "bold", textTransform: "none" }}>
                For You
              </span>
            }
          />
        </Tabs>
      </div>

      <Select
        value={status}
        onChange={handleStatusChange}
        displayEmpty
        className="status-select"
      >
        <MenuItem value="Open">
        
        Open</MenuItem>
        <MenuItem value="Resolved">Resolved</MenuItem>
      </Select>

      {activeTab === 0 && (
        <>
          <CommentContainer />
          <button className="add-comment-button">Add a comment</button>
        </>
      )}
      {activeTab === 1 && (
        <>
          <CommentContainer />
          <button className="add-comment-button">Add a comment</button>
        </>
      )}
    </div>
  );
}

export default CommentTabs;
