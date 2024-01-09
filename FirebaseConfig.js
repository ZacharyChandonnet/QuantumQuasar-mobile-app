// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3cy9yVJ9z5j8bgXyVNA5JG4tmcKZlmqc",
  authDomain: "quantum-coin.firebaseapp.com",
  projectId: "quantum-coin",
  storageBucket: "quantum-coin.appspot.com",
  messagingSenderId: "933732148361",
  appId: "1:933732148361:web:5bc410ed5480988f53d258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };