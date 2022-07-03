import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLvU58dgs948yqwsSYHuO_X8RkBYWHyu8",
  authDomain: "foodapp-3ac77.firebaseapp.com",
  databaseURL: "https://foodapp-3ac77-default-rtdb.firebaseio.com",
  projectId: "foodapp-3ac77",
  storageBucket: "foodapp-3ac77.appspot.com",
  messagingSenderId: "11432089104",
  appId: "1:11432089104:web:1c5cfc4ffcb3f44bfb5c95",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
