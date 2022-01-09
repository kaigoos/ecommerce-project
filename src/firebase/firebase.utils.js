import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAYUadafuZAneaqM57cs7DMzA8e4ui4oIA",
  authDomain: "ecommerce-db-13c1b.firebaseapp.com",
  projectId: "ecommerce-db-13c1b",
  storageBucket: "ecommerce-db-13c1b.appspot.com",
  messagingSenderId: "791244206141",
  appId: "1:791244206141:web:9321dae9fccb7dd6aefa54",
  measurementId: "G-NZ7NRGWV2X"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
