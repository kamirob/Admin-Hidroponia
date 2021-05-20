import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyDO3Xl7zElfLMlwMNZ2w9CDWaITUJsHcVA",
  authDomain: "autogrower21.firebaseapp.com",
  projectId: "autogrower21",
  storageBucket: "autogrower21.appspot.com",
  messagingSenderId: "673415626215",
  appId: "1:673415626215:web:a4103f3e3533a1bfa9d142",
  measurementId: "G-L3HWD5V3R2"
};

const firebaseApp = firebase.initializeApp(config, "Primary");


export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`Admin/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};