import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { migrateGuestDataToFirestore } from './progressService';

const googleProvider = new GoogleAuthProvider();

// Initialize user document
const initializeUser = async (user, role = 'student') => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      role: role,
      createdAt: new Date()
    });
  }
};

export const signUpWithEmail = async (email, password, role) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await initializeUser(result.user, role);
  await migrateGuestDataToFirestore(result.user.uid);
  return result.user;
};

export const loginWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  await migrateGuestDataToFirestore(result.user.uid);
  return result.user;
};

export const loginWithGoogle = async (role = 'student') => {
  const result = await signInWithPopup(auth, googleProvider);
  await initializeUser(result.user, role);
  await migrateGuestDataToFirestore(result.user.uid);
  return result.user;
};

export const logoutUser = () => {
  return signOut(auth);
};

export const enableGuestMode = () => {
  localStorage.setItem('isGuest', 'true');
};

export const isGuest = () => {
  return localStorage.getItem('isGuest') === 'true';
};
