import React, { useState } from "react";
import "../../css/addItem.css";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    const item = {
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
      image: image,
    };
    console.log(item);
  };

  return (
    <div className="add-item-container">
      <div className="left-column">
        <div className="search-section">
          <input type="text" placeholder="Search for an item" />
        </div>

        <div className="upload-section">
          {image ? (
            <img src={image} alt="Item" className="uploaded-image" />
          ) : (
            <div className="image-placeholder">Add an image to the item</div>
          )}
          <label htmlFor="upload-image" className="upload-btn">
            Upload image of item
            <input
              type="file"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
      <div className="right-column">
        <div className="form-section">
          {/* Item name */}
          <label htmlFor="item-name" className="item-name-label">
            Item name
          </label>
          <div className="input-group">
            <input
              id="item-name"
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          {/* Item price */}
          <label htmlFor="item-price" className="price-label">
            Item price
          </label>
          <div className="input-group">
            <div className="price-quantity-section">
              <select>
                <option value="PHP">PHP</option>
              </select>
              <input
                id="item-price"
                type="number"
                placeholder="Enter item price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Item quantity */}
          <label htmlFor="item-price" className="price-label">
            Item quantity
          </label>
          <div className="quantity-section">
            <button
              onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
            >
              &lt;
            </button>
            <span>{itemQuantity}</span>
            <button onClick={() => setItemQuantity(itemQuantity + 1)}>
              &gt;
            </button>
          </div>

          {/* Add Item Button */}
          <button className="add-item-btn" onClick={handleSubmit}>
            Add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
