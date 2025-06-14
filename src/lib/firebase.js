// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM4X32m7U2UcWDY2KI23Clw6Kka8pRAyU",
  authDomain: "resqapp-ff3f6.firebaseapp.com",
  projectId: "resqapp-ff3f6",
  storageBucket: "resqapp-ff3f6.firebasestorage.app",
  messagingSenderId: "122285396934",
  appId: "1:122285396934:web:03794b03b6a08d783098c7",
  measurementId: "G-7B7M0D3RKQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
