import React, { useState } from "react";
import "../../css/editEvent.css";
import TopBar from "../../components/TopBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

function EditEvent() {
  const [formData, setFormData] = useState({
    taskName: "Set up tables",
    startDate: "2024-07-14",
    endDate: "2024-07-17",
    description: "Lorem ipsum dolor sit amet...",
    repeat: {
      frequency: 1,
      unit: "week",
    },
    reminders: [
      { id: 1, time: "1 day, 6:00AM" },
      { id: 2, time: "2 days, 7:00AM" },
    ],
    repeatEnabled: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReminderChange = (index, value) => {
    const newReminders = [...formData.reminders];
    newReminders[index].time = value;
    setFormData((prevData) => ({
      ...prevData,
      reminders: newReminders,
    }));
  };

  const addReminder = () => {
    const newReminder = { id: Date.now(), time: "" }; // Generate a unique ID
    setFormData((prevData) => ({
      ...prevData,
      reminders: [...prevData.reminders, newReminder],
    }));
  };

  const deleteReminder = (id) => {
    const newReminders = formData.reminders.filter(
      (reminder) => reminder.id !== id
    );
    setFormData((prevData) => ({
      ...prevData,
      reminders: newReminders,
    }));
  };

  return (
    <div>
      <TopBar state={"Edit Event"} />
      <div className="edit-event">
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="taskName">Task / Event name</label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group repeat">
            <label>Repeat</label>
            <div className="repeat-inputs">
              <input
                type="number"
                name="frequency"
                value={formData.repeat.frequency}
                onChange={handleInputChange}
              />
              <select
                name="unit"
                value={formData.repeat.unit}
                onChange={handleInputChange}
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
          <div className="reminders">
            <div className="reminders-header">
              <span>Reminders</span>
              <button className="icon-button add-button" onClick={addReminder}>
                <AddIcon />
              </button>
            </div>
            {formData.reminders.map((reminder) => (
              <div key={reminder.id} className="reminder-item">
                <input
                  type="text"
                  value={reminder.time}
                  onChange={(e) =>
                    handleReminderChange(
                      formData.reminders.findIndex((r) => r.id === reminder.id),
                      e.target.value
                    )
                  }
                />
                <div className="reminder-actions">
                  <button
                    className="icon-button"
                    onClick={() => deleteReminder(reminder.id)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    className="icon-button"
                    onClick={() => {
                      /* Handle edit */
                    }}
                  >
                    <EditIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="edit-event-button">Edit event</button>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
