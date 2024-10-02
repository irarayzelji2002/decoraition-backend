import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Item from "./Item";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InventoryIcon from "@mui/icons-material/Inventory";
import { onSnapshot } from "firebase/firestore";
import "../../css/budget.css";
import { db } from "../../firebase"; // Assuming you have firebase setup
import { ToastContainer, toast } from "react-toastify";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Budget() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [items, setItems] = useState([]);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.error("User is not authenticated");
      }
    });
    return () => unsubscribe();
  }, [designId]);

  const handleButtonClick = () => {
    setShowInput(true);
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

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        subscribeToPins(user.uid, designId);
      } else {
        console.error("User is not authenticated");
      }
    });
    return () => unsubscribe();
  }, [designId]);

  const subscribeToPins = (userId, designId) => {
    const pinRef = collection(
      db,
      "users",
      userId,
      "designs",
      designId,
      "budgets"
    );

    const unsubscribe = onSnapshot(pinRef, (snapshot) => {
      const pinList = snapshot.docs.map((doc) => ({
        id: doc.id, // Capture the document ID
        ...doc.data(), // Spread the item data
      }));
      setItems(pinList); // Set items with IDs
    });
    return unsubscribe;
  };

  const handleDelete = async (itemId) => {
    try {
      const itemRef = doc(
        db,
        "users",
        userId,
        "designs",
        designId,
        "budgets",
        itemId
      );
      await deleteDoc(itemRef); // Delete the document from Firestore
      setItems(items.filter((item) => item.id !== itemId)); // Update local state
      toast.success("Item has been deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          color: "var(--color-white)",
          backgroundColor: "var(--inputBg)",
        },
        progressStyle: {
          backgroundColor: "var(--brightFont)",
        },
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const totalCost = items
    .reduce(
      (sum, item) => sum + parseFloat(item.cost || 0) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  const formattedTotalCost = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalCost);

  console.log(formattedTotalCost); // Example output: "1,234.56"

  return (
    <div className={`budget-page ${menuOpen ? "darkened" : ""}`}>
      <ToastContainer
        progressStyle={{ backgroundColor: "var(--brightFont)" }}
      />
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
      <div className="cutoff">
        <div className="budgetSpace">
          <span
            className="priceSum"
            style={{
              backgroundColor: totalCost > 0 ? "#397438" : "var(--inputBg)",
            }}
          >
            Total Budget: ₱ <strong>{formattedTotalCost}</strong>
          </span>
          <div className="image-frame">
            <img
              src={"../../img/logoWhitebg.png"}
              alt="design preview"
              className="image-preview"
            />
          </div>
        </div>
        <div className="budgetSpace" style={{ marginBottom: "10%" }}>
          {items.length === 0 ? (
            <div>
              <img
                src={"../../img/project-placeholder.png"}
                style={{ width: "100px" }}
                className="image-preview"
                alt="project placeholder"
              />
              <p>No items yet</p>
            </div>
          ) : (
            items.map((item, index) => (
              <Item
                key={index}
                item={item}
                onDelete={() => handleDelete(item.id)}
              />
            ))
          )}
        </div>
      </div>

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
              onClick={() => navigate(`/addItem/${designId}`)}
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
