// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDncYLFNJ_X9cru8qdeXxM53FozAKffdtI",
  authDomain: "fleetmanagement-c4443.firebaseapp.com",
  projectId: "fleetmanagement-c4443",
  storageBucket: "fleetmanagement-c4443.firebasestorage.app",
  messagingSenderId: "474257135328",
  appId: "1:474257135328:web:17650daf008e10c21e6285",
  measurementId: "G-FRYNZNJ5QS"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { auth, provider };