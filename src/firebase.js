import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgeIZDg8AOQ7JmjLXZ0AVuQK0V4eNWzG8",
    authDomain: "clone-bd001.firebaseapp.com",
    databaseURL: "https://clone-bd001.firebaseio.com",
    projectId: "clone-bd001",
    storageBucket: "clone-bd001.appspot.com",
    messagingSenderId: "65190305803",
    appId: "1:65190305803:web:8d19989118c9c68c68e70e",
    measurementId: "G-TNZSWWTKT5"
  };

  // intitialized the firebase app 
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();  // intitialized the database   
  const auth = firebaseApp.auth();    // intitialized the authentication

  export { db, auth };