import React, { useState, useEffect } from "react";
import ProjectHead from "../../components/ProjectHead";
import { Paper, Button, IconButton, InputBase } from "@mui/material";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getAuth } from "firebase/auth";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Modal from "../../components/Modal";
import BottomBarDesign from "../../components/BottomBarProject";
import "../../css/seeAll.css";
import "../../css/project.css";
import "../../css/project.css";

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
  color: "var(--color-white)",
  "&:hover": {
    backgroundColor: "#3B393F",
  },
}));

function Project() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { designId } = useParams();
  const [newName, setNewName] = useState("");
  const [userId, setUserId] = useState(null);
  const [designData, setDesignData] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);

        const fetchDesignDetails = async () => {
          try {
            const designRef = doc(db, "users", user.uid, "designs", designId);
            const designSnapshot = await getDoc(designRef);
            if (designSnapshot.exists()) {
              const design = designSnapshot.data();
              setDesignData(design);
              setNewName(design.name);
            } else {
              console.error("Design not found");
            }
          } catch (error) {
            console.error("Error fetching design details:", error);
          }
        };

        fetchDesignDetails();
      } else {
        console.error("User is not authenticated");
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [designId]);

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
                sx={{ flex: 1, color: "var(--color-white)" }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon sx={{ color: "var(--color-white)" }} />
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
            width: "90%",
            marginTop: "40px",
            backgroundColor: "#25232A",
            borderRadius: "20px",
            border: "1px solid #4B4A4B",
          }}
        >
          <IconButton
            type="button"
            sx={{ p: "10px", color: "var(--color-white)" }}
            aria-label="search"
          >
            <SearchIcon sx={{ color: "var(--color-white)" }} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, color: "var(--color-white)" }}
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
              overflow: "hidden",
            }}
          >
            {["Owner", "Date Modified", "Date Created", "Sort By", "Order"].map(
              (item, index) => (
                <div
                  key={index}
                  className="dropdown"
                  onClick={() => openModal(item)}
                >
                  <span
                    className="dropdown-text"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item}
                  </span>
                  <ArrowDropDownIcon className="dropdown-icon" />
                </div>
              )
            )}
          </main>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "92%",

          padding: "20px",
        }}
      >
        <span
          className="SubtitleBudget"
          style={{ marginLeft: "20px", fontSize: "30px" }}
        >
          Project Name
          <br />
          <span
            className="SubtitlePrice"
            style={{
              backgroundColor: "transparent",
            }}
          >
            Designs
          </span>
        </span>

        <span className="seeAll" style={{ marginLeft: "auto " }}>
          See All
        </span>
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
