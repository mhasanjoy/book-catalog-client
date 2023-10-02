import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_apiKey,
  authDomain: import.meta.env.FIREBASE_authDomain,
  projectId: import.meta.env.FIREBASE_projectId,
  storageBucket: import.meta.env.FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.FIREBASE_messagingSenderId,
  appId: import.meta.env.FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
