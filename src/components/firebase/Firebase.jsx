import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDqOulC8RBC2m0BqKt5i27QKy3af-FACSk",
  authDomain: "calender-clone.firebaseapp.com",
  projectId: "calender-clone",
  storageBucket: "calender-clone.appspot.com",
  messagingSenderId: "926350498060",
  appId: "1:926350498060:web:c7f062f443c8bf6c6f1129",
  measurementId: "G-X01NPX82NM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);