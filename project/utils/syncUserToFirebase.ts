// src/utils/syncUserToFirebase.ts
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const syncUserToFirebase = async (user: {
  sub: string;
  email: string;
  name?: string;
  picture?: string;
}) => {
  if (!user?.sub || !user?.email) return;

  try {
    const userRef = doc(db, 'users', user.sub); // Auth0 user ID as doc ID
    await setDoc(
      userRef,
      {
        email: user.email,
        name: user.name || '',
        picture: user.picture || '',
        lastLogin: new Date(),
      },
      { merge: true }
    );
    console.log('✅ Synced user to Firestore');
  } catch (error) {
    console.error('❌ Failed to sync user to Firestore:', error);
  }
};
