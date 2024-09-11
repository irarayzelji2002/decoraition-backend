import React, { useState } from "react";
import ProjectHead from "../../components/ProjectHead";
import "../../css/project.css";
import { Paper, Button, IconButton, InputBase } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Modal from "../../components/Modal";
import BottomBarDesign from "../../components/BottomBarProject";
import "../../css/seeAll.css";

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

function Project() {
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
    <div className="app-container">
      <ProjectHead />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "69%",
            marginTop: "40px",
            backgroundColor: "#25232A",
            borderRadius: "20px",
            border: "1px solid #4B4A4B",
          }}
        >
          <IconButton
            type="button"
            sx={{ p: "10px", color: "white" }}
            aria-label="search"
          >
            <SearchIcon sx={{ color: "white" }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: "white" }}
            placeholder="Search Item"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <main
            className="content"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              height: "50px",
            }}
          >
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
          </main>
        </div>
      </div>
      <div className="designs-list">
        {[...Array(5)].map((_, index) => (
          <div className="design-card" key={index}>
            <img
              src="/img/design-placeholder.png"
              alt="Modern Bedroom"
              className="design-image"
            />
            <div className="design-info">
              <h3>Modern Bedroom</h3>
              <p>Modified July 10, 2024</p>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <Modal onClose={closeModal} content={getModalContent(modalContent)} />
      )}

      <BottomBarDesign Design={true} />
    </div>
  );
}

export default Project;
