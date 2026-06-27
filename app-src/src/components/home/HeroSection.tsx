'use client';
// Hero Section with GSAP ScrollTrigger + Framer Motion (animation.md compliance)
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Users, Package, Sparkles } from 'lucide-react';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SOCIAL_PROOF = [
  { icon: Users, value: '50K+', label: 'Happy Kids', color: 'text-violet-500' },
  { icon: Star, value: '4.9', label: 'Avg Rating', color: 'text-amber-500' },
  { icon: Package, value: '200+', label: 'Products', color: 'text-teal-500' },
];

const FLOATING_CARDS = [
  { emoji: '📚', label: 'Story Books', top: '10%', left: '5%', rotation: -8, delay: 0 },
  { emoji: '🔤', label: 'Phonics', top: '65%', left: '0%', rotation: 6, delay: 0.15 },
  { emoji: '🧩', label: 'Puzzle Toys', top: '5%', right: '5%', rotation: 5, delay: 0.3 },
  { emoji: '🕌', label: 'Islamic Cards', top: '70%', right: '0%', rotation: -5, delay: 0.45 },
  { emoji: '✏️', label: 'Tracing', top: '40%', right: '5%', rotation: 8, delay: 0.6 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance - liquid smooth (animation.md: translateY 30->0, opacity 0->1)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          btnsRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          proofRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          collageRef.current,
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
          '-=1.2'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50"
    >
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-teal-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-violet-100/40 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left: Content */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold font-quicksand border border-emerald-200"
          >
            <Sparkles size={14} className="text-emerald-500" />
            Pakistan's #1 Kids Learning Brand
          </motion.div>

          {/* Asymmetric Heading */}
          <h1 ref={headingRef} className="font-fredoka text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight opacity-0">
            <span className="text-slate-800">Where little</span>
            <br />
            <span className="text-slate-800">minds go</span>
            <br />
            <span className="relative inline-block">
              <span className="text-emerald-500">READ</span>
              <span className="text-slate-400 font-light mx-2 text-5xl xl:text-6xl">,</span>
              <span className="text-teal-500">PLAY</span>
            </span>
            <br />
            <span className="text-slate-800">& </span>
            <span className="relative">
              <span className="text-violet-500">GROW</span>
              <span className="text-slate-700">!</span>
              {/* Decorative underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full origin-left"
              />
            </span>
          </h1>

          <p ref={subRef} className="text-lg text-slate-500 font-quicksand max-w-lg leading-relaxed opacity-0">
            Premium educational toys, books, and activity kits crafted for Pakistani kids aged 2–10. 
            Bilingual, fun, and built to spark a lifelong love of learning. 🌟
          </p>

          {/* CTAs */}
          <div ref={btnsRef} className="flex flex-wrap gap-3 opacity-0">
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 25px 50px rgba(5,150,105,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-200 font-quicksand transition-all duration-300"
              >
                Shop Best Sellers
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </Link>
            <Link href="/category/bundles">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, backgroundColor: '#f0fdf4', boxShadow: '0 10px 25px rgba(5,150,105,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-emerald-700 font-bold text-base rounded-2xl border-2 border-emerald-300 font-quicksand hover:border-emerald-500 transition-all duration-300"
              >
                See Bundles 🎁
              </motion.button>
            </Link>
          </div>

          {/* Social Proof Bar */}
          <div ref={proofRef} className="flex flex-wrap gap-6 pt-2 opacity-0">
            {SOCIAL_PROOF.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                  <Icon size={15} className={color} />
                </div>
                <div>
                  <p className={`font-fredoka font-bold text-lg leading-none ${color}`}>{value}</p>
                  <p className="text-xs text-slate-400 font-quicksand">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Floating Product Collage */}
        <div ref={collageRef} className="relative flex items-center justify-center min-h-[480px] opacity-0">
          {/* Central hero card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 w-64 h-80 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] shadow-2xl shadow-emerald-300 flex flex-col items-center justify-center gap-4 border-4 border-white/30"
          >
            <div className="text-7xl">📦</div>
            <div className="text-center px-4">
              <p className="font-fredoka text-white text-xl font-bold">Phonics Flip Set</p>
              <p className="text-emerald-100 text-sm font-quicksand mt-1">120 Activity Cards</p>
              <div className="mt-3 px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-bold font-quicksand">
                Rs. 1,299
              </div>
            </div>
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none" />
          </motion.div>

          {/* Floating accent cards */}
          {FLOATING_CARDS.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, i % 2 === 0 ? -8 : 8, 0],
              }}
              transition={{
                opacity: { delay: 0.3 + card.delay, duration: 0.5 },
                scale: { delay: 0.3 + card.delay, type: 'spring', stiffness: 300 },
                y: { delay: 0.5 + card.delay, duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{
                position: 'absolute',
                top: card.top,
                left: card.left,
                right: card.right,
                rotate: card.rotation,
              }}
              className="w-24 h-24 bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <span className="text-3xl">{card.emoji}</span>
              <span className="text-[9px] font-semibold text-slate-500 font-quicksand">{card.label}</span>
            </motion.div>
          ))}

          {/* Background decorative ring */}
          <div className="absolute inset-8 rounded-full border-2 border-dashed border-emerald-200/60 pointer-events-none" />
          <div className="absolute inset-16 rounded-full border border-teal-100/40 pointer-events-none" />
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
