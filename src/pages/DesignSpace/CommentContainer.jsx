import React, { useState, useRef, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { FaCheckCircle, FaEllipsisV, FaAt } from "react-icons/fa";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";

const CommentContainer = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const optionsRef = useRef(null);

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setShowOptions(false); // Close options when modal opens
  };
  const handleClickOutside = (event) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="comment-container">
      <div className="profile-section">
        <div className="profile-info">
          <Avatar
            sx={{
              height: 30,
              width: 30,
              borderRadius: "50%",
              marginRight: "10px",
              background: "var(--gradientButton)",
              border: "2px solid var(--brightFont)",
              color: "white", // Optional: to set the text color inside the avatar
            }}
          ></Avatar>
          <div className="user-details">
            <span className="username">Juan Dela Cruz</span>
            <span style={{ fontSize: "0.7rem" }} className="date">
              June 17, 2024
            </span>
          </div>
        </div>
        <div className="profile-status">
          <FaCheckCircle className="check-mark" />
          <FaEllipsisV className="options-dots" onClick={toggleOptions} />{" "}
          {showOptions && (
            <div ref={optionsRef} className="dropdown-menu">
              <div className="dropdown-item">
                <CheckCircleOutlineOutlinedIcon
                  style={{ fontSize: 20 }}
                  className="icon"
                />
                Resolve
              </div>
              <div className="dropdown-item">
                <DriveFileRenameOutlineRoundedIcon
                  style={{ fontSize: 20 }}
                  className="icon"
                />
                Edit
              </div>
              <div className="dropdown-item" onClick={openDeleteModal}>
                <DeleteIcon style={{ fontSize: 20 }} className="icon" />
                Delete
              </div>
            </div>
          )}
        </div>

        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={closeDeleteModal}
        />
      </div>
      {/* reply portion */}
      <p> I like the room design! Could we add some more table sheets?</p>
      <div className="reply-input">
        <FaAt className="at-symbol" />
        <input type="text" placeholder="Add a Reply" />
      </div>
    </div>
  );
};

export default CommentContainer;
