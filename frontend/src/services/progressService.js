import { db, auth } from './firebase';
import { doc, setDoc, getDoc, updateDoc, onSnapshot, collection } from 'firebase/firestore';

// Save progress to LocalStorage for Guests
const saveProgressLocally = (topicId, data) => {
  const existing = JSON.parse(localStorage.getItem('guestProgress')) || {};
  existing[topicId] = { ...existing[topicId], ...data };
  localStorage.setItem('guestProgress', JSON.stringify(existing));
};

// Save progress to Firestore for Authenticated Users
const saveProgressToFirestore = async (userId, topicId, data) => {
  const docRef = doc(db, `progress/${userId}/topics`, topicId);
  await setDoc(docRef, data, { merge: true });
};

// Main save function
export const saveProgress = async (topicId, data) => {
  if (auth.currentUser) {
    await saveProgressToFirestore(auth.currentUser.uid, topicId, data);
  } else {
    saveProgressLocally(topicId, data);
  }
};

// Migrate data upon login
export const migrateGuestDataToFirestore = async (userId) => {
  const guestData = JSON.parse(localStorage.getItem('guestProgress'));
  if (guestData && Object.keys(guestData).length > 0) {
    for (const [topicId, data] of Object.entries(guestData)) {
      await saveProgressToFirestore(userId, topicId, data);
    }
    // Clear guest data after migration
    localStorage.removeItem('guestProgress');
    localStorage.removeItem('isGuest');
  }
};

// Listen to progress updates (Real-time)
export const listenToProgress = (userId, callback) => {
  const topicsRef = collection(db, `progress/${userId}/topics`);
  return onSnapshot(topicsRef, (snapshot) => {
    const progress = [];
    snapshot.forEach((doc) => {
      progress.push({ id: doc.id, ...doc.data() });
    });
    callback(progress);
  });
};
