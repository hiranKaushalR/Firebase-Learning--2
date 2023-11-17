// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAC5l-6iQlW6we3sTkPE9XHaKBxQHWb7_c",
  authDomain: "fir-test-2-fda42.firebaseapp.com",
  projectId: "fir-test-2-fda42",
  storageBucket: "fir-test-2-fda42.appspot.com",
  messagingSenderId: "536369443287",
  appId: "1:536369443287:web:20b7da9ecf7e682f63db92",
  measurementId: "G-J064469JEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth (app)
export const googleAuth = new GoogleAuthProvider ();
export const db = getFirestore (app)