import React, { useState, useEffect } from "react";
import SearchAppBar from "../Homepage/SearchAppBar.jsx";
import { onAuthStateChanged } from "firebase/auth";

import "../../css/seeAll.css";

import { auth, db } from "../../firebase.js";
import Dropdowns from "../../components/Dropdowns.jsx";

import { useNavigate } from "react-router-dom";
import DesignIcon from "../../components/DesignIcon.jsx";
import "../../css/homepage.css";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function SeeAllProjects() {
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
    const designsRef = collection(db, "users", userId, "projects");
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
  // Add getModalContent function her

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
          <Dropdowns />
        </div>

        <div className="title">Projects</div>
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
      </div>
    </>
  );
}
