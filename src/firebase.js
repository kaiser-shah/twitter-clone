// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { AuthContext } from "./components/AuthProvider";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQOO7myc9qfVGTLpGj1JYcZO5XrNNdR8A",
  authDomain: "twitter-app-f69e3.firebaseapp.com",
  projectId: "twitter-app-f69e3",
  storageBucket: "twitter-app-f69e3.firebasestorage.app",
  messagingSenderId: "537926394957",
  appId: "1:537926394957:web:023793d1f90ac223db2804"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
