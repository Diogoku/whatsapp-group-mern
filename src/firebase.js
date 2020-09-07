import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA-3837kdfn7Av7n8yYoHy3kxKkN1rGzpk",
  authDomain: "whatsapp-mern-849a1.firebaseapp.com",
  databaseURL: "https://whatsapp-mern-849a1.firebaseio.com",
  projectId: "whatsapp-mern-849a1",
  storageBucket: "whatsapp-mern-849a1.appspot.com",
  messagingSenderId: "218691071238",
  appId: "1:218691071238:web:390376d89b7eae8b834287",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
