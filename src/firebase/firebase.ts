// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeUNWcvmzJjGPwIeLeZESarQbRd_tJUQc",
  authDomain: "wmasn-522c5.firebaseapp.com",
  projectId: "wmasn-522c5",
  storageBucket: "wmasn-522c5.appspot.com",
  messagingSenderId: "131803335587",
  appId: "1:131803335587:web:3d80ca47ab2d2e4b03a816",
  measurementId: "G-D8LB1Q58C3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
