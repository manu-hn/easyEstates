// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf-rlN9AgHqN7isKe-up6FdELOK-7fGjM",
  authDomain: "easyestates-dcad9.firebaseapp.com",
  projectId: "easyestates-dcad9",
  storageBucket: "easyestates-dcad9.appspot.com",
  messagingSenderId: "639320929091",
  appId: "1:639320929091:web:03bc97f55b617caa9275f6",
  measurementId: "G-XVT9DQPZ83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);