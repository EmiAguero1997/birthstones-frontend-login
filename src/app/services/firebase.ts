import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA92iflkg8ZbL0E9F_XXUjx-oES3o4UEb4",
  authDomain: "topaz-login-1741913520352.firebaseapp.com",
  projectId: "topaz-login-1741913520352",
  storageBucket: "topaz-login-1741913520352.firebasestorage.app",
  messagingSenderId: "332005279061",
  appId: "1:332005279061:web:5debc9517dc3fe2db1dbdc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
