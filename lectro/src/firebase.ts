// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZdHpUBrDtoExhAnf-B9Ej9DV8pZn4LEM",
  authDomain: "lectro-6e37b.firebaseapp.com",
  projectId: "lectro-6e37b",
  storageBucket: "lectro-6e37b.firebasestorage.app",
  messagingSenderId: "1017884646186",
  appId: "1:1017884646186:web:0a6034a633708e9f939c53",
  measurementId: "G-P6KMMX8SRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);