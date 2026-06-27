'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

import { syncUserToFirestore } from '@/lib/actions/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;

    const init = async () => {
      // Await the redirect result FIRST so that when onAuthStateChanged fires,
      // Firebase already has the user session from the Google redirect.
      try {
        await getRedirectResult(auth);
      } catch {
        // No redirect result — normal on fresh page loads, ignore.
      }

      // Now subscribe. Firebase will immediately emit the current user (or null).
      unsubscribe = onAuthStateChanged(auth, async (u) => {
        setUser(u);
        setLoading(false);

        if (u) {
          await syncUserToFirestore({
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            photoURL: u.photoURL,
          });
        }
      });
    };

    init();
    return () => unsubscribe?.();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    // Use redirect on production (avoids popup-blocked errors on deployed sites).
    // Fall back to popup only on localhost for a smoother dev experience.
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      await signInWithPopup(auth, provider);
    } else {
      await signInWithRedirect(auth, provider);
    }
  };

  const signInEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmail = async (email: string, password: string, name?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
      // update local state
      setUser({ ...userCredential.user, displayName: name } as User);
      // Explicitly sync since onAuthStateChanged might have fired before updateProfile finished
      await syncUserToFirestore({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        photoURL: userCredential.user.photoURL,
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signInEmail, signUpEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
