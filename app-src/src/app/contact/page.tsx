'use client';
import React, { useRef, useEffect, useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { submitContactForm } from '@/lib/actions/contact';
import type { Metadata } from 'next';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-element',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitContactForm(formData);
      setResult(res);
      if (res.success) (e.target as HTMLFormElement).reset();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white py-20" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="contact-element text-center mb-16 opacity-0">
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold font-quicksand mb-4">
            💬 We're here to help
          </span>
          <h1 className="font-fredoka text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Get in <span className="text-emerald-500">Touch</span>
          </h1>
          <p className="text-slate-400 font-quicksand text-base max-w-md mx-auto">
            Have a question about an order, product, or wholesale? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { Icon: Phone, label: 'Call Us', value: '+92 300 123 4567', sub: 'Mon–Sat, 9am–6pm PKT', color: 'bg-emerald-100 text-emerald-600' },
              { Icon: Mail, label: 'Email', value: 'hello@parhaelikhae.pk', sub: 'We reply within 24 hours', color: 'bg-violet-100 text-violet-600' },
              { Icon: MapPin, label: 'Location', value: 'Lahore, Punjab', sub: 'Pakistan', color: 'bg-amber-100 text-amber-600' },
              { Icon: MessageCircle, label: 'WhatsApp', value: 'wa.me/923001234567', sub: 'Quickest response channel', color: 'bg-teal-100 text-teal-600' },
            ].map(({ Icon, label, value, sub, color }) => (
              <div key={label} className="contact-element flex items-start gap-4 opacity-0">
                <div className={`w-11 h-11 ${color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-fredoka font-bold text-slate-700">{label}</p>
                  <p className="font-quicksand text-sm text-slate-600 font-semibold">{value}</p>
                  <p className="font-quicksand text-xs text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="contact-element lg:col-span-3 opacity-0">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8">
              <h2 className="font-fredoka text-2xl font-bold text-slate-800 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1.5 font-quicksand">Full Name *</label>
                    <input id="contact-name" name="name" required placeholder="Ahmed Hassan" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-quicksand focus:outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1.5 font-quicksand">Email *</label>
                    <input id="contact-email" name="email" type="email" required placeholder="you@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-quicksand focus:outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5 font-quicksand">Phone (optional)</label>
                  <input id="contact-phone" name="phone" type="tel" placeholder="+92 3xx xxxxxxx" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-quicksand focus:outline-none focus:border-emerald-400 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-1.5 font-quicksand">Message *</label>
                  <textarea id="contact-message" name="message" required rows={5} placeholder="Tell us how we can help..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-quicksand focus:outline-none focus:border-emerald-400 focus:bg-white transition-all resize-none" />
                </div>

                {result?.success && (
                  <div className="px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700 font-quicksand font-semibold">
                    ✅ Message sent! We'll get back to you within 24 hours.
                  </div>
                )}
                {result?.error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-quicksand">
                    ❌ {result.error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isPending}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 font-quicksand disabled:opacity-60 transition-shadow hover:shadow-xl hover:shadow-emerald-300"
                >
                  <Send size={16} />
                  {isPending ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
