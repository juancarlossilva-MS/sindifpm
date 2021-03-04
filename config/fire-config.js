import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDDLAq4vBb2OleUzu9dKRcGsWZDRWM8gus",
  authDomain: "sindifpm-344e0.firebaseapp.com",
  projectId: "sindifpm-344e0",
  storageBucket: "sindifpm-344e0.appspot.com",
  messagingSenderId: "212401093772",
  appId: "1:212401093772:web:7ce698b6d0eae771accfa9"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;