import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBkqFLEugmZ2hgVu2_9ArJWP9jwcqhAwRY",
  authDomain: "final-project-4644f.firebaseapp.com",
  projectId: "final-project-4644f",
  storageBucket: "final-project-4644f.appspot.com",
  messagingSenderId: "276464185117",
  appId: "1:276464185117:web:d76572b061c22919a1bbf4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getAuth(app);
