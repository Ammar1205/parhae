'use server';
// Product Server Actions — connected to Firestore (parhae-likhae project)
// Falls back to mock data gracefully when Admin SDK is not yet configured.

import { Product, Category, COLLECTIONS } from '@/lib/firebase/schema';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData';

// ── Lazy Admin DB import (server-only, fails gracefully if not configured) ──
async function getAdminDb() {
  try {
    const { adminDb } = await import('@/lib/firebase/admin');
    return adminDb;
  } catch {
    return null;
  }
}

function isAdminConfigured(): boolean {
  return !!(
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY
  );
}

interface GetProductsOptions {
  limit?: number;
  category?: string;
  featured?: boolean;
  isFlashDeal?: boolean;
}

/**
 * Get products — uses Firestore when Admin SDK is configured,
 * otherwise falls back to mock data for development.
 */
export async function getProducts(options: GetProductsOptions = {}): Promise<Product[]> {
  if (isAdminConfigured()) {
    try {
      const db = await getAdminDb();
      if (db) {
        let query: FirebaseFirestore.Query = db.collection(COLLECTIONS.PRODUCTS);

        if (options.category) {
          query = query.where('category', '==', options.category);
        }
        if (options.featured !== undefined) {
          query = query.where('featured', '==', options.featured);
        }
        if (options.isFlashDeal !== undefined) {
          query = query.where('isFlashDeal', '==', options.isFlashDeal);
        }

        query = query.orderBy('createdAt', 'desc');

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const snap = await query.get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Product[];
        }
      }
    } catch (err) {
      console.warn('[getProducts] Firestore query failed, using mock data:', err);
    }
  }

  // Fallback: mock data
  let products = [...MOCK_PRODUCTS];
  if (options.category) products = products.filter(p => p.category === options.category);
  if (options.featured !== undefined) products = products.filter(p => p.featured === options.featured);
  if (options.isFlashDeal !== undefined) products = products.filter(p => p.isFlashDeal === options.isFlashDeal);
  if (options.limit) products = products.slice(0, options.limit);
  return products;
}

/**
 * Get single product by slug — Firestore first, then mock fallback.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isAdminConfigured()) {
    try {
      const db = await getAdminDb();
      if (db) {
        const snap = await db
          .collection(COLLECTIONS.PRODUCTS)
          .where('slug', '==', slug)
          .limit(1)
          .get();
        if (!snap.empty) {
          return { id: snap.docs[0].id, ...snap.docs[0].data() } as Product;
        }
      }
    } catch (err) {
      console.warn('[getProductBySlug] Firestore query failed, using mock data:', err);
    }
  }

  return MOCK_PRODUCTS.find(p => p.slug === slug) ?? null;
}

/**
 * Get categories — Firestore first, then mock fallback.
 */
export async function getCategories(): Promise<Category[]> {
  if (isAdminConfigured()) {
    try {
      const db = await getAdminDb();
      if (db) {
        const snap = await db
          .collection(COLLECTIONS.CATEGORIES)
          .orderBy('order')
          .get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Category[];
        }
      }
    } catch (err) {
      console.warn('[getCategories] Firestore query failed, using mock data:', err);
    }
  }

  return MOCK_CATEGORIES.sort((a, b) => a.order - b.order);
}
