import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../firebase"; // Adjust the import path as needed

export const fetchUserData = (user, setUsername, setUser) => {
  const userRef = doc(db, "users", user.uid);
  onSnapshot(userRef, (doc) => {
    const userData = doc.data();
    setUsername(userData.username);
    setUser({
      uid: user.uid,
      email: user.email,
      profilePicture: userData.photoURL || "", // Fetch profile picture from Firestore
    });
  });
};
