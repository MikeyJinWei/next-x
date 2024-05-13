// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-423018.firebaseapp.com",
  projectId: "x-next-423018",
  storageBucket: "x-next-423018.appspot.com",
  messagingSenderId: "12009222812",
  appId: "1:12009222812:web:7db1dfd80c7ce42bf67359",
  measurementId: "G-Y1YVS7S27Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
