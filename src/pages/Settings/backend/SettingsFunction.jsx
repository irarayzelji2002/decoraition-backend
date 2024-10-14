import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust the import path as needed

export const saveNotificationSettings = async (userId, settings) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { notifSettings: settings }, { merge: true });
    console.log("Notification settings saved successfully");
  } catch (error) {
    console.error("Error saving notification settings:", error);
  }
};

export const fetchNotificationSettings = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().notifSettings;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching notification settings:", error);
    return null;
  }
};
