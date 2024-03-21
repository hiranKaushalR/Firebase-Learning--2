import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAC5l-6iQlW6we3sTkPE9XHaKBxQHWb7_c",
  authDomain: "fir-test-2-fda42.firebaseapp.com",
  projectId: "fir-test-2-fda42",
  storageBucket: "fir-test-2-fda42.appspot.com",
  messagingSenderId: "536369443287",
  appId: "1:536369443287:web:20b7da9ecf7e682f63db92",
  measurementId: "G-J064469JEB"
};

let app, analytics, auth, googleAuth, db, googleStorage;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  googleAuth = new GoogleAuthProvider();
  db = getFirestore(app);
  googleStorage = getStorage(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

export { app, analytics, auth, googleAuth, db, googleStorage };
