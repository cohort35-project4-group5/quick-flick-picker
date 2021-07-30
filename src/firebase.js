import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPoxU_EXHLJlbjU_JGTfVH0fB8NcWcOMk",
  authDomain: "quick-flick-picker-3476a.firebaseapp.com",
  projectId: "quick-flick-picker-3476a",
  storageBucket: "quick-flick-picker-3476a.appspot.com",
  messagingSenderId: "327632913888",
  appId: "1:327632913888:web:5cb4816d71fc9103719785",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
