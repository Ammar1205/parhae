'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

// FAQ DATA — replace demo text with real answers
const FAQ_SECTIONS = [
  {
    section: '🚚 Orders & Shipping',
    items: [
      {
        q: 'How long does delivery take?',
        a: '✏️ Add your real delivery timeframes here. For example: "3–5 business days within Lahore, 5–7 days across Pakistan."',
      },
      {
        q: 'Do you offer Cash on Delivery?',
        a: '✏️ Add your COD policy here. E.g.: "Yes! COD is available nationwide. No advance payment required."',
      },
      {
        q: 'What are the shipping charges?',
        a: '✏️ Describe your shipping fee structure. E.g.: "Free shipping on orders of 2+ items. Rs. 200 flat fee for single items."',
      },
    ],
  },
  {
    section: '📦 Products',
    items: [
      {
        q: 'What age group are your products for?',
        a: '✏️ Add your age range info here. E.g.: "Our products are designed for children aged 2–10 years. Each product listing shows the recommended age range."',
      },
      {
        q: 'Are the materials safe for kids?',
        a: '✏️ Add your safety/material info here. E.g.: "All our products are made from non-toxic, child-safe materials and comply with international toy safety standards."',
      },
      {
        q: 'Are your books available in Urdu?',
        a: '✏️ Add your language availability here. E.g.: "Yes! Most of our books are bilingual (Urdu & English). Some titles are Urdu-only or English-only — check the product tag."',
      },
    ],
  },
  {
    section: '🔄 Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: '✏️ Add your return window and conditions here. E.g.: "We accept returns within 7 days of delivery if the product is unused and in original packaging."',
      },
      {
        q: 'How do I request a refund?',
        a: '✏️ Add your refund process here. E.g.: "Contact us via WhatsApp or email with your order ID and reason. Refunds are processed within 3–5 business days."',
      },
    ],
  },
  {
    section: '💳 Payments',
    items: [
      {
        q: 'Which payment methods do you accept?',
        a: '✏️ List your accepted payment methods. E.g.: "Cash on Delivery, EasyPaisa, JazzCash, and direct bank transfer."',
      },
      {
        q: 'Is it safe to pay online?',
        a: '✏️ Add payment security info. E.g.: "All online payments are processed through secure, encrypted channels. We never store card details."',
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-quicksand font-semibold text-slate-700 text-sm">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-slate-400 font-quicksand leading-relaxed border-t border-slate-100 pt-3">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto relative">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-quicksand font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <HelpCircle size={28} className="text-white" />
            </div>
            <h1 className="font-fredoka text-4xl font-bold text-white mb-2">Frequently Asked Questions</h1>
            <p className="text-white/70 font-quicksand text-base max-w-md mx-auto">
              Find answers to the most common questions below. Still need help?{' '}
              <Link href="/contact" className="text-white underline">Contact us</Link>.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 space-y-10">
        {FAQ_SECTIONS.map(section => (
          <div key={section.section}>
            <h2 className="font-fredoka text-xl font-bold text-slate-800 mb-4">{section.section}</h2>
            <div className="space-y-2">
              {section.items.map(item => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center">
          <p className="font-fredoka text-xl font-bold text-emerald-800 mb-2">Still have a question?</p>
          <p className="text-sm text-emerald-600 font-quicksand mb-5">
            Our team is happy to help. Reach out via WhatsApp or email.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl font-quicksand hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-300 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
