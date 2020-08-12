import firebase from "firebase"

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyB5xJJKh8wjJPaGhNfu6xuxzt5_eOFcxZQ",
    authDomain: "instagram-clone-a415b.firebaseapp.com",
    databaseURL: "https://instagram-clone-a415b.firebaseio.com",
    projectId: "instagram-clone-a415b",
    storageBucket: "instagram-clone-a415b.appspot.com",
    messagingSenderId: "741545890054",
    appId: "1:741545890054:web:63e781404611fe7ccace87",
    measurementId: "G-CDWQBB9QYD"
  });

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};