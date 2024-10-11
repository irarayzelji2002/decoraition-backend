import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/timeline.css";
import ProjectHead from "./ProjectHead";
import BottomBarDesign from "./BottomBarProject";
import { useParams } from "react-router-dom";
import EditPen from "../DesignSpace/svg/EditPen";
import Trash from "../DesignSpace/svg/Trash";
import { fetchTasks } from "./backend/ProjectDetails";
import { ToastContainer } from "react-toastify";
import { auth } from "../../firebase";

function Timeline() {
  const [date, setDate] = useState(new Date());
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const fetchAndSetTasks = async () => {
        await fetchTasks(currentUser.uid, projectId, setTasks);
      };

      fetchAndSetTasks();

      const intervalId = setInterval(fetchAndSetTasks, 60000); // Refresh every 60 seconds

      return () => clearInterval(intervalId);
    }
  }, [projectId]);

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <ProjectHead />
      <ToastContainer />
      <div className="timeline-container">
        {/* Calendar Section */}
        <div className="calendar-head">
          <div className="calendar-section">
            <Calendar
              onChange={setDate}
              value={date}
              className="custom-calendar"
            />
          </div>
          <div className="add-event-button">
            <button
              className="design-button"
              onClick={() => (window.location.href = `/editEvent/${projectId}`)}
            >
              Add Event for {formatDate(date)}
            </button>
          </div>
          {/* Task List */}
          <div className="task-list">
            <h2>All Tasks</h2>
            {tasks.length === 0 ? (
              <p>No tasks available</p>
            ) : (
              tasks.map((task) => (
                <div className="task-item" key={task.id}>
                  <div className="task-text">
                    <h3>{task.taskName}</h3>
                    <p>Until {new Date(task.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="task-actions">
                    <EditPen />
                    <Trash />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomBarDesign Timeline={true} projId={projectId} />
    </>
  );
}

export default Timeline;
