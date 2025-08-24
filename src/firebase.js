import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtvxW3J1Ss4OpHXLiCcNW1CeN0OgWs2ak",
  authDomain: "kelveen-snake-io.firebaseapp.com",
  projectId: "kelveen-snake-io",
  storageBucket: "kelveen-snake-io.firebasestorage.app",
  messagingSenderId: "208519592837",
  appId: "1:208519592837:web:969b65e9cbcec89b6422ec",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
