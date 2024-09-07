import React from "react";
import DesignHead from "../../components/DesignHead";
import Item from "./Item";
import BottomBar from "../../components/BottomBar";
import "../../css/budget.css";
import "../../css/design.css";

function Budget() {
  return (
    <div>
      <DesignHead />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="budgetSpace">
          <span className="titleBudget"> Project Name</span>
          <span className="priceSum"> No Budget yet</span>
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
      <BottomBar />
    </div>
  );
}

export default Budget;
