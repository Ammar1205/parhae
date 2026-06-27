'use client';
// Featured Spotlight - Full-width bundle highlight with GSAP entrance (animation.md)
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight, Package } from 'lucide-react';
import { Product } from '@/lib/firebase/schema';
import { useCart } from '@/context/CartContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BUNDLE_FEATURES = [
  'Phonics Flip Set (120 cards)',
  'Prophet Stories 10-Book Collection',
  'Tracing Workbook + Wipe-Clean Board',
  'Alphabet Wooden Puzzle',
  '20 Islamic Flash Cards',
  'Free Gift Wrap + Reward Stickers',
];

interface FeaturedSpotlightProps {
  product: Product;
}

export default function FeaturedSpotlight({ product }: FeaturedSpotlightProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { addItem, openDrawer } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      tl.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      ).fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      );

      // Stagger feature checkboxes
      gsap.fromTo(
        '.feature-item',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 40%, #0d9488 100%)' }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Badge */}
        <div className="text-center mb-12">
          <span className="inline-block px-5 py-2 bg-white/15 text-white/90 rounded-full text-sm font-semibold font-quicksand border border-white/20 backdrop-blur-sm">
            ✨ Featured Spotlight — Our #1 Bundle
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div ref={leftRef} className="space-y-6 opacity-0">
            <div>
              <span className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 rounded-lg text-xs font-bold font-quicksand mb-3">
                🎁 MEGA BUNDLE — SAVE {discount}%
              </span>
              <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-white leading-tight">
                {product.name}
              </h2>
              <p className="text-emerald-200 font-quicksand mt-4 text-base leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Feature Checklist */}
            <ul className="space-y-3">
              {BUNDLE_FEATURES.map((feature) => (
                <li key={feature} className="feature-item flex items-center gap-3 opacity-0">
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-white/90 font-quicksand text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-fredoka text-4xl font-bold text-white">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-emerald-300/70 line-through text-lg font-quicksand">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-emerald-300 text-xs font-quicksand mt-1">
                  💳 Cash on Delivery • EasyPaisa • JazzCash
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 25px 50px rgba(0,0,0,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addItem({ productId: product.id, qty: 1, price: product.price, name: product.name, image: product.images[0] || '', slug: product.slug });
                  openDrawer();
                }}
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-700 font-bold rounded-2xl shadow-xl hover:bg-emerald-50 transition-all duration-300 font-quicksand"
              >
                Grab This Bundle
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>

          {/* Right: Visual */}
          <div ref={rightRef} className="opacity-0 flex items-center justify-center">
            <div className="relative">
              {/* Main floating card */}
              <motion.div
                animate={{ y: [0, -16, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-72 h-80 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col items-center justify-center gap-6 p-8"
              >
                <div className="text-8xl">🎁</div>
                <div className="text-center">
                  <p className="font-fredoka text-white text-2xl font-bold">Mega Bundle</p>
                  <p className="text-emerald-200 text-sm font-quicksand mt-2">6 Items Included</p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {'⭐⭐⭐⭐⭐'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  <p className="text-emerald-300 text-xs font-quicksand mt-1">423 reviews</p>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -right-4 px-3 py-2 bg-amber-400 rounded-2xl shadow-lg"
              >
                <p className="font-fredoka text-white text-sm font-bold">-{discount}% OFF</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 px-3 py-2 bg-violet-500 rounded-2xl shadow-lg"
              >
                <p className="font-fredoka text-white text-xs font-bold flex items-center gap-1">
                  <Package size={12} /> In Stock
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
