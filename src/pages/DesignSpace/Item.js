import "../../css/budget.css";
import "../../css/design.css";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

function Item() {
  const [itemPrice, setItemPrice] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      className="itemSpace"
      style={{ display: "flex", flexDirection: "row" }}
    >
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

      <img
        src="../../img/logoWhitebg.png"
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
        <span className="itemName">Item</span>
        <span className="itemPrice">Php 800</span>
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
        <svg
          style={{ marginRight: "12px" }}
          onClick={handleOpen}
          cursor={"pointer"}
          width="20"
          height="20"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M96.0929 2.21205L117.751 23.8705C118.461 24.5739 119.024 25.4102 119.41 26.3317C119.796 27.2532 119.997 28.2418 120 29.2408C120.003 30.2398 119.81 31.2297 119.43 32.1538C119.051 33.0779 118.493 33.9181 117.788 34.6263L105.747 46.6669L73.3333 14.2527L85.3739 2.21205C86.7978 0.795314 88.7247 0 90.7334 0C92.742 0 94.669 0.795314 96.0929 2.21205Z"
            fill="white"
          />
          <path
            d="M96.0929 2.21205L117.751 23.8705C118.461 24.5739 119.024 25.4102 119.41 26.3317C119.796 27.2532 119.997 28.2418 120 29.2408C120.003 30.2398 119.81 31.2297 119.43 32.1538C119.051 33.0779 118.493 33.9181 117.788 34.6263L105.747 46.6669L73.3333 14.2527L85.3739 2.21205C86.7978 0.795314 88.7247 0 90.7334 0C92.742 0 94.669 0.795314 96.0929 2.21205Z"
            fill="url(#paint0_linear_1754_22022)"
          />
          <path
            d="M0.178967 110.526L7.33056 79.5963L66.7264 19.9994L100 53.2681L40.3784 112.79L9.32547 119.956C8.78754 120.015 8.2449 120.015 7.70696 119.956C6.55204 119.949 5.41328 119.684 4.37385 119.179C3.33442 118.675 2.42059 117.944 1.69911 117.04C0.977624 116.136 0.466722 115.083 0.20372 113.956C-0.059282 112.829 -0.0677392 111.657 0.178967 110.526Z"
            fill="white"
          />
          <path
            d="M0.178967 110.526L7.33056 79.5963L66.7264 19.9994L100 53.2681L40.3784 112.79L9.32547 119.956C8.78754 120.015 8.2449 120.015 7.70696 119.956C6.55204 119.949 5.41328 119.684 4.37385 119.179C3.33442 118.675 2.42059 117.944 1.69911 117.04C0.977624 116.136 0.466722 115.083 0.20372 113.956C-0.059282 112.829 -0.0677392 111.657 0.178967 110.526Z"
            fill="url(#paint1_linear_1754_22022)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1754_22022"
              x1="60"
              y1="0"
              x2="60"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F9A754" />
              <stop offset="0.5" stop-color="#F26B27" />
              <stop offset="1" stop-color="#EF4E59" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1754_22022"
              x1="60"
              y1="0"
              x2="60"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F9A754" />
              <stop offset="0.5" stop-color="#F26B27" />
              <stop offset="1" stop-color="#EF4E59" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          width="20"
          height="20"
          viewBox="0 0 140 151"
          onClick={handleOpen}
          cursor={"pointer"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M56.5385 24.2308V26.9231H83.4615V24.2308C83.4615 20.6605 82.0433 17.2366 79.5187 14.712C76.9942 12.1875 73.5702 10.7692 70 10.7692C66.4298 10.7692 63.0058 12.1875 60.4813 14.712C57.9567 17.2366 56.5385 20.6605 56.5385 24.2308ZM45.7692 26.9231V24.2308C45.7692 17.8044 48.3221 11.6412 52.8663 7.09703C57.4104 2.55288 63.5736 0 70 0C76.4264 0 82.5896 2.55288 87.1337 7.09703C91.6779 11.6412 94.2308 17.8044 94.2308 24.2308V26.9231H134.615C136.043 26.9231 137.413 27.4904 138.423 28.5002C139.433 29.51 140 30.8796 140 32.3077C140 33.7358 139.433 35.1054 138.423 36.1152C137.413 37.125 136.043 37.6923 134.615 37.6923H126.495L116.308 126.905C115.556 133.475 112.413 139.539 107.478 143.94C102.542 148.341 96.1592 150.772 89.5461 150.769H50.4538C43.8408 150.772 37.4579 148.341 32.5223 143.94C27.5866 139.539 24.4435 133.475 23.6923 126.905L13.5046 37.6923H5.38462C3.95653 37.6923 2.58693 37.125 1.57712 36.1152C0.567306 35.1054 0 33.7358 0 32.3077C0 30.8796 0.567306 29.51 1.57712 28.5002C2.58693 27.4904 3.95653 26.9231 5.38462 26.9231H45.7692ZM59.2308 61.9231C59.2308 60.495 58.6635 59.1254 57.6537 58.1156C56.6438 57.1058 55.2742 56.5385 53.8462 56.5385C52.4181 56.5385 51.0485 57.1058 50.0387 58.1156C49.0288 59.1254 48.4615 60.495 48.4615 61.9231V115.769C48.4615 117.197 49.0288 118.567 50.0387 119.577C51.0485 120.587 52.4181 121.154 53.8462 121.154C55.2742 121.154 56.6438 120.587 57.6537 119.577C58.6635 118.567 59.2308 117.197 59.2308 115.769V61.9231ZM86.1538 56.5385C84.7258 56.5385 83.3561 57.1058 82.3463 58.1156C81.3365 59.1254 80.7692 60.495 80.7692 61.9231V115.769C80.7692 117.197 81.3365 118.567 82.3463 119.577C83.3561 120.587 84.7258 121.154 86.1538 121.154C87.5819 121.154 88.9515 120.587 89.9613 119.577C90.9712 118.567 91.5385 117.197 91.5385 115.769V61.9231C91.5385 60.495 90.9712 59.1254 89.9613 58.1156C88.9515 57.1058 87.5819 56.5385 86.1538 56.5385Z"
            fill="white"
          />
          <path
            d="M56.5385 24.2308V26.9231H83.4615V24.2308C83.4615 20.6605 82.0433 17.2366 79.5187 14.712C76.9942 12.1875 73.5702 10.7692 70 10.7692C66.4298 10.7692 63.0058 12.1875 60.4813 14.712C57.9567 17.2366 56.5385 20.6605 56.5385 24.2308ZM45.7692 26.9231V24.2308C45.7692 17.8044 48.3221 11.6412 52.8663 7.09703C57.4104 2.55288 63.5736 0 70 0C76.4264 0 82.5896 2.55288 87.1337 7.09703C91.6779 11.6412 94.2308 17.8044 94.2308 24.2308V26.9231H134.615C136.043 26.9231 137.413 27.4904 138.423 28.5002C139.433 29.51 140 30.8796 140 32.3077C140 33.7358 139.433 35.1054 138.423 36.1152C137.413 37.125 136.043 37.6923 134.615 37.6923H126.495L116.308 126.905C115.556 133.475 112.413 139.539 107.478 143.94C102.542 148.341 96.1592 150.772 89.5461 150.769H50.4538C43.8408 150.772 37.4579 148.341 32.5223 143.94C27.5866 139.539 24.4435 133.475 23.6923 126.905L13.5046 37.6923H5.38462C3.95653 37.6923 2.58693 37.125 1.57712 36.1152C0.567306 35.1054 0 33.7358 0 32.3077C0 30.8796 0.567306 29.51 1.57712 28.5002C2.58693 27.4904 3.95653 26.9231 5.38462 26.9231H45.7692ZM59.2308 61.9231C59.2308 60.495 58.6635 59.1254 57.6537 58.1156C56.6438 57.1058 55.2742 56.5385 53.8462 56.5385C52.4181 56.5385 51.0485 57.1058 50.0387 58.1156C49.0288 59.1254 48.4615 60.495 48.4615 61.9231V115.769C48.4615 117.197 49.0288 118.567 50.0387 119.577C51.0485 120.587 52.4181 121.154 53.8462 121.154C55.2742 121.154 56.6438 120.587 57.6537 119.577C58.6635 118.567 59.2308 117.197 59.2308 115.769V61.9231ZM86.1538 56.5385C84.7258 56.5385 83.3561 57.1058 82.3463 58.1156C81.3365 59.1254 80.7692 60.495 80.7692 61.9231V115.769C80.7692 117.197 81.3365 118.567 82.3463 119.577C83.3561 120.587 84.7258 121.154 86.1538 121.154C87.5819 121.154 88.9515 120.587 89.9613 119.577C90.9712 118.567 91.5385 117.197 91.5385 115.769V61.9231C91.5385 60.495 90.9712 59.1254 89.9613 58.1156C88.9515 57.1058 87.5819 56.5385 86.1538 56.5385Z"
            fill="url(#paint0_linear_1754_22023)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1754_22023"
              x1="70"
              y1="0"
              x2="70"
              y2="150.769"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F9A754" />
              <stop offset="0.5" stop-color="#F26B27" />
              <stop offset="1" stop-color="#EF4E59" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default Item;
