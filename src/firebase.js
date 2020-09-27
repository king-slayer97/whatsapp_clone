import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD9Jw0ADl6NIcIVL9jprK-rEwRWTgWg8RY",
    authDomain: "whatsapp-clone-c3412.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-c3412.firebaseio.com",
    projectId: "whatsapp-clone-c3412",
    storageBucket: "whatsapp-clone-c3412.appspot.com",
    messagingSenderId: "821195434204",
    appId: "1:821195434204:web:8ee15585c371152a486c19",
    measurementId: "G-0N44CZ8YDL"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;