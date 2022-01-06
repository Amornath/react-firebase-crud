import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    // this code block is not available for security concern
  };

  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);