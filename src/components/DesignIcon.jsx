import React, { useState } from "react";
import "../css/homepage.css";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import CopyLinkModal from "./CopyLinkModal";
import RenameModal from "./RenameModal";

function DesignIcon({ name, designId, onOpen, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCopyLinkModal, setShowCopyLinkModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);

  // Toggle the visibility of options
  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setShowOptions(false); // Close options when modal opens
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    onDelete(designId);
    closeDeleteModal();
  };

  const openCopyLinkModal = () => {
    // Simulate copying the link ( may implement actual copy logic here)
    navigator.clipboard.writeText(`https://yourapp.com/designs/${designId}`);
    setShowCopyLinkModal(true);
    setShowOptions(false); // Close options when modal opens
  };

  const closeCopyLinkModal = () => {
    setShowCopyLinkModal(false);
  };

  const openRenameModal = () => {
    setShowRenameModal(true);
    setShowOptions(false); // Close options when modal opens
  };

  const closeRenameModal = () => {
    setShowRenameModal(false);
  };

  const handleRename = () => {
    // Implement rename logic here (e.g., API call to rename)
    closeRenameModal();
  };

  return (
    <div className="iconFrame">
      {/* Options button */}
      <div className="options" onClick={toggleOptions}>
        <h3 className="selectOption">
          <center>&#8942;</center>
        </h3>
        {showOptions && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={onOpen}>
              <span className="icon"></span> Open
            </div>
            <div className="dropdown-item" onClick={openDeleteModal}>
              <span className="icon"></span> Delete
            </div>
            <div className="dropdown-item" onClick={openCopyLinkModal}>
              <span className="icon"></span> Copy Link
            </div>
            <div className="dropdown-item" onClick={openRenameModal}>
              <span className="icon"></span> Rename
            </div>
            <div className="dropdown-item">
              <span className="icon"></span> Details
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
      />

      {/* Copy Link Modal */}
      <CopyLinkModal isOpen={showCopyLinkModal} onClose={closeCopyLinkModal} />

      {/* Rename Modal */}
      <RenameModal isOpen={showRenameModal} onClose={closeRenameModal} />

      {/* Design image */}
      <img
        src={Math.random() < 0.5 ? "/img/Room2.jpg" : "/img/Room1.png"}
        className="pic"
        alt="Design"
        onClick={onOpen}
        style={{ objectFit: "cover", objectPosition: "top left" }}
      />

      {/* Design title */}
      <div width="100%" style={{ textAlign: "start" }}>
        <h3 className="titleDesign">{name}</h3>
        <span className="dateModified">Modified on September 1, 2022</span>
      </div>
    </div>
  );
}

export default DesignIcon;
