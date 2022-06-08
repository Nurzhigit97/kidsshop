import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBA1d-EoP5bZ2qJ16boDdkwoAgb3sUXz68",
  authDomain: "kidsshop-6582a.firebaseapp.com",
  projectId: "kidsshop-6582a",
  storageBucket: "kidsshop-6582a.appspot.com",
  messagingSenderId: "1014275660279",
  appId: "1:1014275660279:web:1e795b4be6926cbc2ef6f2",
  measurementId: "G-CC8PDT0DY0",
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

export default fireDB;
