import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyCcTmBtY_1LDjWYjpFQKgIQxeqTZKMakqw",
    authDomain: "credit-card-processing-10ef8.firebaseapp.com",
    projectId: "credit-card-processing-10ef8",
    storageBucket: "credit-card-processing-10ef8.appspot.com",
    messagingSenderId: "602946142701",
    appId: "1:602946142701:web:0d5204b90e9e94da9d27e4",
    measurementId: "G-W2XYTZQSEV"
  };
firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const firestore=firebase.firestore();
const storage=firebase.storage();
export{auth,firestore,storage};
