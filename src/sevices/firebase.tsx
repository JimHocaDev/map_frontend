import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: import.meta.env.VITE_GOOGLE_AUTODOMAIN,
  projectId: import.meta.env.VITE_GOOGLE_PROJECTID,
  storageBucket: import.meta.env.VITE_GOOGLE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_GOOGLE_M_SENDERID,
  appId: import.meta.env.VITE_GOOGLE_APPID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () =>
  await signInWithPopup(auth, provider);
