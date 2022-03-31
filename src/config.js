import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCOMDxgH8uQIIx4CD1auiJBoTTcpAknI4k",
    authDomain: "react-auth5621.firebaseapp.com",
    projectId: "react-auth5621",
    storageBucket: "react-auth5621.appspot.com",
    messagingSenderId: "484046905198",
    appId: "1:484046905198:web:b2e297d0b6dc3bba27eb7f",
    measurementId: "G-NTN5NETVQ9"
  });

  export default firebaseConfig;