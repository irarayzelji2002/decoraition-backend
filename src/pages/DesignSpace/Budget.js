import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import DesignHead from "../../components/DesignHead";
import Item from "./Item";
import BottomBar from "../../components/BottomBar";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InventoryIcon from "@mui/icons-material/Inventory";
import "../../css/budget.css";

function Budget() {
  const { designId } = useParams(); // Get the design ID from the URL
  const [menuOpen, setMenuOpen] = useState(false);
  const [designData, setDesignData] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Fetch design data based on designId
    const fetchDesignData = async () => {
      try {
        const response = await fetch(`YOUR_API_ENDPOINT/designs/${designId}`); // Replace with your API endpoint
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

  return (
    <div className={`budget-page ${menuOpen ? "darkened" : ""}`}>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      {/* Pass design name to DesignHead */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="budgetSpace">
          <span className="titleBudget">
            {designData ? designData.name : "Loading..."}
          </span>
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
            <div className="small-button-container">
              <span className="small-button-text">Add a Budget</span>
              <div className="small-circle-button">
                <AccountBalanceWalletIcon className="icon" />
              </div>
            </div>
            <div className="small-button-container">
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
    </div>
  );
}

export default Budget;
