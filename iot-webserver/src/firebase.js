// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEhttpZLpRtfiARWxJJPRtgIMYsex0SYA",
  authDomain: "esp32-5b23d.firebaseapp.com",
  databaseURL: "https://esp32-5b23d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-5b23d",
  storageBucket: "esp32-5b23d.firebasestorage.app",
  messagingSenderId: "1094401014373",
  appId: "1:1094401014373:web:06b05a0ea8ce8f8563648c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database, ref, set, onValue };