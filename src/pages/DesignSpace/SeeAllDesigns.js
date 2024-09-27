import React, { useState, useEffect } from "react";
import SearchAppBar from "../Homepage/SearchAppBar.js";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "../../components/Modal.js";
import "../../css/seeAll.css";
import { Paper, Button, IconButton, InputBase } from "@mui/material";
import { auth, db } from "../../firebase.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DesignIcon from "../../components/DesignIcon.js";
import "../../css/homepage.css";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Define styled components
const SearchBar = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  backgroundColor: "#25232A",
  border: "1px solid #4B4A4B",
  width: "90%",
  margin: "20px auto",
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
  const [user, setUser] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchDesigns(user.uid);
      } else {
        setUser(null);
        setDesigns([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchDesigns = (userId) => {
    const designsRef = collection(db, "users", userId, "designs");
    const q = query(designsRef, where("createdAt", ">", new Date(0))); // Example query

    const unsubscribeDesigns = onSnapshot(q, (querySnapshot) => {
      const designList = [];
      querySnapshot.forEach((doc) => {
        designList.push({ id: doc.id, ...doc.data() });
      });
      setDesigns(designList);
    });

    return () => unsubscribeDesigns();
  };

  const handleDeleteDesign = async (designId) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const designRef = doc(
          db,
          "users",
          currentUser.uid,
          "designs",
          designId
        );
        await deleteDoc(designRef);
      }
    } catch (error) {
      console.error("Error deleting design: ", error);
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // Add getModalContent function here
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

  const filteredDesigns = designs.filter((design) =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchAppBar
        onSearchChange={(value) => setSearchQuery(value)}
        user={user}
        username={username}
      />
      <div className="bg">
        <div className="dropdown-container">
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
          <div className="recent-designs">
            <div className="layout">
              {filteredDesigns.length > 0 ? (
                filteredDesigns.map((design) => (
                  <DesignIcon
                    key={design.id}
                    name={design.name}
                    designId={design.id}
                    onDelete={handleDeleteDesign}
                    onOpen={() =>
                      navigate(`/design/${design.id}`, {
                        state: { designId: design.id },
                      })
                    }
                  />
                ))
              ) : (
                <div className="no-content">
                  <img src="/img/design-placeholder.png" alt="No designs yet" />
                  <p>No designs yet. Start creating.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {modalOpen && (
          <Modal onClose={closeModal} content={getModalContent(modalContent)} />
        )}
      </div>
    </>
  );
}
