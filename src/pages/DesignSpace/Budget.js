import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "./Item";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InventoryIcon from "@mui/icons-material/Inventory";
import "../../css/budget.css";

function Budget() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [designData, setDesignData] = useState(null);
  const [budget, setBudget] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const fetchDesignData = async () => {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT/designs/${designId}`);
        const data = await response.json();
        setDesignData(data);
      } catch (error) {
        console.error("Error fetching design data:", error);
      }
    };

    if (designId) {
      fetchDesignData();
    }
  }, [designId]);

  const handleAddBudget = () => {
    console.log("Budget added:", budget);
    setModalOpen(false);
    setBudget("");
  };

  return (
    <div className={`budget-page ${menuOpen ? "darkened" : ""}`}>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="budgetSpace">
          <span className="priceSum">No Budget yet</span>
          <div className="image-frame">
            <img
              src="../../img/logoWhitebg.png"
              alt={`design preview `}
              className="image-preview"
            />
          </div>
        </div>
        <div className="budgetSpace">
          <Item />
          <Item />
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="circle-button-container">
        {menuOpen && (
          <div className="small-buttons">
            <div className="small-button-container" onClick={toggleModal}>
              <span className="small-button-text">Add a Budget</span>
              <div className="small-circle-button">
                <AccountBalanceWalletIcon className="icon" />
              </div>
            </div>
            <div
              className="small-button-container"
              onClick={() => navigate("/addItem")}
            >
              <span className="small-button-text">Add an Item</span>
              <div className="small-circle-button">
                <InventoryIcon className="icon" />
              </div>
            </div>
          </div>
        )}
        <div
          className={`circle-button ${menuOpen ? "rotate" : ""}`}
          onClick={toggleMenu}
        >
          {menuOpen ? <CloseIcon /> : <AddIcon />}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add a Budget</h2>
              <CloseIcon className="close-icon" onClick={toggleModal} />
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="rounded-input"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleAddBudget}>
                <h3>Add Budget</h3>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Budget;
