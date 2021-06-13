import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg5CxMLeq5y5LVphreNMb4TFg3At1iD74",
  authDomain: "sparta-react-84dbe.firebaseapp.com",
  projectId: "sparta-react-84dbe",
  storageBucket: "sparta-react-84dbe.appspot.com",
  messagingSenderId: "987094786644",
  appId: "1:987094786644:web:4d9bf9c32324aa39f0c3c1",
  measurementId: "G-752N9CTW4E",
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
