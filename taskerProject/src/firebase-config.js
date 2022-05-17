import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfoFFzpaT8M6AEUeQHAZUalHOM2_SU-78",
  authDomain: "todoapp-64a1c.firebaseapp.com",
  projectId: "todoapp-64a1c",
  storageBucket: "todoapp-64a1c.appspot.com",
  messagingSenderId: "217993581931",
  appId: "1:217993581931:web:dfd7a8b3976f55eeac682e",
  databaseURL: "https://todoapp-64a1c-default-rtdb.europe-west1.firebasedatabase.app/",
  measurementId: "G-T7DP2CWWC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
