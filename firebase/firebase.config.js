// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzp1O9-yYhBsQvyYFbqFZE9_piTmNAfj8",
  authDomain: "utility-bill-management-system.firebaseapp.com",
  projectId: "utility-bill-management-system",
  storageBucket: "utility-bill-management-system.firebasestorage.app",
  messagingSenderId: "569334435137",
  appId: "1:569334435137:web:ee70d7c76ba913bf8425c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);