// lib/saveUserData.js
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

// Get user's location using browser
const getLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ latitude, longitude });
      },
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });

export async function saveUserDetails(userData) {
  try {
    const location = await getLocation();
    const timestamp = Timestamp.now(); // Firebase timestamp

    const dataToStore = {
      ...userData,
      submittedAt: timestamp,
      location: location || { latitude: null, longitude: null }
    };

    const docRef = await addDoc(collection(db, "users"), dataToStore);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Error saving user details:", error);
    return { success: false, error };
  }
}
