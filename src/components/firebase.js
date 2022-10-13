import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD26T6g3kBrKuhITRTxplm0nWGxme307Ww",
  authDomain: "note-keeper-63c0a.firebaseapp.com",
  projectId: "note-keeper-63c0a",
  storageBucket: "note-keeper-63c0a.appspot.com",
  messagingSenderId: "1024829099181",
  appId: "1:1024829099181:web:e4f35bff204b0da1168a24",
  measurementId: "G-XB7K962GRV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
