import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGILz1ytCG-YKS6_nqHyPpllPD1C8iI-M",
  authDomain: "amaranoc-projecy.firebaseapp.com",
  projectId: "amaranoc-projecy",
  storageBucket: "amaranoc-projecy.firebasestorage.app",
  messagingSenderId: "416736234628",
  appId: "1:416736234628:web:531864ccc23bcfe83386d1",
  measurementId: "G-BZBFBLNN06"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);