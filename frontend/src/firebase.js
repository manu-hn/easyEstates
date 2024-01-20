// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "easyestates-4f40a.firebaseapp.com",
  projectId: "easyestates-4f40a",
  storageBucket: "easyestates-4f40a.appspot.com",
  messagingSenderId: "907183704680",
  appId: "1:907183704680:web:3f90aaaa4738ae00d689dd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);