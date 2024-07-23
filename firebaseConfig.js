// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-1bqIMTqcuXIpov_vDQHF5uBLmWSe55o",
  authDomain: "academic-journal-4bb75.firebaseapp.com",
  projectId: "academic-journal-4bb75",
  storageBucket: "academic-journal-4bb75.appspot.com",
  messagingSenderId: "913770380417",
  appId: "1:913770380417:web:b91b5aeececa3fa29ba180",
  measurementId: "G-4DD3HRJNMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export{db,auth,storage}
