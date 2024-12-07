//import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore,serverTimestamp } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKRTtqr7Ii77NSyjVhhHBtsdjFRWPrwiY",
    authDomain: "rn-uber-eats-clone-32e0d.firebaseapp.com",
    projectId: "rnubereatsclone",
    storageBucket: "rn-uber-eats-clone-32e0d.appspot.com",
    messagingSenderId: "735784770310",
    appId: "1:367344330764:android:67dc62f5928cae6d23e629"
  };
  
//!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();
const app =initializeApp(firebaseConfig);
const db = getFirestore(app);

 export {db,serverTimestamp};