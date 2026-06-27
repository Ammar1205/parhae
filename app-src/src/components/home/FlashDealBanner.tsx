'use client';
// Live Countdown Timer for Flash Deals
// Hydration-safe: timer state is null on first render (matches SSR),
// then populated client-side only via useEffect after mount.
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/firebase/schema';
import { useCart } from '@/context/CartContext';

interface FlashDealBannerProps {
  product: Product;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(endTime: string): TimeLeft {
  const diff = Math.max(0, new Date(endTime).getTime() - Date.now());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

// Placeholder block shown during SSR — matches exactly what client renders before mount
function TimeBlock({ value, label }: { value: number | null; label: string }) {
  const display = value === null ? '--' : String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={display}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-white/15 backdrop-blur-sm rounded-2xl border border-white/25 flex items-center justify-center"
        >
          <span className="font-fredoka text-2xl sm:text-3xl font-bold text-white tabular-nums">
            {display}
          </span>
        </motion.div>
      </AnimatePresence>
      <span className="text-[10px] text-white/60 font-quicksand mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function FlashDealBanner({ product }: FlashDealBannerProps) {
  // null = not yet mounted (SSR-safe). Both server and client render null initially.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // endTime is derived purely from product data (stable, no Date.now() at render time)
  const endTime = product.dealEndsAt ?? '';

  useEffect(() => {
    // Compute a stable fallback end time once on the client only
    const resolvedEndTime =
      endTime || new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString();

    // Set immediately so UI shows correct time right after mount
    setTimeLeft(getTimeLeft(resolvedEndTime));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(resolvedEndTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const { addItem, openDrawer } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 27;

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Capsule container */}
        <div className="bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20 px-6 sm:px-10 py-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            {/* Left: Deal Info */}
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Zap size={26} className="text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="px-3 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full font-quicksand">
                    ⚡ FLASH DEAL
                  </span>
                  <span className="text-white/80 text-xs font-quicksand">Limited stock!</span>
                </div>
                <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-white mt-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 justify-center lg:justify-start mt-1">
                  <span className="font-fredoka text-2xl font-bold text-yellow-300">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-white/50 line-through text-sm font-quicksand">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="px-2 py-0.5 bg-yellow-400/20 text-yellow-300 text-xs font-bold rounded-lg font-quicksand">
                    -{discount}%
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Countdown — null renders '--' on both server and client (no mismatch) */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-white/70 text-xs font-quicksand uppercase tracking-widest">
                Deal Ends In
              </p>
              <div className="flex items-center gap-3">
                <TimeBlock value={timeLeft?.hours ?? null} label="HRS" />
                <span className="font-fredoka text-3xl text-white/50 mb-4">:</span>
                <TimeBlock value={timeLeft?.minutes ?? null} label="MIN" />
                <span className="font-fredoka text-3xl text-white/50 mb-4">:</span>
                <TimeBlock value={timeLeft?.seconds ?? null} label="SEC" />
              </div>
            </div>

            {/* Right: CTA */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.35)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                addItem({
                  productId: product.id,
                  qty: 1,
                  price: product.price,
                  name: product.name,
                  image: product.images[0] || '',
                  slug: product.slug,
                });
                openDrawer();
              }}
              className="flex items-center gap-2.5 px-7 py-4 bg-white text-rose-600 font-bold text-base rounded-2xl shadow-xl hover:bg-rose-50 transition-all duration-300 font-quicksand whitespace-nowrap"
            >
              <ShoppingCart size={18} />
              Grab Flash Deal!
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
