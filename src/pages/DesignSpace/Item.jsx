import "../../css/budget.css";
import "../../css/design.css";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditPen from "./svg/EditPen";
import Trash from "./svg/Trash";
import { ToastContainer, toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "var(--nav-card-modal)",
  borderRadius: "12px",
  boxShadow: 24,
};

function Item({ item }) {
  const [itemPrice, setItemPrice] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;

        const itemRef = doc(
          db,
          "users",
          userId,
          "designs",
          item.designId,
          "budgets",
          item.id
        );
        await deleteDoc(itemRef);
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
        handleCloseDelete();
      } else {
        console.error("User is not authenticated");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div
      className="itemSpace"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <ToastContainer
        progressStyle={{ backgroundColor: "var(--brightFont)" }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "12px",
                margin: "18px",
              }}
            >
              <span
                id="modal-modal-title"
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                Edit Budget
              </span>{" "}
              <CloseIcon
                sx={{ marginLeft: "auto" }}
                onClick={handleClose}
                cursor={"pointer"}
              />
            </div>

            <Divider sx={{ borderColor: "var(--color-grey)" }} />
            <div
              className="input-group"
              style={{ marginTop: "12px", margin: "18px" }}
            >
              <div className="price-quantity-section">
                <select
                  style={{
                    border: "none",
                    background: "transparent",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    outline: "none",
                  }}
                >
                  <option value="PHP">PHP</option>
                </select>
                <KeyboardArrowDownIcon
                  sx={{
                    color: "var(--color-grey)",
                    marginLeft: "-50px",
                    marginTop: "18px",
                  }}
                />
                <input
                  id="item-price"
                  type="number"
                  placeholder="Enter item price"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  style={{
                    border: "none",
                    background: "transparent",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <button className="add-item-btn" style={{ margin: "18px" }}>
              Edit Price
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                marginBottom: "12px",
                margin: "18px",
              }}
            >
              <span
                id="modal-modal-title"
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                Confirm Budget Removal
              </span>{" "}
              <CloseIcon
                sx={{ marginLeft: "auto" }}
                onClick={handleCloseDelete}
                cursor={"pointer"}
              />
            </div>
            <Divider sx={{ borderColor: "var(--color-grey)" }} />

            <span style={{ textAlign: "center", margin: "18px" }}>
              Are you sure you want to remove the budget item?
            </span>
            <div
              style={{
                display: "flex",
                gap: "12px",
                margin: "18px",
                marginTop: "-24px",
                justifyContent: "center",
              }}
            >
              <button
                className="add-item-btn"
                style={{
                  background: "transparent",
                  border: "2px solid transparent",
                  backgroundImage:
                    " var(--darkGradient), var(--gradientButton)",
                  backgroundOrigin: "border-box",
                  backgroundClip: " padding-box, border-box",
                }}
                onClick={handleCloseDelete}
              >
                Cancel
              </button>
              <button className="add-item-btn" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <img
        src="../../img/Room2.jpg"
        alt={`design preview `}
        className="thumbnail"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "12px",
          width: "auto  ",
        }}
      >
        <span className="itemName">
          {item.itemName} x {item.quantity}
        </span>
        <span className="itemPrice">Php {item.cost}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "10px",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div onClick={handleOpen}>
          <EditPen />
        </div>
        <div onClick={handleOpenDelete}>
          <Trash />
        </div>
      </div>
    </div>
  );
}

export default Item;
