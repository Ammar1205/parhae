'use client';
// Pick a Vibe - Category Grid with GSAP ScrollTrigger + Framer Motion wobble (animation.md)
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Category } from '@/lib/firebase/schema';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading entrance (animation.md: y: 30->0, opacity 0->1)
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

      // Category cards stagger (animation.md: staggered reveal)
      gsap.fromTo(
        '.category-card',
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.4)',
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
    <section ref={sectionRef} className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 opacity-0">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold font-quicksand mb-4">
            🎯 Browse By Category
          </span>
          <h2 className="font-fredoka text-4xl sm:text-5xl font-bold text-slate-800">
            Pick a <span className="text-emerald-500">Vibe</span>
          </h2>
          <p className="text-slate-400 font-quicksand mt-3 text-base max-w-md mx-auto">
            Find exactly what your little learner needs — sorted by subject and style.
          </p>
        </div>

        {/* Category Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`}>
              <motion.div
                className="category-card group opacity-0"
                whileHover={{
                  y: -12,
                  scale: 1.08,
                  transition: { type: 'spring', stiffness: 400, damping: 15 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center gap-3 p-5 bg-white rounded-[1.5rem] border-2 border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 cursor-pointer">
                  {/* Icon with wobble on hover */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center shadow-lg text-3xl`}
                    whileHover={{
                      rotate: [0, -10, 10, -5, 5, 0],
                      transition: { duration: 0.5, ease: 'easeInOut' },
                    }}
                  >
                    {cat.icon}
                  </motion.div>
                  <div className="text-center">
                    <p className="font-fredoka font-bold text-slate-700 text-sm leading-tight">{cat.name}</p>
                    <p className="text-[10px] text-slate-400 font-quicksand mt-0.5">{cat.productCount} items</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
