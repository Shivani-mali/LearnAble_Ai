import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYUfSQbBtlm5EvWXnuO1F-egwA4nZilpU",
  authDomain: "learnable-ai-app-v1.firebaseapp.com",
  projectId: "learnable-ai-app-v1",
  storageBucket: "learnable-ai-app-v1.firebasestorage.app",
  messagingSenderId: "112897006226",
  appId: "1:112897006226:web:2df0f803ef07c3a9f5e44b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
