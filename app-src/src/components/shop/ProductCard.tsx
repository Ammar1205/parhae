'use client';
// Product Card with Framer Motion lift + shadow micro-interaction (animation.md)
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Product } from '@/lib/firebase/schema';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    setAdding(true);
    addItem({
      productId: product.id,
      qty: 1,
      price: product.price,
      name: product.name,
      image: product.images[0] || '',
      slug: product.slug,
    });
    // Brief animation delay then open drawer
    await new Promise(r => setTimeout(r, 300));
    setAdding(false);
    openDrawer();
  };

  const CATEGORY_COLORS: Record<string, string> = {
    phonics: 'bg-emerald-100 text-emerald-700',
    'story-books': 'bg-violet-100 text-violet-700',
    'islamic-cards': 'bg-teal-100 text-teal-700',
    'prophet-stories': 'bg-amber-100 text-amber-700',
    tracing: 'bg-yellow-100 text-yellow-700',
    toys: 'bg-pink-100 text-pink-700',
    'flash-cards': 'bg-sky-100 text-sky-700',
    bundles: 'bg-orange-100 text-orange-700',
    'sentence-series': 'bg-indigo-100 text-indigo-700',
  };

  const tagColor = CATEGORY_COLORS[product.category] || 'bg-slate-100 text-slate-700';

  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.01,
        boxShadow: '0 30px 60px -12px rgba(5,150,105,0.25)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="group bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden flex flex-col relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="px-2.5 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold rounded-full font-quicksand shadow-sm"
          >
            -{discount}% OFF
          </motion.span>
        )}
        {product.isFlashDeal && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-[10px] font-bold rounded-full flex items-center gap-1 font-quicksand shadow-sm">
            <Zap size={9} /> Flash Deal
          </span>
        )}
        {product.featured && !product.isFlashDeal && (
          <span className="px-2.5 py-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white text-[10px] font-bold rounded-full font-quicksand shadow-sm">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        onClick={() => setWishlisted(v => !v)}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center"
        aria-label="Add to wishlist"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={wishlisted ? 'filled' : 'empty'}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Heart
              size={15}
              className={wishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <Link href={`/product/${product.slug}`} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-1">
        {/* Product Image */}
        <div className="relative h-48 bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
              {product.category === 'phonics' ? '🔤' :
               product.category === 'story-books' ? '📖' :
               product.category === 'islamic-cards' ? '🕌' :
               product.category === 'prophet-stories' ? '📚' :
               product.category === 'tracing' ? '✏️' :
               product.category === 'toys' ? '🧩' :
               product.category === 'flash-cards' ? '🃏' :
               product.category === 'bundles' ? '🎁' : '📘'}
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 pb-0 flex flex-col flex-1 gap-3">
          {/* Category tag + Age */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full font-quicksand ${tagColor}`}>
              {product.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </span>
            {product.ageRange && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-slate-100 text-slate-500 font-quicksand">
                {product.ageRange}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-fredoka text-base font-bold text-slate-800 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  size={11}
                  className={s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                />
              ))}
            </div>
            <span className="text-xs text-slate-400 font-quicksand">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="font-fredoka text-xl font-bold text-emerald-600">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through font-quicksand">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 pt-3">

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 25px rgba(5,150,105,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={adding || product.stock === 0}
          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-sm rounded-xl transition-all duration-300 disabled:opacity-50 font-quicksand shadow-sm shadow-emerald-200"
        >
          <AnimatePresence mode="wait">
            {adding ? (
              <motion.div
                key="adding"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
              />
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={15} />
                Add to Cart
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
