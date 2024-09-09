import React from "react";
import TopBar from "../../components/TopBar";
import "../../css/searchItem.css";
import SearchIcon from "@mui/icons-material/Search"; // Importing the SearchIcon

function SearchItem() {
  const items = new Array(12).fill({
    name: "Clothing Fabric Wedding Fabric Party Fabric Lase...",
    price: "₱246.00",
    store: "Lazada Philippines",
  });

  return (
    <div className="search-item-page">
      <TopBar state="Search Item" />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an item"
          className="search-input"
        />
        <SearchIcon className="search-icon" />
      </div>
      <div className="grid-container">
        {items.map((item, index) => (
          <div key={index} className="grid-item">
            <div className="image-placeholder2" />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">{item.price}</p>
              <p className="item-store">{item.store}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="select-button-container">
        <button className="select-button">Select item</button>
      </div>
    </div>
  );
}

export default SearchItem;
