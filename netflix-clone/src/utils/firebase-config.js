import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbtVIcQ6es1eBXGFQKb_oPWiRFJDMLXE8",
  authDomain: "react-netflix-clone-9d615.firebaseapp.com",
  projectId: "react-netflix-clone-9d615",
  storageBucket: "react-netflix-clone-9d615.appspot.com",
  messagingSenderId: "509076604702",
  appId: "1:509076604702:web:3b61d1010bec55a77a2b0f",
  measurementId: "G-9DMBNEZJXL"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);