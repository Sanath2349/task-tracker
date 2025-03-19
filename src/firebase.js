import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0C4q-tNCEQIHYSFjUMTBrFmNmduWz4Dk",
    authDomain: "task-manager-86cd9.firebaseapp.com",
    projectId: "task-manager-86cd9",
    storageBucket: "task-manager-86cd9.firebasestorage.app",
    messagingSenderId: "716064278320",
    appId: "1:716064278320:web:a3f0268288a5dbb3c3aaf5",
    measurementId: "G-0FMZ1C1RJM"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();