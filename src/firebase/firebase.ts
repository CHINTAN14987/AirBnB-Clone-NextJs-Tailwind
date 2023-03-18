// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW7Fk0Cs3uv0wATF311o9gkf70IW-L020",
  authDomain: "airbus-demo-1a4fb.firebaseapp.com",
  databaseURL: "https://airbus-demo-1a4fb-default-rtdb.firebaseio.com",
  projectId: "airbus-demo-1a4fb",
  storageBucket: "airbus-demo-1a4fb.appspot.com",
  messagingSenderId: "861860635496",
  appId: "1:861860635496:web:1ea08cfbbec74f87546cdd",
  measurementId: "G-3VCTL9Y9TG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
