import React, { useState } from "react";
import SearchAppBar from "../Homepage/SearchAppBar.js";
import Modal from "../../components/Modal.js";
import "../../css/seeAll.css";
import { Paper, Button, IconButton, InputBase } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

// Define SearchBar and OptionButton here
const SearchBar = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  backgroundColor: "#25232A",
  border: "1px solid #4B4A4B",
}));

const OptionButton = styled(Button)(({ theme }) => ({
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: theme.spacing(1),
  borderRadius: "10px",
  marginTop: theme.spacing(1),
  backgroundColor: "#25232A",
  color: "white",
  "&:hover": {
    backgroundColor: "#3B393F",
  },
}));

export default function SeeAllDesigns() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const getModalContent = (content) => {
    switch (content) {
      case "Owner":
        return (
          <>
            <SearchBar>
              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ flex: 1, color: "white" }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </SearchBar>
            <OptionButton>Any owner</OptionButton>
            <OptionButton>Owned by me</OptionButton>
          </>
        );
      case "Date Modified":
        return (
          <>
            <OptionButton>Any time</OptionButton>
            <OptionButton>Today</OptionButton>
            <OptionButton>This week</OptionButton>
            <OptionButton>This month</OptionButton>
            <OptionButton>This year</OptionButton>
            <OptionButton>Choose date range</OptionButton>
          </>
        );
      case "Date Created":
        return (
          <>
            <OptionButton>Any time</OptionButton>
            <OptionButton>Today</OptionButton>
            <OptionButton>This week</OptionButton>
            <OptionButton>This month</OptionButton>
            <OptionButton>This year</OptionButton>
            <OptionButton>Choose date range</OptionButton>
          </>
        );
      case "Sort By":
        return (
          <>
            <OptionButton>Date modified</OptionButton>
            <OptionButton>Date created</OptionButton>
            <OptionButton>Name</OptionButton>
            <OptionButton>Owner</OptionButton>
          </>
        );
      case "Order":
        return (
          <>
            <OptionButton>Descending</OptionButton>
            <OptionButton>Ascending</OptionButton>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SearchAppBar />
      <div className="bg">
        <div className="dropdown-container">
          {/* //  <SearchAppBar /> */}
          {["Owner", "Date Modified", "Date Created", "Sort By", "Order"].map(
            (item, index) => (
              <div
                key={index}
                className="dropdown"
                onClick={() => openModal(item)}
              >
                <span className="dropdown-text">{item}</span>
                <ArrowDropDownIcon className="dropdown-icon" />
              </div>
            )
          )}
        </div>
        <div className="title">Designs</div>
        <section className="recent-section">
          <div className="recent-designs">{/* Add content here */}</div>
        </section>

        {modalOpen && (
          <Modal onClose={closeModal} content={getModalContent(modalContent)} />
        )}
      </div>
    </>
  );
}
