'use client';
// Crowd Favourites Section with GSAP ScrollTrigger (animation.md)
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '@/components/shop/ProductCard';
import { Product } from '@/lib/firebase/schema';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  badge?: string;
}

export default function ProductGrid({
  products,
  title = 'Crowd Favourites',
  subtitle = 'Loved by thousands of families across Pakistan — hand-picked, high-quality, and genuinely fun.',
  badge = '🔥 Best Sellers',
}: ProductGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Stagger cards from bottom (animation.md: liquid-smooth stagger)
      gsap.fromTo(
        '.product-card-anim',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-white to-slate-50/70 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 opacity-0">
          <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold font-quicksand mb-4">
            {badge}
          </span>
          <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-slate-800">
            {title}
          </h2>
          <p className="text-slate-400 font-quicksand mt-3 text-base max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 4-column Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.map((product) => (
            <div key={product.id} className="product-card-anim opacity-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <button className="px-8 py-3.5 border-2 border-emerald-300 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 hover:border-emerald-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 font-quicksand">
              View All Products →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
