// ─── Order Store — localStorage-based order persistence ──────────────────────
// Orders are stored in localStorage under the key 'parhae-orders'
// Each order gets a unique ID like Od-0001, Od-0002, etc.

import { CartItem } from '@/lib/firebase/schema';

export interface StoredOrder {
  orderId: string;           // Od-0001, Od-0002 …
  name: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  note: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  placedAt: string;          // ISO string
}

const STORAGE_KEY = 'parhae-orders';

function getAllOrders(): StoredOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredOrder[]) : [];
  } catch {
    return [];
  }
}

function saveAllOrders(orders: StoredOrder[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

/** Generate the next order ID, e.g. Od-0001 */
function nextOrderId(orders: StoredOrder[]): string {
  const max = orders.reduce((acc, o) => {
    const num = parseInt(o.orderId.replace('Od-', ''), 10);
    return isNaN(num) ? acc : Math.max(acc, num);
  }, 0);
  return `Od-${String(max + 1).padStart(4, '0')}`;
}

/** Save a new order and return it with its generated ID */
export function saveOrder(
  data: Omit<StoredOrder, 'orderId' | 'placedAt' | 'status'>
): StoredOrder {
  const orders = getAllOrders();
  const order: StoredOrder = {
    ...data,
    orderId: nextOrderId(orders),
    status: 'pending',
    placedAt: new Date().toISOString(),
  };
  saveAllOrders([...orders, order]);
  return order;
}

/** Find orders by orderId or phone number */
export function findOrders(query: string): StoredOrder[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllOrders().filter(
    (o) =>
      o.orderId.toLowerCase() === q ||
      o.phone.replace(/\s+/g, '').toLowerCase() === q.replace(/\s+/g, '')
  );
}

/** Get a single order by ID */
export function getOrder(orderId: string): StoredOrder | undefined {
  return getAllOrders().find((o) => o.orderId === orderId);
}
