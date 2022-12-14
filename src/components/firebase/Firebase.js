import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBCT3RhUQTB9qrpMqSEVcxRKn_oMYFstIo",
  authDomain: "snapchat-clone-631b2.firebaseapp.com",
  projectId: "snapchat-clone-631b2",
  storageBucket: "snapchat-clone-631b2.appspot.com",
  messagingSenderId: "80256484850",
  appId: "1:80256484850:web:c4b9f58a81be22cd09176b"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); 

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };