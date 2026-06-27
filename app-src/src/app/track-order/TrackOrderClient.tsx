'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Package, Truck, CheckCircle2, Clock,
  ArrowLeft, MapPin, Phone, Mail, User, AlertTriangle,
  ShoppingBag, FileText,
} from 'lucide-react';
import Link from 'next/link';
import { findOrders, StoredOrder } from '@/lib/orderStore';

// ─── Order Status Config ──────────────────────────────────────────────────────
const STATUS_STEPS: { key: StoredOrder['status']; icon: React.ElementType; label: string; desc: string }[] = [
  { key: 'pending',    icon: Clock,        label: 'Order Placed',  desc: 'We received your order' },
  { key: 'processing', icon: Package,      label: 'Processing',    desc: 'Your order is being packed' },
  { key: 'shipped',    icon: Truck,        label: 'Shipped',       desc: 'On the way to you' },
  { key: 'delivered',  icon: CheckCircle2, label: 'Delivered',     desc: 'Enjoy your purchase!' },
];

const STATUS_INDEX: Record<StoredOrder['status'], number> = {
  pending: 0, processing: 1, shipped: 2, delivered: 3,
};

const STATUS_BADGE: Record<StoredOrder['status'], { bg: string; text: string; label: string }> = {
  pending:    { bg: 'bg-amber-100',   text: 'text-amber-700',   label: 'Pending' },
  processing: { bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'Processing' },
  shipped:    { bg: 'bg-violet-100',  text: 'text-violet-700',  label: 'Shipped' },
  delivered:  { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Delivered' },
};

// ─── Single Order Card ────────────────────────────────────────────────────────
function OrderCard({ order }: { order: StoredOrder }) {
  const stepIndex = STATUS_INDEX[order.status];
  const badge = STATUS_BADGE[order.status];
  const progressPct = stepIndex === 0 ? 0 : (stepIndex / (STATUS_STEPS.length - 1)) * 100;

  const placedDate = new Date(order.placedAt).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-emerald-100 text-xs font-quicksand font-semibold mb-0.5">Order ID</p>
            <p className="font-fredoka text-3xl font-bold text-white tracking-wide">{order.orderId}</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold font-quicksand ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
        </div>
        <p className="text-emerald-100 text-xs font-quicksand mt-2">Placed on: {placedDate}</p>
      </div>

      <div className="p-6 space-y-6">

        {/* ── Progress Tracker ── */}
        <div>
          <h3 className="font-fredoka font-bold text-slate-700 text-base mb-5">Order Progress</h3>
          <div className="relative">
            {/* Track background */}
            <div className="absolute top-5 left-5 right-5 h-1 bg-slate-200 rounded-full z-0" />
            {/* Progress fill */}
            <motion.div
              className="absolute top-5 left-5 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full z-0"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              style={{ maxWidth: 'calc(100% - 2.5rem)' }}
            />
            {/* Steps */}
            <div className="relative z-10 flex justify-between">
              {STATUS_STEPS.map((step, i) => {
                const Icon = step.icon;
                const done = i <= stepIndex;
                const current = i === stepIndex;
                return (
                  <div key={step.key} className="flex flex-col items-center gap-2 text-center w-1/4">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: current ? 1.1 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all
                        ${done
                          ? current
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-200'
                            : 'bg-emerald-500'
                          : 'bg-slate-100'
                        }`}
                    >
                      <Icon size={18} className={done ? 'text-white' : 'text-slate-400'} />
                    </motion.div>
                    <p className={`font-fredoka text-xs font-bold leading-tight
                      ${done ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400 font-quicksand hidden sm:block leading-tight">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Items ── */}
        <div>
          <h3 className="font-fredoka font-bold text-slate-700 text-base mb-3 flex items-center gap-2">
            <ShoppingBag size={16} className="text-emerald-500" /> Items Ordered
          </h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
                <div className="w-12 h-12 bg-white rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    : <span className="text-lg">📚</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 font-quicksand line-clamp-1">{item.name}</p>
                  <p className="text-xs text-slate-400 font-quicksand">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-bold text-slate-800 font-fredoka flex-shrink-0">
                  Rs. {(item.price * item.qty).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-3 bg-slate-50 rounded-2xl px-4 py-3 space-y-1.5">
            <div className="flex justify-between text-sm text-slate-500 font-quicksand">
              <span>Subtotal</span><span>Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500 font-quicksand">
              <span>Shipping</span>
              <span className={order.shippingCost === 0 ? 'text-emerald-500 font-semibold' : ''}>
                {order.shippingCost === 0 ? 'FREE 🎉' : `Rs. ${order.shippingCost}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-slate-800 pt-1.5 border-t border-slate-200 mt-1.5">
              <span className="font-fredoka">Total</span>
              <span className="font-fredoka text-emerald-600">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ── Delivery Info ── */}
        <div>
          <h3 className="font-fredoka font-bold text-slate-700 text-base mb-3 flex items-center gap-2">
            <MapPin size={16} className="text-emerald-500" /> Delivery Details
          </h3>
          <div className="bg-slate-50 rounded-2xl p-4 grid sm:grid-cols-2 gap-3 font-quicksand text-sm text-slate-700">
            <div className="flex items-start gap-2">
              <User size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-0.5">Name</p>
                <p className="font-semibold">{order.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-0.5">Email</p>
                <p className="font-semibold break-all">{order.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-0.5">Phone</p>
                <p className="font-semibold">{order.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-0.5">City / Province</p>
                <p className="font-semibold">{order.city}, {order.province}</p>
              </div>
            </div>
            <div className="sm:col-span-2 flex items-start gap-2">
              <MapPin size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-0.5">Address</p>
                <p className="font-semibold">{order.address}</p>
              </div>
            </div>
            {order.note && (
              <div className="sm:col-span-2 flex items-start gap-2">
                <FileText size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold mb-0.5">Note</p>
                  <p className="italic text-slate-600">"{order.note}"</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─── Main Track Order Page ────────────────────────────────────────────────────
export default function TrackOrderClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StoredOrder[] | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();
    const found = findOrders(query);
    setResults(found);
    setSearched(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-teal-600 to-emerald-700 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-2xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-quicksand font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Truck size={28} className="text-white" />
            </div>
            <h1 className="font-fredoka text-4xl font-bold text-white mb-2">Track Your Order</h1>
            <p className="text-white/70 font-quicksand text-base">
              Enter your Order ID (e.g. Od-0001) or the phone number you used at checkout.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">

        {/* ── Search Box ── */}
        <form onSubmit={handleSearch} className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 sm:p-8">
          <label className="block text-sm font-semibold text-slate-600 font-quicksand mb-3">
            Order ID or Phone Number
          </label>
          <div className="flex gap-3">
            <input
              id="track-order-input"
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Od-0001  or  03001234567"
              className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-quicksand text-slate-700 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px rgba(5,150,105,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl font-quicksand shadow-sm shadow-emerald-200 transition-all duration-300"
            >
              <Search size={16} /> Track
            </motion.button>
          </div>
        </form>

        {/* ── Results ── */}
        <AnimatePresence mode="wait">
          {searched && results !== null && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {results.length === 0 ? (
                /* No orders found */
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-lg p-10 text-center"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle size={28} className="text-slate-400" />
                  </div>
                  <h2 className="font-fredoka text-xl font-bold text-slate-700 mb-2">No Order Found</h2>
                  <p className="font-quicksand text-slate-500 text-sm">
                    We couldn't find an order matching <strong>"{query}"</strong>.<br />
                    Please check the Order ID (e.g. Od-0001) or phone number and try again.
                  </p>
                </motion.div>
              ) : (
                /* Orders found */
                <div className="space-y-6">
                  {results.map((order) => (
                    <OrderCard key={order.orderId} order={order} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Help ── */}
        <div className="text-center">
          <p className="text-sm text-slate-400 font-quicksand">
            Can't find your order?{' '}
            <Link href="/contact"
              className="inline-block px-5 py-2 mt-2 bg-emerald-50 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-500 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              Contact Us
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
