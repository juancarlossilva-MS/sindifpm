import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBuWUnihjrh6PyQObRYu2KhirWQCkWsgAI",
  authDomain: "nslive-f6c80.firebaseapp.com",
  projectId: "nslive-f6c80",
  storageBucket: "nslive-f6c80.appspot.com",
  messagingSenderId: "1014412450577",
  appId: "1:1014412450577:web:1434e7a82f45a37322cab0"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;