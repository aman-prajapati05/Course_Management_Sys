// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIbJXeBxUMebLR5UflLBxOEOUdToelwOo",
  authDomain: "lmsystem-f913c.firebaseapp.com",
  projectId: "lmsystem-f913c",
  storageBucket: "lmsystem-f913c.appspot.com",
  messagingSenderId: "520749301809",
  appId: "1:520749301809:web:088b4815df3390bbb49510",
  measurementId: "G-ZYQWX1QTEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
