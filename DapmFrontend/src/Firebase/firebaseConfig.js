// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiRwg6_saZscQTkItOjvtj_HOrQLumaIY",
  authDomain: "alxauth.firebaseapp.com",
  projectId: "alxauth",
  storageBucket: "alxauth.appspot.com",
  messagingSenderId: "838612738698",
  appId: "1:838612738698:web:22279c484c9ca049cd4373",
  measurementId: "G-BPWKRHRYCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();