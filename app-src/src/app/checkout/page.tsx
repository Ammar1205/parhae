'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import {
  User, Mail, Phone, MapPin, Map, Home, FileText,
  ShoppingBag, ChevronRight, CheckCircle2, ArrowLeft,
  Package, Truck, AlertCircle, Copy, Check,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { saveOrder, StoredOrder } from '@/lib/orderStore';

// ─── Pakistan Provinces & Cities ─────────────────────────────────────────────
const PROVINCE_CITIES: Record<string, string[]> = {
  Punjab: [
    'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Multan',
    'Sialkot', 'Bahawalpur', 'Sargodha', 'Sheikhupura', 'Jhang',
    'Rahim Yar Khan', 'Gujrat', 'Kasur', 'Okara', 'Wah Cantonment',
    'Sahiwal', 'Mandi Bahauddin', 'Jhelum', 'Khanewal', 'Hafizabad', 'Other',
  ],
  Sindh: [
    'Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Nawabshah',
    'Mirpur Khas', 'Jacobabad', 'Shikarpur', 'Khairpur', 'Kotri',
    'Thatta', 'Dadu', 'Badin', 'Tando Adam', 'Tando Muhammad Khan', 'Other',
  ],
  'Khyber Pakhtunkhwa': [
    'Peshawar', 'Mardan', 'Mingora', 'Kohat', 'Abbottabad',
    'Mansehra', 'Dera Ismail Khan', 'Swabi', 'Nowshera', 'Charsadda',
    'Battagram', 'Haripur', 'Bannu', 'Chitral', 'Lakki Marwat', 'Other',
  ],
  Balochistan: [
    'Quetta', 'Turbat', 'Khuzdar', 'Hub', 'Chaman',
    'Gwadar', 'Dera Murad Jamali', 'Loralai', 'Sibi', 'Zhob',
    'Panjgur', 'Nushki', 'Mastung', 'Kalat', 'Kharan', 'Other',
  ],
  'Azad Kashmir': [
    'Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli', 'Bhimber',
    'Bagh', 'Chakothi', 'Pallandri', 'Hattian Bala', 'Haveli', 'Other',
  ],
  'Gilgit-Baltistan': [
    'Gilgit', 'Skardu', 'Chilas', 'Ghanche', 'Ghizer',
    'Hunza', 'Nagar', 'Diamer', 'Astore', 'Shigar', 'Other',
  ],
  'Islamabad Capital Territory': ['Islamabad', 'Other'],
};

const PROVINCES = Object.keys(PROVINCE_CITIES);

// ─── Phone Validation ─────────────────────────────────────────────────────────
function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Phone number is required.';
  if (trimmed.startsWith('+92')) {
    if (!/^\+92[0-9]{10}$/.test(trimmed))
      return 'With +92 prefix, enter exactly 10 digits after it (e.g. +923001234567).';
    return null;
  }
  if (!/^[0-9]{11}$/.test(trimmed))
    return 'Phone number must be exactly 11 digits (e.g. 03001234567).';
  return null;
}

