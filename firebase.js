// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMt2dByx0DwLKv04vl1-dPfQkgcsA-h7E",
  authDomain: "flashcards-saas-5c4f3.firebaseapp.com",
  projectId: "flashcards-saas-5c4f3",
  storageBucket: "flashcards-saas-5c4f3.appspot.com",
  messagingSenderId: "482486618438",
  appId: "1:482486618438:web:f46224b536960fe5517d47",
  measurementId: "G-WG9HFY7XV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);