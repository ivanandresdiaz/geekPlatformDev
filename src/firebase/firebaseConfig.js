import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firebase-functions';
import 'firebase/firebase-storage';

firebase.initializeApp({
  apiKey: 'AIzaSyD5eNxXaQWljMdf7A4pOvPYxkSMFkJkTKg',
  authDomain: 'geekplatformdev.firebaseapp.com',
  projectId: 'geekplatformdev',
  storageBucket: 'geekplatformdev.appspot.com',
  messagingSenderId: '441888046823',
  appId: '1:441888046823:web:9508e407ae1aee94996c42',
  measurementId: 'G-85PMMR2FGC',
});

const db = firebase.firestore();
const functions = firebase.functions();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db, googleAuthProvider, functions,
  firebase,
};