// ─── Form Field Component ─────────────────────────────────────────────────────
function Field({
  label, required = true, error, icon, children,
}: {
  label: string; required?: boolean; error?: string;
  icon: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 font-quicksand">
        {icon} {label}
        {required && <span className="text-rose-500 text-xs">*</span>}
        {!required && <span className="text-slate-400 text-xs font-normal">(optional)</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p key="err" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1 text-xs text-rose-500 font-quicksand">
            <AlertCircle size={12} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border-2 font-quicksand text-sm text-slate-800 bg-white
   placeholder:text-slate-400 outline-none transition-all duration-200
   ${hasError
     ? 'border-rose-300 focus:border-rose-400 bg-rose-50'
     : 'border-slate-200 focus:border-emerald-400 focus:bg-emerald-50/30'}`;

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ order }: { order: StoredOrder }) {
  const [copied, setCopied] = useState(false);

  function copyId() {
    navigator.clipboard.writeText(order.orderId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const placedDate = new Date(order.placedAt).toLocaleDateString('en-PK', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-12"
    >
      <div className="max-w-2xl mx-auto">

        {/* Checkmark */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200"
          >
            <CheckCircle2 size={48} className="text-white" strokeWidth={2} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="font-fredoka text-4xl font-bold text-slate-800 mb-2">Order Placed! 🎉</h1>
            <p className="font-quicksand text-slate-500 text-base">
              Thank you, <span className="font-bold text-emerald-600">{order.name}</span>! We've received your order.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          {/* Order ID Card — prominent */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200">
            <p className="font-quicksand text-emerald-100 text-sm font-semibold mb-1">Your Order ID</p>
            <div className="flex items-center justify-between">
              <span className="font-fredoka text-5xl font-bold tracking-wide">{order.orderId}</span>
              <button
                onClick={copyId}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors font-quicksand text-sm font-semibold"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="font-quicksand text-emerald-100 text-xs mt-3">
              💡 Save this ID — you'll need it to track your order.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5">
            <h2 className="font-fredoka text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image
                      ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      : <span className="text-lg">📚</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 font-quicksand line-clamp-1">{item.name}</p>
                    <p className="text-xs text-slate-400 font-quicksand">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-800 font-fredoka">
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-slate-100 pt-4 space-y-1.5">
              <div className="flex justify-between text-sm text-slate-500 font-quicksand">
                <span>Subtotal</span><span>Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 font-quicksand">
                <span>Shipping</span>
                <span className={order.shippingCost === 0 ? 'text-emerald-500 font-semibold' : ''}>
                  {order.shippingCost === 0 ? 'FREE 🎉' : `Rs. ${order.shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-100">
                <span className="font-fredoka text-base">Total Paid</span>
                <span className="font-fredoka text-xl text-emerald-600">Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Placed on */}
            <p className="text-xs text-slate-400 font-quicksand">Placed on: {placedDate}</p>
          </div>

          {/* Delivery Info */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-3">
            <h2 className="font-fredoka text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">
              Delivery Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 font-quicksand text-sm text-slate-700">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Name</p>
                <p className="font-semibold">{order.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Email</p>
                <p className="font-semibold">{order.email}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Phone</p>
                <p className="font-semibold">{order.phone}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Province</p>
                <p className="font-semibold">{order.province}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">City</p>
                <p className="font-semibold">{order.city}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Address</p>
                <p className="font-semibold">{order.address}</p>
              </div>
              {order.note && (
                <div className="sm:col-span-2">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">Note</p>
                  <p className="text-slate-600 italic">"{order.note}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Delivery note */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <span className="text-xl">🚚</span>
            <p className="text-sm text-amber-700 font-quicksand">
              Our team will call you to confirm your order. Expected delivery in{' '}
              <strong>3–5 working days</strong> across Pakistan.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-200 font-quicksand"
            >
              Continue Shopping
            </Link>
            <Link
              href="/track-order"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition-all font-quicksand"
            >
              Track My Order
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const shippingCost = items.reduce((s, i) => s + i.qty, 0) >= 2 ? 0 : 200;
  const total = subtotal + shippingCost;

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    province: '', city: '', address: '', note: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<StoredOrder | null>(null);

  const cityOptions = form.province ? PROVINCE_CITIES[form.province] ?? [] : [];

  useEffect(() => {
    setForm((f) => ({ ...f, city: '' }));
  }, [form.province]);

  useEffect(() => {
    if (!placedOrder && items.length === 0) router.replace('/');
  }, [items, placedOrder, router]);

  function validate() {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) newErrors.phone = phoneErr;
    if (!form.province) newErrors.province = 'Please select your province.';
    if (!form.city) newErrors.city = 'Please select your city.';
    if (!form.address.trim()) newErrors.address = 'Delivery address is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));

    const order = saveOrder({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      province: form.province,
      city: form.city,
      address: form.address.trim(),
      note: form.note.trim(),
      items: [...items],
      subtotal,
      shippingCost,
      total,
    });

    clearCart();
    setPlacing(false);
    setPlacedOrder(order);
  }

  if (placedOrder) return <SuccessScreen order={placedOrder} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 pt-6 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 font-quicksand font-semibold mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shopping
        </Link>

        <div className="mb-8">
          <h1 className="font-fredoka text-4xl font-bold text-slate-800">Checkout</h1>
          <p className="font-quicksand text-slate-500 mt-1 text-sm">Fill in your details below to place your order.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">

          {/* ── Form ── */}
          <motion.form onSubmit={handleSubmit} noValidate
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">

            <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
              <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Truck size={18} className="text-emerald-600" />
              </div>
              <h2 className="font-fredoka text-xl font-bold text-slate-800">Shipping Information</h2>
            </div>

            {/* Name */}
            <Field label="Full Name" error={errors.name} icon={<User size={14} className="text-slate-400" />}>
              <input id="checkout-name" type="text" placeholder="e.g. Fatima Ahmed" value={form.name}
                onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); if (errors.name) setErrors((er) => ({ ...er, name: undefined })); }}
                className={inputClass(!!errors.name)} />
            </Field>

            {/* Email */}
            <Field label="Email Address" error={errors.email} icon={<Mail size={14} className="text-slate-400" />}>
              <input id="checkout-email" type="email" placeholder="e.g. fatima@example.com" value={form.email}
                onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); if (errors.email) setErrors((er) => ({ ...er, email: undefined })); }}
                className={inputClass(!!errors.email)} />
            </Field>

            {/* Phone */}
            <Field label="Phone Number" error={errors.phone} icon={<Phone size={14} className="text-slate-400" />}>
              <input id="checkout-phone" type="tel" placeholder="03001234567 or +923001234567" value={form.phone}
                onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); if (errors.phone) setErrors((er) => ({ ...er, phone: undefined })); }}
                className={inputClass(!!errors.phone)} />
              <p className="text-xs text-slate-400 font-quicksand -mt-1">
                Must be 11 digits, or start with +92 followed by 10 digits.
              </p>
            </Field>

            {/* Province */}
            <Field label="Province" error={errors.province} icon={<Map size={14} className="text-slate-400" />}>
              <select id="checkout-province" value={form.province}
                onChange={(e) => { setForm((f) => ({ ...f, province: e.target.value })); if (errors.province) setErrors((er) => ({ ...er, province: undefined })); }}
                className={inputClass(!!errors.province) + ' cursor-pointer'}>
                <option value="">— Select Province —</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>

            {/* City */}
            <Field label="City" error={errors.city} icon={<MapPin size={14} className="text-slate-400" />}>
              <select id="checkout-city" value={form.city} disabled={!form.province}
                onChange={(e) => { setForm((f) => ({ ...f, city: e.target.value })); if (errors.city) setErrors((er) => ({ ...er, city: undefined })); }}
                className={inputClass(!!errors.city) + ` cursor-pointer ${!form.province ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <option value="">{form.province ? '— Select City —' : '— Select a province first —'}</option>
                {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>

            {/* Address */}
            <Field label="Delivery Address" error={errors.address} icon={<Home size={14} className="text-slate-400" />}>
              <textarea id="checkout-address" placeholder="House/Flat No., Street, Area / Sector, Landmark"
                value={form.address} rows={3}
                onChange={(e) => { setForm((f) => ({ ...f, address: e.target.value })); if (errors.address) setErrors((er) => ({ ...er, address: undefined })); }}
                className={inputClass(!!errors.address) + ' resize-none'} />
            </Field>

            {/* Note */}
            <Field label="Order Note" required={false} icon={<FileText size={14} className="text-slate-400" />}>
              <textarea id="checkout-note" placeholder="Any special instructions? (e.g. gift wrapping, preferred delivery time…)"
                value={form.note} rows={2}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                className={inputClass(false) + ' resize-none'} />
            </Field>

            {/* Submit */}
            <motion.button type="submit" disabled={placing}
              whileHover={!placing ? { scale: 1.02, y: -2, boxShadow: '0 20px 40px rgba(5,150,105,0.25)' } : {}}
              whileTap={!placing ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-lg rounded-2xl transition-all duration-300 font-quicksand shadow-lg shadow-emerald-200 mt-2">
              {placing ? (
                <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Placing Your Order…</>
              ) : (
                <><Package size={20} /> Place Order · Rs. {total.toLocaleString()} <ChevronRight size={18} /></>
              )}
            </motion.button>

            <p className="text-center text-xs text-slate-400 font-quicksand">
              🔒 Cash on Delivery · EasyPaisa · JazzCash accepted
            </p>
          </motion.form>

          {/* ── Order Summary ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5 sticky top-6">

            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                <ShoppingBag size={18} className="text-amber-600" />
              </div>
              <h2 className="font-fredoka text-xl font-bold text-slate-800">Order Summary</h2>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : <span className="text-xl">📚</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 font-quicksand line-clamp-2 leading-tight">{item.name}</p>
                    <p className="text-xs text-slate-400 font-quicksand mt-0.5">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-800 font-fredoka flex-shrink-0">
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-500 font-quicksand">
                <span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 font-quicksand">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'text-emerald-500 font-semibold' : ''}>
                  {shippingCost === 0 ? 'FREE 🎉' : `Rs. ${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-100">
                <span className="font-fredoka text-base">Total</span>
                <span className="font-fredoka text-xl text-emerald-600">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 space-y-2">
              <p className="text-xs font-semibold text-slate-500 font-quicksand uppercase tracking-wide mb-2">Payment Methods</p>
              {[{ emoji: '💵', label: 'Cash on Delivery (COD)' }, { emoji: '📱', label: 'EasyPaisa' }, { emoji: '📱', label: 'JazzCash' }].map(({ emoji, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-slate-600 font-quicksand">
                  <span>{emoji}</span> {label}
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 bg-emerald-50 rounded-2xl p-4">
              <span className="text-xl">🚚</span>
              <p className="text-sm text-emerald-700 font-quicksand">
                <strong>Delivery in 3–5 working days</strong> across all of Pakistan.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
