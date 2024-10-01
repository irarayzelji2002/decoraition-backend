import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "./Item";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InventoryIcon from "@mui/icons-material/Inventory";
import "../../css/budget.css";
import { db } from "../../firebase"; // Assuming you have firebase setup
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Budget() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [budgetItem, setBudgetItem] = useState("");
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        fetchPins(user.uid, designId);
      } else {
        console.error("User is not authenticated");
      }
    });
    return () => unsubscribe();
  }, [designId]);

  const fetchPins = async (userId, designId) => {
    try {
      const pinRef = collection(
        db,
        "users",
        userId,
        "designs",
        designId,
        "pins"
      );
      const pinSnapshot = await getDocs(pinRef);
      const pinList = pinSnapshot.docs.map((doc) => doc.data());
      setPins(pinList);
    } catch (error) {
      console.error("Error fetching pins:", error);
    }
  };

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setBudgetItem(e.target.value);
  };

  const handleInputSubmit = async () => {
    if (budgetItem.trim() === "") {
      alert("Pin cannot be empty");
      return;
    }

    try {
      const pinRef = collection(
        db,
        "users",
        userId,
        "designs",
        designId,
        "budgets"
      );
      await addDoc(pinRef, { budgetName: budgetItem });
      setBudgetItem("");
      setShowInput(false);
      alert("Pin added successfully!");
    } catch (error) {
      console.error("Error adding pin:", error);
      alert("Failed to add pin");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
              src={require("../../img/logoWhitebg.png")}
              alt="design preview"
              className="image-preview"
            />
          </div>
        </div>
        <div className="budgetSpace">
          <Item />
          <Item />
          <button onClick={handleButtonClick}>Add Pin</button>
          {showInput && (
            <div>
              <input
                type="text"
                value={budgetItem}
                onChange={handleInputChange}
                placeholder="Enter pin"
              />
              <button onClick={handleInputSubmit}>Submit</button>
            </div>
          )}
          <h3>Pins</h3>
          <ul>
            {pins.map((pin, index) => (
              <li key={index}>{pin.budgetName || pin.budgetItem}</li>
            ))}
          </ul>
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

            <button
              className="add-item-btn"
              style={{ height: "40px" }}
              onClick={handleAddBudget}
            >
              Add Budget
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Budget;
