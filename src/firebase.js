
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEZrhpHLEG0G07v_iRVp-JZlEdQjw1P0Y",
  authDomain: "desarrollor-web-frontend.firebaseapp.com",
  projectId: "desarrollor-web-frontend",
  storageBucket: "desarrollor-web-frontend.appspot.com",
  messagingSenderId: "581922168425",
  appId: "1:581922168425:web:74be044cf2d852d9d78cf8"
};


const app = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()

export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = () => auth.signInWithPopup(provider);

export const logout = () => auth.signOut();

export const isLogged = () => {
  return auth.currentUser !== null && auth.currentUser.uid !== null;
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export default firebase;