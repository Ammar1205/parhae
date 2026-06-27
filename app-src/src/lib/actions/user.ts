'use server';

import { COLLECTIONS } from '@/lib/firebase/schema';

function isAdminConfigured(): boolean {
  return !!(
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY
  );
}

export async function getUserProfile(uid: string) {
  if (!isAdminConfigured()) {
    return { success: false, error: 'Admin SDK not configured' };
  }

  try {
    const { adminDb } = await import('@/lib/firebase/admin');
    const doc = await adminDb.collection(COLLECTIONS.USERS).doc(uid).get();
    
    if (!doc.exists) {
      return { success: false, error: 'User not found' };
    }
    
    return { success: true, data: doc.data() };
  } catch (err: any) {
    console.error('[User] Failed to fetch profile:', err);
    return { success: false, error: 'Failed to fetch profile' };
  }
}

export async function updateUserProfile(uid: string, data: {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
}) {
  if (!isAdminConfigured()) {
    return { success: false, error: 'Admin SDK not configured' };
  }

  try {
    const { adminDb } = await import('@/lib/firebase/admin');
    const userRef = adminDb.collection(COLLECTIONS.USERS).doc(uid);
    
    // We will update displayName and also store phone, address, and city at the root level 
    // or inside an address object for simplicity.
    const updates: any = {};
    if (data.name !== undefined) updates.displayName = data.name;
    if (data.phone !== undefined) updates.phone = data.phone;
    if (data.address !== undefined) updates.address = data.address;
    if (data.city !== undefined) updates.city = data.city;
    
    updates.updatedAt = new Date().toISOString();

    await userRef.set(updates, { merge: true });
    
    return { success: true };
  } catch (err: any) {
    console.error('[User] Failed to update profile:', err);
    return { success: false, error: 'Failed to update profile' };
  }
}
