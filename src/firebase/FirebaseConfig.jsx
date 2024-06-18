// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged } from "firebase/auth";
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
const auth = getAuth(app);
export const signInWithGoogle =()=>{
signInWithPopup(auth, provider)
  .then((result) => {

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
   
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.error('Error signing in: ', errorCode, errorMessage, email, credential);
      throw error;
  });}
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';
const fireDB = getFirestore(app);


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe from the listener once we have the user
      resolve(user);
    }, reject);
  });
};

export { auth, fireDB}