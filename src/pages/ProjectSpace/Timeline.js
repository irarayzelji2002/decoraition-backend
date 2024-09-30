import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/timeline.css";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import ProjectHead from "./ProjectHead";
import BottomBarDesign from "./BottomBarProject";
import { useParams } from "react-router-dom";

function Timeline() {
  const [date, setDate] = useState(new Date());
  const { projectId } = useParams();

  return (
    <>
      <ProjectHead />
      <div className="timeline-container">
        {/* Calendar Section */}
        <div className="calendar-head">
          {" "}
          <div className="calendar-section">
            <Calendar
              onChange={setDate}
              value={date}
              className="custom-calendar"
            />
          </div>
          {/* Task List */}
          <div className="task-list">
            <div className="task-item">
              <div className="task-text">
                <h3>Set up tables</h3>
                <p>Until Oct 17, 2024</p>
              </div>
              <div className="task-actions">
                <FaPen className="icon-container" />
                <FaTrashAlt className="icon-container" />
              </div>
            </div>

            <div className="task-item">
              <div className="task-text">
                <h3>Call catering</h3>
                <p>Today</p>
              </div>
              <div className="task-actions">
                <FaPen className="icon-container" />
                <FaTrashAlt className="icon-container" />
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      <BottomBarDesign Timeline={true} projId={projectId} />
    </>
  );
}

export default Timeline;
