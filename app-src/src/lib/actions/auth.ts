'use server';

import { COLLECTIONS } from '@/lib/firebase/schema';

function isAdminConfigured(): boolean {
  return !!(
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY
  );
}

export async function syncUserToFirestore(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}) {
  if (!isAdminConfigured()) {
    console.log('[Auth] Admin SDK not configured, skipping user sync to Firestore');
    return { success: true };
  }

  try {
    const { adminDb } = await import('@/lib/firebase/admin');
    const userRef = adminDb.collection(COLLECTIONS.USERS).doc(user.uid);
    
    const doc = await userRef.get();
    
    if (!doc.exists) {
      await userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        addresses: [],
        preferences: {},
      });
      console.log(`[Auth] User ${user.uid} synced to Firestore`);
    } else {
      // Update last login or other fields if desired
      await userRef.update({
        lastLoginAt: new Date().toISOString(),
      });
    }
    
    return { success: true };
  } catch (err) {
    console.error('[Auth] Failed to sync user to Firestore:', err);
    return { success: false, error: 'Failed to sync user data' };
  }
}
