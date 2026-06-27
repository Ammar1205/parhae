'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, PackageOpen, ArrowDownUp } from 'lucide-react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ProductCard from '@/components/shop/ProductCard';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CategoryMeta {
  name: string;
  emoji: string;
  color: string;
  description: string;
}

interface Props {
  slug: string;
  meta: CategoryMeta;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating';

export default function CategoryPageClient({ slug, meta }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // ── Filter products that belong to this category ──────────────
  const products = useMemo(() => {
    const filtered = MOCK_PRODUCTS.filter((p) => p.category === slug);

    if (sortBy === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [slug, sortBy]);

  // ── GSAP scroll-in animation on cards ─────────────────────────
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.cat-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [products]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <div className={`bg-gradient-to-br ${meta.color} py-14 px-4 relative overflow-hidden`}>
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-7xl mx-auto relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-quicksand font-semibold mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0">
              {meta.emoji}
            </div>
            <div>
              <h1 className="font-fredoka text-4xl sm:text-5xl font-bold text-white leading-tight">
                {meta.name}
              </h1>
              <p className="text-white/80 font-quicksand mt-1 text-base max-w-lg">
                {meta.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar: count + sort ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-quicksand text-slate-500 text-sm">
            <span className="font-bold text-slate-800 text-base">{products.length}</span>{' '}
            {products.length === 1 ? 'product' : 'products'} in{' '}
            <span className="font-semibold text-slate-700">{meta.name}</span>
          </p>

          {/* Sort */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm self-start sm:self-auto">
            <ArrowDownUp size={15} className="text-slate-400" />
            <label htmlFor="cat-sort" className="text-sm font-semibold text-slate-600 font-quicksand whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="cat-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-sm font-quicksand text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────────────── */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <AnimatePresence mode="wait">
          {products.length > 0 ? (
            <motion.div
              key={slug + sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.map((product) => (
                <div key={product.id} className="cat-card opacity-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          ) : (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-5">
                <PackageOpen size={32} className="text-slate-400" />
              </div>
              <h2 className="font-fredoka text-2xl font-bold text-slate-700 mb-2">
                No products yet
              </h2>
              <p className="font-quicksand text-slate-500 text-sm max-w-xs">
                There are no products listed under <strong>{meta.name}</strong> yet.
                Add one in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">mockData.ts</code> with{' '}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">category: '{slug}'</code>.
              </p>
              <Link
                href="/shop"
                className="mt-6 px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors font-quicksand text-sm"
              >
                Browse All Products
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
