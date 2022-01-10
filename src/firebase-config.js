import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqoxSFoMDCr3vlc-0_T4bp4RN7QcMJ-1s",
  authDomain: "react-crud-firebase-f4956.firebaseapp.com",
  projectId: "react-crud-firebase-f4956",
  storageBucket: "react-crud-firebase-f4956.appspot.com",
  messagingSenderId: "790119430726",
  appId: "1:790119430726:web:06fbe49954d8007615a847",
  measurementId: "G-SHKJQ44LV3"
  };

  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);