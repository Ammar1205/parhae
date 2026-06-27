// Firestore Collections - Optimized schema (database.md: normalized indexing)
// Collection: products
// Document fields: id, name, description, price, originalPrice, category, images[], tags[], 
//                  stock, rating, reviewCount, featured, isFlashDeal, dealEndsAt, createdAt

// Collection: categories
// Document fields: id, name, slug, icon, color, productCount, order

// Collection: users/{uid}
// Document fields: uid, email, displayName, photoURL, createdAt, addresses[], preferences

// Collection: carts/{uid}
// Document fields: uid, items[{productId, qty, price, name, image}], updatedAt

// Collection: orders/{orderId}
// Document fields: orderId, userId, items[], total, status, shippingAddress, 
//                  paymentMethod, createdAt, updatedAt

// Collection: wishlists/{uid}
// Document fields: uid, productIds[], updatedAt

// Collection: contacts/{id}
// Document fields: name, email, phone, message, createdAt, resolved

export const COLLECTIONS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  USERS: 'users',
  CARTS: 'carts',
  ORDERS: 'orders',
  WISHLISTS: 'wishlists',
  CONTACTS: 'contacts',
} as const;

export type ProductCategory =
  | 'story-books'
  | 'phonics'
  | 'tracing'
  | 'toys'
  | 'flash-cards'
  | 'bundles'
  | 'islamic-cards'
  | 'prophet-stories'
  | 'sentence-series';

export interface Product {
  id: string;
  name: string;
  description: string;
  whatsInside?: string;   // HTML supported — shown in "What's Inside" accordion
  ageLearning?: string;   // HTML supported — shown in "Age & Learning" accordion
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  images: string[];
  tags: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isFlashDeal: boolean;
  dealEndsAt?: string;
  createdAt: string;
  slug: string;
  ageRange?: string;
  language?: 'urdu' | 'english' | 'bilingual';
}

export interface CartItem {
  productId: string;
  qty: number;
  price: number;
  name: string;
  image: string;
  slug: string;
}

export interface Cart {
  uid: string;
  items: CartItem[];
  updatedAt: string;
}

export interface Order {
  orderId: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
  };
  paymentMethod: 'cod' | 'easypaisa' | 'jazzcash' | 'bank-transfer';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  productCount: number;
  order: number;
}
