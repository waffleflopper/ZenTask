import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2NgBAzdcaj2Ztv-6ms2sVJzdf8oF0sbs",
  authDomain: "zentask-6c861.firebaseapp.com",
  projectId: "zentask-6c861",
  storageBucket: "zentask-6c861.appspot.com",
  messagingSenderId: "1010803403943",
  appId: "1:1010803403943:web:d1977429d977684f223f82",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
